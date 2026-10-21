/**
 * Tests for the parts of the blog and social automation that guard it:
 * `npm run test:automation`. No network: Sanity, Claude and the mail are
 * stand-ins. The stand-in Sanity runs the drafter's real GROQ queries over an
 * in-memory dataset (groq-js, the query engine the sanity package itself
 * installs), so the order the plan is read in is tested as written.
 *
 *  - The cron gate: nobody in without CRON_SECRET; a key missing is named.
 *  - What the drafter writes from: the Studio's version of a project, as the
 *    site shows it; never one taken off the site; the FACTS for each kind of
 *    article, never naming the manufacturer.
 *  - The drafter (14 Oct 2026): the top Ready item, else the top Idea; an
 *    unpublished draft only; the plan item marked Drafted; the email naming
 *    the next idea; an empty plan filled, not drafted; the planner after the
 *    email and only with time left; a run that can't draft says so by email,
 *    naming the key.
 */
import "./test-env"
import assert from "node:assert/strict"
import { NextRequest } from "next/server"
import { evaluate, parse } from "groq-js"
import { cronAuth, cronGate, cronReady } from "../lib/automation/cron"
import { factsBlock, loadSubjects, type Subject } from "../lib/automation/facts"
import { DRAFT_LOG, notifyNotConfigured, planProblem, runDrafter, TOP_UP_BEFORE_MS, type BlogDeps, type BlogResult } from "../lib/automation/blog"
import { failureHint } from "../lib/automation/outcome"
import { PROJECT_STORIES_TAG, QUESTIONS_BRIEF, ROUNDUP_BRIEF } from "../lib/automation/plan"
import { LIMITS } from "../lib/automation/drafter"
import { lintCopy } from "../lib/automation/style"
import type { Claude, Mail, SanityDoc, Store, ToolRequest } from "../lib/automation/services"
import { projects as RECORD } from "../lib/projects"
import { services } from "../lib/services"

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

const req = (auth?: string) =>
  new NextRequest("https://www.squareonepaving.com/api/cron/draft-post", auth ? { headers: { authorization: auth } } : undefined)

/** A store that answers the drafter's one query with these Studio projects. */
const store = (studio: unknown[]): Store => ({
  fetch: async <T,>() => studio as T,
  create: async () => {},
  createOrReplace: async () => {},
  patch: async () => {},
  createIfNotExists: async () => {},
  delete: async () => {},
  uploadImage: async () => null,
})

const seeded = (p: (typeof RECORD)[number], i: number) => ({
  _id: `project-${p.slug}`,
  _type: "project",
  slug: p.slug,
  title: p.title,
  application: p.application,
  service: p.service,
  systems: p.systems,
  city: p.city,
  region: p.region,
  ...(p.year ? { year: p.year } : {}),
  excerpt: p.excerpt,
  images: p.images.map((src, j) => ({ asset: `image-${i}-${j}`, alt: p.title, file: encodeURI(decodeURIComponent(src.split("/").pop() ?? "")) })),
  _createdAt: "2026-10-07T02:55:30Z",
})

// ── the stand-ins ────────────────────────────────────────────────────────────

/** The dataset as Sanity holds it: the record's projects, as seeded on 9 Oct 2026. */
function projectDocs(): SanityDoc[] {
  return RECORD.map((p, i) => ({
    _id: `project-${p.slug}`,
    _type: "project",
    _createdAt: "2026-10-09T05:40:00Z",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    application: p.application,
    service: p.service,
    systems: p.systems,
    city: p.city,
    region: p.region,
    ...(p.year ? { year: p.year } : {}),
    excerpt: p.excerpt,
    images: p.images.map((src, j) => ({ _key: `i${j}`, _type: "image", asset: { _type: "reference", _ref: `image-${i}-${j}-jpg` }, alt: `${p.title} photo ${j + 1}` })),
  }))
}

const ref = (slug: string, key = slug) => ({ _type: "reference", _ref: `project-${slug}`, _key: key })

/** A plan item, edited live (no "drafts." id). */
const item = (id: string, over: Record<string, unknown>): SanityDoc => ({ _id: id, _type: "storyIdea", _createdAt: "2026-10-14T12:00:00Z", status: "idea", priority: 2, ...over })

