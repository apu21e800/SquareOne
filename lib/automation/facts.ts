/**
 * What the blog drafter may say, and about which jobs.
 *
 * SUBJECTS: Square One's documented jobs. Two sources, merged by slug: the
 * record in lib/projects.ts (vetted, with a page at /projects/<slug>) and the
 * Projects list in Studio, where the office can add a job (photos, place,
 * systems, a few sentences). Since 14 Oct 2026 the Blog plan says which jobs
 * an article tells (sanity/schemaTypes/storyIdea.ts); a job taken off the
 * site is never one.
 *
 * FACTS (factsBlock): Square One's own lines (the footer line, the contact
 * details as Site Settings has them, the site walk and quote), the jobs as
 * their records tell them, and the copy the site already publishes about the
 * services (with the Studio's words on top, as the service pages show them),
 * the systems (lib/products.ts, where every performance figure is attributed
 * to the manufacturer and the manufacturer is never named), the kinds of
 * work (lib/application-copy.ts) and the driveways page. Then the plan
 * item's brief: an editor's brief is treated as true; the planner's
 * questions are filed apart and support nothing. Nothing else: the drafter
 * is told to state nothing that isn't here, and the fact check compares the
 * draft with the same block.
 *
 * No filesystem reads: this runs inside a cron function, where public/ and
 * content/ are not guaranteed to be on disk.
 */
import { projects as RECORD } from "@/lib/projects"
import { services as RECORD_SERVICES, type Service } from "@/lib/services"
import { products, type Product } from "@/lib/products"
import { WORK_CAPTIONS } from "@/lib/work-captions"
import { APP_COPY } from "@/lib/application-copy"
import { DEFAULT_SETTINGS, mergeSettings, withSettings, type SiteSettings } from "@/lib/site-settings"
import { DRIVEWAYS_COPY, mergeDrivewaysCopy, type DrivewaysCopy } from "@/lib/page-copy"
import { mergeService, type ServiceDoc } from "@/lib/services-cms"
import { APPLICATION_OPTIONS, GUIDE_CATEGORY, QUESTIONS_BRIEF, ROUNDUP_BRIEF, type PlanKind } from "@/lib/automation/plan"
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
  /** The Studio project's document id, when the job is in Studio (what a plan item refers to). */
  docId?: string
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
  _id: string
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
  _id, "slug": slug.current, title, application, service, systems, city, region, year, client, artist, excerpt,
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
      ...(s?._id ? { docId: s._id } : {}),
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
      docId: p._id,
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

/** Why a job can't be told in a project story of its own, or null when it can. */
export function ineligible(s: Subject, drafted: Set<string>): string | null {
  if (drafted.has(s.slug)) return "already drafted"
  if (s.post) return "already has a post"
  if (s.flag) return "location awaiting Square One's confirmation"
  if (!s.photos.length) return "no photograph"
  return null
}

// ── the pages the site publishes, with the Studio's words on top ───────────

/** The four services as their pages read: the record with the Studio's words on top (lib/services-cms.ts). */
export async function loadServices(store: Store): Promise<Service[]> {
  const docs =
    (await store.fetch<ServiceDoc[] | null>(
      `*[_type == "service" && !(_id in path("drafts.**")) && defined(slug)]{ slug, tagline, shortDescription, idealClients, benefits, faqs[]{ q, a } }`,
    )) ?? []
  const bySlug = new Map(docs.filter((d) => d?.slug).map((d) => [d.slug as string, d]))
  return RECORD_SERVICES.map((s) => mergeService(s, bySlug.get(s.slug)))
}

/** The driveways page's words as it reads (lib/page-copy.ts). */
export async function loadDriveways(store: Store): Promise<DrivewaysCopy> {
  return mergeDrivewaysCopy(await store.fetch<unknown>(`*[_id == "drivewaysPage"][0]`))
}

