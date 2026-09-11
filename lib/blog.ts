import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { heroFor } from "./gallery"
import { ledeOverride } from "./blog-ledes"
import { groq } from "next-sanity"
import type { PortableTextBlock } from "@portabletext/types"
import { sanityFetch, urlFor, type SanityImageSource } from "@/sanity/lib/client"

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
  tags: string[]
  content: string
}

export interface BlogPostMeta extends Omit<BlogPost, "content"> {}

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
}

export function getAllPosts(): BlogPostMeta[] {
  const files = ensureBlogDir()

  return files
    .map((filename) => {
      const slug = filename.replace(/\.(mdx|md)$/, "")
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8")
      const { data } = matter(raw)

      return {
        slug,
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "",
        author: data.author ?? "Square One Paving",
        category: data.category ?? "",
        featured_image: ledeFor(slug, data.featured_image),
        tags: data.tags ?? [],
      } satisfies BlogPostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
  const mdPath = path.join(BLOG_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null

  if (!filePath) return null

  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    author: data.author ?? "Square One Paving",
    category: data.category ?? "",
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
  title, "slug": slug.current, date, category, author, excerpt, tags, seoTitle, seoDescription,
  "alt": mainImage.alt, mainImage, body
}`

interface CmsPostDoc {
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
  mainImage?: SanityImageSource
  body?: PortableTextBlock[]
}

function wordsIn(blocks: PortableTextBlock[] | undefined): number {
  let n = 0
  for (const b of blocks ?? []) {
    if (b._type !== "block" || !Array.isArray(b.children)) continue
    for (const c of b.children as { text?: string }[]) n += (c.text ?? "").split(/\s+/).filter(Boolean).length
  }
  return n
}

function fromDoc(d: CmsPostDoc): CmsPost {
  return {
    source: "cms",
    slug: d.slug,
    title: d.title ?? "",
    description: d.seoDescription ?? d.excerpt ?? "",
    date: d.date ?? "",
    author: d.author || "Square One Paving",
    category: d.category ?? "",
    featured_image: d.mainImage ? urlFor(d.mainImage, 1600) : "",
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
  if (doc && doc.slug && doc.title) return fromDoc(doc)
  return getPostBySlug(slug)
}
