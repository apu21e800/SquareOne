import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

import { projects, getProjectBySlug } from "@/lib/projects"
import { galleryFor } from "@/lib/gallery"
import { WORK_APPS } from "@/lib/work"

interface Props {
  params: Promise<{ slug: string }>
}

const serviceSlugMap: Record<string, string> = {
  "Stamped Asphalt": "stamped-asphalt",
  "Decorative Coatings": "decorative-coatings",
  "Preformed Thermoplastic": "preformed-thermoplastic",
  "Vapour Blasting": "vapor-blasting",
}

/**
 * Display copy only. The service strings in lib/projects.ts and the route
 * slugs above are untouched — "Vapour Blasting" stays the datum, "Vapour
 * blasting" is what the page reads.
 */
const serviceLabel: Record<string, string> = {
  "Stamped Asphalt": "Stamped asphalt",
  "Decorative Coatings": "Decorative coatings",
  "Preformed Thermoplastic": "Preformed thermoplastic",
  "Vapour Blasting": "Vapour blasting",
}

/** Two cards fill the "More projects" row without leaving an orphan. */
const RELATED_COUNT = 2

/** "Vancouver, BC" → "Vancouver" — the caption carries the city, not the province. */
function cityName(city: string): string {
  return city.split(",")[0].trim()
}

/** City · Systems · Year, skipping anything the record does not carry. */
function metaLine(city: string, systems: string[], year?: string): string {
  return [cityName(city), systems.join(" + "), year]
    .filter((part): part is string => Boolean(part))
    .join(" · ")
}

/** Where this application's gallery lives. */
function applicationHref(label: string): string | undefined {
  const app = WORK_APPS.find((a) => a.label === label)
  if (!app) return undefined
  return app.slug === "driveways" ? "/driveways" : `/applications/${app.slug}`
}

/**
 * The reference sizes the project H1 by character count so a long title never
 * outruns its measure. Done at build time — no client script, no observer.
 */
