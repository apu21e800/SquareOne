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

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = products.filter(
    (p) => p.slug !== slug && p.serviceSlug === product.serviceSlug
  ).slice(0, 3)

  return (
    <main style={{ background: "#F6F4F0" }}>

      {/* ── Hero ────────────────────────────────────────────── */}
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
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.25) 55%, transparent 100%)" }}
          />
        </div>
        <div
          className="absolute left-6 lg:left-10 top-0 w-16 h-[3px] z-10"
          style={{ background: "linear-gradient(to right, #C8601A, #E8895A)" }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pb-14 pt-36 w-full">
          <Link
            href="/products"
            className="transition-colors mb-4 inline-block text-sm font-medium hover:text-[#E8895A]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            ← All Products
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#E8895A" }} />
            <span
              className="font-bold uppercase"
              style={{ fontSize: "9px", letterSpacing: "0.22em", color: "#E8895A" }}
            >
              {product.category}
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              color: "white",
              maxWidth: "800px",
            }}
          >
            {product.name}
          </h1>
          <p className="text-[17px] mt-5 max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            {product.tagline}
          </p>
        </div>
      </section>

      {/* ── Description ─────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-10 bg-white" style={{ borderBottom: "1px solid #E2DDD8" }}>
        <div className="max-w-[900px] mx-auto">
          <p className="text-base leading-relaxed" style={{ color: "#5A5A5A" }}>{product.fullDescription}</p>
        </div>
      </section>

      {/* ── Benefits + Applications ─────────────────────────── */}
      <section className="relative py-16 px-6 lg:px-10" style={{ background: "#F6F4F0" }}>
        <div
          className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
          style={{ background: "linear-gradient(to right, #C8601A, #E8895A)" }}
        />
        <div className="max-w-[1400px] mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "1px", background: "#E2DDD8" }}
          >
            <div className="bg-white p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: "#C8601A" }} />
                <p className="font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#C8601A" }}>Key Benefits</p>
              </div>
              <ul className="space-y-3">
                {product.keyBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: "#111111" }}>
                    <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: "#C8601A" }}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: "#C8601A" }} />
                <p className="font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#C8601A" }}>Applications</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((a) => (
                  <span
                    key={a}
                    className="text-sm px-3 py-1.5 font-medium"
                    style={{ background: "#F6F4F0", border: "1px solid #E2DDD8", color: "#5A5A5A" }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ─────────────────────────────────────────── */}
      {product.galleryImages.length > 1 && (
        <section className="py-16 px-6 lg:px-10 bg-white" style={{ borderTop: "1px solid #E2DDD8" }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#C8601A" }} />
              <p className="font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#C8601A" }}>Gallery</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {product.galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "4/3", background: "#F6F4F0" }}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="33vw" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 lg:px-10" style={{ background: "#1C2026" }}>
        <div
          className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
          style={{ background: "linear-gradient(to right, #C8601A, #E8895A)" }}
        />
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: "#E8895A" }} />
                <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#E8895A" }}>Ready to Specify?</p>
              </div>
              <h2
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.97,
                  color: "white",
                }}
              >
                Get a Free{" "}
                <em style={{ fontStyle: "italic", fontWeight: 700, color: "#E8895A" }}>{product.name}</em>
                <br />Quote.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <span
                  className="inline-flex items-center gap-2 px-10 py-4 text-sm font-bold tracking-[0.04em] uppercase text-white transition-all hover:brightness-110 whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
                >
                  Request a Quote
                </span>
              </Link>
              <Link href={`/services/${product.serviceSlug}`}>
                <span
                  className="inline-flex items-center gap-2 px-10 py-4 text-sm font-bold tracking-[0.04em] uppercase transition-all hover:bg-white/10 whitespace-nowrap"
                  style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.65)" }}
                >
                  View Related Service
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related products ────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 px-6 lg:px-10 bg-white" style={{ borderTop: "1px solid #E2DDD8" }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#C8601A" }} />
              <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}>More Like This</p>
            </div>
            <h2
              className="mb-8"
              style={{ fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 0.97, color: "#111111" }}
            >
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)]"
                  style={{ background: "#F6F4F0", border: "1px solid #E2DDD8" }}
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3
                      className="mb-1 transition-colors group-hover:text-[#C8601A]"
                      style={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.02em", color: "#111111" }}
                    >
                      {p.name}
                    </h3>
                    <p className="text-xs" style={{ color: "#5A5A5A" }}>{p.tagline}</p>
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
