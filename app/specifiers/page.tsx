import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import IndexImageHero from "@/components/IndexImageHero"
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd"
import ProjectCaption from "@/components/ui/ProjectCaption"
import { services } from "@/lib/services"
import { products } from "@/lib/products"
import { WORK_APPS } from "@/lib/work"
import { APP_LEADS } from "@/lib/app-leads"
import { resourceGroups, resourceCount, type ResourceType } from "@/lib/resources"
import { OFFERED_SHEETS, FEATURED_SHEETS } from "@/lib/pattern-sheets"
import { STREETBOND_COLOURS } from "@/lib/palette"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

/**
 * For specifiers — one page that gathers what a landscape architect, a civil
 * or traffic engineer, a municipal project specifier or a developer's PM
 * needs to draw decorative pavement, specify it and put it to tender. Every
 * item is already on the site: the specification library, the pattern
 * sheets, the colour chart, the sample boards at the site walk, the four
 * services, the ten application galleries as precedent, the projects on
 * record, the five steps, the warranty split and the two regions. Nothing
 * here is a new service; counts are read from lib/ so they cannot drift.
 * The manufacturer is never named (19 Sept 2026 evening rulings).
 */

export const metadata: Metadata = {
  // One separator: the root template adds " | Square One Paving".
  title: "For Specifiers — Drawings, Specs & Samples",
  description: clampDescription(
    "For landscape architects, engineers and municipal specifiers in BC: StreetPrint template sheets, the StreetBond colour chart, specifications, sample boards and installed precedent.",
  ),
  keywords: [
    "decorative pavement specification BC",
    "stamped asphalt specification",
    "StreetPrint template drawings",
    "StreetBond colour chart",
    "preformed thermoplastic crosswalk specification BC",
    "landscape architect decorative paving BC",
  ],
  alternates: { canonical: `${SITE_URL}/specifiers` },
}

/** Canadian English in prose; slugs and routes stay untouched. */
const displayName: Record<string, string> = {
  "stamped-asphalt": "Stamped asphalt",
  "decorative-coatings": "Decorative coatings",
  "preformed-thermoplastic": "Preformed thermoplastic",
  "vapor-blasting": "Vapour blasting",
}

/** What each service is used for, in a specifier's words — the applications on the service pages, condensed. */
const usedFor: Record<string, string> = {
  "stamped-asphalt": "Crosswalks, roundabout aprons, medians and traffic calming, commercial entries and parking lot walkways — pattern and colour in the asphalt itself.",
  "decorative-coatings": "Bike lanes and bus corridors, plazas and public art, spray parks, sports courts and school zones, parking stalls — colour and grip on asphalt or concrete.",
  "preformed-thermoplastic": "Decorative crosswalks, stop bars, arrows and legends, school zone graphics, logos and wayfinding, transit stop graphics — cut to the drawing, fused into the road.",
  "vapor-blasting": "Surface cleaning and priming ahead of a coating or thermoplastic install; graffiti, mould and road-marking removal on its own. The supporting service.",
}

const SERVICE_ORDER = ["stamped-asphalt", "decorative-coatings", "preformed-thermoplastic", "vapor-blasting"]

/** The document types the library holds, in the order they are listed in lib/resources.ts. */
const TYPE_ORDER: ResourceType[] = ["Specification", "Colour card", "SDS", "Guide", "Brochure", "Technical info"]
const TYPE_LABEL: Record<ResourceType, string> = {
  Specification: "Specifications",
  "Colour card": "Colour cards",
  SDS: "SDS",
  Guide: "Guides",
  Brochure: "Brochures",
  "Technical info": "Technical data",
}

/* The five steps, as app/about and app/contact carry them, with the part a
   specifier needs made explicit: which documents help the specification,
   who installs, how the site stays open — only as the record says it. */
