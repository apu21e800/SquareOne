import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { products, getProductBySlug } from "@/lib/products"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

// Per-product key stats (3 big callouts per product)
const PRODUCT_STATS: Record<string, Array<{ value: string; label: string; sub: string }>> = {
  streetprint: [
    { value: "20+", label: "Year Service Life", sub: "Documented in BC installs" },
    { value: "12+", label: "Pattern Options", sub: "Including fully custom" },
    { value: "1–2", label: "Day Install", sub: "Minimal road closure" },
  ],
  streetbond: [
    { value: "50+", label: "Standard Colours", sub: "Plus custom Pantone" },
    { value: "20yr", label: "Colour Warranty", sub: "UV-stable formula" },
    { value: "24h", label: "Back to Traffic", sub: "After application" },
  ],
  trafficpatterns: [
    { value: "7+", label: "Year Service Life", sub: "vs. 1–2yr for paint" },
    { value: "0h", label: "Cure Time", sub: "Heat-applied, no wait" },
    { value: "100%", label: "Retroreflective", sub: "Glass beads embedded" },
  ],
  "trafficpatterns-xd": [
    { value: "10+", label: "Year Service Life", sub: "High-traffic environments" },
    { value: "BPN 65+", label: "Skid Resistance", sub: "Certified wet rating" },
    { value: "3×", label: "Outlasts Standard", sub: "In BRT conditions" },
  ],
  mmax: [
    { value: "60min", label: "Traffic-Ready", sub: "Fastest cure available" },
    { value: "−10°C", label: "Min Install Temp", sub: "Year-round in BC" },
    { value: "8+", label: "Year Service Life", sub: "In heavy-wear zones" },
  ],
  decomark: [
    { value: "Any", label: "Design Possible", sub: "From vector file" },
    { value: "Full", label: "Pantone Range", sub: "Exact colour match" },
    { value: "7+", label: "Year Service Life", sub: "Permanent thermoplastic" },
  ],
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} — We Install This in BC | Square One Paving`,
    description: `${product.shortDescription} Certified HUB Surface Systems applicator serving Vancouver & Victoria since 2000.`,
    alternates: { canonical: `https://squareonepaving.com/products/${slug}` },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const stats = PRODUCT_STATS[slug] ?? []
  const related = products
    .filter((p) => p.slug !== slug && p.serviceSlug === product.serviceSlug)
    .slice(0, 3)

  return (
    <main style={{ background: "#F6F4F0" }}>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
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
            style={{ background: "linear-gradient(to top, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.3) 55%, transparent 100%)" }}
          />
        </div>
        {/* Orange top accent line */}
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

      {/* ── “We Install This” Trust Bar ───────────────────────────── */}
      <div style={{ background: "#C8601A" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4">
          <div
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white font-bold tracking-[0.14em] uppercase"
            style={{ fontSize: "11px" }}
          >
            <span>✓ We Install This</span>
            <span className="hidden md:inline opacity-40">·</span>
            <span>✓ Certified HUB Applicator</span>
            <span className="hidden md:inline opacity-40">·</span>
            <span>✓ BC Since 2000</span>
            <span className="hidden md:inline opacity-40">·</span>
            <span>✓ Vancouver &amp; Victoria</span>
          </div>
        </div>
      </div>

      {/* ── Description ───────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-10 bg-white" style={{ borderBottom: "1px solid #E2DDD8" }}>
        <div className="max-w-[900px] mx-auto">
          <p className="text-base leading-relaxed" style={{ color: "#5A5A5A" }}>
            {product.fullDescription}
          </p>
        </div>
      </section>

      {/* ── 3 Key Stats ────────────────────────────────────────── */}
      {stats.length > 0 && (
        <section style={{ background: "#1C2026", borderBottom: "3px solid #C8601A" }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {stats.map((s) => (
                <div key={s.label} className="py-12 px-8 text-center">
                  <div
                    className="font-black mb-2"
                    style={{
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                      letterSpacing: "-0.04em",
                      lineHeight: 0.9,
                      color: "#E8895A",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="font-bold uppercase mb-1"
                    style={{ fontSize: "10px", letterSpacing: "0.2em", color: "white" }}
                  >
                    {s.label}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Benefits + Applications ────────────────────────────────── */}
      <section className="relative py-16 px-6 lg:px-10" style={{ background: "#F6F4F0" }}>
        <div
          className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
          style={{ background: "linear-gradient(to right, #C8601A, #E8895A)" }}
        />
        <div className="max-w-[1400px] mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-px"
            style={{ background: "#E2DDD8" }}
          >
            {/* Benefits */}
            <div className="bg-white p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: "#C8601A" }} />
                <p className="font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#C8601A" }}>
                  Key Benefits
                </p>
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

            {/* Applications */}
            <div className="bg-white p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: "#C8601A" }} />
                <p className="font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#C8601A" }}>
                  Applications
                </p>
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

      {/* ── BC Installs Gallery ──────────────────────────────────────── */}
      {product.galleryImages.length > 0 && (
        <section className="py-16 px-6 lg:px-10 bg-white" style={{ borderTop: "1px solid #E2DDD8" }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ background: "#C8601A" }} />
              <p className="font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#C8601A" }}>
                BC Installs
              </p>
            </div>
            <div
              className={`grid gap-4 ${
                product.galleryImages.length === 1
                  ? "grid-cols-1"
                  : product.galleryImages.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
              }`}
            >
              {product.galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden group"
                  style={{
                    aspectRatio: product.galleryImages.length === 1 ? "21/9" : "4/3",
                    background: "#F6F4F0",
                  }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} installed in BC — Square One Paving`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Quote CTA ──────────────────────────────────────────── */}
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
                <p
                  className="font-semibold uppercase"
                  style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#E8895A" }}
                >
                  Ready to Specify?
                </p>
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
              <p
                className="mt-5 text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)", maxWidth: "440px" }}
              >
                We install {product.name} across Metro Vancouver and Greater Victoria.
                Free site visit — written quote in 48 hours.
              </p>
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

      {/* ── Related Products ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 px-6 lg:px-10 bg-white" style={{ borderTop: "1px solid #E2DDD8" }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#C8601A" }} />
              <p
                className="font-semibold uppercase"
                style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}
              >
                More Like This
              </p>
            </div>
            <h2
              className="mb-8"
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.97,
                color: "#111111",
              }}
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
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-5">
                    <p
                      className="font-bold uppercase mb-1"
                      style={{ fontSize: "9px", letterSpacing: "0.18em", color: "#C8601A" }}
                    >
                      {p.category}
                    </p>
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
