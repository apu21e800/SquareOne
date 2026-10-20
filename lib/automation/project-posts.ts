/**
 * Project posts (20 Oct 2026, ported from hubss.com's lib/project-posts.ts):
 * Job photos with a story become a project article on the Blog by
 * themselves, and any blog draft set to go live by itself goes live on time.
 *
 * Vern's brief, 20 Oct 2026: "an S1 crew member adds 3 to 10 photos, the
 * place, the service and a line of facts from a phone ... add 'The story' and
 * it becomes a project article, scheduled, its social the day after." Two
 * steps inside the daily run (app/api/cron/social-drafts, 14:00 UTC), each
 * failing on its own and emailing the editors (BLOG_DRAFT_NOTIFY):
 *
 *  1. publishDueDrafts, first: every blog draft set to go live by itself
 *     ("Goes live by itself", sanity/schemaTypes/post.ts) whose time has come
 *     becomes the live post in one transaction, dated that day (a scheduled
 *     edit to a live post keeps the post's date), and the editors get its
 *     address. Its social drafts follow at the next day's run
 *     (lib/automation/social.ts), waiting in Buffer for approval.
 *  2. draftProjectArticles, last, with the time the run has left: the oldest
 *     published Job photos post with a story (fieldPost.writeUp) and no
 *     article yet gets one. The drafter (lib/automation/drafter.ts) writes a
 *     project story from the post's own record and the pages of its service,
 *     systems and kind of work, nothing else; the style pass and the fact
 *     check run as for every draft. It is saved as an unpublished draft with
 *     the post's photographs (the first leads, the rest close the article),
 *     scheduled for the daily run two weekdays out (scheduleSlot), and the
 *     editors are emailed when it goes live and how to change, move or hold
 *     it. A draft a check isn't happy with (an unsupported statement, a
 *     sentence against the house style, no photograph) is saved held
 *     instead: nothing unchecked goes live by itself.
 *
 * A Job photos post with a story makes no social posts of its own
 * (lib/automation/social.ts, hasStory): the job goes out once, as its
 * article. Nothing here posts to social.
 *
 * The pure parts (scheduleSlot, vancouverWhen, jobRecord, readyToGo,
 * buildProjectDocument, toPublished) and both steps, end to end against
 * stand-ins, are tested by `npm run test:project-posts`.
 */
import { SITE_URL } from "@/lib/site"
import { toPortableText, type PortableBlock } from "@/lib/automation/markdown"
import { checkDraft, polishDraft, styleReport, writeDraft, type Draft, type FactCheck, type StylePass } from "@/lib/automation/drafter"
import { categoryFor, jobPostFacts, loadDriveways, loadServices, loadSettings, PUBLISHED_POSTS, relatedFor, type PublishedPost } from "@/lib/automation/facts"
import { cleanSlug, pacificDate } from "@/lib/automation/blog"
import { emailEditors } from "@/lib/automation/editor-mail"
import { isConflict } from "@/lib/automation/outcome"
import { APPLICATION_OPTIONS, PROJECT_STORIES_TAG, SERVICE_OPTIONS, SYSTEM_OPTIONS } from "@/lib/automation/plan"
import type { Claude, Mailer, SanityDoc, Store } from "@/lib/automation/services"

export const VANCOUVER = "America/Vancouver"
/** The daily run's hour (vercel.json, social-drafts): the time a scheduled post goes live. 7 a.m. in Vancouver in summer, 6 a.m. in winter. */
export const RUN_HOUR_UTC = 14
/** A new article is scheduled for the first weekday at least this many days away, so the editors have two days to read it. */
export const LEAD_DAYS = 2
/** A draft is due this long before its time, so the run that starts at 14:00:00 publishes a 14:00 draft. */
const DUE_GRACE_MS = 10 * 60_000
/** Articles written per run: a job a day, like the job photos stream. */
const MAX_ARTICLES_PER_RUN = 1
/**
 * What one article needs of the route's time: three Claude calls that give up
 * after 150 s, 40 s and 60 s (lib/automation/drafter.ts LIMITS), the writes
 * and the email. It runs last and starts only with this much left, so even
 * the slowest run ends inside Vercel's 300 s with its email sent; on a busy
 * morning (social drafting several items) it waits for the next run.
 */
