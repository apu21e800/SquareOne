import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import IndexImageHero from "@/components/IndexImageHero"

import { products, type Product } from "@/lib/products"

export const metadata: Metadata = {
  title: "Pavement Systems & Products | StreetPrint, StreetBond, MMAX",
  description:
    "Every material system Square One installs across BC — StreetPrint stamped asphalt, StreetBond decorative coatings, MMAX, TrafficPatterns thermoplastic, and DuraShield surface protection.",
  keywords: [
    "StreetPrint BC",
    "StreetBond Vancouver",
    "MMAX pavement coating BC",
    "TrafficPatterns crosswalk BC",
    "decorative pavement systems BC",
    "stamped asphalt systems Vancouver",
    "thermoplastic road markings BC",
    "DuraShield pavement protection",
    "DecoMark BC",
    "pavement products BC",
  ],
  alternates: {
    canonical: "https://squareonepaving.ca/products",
  },
  openGraph: {
    title: "Pavement Systems & Products | StreetPrint, StreetBond, MMAX | Square One Paving",
    description:
      "Every material system Square One installs across BC — StreetPrint stamped asphalt, StreetBond decorative coatings, MMAX, TrafficPatterns thermoplastic, and DuraShield surface protection.",
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
        src="/images/projects/langley-events-centre-streetbond/langley-events-centre-streetbond-01.jpg"
        alt="StreetBond Circle of Life installation at Langley Events Centre"
        eyebrow="Products"
        title="The right system for the surface"
        lede="Every system we install, from pattern to protection. If it is not listed here, we do not install it."
        caption="Langley Events Centre · StreetBond"
      />

      {/* One photographic wall — nine systems, no half-empty category rows.
          The category reads inside each card; the mega menu teaches the
          taxonomy, this page sells the systems. */}
      <section className="relative overflow-hidden pt-20 pb-28 max-[700px]:pt-12 max-[700px]:pb-14">
        <div className="container-1280 relative z-[1]">
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
                    alt={`${product.name} installed by Square One Paving`}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
                    className="object-cover"
                  />
                  <div aria-hidden="true" className="scrim scrim-light" />
                  <div className="caption">{product.category}</div>
                </div>

                <div className="flex flex-1 flex-col p-6 pt-5">
                  <h3>{product.name}</h3>

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
