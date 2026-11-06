import path from "path"
import { listDir, readText } from "./disk"
import matter from "gray-matter"
import { galleryFor, heroFor } from "./gallery"
import { ledeOverride } from "./blog-ledes"
import { plainCase } from "./text"
import { groq, stegaClean } from "next-sanity"
import type { PortableTextBlock } from "@portabletext/types"
import { editAttr, inDraftMode, sanityFetch, urlFor, type SanityImageSource } from "@/sanity/lib/client"
import { focalPosition, isCropped, type SanityCrop, type SanityHotspot } from "./focal"
import {
  RECORD_POST_DATE,
  categoryForJob,
  cityName,
  jobOf,
  recordJobFor,
  recordOnlyProjects,
  type Job,
  type Project,
  type ProjectPhotoMeta,
  type ProjectRegion,
  type ProjectService,
} from "./projects"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

function ledeFor(slug: string, frontMatter?: string): string {
  const fixed = ledeOverride(slug)
  if (fixed !== undefined) return fixed
  return heroFor("blog", slug, frontMatter) ?? ""
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  featured_image: string
  /** A Studio post's lead photograph: the alt text the office wrote. */
  featured_alt?: string
  /** A Studio post's lead photograph: its focal point, as CSS object-position (lib/focal.ts). */
  featured_position?: string
  /** Edit on the page: the lead photograph opens its field, in an editor's preview only. */
  featured_edit?: string
  tags: string[]
  /** Pin to top (lib/pin.ts): the newest pin leads Selected work on the home page and /blog. */
  pinned?: boolean
  /** When Publish pinned it (lib/pin.ts pinOnPublish), as ISO time; the newest wins. */
  pinnedAt?: string
  /**
   * The job this post tells, when it is a project (6 Nov 2026, lib/projects.ts
   * Job): the place, the system and the year under its photograph, its other
   * photographs, and which application and service pages list it. A guide
   * has none.
   */
  job?: Job
  content: string
}

export interface BlogPostMeta extends Omit<BlogPost, "content"> {}

/* The MDX is read through lib/disk.ts (7 Oct 2026): pages outside the blog
   routes rebuild on servers where content/blog is not on disk, and fall back
   to the build's snapshot of the same files. */
function ensureBlogDir() {
  return (listDir(BLOG_DIR)?.files ?? []).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
}

/* ------------------------------------------------------------------
   The record's jobs (lib/projects.ts), told as posts (6 Nov 2026).

   A record project that names its post gives that post its facts and its
   other photographs; one with no post is a post of its own, made here from
   its record: the title, the summary, the paragraphs it had on its project
   page, its photographs, dated the day those pages went live. The Studio's
   post of the same slug wins over either (cmsPosts, below), field by field.
   ------------------------------------------------------------------ */

/** The photographs the record keeps beside a project (public/images/projects/<slug>/), after the curated ones, by file name. */
function recordExtras(p: Project): string[] {
  const names = new Set(p.images.map((src) => decodeURIComponent(src.split("/").pop()!.toLowerCase())))
  return galleryFor("projects", p.slug).filter((src) => !names.has(decodeURIComponent(src.split("/").pop()!.toLowerCase())))
}

const sameFile = (a: string, b: string) => decodeURIComponent(a.split("/").pop() ?? "").toLowerCase() === decodeURIComponent(b.split("/").pop() ?? "").toLowerCase()

/**
 * A record project's facts as a post carries them: its photographs other
 * than the post's lead (the project's own hero included when the post leads
 * with another), the extras behind them.
 */
function recordJob(p: Project, lead: string = p.images[0]): Job {
  return jobOf(p, [...p.images.filter((src) => !sameFile(src, lead)), ...recordExtras(p)])
}

/** The tags a post made from the record carries, as the drafter tags a project story. */
function recordTags(p: Project): string[] {
  return [...new Set(["Project stories", p.application, ...p.systems, cityName(p.city)])]
}

/** A post made from a record project with no post of its own (lib/projects.ts recordOnlyProjects). */
export function postFromRecord(p: Project): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    description: p.excerpt,
    date: RECORD_POST_DATE,
    author: "Square One Paving",
    category: plainCase(categoryForJob(p)),
    featured_image: p.images[0],
    tags: recordTags(p),
    job: recordJob(p),
    // The paragraphs the project page carried, as MDX: plain paragraphs.
    content: [p.excerpt, ...(p.story ?? [])].join("\n\n"),
  }
}

