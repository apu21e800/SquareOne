import Link from "next/link"
import Image from "next/image"
import { products } from "@/lib/products"
import type { Metadata } from "next"

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

const categories = ["All", "Stamped Asphalt", "Decorative Coatings", "Thermoplastic", "Surface Protection"]

const categoryColour: Record<string, string> = {
  "Stamped Asphalt":    "bg-amber-50 text-amber-700 border-amber-200",
  "Decorative Coatings":"bg-orange-50 text-orange-700 border-orange-200",
  "Thermoplastic":      "bg-stone-50 text-stone-600 border-stone-200",
  "Surface Protection": "bg-teal-50 text-teal-700 border-teal-200",
}

export default function ProductsPage() {
  return (
    <main className="bg-[#FAFAFA]">

      {/* Header */}
      <section className="bg-white border-b border-[#E8E4DE] pt-28 pb-14 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-3">
            Material Systems — BC Applications
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 300, letterSpacing: "-0.035em", color: "#111111", lineHeight: 1.0 }} className="mb-4">
            Our Products
          </h1>
          <p className="text-lg text-[#626262] max-w-xl">
            Professional decorative pavement systems we install across British Columbia —
            engineered for Canadian conditions and backed by proven field performance.
          </p>
        </div>
      </section>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group bg-white rounded-2xl border border-[#E8E4DE] hover:border-[#C8601A]/40 hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden bg-[#F2EFE9]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${categoryColour[product.category]}`}>
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-black text-[#333333] mb-1.5 group-hover:text-[#C8601A] transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-[#C8601A] font-semibold mb-2">{product.tagline}</p>
                <p className="text-sm text-[#626262] line-clamp-2 leading-relaxed">{product.shortDescription}</p>
                <p className="text-[#C8601A] text-xs font-bold uppercase tracking-widest mt-3 group-hover:tracking-[0.2em] transition-all duration-200">
                  Explore →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="py-20 px-6 sm:px-8 bg-[#32373C]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F0A04B] text-xs uppercase tracking-[0.22em] font-semibold mb-5">Not Sure Which Product?</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-5">
            We&apos;ll Specify the Right System
          </h2>
          <p className="text-white/75 mb-10">
            Tell us about your project and we&apos;ll recommend the right product, application method, and specification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-[#C8601A] hover:bg-[#A84F15] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Get a Free Consultation
              </span>
            </Link>
            <Link href="/services">
              <span className="inline-block border border-white/25 text-white hover:bg-white/10 px-10 py-4 rounded-lg font-semibold text-sm transition-colors">
                View Our Services
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
