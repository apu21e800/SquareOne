/**
 * Tests for the drafter's standard (lib/automation/drafter.ts SHAPE, the
 * documented jobs in lib/automation/facts.ts, the lead photograph in
 * lib/automation/blog.ts): `npm run test:drafter`. No network. Ported from
 * hubss.com's scripts/test-drafter-standard.ts, 20 Oct 2026.
 *
 * What they protect: an article opens on a real Square One job (town and
 * province) when one fits, and that job's photograph is the article's;
 * the jobs a guide is offered are Square One's own, on the site, the closest
 * first; the shape the drafter is held to is the 20 Oct standard (550 to 850
 * words, 350 to 600 for a story, proof before explanation, one thing to keep,
 * no villain, no "vs"); a "vs" title or heading never gets through the
 * style check or the planner; only a clear "clean" from the fact check
 * passes; and a phone number, email or address that isn't Square One's, or a
 * tag against the canon, never reaches a live post unread (review, 20 Oct).
 */
import "./test-env"
import assert from "node:assert/strict"
import { DOCUMENTED_JOBS_HEADING, DOCUMENTED_JOBS_MAX, documentedJobs, factsBlock, jobFacts, jobPlace, loadSubjects, type Subject } from "../lib/automation/facts"
import { readFactCheck, SAVE_DRAFT, SHAPES, VOICE, writeDraft, type Draft } from "../lib/automation/drafter"
import { buildDraftDocument, leadJobFor } from "../lib/automation/blog"
import { flagSentences, keepsFacts, lintCopy, lintHeading, tagPasses } from "../lib/automation/style"
import { goodQuestion, VS, vetIdeas } from "../lib/automation/planner"
import { services as RECORD_SERVICES } from "../lib/services"
import type { Claude, Store, ToolRequest } from "../lib/automation/services"

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

/** No Studio: the record's projects, as the site shows them without Sanity. */
const empty: Store = {
  fetch: async <T,>() => [] as T,
  create: async () => {},
  createOrReplace: async () => {},
  patch: async () => {},
  createIfNotExists: async () => {},
  delete: async () => {},
  publish: async () => {},
  uploadImage: async () => null,
}

const subject = (over: Partial<Subject>): Subject => ({
  slug: "x",
  title: "X",
  city: "Langley, BC",
  region: "Lower Mainland",
  application: "Crosswalks",
  service: "Preformed Thermoplastic",
  systems: ["TrafficPatterns"],
  excerpt: "A crosswalk.",
  story: [],
  photos: [{ src: "/images/projects/x/1.jpg", alt: "The crosswalk" }],
  source: "record",
  ...over,
})

