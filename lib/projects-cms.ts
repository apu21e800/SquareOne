import { groq } from "next-sanity"
import { editAttr, inDraftMode, sanityFetch, urlFor, type SanityImageSource } from "@/sanity/lib/client"
import { projects as RECORD, type Project, type ProjectPhotoMeta, type ProjectRegion, type ProjectService } from "@/lib/projects"
import { focalPosition, isCropped, type SanityCrop, type SanityHotspot } from "@/lib/focal"

/**
 * The projects, as the Studio has them (9 Oct 2026). Server-only.
 *
 * Every page that lists or shows a project reads getProjects() / getProject():
 * /projects, each project's page, the home page's six, and the application
 * and service pages. The Studio is the source: a project edited there shows
 * within a minute (sanityFetch caches 60 s; the signed webhook purges at once),
 * a project added there joins the list, and "Take off the site" hides one.
 *
 * lib/projects.ts is the fallback, three ways:
 *  - with no CMS, or when Sanity can't be reached, the site renders the record
 *    exactly as before;
 *  - a project's paragraphs ("The project, told") and blog link come from the
 *    record until they are filled in the Studio (the seed of 7 Oct 2026 left
 *    them out);
 *  - a photograph the Studio holds that is the same file the site already
 *    serves (matched by its original file name, as the seed uploaded it) is
 *    served from the site, as before; a new photograph comes from Sanity's
 *    CDN. So an unedited project is byte-for-byte the page it was.
 *
 * Deleting a seeded project in the Studio does not remove it: the record
 * still has it. "Take off the site" does.
 *
 * Each photograph's own words and framing (14 Oct 2026): the alt text the
 * office writes is the one the project's page reads out, and the focal point
 * it drags is where every frame of that photograph crops (Project.photoMeta).
 */

interface PhotoDoc {
  _key?: string
  /** The asset's original file name, as uploaded (the seed stored it URL-encoded). */
  file?: string
  alt?: string
  asset?: { _ref: string }
  crop?: SanityCrop | null
  hotspot?: SanityHotspot | null
}

export interface ProjectDoc {
  _id?: string
  _type?: string
  _createdAt?: string
  title?: string
  slug?: string
  service?: string
  application?: string
  city?: string
  region?: string
  systems?: string[]
  client?: string
  artist?: string
  year?: string
  excerpt?: string
  story?: string[]
  post?: string
  featured?: boolean
  heroWide?: boolean
  hidden?: boolean
  images?: PhotoDoc[]
}

const QUERY = groq`*[_type == "project" && defined(slug.current)] | order(_createdAt desc) {
  _id, _type, _createdAt, title, "slug": slug.current, service, application, city, region, systems,
  client, artist, year, excerpt, story, "post": post->slug.current, featured, heroWide, hidden,
  "images": images[defined(asset)]{ _key, alt, "file": asset->originalFilename, asset, crop, hotspot }
}`

const SERVICES: ProjectService[] = ["Stamped Asphalt", "Decorative Coatings", "Preformed Thermoplastic", "Vapour Blasting"]
const REGIONS: ProjectRegion[] = ["Lower Mainland", "Vancouver Island", "Interior", "Sunshine Coast", "Sea to Sky"]

function decoded(name: string): string {
  try {
    return decodeURIComponent(name)
  } catch {
    return name
  }
}

const baseName = (src: string) => decoded(src.split("/").pop() ?? "")
const cropped = (c: PhotoDoc["crop"]) => isCropped(c)

/** The site's own copy of a photograph when the Studio's is the same file and uncropped; else Sanity's CDN. */
function photoSrc(photo: PhotoDoc, record?: Project): string {
  if (photo.file && !cropped(photo.crop)) {
    const name = decoded(photo.file)
    const own = record?.images.find((src) => baseName(src) === name)
    if (own) return own
  }
  return urlFor(photo as SanityImageSource, 2048)
}

const text = (v: unknown): string | undefined => (typeof v === "string" && v.trim() ? v.trim() : undefined)

