import type { Metadata } from "next"
import Link from "next/link"

import IndexImageHero from "@/components/IndexImageHero"
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import HowAJobGoes from "@/components/sections/HowAJobGoes"
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
 * For specifiers: one page that gathers what a landscape architect, a civil
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
  openGraph: { title: "For Specifiers: Drawings & Samples", images: [{ url: "/images/applications/streetscapes/victoria-town-centre-crossing-streetprint-01.jpg" }] },
  // One separator: the root template adds " | Square One Paving".
  title: "For Specifiers: Drawings & Samples",
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

/** What each service is used for, in a specifier's words: the applications on the service pages, condensed. */
const usedFor: Record<string, string> = {
  "stamped-asphalt": "Crosswalks, roundabout aprons, medians and traffic calming, commercial entries and parking lot walkways: pattern and colour in the asphalt itself.",
  "decorative-coatings": "Bike lanes and bus corridors, plazas and public art, spray parks, sports courts and school zones, parking stalls: colour and grip on asphalt or concrete.",
  "preformed-thermoplastic": "Decorative crosswalks, stop bars, arrows and legends, school zone graphics, logos and wayfinding, transit stop graphics, cut to the drawing and fused into the road.",
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

/** The three sheets the site leads with, named as the drawings name them. */
const featuredSheetNames = FEATURED_SHEETS.map((s) => s.name).join(", ")

/**
 * 27 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7, §4): the same page on the
 * own-company primitives. The figures read like the home page's proof line;
 * the four tools and the precedent are hairline blocks and frames with their
 * captions under them; the five steps are the site's one process band with
 * the specifier's line under step 2; the closure facts the old step 4
 * carried keep a block of their own. No arrow glyphs, no em dashes.
 */
export default function SpecifiersPage() {
  const typesHeld = TYPE_ORDER.filter((t) => resourceGroups.some((g) => g.docs.some((d) => d.type === t)))
  const systemsFor = (slug: string) => products.filter((p) => p.serviceSlug === slug)

  // ® / ™ ride the first visible mention of a system on this page. StreetPrint
  // and StreetBond are named, with their marks, in the figures row under the
  // opener; every other system gets its mark in the services list.
  const marked = new Set<string>(["StreetPrint", "StreetBond"])
  const withMark = (name: string, mark?: string) => {
    if (marked.has(name)) return name
    marked.add(name)
    return `${name}${mark ?? ""}`
  }

  const figures = [
    { label: "Installing in BC since", value: "2000" },
    { label: "StreetPrint® templates", value: `${OFFERED_SHEETS.length} dimensioned sheets` },
    { label: "StreetBond® colours", value: `${STREETBOND_COLOURS.length} on the chart, plus custom matching` },
    { label: "Specification library", value: `${resourceCount} documents` },
  ]

  return (
    <main className="bg-[color:var(--surface)]">
      <JsonLd data={[breadcrumbSchema(SITE_URL, [{ name: "For specifiers", path: "/specifiers" }])]} />

      <IndexImageHero
        src="/images/applications/streetscapes/victoria-town-centre-crossing-streetprint-01.jpg"
        alt="Brick-red StreetPrint stamped asphalt crossing at the edge of a town centre plaza in Victoria, with shops and trees beyond"
        eyebrow="For specifiers"
        title="Drawings, specifications and samples"
        lede="What a landscape architect, an engineer, a municipal project specifier or a developer's project manager needs to put decorative pavement on a drawing and out to tender. All of it is on this site, and a site walk with the sample boards follows when you are ready."
        caption="Victoria · Town centre crossing · StreetPrint"
        imagePosition="center 60%"
      />

      {/* ── The figures a specifier reads first, every one read from lib/ ── */}
      <section aria-label="Square One for specifiers, in brief" className="border-b border-hairline bg-surface">
        <dl className="container-1280 grid grid-cols-4 py-7 max-[900px]:grid-cols-2 max-[900px]:gap-y-6 max-[900px]:py-6">
          {figures.map((f, i) => (
            <div
              key={f.label}
              className={[
                "min-w-0 px-7 first:pl-0 last:pr-0",
                i > 0 ? "border-l border-hairline" : "",
                "max-[900px]:px-5 max-[900px]:first:pl-0 max-[900px]:[&:nth-child(odd)]:border-l-0 max-[900px]:[&:nth-child(odd)]:pl-0",
              ].join(" ")}
            >
              <dt className="label">{f.label}</dt>
              <dd className="mt-[6px] text-[16px] leading-[1.4] text-ink [text-wrap:pretty]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── What to draw from ──────── */}
      <Section
        id="specifiers-tools"
        label="Specifying it"
        title="Four things to draw from"
        intro="The manufacturer publishes the specifications, the sheets and the chart. Square One installs to them, and brings the samples."
        wide
      >
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 max-[700px]:grid-cols-1">
          <article className="border-t border-hairline pt-6">
            <span className="label">Specification library</span>
            <h3 className="mt-1">The documents, for the spec package</h3>
            <p className="mt-3 max-w-[52ch] text-ink-body">
              The manufacturer&rsquo;s own publications for every system Square One installs,
              previewed on the page and downloaded from this site.
            </p>
            <p className="mt-3">
              {typesHeld.map((t) => (
                <span key={t} className="tag">
                  {TYPE_LABEL[t]}
                </span>
              ))}
            </p>
            <p className="mt-5">
              <Link href="/resources" className="link">Open the library</Link>
            </p>
          </article>

          <article className="border-t border-hairline pt-6">
            <span className="label">Template sheets</span>
            <h3 className="mt-1">Every StreetPrint template, dimensioned</h3>
            <p className="mt-3 max-w-[52ch] text-ink-body">
              Each stamping template is a drawing before it is a road: the sheet with its border,
              coordinates, dimension set and title block. Name the field and the border on your
              drawing as the sheets name them ({featuredSheetNames} among them) and the sheet is
              the reference. The manufacturer cuts custom templates to order; its template
              guidelines are in the library.
            </p>
            <p className="mt-5">
              <Link href="/patterns" className="link">See the sheets</Link>
            </p>
          </article>

          <article className="border-t border-hairline pt-6">
            <span className="label">Colour chart</span>
            <h3 className="mt-1">StreetBond colour, off the chart</h3>
            <p className="mt-3 max-w-[52ch] text-ink-body">
              Standard colours can be specified straight off the published chart, the colour for
              stamped asphalt as well as for coatings. For anything outside it, send a colour
              reference and Square One matches it. The colour card itself is in the library.
            </p>
            <p className="mt-5">
              <Link href="/products/streetbond#colours" className="link">The colour chart</Link>
            </p>
          </article>

          <article className="border-t border-hairline pt-6">
            <span className="label">Sample boards</span>
            <h3 className="mt-1">Held against the site, at the site walk</h3>
            <p className="mt-3 max-w-[52ch] text-ink-body">
              A drawing is not a casting and a screen is not a coating. The pattern and colour
              samples come to the free site visit and are held against the site&rsquo;s own
              materials, and the written quote follows.
            </p>
            <p className="mt-5">
              <Link href="/contact" className="link">Book the site walk</Link>
            </p>
          </article>
        </div>
      </Section>

      {/* ── The four services ──────── */}
      <Section
        id="specifiers-services"
        label="The services"
        title="What each service is specified for"
        link={{ href: "/services", label: "The service pages" }}
        tone="warm"
        wide
      >
        <ol>
          {SERVICE_ORDER.map((slug) => {
            const service = services.find((s) => s.slug === slug)
            if (!service) return null
            const name = displayName[slug] ?? service.name
            const systems = systemsFor(slug)
            return (
              <li key={slug} className="grid grid-cols-12 gap-x-10 gap-y-4 border-t border-hairline py-8 last:border-b max-[900px]:grid-cols-1">
                <div className="col-span-4 max-[900px]:col-span-1">
                  <h3>
                    <Link href={`/services/${slug}`} className="hover:underline hover:decoration-1 hover:underline-offset-[6px]">
                      {name}
                    </Link>
                  </h3>
                  <p className="mt-2 max-w-[36ch] text-[16px] leading-[1.55] text-ink-muted">{service.tagline}</p>
                </div>
                <div className="col-span-5 max-[900px]:col-span-1">
                  <span className="label">Used for</span>
                  <p className="mt-2 max-w-[52ch] text-[16px] leading-[1.6] text-ink-body">
                    {usedFor[slug] ?? service.applications.join(", ")}
                  </p>
                </div>
                <div className="col-span-3 max-[900px]:col-span-1">
                  <span className="label">{systems.length > 0 ? "The systems" : "The rig"}</span>
                  {systems.length > 0 ? (
                    <ul className="mt-2">
                      {systems.map((p) => (
                        <li key={p.slug} className="text-[16px] leading-[1.7]">
                          <Link href={`/products/${p.slug}`} className="text-ink hover:underline hover:decoration-1 hover:underline-offset-4">
                            {withMark(p.name, p.mark)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-[16px] leading-[1.6] text-ink-body">
                      Mobile across the Lower Mainland and Vancouver Island.
                    </p>
                  )}
                  <p className="mt-4">
                    <Link href={`/services/${slug}`} className="link">
                      {name}, the service
                    </Link>
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </Section>

      {/* ── Precedent ──────── */}
      <Section
        id="specifiers-precedent"
        label="Precedent"
        title="Ten kinds of work, photographed on site"
        intro="Square One's own installation photography, captioned with the system and the place: a gallery for each kind of work, and the projects told in full."
        wide
      >
        <ul className="grid grid-cols-5 gap-x-6 gap-y-9 max-[1100px]:grid-cols-3 max-[700px]:grid-cols-2">
          {WORK_APPS.map((app, i) => {
            const src = APP_LEADS[app.slug]
            const href = app.slug === "driveways" ? "/driveways" : `/applications/${app.slug}`
            return (
              <li key={app.slug}>
                <Frame
                  src={src}
                  alt={`${app.label}: gallery of Square One installations`}
                  aspect="aspect-[4/3]"
                  sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 240px"
                  priority={i < 5}
                  href={href}
                  caption={
                    <>
                      <span className="block not-italic font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
                        {app.label}
                      </span>
                      <span className="block">The gallery</span>
                    </>
                  }
                />
              </li>
            )
          })}
        </ul>

        <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-10 max-[700px]:grid-cols-1">
          <div className="border-t border-hairline pt-6">
            <span className="label">Projects</span>
            <h3 className="mt-1">Projects on record</h3>
            <p className="mt-3 max-w-[48ch] text-ink-body">
              Each installation told in full: the place, the systems, the photographs, and what to
              ask for on a project like it.
            </p>
            <p className="mt-5">
              <Link href="/projects" className="link">All projects</Link>
            </p>
          </div>
          <div className="border-t border-hairline pt-6">
            <span className="label">Galleries</span>
            <h3 className="mt-1">By system and by region</h3>
            <p className="mt-3 max-w-[48ch] text-ink-body">
              The same photographs sorted by what was installed, and by the Lower Mainland or
              Vancouver Island.
            </p>
            <p className="mt-5">
              <Link href="/galleries" className="link">All galleries</Link>
            </p>
          </div>
        </div>
      </Section>

      {/* ── How a job goes, with the specifier's line under step 2 ──────── */}
      <HowAJobGoes tone="warm" specifiers crews={false} cta={false} title="From the drawing to the road" />

      {/* ── Closures, warranties and the two regions ──────── */}
      <section className="bg-surface-warm pb-20 max-[700px]:pb-14" aria-label="Closures, warranties and regions">
        <div className="container-1280">
          <div className="grid grid-cols-4 gap-x-10 gap-y-10 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
            <div className="border-t border-hairline pt-6">
              <span className="label">Keeping the site open</span>
              <p className="mt-2 text-[16px] leading-[1.6] text-ink-body">
                Stamped asphalt goes into the asphalt already there, so closures are short. A
                TrafficPatterns crossing is open to traffic within minutes. Where a site could not
                close, the work on record went in during phased overnight windows.
              </p>
            </div>
            <div className="border-t border-hairline pt-6">
              <span className="label">Two warranties, one installer</span>
              <p className="mt-2 text-[16px] leading-[1.6] text-ink-body">
                The manufacturer warrants the material, under its limited warranty against
                manufacturing defects. Square One warrants the workmanship: every system goes down
                to the published specification, by Square One&rsquo;s own crews.
              </p>
            </div>
            <div className="border-t border-hairline pt-6">
              <span className="label">Lower Mainland</span>
              <p className="mt-2 text-[16px] leading-[1.6] text-ink-body">
                One office, in Maple Ridge: 19&ndash;11720 Stewart Crescent, V2X 9E7.
                <br />
                <a href="tel:+16046126209" className="link not-italic">604-612-6209</a>
              </p>
            </div>
            <div className="border-t border-hairline pt-6">
              <span className="label">Vancouver Island</span>
              <p className="mt-2 text-[16px] leading-[1.6] text-ink-body">
                A service region with a line of its own. Crews serve Greater Victoria, the Cowichan
                Valley and Nanaimo.
                <br />
                <a href="tel:+12503910270" className="link not-italic">250-391-0270</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The way in ──────── */}
      <Section id="specifiers-contact" label="Start a project" title="Send drawings or a site address" wide>
        <div className="grid grid-cols-12 items-start gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
          <div className="col-span-6 max-[900px]:col-span-1">
            <p className="max-w-[52ch] text-ink-body [text-wrap:pretty]">
              Writing a specification and need a system matched to the traffic loading and the
              substrate? Send the drawings, or the address and a few photographs, and we will walk
              the site with the sample boards and follow with a written quote.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/contact" className="btn-primary">
                Request a site visit
              </Link>
              <a href="mailto:office@squareonepaving.com" className="link">
                office@squareonepaving.com
              </a>
            </div>
            <p className="mt-5 max-w-[52ch] text-[15px] italic leading-[1.6] text-ink-muted">
              Photos and drawings go by email. Put the site address in the subject line.
            </p>
          </div>

          <div className="col-span-6 grid grid-cols-2 gap-x-10 gap-y-8 max-[900px]:col-span-1 max-[480px]:grid-cols-1">
            <div className="border-t border-hairline pt-6">
              <span className="label">Phone</span>
              <ul className="mt-3 flex flex-col gap-[10px] text-[16px] leading-[1.5]">
                <li className="flex items-baseline justify-between gap-4">
                  <span className="text-ink-muted">Lower Mainland</span>
                  <a href="tel:+16046126209" className="whitespace-nowrap tabular-nums text-ink">604-612-6209</a>
                </li>
                <li className="flex items-baseline justify-between gap-4">
                  <span className="text-ink-muted">Vancouver Island</span>
                  <a href="tel:+12503910270" className="whitespace-nowrap tabular-nums text-ink">250-391-0270</a>
                </li>
                <li className="flex items-baseline justify-between gap-4">
                  <span className="text-ink-muted">Toll-free</span>
                  <a href="tel:+18773910270" className="whitespace-nowrap tabular-nums text-ink">1-877-391-0270</a>
                </li>
              </ul>
            </div>
            <div className="border-t border-hairline pt-6">
              <span className="label">What to send</span>
              <ul className="mt-3 flex flex-col gap-[9px] text-[16px] leading-[1.4] text-ink-body">
                <li>Drawings or a sketch, if you have them</li>
                <li>The address or postal code</li>
                <li>Photos of the surface as it is</li>
                <li>A rough area in square metres</li>
                <li>When you need it done</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
