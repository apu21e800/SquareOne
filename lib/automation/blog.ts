/**
 * The blog pipeline (14 Oct 2026, ported from hubss.com's
 * lib/field-note-pipeline.ts): the top item in Studio's Blog plan → a draft
 * from Square One's own pages and documented jobs → the style pass → the
 * fact check → an UNPUBLISHED post in Studio → an email naming the next
 * idea. Then, when the plan is low and there's time, new Ideas at the bottom
 * (lib/automation/planner.ts). See lib/automation/drafter.ts for the writing
 * and lib/automation/facts.ts for what it may say.
 *
 * Run by app/api/cron/draft-post on Tuesdays and Thursdays at 13:00 UTC
 * (vercel.json), and on demand from Vercel → square-one → Settings → Cron
 * Jobs → Run.
 *
 * Which item: the top one marked Ready; when none is, the top Idea (priority,
 * then age). An item that can't be written (a project story whose job
 * already has a post, a roundup whose jobs are off the site, a guide with
 * nothing ticked) is passed over and named in the email. A run that finds the
 * plan empty only fills it, so a person can look at the new ideas before the
 * next run drafts one.
 *
 * What it will never do: publish. It writes a document whose id starts with
 * "drafts.", which Sanity keeps out of the published perspective the site
 * reads (sanity/lib/client.ts), so nothing shows on squareonepaving.com until
 * a person opens it in Studio, checks the notes and presses Publish.
 *
 * Fail loud (runDrafter): a run that can't draft emails the editor what
 * happened and the fix, naming the key (lib/automation/outcome.ts).
 */
import { SITE_URL } from "@/lib/site"
import { toPortableText, type PortableBlock } from "@/lib/automation/markdown"
import { checkDraft, polishDraft, styleReport, writeDraft, type Draft, type FactCheck, type StylePass } from "@/lib/automation/drafter"
import {
  captionFor,
  categoryForArticle,
  documentedJobs,
  factsBlock,
  loadDriveways,
  loadServices,
  loadSettings,
  loadSubjects,
  PUBLISHED_POSTS,
  recordTags,
  relatedFor,
  serviceFor,
  jobPlace,
  type PublishedPost,
  type Subject,
  type SubjectPhoto,
} from "@/lib/automation/facts"
import { notifyList, type Claude, type Mailer, type SanityDoc, type Store } from "@/lib/automation/services"
import { topUpPlan } from "@/lib/automation/planner"
import { blogFailureEmail, failureHint } from "@/lib/automation/outcome"
import { DRAFT_LOG_PREFIX } from "@/lib/automation/logs"
import { tagPasses } from "@/lib/automation/style"
import { vancouverZone } from "@/lib/bc-time"
import {
  APPLICATION_OPTIONS,
  isApplication,
  isService,
  isSystem,
  PROJECT_STORIES_TAG,
  ROUNDUP_MAX,
  ROUNDUP_MIN,
  SERVICE_OPTIONS,
  SYSTEM_OPTIONS,
  type PlanKind,
} from "@/lib/automation/plan"

export interface BlogDeps {
  claude: Claude
  store: Store
  mail: Mailer
  now: () => Date
}

/** Where a drafted project is written down, so the planner never offers it again. Ids with a dot are private in Sanity. */
export const DRAFT_LOG = DRAFT_LOG_PREFIX

/** Below this many items left (Ideas and Ready), the email says the plan is running low. */
const PLAN_LOW = 3
/** The plan is topped up only when this little of the route's 300 s has gone (the planner gives up after 80 s). */
export const TOP_UP_BEFORE_MS = 200_000

/** A Blog plan item as the drafter reads it (sanity/schemaTypes/storyIdea.ts). */
export interface PlanItem {
  _id: string
  title?: string | null
  status?: string | null
  priority?: number | null
  type?: string | null
  searchPhrase?: string | null
  brief?: string | null
  services?: string[] | null
  systems?: string[] | null
  applications?: string[] | null
  /** The web addresses of the projects it refers to (null where a reference no longer resolves). */
  projects?: (string | null)[] | null
}

