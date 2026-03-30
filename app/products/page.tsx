import Link from "next/link"
import Image from "next/image"
import { products } from "@/lib/products"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HUB Surface Systems Products | Square One Paving BC",
  description:
    "Square One Paving installs the complete HUB Surface Systems product portfolio — StreetPrint, StreetBond, MMAX, TrafficPatterns, and more across BC.",
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
          <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">
            HUB Surface Systems — Authorized Applicator
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <h1 className="text-5xl sm:text-6xl font-black text-[#333333] mb-4 leading-tight">
                Our Products
              </h1>
              <p className="text-lg text-[#626262] max-w-xl">
                We install the complete HUB Surface Systems product portfolio — the same systems
                specified by 500+ Canadian municipalities for 30+ years.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="relative w-28 h-8">
                <Image
                  src="/images/hub-logo-orange-grey.png"
                  alt="HUB Surface Systems"
                  fill
                  className="object-contain object-right"
                  sizes="112px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group bg-white rounded-2xl border border-[#E8E4DE] hover:border-[#D66620]/40 hover:shadow-xl transition-all overflow-hidden"
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
                <h3 className="text-lg font-black text-[#333333] mb-1.5 group-hover:text-[#D66620] transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-[#D66620] font-semibold mb-2">{product.tagline}</p>
                <p className="text-sm text-[#626262] line-clamp-2 leading-relaxed">{product.shortDescription}</p>
                <p className="text-[#D66620] text-xs font-bold uppercase tracking-widest mt-3 group-hover:tracking-[0.2em] transition-all duration-200">
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
              <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
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