export const NEEDS_MS = 250_000
/** A claim older than this is a run Vercel stopped before it could clear it. */
const STALE_CLAIM_MS = 10 * 60_000

export interface ProjectDeps {
  claude: Claude
  store: Store
  mail: Mailer
  now: () => Date
}

const errorText = (err: unknown) => (err instanceof Error ? err.message : String(err))
const studioLink = (slug: string) => `${SITE_URL}/studio/intent/edit/id=post-${slug};type=post`

// ── when ────────────────────────────────────────────────────────────────────

/**
 * When a new article goes live: the daily run on the first weekday (Monday to
 * Friday) at least LEAD_DAYS days from now, skipping any day another
 * scheduled draft already has, so two jobs posted the same day go out on two
 * days. 14:00 UTC is the same calendar day in Vancouver, so UTC weekdays are
 * Vancouver's here.
 */
export function scheduleSlot(now: Date, taken: Iterable<string> = []): string {
  const used = new Set([...taken].map((t) => t.slice(0, 10)))
  const day = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + LEAD_DAYS, RUN_HOUR_UTC))
  for (let i = 0; i < 60; i++) {
    const weekday = day.getUTCDay()
    const iso = day.toISOString()
    if (weekday !== 0 && weekday !== 6 && !used.has(iso.slice(0, 10))) return iso
    day.setUTCDate(day.getUTCDate() + 1)
  }
  return day.toISOString()
}

/** "Thursday 22 October at 7:00 a.m. Vancouver time", for the emails and the notes. */
export function vancouverWhen(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: VANCOUVER,
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(new Date(iso))
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  return `${get("weekday")} ${get("day")} ${get("month")} at ${get("hour")}:${get("minute")} ${get("dayPeriod")} Vancouver time`
}

/** The date a job was done, as the facts say it: "17 October 2026". */
function doneOn(date: string | null | undefined): string {
  if (!date || !/^\d{4}-\d{2}-\d{2}/.test(date)) return ""
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }).formatToParts(new Date(`${date.slice(0, 10)}T12:00:00Z`))
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  return `${get("day")} ${get("month")} ${get("year")}`
}

// ── the source ──────────────────────────────────────────────────────────────

export interface JobPhoto {
  asset?: string | null
  alt?: string | null
  hotspot?: Record<string, unknown> | null
  crop?: Record<string, unknown> | null
}

/** A Job photos post as the query returns it (sanity/schemaTypes/fieldPost.ts). */
export interface JobPost {
  _id: string
  place?: string | null
  note?: string | null
  writeUp?: string | null
  date?: string | null
  service?: string | null
  systems?: string[] | null
  application?: string | null
  photos?: JobPhoto[] | null
}

const SOURCE = `{ _id, place, note, writeUp, date, service, systems, application, "photos": photos[]{ "asset": asset._ref, alt, hotspot, crop } }`

const serviceTitle = (doc: Pick<JobPost, "service">) => SERVICE_OPTIONS.find((o) => o.value === doc.service)?.title
const systemTitles = (doc: Pick<JobPost, "systems">) =>
  [...new Set(doc.systems ?? [])].map((s) => SYSTEM_OPTIONS.find((o) => o.value === s)?.title).filter((t): t is string => !!t)
const applicationTitle = (doc: Pick<JobPost, "application">) => APPLICATION_OPTIONS.find((o) => o.value === doc.application)?.title

/** The name the job goes by in the emails and the notes: "Stamped asphalt in Langley, BC", as its Studio list shows it. */
export function jobName(doc: Pick<JobPost, "service" | "place">): string {
  return [serviceTitle(doc), doc.place?.trim()].filter(Boolean).join(" in ") || "a Job photos post"
}

/**
 * The job as the post records it: the only source for what the article says
 * about this job. The photographs are described by their alt text, never
 * counted (the canon: no photo counts).
 */