const meta = ({ content: _c, ...rest }: BlogPost): BlogPostMeta => {
  void _c
  return rest
}

/** Every file post (content/blog) with the record's job on each that tells one, then the record's own posts. */
export function getAllPosts(): BlogPostMeta[] {
  const files = ensureBlogDir()

  const fromFiles = files
    .map((filename) => {
      const slug = filename.replace(/\.(mdx|md)$/, "")
      const raw = readText(path.join(BLOG_DIR, filename))
      if (raw === null) return null
      const { data } = matter(raw)
      // `unlisted: true` in the front-matter takes a post out of every list
      // (the index, the home page, related posts, search, the sitemap)
      // without deleting the file (28 Sept 2026 QA; each carries its reason).
      if (data.unlisted === true) return null

      const record = recordJobFor(slug)
      const featured_image = ledeFor(slug, data.featured_image)
      return {
        slug,
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "",
        author: data.author ?? "Square One Paving",
        category: data.category ? plainCase(data.category) : "",
        featured_image,
        tags: data.tags ?? [],
        ...(record ? { job: recordJob(record, featured_image) } : {}),
      } satisfies BlogPostMeta
    })
    .filter((post): post is BlogPostMeta => post !== null)
  const seen = new Set(fromFiles.map((p) => p.slug))
  const fromRecord = recordOnlyProjects()
    .filter((p) => !seen.has(p.slug))
    .map((p) => meta(postFromRecord(p)))

  return [...fromFiles, ...fromRecord].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** One post from the files, or made from its record; null when neither has it. */
export function getPostBySlug(slug: string): BlogPost | null {
  const raw = readText(path.join(BLOG_DIR, `${slug}.mdx`)) ?? readText(path.join(BLOG_DIR, `${slug}.md`))
  if (raw === null) {
    const own = recordOnlyProjects().find((p) => p.slug === slug)
    return own ? postFromRecord(own) : null
  }

  const { data, content } = matter(raw)
  const record = recordJobFor(slug)
  const featured_image = ledeFor(slug, data.featured_image)

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    author: data.author ?? "Square One Paving",
    category: data.category ? plainCase(data.category) : "",
    featured_image,
    tags: data.tags ?? [],
    ...(record ? { job: recordJob(record, featured_image) } : {}),
    content,
  }
}

/* ------------------------------------------------------------------
   CMS posts (Sanity) — merged over the files, the CMS winning by slug.
   The file posts are the record as Square One published it; once the
   marketing team edits or adds a post in the Studio, that version shows.
   ------------------------------------------------------------------ */

export interface CmsPost extends BlogPostMeta {
  source: "cms"
  body: PortableTextBlock[]
  /** Plain-text word count for the read-time line. */
  words: number
}

/** A post from either source; `"body" in post` tells them apart. */
export type AnyPost = BlogPost | CmsPost

const POST_FIELDS = groq`{
  _id, _type, title, "slug": slug.current, date, category, author, excerpt, tags, seoTitle, seoDescription,
  "alt": mainImage.alt, mainImage, "mainFile": mainImage.asset->originalFilename, body, pinned, pinnedAt,
  jobTitle, service, application, systems, city, region, year, client, artist, featured,
  "gallery": gallery[defined(asset)]{ _key, alt, "file": asset->originalFilename, asset, crop, hotspot }
}`

type ImageDoc = SanityImageSource & { hotspot?: SanityHotspot | null; crop?: SanityCrop | null }

interface GalleryDoc {
  _key?: string
  /** The asset's original file name, as uploaded (the seed stored it URL-encoded). */
  file?: string | null
  alt?: string
  asset?: { _ref: string }
  crop?: SanityCrop | null
  hotspot?: SanityHotspot | null
}

export interface CmsPostDoc {
  _id?: string
  _type?: string
  title: string
  slug: string
  date: string
  category?: string
  author?: string
  excerpt?: string
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
  alt?: string
  mainImage?: ImageDoc
  mainFile?: string | null
  body?: PortableTextBlock[]
  pinned?: boolean | null
  pinnedAt?: string | null
  // The job (6 Nov 2026): optional; a guide has none.
  jobTitle?: string | null
  service?: string | null
  application?: string | null
  systems?: string[] | null
  city?: string | null
  region?: string | null
  year?: string | null
  client?: string | null
  artist?: string | null
  featured?: boolean | null
  gallery?: GalleryDoc[] | null
}

