/**
 * Social drafts, three streams into one approval queue (Square One's own
 * Buffer), ported from hubss.com's lib/social-pipeline.ts on 14 Oct 2026.
 * Nothing is posted from here: a person approves each draft in Buffer, and
 * Buffer posts it on its schedule. Run daily at 14:00 UTC by
 * app/api/cron/social-drafts (vercel.json).
 *
 *  1. Articles: a blog post qualifies once it is published in the Studio, is
 *     dated on or after SOCIAL_SINCE, and has no socialLog yet. The imported
 *     library is dated earlier, so it never floods Buffer; a draft that sat in
 *     Studio for weeks still gets its social drafts the day after it goes
 *     live. Up to MAX_POSTS_PER_RUN a day, oldest first.
 *  2. From the field: a published field post (Studio → From the field: the
 *     crew's photos of a finished job, the place, the service, a line of
 *     facts) gets posts linked to the service's page. One a day.
 *  3. From the library: once a week, a documented project or a service page
 *     (lib/automation/social-library.ts). A new field post takes the week's
 *     turn, so the crew's photos go first; with two articles a week that is
 *     three posts a week on each channel.
 *
 * Channels: Facebook and Instagram (Buffer Free), LinkedIn (Square One has a
 * company page), and Google Business Profile, which needs Buffer Essentials
 * and gets its own metadata: a "Learn more" button to the page. Anything else
 * connected (TikTok, YouTube, X) is skipped and named in the email.
 *
 * Every link carries UTM tags (utm_source = the network, utm_medium=social,
 * utm_campaign = blog, field or library, utm_content = what it was). The
 * copy goes through the same style pass as the blog drafts; whatever is left
 * is written on the item's log (Studio → Social drafts) and in the email.
 *
 * Failures are loud and cost nothing (lib/automation/outcome.ts):
 *  - Each item is claimed (its socialLog created) before anything goes to
 *    Buffer, and create refuses an id that exists. A second run at the same
 *    moment skips it, and a log Sanity won't take stops the run before
 *    Buffer has anything, so nothing is ever drafted twice.
 *  - An item that got no draft for a reason that can clear has its claim
 *    dropped, so the next run tries again, for GIVE_UP_DAYS from its first
 *    failed try (kept in a `socialRetry-<key>` document, which Studio doesn't
 *    list). One that has failed before waits behind the ones not tried yet.
 *  - A run that stops (an expired key, no usable channel, a missing setting)
 *    emails the editor what to do (notifyRunFailure, from the cron route).
 *  - Nothing between a claim and its settling can outlast the function
 *    (Vercel stops it at 300 s): each Buffer and Sanity call gives up after
 *    20 s, and no item is started after 120 s or claimed after 150 s; what's
 *    left waits for the next day.
 */
import { portableToText } from "@/lib/automation/markdown"
import { styleReport } from "@/lib/automation/drafter"
import { loadServices, loadSubjects, serviceFor } from "@/lib/automation/facts"
import { BUFFER_TIMEOUT_MS, BufferApiError, type Buffer, type BufferChannel } from "@/lib/automation/buffer"
import { googleText, polishSocialCopy, writeSocialCopy, type SocialCopy, type SocialSource } from "@/lib/automation/social-drafter"
import { absolute, idFor, libraryDue, libraryQueue, nextLibraryItem, socialImageUrl, type LibraryItem, type SocialPhoto } from "@/lib/automation/social-library"
import { daysSince, decideOutcome, failureHint, GIVE_UP_DAYS, isConflict, isRunLevel, NO_CHANNELS, unusableReason, type ChannelSkip, type Outcome } from "@/lib/automation/outcome"
import { APPLICATION_OPTIONS, SERVICE_OPTIONS, SYSTEM_OPTIONS } from "@/lib/automation/plan"
import { notifyList, type Claude, type Mailer, type Store } from "@/lib/automation/services"

