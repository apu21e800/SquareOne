import { notFound } from "next/navigation"
import Link from "next/link"
import ProjectCaption from "@/components/ui/ProjectCaption"
import Image from "next/image"
import type { Metadata } from "next"

import { services, getServiceBySlug } from "@/lib/services"
import { projects } from "@/lib/projects"
import { heroFor } from "@/lib/gallery"

interface Props {
  params: Promise<{ slug: string }>
}

/**
 * Display copy only. Routes and slugs come from lib/services.ts untouched —
 * "vapor-blasting" stays the slug, "Vapour blasting" is what the page reads.
 * Mirrors components/sections/ServicesGrid.tsx.
 */
const displayName: Record<string, string> = {
  "stamped-asphalt": "Stamped asphalt",
  "preformed-thermoplastic": "Preformed thermoplastic",
  "decorative-coatings": "Decorative coatings",
  "vapor-blasting": "Vapour blasting",
}

const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
] as const

function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n)
}

/** "Vancouver, BC" → "Vancouver" — the caption carries the city, not the province. */
function cityName(city: string): string {
  return city.split(",")[0].trim()
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: `${service.name} | Decorative Pavement BC`,
    description: service.shortDescription,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const name = displayName[service.slug] ?? service.name
  const lowerName = name.toLowerCase()

  const otherServices = services.filter((s) => s.slug !== service.slug)
  const heroSrc = heroFor("services", service.slug, service.imageUrl) ?? service.imageUrl
  const relatedProjects = projects.filter((p) => p.service === service.name).slice(0, 3)

  const specColumns: { label: string; items: string[] }[] = [
    { label: "Applications", items: service.applications },
    { label: "Ideal clients", items: service.idealClients },
    { label: "Key benefits", items: service.benefits },
  ]

  return (
    <main>
      {/* ── Service header ───────────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <div className="flex flex-wrap items-center gap-[14px]">
            <span className="tag">Service</span>
            <span className="text-[13px] text-ink-muted">
              One of {numberWord(services.length)} specialist services
            </span>
          </div>

          <h1 className="stop mt-8 max-w-[24ch] text-balance">{name}</h1>

          <p className="mt-6 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body">
            {service.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-[14px]">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
            <Link href="/services" className="btn-secondary">
              All services
            </Link>
          </div>

          <div className="pattern-running-bond relative mt-14 aspect-[21/9] overflow-hidden rounded-[2px] max-[700px]:mt-10 max-[700px]:aspect-[4/3]">
            <Image
              src={heroSrc}
              alt={name}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Overview ─────────────────────────────────────────────────── */}
      <section className="section border-y border-[color:var(--hairline)] bg-surface-warm">
        <div className="container-1280">
          <div className="grid grid-cols-1 gap-10 min-[901px]:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] min-[901px]:gap-20">
            <div>
              <p className="eyebrow">Overview</p>
              <h2 className="mt-5">What it is, and why it works</h2>
            </div>

            <p className="max-w-[62ch] text-[17px] leading-[1.65] text-ink-body">
              {service.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ── Specification ────────────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <p className="eyebrow">Specification</p>
          <h2 className="mt-5 text-pretty">What {lowerName} is for, and what you get</h2>

          <div className="mt-10 grid grid-cols-1 gap-10 min-[701px]:grid-cols-3 min-[701px]:gap-x-10">
            {specColumns.map((column) => (
              <div key={column.label} className="border-t border-[color:var(--hairline)] pt-7">
                <p className="label">{column.label}</p>

                <ul className="mt-4">
                  {column.items.map((item) => (
                    <li
                      key={item}
                      className="border-b border-[color:var(--hairline)] py-3 text-[15px] leading-[1.55] text-ink-body"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent work ──────────────────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section className="section border-y border-[color:var(--hairline)] bg-surface-warm">
          <div className="container-1280">
            <div className="flex flex-wrap items-baseline justify-between gap-6">
              <h2 className="text-pretty">Recent {lowerName} work</h2>
              <Link href="/projects" className="arrow-link whitespace-nowrap">
                All {projects.length} projects <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 min-[701px]:grid-cols-3">
              {relatedProjects.map((project) => {
                const src =
                  heroFor("projects", project.slug, project.imageUrl) ?? project.imageUrl

                const meta = [cityName(project.city), project.service, project.year]
                  .filter((part): part is string => Boolean(part))
                  .join(" · ")

                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="pattern-running-bond card relative block aspect-[4/3] overflow-hidden rounded-[2px]"
                  >
                    <Image
                      src={src}
                      alt={project.title}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
                      className="object-cover"
                    />

                    <div aria-hidden="true" className="scrim" />

                    <ProjectCaption title={project.title} meta={meta} />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Products used ────────────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <h2>Products used in this service</h2>
            <Link href="/products" className="arrow-link whitespace-nowrap">
              All products <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 min-[701px]:grid-cols-2 min-[1025px]:grid-cols-4">
            {service.productsIncluded.map((product, i) => (
              <article key={product} className="card-panel">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-pretty">{product}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── More services ────────────────────────────────────────────── */}
      <section className="section border-t border-[color:var(--hairline)] bg-surface-warm">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <h2>What else we do</h2>
            <Link href="/services" className="arrow-link whitespace-nowrap">
              All services <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 min-[701px]:grid-cols-3">
            {otherServices.map((other) => {
              const otherName = displayName[other.slug] ?? other.name
              const src = heroFor("services", other.slug, other.imageUrl) ?? other.imageUrl

              return (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="pattern-herringbone card relative block aspect-[4/3] overflow-hidden rounded-[2px]"
                >
                  <Image
                    src={src}
                    alt={otherName}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
                    className="object-cover"
                  />

                  <div aria-hidden="true" className="scrim" />

                  <div className="pointer-events-none absolute bottom-5 left-6 right-6">
                    <div className="text-[16px] font-semibold leading-[1.3] text-white">
                      {otherName}
                    </div>
                    <div className="mt-1 text-[13px] leading-[1.4] text-[rgba(255,255,255,0.78)]">
                      {other.tagline}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
