import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"
import type { Metadata } from "next"

import { products, getProductBySlug } from "@/lib/products"
import type { Product } from "@/lib/products"
import { STREETBOND_COLOURS, COLOUR_RANGES } from "@/lib/palette"
import { galleryWithFallback } from "@/lib/gallery"
import { resourceGroups } from "@/lib/resources"
import { getWork, WORK_APPS } from "@/lib/work"
import type { WorkApp, WorkAppMeta } from "@/lib/work"
import WorkGallery from "@/components/WorkGallery"
import { SITE_URL } from "@/lib/site"
import { fitVars } from "@/lib/type"
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd"
import { clampDescription } from "@/lib/seo"

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
  trafficpatterns: "TrafficPatterns™ Preformed Thermoplastic | BC",
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
  }
}

/**
 * Product detail — docs/design-v2/Product Detail StreetBond.dc.html
 *
 *   Header      white   tag, wordmark, name, lede, CTAs
 *   Plate       —       full-bleed hero photograph
 *   Overview    band    description, key benefits and the spec panel
 *   Where used  SLATE   applications, each linked to its gallery
 *   The work    band    Square One installs of this system, from lib/work.ts
 *   Colours     band    the 52 StreetBond colours off HUB's chart (StreetBond only)
 *   Gallery     band    folder-first imagery
 *   Documents   band    the system's specifications, SDS and guides (lib/resources)
 *   Related     band    same service, other systems
 *
 * Applications is the page's one dark beat, so the page is not white end to
 * end; the slate close still belongs to components/Footer.tsx.
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

type BandTone = "white" | "warm" | "slate"

type BandKey = "overview" | "applications" | "work" | "colours" | "gallery" | "documents" | "related"

/**
 * Light bands alternate white / warm in document order. Optional bands drop out
 * of the sequence rather than out of the alternation, so two sections never
 * share a surface no matter which of them a given product renders.
 */