const ITEM = `{ _id, title, status, priority, type, searchPhrase, brief, services, systems, applications, "projects": projects[]->slug.current }`
/** The open items: Ideas and Ready, never a draft (a plan item is edited live, so its id has no "drafts." prefix). */
const OPEN = `*[_type == "storyIdea" && status in ["ready", "idea"] && !(_id in path("drafts.**"))]`
/** Ready first, then Ideas; within each, priority, then age, then id (so items made in the same second keep their order). */
export const NEXT_ORDER = `order(select(status == "ready" => 0, 1) asc, coalesce(priority, 2) asc, _createdAt asc, _id asc)`

export type Picked = "ready" | "next idea" | "asked for" | "project"

export interface PassedOver {
  title: string
  why: string
}

export type BlogResult =
  | {
      drafted: false
      reason: string
      /** What to do, when a person has to act. */
      hint?: string
      /** A person has to act: the run emails the editor (runDrafter). */
      alert?: boolean
      /** The run itself failed (the route answers 500). */
      error?: boolean
      planAdded?: string[]
      passedOver?: PassedOver[]
      notified?: string[]
    }
  | {
      drafted: true
      idea?: string
      picked: Picked
      kind: PlanKind
      slug: string
      title: string
      factCheck: FactCheck["verdict"]
      toCheck: number
      style: { flagged: number; left: number }
      photo: boolean
      ideasLeft: number
      next: string | null
      passedOver: PassedOver[]
      planAdded: string[]
      notified: string[]
    }

/** Today in BC, as the post's date (YYYY-MM-DD), on any runtime's timezone data (lib/bc-time.ts). */
export function pacificDate(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: vancouverZone(now), year: "numeric", month: "2-digit", day: "2-digit" }).format(now)
}

export function cleanSlug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/, "")
}

/** A web path with each segment encoded once (the record mixes raw and encoded names). */
function encodePath(src: string): string {
  return src
    .split("/")
    .map((seg) => {
      try {
        return encodeURIComponent(decodeURIComponent(seg))
      } catch {
        return encodeURIComponent(seg)
      }
    })
    .join("/")
}

const isKind = (k: unknown): k is PlanKind => k === "project" || k === "roundup" || k === "guide"

/** A guide's ticked services, systems and kinds of work that the site has pages for. */
function guideOf(item: PlanItem) {
  return {
    services: [...new Set(item.services ?? [])].filter(isService),
    systems: [...new Set(item.systems ?? [])].filter(isSystem),
    applications: [...new Set(item.applications ?? [])].filter(isApplication),
  }
}

/** The jobs a project story or roundup tells, in the plan's order: on the site, location confirmed. */
function jobsOf(item: PlanItem, bySlug: ReadonlyMap<string, Subject>): Subject[] {
  return (item.projects ?? [])
    .map((slug) => (slug ? bySlug.get(slug) : undefined))
    .filter((s): s is Subject => !!s && !s.flag)
}

/** Why a plan item can't be drafted now, or null when it can. Pure, for the tests. */
export function planProblem(item: PlanItem, bySlug: ReadonlyMap<string, Subject>): string | null {
  if (!item.title?.trim()) return "it has no working title"
  if (!isKind(item.type)) return "no kind of article is set"
  if (item.type === "guide") {
    const g = guideOf(item)
    return g.services.length + g.systems.length + g.applications.length ? null : "a guide needs a service, system or kind of work ticked"
  }
  const refs = (item.projects ?? []).length
  const jobs = jobsOf(item, bySlug)
  if (item.type === "project") {
    if (refs !== 1) return "a project story tells exactly one project"
    const s = jobs[0]
    if (!s) return "its project is off the site, deleted, or awaiting a yes on its location"
    if (s.post) return `"${s.title}" already has a post`
    if (!s.photos.length) return `"${s.title}" has no photograph`
    return null
  }
  if (jobs.length < ROUNDUP_MIN) return `a roundup needs ${ROUNDUP_MIN} projects on the site; it has ${jobs.length}`
  return null
}

/** Adds Ideas when the plan is low; a failure is logged and returned, never thrown, so it can't cost a draft or its email. */
async function keepPlanStocked(deps: BlogDeps, subjects: readonly Subject[]): Promise<{ added: string[]; error?: unknown }> {
  try {
    return { added: (await topUpPlan(deps, subjects))?.added ?? [] }
  } catch (err) {
    console.error(`[planner] couldn't top up the plan: ${err instanceof Error ? err.message : String(err)}`)
    return { added: [], error: err }
  }
}

