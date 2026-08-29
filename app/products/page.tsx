import Link from "next/link"
import type { Metadata } from "next"
import IndexImageHero from "@/components/IndexImageHero"

import { products, type Product } from "@/lib/products"

export const metadata: Metadata = {
  title: "Pavement Systems & Products | StreetPrint, StreetBond, MMAX | Square One Paving",
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
        title="Nine systems, four categories"
        lede="Every system we install, from pattern to protection. If it is not listed here, we do not install it."
        caption="Langley Events Centre · StreetBond"
      />

      <section className="relative overflow-hidden pt-20 pb-28 max-[700px]:pt-12 max-[700px]:pb-14">
        <div className="container-1280 relative z-[1]">
          <div className="flex flex-col gap-16">
            {groups.map((group) => (
              <section key={group.category}>
                <h2 className="label border-b border-[color:var(--hairline)] pb-[14px]">
                  {group.category}
                </h2>

                <div className="mt-7 grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[700px]:grid-cols-1">
                  {group.items.map((product) => (
                    <article key={product.slug} className="card card-panel min-h-[200px]">
                      <span className="tag self-start">{product.category}</span>

                      <h3 className="mt-[18px]">{product.name}</h3>

                      <p className="mt-2 text-[15px] leading-[1.55] text-[color:var(--ink-body)]">
                        {product.tagline}
                      </p>

                      <Link
                        href={`/products/${product.slug}`}
                        className="arrow-link mt-auto pt-6"
                        aria-label={`Explore ${product.name}`}
                      >
                        Explore system <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