/** The phone lines, email and address as every page prints them (lib/site-settings.ts). */
export async function loadSettings(store: Store): Promise<SiteSettings> {
  return mergeSettings(await store.fetch<Record<string, unknown> | null>(`*[_id == "siteSettings"][0]`))
}

// ── the facts ───────────────────────────────────────────────────────────────

const clean = (s: string) => s.replace(/\s+/g, " ").trim()

const LONGEST_FIRST = [...products].sort((a, b) => b.name.length - a.name.length)

export function productFor(system: string): Product | undefined {
  const bare = system.replace(/[®™]/g, "").replace(/\s+/g, "").toLowerCase()
  return (
    products.find((p) => p.name.toLowerCase() === bare || p.slug === system) ??
    // "StreetBond SR", "StreetBondSR", "StreetBond150": the family's page.
    LONGEST_FIRST.find((p) => bare.startsWith(p.name.toLowerCase()))
  )
}

/** A service by its name on a project ("Vapour Blasting") or its slug ("vapor-blasting"). */
export function serviceFor(nameOrSlug: string, list: readonly Service[] = RECORD_SERVICES): Service | undefined {
  const bare = nameOrSlug.toLowerCase().replace("vapor", "vapour")
  return list.find((s) => s.slug === nameOrSlug || s.name.toLowerCase().replace("vapor", "vapour") === bare)
}

/** What a photograph shows, from the curated captions, else its own alt text. */
export function captionFor(photo: SubjectPhoto): string | undefined {
  if (photo.src) {
    const c = WORK_CAPTIONS[photo.src] ?? WORK_CAPTIONS[decodeURI(photo.src)]
    if (c) return `${c.subject}, ${c.place}${c.systems.length ? ` (${c.systems.join(", ")})` : ""}`
  }
  return photo.alt?.trim() || undefined
}

/** Square One, in the words the site already prints (and the details as Site Settings has them). */
export function companyFacts(settings: SiteSettings = DEFAULT_SETTINGS): string[] {
  const s = settings
  return [
    `Square One Paving installs decorative pavement in British Columbia: ${RECORD_SERVICES.map((x) => x.name.toLowerCase()).join(", ")}.`,
    s.positioning,
    // No warranty wording (the client, 6 Oct 2026: "remove anything about warranty").
    "Square One is the installer: the manufacturer makes the systems; Square One installs them with its own crews.",
    `The office is at ${s.addressLine1}, ${s.addressLine2}. Square One works across the Lower Mainland and Vancouver Island; Vancouver Island is a service region with its own phone line (${s.phoneIsland}), not an office.`,
    `Office phone ${s.phoneOffice}; toll-free ${s.phoneTollFree}; email ${s.email}.`,
    "A job starts with a free site walk with the sample boards, then a written quote. Quotes: [Get a quote](/contact).",
  ]
}

/** One job, as its record tells it. */
function jobLines(s: Subject, services: readonly Service[]): string[] {
  const service = serviceFor(s.service, services)
  const systems = [...new Set(s.systems)].map((name) => ({ name, product: productFor(name) }))
  const lines: string[] = []
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
  return lines
}

/** A page's answer as the page prints it: the phone lines and email as Site Settings has them. */
const answer = (a: string, settings: SiteSettings) => clean(withSettings(a, settings))

function serviceLines(service: Service, full: boolean, settings: SiteSettings): string[] {
  const lines = ["", `THE SERVICE, as the site publishes it (${service.name}; page: /services/${service.slug}):`]
  lines.push(`- ${clean(service.tagline)}`)
  for (const para of service.fullDescription.split(/\n\n+/)) lines.push(`- ${clean(para)}`)
  for (const b of service.benefits) lines.push(`- ${clean(b)}`)
  if (full) {
    if (service.idealClients.length) lines.push(`- Who it's for: ${service.idealClients.map(clean).join("; ")}`)
    for (const f of service.faqs) lines.push(`- The page answers "${clean(f.q)}": ${answer(f.a, settings)}`)
  }
  return lines
}