/** Sanity, in memory: the real GROQ over the dataset; create refuses a taken id (409), like Sanity. */
function sanity(docs: SanityDoc[]) {
  const dataset: SanityDoc[] = docs.map((d) => structuredClone(d))
  const created: SanityDoc[] = []
  const patched: { id: string; set: Record<string, unknown> }[] = []
  const uploads: string[] = []
  const deleted: string[] = []
  const s: Store = {
    fetch: async <T,>(query: string, params: Record<string, unknown> = {}) => (await (await evaluate(parse(query, { params }), { dataset, params })).get()) as T,
    create: async (doc) => {
      if (dataset.some((d) => d._id === doc._id)) throw Object.assign(new Error(`Document by ID "${doc._id}" already exists`), { statusCode: 409 })
      dataset.push(structuredClone(doc))
      created.push(doc)
    },
    createOrReplace: async (doc) => {
      const i = dataset.findIndex((d) => d._id === doc._id)
      if (i >= 0) dataset[i] = structuredClone(doc)
      else dataset.push(structuredClone(doc))
      created.push(doc)
    },
    patch: async (id, set) => {
      const d = dataset.find((x) => x._id === id)
      if (!d) throw Object.assign(new Error(`The document "${id}" was not found`), { statusCode: 404 })
      Object.assign(d, structuredClone(set))
      patched.push({ id, set })
    },
    createIfNotExists: async (doc) => {
      if (!dataset.some((d) => d._id === doc._id)) {
        dataset.push(structuredClone(doc))
        created.push(doc)
      }
    },
    delete: async (id) => {
      const i = dataset.findIndex((d) => d._id === id)
      if (i >= 0) dataset.splice(i, 1)
      deleted.push(id)
    },
    uploadImage: async (url) => {
      uploads.push(url)
      return "image-uploaded-1200x800-jpg"
    },
  }
  return { store: s, dataset, created, patched, uploads, deleted }
}

/** Claude, answering each tool with what a good run sends back; `fail` throws on that tool. */
function fakeClaude(opts: { ideas?: unknown[]; fail?: { tool: string; error: Error } } = {}) {
  const calls: ToolRequest[] = []
  const claude: Claude = async <T,>(r: ToolRequest): Promise<T> => {
    calls.push(r)
    if (opts.fail && opts.fail.tool === r.tool.name) throw opts.fail.error
    switch (r.tool.name) {
      case "save_draft":
        return {
          title: "Rainbow intersection in Nanaimo",
          slug: "rainbow-intersection-nanaimo",
          excerpt: "What went into the rainbow intersection in Nanaimo.",
          tags: ["TrafficPatternsXD", "Nanaimo"],
          body: "Square One installed a rainbow intersection in Nanaimo.\n\n## How it went down\n\nThe crew heat-fused the sheets in place.",
          factsUsed: ["Place: Nanaimo, BC"],
        } as T
      case "save_rewrites":
        return { rewrites: [] } as T
      case "report":
        return { verdict: "clean", unsupported: [] } as T
      case "propose_ideas":
        return { ideas: opts.ideas ?? [] } as T
      default:
        throw new Error(`unexpected tool ${r.tool.name}`)
    }
  }
  return { claude, calls, tools: () => calls.map((c) => c.tool.name) }
}

function fakeMail() {
  const sent: Mail[] = []
  const mail = async (m: Mail) => {
    sent.push(m)
    return true
  }
  return { mail, sent }
}

/** A clock that moves on `step` ms each time it's read (the drafter reads it at the start, for the date, and before topping up). */
function clock(step = 1000) {
  let t = Date.parse("2026-10-15T13:00:00Z")
  return () => {
    const d = new Date(t)
    t += step
    return d
  }
}

const guideIdeas = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    kind: "guide",
    title: ["Looking after a coloured fire lane", "Stamping a parking lot walkway", "Colour for a spray park surface", "A school court that survives recess"][i % 4],
    searchPhrase: ["fire lane upkeep", "parking lot walkway", "spray park surface", "school court coating"][i % 4],
    services: ["decorative-coatings"],
    applications: [["streetscapes", "parking-lots", "parks-paths", "schools-sports-courts"][i % 4]],
    questions: ["What does the coating have to do in a wet winter?", "How is it looked after once it is down?", "What has to be true of the asphalt first?"],
  }))

async function run(docs: SanityDoc[], opts: { idea?: string; project?: string } = {}, c = fakeClaude(), step = 1000) {
  const s = sanity(docs)
  const m = fakeMail()
  const deps: BlogDeps = { claude: c.claude, store: s.store, mail: m.mail, now: clock(step) }
  const result: BlogResult = await runDrafter(opts, deps)
  return { result, ...s, ...m, claude: c }
}

