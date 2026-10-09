/**
 * What the blog drafter may say, and about which project.
 *
 * SUBJECTS: the projects on record with no post yet. Two sources, merged by
 * slug: the record in lib/projects.ts (vetted, with a page at /projects/<slug>)
 * and the Projects list in Studio, where the office can add a job (photos,
 * place, systems, a few sentences) and the next run writes it up. A project
 * that already has a post, has been drafted before, has no photograph, or is
 * flagged as awaiting Square One's confirmation is never a subject.
 *
 * FACTS: Square One's own lines (the footer line, the contact canon, the site
 * walk and quote), the project as the record tells it, and the service and
 * system copy the site already publishes (lib/services.ts, lib/products.ts),
 * where every performance figure is already attributed to the manufacturer
 * and the manufacturer is never named. Nothing else: the drafter is told to
 * state nothing that isn't here, and the fact check compares against this.
 *
 * No filesystem reads: this runs inside a cron function, where public/ and
 * content/ are not guaranteed to be on disk.
 */
import { projects as RECORD } from "@/lib/projects"
import { services } from "@/lib/services"
import { products, type Product } from "@/lib/products"
import { WORK_CAPTIONS } from "@/lib/work-captions"
import { DEFAULT_SETTINGS } from "@/lib/cms"
import type { Store } from "@/lib/automation/services"

export interface SubjectPhoto {
  /** A web path on the site (the record), or none when the photo is only in Sanity. */
  src?: string
  /** A Sanity image asset id, when the photo is already in the dataset. */
  asset?: string
  alt?: string
}

export interface Subject {
  slug: string
  title: string
  city: string
  region: string
  application: string
  service: string
  systems: string[]
  year?: string
  client?: string
  artist?: string
  excerpt: string
  story: string[]
  photos: SubjectPhoto[]
  /** "record": lib/projects.ts, with a page on the site; "studio": added in Studio only. */
  source: "record" | "studio"
  /** Slug of the post that already tells it (the Studio's "Blog post", else the record's). */
  post?: string
  /** Location awaiting a yes from Square One (record only). */
  flag?: boolean
  createdAt?: string
}

interface StudioProject {
  slug: string
  title?: string
  application?: string
  service?: string
  systems?: string[]
  city?: string
  region?: string
  year?: string
  client?: string
  artist?: string
  excerpt?: string
  story?: string[] | null
  /** The slug of the post picked in Studio's "Blog post" field. */
  post?: string | null
  hidden?: boolean | null
  images?: { asset?: string; alt?: string; file?: string | null }[] | null
  _createdAt?: string
}

const STUDIO_PROJECTS = `*[_type == "project" && !(_id in path("drafts.**")) && defined(slug.current)]{
  "slug": slug.current, title, application, service, systems, city, region, year, client, artist, excerpt,
  story, "post": post->slug.current, hidden,
  "images": images[]{ "asset": asset._ref, alt, "file": asset->originalFilename }, _createdAt
}`

const filled = (v?: string | null) => (typeof v === "string" && v.trim() ? v.trim() : undefined)
const named = (src: string) => {
  const last = src.split("/").pop() ?? ""
  try {
    return decodeURIComponent(last)
  } catch {
    return last
  }
}

/**
 * Every project on record and in Studio, merged by slug, newest work first.
 * Since 9 Oct 2026 the site shows the Studio's version of a project
 * (lib/projects-cms.ts), so the drafter writes from the same: the Studio's
 * words and photographs field by field, the record filling the gaps, and a
 * project marked "Take off the site" is never a subject.
 */
