import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { services, getServiceBySlug } from "@/lib/services"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

const serviceImages: Record<string, string> = {
  "stamped-asphalt": "/images/products/streetprint/streetprint-1.jpg",
  "decorative-coatings": "/images/products/streetbond/streetbond-1.jpg",
  "preformed-thermoplastic": "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  "vapor-blasting": "/images/products/streetbond/streetbond-1.jpg",
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: `${service.name} | Square One Paving BC`,
    description: service.shortDescription,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const heroImage = serviceImages[service.slug] ?? "/images/products/streetprint/streetprint-1.jpg"

  return (
    <main style={{ background: "#F6F4F0" }}>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={service.name}
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
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pb-16 pt-36 w-full">
          <Link
            href="/services"
            className="transition-colors mb-4 inline-block text-sm font-medium hover:text-[#E8895A]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            ← All Services
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#E8895A" }} />
            <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#E8895A" }}>Service</p>
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
            {service.name}
          </h1>
          <p className="text-[17px] mt-5 max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            {service.tagline}
          </p>
        </div>
      </section>

      {/* ── Description ─────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-10 bg-white" style={{ borderBottom: "1px solid #E2DDD8" }}>
        <div className="max-w-[900px] mx-auto">
          <p className="text-base leading-relaxed" style={{ color: "#5A5A5A" }}>{service.fullDescription}</p>
        </div>
      </section>

      {/* ── Details grid ───────────────────────────────────── */}
      <section className="relative py-16 px-6 lg:px-10" style={{ background: "#F6F4F0" }}>
        <div
          className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
          style={{ background: "linear-gradient(to right, #C8601A, #E8895A)" }}
        />
        <div className="max-w-[1400px] mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            style={{ gap: "1px", background: "#E2DDD8" }}
          >
            {[
              { label: "Products Included", items: service.productsIncluded, icon: "◈" },
              { label: "Applications", items: service.applications, icon: "◉" },
              { label: "Ideal Clients", items: service.idealClients, icon: "◧" },
              { label: "Key Benefits", items: service.benefits, icon: "✓" },
            ].map((col) => (
              <div key={col.label} className="p-8 bg-white">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-6 h-px" style={{ background: "#C8601A" }} />
                  <h3 className="font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#C8601A" }}>
                    {col.label}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm flex items-start gap-2" style={{ color: "#111111" }}>
                      <span className="flex-shrink-0 mt-0.5 font-bold" style={{ color: "#C8601A" }}>{col.icon}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#E8895A" }}>Ready to Get Started?</p>
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
                <em style={{ fontStyle: "italic", fontWeight: 700, color: "#E8895A" }}>{service.name}</em>
                <br />Consultation.
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
              <a href="tel:6043098212">
                <span
                  className="inline-flex items-center gap-2 px-10 py-4 text-sm font-bold tracking-[0.04em] uppercase transition-all hover:bg-white/10 whitespace-nowrap"
                  style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.65)" }}
                >
                  604-309-8212
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Services ──────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-10 bg-white" style={{ borderTop: "1px solid #E2DDD8" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#C8601A" }} />
            <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}>More Services</p>
          </div>
          <h2
            className="mb-8"
            style={{ fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 0.97, color: "#111111" }}
          >
            What Else We Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)]"
                  style={{ background: "#F6F4F0", border: "1px solid #E2DDD8" }}
                >
                  <h3
                    className="mb-2 transition-colors group-hover:text-[#C8601A]"
                    style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em", color: "#111111" }}
                  >
                    {s.name}
                  </h3>
                  <p className="text-sm" style={{ color: "#5A5A5A" }}>{s.tagline}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
