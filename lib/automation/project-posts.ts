/**
 * Project posts (20 Oct 2026, ported from hubss.com's lib/project-posts.ts):
 * Job photos with a story become a project article on the Blog by
 * themselves, and any blog draft set to go live by itself goes live on time.
 *
 * Vern's brief, 20 Oct 2026: "an S1 crew member adds 3 to 10 photos, the
 * place, the service and a line of facts from a phone ... add 'The story' and
 * it becomes a project article, scheduled, its social the day after." Two
 * steps, each failing on its own and emailing the editors (BLOG_DRAFT_NOTIFY):
 *
 *  1. publishDueDrafts, first in the daily run (app/api/cron/social-drafts,
 *     14:00 UTC): every blog draft set to go live by itself ("Goes live by
 *     itself", sanity/schemaTypes/post.ts) whose time has come becomes the
 *     live post in one transaction, dated that day (a scheduled edit to a
 *     live post keeps the post's date), and the editors get its address. A
 *     draft missing what Studio's Publish asks for (a title, a web address, a
 *     lead photo, words in the body, a Section) is left and reported, and one
 *     an editor changed or held while the run was publishing it is never
 *     overwritten (the commit checks the draft's revision). Its social drafts
 *     follow at the next day's run (lib/automation/social.ts), waiting in
 *     Buffer for approval.
 *  2. draftProjectArticles, its own run (app/api/cron/project-articles, 15:00
 *     UTC, so a busy social morning can't crowd it out): the oldest published
 *     Job photos post with a story (fieldPost.writeUp) and no article yet gets
 *     one. The drafter (lib/automation/drafter.ts) writes a project story from
 *     the post's own record and the pages of its service, systems and kind of
 *     work, nothing else; the style pass and the fact check run as for every
 *     draft. It is saved as an unpublished draft with the post's photographs
 *     (the first leads, the rest close the article), and the editors are
 *     emailed. It then waits in Studio for a person's Publish (Vern, 21 Oct
 *     2026: "wait for Sydney"); the email says "Ready to read", or "Needs a
 *     read" with what a check found. Only with PROJECT_ARTICLES_AUTO_PUBLISH
 *     set to "on" in Vercel (autoPublishArticles) is a clean one set to go
 *     live by itself at the daily run two weekdays later (scheduleSlot),
 *     unless they hold it; even then a draft a check isn't happy with (an
 *     unsupported statement, a sentence against the house style, a phone
 *     number or address that isn't Square One's, no photograph) is saved
 *     held: nothing unchecked goes live by itself. A post whose article can't
 *     be written is tried again each morning, behind the others, for
 *     GIVE_UP_DAYS, then given up with one email (editing the post starts it
 *     over).
 *
 * A Job photos post with a story makes no social posts of its own
 * (lib/automation/social.ts, hasStory): the job goes out once, as its
 * article. Nothing here posts to social.
 *
 * The pure parts (scheduleSlot, vancouverWhen, jobRecord, readyToGo,
 * buildProjectDocument, toPublished, missingForLive) and both steps, end to
 * end against stand-ins, are tested by `npm run test:project-posts`.
 */
import { SITE_URL } from "@/lib/site"
import { toPortableText, type PortableBlock } from "@/lib/automation/markdown"
import { checkDraft, polishDraft, styleReport, writeDraft, type Draft, type FactCheck, type StylePass } from "@/lib/automation/drafter"
import { categoryFor, jobPostFacts, loadDriveways, loadServices, loadSettings, PUBLISHED_POSTS, relatedFor, type PublishedPost } from "@/lib/automation/facts"
import { cleanSlug, pacificDate } from "@/lib/automation/blog"
import { emailEditors } from "@/lib/automation/editor-mail"
import { daysSince, failureHint, GIVE_UP_DAYS, isConflict, isRunLevel } from "@/lib/automation/outcome"
import { APPLICATION_OPTIONS, PROJECT_STORIES_TAG, SERVICE_OPTIONS, SYSTEM_OPTIONS } from "@/lib/automation/plan"
import { tagPasses } from "@/lib/automation/style"
import type { Claude, Mailer, SanityDoc, Store } from "@/lib/automation/services"
import { vancouverZone } from "@/lib/bc-time"

/** The daily run's hour (vercel.json, social-drafts): the time a scheduled post goes live. 7 a.m. in Vancouver all year: BC keeps UTC-7 from 1 November 2026 (tzdata 2026b). */
export const RUN_HOUR_UTC = 14
/**
 * A new article goes live this many weekdays after the day it is written
 * (Vancouver's day), so the office has at least one full working day with
 * the email: Monday's goes on Wednesday, Friday's, Saturday's and Sunday's on
 * Tuesday (review, 20 Oct 2026).
 */
