/**
 * Tests for project posts and scheduled publishing
 * (lib/automation/project-posts.ts): `npm run test:project-posts`. No network:
 * Sanity, Claude and the email are stand-ins; the stand-in Sanity runs the
 * steps' real GROQ over an in-memory dataset (groq-js). Ported from
 * hubss.com's scripts/test-project-posts.ts, 20 Oct 2026.
 *
 * What they protect: a job's article says only what its post records and is
 * scheduled two weekdays out, never on a weekend or a day another article
 * has; it goes live by itself only when both checks are clean, it shows no
 * contact detail that isn't Square One's, it has a photograph and the
 * editors have been told; nothing is written twice (a Duplicate gets its
 * own); a post that keeps failing is retried behind the others, then given
 * up with one email; a scheduled draft goes live on time, in one step, dated
 * that day (an edit keeps the post's date), and one that can't go is left
 * and reported, while an editor's edit or hold during the run always wins.
 */
import "./test-env"
import assert from "node:assert/strict"
import { evaluate, parse } from "groq-js"
import {
  buildProjectDocument,
  draftProjectArticles,
  jobName,
  jobRecord,
  LEAD_DAYS,
  missingForLive,
  NEEDS_MS,
  PROFILE_INSTRUCTIONS,
  publishDueDrafts,
  readyToGo,
  scheduleSlot,
  toPublished,
  vancouverWhen,
  type JobPost,
} from "../lib/automation/project-posts"
import type { Draft, FactCheck, StylePass } from "../lib/automation/drafter"
import type { Claude, Mail, SanityDoc, Store, ToolRequest } from "../lib/automation/services"
import { NextRequest } from "next/server"
import { GET as projectArticlesRun } from "../app/api/cron/project-articles/route"
import vercel from "../vercel.json"

process.env.BLOG_DRAFT_NOTIFY = "office@example.com, agency@example.com"

let failures = 0
async function check(name: string, fn: () => void | Promise<void>) {
  try {
    await fn()
    console.log(`  ok    ${name}`)
  } catch (err) {
    failures++
    console.log(`  FAIL  ${name}\n        ${err instanceof Error ? err.stack?.split("\n").slice(0, 3).join("\n        ") : err}`)
  }
}

const EM = "—"

// ── stand-ins ─────────────────────────────────────────────────────────────────

function sanity(docs: SanityDoc[]) {
  const dataset: SanityDoc[] = docs.map((d) => structuredClone(d))
  const created: SanityDoc[] = []
  const patched: { id: string; set: Record<string, unknown> }[] = []
  const published: string[] = []
  let refusePublish: Error | null = null
  let refusePatch: ((id: string, set: Record<string, unknown>) => Error | null) | null = null
  const store: Store = {
    // A copy, as Sanity's answer is: what the run read doesn't change under it.
    fetch: async <T,>(query: string, params: Record<string, unknown> = {}) => structuredClone(await (await evaluate(parse(query, { params }), { dataset, params })).get()) as T,
    create: async (doc) => {
      if (dataset.some((d) => d._id === doc._id)) throw Object.assign(new Error(`Document by ID "${doc._id}" already exists`), { statusCode: 409 })
      dataset.push(structuredClone(doc))
      created.push(structuredClone(doc))
    },
    createOrReplace: async (doc) => {
      const i = dataset.findIndex((d) => d._id === doc._id)
      if (i >= 0) dataset[i] = structuredClone(doc)
      else dataset.push(structuredClone(doc))
    },
    patch: async (id, set) => {
      const refused = refusePatch?.(id, set)
      if (refused) throw refused
      const d = dataset.find((x) => x._id === id)
      if (!d) throw Object.assign(new Error(`The document "${id}" was not found`), { statusCode: 404 })
      Object.assign(d, structuredClone(set))
      patched.push({ id, set })
    },
    createIfNotExists: async (doc) => {
      if (!dataset.some((d) => d._id === doc._id)) dataset.push(structuredClone(doc))
    },
    delete: async (id) => {
      const i = dataset.findIndex((d) => d._id === id)
      if (i >= 0) dataset.splice(i, 1)
    },
    publish: async (live, draftId, draftRev) => {
      if (refusePublish) throw refusePublish
      // Sanity's ifRevisionID: the whole transaction fails if the draft changed or is gone.
      if (draftRev && dataset.find((d) => d._id === draftId)?._rev !== draftRev)
        throw Object.assign(new Error(`Document "${draftId}" has unexpected revision ID ("${draftRev}")`), { statusCode: 409 })
      const i = dataset.findIndex((d) => d._id === live._id)
      if (i >= 0) dataset[i] = structuredClone(live)
      else dataset.push(structuredClone(live))
      const j = dataset.findIndex((d) => d._id === draftId)
      if (j >= 0) dataset.splice(j, 1)
      published.push(live._id)
    },
    uploadImage: async () => "image-upload0001-1600x1000-jpg",
  }
  return {
    store,
    dataset,
    created,
    patched,
    published,
    get: (id: string) => dataset.find((d) => d._id === id),
    refusePublish: (err: Error | null) => (refusePublish = err),
    refusePatch: (fn: typeof refusePatch) => (refusePatch = fn),
  }
}

/** Claude for the drafter's three calls; the fact check answers `check`. */
function fakeClaude(opts: { check?: unknown; title?: string; fail?: Error; body?: string; tags?: string[] } = {}) {
  const calls: ToolRequest[] = []
  const claude: Claude = async <T,>(r: ToolRequest): Promise<T> => {
    calls.push(r)
    if (opts.fail) throw opts.fail
    if (r.tool.name === "save_draft")
      return {
        title: opts.title ?? "A stamped crosswalk for Langley's railway district",
        slug: "langley-stamped-crosswalk",
        excerpt: "What went into the stamped crosswalk in Langley.",
        tags: opts.tags ?? ["StreetPrint", "Langley"],
        body: opts.body ?? "Square One stamped a crosswalk in Langley, BC.\n\n## What went in\n\nStreetPrint, in the brick pattern.",
        factsUsed: ["Where: Langley, BC"],
      } as T
    if (r.tool.name === "save_rewrites") return { rewrites: [] } as T
    if (r.tool.name === "report") return (opts.check ?? { verdict: "clean", unsupported: [] }) as T
    throw new Error(`unexpected tool ${r.tool.name}`)
  }
  return { claude, calls, tools: () => calls.map((c) => c.tool.name) }
}

