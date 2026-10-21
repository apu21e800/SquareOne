/**
 * Keeps the Blog plan stocked (14 Oct 2026, ported from hubss.com's
 * lib/insights-planner.ts). The drafter (lib/automation/blog.ts) writes an
 * article every Tuesday and Thursday from Studio's Blog plan; when fewer than
 * PLAN_MIN Ideas and Ready items are left, Claude proposes new ones and they
 * go in at the bottom of the plan as Ideas (priority 3). Anyone can reorder,
 * edit or set one to "Not doing" in Studio before its turn comes; the
 * drafter's email names the next one.
 *
 * Two kinds, both written only from what Square One has already published:
 *  - Guides: a question Square One's customers search for (driveways,
 *    parking lots, strata, municipal work in BC), answered from the site's
 *    own service, system and application pages (the drafter reads them,
 *    lib/automation/facts.ts). The brief is questions only, under
 *    QUESTIONS_BRIEF, which the FACTS block files apart from the facts: the
 *    writer and the fact check are told the questions support nothing.
 *    vetIdeas drops a question that names a place, client or anything but
 *    Square One's systems and BC, holds a figure, or assumes its own answer
 *    ("why does X outlast", "the only", "best").
 *  - Project roundups: three to six documented jobs (Projects in Studio, as
 *    the site shows them) that have no article of their own and aren't in
 *    another plan item, on one theme. Their brief is built here from the
 *    jobs' records, as written, never by the model, and the plan item refers
 *    to each job, so the drafter writes from their full records.
 *
 * Never a "case study": a roundup is a project roundup, filed under its jobs'
 * kind of work and the blog's Project stories (lib/automation/plan.ts).
 *
 * vetIdeas is pure: `npm run test:planner`.
 */
import type Anthropic from "@anthropic-ai/sdk"
import { services as SERVICES } from "@/lib/services"
import { products } from "@/lib/products"
import { APP_COPY } from "@/lib/application-copy"
import { namesTheMaker, PRODUCT_NAMES, PROPER_NAMES } from "@/lib/automation/style"
import { isConflict } from "@/lib/automation/outcome"
import { DRAFT_LOG_PREFIX } from "@/lib/automation/logs"
import type { Subject } from "@/lib/automation/facts"
import { BLOG_MODEL, type Claude, type Store } from "@/lib/automation/services"
import { APPLICATION_OPTIONS, isApplication, isService, isSystem, QUESTIONS_BRIEF, ROUNDUP_BRIEF, ROUNDUP_MAX, ROUNDUP_MIN, SERVICE_OPTIONS, SYSTEM_OPTIONS } from "@/lib/automation/plan"

/** Top up when fewer than this many Ideas and Ready items are left: three weeks at two a week. */
export const PLAN_MIN = 6
/** ... back up to this many. */
export const PLAN_FILL = 10

/** Inside the drafter's 300 s (app/api/cron/draft-post). */
const TIMEOUT_MS = 80_000

/** What the model proposes. */
export interface RawIdea {
  kind: "guide" | "roundup"
  title: string
  searchPhrase: string
  services?: string[]
  systems?: string[]
  applications?: string[]
  questions?: string[]
  jobIds?: string[]
}

/** Weak, as the schema's: a project in the plan can still be deleted from Projects. */
type Ref = { _type: "reference"; _ref: string; _key: string; _weak: true }

/** A plan item, as written to Sanity (sanity/schemaTypes/storyIdea.ts). */
export type PlanDoc = {
  _id: string
  _type: "storyIdea"
  title: string
  status: "idea"
  priority: 3
  searchPhrase: string
  brief: string
} & ({ type: "guide"; services: string[]; systems: string[]; applications: string[] } | { type: "roundup"; projects: Ref[] })

/** Something already written or planned: its title, the phrases it chases and, for a plan item, its brief and jobs. */
export interface Existing {
  title: string
  phrases: string[]
  brief?: string
  /** The jobs (project slugs) a plan item tells. */
  jobs?: string[]
}