async function main() {
  process.env.BLOG_DRAFT_NOTIFY = "editor@example.com"

  console.log("the cron gate")
  const saved = process.env.CRON_SECRET
  delete process.env.CRON_SECRET
  await check("no CRON_SECRET: everyone refused, nothing said about why", async () => {
    const res = cronGate(req("Bearer anything"), "test", [])
    assert.equal(res?.status, 401)
    assert.ok(!JSON.stringify(await res?.json()).includes("CRON_SECRET"))
    assert.equal(cronAuth(req("Bearer anything"), "test")?.status, 401)
  })
  process.env.CRON_SECRET = "s3cret-for-tests"
  await check("a wrong or missing secret: 401", () => {
    assert.equal(cronGate(req("Bearer wrong"), "test", [])?.status, 401)
    assert.equal(cronGate(req(), "test", [])?.status, 401)
    assert.equal(cronAuth(req("Bearer wrong"), "test")?.status, 401)
  })
  await check("the right secret with a key missing: does nothing and names the key", async () => {
    const res = cronGate(req("Bearer s3cret-for-tests"), "test", ["SOME_KEY_THAT_IS_NOT_SET"])
    assert.equal(res?.status, 200)
    assert.match(JSON.stringify(await res?.json()), /not switched on/)
    assert.equal(cronAuth(req("Bearer s3cret-for-tests"), "test"), null)
    assert.deepEqual(cronReady("test", ["SOME_KEY_THAT_IS_NOT_SET"])?.missing, ["SOME_KEY_THAT_IS_NOT_SET"])
  })
  await check("paused: does nothing, and no key is named (nobody is emailed)", () => {
    process.env.AUTOMATION_PAUSED = "1"
    assert.deepEqual(cronReady("test", ["SOME_KEY_THAT_IS_NOT_SET"])?.missing, [])
    delete process.env.AUTOMATION_PAUSED
  })
  await check("the right secret and every key: through the gate", () => {
    process.env.AUTOMATION_TEST_KEY = "x"
    assert.equal(cronGate(req("Bearer s3cret-for-tests"), "test", ["AUTOMATION_TEST_KEY"]), null)
    assert.equal(cronReady("test", ["AUTOMATION_TEST_KEY"]), null)
  })
  if (saved === undefined) delete process.env.CRON_SECRET
  else process.env.CRON_SECRET = saved

  console.log("what the drafter writes from")
  await check("the Studio as seeded: the record's words, the Studio's photos with their web paths", async () => {
    const subjects = await loadSubjects(store(RECORD.map(seeded)))
    const first = subjects.find((s) => s.slug === RECORD[0].slug)!
    assert.equal(first.title, RECORD[0].title)
    assert.deepEqual(first.story, RECORD[0].story ?? [])
    assert.deepEqual(first.photos.map((p) => p.src), RECORD[0].images)
    assert.ok(first.photos.every((p) => p.asset))
    assert.equal(first.docId, `project-${RECORD[0].slug}`)
    assert.equal(subjects.length, RECORD.length)
  })
  await check("a summary edited in the Studio is what the drafter reads", async () => {
    const docs = RECORD.map(seeded)
    docs[0] = { ...docs[0], excerpt: "Edited in the Studio." }
    assert.equal((await loadSubjects(store(docs))).find((s) => s.slug === RECORD[0].slug)!.excerpt, "Edited in the Studio.")
  })
  await check("a project taken off the site is never a subject", async () => {
    const docs: Record<string, unknown>[] = RECORD.map(seeded)
    docs[2] = { ...docs[2], hidden: true }
    docs.push({ _id: "p-new", slug: "studio-only", title: "New job", city: "Surrey, BC", excerpt: "A new job.", hidden: true, images: [{ asset: "image-x" }] })
    const subjects = await loadSubjects(store(docs))
    assert.ok(!subjects.some((s) => s.slug === RECORD[2].slug || s.slug === "studio-only"))
  })
  await check("a blog post picked in the Studio counts as 'already has a post'", async () => {
    const docs: Record<string, unknown>[] = [{ _id: "p-new", slug: "studio-only", title: "New job", city: "Surrey, BC", excerpt: "A new job.", post: "the-story", images: [{ asset: "image-x" }] }]
    assert.equal((await loadSubjects(store(docs))).find((s) => s.slug === "studio-only")?.post, "the-story")
  })
  await check("no Studio at all: the record", async () => {
    const subjects = await loadSubjects(store([]))
    assert.equal(subjects.length, RECORD.length)
    assert.deepEqual(subjects.find((s) => s.slug === RECORD[0].slug)!.photos.map((p) => p.src), RECORD[0].images)
  })
  const subjects: Subject[] = await loadSubjects(store(RECORD.map(seeded)))
  const job = (slug: string) => subjects.find((s) => s.slug === slug)!
  await check("the FACTS never name the manufacturer, for any kind of article", () => {
    const all = [
      ...subjects.map((s) => factsBlock({ kind: "project", subjects: [s], services })),
      factsBlock({ kind: "roundup", subjects: subjects.slice(0, 6), services }),
      factsBlock({
        kind: "guide",
        subjects: [],
        services,
        guide: { services: services.map((s) => s.slug), systems: ["streetprint", "streetbond", "trafficpatterns", "trafficpatterns-xd", "decomark", "durashield", "duratherm", "premark"], applications: ["crosswalks", "streetscapes", "roundabouts", "parking-lots", "parks-paths", "schools-sports-courts", "bike-lanes", "public-art", "branding-wayfinding", "driveways"] },
      }),
    ]
    for (const f of all) assert.doesNotMatch(f, /\bHUB\b|Surface Systems|hubss/i)
  })
  await check("a roundup's FACTS hold each job's record, numbered; a guide's hold its pages and the questions apart", () => {
    const r = factsBlock({ kind: "roundup", subjects: [job("nanaimo-rainbow-intersection"), job("langley-railroad-crosswalk"), job("white-rock-custom-crosswalk")], services })
    assert.match(r, /JOB 1:[\s\S]*Rainbow intersection[\s\S]*JOB 2:[\s\S]*JOB 3:/)
    assert.match(r, /add nothing about any of them/)
    const g = factsBlock({
      kind: "guide",
      subjects: [],
      services,
      guide: { services: ["stamped-asphalt"], systems: ["streetprint"], applications: ["driveways", "parking-lots"] },
      brief: `${QUESTIONS_BRIEF}\n- What has to be true of an old driveway before it is stamped?`,
    })
    assert.match(g, /THE SERVICE, as the site publishes it \(Stamped Asphalt; page: \/services\/stamped-asphalt\)/)
    assert.match(g, /THE SYSTEM, as the site publishes it \(StreetPrint®; page: \/products\/streetprint/)
    assert.match(g, /THE DRIVEWAYS PAGE[\s\S]*Can you install stamped asphalt over my existing driveway/)
    assert.match(g, /THE KIND OF WORK, as the site publishes it \(Parking lots; page: \/applications\/parking-lots\)/)
    assert.match(g, /QUESTIONS TO ANSWER \(from the planner: these are NOT facts[\s\S]*- What has to be true of an old driveway/)
  })

  await check("a planner's roundup brief (an old copy of the records) is left out: the records as they stand today are the facts", () => {
    const brief = [ROUNDUP_BRIEF, "- Maple Ridge Spray Park (Maple Ridge, BC). Installed at: a client since corrected."].join("\n")
    const f = factsBlock({ kind: "roundup", subjects: [job("nanaimo-rainbow-intersection"), job("langley-railroad-crosswalk"), job("white-rock-custom-crosswalk")], services, brief })
    assert.doesNotMatch(f, /FROM SQUARE ONE'S EDITOR/)
    assert.doesNotMatch(f, /a client since corrected/)
  })
  await check("no warranty wording in the FACTS or the rules, and the style check flags any", () => {
    for (const s of subjects.slice(0, 3)) assert.doesNotMatch(factsBlock({ kind: "project", subjects: [s], services }), /warrant/i)
    assert.ok(lintCopy("The manufacturer warrants the material; Square One warrants the workmanship.").some((i) => i.rule === "promise"))
  })
  await check("the style check catches the manufacturer in any case, never a transit hub", () => {
    assert.ok(lintCopy("It came from hub surface systems.").some((i) => i.rule === "maker"))
    assert.ok(lintCopy("A HUB product.").some((i) => i.rule === "maker"))
    assert.ok(!lintCopy("Built for a busy transit hub.").some((i) => i.rule === "maker"))
  })

  console.log("which plan item")
  const base = projectDocs()
  await check("the top Ready item, before any Idea, whatever their priority", async () => {
    const { result, patched } = await run([
      ...base,
      item("storyIdea-a", { title: "Idea at priority 1", type: "project", priority: 1, projects: [ref("langley-railroad-crosswalk")] }),
      item("storyIdea-b", { title: "Ready at priority 3", type: "project", status: "ready", priority: 3, projects: [ref("nanaimo-rainbow-intersection")] }),
    ])
    assert.ok(result.drafted, JSON.stringify(result))
    assert.equal(result.drafted && result.idea, "storyIdea-b")
    assert.equal(result.drafted && result.picked, "ready")
    assert.deepEqual(patched.map((p) => p.id), ["storyIdea-b"])
  })
  await check("with nothing Ready, the top Idea: priority, then age, then id; never a draft, a dropped or a drafted item", async () => {
    const { result } = await run([
      ...base,
      item("storyIdea-c", { title: "Older, priority 2", type: "project", _createdAt: "2026-10-14T09:00:00Z", projects: [ref("langley-railroad-crosswalk")] }),
      item("storyIdea-b", { title: "Newer, priority 1", type: "project", priority: 1, _createdAt: "2026-10-14T11:00:00Z", projects: [ref("nanaimo-rainbow-intersection")] }),
      item("storyIdea-a", { title: "Dropped, priority 1", type: "project", status: "dropped", priority: 1, projects: [ref("white-rock-custom-crosswalk")] }),
      item("storyIdea-0", { title: "Drafted, priority 1", type: "project", status: "drafted", priority: 1, projects: [ref("maple-ridge-spray-park")] }),
      item("drafts.storyIdea-z", { title: "A stray draft", type: "project", status: "ready", priority: 1, projects: [ref("osoyoos-park-pathway")] }),
    ])
    assert.equal(result.drafted && result.idea, "storyIdea-b")
    assert.equal(result.drafted && result.picked, "next idea")
    const tie = await run([
      ...base,
      item("storyIdea-seed-02-x", { title: "Second", type: "project", projects: [ref("langley-railroad-crosswalk")] }),
      item("storyIdea-seed-01-x", { title: "First", type: "project", projects: [ref("nanaimo-rainbow-intersection")] }),
    ])
    assert.equal(tie.result.drafted && tie.result.idea, "storyIdea-seed-01-x", "items made in the same second go in id order")
  })
  await check("an item that can't be written is passed over, named in the email, and left as it is", async () => {
    const withPost = RECORD.find((p) => p.post)!
    const { result, sent, patched } = await run([
      ...base,
      item("storyIdea-a", { title: "A job that has its post", type: "project", status: "ready", projects: [ref(withPost.slug)] }),
      item("storyIdea-b", { title: "A roundup of two", type: "roundup", status: "ready", projects: [ref("nanaimo-rainbow-intersection"), ref("langley-railroad-crosswalk")] }),
      item("storyIdea-c", { title: "A guide with nothing ticked", type: "guide", status: "ready" }),
      item("storyIdea-d", { title: "The one that can", type: "project", projects: [ref("white-rock-custom-crosswalk")] }),
    ])
    assert.equal(result.drafted && result.idea, "storyIdea-d")
    assert.equal(result.drafted && result.passedOver.length, 3)
    assert.deepEqual(patched.map((p) => p.id), ["storyIdea-d"])
    assert.match(sent[0].text, /Passed over: "A job that has its post" \("[^"]+" already has a post\); "A roundup of two" \(a roundup needs 3 projects on the site; it has 2\); "A guide with nothing ticked"/)
  })
  await check("planProblem: a story needs one job on the site with a photo and no post; a roundup three; a guide a page", () => {
    const bySlug = new Map(subjects.map((s) => [s.slug, s]))
    assert.equal(planProblem({ _id: "x", title: "t", type: "project", projects: ["nanaimo-rainbow-intersection"] }, bySlug), null)
    assert.match(planProblem({ _id: "x", title: "t", type: "project", projects: [] }, bySlug) ?? "", /exactly one/)
    assert.match(planProblem({ _id: "x", title: "t", type: "project", projects: [null] }, bySlug) ?? "", /off the site/)
    assert.match(planProblem({ _id: "x", title: "t", type: "project", projects: ["no-such-job"] }, bySlug) ?? "", /off the site/)
    assert.equal(planProblem({ _id: "x", title: "t", type: "roundup", projects: ["nanaimo-rainbow-intersection", "langley-railroad-crosswalk", "white-rock-custom-crosswalk"] }, bySlug), null)
    assert.equal(planProblem({ _id: "x", title: "t", type: "guide", applications: ["driveways"] }, bySlug), null)
    assert.match(planProblem({ _id: "x", title: "t", type: "guide", systems: ["airmark"] }, bySlug) ?? "", /ticked/)
    assert.match(planProblem({ _id: "x", title: " ", type: "guide", applications: ["driveways"] }, bySlug) ?? "", /working title/)
    assert.match(planProblem({ _id: "x", title: "t", type: "case-study" }, bySlug) ?? "", /kind of article/)
  })

  console.log("the draft")
  await check("a project story: unpublished, dated, filed under its kind of work and Project stories, its photo, the plan item marked Drafted", async () => {
    const { result, created, patched, dataset, claude } = await run([
      ...base,
      item("storyIdea-a", { title: "Rainbow intersection, Nanaimo", type: "project", status: "ready", searchPhrase: "rainbow crosswalk", projects: [ref("nanaimo-rainbow-intersection")] }),
      item("storyIdea-b", { title: "Next one", type: "project", projects: [ref("langley-railroad-crosswalk")] }),
    ])
    assert.ok(result.drafted)
    const doc = created.find((d) => d._type === "post")!
    assert.equal(doc._id, "drafts.post-rainbow-intersection-nanaimo", "a draft id: the site never reads it")
    assert.ok(!dataset.some((d) => d._id === "post-rainbow-intersection-nanaimo"), "nothing published")
    assert.equal(doc.date, "2026-10-15")
    assert.equal(doc.category, "Crosswalks")
    assert.equal((doc.tags as string[])[0], PROJECT_STORIES_TAG)
    assert.equal((doc.mainImage as { asset: { _ref: string } }).asset._ref, `image-${RECORD.findIndex((p) => p.slug === "nanaimo-rainbow-intersection")}-0-jpg`, "the job's own lead photograph, already in Sanity")
    assert.match(String(doc.editorNotes), /from the Blog plan item "Rainbow intersection, Nanaimo"/)
    assert.deepEqual(patched[0].set.status, "drafted")
    assert.equal(patched[0].set.draftSlug, "rainbow-intersection-nanaimo")
    assert.ok(created.some((d) => d._id === `${DRAFT_LOG}nanaimo-rainbow-intersection`), "the job is logged")
    const write = claude.calls.find((c) => c.tool.name === "save_draft")!
    assert.match(write.user, /A PROJECT STORY/)
    assert.match(write.user, /SEARCH PHRASE: rainbow crosswalk/)
    assert.match(write.user, /THE PROJECT:[\s\S]*Place: Nanaimo, BC/)
    assert.deepEqual(claude.tools(), ["save_draft", "report", "propose_ideas"], "no style rewrite when nothing breaks the style; the plan is low, so the planner runs last")
  })
  await check("the email names the draft, where it came from, what's left and the next idea", async () => {
    const { sent } = await run([
      ...base,
      item("storyIdea-a", { title: "Rainbow intersection, Nanaimo", type: "project", projects: [ref("nanaimo-rainbow-intersection")] }),
      item("storyIdea-b", { title: "Railroad crosswalk, Langley", type: "project", projects: [ref("langley-railroad-crosswalk")] }),
    ])
    assert.equal(sent.length, 1)
    assert.deepEqual(sent[0].to, ["editor@example.com"])
    assert.equal(sent[0].subject, "Blog draft ready in Studio: Rainbow intersection in Nanaimo")
    assert.match(sent[0].text, /From the plan: "Rainbow intersection, Nanaimo" \(the next Idea; nothing was marked Ready\)\./)
    assert.match(sent[0].text, /The plan is running low: 1 item left\./)
    assert.match(sent[0].text, /Next up: "Railroad crosswalk, Langley"\./)
    assert.match(sent[0].text, /Open it: https:\/\/www\.squareonepaving\.com\/studio\/intent\/edit\/id=post-rainbow-intersection-nanaimo;type=post/)
  })
  await check("a roundup: every job's record in the FACTS, the first job's photo as a stand-in, Project stories", async () => {
    const { result, created, claude } = await run([
      ...base,
      item("storyIdea-r", { title: "Crosswalks with a story behind them", type: "roundup", projects: [ref("nanaimo-rainbow-intersection", "a"), ref("langley-railroad-crosswalk", "b"), ref("white-rock-custom-crosswalk", "c")] }),
    ])
    assert.ok(result.drafted && result.kind === "roundup")
    const doc = created.find((d) => d._type === "post")!
    assert.equal(doc.category, "Crosswalks")
    assert.equal((doc.tags as string[])[0], PROJECT_STORIES_TAG)
    assert.match(String(doc.editorNotes), /PHOTO: a stand-in, the lead photograph of "Rainbow intersection, Nanaimo"/)
    const write = claude.calls.find((c) => c.tool.name === "save_draft")!
    assert.match(write.user, /A PROJECT ROUNDUP/)
    assert.match(write.user, /JOB 1:[\s\S]*JOB 2:[\s\S]*JOB 3:/)
    assert.ok(!created.some((d) => String(d._id).startsWith(DRAFT_LOG)), "a roundup logs no single job")
  })
  await check("a guide: its pages and the questions apart in the FACTS, filed under Guides, the service page's photo as a stand-in", async () => {
    const { result, created, claude, uploads } = await run([
      ...base,
      item("storyIdea-g", {
        title: "Stamping the driveway you already have",
        type: "guide",
        services: ["stamped-asphalt"],
        systems: ["streetprint"],
        applications: ["driveways"],
        brief: `${QUESTIONS_BRIEF}\n- What has to be true of an old driveway before it is stamped?\n- How is a stamped driveway looked after?`,
      }),
    ])
    assert.ok(result.drafted && result.kind === "guide")
    const doc = created.find((d) => d._type === "post")!
    assert.equal(doc.category, "Guides")
    assert.ok(!(doc.tags as string[]).includes(PROJECT_STORIES_TAG))
    assert.match(String(doc.editorNotes), /PHOTO: a stand-in, the stamped asphalt page's photograph/)
    assert.equal(uploads.length, 1)
    assert.ok(uploads[0].startsWith("https://www.squareonepaving.com/images/"), uploads[0])
    const write = claude.calls.find((c) => c.tool.name === "save_draft")!
    assert.match(write.user, /A GUIDE/)
    assert.match(write.user, /THE DRIVEWAYS PAGE/)
    assert.match(write.user, /QUESTIONS TO ANSWER \(from the planner: these are NOT facts/)
    const report = claude.calls.find((c) => c.tool.name === "report")!
    assert.match(report.system, /QUESTIONS in the FACTS are not facts/)
  })
  await check("each Claude call has a time limit inside the route's 300 s, and no retries", async () => {
    const { claude } = await run([...base, item("storyIdea-a", { title: "Rainbow intersection, Nanaimo", type: "project", projects: [ref("nanaimo-rainbow-intersection")] })])
    const by = (tool: string) => claude.calls.find((c) => c.tool.name === tool)!
    assert.equal(by("save_draft").timeoutMs, LIMITS.write)
    assert.equal(by("report").timeoutMs, LIMITS.check)
    assert.ok(claude.calls.every((c) => c.maxRetries === 0))
    assert.ok(LIMITS.write + LIMITS.rewrite + LIMITS.check <= 260_000)
  })
  await check("a web address a post had, or its id, is never drafted over", async () => {
    const moved: SanityDoc = { _id: "post-rainbow-intersection-nanaimo", _type: "post", title: "An old post whose web address changed", slug: { _type: "slug", current: "another-address" } }
    const { result, created } = await run([...base, moved, item("storyIdea-a", { title: "Rainbow intersection, Nanaimo", type: "project", projects: [ref("nanaimo-rainbow-intersection")] })])
    assert.equal(result.drafted && result.slug, "rainbow-intersection-nanaimo-2")
    assert.ok(created.some((d) => d._id === "drafts.post-rainbow-intersection-nanaimo-2"))
  })
  await check("once the draft exists, a later failure never turns into a 'no draft' email", async () => {
    const docs = [...base, item("storyIdea-a", { title: "Rainbow intersection, Nanaimo", type: "project", projects: [ref("nanaimo-rainbow-intersection")] })]
    const s = sanity(docs)
    const m = fakeMail()
    const realFetch = s.store.fetch
    s.store.patch = async () => {
      throw new Error("Sanity said no")
    }
    s.store.createOrReplace = async () => {
      throw new Error("Sanity said no again")
    }
    s.store.fetch = async <T,>(q: string, p?: Record<string, unknown>) => {
      if (q.includes('"ideasLeft"')) throw new Error("count failed")
      return realFetch<T>(q, p)
    }
    const result = await runDrafter({}, { claude: fakeClaude().claude, store: s.store, mail: m.mail, now: clock() })
    assert.ok(result.drafted, JSON.stringify(result))
    assert.equal(m.sent.length, 1)
    assert.match(m.sent[0].subject, /Blog draft ready/)
    assert.match(m.sent[0].text, /couldn't be marked Drafted \(Sanity said no\)/)
    const throwing = await runDrafter({}, {
      claude: fakeClaude().claude,
      store: sanity(docs).store,
      mail: async () => {
        throw new Error("Resend is down")
      },
      now: clock(),
    })
    assert.ok(throwing.drafted && throwing.notified.length === 0, "drafted, with nobody told")
  })
  await check("asked for by id: that item, whatever its status; one that can't be written is refused, quietly", async () => {
    const asked = await run([...base, item("storyIdea-x", { title: "Again", type: "project", status: "drafted", projects: [ref("nanaimo-rainbow-intersection")] })], { idea: "storyIdea-x" })
    assert.equal(asked.result.drafted && asked.result.picked, "asked for")
    const refused = await run([...base, item("storyIdea-y", { title: "Nothing ticked", type: "guide" })], { idea: "storyIdea-y" })
    assert.equal(refused.result.drafted, false)
    assert.equal(refused.sent.length, 0)
    const missing = await run(base, { idea: "storyIdea-nope" })
    assert.match(!missing.result.drafted ? missing.result.reason : "", /no plan item/)
  })
  await check("one project by name, outside the plan: a project story, the plan untouched", async () => {
    const { result, patched } = await run([...base, item("storyIdea-a", { title: "Other", type: "project", projects: [ref("langley-railroad-crosswalk")] })], { project: "nanaimo-rainbow-intersection" })
    assert.equal(result.drafted && result.picked, "project")
    assert.equal(patched.length, 0)
  })

  console.log("the plan keeps itself stocked")
  await check("an empty plan is filled, not drafted, and the editor is told", async () => {
    const c = fakeClaude({ ideas: guideIdeas(4) })
    const { result, created, sent } = await run(base, {}, c)
    assert.equal(result.drafted, false)
    assert.equal(!result.drafted && result.planAdded?.length, 4)
    assert.ok(!created.some((d) => d._type === "post"), "no draft")
    assert.deepEqual(c.tools(), ["propose_ideas"])
    assert.equal(sent.length, 1)
    assert.match(sent[0].text, /the Blog plan was empty, so this run added 4 new ideas/)
    assert.match(sent[0].text, /Look them over in Studio → Blog plan/)
  })
  await check("a low plan is topped up after the email, at the bottom, as Ideas", async () => {
    const c = fakeClaude({ ideas: guideIdeas(4) })
    const { result, created, sent } = await run([...base, item("storyIdea-a", { title: "Rainbow intersection, Nanaimo", type: "project", projects: [ref("nanaimo-rainbow-intersection")] })], {}, c)
    assert.ok(result.drafted)
    assert.deepEqual(c.tools(), ["save_draft", "report", "propose_ideas"], "the planner runs last")
    assert.equal(sent.length, 1, "one email, sent before the planner")
    const ideas = created.filter((d) => d._type === "storyIdea")
    assert.equal(ideas.length, 4)
    assert.ok(ideas.every((d) => d.status === "idea" && d.priority === 3))
  })
  await check("no time left: the plan waits for the next run", async () => {
    const c = fakeClaude({ ideas: guideIdeas(2) })
    const { result } = await run([...base, item("storyIdea-a", { title: "One", type: "project", projects: [ref("nanaimo-rainbow-intersection")] })], {}, c, TOP_UP_BEFORE_MS)
    assert.ok(result.drafted)
    assert.ok(!c.tools().includes("propose_ideas"))
  })
  await check("the planner failing costs neither the draft nor its email", async () => {
    const c = fakeClaude({ fail: { tool: "propose_ideas", error: new Error("529 overloaded_error") } })
    const { result, sent } = await run([...base, item("storyIdea-a", { title: "One", type: "project", projects: [ref("nanaimo-rainbow-intersection")] })], {}, c)
    assert.ok(result.drafted)
    assert.equal(sent.length, 1)
    assert.match(sent[0].subject, /Blog draft ready/)
  })

  console.log("fail loud")
  await check("Anthropic refuses the key: no draft, nothing marked, an email naming ANTHROPIC_API_KEY", async () => {
    const c = fakeClaude({ fail: { tool: "save_draft", error: new Error('401 {"type":"error","error":{"type":"authentication_error","message":"invalid x-api-key"}}') } })
    const { result, created, patched, sent } = await run([...base, item("storyIdea-a", { title: "One", type: "project", projects: [ref("nanaimo-rainbow-intersection")] })], {}, c)
    assert.equal(result.drafted, false)
    assert.equal(!result.drafted && result.error, true)
    assert.equal(created.length, 0)
    assert.equal(patched.length, 0)
    assert.equal(sent.length, 1)
    assert.equal(sent[0].subject, "Blog drafter: no draft this time")
    assert.match(sent[0].text, /What to do: Anthropic refused ANTHROPIC_API_KEY/)
  })
  await check("each refusal names its own key", () => {
    assert.match(failureHint(Object.assign(new Error("Unauthorized - Session not found"), { statusCode: 401 })), /SANITY_API_WRITE_TOKEN/)
    assert.match(failureHint(Object.assign(new Error('Insufficient permissions; permission "create" required'), { statusCode: 403 })), /Editor role/)
    assert.match(failureHint(new Error("SANITY_API_WRITE_TOKEN is not set on this server")), /^SANITY_API_WRITE_TOKEN is missing in Vercel/)
    assert.match(failureHint(new Error("Not configured: ANTHROPIC_API_KEY, SANITY_API_WRITE_TOKEN")), /^ANTHROPIC_API_KEY and SANITY_API_WRITE_TOKEN are missing/)
    assert.match(failureHint(new Error("Your credit balance is too low to access the Anthropic API")), /spend limit/)
    assert.match(failureHint(new Error('404 {"type":"error","error":{"type":"not_found_error","message":"model: claude-opus-4-5"}}')), /BLOG_DRAFT_MODEL/)
    assert.match(failureHint(new Error("Buffer API 401: Unauthorized")), /BUFFER_API_KEY/)
    assert.match(failureHint(new Error("something odd")), /Logs, filtered on \[blog\]/)
    assert.match(failureHint(new Error("Request timed out.")), /Claude took too long/)
    assert.doesNotMatch(failureHint(new Error("Socket timed out on request to https://g4yp3p0k.api.sanity.io")), /Claude/)
  })
  await check("a stuck plan (nothing can be written) emails what to fix", async () => {
    const { result, sent } = await run([...base, item("storyIdea-a", { title: "Nothing ticked", type: "guide" })])
    assert.equal(result.drafted, false)
    assert.equal(sent.length, 1)
    assert.match(sent[0].text, /none of the 1 open item in the Blog plan can be drafted: "Nothing ticked"/)
  })
  await check("a key missing in Vercel: the email names it", async () => {
    const m = fakeMail()
    assert.equal(await notifyNotConfigured(m.mail, ["ANTHROPIC_API_KEY"]), true)
    assert.match(m.sent[0].text, /What to do: ANTHROPIC_API_KEY is missing in Vercel \(Production\)\. Add it and redeploy\./)
  })

  if (failures) {
    console.log(`\n${failures} failed`)
    process.exit(1)
  }
  console.log("\nall passed")
}

main()