export async function draftNextPost(opts: { idea?: string; project?: string }, deps: BlogDeps): Promise<BlogResult> {
  const started = deps.now().getTime()
  const { store } = deps
  const subjects = await loadSubjects(store)
  const bySlug = new Map(subjects.map((s) => [s.slug, s]))

  // ── which article ─────────────────────────────────────────────────────────
  let item: PlanItem | undefined
  let kind: PlanKind
  let jobs: Subject[]
  let picked: Picked
  const passedOver: PassedOver[] = []

  if (opts.project) {
    // One project asked for by name, outside the plan: drafted even if it was drafted before (a second go), never without a photograph.
    const s = bySlug.get(opts.project)
    if (!s) return { drafted: false, reason: `no project "${opts.project}" on the record or in Studio` }
    if (!s.photos.length) return { drafted: false, reason: `"${opts.project}" has no photograph` }
    kind = "project"
    jobs = [s]
    picked = "project"
  } else {
    const candidates = opts.idea
      ? ((await store.fetch<PlanItem[] | null>(`*[_type == "storyIdea" && _id == $id]${ITEM}`, { id: opts.idea })) ?? [])
      : ((await store.fetch<PlanItem[] | null>(`${OPEN} | ${NEXT_ORDER}[0...25]${ITEM}`)) ?? [])
    if (!candidates.length) {
      if (opts.idea) return { drafted: false, reason: `no plan item ${opts.idea}` }
      // An empty plan (the top-ups failed for a while, or the very first run):
      // fill it and stop, so the new ideas sit in Studio for a person to look
      // at before the next run drafts one.
      const { added, error } = await keepPlanStocked(deps, subjects)
      return added.length
        ? {
            drafted: false,
            alert: true,
            reason: `there were no Blog ideas left, so this run added ${added.length} new idea${added.length === 1 ? "" : "s"} instead of drafting: ${added.map((t) => `"${t}"`).join(", ")}`,
            hint: "Look them over in Studio → Blog ideas: reorder them, set one to Ready, or set any to Not doing. The next run drafts the top one.",
            planAdded: added,
          }
        : {
            drafted: false,
            alert: true,
            reason: `there are no Ready items or Ideas left in Blog ideas, and no new ones could be added${error ? ` (${error instanceof Error ? error.message : String(error)})` : ""}`,
            hint: error ? failureHint(error, "blog") : "Add an idea in Studio → Blog ideas: a project story about a job in Projects is the quickest.",
            planAdded: [],
          }
    }
    for (const c of candidates) {
      const why = planProblem(c, bySlug)
      if (!why) {
        item = c
        break
      }
      passedOver.push({ title: c.title?.trim() || c._id, why })
      if (opts.idea) return { drafted: false, reason: `the plan item can't be drafted: ${why}`, passedOver }
    }
    if (!item) {
      return {
        drafted: false,
        alert: true,
        reason: `none of the ${candidates.length} open item${candidates.length === 1 ? "" : "s"} in Blog ideas can be drafted: ${passedOver.map((p) => `"${p.title}" (${p.why})`).join("; ")}`,
        hint: "Fix those items in Studio → Blog ideas, set them to Not doing, or add a new one.",
        passedOver,
      }
    }
    kind = item.type as PlanKind
    jobs = kind === "guide" ? [] : jobsOf(item, bySlug).slice(0, kind === "project" ? 1 : ROUNDUP_MAX)
    picked = opts.idea ? "asked for" : item.status === "ready" ? "ready" : "next idea"
  }

  // ── what it may say ───────────────────────────────────────────────────────
  const guide = kind === "guide" && item ? guideOf(item) : undefined
  const [services, settings, posts] = await Promise.all([loadServices(store), loadSettings(store), store.fetch<PublishedPost[] | null>(PUBLISHED_POSTS)])
  const driveways = guide?.applications.includes("driveways") ? await loadDriveways(store) : undefined
  // A guide's documented jobs (20 Oct 2026): the article may lead with one, and its photograph is then the article's.
  const documented = guide ? documentedJobs(subjects, guide, item?.brief) : []
  const facts = factsBlock({ kind, subjects: jobs, services, guide, driveways, settings, brief: item?.brief, documented })
  const category = categoryForArticle(kind, jobs)
  const guideSystems = (guide?.systems ?? []).map((slug) => SYSTEM_OPTIONS.find((o) => o.value === slug)?.title ?? slug)
  const guideWords = [
    ...(guide?.applications ?? []).map((slug) => APPLICATION_OPTIONS.find((o) => o.value === slug)?.title ?? ""),
    ...(guide?.services ?? []).map((slug) => SERVICE_OPTIONS.find((o) => o.value === slug)?.title ?? ""),
  ]
    .flatMap((t) => t.split(/[^A-Za-z]+/))
    .filter(Boolean)
  const related = relatedFor({ subjects: jobs, systems: guideSystems, words: guideWords, categories: [category] }, posts ?? [])

  // ── the writing ───────────────────────────────────────────────────────────
  const title = item?.title?.trim() || jobs[0]?.title || "Untitled"
  const written = await writeDraft(deps.claude, { title, kind, searchPhrase: item?.searchPhrase }, facts, related)
  // House style before the fact check, so the check (and the notes) quote the final wording.
  const { draft, style } = await polishDraft(deps.claude, written)
  const check = await checkDraft(deps.claude, draft, facts)

  // A web address nobody uses, drafts included, and an id no post has: a
  // draft whose id is "drafts.post-<slug>" belongs to the post "post-<slug>",
  // so a post whose web address was changed must not be drafted over.
  const base = cleanSlug(draft.slug || draft.title) || cleanSlug(title) || `blog-draft-${Date.now()}`
  let slug = base
  const taken = (s: string) =>
    store.fetch<number>(`count(*[(_type == "post" && slug.current == $slug) || _id in [$id, $draftId]])`, { slug: s, id: `post-${s}`, draftId: `drafts.post-${s}` })
  for (let n = 2; await taken(slug); n++) slug = `${base}-${n}`

  // ── the lead photograph ───────────────────────────────────────────────────
  const photo = await leadPhoto({ kind, jobs, documented, leadJob: draft.leadJob, serviceSlugs: guide?.services ?? [] }, store)

  const date = pacificDate(deps.now())
  const from = item ? `the Blog idea "${title}"` : `the project "${jobs[0].title}"`
  const doc = buildDraftDocument({ kind, from, subjects: jobs, draft, check, style, slug, photo, date, category, systems: guideSystems })
  await store.create(doc)

  // ── the records ───────────────────────────────────────────────────────────
  // The draft exists from here on: nothing below may turn the run into a
  // "no draft" email, so each step is on its own and a failure is noted.
  let planNote = ""
  if (item) {
    try {
      await store.patch(item._id, { status: "drafted", draftSlug: slug, draftedAt: deps.now().toISOString() })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`[blog] couldn't mark ${item._id} Drafted: ${message}`)
      planNote = `The plan item couldn't be marked Drafted (${message}): set it to Drafted in Studio → Blog ideas, or the next run writes it again.`
    }
  }
  if (kind === "project") {
    await store
      .createOrReplace({
        _id: `${DRAFT_LOG}${jobs[0].slug}`,
        _type: "automationDraftLog",
        project: jobs[0].slug,
        post: slug,
        title: doc.title,
        createdAt: deps.now().toISOString(),
        factCheck: check.verdict,
        toCheck: check.unsupported.length,
        styleLeft: style.left.length,
      })
      .catch((err: unknown) => console.error(`[blog] couldn't log ${jobs[0].slug}: ${err instanceof Error ? err.message : String(err)}`))
  }
  console.log(
    `[blog] drafted "${doc.title}" (${kind}) as ${doc._id} from ${item ? item._id : jobs[0].slug}; fact check: ${check.verdict} (${check.unsupported.length}); style: ${style.left.length} of ${style.flagged} left${style.error ? ` (rewrite failed: ${style.error})` : ""}`,
  )

  // ── the email, then the plan ──────────────────────────────────────────────
  const { ideasLeft, next } = await store
    .fetch<{ ideasLeft: number; next: string | null } | null>(`{ "ideasLeft": count(${OPEN}), "next": ${OPEN} | ${NEXT_ORDER}[0].title }`)
    .then((r) => r ?? { ideasLeft: -1, next: null })
    .catch((err: unknown) => {
      console.error(`[blog] couldn't count the plan: ${err instanceof Error ? err.message : String(err)}`)
      return { ideasLeft: -1, next: null }
    })
  const to = notifyList()
  const sent = await deps
    .mail({
      to,
      subject: `Blog draft ready in Studio: ${doc.title}`,
      text: draftEmail({ title: doc.title, excerpt: doc.excerpt, slug, check, style, photo: Boolean(photo), picked, from: title, ideasLeft, next, passedOver, planNote }),
    })
    .catch((err: unknown) => {
      console.error(`[blog] the email failed: ${err instanceof Error ? err.message : String(err)}`)
      return false
    })
  // After the email, so a slow planner can't cost it.
  let planAdded: string[] = []
  if (deps.now().getTime() - started < TOP_UP_BEFORE_MS) planAdded = (await keepPlanStocked(deps, subjects)).added
  else console.log("[planner] no time left this run; the next run tops the plan up")

  return {
    drafted: true,
    ...(item ? { idea: item._id } : {}),
    picked,
    kind,
    slug,
    title: doc.title,
    factCheck: check.verdict,
    toCheck: check.unsupported.length,
    style: { flagged: style.flagged, left: style.left.length },
    photo: Boolean(photo),
    ideasLeft,
    next: next ?? null,
    passedOver,
    planAdded,
    notified: sent ? to : [],
  }
}