/** A documented job a roundup may feature. */
export interface PlannerJob {
  /** The project's slug (its web address). */
  id: string
  /** The Studio project's document id: what the plan item refers to. */
  docId: string
  title: string
  place: string
  service: string
  systems: string[]
  application: string
  year?: string
  client?: string
  excerpt: string
}

/** Documented jobs with no article of their own and never drafted: the roundups' material. */
export function roundupJobs(subjects: readonly Subject[], drafted: ReadonlySet<string> = new Set()): PlannerJob[] {
  return subjects.flatMap((s) => {
    if (s.post || s.flag || !s.docId || !s.excerpt?.trim() || drafted.has(s.slug)) return []
    return [
      {
        id: s.slug,
        docId: s.docId,
        title: s.title,
        place: s.city,
        service: s.service,
        systems: [...new Set(s.systems)],
        application: s.application,
        ...(s.year ? { year: s.year } : {}),
        ...(s.client ? { client: s.client } : {}),
        excerpt: s.excerpt,
      },
    ]
  })
}

/** How a job opens its line in a roundup's brief; also how a used job is recognised. */
const jobKey = (j: PlannerJob) => `- ${j.title} (${j.place}).`

/** Jobs already told by a plan item: referred to by one, or featured in one's brief. */
export function usedJobIds(jobs: readonly PlannerJob[], existing: readonly Existing[]): Set<string> {
  const referred = new Set(existing.flatMap((e) => e.jobs ?? []))
  const briefs = existing.map((e) => e.brief).filter((b): b is string => !!b)
  return new Set(jobs.filter((j) => referred.has(j.id) || briefs.some((b) => b.includes(jobKey(j)))).map((j) => j.id))
}

const STOP = new Set([
  "a", "an", "the", "and", "or", "for", "of", "to", "in", "on", "at", "with", "vs", "versus", "what", "how", "why", "when",
  "your", "you", "is", "are", "it", "its", "that", "this", "from", "by", "as", "be", "do", "does", "can", "which", "who",
  "into", "than", "more", "most", "about", "without", "between", "one", "time", "way",
  // The market, which every article shares.
  "british", "columbia", "canada", "canadian",
])

/** A rough stem, so lane and lanes, marking and markings, surface and surfaces meet. */
function stem(w: string): string {
  if (w.length > 5) w = w.replace(/ings?$/, "")
  if (w.length > 3 && /[^s]s$/.test(w)) w = w.slice(0, -1)
  return w
}

/** The content words of a title or phrase, roughly stemmed. */
export function words(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9 ]+/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
      .map(stem),
  )
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0
  let shared = 0
  for (const w of a) if (b.has(w)) shared++
  return shared / (a.size + b.size - shared)
}

const phraseKey = (s: string) => [...words(s)].sort().join(" ")

/** The existing article or plan item an idea repeats, if any. */
export function repeats(idea: { title: string; searchPhrase: string }, existing: readonly Existing[]): string | undefined {
  const t = words(idea.title)
  const p = phraseKey(idea.searchPhrase)
  for (const e of existing) {
    if (jaccard(t, words(e.title)) >= 0.6) return e.title
    if (p && e.phrases.some((ph) => phraseKey(ph) === p)) return e.title
  }
  return undefined
}

/** No em or en dash as a dash (house style); spaces tidied. For the model's words only. */
const tidy = (s: string) =>
  s
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\s+/g, " ")
    .trim()

function cleanSlug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "")
}

/** Words that make a question assume its answer, or a title make a claim. */
const LOADED = /\b(why (does|do|did|is|are|was|were|has|have|can)|only|best|worst|most|least|better|worse|cheaper|cheapest|longer|longest|faster|fastest|stronger|strongest|safer|safest|outlasts?|outlasting|superior|unique|guaranteed?|always|never|proven)\b/i

/** The word the canon keeps off the site (lib/automation/style.ts "house-words"). */
const CASE_STUDY = /\bcase\s+stud(y|ies)\b/i

/** Names a guide may use: Square One, its systems and its market. No place, client, agency or borrowed standard. */
const NAMES = [...PRODUCT_NAMES, "Square One", "British Columbia", "BC", "Canada", "Canadian"].sort((a, b) => b.length - a.length)