function systemLines(product: Product): string[] {
  const lines = ["", `THE SYSTEM, as the site publishes it (${product.name}${product.mark ?? ""}; page: /products/${product.slug}; performance figures are the manufacturer's):`]
  lines.push(`- ${clean(product.tagline)}`)
  for (const para of product.fullDescription.split(/\n\n+/)) lines.push(`- ${clean(para)}`)
  for (const b of product.keyBenefits) lines.push(`- ${clean(b)}`)
  if (product.specs.length) lines.push(`- Specification: ${product.specs.map((x) => `${x.k}: ${x.v}`).join("; ")}`)
  return lines
}

function applicationLines(slug: string, driveways: DrivewaysCopy, settings: SiteSettings): string[] {
  const label = APPLICATION_OPTIONS.find((o) => o.value === slug)?.title ?? slug
  if (slug === "driveways") {
    const d = driveways
    const section = (w: { head: string; tail?: string; line?: string }) => clean([w.head, w.tail].filter(Boolean).join(" ") + (w.line ? `: ${w.line}` : ""))
    return [
      "",
      `THE DRIVEWAYS PAGE, as the site publishes it (page: /driveways):`,
      `- ${section(d.patterns)}`,
      `- ${section(d.process)}: ${Object.values(d.steps).map((st) => `${clean(st.title)}: ${clean(st.text)}`).join(" ")}`,
      `- ${section(d.gallery)}`,
      `- ${section(d.area)}`,
      ...d.faqs.map((f) => `- The page answers "${clean(f.q)}": ${answer(f.a, settings)}`),
    ]
  }
  const copy = APP_COPY[slug as keyof typeof APP_COPY]
  if (!copy) return []
  return ["", `THE KIND OF WORK, as the site publishes it (${label}; page: /applications/${slug}):`, `- ${clean(copy.headline)}.`, ...copy.intro.map((p) => `- ${clean(p)}`)]
}

/** What one plan item is written from. */
export interface FactsInput {
  kind: PlanKind
  /** The documented jobs it tells: one for a project story, three to six for a roundup, none for a guide. */
  subjects: readonly Subject[]
  /** The services as their pages read (loadServices); every service, the block picks what it needs. */
  services: readonly Service[]
  /** A guide's services, systems and kinds of work, by slug (lib/automation/plan.ts). */
  guide?: { services: readonly string[]; systems: readonly string[]; applications: readonly string[] }
  driveways?: DrivewaysCopy
  settings?: SiteSettings
  /** The plan item's brief: the editor's (treated as true) or the planner's questions (not facts). */
  brief?: string | null
}

/** The whole FACTS block for one article. */
export function factsBlock(input: FactsInput): string {
  const lines: string[] = ["ABOUT SQUARE ONE:", ...companyFacts(input.settings).map((l) => `- ${l}`)]
  const subjects = input.subjects
  if (input.kind === "project" && subjects[0]) {
    lines.push("", "THE PROJECT:", ...jobLines(subjects[0], input.services))
  } else if (subjects.length) {
    lines.push("", "THE JOBS (documented; each job's record is everything known about it, so add nothing about any of them):")
    subjects.forEach((s, i) => lines.push("", `JOB ${i + 1}:`, ...jobLines(s, input.services)))
  }

  const guide = input.kind === "guide" ? input.guide : undefined
  // The service and system pages: a guide's ticked ones; a story's or roundup's, its jobs'.
  const serviceList = guide
    ? guide.services.map((slug) => serviceFor(slug, input.services))
    : subjects.map((s) => serviceFor(s.service, input.services))
  const productList = guide ? guide.systems.map((slug) => productFor(slug)) : subjects.flatMap((s) => s.systems.map((name) => productFor(name)))
  const shownServices = new Set<string>()
  for (const service of serviceList) {
    if (!service || shownServices.has(service.slug)) continue
    shownServices.add(service.slug)
    lines.push(...serviceLines(service, Boolean(guide), input.settings ?? DEFAULT_SETTINGS))
  }
  const shownProducts = new Set<string>()
  for (const product of productList) {
    if (!product || shownProducts.has(product.slug)) continue
    shownProducts.add(product.slug)
    lines.push(...systemLines(product))
  }
  if (guide) for (const slug of new Set(guide.applications)) lines.push(...applicationLines(slug, input.driveways ?? DRIVEWAYS_COPY, input.settings ?? DEFAULT_SETTINGS))

  const brief = input.brief?.trim()
  if (brief?.startsWith(QUESTIONS_BRIEF)) {
    lines.push(
      "",
      "QUESTIONS TO ANSWER (from the planner: these are NOT facts and support no statement; answer each only from the facts above, and leave out any they don't answer):",
      brief.slice(QUESTIONS_BRIEF.length).trim(),
    )
  } else if (brief && !brief.startsWith(ROUNDUP_BRIEF)) {
    // (A planner's roundup brief is an old copy of the jobs' records: the
    // JOBS above are the records as they stand today.)
    lines.push("", "FROM SQUARE ONE'S EDITOR (the brief; treat as true):", brief)
  }
  return lines.join("\n")
}

