/**
 * Tests for the Blog plan's top-up (lib/automation/planner.ts) and its
 * vocabulary (lib/automation/plan.ts): `npm run test:planner`. No network:
 * Claude and Sanity are stand-ins. Ported from hubss.com's
 * scripts/test-insights-planner.ts.
 *
 * What they protect: a new plan item names only services, systems and kinds
 * of work Square One has pages for, never repeats an article or plan item,
 * carries no claim the drafter could take as fact (a guide's brief is
 * questions only; a roundup's brief is the jobs' own records, word for word),
 * never tells a job twice, is never a "case study", and the plan is topped up
 * by no more than it asks for.
 */
import "./test-env"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { projects as RECORD } from "../lib/projects"
import { services } from "../lib/services"
import { products } from "../lib/products"
import { WORK_APPS } from "../lib/work"
import { factsBlock, type Subject } from "../lib/automation/facts"
import {
  APPLICATION_OPTIONS,
  GUIDE_CATEGORY,
  PLAN_KINDS,
  PLAN_STATUSES,
  PROJECT_STORIES_TAG,
  QUESTIONS_BRIEF,
  SERVICE_OPTIONS,
  SYSTEM_OPTIONS,
} from "../lib/automation/plan"
import { goodQuestion, PLAN_FILL, PLAN_MIN, repeats, roundupJobs, topUpPlan, usedJobIds, vetIdeas, words, type Existing, type RawIdea } from "../lib/automation/planner"
import type { Claude, SanityDoc, Store } from "../lib/automation/services"

let failures = 0
async function check(name: string, fn: () => void | Promise<void>) {
  try {
    await fn()
    console.log(`  ok    ${name}`)
  } catch (err) {
    failures++
    console.log(`  FAIL  ${name}\n        ${err instanceof Error ? err.message : err}`)
  }
}

/** The record's jobs as the drafter loads them, each with its Studio document (as the dataset has them since 9 Oct 2026). */
const subjects: Subject[] = RECORD.map((p) => ({
  slug: p.slug,
  docId: `project-${p.slug}`,
  title: p.title,
  city: p.city,
  region: p.region,
  application: p.application,
  service: p.service,
  systems: p.systems,
  year: p.year,
  client: p.client,
  artist: p.artist,
  excerpt: p.excerpt,
  story: p.story ?? [],
  photos: p.images.map((src) => ({ src })),
  source: "record",
  post: p.post,
  flag: p.flag,
}))
const jobs = roundupJobs(subjects)
const existing: Existing[] = [
  { title: "Stamped asphalt driveways: what has to be true of the old one first", phrases: ["stamped asphalt driveway"] },
  { title: "Decorative crosswalks in thermoplastic", phrases: ["decorative crosswalk"] },
]
const guide = (over: Partial<RawIdea> = {}): RawIdea => ({
  kind: "guide",
  title: "Choosing a surface for a strata fire lane",
  searchPhrase: "Strata Fire Lane Colour",
  services: ["decorative-coatings"],
  systems: ["streetbond"],
  applications: ["streetscapes"],
  questions: [
    "What does a fire lane coating have to do in a wet winter?",
    "How is a coloured fire lane looked after once it is down?",
    "What should a strata council ask before a fire lane is recoated?",
  ],
  ...over,
})
const vet = (raw: RawIdea[], max = 10) => vetIdeas(raw, { existing, jobs, max })