export function jobRecord(doc: JobPost): string {
  const photos = (doc.photos ?? []).filter((p) => p?.asset)
  const shows = photos.map((p) => p.alt?.trim()).filter(Boolean)
  const when = doneOn(doc.date)
  const systems = systemTitles(doc)
  return [
    "THE JOB (Square One's own record of one finished job, posted by the crew with its photographs; treat it as true and complete: say nothing about this job that is not here)",
    `- Where: ${doc.place?.trim()}`,
    when ? `- When it was done: ${when}` : "",
    serviceTitle(doc) ? `- Service: ${serviceTitle(doc)}` : "",
    systems.length ? `- Systems: ${systems.join(", ")}` : "",
    applicationTitle(doc) ? `- Kind of work: ${applicationTitle(doc)}` : "",
    `- What was done (the crew's note): ${doc.note?.trim()}`,
    `- The story (from Square One): ${doc.writeUp?.trim()}`,
    shows.length ? `- The photographs show: ${shows.join("; ")}` : "",
  ]
    .filter(Boolean)
    .join("\n")
}

/** What the drafter is told about this piece; it beats SHAPE (lib/automation/drafter.ts). */
export const PROFILE_INSTRUCTIONS = [
  "This is a PROJECT STORY of one finished job, written from THE JOB and the pages of its service, systems and kind of work: 350 to 600 words, and shorter if THE JOB is short.",
  "The job comes first: where it is (the town and province, as THE JOB gives them) and what went in, in the first paragraph. Then what went in and why that service or system, from THE JOB and the pages; then how it was done or how it has held up, only where THE JOB says so; then the next step.",
  "Never pad it with general pavement writing, and never add a client, a date, a size, a colour, a cost or a reason THE JOB doesn't give. Its photographs are added to the article by themselves: don't describe them one by one, and don't count them.",
  "The headline names the place and the work in plain words, as a local newspaper would.",
].join("\n")

// ── the documents ───────────────────────────────────────────────────────────

type ImageBlock = {
  _type: "image"
  /** Only inside the body; the lead photograph carries none. */
  _key?: string
  asset: { _type: "reference"; _ref: string }
  alt: string
  hotspot?: Record<string, unknown>
  crop?: Record<string, unknown>
}

function imageOf(p: JobPhoto, key: string | null, alt: string): ImageBlock {
  return {
    _type: "image",
    ...(key ? { _key: key } : {}),
    asset: { _type: "reference", _ref: p.asset as string },
    alt,
    ...(p.hotspot ? { hotspot: p.hotspot } : {}),
    ...(p.crop ? { crop: p.crop } : {}),
  }
}

/**
 * Whether a written article may go live by itself: both checks clean and a
 * lead photograph to show. Anything else is saved held, for a person to read
 * first (the canon: no invented facts; the house style: not one em dash).
 */
export function readyToGo(check: FactCheck, style: StylePass | undefined, hasPhoto: boolean): boolean {
  return check.unsupported.length === 0 && (style?.left.length ?? 0) === 0 && hasPhoto
}

/**
 * The scheduled blog draft for a job's article. Pure, so it can be tested
 * without Claude or Sanity. The post's first photograph is the lead
 * photograph; the rest close the article under their own heading, with the
 * post's alt text. `slot` is when it goes live; it is saved held when
 * readyToGo says so, with the time filled in.
 */
