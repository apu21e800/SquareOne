import type { Metadata } from "next"
import Image from "next/image"
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
import { OFFERED_SHEETS } from "@/lib/pattern-sheets"
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
 * record, the five steps, our own crews and the two regions. Nothing
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

/** What each service is used for, in a specifier's words: the applications
    on the service pages, condensed to the words a drawing would use. */
const usedFor: Record<string, string[]> = {
  "stamped-asphalt": ["Crosswalks", "Roundabout aprons", "Medians and traffic calming", "Commercial entries", "Parking lot walkways"],
  "decorative-coatings": ["Bike lanes and bus corridors", "Plazas and public art", "Spray parks", "Sports courts", "School zones"],
  "preformed-thermoplastic": ["Decorative crosswalks", "Stop bars, arrows and legends", "School zone graphics", "Logos and wayfinding"],
  "vapor-blasting": ["Surface prep before a coating", "Graffiti and mould", "Road-marking removal"],
}

/** The material beside each service: the menu's squares (public/images/menu). */
const swatch: Record<string, string> = {
  "stamped-asphalt": "/images/menu/swatch-stamped-asphalt.webp",
  "decorative-coatings": "/images/menu/swatch-decorative-coatings.webp",
  "preformed-thermoplastic": "/images/menu/swatch-preformed-thermoplastic.webp",
  "vapor-blasting": "/images/menu/swatch-vapor-blasting.webp",
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
        title={<>Drawings, specifications <em>and samples</em></>}
        lede="What a landscape architect, an engineer or a municipal specifier needs to put decorative pavement on a drawing and out to tender, and a site walk with the samples when you are ready."
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

      {/* ── The kit: four things to draw from, each one you can see ──────── */}
      <Section
        id="specifiers-tools"
        label="Specifying it"
        title={<>Four things <em>to draw from</em></>}
        intro="The manufacturer publishes the specifications, the sheets and the chart. We install to them, and bring the samples."
        wide
      >
        <ul data-reveal-group className="kit-grid">
          <li className="kit-tile" data-reveal>
            <Link href="/resources" className="kit-visual kit-paper">
              <Image
                src="/images/specifiers/cross-section-detail.webp"
                alt="A typical pavement cross-section detail from the specification library: the thermoplastic panel, asphalt, base and subgrade, each labelled"
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 300px"
                className="object-contain p-3"
              />
            </Link>
            <span className="label mt-4">Specification library</span>
            <h3 className="kit-title">{resourceCount} documents, for the spec package</h3>
            <p className="tags mt-2">
              {typesHeld.map((t) => (
                <span key={t} className="tag">
                  {TYPE_LABEL[t]}
                </span>
              ))}
            </p>
            <Link href="/resources" className="link mt-3 inline-block">
              Open the library
            </Link>
          </li>

          <li className="kit-tile" data-reveal>
            <Link href="/patterns" className="kit-visual kit-paper">
              <Image
                src="/images/patterns/herringbone.webp"
                alt="The StreetPrint Standard Herringbone template sheet: the dimensioned pattern with its border and title block"
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 300px"
                className="object-contain p-2"
              />
            </Link>
            <span className="label mt-4">Template sheets</span>
            <h3 className="kit-title">Every StreetPrint pattern, dimensioned</h3>
            <p className="kit-line">{OFFERED_SHEETS.length} sheets with border, coordinates and title block. Name them on your drawing.</p>
            <Link href="/patterns" className="link mt-3 inline-block">
              See the sheets
            </Link>
          </li>

          <li className="kit-tile" data-reveal>
            <Link href="/products/streetbond#colours" className="kit-visual kit-chips" aria-label="The StreetBond colour chart">
              {STREETBOND_COLOURS.slice(0, 24).map((c) => (
                <span key={c.name} style={{ background: c.hex }} title={c.name} />
              ))}
            </Link>
            <span className="label mt-4">Colour chart</span>
            <h3 className="kit-title">StreetBond colour, off the chart</h3>
            <p className="kit-line">{STREETBOND_COLOURS.length} colours on the chart. Send a reference and we match it.</p>
            <Link href="/products/streetbond#colours" className="link mt-3 inline-block">
              The colour chart
            </Link>
          </li>

          <li className="kit-tile" data-reveal>
            <Link href="/contact" className="kit-visual kit-board" aria-label="Book the site walk">
              <Image
                src="/images/textures/stamped-asphalt-texture.webp"
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 300px"
                className="object-cover"
              />
              <span className="kit-board-chips" aria-hidden="true">
                {["Terra Cotta", "Sandy Beige", "Slate"].map((n) => {
                  const c = STREETBOND_COLOURS.find((x) => x.name === n)
                  return c ? <span key={n} style={{ background: c.hex }} /> : null
                })}
              </span>
            </Link>
            <span className="label mt-4">Sample boards</span>
            <h3 className="kit-title">Held against your site</h3>
            <p className="kit-line">Pattern and colour samples come to the free site walk, before the written quote.</p>
            <Link href="/contact" className="link mt-3 inline-block">
              Book the site walk
            </Link>
          </li>
        </ul>
      </Section>

      {/* ── The four services, side by side ──────── */}
      <Section
        id="specifiers-services"
        label="The services"
        title={<>What each service <em>is specified for</em></>}
        link={{ href: "/services", label: "The service pages" }}
        tone="warm"
        wide
      >
        <ul className="svc-matrix">
          {SERVICE_ORDER.map((slug) => {
            const service = services.find((s) => s.slug === slug)
            if (!service) return null
            const name = displayName[slug] ?? service.name
            const systems = systemsFor(slug)
            return (
              <li key={slug} className="svc-col">
                <Link href={`/services/${slug}`} className="svc-head">
                  <span className="mega-swatch" style={{ width: 56, height: 56 }} aria-hidden="true">
                    <Image src={swatch[slug]} alt="" width={56} height={56} unoptimized />
                  </span>
                  <span className="svc-name">{name}</span>
                </Link>
                <span className="label mt-5">Used for</span>
                <ul className="svc-list">
                  {(usedFor[slug] ?? service.applications).map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
                <span className="label mt-5">{systems.length > 0 ? "The systems" : "The rig"}</span>
                {systems.length > 0 ? (
                  <p className="tags mt-1">
                    {systems.map((p) => (
                      <Link key={p.slug} href={`/products/${p.slug}`} className="tag svc-sys">
                        <span className="svc-sys-name">{withMark(p.name, p.mark)}</span>
                      </Link>
                    ))}
                  </p>
                ) : (
                  <p className="mt-1 text-[15.5px] leading-[1.5] text-ink-body">Mobile, both regions</p>
                )}
              </li>
            )
          })}
        </ul>
      </Section>

      {/* ── Precedent ──────── */}
      <Section
        id="specifiers-precedent"
        label="Precedent"
        title={<>Ten kinds of work, <em>photographed on site</em></>}
        link={{ href: "/projects", label: "All projects" }}
        wide
      >
        <ul data-reveal-group className="grid grid-cols-5 gap-x-6 gap-y-9 max-[1100px]:grid-cols-3 max-[700px]:grid-cols-2">
          {WORK_APPS.map((app, i) => {
            const src = APP_LEADS[app.slug]
            const href = app.slug === "driveways" ? "/driveways" : `/applications/${app.slug}`
            return (
              <li key={app.slug} data-reveal>
                <Frame
                  src={src}
                  alt={`${app.label}: gallery of Square One installations`}
                  aspect="aspect-[4/3]"
                  sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 240px"
                  priority={i < 5}
                  href={href}
                  caption={
                    <span className="block not-italic font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
                      {app.label}
                    </span>
                  }
                />
              </li>
            )
          })}
        </ul>
        <p className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/projects" className="link">Every project, told in full</Link>
          <Link href="/galleries" className="link">The galleries, by system and by region</Link>
        </p>
      </Section>

      {/* ── How a job goes, with the specifier's line under step 2 ──────── */}
      <HowAJobGoes tone="warm" specifiers crews={false} cta={false} title={<>From the drawing <em>to the road</em></>} />

      {/* ── For the spec: closures, installation, regions, as a ledger.
          No warranty wording (6 Oct 2026, the client) ──────── */}
      <section className="bg-surface-warm pb-20 max-[700px]:pb-14" aria-label="For the specification">
        <div className="container-1280">
          <div className="sec-grid">
            <div className="sec-label">
              <span className="label">For the spec</span>
            </div>
            <dl className="sec-body spec-notes">
              <div>
                <dt>Closures</dt>
                <dd>Short. The pattern goes into the asphalt already there, and a TrafficPatterns crossing opens to traffic within minutes. Where a site could not close, the work on record went in over phased overnight windows.</dd>
              </div>
              <div>
                <dt>Installation</dt>
                <dd>By Square One&rsquo;s own crews, to the published specification.</dd>
              </div>
              <div>
                <dt>Regions</dt>
                <dd>Lower Mainland, from the office in Maple Ridge, and Vancouver Island, on its own line.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── The way in ──────── */}
      <Section id="specifiers-contact" label="Start a project" title={<>Send drawings <em>or a site address</em></>} wide>
        <div className="grid grid-cols-12 items-start gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
          <div className="col-span-6 max-[900px]:col-span-1">
            <p className="max-w-[52ch] text-ink-body [text-wrap:pretty]">
              Writing a specification and need a system matched to the traffic loading and the
              substrate? Send the drawings, or the address and a few photographs, and we will walk
              the site with the sample boards and follow with a written quote.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/contact" className="btn-primary">
                Get a quote
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