function fakeMail(ok = true) {
  const sent: Mail[] = []
  return { mail: async (m: Mail) => (sent.push(m), ok), sent }
}

const fixed = (iso: string) => () => new Date(iso)

/** A Job photos post as Sanity stores it (its `article` a reference, where the query gives its id). */
const job = (over: Partial<Omit<JobPost, "article"> & SanityDoc> & { article?: unknown } = {}): SanityDoc => ({
  _id: "fieldPost-langley",
  _type: "fieldPost",
  _createdAt: "2026-10-19T18:00:00Z",
  place: "Langley, BC",
  service: "stamped-asphalt",
  systems: ["streetprint"],
  application: "crosswalks",
  note: "A stamped crosswalk in the brick pattern, done in a day.",
  writeUp: "The crossing is by the old railway station. We stamped it in brick and coloured it red.",
  date: "2026-10-17",
  photos: [
    { _key: "a", _type: "image", asset: { _type: "reference", _ref: "image-aaa-1600x1200-jpg" }, alt: "The finished crosswalk from the curb", hotspot: { x: 0.4, y: 0.6, width: 0.5, height: 0.5 } },
    { _key: "b", _type: "image", asset: { _type: "reference", _ref: "image-bbb-1600x1200-jpg" }, alt: "The brick pattern up close" },
    { _key: "c", _type: "image", asset: { _type: "reference", _ref: "image-ccc-1600x1200-jpg" }, alt: "The crew rolling the pattern in" },
  ],
  ...over,
})

/** The job as the step's query returns it. */
const source = (d: SanityDoc): JobPost => ({
  _id: d._id,
  place: d.place as string,
  note: d.note as string,
  writeUp: d.writeUp as string,
  date: d.date as string,
  service: d.service as string,
  systems: d.systems as string[],
  application: d.application as string,
  photos: (d.photos as { asset: { _ref: string }; alt?: string; hotspot?: Record<string, unknown> }[]).map((p) => ({ asset: p.asset._ref, alt: p.alt ?? null, hotspot: p.hotspot ?? null, crop: null })),
})

const draft: Draft = {
  title: "A stamped crosswalk for Langley's railway district",
  slug: "langley-stamped-crosswalk",
  excerpt: "What went into the stamped crosswalk in Langley.",
  tags: ["StreetPrint", "Langley"],
  body: "Square One stamped a crosswalk in Langley, BC.\n\n## What went in\n\nStreetPrint, in the brick pattern.",
  factsUsed: ["Where: Langley, BC"],
}
const clean: FactCheck = { verdict: "clean", unsupported: [] }
const flagged: FactCheck = { verdict: "needs edits", unsupported: [{ quote: "done in a day", reason: "the record says so, but not the story" }] }
const tidy: StylePass = { text: {}, flagged: 0, left: [] }
const dashy: StylePass = { text: {}, flagged: 1, left: [{ label: "Body", sentence: "A crossing, done right.", problems: ["Em dash"] }] }