export function buildProjectDocument(doc: JobPost, draft: Draft, check: FactCheck, slug: string, slot: string, style?: StylePass, today = new Date()) {
  const photos = (doc.photos ?? []).filter((p) => p?.asset)
  const [first, ...rest] = photos
  const ready = readyToGo(check, style, Boolean(first))
  const name = jobName(doc)
  const when = vancouverWhen(slot)
  const body: (PortableBlock | ImageBlock)[] = [
    ...toPortableText(draft.body, "d"),
    ...(rest.length
      ? [
          { _type: "block" as const, _key: "photos-h2", style: "h2" as const, markDefs: [], children: [{ _type: "span" as const, _key: "photos-h2-s", text: "The job in photographs", marks: [] }] },
          ...rest.map((p, i) => imageOf(p, `photo-${i + 1}`, p.alt?.trim() || `${name}, photo ${i + 2}`)),
        ]
      : []),
  ]
  const town = doc.place?.split(",")[0]?.trim()
  const tags = [...new Map([PROJECT_STORIES_TAG, ...(draft.tags ?? []), ...systemTitles(doc), ...(town ? [town] : [])].map((t) => [t.trim().toLowerCase(), t.trim()])).values()].filter(Boolean).slice(0, 8)

  const notes = [
    `Drafted by Claude on ${pacificDate(today)} from the Job photos post "${name}" (Studio → Job photos): its story, the crew's note, and the ${serviceTitle(doc)?.toLowerCase() ?? "service"} page's words. Nothing else.`,
    "",
    ready
      ? `SCHEDULED: it goes live by itself ${when}. To change a line, edit it here: it still goes out on time. To move it, change "Goes live at". To hold it, turn "Goes live by itself" off. The day after it is live, its social posts are drafted in Buffer for approval.`
      : `HELD: a check below found something, so it does not go live by itself. Read it, fix what's listed, then turn "Goes live by itself" on (it is set for ${when}; a time already past goes at the next morning's run) or press Publish.`,
    "",
    check.unsupported.length
      ? `FACT CHECK: ${check.unsupported.length} statement(s) the job's record and Square One's pages don't back up. Fix or remove them before it goes live:`
      : "FACT CHECK: every statement matches the job's record and Square One's own pages.",
    ...check.unsupported.map((u) => `- "${u.quote}": ${u.reason}`),
    "",
    ...(style ? [...styleReport(style, "before it goes live (Studio marks them in yellow too)"), ""] : []),
    first
      ? `PHOTOS: the post's first photo is the lead photograph${rest.length ? `; the others close the article under "The job in photographs", with the post's descriptions` : ""}.${first.hotspot ? "" : " Drag its focal point onto the pavement."}`
      : "PHOTOS: the post had none with a file, so this is held. Add a lead photograph before it goes live.",
    "",
    "BASED ON:",
    ...draft.factsUsed.map((f) => `- ${f}`),
  ].join("\n")

  return {
    _id: `drafts.post-${slug}`,
    _type: "post",
    title: draft.title.trim(),
    slug: { _type: "slug", current: slug },
    // Today, not the slot: the run dates it again the moment it goes live
    // (toPublished), and a draft published by hand before its day takes that
    // day's date (sanity/actions.ts).
    date: pacificDate(today),
    category: categoryFor({ service: serviceTitle(doc) ?? "", application: applicationTitle(doc) ?? "" }),
    author: "Square One Paving",
    excerpt: draft.excerpt.trim().slice(0, 300),
    body,
    tags,
    editorNotes: notes,
    scheduled: ready,
    scheduledFor: slot,
    ...(first ? { mainImage: imageOf(first, null, first.alt?.trim() || name) } : {}),
    fieldPost: { _type: "reference", _ref: doc._id, _weak: true },
  } satisfies SanityDoc & Record<string, unknown>
}

/** A scheduled draft as the publisher reads it. */
export interface ScheduledDraft {
  _id: string
  _type: string
  _rev?: string
  _createdAt?: string
  _updatedAt?: string
  title?: string | null
  slug?: { current?: string | null } | null
  scheduled?: boolean | null
  scheduledFor?: string | null
  date?: string | null
  editorNotes?: string | null
  [key: string]: unknown
}

/** What toPublished writes: the draft's fields, dated and no longer scheduled. */
export type LiveDocument = SanityDoc & { scheduled: false; date: string; editorNotes: string }

/**
 * The live post a scheduled draft becomes: the same words, no longer set to
 * go by itself, and a line in the notes saying so. A first publish is dated
 * that day in Vancouver (as Studio's Publish dates one, sanity/actions.ts); a
 * scheduled edit to a live post keeps the post's date (`liveDate`), so a
 * correction to an old article doesn't make it the newest post.
 */