/** Places, peoples and other proper names (lib/automation/style.ts), which a guide's title or question may not start with either. */
const OTHER_NAMES = PROPER_NAMES.filter((n) => !NAMES.includes(n)).sort((a, b) => b.length - a.length)

/** The words a question may start with in capitals. */
const QUESTION_WORDS = new Set(["How", "What", "Which", "When", "Why", "Where", "Who", "Whose", "Should", "Can", "Could", "Does", "Do", "Is", "Are", "Will", "Would", "Must", "Has", "Have"])

/**
 * True when the text names nothing but NAMES: no place, client, agency or
 * the manufacturer. Every capitalised word after the first must be one of
 * NAMES; the first may be an ordinary word in capitals, but never another
 * proper name ("Surrey stratas…"), and a question must open with a question
 * word or one of NAMES.
 */
export function namesOnlyKnown(s: string, opts: { question?: boolean } = {}): boolean {
  const text = s.trim()
  if (namesTheMaker(text)) return false
  if (OTHER_NAMES.some((n) => text === n || text.startsWith(`${n} `) || text.startsWith(`${n}'`) || text.startsWith(`${n}\u2019`) || text.startsWith(`${n},`))) return false
  let rest = text
  for (const n of NAMES) rest = rest.split(n).join(" ")
  const words = rest.trim().split(/\s+/)
  if (opts.question && !NAMES.some((n) => text.startsWith(n)) && !QUESTION_WORDS.has(words[0] ?? "")) return false
  return !words.slice(1).some((w) => /^[A-Z]/.test(w) && w !== "I")
}

/** "A vs B": never in a title, a search phrase or a question (the standard of 20 Oct 2026, as hubss.com's). A choice is what to specify where. */
export const VS = /\b(?:vs\.?|versus)(?=\s|$|[,:;!?)])/i

/** A question a guide's brief may carry: a real question that names nothing and assumes nothing. */
export const goodQuestion = (q: string) =>
  q.length >= 12 && q.length <= 200 && q.endsWith("?") && !/\d/.test(q) && !LOADED.test(q) && !CASE_STUDY.test(q) && !VS.test(q) && namesOnlyKnown(q, { question: true })

/** A job's record, as written (only an em dash, which the house style never prints, becomes a comma). */
function jobLine(j: PlannerJob): string {
  return [
    jobKey(j),
    j.service ? `Service: ${j.service}.` : "",
    j.systems.length ? `Systems: ${j.systems.join(", ")}.` : "",
    j.application ? `Kind of work: ${j.application}.` : "",
    j.year ? `Installed: ${j.year}.` : "",
    j.client ? `Installed at: ${j.client}.` : "",
    j.excerpt.replace(/\s*—\s*/g, ", "),
  ]
    .filter(Boolean)
    .join(" ")
}

const ROUNDUP_TAIL = "Then tell the reader what to know before planning the same kind of work, from Square One's service and system pages."

/**
 * The model's ideas, checked and turned into plan items: known services,
 * systems and kinds of work only, no repeat of an article or plan item (or of
 * each other), guides with at least two questions that pass goodQuestion and
 * a title that claims nothing and names no place, roundups with three to six
 * documented jobs that no other plan item tells. At most `max`, in the order
 * proposed.
 */