export async function loadSubjects(store: Store): Promise<Subject[]> {
  const studio = (await store.fetch<StudioProject[] | null>(STUDIO_PROJECTS)) ?? []
  const bySlug = new Map(studio.map((p) => [p.slug, p]))
  const hidden = new Set(studio.filter((p) => p.hidden).map((p) => p.slug))

  const record: Subject[] = RECORD.filter((p) => !hidden.has(p.slug)).map((p) => {
    const s = bySlug.get(p.slug)
    // The Studio's photographs, in its order; one that is the site's own file
    // (the seed uploaded them) keeps its web path, for its caption.
    const inStudio: SubjectPhoto[] = (s?.images ?? [])
      .filter((i) => i?.asset)
      .map((i) => ({ asset: i.asset, alt: i.alt, src: i.file ? p.images.find((src) => named(src) === named(i.file as string)) : undefined }))
    const story = (s?.story ?? []).map((x) => filled(x)).filter((x): x is string => Boolean(x))
    return {
      slug: p.slug,
      title: filled(s?.title) ?? p.title,
      city: filled(s?.city) ?? p.city,
      region: filled(s?.region) ?? p.region,
      application: filled(s?.application) ?? p.application,
      service: filled(s?.service) ?? p.service,
      systems: s?.systems?.length ? s.systems : p.systems,
      year: s ? filled(s.year) : p.year,
      client: s ? filled(s.client) : p.client,
      artist: s ? filled(s.artist) : p.artist,
      excerpt: filled(s?.excerpt) ?? p.excerpt,
      story: story.length ? story : p.story ?? [],
      photos: inStudio.length ? inStudio : p.images.map((src) => ({ src })),
      source: "record" as const,
      post: filled(s?.post) ?? p.post,
      flag: p.flag,
    }
  })
  const recordSlugs = new Set(RECORD.map((r) => r.slug))

  const added: Subject[] = studio
    .filter((p) => !recordSlugs.has(p.slug) && !p.hidden && p.title && p.city && p.excerpt)
    .map((p) => ({
      slug: p.slug,
      title: p.title ?? p.slug,
      city: p.city ?? "",
      region: p.region ?? "",
      application: p.application ?? "",
      service: p.service ?? "",
      systems: p.systems ?? [],
      year: p.year || undefined,
      client: p.client || undefined,
      artist: p.artist || undefined,
      excerpt: p.excerpt ?? "",
      story: (p.story ?? []).map((x) => filled(x)).filter((x): x is string => Boolean(x)),
      photos: (p.images ?? []).filter((i) => i?.asset).map((i) => ({ asset: i.asset, alt: i.alt })),
      source: "studio" as const,
      post: filled(p.post),
      createdAt: p._createdAt,
    }))
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))

  // Studio additions first (the office just added them), then the record, newest year first.
  const byYear = record
    .map((r, i) => ({ r, i }))
    .sort((a, b) => Number(b.r.year ?? 0) - Number(a.r.year ?? 0) || a.i - b.i)
    .map(({ r }) => r)
  return [...added, ...byYear]
}

/** Why a subject can't be drafted, or null when it can. */
export function ineligible(s: Subject, drafted: Set<string>): string | null {
  if (drafted.has(s.slug)) return "already drafted"
  if (s.post) return "already has a post"
  if (s.flag) return "location awaiting Square One's confirmation"
  if (!s.photos.length) return "no photograph"
  return null
}

// ── the facts ───────────────────────────────────────────────────────────────

const clean = (s: string) => s.replace(/\s+/g, " ").trim()

const LONGEST_FIRST = [...products].sort((a, b) => b.name.length - a.name.length)

function productFor(system: string): Product | undefined {
  const bare = system.replace(/[®™]/g, "").replace(/\s+/g, "").toLowerCase()
  return (
    products.find((p) => p.name.toLowerCase() === bare) ??
    // "StreetBond SR", "StreetBondSR", "StreetBond150": the family's page.
    LONGEST_FIRST.find((p) => bare.startsWith(p.name.toLowerCase()))
  )
}

function serviceFor(name: string) {
  const bare = name.toLowerCase().replace("vapor", "vapour")
  return services.find((s) => s.name.toLowerCase().replace("vapor", "vapour") === bare)
}

/** What a photograph shows, from the curated captions, else its own alt text. */
export function captionFor(photo: SubjectPhoto): string | undefined {
  if (photo.src) {
    const c = WORK_CAPTIONS[photo.src] ?? WORK_CAPTIONS[decodeURI(photo.src)]
    if (c) return `${c.subject}, ${c.place}${c.systems.length ? ` (${c.systems.join(", ")})` : ""}`
  }
  return photo.alt?.trim() || undefined
}

/** Square One, in the words the site already prints. */
export function companyFacts(): string[] {
  const s = DEFAULT_SETTINGS
  return [
    `Square One Paving installs decorative pavement in British Columbia: ${services.map((x) => x.name.toLowerCase()).join(", ")}.`,
    s.positioning,
    "Square One is the installer: the manufacturer makes the systems and warrants the material; Square One warrants the workmanship.",
    `The office is at ${s.addressLine1}, ${s.addressLine2}. Square One works across the Lower Mainland and Vancouver Island; Vancouver Island is a service region with its own phone line (${s.phoneIsland}), not an office.`,
    `Office phone ${s.phoneOffice}; toll-free ${s.phoneTollFree}; email ${s.email}.`,
    "A job starts with a free site walk with the sample boards, then a written quote. Quotes: [Get a quote](/contact).",
  ]
}