export const LEAD_DAYS = 2
/** A draft is due this long before its time, so the run that starts at 14:00:00 publishes a 14:00 draft. */
const DUE_GRACE_MS = 10 * 60_000
/** Articles written per run: a job a day, like the job photos stream. */
const MAX_ARTICLES_PER_RUN = 1
/**
 * What one article needs of the route's time: three Claude calls that give up
 * after 150 s, 40 s and 60 s (lib/automation/drafter.ts LIMITS), then the
 * writes and the email (AFTER_WRITING_MS). The article run has the route to
 * itself, so this is there for a slow start; without it, the next run does it.
 */
export const NEEDS_MS = 280_000
/** What's left to do once Claude has written it: the draft, the post's link, the email (15 s at most), the switch. */
const AFTER_WRITING_MS = 25_000
/** A claim older than this is a run Vercel stopped before it could clear it. */
const STALE_CLAIM_MS = 10 * 60_000

/**
 * Whether a clean project article is set to go live by itself, two weekdays
 * after the email, or waits for a person to press Publish. Vern, 21 Oct 2026:
 * "wait for Sydney". Off unless PROJECT_ARTICLES_AUTO_PUBLISH is "on" in
 * Vercel (the article run reads it; a redeploy picks up a change).
 */
export function autoPublishArticles(env: Record<string, string | undefined> = process.env): boolean {
  return env.PROJECT_ARTICLES_AUTO_PUBLISH?.trim().toLowerCase() === "on"
}

export interface ProjectDeps {
  claude: Claude
  store: Store
  mail: Mailer
  now: () => Date
}

const errorText = (err: unknown) => (err instanceof Error ? err.message : String(err))
const studioLink = (slug: string) => `${SITE_URL}/studio/intent/edit/id=post-${slug};type=post`
const listOf = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`)

// ── when ────────────────────────────────────────────────────────────────────

const isWeekday = (d: Date) => d.getUTCDay() !== 0 && d.getUTCDay() !== 6

/**
 * When a new article goes live: the daily run LEAD_DAYS weekdays (Monday to
 * Friday) after today in Vancouver, or the first weekday after that which no
 * other scheduled draft has, so two jobs posted the same day go out on two
 * days. 14:00 UTC is the same calendar day in Vancouver, so the slot's UTC
 * date is Vancouver's; a run pressed on a Friday evening in Vancouver (already
 * Saturday in UTC) still counts from the Friday.
 */
export function scheduleSlot(now: Date, taken: Iterable<string> = []): string {
  const used = new Set(
    [...taken]
      .map((t) => (Number.isNaN(Date.parse(t)) ? "" : pacificDate(new Date(t))))
      .filter(Boolean),
  )
  const [y, m, d] = pacificDate(now).split("-").map(Number)
  const day = new Date(Date.UTC(y, m - 1, d, RUN_HOUR_UTC))
  for (let weekdays = 0; weekdays < LEAD_DAYS; ) {
    day.setUTCDate(day.getUTCDate() + 1)
    if (isWeekday(day)) weekdays++
  }
  for (let i = 0; i < 60; i++) {
    const iso = day.toISOString()
    if (isWeekday(day) && !used.has(iso.slice(0, 10))) return iso
    day.setUTCDate(day.getUTCDate() + 1)
  }
  return day.toISOString()
}

/**
 * "Thursday 22 October at 7:00 a.m. Vancouver time", for the emails and the
 * notes. Vancouver's clock on any runtime's timezone data (lib/bc-time.ts):
 * BC kept UTC-7 from 1 November 2026, and older data would print the 7 a.m.
 * run as 6:00 a.m. from then on.
 */
export function vancouverWhen(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: vancouverZone(Date.parse(iso)),
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
  _updatedAt?: string | null
  place?: string | null
  note?: string | null
  writeUp?: string | null
  date?: string | null
  service?: string | null
  systems?: string[] | null
  application?: string | null
  photos?: JobPhoto[] | null
  /** The article the post notes as its own (fieldPost.article), if any. */
  article?: string | null
}

const SOURCE = `{ _id, _updatedAt, place, note, writeUp, date, service, systems, application, "photos": photos[]{ "asset": asset._ref, alt, hotspot, crop }, "article": article._ref }`

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
  "Never print a phone number, an email or a street address from THE JOB: a customer's details stay off the site.",
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
 * Whether a written article may go live by itself: both checks clean (the
 * style check includes phone numbers, emails and addresses that aren't
 * Square One's) and a lead photograph to show. Anything else is saved held,
 * for a person to read first (the canon: no invented facts, published
 * contacts only; the house style: not one em dash).
 */
export function readyToGo(check: FactCheck, style: StylePass | undefined, hasPhoto: boolean): boolean {
  return check.verdict === "clean" && check.unsupported.length === 0 && (style?.left.length ?? 0) === 0 && hasPhoto
}

/**
 * The blog draft for a job's article. Pure, so it can be tested without
 * Claude or Sanity. The post's first photograph is the lead photograph; the
 * rest close the article under their own heading, with the post's alt text.
 * By default it waits for a person's Publish, with no time set. With
 * `autoPublish` (autoPublishArticles) and a `slot`, it is set to go live by
 * itself at that time, or saved held with the time filled in when readyToGo
 * says so. Tags print on the live post and no check reads them, so one that
 * breaks the canon is dropped.
 */
export function buildProjectDocument(
  doc: JobPost,
  draft: Draft,
  check: FactCheck,
  slug: string,
  slot: string | null,
  style?: StylePass,
  today = new Date(),
  opts: { autoPublish?: boolean } = {},
) {
  const photos = (doc.photos ?? []).filter((p) => p?.asset)
  const [first, ...rest] = photos
  const ready = readyToGo(check, style, Boolean(first))
  const auto = opts.autoPublish === true && slot !== null
  const name = jobName(doc)
  const when = slot ? vancouverWhen(slot) : ""
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
  const tags = [
    ...new Map(
      [PROJECT_STORIES_TAG, ...(draft.tags ?? []), ...systemTitles(doc), ...(town ? [town] : [])]
        .map((t) => (typeof t === "string" ? t.trim() : ""))
        .filter(tagPasses)
        .map((t) => [t.toLowerCase(), t]),
    ).values(),
  ].slice(0, 8)

  const notes = [
    `Drafted by Claude on ${pacificDate(today)} from the Job photos post "${name}" (Studio → Job photos): its story, the crew's note, and the ${serviceTitle(doc)?.toLowerCase() ?? "service"} page's words. Nothing else.`,
    "",
    auto
      ? ready
        ? `SCHEDULED: it goes live by itself ${when}. To change a line, edit it here: it still goes out on time. To move it, change "Goes live at". To hold it, turn "Goes live by itself" off. The day after it is live, its social posts are drafted in Buffer for approval.`
        : `HELD: a check below found something, so it does not go live by itself. Read it, fix what's listed, then turn "Goes live by itself" on (it is set for ${when}; a time already past goes at the next morning's run) or press Publish.`
      : ready
        ? `READY TO READ: nothing goes live until someone presses Publish. Read it, change anything by typing, then press Publish. To have it go out on a later morning instead, turn on "Goes live by itself" and set "Goes live at" to that day at 7:00 a.m. or earlier. The day after it is live, its social posts are drafted in Buffer for approval.`
        : `CHECK FIRST: a check below found something. Fix what's listed, then press Publish. Nothing goes live until someone does.`,
    "",
    check.unsupported.length
      ? `FACT CHECK: ${check.unsupported.length} statement(s) the job's record and Square One's pages don't back up. Fix or remove them before it goes live:`
      : "FACT CHECK: every statement matches the job's record and Square One's own pages.",
    ...check.unsupported.map((u) => `- "${u.quote}": ${u.reason}`),
    "",
    ...(style ? [...styleReport(style, "before it goes live (Studio marks them in yellow too)"), ""] : []),
    first
      ? `PHOTOS: the post's first photo is the lead photograph${rest.length ? `; the others close the article under "The job in photographs", with the post's descriptions` : ""}.${first.hotspot ? "" : " Drag its focal point onto the pavement."}`
      : `PHOTOS: the post had none with a file${auto ? ", so this is held" : ""}. Add a lead photograph before it goes live.`,
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
    scheduled: auto && ready,
    // Waiting for Publish, no time is set: a person who turns "Goes live by
    // itself" on picks the day.
    ...(auto && slot ? { scheduledFor: slot } : {}),
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

