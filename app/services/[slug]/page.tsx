import { notFound } from "next/navigation"
import Link from "next/link"
import ProjectCaption from "@/components/ui/ProjectCaption"
import Image from "next/image"
import type { Metadata } from "next"

import { services, getServiceBySlug } from "@/lib/services"
import { products } from "@/lib/products"
import { projects } from "@/lib/projects"
import { heroFor } from "@/lib/gallery"
import { WORK_APPS } from "@/lib/work"
import type { WorkApp, WorkAppMeta } from "@/lib/work"
import { SITE_URL } from "@/lib/site"
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd"
import { clampDescription } from "@/lib/seo"

interface Props {
  params: Promise<{ slug: string }>
}

/**
 * The pillar page sells the service, to specifiers (the 19 Sept 2026 evening
 * ruling): what Square One delivers first, then how it is specified and
 * installed, then the systems as the means, then the projects on record,
 * the questions, and the way in. Copy and section order only — the
 * components and styles are the ones that were here.
 *
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

/** The service heading — what Square One delivers, in the words a specifier uses. */
const serviceHeading: Record<string, string> = {
  "stamped-asphalt": "Stamped asphalt, specified with you and installed by our own crews",
  "decorative-coatings": "A decorative coating, from the colour chart to the cured surface",
  "preformed-thermoplastic": "Preformed thermoplastic, from your drawing to the road",
}

/** The heading over the systems cards. */
const systemsHeading: Record<string, string> = {
  "stamped-asphalt": "The systems behind stamped asphalt",
  "decorative-coatings": "The coatings behind the service",
  "preformed-thermoplastic": "The four thermoplastic systems",
}

/**
 * Five steps, every job — the order on record in app/about (site visit,
 * specification, surface prep, application, cure and walk-through) and
 * app/contact (photos and a postal code are enough to start). Steps 03 and
 * 04 carry the part that differs by service: which documents help the
 * specification, and how the road stays open — only as the record says it.
 */
interface ProcessStep {
  num: string
  title: string
  body: string
}

const SPEC_STEP: Record<string, string> = {
  "stamped-asphalt":
    "A written quote sets out the system, the template and the colour for the surface you have. The templates are dimensioned sheets in the pattern library; the manufacturer's texturing specification, colour card and custom template guidelines are in the specification library for the tender.",
  "decorative-coatings":
    "A written quote sets out the system and the colours for the surface you have — straight off the published chart, or matched to a reference you send. The coated-asphalt and coated-concrete specifications, data sheets, SDS and colour guide are in the specification library.",
  "preformed-thermoplastic":
    "A written quote sets out the system, the colours and the layout, to the owner's marking standard. The manufacturer's design manuals, custom design guidelines, colour palettes and specifications for each system are in the specification library for the spec package.",
}

const INSTALL_STEP: Record<string, string> = {
  "stamped-asphalt":
    "Surface prep first — cleaning, and vapour blasting where the surface needs it — then the stamp and the colour, by Square One's own crews to the published specification. No demolition and no new base, so closures are short.",
  "decorative-coatings":
    "Surface prep first — cleaning, and vapour blasting where the surface needs it — then the primer for the substrate and the coating, by Square One's own crews to the published specification. Coated in place; where a site cannot close, the work is phased in overnight windows.",
  "preformed-thermoplastic":
    "Surface prep first — cleaning, and vapour blasting where the surface needs it — then the sheets, cut to the design, heat-fused in place by Square One's own crews to the published specification. A TrafficPatterns crossing is open to traffic within minutes; where a street cannot close, the crossings go in intersection by intersection.",
}