export interface LeadPhoto {
  asset: string
  alt: string
  /** The focal point and crop the office set on the job's photograph in Studio, when it is one of Studio's. */
  hotspot?: SubjectPhoto["hotspot"]
  crop?: SubjectPhoto["crop"]
  /** The PHOTO line of the editor's notes. */
  note: string
}

/**
 * The job whose photograph leads the article (20 Oct 2026, as hubss.com's
 * leadJobFor): a project story's own job; for a roundup, the job the draft
 * leads with if it is one of the roundup's, else the first; for a guide, the
 * documented job the draft leads with, if it is one of those its facts listed
 * and has a photograph (an id the drafter made up or misspelt gets the
 * stand-in). Pure.
 */
export function leadJobFor(kind: PlanKind, jobs: readonly Subject[], documented: readonly Subject[], leadJob: string | undefined): { job: Subject; named: boolean } | null {
  const id = leadJob?.trim()
  if (kind === "project") return jobs[0] ? { job: jobs[0], named: true } : null
  if (kind === "roundup") {
    const named = id ? jobs.find((j) => j.slug === id && j.photos.length) : undefined
    return named ? { job: named, named: true } : jobs[0] ? { job: jobs[0], named: false } : null
  }
  const named = id ? documented.find((j) => j.slug === id && j.photos.length) : undefined
  return named ? { job: named, named: true } : null
}