/** Posts dated before this are the library imported from the old site (sanity/schemaTypes/post.ts NEW_WRITING_FROM): Studio only warns about their photo and Section. */
const IMPORTED_BEFORE = "2026-10-01"

/**
 * What a scheduled draft is missing before it may go live by itself: what
 * Studio's Publish asks of a new post (sanity/schemaTypes/post.ts), so an
 * edit left half done overnight (the lead photo out to swap it, the body
 * emptied to rewrite it) waits instead of going out as it stands. A post
 * from the imported library needs only a title, its address and words, as
 * Studio asks of it.
 */
export function missingForLive(draft: ScheduledDraft): string[] {
  const missing: string[] = []
  const imported = typeof draft.date === "string" && draft.date < IMPORTED_BEFORE
  if (!draft.title?.trim()) missing.push("a title")
  if (!draft.slug?.current?.trim()) missing.push("a web address")
  const image = draft.mainImage as { asset?: { _ref?: unknown } } | null | undefined
  if (!imported && (typeof image?.asset?._ref !== "string" || !image.asset._ref)) missing.push("a lead photo")
  const blocks = Array.isArray(draft.body) ? (draft.body as { _type?: unknown; children?: { text?: unknown }[] }[]) : []
  const hasWords = blocks.some((b) => b?._type === "block" && Array.isArray(b.children) && b.children.some((c) => typeof c?.text === "string" && c.text.trim() !== ""))
  if (!hasWords) missing.push("any words in the body")
  if (!imported && (typeof draft.category !== "string" || !draft.category.trim())) missing.push("a Section")
  return missing
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
  /** Drafts an editor held, moved, published or deleted while the run was publishing them: theirs to decide, nothing to report. */
  left: { id: string; title: string; why: string }[]
}

