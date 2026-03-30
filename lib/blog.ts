import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

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
        featured_image: data.featured_image ?? "",
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
    featured_image: data.featured_image ?? "",
    tags: data.tags ?? [],
    content,
  }
}