async function main() {
  console.log("The plan's vocabulary")
  await check("the services, systems and kinds of work are the site's, by slug", () => {
    assert.deepEqual(SERVICE_OPTIONS.map((o) => o.value).sort(), services.map((s) => s.slug).sort())
    assert.deepEqual(SYSTEM_OPTIONS.map((o) => o.value).sort(), products.map((p) => p.slug).sort())
    assert.deepEqual(APPLICATION_OPTIONS.map((o) => o.value), WORK_APPS.map((a) => a.slug))
    for (const o of SYSTEM_OPTIONS) assert.equal(o.title, products.find((p) => p.slug === o.value)?.name, o.value)
    for (const o of APPLICATION_OPTIONS) assert.equal(o.title, WORK_APPS.find((a) => a.slug === o.value)?.label, o.value)
  })
  await check("never a case study: not a kind, a section, a tag, or a category the Studio offers", () => {
    const words = [...PLAN_KINDS.map((k) => k.title), ...PLAN_STATUSES.map((s) => s.title), PROJECT_STORIES_TAG, GUIDE_CATEGORY].join(" ")
    assert.doesNotMatch(words, /case stud/i)
    const post = fs.readFileSync(path.join(process.cwd(), "sanity/schemaTypes/post.ts"), "utf8")
    const list = /options: \{ list: \[([^\]]+)\]/.exec(post)?.[1] ?? ""
    assert.ok(list.includes('"Guides"'), "Guides is a category")
    assert.doesNotMatch(list, /Case Stud/i)
  })
  await check("the blog's Project stories topic finds the tag the drafter gives project stories", () => {
    const filter = fs.readFileSync(path.join(process.cwd(), "components/blog/BlogFilterClient.tsx"), "utf8")
    assert.match(filter, new RegExp(`label: "Project stories", match: "${PROJECT_STORIES_TAG}"`))
  })

  console.log("The jobs a roundup may use")
  await check("only documented jobs with no article of their own, each with its Studio document", () => {
    assert.ok(jobs.length >= 3, `${jobs.length} jobs`)
    for (const j of jobs) {
      const s = subjects.find((x) => x.slug === j.id)!
      assert.ok(!s.post && !s.flag, j.id)
      assert.equal(j.docId, `project-${j.id}`)
    }
  })
  await check("never a job drafted already, flagged, or not in Studio", () => {
    const first = jobs[0].id
    assert.ok(!roundupJobs(subjects, new Set([first])).some((j) => j.id === first))
    const flagged = subjects.map((s) => (s.slug === first ? { ...s, flag: true } : s))
    assert.ok(!roundupJobs(flagged).some((j) => j.id === first))
    const notInStudio = subjects.map((s) => (s.slug === first ? { ...s, docId: undefined } : s))
    assert.ok(!roundupJobs(notInStudio).some((j) => j.id === first))
  })

  console.log("Guides")
  await check("a good guide becomes an Idea at the bottom of the plan", () => {
    const { docs } = vet([guide()])
    assert.equal(docs.length, 1)
    const d = docs[0]
    assert.equal(d._type, "storyIdea")
    assert.equal(d.status, "idea")
    assert.equal(d.priority, 3)
    assert.equal(d.type, "guide")
    assert.match(d._id, /^storyIdea-auto-[a-z0-9-]+$/)
    assert.equal(d.searchPhrase, "strata fire lane colour")
    if (d.type !== "guide") throw new Error("not a guide")
    assert.deepEqual(d.services, ["decorative-coatings"])
    assert.deepEqual(d.systems, ["streetbond"])
    assert.deepEqual(d.applications, ["streetscapes"])
  })
  await check("its brief is the questions, and nothing the drafter could take as fact", () => {
    const { docs } = vet([
      guide({
        questions: [
          "StreetBond lasts 8 years, so why recoat it?",
          "StreetBond is the best choice for a fire lane.",
          "What does a fire lane coating have to do in a wet winter?",
          "How is a coloured fire lane looked after once it is down?",
        ],
      }),
    ])
    const [first, ...lines] = docs[0].brief.split("\n")
    assert.equal(first, QUESTIONS_BRIEF)
    assert.deepEqual(lines, ["- What does a fire lane coating have to do in a wet winter?", "- How is a coloured fire lane looked after once it is down?"])
  })
  await check("a question that names a place, client, agency or borrowed standard, or assumes its answer, is dropped", () => {
    for (const q of [
      "Why did the City of Langley choose thermoplastic for its crossing?",
      "Why does StreetPrint outlast concrete on Vancouver Island driveways?",
      "What makes StreetBond the only coating that survives a strata fire lane?",
      "How did Maple Ridge specify its spray park surface?",
      "Which system is best for a school crosswalk?",
      "How does Vision Zero shape a crosswalk's design?",
      "What does a case study of a stamped driveway show?",
      "HUB coatings: how do they hold up through a BC winter?",
      "How do hub surface systems coatings hold up?",
      "Surrey stratas: what should a council ask before a recoat?",
      "Victoria driveways, how are they stamped?",
    ])
      assert.equal(goodQuestion(q), false, q)
    for (const q of [
      "How does a stamped asphalt driveway hold up to a BC winter?",
      "What should a StreetPrint specification cover in British Columbia?",
      "What has to be true of an old driveway before it is stamped?",
      "Should a strata council recoat its fire lane before winter?",
      "StreetBond on a fire lane: how is it looked after?",
    ])
      assert.equal(goodQuestion(q), true, q)
  })
  await check("the drafter and the fact check get the questions apart from the facts", () => {
    const { docs } = vet([guide()])
    const facts = factsBlock({ kind: "guide", subjects: [], services, guide: { services: ["decorative-coatings"], systems: [], applications: [] }, brief: docs[0].brief })
    assert.match(facts, /NOT facts and support no statement/)
    assert.doesNotMatch(facts, /treat as true/)
    assert.ok(!facts.includes(QUESTIONS_BRIEF), "the marker line itself isn't repeated")
    const editor = factsBlock({ kind: "guide", subjects: [], services, guide: { services: ["stamped-asphalt"], systems: [], applications: [] }, brief: "Square One stamped the walkway in May." })
    assert.match(editor, /the brief; treat as true/)
  })
  await check("fewer than two good questions: dropped", () => {
    const { docs, dropped } = vet([guide({ questions: ["What does a fire lane coating have to do in a wet winter?", "It lasts 8 years."] })])
    assert.equal(docs.length, 0)
    assert.match(dropped[0].why, /questions/)
  })
  await check("a service, system or kind of work the site has no page for is left out; none at all is dropped", () => {
    const { docs } = vet([guide({ services: ["decorative-coatings", "asphalt-repair"], systems: ["streetbond", "airmark", "magic-paint"], applications: ["streetscapes", "moon-bases"] })])
    if (docs[0].type !== "guide") throw new Error("not a guide")
    assert.deepEqual(docs[0].services, ["decorative-coatings"])
    assert.deepEqual(docs[0].systems, ["streetbond"])
    assert.deepEqual(docs[0].applications, ["streetscapes"])
    const none = vet([guide({ services: ["asphalt-repair"], systems: ["magic-paint"], applications: [] })])
    assert.equal(none.docs.length, 0)
    assert.match(none.dropped[0].why, /no service, system or kind of work/)
  })
  await check("a title with a figure, a claim, a place (for a guide) or a case study: dropped", () => {
    assert.equal(vet([guide({ title: "Coloured fire lanes for a strata", searchPhrase: "fire lane colour" })]).docs.length, 1)
    assert.equal(vet([guide({ title: "The 5 fire lane colours compared" })]).docs.length, 0)
    assert.equal(vet([guide({ title: "Why StreetBond outlasts paint" })]).docs.length, 0)
    assert.equal(vet([guide({ title: "The best fire lane surface for a strata" })]).docs.length, 0)
    assert.equal(vet([guide({ title: "Fire lanes for Surrey stratas" })]).docs.length, 0)
    assert.equal(vet([guide({ title: "A fire lane case study" })]).docs.length, 0)
    assert.equal(vet([guide({ title: "Stamped asphalt driveways in BC winters", searchPhrase: "bc winter driveway" })]).docs.length, 1)
    assert.equal(vet([guide({ title: "Surrey stratas and their fire lanes" })]).docs.length, 0, "a guide's title may not open with a place")
  })
  await check("the manufacturer, or a claim in the search phrase, drops an idea of either kind", () => {
    const roundup = (over: Partial<RawIdea>): RawIdea => ({ kind: "roundup", title: "Crosswalks with a story behind them", searchPhrase: "custom crosswalk designs", jobIds: jobs.filter((j) => j.application === "Crosswalks").slice(0, 3).map((j) => j.id), ...over })
    assert.equal(vet([roundup({})]).docs.length, 1)
    assert.match(vet([roundup({ title: "HUB crosswalks across BC" })]).dropped[0]?.why ?? "", /manufacturer/)
    assert.match(vet([roundup({ searchPhrase: "hub surface systems crosswalk" })]).dropped[0]?.why ?? "", /manufacturer/)
    assert.match(vet([guide({ searchPhrase: "best fire lane coating" })]).dropped[0]?.why ?? "", /claim/)
    assert.equal(vet([guide({ title: "Coatings for a transit hub plaza", searchPhrase: "transit hub plaza" })]).docs.length, 1, "a transit hub is not the manufacturer")
  })

  console.log("Roundups")
  const crosswalks = jobs.filter((j) => j.application === "Crosswalks").slice(0, 3)
  await check("there are enough documented jobs to group", () => assert.equal(crosswalks.length, 3))
  await check("a roundup's brief is the jobs' own records, word for word, and it refers to each job", () => {
    const { docs } = vet([{ kind: "roundup", title: "Crosswalks with a story behind them", searchPhrase: "custom crosswalk designs", jobIds: crosswalks.map((j) => j.id) }])
    assert.equal(docs.length, 1)
    const d = docs[0]
    assert.equal(d.type, "roundup")
    if (d.type !== "roundup") throw new Error("not a roundup")
    for (const j of crosswalks) {
      assert.ok(d.brief.includes(j.excerpt.replace(/\s*—\s*/g, ", ")), `${j.id}'s record`)
      assert.ok(d.brief.includes(`- ${j.title} (${j.place}).`), `${j.id}'s place`)
    }
    assert.match(d.brief, /add nothing about these jobs/)
    assert.ok(!/—/.test(d.brief), "no em dash")
    assert.deepEqual(
      d.projects.map((r) => r._ref),
      crosswalks.map((j) => `project-${j.id}`),
    )
    assert.equal(new Set(d.projects.map((r) => r._key)).size, d.projects.length, "unique keys")
  })
  await check("a job that isn't documented, or already has an article, is left out", () => {
    const withPost = subjects.find((s) => s.post)!
    const { docs, dropped } = vet([{ kind: "roundup", title: "Three crosswalks", searchPhrase: "crosswalk examples", jobIds: [crosswalks[0].id, crosswalks[1].id, withPost.slug, "made-up-job"] }])
    assert.equal(docs.length, 0)
    assert.match(dropped[0].why, /documented jobs/)
  })
  await check("every job's record goes into a brief as written", () => {
    for (let i = 0; i + 3 <= jobs.length; i += 3) {
      const group = jobs.slice(i, i + 3)
      const tag = String.fromCharCode(97 + i / 3)
      const { docs } = vetIdeas([{ kind: "roundup", title: `Roundup ${tag} of documented jobs`, searchPhrase: `roundup ${tag}`, jobIds: group.map((j) => j.id) }], { existing: [], jobs, max: 1 })
      for (const j of group) assert.ok(docs[0]?.brief.includes(j.excerpt.replace(/\s*—\s*/g, ", ")), `${j.id}: ${j.excerpt}`)
    }
  })
  await check("a job another plan item tells, by reference or in its brief, isn't featured again", () => {
    const first = vet([{ kind: "roundup", title: "Crosswalks with a story behind them", searchPhrase: "custom crosswalk designs", jobIds: crosswalks.map((j) => j.id) }]).docs[0]
    const again = vetIdeas([{ kind: "roundup", title: "Crossings by the water", searchPhrase: "waterfront crosswalk", jobIds: crosswalks.map((j) => j.id) }], {
      existing: [...existing, { title: first.title, phrases: [first.searchPhrase], brief: first.brief }],
      jobs,
      max: 5,
    })
    assert.equal(again.docs.length, 0)
    const byRef = vetIdeas([{ kind: "roundup", title: "Crossings by the water", searchPhrase: "waterfront crosswalk", jobIds: crosswalks.map((j) => j.id) }], {
      existing: [...existing, { title: "A project story", phrases: [], jobs: [crosswalks[0].id] }],
      jobs,
      max: 5,
    })
    assert.equal(byRef.docs.length, 0, "a job a project story already tells")
    assert.deepEqual([...usedJobIds(jobs, [{ title: "x", phrases: [], jobs: [crosswalks[1].id] }])], [crosswalks[1].id])
    const sameBatch = vet([
      { kind: "roundup", title: "Crosswalks with a story behind them", searchPhrase: "custom crosswalk designs", jobIds: crosswalks.map((j) => j.id) },
      { kind: "roundup", title: "Crossings by the water", searchPhrase: "waterfront crosswalk", jobIds: crosswalks.map((j) => j.id) },
    ])
    assert.equal(sameBatch.docs.length, 1)
  })
  await check("six jobs at most", () => {
    const many = jobs.slice(0, 9).map((j) => j.id)
    const { docs } = vet([{ kind: "roundup", title: "Nine jobs on one page", searchPhrase: "decorative pavement projects bc", jobIds: many }])
    assert.equal(docs[0].brief.split("\n").filter((l) => l.startsWith("- ")).length, Math.min(6, many.length))
  })

  console.log("No repeats")
  await check("the same search phrase as an article: dropped", () => {
    const { docs, dropped } = vet([guide({ title: "Stamping the driveway you already have", searchPhrase: "Stamped asphalt driveways" })])
    assert.equal(docs.length, 0)
    assert.match(dropped[0].why, /Stamped asphalt driveways/)
  })
  await check("a title that says the same thing in a different order: dropped", () => {
    assert.ok(repeats({ title: "Thermoplastic for decorative crosswalks", searchPhrase: "crosswalk thermoplastic" }, existing))
  })
  await check("a different question about the same system: kept", () => {
    assert.equal(repeats({ title: "How a coloured bike lane keeps its colour", searchPhrase: "bike lane colour" }, existing), undefined)
  })
  await check("two of the new ideas can't repeat each other", () => {
    const { docs, dropped } = vet([guide(), guide({ title: "Choosing surfaces for strata fire lanes" })])
    assert.equal(docs.length, 1)
    assert.equal(dropped.length, 1)
  })
  await check("words ignores case, punctuation, accents, plurals, small words and the market", () => {
    assert.deepEqual([...words("The Crosswalks, and the PLOW!")].sort(), ["crosswalk", "plow"])
    assert.deepEqual([...words("coloured bike lanes")], [...words("coloured bike lane")])
    assert.deepEqual([...words("pavement markings")], [...words("pavement marking")])
    assert.deepEqual([...words("Montréal")], ["montreal"])
    assert.deepEqual([...words("driveways in British Columbia")], [...words("driveway")])
  })

  console.log("House style and limits")
  await check("no em dash in a title", () => {
    const { docs } = vet([guide({ title: "Fire lanes in winter — what the coating has to do" })])
    assert.equal(docs[0].title, "Fire lanes in winter, what the coating has to do")
  })
  await check("no more than it was asked for", () => {
    const raw = [
      guide(),
      guide({ title: "Looking after a coloured park path", searchPhrase: "park path coating maintenance", applications: ["parks-paths"] }),
      guide({ title: "Stamped walkways across a parking lot", searchPhrase: "parking lot walkway", applications: ["parking-lots"], services: ["stamped-asphalt"] }),
    ]
    assert.equal(vet(raw, 2).docs.length, 2)
  })
  await check("no title, no search phrase, or no kind: dropped", () => {
    assert.equal(vet([guide({ title: "" }), guide({ searchPhrase: " " }), { ...guide(), kind: "listicle" as RawIdea["kind"] }]).docs.length, 0)
  })

  console.log("Topping the plan up")
  /** A store that answers the planner's three reads and records what it creates. */
  const planStore = (plan: { title: string; status: string; searchPhrase?: string; brief?: string; jobs?: string[] }[], taken = new Set<string>()) => {
    const created: SanityDoc[] = []
    const store: Store = {
      fetch: async <T,>(query: string) => {
        if (query.includes('_type == "storyIdea"')) return plan as T
        if (query.includes('_type == "post"')) return [{ title: "Stamped asphalt driveways: what has to be true of the old one first", tags: ["Driveways"] }] as T
        if (query.includes("automation.draftlog.")) return [] as T
        throw new Error(`unexpected query ${query}`)
      },
      create: async (doc) => {
        if (taken.has(doc._id)) throw Object.assign(new Error("Document already exists"), { statusCode: 409 })
        created.push(doc)
      },
      createOrReplace: async () => {},
      patch: async () => {},
      createIfNotExists: async () => {},
      delete: async () => {},
      uploadImage: async () => null,
    }
    return { store, created }
  }
  const proposing = (ideas: RawIdea[]) => {
    const asked: number[] = []
    const claude: Claude = async <T,>(req: { user: string }) => {
      asked.push(Number(/^Propose (\d+) new articles/.exec(req.user)?.[1]))
      return { ideas } as T
    }
    return { claude, asked }
  }
  const open = (n: number) => Array.from({ length: n }, (_, i) => ({ title: `Open item ${i}`, status: i % 2 ? "ready" : "idea" }))
  await check(`a plan with ${PLAN_MIN} or more open items is left alone, and Claude isn't asked`, async () => {
    const { store, created } = planStore([...open(PLAN_MIN), { title: "Done", status: "drafted" }])
    const { claude, asked } = proposing([guide()])
    assert.equal(await topUpPlan({ claude, store }, subjects), null)
    assert.equal(asked.length, 0)
    assert.equal(created.length, 0)
  })
  await check(`a low plan is topped up to ${PLAN_FILL}, never past it`, async () => {
    const { store, created } = planStore(open(PLAN_MIN - 2))
    const topics = ["fire lane", "spray park", "bike lane", "school court", "plaza walkway", "laneway", "roundabout apron", "median", "parking walkway", "playground", "driveway border", "sidewalk logo"]
    const ideas = topics.map((t) => guide({ title: `Looking after a coloured ${t}`, searchPhrase: `${t} upkeep` }))
    const { claude, asked } = proposing(ideas)
    const out = await topUpPlan({ claude, store }, subjects)
    assert.equal(asked[0], PLAN_FILL - (PLAN_MIN - 2) + 2, "asks for a couple more than it needs")
    assert.equal(created.length, PLAN_FILL - (PLAN_MIN - 2))
    assert.equal(out?.added.length, created.length)
    assert.ok(created.every((d) => d._type === "storyIdea" && d.status === "idea" && d.priority === 3))
  })
  await check("an idea whose id is taken is skipped, never overwritten", async () => {
    const { store, created } = planStore(open(1), new Set(["storyIdea-auto-choosing-a-surface-for-a-strata-fire-lane"]))
    const { claude } = proposing([guide()])
    const out = await topUpPlan({ claude, store }, subjects)
    assert.equal(created.length, 0)
    assert.match(out?.dropped.map((d) => d.why).join(" ") ?? "", /already in the plan/)
  })
  await check("an article already written is never proposed again", async () => {
    const { store, created } = planStore([])
    const { claude } = proposing([guide({ title: "Stamped asphalt driveways: what has to be true first", searchPhrase: "stamped asphalt driveway" })])
    await topUpPlan({ claude, store }, subjects)
    assert.equal(created.length, 0)
  })

  if (failures) {
    console.log(`\n${failures} failed`)
    process.exit(1)
  }
  console.log("\nall passed")
}

main()
