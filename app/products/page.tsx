import Link from "next/link"
import type { Metadata } from "next"
import IndexImageHero from "@/components/IndexImageHero"
import OpenerTitle from "@/components/ui/OpenerTitle"
import { getPageOpener } from "@/lib/page-content"
import Frame from "@/components/ui/Frame"

import { products, type Product } from "@/lib/products"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"
import { plainCase } from "@/lib/text"

const DESCRIPTION =
  "Eight pavement systems installed on the Lower Mainland and Vancouver Island: StreetPrint® stamped asphalt, StreetBond® coatings and thermoplastic markings."

export const metadata: Metadata = {
  title: "Pavement Systems We Install in BC",
  description: clampDescription(DESCRIPTION),
  keywords: [
    "StreetPrint BC",
    "StreetBond Vancouver",
    "TrafficPatterns crosswalk BC",
    "TrafficPatternsXD stamped asphalt BC",
    "decorative pavement systems BC",
    "stamped asphalt systems Vancouver",
    "thermoplastic road markings BC",
    "DuraShield pavement coating",
    "DecoMark BC",
    "decorative pavement installer BC",
  ],
  alternates: {
    canonical: `${SITE_URL}/products`,
  },
  openGraph: {
    title: "Pavement Systems We Install in BC | Square One Paving",
    description: clampDescription(DESCRIPTION),
    images: [{ url: "/images/og-image.png", width: 1200, height: 600, alt: "Square One Paving" }],
  },
}

/**
 * Group order for the index. Every product in lib/products carries exactly one
 * of these four categories — the order here is display only, the data is untouched.
 */
const categoryOrder: Product["category"][] = [
  "Stamped Asphalt",
  "Decorative Coatings",
  "Thermoplastic",
  "Surface Protection",
]

export default async function ProductsPage() {
  // The opener, with whatever the Studio says on top (lib/page-content.ts, 9 Oct 2026).
  const o = await getPageOpener("/products")
  const groups = categoryOrder
    .map((category) => ({
      category,
      items: products.filter((product) => product.category === category),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <main className="bg-[color:var(--surface)]">
      <IndexImageHero
        src={o.src}
        alt={o.alt}
        eyebrow="The systems we install"
        title={<OpenerTitle head={o.head} tail={o.tail} />}
        fit={o.fit}
        lede={o.lede}
        caption={o.caption}
        imagePosition={o.position}
      />

      {/* One photographic wall — eight systems, no half-empty category rows.
          26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the same eight, each
          a square-cornered frame with the name and its category UNDER it and
          one line beneath — no caption over the photograph, no chip, no
          arrow, no box; the whole cell is the link. The mega menu taught the
          taxonomy once; this page sells the systems. Each photograph is
          described by lib/products.ts imageAlt, never as "installed by
          Square One" unless the record says so. */}
      <section className="section bg-surface">
        <div className="container-1280">
          <h2 className="sr-only">Stamped asphalt, decorative coatings, thermoplastic and surface protection systems</h2>
          <ul data-reveal-group className="grid grid-cols-3 gap-x-7 gap-y-12 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1" role="list">
            {groups.flatMap((group) => group.items).map((product) => (
              <li key={product.slug} data-reveal className="relative">
                <Link
                  href={`/products/${product.slug}`}
                  aria-label={`${product.name}, the system`}
                  className="absolute inset-0 z-[2]"
                />
                <Frame
                  src={product.image}
                  alt={product.imageAlt}
                  aspect="aspect-[16/10]"
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
                  caption={plainCase(product.category)}
                />
                <h3 className="mt-3">
                  {product.name}
                  {product.mark && <sup className="ml-[1px] text-[0.55em] font-normal">{product.mark}</sup>}
                </h3>
                <p className="mt-2 max-w-[44ch] text-[16px] leading-[1.55] text-ink-body [text-wrap:pretty]">
                  {product.tagline}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
