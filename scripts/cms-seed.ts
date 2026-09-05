/**
 * Builds sanity/seed/seed.ndjson — every blog post, every case study and the
 * site settings — ready for one command:
 *
 *   npm run cms:seed
 *   npx sanity dataset import sanity/seed/seed.ndjson production --replace
 *
 * Run from the repo root with Node 22+. Document ids are stable
 * (post-<slug>, project-<slug>, siteSettings) so a second import updates in
 * place instead of duplicating. Photographs are referenced by URL on the
 * live preview, so the import uploads them into Sanity's own CDN.
 *
 * The markdown → Portable Text converter covers what the 51 posts use:
 * headings, paragraphs, bullet and numbered lists, bold, italic and links.
 * The social grid is deliberately left empty: the marketing team adds real
 * posts; until then the home page shows photographs from the record.
 */
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { projects } from "../lib/projects.ts"
import { ledeOverride } from "../lib/blog-ledes.ts"

const ROOT = process.cwd()

/** First file in public/images/blog/<slug>/ — the same fallback lib/gallery.ts uses. */
function galleryHero(slug: string): string | undefined {
  const dir = path.join(ROOT, "public/images/blog", slug)
  if (!fs.existsSync(dir)) return undefined
  const first = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f)).sort()[0]
  return first ? `/images/blog/${slug}/${encodeURIComponent(first)}` : undefined
}
const BLOG_DIR = path.join(ROOT, "content/blog")
const OUT_DIR = path.join(ROOT, "sanity/seed")
const OUT = path.join(OUT_DIR, "seed.ndjson")
/** Where the import fetches photographs from — the preview today, the domain after launch. */
const ASSET_BASE = process.env.CMS_ASSET_BASE ?? "https://square-one-git-s1-v2-prep-2-based-agency.vercel.app"

let keyN = 0
const key = () => `k${(keyN++).toString(36)}`

type Span = { _type: "span"; _key: string; text: string; marks: string[] }
type MarkDef = { _type: "link"; _key: string; href: string }
type Block = {
  _type: "block"
  _key: string
  style: string
  listItem?: "bullet" | "number"
  level?: number
  children: Span[]
  markDefs: MarkDef[]
}

/** Inline markdown → spans: **bold**, *italic*, _italic_, [text](href). */
function spans(text: string, markDefs: MarkDef[]): Span[] {
  const out: Span[] = []
  const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(_([^_]+)_)|(\[([^\]]+)\]\(([^)\s]+)\))/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ _type: "span", _key: key(), text: text.slice(last, m.index), marks: [] })
    if (m[2]) out.push({ _type: "span", _key: key(), text: m[2], marks: ["strong"] })
    else if (m[4]) out.push({ _type: "span", _key: key(), text: m[4], marks: ["em"] })
    else if (m[6]) out.push({ _type: "span", _key: key(), text: m[6], marks: ["em"] })
    else if (m[8]) {
      const def: MarkDef = { _type: "link", _key: key(), href: m[9] }
      markDefs.push(def)
      out.push({ _type: "span", _key: key(), text: m[8], marks: [def._key] })
    }
    last = m.index + m[0].length
  }
  if (last < text.length) out.push({ _type: "span", _key: key(), text: text.slice(last), marks: [] })
  return out.length ? out : [{ _type: "span", _key: key(), text: "", marks: [] }]
}

function block(style: string, text: string, listItem?: "bullet" | "number"): Block {
  const markDefs: MarkDef[] = []
  const children = spans(text.trim(), markDefs)
  return { _type: "block", _key: key(), style, ...(listItem ? { listItem, level: 1 } : {}), children, markDefs }
}

