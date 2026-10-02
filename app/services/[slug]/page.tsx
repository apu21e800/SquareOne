import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"

import { services, getServiceBySlug } from "@/lib/services"
import { products } from "@/lib/products"
import { projects } from "@/lib/projects"
import { heroFor } from "@/lib/gallery"
import { WORK_APPS } from "@/lib/work"
import type { WorkApp, WorkAppMeta } from "@/lib/work"
import { SITE_URL } from "@/lib/site"
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd"
import IndexImageHero from "@/components/IndexImageHero"
import HowAJobGoes from "@/components/sections/HowAJobGoes"
import MaterialsBand from "@/components/sections/MaterialsBand"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import { sentenceCase } from "@/lib/text"
import { clampDescription } from "@/lib/seo"

interface Props {
  params: Promise<{ slug: string }>
}

/**
 * The pillar page sells the service, to specifiers (the 19 Sept 2026 evening
 * ruling): what Square One delivers first, then how it is specified and
 * installed, then the systems as the means, then the projects on record,
 * the questions, and the way in.
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the same skeleton on the
 * own-company primitives — every band a Section with its label in the
 * margin column, the five service-specific steps replaced by the one
 * process band (components/sections/HowAJobGoes), the project tiles and the
 * "other services" tiles set as frames and rows with their captions under
 * them, every arrow link an underlined word. Copy, facts and hrefs are the
 * ones that were here.
 *
 * Display copy only. Routes and slugs come from lib/services.ts untouched —
 * "vapor-blasting" stays the slug, "Vapour blasting" is what the page reads.
 * Mirrors components/sections/ServicesGrid.tsx.
 *
 * 2 Oct 2026, the client's notes: the page speaks to the buyer (municipal,
 * commercial, residential) rather than the specifier: "who it is for" and
 * "who we work with" in the glance, "product documents" and the "pattern
 * library" under the process band, "Questions about …" closed by default,
 * and no specifiers link. The facts are the same facts.
 */
const displayName: Record<string, string> = {
  "stamped-asphalt": "Stamped asphalt",
  "preformed-thermoplastic": "Preformed thermoplastic",
  "decorative-coatings": "Decorative coatings",
  "vapor-blasting": "Vapour blasting",
}

/**
 * Page titles, topic first with the region in it; the root template appends
 * "| Square One Paving". Kept under 40 characters so the whole tag fits a
 * search result. Slugs without an entry fall back to "<Name> in BC".
 */
const pageTitle: Record<string, string> = {
  "stamped-asphalt": "Stamped Asphalt Installation in BC",
  "decorative-coatings": "Decorative Coatings in BC | StreetBond",
  "preformed-thermoplastic": "Preformed Thermoplastic Markings in BC",
}



/** "Vancouver, BC" → "Vancouver" — the caption carries the city, not the province. */
function cityName(city: string): string {
  return city.split(",")[0].trim()
}

/** Products named in a "products included" line, longest name first so "TrafficPatternsXD" is never read as "TrafficPatterns". */
const productsByNameLength = [...products].sort((a, b) => b.name.length - a.name.length)

function productFor(line: string) {
  return productsByNameLength.find((p) => line.includes(p.name))
}

/**
 * Applications that name one of the ten galleries link into it — the same
 * matching the product page uses, plus two hints the flattened labels cannot
 * express ("spray parks" live in Parks & paths; anything with "school" or
 * "sports court" in it lives in Schools & sports courts). Anything else
 * renders plain rather than guessing.
 */
const GALLERY_HINTS: [RegExp, WorkApp][] = [
  [/spray ?park/i, "parks-paths"],
  [/school|sports? ?court/i, "schools-sports-courts"],
]

function galleryFor(application: string): WorkAppMeta | undefined {
  const hint = GALLERY_HINTS.find(([re]) => re.test(application))
  if (hint) return WORK_APPS.find((app) => app.slug === hint[1])
  const key = application.toLowerCase().replace(/[^a-z]/g, "")
  return WORK_APPS.find((app) => {
    const label = app.label.toLowerCase().replace(/[^a-z]/g, "")
    return key === label || key.includes(label) || label.includes(key)
  })
}