/** The FACTS block for one project told on its own. */
export function factsFor(s: Subject, services: readonly Service[] = RECORD_SERVICES, settings?: SiteSettings): string {
  return factsBlock({ kind: "project", subjects: [s], services, settings })
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

/** Up to five published posts that share the jobs' systems, places or kind of work, or a guide's systems and kinds of work. */
export function relatedFor(input: { subjects: readonly Subject[]; systems?: readonly string[]; words?: readonly string[]; categories: readonly string[] }, posts: readonly PublishedPost[]): string[] {
  const towns = input.subjects.map((s) => s.city.split(",")[0].trim().toLowerCase()).filter(Boolean)
  const systems = [...new Set([...input.subjects.flatMap((s) => s.systems), ...(input.systems ?? [])].map((x) => x.replace(/[®™]/g, "").toLowerCase()))]
  const words = (input.words ?? []).map((w) => w.toLowerCase()).filter((w) => w.length > 3)
  const cats = new Set(input.categories.map((c) => c.toLowerCase()))
  return posts
    .map((p) => {
      const hay = `${p.title} ${p.excerpt ?? ""} ${(p.tags ?? []).join(" ")}`.toLowerCase()
      let score = 0
      for (const town of towns) if (hay.includes(town)) score += 2
      for (const sys of systems) if (sys && hay.includes(sys)) score += 2
      for (const w of words) if (hay.includes(w)) score += 1
      if (cats.has((p.category ?? "").toLowerCase())) score += 1
      return { p, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ p }) => `- ${p.title}: /blog/${p.slug}`)
}

/** Up to five published posts that share the project's systems, place or kind of work. */
export function relatedLines(s: Subject, posts: PublishedPost[]): string[] {
  return relatedFor({ subjects: [s], categories: [categoryFor(s)] }, posts)
}

/** The post category (sanity/schemaTypes/post.ts) for a project's kind of work. */
export function categoryFor(s: Pick<Subject, "service" | "application">): string {
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

/** The blog section an article files under: Guides for a guide; the jobs' kind of work (the most common, the first on a tie) for a story or roundup. */
export function categoryForArticle(kind: PlanKind, subjects: readonly Subject[]): string {
  if (kind === "guide" || !subjects.length) return GUIDE_CATEGORY
  const counts = new Map<string, number>()
  for (const s of subjects) counts.set(categoryFor(s), (counts.get(categoryFor(s)) ?? 0) + 1)
  let best = categoryFor(subjects[0])
  for (const [cat, n] of counts) if (n > (counts.get(best) ?? 0)) best = cat
  return best
}

/** Tags from the record, when the draft brings too few. */
export function recordTags(s: Subject): string[] {
  return [...new Set([...s.systems.map((x) => x.replace(/[®™]/g, "")), s.city.split(",")[0].trim(), s.application].filter(Boolean))]
}
