import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import IndexImageHero from "@/components/IndexImageHero"

import { products, type Product } from "@/lib/products"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

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

export default function ProductsPage() {
  const groups = categoryOrder
    .map((category) => ({
      category,
      items: products.filter((product) => product.category === category),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <main className="bg-[color:var(--surface)]">
      <IndexImageHero
        src="/images/applications/crosswalks/new-westminster-agnes-greenway-crossing-with-bike-lane-trafficpatternsxd-01.jpg"
        alt="Three systems in one frame on the Agnes Greenway, New Westminster: a green coated bike lane, a white TrafficPatternsXD crossing and yellow tactile plates at the kerb, a tower beyond"
        eyebrow="Products"
        title="The right system for the surface"
        lede="Eight pavement systems, installed by Square One across the Lower Mainland and Vancouver Island — from pattern to protection. If it is not listed here, we do not install it."
        caption="New Westminster · Agnes Greenway · TrafficPatternsXD"
        imagePosition="center 78%"
      />

      {/* One photographic wall — eight systems, no half-empty category rows.
          The category reads inside each card; the mega menu teaches the
          taxonomy, this page sells the systems. Each card's photograph is
          described by lib/products.ts imageAlt, never as "installed by
          Square One" unless the record says so. */}
      <section className="relative overflow-hidden pt-20 pb-28 max-[700px]:pt-12 max-[700px]:pb-14">
        <div className="container-1280 relative z-[1]">
          <h2 className="sr-only">Stamped asphalt, decorative coatings, thermoplastic and surface protection systems</h2>
          <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            {groups.flatMap((group) => group.items).map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                aria-label={`Explore ${product.name}`}
                className="card group flex flex-col overflow-hidden rounded-[2px] border border-[color:var(--hairline)] bg-[color:var(--surface)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
                    className="object-cover"
                  />
                  <div aria-hidden="true" className="scrim scrim-light" />
                  <div className="caption">{product.category}</div>
                </div>

                <div className="flex flex-1 flex-col p-6 pt-5">
                  <h3>
                    {product.name}
                    {product.mark && <sup className="ml-[1px] text-[0.55em] font-normal">{product.mark}</sup>}
                  </h3>

                  <p className="mt-2 text-[15px] leading-[1.55] text-[color:var(--ink-body)]">
                    {product.tagline}
                  </p>

                  <span className="arrow-link mt-auto pt-6">
                    Explore system <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