/** Driveways have their own pillar page; /applications/driveways only redirects there. */
function galleryHref(app: WorkAppMeta): string {
  return app.slug === "driveways" ? "/driveways" : `/applications/${app.slug}`
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: pageTitle[service.slug] ?? `${service.name} in BC`,
    description: clampDescription(service.shortDescription),
    openGraph: { title: service.name, description: clampDescription(service.shortDescription), images: [{ url: service.imageUrl, alt: service.imageAlt }] },
    alternates: { canonical: `${SITE_URL}/services/${service.slug}` },
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
  // The alt describes the photograph on record; a folder drop-in that
  // replaces it is described by the service name until it is captioned.
  const heroAlt = heroSrc === service.imageUrl ? service.imageAlt : name
  // Client review, 16 Sept: stamped asphalt is sold here as commercial and
  // municipal work — driveways have their own page.
  const relatedProjects = projects
    .filter((p) => p.service === service.name)
    .filter((p) => service.slug !== "stamped-asphalt" || p.application !== "Driveways")
    // The opener's photograph is not repeated as a project tile below it.
    .filter((p) => p.imageUrl !== heroSrc)
    .slice(0, 3)

  const showsPatterns = service.slug === "stamped-asphalt"
  const showsColours = service.slug === "stamped-asphalt" || service.slug === "decorative-coatings"

  const specColumns: { label: string; items: string[]; linked?: boolean }[] = [
    { label: "Applications", items: service.applications, linked: true },
    { label: "Who we work with", items: service.idealClients.slice(0, 5) },
    // The site walk, the crews and the warranty split are in the process
    // band on the same page; the list keeps what only this service has.
    {
      label: "What you get",
      items: service.benefits.filter((b) => !/site walk|own crews|warranted by the manufacturer/i.test(b)).slice(0, 5),
    },
  ]

  const serviceSchema = {
    "@type": "Service",
    name,
    serviceType: name,
    description: service.shortDescription,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Lower Mainland, British Columbia" },
      { "@type": "AdministrativeArea", name: "Vancouver Island, British Columbia" },
    ],
    url: `${SITE_URL}/services/${service.slug}`,
  }

  return (
    <main>
      <JsonLd
        data={[
          serviceSchema,
          faqSchema(service.faqs),
          breadcrumbSchema(SITE_URL, [
            { name: "Services", path: "/services" },
            { name, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      {/* ── Opener — the service on real ground, then what Square One
             delivers, in one breath (19 Sept 2026: every pillar page now
             opens on a photograph from the record) ───── */}
      <IndexImageHero
        src={heroSrc}
        alt={heroAlt}
        eyebrow="Services · Lower Mainland and Vancouver Island"
        title={name}
        lede={service.tagline}
        caption={heroSrc === service.imageUrl ? service.imageCaption : undefined}
        imagePosition={service.imagePosition ?? "center"}
      />

      <section className="bg-surface pt-14 pb-16 max-[700px]:pt-10 max-[700px]:pb-12">
        <div className="container-1280">
          {/* The intro carries the systems and the region — the same sentence
              search engines and the Service schema read as the description.
              30 Sept 2026 QA: set on the section grid like every band under
              it, the label in the margin and the sentence as a standfirst,
              so the opener no longer leaves the right half of the page empty. */}
          <div className="sec-grid">
            <div className="sec-label">
              <span className="label">In short</span>
            </div>
            <div className="sec-body">
              <p className="standfirst max-w-[46ch] [text-wrap:pretty]">{service.shortDescription}</p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href="/contact" className="btn-primary">
                  Get a quote
                </Link>
                <Link href="/projects" className="link">
                  See the projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── "What Square One delivers" came off, 28 Sept 2026 (Vern: "too
             much text… cut the fat"): its lede restated the intro above
             and the bands below. ── */}

      {/* ── At a glance — three hairline lists ────────────────── */}
      <Section label="At a glance" title={<>Where it goes, <em>who it is for</em></>} wide>
        <div className="grid grid-cols-1 gap-10 min-[701px]:grid-cols-3 min-[701px]:gap-x-10">
          {specColumns.map((column) => (
            <div key={column.label} className="border-t border-hairline pt-6">
              <span className="label">{column.label}</span>

              <ul className="mt-3">
                {column.items.map((item) => {
                  const gallery = column.linked ? galleryFor(item) : undefined
                  return (
                    <li key={item} className="border-b border-hairline py-3 text-[16px] leading-[1.5] text-ink-body">
                      {gallery ? (
                        <Link
                          href={galleryHref(gallery)}
                          className="spec-glance-a text-ink underline decoration-[color:var(--hairline-strong)] underline-offset-4 transition-colors hover:decoration-[color:var(--ink)]"
                        >
                          {sentenceCase(item)}
                        </Link>
                      ) : (
                        sentenceCase(item)
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── How a job goes — the one process band, and the product
             documents under it ─────────────────────────────────── */}
      <HowAJobGoes tone="warm" crews={false} cta={false} />
      <section className="bg-surface-warm pb-20 max-[700px]:pb-14">
        <div className="container-1280 -mt-12 max-[700px]:-mt-6">
          <p className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline pt-6">
            <Link href="/resources" className="link">
              Product documents
            </Link>
            {showsPatterns && (
              <Link href="/patterns" className="link">
                Pattern library
              </Link>
            )}
            {showsColours && (
              <Link href="/products/streetbond#colours" className="link">
                StreetBond colour chart
              </Link>
            )}
          </p>
        </div>
      </section>

      {/* ── The systems — the means ───────────────────────────── */}
      <Section
        label="The systems"
        title={<>The systems <em>behind it</em></>}
        link={{ href: "/products", label: "All systems" }}
        wide
      >
        <div data-reveal-group className={`grid grid-cols-1 gap-x-10 gap-y-8 min-[701px]:grid-cols-2 ${service.productsIncluded.length === 3 ? "min-[1025px]:grid-cols-3" : "min-[1025px]:grid-cols-4"}`}>
          {service.productsIncluded.map((line) => {
            const product = productFor(line)
            return (
              <article key={line} data-reveal className="card-panel">
                {/* 2 Oct 2026: the system's own photograph leads its panel
                    (the row was names and one-liners on an empty band);
                    the opener's frame is never repeated. */}
                {product && product.image !== heroSrc && (
                  <Frame
                    src={product.image}
                    alt={product.imageAlt}
                    aspect="aspect-[4/3]"
                    sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 400px"
                    position={product.heroPosition}
                    href={`/products/${product.slug}`}
                    className="mb-5"
                  />
                )}
                {/* The product's name is the title and the way to its page;
                    the line from lib/services.ts (its role in this service)
                    sits under it. */}
                <h3 className="text-pretty">
                  {product ? (
                    <Link href={`/products/${product.slug}`} className="underline-offset-4 hover:underline">
                      {product.name}
                      {product.mark && <sup className="ml-[1px] text-[0.55em] font-normal">{product.mark}</sup>}
                    </Link>
                  ) : (
                    line
                  )}
                </h3>
                {product && (
                  <p className="mt-3 text-[16px] leading-[1.55] text-ink-body">
                    {line.replace(/^[A-Za-z]+(?:XD)?[®™]?\s*/, "").replace(/^[—–-]\s*/, "").replace(/^\w/, (c) => c.toUpperCase())}
                  </p>
                )}
              </article>
            )
          })}
        </div>
      </Section>

      {/* ── Patterns and colours — the sheets fanned, the chip strip, the
             two links; stamped asphalt only (2 Oct 2026, Vern: "access to
             the pattern sheets from… the Stamped Asphalt page") ──────── */}
      {showsPatterns && <MaterialsBand tone="paper" />}

      {/* ── Projects on record — frames, captioned under ──────── */}
      {relatedProjects.length > 0 && (
        <Section
          label="On the record"
          title={<>{name}, <em>on the record</em></>}
          link={{ href: "/projects", label: "All projects" }}
          tone="warm"
          wide
        >
          <ul className="grid grid-cols-1 gap-x-7 gap-y-10 min-[701px]:grid-cols-3">
            {relatedProjects.map((project) => {
              const meta = [cityName(project.city), project.systems.join(" + "), project.year]
                .filter((part): part is string => Boolean(part))
                .join(" · ")
              return (
                <li key={project.slug}>
                  <Frame
                    src={project.imageUrl}
                    alt={`${project.title}, ${project.systems.join(" and ")}`}
                    aspect="aspect-[4/3]"
                    sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
                    href={`/projects/${project.slug}`}
                    caption={
                      <>
                        <span className="block not-italic font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
                          {project.title}
                        </span>
                        <span className="block">{meta}</span>
                      </>
                    }
                  />
                </li>
              )
            })}
          </ul>
        </Section>
      )}

      {/* ── Questions ────────────────────────────────────────────── */}
      <Section
        label="Questions"
        title={<>Questions <em>about {lowerName}</em></>}
        intro={
          <>
            The product documents are in{" "}
            <Link href="/resources" className="link">
              the library
            </Link>
            .
          </>
        }
      >
        <div className="border-t border-hairline">
          {service.faqs.map((faq) => (
            <details key={faq.q} className="group border-b border-hairline">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[20px] [&::-webkit-details-marker]:hidden">
                <span className="text-[1.125rem] font-semibold leading-[1.4] text-ink">{faq.q}</span>
                <span aria-hidden="true" className="flex-shrink-0 text-[22px] font-normal leading-none text-ink-muted">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">&minus;</span>
                </span>
              </summary>
              <p className="max-w-[64ch] pb-6 pr-10 text-[16px] leading-[1.6] text-ink-body max-[700px]:pr-0">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* The page's own close came off on 28 Sept 2026 (QA: two quote bands in a
          row); the footer's "Start a project" band is the one close. */}

      {/* ── More services — three hairline rows ────────────────── */}
      <Section
        label="More services"
        title={<>Other <em>services</em></>}
        link={{ href: "/services", label: "All services" }}
      >
        <ul>
          {otherServices.map((other) => {
            const otherName = displayName[other.slug] ?? other.name
            const src = heroFor("services", other.slug, other.imageUrl) ?? other.imageUrl
            const alt = src === other.imageUrl ? other.imageAlt : otherName

            return (
              <li key={other.slug} className="row row-compact relative">
                <Link href={`/services/${other.slug}`} aria-label={`${otherName}, the service`} className="absolute inset-0 z-[2]" />
                <Frame src={src} alt={alt} aspect="aspect-[3/2]" sizes="132px" />
                <div className="min-w-0">
                  <h3>{otherName}</h3>
                  <p className="mt-2 max-w-[52ch] text-[16px] leading-[1.55] text-ink-body [text-wrap:pretty]">{other.tagline}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </Section>
    </main>
  )
}