export function toPublished(draft: ScheduledDraft, now: Date, liveDate?: string | null): LiveDocument {
  const { _rev, _createdAt, _updatedAt, scheduledFor, scheduled, date, editorNotes, ...rest } = draft
  void _rev
  void _createdAt
  void _updatedAt
  void scheduledFor
  void scheduled
  void date
  const notes = [`${liveDate ? "Edit published" : "Published"} by the morning run, as scheduled, ${vancouverWhen(now.toISOString())}.`, editorNotes?.trim() ?? ""].filter(Boolean).join("\n\n")
  return { ...rest, _id: draft._id.replace(/^drafts\./, ""), _type: draft._type, scheduled: false, date: liveDate || pacificDate(now), editorNotes: notes }
}

// ── step 1: publish what is due ─────────────────────────────────────────────

export interface Published {
  id: string
  slug: string
  title: string
  /** An edit to a post that was already live. */
  edit: boolean
  notified: string[]
}
export interface PublishOutcome {
  published: Published[]
  failed: { id: string; title: string; error: string }[]
}

const DUE = `*[_type == "post" && _id in path("drafts.**") && scheduled == true && defined(scheduledFor) && dateTime(scheduledFor) <= dateTime($by)] | order(scheduledFor asc)`

/**
 * Publishes every scheduled draft whose time has come, one transaction each
 * (the live post written, the draft removed). A draft that can't go (no
 * title or web address, or an address another live post has) is left as it
 * is and the editors are told. `social`: whether Buffer is connected, for
 * the email's line about the posts that follow.
 */
export async function publishDueDrafts(deps: ProjectDeps, now: Date, opts: { social?: boolean } = {}): Promise<PublishOutcome> {
  const { store, mail } = deps
  const out: PublishOutcome = { published: [], failed: [] }
  const due = (await store.fetch<ScheduledDraft[] | null>(DUE, { by: new Date(now.getTime() + DUE_GRACE_MS).toISOString() })) ?? []
  for (const draft of due) {
    const title = draft.title?.trim() ?? ""
    const slug = draft.slug?.current?.trim() ?? ""
    const liveId = draft._id.replace(/^drafts\./, "")
    try {
      if (!title || !slug) throw new Error("it has no title or no web address")
      const [clash, live] = await Promise.all([
        store.fetch<number>(`count(*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && _id != $id])`, { slug, id: liveId }),
        store.fetch<{ date?: string | null } | null>(`*[_id == $id][0]{ date }`, { id: liveId }),
      ])
      if (clash) throw new Error(`another live post already uses /blog/${slug}`)
      const doc = toPublished(draft, now, live?.date)
      try {
        await store.publish(doc, draft._id)
      } catch (err) {
        // A timeout can follow a commit that went through: if the live post
        // is there and the draft is gone, it was published.
        const after = await store.fetch<{ live: boolean; draft: boolean } | null>(`{ "live": defined(*[_id == $live][0]._id), "draft": defined(*[_id == $draft][0]._id) }`, { live: liveId, draft: draft._id })
        if (!(after?.live && !after.draft)) throw err
        console.warn(`[projects] ${draft._id}: the commit answered with an error but went through (${errorText(err)})`)
      }
      console.log(`[projects] published ${liveId} (/blog/${slug}) on schedule${live ? " (an edit to a live post)" : ""}`)
      const at = vancouverWhen(now.toISOString())
      const notified = await emailEditors(
        mail,
        live ? `Updated on squareonepaving.com: ${title}` : `On squareonepaving.com now: ${title}`,
        [
          live
            ? `The scheduled edit to "${title}" went live ${at}. It shows at ${SITE_URL}/blog/${slug} within a minute, with the post's original date.`
            : `"${title}" went live ${at}, as scheduled. It is at ${SITE_URL}/blog/${slug} (the site picks it up within a minute).`,
          "",
          live
            ? "To change it again, edit it in Studio → Blog posts and press Publish."
            : opts.social
              ? "Tomorrow morning's run drafts its social posts in Buffer, for approval. To change the article, edit it in Studio → Blog posts and press Publish."
              : "To change it, edit it in Studio → Blog posts and press Publish.",
        ].join("\n"),
        "projects",
      )
      out.published.push({ id: liveId, slug, title, edit: Boolean(live), notified })
    } catch (err) {
      const error = errorText(err)
      console.error(`[projects] couldn't publish ${draft._id}: ${error}`)
      await emailEditors(
        mail,
        `Scheduled post not published: ${title || draft._id}`,
        [
          `The morning run couldn't publish "${title || draft._id}" at its time, because ${error}.`,
          "",
          'Nothing changed on the site. It stays in Studio → Blog posts set to go live by itself: fix it there and it goes at the next morning\'s run, or turn "Goes live by itself" off and press Publish yourself.',
          "",
          `Open it: ${slug ? studioLink(slug) : `${SITE_URL}/studio`}`,
        ].join("\n"),
        "projects",
      )
      out.failed.push({ id: draft._id, title, error })
    }
  }
  return out
}