/** The draft's lead photograph: its lead job's (leadJobFor), else, for a guide, the first service page's as a stand-in. */
async function leadPhoto(
  a: { kind: PlanKind; jobs: readonly Subject[]; documented: readonly Subject[]; leadJob?: string; serviceSlugs: readonly string[] },
  store: Store,
): Promise<LeadPhoto | null> {
  const upload = async (src: string) => {
    const name = decodeURIComponent(src.split("/").pop() ?? "photo.jpg")
    return store.uploadImage(`${SITE_URL}${encodePath(src)}`, name).catch((err: unknown) => {
      console.error(`[blog] photo upload failed: ${err instanceof Error ? err.message : String(err)}`)
      return null
    })
  }
  const lead = leadJobFor(a.kind, a.jobs, a.documented, a.leadJob)
  if (a.leadJob && a.kind === "guide" && !lead) console.warn(`[blog] the draft leads with "${a.leadJob}", which is not one of its documented jobs with a photograph; the photo is the stand-in`)
  if (lead) {
    const { job } = lead
    const photo = job.photos[0]
    const asset = photo ? (photo.asset ?? (photo.src ? await upload(photo.src) : null)) : null
    if (photo && asset) {
      const alt = captionFor(photo) || `${job.title}, ${jobPlace(job)}`
      const framed = Boolean(photo.asset && photo.hotspot)
      const focal = framed ? "Its focal point is the one set on the project in Studio." : "Drag the focal point onto the pavement."
      return {
        asset,
        alt,
        ...(photo.asset && photo.hotspot ? { hotspot: photo.hotspot } : {}),
        ...(photo.asset && photo.crop ? { crop: photo.crop } : {}),
        note:
          a.kind === "project"
            ? `PHOTO: the project's lead photograph (${alt}). ${focal}`
            : lead.named
              ? `PHOTO: the lead photograph of "${job.title}" (${alt}), the job the article leads with. ${focal}`
              : `PHOTO: a stand-in, the lead photograph of "${job.title}" (${alt}). ${focal} Or swap in another job's photograph.`,
      }
    }
    if (a.kind !== "guide") return null
  }
  if (a.kind !== "guide") return null
  const service = a.serviceSlugs.map((s) => serviceFor(s)).find((s) => s?.imageUrl)
  if (!service) return null
  const asset = await upload(service.imageUrl)
  if (!asset) return null
  return { asset, alt: service.imageAlt, note: `PHOTO: a stand-in, the ${service.name.toLowerCase()} page's photograph (${service.imageAlt}). If the guide shows one job, swap in its photograph.` }
}