/**
 * A post's words, for its reading time. Cleaned of Edit on the page's
 * invisible marks first (23 Oct 2026): the marks hold U+FEFF, which counts as
 * a space, so a five-minute post read "44 min read" in the preview.
 */
export function wordsIn(blocks: PortableTextBlock[] | undefined): number {
  let n = 0
  for (const b of blocks ?? []) {
    if (b._type !== "block" || !Array.isArray(b.children)) continue
    for (const c of b.children as { text?: string }[]) n += stegaClean(c.text ?? "").split(/\s+/).filter(Boolean).length
  }
  return n
}

const SERVICES: ProjectService[] = ["Stamped Asphalt", "Decorative Coatings", "Preformed Thermoplastic", "Vapour Blasting"]
const REGIONS: ProjectRegion[] = ["Lower Mainland", "Vancouver Island", "Interior", "Sunshine Coast", "Sea to Sky"]

const text = (v: unknown): string | undefined => (typeof v === "string" && v.trim() ? v.trim() : undefined)

function decoded(name: string): string {
  try {
    return decodeURIComponent(name)
  } catch {
    return name
  }
}

const baseName = (src: string) => decoded(src.split("/").pop() ?? "")

/**
 * The site's own copy of a photograph when the Studio's is the same file and
 * uncropped (the seed of 7 Oct 2026 uploaded the record's files), else
 * Sanity's CDN. So a post made from a record project, once in the Studio,
 * serves the pages' photographs as before.
 */
function photoSrc(source: SanityImageSource, file: string | null | undefined, crop: SanityCrop | null | undefined, own: readonly string[], width: number): string {
  if (file && !isCropped(crop)) {
    const name = decoded(file)
    const site = own.find((src) => baseName(src) === name)
    if (site) return site
  }
  return urlFor(source, width)
}

/** Each gallery photograph's alt text, focal point and preview mark, by the address the page uses. */
function galleryMeta(d: CmsPostDoc, photos: { doc: GalleryDoc; src: string }[], preview: boolean): Record<string, ProjectPhotoMeta> | undefined {
  const out: Record<string, ProjectPhotoMeta> = {}
  for (const { doc, src } of photos) {
    if (out[src]) continue
    const m: ProjectPhotoMeta = {}
    const alt = text(doc.alt)
    if (alt) m.alt = alt
    const position = focalPosition(doc.hotspot, doc.crop)
    if (position) m.position = position
    const edit = doc._key ? editAttr(preview, { _id: d._id, _type: d._type ?? "post" }, `gallery[_key=="${doc._key}"]`) : undefined
    if (edit) m.edit = edit
    if (Object.keys(m).length) out[src] = m
  }
  return Object.keys(out).length ? out : undefined
}

/** Does the Studio's post say anything about a job? Then its facts are read, the record filling the gaps. */
const tellsAJob = (d: CmsPostDoc) => Boolean(text(d.application) || text(d.city) || text(d.service) || d.systems?.length || d.gallery?.length)

/**
 * The job a Studio post tells: its fields over the record's for the same
 * post, field by field (as lib/projects-cms.ts merged a project), or the
 * record's alone when the post says nothing of a job yet. A post with neither
 * is a guide.
 */
function jobFromDoc(d: CmsPostDoc, record: Project | undefined, preview: boolean, lead?: string): Job | undefined {
  const studio = tellsAJob(d)
  if (!studio && !record) return undefined
  const base = record ? recordJob(record, lead) : undefined
  const own = record?.images ?? []
  const photos = (d.gallery ?? []).filter((g) => g.asset).map((doc) => ({ doc, src: photoSrc(doc as SanityImageSource, doc.file, doc.crop, own, 2048) }))
  const systems = (d.systems ?? []).map(text).filter((s): s is string => Boolean(s))
  const service = SERVICES.includes(d.service as ProjectService) ? (d.service as ProjectService) : base?.service
  const application = text(d.application) ?? base?.application
  const city = text(d.city) ?? base?.city
  // A job the page can place: its application, its service and its city. Half
  // a job (the Studio warns on it) counts as none until it is filled in.
  if (!service || !application || !city) return base
  const photoMeta = photos.length ? galleryMeta(d, photos, preview) : base?.photoMeta
  // The photographs the record keeps beside the job (public/images/projects/<slug>/)
  // follow the Studio's, as the project page appended them, none twice.
  const extras = record ? recordExtras(record).filter((src) => !sameFile(src, lead ?? "") && !photos.some((p) => sameFile(p.src, src))) : []
  return {
    ...(text(d.jobTitle) ?? base?.name ? { name: text(d.jobTitle) ?? base?.name } : {}),
    service,
    application,
    city,
    region: REGIONS.includes(d.region as ProjectRegion) ? (d.region as ProjectRegion) : base?.region ?? "Lower Mainland",
    systems: systems.length ? systems : base?.systems ?? [],
    ...(text(d.client) ?? base?.client ? { client: text(d.client) ?? base?.client } : {}),
    ...(text(d.artist) ?? base?.artist ? { artist: text(d.artist) ?? base?.artist } : {}),
    ...(text(d.year) ?? base?.year ? { year: text(d.year) ?? base?.year } : {}),
    ...((d.featured ?? base?.featured) ? { featured: true } : {}),
    ...(base?.heroWide ? { heroWide: true } : {}),
    ...(base?.flag ? { flag: true } : {}),
    ...(photoMeta ? { photoMeta } : {}),
    photos: photos.length ? [...photos.map((p) => p.src), ...extras] : base?.photos ?? [],
  }
}