async function main() {
  console.log("When an article goes live")

  await check(`two days out at the run's hour (14:00 UTC): a Monday's article goes on the Wednesday`, () => {
    assert.equal(LEAD_DAYS, 2)
    assert.equal(scheduleSlot(new Date("2026-10-19T14:05:00Z")), "2026-10-21T14:00:00.000Z")
  })
  await check("two weekdays, never a weekend: Thursday's goes on Monday; Friday's, Saturday's and Sunday's on Tuesday", () => {
    assert.equal(scheduleSlot(new Date("2026-10-22T15:05:00Z")), "2026-10-26T14:00:00.000Z")
    assert.equal(scheduleSlot(new Date("2026-10-23T15:05:00Z")), "2026-10-27T14:00:00.000Z", "Friday: the office has Monday with it")
    assert.equal(scheduleSlot(new Date("2026-10-24T15:05:00Z")), "2026-10-27T14:00:00.000Z", "Saturday")
    assert.equal(scheduleSlot(new Date("2026-10-25T15:05:00Z")), "2026-10-27T14:00:00.000Z", "Sunday")
  })
  await check("counted from Vancouver's day: a Run pressed on a Friday evening (Saturday in UTC) is Friday's", () => {
    assert.equal(scheduleSlot(new Date("2026-10-24T01:30:00Z")), "2026-10-27T14:00:00.000Z")
  })
  await check("across the clock change: Thursday 29 October's goes on Monday 2 November, at 6 a.m. Vancouver time", () => {
    assert.equal(scheduleSlot(new Date("2026-10-29T15:05:00Z")), "2026-11-02T14:00:00.000Z")
  })
  await check("never on a day another scheduled article has: two jobs the same day go out on two days", () => {
    assert.equal(scheduleSlot(new Date("2026-10-19T14:05:00Z"), ["2026-10-21T14:00:00.000Z"]), "2026-10-22T14:00:00.000Z")
    assert.equal(scheduleSlot(new Date("2026-10-19T14:05:00Z"), ["2026-10-21T14:00:00.000Z", "2026-10-22T09:00:00.000Z", "2026-10-23T14:00:00.000Z"]), "2026-10-26T14:00:00.000Z")
  })
  await check("the time in the emails is Vancouver's: 7 a.m. in summer, 6 a.m. once the clocks go back", () => {
    assert.equal(vancouverWhen("2026-10-21T14:00:00.000Z"), "Wednesday 21 October at 7:00 a.m. Vancouver time")
    assert.equal(vancouverWhen("2026-11-02T14:00:00.000Z"), "Monday 2 November at 6:00 a.m. Vancouver time")
  })

  console.log("\nWhat the article is written from")

  await check("the job's record: its place, date, service, systems, kind of work, the crew's note and the story, the photos by what they show (never counted)", () => {
    const r = jobRecord(source(job()))
    assert.match(r, /^THE JOB \(Square One's own record/)
    assert.match(r, /^- Where: Langley, BC$/m)
    assert.match(r, /^- When it was done: 17 October 2026$/m)
    assert.match(r, /^- Service: Stamped asphalt$/m)
    assert.match(r, /^- Systems: StreetPrint$/m)
    assert.match(r, /^- Kind of work: Crosswalks$/m)
    assert.match(r, /^- What was done \(the crew's note\): A stamped crosswalk in the brick pattern, done in a day\.$/m)
    assert.match(r, /^- The story \(from Square One\): The crossing is by the old railway station\./m)
    assert.match(r, /^- The photographs show: The finished crosswalk from the curb; The brick pattern up close; The crew rolling the pattern in$/m)
    assert.doesNotMatch(r, /\b3\b|three photo/i, "no photo count")
  })
  await check("what's left out of the record is left out of the facts: no date, no systems, no kind of work", () => {
    const r = jobRecord(source(job({ date: undefined, systems: [], application: undefined })))
    assert.doesNotMatch(r, /When it was done|Systems|Kind of work/)
  })
  await check("the instructions beat the shape: 350 to 600 words, the job first, never padded, nothing added, photos not counted", () => {
    assert.match(PROFILE_INSTRUCTIONS, /350 to 600 words/)
    assert.match(PROFILE_INSTRUCTIONS, /The job comes first/)
    assert.match(PROFILE_INSTRUCTIONS, /Never pad/)
    assert.match(PROFILE_INSTRUCTIONS, /never add a client, a date, a size, a colour, a cost or a reason/)
    assert.match(PROFILE_INSTRUCTIONS, /don't count them/)
    assert.match(PROFILE_INSTRUCTIONS, /Never print a phone number, an email or a street address from THE JOB/)
    assert.ok(!PROFILE_INSTRUCTIONS.includes(EM))
  })
  await check("the job's name, as Studio lists it", () => {
    assert.equal(jobName({ service: "stamped-asphalt", place: "Langley, BC" }), "Stamped asphalt in Langley, BC")
    assert.equal(jobName({ service: null, place: null }), "a Job photos post")
  })

  console.log("\nThe scheduled draft")

  const today = new Date("2026-10-19T14:05:00Z")
  const slot = "2026-10-21T14:00:00.000Z"
  await check("goes live by itself only with both checks clean and a photograph", () => {
    assert.equal(readyToGo(clean, tidy, true), true)
    assert.equal(readyToGo(flagged, tidy, true), false, "a statement the record doesn't back")
    assert.equal(readyToGo(clean, dashy, true), false, "a sentence against the house style")
    assert.equal(readyToGo(clean, tidy, false), false, "no photograph")
    assert.equal(readyToGo({ verdict: "needs edits", unsupported: [] }, tidy, true), false, "a check that didn't say clean")
  })
  await check("a tag against the canon is dropped: it would print on the live post, and no check reads tags", () => {
    const doc = buildProjectDocument(source(job()), { ...draft, tags: ["StreetPrint", "HUB", "Case study", "604-555-0199", "Langley"] }, clean, "x", slot, tidy, today)
    assert.deepEqual(doc.tags, ["Project stories", "StreetPrint", "Langley"])
  })
  await check("a clean article: an unpublished draft, scheduled for its slot, dated today, filed by its kind of work", () => {
    const doc = buildProjectDocument(source(job()), draft, clean, "langley-stamped-crosswalk", slot, tidy, today)
    assert.equal(doc._id, "drafts.post-langley-stamped-crosswalk")
    assert.equal(doc._type, "post")
    assert.equal(doc.scheduled, true)
    assert.equal(doc.scheduledFor, slot)
    assert.equal(doc.date, "2026-10-19")
    assert.equal(doc.category, "Crosswalks")
    assert.equal(doc.author, "Square One Paving")
    assert.deepEqual(doc.fieldPost, { _type: "reference", _ref: "fieldPost-langley", _weak: true })
    assert.equal(doc.tags[0], "Project stories")
    assert.ok(doc.tags.includes("StreetPrint") && doc.tags.includes("Langley"))
    assert.equal(new Set(doc.tags.map((t) => t.toLowerCase())).size, doc.tags.length, "no tag twice")
  })
  await check("the first photo leads, framed on its focal point; the rest close the article under their own heading", () => {
    const doc = buildProjectDocument(source(job()), draft, clean, "langley-stamped-crosswalk", slot, tidy, today)
    assert.deepEqual(doc.mainImage, { _type: "image", asset: { _type: "reference", _ref: "image-aaa-1600x1200-jpg" }, alt: "The finished crosswalk from the curb", hotspot: { x: 0.4, y: 0.6, width: 0.5, height: 0.5 } })
    const body = doc.body as { _type: string; style?: string; children?: { text: string }[]; asset?: { _ref: string }; alt?: string; _key?: string }[]
    const h = body.findIndex((b) => b.style === "h2" && b.children?.[0].text === "The job in photographs")
    assert.ok(h > 0, "the heading follows the article")
    assert.deepEqual(
      body.slice(h + 1).map((b) => [b._type, b.asset?._ref, b.alt]),
      [
        ["image", "image-bbb-1600x1200-jpg", "The brick pattern up close"],
        ["image", "image-ccc-1600x1200-jpg", "The crew rolling the pattern in"],
      ],
    )
    assert.equal(new Set(body.map((b) => b._key)).size, body.length, "every block keyed once")
  })
  await check("a photo with no description gets the job's name, never a count", () => {
    const j = job()
    ;(j.photos as { alt?: string }[])[1].alt = ""
    const doc = buildProjectDocument(source(j), draft, clean, "x", slot, tidy, today)
    const imgs = (doc.body as { _type: string; alt?: string }[]).filter((b) => b._type === "image")
    assert.equal(imgs[0].alt, "Stamped asphalt in Langley, BC, photo 2")
  })
  await check("the notes say when it goes live and how to change, move or hold it; no em dash", () => {
    const doc = buildProjectDocument(source(job()), draft, clean, "langley-stamped-crosswalk", slot, tidy, today)
    assert.match(doc.editorNotes, /^Drafted by Claude on 2026-10-19 from the Job photos post "Stamped asphalt in Langley, BC"/)
    assert.match(doc.editorNotes, /SCHEDULED: it goes live by itself Wednesday 21 October at 7:00 a\.m\. Vancouver time/)
    assert.match(doc.editorNotes, /To hold it, turn "Goes live by itself" off/)
    assert.match(doc.editorNotes, /FACT CHECK: every statement matches/)
    assert.ok(!doc.editorNotes.includes(EM))
  })
  await check("a statement the record doesn't back: saved held, the time kept, the statement listed", () => {
    const doc = buildProjectDocument(source(job()), draft, flagged, "x", slot, tidy, today)
    assert.equal(doc.scheduled, false)
    assert.equal(doc.scheduledFor, slot)
    assert.match(doc.editorNotes, /^HELD: a check below found something/m)
    assert.match(doc.editorNotes, /- "done in a day": the record says so, but not the story/)
  })
  await check("a post with no photograph: held, and the notes ask for one", () => {
    const doc = buildProjectDocument(source(job({ photos: [] })), draft, clean, "x", slot, tidy, today)
    assert.equal(doc.scheduled, false)
    assert.equal("mainImage" in doc, false)
    assert.match(doc.editorNotes, /PHOTOS: the post had none with a file, so this is held/)
  })

  console.log("\nGoing live")

  const due = (over: Record<string, unknown> = {}): SanityDoc => ({
    _id: "drafts.post-langley-stamped-crosswalk",
    _type: "post",
    _rev: "r1",
    _createdAt: "2026-10-19T14:06:00Z",
    _updatedAt: "2026-10-19T14:06:00Z",
    title: "A stamped crosswalk for Langley's railway district",
    slug: { _type: "slug", current: "langley-stamped-crosswalk" },
    date: "2026-10-19",
    scheduled: true,
    scheduledFor: "2026-10-21T14:00:00.000Z",
    editorNotes: "SCHEDULED: it goes live by itself.",
    category: "Crosswalks",
    mainImage: { _type: "image", asset: { _type: "reference", _ref: "image-aaa-1600x1200-jpg" }, alt: "The finished crosswalk" },
    body: [{ _type: "block", _key: "b1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Square One stamped a crosswalk in Langley, BC.", marks: [] }] }],
    ...over,
  })
  const morning = new Date("2026-10-21T14:00:03Z")

  await check("toPublished: the live id, dated that day in Vancouver, no longer scheduled, a line in the notes", () => {
    const live = toPublished(due() as never, morning)
    assert.equal(live._id, "post-langley-stamped-crosswalk")
    assert.equal(live.scheduled, false)
    assert.equal(live.date, "2026-10-21")
    assert.equal("scheduledFor" in live, false)
    assert.equal("_rev" in live || "_createdAt" in live || "_updatedAt" in live, false)
    assert.match(live.editorNotes, /^Published by the morning run, as scheduled, Wednesday 21 October at 7:00 a\.m\. Vancouver time\.\n\nSCHEDULED/)
  })
  await check("toPublished: a scheduled edit keeps the live post's date", () => {
    const live = toPublished(due() as never, morning, "2026-10-01")
    assert.equal(live.date, "2026-10-01")
    assert.match(live.editorNotes, /^Edit published by the morning run/)
  })

  await check("a draft whose time has come goes live in one step, and the editors get its address", async () => {
    const s = sanity([due(), due({ _id: "drafts.post-later", slug: { _type: "slug", current: "later" }, scheduledFor: "2026-10-22T14:00:00.000Z" }), due({ _id: "drafts.post-held", slug: { _type: "slug", current: "held" }, scheduled: false })])
    const m = fakeMail()
    const out = await publishDueDrafts({ claude: fakeClaude().claude, store: s.store, mail: m.mail, now: () => morning }, morning, { social: true })
    assert.deepEqual(out.published.map((p) => p.slug), ["langley-stamped-crosswalk"])
    assert.deepEqual(s.published, ["post-langley-stamped-crosswalk"])
    assert.equal(s.get("drafts.post-langley-stamped-crosswalk"), undefined, "the draft is gone")
    assert.equal(s.get("post-langley-stamped-crosswalk")?.date, "2026-10-21")
    assert.ok(s.get("drafts.post-later") && s.get("drafts.post-held"), "tomorrow's and the held one wait")
    assert.equal(m.sent.length, 1)
    assert.equal(m.sent[0].subject, "On squareonepaving.com now: A stamped crosswalk for Langley's railway district")
    assert.deepEqual(m.sent[0].to, ["office@example.com", "agency@example.com"])
    assert.match(m.sent[0].text, /https:\/\/www\.squareonepaving\.com\/blog\/langley-stamped-crosswalk/)
    assert.match(m.sent[0].text, /Tomorrow morning's run drafts its social posts in Buffer, for approval/)
  })
  await check("a draft ten minutes early is due: the run that starts at 14:00 doesn't miss a 14:05 one", async () => {
    const s = sanity([due({ scheduledFor: "2026-10-21T14:08:00.000Z" })])
    const out = await publishDueDrafts({ claude: fakeClaude().claude, store: s.store, mail: fakeMail().mail, now: () => morning }, morning)
    assert.equal(out.published.length, 1)
  })
  await check("a scheduled edit to a live post keeps its date and says so", async () => {
    const s = sanity([due(), { _id: "post-langley-stamped-crosswalk", _type: "post", title: "Old", slug: { _type: "slug", current: "langley-stamped-crosswalk" }, date: "2026-10-02" }])
    const m = fakeMail()
    const out = await publishDueDrafts({ claude: fakeClaude().claude, store: s.store, mail: m.mail, now: () => morning }, morning)
    assert.equal(out.published[0].edit, true)
    assert.equal(s.get("post-langley-stamped-crosswalk")?.date, "2026-10-02")
    assert.match(m.sent[0].subject, /^Updated on squareonepaving\.com/)
  })
  await check("a draft whose address another live post has is left as it is, and the editors are told", async () => {
    const s = sanity([due(), { _id: "post-other", _type: "post", title: "Another", slug: { _type: "slug", current: "langley-stamped-crosswalk" }, date: "2026-09-02" }])
    const m = fakeMail()
    const out = await publishDueDrafts({ claude: fakeClaude().claude, store: s.store, mail: m.mail, now: () => morning }, morning)
    assert.equal(out.published.length, 0)
    assert.match(out.failed[0].error, /another live post already uses \/blog\/langley-stamped-crosswalk/)
    assert.ok(s.get("drafts.post-langley-stamped-crosswalk"), "still there, still scheduled")
    assert.match(m.sent[0].subject, /^Scheduled post not published/)
    assert.match(m.sent[0].text, /turn "Goes live by itself" off and press Publish yourself/)
  })
  await check("a draft with no address is left and reported", async () => {
    const s = sanity([due({ slug: undefined })])
    const out = await publishDueDrafts({ claude: fakeClaude().claude, store: s.store, mail: fakeMail().mail, now: () => morning }, morning)
    assert.match(out.failed[0].error, /it is missing a web address/)
  })
  await check("an edit left half done overnight (no lead photo, an empty body, no Section) waits, and the email says what's missing", async () => {
    assert.deepEqual(missingForLive(due() as never), [])
    assert.deepEqual(missingForLive(due({ mainImage: undefined, body: [{ _type: "block", _key: "b", children: [{ _type: "span", text: "  " }] }], category: "" }) as never), [
      "a lead photo",
      "any words in the body",
      "a Section",
    ])
    const s = sanity([due({ mainImage: { _type: "image", alt: "x" } })])
    const m = fakeMail()
    const out = await publishDueDrafts({ claude: fakeClaude().claude, store: s.store, mail: m.mail, now: () => morning }, morning)
    assert.equal(out.published.length, 0)
    assert.deepEqual(s.published, [])
    assert.match(m.sent[0].text, /because it is missing a lead photo\./)
    assert.equal(s.get("drafts.post-langley-stamped-crosswalk")?.scheduled, true, "still set to go, once it's fixed")
  })
  await check("a scheduled edit to a post from the imported library needs only its title, address and words", async () => {
    const old = due({ date: "2021-10-20", mainImage: undefined, category: undefined })
    assert.deepEqual(missingForLive(old as never), [])
    const s = sanity([old, { _id: "post-langley-stamped-crosswalk", _type: "post", title: "Old", slug: { _type: "slug", current: "langley-stamped-crosswalk" }, date: "2021-10-20" }])
    const out = await publishDueDrafts({ claude: fakeClaude().claude, store: s.store, mail: fakeMail().mail, now: () => morning }, morning)
    assert.equal(out.published.length, 1)
    assert.equal(s.get("post-langley-stamped-crosswalk")?.date, "2021-10-20")
  })
  await check("an editor's edit made while the run was publishing wins: the edited version goes live", async () => {
    const s = sanity([due()])
    const realPublish = s.store.publish
    let edited = false
    s.store.publish = async (live, draftId, rev) => {
      if (!edited) {
        edited = true
        Object.assign(s.get(draftId)!, { _rev: "r2", title: "A stamped crosswalk by Langley's old station" })
      }
      await realPublish(live, draftId, rev)
    }
    const m = fakeMail()
    const out = await publishDueDrafts({ claude: fakeClaude().claude, store: s.store, mail: m.mail, now: () => morning }, morning)
    assert.equal(out.published.length, 1)
    assert.equal(s.get("post-langley-stamped-crosswalk")?.title, "A stamped crosswalk by Langley's old station")
    assert.equal(s.get("drafts.post-langley-stamped-crosswalk"), undefined)
    assert.match(m.sent[0].subject, /Langley's old station$/)
  })
  await check("a hold made while the run was publishing wins: nothing goes live and nobody is told it failed", async () => {
    const s = sanity([due()])
    const realPublish = s.store.publish
    s.store.publish = async (live, draftId, rev) => {
      Object.assign(s.get(draftId)!, { _rev: "r2", scheduled: false })
      await realPublish(live, draftId, rev)
    }
    const m = fakeMail()
    const out = await publishDueDrafts({ claude: fakeClaude().claude, store: s.store, mail: m.mail, now: () => morning }, morning)
    assert.equal(out.published.length + out.failed.length, 0)
    assert.match(out.left[0].why, /held or moved in Studio/)
    assert.equal(s.get("post-langley-stamped-crosswalk"), undefined)
    assert.equal(s.get("drafts.post-langley-stamped-crosswalk")?.scheduled, false)
    assert.equal(m.sent.length, 0)
  })
  await check("published by hand while the run was publishing: left alone, not reported as the run's", async () => {
    const s = sanity([due()])
    s.store.publish = async (_live, draftId) => {
      const d = s.get(draftId)!
      s.dataset.push({ ...d, _id: "post-langley-stamped-crosswalk", editorNotes: "Published by hand." })
      s.dataset.splice(s.dataset.indexOf(d), 1)
      throw Object.assign(new Error("Document has unexpected revision ID"), { statusCode: 409 })
    }
    const m = fakeMail()
    const out = await publishDueDrafts({ claude: fakeClaude().claude, store: s.store, mail: m.mail, now: () => morning }, morning)
    assert.equal(out.published.length + out.failed.length, 0)
    assert.match(out.left[0].why, /published or deleted in Studio/)
    assert.equal(m.sent.length, 0)
  })
  await check("a commit that answers with an error but went through counts as published", async () => {
    const s = sanity([due()])
    const realPublish = s.store.publish
    s.store.publish = async (live, draftId) => {
      await realPublish(live, draftId)
      throw new Error("Request timed out")
    }
    const out = await publishDueDrafts({ claude: fakeClaude().claude, store: s.store, mail: fakeMail().mail, now: () => morning }, morning)
    assert.equal(out.published.length, 1)
    assert.equal(out.failed.length, 0)
  })
  await check("a refused commit leaves the draft and reports it", async () => {
    const s = sanity([due()])
    s.refusePublish(Object.assign(new Error("Insufficient permissions"), { statusCode: 403 }))
    const out = await publishDueDrafts({ claude: fakeClaude().claude, store: s.store, mail: fakeMail().mail, now: () => morning }, morning)
    assert.equal(out.published.length, 0)
    assert.match(out.failed[0].error, /Insufficient permissions/)
    assert.ok(s.get("drafts.post-langley-stamped-crosswalk"))
  })

  console.log("\nWriting the article")

  const run = new Date("2026-10-19T14:05:00Z")
  const deps = (s: ReturnType<typeof sanity>, c: ReturnType<typeof fakeClaude>, m: ReturnType<typeof fakeMail>) => ({ claude: c.claude, store: s.store, mail: m.mail, now: fixed("2026-10-19T14:05:00Z") })

  await check("a published post with a story: a draft article, set to go live after the email, linked both ways", async () => {
    const s = sanity([job()])
    const c = fakeClaude()
    const m = fakeMail()
    const out = await draftProjectArticles(deps(s, c, m), run)
    assert.equal(out.drafted.length, 1)
    const d = out.drafted[0]
    assert.equal(d.goesLive, "2026-10-21T14:00:00.000Z")
    const doc = s.get("drafts.post-langley-stamped-crosswalk")
    assert.ok(doc, "the draft exists")
    assert.equal(doc?.scheduled, true, "switched on after the email")
    assert.equal(s.created.find((x) => x._id === "drafts.post-langley-stamped-crosswalk")?.scheduled, false, "created held")
    assert.deepEqual(s.get("fieldPost-langley")?.article, { _type: "reference", _ref: "post-langley-stamped-crosswalk", _weak: true })
    assert.equal(s.dataset.filter((x) => x._type === "projectClaim").length, 0, "the claim is cleared")
    assert.deepEqual(c.tools(), ["save_draft", "report"], "no rewrite needed: the fake writes clean copy")
    assert.match(c.calls[0].user, /FOR THIS PIECE \(these beat the SHAPE rules above\):\nThis is a PROJECT STORY of one finished job/)
    assert.match(c.calls[0].user, /THE JOB \(Square One's own record/)
    assert.match(c.calls[0].user, /The story \(from Square One\): The crossing is by the old railway station/)
    assert.match(c.calls[0].user, /THE SERVICE, as the site publishes it \(Stamped Asphalt; page: \/services\/stamped-asphalt\)/)
    assert.match(c.calls[0].user, /THE SYSTEM, as the site publishes it \(StreetPrint/)
    assert.equal(m.sent.length, 1)
    assert.equal(m.sent[0].subject, "Goes live Wednesday 21 October unless you hold it: A stamped crosswalk for Langley's railway district")
    assert.match(m.sent[0].text, /goes live on squareonepaving\.com by itself Wednesday 21 October at 7:00 a\.m\. Vancouver time/)
    assert.match(m.sent[0].text, /Read it: https:\/\/www\.squareonepaving\.com\/studio\/intent\/edit\/id=post-langley-stamped-crosswalk;type=post/)
    assert.match(m.sent[0].text, /To hold it, turn "Goes live by itself" off/)
  })
  await check("a statement the record doesn't back: held, and the email asks for a read first", async () => {
    const s = sanity([job()])
    const m = fakeMail()
    const out = await draftProjectArticles(deps(s, fakeClaude({ check: flagged }), m), run)
    assert.equal(out.drafted[0].goesLive, "held")
    assert.equal(s.get("drafts.post-langley-stamped-crosswalk")?.scheduled, false)
    assert.match(m.sent[0].subject, /^Needs a read before it goes:/)
    assert.match(m.sent[0].text, /Fact check: 1 statement\(s\) to check/)
  })
  await check("the email didn't go: held, never scheduled, the notes say why, and a second email says it waits", async () => {
    const s = sanity([job()])
    const m = fakeMail(false)
    const out = await draftProjectArticles(deps(s, fakeClaude(), m), run)
    assert.equal(out.drafted[0].goesLive, "held")
    const doc = s.get("drafts.post-langley-stamped-crosswalk")
    assert.equal(doc?.scheduled, false)
    assert.match(String(doc?.editorNotes), /^HELD: not set to go live by itself, because the email about it could not be sent/)
    assert.equal(m.sent.length, 2)
    assert.match(m.sent[0].subject, /^Goes live Wednesday 21 October unless you hold it:/)
    assert.match(m.sent[1].subject, /^Needs a read before it goes:/)
    assert.match(m.sent[1].text, /if an earlier email said it would, that email couldn't be confirmed, so the article waits for you/)
  })
  await check("switching it on fails after the email: held, and a correction goes out", async () => {
    const s = sanity([job()])
    s.refusePatch((id, set) => (id.startsWith("drafts.") && set.scheduled === true ? new Error("Request timed out") : null))
    const m = fakeMail()
    const out = await draftProjectArticles(deps(s, fakeClaude(), m), run)
    assert.equal(out.drafted[0].goesLive, "held")
    assert.equal(s.get("drafts.post-langley-stamped-crosswalk")?.scheduled, false)
    assert.match(m.sent[1].subject, /^Correction, held after all:/)
  })
  await check("switching it on answers with an error but went through: no false correction, it goes live as the email said", async () => {
    const s = sanity([job()])
    const realPatch = s.store.patch
    s.store.patch = async (id, set) => {
      await realPatch(id, set)
      if (id.startsWith("drafts.") && set.scheduled === true) throw new Error("Request timed out")
    }
    const m = fakeMail()
    const out = await draftProjectArticles(deps(s, fakeClaude(), m), run)
    assert.equal(out.drafted[0].goesLive, "2026-10-21T14:00:00.000Z")
    assert.equal(s.get("drafts.post-langley-stamped-crosswalk")?.scheduled, true)
    assert.equal(m.sent.length, 1)
  })
  await check("a phone number or house address in the article: held for a read, whatever the fact check says", async () => {
    const s = sanity([job()])
    const m = fakeMail()
    const body = "Square One stamped a crosswalk in Langley, BC.\n\nThe owner, at 604-555-0199, asked for brick at 1234 Main Street."
    const out = await draftProjectArticles(deps(s, fakeClaude({ body }), m), run)
    assert.equal(out.drafted[0].goesLive, "held")
    assert.equal(s.get("drafts.post-langley-stamped-crosswalk")?.scheduled, false)
    assert.match(m.sent[0].subject, /^Needs a read before it goes:/)
    assert.match(String(s.get("drafts.post-langley-stamped-crosswalk")?.editorNotes), /phone number that isn't one of Square One's published lines/)
  })
  await check("a fact check answer that can't be read: held, not passed", async () => {
    const s = sanity([job()])
    const out = await draftProjectArticles(deps(s, fakeClaude({ check: { verdict: "clean", unsupported: "not a list" } }), fakeMail()), run)
    assert.equal(out.drafted[0].goesLive, "held")
    assert.equal(out.drafted[0].factCheck, "needs edits")
  })
  await check("a copy made with Studio's Duplicate gets an article of its own, held: it may be the same job twice", async () => {
    const s = sanity([
      job({ _id: "fieldPost-copy", article: { _type: "reference", _ref: "post-original", _weak: true } }),
      { _id: "post-original", _type: "post", title: "The original's", slug: { _type: "slug", current: "original" }, fieldPost: { _type: "reference", _ref: "fieldPost-langley", _weak: true } },
    ])
    const m = fakeMail()
    const out = await draftProjectArticles(deps(s, fakeClaude(), m), run)
    assert.equal(out.drafted.length, 1)
    assert.equal(out.drafted[0].fieldPost, "fieldPost-copy")
    assert.equal(out.drafted[0].goesLive, "held")
    assert.deepEqual(s.get("fieldPost-copy")?.article, { _type: "reference", _ref: "post-langley-stamped-crosswalk", _weak: true })
    assert.equal(s.get("drafts.post-langley-stamped-crosswalk")?.scheduled, false)
    assert.match(String(s.get("drafts.post-langley-stamped-crosswalk")?.editorNotes), /^HELD: this Job photos post looks like a copy of another/)
    assert.match(m.sent[0].subject, /^Needs a read before it goes:/)
    assert.match(m.sent[0].text, /looks like a copy of another post whose article is already in Blog posts \(https:\/\/www\.squareonepaving\.com\/studio\/intent\/edit\/id=post-original;type=post\)/)
  })
  await check("an article an editor deleted isn't written again", async () => {
    const s = sanity([job({ article: { _type: "reference", _ref: "post-deleted", _weak: true } })])
    const c = fakeClaude()
    const out = await draftProjectArticles(deps(s, c, fakeMail()), run)
    assert.equal(out.drafted.length + out.waiting, 0)
    assert.equal(c.calls.length, 0)
  })
  await check("its slot skips a day another scheduled article has", async () => {
    const s = sanity([job(), { _id: "drafts.post-other", _type: "post", title: "Other", slug: { _type: "slug", current: "other" }, scheduled: true, scheduledFor: "2026-10-21T14:00:00.000Z" }])
    const out = await draftProjectArticles(deps(s, fakeClaude(), fakeMail()), run)
    assert.equal(out.drafted[0].goesLive, "2026-10-22T14:00:00.000Z")
  })
  await check("a taken address gets the next free one, drafts included", async () => {
    const s = sanity([job(), { _id: "drafts.post-langley-stamped-crosswalk", _type: "post", title: "Taken", slug: { _type: "slug", current: "langley-stamped-crosswalk" } }])
    const out = await draftProjectArticles(deps(s, fakeClaude(), fakeMail()), run)
    assert.equal(out.drafted[0].slug, "langley-stamped-crosswalk-2")
  })
  await check("never twice: a post an article already refers to, or one with its article noted, is left alone", async () => {
    const s = sanity([job(), { _id: "drafts.post-x", _type: "post", title: "Its article", slug: { _type: "slug", current: "x" }, fieldPost: { _type: "reference", _ref: "fieldPost-langley", _weak: true } }])
    const c = fakeClaude()
    const out = await draftProjectArticles(deps(s, c, fakeMail()), run)
    assert.equal(out.drafted.length, 0)
    assert.equal(c.calls.length, 0)
    const s2 = sanity([job({ article: { _type: "reference", _ref: "post-x", _weak: true } })])
    const out2 = await draftProjectArticles(deps(s2, c, fakeMail()), run)
    assert.equal(out2.drafted.length + out2.waiting, 0)
  })
  await check("only published posts with a story: a draft, an empty story or no service waits", async () => {
    const s = sanity([job({ _id: "drafts.fieldPost-langley" }), job({ _id: "fieldPost-nostory", writeUp: "  " }), job({ _id: "fieldPost-noservice", service: undefined })])
    const c = fakeClaude()
    const out = await draftProjectArticles(deps(s, c, fakeMail()), run)
    assert.equal(out.drafted.length, 0)
    assert.deepEqual([...out.skipped].sort(), ["fieldPost-noservice: no service", "fieldPost-nostory: no story"])
    assert.equal(c.calls.length, 0)
  })
  await check(`with less than ${NEEDS_MS / 1000} s of the route left it waits for the next run, and writes nothing`, async () => {
    const s = sanity([job()])
    const c = fakeClaude()
    const out = await draftProjectArticles(deps(s, c, fakeMail()), run, { deadline: Date.parse("2026-10-19T14:05:00Z") + NEEDS_MS - 1 })
    assert.equal(out.drafted.length, 0)
    assert.equal(out.waiting, 1)
    assert.equal(c.calls.length, 0)
  })
  await check("one article a run, oldest first", async () => {
    const s = sanity([job({ _id: "fieldPost-new", date: "2026-10-18" }), job({ _id: "fieldPost-old", date: "2026-10-10" })])
    const out = await draftProjectArticles(deps(s, fakeClaude(), fakeMail()), run)
    assert.equal(out.drafted.length, 1)
    assert.equal(out.drafted[0].fieldPost, "fieldPost-old")
    assert.equal(out.waiting, 1)
  })
  await check("another run's fresh claim: skipped; a stale one (a run Vercel stopped): taken over", async () => {
    const fresh = sanity([job(), { _id: "projectClaim-fieldPost-langley", _type: "projectClaim", createdAt: "2026-10-19T14:00:00Z" }])
    const c = fakeClaude()
    const out = await draftProjectArticles(deps(fresh, c, fakeMail()), run)
    assert.equal(out.drafted.length, 0)
    assert.equal(c.calls.length, 0)
    assert.ok(fresh.get("projectClaim-fieldPost-langley"), "the other run's claim is left alone")
    const stale = sanity([job(), { _id: "projectClaim-fieldPost-langley", _type: "projectClaim", createdAt: "2026-10-19T13:00:00Z" }])
    const out2 = await draftProjectArticles(deps(stale, fakeClaude(), fakeMail()), run)
    assert.equal(out2.drafted.length, 1)
    assert.equal(stale.get("projectClaim-fieldPost-langley"), undefined)
  })
  await check("Claude down: nothing written, the claim cleared, the editors told, tried again next run", async () => {
    const s = sanity([job()])
    const m = fakeMail()
    const out = await draftProjectArticles(deps(s, fakeClaude({ fail: new Error("Overloaded") }), m), run)
    assert.equal(out.failed.length, 1)
    assert.equal(s.created.filter((x) => x._type === "post").length, 0)
    assert.equal(s.dataset.filter((x) => x._type === "projectClaim").length, 0)
    assert.equal(s.get("fieldPost-langley")?.article, undefined)
    assert.match(m.sent[0].subject, /^Project article not written yet: Stamped asphalt in Langley, BC/)
  })

  await check("out of time once it's written: nothing saved, nobody told it's coming, written again next run", async () => {
    const s = sanity([job()])
    const m = fakeMail()
    const start = Date.parse("2026-10-19T15:00:00Z")
    let calls = 0
    const clock = () => new Date(calls++ === 0 ? start : start + NEEDS_MS - 5_000)
    const out = await draftProjectArticles({ claude: fakeClaude().claude, store: s.store, mail: m.mail, now: clock }, new Date(start), { deadline: start + NEEDS_MS + 1_000 })
    assert.equal(out.drafted.length, 0)
    assert.match(out.failed[0].error, /ran out of time after writing it/)
    assert.equal(s.created.filter((x) => x._type === "post").length, 0)
    assert.equal(s.get("fieldPost-langley")?.article, undefined)
  })

  console.log("\nThe article run (app/api/cron/project-articles)")

  await check("its own cron, daily at 15:00 UTC, an hour after the daily run", () => {
    const crons = (vercel as { crons: { path: string; schedule: string }[] }).crons
    assert.deepEqual(crons.find((c) => c.path === "/api/cron/project-articles"), { path: "/api/cron/project-articles", schedule: "0 15 * * *" })
    assert.deepEqual(crons.find((c) => c.path === "/api/cron/social-drafts"), { path: "/api/cron/social-drafts", schedule: "0 14 * * *" })
  })
  await check("refuses a call without the secret, and does nothing without its keys", async () => {
    const saved = { secret: process.env.CRON_SECRET, anthropic: process.env.ANTHROPIC_API_KEY }
    const call = (auth?: string) => projectArticlesRun(new NextRequest("https://www.squareonepaving.com/api/cron/project-articles", auth ? { headers: { authorization: auth } } : undefined))
    process.env.CRON_SECRET = "s3cret-for-tests"
    delete process.env.ANTHROPIC_API_KEY
    try {
      assert.equal((await call()).status, 401)
      assert.equal((await call("Bearer wrong")).status, 401)
      const res = await call("Bearer s3cret-for-tests")
      assert.equal(res.status, 200)
      assert.match(JSON.stringify(await res.json()), /not switched on: ANTHROPIC_API_KEY/)
    } finally {
      if (saved.secret === undefined) delete process.env.CRON_SECRET
      else process.env.CRON_SECRET = saved.secret
      if (saved.anthropic !== undefined) process.env.ANTHROPIC_API_KEY = saved.anthropic
    }
  })

  console.log("\nA post whose article keeps failing")

  const notUsable = () => new Error("Claude didn't finish the draft: it returned no save_draft call")
  const day = (n: number) => new Date(Date.parse("2026-10-19T15:00:00Z") + n * 86_400_000)
  const on = (s: ReturnType<typeof sanity>, c: ReturnType<typeof fakeClaude>, m: ReturnType<typeof fakeMail>, when: Date) => ({ claude: c.claude, store: s.store, mail: m.mail, now: () => when })

  await check("the first failure is emailed and starts the clock; the next mornings retry it quietly", async () => {
    const s = sanity([job()])
    const m = fakeMail()
    await draftProjectArticles(on(s, fakeClaude({ fail: notUsable() }), m, day(0)), day(0))
    assert.equal(m.sent.length, 1)
    assert.match(m.sent[0].subject, /^Project article not written yet: Stamped asphalt in Langley, BC/)
    assert.match(m.sent[0].text, /every day for up to 14 days; you'll only hear again if it gives up/)
    assert.equal(s.get("projectRetry-fieldPost-langley")?.firstFailedAt, day(0).toISOString())
    const c = fakeClaude({ fail: notUsable() })
    const out = await draftProjectArticles(on(s, c, m, day(1)), day(1))
    assert.equal(out.failed.length, 1)
    assert.equal(c.calls.length, 1, "tried again")
    assert.equal(m.sent.length, 1, "no second email")
    assert.equal(s.get("projectRetry-fieldPost-langley")?.firstFailedAt, day(0).toISOString(), "the clock isn't reset")
  })
  await check("a failing post goes behind a fresh one", async () => {
    const s = sanity([job({ _id: "fieldPost-old", date: "2026-10-01" }), job({ _id: "fieldPost-new", date: "2026-10-18" }), { _id: "projectRetry-fieldPost-old", _type: "projectRetry", fieldPost: "fieldPost-old", firstFailedAt: day(-1).toISOString() }])
    const out = await draftProjectArticles(on(s, fakeClaude(), fakeMail(), day(0)), day(0))
    assert.equal(out.drafted[0].fieldPost, "fieldPost-new")
  })
  await check(`after ${14} days of failures it gives up, with one email, and stops trying`, async () => {
    const s = sanity([job({ _updatedAt: day(-20).toISOString() }), { _id: "projectRetry-fieldPost-langley", _type: "projectRetry", fieldPost: "fieldPost-langley", firstFailedAt: day(-15).toISOString() }])
    const m = fakeMail()
    const out = await draftProjectArticles(on(s, fakeClaude({ fail: notUsable() }), m, day(0)), day(0))
    assert.equal(out.failed[0].gaveUp, true)
    assert.match(m.sent[0].subject, /^Project article given up: Stamped asphalt in Langley, BC/)
    assert.match(m.sent[0].text, /edit the Job photos post \(its story, say\) and the next morning's run tries once more/)
    const c = fakeClaude()
    const next = await draftProjectArticles(on(s, c, m, day(1)), day(1))
    assert.equal(c.calls.length, 0)
    assert.match(next.skipped[0], /given up after 14 days/)
    assert.equal(m.sent.length, 1)
  })
  await check("editing a post that was given up starts it over; a success clears its record", async () => {
    const s = sanity([job({ _updatedAt: day(1).toISOString() }), { _id: "projectRetry-fieldPost-langley", _type: "projectRetry", fieldPost: "fieldPost-langley", firstFailedAt: day(-15).toISOString(), gaveUpAt: day(0).toISOString() }])
    const out = await draftProjectArticles(on(s, fakeClaude(), fakeMail(), day(2)), day(2))
    assert.equal(out.drafted.length, 1)
    assert.equal(s.get("projectRetry-fieldPost-langley"), undefined)
  })
  await check("Claude taking too long counts against the post: its clock starts, so it can give up", async () => {
    const s = sanity([job()])
    const m = fakeMail()
    const out = await draftProjectArticles(on(s, fakeClaude({ fail: new Error("Request timed out.") }), m, day(0)), day(0))
    assert.equal(out.runError, undefined)
    assert.equal(s.get("projectRetry-fieldPost-langley")?.firstFailedAt, day(0).toISOString())
    assert.match(m.sent[0].subject, /^Project article not written yet:/)
  })
  await check("a refused key or no credit is the run's problem: emailed every time, and no post's clock starts", async () => {
    const s = sanity([job()])
    const m = fakeMail()
    const refused = () => Object.assign(new Error("401 authentication_error: invalid x-api-key"), { status: 401 })
    const out = await draftProjectArticles(on(s, fakeClaude({ fail: refused() }), m, day(0)), day(0))
    assert.match(String(out.runError), /authentication_error/)
    await draftProjectArticles(on(s, fakeClaude({ fail: refused() }), m, day(1)), day(1))
    assert.deepEqual(m.sent.map((x) => x.subject), ["Project article didn't run", "Project article didn't run"])
    assert.match(m.sent[0].text, /Anthropic refused ANTHROPIC_API_KEY/)
    assert.equal(s.get("projectRetry-fieldPost-langley"), undefined)
  })

  console.log(failures ? `\n${failures} failed` : "\nall passed")
  process.exit(failures ? 1 : 0)
}

main()
