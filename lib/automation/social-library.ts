/**
 * The library stream, and the helpers every social stream shares (14 Oct
 * 2026, ported from hubss.com's lib/social-library.ts). Once a week the daily
 * social job (lib/automation/social.ts) drafts posts from one thing Square
 * One already publishes, so the Buffer queue never runs dry between new
 * articles. With the two articles a week that makes three posts a week on
 * each channel. A new field post takes the library's turn (libraryDue), so
 * the crew's photos go first.
 *
 *  - a documented project (Studio → Projects, as the site shows it): its
 *    place, its systems, its own photographs, linked to its page;
 *  - a service page (stamped asphalt, decorative coatings, preformed
 *    thermoplastic, vapour blasting), with the Studio's words on top.
 *
 * Projects and services take turns (project, service, project, ...); the
 * featured projects come first. A project whose article already had its own
 * social posts is skipped, so nothing goes out twice. Everything is drafts in
 * Buffer, approved by a person.
 *
 * Pure data and dates: `npm run test:social` checks it without the network.
 */
import { SITE_URL } from "@/lib/site"
import { projects as RECORD } from "@/lib/projects"
import type { Service } from "@/lib/services"
import { captionFor, type Subject, type SubjectPhoto } from "@/lib/automation/facts"
import { croppedImageUrl } from "@/lib/automation/services"

/**
 * Job posts (library or field) a week. One with two articles a week (the
 * drafter's Tuesdays and Thursdays): three posts a week on each channel. Set
 * to 2 if Square One settles on one article a week.
 */
export const JOB_POSTS_PER_WEEK: 1 | 2 = 1

/** A photograph for a post: a Sanity asset (cropped on Sanity's CDN) or a path on the site (uploaded first). */
export interface SocialPhoto {
  asset?: string
  src?: string
  alt: string
  hotspot?: SubjectPhoto["hotspot"]
  crop?: SubjectPhoto["crop"]
}

export interface LibraryItem {
  /** The log key: "lib:project:<slug>" or "lib:service:<slug>". */
  key: string
  title: string
  /** What kind of source, for the writer: "A documented Square One project". */
  type: string
  excerpt: string
  /** The facts the posts may use, and nothing else. */
  text: string
  /** The page the posts link to, a path on the site. */
  path: string
  /** What that page is, for the writer's ask. */
  linkTo: string
  photo?: SocialPhoto
  /** The article that already tells this project: when it went out as an article, the library skips it. */
  post?: string
}

/** A path on the site as a full URL. */
export function absolute(path: string): string {
  return /^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`
}

const clean = (s: string) => s.replace(/\s*—\s*/g, ", ").replace(/\s+/g, " ").trim()

export function photoOf(p: SubjectPhoto | undefined, fallbackAlt: string): SocialPhoto | undefined {
  if (!p || (!p.asset && !p.src)) return undefined
  return {
    ...(p.asset ? { asset: p.asset } : {}),
    ...(p.src ? { src: p.src } : {}),
    alt: captionFor(p) || fallbackAlt,
    ...(p.hotspot ? { hotspot: p.hotspot } : {}),
    ...(p.crop ? { crop: p.crop } : {}),
  }
}

function projectItem(s: Subject): LibraryItem | null {
  const photo = photoOf(s.photos[0], `${s.title}, ${s.city}`)
  if (!photo || s.flag) return null
  return {
    key: `lib:project:${s.slug}`,
    title: s.title,
    type: "A documented Square One project",
    excerpt: clean(s.excerpt),
    text: [
      `Project: ${s.title}.`,
      `Where: ${s.city}.`,
      s.application ? `Kind of work: ${s.application}.` : "",
      s.service ? `Service: ${s.service}.` : "",
      s.systems.length ? `Systems installed: ${[...new Set(s.systems)].join(", ")}.` : "",
      s.year ? `Installed: ${s.year}.` : "",
      s.client ? `Installed at: ${s.client}.` : "",
      s.artist ? `Artist or designer: ${s.artist}.` : "",
      clean(s.excerpt),
      ...s.story.map(clean),
    ]
      .filter(Boolean)
      .join("\n"),
    path: `/projects/${s.slug}`,
    linkTo: "this project's page on squareonepaving.com",
    photo,
    ...(s.post ? { post: s.post } : {}),
  }
}

function serviceItem(s: Service): LibraryItem {
  return {
    key: `lib:service:${s.slug}`,
    title: s.name,
    type: "A service page on squareonepaving.com",
    excerpt: clean(s.tagline),
    text: [
      `Service: ${s.name}.`,
      clean(s.tagline),
      clean(s.shortDescription),
      ...s.fullDescription.split(/\n\n+/).map(clean),
      ...s.benefits.map((b) => `What you get: ${clean(b)}`),
      s.idealClients.length ? `Who it's for: ${s.idealClients.map(clean).join("; ")}.` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    path: `/services/${s.slug}`,
    linkTo: `the ${s.name.toLowerCase()} page on squareonepaving.com`,
    photo: { src: s.imageUrl, alt: clean(s.imageAlt) },
  }
}