/** Markdown body → Portable Text blocks. */
function toPortableText(md: string): Block[] {
  const blocks: Block[] = []
  const lines = md.replace(/\r\n/g, "\n").split("\n")
  let para: string[] = []
  const flush = () => {
    if (para.length) blocks.push(block("normal", para.join(" ")))
    para = []
  }
  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim()) { flush(); continue }
    const h = /^(#{1,4})\s+(.*)$/.exec(line)
    if (h) { flush(); blocks.push(block(h[1].length <= 2 ? "h2" : "h3", h[2])); continue }
    const bullet = /^\s*[-*]\s+(.*)$/.exec(line)
    if (bullet) { flush(); blocks.push(block("normal", bullet[1], "bullet")); continue }
    const num = /^\s*\d+\.\s+(.*)$/.exec(line)
    if (num) { flush(); blocks.push(block("normal", num[1], "number")); continue }
    const quote = /^>\s?(.*)$/.exec(line)
    if (quote) { flush(); blocks.push(block("blockquote", quote[1])); continue }
    if (/^(---|\*\*\*)$/.test(line.trim())) { flush(); continue }
    para.push(line.trim())
  }
  flush()
  return blocks
}

function asset(src: string) {
  const url = /^https?:\/\//.test(src) ? src : ASSET_BASE + src
  return { _type: "image", _sanityAsset: `image@${url}` }
}

const docs: Record<string, unknown>[] = []

/* ---- Site settings (the record) ---- */
docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  positioning:
    "Decorative pavement for BC since 2000. Installer of HUB Surface Systems products, based in Maple Ridge and working across the Lower Mainland and Vancouver Island.",
  phoneOffice: "604-466-9902",
  phoneIsland: "250-391-0270",
  phoneTollFree: "1-877-391-0270",
  email: "office@squareonepaving.com",
  addressLine1: "505–20800 Lougheed Highway",
  addressLine2: "Maple Ridge, BC V2X 3P2",
  instagram: "https://www.instagram.com/squareonepaving/",
  facebook: "https://www.facebook.com/squareonepaving/",
  linkedin: "https://www.linkedin.com/company/square-one-paving-ltd/",
  youtube: "https://www.youtube.com/channel/UCBDvB4vgdahH67BmP6FeccQ",
  socialHeading: "Follow the work",
  socialLede: "Installs as they happen, before-and-afters, and the crews at work.",
})

/* ---- Blog posts ---- */
const files = fs.existsSync(BLOG_DIR) ? fs.readdirSync(BLOG_DIR).filter((f) => /\.(mdx|md)$/.test(f)) : []
let posts = 0
for (const file of files) {
  const slug = file.replace(/\.(mdx|md)$/, "")
  const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"))
  const lede = ledeOverride(slug) ?? galleryHero(slug) ?? (data.featured_image as string | undefined) ?? ""
  docs.push({
    _id: `post-${slug}`,
    _type: "post",
    title: data.title ?? slug,
    slug: { _type: "slug", current: slug },
    date: String(data.date ?? "").slice(0, 10),
    category: data.category ?? undefined,
    author: data.author ?? "Square One Paving",
    excerpt: data.description ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    ...(lede ? { mainImage: { ...asset(lede), alt: data.title ?? "" } } : {}),
    body: toPortableText(content),
  })
  posts++
}

/* ---- Case studies ---- */
for (const p of projects) {
  docs.push({
    _id: `project-${p.slug}`,
    _type: "project",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    application: p.application,
    service: p.service,
    systems: p.systems,
    city: p.city,
    region: p.region,
    ...(p.year ? { year: p.year } : {}),
    ...(p.client ? { client: p.client } : {}),
    ...(p.artist ? { artist: p.artist } : {}),
    excerpt: p.excerpt,
    images: p.images.map((src, i) => ({ ...asset(src), _key: key(), alt: i === 0 ? p.title : `${p.title} — photo ${i + 1}` })),
    featured: Boolean(p.featured),
    heroWide: Boolean(p.heroWide),
  })
}

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.writeFileSync(OUT, docs.map((d) => JSON.stringify(d)).join("\n") + "\n")
console.log(`wrote ${OUT}: ${docs.length} documents (${posts} posts, ${projects.length} projects, 1 settings)`)