function processFor(slug: string): ProcessStep[] {
  return [
    {
      num: "01",
      title: "Photos and a postal code",
      body: "Send a few photographs of the surface as it is, the address or postal code, and drawings if you have them. That is enough to start.",
    },
    {
      num: "02",
      title: "Site walk",
      body: "We walk the site, free: the substrate and its condition, the drainage, the traffic it carries and the layout it has to meet. The sample boards come with us.",
    },
    {
      num: "03",
      title: "Written quote and specification support",
      body:
        SPEC_STEP[slug] ??
        "A written quote sets out the system, the pattern and the colours for the surface you have; the manufacturer's specifications and colour cards are in the specification library.",
    },
    {
      num: "04",
      title: "Installation by Square One's crews",
      body:
        INSTALL_STEP[slug] ??
        "Surface prep first — cleaning, and vapour blasting where the surface needs it — then the install, by Square One's own crews to the published specification.",
    },
    {
      num: "05",
      title: "Walk-through and warranty",
      body: "Once the surface has cured, we walk the finished work with you. The manufacturer warrants the material; Square One warrants the workmanship.",
    },
  ]
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
    .slice(0, 3)

  const steps = processFor(service.slug)
  const showsPatterns = service.slug === "stamped-asphalt"
  const showsColours = service.slug === "stamped-asphalt" || service.slug === "decorative-coatings"

  const specColumns: { label: string; items: string[]; linked?: boolean }[] = [
    { label: "Applications", items: service.applications, linked: true },
    { label: "Who specifies it", items: service.idealClients },
    { label: "What you get", items: service.benefits },
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
      {/* ── Service header — what Square One delivers, in one breath ───── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <div className="flex flex-wrap items-center gap-[14px]">
            <span className="tag">Service</span>
            <span className="text-[13px] text-ink-muted">
              One of {numberWord(services.length)} services, Lower Mainland and Vancouver Island
            </span>
          </div>

          <h1 className="stop mt-8 max-w-[24ch] text-balance">{name}</h1>

          <p className="mt-6 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body">
            {service.tagline}
          </p>

          {/* The intro carries the systems and the region — the same sentence
              search engines and the Service schema read as the description. */}
          <p className="mt-4 max-w-[60ch] text-[17px] leading-[1.65] text-ink-muted [text-wrap:pretty]">
            {service.shortDescription}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-[14px]">
            <Link href="/contact" className="btn-primary">
              Request a site visit
            </Link>
            <Link href="/specifiers" className="btn-secondary">
              For specifiers
            </Link>
          </div>

          <div className="pattern-running-bond relative mt-14 aspect-[21/9] overflow-hidden rounded-[2px] max-[700px]:mt-10 max-[700px]:aspect-[4/3]">
            <Image
              src={heroSrc}
              alt={heroAlt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── The service ────────────────────────────────────────── */}
      <section className="section border-y border-[color:var(--hairline)] bg-surface-warm">
        <div className="container-1280">
          <div className="grid grid-cols-1 gap-10 min-[901px]:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] min-[901px]:gap-20">
            <div>
              <p className="eyebrow">What Square One delivers</p>
              <h2 className="mt-5 [text-wrap:balance]">
                {serviceHeading[service.slug] ?? `${name}, specified with you and installed by our own crews`}
              </h2>
            </div>

            {/* fullDescription is one string (other readers expect that); blank
                lines in it are paragraph breaks — the service, the systems, the record. */}
            <div className="max-w-[62ch] space-y-5 text-[17px] leading-[1.65] text-ink-body">
              {service.fullDescription.split(/\n\s*\n/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── At a glance ───────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <p className="eyebrow">At a glance</p>
          <h2 className="mt-5 text-pretty">{name}: where it goes, who specifies it, what you get</h2>

          <div className="mt-10 grid grid-cols-1 gap-10 min-[701px]:grid-cols-3 min-[701px]:gap-x-10">
            {specColumns.map((column) => (
              <div key={column.label} className="border-t border-[color:var(--hairline)] pt-7">
                <p className="label">{column.label}</p>

                <ul className="mt-4">
                  {column.items.map((item) => {
                    const gallery = column.linked ? galleryFor(item) : undefined
                    return (
                      <li
                        key={item}
                        className="border-b border-[color:var(--hairline)] py-3 text-[15px] leading-[1.55] text-ink-body"
                      >
                        {gallery ? (
                          <Link
                            href={galleryHref(gallery)}
                            className="text-ink-body underline-offset-4 transition-colors hover:text-ink hover:underline"
                          >
                            {item}
                          </Link>
                        ) : (
                          item
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it is specified and installed ─────────────────── */}
      <section className="section border-y border-[color:var(--hairline)] bg-surface-warm">
        <div className="container-1280">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">How it is specified and installed</p>
              <h2 className="mt-5 [text-wrap:balance]">From the drawing to the road, in five steps</h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] text-ink-muted [text-wrap:pretty]">
              The same five steps on every job, municipal or private, across the Lower Mainland and
              Vancouver Island. The site walk is free and the quote is written.
            </p>
          </div>

          <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-[color:var(--hairline)] min-[701px]:grid-cols-2 min-[1101px]:grid-cols-5">
            {steps.map((step) => (
              <li key={step.num} className="pt-7">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">{step.num}</div>
                <h3 className="mt-4 text-pretty">{step.title}</h3>
                <p className="mt-[10px] text-[15px] leading-[1.65] text-ink-body">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/resources" className="arrow-link">
              Specification library <span aria-hidden="true">&rarr;</span>
            </Link>
            {showsPatterns && (
              <Link href="/patterns" className="arrow-link">
                Template sheets <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
            {showsColours && (
              <Link href="/products/streetbond#colours" className="arrow-link">
                StreetBond colour chart <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
            <Link href="/specifiers" className="arrow-link">
              Everything for specifiers <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── The systems — the means ───────────────────────────── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <p className="eyebrow">The systems</p>
              <h2 className="mt-5 text-pretty">{systemsHeading[service.slug] ?? `The systems behind ${lowerName}`}</h2>
            </div>
            <Link href="/products" className="arrow-link whitespace-nowrap">
              All systems <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 min-[701px]:grid-cols-2 min-[1025px]:grid-cols-4">
            {service.productsIncluded.map((line, i) => {
              const product = productFor(line)
              return (
                <article key={line} className="card-panel">
                  <div className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {/* The product's name is the title; the line from lib/services.ts
                      (its role in this service) sits under it. */}
                  <h3 className="mt-5 text-pretty">
                    {product ? (
                      <>
                        {product.name}
                        {product.mark && <sup className="ml-[1px] text-[0.55em] font-normal">{product.mark}</sup>}
                      </>
                    ) : (
                      line
                    )}
                  </h3>
                  {product && (
                    <p className="mt-3 text-[14px] leading-[1.55] text-ink-muted">
                      {line.replace(/^[A-Za-z]+(?:XD)?[®™]?\s*/, "").replace(/^[—–-]\s*/, "").replace(/^\w/, (c) => c.toUpperCase())}
                    </p>
                  )}
                  {product && (
                    <Link
                      href={`/products/${product.slug}`}
                      className="arrow-link mt-auto pt-6"
                      aria-label={`${product.name} product page`}
                    >
                      {product.name} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Projects on record ────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section className="section border-y border-[color:var(--hairline)] bg-surface-warm">
          <div className="container-1280">
            <div className="flex flex-wrap items-baseline justify-between gap-6">
              <div>
                <p className="eyebrow">On the record</p>
                <h2 className="mt-5 text-pretty">{name} projects in BC</h2>
              </div>
              <Link href="/projects" className="arrow-link whitespace-nowrap">
                All projects <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 min-[701px]:grid-cols-3">
              {relatedProjects.map((project) => {
                const src = project.imageUrl

                const meta = [cityName(project.city), project.systems.join(" + "), project.year]
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
                      alt={`${project.title} — ${project.systems.join(" and ")}`}
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

      {/* ── Questions ────────────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 max-[900px]:grid-cols-1">
            <div className="col-span-4 max-[900px]:col-span-1">
              <div className="eyebrow">Questions</div>
              <h2 className="mt-5 [text-wrap:balance]">What specifiers ask about {lowerName}</h2>
              <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.6] text-ink-muted">
                Short answers, in the same words the page already uses. For the specification
                itself, the documents are in{" "}
                <Link href="/resources" className="font-semibold text-ink underline-offset-4 hover:underline">
                  the library
                </Link>
                .
              </p>
            </div>
            <div className="col-span-8 border-t border-[color:var(--hairline)] max-[900px]:col-span-1">
              {service.faqs.map((faq, i) => (
                <details key={faq.q} open={i === 0} className="group border-b border-[color:var(--hairline)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[20px] [&::-webkit-details-marker]:hidden">
                    <span className="text-[1.125rem] font-semibold leading-[1.4] tracking-[-0.01em] text-ink">{faq.q}</span>
                    <span aria-hidden="true" className="flex-shrink-0 text-[22px] font-normal leading-none text-ink-muted">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">&minus;</span>
                    </span>
                  </summary>
                  <p className="max-w-[64ch] pb-6 pr-10 text-[15px] leading-[1.65] text-ink-body max-[700px]:pr-0">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The way in — one strip, not a second footer ───────── */}
      <section className="border-t border-[color:var(--hairline)] bg-surface-warm py-12 max-[700px]:py-9">
        <div className="container-1280 grid grid-cols-12 items-center gap-x-12 gap-y-6 max-[900px]:grid-cols-1">
          <div className="col-span-7 max-[900px]:col-span-1">
            <h2 className="text-pretty">Send drawings or a site address</h2>
            <p className="mt-3 max-w-[56ch] text-[15px] leading-[1.6] text-ink-muted [text-wrap:pretty]">
              A few photographs and a postal code are enough to start; drawings help. Photos and
              drawings go by email to{" "}
              <a href="mailto:office@squareonepaving.com" className="font-semibold text-ink">
                office@squareonepaving.com
              </a>{" "}
              &mdash; put the site address in the subject line.
            </p>
          </div>
          <div className="col-span-5 flex flex-wrap items-center gap-x-8 gap-y-4 min-[901px]:justify-end max-[900px]:col-span-1">
            <Link href="/contact" className="btn-primary">
              Request a site visit
            </Link>
            <span className="text-[14px] leading-[1.6] text-ink-muted">
              <a href="tel:+16046126209" className="font-medium text-ink-body">604-612-6209</a> Lower Mainland
              <br />
              <a href="tel:+12503910270" className="font-medium text-ink-body">250-391-0270</a> Vancouver Island
            </span>
          </div>
        </div>
      </section>

      {/* ── More services ────────────────────────────────────────── */}
      <section className="section border-t border-[color:var(--hairline)] bg-surface">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <h2 className="text-pretty">Other services across the Lower Mainland and Vancouver Island</h2>
            <Link href="/services" className="arrow-link whitespace-nowrap">
              All services <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 min-[701px]:grid-cols-3">
            {otherServices.map((other) => {
              const otherName = displayName[other.slug] ?? other.name
              const src = heroFor("services", other.slug, other.imageUrl) ?? other.imageUrl
              const alt = src === other.imageUrl ? other.imageAlt : otherName

              return (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="pattern-herringbone card relative block aspect-[4/3] overflow-hidden rounded-[2px]"
                >
                  <Image
                    src={src}
                    alt={alt}
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