const steps: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "Send drawings, or photos and a postal code",
    body: "A drawing, a sketch or the artist's file with the site address is ideal. A few photographs of the surface as it is and a postal code are enough to start.",
  },
  {
    num: "02",
    title: "Site walk",
    body: "We walk the site, free: the substrate and its condition, the drainage, the traffic it carries and the layout it has to meet. The sample boards come with us — on-screen colour is a reference, the board is what decides.",
  },
  {
    num: "03",
    title: "Written quote and specification support",
    body: "A written quote sets out the system, the pattern and the colours for the surface you have. The manufacturer's specifications, data sheets, colour cards and design guidelines are in the library for the tender package; the templates are dimensioned sheets in the pattern library.",
  },
  {
    num: "04",
    title: "Installation by Square One's crews",
    body: "Surface prep first — cleaning, and vapour blasting where the surface needs it — then the install, by Square One's own crews to the published specification. Stamped asphalt goes into the asphalt already there, so closures are short; a TrafficPatterns crossing is open to traffic within minutes; where a site could not close, the work on record went in in phased overnight windows.",
  },
  {
    num: "05",
    title: "Walk-through and warranty",
    body: "Once the surface has cured, we walk the finished work with you. The manufacturer warrants the material; Square One warrants the workmanship.",
  },
]

/** The three sheets the site leads with, named as the drawings name them. */
const featuredSheetNames = FEATURED_SHEETS.map((s) => s.name).join(", ")