/** Each photograph's alt text, focal point and preview mark, by the address the page uses. */
function photoDetails(d: ProjectDoc, photos: { doc: PhotoDoc; src: string }[], preview: boolean): Record<string, ProjectPhotoMeta> | undefined {
  const out: Record<string, ProjectPhotoMeta> = {}
  for (const { doc, src } of photos) {
    if (out[src]) continue
    const meta: ProjectPhotoMeta = {}
    const alt = text(doc.alt)
    if (alt) meta.alt = alt
    const position = focalPosition(doc.hotspot, doc.crop)
    if (position) meta.position = position
    const edit = doc._key ? editAttr(preview, { _id: d._id, _type: d._type ?? "project" }, `images[_key=="${doc._key}"]`) : undefined
    if (edit) meta.edit = edit
    if (Object.keys(meta).length) out[src] = meta
  }
  return Object.keys(out).length ? out : undefined
}

/** One project from the Studio, its gaps filled from the record. Null when there is nothing to show. */
function fromDoc(d: ProjectDoc, record?: Project, preview = false): Project | null {
  const title = text(d.title) ?? record?.title
  const slug = text(d.slug)
  const photos = (d.images ?? []).map((doc) => ({ doc, src: photoSrc(doc, record) })).filter((p) => p.src)
  const images = photos.length ? photos.map((p) => p.src) : record?.images ?? []
  const photoMeta = photos.length ? photoDetails(d, photos, preview) : undefined
  if (!title || !slug || images.length === 0) return record ?? null
  const story = (d.story ?? []).map(text).filter((p): p is string => Boolean(p))
  const systems = (d.systems ?? []).map(text).filter((s): s is string => Boolean(s))
  return {
    title,
    slug,
    service: SERVICES.includes(d.service as ProjectService) ? (d.service as ProjectService) : record?.service ?? "Stamped Asphalt",
    application: text(d.application) ?? record?.application ?? "",
    city: text(d.city) ?? record?.city ?? "",
    region: REGIONS.includes(d.region as ProjectRegion) ? (d.region as ProjectRegion) : record?.region ?? "Lower Mainland",
    systems: systems.length ? systems : record?.systems ?? [],
    client: text(d.client),
    artist: text(d.artist),
    year: text(d.year),
    excerpt: text(d.excerpt) ?? record?.excerpt ?? "",
    story: story.length ? story : record?.story,
    post: text(d.post) ?? record?.post,
    images,
    imageUrl: images[0],
    heroWide: d.heroWide ?? record?.heroWide ?? false,
    featured: d.featured ?? record?.featured,
    flag: record?.flag,
    ...(photoMeta ? { photoMeta } : {}),
  }
}

/**
 * Every project on the site: the Studio's new ones first (newest first), then
 * the record in its own order with the Studio's version of each. The record
 * alone when there is no CMS or it can't be reached.
 */
export async function getProjects(): Promise<Project[]> {
  return mergeProjects(await sanityFetch<ProjectDoc[]>(QUERY, {}, ["sanity", "projects"]), RECORD, await inDraftMode())
}

/** The merge itself, kept pure so `npm run test:projects` can test it without Sanity. */
export function mergeProjects(docs: ProjectDoc[] | null, record: Project[], preview = false): Project[] {
  if (!docs) return record
  const bySlug = new Map<string, ProjectDoc>()
  for (const d of docs) if (d.slug && !bySlug.has(d.slug)) bySlug.set(d.slug, d)
  const hidden = new Set(docs.filter((d) => d.hidden && d.slug).map((d) => d.slug as string))
  const known = new Set(record.map((r) => r.slug))
  const added = [...bySlug.values()]
    .filter((d) => !known.has(d.slug as string) && !hidden.has(d.slug as string))
    .map((d) => fromDoc(d, undefined, preview))
    .filter((p): p is Project => Boolean(p))
  const kept = record.filter((r) => !hidden.has(r.slug)).map((r) => {
    const d = bySlug.get(r.slug)
    return d ? fromDoc(d, r, preview) ?? r : r
  })
  return [...added, ...kept]
}

/** One project by its web address, as getProjects() has it. */
export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug)
}