const DUE = `*[_type == "post" && _id in path("drafts.**") && scheduled == true && defined(scheduledFor) && dateTime(scheduledFor) <= dateTime($by)] | order(scheduledFor asc)`

type Attempt = { kind: "done"; edit: boolean; slug: string; title: string } | { kind: "left"; why: string } | { kind: "changed"; fresh: ScheduledDraft; error: unknown }

/** One go at publishing one due draft. Throws what the editors should hear about. */
async function publishOne(store: Store, draft: ScheduledDraft, now: Date): Promise<Attempt> {
  const title = draft.title?.trim() ?? ""
  const slug = draft.slug?.current?.trim() ?? ""
  const liveId = draft._id.replace(/^drafts\./, "")
  const missing = missingForLive(draft)
  if (missing.length) throw new Error(`it is missing ${listOf(missing)}`)
  const [clash, live] = await Promise.all([
    store.fetch<number>(`count(*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && _id != $id])`, { slug, id: liveId }),
    store.fetch<{ date?: string | null } | null>(`*[_id == $id][0]{ date }`, { id: liveId }),
  ])
  if (clash) throw new Error(`another live post already uses /blog/${slug}`)
  const doc = toPublished(draft, now, live?.date)
  try {
    await store.publish(doc, draft._id, draft._rev)
    return { kind: "done", edit: Boolean(live), slug, title }
  } catch (err) {
    let after: { notes?: string | null; draft?: ScheduledDraft | null } | null = null
    try {
      after = await store.fetch<{ notes?: string | null; draft?: ScheduledDraft | null } | null>(`{ "notes": *[_id == $live][0].editorNotes, "draft": *[_id == $draft][0] }`, { live: liveId, draft: draft._id })
    } catch {
      throw err
    }
    // A timeout can follow a commit that went through: the live post carries
    // this run's own notes and the draft is gone.
    if (after?.notes === doc.editorNotes && !after.draft) {
      console.warn(`[projects] ${draft._id}: the commit answered with an error but went through (${errorText(err)})`)
      return { kind: "done", edit: Boolean(live), slug, title }
    }
    const fresh = after?.draft
    if (!fresh) return { kind: "left", why: "it was published or deleted in Studio while the run was publishing it" }
    const stillDue = fresh.scheduled === true && typeof fresh.scheduledFor === "string" && Date.parse(fresh.scheduledFor) <= now.getTime() + DUE_GRACE_MS
    if (!stillDue) return { kind: "left", why: "it was held or moved in Studio while the run was publishing it" }
    if (fresh._rev && fresh._rev !== draft._rev) return { kind: "changed", fresh, error: err }
    throw err
  }
}

/**
 * Publishes every scheduled draft whose time has come, one transaction each
 * (the live post written, the draft removed, only if the draft is still the
 * one the run read). A draft that can't go (something Publish needs is
 * missing, or an address another live post has) is left as it is and the
 * editors are told. One an editor edited during the run is read again and
 * published as edited; one they held or published themselves is left alone.
 * `social`: whether Buffer is connected, for the email's line about the
 * posts that follow.
 */