export default function SpecifiersPage() {
  const typesHeld = TYPE_ORDER.filter((t) => resourceGroups.some((g) => g.docs.some((d) => d.type === t)))
  const systemsFor = (slug: string) => products.filter((p) => p.serviceSlug === slug)

  // ® / ™ ride the first visible mention of a system on this page. StreetPrint
  // and StreetBond are named, with their marks, in the figures strip under
  // the hero; every other system gets its mark in the services list.
  const marked = new Set<string>(["StreetPrint", "StreetBond"])
  const withMark = (name: string, mark?: string) => {
    if (marked.has(name)) return name
    marked.add(name)
    return `${name}${mark ?? ""}`
  }

  return (
    <main className="bg-[color:var(--surface)]">
      <JsonLd data={[breadcrumbSchema(SITE_URL, [{ name: "For specifiers", path: "/specifiers" }])]} />

      <IndexImageHero
        src="/images/applications/streetscapes/victoria-town-centre-crossing-streetprint-01.jpg"
        alt="Brick-red StreetPrint stamped asphalt crossing at the edge of a town centre plaza in Victoria, with shops and trees beyond"
        eyebrow="For specifiers"
        title="Drawings, specifications and samples"
        lede="What a landscape architect, an engineer, a municipal project specifier or a developer's project manager needs to put decorative pavement on a drawing and out to tender — all of it on this site, and a site walk with the sample boards when you are ready."
        caption="Victoria · Town centre crossing · StreetPrint"
        imagePosition="center 60%"
      />

      {/* ── The numbers a specifier reads first — every one read from lib/ ── */}
      <section className="border-b border-[color:var(--hairline)] bg-[color:var(--surface-warm)] py-12 max-[700px]:py-9">
        <div className="container-1280 grid grid-cols-4 gap-x-10 gap-y-9 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {[
            { number: "2000", label: "the year Square One began installing decorative pavement in BC" },
            { number: String(OFFERED_SHEETS.length), label: "StreetPrint® templates, drawn as dimensioned sheets" },
            { number: String(STREETBOND_COLOURS.length), label: "standard StreetBond® colours on the chart, plus custom matching" },
            { number: String(resourceCount), label: "documents in the specification library" },
          ].map((stat) => (
            <div key={stat.label} className="stat-rule">
              <div className="stat-num">{stat.number}</div>
              <div className="mt-3 max-w-[24ch] text-[14px] leading-[1.5] text-[color:var(--ink-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What to draw from ──────── */}
      <section className="section" aria-labelledby="specifiers-tools">
        <div className="container-1280">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow">Specifying it</div>
              <h2 id="specifiers-tools" className="mt-4 [text-wrap:balance]">
                Four things to draw from
              </h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] text-[color:var(--ink-muted)] [text-wrap:pretty]">
              The manufacturer publishes the specifications, the sheets and the chart. Square One
              installs to them, and brings the samples.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-6 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            <article className="card-panel">
              <div className="label">Specification library</div>
              <h3 className="mt-4 text-[22px] leading-[1.25]">The documents, for the spec package</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
                The manufacturer&rsquo;s own publications for every system Square One installs,
                previewed on the page and downloaded from this site.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {typesHeld.map((t) => (
                  <li key={t} className="tag">
                    {TYPE_LABEL[t]}
                  </li>
                ))}
              </ul>
              <Link href="/resources" className="arrow-link mt-auto pt-6">
                Open the library <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>

            <article className="card-panel">
              <div className="label">Template sheets</div>
              <h3 className="mt-4 text-[22px] leading-[1.25]">Every StreetPrint template, dimensioned</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
                Each stamping template is a drawing before it is a road &mdash; the sheet with
                its border, coordinates, dimension set and title block. Name the field and the
                border on your drawing as the sheets name them ({featuredSheetNames} among them)
                and the sheet is the reference. The manufacturer cuts custom templates to order;
                its template guidelines are in the library.
              </p>
              <Link href="/patterns" className="arrow-link mt-auto pt-6">
                See the sheets <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>

            <article className="card-panel">
              <div className="label">Colour chart</div>
              <h3 className="mt-4 text-[22px] leading-[1.25]">StreetBond colour, off the chart</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
                Standard colours can be specified straight off the published chart &mdash; the
                colour for stamped asphalt as well as for coatings. For anything outside it,
                send a colour reference and Square One matches it. The colour card itself is in
                the library.
              </p>
              <Link href="/products/streetbond#colours" className="arrow-link mt-auto pt-6">
                The colour chart <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>

            <article className="card-panel">
              <div className="label">Sample boards</div>
              <h3 className="mt-4 text-[22px] leading-[1.25]">Held against the site, at the site walk</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
                A drawing is not a casting and a screen is not a coating. The pattern and colour
                samples come to the free site visit and are held against the site&rsquo;s own
                materials, and the written quote follows.
              </p>
              <Link href="/contact" className="arrow-link mt-auto pt-6">
                Book the site walk <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ── The four services ──────── */}
      <section className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface-warm)]" aria-labelledby="specifiers-services">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">The services</div>
              <h2 id="specifiers-services" className="mt-4 [text-wrap:balance]">
                Three ways to change a surface, one to clean it &mdash; and what each is specified for
              </h2>
            </div>
            <Link href="/services" className="arrow-link whitespace-nowrap">
              The service pages <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <ol className="mt-10 border-t border-[color:var(--hairline)]">
            {SERVICE_ORDER.map((slug, i) => {
              const service = services.find((s) => s.slug === slug)
              if (!service) return null
              const name = displayName[slug] ?? service.name
              const systems = systemsFor(slug)
              return (
                <li key={slug} className="grid grid-cols-12 gap-x-10 gap-y-4 border-b border-[color:var(--hairline)] py-8 max-[900px]:grid-cols-1">
                  <div className="col-span-4 max-[900px]:col-span-1">
                    <div className="text-[13px] font-semibold tracking-[0.08em] text-[color:var(--ink-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-3">
                      <Link href={`/services/${slug}`} className="underline-offset-4 hover:underline">
                        {name}
                      </Link>
                    </h3>
                    <p className="mt-2 max-w-[36ch] text-[15px] leading-[1.55] text-[color:var(--ink-muted)]">{service.tagline}</p>
                  </div>
                  <div className="col-span-5 max-[900px]:col-span-1">
                    <div className="label">Used for</div>
                    <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
                      {usedFor[slug] ?? service.applications.join(", ")}
                    </p>
                  </div>
                  <div className="col-span-3 max-[900px]:col-span-1">
                    <div className="label">{systems.length > 0 ? "The systems" : "The rig"}</div>
                    {systems.length > 0 ? (
                      <ul className="mt-2">
                        {systems.map((p) => (
                          <li key={p.slug} className="text-[15px] leading-[1.7]">
                            <Link href={`/products/${p.slug}`} className="text-[color:var(--ink)] underline-offset-4 hover:underline">
                              {withMark(p.name, p.mark)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
                        Mobile across the Lower Mainland and Vancouver Island.
                      </p>
                    )}
                    <Link href={`/services/${slug}`} className="arrow-link mt-4 inline-block">
                      {name} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ── Precedent ──────── */}
      <section className="section" aria-labelledby="specifiers-precedent">
        <div className="container-1280">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow">Precedent</div>
              <h2 id="specifiers-precedent" className="mt-4 [text-wrap:balance]">
                Ten kinds of work, photographed on site
              </h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] text-[color:var(--ink-muted)] [text-wrap:pretty]">
              Square One&rsquo;s own installation photography, captioned with the system and the
              place &mdash; a gallery for each kind of work, and the projects told in full.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {WORK_APPS.map((app, i) => {
              const src = APP_LEADS[app.slug]
              const href = app.slug === "driveways" ? "/driveways" : `/applications/${app.slug}`
              return (
                <Link
                  key={app.slug}
                  href={href}
                  className="card relative block aspect-[4/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]"
                >
                  {src && (
                    <Image
                      src={src}
                      alt={`${app.label} — gallery of Square One installations`}
                      fill
                      priority={i < 3}
                      sizes="(max-width: 600px) 100vw, (max-width: 1280px) 33vw, 411px"
                      className="object-cover"
                    />
                  )}
                  <div aria-hidden className="scrim" />
                  <ProjectCaption title={app.label} meta="View the gallery" />
                </Link>
              )
            })}
            <Link href="/projects" className="card-panel min-h-[240px] justify-between rounded-[2px]">
              <div>
                <div className="label">Projects</div>
                <h3 className="mt-4 text-[22px] leading-[1.25]">Projects on record</h3>
                <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
                  Each installation told in full &mdash; the place, the systems, the photographs,
                  and what to ask for on a project like it.
                </p>
              </div>
              <span className="arrow-link mt-6">
                All projects <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
            <Link href="/galleries" className="card-panel min-h-[240px] justify-between rounded-[2px]">
              <div>
                <div className="label">Galleries</div>
                <h3 className="mt-4 text-[22px] leading-[1.25]">By system and by region</h3>
                <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
                  The same photographs sorted by what was installed, and by the Lower Mainland or
                  Vancouver Island.
                </p>
              </div>
              <span className="arrow-link mt-6">
                All galleries <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it is specified and installed ──────── */}
      <section className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface-warm)]" aria-labelledby="specifiers-process">
        <div className="container-1280">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow">How it is specified and installed</div>
              <h2 id="specifiers-process" className="mt-4 [text-wrap:balance]">
                From the drawing to the road, in five steps
              </h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] text-[color:var(--ink-muted)] [text-wrap:pretty]">
              The same five steps on every job. The site walk is free, the quote is written, the
              crews are Square One&rsquo;s own.
            </p>
          </div>

          <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-[color:var(--hairline)] min-[701px]:grid-cols-2 min-[1101px]:grid-cols-5">
            {steps.map((step) => (
              <li key={step.num} className="pt-7">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-[color:var(--ink-muted)]">{step.num}</div>
                <h3 className="mt-4 text-pretty">{step.title}</h3>
                <p className="mt-[10px] text-[15px] leading-[1.65] text-[color:var(--ink-body)]">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid grid-cols-12 gap-x-10 gap-y-8 border-t border-[color:var(--hairline)] pt-10 max-[900px]:grid-cols-1">
            <div className="col-span-4 max-[900px]:col-span-1">
              <div className="label">Two warranties, one installer</div>
              <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
                The manufacturer warrants the material, under its limited warranty against
                manufacturing defects. Square One warrants the workmanship: every system goes
                down to the published specification, by Square One&rsquo;s own crews.
              </p>
            </div>
            <div className="col-span-4 max-[900px]:col-span-1">
              <div className="label">Lower Mainland</div>
              <p className="mt-3 text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
                One office, in Maple Ridge &mdash; 19&ndash;11720 Stewart Crescent, V2X 9E7.
                <br />
                <a href="tel:+16046126209" className="font-medium text-[color:var(--ink)]">604-612-6209</a>
              </p>
            </div>
            <div className="col-span-4 max-[900px]:col-span-1">
              <div className="label">Vancouver Island</div>
              <p className="mt-3 text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
                A service region with a line of its own &mdash; crews serve Greater Victoria, the
                Cowichan Valley and Nanaimo.
                <br />
                <a href="tel:+12503910270" className="font-medium text-[color:var(--ink)]">250-391-0270</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The way in ──────── */}
      <section className="section" aria-labelledby="specifiers-contact">
        <div className="container-1280 grid grid-cols-12 items-start gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
          <div className="col-span-6 max-[900px]:col-span-1">
            <div className="eyebrow">Start a project</div>
            <h2 id="specifiers-contact" className="mt-4 [text-wrap:balance]">
              Send drawings or a site address
            </h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.65] text-[color:var(--ink-body)] [text-wrap:pretty]">
              Writing a specification and need a system matched to the traffic loading and the
              substrate? Send the drawings, or the address and a few photographs, and we will walk
              the site with the sample boards and follow with a written quote.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/contact" className="btn-primary">
                Request a site visit
              </Link>
              <a href="mailto:office@squareonepaving.com" className="arrow-link">
                office@squareonepaving.com <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <p className="mt-5 max-w-[52ch] text-[14px] leading-[1.6] text-[color:var(--ink-muted)]">
              Photos and drawings go by email &mdash; put the site address in the subject line.
            </p>
          </div>

          <div className="col-span-6 grid grid-cols-2 gap-x-10 gap-y-8 max-[900px]:col-span-1 max-[480px]:grid-cols-1">
            <div className="border-t border-[color:var(--hairline)] pt-6">
              <div className="label">Phone</div>
              <ul className="mt-3 flex flex-col gap-[10px] text-[15px] leading-[1.5]">
                <li className="flex items-baseline justify-between gap-4">
                  <span className="text-[color:var(--ink-muted)]">Lower Mainland</span>
                  <a href="tel:+16046126209" className="whitespace-nowrap font-medium tabular-nums text-[color:var(--ink)]">604-612-6209</a>
                </li>
                <li className="flex items-baseline justify-between gap-4">
                  <span className="text-[color:var(--ink-muted)]">Vancouver Island</span>
                  <a href="tel:+12503910270" className="whitespace-nowrap font-medium tabular-nums text-[color:var(--ink)]">250-391-0270</a>
                </li>
                <li className="flex items-baseline justify-between gap-4">
                  <span className="text-[color:var(--ink-muted)]">Toll-free</span>
                  <a href="tel:+18773910270" className="whitespace-nowrap font-medium tabular-nums text-[color:var(--ink)]">1-877-391-0270</a>
                </li>
              </ul>
            </div>
            <div className="border-t border-[color:var(--hairline)] pt-6">
              <div className="label">What to send</div>
              <ul className="mt-3 flex flex-col gap-[9px] text-[14px] leading-[1.4] text-[color:var(--ink-body)]">
                <li>Drawings or a sketch, if you have them</li>
                <li>The address or postal code</li>
                <li>Photos of the surface as it is</li>
                <li>A rough area in square metres</li>
                <li>When you need it done</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
