import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

import { products, getProductBySlug } from "@/lib/products"
import type { Product } from "@/lib/products"
import { STREETBOND_COLOURS, COLOUR_RANGES } from "@/lib/palette"
import { galleryWithFallback } from "@/lib/gallery"
import { resourceGroups } from "@/lib/resources"
import { getWork, WORK_APPS } from "@/lib/work"
import type { WorkApp, WorkAppMeta } from "@/lib/work"
import WorkGallery from "@/components/WorkGallery"
import MaterialsBand from "@/components/sections/MaterialsBand"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import { SITE_URL } from "@/lib/site"
import { fitVars } from "@/lib/type"
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd"
import { clampDescription } from "@/lib/seo"
import { plainCase } from "@/lib/text"


/** The service each system is installed under, as the site names it. */
const SERVICE_NAME: Record<string, string> = {
  "stamped-asphalt": "Stamped asphalt",
  "decorative-coatings": "Decorative coatings",
  "preformed-thermoplastic": "Preformed thermoplastic",
  "vapor-blasting": "Vapour blasting",
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

/**
 * Page titles: the system with its mark, what it is, the region — the root
 * template appends "| Square One Paving". Kept to 45 characters or fewer so
 * the whole tag survives a search result. A product without an entry falls
 * back to "<Name> | Pavement Systems BC".
 */
const pageTitle: Record<string, string> = {
  streetprint: "StreetPrint® Stamped Asphalt | BC",
  streetbond: "StreetBond® Pavement Coating | BC",
  trafficpatterns: "TrafficPatterns™ Thermoplastic | BC",
  "trafficpatterns-xd": "TrafficPatternsXD™ Stamped Asphalt | BC",
  decomark: "DecoMark® Thermoplastic Graphics | BC",
  durashield: "DuraShield Pavement Coating | BC",
  duratherm: "DuraTherm® Thermoplastic Markings | BC",
  premark: "PreMark® Thermoplastic Markings | BC",
}

/** The overview heading, in searcher language; the H1 above it already carries the mark. */
const overviewHeading: Record<string, string> = {
  streetprint: "What StreetPrint stamped asphalt is, and how it goes in",
  streetbond: "What StreetBond pavement coating is, and where it goes",
  trafficpatterns: "What TrafficPatterns preformed thermoplastic is",
  "trafficpatterns-xd": "What TrafficPatternsXD is, and how it differs from StreetPrint",
  decomark: "What DecoMark custom thermoplastic is",
  durashield: "What DuraShield asphalt coating is, and what it protects",
  duratherm: "What DuraTherm thermoplastic marking is",
  premark: "What PreMark preformed markings are",
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: pageTitle[product.slug] ?? `${product.name} | Pavement Systems BC`,
    description: clampDescription(product.shortDescription),
    alternates: { canonical: `${SITE_URL}/products/${product.slug}` },
    openGraph: { title: product.name, description: clampDescription(product.shortDescription), images: [{ url: product.image, alt: product.imageAlt }] },
  }
}

/**
 * Product detail — docs/design-v2/Product Detail StreetBond.dc.html
 *
 *   Opener      —       full-bleed hero photograph, the name over it
 *   Header      paper   the tagline, the one button, the links
 *   Overview    band    description, key benefits and the specification list
 *   Where used  STONE   applications, each linked to its gallery
 *   The work    band    Square One installs of this system, from lib/work.ts
 *   Colours     band    the 52 StreetBond colours off the published chart (StreetBond only)
 *   Gallery     band    folder-first imagery, each frame captionless
 *   Documents   band    one line and a link into the library (lib/resources)
 *   Related     band    same service, other systems, as hairline rows
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.5, §3.7): every section keeps
 * its place and its facts; the surface changes. Section headers are the
 * `Section` primitive (label in the margin column, the one link underlined),
 * the specification is a plain two-column list without a box, the colours
 * are a row of square swatches named in the serif, the Documents band is one
 * line with an underlined link, the related systems are hairline rows. No
 * arrows, no chips, no text over a photograph, one orange button per view.
 */