// ── step 2: write the next article ──────────────────────────────────────────

export interface Drafted {
  fieldPost: string
  job: string
  id: string
  slug: string
  title: string
  /** When it goes live, or "held" when a check wants a read first. */
  goesLive: string
  factCheck: FactCheck["verdict"]
  toCheck: number
  style: { flagged: number; left: number }
  notified: string[]
}
export interface DraftOutcome {
  drafted: Drafted[]
  /** Job posts with a story still waiting for their article (the next run, or after a fix). */
  waiting: number
  /** Why a post was passed over this run. */
  skipped: string[]
  failed: { fieldPost: string; job: string; error: string }[]
}

const CANDIDATES = `*[_type == "fieldPost" && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && defined(writeUp) && writeUp != "" && !defined(article)] | order(coalesce(date, _createdAt) asc)${SOURCE}`

/**
 * Writes the article for the oldest Job photos post that has a story and no
 * article yet, when the run has NEEDS_MS left before `deadline`. A post that
 * fails (Claude down, a refused write) is reported and tried again next run;
 * nothing is claimed for longer than the writing, and the article's own
 * reference back to the post stops a second one.
 */
export async function draftProjectArticles(deps: ProjectDeps, now: Date, opts: { deadline?: number } = {}): Promise<DraftOutcome> {
  const { store } = deps
  const out: DraftOutcome = { drafted: [], waiting: 0, skipped: [], failed: [] }
  const [candidates, withArticle] = await Promise.all([
    store.fetch<JobPost[] | null>(CANDIDATES),
    // The article exists but the post doesn't say so (the patch failed, or the
    // post was republished from an older draft): never write a second one.
    store.fetch<string[] | null>(`*[_type == "post" && defined(fieldPost._ref)].fieldPost._ref`),
  ])
  const done = new Set(withArticle ?? [])
  const todo: JobPost[] = []
  for (const doc of candidates ?? []) {
    if (done.has(doc._id)) continue
    const why = !serviceTitle(doc) ? "no service" : !doc.place?.trim() ? "no place" : !doc.note?.trim() ? "no note" : !doc.writeUp?.trim() ? "no story" : ""
    if (why) {
      out.skipped.push(`${doc._id}: ${why}`)
      console.warn(`[projects] ${doc._id}: ${why}; no article until it has one`)
      continue
    }
    todo.push(doc)
  }
  let started = 0
  for (const doc of todo.slice(0, MAX_ARTICLES_PER_RUN)) {
    if (opts.deadline && opts.deadline - deps.now().getTime() < NEEDS_MS) {
      console.log(`[projects] no time left this run; ${jobName(doc)} waits for the next`)
      break
    }
    started++
    try {
      const result = await draftOne(deps, doc, now)
      if (result) out.drafted.push(result)
    } catch (err) {
      const error = errorText(err)
      console.error(`[projects] couldn't write the article for ${doc._id} (${jobName(doc)}): ${error}`)
      await emailEditors(
        deps.mail,
        `Project article not written yet: ${jobName(doc)}`,
        [
          `The morning run couldn't write the article for the Job photos post "${jobName(doc)}". Nothing is on the site, and the next morning's run tries again.`,
          "",
          `What happened: ${error}`,
        ].join("\n"),
        "projects",
      )
      out.failed.push({ fieldPost: doc._id, job: jobName(doc), error })
    }
  }
  out.waiting = Math.max(0, todo.length - started)
  return out
}