/** Posts dated before this never get social drafts (the imported library runs to April 2026). */
export const SOCIAL_SINCE = "2026-10-01"
const MAX_POSTS_PER_RUN = 2
const MAX_FIELD_PER_RUN = 1

/**
 * Time limits inside the route's 300 s (see the header). The worst case after
 * a claim at 150 s: channels started until 220 s (each call 20 s at most),
 * then settling (two Sanity calls) and the email (15 s at most) by 295 s.
 */
export const START_LIMIT_MS = 120_000
const CLAIM_LIMIT_MS = 150_000
export const CHANNEL_LIMIT_MS = 220_000
const MAIL_TIMEOUT_MS = 15_000
/** Each Sanity call the social store makes (app/api/cron/social-drafts). */
export const SANITY_TIMEOUT_MS = BUFFER_TIMEOUT_MS

interface Network {
  copy: keyof SocialCopy
  utm: string
  shape: "portrait" | "landscape"
  needsImage?: boolean
  /** Buffer's per-network metadata; Google's carries the button's link. */
  metadata?: (link: string) => Record<string, unknown>
  /** Google Business Profile takes no alt text. */
  noAlt?: boolean
}

/** Which copy each Buffer service gets, and what it needs (Buffer's Service enum, checked 14 Oct 2026). */
export const NETWORKS: Record<string, Network> = {
  linkedin: { copy: "linkedin", utm: "linkedin", shape: "landscape" },
  facebook: { copy: "facebook", utm: "facebook", shape: "landscape", metadata: () => ({ facebook: { type: "post" } }) },
  instagram: { copy: "instagram", utm: "instagram", shape: "portrait", needsImage: true, metadata: () => ({ instagram: { type: "post", shouldShareToFeed: true } }) },
  googlebusiness: {
    copy: "google",
    utm: "google",
    shape: "landscape",
    noAlt: true,
    metadata: (link) => ({ google: { type: "whats_new", detailsWhatsNew: { button: "learn_more", link } } }),
  },
}

export type Stream = "Article" | "From the field" | "From the library"

/** One thing to draft posts from, whatever stream it came from. */
export interface SocialItem {
  /** The log key: an article's slug, "field:<id>" or "lib:<kind>:<slug>". */
  key: string
  stream: Stream
  title: string
  source: SocialSource
  /** The page the posts link to, as a full URL without UTM tags. */
  pageUrl: string
  campaign: "blog" | "field" | "library"
  photo?: SocialPhoto
}

/** A page link with UTM tags. For an article this is the link the pipeline has made since 30 Sept 2026. */
export const utmLink = (item: Pick<SocialItem, "pageUrl" | "campaign" | "key">, source: string) =>
  `${item.pageUrl}?utm_source=${source}&utm_medium=social&utm_campaign=${item.campaign}&utm_content=${encodeURIComponent(item.key.replace(/^(field|lib):/, ""))}`

export interface SocialDeps {
  claude: Claude
  store: Store
  buffer: Buffer
  mail: Mailer
  now: () => Date
}

export interface SocialResult {
  key: string
  title: string
  stream: Stream
  drafted: { service: string; channel: string }[]
  skipped: ChannelSkip[]
  /** The style pass on the copy: "clean", or the sentences to fix in Buffer. */
  styleCheck: string
  /** See lib/automation/outcome.ts. Only "retry" leaves the item to the next run. */
  outcome: Outcome
  /** Studio's record of the item couldn't be written: what that means, for the email. */
  recordProblem?: string
}

const errorText = (err: unknown) => (err instanceof Error ? err.message : String(err))

/** A field post as the query returns it. */
export interface FieldDoc {
  _id: string
  place?: string | null
  note?: string | null
  date?: string | null
  service?: string | null
  systems?: string[] | null
  application?: string | null
  photo?: { asset?: string | null; alt?: string | null; hotspot?: SocialPhoto["hotspot"]; crop?: SocialPhoto["crop"] } | null
}