export function vetIdeas(
  raw: readonly RawIdea[],
  ctx: { existing: readonly Existing[]; jobs: readonly PlannerJob[]; max: number },
): { docs: PlanDoc[]; dropped: { title: string; why: string }[] } {
  const jobs = new Map(ctx.jobs.map((j) => [j.id, j]))
  const used = usedJobIds(ctx.jobs, ctx.existing)
  const seen: Existing[] = [...ctx.existing]
  const ids = new Set<string>()
  const docs: PlanDoc[] = []
  const dropped: { title: string; why: string }[] = []

  for (const r of raw) {
    if (docs.length >= ctx.max) break
    const title = tidy(typeof r?.title === "string" ? r.title : "").slice(0, 110)
    const searchPhrase = tidy(typeof r?.searchPhrase === "string" ? r.searchPhrase : "")
      .toLowerCase()
      .slice(0, 80)
    const drop = (why: string) => dropped.push({ title: title || "(untitled)", why })
    if (!title || !searchPhrase) {
      drop("no title or search phrase")
      continue
    }
    if (/\d/.test(title) || /\d/.test(searchPhrase)) {
      drop("a figure in the title or search phrase")
      continue
    }
    if (LOADED.test(title) || LOADED.test(searchPhrase)) {
      drop("the title or search phrase makes a claim")
      continue
    }
    if (namesTheMaker(title) || namesTheMaker(searchPhrase)) {
      drop("it names the manufacturer")
      continue
    }
    if (CASE_STUDY.test(title) || CASE_STUDY.test(searchPhrase)) {
      drop("a case study: Square One says project story")
      continue
    }
    if (VS.test(title) || VS.test(searchPhrase)) {
      drop('a "vs" title or search phrase (a choice is what to specify where, by job)')
      continue
    }
    const same = repeats({ title, searchPhrase }, seen)
    if (same) {
      drop(`too close to "${same}"`)
      continue
    }
    const _id = `storyIdea-auto-${cleanSlug(title)}`
    if (ids.has(_id)) {
      drop("same id as another idea")
      continue
    }

    let doc: PlanDoc
    let tells: string[] = []
    if (r.kind === "roundup") {
      const picked = [...new Set(Array.isArray(r.jobIds) ? r.jobIds : [])]
        .map((id) => jobs.get(id))
        .filter((j): j is PlannerJob => !!j && !used.has(j.id))
        .slice(0, ROUNDUP_MAX)
      if (picked.length < ROUNDUP_MIN) {
        drop(`a roundup needs ${ROUNDUP_MIN} documented jobs no other plan item tells`)
        continue
      }
      doc = {
        _id,
        _type: "storyIdea",
        title,
        status: "idea",
        priority: 3,
        searchPhrase,
        type: "roundup",
        projects: picked.map((j) => ({ _type: "reference", _ref: j.docId, _key: cleanSlug(j.id).slice(0, 40) || j.docId, _weak: true })),
        brief: [ROUNDUP_BRIEF, ...picked.map(jobLine), ROUNDUP_TAIL].join("\n"),
      }
      for (const j of picked) used.add(j.id)
      tells = picked.map((j) => j.id)
    } else if (r.kind === "guide") {
      if (!namesOnlyKnown(title)) {
        drop("the title names a place, client or agency")
        continue
      }
      const svc = [...new Set(Array.isArray(r.services) ? r.services : [])].filter(isService).slice(0, 2)
      const sys = [...new Set(Array.isArray(r.systems) ? r.systems : [])].filter(isSystem).slice(0, 3)
      const apps = [...new Set(Array.isArray(r.applications) ? r.applications : [])].filter(isApplication).slice(0, 3)
      const questions = (Array.isArray(r.questions) ? r.questions : [])
        .filter((q): q is string => typeof q === "string")
        .map(tidy)
        .filter(goodQuestion)
        .slice(0, 6)
      if (!svc.length && !sys.length && !apps.length) {
        drop("no service, system or kind of work the site has a page for")
        continue
      }
      if (questions.length < 2) {
        drop("fewer than two questions that name and assume nothing")
        continue
      }
      doc = {
        _id,
        _type: "storyIdea",
        title,
        status: "idea",
        priority: 3,
        searchPhrase,
        type: "guide",
        services: svc,
        systems: sys,
        applications: apps,
        brief: [QUESTIONS_BRIEF, ...questions.map((q) => `- ${q}`)].join("\n"),
      }
    } else {
      drop("neither a guide nor a roundup")
      continue
    }
    ids.add(_id)
    seen.push({ title, phrases: [searchPhrase], brief: doc.brief, jobs: tells })
    docs.push(doc)
  }
  return { docs, dropped }
}