export async function publishDueDrafts(deps: ProjectDeps, now: Date, opts: { social?: boolean } = {}): Promise<PublishOutcome> {
  const { store, mail } = deps
  const out: PublishOutcome = { published: [], failed: [], left: [] }
  const due = (await store.fetch<ScheduledDraft[] | null>(DUE, { by: new Date(now.getTime() + DUE_GRACE_MS).toISOString() })) ?? []
  for (const first of due) {
    let draft = first
    const named = () => draft.title?.trim() || first.title?.trim() || ""
    try {
      let attempt = await publishOne(store, draft, now)
      if (attempt.kind === "changed") {
        console.log(`[projects] ${draft._id} was edited while the run was publishing it; publishing the edited version`)
        draft = attempt.fresh
        attempt = await publishOne(store, draft, now)
        if (attempt.kind === "changed") throw attempt.error
      }
      if (attempt.kind === "left") {
        console.log(`[projects] left ${draft._id}: ${attempt.why}`)
        out.left.push({ id: draft._id, title: named(), why: attempt.why })
        continue
      }
      const { slug, title, edit } = attempt
      console.log(`[projects] published ${slug} (/blog/${slug}) on schedule${edit ? " (an edit to a live post)" : ""}`)
      const at = vancouverWhen(now.toISOString())
      const notified = await emailEditors(
        mail,
        edit ? `Updated on squareonepaving.com: ${title}` : `On squareonepaving.com now: ${title}`,
        [
          edit
            ? `The scheduled edit to "${title}" went live ${at}. It shows at ${SITE_URL}/blog/${slug} within a minute, with the post's original date.`
            : `"${title}" went live ${at}, as scheduled. It is at ${SITE_URL}/blog/${slug} (the site picks it up within a minute).`,
          "",
          edit
            ? "To change it again, edit it in Studio → Blog posts and press Publish."
            : opts.social
              ? "Tomorrow morning's run drafts its social posts in Buffer, for approval. To change the article, edit it in Studio → Blog posts and press Publish."
              : "To change it, edit it in Studio → Blog posts and press Publish.",
        ].join("\n"),
        "projects",
      )
      out.published.push({ id: draft._id.replace(/^drafts\./, ""), slug, title, edit, notified })
    } catch (err) {
      const error = errorText(err)
      const title = named()
      const slug = draft.slug?.current?.trim() ?? ""
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
  /** "on Publish" (the default: it waits for a person); with autoPublish, when it goes live, or "held" when a check wants a read first. */
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
  failed: { fieldPost: string; job: string; error: string; gaveUp?: boolean }[]
  /** A failure that stops the run rather than one post (a key refused, no credit): emailed every time until fixed. */
  runError?: string
}

const CANDIDATES = `*[_type == "fieldPost" && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && defined(writeUp) && writeUp != ""] | order(coalesce(date, _createdAt) asc)${SOURCE}`

/** A post whose article keeps failing: when it first failed, and when the job gave up on it. */
interface RetryRecord {
  fieldPost: string
  firstFailedAt: string
  gaveUpAt?: string | null
}
const retryIdFor = (fieldPostId: string) => `projectRetry-${fieldPostId.replace(/[^a-zA-Z0-9._-]/g, "-")}`
/**
 * A failure that stops the run rather than one post: a key refused, no
 * credit, the model gone (isRunLevel). Claude taking too long counts against
 * the post instead (review, 20 Oct 2026), so a post Claude can't finish in
 * time gives up after GIVE_UP_DAYS rather than costing a call every morning.
 */
const stopsTheRun = (err: unknown) => isRunLevel(err) && !/Request timed out|timed out|took longer/i.test(errorText(err))
const editedSince = (doc: JobPost, iso: string | null | undefined) => Boolean(doc._updatedAt && iso && Date.parse(doc._updatedAt) > Date.parse(iso))

/**
 * Writes the article for the oldest Job photos post that has a story and no
 * article yet, when the run has NEEDS_MS left before `deadline`. A post that
 * fails (Claude returned nothing usable, Sanity refused a write) is retried
 * by the next runs behind the others, for GIVE_UP_DAYS from its first
 * failure, with an email on the first failure and one when it gives up;
 * editing the post starts it over. A failure that stops the run (a key
 * refused, no credit) is emailed every time and counts against no post.
 * Nothing is claimed for longer than the writing, and the article's own
 * reference back to the post stops a second one; a copy of a post (Studio's
 * Duplicate) gets an article of its own.
 */
export async function draftProjectArticles(deps: ProjectDeps, now: Date, opts: { deadline?: number; autoPublish?: boolean } = {}): Promise<DraftOutcome> {
  const { store } = deps
  const out: DraftOutcome = { drafted: [], waiting: 0, skipped: [], failed: [] }
  const [candidates, articles, retryList] = await Promise.all([
    store.fetch<JobPost[] | null>(CANDIDATES),
    // Every post, drafts included, and the job post it was written from: the
    // article exists even when the post doesn't say so (the patch failed, or
    // the post was republished from an older draft), so never a second one.
    store.fetch<{ _id: string; job?: string | null }[] | null>(`*[_type == "post"]{ _id, "job": fieldPost._ref }`),
    store.fetch<(RetryRecord & { _id: string })[] | null>(`*[_type == "projectRetry"]{ _id, fieldPost, firstFailedAt, gaveUpAt }`),
  ])
  const writtenFor = new Set((articles ?? []).map((a) => a.job).filter((j): j is string => !!j))
  const articleJob = new Map((articles ?? []).map((a) => [a._id.replace(/^drafts\./, ""), a.job ?? null]))
  const retries = new Map((retryList ?? []).map((r) => [r.fieldPost, r]))
  /** Copies made with Studio's Duplicate, and the article their original already has. */
  const copies = new Map<string, string>()
  const fresh: JobPost[] = []
  const failing: JobPost[] = []
  for (const doc of candidates ?? []) {
    if (writtenFor.has(doc._id)) continue
    if (doc.article) {
      // The post notes an article that isn't its own: a copy made with
      // Studio's Duplicate. It gets an article of its own, held, since it may
      // be the same job twice. One whose article is gone was deleted by an
      // editor: left alone.
      const job = articleJob.get(doc.article.replace(/^drafts\./, ""))
      if (job === undefined || job === null || job === doc._id) continue
      copies.set(doc._id, doc.article.replace(/^drafts\./, ""))
    }
    const why = !serviceTitle(doc) ? "no service" : !doc.place?.trim() ? "no place" : !doc.note?.trim() ? "no note" : !doc.writeUp?.trim() ? "no story" : ""
    if (why) {
      out.skipped.push(`${doc._id}: ${why}`)
      console.warn(`[projects] ${doc._id}: ${why}; no article until it has one`)
      continue
    }
    const retry = retries.get(doc._id)
    if (retry?.gaveUpAt && !editedSince(doc, retry.gaveUpAt)) {
      out.skipped.push(`${doc._id}: given up after ${GIVE_UP_DAYS} days of failures (edit the post to try again)`)
      continue
    }
    if (retry && !retry.gaveUpAt && !editedSince(doc, retry.firstFailedAt)) failing.push(doc)
    else fresh.push(doc)
  }
  const todo = [...fresh, ...failing]
  let started = 0
  for (const doc of todo.slice(0, MAX_ARTICLES_PER_RUN)) {
    if (opts.deadline && opts.deadline - deps.now().getTime() < NEEDS_MS) {
      console.log(`[projects] no time left this run; ${jobName(doc)} waits for the next`)
      break
    }
    started++
    const retry = retries.get(doc._id)
    // A record from before the post was last edited (or a give-up since) starts over.
    const firstFailedAt = retry && !retry.gaveUpAt && !editedSince(doc, retry.firstFailedAt) ? retry.firstFailedAt : undefined
    try {
      const result = await draftOne(deps, doc, now, opts.deadline, copies.get(doc._id), opts.autoPublish === true)
      if (result) {
        out.drafted.push(result)
        if (retry) await store.delete(retryIdFor(doc._id)).catch((err: unknown) => console.error(`[projects] ${doc._id}: couldn't clear its failure record: ${errorText(err)}`))
      }
    } catch (err) {
      out.failed.push(await articleFailed(deps, doc, err, firstFailedAt, now))
      if (stopsTheRun(err)) out.runError = errorText(err)
    }
  }
  out.waiting = Math.max(0, todo.length - started)
  return out
}

/**
 * A post whose article couldn't be written: the editors hear on the first
 * failure and when the job gives up, not every morning in between; a failure
 * that stops the run (stopsTheRun) is theirs to fix, so it is emailed every
 * time and counts against no post.
 */
async function articleFailed(deps: ProjectDeps, doc: JobPost, err: unknown, firstFailedAt: string | undefined, now: Date): Promise<DraftOutcome["failed"][number]> {
  const { store, mail } = deps
  const error = errorText(err)
  const name = jobName(doc)
  console.error(`[projects] couldn't write the article for ${doc._id} (${name}): ${error}`)
  const what = `What happened: ${error}`
  if (stopsTheRun(err)) {
    await emailEditors(
      mail,
      "Project article didn't run",
      [`This morning's run couldn't write the article for the Job photos post "${name}". Nothing is on the site, and the next morning's run tries again.`, "", what, "", failureHint(err, "projects")].join("\n"),
      "projects",
    )
    return { fieldPost: doc._id, job: name, error }
  }
  const retryId = retryIdFor(doc._id)
  if (!firstFailedAt) {
    // The first failure starts the GIVE_UP_DAYS clock. If this write fails,
    // the clock starts at the next failure: a later give-up, never an earlier one.
    await store
      .createOrReplace({ _id: retryId, _type: "projectRetry", fieldPost: doc._id, firstFailedAt: now.toISOString() })
      .catch((e: unknown) => console.error(`[projects] ${doc._id}: couldn't note the first failure: ${errorText(e)}`))
    await emailEditors(
      mail,
      `Project article not written yet: ${name}`,
      [
        `The morning run couldn't write the article for the Job photos post "${name}". Nothing is on the site.`,
        "",
        `The next morning's run tries again, every day for up to ${GIVE_UP_DAYS} days; you'll only hear again if it gives up. Editing the post (its story, say) starts it over.`,
        "",
        what,
        "",
        failureHint(err, "projects"),
      ].join("\n"),
      "projects",
    )
    return { fieldPost: doc._id, job: name, error }
  }
  if (daysSince(firstFailedAt, now) > GIVE_UP_DAYS) {
    await store
      .patch(retryId, { gaveUpAt: now.toISOString() })
      .catch((e: unknown) => console.error(`[projects] ${doc._id}: couldn't note the give-up: ${errorText(e)}`))
    await emailEditors(
      mail,
      `Project article given up: ${name}`,
      [
        `The article for the Job photos post "${name}" couldn't be written on any morning for ${GIVE_UP_DAYS} days, so the job has stopped trying. Nothing is on the site.`,
        "",
        "Write it yourself in Studio → Blog posts if you want it, or edit the Job photos post (its story, say) and the next morning's run tries once more.",
        "",
        what,
      ].join("\n"),
      "projects",
    )
    return { fieldPost: doc._id, job: name, error, gaveUp: true }
  }
  console.warn(`[projects] ${doc._id}: still failing since ${firstFailedAt}; tried again tomorrow`)
  return { fieldPost: doc._id, job: name, error }
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

async function draftOne(deps: ProjectDeps, doc: JobPost, now: Date, deadline?: number, copyOf?: string, autoPublish = false): Promise<Drafted | null> {
  if (!(await claim(deps.store, doc, now))) return null
  try {
    return await writeArticle(deps, doc, now, deadline, copyOf, autoPublish)
  } finally {
    // The article itself (its fieldPost reference) is what stops a second one
    // from now on; a claim left behind would block a retry after a failure.
    await deps.store.delete(claimIdFor(doc._id)).catch((err: unknown) => console.error(`[projects] ${doc._id}: couldn't clear the claim: ${errorText(err)}`))
  }
}

/**
 * The email about a new article. By default (`waits`) it waits for a person's
 * Publish: "Ready to read" when the checks are clean, "Needs a read" when one
 * found something. With autoPublish: going live by itself, or held for a read.
 */
function articleEmail(a: {
  ready: boolean
  waits?: boolean
  clean?: boolean
  name: string
  title: string
  excerpt: string
  slug: string
  when: string
  check: FactCheck
  style: StylePass
  photo: boolean
  why?: string
}): { subject: string; text: string } {
  const subject = a.waits
    ? a.clean
      ? `Ready to read: ${a.title}`
      : `Needs a read before it goes: ${a.title}`
    : a.ready
      ? `Goes live ${a.when.replace(/ at .*$/, "")} unless you hold it: ${a.title}`
      : `Needs a read before it goes: ${a.title}`
  const intro = a.waits
    ? (a.why ??
      (a.clean
        ? `A project article was written from the Job photos post "${a.name}". It waits in Studio → Blog posts until someone presses Publish: nothing is on the site until then. The day after it is live, its social posts are drafted in Buffer for approval.`
        : `A project article was written from the Job photos post "${a.name}", and a check found something (below). It waits in Studio → Blog posts until someone presses Publish: fix what's listed first.`))
    : a.ready
      ? `A project article was written from the Job photos post "${a.name}" and goes live on squareonepaving.com by itself ${a.when}. Nothing is on the site until then. The day after it is live, its social posts are drafted in Buffer for approval.`
      : (a.why ??
        `A project article was written from the Job photos post "${a.name}", but a check found something (below), so it waits in Studio → Blog posts and does not go live by itself. Fix it, then turn "Goes live by itself" on or press Publish.`)
  const tips = a.waits
    ? ["- Change anything by typing: it saves as you go.", "- Happy with it? Press Publish."]
    : a.ready
      ? ["- To change a line, edit it there: it still goes out on time.", '- To hold it, turn "Goes live by itself" off: it then waits for you.', '- To move it, change "Goes live at" to a later day.']
      : []
  return {
    subject,
    text: [
      intro,
      "",
      a.title,
      a.excerpt,
      "",
      `Read it: ${studioLink(a.slug)}`,
      ...tips,
      "",
      a.check.unsupported.length
        ? `Fact check: ${a.check.unsupported.length} statement(s) to check before it goes live. They're listed in the draft's "Notes for the editor".`
        : "Fact check: every statement matches the job's record and Square One's own pages.",
      a.style.left.length
        ? `Style check: ${a.style.left.length} sentence(s) still break the house style or show a contact detail that isn't Square One's. They're listed in the notes and marked in yellow in Studio.`
        : "Style check: no em dashes, no machine tells, nothing against the canon.",
      ...(a.photo ? [] : ["Photo: the post had none with a file. Add a lead photograph before it goes live."]),
    ].join("\n"),
  }
}

/** Where an existing article opens in Studio, by its document id. */
const studioDocLink = (id: string) => `${SITE_URL}/studio/intent/edit/id=${id};type=post`

async function writeArticle(deps: ProjectDeps, doc: JobPost, now: Date, deadline?: number, copyOf?: string, autoPublish = false): Promise<Drafted | null> {
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

  // Not enough of the route left to save it and tell the editors: nothing is
  // written, so the next run writes it again (a draft nobody hears about
  // would sit in Studio and stop that).
  if (deadline && deadline - deps.now().getTime() < AFTER_WRITING_MS) throw new Error("the run ran out of time after writing it, before it could be saved")

  // Right before writing, so two runs at once can't both get here: the other
  // run's article is there by now.
  if (await store.fetch<number>(`count(*[_type == "post" && fieldPost._ref == $id])`, { id: doc._id })) {
    console.log(`[projects] ${doc._id}: another run wrote its article; skipped`)
    return null
  }
  // A time only when it is to go live by itself; by default it waits for a person's Publish.
  const slot = autoPublish ? scheduleSlot(now, (await store.fetch<string[] | null>(`*[_type == "post" && scheduled == true && defined(scheduledFor)].scheduledFor`)) ?? []) : null

  // A web address nobody uses, drafts included, and an id no post has (as the drafter, lib/automation/blog.ts).
  const base = cleanSlug(draft.slug || draft.title) || cleanSlug(name) || `project-${now.getTime()}`
  let slug = base
  const inUse = (s: string) => store.fetch<number>(`count(*[(_type == "post" && slug.current == $slug) || _id in [$id, $draftId]])`, { slug: s, id: `post-${s}`, draftId: `drafts.post-${s}` })
  for (let n = 2; await inUse(slug); n++) slug = `${base}-${n}`

  const built = buildProjectDocument(doc, draft, check, slug, slot, style, now, { autoPublish })
  // A copy of a post that already has its article may be the same job twice:
  // held, whatever the checks said, for a person to compare the two.
  const copyNote = !copyOf
    ? ""
    : autoPublish
      ? `HELD: this Job photos post looks like a copy of another (Studio's Duplicate), whose article is already in Blog posts: ${studioDocLink(copyOf)}. If it's the same job, delete this draft; if not, read it, then turn "Goes live by itself" on or press Publish.`
      : `CHECK FIRST: this Job photos post looks like a copy of another (Studio's Duplicate), whose article is already in Blog posts: ${studioDocLink(copyOf)}. If it's the same job, delete this draft; if not, read it and press Publish.`
  const document = copyOf ? { ...built, scheduled: false, editorNotes: `${copyNote}\n\n${built.editorNotes}` } : built
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
    `[projects] wrote "${document.title}" as ${document._id} from ${doc._id}; goes live ${document.scheduled ? slot : autoPublish ? "when released (held)" : "when someone presses Publish"}; fact check: ${check.verdict} (${check.unsupported.length}); style: ${style.left.length} of ${style.flagged} left${style.error ? ` (rewrite failed: ${style.error})` : ""}`,
  )

  const when = slot ? vancouverWhen(slot) : ""
  const about = { name, title: document.title, excerpt: document.excerpt, slug, when, check, style, photo: Boolean(document.mainImage) }
  let ready = document.scheduled
  const first = articleEmail({
    ...about,
    ready,
    waits: !autoPublish,
    clean: !copyOf && readyToGo(check, style, Boolean(document.mainImage)),
    ...(copyOf
      ? {
          why: autoPublish
            ? `A project article was written from the Job photos post "${name}", which looks like a copy of another post whose article is already in Blog posts (${studioDocLink(copyOf)}). It waits in Studio → Blog posts and does not go live by itself: if it's the same job, delete it; if not, read it, then turn "Goes live by itself" on or press Publish.`
            : `A project article was written from the Job photos post "${name}", which looks like a copy of another post whose article is already in Blog posts (${studioDocLink(copyOf)}). It waits in Studio → Blog posts until someone presses Publish: if it's the same job, delete it; if not, read it and press Publish.`,
        }
      : {}),
  })
  let notified = await emailEditors(mail, first.subject, first.text, "projects")
  // Waiting for Publish, a lost email can't put anything live: the draft is in Blog posts for whoever looks.
  if (!autoPublish && !notified.length) console.error(`[projects] ${document._id}: the email about it didn't go; it waits in Studio → Blog posts`)
  if (ready) {
    if (notified.length) {
      try {
        await store.patch(document._id, { scheduled: true })
      } catch (err) {
        // A timeout can follow a write that went through: read the switch
        // before telling anyone it is off.
        const on = await store.fetch<boolean | null>(`*[_id == $id][0].scheduled`, { id: document._id }).catch(() => undefined)
        if (on === true) {
          console.warn(`[projects] ${document._id}: switching it on answered with an error but went through (${errorText(err)})`)
        } else {
          ready = false
          console.error(`[projects] ${document._id}: couldn't switch it on after the email: ${errorText(err)}; it stays held`)
          await emailEditors(
            mail,
            on === false ? `Correction, held after all: ${document.title}` : `Check this one in Studio: ${document.title}`,
            on === false
              ? `"${document.title}" could not be set to go live by itself (${errorText(err)}). It waits in Studio → Blog posts: read it, then turn "Goes live by itself" on or press Publish.\n\nOpen it: ${studioLink(slug)}`
              : `Sanity didn't confirm whether "${document.title}" is set to go live by itself (${errorText(err)}). Open it: if "Goes live by itself" is on, it goes live ${when}; turn it off to hold it.\n\nOpen it: ${studioLink(slug)}`,
            "projects",
          )
        }
      }
    } else {
      ready = false
      console.error(`[projects] ${document._id}: the email didn't go, so the draft is held, not scheduled`)
      await store
        .patch(document._id, { editorNotes: `HELD: not set to go live by itself, because the email about it could not be sent. Read it, then turn "Goes live by itself" on or press Publish.\n\n${document.editorNotes}` })
        .catch((err: unknown) => console.error(`[projects] ${document._id}: couldn't note the hold: ${errorText(err)}`))
      // The first email may still arrive, late, saying it goes live: say it
      // waits instead (if this one goes, it is the last word).
      const held = articleEmail({
        ...about,
        ready: false,
        why: `A project article was written from the Job photos post "${name}". It waits in Studio → Blog posts and does not go live by itself: if an earlier email said it would, that email couldn't be confirmed, so the article waits for you. Read it, then turn "Goes live by itself" on or press Publish.`,
      })
      notified = await emailEditors(mail, held.subject, held.text, "projects")
    }
  }
  return {
    fieldPost: doc._id,
    job: name,
    id: document._id,
    slug,
    title: document.title,
    goesLive: ready && slot ? slot : autoPublish ? "held" : "on Publish",
    factCheck: check.verdict,
    toCheck: check.unsupported.length,
    style: { flagged: style.flagged, left: style.left.length },
    notified,
  }
}
