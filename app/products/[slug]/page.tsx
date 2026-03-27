import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { products, getProductBySlug } from "@/lib/products"
import type { Metadata } from "next"

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
    title: `${product.name} | Square One Paving BC`,
    description: product.shortDescription,
  }
}

const categoryColour: Record<string, string> = {
  "Stamped Asphalt":    "bg-amber-50 text-amber-700 border-amber-200",
  "Decorative Coatings":"bg-orange-50 text-orange-700 border-orange-200",
  "Thermoplastic":      "bg-stone-50 text-stone-600 border-stone-200",
  "Surface Protection": "bg-teal-50 text-teal-700 border-teal-200",
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = products.filter(
    (p) => p.slug !== slug && p.serviceSlug === product.serviceSlug
  ).slice(0, 3)

  return (
    <main className="bg-[#FAFAFA]">

      {/* Hero */}
      <section className="relative min-h-[52vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 pb-14 pt-36 w-full">
          <Link href="/products" className="text-white/60 hover:text-white text-sm transition-colors mb-4 inline-block">
            ← All Products
          </Link>
          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded border mb-3 ${categoryColour[product.category]}`}>
            {product.category}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-3 max-w-2xl">
            {product.name}
          </h1>
          <p className="text-white/70 text-lg max-w-xl">{product.tagline}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 px-6 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#626262] text-base leading-relaxed">{product.fullDescription}</p>
        </div>
      </section>

      {/* Benefits + Applications */}
      <section className="py-16 px-6 sm:px-8 bg-[#F2EFE9]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-[10px] font-bold text-[#D66620] uppercase tracking-[0.2em] mb-4">Key Benefits</p>
            <ul className="space-y-3">
              {product.keyBenefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-[#333333]">
                  <span className="text-[#D66620] font-bold mt-0.5 flex-shrink-0">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#D66620] uppercase tracking-[0.2em] mb-4">Applications</p>
            <div className="flex flex-wrap gap-2">
              {product.applications.map((a) => (
                <span key={a} className="text-sm px-3 py-1.5 rounded-lg bg-white border border-[#E8E4DE] text-[#626262] font-medium">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {product.galleryImages.length > 1 && (
        <section className="py-16 px-6 sm:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <p className="text-[10px] font-bold text-[#D66620] uppercase tracking-[0.2em] mb-6">Gallery</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {product.galleryImages.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F2EFE9]">
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="33vw" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 sm:px-8 bg-[#32373C]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F0A04B] text-xs uppercase tracking-[0.22em] font-semibold mb-5">Ready to Specify?</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-5">
            Get a Free {product.name} Quote
          </h2>
          <p className="text-white/60 mb-10">
            Tell us about your project and we&apos;ll recommend the right specification and installation approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Request a Quote
              </span>
            </Link>
            <Link href={`/services/${product.serviceSlug}`}>
              <span className="inline-block border border-white/25 text-white hover:bg-white/10 px-10 py-4 rounded-lg font-semibold text-sm transition-colors">
                View Related Service
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 px-6 sm:px-8 bg-white border-t border-[#E8E4DE]">
          <div className="max-w-6xl mx-auto">
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">More Like This</p>
            <h2 className="text-2xl font-black text-[#333333] mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group bg-[#F2EFE9] rounded-xl border border-[#E8E4DE] overflow-hidden hover:border-[#D66620]/40 hover:shadow-lg transition-all"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-sm text-[#333333] group-hover:text-[#D66620] transition-colors mb-1">{p.name}</h3>
                    <p className="text-xs text-[#626262]">{p.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
