/**
 * Tests for project posts and scheduled publishing
 * (lib/automation/project-posts.ts): `npm run test:project-posts`. No network:
 * Sanity, Claude and the email are stand-ins; the stand-in Sanity runs the
 * steps' real GROQ over an in-memory dataset (groq-js). Ported from
 * hubss.com's scripts/test-project-posts.ts, 20 Oct 2026.
 *
 * What they protect: a job's article says only what its post records and is
 * scheduled two weekdays out, never on a weekend or a day another article
 * has; it goes live by itself only when both checks are clean, it has a
 * photograph and the editors have been told; nothing is written twice; a
 * scheduled draft goes live on time, in one step, dated that day (an edit
 * keeps the post's date), and one that can't go is left and reported.
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
    fetch: async <T,>(query: string, params: Record<string, unknown> = {}) => (await (await evaluate(parse(query, { params }), { dataset, params })).get()) as T,
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
    publish: async (live, draftId) => {
      if (refusePublish) throw refusePublish
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
function fakeClaude(opts: { check?: FactCheck; title?: string; fail?: Error } = {}) {
  const calls: ToolRequest[] = []
  const claude: Claude = async <T,>(r: ToolRequest): Promise<T> => {
    calls.push(r)
    if (opts.fail) throw opts.fail
    if (r.tool.name === "save_draft")
      return {
        title: opts.title ?? "A stamped crosswalk for Langley's railway district",
        slug: "langley-stamped-crosswalk",
        excerpt: "What went into the stamped crosswalk in Langley.",
        tags: ["StreetPrint", "Langley"],
        body: "Square One stamped a crosswalk in Langley, BC.\n\n## What went in\n\nStreetPrint, in the brick pattern.",
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

const job = (over: Partial<JobPost & SanityDoc> = {}): SanityDoc => ({
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
  await check("never on a weekend: a Thursday's goes on the Monday", () => {
    assert.equal(scheduleSlot(new Date("2026-10-22T14:05:00Z")), "2026-10-26T14:00:00.000Z")
    assert.equal(scheduleSlot(new Date("2026-10-23T14:05:00Z")), "2026-10-26T14:00:00.000Z", "a Friday's: Sunday is skipped to Monday")
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
    body: [],
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
    assert.match(out.failed[0].error, /no title or no web address/)
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
  await check("the email didn't go: held, never scheduled, and the notes say why", async () => {
    const s = sanity([job()])
    const out = await draftProjectArticles(deps(s, fakeClaude(), fakeMail(false)), run)
    assert.equal(out.drafted[0].goesLive, "held")
    const doc = s.get("drafts.post-langley-stamped-crosswalk")
    assert.equal(doc?.scheduled, false)
    assert.match(String(doc?.editorNotes), /^HELD: not set to go live by itself, because the email about it could not be sent/)
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

  console.log(failures ? `\n${failures} failed` : "\nall passed")
  process.exit(failures ? 1 : 0)
}

main()