const GALLERY_LIMIT = 9

/** The system's published colour chart, cropped to its swatches. Keyed by product slug. */
const COLOUR_CARD_IMAGE: Record<string, { preview: string; w: number; h: number }> = {
  "trafficpatterns": { preview: "/images/colour-cards/trafficpatterns.webp", w: 678, h: 680 },
  "decomark": { preview: "/images/colour-cards/decomark.webp", w: 688, h: 696 },
  "duratherm": { preview: "/images/colour-cards/duratherm.webp", w: 696, h: 591 },
  "premark": { preview: "/images/colour-cards/premark.webp", w: 231, h: 605 },
  "trafficpatterns-xd": { preview: "/images/colour-cards/trafficpatterns-xd.webp", w: 695, h: 632 },
}

type BandTone = "paper" | "warm"

type BandKey = "overview" | "applications" | "work" | "colours" | "gallery" | "documents" | "related"

/**
 * Applications that name one of the ten galleries get a link into it; anything
 * else renders plain. Matching is on the flattened label, so "Decorative
 * Driveways" finds Driveways and "Bus Priority Corridors" correctly finds
 * nothing rather than guessing. Two hints cover what the labels cannot say:
 * spray parks live in Parks & paths, and anything with "school" or "sports
 * court" in it lives in Schools & sports courts.
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

/** Display casing for brand and place tokens inside a reference photograph's filename. */
const TOKEN_CASE: Record<string, string> = {
  streetprint: "StreetPrint",
  streetbond: "StreetBond",
  streetbondsr: "StreetBond SR",
  trafficpatterns: "TrafficPatterns",
  trafficpatternsxd: "TrafficPatternsXD",
  decomark: "DecoMark",
  duratherm: "DuraTherm",
  durashield: "DuraShield",
  premark: "PreMark",
  ubc: "UBC",
  bc: "BC",
  ev: "EV",
  gvrd: "GVRD",
  yvr: "YVR",
}

/**
 * Alt text for a reference frame, read off its filename — the only caption
 * these files carry. "streetbond-multicolour-plaza-green-circles-01.jpg" reads
 * "StreetBond — Multicolour Plaza Green Circles"; a file named only for the
 * system ("streetprint-1.jpg") falls back to a numbered reference frame.
 */