/** The FACTS block for one project. */
export function factsFor(s: Subject): string {
  const service = serviceFor(s.service)
  const systems = [...new Set(s.systems)].map((name) => ({ name, product: productFor(name) }))
  const lines: string[] = ["ABOUT SQUARE ONE:", ...companyFacts().map((l) => `- ${l}`), "", "THE PROJECT:"]
  lines.push(`- On the record as: ${s.title}`)
  lines.push(`- Place: ${s.city}${s.region ? ` (${s.region})` : ""}`)
  if (s.application) lines.push(`- Kind of work: ${s.application}`)
  if (service) lines.push(`- Service: ${service.name} (page: /services/${service.slug})`)
  if (systems.length) {
    lines.push(
      `- Systems installed: ${systems
        .map(({ name, product }) => (product ? `${name}${product.mark && name === product.name ? product.mark : ""} (page: /products/${product.slug})` : name))
        .join("; ")}`,
    )
  }
  lines.push(s.year ? `- Year installed: ${s.year}` : "- Year installed: not on record (give none)")
  if (s.client) lines.push(`- Installed at: ${s.client}`)
  if (s.artist) lines.push(`- Artist or designer: ${s.artist}`)
  if (s.source === "record") lines.push(`- Project page: /projects/${s.slug}`)
  lines.push(`- The record: ${clean(s.excerpt)}`)
  for (const p of s.story) lines.push(`- ${clean(p)}`)
  s.photos.forEach((p, i) => {
    const c = captionFor(p)
    if (c) lines.push(`- Photograph ${i + 1} shows: ${c}`)
  })

  if (service) {
    lines.push("", `THE SERVICE, as the site publishes it (${service.name}):`)
    lines.push(`- ${clean(service.tagline)}`)
    for (const para of service.fullDescription.split(/\n\n+/)) lines.push(`- ${clean(para)}`)
    for (const b of service.benefits) lines.push(`- ${clean(b)}`)
  }
  const shown = new Set<string>()
  for (const { product } of systems) {
    if (!product || shown.has(product.slug)) continue
    shown.add(product.slug)
    lines.push("", `THE SYSTEM, as the site publishes it (${product.name}${product.mark ?? ""}; performance figures are the manufacturer's):`)
    lines.push(`- ${clean(product.tagline)}`)
    for (const para of product.fullDescription.split(/\n\n+/)) lines.push(`- ${clean(para)}`)
    for (const b of product.keyBenefits) lines.push(`- ${clean(b)}`)
    if (product.specs.length) lines.push(`- Specification: ${product.specs.map((x) => `${x.k}: ${x.v}`).join("; ")}`)
  }
  return lines.join("\n")
}

// ── related posts, category, tags ───────────────────────────────────────────

export interface PublishedPost {
  title: string
  slug: string
  category?: string
  tags?: string[]
  excerpt?: string
}

export const PUBLISHED_POSTS = `*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)]{ title, "slug": slug.current, category, tags, excerpt }`

/** Up to five published posts that share the project's systems, place or kind of work. */
export function relatedLines(s: Subject, posts: PublishedPost[]): string[] {
  const town = s.city.split(",")[0].trim().toLowerCase()
  const systems = s.systems.map((x) => x.replace(/[®™]/g, "").toLowerCase())
  const cat = categoryFor(s).toLowerCase()
  return posts
    .map((p) => {
      const hay = `${p.title} ${p.excerpt ?? ""} ${(p.tags ?? []).join(" ")}`.toLowerCase()
      let score = 0
      if (town && hay.includes(town)) score += 2
      for (const sys of systems) if (sys && hay.includes(sys)) score += 2
      if ((p.category ?? "").toLowerCase() === cat) score += 1
      return { p, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ p }) => `- ${p.title}: /blog/${p.slug}`)
}

/** The post category (sanity/schemaTypes/post.ts) for a project's kind of work. */
export function categoryFor(s: Subject): string {
  if (/vapou?r/i.test(s.service)) return "Vapour Blasting"
  const a = s.application.toLowerCase()
  if (a.startsWith("crosswalk")) return "Crosswalks"
  if (a.startsWith("roundabout")) return "Roundabouts"
  if (a.startsWith("parks")) return "Parks & Paths"
  if (a.startsWith("school")) return "School Zones"
  if (a.startsWith("bike")) return "Bike Lanes"
  if (a.startsWith("public art")) return "Public Art"
  if (a.startsWith("streetscape")) return "Streetscapes"
  if (a.startsWith("driveway")) return "Residential"
  if (a.startsWith("parking") || a.startsWith("branding")) return "Commercial"
  return "Municipal"
}

/** Tags from the record, when the draft brings too few. */
export function recordTags(s: Subject): string[] {
  return [...new Set([...s.systems.map((x) => x.replace(/[®™]/g, "")), s.city.split(",")[0].trim(), s.application].filter(Boolean))]
}