function fromDoc(d: CmsPostDoc, preview = false): CmsPost {
  const alt = text(d.alt)
  const position = d.mainImage ? focalPosition(d.mainImage.hotspot, d.mainImage.crop) : undefined
  // Compared, never shown: cleaned of Edit on the page's marks (CLAUDE.md).
  const pinnedAt = typeof d.pinnedAt === "string" && d.pinnedAt.trim() ? stegaClean(d.pinnedAt).trim() : undefined
  const record = recordJobFor(d.slug)
  const featured_image = d.mainImage ? photoSrc(d.mainImage, d.mainFile, d.mainImage.crop, record?.images ?? [], 1600) : ""
  const job = jobFromDoc(d, record, preview, featured_image || undefined)
  return {
    source: "cms",
    slug: d.slug,
    title: d.title ?? "",
    description: d.seoDescription ?? d.excerpt ?? "",
    date: d.date ?? "",
    author: d.author || "Square One Paving",
    category: d.category ? plainCase(d.category) : "",
    featured_image,
    ...(d.mainImage && alt ? { featured_alt: alt } : {}),
    ...(position ? { featured_position: position } : {}),
    tags: d.tags ?? [],
    ...(d.pinned === true ? { pinned: true, ...(pinnedAt ? { pinnedAt } : {}) } : {}),
    ...(job ? { job } : {}),
    body: d.body ?? [],
    words: wordsIn(d.body),
  }
}

/** The merge, kept pure so `npm run test:projects` can test it without Sanity: Studio docs over the files' and the record's posts. */
export function mergePosts(docs: CmsPostDoc[] | null, files: BlogPostMeta[], preview = false): BlogPostMeta[] {
  const cms = (docs ?? []).filter((d) => d.slug && d.title).map((d) => fromDoc(d, preview))
  const seen = new Set(cms.map((p) => p.slug))
  const metas: BlogPostMeta[] = cms.map(({ source: _s, body: _b, words: _w, ...rest }) => rest)
  return [...metas, ...files.filter((p) => !seen.has(p.slug))].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

async function cmsPostDocs(): Promise<CmsPostDoc[] | null> {
  return sanityFetch<CmsPostDoc[]>(groq`*[_type == "post" && defined(slug.current)] | order(date desc) ${POST_FIELDS}`, {}, ["sanity", "posts"])
}

/**
 * Every post, newest first — CMS posts first by slug, then the files and the
 * record's own. The lists a visitor reads (Selected work, /blog) put the
 * pinned one on top with pinnedFirst (lib/pin.ts); everything else keeps
 * this order.
 */
export async function getPosts(): Promise<BlogPostMeta[]> {
  return mergePosts(await cmsPostDocs(), getAllPosts(), await inDraftMode())
}

/** One post by slug — the CMS version if it exists, else the file's or the record's. */
export async function getPost(slug: string): Promise<AnyPost | null> {
  const doc = await sanityFetch<CmsPostDoc | null>(
    groq`*[_type == "post" && slug.current == $slug][0] ${POST_FIELDS}`,
    { slug },
    ["sanity", "posts"],
  )
  if (doc && doc.slug && doc.title) {
    const preview = await inDraftMode()
    const post = fromDoc(doc, preview)
    const edit = doc.mainImage ? editAttr(preview, doc, "mainImage") : undefined
    return edit ? { ...post, featured_edit: edit } : post
  }
  return getPostBySlug(slug)
}
