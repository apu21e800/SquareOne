import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"
import type { Metadata } from "next"

import { products, getProductBySlug } from "@/lib/products"
import { STREETBOND_COLOURS, COLOUR_RANGES } from "@/lib/palette"
import { galleryWithFallback } from "@/lib/gallery"
import { resourceGroups } from "@/lib/resources"
import DocumentRail from "@/components/documents/DocumentRail"
import { getWork, WORK_APPS } from "@/lib/work"
import type { WorkAppMeta } from "@/lib/work"
import WorkGallery from "@/components/WorkGallery"
import { SITE_URL } from "@/lib/site"
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd"
import { clampDescription } from "@/lib/seo"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} | Pavement Systems BC`,
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
 * nothing rather than guessing.
 */
function galleryFor(application: string): WorkAppMeta | undefined {
  const key = application.toLowerCase().replace(/[^a-z]/g, "")
  return WORK_APPS.find((app) => {
    const label = app.label.toLowerCase().replace(/[^a-z]/g, "")
    return key === label || key.includes(label) || label.includes(key)
  })
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
  const docs = resourceGroups.find((group) => group.product === product.name)?.docs ?? []

  // The colour card is StreetBond's. The thermoplastic systems carry their own
  // colours, which HUB publishes separately — never assume this chart covers them.
  const showColours = product.name === "StreetBond"

  const bands: BandKey[] = ["overview", "applications"]
  if (work.length > 0) bands.push("work")
  if (showColours) bands.push("colours")
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
          alt={`${product.name} installed by Square One Paving`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="scrim-rise" />
        <div aria-hidden="true" className="scrim-top" />
        <div className="container-1280 relative z-[1] w-full pb-12">
          <div className="eyebrow eyebrow-on-image">{product.category}</div>
          <h1 className="display-xl stop mt-4 max-w-[16ch] text-white [text-wrap:balance]">
            {product.name}
            {product.mark && <sup className="ml-[0.08em] text-[0.38em] font-medium align-super">{product.mark}</sup>}
          </h1>
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

          <div className="mt-7 flex flex-wrap items-center gap-[14px]">
            <span className="tag">{product.category}</span>
            <span className="text-[13px] text-ink-muted">
              Installed by Square One since 2000
            </span>
          </div>

          {product.logoImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.logoImage}
              alt={`${product.name} wordmark`}
              className="mt-8 h-9 w-auto object-contain max-[700px]:h-8"
            />
          )}

          <p className="mt-2 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body [text-wrap:pretty] max-[700px]:text-[17px]">
            {product.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-[14px]">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
            <Link href={`/services/${product.serviceSlug}`} className="btn-secondary">
              See the service
            </Link>
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
            <dl className="m-0">
            {[
              { k: "System", v: product.name },
              { k: "Category", v: product.category },
              { k: "Installed by", v: "Square One Paving, since 2000" },
              { k: "Applications", v: `${product.applications.length} listed below` },
              ...(work.length > 0
                ? [{ k: "On record", v: `${work.length} site photograph${work.length === 1 ? "" : "s"}` }]
                : []),
              ...(docs.length > 0
                ? [{ k: "Documents", v: `${docs.length} in the specification library` }]
                : []),
            ].map((row) => (
              <div
                key={row.k}
                className="grid grid-cols-[120px_1fr] items-baseline gap-x-6 border-b border-hairline px-7 py-[13px] last:border-b-0 max-[700px]:grid-cols-[100px_1fr] max-[700px]:px-5"
              >
                <dt className="label">{row.k}</dt>
                <dd className="m-0 text-[15px] font-medium leading-[1.45] text-ink">{row.v}</dd>
              </div>
            ))}
            </dl>
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline px-7 py-5 max-[700px]:px-5">
              <Link href={`/services/${product.serviceSlug}`} className="arrow-link">
                The service <span aria-hidden="true">&rarr;</span>
              </Link>
              {docs.length > 0 && (
                <Link href="/resources" className="arrow-link">
                  Specifications <span aria-hidden="true">&rarr;</span>
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
            The surfaces Square One installs it on, each one linked to the
            photographs on record.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-3 gap-x-10 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {product.applications.map((application, i) => {
            const gallery = galleryFor(application)
            const count = gallery ? getWork().filter((p) => p.app === gallery.slug).length : 0
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
                      href={`/applications/${gallery.slug}`}
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
                {gallery && count > 0 && (
                  <span className="mt-1 block pl-8 text-[13px] text-[color:var(--ink-on-slate-muted)]">
                    {count} photographs
                  </span>
                )}
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
              <h2 className="mt-4 [text-wrap:balance]">{product.name} on the record</h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] text-ink-muted">
              {work.length} Square One installations of {product.name} across BC, captioned with the
              community and the surface. Filter by region or by the systems installed alongside it.
            </p>
          </div>
          <div className="mt-10">
            <WorkGallery photos={work} initial={8} ariaLabel={`${product.name} installation photographs`} />
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
                Fifty-two standard colours, plus custom matching
              </h2>
            </div>
            <p className="max-w-[34ch] text-[14px] leading-[1.65] text-ink-muted">
              Read off HUB&rsquo;s StreetBond colour chart. On-screen colour is a
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
            outside it, send us a colour reference and we will match it.
          </p>
        </Band>
      )}

      {/* ── Gallery ──────── */}
      {gallery.length > 0 && (
        <Band tone={toneOf("gallery")} id="gallery">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <h2>{product.name} in place</h2>
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
                  alt={`${product.name} installation ${i + 1}`}
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

      {/* ── Documents ──────── */}
      {docs.length > 0 && (
        <Band tone={toneOf("documents")} id="documents">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">Specify it</div>
              <h2 className="mt-4">{product.name} documents</h2>
            </div>
            <Link href="/resources" className="arrow-link whitespace-nowrap">
              The full library <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="mt-10">
            <DocumentRail docs={docs} product={product.name} />
          </div>
        </Band>
      )}

      {/* ── Related systems ──────── */}
      {related.length > 0 && (
        <Band tone={relatedTone}>
          <h2>Related systems</h2>

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

                <h3 className="mt-[18px]">{p.name}</h3>

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