/** A run's claim on a job post while it writes, so two runs at once (a Run in Vercel on top of the cron) can't write two articles. */
const claimIdFor = (fieldPostId: string) => `projectClaim-${fieldPostId.replace(/[^a-zA-Z0-9._-]/g, "-")}`

/** Takes the claim; false when another run holds a live one. */
async function claim(store: Store, doc: JobPost, now: Date): Promise<boolean> {
  const _id = claimIdFor(doc._id)
  const take = () => store.create({ _id, _type: "projectClaim", fieldPost: doc._id, createdAt: now.toISOString() })
  try {
    await take()
    return true
  } catch (err) {
    if (!isConflict(err)) throw err
    const held = await store.fetch<{ createdAt?: string } | null>(`*[_id == $id][0]{ createdAt }`, { id: _id })
    const age = held?.createdAt ? now.getTime() - Date.parse(held.createdAt) : Infinity
    if (age < STALE_CLAIM_MS) {
      console.log(`[projects] ${doc._id}: another run is writing its article; skipped`)
      return false
    }
    console.warn(`[projects] ${doc._id}: a stale claim from a stopped run; taking over`)
    await store.delete(_id)
    await take()
    return true
  }
}

async function draftOne(deps: ProjectDeps, doc: JobPost, now: Date): Promise<Drafted | null> {
  if (!(await claim(deps.store, doc, now))) return null
  try {
    return await writeArticle(deps, doc, now)
  } finally {
    // The article itself (its fieldPost reference) is what stops a second one
    // from now on; a claim left behind would block a retry after a failure.
    await deps.store.delete(claimIdFor(doc._id)).catch((err: unknown) => console.error(`[projects] ${doc._id}: couldn't clear the claim: ${errorText(err)}`))
  }
}

