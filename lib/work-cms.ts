import { groq } from "next-sanity"
import { sanityFetch, urlFor, type SanityImageSource } from "@/sanity/lib/client"
import { getWork, WORK_APPS, type WorkApp, type WorkPhoto, type WorkRegion } from "@/lib/work"

/**
 * The photo galleries with the Studio's photographs in them (9 Oct 2026).
 * Server-only.
 *
 * lib/work.ts is the galleries as the site ships them: Square One's own
 * photographs, captioned from the record. The Studio adds to them ("Gallery
 * photos": a photograph, the gallery, what it shows, where, the systems) and
 * can take one off: its own with "Take off the site", one that came with the
 * site by pasting the photograph's address into "Galleries: photos taken off".
 *
 * Where a Studio photograph goes: one marked "Lead the gallery" first; the
 * rest straight after the gallery's first photograph, newest first, so new
 * work is near the top without changing the photograph a gallery opens on
 * (the home page and the galleries index use it as the gallery's face) until
 * the office says so. With nothing in the Studio, or no CMS, this is exactly
 * getWork().
 */

export interface GalleryPhotoDoc {
  _id?: string
  image?: { asset?: { _ref: string }; crop?: unknown; hotspot?: unknown }
  dims?: { width?: number; height?: number } | null
  gallery?: string
  subject?: string
  place?: string
  region?: string
  systems?: string[]
  lead?: boolean
  hidden?: boolean
  date?: string
  _createdAt?: string
}

const QUERY = groq`{
  "photos": *[_type == "galleryPhoto" && defined(image.asset) && defined(gallery)] | order(coalesce(date, _createdAt) desc, _createdAt desc) {
    _id, image{ asset, crop, hotspot }, "dims": image.asset->metadata.dimensions{ width, height },
    gallery, subject, place, region, systems, lead, hidden, date, _createdAt
  },
  "removed": *[_type == "gallerySettings" && _id == "gallerySettings"][0].removed
}`

const APPS = new Set<string>(WORK_APPS.map((a) => a.slug))
const REGIONS = new Set<string>(["Lower Mainland", "Vancouver Island", "Interior", "Sunshine Coast", "Sea to Sky"])
/** Never served wider than this; the site's own large photographs are 2400px. */
const MAX_W = 2400

function decoded(s: string): string {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

/**
 * A photograph's address as pasted from a browser, reduced to the site's own
 * path, decoded: the optimiser's address ("/_next/image?url=…&w=1920"), the
 * full address on www, or the path itself, encoded or not, all come out the
 * same (npm run test:pages has the cases).
 */
export function photoPath(address: string): string {
  let s = address.trim()
  if (!s) return ""
  try {
    const u = new URL(s, "https://www.squareonepaving.com")
    s = u.pathname === "/_next/image" ? (u.searchParams.get("url") ?? "") : u.pathname
  } catch {
    /* not a URL: a path as it stands */
  }
  s = decoded(s)
  return s.startsWith("/") ? s : `/${s}`
}

function fromDoc(d: GalleryPhotoDoc): WorkPhoto | null {
  const subject = d.subject?.trim()
  if (!d.image?.asset || !d.gallery || !APPS.has(d.gallery) || !subject || d.hidden) return null
  const w0 = d.dims?.width ?? 0
  const h0 = d.dims?.height ?? 0
  if (!w0 || !h0) return null
  const w = Math.min(w0, MAX_W)
  const h = Math.round((h0 * w) / w0)
  return {
    src: urlFor(d.image as SanityImageSource, w),
    w,
    h,
    app: d.gallery as WorkApp,
    systems: (d.systems ?? []).filter((s) => typeof s === "string" && s.trim()),
    subject,
    place: d.place?.trim() ?? "",
    region: d.region && REGIONS.has(d.region) ? (d.region as WorkRegion) : undefined,
    hires: w0 >= 1600,
  }
}

/** The record with the Studio's photographs placed in it and its removals taken out. Pure, for the tests. */
export function mergeWork(record: WorkPhoto[], docs: GalleryPhotoDoc[] | null, removed: string[] | null): WorkPhoto[] {
  const gone = new Set((removed ?? []).filter((r) => typeof r === "string").map(photoPath).filter(Boolean))
  const added = (docs ?? []).filter((d) => !d.hidden)
  if (!gone.size && !added.length) return record
  const kept = gone.size ? record.filter((p) => !gone.has(photoPath(p.src))) : record
  if (!added.length) return kept

  const lead = new Map<string, WorkPhoto[]>()
  const rest = new Map<string, WorkPhoto[]>()
  for (const d of added) {
    const p = fromDoc(d)
    if (!p) continue
    const into = d.lead ? lead : rest
    into.set(p.app, [...(into.get(p.app) ?? []), p])
  }

  // The record is grouped by gallery (lib/curation.ts); keep its order of
  // galleries, and any gallery only the Studio has comes after.
  const order: string[] = []
  for (const p of kept) if (!order.includes(p.app)) order.push(p.app)
  for (const a of WORK_APPS) if (!order.includes(a.slug) && (lead.has(a.slug) || rest.has(a.slug))) order.push(a.slug)

  const out: WorkPhoto[] = []
  for (const app of order) {
    const own = kept.filter((p) => p.app === app)
    out.push(...(lead.get(app) ?? []), ...own.slice(0, 1), ...(rest.get(app) ?? []), ...own.slice(1))
  }
  return out
}

/** Every photograph in the galleries, the Studio's included. */
export async function getStudioWork(): Promise<WorkPhoto[]> {
  const res = await sanityFetch<{ photos: GalleryPhotoDoc[] | null; removed: string[] | null }>(QUERY, {}, ["sanity", "galleries"])
  return mergeWork(getWork(), res?.photos ?? null, res?.removed ?? null)
}

/** One gallery, the Studio's photographs included. */
export async function studioWorkFor(app: WorkApp): Promise<WorkPhoto[]> {
  return (await getStudioWork()).filter((p) => p.app === app)
}

/** One gallery within a region (the driveways city pages). */
export async function studioWorkForRegion(app: WorkApp, region: WorkRegion): Promise<WorkPhoto[]> {
  return (await getStudioWork()).filter((p) => p.app === app && p.region === region)
}
