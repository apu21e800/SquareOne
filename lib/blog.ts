import path from "path"
import { listDir, readText } from "./disk"
import matter from "gray-matter"
import { heroFor } from "./gallery"
import { ledeOverride } from "./blog-ledes"
import { plainCase } from "./text"
import { groq, stegaClean } from "next-sanity"
import type { PortableTextBlock } from "@portabletext/types"
import { editAttr, inDraftMode, sanityFetch, urlFor, type SanityImageSource } from "@/sanity/lib/client"
import { focalPosition, type SanityCrop, type SanityHotspot } from "./focal"

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
  content: string
}

export interface BlogPostMeta extends Omit<BlogPost, "content"> {}

/* The MDX is read through lib/disk.ts (7 Oct 2026): pages outside the blog
   routes rebuild on servers where content/blog is not on disk, and fall back
   to the build's snapshot of the same files. */
function ensureBlogDir() {
  return (listDir(BLOG_DIR)?.files ?? []).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
}

export function getAllPosts(): BlogPostMeta[] {
  const files = ensureBlogDir()

  return files
    .map((filename) => {
      const slug = filename.replace(/\.(mdx|md)$/, "")
      const raw = readText(path.join(BLOG_DIR, filename))
      if (raw === null) return null
      const { data } = matter(raw)
      // `unlisted: true` in the front-matter takes a post out of every list
      // (the index, the home page, related posts, search, the sitemap)
      // without deleting the file (28 Sept 2026 QA; each carries its reason).
      if (data.unlisted === true) return null

      return {
        slug,
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "",
        author: data.author ?? "Square One Paving",
        category: data.category ? plainCase(data.category) : "",
        featured_image: ledeFor(slug, data.featured_image),
        tags: data.tags ?? [],
      } satisfies BlogPostMeta
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const raw = readText(path.join(BLOG_DIR, `${slug}.mdx`)) ?? readText(path.join(BLOG_DIR, `${slug}.md`))
  if (raw === null) return null

  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    author: data.author ?? "Square One Paving",
    category: data.category ? plainCase(data.category) : "",
    featured_image: ledeFor(slug, data.featured_image),
    tags: data.tags ?? [],
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
  "alt": mainImage.alt, mainImage, body
}`

interface CmsPostDoc {
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
  mainImage?: SanityImageSource & { hotspot?: SanityHotspot | null; crop?: SanityCrop | null }
  body?: PortableTextBlock[]
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

function fromDoc(d: CmsPostDoc): CmsPost {
  const alt = typeof d.alt === "string" && d.alt.trim() ? d.alt.trim() : undefined
  const position = d.mainImage ? focalPosition(d.mainImage.hotspot, d.mainImage.crop) : undefined
  return {
    source: "cms",
    slug: d.slug,
    title: d.title ?? "",
    description: d.seoDescription ?? d.excerpt ?? "",
    date: d.date ?? "",
    author: d.author || "Square One Paving",
    category: d.category ? plainCase(d.category) : "",
    featured_image: d.mainImage ? urlFor(d.mainImage, 1600) : "",
    ...(d.mainImage && alt ? { featured_alt: alt } : {}),
    ...(position ? { featured_position: position } : {}),
    tags: d.tags ?? [],
    body: d.body ?? [],
    words: wordsIn(d.body),
  }
}

async function cmsPosts(): Promise<CmsPost[]> {
  const docs = await sanityFetch<CmsPostDoc[]>(
    groq`*[_type == "post" && defined(slug.current)] | order(date desc) ${POST_FIELDS}`,
    {},
    ["sanity", "posts"],
  )
  return (docs ?? []).filter((d) => d.slug && d.title).map(fromDoc)
}

/** Every post, newest first — CMS posts first by slug, then the files. */
export async function getPosts(): Promise<BlogPostMeta[]> {
  const cms = await cmsPosts()
  const seen = new Set(cms.map((p) => p.slug))
  const files = getAllPosts().filter((p) => !seen.has(p.slug))
  const metas: BlogPostMeta[] = cms.map(({ source: _s, body: _b, words: _w, ...meta }) => meta)
  return [...metas, ...files].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** One post by slug — the CMS version if it exists, else the file. */
export async function getPost(slug: string): Promise<AnyPost | null> {
  const doc = await sanityFetch<CmsPostDoc | null>(
    groq`*[_type == "post" && slug.current == $slug][0] ${POST_FIELDS}`,
    { slug },
    ["sanity", "posts"],
  )
  if (doc && doc.slug && doc.title) {
    const post = fromDoc(doc)
    const edit = doc.mainImage ? editAttr(await inDraftMode(), doc, "mainImage") : undefined
    return edit ? { ...post, featured_edit: edit } : post
  }
  return getPostBySlug(slug)
}