async function writeArticle(deps: ProjectDeps, doc: JobPost, now: Date): Promise<Drafted | null> {
  const { store, claude, mail } = deps
  const name = jobName(doc)
  const [services, settings, posts] = await Promise.all([loadServices(store), loadSettings(store), store.fetch<PublishedPost[] | null>(PUBLISHED_POSTS)])
  const driveways = doc.application === "driveways" ? await loadDriveways(store) : undefined
  const facts = jobPostFacts({ record: jobRecord(doc), service: doc.service, systems: doc.systems, application: doc.application, services, settings, driveways })
  const category = categoryFor({ service: serviceTitle(doc) ?? "", application: applicationTitle(doc) ?? "" })
  const words = [serviceTitle(doc) ?? "", applicationTitle(doc) ?? ""].flatMap((t) => t.split(/[^A-Za-z]+/)).filter(Boolean)
  const related = relatedFor({ subjects: [], systems: systemTitles(doc), words, categories: [category] }, posts ?? [])

  const written = await writeDraft(claude, { title: name, kind: "project", instructions: PROFILE_INSTRUCTIONS }, facts, related)
  const { draft, style } = await polishDraft(claude, written)
  const check = await checkDraft(claude, draft, facts)

  // Right before writing, so two runs at once can't both get here: the other
  // run's article is there by now.
  if (await store.fetch<number>(`count(*[_type == "post" && fieldPost._ref == $id])`, { id: doc._id })) {
    console.log(`[projects] ${doc._id}: another run wrote its article; skipped`)
    return null
  }
  const taken = (await store.fetch<string[] | null>(`*[_type == "post" && scheduled == true && defined(scheduledFor)].scheduledFor`)) ?? []
  const slot = scheduleSlot(now, taken)

  // A web address nobody uses, drafts included, and an id no post has (as the drafter, lib/automation/blog.ts).
  const base = cleanSlug(draft.slug || draft.title) || cleanSlug(name) || `project-${now.getTime()}`
  let slug = base
  const inUse = (s: string) => store.fetch<number>(`count(*[(_type == "post" && slug.current == $slug) || _id in [$id, $draftId]])`, { slug: s, id: `post-${s}`, draftId: `drafts.post-${s}` })
  for (let n = 2; await inUse(slug); n++) slug = `${base}-${n}`

  const document = buildProjectDocument(doc, draft, check, slug, slot, style, now)
  // Saved held, whatever the checks said: it is switched on only once the
  // editors have been told (below). A draft nobody knows about must never go
  // live by itself.
  await store.create({ ...document, scheduled: false })
  const liveId = document._id.replace(/^drafts\./, "")
  try {
    await store.patch(doc._id, { article: { _type: "reference", _ref: liveId, _weak: true } })
  } catch (err) {
    // The article exists and carries fieldPost, which is what stops a second
    // one; the post just won't show the link.
    console.error(`[projects] ${doc._id}: couldn't note the article on the post: ${errorText(err)}`)
  }
  console.log(
    `[projects] wrote "${document.title}" as ${document._id} from ${doc._id}; goes live ${document.scheduled ? slot : "when released (held)"}; fact check: ${check.verdict} (${check.unsupported.length}); style: ${style.left.length} of ${style.flagged} left${style.error ? ` (rewrite failed: ${style.error})` : ""}`,
  )

  const when = vancouverWhen(slot)
  let ready = document.scheduled
  const notified = await emailEditors(
    mail,
    ready ? `Goes live ${when.replace(/ at .*$/, "")} unless you hold it: ${document.title}` : `Needs a read before it goes: ${document.title}`,
    [
      ready
        ? `A project article was written from the Job photos post "${name}" and goes live on squareonepaving.com by itself ${when}. Nothing is on the site until then. The day after it is live, its social posts are drafted in Buffer for approval.`
        : `A project article was written from the Job photos post "${name}", but a check found something (below), so it waits in Studio → Blog posts and does not go live by itself. Fix it, then turn "Goes live by itself" on or press Publish.`,
      "",
      document.title,
      document.excerpt,
      "",
      `Read it: ${studioLink(slug)}`,
      ...(ready
        ? ["- To change a line, edit it there: it still goes out on time.", '- To hold it, turn "Goes live by itself" off: it then waits for you.', '- To move it, change "Goes live at" to a later day.']
        : []),
      "",
      check.unsupported.length
        ? `Fact check: ${check.unsupported.length} statement(s) to check before it goes live. They're listed in the draft's "Notes for the editor".`
        : "Fact check: every statement matches the job's record and Square One's own pages.",
      style.left.length
        ? `Style check: ${style.left.length} sentence(s) still break the house style. They're listed in the notes and marked in yellow in Studio.`
        : "Style check: no em dashes, no machine tells, nothing against the canon.",
      ...(document.mainImage ? [] : ["Photo: the post had none with a file. Add a lead photograph before it goes live."]),
    ].join("\n"),
    "projects",
  )
  if (ready) {
    if (notified.length) {
      try {
        await store.patch(document._id, { scheduled: true })
      } catch (err) {
        ready = false
        console.error(`[projects] ${document._id}: couldn't switch it on after the email: ${errorText(err)}; it stays held`)
        await emailEditors(
          mail,
          `Correction, held after all: ${document.title}`,
          `"${document.title}" could not be set to go live by itself (${errorText(err)}). It waits in Studio → Blog posts: read it, then turn "Goes live by itself" on or press Publish.\n\nOpen it: ${studioLink(slug)}`,
          "projects",
        )
      }
    } else {
      ready = false
      console.error(`[projects] ${document._id}: the email didn't go, so the draft is held, not scheduled`)
      await store
        .patch(document._id, { editorNotes: `HELD: not set to go live by itself, because the email about it could not be sent. Read it, then turn "Goes live by itself" on or press Publish.\n\n${document.editorNotes}` })
        .catch((err: unknown) => console.error(`[projects] ${document._id}: couldn't note the hold: ${errorText(err)}`))
    }
  }
  return {
    fieldPost: doc._id,
    job: name,
    id: document._id,
    slug,
    title: document.title,
    goesLive: ready ? slot : "held",
    factCheck: check.verdict,
    toCheck: check.unsupported.length,
    style: { flagged: style.flagged, left: style.left.length },
    notified,
  }
}