async function main() {
  const subjects = await loadSubjects(empty)
  const bySlug = new Map(subjects.map((s) => [s.slug, s]))

  console.log("Documented jobs")

  const crossings = documentedJobs(subjects, { services: ["preformed-thermoplastic"], systems: [], applications: ["crosswalks"] })
  await check("a guide on thermoplastic crosswalks: Square One's own jobs, at most eight, each sharing the service or the kind of work", () => {
    assert.ok(crossings.length > 0 && crossings.length <= DOCUMENTED_JOBS_MAX, `${crossings.length}`)
    for (const j of crossings) assert.ok(/thermoplastic/i.test(j.service) || /crosswalk/i.test(j.application), j.slug)
  })
  await check("a job that matches the service and the kind of work comes before one that matches one", () => {
    const both = (j: Subject) => /thermoplastic/i.test(j.service) && /crosswalk/i.test(j.application)
    const firstSingle = crossings.findIndex((j) => !both(j))
    if (firstSingle >= 0) assert.ok(crossings.slice(firstSingle).every((j) => !both(j)), crossings.map((j) => j.slug).join(", "))
    assert.ok(both(crossings[0]))
  })
  await check("a job the brief names comes first", () => {
    const named = subjects.find((s) => /spray park/i.test(s.title))
    assert.ok(named, "the record has the spray park")
    const jobs = documentedJobs(subjects, { services: ["preformed-thermoplastic"], systems: [], applications: ["crosswalks"] }, `Lead with ${named.title} in ${named.city}.`)
    assert.equal(jobs[0].slug, named.slug)
  })
  await check("a job awaiting a yes on its location is never offered", () => {
    const flagged = subject({ slug: "flagged", flag: true })
    assert.deepEqual(documentedJobs([flagged], { services: ["preformed-thermoplastic"], systems: [], applications: [] }), [])
  })
  await check("a system matches by its name on the record, whatever its mark or case", () => {
    const xd = subject({ slug: "xd", service: "Stamped Asphalt", application: "Parks & paths", systems: ["TrafficPatternsXD®"] })
    assert.deepEqual(documentedJobs([xd], { services: [], systems: ["trafficpatterns-xd"], applications: [] }).map((j) => j.slug), ["xd"])
  })
  await check("nothing for a selection no job shares", () => {
    assert.deepEqual(documentedJobs(subjects, { services: ["vapor-blasting"], systems: [], applications: ["bike-lanes"] }), [])
    assert.deepEqual(documentedJobs(subjects, { services: [], systems: [], applications: [] }), [])
  })
  await check("each job as the record has it: its id, the town and province, what went in, its own words, whether it has a photograph", () => {
    const j = bySlug.get("nanaimo-rainbow-intersection")
    assert.ok(j)
    const f = jobFacts(j, RECORD_SERVICES)
    assert.match(f, /^JOB \(id: nanaimo-rainbow-intersection\): /m)
    assert.match(f, /^- Where: Nanaimo, BC$/m)
    assert.match(f, /^- Installed: 2025$/m)
    assert.match(f, /^- Service: Preformed Thermoplastic \(page: \/services\/preformed-thermoplastic\)$/m)
    assert.match(f, /^- Systems: TrafficPatternsXD$/m)
    assert.match(f, /^- Kind of work: Crosswalks$/m)
    assert.match(f, /^- Project page: \/projects\/nanaimo-rainbow-intersection$/m)
    assert.match(f, /^- Photograph: yes$/m)
    assert.match(jobFacts(subject({ photos: [] })), /^- Photograph: no$/m)
  })
  await check("the town and province as the articles write them", () => {
    assert.equal(jobPlace({ city: "Langley, BC" }), "Langley, BC")
    assert.equal(jobPlace({ city: "Langley" }), "Langley, BC")
    assert.equal(jobPlace({ city: "Victoria, British Columbia" }), "Victoria, British Columbia")
  })
  await check("no job's facts carry an em dash", () => {
    for (const s of subjects) assert.ok(!jobFacts(s).includes(EM), s.slug)
  })
  await check("a guide's FACTS file them under their own heading; a project story's carry none", () => {
    const guide = factsBlock({ kind: "guide", subjects: [], services: RECORD_SERVICES, guide: { services: ["preformed-thermoplastic"], systems: [], applications: ["crosswalks"] }, documented: crossings })
    assert.ok(guide.includes(DOCUMENTED_JOBS_HEADING))
    assert.ok(guide.includes(`(id: ${crossings[0].slug})`))
    const story = factsBlock({ kind: "project", subjects: [crossings[0]], services: RECORD_SERVICES, documented: crossings })
    assert.ok(!story.includes(DOCUMENTED_JOBS_HEADING))
  })
  await check("a roundup's jobs carry their ids, so the draft can lead with one", () => {
    const f = factsBlock({ kind: "roundup", subjects: crossings.slice(0, 3), services: RECORD_SERVICES })
    for (const j of crossings.slice(0, 3)) assert.ok(f.includes(`(id: ${j.slug})`), j.slug)
  })

  console.log("\nThe lead photograph")

  const a = subject({ slug: "a", title: "A" })
  const b = subject({ slug: "b", title: "B" })
  const bare = subject({ slug: "bare", title: "Bare", photos: [] })
  await check("a guide leads with the documented job its draft names, when it has a photograph", () => {
    assert.deepEqual(leadJobFor("guide", [], [a, b], "b"), { job: b, named: true })
  })
  await check("a guide's lead job its facts didn't list, made up, or without a photograph: the stand-in", () => {
    assert.equal(leadJobFor("guide", [], [a, b], "made-up"), null)
    assert.equal(leadJobFor("guide", [], [a, bare], "bare"), null)
    assert.equal(leadJobFor("guide", [], [a, b], undefined), null)
  })
  await check("a roundup: the job its draft leads with, else its first job as a stand-in", () => {
    assert.deepEqual(leadJobFor("roundup", [a, b], [], "b"), { job: b, named: true })
    assert.deepEqual(leadJobFor("roundup", [a, b], [], "made-up"), { job: a, named: false })
  })
  await check("a project story: always its own job", () => {
    assert.deepEqual(leadJobFor("project", [a], [b], "b"), { job: a, named: true })
  })
  await check("the job's photograph keeps the focal point and crop set in Studio", () => {
    const d: Draft = { title: "T", slug: "t", excerpt: "E", tags: [], body: "Body.", factsUsed: [] }
    const doc = buildDraftDocument({
      kind: "guide",
      from: 'the Blog idea "T"',
      subjects: [],
      draft: d,
      check: { verdict: "clean", unsupported: [] },
      style: { text: {}, flagged: 0, left: [] },
      slug: "t",
      photo: { asset: "image-abc-1600x1200-jpg", alt: "The crosswalk", hotspot: { x: 0.3, y: 0.7, width: 0.4, height: 0.4 }, crop: { top: 0, bottom: 0.1, left: 0, right: 0 }, note: "PHOTO: x" },
      date: "2026-10-20",
      category: "Guides",
    })
    assert.deepEqual(doc.mainImage, {
      _type: "image",
      asset: { _type: "reference", _ref: "image-abc-1600x1200-jpg" },
      alt: "The crosswalk",
      hotspot: { x: 0.3, y: 0.7, width: 0.4, height: 0.4 },
      crop: { top: 0, bottom: 0.1, left: 0, right: 0 },
    })
  })

  console.log("\nThe standard the drafter writes to")

  await check("VOICE has no em dash", () => assert.ok(!VOICE.includes(EM) && !Object.values(SHAPES).some((s) => s.includes(EM))))
  await check("SHAPE is the 20 Oct standard", () => {
    assert.match(VOICE, /550 to 850 words of markdown for a guide or a roundup; 350 to 600 for a project story/)
    assert.match(VOICE, /Never pad/)
    assert.match(VOICE, /named with its town and province \(Langley, BC\)/)
    assert.match(VOICE, /its photograph becomes the article's photograph: give its id as leadJob/)
    assert.match(VOICE, /Proof before explanation in every section/)
    assert.match(VOICE, /One thing to keep, not three/)
    assert.match(VOICE, /Never cast a product, a material or another contractor as the villain/)
    assert.match(VOICE, /No "vs" in any title or heading, ever/)
    assert.match(VOICE, /The title is a sentence a person would say: under 70 characters/)
    assert.match(SHAPES.guide, /550 to 850 words/)
    assert.match(SHAPES.roundup, /550 to 850 words/)
    assert.match(SHAPES.project, /350 to 600 words/)
  })
  await check("VOICE keeps the facts rule, the canon, the machine tells and the links", () => {
    for (const s of ["THE FACTS RULE", "THE CANON", "MACHINE TELLS", "LINKS:", "ATTENTION", "the manufacturer"]) assert.ok(VOICE.includes(s), s)
  })
  await check('save_draft says no "vs", and leadJob is offered but not required', () => {
    assert.match(String(SAVE_DRAFT.description), /No "vs"/)
    const schema = SAVE_DRAFT.input_schema as { properties: Record<string, unknown>; required: string[] }
    assert.ok("leadJob" in schema.properties)
    assert.ok(!schema.required.includes("leadJob"))
  })
  await check("instructions for one piece go after the shape, as beating it", async () => {
    const calls: ToolRequest[] = []
    const claude: Claude = async <T,>(r: ToolRequest): Promise<T> => {
      calls.push(r)
      return { title: "T", slug: "t", excerpt: "E", tags: [], body: "B", factsUsed: [], leadJob: "  " } as T
    }
    const d = await writeDraft(claude, { title: "T", kind: "project", instructions: "Short, please." }, "FACTS", [])
    assert.match(calls[0].user, /A PROJECT STORY[\s\S]*FOR THIS PIECE \(these beat the SHAPE rules above\):\nShort, please\./)
    assert.equal(d.leadJob, undefined, "a blank leadJob is none")
  })

  console.log('\nNo "vs"')

  await check('the style check flags "vs" and "versus" in a title or a heading', () => {
    assert.deepEqual(lintHeading("Thermoplastic vs paint for crosswalks").map((i) => i.rule), ["versus"])
    assert.deepEqual(lintHeading("Stamped asphalt versus pavers").map((i) => i.rule), ["versus"])
    assert.deepEqual(lintHeading("Coatings vs. thermoplastic").map((i) => i.rule), ["versus"])
    assert.deepEqual(lintHeading("Where thermoplastic goes, and where a coating does the job"), [])
    assert.deepEqual(
      flagSentences("Intro.\n\n## Coatings vs thermoplastic\n\nText.", { headings: "markdown" }).flatMap((f) => f.issues.map((i) => i.rule)),
      ["versus"],
    )
  })
  await check('…but not in the body\'s prose, and not in a word that only starts the same', () => {
    assert.ok(!lintCopy("Our crews weigh one option vs another on site.").some((i) => i.rule === "versus"))
    assert.deepEqual(lintHeading("Versatile coatings for a school court"), [])
  })
  await check('the planner drops a "vs" title, search phrase or question', () => {
    assert.ok(VS.test("Thermoplastic vs paint") && VS.test("asphalt versus pavers") && !VS.test("versatile coatings"))
    assert.equal(goodQuestion("How does thermoplastic vs paint hold up to plows?"), false)
    assert.equal(goodQuestion("How does an inlaid crosswalk hold up to plows?"), true)
    const { docs, dropped } = vetIdeas(
      [
        { kind: "guide", title: "Thermoplastic vs paint for crosswalks", searchPhrase: "thermoplastic crosswalk", services: ["preformed-thermoplastic"], questions: ["How long does it last?", "What does the site need?"] },
        { kind: "guide", title: "Where a crosswalk needs thermoplastic", searchPhrase: "thermoplastic vs paint", services: ["preformed-thermoplastic"], questions: ["How long does it last?", "What does the site need?"] },
      ],
      { existing: [], jobs: [], max: 5 },
    )
    assert.equal(docs.length, 0)
    assert.deepEqual(dropped.map((d) => d.why), ['a "vs" title or search phrase (a choice is what to specify where, by job)', 'a "vs" title or search phrase (a choice is what to specify where, by job)'])
  })

  console.log("\nThe fact check's answer: only a clear clean passes")

  await check("clean with nothing listed is clean; a list is what needs fixing", () => {
    assert.deepEqual(readFactCheck({ verdict: "clean", unsupported: [] }), { verdict: "clean", unsupported: [] })
    const r = readFactCheck({ verdict: "needs edits", unsupported: [{ quote: "in 2019", reason: "the record has no year" }] })
    assert.deepEqual(r, { verdict: "needs edits", unsupported: [{ quote: "in 2019", reason: "the record has no year" }] })
  })
  await check("a list sent as JSON text is read as the list it is", () => {
    const r = readFactCheck({ verdict: "needs edits", unsupported: JSON.stringify([{ quote: "in 2019", reason: "no year" }]) })
    assert.deepEqual(r.unsupported, [{ quote: "in 2019", reason: "no year" }])
    assert.equal(readFactCheck({ verdict: "clean", unsupported: "[]" }).verdict, "clean")
  })
  await check("an answer that can't be read, or needs edits with nothing listed, holds the draft", () => {
    for (const answer of [
      { verdict: "clean", unsupported: "not json" },
      { verdict: "needs edits", unsupported: [] },
      { verdict: "clean", unsupported: [42] },
      { verdict: "clean", unsupported: [{}] },
      null,
      { unsupported: [] },
    ]) {
      const r = readFactCheck(answer)
      assert.equal(r.verdict, "needs edits", JSON.stringify(answer))
      assert.equal(r.unsupported.length, 1)
      assert.equal(r.unsupported[0].quote, "(the whole draft)")
      assert.ok(!r.unsupported[0].reason.includes(EM))
    }
  })
  await check("a single object, or a bare sentence, still counts as a problem", () => {
    assert.deepEqual(readFactCheck({ verdict: "clean", unsupported: { quote: "a 20-year life", reason: "not in the record" } }).unsupported, [{ quote: "a 20-year life", reason: "not in the record" }])
    assert.deepEqual(readFactCheck({ verdict: "needs edits", unsupported: ["a 20-year life"] }).unsupported, [{ quote: "a 20-year life", reason: "The fact check gave no reason." }])
  })

  console.log("\nContact details and tags")

  const contact = (t: string) => lintCopy(t).filter((i) => i.rule === "contact").map((i) => i.excerpt)
  await check("Square One's own lines, email and office pass", () => {
    assert.deepEqual(contact("Call 604-612-6209, 250-391-0270 or 1-877-391-0270, or email office@squareonepaving.com."), [])
    assert.deepEqual(contact("(604) 612-6209, or [email us](mailto:office@squareonepaving.com)."), [])
    assert.deepEqual(contact("The office is at 19\u201311720 Stewart Crescent, Maple Ridge, BC V2X 9E7."), [])
  })
  await check("a customer's number, email, house address or postal code is flagged", () => {
    assert.equal(contact("The owner, at 604-555-0199, asked for brick.").length, 1)
    assert.equal(contact("Write to jane.doe@example.com for photos.").length, 1)
    assert.equal(contact("The driveway at 1234 Main Street in Langley.").length, 1)
    assert.equal(contact("A home at 12345 72 Avenue in Surrey.").length, 1)
    assert.equal(contact("A lane off 4421 W 10th Ave.").length, 1)
    assert.equal(contact("The postal code is V3A 4B5.").length, 1)
  })
  await check("a crossing named by its streets, a year or a count is not an address or a number", () => {
    assert.deepEqual(contact("We stamped the crosswalk at 152 Street and 72 Avenue in Surrey."), [])
    assert.deepEqual(contact("The crossing on 200 Street near 64 Avenue."), [])
    assert.deepEqual(contact("In 2023 Fraser Highway crews added a crosswalk."), [])
    assert.deepEqual(contact("Between 300-1200 vehicles a day use it."), [])
  })
  await check("a year before a name is a year, unless the words before it say address", () => {
    assert.deepEqual(contact("Public art \u00b7 2024 Commercial Drive, Vancouver."), [])
    assert.deepEqual(contact("2019 Windsor Gate is a masterplanned community."), [])
    assert.equal(contact("The driveway at 2041 Main Street.").length, 1)
  })
  await check("a one-digit house number counts when the words before it say address; a count doesn't", () => {
    assert.equal(contact("The owner lives at 5 Oak Street.").length, 1)
    assert.deepEqual(contact("We stamped the 3 Main Street crossings in a week."), [])
  })
  await check("the Studio leaves the contact rule off the pages the office writes (contact: false)", () => {
    assert.deepEqual(lintCopy("The plaza at 800 Robson Street, Vancouver.", { contact: false }), [])
    assert.equal(lintCopy("The plaza at 800 Robson Street, Vancouver.").filter((i) => i.rule === "contact").length, 1)
  })
  await check("a rewrite that drops the number keeps the sentence flagged for a person (keepsFacts)", () => {
    assert.equal(keepsFacts("The owner, at 604-555-0199, asked for brick.", "The owner asked for brick."), false)
  })
  await check("a tag against the canon is dropped, never printed", () => {
    assert.equal(tagPasses("StreetPrint"), true)
    assert.equal(tagPasses("Project stories"), true)
    assert.equal(tagPasses("Langley"), true)
    assert.equal(tagPasses("HUB"), false)
    assert.equal(tagPasses("Case study"), false)
    assert.equal(tagPasses("604-555-0199"), false)
    assert.equal(tagPasses("  "), false)
  })

  console.log(failures ? `\n${failures} failed` : "\nall passed")
  process.exit(failures ? 1 : 0)
}

main()