function galleryAlt(product: Product, src: string, index: number): string {
  const base = decodeURIComponent(src.split("/").pop() ?? "").replace(/\.[a-z0-9]+$/i, "")
  const tokens = base.split(/[-_]+/).filter((t) => t.length > 0 && !/^\d+$/.test(t))
  const own = product.name.toLowerCase().replace(/[^a-z]/g, "")
  // Drop the leading product tokens ("trafficpatterns", "xd") so the subject reads alone.
  let i = 0
  while (i < tokens.length && own.startsWith(tokens.slice(0, i + 1).join("").toLowerCase())) i += 1
  const subject = tokens
    .slice(i)
    .map((t) => TOKEN_CASE[t.toLowerCase()] ?? t.charAt(0).toUpperCase() + t.slice(1))
    .join(" ")
  return subject
    ? `${product.name} reference photograph, ${subject}`
    : `${product.name} reference photograph ${index + 1}`
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = products
    .filter((p) => p.slug !== slug && p.serviceSlug === product.serviceSlug)
    .slice(0, 3)

  // A dropped-in public/images/products/<slug>/ folder wins; the curated array
  // in lib/products.ts is the fallback. The hero photograph is already on the
  // page as the plate, so it does not repeat in the grid.
  const gallery = galleryWithFallback("products", slug, product.galleryImages ?? [])
    .filter((src) => src !== product.image)
    .slice(0, GALLERY_LIMIT)

  // Square One's own photographs of this system, captioned with place and
  // subject. StreetBond also owns its SR variant. Empty for systems with no
  // installs on record (DuraShield) — the band simply does not render.
  const work = getWork()
    .filter((photo) =>
      photo.systems.some((system) => system === product.name || (product.name === "StreetBond" && system.startsWith("StreetBond"))),
    )
    // The opener's photograph is not repeated in the band of work below it.
    .filter((photo) => photo.src !== product.image)
  // The library groups documents by product name; its anchor slug is its own
  // ("traffic-patterns" for TrafficPatterns), so the link reads it from the group.
  const docGroup = resourceGroups.find((group) => group.product === product.name)
  const docs = docGroup?.docs ?? []
  const docsHref = `/resources#${docGroup?.slug ?? product.slug}`

  // The colour card is StreetBond's. The thermoplastic systems carry their own
  // colours, which HUB publishes separately — never assume this chart covers them.
  const showColours = product.name === "StreetBond"

  // The system's own colour card from the library, shown as page one with a
  // link to the PDF — for every system that is not StreetBond (which gets the
  // full chart below). 19 Sept 2026, the client on TrafficPatterns: "link
  // directly to colour chart somewhere or show the colour chart".
  const colourCard = !showColours
    ? docs.find((d) => d.type === "Colour card" && /colou?r (palette|guide|card)/i.test(d.name)) ?? docs.find((d) => d.type === "Colour card")
    : undefined
  // The chart itself, cropped to the swatches (public/images/colour-cards):
  // the manufacturer's block on the card is not shown on the site.
  const colourPreview = colourCard ? COLOUR_CARD_IMAGE[product.slug] : undefined

  const bands: BandKey[] = ["overview", "applications"]
  if (work.length > 0) bands.push("work")
  if (showColours || colourCard) bands.push("colours")
  if (gallery.length > 0) bands.push("gallery")
  if (docs.length > 0) bands.push("documents")
  if (related.length > 0) bands.push("related")

  // Light bands alternate paper / warm in document order. Optional bands drop
  // out of the sequence rather than out of the alternation, so two sections
  // never share a surface no matter which of them a given product renders.
  // "applications" has its own surface (stone), so it sits out of the
  // alternation; because it separates its neighbours, the bands either side
  // of it may share a surface without touching.
  const lightTones = new Map<BandKey, BandTone>()
  let next: BandTone = "paper"
  for (const key of bands) {
    if (key === "applications") continue
    lightTones.set(key, next)
    next = next === "paper" ? "warm" : "paper"
  }

  const toneOf = (key: BandKey): BandTone => lightTones.get(key) ?? "paper"

  const docCount = `${docs.length} document${docs.length === 1 ? "" : "s"}`

  // The description, split at its sentences: the first two open the page,
  // the rest fold (2 Oct 2026).
  const sentences = (product.fullDescription.match(/[^.!?]+[.!?]+(?=\s|$)/g) ?? [product.fullDescription]).map((t) => t.trim())
  const lead = sentences.slice(0, 2).join(" ")
  const rest = sentences.slice(2).join(" ")

  return (
    <main className="bg-surface">
      <JsonLd data={[breadcrumbSchema(SITE_URL, [{ name: "Products", path: "/products" }, { name: product.name, path: `/products/${product.slug}` }])]} />
      {/* ── 60vh opener — the product on real ground (Rockstar Part 4) ─ */}
      <section
        data-nav-on-image
        className="relative flex h-[60vh] min-h-[440px] items-end overflow-hidden bg-surface-slate"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: product.heroPosition ?? "center" }}
        />
        <div aria-hidden="true" className="scrim-rise" />
        <div aria-hidden="true" className="scrim-top" />
        <div className="container-1280 relative z-[1] w-full pb-14 max-[700px]:pb-10">
          {/* No eyebrow over the photograph (27 Sept 2026) — the openers
              are drawn the way the home hero is. The category is still
              said to a screen reader. */}
          <span className="sr-only">{product.category}</span>
          {/* fit-host + display-fit: the headline sizes itself against this
              column, so a seventeen-character product name comes down a
              step instead of spilling it (lib/type.ts). */}
          <div className="fit-host max-w-[46rem]">
            <h1
              className="display-xl display-fit text-white [text-wrap:balance]"
              style={fitVars(product.name)}
            >
              {product.name}
              {product.mark && <sup className="ml-[0.08em] text-[0.34em] font-medium align-super">{product.mark}</sup>}
            </h1>
          </div>
        </div>
      </section>

      {/* ── Header ──────── */}
      <section className="section bg-surface pt-16 pb-14 max-[700px]:pt-10 max-[700px]:pb-10">
        <div className="container-1280">
          {/* 28 Sept 2026 (Vern: "S1 is an installer, services over
              products"): the page opens on the service the system belongs
              to, not on the catalogue. */}
          <p className="label">
            Installed by Square One under our{" "}
            <Link href={`/services/${product.serviceSlug}`} className="link not-italic">
              {SERVICE_NAME[product.serviceSlug] ?? "services"}
            </Link>{" "}
            service
          </p>

          {/* The manufacturer wordmark used to sit here, and the row above it
              said "Installed by Square One since 2000" beside a chip that
              repeated the category already set in the hero. All three went on
              17 Sept: the client asked for the logos to come off, the line is
              the obvious one he named, and a decorative product logo on an
              installer's page blurs exactly the distinction this site works
              to keep — HUB manufactures, Square One installs. */}
          <p className="lede mt-8 max-w-[52ch] [text-wrap:pretty] max-[700px]:mt-6">
            {product.tagline}
          </p>

          {/* One button and one link (2 Oct 2026: the row carried four; the
              menu reaches the catalogue and the pattern band sits below). */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/contact" className="btn-primary">
              Get a quote
            </Link>
            <Link href={`/services/${product.serviceSlug}`} className="link">
              {SERVICE_NAME[product.serviceSlug] ?? "The service"}, the service
            </Link>
          </div>
        </div>
      </section>

      {/* ── Overview + the specification (character pass, 5 Sept 2026): the
             description on the left, the system's facts on the right as a
             plain two-column list, so the band reads as a data sheet rather
             than a paragraph adrift. ── */}
      <Section
        label="Overview"
        title={overviewHeading[product.slug] ?? `What ${product.name} is, and how it is installed`}
        tone={toneOf("overview")}
        wide
      >
        {/* 2 Oct 2026 (Vern: "this page is very wordy… look at all that
            text"): the description opens on its first two sentences, the
            rest folds under "More about …" the way the questions do, and the
            key-benefits list is gone from the page (every line of it is a
            row of the specification beside it; the data stays in
            lib/products.ts for the schema and llms.txt). */}
        <div className="grid grid-cols-12 gap-x-10 gap-y-12 max-[900px]:grid-cols-1">
          <div className="col-span-7 max-[900px]:col-span-1">
            <p className="standfirst max-w-[44ch] [text-wrap:pretty]">{lead}</p>
            {rest && (
              <details className="group mt-8 border-t border-b border-hairline">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[16px] [&::-webkit-details-marker]:hidden">
                  <span className="text-[16px] font-semibold text-ink">More about {product.name}</span>
                  <span aria-hidden="true" className="flex-shrink-0 text-[22px] font-normal leading-none text-ink-muted">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">&minus;</span>
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-6 text-[16px] leading-[1.65] text-ink-body [text-wrap:pretty]">{rest}</p>
              </details>
            )}
          </div>

          <div className="col-span-5 max-[900px]:col-span-1 max-[900px]:max-w-[560px]">
            <span className="label">Specification</span>
            <dl className="spec mt-4">
              {product.specs.map((row) => (
                <div key={row.k} className="contents">
                  <dt>{row.k}</dt>
                  <dd className="[text-wrap:pretty]">{row.v}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-hairline pt-4 text-[14.5px] leading-[1.6] text-ink-muted">
              The manufacturer&rsquo;s figures, from its data sheet.
            </p>
            <p className="mt-5 flex flex-wrap gap-x-7 gap-y-2">
              <Link href={`/services/${product.serviceSlug}`} className="link">
                The service
              </Link>
              {docs.length > 0 && (
                <Link href={docsHref} className="link">
                  {docCount}
                </Link>
              )}
            </p>
          </div>
        </div>
      </Section>

      {/* ── Where it is specified ────────
             Was the page's one dark beat; on stone since 21 Sept 2026 — the
             last slate section outside the footer and the photograph
             openers (Vern, 19 Sept: "too much dark mode… a clean light
             theme; the footer and the cinema backdrops are fine"). */}
      <Section
        id="applications"
        label="Applications"
        title={<>Where {product.name} <em>goes</em></>}
        intro="The surfaces we install it on; the linked ones open the photographs."
        tone="stone"
        wide
      >
        <ul className="grid grid-cols-3 gap-x-10 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {product.applications.map((application) => {
            const gallery = galleryFor(application)
            return (
              <li key={application} className="border-t border-hairline py-4">
                {gallery ? (
                  <Link href={galleryHref(gallery)} className="link">
                    {plainCase(application)}
                  </Link>
                ) : (
                  <span className="text-[16px] text-ink-body">{plainCase(application)}</span>
                )}
                {/* The photograph count came off 18 Sept — the client, on
                    DuraShield: "these numbers don't add up". A count reads as
                    a claim about volume, and the record is a sample. */}
              </li>
            )
          })}
        </ul>
      </Section>

      {/* ── Patterns and colours, on the two stamped systems (2 Oct 2026,
             Vern: "access to the pattern sheets from the StreetPrint page…
             and TPXD page") ──────── */}
      {(product.slug === "streetprint" || product.slug === "trafficpatterns-xd") && <MaterialsBand tone="paper" />}

      {/* ── The work on record ──────── */}
      {work.length > 0 && (
        <Section
          id="work"
          label="Photographed on site"
          title={<>{product.name}, <em>installed across BC</em></>}
          tone={toneOf("work")}
          wide
        >
          <WorkGallery photos={work} initial={8} ariaLabel={`${product.name} installation photographs`} />
        </Section>
      )}

      {/* ── Colour card — the system's own palette, page one, and the PDF ──────── */}
      {!showColours && colourCard && (
        <Section
          id="colours"
          label="Colours"
          title={<>{product.name} colours, <em>off the published card</em></>}
          tone={toneOf("colours")}
          wide
        >
          <div className="grid grid-cols-12 gap-x-10 gap-y-10 max-[900px]:grid-cols-1">
            <div className="col-span-5 max-[900px]:col-span-1">
              <p className="max-w-[44ch] text-ink-body [text-wrap:pretty]">
                {product.name} carries its own colour range, published by the manufacturer as a
                colour card. Name the colour on the drawing; the sample comes to the site visit,
                because a screen is not the material.
              </p>
              <p className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
                <a href={colourCard.href} target="_blank" rel="noopener" className="link">
                  Open the colour card
                </a>
                <Link href={docsHref} className="link">
                  All {product.name} documents
                </Link>
              </p>
            </div>
            <div className="col-span-7 max-[900px]:col-span-1">
              {colourPreview ? (
                <figure className="m-0">
                  <a
                    href={colourCard.href}
                    target="_blank"
                    rel="noopener"
                    className="block border border-hairline bg-white"
                    aria-label={`Open ${colourCard.name} (PDF)`}
                  >
                    <Image
                      src={colourPreview.preview}
                      alt={`Page one of the ${product.name} colour card`}
                      width={colourPreview.w}
                      height={colourPreview.h}
                      sizes="(max-width: 900px) 100vw, 700px"
                      className="h-auto w-full"
                      unoptimized
                    />
                  </a>
                  <figcaption className="cap">
                    {colourCard.name} &middot; PDF{colourCard.size ? ` · ${colourCard.size}` : ""}
                  </figcaption>
                </figure>
              ) : (
                <a href={colourCard.href} target="_blank" rel="noopener" className="block border-t border-hairline pt-5">
                  <span className="label">Colour card</span>
                  <span className="mt-2 block text-[18px] font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {colourCard.name}
                  </span>
                  <span className="cap block">
                    PDF{colourCard.size ? ` · ${colourCard.size}` : ""}
                  </span>
                </a>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* ── Colours ──────── */}
      {showColours && (
        <Section
          id="colours"
          label="Colours"
          title={<>Fifty-two standard colours, <em>plus custom matching</em></>}
          intro="Read off the published StreetBond colour chart. On-screen colour is a reference only: the sample board we bring to the site visit is what decides."
          tone={toneOf("colours")}
          wide
        >
          <div className="flex flex-col gap-12">
            {COLOUR_RANGES.map((range) => {
              const swatches = STREETBOND_COLOURS.filter((c) => c.range === range)
              if (swatches.length === 0) return null
              return (
                <div key={range}>
                  <div className="flex items-baseline gap-3 border-t border-hairline pt-4">
                    <span className="label">{plainCase(range)}</span>
                    <span className="text-[14.5px] italic text-ink-muted">{swatches.length}</span>
                  </div>
                  <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-x-4 gap-y-6" role="list">
                    {swatches.map((c) => (
                      <li key={c.name}>
                        <span
                          aria-hidden="true"
                          className="block aspect-square w-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="mt-2 block text-[12.5px] italic leading-[1.3] text-ink-muted">
                          {c.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <p className="mt-12 max-w-[62ch] border-t border-hairline pt-6 text-ink-body [text-wrap:pretty]">
            Standard colours can be specified straight off the chart. For anything
            outside it, send us a colour reference and we will match it. The colour
            card itself is in{" "}
            <Link href={docsHref} className="link">
              the document library
            </Link>
            .
          </p>
        </Section>
      )}

      {/* ── The manufacturer's reference photography came off on 28 Sept 2026
          (QA before the client review): the set mixed in frames of Square
          One's own jobs under a "from the manufacturer" label, and it was
          the most catalogue-like block on an installer's page. The record
          above carries the photographs. ──────── */}

      {/* ── Documents ────────
          The rail of spec sheets, TDS and guides that used to sit here came
          off on 16 Sept 2026 at the client's request, made on three separate
          product pages in review: "I think documents only on the resources
          page, we can remove them here." The documents are not gone — every
          one of them is on /resources with its page-one preview, and this
          band is one line that points there, anchored to this system.
          Keeping one library in one place is also the easier thing to keep
          current, which is the whole argument for hosting them at all.  ──────── */}
      {docs.length > 0 && (
        <Section
          id="documents"
          label="Documents"
          title={<>{product.name} <em>documents</em></>}
          link={{ href: docsHref, label: "Open the documents" }}
          intro={`${docCount}: the specification, technical data, safety data and the colour card, in the library.`}
          tone={toneOf("documents")}
        />
      )}

      {/* ── Related systems — hairline rows: the category as the small voice,
             the name, one line; the whole row is the link. ──────── */}
      {related.length > 0 && (
        <Section title={<>Related <em>systems</em></>} tone={toneOf("related")} wide>
          <ul role="list">
            {related.map((p) => (
              <li
                key={p.slug}
                className="relative grid grid-cols-12 gap-x-10 gap-y-1 border-t border-hairline py-6 last:border-b max-[700px]:grid-cols-1"
              >
                <Link
                  href={`/products/${p.slug}`}
                  aria-label={`${p.name}, the system`}
                  className="absolute inset-0 z-[2]"
                />
                <span className="label col-span-3 pt-1 max-[700px]:col-span-1">{plainCase(p.category)}</span>
                <div className="col-span-9 min-w-0 max-[700px]:col-span-1">
                  <h3>
                    {p.name}
                    {p.mark && <sup className="ml-[1px] text-[0.55em] font-normal">{p.mark}</sup>}
                  </h3>
                  <p className="mt-2 max-w-[60ch] text-[16px] leading-[1.55] text-ink-body [text-wrap:pretty]">
                    {p.tagline}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </main>
  )
}