const PROPOSE: Anthropic.Tool = {
  name: "propose_ideas",
  description: "Propose new articles for Square One's Blog plan.",
  input_schema: {
    type: "object",
    properties: {
      ideas: {
        type: "array",
        items: {
          type: "object",
          properties: {
            kind: { type: "string", enum: ["guide", "roundup"] },
            title: { type: "string", description: 'Working title, sentence case, no em dash, no figures, no claim, no "vs" (a choice is what goes where, by job).' },
            searchPhrase: { type: "string", description: "What the reader types into Google, two to five words, lower case." },
            services: { type: "array", items: { type: "string" }, description: "Guides: zero to two SERVICES slugs." },
            systems: { type: "array", items: { type: "string" }, description: "Guides: zero to three SYSTEMS slugs." },
            applications: { type: "array", items: { type: "string" }, description: "Guides: zero to three KINDS OF WORK slugs. A guide names at least one service, system or kind of work." },
            questions: { type: "array", items: { type: "string" }, description: "Guides: three to six neutral questions the article answers." },
            jobIds: { type: "array", items: { type: "string" }, description: "Roundups: three to six JOBS ids that share the theme." },
          },
          required: ["kind", "title", "searchPhrase"],
        },
      },
    },
    required: ["ideas"],
  },
}

const SYSTEM = `You plan articles for the Blog on squareonepaving.com. Square One Paving installs decorative pavement in British Columbia with its own crews: stamped asphalt, decorative coatings, preformed thermoplastic and vapour blasting. The readers are the people who buy it in BC: municipalities and their engineers and planners, strata councils and property managers, developers and contractors, businesses with a parking lot, and homeowners with a driveway. The articles are found through search and bring them to a free site walk and a written quote.

Propose articles of two kinds:
- guide: a question these readers type into Google, answered from Square One's own pages about one to three SERVICES, SYSTEMS or KINDS OF WORK: driveways, parking lots, strata laneways and fire lanes, municipal crosswalks and streetscapes, parks, schools. Choosing between options, what has to be true of the site first, how it goes in, how long it lasts and how to look after it. Give three to six neutral questions the article answers. A question names no place, client, agency, standard or brand other than Square One's systems and BC, holds no figures, and doesn't assume its answer: "How does a stamped asphalt driveway hold up to a BC winter?", never "Why does StreetPrint outlast concrete?" or "What makes it the only choice for a strata?". No product, material or contractor is ever the villain: no "why paint fails" or "beyond concrete" ideas. No "A vs B" in a title, a search phrase or a question, ever: a choice between materials is framed as what goes where, by job ("Where a parking lot needs thermoplastic markings, and where a coating does the job"), never as a contest.
- roundup: three to six documented jobs from JOBS that share one theme a reader would search for (one kind of work, one system, one kind of place or one region). Use only JOBS ids, and each job in one roundup at most.

Rules:
- Nothing that EXISTING already covers: the same question or search intent counts as covered, whatever the words.
- Search phrases are what a real person types: plain, two to five words, lower case, no brand names unless people search the brand.
- Working titles in sentence case and Canadian English, no em dash, no figures, no exclamation mark, no hype, no claim (best, only, longest), no "vs". Never "case study": a roundup is a project roundup.
- The company that makes the systems is never named.
- About half guides and half roundups, if JOBS allow.`

/** Asks Claude for ideas. Throws when Claude can't be reached; the caller logs it. */
export async function proposeIdeas(claude: Claude, ctx: { existing: readonly Existing[]; jobs: readonly PlannerJob[]; count: number }): Promise<RawIdea[]> {
  const services = SERVICE_OPTIONS.map((o) => {
    const s = SERVICES.find((x) => x.slug === o.value)
    return `- ${o.value}: ${o.title}. ${s?.tagline ?? ""}`.trim()
  })
  const systems = SYSTEM_OPTIONS.map((o) => {
    const p = products.find((x) => x.slug === o.value)
    return `- ${o.value}: ${o.title}. ${p?.tagline ?? ""}`.trim()
  })
  const apps = APPLICATION_OPTIONS.map((o) => {
    const copy = APP_COPY[o.value as keyof typeof APP_COPY]
    return `- ${o.value}: ${o.title}.${copy ? ` ${copy.headline}.` : " The driveways page: stamped asphalt over the driveway you already have."}`
  })
  const user = [
    `Propose ${ctx.count} new articles.`,
    "",
    "SERVICES (slug: name. the page's line):",
    ...services,
    "",
    "SYSTEMS (slug: name. the page's line):",
    ...systems,
    "",
    "KINDS OF WORK (slug: name. the page's headline):",
    ...apps,
    "",
    "JOBS (documented, with no article yet; id | job | place | service | systems | kind of work | year):",
    ...(ctx.jobs.length ? ctx.jobs.map((j) => `- ${j.id} | ${j.title} | ${j.place} | ${j.service} | ${j.systems.join(", ")} | ${j.application} | ${j.year ?? ""}`) : ["(none: propose guides only)"]),
    "",
    "EXISTING (articles and plan items; don't repeat them):",
    ...ctx.existing.map((e) => `- ${e.title}${e.phrases.length ? ` [${e.phrases.slice(0, 3).join("; ")}]` : ""}`),
  ].join("\n")
  const out = await claude<{ ideas?: unknown }>({ model: BLOG_MODEL, system: SYSTEM, user, tool: PROPOSE, maxTokens: 4000, timeoutMs: TIMEOUT_MS, maxRetries: 0 })
  return Array.isArray(out?.ideas) ? (out.ideas as RawIdea[]) : []
}