function draftEmail(a: {
  title: string
  excerpt: string
  slug: string
  check: FactCheck
  style: StylePass
  photo: boolean
  picked: Picked
  from: string
  ideasLeft: number
  next: string | null
  passedOver: PassedOver[]
  planNote: string
}): string {
  const fromLine = {
    ready: `From the plan: "${a.from}".`,
    "next idea": `From the plan: "${a.from}" (the next Idea; nothing was marked Ready).`,
    "asked for": `From the plan: "${a.from}" (asked for by name).`,
    project: `A project story about "${a.from}", asked for by name.`,
  }[a.picked]
  return [
    "A new blog draft is waiting in Studio. Nothing is on squareonepaving.com until someone publishes it.",
    "",
    a.title,
    a.excerpt,
    "",
    fromLine,
    ...(a.ideasLeft < 0
      ? []
      : [
          a.ideasLeft < PLAN_LOW
            ? `The plan is running low: ${a.ideasLeft} item${a.ideasLeft === 1 ? "" : "s"} left. New ideas are added by themselves when it gets low; you can add your own in Studio → Blog ideas.`
            : `${a.ideasLeft} items left in the plan.`,
        ]),
    ...(a.next ? [`Next up: "${a.next}". To change it, reorder or edit Blog ideas in Studio.`] : []),
    ...(a.passedOver.length ? [`Passed over: ${a.passedOver.map((p) => `"${p.title}" (${p.why})`).join("; ")}. Fix them in Studio → Blog ideas, or set them to Not doing.`] : []),
    ...(a.planNote ? [a.planNote] : []),
    "",
    a.check.unsupported.length
      ? `Fact check: ${a.check.unsupported.length} statement(s) to check before publishing. They're listed in the draft's "Notes for the editor".`
      : "Fact check: every statement matches Square One's own pages and records.",
    a.style.left.length
      ? `Style check: ${a.style.left.length} sentence(s) still break the house style. They're listed in the notes and marked in yellow in Studio.`
      : "Style check: no em dashes, no machine tells, nothing against the canon.",
    a.photo ? "" : "Photo: none attached. Add one of Square One's own photographs before publishing.",
    "",
    `Open it: ${SITE_URL}/studio/intent/edit/id=post-${a.slug};type=post`,
  ]
    .filter((l, i, all) => !(l === "" && all[i - 1] === ""))
    .join("\n")
}

/** Tags, unique whatever their case, first ones first, at most eight. */
function tagList(first: readonly string[], rest: readonly string[]): string[] {
  const out = new Map<string, string>()
  for (const t of [...first, ...rest].map((x) => x.trim()).filter(tagPasses)) if (!out.has(t.toLowerCase())) out.set(t.toLowerCase(), t)
  return [...out.values()].slice(0, 8)
}