const FIELD = `*[_type == "fieldPost" && !(_id in path("drafts.**")) && !(_id in path("versions.**"))] | order(coalesce(date, _createdAt) asc){
  _id, place, note, date, service, systems, application,
  "photo": photos[0]{ "asset": asset._ref, alt, hotspot, crop }
}`

interface DuePost {
  title: string
  slug: string
  date: string
  category?: string
  excerpt?: string
  seoDescription?: string
  body?: unknown
  photo?: { asset?: string | null; alt?: string | null; hotspot?: SocialPhoto["hotspot"]; crop?: SocialPhoto["crop"] } | null
}

const DUE = `*[_type == "post" && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && defined(slug.current) && date >= $since] | order(date asc) {
  title, "slug": slug.current, date, category, excerpt, seoDescription, body,
  "photo": mainImage{ "asset": asset._ref, alt, hotspot, crop }
}`

/** A field post as a social item, or null when it lacks what the posts need (Studio's validation should stop that). */
export function fieldItem(doc: FieldDoc, services = SERVICE_OPTIONS): SocialItem | null {
  const service = services.find((s) => s.value === doc.service)
  const place = doc.place?.trim()
  const note = doc.note?.trim()
  if (!service || !place || !note || !doc.photo?.asset) return null
  const page = serviceFor(service.value)
  const systems = (doc.systems ?? []).map((s) => SYSTEM_OPTIONS.find((o) => o.value === s)?.title).filter((s): s is string => !!s)
  const kind = APPLICATION_OPTIONS.find((o) => o.value === doc.application)?.title
  const title = `${service.title} in ${place}`
  return {
    key: `field:${doc._id}`,
    stream: "From the field",
    title,
    source: {
      kind: "field",
      title,
      type: "Field post",
      excerpt: note,
      text: [
        `Where: ${place}.`,
        `Service: ${service.title}.`,
        systems.length ? `Systems: ${systems.join(", ")}.` : "",
        kind ? `Kind of work: ${kind}.` : "",
        `What the crew says: ${note}`,
        page ? `About ${service.title.toLowerCase()}, from its page on squareonepaving.com: ${page.tagline} ${page.shortDescription}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      linkTo: `the ${service.title.toLowerCase()} page on squareonepaving.com`,
    },
    pageUrl: absolute(`/services/${service.value}`),
    campaign: "field",
    photo: {
      asset: doc.photo.asset,
      alt: doc.photo.alt?.trim() || title,
      ...(doc.photo.hotspot ? { hotspot: doc.photo.hotspot } : {}),
      ...(doc.photo.crop ? { crop: doc.photo.crop } : {}),
    },
  }
}

function articleItem(post: DuePost): SocialItem {
  return {
    key: post.slug,
    stream: "Article",
    title: post.title,
    source: { kind: "article", title: post.title, excerpt: post.seoDescription || post.excerpt || "", text: portableToText(post.body), type: post.category ?? "" },
    pageUrl: absolute(`/blog/${post.slug}`),
    campaign: "blog",
    ...(post.photo?.asset
      ? {
          photo: {
            asset: post.photo.asset,
            alt: post.photo.alt?.trim() || post.title,
            ...(post.photo.hotspot ? { hotspot: post.photo.hotspot } : {}),
            ...(post.photo.crop ? { crop: post.photo.crop } : {}),
          },
        }
      : {}),
  }
}

function libraryItem(lib: LibraryItem): SocialItem {
  return {
    key: lib.key,
    stream: "From the library",
    title: lib.title,
    source: { kind: "library", title: lib.title, type: lib.type, excerpt: lib.excerpt, text: lib.text, linkTo: lib.linkTo },
    pageUrl: absolute(lib.path),
    campaign: "library",
    ...(lib.photo ? { photo: lib.photo } : {}),
  }
}

export async function draftSocialForNewPosts(deps: SocialDeps): Promise<{ posts: SocialResult[]; waiting: number }> {
  const { store } = deps
  // The run's date, for its records; the clock is read again only for the time limits.
  const now = deps.now()
  const started = now.getTime()
  const [loggedKeys, retries, fieldDocs, lastJobPostAt, duePosts] = await Promise.all([
    store.fetch<string[] | null>(`*[_type == "socialLog"].slug`),
    store.fetch<{ slug: string; firstFailedAt: string }[] | null>(`*[_type == "socialRetry"]{ slug, firstFailedAt }`),
    store.fetch<FieldDoc[] | null>(FIELD),
    // The newest job post (library or field): one a week (libraryDue). A log
    // settled with nothing in Buffer (every channel skipped) doesn't count;
    // one whose drafts couldn't be written onto it still does.
    store.fetch<string | null>(
      `*[_type == "socialLog" && (string::startsWith(slug, "lib:") || string::startsWith(slug, "field:")) && !(count(drafts) == 0 && count(skipped) > 0)] | order(createdAt desc)[0].createdAt`,
    ),
    store.fetch<DuePost[] | null>(DUE, { since: SOCIAL_SINCE }),
  ])
  const logged = new Set<string>(loggedKeys ?? [])
  // When each item that keeps failing first failed.
  const failing = new Map<string, string>((retries ?? []).map((r) => [r.slug, r.firstFailedAt]))
  const failedLast = <T,>(xs: T[], key: (x: T) => string) => xs.sort((a, b) => Number(failing.has(key(a))) - Number(failing.has(key(b))))

  // Oldest first, so a backlog goes out in the order it was published; one
  // that has failed before goes behind the ones not tried yet (a stable sort).
  const articles = failedLast(
    (duePosts ?? []).filter((p) => p.slug && !logged.has(p.slug)),
    (p) => p.slug,
  )
  // Built now, so a published field post missing its note, photo or service
  // is skipped instead of holding the day's field slot for ever.
  const fields = failedLast(
    (fieldDocs ?? [])
      .filter((d) => !logged.has(`field:${d._id}`))
      .flatMap((d) => {
        const item = fieldItem(d)
        if (!item) console.warn(`[social] field:${d._id}: no note, photo, place or service; skipped until it has them`)
        return item ? [item] : []
      }),
    (item) => item.key,
  )
  // An article drafted today counts as posted: the library mustn't pick its project too.
  const posted = new Set([...logged, ...articles.map((p) => p.slug)])
  // A field post not tried before takes the week's turn; one that keeps
  // failing doesn't, so it can't hold the library up for its 14 days of retries.
  const fieldPostToday = fields.some((f) => !failing.has(f.key))
  let library: LibraryItem | undefined
  if (libraryDue(now, lastJobPostAt ?? undefined, fieldPostToday)) {
    const [subjects, services] = await Promise.all([loadSubjects(store), loadServices(store)])
    library = nextLibraryItem(libraryQueue(subjects, services), posted)
  }
  if (!articles.length && !fields.length && !library) return { posts: [], waiting: 0 }

  const channels = await deps.buffer.channels()
  // With no channel the job writes for (none connected, or only YouTube and
  // the like), every item would end "nothing possible" and be closed for
  // good: stop here instead, and the route emails the editor.
  if (!channels.some((c) => NETWORKS[c.service.toLowerCase()])) {
    const connected = channels.map((c) => c.service.toLowerCase()).join(", ")
    throw new Error(`${NO_CHANNELS} (connected: ${connected || "none"}).`)
  }

  // What to draft today, in order.
  const todo: SocialItem[] = [...articles.slice(0, MAX_POSTS_PER_RUN).map(articleItem), ...fields.slice(0, MAX_FIELD_PER_RUN), ...(library ? [libraryItem(library)] : [])]

  const results: SocialResult[] = []
  let done = 0
  for (const item of todo) {
    if (deps.now().getTime() - started > START_LIMIT_MS) {
      console.log(`[social] out of time for today; ${item.key} waits for the next run`)
      break
    }
    let result: SocialResult | null | "out of time"
    try {
      result = await draftItem(deps, item, channels, failing.get(item.key), now, started)
    } catch (err) {
      // A key refused, Anthropic down: the run stops and the route emails.
      // Anything else is this item's problem, and the run carries on.
      if (isRunLevel(err)) throw err
      result = await itemFailed(deps, item, err, failing.get(item.key), now)
    }
    if (result === "out of time") break
    done++
    if (result) results.push(result)
  }
  const waiting = Math.max(0, articles.length + fields.length + (library ? 1 : 0) - done)
  return { posts: results, waiting }
}

/**
 * The item's photograph as Buffer can fetch it: a Sanity asset as is, or a
 * photograph on the site uploaded to Sanity first, so it can be cropped like
 * the others (the site's own address, uncropped, if the upload fails).
 */
async function resolvePhoto(store: Store, photo: SocialPhoto | undefined): Promise<SocialPhoto & { url?: string } | undefined> {
  if (!photo) return undefined
  if (photo.asset || !photo.src) return photo
  const name = decodeURIComponent(photo.src.split("/").pop() ?? "photo.jpg")
  const asset = await store.uploadImage(absolute(photo.src), name).catch((err: unknown) => {
    console.warn(`[social] couldn't upload ${photo.src}: ${errorText(err)}; sending the site's own copy`)
    return null
  })
  return asset ? { ...photo, asset } : { ...photo, url: absolute(photo.src) }
}

/** Claim, write, draft in Buffer, settle, email: one item. Null when another run has it. */
async function draftItem(
  deps: SocialDeps,
  item: SocialItem,
  channels: BufferChannel[],
  firstFailedAt: string | undefined,
  now: Date,
  started: number,
): Promise<SocialResult | null | "out of time"> {
  const { store } = deps
  const written = await writeSocialCopy(deps.claude, item.source, { linkedin: utmLink(item, "linkedin"), facebook: utmLink(item, "facebook") })
  const { copy, style } = await polishSocialCopy(deps.claude, written)

  const result: SocialResult = {
    key: item.key,
    title: item.title,
    stream: item.stream,
    drafted: [],
    skipped: [],
    styleCheck: styleReport(style, "in Buffer before approving").join("\n"),
    outcome: "retry",
  }

  // The photo before the claim too: a site-only photo is uploaded to Sanity
  // (two calls of 20 s at most), and the claim's clock shouldn't pay for it.
  let photo: (SocialPhoto & { url?: string }) | undefined
  try {
    photo = await resolvePhoto(store, item.photo)
  } catch (err) {
    console.warn(`[social] ${item.key}: no photo (${errorText(err)})`)
  }

  // Claim the item before anything goes to Buffer (see the header). The copy
  // is written first, so a failure there (Anthropic down) leaves no claim.
  if (deps.now().getTime() - started > CLAIM_LIMIT_MS) {
    console.log(`[social] out of time for today; ${item.key} waits for the next run`)
    return "out of time"
  }
  const logId = idFor("socialLog", item.key)
  try {
    await store.create({ _id: logId, _type: "socialLog", slug: item.key, title: item.title, source: item.stream, createdAt: now.toISOString(), drafts: [], skipped: [], styleCheck: result.styleCheck })
  } catch (err) {
    if (isConflict(err)) {
      console.log(`[social] ${item.key}: another run has it; skipped`)
      return null
    }
    throw err
  }

  // _type names the array items for Studio's "Social drafts" view (sanity/schemaTypes/socialLog.ts).
  const drafts: { _key: string; _type: "bufferDraft"; service: string; channel: string; bufferPostId: string }[] = []
  // Everything from here to the settling is inside a try: nothing may escape
  // between the claim and its settling, or the item would stay claimed with
  // nothing drafted.
  for (const ch of channels) {
    const service = ch.service.toLowerCase()
    const rule = NETWORKS[service]
    const label = ch.displayName || ch.name
    if (deps.now().getTime() - started > CHANNEL_LIMIT_MS) {
      result.skipped.push({ service, channel: label, why: "out of time for today's run", kind: "retry" })
      continue
    }
    if (!rule) {
      result.skipped.push({ service, channel: label, why: "not a network this job writes for (TikTok and YouTube need a video)", kind: "lasting" })
      continue
    }
    const unusable = unusableReason(ch)
    if (unusable) {
      result.skipped.push({ service, channel: label, why: unusable, kind: "retry" })
      continue
    }
    try {
      const imageUrl = photo ? (photo.asset ? socialImageUrl(photo, rule.shape) : photo.url) : undefined
      if (rule.needsImage && !imageUrl) {
        result.skipped.push({ service, channel: label, why: "Instagram needs a photo and this has none", kind: "lasting" })
        continue
      }
      let text = copy[rule.copy]
      if (rule.copy === "google") {
        const g = googleText(text)
        if (g.problem) {
          result.skipped.push({ service, channel: label, why: g.problem, kind: "retry" })
          continue
        }
        text = g.text
      }
      const id = await deps.buffer.createDraft({
        channelId: ch.id,
        text,
        ...(imageUrl ? { imageUrl } : {}),
        ...(imageUrl && !rule.noAlt ? { imageAlt: photo?.alt || item.title } : {}),
        ...(rule.metadata ? { metadata: rule.metadata(utmLink(item, rule.utm)) } : {}),
      })
      drafts.push({ _key: ch.id, _type: "bufferDraft", service, channel: label, bufferPostId: id })
      result.drafted.push({ service, channel: label })
    } catch (err) {
      // No answer is not a no: Buffer may have saved the draft before the
      // call gave up. Trying again could leave a second one, so this channel
      // is done and the email says to look in Buffer first.
      if (err instanceof BufferApiError && err.status === 0) {
        result.skipped.push({ service, channel: label, why: "Buffer didn't answer in time: look in Buffer's drafts before making this one by hand (it may be there)", kind: "lasting" })
      } else {
        result.skipped.push({ service, channel: label, why: errorText(err), kind: "retry" })
      }
    }
  }

  result.outcome = decideOutcome(result.drafted.length, result.skipped, firstFailedAt ? daysSince(firstFailedAt, now) : null)
  const reasons = result.skipped.map((s) => `${s.channel} (${s.service}): ${s.why}`).join("; ")
  const retryId = idFor("socialRetry", item.key)
  if (result.outcome === "retry") {
    // Nothing reached Buffer and it may next time: drop the claim, so the
    // next daily run writes this item again. The email says why.
    try {
      await store.delete(logId)
      console.warn(`[social] ${item.key}: nothing drafted, the next run tries again. ${reasons}`)
    } catch (err) {
      result.recordProblem = `Its record under Social drafts in Studio couldn't be cleared (${errorText(err)}), so the job won't try this again by itself.`
      console.error(`[social] ${item.key}: nothing drafted, and the claim couldn't be dropped: ${errorText(err)}. ${reasons}`)
    }
    // The first failure starts the GIVE_UP_DAYS clock. If this write fails,
    // the clock starts at the next failure instead: a later give-up, never an
    // earlier one.
    if (!firstFailedAt) {
      await store
        .createIfNotExists({ _id: retryId, _type: "socialRetry", slug: item.key, firstFailedAt: now.toISOString() })
        .catch((err: unknown) => console.error(`[social] ${item.key}: couldn't note the first failure: ${errorText(err)}`))
    }
  } else {
    // Done with it: its failure clock (if any) can go. A leftover is harmless.
    if (firstFailedAt) await store.delete(retryId).catch((err: unknown) => console.error(`[social] ${item.key}: couldn't remove ${retryId}: ${errorText(err)}`))
    // Done, even if some channels failed, so it is never drafted twice; what
    // failed is in the log and in the email.
    try {
      await store.patch(logId, {
        drafts,
        skipped: result.skipped.map((s, i) => ({ _key: `s${i}`, _type: "skippedChannel", service: s.service, channel: s.channel, why: s.why })),
        styleCheck: result.styleCheck,
      })
    } catch (err) {
      result.recordProblem = `Studio's record of this under Social drafts couldn't be filled in (${errorText(err)}). Nothing is lost: the drafts are in Buffer, and it won't be drafted again.`
      console.error(`[social] ${item.key}: the log couldn't be filled in: ${errorText(err)}`)
    }
    console.log(
      `[social] ${item.key}: ${result.outcome}, ${result.drafted.length} Buffer draft(s), ${result.skipped.length} skipped${reasons ? ` (${reasons})` : ""}; style: ${style.left.length} of ${style.flagged} left${style.error ? ` (rewrite failed: ${style.error})` : ""}`,
    )
  }
  await notify(deps.mail, result)
  return result
}

/**
 * True once the job has made a log, so a missing BUFFER_API_KEY means the key
 * was lost (say, deleted during the yearly change) rather than "not set up
 * yet". False whenever it can't tell.
 */
export async function socialJobHasRun(store: Store): Promise<boolean> {
  try {
    return (await store.fetch<boolean>(`count(*[_type == "socialLog"]) > 0`)) === true
  } catch {
    return false
  }
}

function channelList(xs: { service: string; channel: string }[]) {
  return xs.map((x) => `${x.channel} (${x.service})`).join(", ")
}

/** One email to the editor (BLOG_DRAFT_NOTIFY), given up after 15 s. Never throws: a lost email mustn't stop the run. */
async function emailEditors(mail: Mailer, subject: string, text: string): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    await Promise.race([
      mail({ to: notifyList(), subject, text }),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("the email took longer than 15 s")), MAIL_TIMEOUT_MS)
      }),
    ])
  } catch (err) {
    console.error(`[social] email failed: ${errorText(err)}`)
  } finally {
    if (timer) clearTimeout(timer)
  }
}

