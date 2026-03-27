import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { products, getProductBySlug } from "@/lib/products"
import { buildMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return buildMetadata({
    title: product.name,
    description: product.description,
    slug: `products/${slug}`,
  })
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 sm:px-8 pb-12">
          <p className="text-[#F0A04B] text-xs font-semibold uppercase tracking-[0.2em] mb-3">HUB Surface Systems</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3">{product.name}</h1>
          <p className="text-white/70 text-lg">{product.tagline}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold text-[#D66620] uppercase tracking-widest mb-4">About This Product</p>
            <p className="text-[#333333] text-lg leading-relaxed mb-10">{product.description}</p>
            <Link href="/contact">
              <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-8 py-4 rounded-lg font-bold transition-colors">
                Get a Quote for {product.name}
              </span>
            </Link>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#D66620] uppercase tracking-widest mb-4">Applications</p>
            <ul className="space-y-2">
              {product.applications.map((app) => (
                <li key={app} className="flex items-center gap-3 text-[#626262]">
                  <div className="w-1.5 h-1.5 bg-[#D66620] rounded-full flex-shrink-0" />
                  {app}
                </li>
              ))}
            </ul>
            <div className="mt-10 bg-[#F2EFE9] rounded-xl p-6">
              <p className="text-xs font-semibold text-[#626262] uppercase tracking-widest mb-2">Installed By</p>
              <p className="font-bold text-[#333333]">Square One Paving</p>
              <p className="text-sm text-[#626262]">Authorized HUB Surface Systems Applicator — Western Canada</p>
              <Link href="/contact" className="text-[#D66620] text-sm font-semibold mt-3 block hover:underline">
                Request Installation →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