/**
 * The unpublished post for a draft. Pure, so it can be checked without
 * Claude or Sanity. Its id is "drafts.post-<slug>", the draft of the same
 * "post-<slug>" id the seed gives every imported post.
 */
export function buildDraftDocument(a: {
  kind: PlanKind
  /** What it was written from, for the notes: `the Blog idea "…"`. */
  from: string
  subjects: readonly Subject[]
  draft: Draft
  check: FactCheck
  style: StylePass
  slug: string
  photo: LeadPhoto | null
  date: string
  category: string
  /** A guide's systems, by name, for its tags. */
  systems?: readonly string[]
}): SanityDoc & { title: string; excerpt: string; body: PortableBlock[] } {
  const body = toPortableText(a.draft.body, "d")
  const tags =
    a.kind === "guide"
      ? tagList(a.draft.tags ?? [], a.systems ?? [])
      : tagList([PROJECT_STORIES_TAG], [...(a.draft.tags ?? []), ...a.subjects.flatMap(recordTags)])
  const notes = [
    `Drafted by Claude on ${a.date} from ${a.from}. Not on the site until someone presses Publish.`,
    "",
    a.check.unsupported.length
      ? `FACT CHECK: ${a.check.unsupported.length} statement(s) Square One's pages and records don't back up. Fix or remove them before publishing:`
      : "FACT CHECK: every statement matches Square One's own pages and records.",
    ...a.check.unsupported.map((u) => `- "${u.quote}": ${u.reason}`),
    "",
    ...styleReport(a.style, "before publishing (Studio marks them in yellow too)"),
    "",
    a.photo ? a.photo.note : "PHOTO: none. Add one of Square One's own photographs before publishing.",
    "",
    "BASED ON:",
    ...a.draft.factsUsed.map((f) => `- ${f}`),
    "",
    "Before publishing: read it through and clear these notes. They are never shown on the site. The first Publish dates the post that day.",
  ].join("\n")

  return {
    _id: `drafts.post-${a.slug}`,
    _type: "post",
    title: a.draft.title.trim(),
    slug: { _type: "slug", current: a.slug },
    date: a.date,
    category: a.category,
    author: "Square One Paving",
    excerpt: a.draft.excerpt.trim().slice(0, 300),
    body,
    tags,
    editorNotes: notes,
    ...(a.photo
      ? {
          mainImage: {
            _type: "image",
            asset: { _type: "reference", _ref: a.photo.asset },
            alt: a.photo.alt,
            ...(a.photo.hotspot ? { hotspot: a.photo.hotspot } : {}),
            ...(a.photo.crop ? { crop: a.photo.crop } : {}),
          },
        }
      : {}),
  }
}

/**
 * A run of the drafter that fails loud: when it makes no draft and a person
 * has to act (the plan is empty or stuck, a key is refused, Claude didn't
 * finish), the editor gets an email saying what happened and what to do.
 */
export async function runDrafter(opts: { idea?: string; project?: string }, deps: BlogDeps): Promise<BlogResult> {
  let result: BlogResult
  try {
    result = await draftNextPost(opts, deps)
  } catch (err) {
    // Nothing was marked Drafted, so the next run tries the same item again.
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[blog] draft failed: ${message}`)
    result = { drafted: false, error: true, alert: true, reason: message, hint: failureHint(err, "blog") }
  }
  if (result.drafted || !result.alert) return result
  const to = notifyList()
  const { subject, text } = blogFailureEmail(result.reason, result.hint ?? failureHint(result.reason, "blog"))
  const sent = await deps.mail({ to, subject, text }).catch((err: unknown) => {
    console.error(`[blog] the failure email failed too: ${err instanceof Error ? err.message : String(err)}`)
    return false
  })
  return { ...result, notified: sent ? to : [] }
}

/** The email when a run can't even start: a key it needs is missing in Vercel. */
export async function notifyNotConfigured(mail: Mailer, missing: readonly string[]): Promise<boolean> {
  const reason = `Not configured: ${missing.join(", ")}`
  const { subject, text } = blogFailureEmail(reason, failureHint(new Error(reason), "blog"))
  return mail({ to: notifyList(), subject, text }).catch(() => false)
}