function headlineSize(title: string): string | undefined {
  const n = title.trim().length
  if (n <= 28) return undefined // base layer H1
  if (n <= 130) return "clamp(2rem, 3.4vw, 3rem)"
  return "clamp(1.5rem, 2.4vw, 2.25rem)"
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: { absolute: `${project.title} | Square One Paving` },
    description: project.excerpt,
    alternates: { canonical: `https://squareonepaving.ca/projects/${slug}` },
    openGraph: {
      title: `${project.title} | Square One Paving`,
      description: project.excerpt,
      images: [project.imageUrl],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  // The record's curated images lead; anything extra dropped into
  // public/images/projects/<slug>/ follows, de-duplicated by filename.
  const curatedNames = new Set(project.images.map((p) => decodeURIComponent(p.split("/").pop()!.toLowerCase())))
  const extras = galleryFor("projects", slug).filter(
    (p) => !curatedNames.has(decodeURIComponent(p.split("/").pop()!.toLowerCase())),
  )
  const gallery = [...project.images, ...extras]
  const heroImage = gallery[0]
  const galleryRest = gallery.slice(1)

  const serviceSlug = serviceSlugMap[project.service] ?? "stamped-asphalt"
  const serviceName = serviceLabel[project.service] ?? project.service
  const caption = metaLine(project.city, project.systems, project.year)
  const h1Size = headlineSize(project.title)
  const appHref = applicationHref(project.application)

  const facts: { label: string; value: string; href?: string }[] = [
    { label: "Location", value: project.city },
    ...(project.year ? [{ label: "Year", value: project.year }] : []),
    ...(project.client ? [{ label: "Client", value: project.client }] : []),
    { label: project.systems.length > 1 ? "Systems" : "System", value: project.systems.join(", ") },
    { label: "Application", value: project.application, href: appHref },
  ]

  // Related — same application first, then same region, always with different hero images.
  const seen = new Set<string>([project.imageUrl])
  const related: typeof projects = []
  for (const pool of [
    projects.filter((p) => p.slug !== slug && p.application === project.application),
    projects.filter((p) => p.slug !== slug && p.region === project.region),
    projects.filter((p) => p.slug !== slug),
  ]) {
    for (const p of pool) {
      if (related.length === RELATED_COUNT) break
      if (seen.has(p.imageUrl) || related.includes(p)) continue
      seen.add(p.imageUrl)
      related.push(p)
    }
  }

  return (
    <main className="bg-[color:var(--surface)]">

      {/* ── 01 Project header ──────── */}
      <section className="pt-[calc(var(--bar-h)+96px)] max-[700px]:pt-[calc(var(--bar-h)+56px)]">
        <div className="container-1280">
          <Link
            href="/projects"
            className="eyebrow w-fit transition-colors hover:text-[color:var(--ink)]"
          >
            Projects
          </Link>

          <h1
            className="stop mt-7 max-w-[24ch] [text-wrap:balance]"
            style={h1Size ? { fontSize: h1Size } : undefined}
          >
            {project.title}
          </h1>
        </div>

        {project.heroWide ? (
          <div className="relative mt-10 aspect-[21/9] overflow-hidden bg-[color:var(--surface-stone)] max-[700px]:aspect-[3/2]">
            <Image
              src={heroImage}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div aria-hidden className="scrim scrim-light" />
            <div className="caption">{caption}</div>
          </div>
        ) : (
          /* Archive-scale photography stays contained — never full-bleed. */
          <div className="container-1280">
            <figure className="mt-10 max-w-[960px]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
                <Image
                  src={heroImage}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="object-cover"
                />
              </div>
              <figcaption className="label mt-3">{caption}</figcaption>
            </figure>
          </div>
        )}

        <div className="container-1280">
          <dl className={`grid gap-10 border-b border-[color:var(--hairline)] pt-12 pb-[88px] max-[700px]:grid-cols-2 max-[700px]:gap-x-6 max-[700px]:gap-y-7 max-[700px]:pb-14 ${
            facts.length >= 5 ? "grid-cols-5" : "grid-cols-4"
          }`}>
            {facts.map((fact) => (
              <div key={fact.label} className="border-t border-[color:var(--hairline)] pt-4">
                <dt className="label">{fact.label}</dt>
                <dd className="mt-2 text-[1.125rem] leading-[1.4] font-semibold tracking-[-0.01em] text-[color:var(--ink)] [text-wrap:pretty]">
                  {fact.href ? (
                    <Link href={fact.href} className="transition-colors hover:text-[color:var(--accent-deep)]">
                      {fact.value}
                    </Link>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 02 Narrative ──────── */}
      <section className="section bg-[color:var(--surface)] pb-28 max-[700px]:pb-14">
        <div className="container-1280">
          <p className="max-w-[60ch] text-[17px] leading-[1.75] text-[color:var(--ink-body)] [text-wrap:pretty]">
            {project.excerpt}
          </p>

          {project.artist && (
            <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.6] text-[color:var(--ink-muted)]">
              <span className="label mr-3">Design</span>
              {project.artist}
            </p>
          )}

          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
            <Link href={`/services/${serviceSlug}`} className="arrow-link">
              More on {serviceName.toLowerCase()} <span aria-hidden="true">&rarr;</span>
            </Link>
            {appHref && (
              <Link href={appHref} className="arrow-link">
                All {project.application.toLowerCase()} work <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── 03 Gallery ──────── */}
      {galleryRest.length > 0 && (
        <section className="section border-y border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
          <div className="container-1280">
            <div
              className={`grid gap-6 max-[700px]:grid-cols-1 ${
                galleryRest.length === 1
                  ? "grid-cols-2"
                  : galleryRest.length === 2 || galleryRest.length === 4
                    ? "grid-cols-2"
                    : "grid-cols-3"
              }`}
            >
              {galleryRest.map((src, i) => (
                <figure
                  key={src}
                  className="thumb relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]"
                >
                  <Image
                    src={src}
                    alt={`${project.title} — photo ${i + 2} of ${gallery.length}`}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1280px) 50vw, 628px"
                    className="object-cover"
                  />
                  <div aria-hidden="true" className="scrim scrim-light" />
                  <figcaption className="caption">{caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 04 More projects ──────── */}
      {related.length > 0 && (
        <section className="section bg-[color:var(--surface)]">
          <div className="container-1280">
            <div className="flex flex-wrap items-baseline justify-between gap-6">
              <h2>More projects</h2>
              <Link href="/projects" className="arrow-link whitespace-nowrap">
                All {projects.length} projects <span>&rarr;</span>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 max-[700px]:grid-cols-1 max-[700px]:gap-12">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="card relative block aspect-[16/9] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]"
                >
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1280px) 50vw, 628px"
                    className="object-cover"
                  />

                  <div aria-hidden className="scrim" />

                  <div className="pointer-events-none absolute right-6 bottom-5 left-6">
                    <div className="text-[16px] leading-[1.3] font-semibold text-white">
                      {p.title}
                    </div>
                    <div className="mt-1 text-[13px] leading-[1.4] text-[rgba(255,255,255,0.78)]">
                      {metaLine(p.city, p.systems, p.year)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