/**
 * Every library item, in posting order: projects and service pages take
 * turns (project, service, project, service, ...), the featured projects
 * first, then the rest as the Studio lists them (newest work first). When one
 * kind runs out the other carries on.
 */
export function libraryQueue(subjects: readonly Subject[], services: readonly Service[]): LibraryItem[] {
  const featured = new Set(RECORD.filter((p) => p.featured).map((p) => p.slug))
  const jobs = subjects
    .map((s, i) => ({ s, i }))
    .sort((a, b) => Number(featured.has(b.s.slug)) - Number(featured.has(a.s.slug)) || a.i - b.i)
    .map(({ s }) => projectItem(s))
    .filter((x): x is LibraryItem => x !== null)
  const pages = services.map(serviceItem)
  const out: LibraryItem[] = []
  while (jobs.length || pages.length) {
    const job = jobs.shift()
    if (job) out.push(job)
    const page = pages.shift()
    if (page) out.push(page)
  }
  return out
}

/** The next item to post: the first in the queue not logged, and not a project whose article already had its own social posts. */
export function nextLibraryItem(queue: readonly LibraryItem[], logged: ReadonlySet<string>): LibraryItem | undefined {
  return queue.find((item) => !logged.has(item.key) && !(item.post && logged.has(item.post)))
}

/** Monday 00:00 UTC of the week `now` is in. */
export function weekStart(now: Date): Date {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7))
  return d
}

/** The start of the stretch `now` is in: the week, or with two a week, Monday to Wednesday and Thursday to Sunday. */
export function slotStart(now: Date, perWeek: 1 | 2 = JOB_POSTS_PER_WEEK): Date {
  const monday = weekStart(now)
  if (perWeek === 1) return monday
  const thursday = new Date(monday.getTime() + 3 * 86_400_000)
  return now.getTime() >= thursday.getTime() ? thursday : monday
}

/**
 * Whether today's run should draft a library post: when this week (from
 * Monday 00:00 UTC; with two a week, this half) has had no job post yet
 * (`lastJobPostAt`: the newest library or field post that reached Buffer)
 * and no new field post is about to take the turn (`fieldPostToday`). So the
 * library lands with the Monday run, a missed Monday catches up later that
 * week, and the crew's photos go ahead of the library. At once when there has
 * never been one, so the stream can be seen working the day it ships.
 */
export function libraryDue(now: Date, lastJobPostAt: string | undefined, fieldPostToday = false, perWeek: 1 | 2 = JOB_POSTS_PER_WEEK): boolean {
  if (fieldPostToday) return false
  if (!lastJobPostAt) return true
  const t = Date.parse(lastJobPostAt)
  if (Number.isNaN(t)) return true
  return t < slotStart(now, perWeek).getTime()
}

/** Sanity ids allow letters, digits, dots, dashes and underscores: "lib:project:x" becomes "lib-project-x". */
export const idFor = (prefix: "socialLog" | "socialRetry", key: string) => `${prefix}-${key.replace(/[^a-zA-Z0-9._-]/g, "-")}`

/** The pixel size Sanity puts in an asset id ("image-<hash>-960x1280-jpg"), cut to the crop when there is one. */
export function assetSize(asset: string, crop?: SocialPhoto["crop"]): { w: number; h: number } | null {
  const m = /-(\d+)x(\d+)-[a-z0-9]+$/i.exec(asset)
  if (!m) return null
  const w = Number(m[1]) * (1 - (crop?.left ?? 0) - (crop?.right ?? 0))
  const h = Number(m[2]) * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0))
  return { w, h }
}

/**
 * The photo for one network, cropped on Sanity's CDN as a JPEG: the 1200×630
 * share crop, or 4:5 (1080×1350) for Instagram and for any portrait photo, so
 * a phone shot isn't cut down to a strip that loses the job. The crop centres
 * on the focal point the office set (@sanity/image-url reads the hotspot and
 * crop), else on the middle.
 */
export function socialImageUrl(photo: Pick<SocialPhoto, "asset" | "hotspot" | "crop">, shape: "portrait" | "landscape"): string | undefined {
  if (!photo.asset) return undefined
  const size = assetSize(photo.asset, photo.crop)
  const tall = shape === "portrait" || (size !== null && size.h > size.w)
  return croppedImageUrl(
    { asset: { _ref: photo.asset }, ...(photo.hotspot ? { hotspot: photo.hotspot } : {}), ...(photo.crop ? { crop: photo.crop } : {}) } as Parameters<typeof croppedImageUrl>[0],
    tall ? 1080 : 1200,
    tall ? 1350 : 630,
  )
}