/**
 * An item that couldn't even be written up (Claude returned nothing usable
 * for it, Sanity refused its record): retried by the next runs, behind the
 * others, for GIVE_UP_DAYS from its first failure, then given up for good,
 * so one bad item can't hold the queue or email every day for ever.
 */
async function itemFailed(deps: SocialDeps, item: SocialItem, err: unknown, firstFailedAt: string | undefined, now: Date): Promise<SocialResult> {
  const why = errorText(err)
  console.error(`[social] ${item.key}: couldn't be drafted: ${why}`)
  const failingDays = firstFailedAt ? daysSince(firstFailedAt, now) : null
  const gaveUp = failingDays !== null && failingDays > GIVE_UP_DAYS
  const result: SocialResult = {
    key: item.key,
    title: item.title,
    stream: item.stream,
    drafted: [],
    skipped: [{ service: "all", channel: "every channel", why, kind: "retry" }],
    styleCheck: "",
    outcome: gaveUp ? "gave-up" : "retry",
  }
  if (gaveUp) {
    // Its record is what tells the next runs it's done.
    await deps.store
      .createIfNotExists({ _id: idFor("socialLog", item.key), _type: "socialLog", slug: item.key, title: item.title, source: item.stream, createdAt: now.toISOString(), drafts: [], skipped: [{ _key: "s0", _type: "skippedChannel", service: "all", channel: "every channel", why }], styleCheck: "" })
      .catch((e: unknown) => (result.recordProblem = `Its record under Social drafts couldn't be written (${errorText(e)}), so the next run tries it again.`))
    await deps.store.delete(idFor("socialRetry", item.key)).catch(() => {})
  } else if (!firstFailedAt) {
    await deps.store
      .createIfNotExists({ _id: idFor("socialRetry", item.key), _type: "socialRetry", slug: item.key, firstFailedAt: now.toISOString() })
      .catch((e: unknown) => console.error(`[social] ${item.key}: couldn't note the first failure: ${errorText(e)}`))
  }
  await notify(deps.mail, result)
  return result
}