function Band({
  tone,
  id,
  tightTop = false,
  children,
}: {
  tone: BandTone
  id?: string
  /** The band directly under the header shares its white surface — one gap, not two. */
  tightTop?: boolean
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={[
        tone === "slate"
          ? "section relative overflow-hidden bg-surface-slate"
          : tone === "warm"
            ? "section border-y border-hairline bg-surface-warm"
            : "section bg-surface",
        tightTop ? "!pt-2" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container-1280 relative z-[1]">{children}</div>
    </section>
  )
}

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
    ? `${product.name} reference photograph — ${subject}`
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
  const work = getWork().filter((photo) =>
    photo.systems.some((system) => system === product.name || (product.name === "StreetBond" && system.startsWith("StreetBond"))),
  )
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

  // "applications" is fixed slate — the page's one dark beat — so it sits out of
  // the light alternation. Because it separates its neighbours, the bands either
  // side of it may share a surface without touching.
  const lightTones = new Map<BandKey, BandTone>()
  let next: BandTone = "white"
  for (const key of bands) {
    if (key === "applications") continue
    lightTones.set(key, next)
    next = next === "white" ? "warm" : "white"
  }

  const toneOf = (key: BandKey): BandTone => lightTones.get(key) ?? "white"

  const relatedTone = toneOf("related")

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
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: product.heroPosition ?? "center" }}
        />
        <div aria-hidden="true" className="scrim-rise" />
        <div aria-hidden="true" className="scrim-top" />
        <div className="container-1280 relative z-[1] w-full pb-14 max-[700px]:pb-10">
          <div className="eyebrow eyebrow-on-image">{product.category}</div>
          {/* fit-host + display-fit: the headline sizes itself against this
              column, so a seventeen-character product name comes down a
              step instead of spilling it (lib/type.ts). */}
          <div className="fit-host mt-5 max-w-[46rem]">
            <h1
              className={`display-xl display-fit text-white [text-wrap:balance]${product.mark ? "" : " stop"}`}
              style={fitVars(product.name)}
            >
              {product.name}
              {product.mark && <sup className="ml-[0.08em] text-[0.34em] font-medium align-super">{product.mark}</sup>}
            </h1>
          </div>
        </div>
      </section>

      {/* ── Header ──────── */}
      <section className="section bg-surface pt-16 pb-0 max-[700px]:pt-10">
        <div className="container-1280">
          <Link
            href="/products"
            className="text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
          >
            &larr;&nbsp;All products
          </Link>

          {/* The manufacturer wordmark used to sit here, and the row above it
              said "Installed by Square One since 2000" beside a chip that
              repeated the category already set in the hero. All three went on
              17 Sept: the client asked for the logos to come off, the line is
              the obvious one he named, and a decorative product logo on an
              installer's page blurs exactly the distinction this site works
              to keep — HUB manufactures, Square One installs. */}
          <p className="mt-8 max-w-[52ch] text-[21px] leading-[1.55] text-ink [text-wrap:pretty] max-[700px]:mt-6 max-[700px]:text-[18px]">
            {product.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-[14px]">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
            <Link href={`/services/${product.serviceSlug}`} className="btn-secondary">
              See the service
            </Link>
            {product.slug === "streetprint" && (
              <Link href="/patterns" className="arrow-link">
                The pattern library <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Overview + the spec panel (character pass, 5 Sept 2026): the
             description on the left, the system's facts on the right, so
             the band reads as a data sheet rather than a paragraph adrift. ── */}
      <Band tone={toneOf("overview")} tightTop>
        <div className="grid grid-cols-12 gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
          <div className="col-span-7 max-[900px]:col-span-1">
            <div className="eyebrow">Overview</div>
            <h2 className="mt-4 max-w-[24ch] [text-wrap:balance]">
              {overviewHeading[product.slug] ?? `What ${product.name} is, and how it is installed`}
            </h2>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-[1.75] text-ink-body [text-wrap:pretty]">
              {product.fullDescription}
            </p>

            {product.keyBenefits.length > 0 && (
              <>
                <div className="label mt-12">Key benefits</div>
                <ul className="mt-4 grid grid-cols-2 gap-x-10 max-[700px]:grid-cols-1 max-[700px]:gap-x-0">
                  {product.keyBenefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="border-t border-hairline py-[15px] text-[15px] font-medium leading-[1.5] text-ink"
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="card-panel col-span-5 self-start !p-0 max-[900px]:col-span-1 max-[900px]:max-w-[560px]">
            <div className="border-b border-hairline px-7 py-[18px] max-[700px]:px-5">
              <div className="label">Specification</div>
            </div>
            <dl className="m-0">
            {product.specs.map((row) => (
              <div
                key={row.k}
                className="grid grid-cols-[140px_1fr] items-baseline gap-x-6 border-b border-hairline px-7 py-[15px] max-[700px]:grid-cols-1 max-[700px]:gap-y-[3px] max-[700px]:px-5"
              >
                <dt className="label pt-[3px]">{row.k}</dt>
                <dd className="m-0 text-[15px] font-medium leading-[1.5] text-ink [text-wrap:pretty]">{row.v}</dd>
              </div>
            ))}
            </dl>
            <p className="border-t border-hairline px-7 pt-5 text-[13px] leading-[1.6] text-ink-muted max-[700px]:px-5">
              Figures are the manufacturer&rsquo;s, from the product&rsquo;s own data sheet.
              The manufacturer warrants the material; Square One installs the system and warrants the workmanship.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 px-7 pb-6 pt-4 max-[700px]:px-5">
              <Link href={`/services/${product.serviceSlug}`} className="arrow-link">
                The service <span aria-hidden="true">&rarr;</span>
              </Link>
              {docs.length > 0 && (
                <Link href={docsHref} className="arrow-link">
                  {docs.length} document{docs.length === 1 ? "" : "s"} <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Band>

      {/* ── Where it is specified — the page's one dark beat ──────── */}
      <Band tone="slate" id="applications">
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <div className="eyebrow eyebrow-on-image">Applications</div>
            <h2 className="mt-4 max-w-[22ch] text-white">Where {product.name} is specified</h2>
          </div>
          <p className="max-w-[36ch] text-[15px] leading-[1.6] text-[color:var(--ink-on-slate-muted)]">
            The surfaces Square One installs it on. The linked ones open the
            photographs on record for that kind of work.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-3 gap-x-10 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {product.applications.map((application, i) => {
            const gallery = galleryFor(application)
            return (
              <li
                key={application}
                className="border-t py-5"
                style={{ borderColor: "var(--hairline-slate)" }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[12px] font-medium tabular-nums text-[color:var(--ink-on-slate-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {gallery ? (
                    <Link
                      href={galleryHref(gallery)}
                      className="text-[17px] font-medium leading-[1.3] text-white no-underline transition-colors hover:text-accent"
                    >
                      {application}
                    </Link>
                  ) : (
                    <span className="text-[17px] font-medium leading-[1.3] text-white">
                      {application}
                    </span>
                  )}
                </div>
                {/* The photograph count came off 18 Sept — the client, on
                    DuraShield: "these numbers don't add up". A count reads as
                    a claim about volume, and the record is a sample. */}
              </li>
            )
          })}
        </ul>
      </Band>

      {/* ── The work on record ──────── */}
      {work.length > 0 && (
        <Band tone={toneOf("work")} id="work">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">Photographed on site</div>
              <h2 className="mt-4 [text-wrap:balance]">Square One&rsquo;s {product.name} installations across BC</h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] text-ink-muted">
              Square One installations of {product.name}, captioned with the community
              and the surface. Filter by region or by the systems installed alongside it.
            </p>
          </div>
          <div className="mt-10">
            <WorkGallery photos={work} initial={8} ariaLabel={`${product.name} installation photographs`} />
          </div>
        </Band>
      )}

      {/* ── Colour card — the system's own palette, page one, and the PDF ──────── */}
      {!showColours && colourCard && (
        <Band tone={toneOf("colours")} id="colours">
          <div className="grid grid-cols-12 items-center gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
            <div className="col-span-5 max-[900px]:col-span-1">
              <div className="eyebrow">Colours</div>
              <h2 className="mt-4 max-w-[22ch]">{product.name} colours, off the published card</h2>
              <p className="mt-5 max-w-[44ch] text-[15px] leading-[1.65] text-ink-body">
                {product.name} carries its own colour range, published by the manufacturer as a
                colour card. Name the colour on the drawing; the sample comes to the site visit,
                because a screen is not the material.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
                <a href={colourCard.href} target="_blank" rel="noopener" className="btn-primary">
                  Open the colour card
                </a>
                <Link href={docsHref} className="arrow-link">
                  All {product.name} documents <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
              <p className="mt-4 text-[12.5px] text-ink-muted">
                {colourCard.name} &middot; PDF{colourCard.size ? ` · ${colourCard.size}` : ""}
              </p>
            </div>
            <div className="col-span-7 max-[900px]:col-span-1">
              {colourPreview ? (
                <a
                  href={colourCard.href}
                  target="_blank"
                  rel="noopener"
                  className="card block overflow-hidden rounded-[2px] border border-hairline bg-white"
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
              ) : (
                <a href={colourCard.href} target="_blank" rel="noopener" className="card-panel block">
                  <span className="label">Colour card</span>
                  <span className="mt-3 block text-[18px] font-semibold">{colourCard.name}</span>
                </a>
              )}
            </div>
          </div>
        </Band>
      )}

      {/* ── Colours ──────── */}
      {showColours && (
        <Band tone={toneOf("colours")} id="colours">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">Colours</div>
              <h2 className="mt-4 max-w-[26ch]">
                Fifty-two standard StreetBond colours, plus custom matching
              </h2>
            </div>
            <p className="max-w-[34ch] text-[14px] leading-[1.65] text-ink-muted">
              Read off the published StreetBond colour chart. On-screen colour is a
              reference only &mdash; the sample board we bring to the site visit is
              what decides.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-10">
            {COLOUR_RANGES.map((range) => {
              const swatches = STREETBOND_COLOURS.filter((c) => c.range === range)
              if (swatches.length === 0) return null
              return (
                <div key={range}>
                  <div className="flex items-baseline gap-3 border-b border-hairline pb-3">
                    <span className="label">{range}</span>
                    <span className="text-[13px] text-ink-muted">{swatches.length}</span>
                  </div>
                  <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(108px,1fr))] gap-x-4 gap-y-6">
                    {swatches.map((c) => (
                      <li key={c.name}>
                        <span
                          aria-hidden="true"
                          className="block h-14 w-full rounded-[2px] border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="mt-2 block text-[12px] font-medium leading-[1.35] text-ink">
                          {c.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <p className="mt-10 max-w-[62ch] text-[15px] leading-[1.6] text-ink-body">
            Standard colours can be specified straight off the chart. For anything
            outside it, send us a colour reference and we will match it. The colour
            card itself is in{" "}
            <Link href={docsHref} className="font-semibold text-ink underline-offset-4 hover:underline">
              the document library
            </Link>
            .
          </p>
        </Band>
      )}

      {/* ── Gallery ──────── */}
      {gallery.length > 0 && (
        <Band tone={toneOf("gallery")} id="gallery">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2>{product.name} reference photography</h2>
              {/* Reference frames, not the record: the client flagged three of
                  these as "not ours" (19 Sept 2026), so the band says what it is. */}
              <p className="mt-3 max-w-[56ch] text-[14px] leading-[1.55] text-ink-muted">
                Reference photography of the system from the manufacturer.{" "}
                {work.length > 0
                  ? `Square One's own ${product.name} jobs are the frames on the record above.`
                  : `These frames show the system as the manufacturer photographs it, not Square One's own jobs.`}
              </p>
            </div>
            <Link href="/projects" className="arrow-link whitespace-nowrap">
              See our projects <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-[700px]:grid-cols-1">
            {gallery.map((src, i) => (
              <div
                key={src}
                className="thumb relative aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-stone"
              >
                <Image
                  src={src}
                  alt={galleryAlt(product, src, i)}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
                  className="object-cover"
                />
                <div aria-hidden="true" className="scrim scrim-light" />
                </div>
            ))}
          </div>
        </Band>
      )}

      {/* ── Documents ────────
          The rail of spec sheets, TDS and guides that used to sit here came
          off on 16 Sept 2026 at the client's request, made on three separate
          product pages in review: "I think documents only on the resources
          page, we can remove them here." The documents are not gone — every
          one of them is on /resources with its page-one preview, and this
          band now points there, anchored to this system. Keeping one library
          in one place is also the easier thing to keep current, which is the
          whole argument for hosting them at all.  ──────── */}
      {docs.length > 0 && (
        <Band tone={toneOf("documents")} id="documents">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">Specify it</div>
              <h2 className="mt-4">{product.name} specifications and data sheets</h2>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.65] text-ink-body [text-wrap:pretty]">
                {docs.length} {product.name} document{docs.length === 1 ? "" : "s"} &mdash; specification,
                technical data, safety data and colour &mdash; are kept with the rest of the
                library, where they are previewed page by page and checked against the
                manufacturer&rsquo;s current editions.
              </p>
            </div>
            <Link href={docsHref} className="btn-secondary whitespace-nowrap">
              Open the {product.name} documents
            </Link>
          </div>
        </Band>
      )}

      {/* ── Related systems ──────── */}
      {related.length > 0 && (
        <Band tone={relatedTone}>
          <h2>Related systems we install</h2>

          <div
            className={`mt-10 grid gap-6 max-[700px]:grid-cols-1 ${
              related.length >= 3 ? "grid-cols-3" : "grid-cols-2"
            }`}
          >
            {related.map((p) => (
              <article
                key={p.slug}
                className={`card card-panel min-h-[190px] ${
                  relatedTone === "warm" ? "bg-surface" : ""
                }`}
              >
                <div className="label">{p.category}</div>

                <h3 className="mt-[18px]">
                  {p.name}
                  {p.mark && <sup className="ml-[1px] text-[0.55em] font-normal">{p.mark}</sup>}
                </h3>

                <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.55] text-ink-body">
                  {p.tagline}
                </p>

                <Link
                  href={`/products/${p.slug}`}
                  className="arrow-link mt-auto pt-6"
                  aria-label={`Explore ${p.name}`}
                >
                  Explore <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>
            ))}
          </div>
        </Band>
      )}
    </main>
  )
}