interface PlanRow {
  title?: string
  status?: string
  searchPhrase?: string
  brief?: string
  jobs?: (string | null)[] | null
}

interface PostRow {
  title?: string
  seoTitle?: string
  tags?: string[] | null
}

/**
 * Tops the plan up when it's low. Returns what it added (titles), or null
 * when the plan didn't need it. An item whose id (from its title) is already
 * taken is skipped, so the same title is never added twice. The cron never
 * runs two of these at once; a run by hand at the same moment could add a
 * second batch, which anyone can set to "Not doing".
 */
export async function topUpPlan(
  deps: { claude: Claude; store: Store },
  subjects: readonly Subject[],
): Promise<{ left: number; added: string[]; dropped: { title: string; why: string }[] } | null> {
  const { store } = deps
  const plan =
    (await store.fetch<PlanRow[] | null>(
      `*[_type == "storyIdea" && !(_id in path("drafts.**"))]{ title, status, searchPhrase, brief, "jobs": projects[]->slug.current }`,
    )) ?? []
  const left = plan.filter((p) => p.status === "idea" || p.status === "ready").length
  if (left >= PLAN_MIN) return null
  const max = PLAN_FILL - left
  // Every article, drafts included, so a draft waiting in Studio is never proposed again.
  const posts = (await store.fetch<PostRow[] | null>(`*[_type == "post" && defined(title)]{ title, seoTitle, tags }`)) ?? []
  const drafted = new Set((await store.fetch<string[] | null>(`*[_id in path("${DRAFT_LOG_PREFIX}*")].project`)) ?? [])
  const existing: Existing[] = [
    ...posts.flatMap((p) => [
      { title: p.title as string, phrases: (p.tags ?? []).filter((t): t is string => typeof t === "string") },
      ...(p.seoTitle?.trim() ? [{ title: p.seoTitle.trim(), phrases: [] }] : []),
    ]),
    ...plan
      .filter((p) => p.title)
      .map((p) => ({ title: p.title as string, phrases: p.searchPhrase ? [p.searchPhrase] : [], brief: p.brief, jobs: (p.jobs ?? []).filter((j): j is string => !!j) })),
  ]
  const all = roundupJobs(subjects, drafted)
  const used = usedJobIds(all, existing)
  const jobs = all.filter((j) => !used.has(j.id))
  const raw = await proposeIdeas(deps.claude, { existing, jobs, count: max + 2 })
  const { docs, dropped } = vetIdeas(raw, { existing, jobs: all, max })
  const added: string[] = []
  for (const doc of docs) {
    try {
      await store.create(doc)
      added.push(doc.title)
    } catch (err) {
      if (!isConflict(err)) throw err
      dropped.push({ title: doc.title, why: "already in the plan under that title" })
    }
  }
  console.log(
    `[planner] ${left} left; added ${added.length}: ${added.map((t) => `"${t}"`).join(", ") || "none"}${dropped.length ? `; dropped ${dropped.map((d) => `"${d.title}" (${d.why})`).join(", ")}` : ""}`,
  )
  return { left, added, dropped }
}