/** How an email names what the drafts are for. */
export function describe(r: Pick<SocialResult, "stream" | "title">): string {
  if (r.stream === "From the field") return `the field post "${r.title}"`
  if (r.stream === "From the library") return `"${r.title}" from Square One's library (a documented project or a service page)`
  return `the new blog post "${r.title}"`
}

async function notify(mail: Mailer, r: SocialResult) {
  const skippedLines = r.skipped.map((s) => `- ${s.channel} (${s.service}): ${s.why}`)
  const record = r.recordProblem ? ["", r.recordProblem] : []
  const byHand = "Make the posts by hand in Buffer if you want them."
  const tag = r.stream === "Article" ? "" : ` (${r.stream.toLowerCase()})`
  const what = describe(r)

  if (r.outcome === "drafted") {
    await emailEditors(
      mail,
      `Social drafts ready in Buffer: ${r.title}${tag}`,
      [
        `Social drafts for ${what} are waiting in Buffer. Nothing posts until you approve and schedule them.`,
        "",
        `Drafted: ${channelList(r.drafted)}`,
        ...(r.skipped.length ? ["", "Skipped:", ...skippedLines] : []),
        ...record,
        "",
        r.styleCheck,
        "",
        "Review them: https://publish.buffer.com/drafts",
      ].join("\n"),
    )
    return
  }
  if (r.outcome === "nothing-possible") {
    await emailEditors(mail, `No social drafts for: ${r.title}${tag}`, [`No channel in Buffer can take ${what}, so nothing was drafted and the job is done with it. ${byHand}`, "", "Why:", ...skippedLines, ...record].join("\n"))
    return
  }
  const hint = `What to do: ${failureHint(new Error(r.skipped.map((s) => s.why).join("; ")), "social")}`
  if (r.outcome === "gave-up") {
    await emailEditors(
      mail,
      `Social drafts given up: ${r.title}${tag}`,
      [`Every channel has failed for ${what} for more than ${GIVE_UP_DAYS} days since its first try, so the job has stopped trying. Nothing was posted. ${byHand}`, "", "Why:", ...skippedLines, ...record, "", hint].join("\n"),
    )
    return
  }
  // "retry"
  await emailEditors(
    mail,
    `Social drafts not made yet: ${r.title}${tag}`,
    [
      r.recordProblem
        ? `Nothing could be drafted in Buffer for ${what}, and nothing was posted.`
        : `Nothing could be drafted in Buffer for ${what}. Nothing was posted, and the next daily run (14:00 UTC) tries again, for up to ${GIVE_UP_DAYS} days from the first failure.`,
      "",
      "Why:",
      ...skippedLines,
      ...(r.recordProblem ? ["", `${r.recordProblem} ${byHand}`] : []),
      "",
      hint,
    ].join("\n"),
  )
}

/**
 * The run stopped (an expired key, no channels, a missing setting): tell the
 * editor what to do, so it can't fail unnoticed. Called by the cron route.
 * Nothing is lost: anything it didn't finish has no log, so it is drafted on
 * the first run after the fix.
 */
export async function notifyRunFailure(mail: Mailer, err: unknown): Promise<void> {
  const message = errorText(err)
  await emailEditors(
    mail,
    `Social drafts didn't run: ${message.length > 80 ? `${message.slice(0, 77)}...` : message}`,
    [
      "Today's social drafts job stopped. Nothing was posted and nothing is lost: any new blog post, field post or library post it didn't finish gets its Buffer drafts on the first daily run after this is fixed.",
      "",
      `What happened: ${message}`,
      "",
      `What to do: ${failureHint(err, "social")}`,
    ].join("\n"),
  )
}
