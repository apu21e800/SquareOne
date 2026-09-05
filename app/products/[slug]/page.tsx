import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"
import type { Metadata } from "next"

import { products, getProductBySlug } from "@/lib/products"
import { galleryWithFallback } from "@/lib/gallery"
import { resourceGroups } from "@/lib/resources"
import { getWork } from "@/lib/work"
import WorkGallery from "@/components/WorkGallery"

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
    description: product.shortDescription,
    alternates: { canonical: `https://squareonepaving.ca/products/${product.slug}` },
  }
}

/**
 * Product detail — docs/design-v2/Product Detail StreetBond.dc.html
 *
 *   Header      white   tag, wordmark, name, lede, CTAs
 *   Plate       —       full-bleed hero photograph
 *   Overview    band    full description
 *   Benefits    band    hairline list
 *   Where used  band    applications
 *   The work    band    Square One installs of this system, from lib/work.ts
 *   Colours     band    palette chart (only where one exists)
 *   Gallery     band    folder-first imagery
 *   Documents   band    the system's specifications, SDS and guides (lib/resources)
 *   Related     band    same service, other systems
 *
 * The slate close belongs to components/Footer.tsx — this page stays light
 * end to end.
 */

const GALLERY_LIMIT = 9

type BandTone = "white" | "warm"

type BandKey = "overview" | "benefits" | "applications" | "work" | "colours" | "gallery" | "documents" | "related"

/**
 * Bands alternate white / warm in document order. Optional bands drop out of
 * the sequence rather than out of the alternation, so two sections never share
 * a surface no matter which of them a given product renders.
 */
function Band({
  tone,
  id,
  children,
}: {
  tone: BandTone
  id?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={
        tone === "warm"
          ? "section border-y border-hairline bg-surface-warm"
          : "section bg-surface"
      }
    >
      <div className="container-1280">{children}</div>
    </section>
  )
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

  const bands: BandKey[] = ["overview", "benefits", "applications"]
  if (work.length > 0) bands.push("work")
  if (product.colorPaletteImage) bands.push("colours")
  if (gallery.length > 0) bands.push("gallery")
  if (docs.length > 0) bands.push("documents")
  if (related.length > 0) bands.push("related")

  const toneOf = (key: BandKey): BandTone =>
    bands.indexOf(key) % 2 === 0 ? "white" : "warm"

  const relatedTone = toneOf("related")

  return (
    <main className="bg-surface">
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
          </h1>
        </div>
      </section>

      {/* ── Header ──────── */}
      <section className="section bg-surface pt-16 pb-14 max-[700px]:pt-10">
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
      <Band tone={toneOf("overview")}>
        <div className="grid grid-cols-12 gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
          <div className="col-span-7 max-[900px]:col-span-1">
            <div className="eyebrow">Overview</div>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-[1.75] text-ink-body [text-wrap:pretty]">
              {product.fullDescription}
            </p>
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

      {/* ── Key benefits ──────── */}
      <Band tone={toneOf("benefits")}>
        <div className="eyebrow">Key benefits</div>

        <ul className="mt-9 grid grid-cols-2 gap-x-16 max-[700px]:grid-cols-1 max-[700px]:gap-x-0">
          {product.keyBenefits.map((benefit) => (
            <li
              key={benefit}
              className="border-t border-hairline py-[18px] text-[16px] font-medium leading-[1.5] text-ink"
            >
              {benefit}
            </li>
          ))}
        </ul>
      </Band>

      {/* ── Where it is specified ──────── */}
      <Band tone={toneOf("applications")}>
        <div className="eyebrow">Applications</div>

        <h2 className="mt-5 max-w-[22ch]">Where {product.name} is specified</h2>

        <div className="mt-10 grid grid-cols-3 gap-x-10 gap-y-8 max-[700px]:grid-cols-1">
          {product.applications.map((application) => (
            <div key={application} className="border-t border-hairline pt-4">
              <h3>{application}</h3>
            </div>
          ))}
        </div>
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
      {product.colorPaletteImage && (
        <Band tone={toneOf("colours")}>
          <div className="eyebrow">Colours</div>

          <h2 className="mt-5 max-w-[24ch]">Standard colours, plus custom matching</h2>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.colorPaletteImage}
            alt={`${product.name} colour chart`}
            className="mt-10 w-full max-w-[880px] rounded-[2px] border border-hairline bg-white"
          />

          <p className="mt-6 max-w-[56ch] text-[15px] leading-[1.6] text-ink-body">
            Standard colours can be specified straight off the chart. For anything outside it,
            send us a colour reference and we will match it.
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
          <ul className="mt-10 border-t border-hairline">
            {docs.map((doc) => (
              <li key={doc.href} className="border-b border-hairline">
                <a
                  href={doc.href}
                  download
                  className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-4 no-underline"
                >
                  <span className="text-[16px] font-medium text-ink group-hover:text-accent-deep">{doc.name}</span>
                  <span className="text-[13px] text-ink-muted">
                    {doc.type} &middot; {doc.size} &middot; PDF
                  </span>
                </a>
              </li>
            ))}
          </ul>
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
