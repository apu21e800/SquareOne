import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Surface Systems — Products | Square One Paving BC",
  description:
    "Six proven pavement systems installed across BC — StreetPrint, StreetBond, TrafficPatterns, TrafficPatterns XD, MMAX, and DecoMark. Certified applicators since 1999.",
  alternates: { canonical: "https://squareonepaving.com/products" },
}

const PRODUCTS = [
  {
    num: "01",
    slug: "streetprint",
    category: "Stamped Asphalt",
    name: "StreetPrint",
    desc: "The only stamped asphalt system engineered for Canadian winters. Cobblestone, brick, herringbone, and slate patterns pressed directly into hot-mix asphalt — structurally identical to standard asphalt, visually transformative.",
    tags: ["Driveways", "Crosswalks", "Plazas", "Town Centres"],
    image: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
  },
  {
    num: "02",
    slug: "streetbond",
    category: "Decorative Coating",
    name: "StreetBond",
    desc: "Pantone-matched surface coating for asphalt and concrete. Used on BC transit corridors for colour-separated bike lanes, bus lanes, and branded crosswalks. UV-stable, slip-tested, and road-salt resistant.",
    tags: ["Bike Lanes", "Crosswalks", "Driveways", "Bus Corridors"],
    image: "/images/applications/bus-bike-lanes/red-bus-lane-long-perspective-01.jpg",
  },
  {
    num: "03",
    slug: "trafficpatterns",
    category: "Preformed Thermoplastic",
    name: "TrafficPatterns",
    desc: "Factory-fabricated thermoplastic markings used by BC municipalities coast to coast. Heat-applied with no curing time — crosswalks, symbols, and regulatory markings that adhere to any pavement surface.",
    tags: ["Crosswalks", "Symbols", "Lane Lines", "Regulatory"],
    image: "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  },
  {
    num: "04",
    slug: "trafficpatternsxd",
    category: "Thermoplastic XD",
    name: "TrafficPatterns XD",
    desc: "The high-wear variant for BRT corridors, turning lanes, and high-frequency intersections. BPN 65+ skid resistance, tested to withstand years of bus tire abrasion without colour loss or edge lift.",
    tags: ["Intersections", "BRT Corridors", "High-Wear", "Bus Pads"],
    image: "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  },
  {
    num: "05",
    slug: "mmax",
    category: "MMA Resin",
    name: "MMAX",
    desc: "Methyl methacrylate resin — the only pavement coating that bonds at −10°C and opens to traffic in 60 minutes. The standard for red bus and bike lane systems where downtime is measured in hours, not days.",
    tags: ["Bus Lanes", "Bike Lanes", "Year-Round Install", "Fast Cure"],
    image: "/images/applications/bus-bike-lanes/red-bus-lane-long-perspective-01.jpg",
  },
  {
    num: "06",
    slug: "decomark",
    category: "Custom Graphics",
    name: "DecoMark",
    desc: "Large-format custom graphics for murals, Pride crosswalks, Indigenous street art, and landmark placemaking. Full Pantone range, permanent thermoplastic medium, installed directly in the road surface.",
    tags: ["Murals", "Pride Crosswalks", "Indigenous Art", "Public Art"],
    image: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
  },
] as const

const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function ProductsPage() {
  return (
    <main style={{ background: "#F6F4F0" }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="bg-white"
        style={{
          borderBottom: "1px solid #E2DDD8",
          paddingTop: "calc(68px + 5rem)",
          paddingBottom: "4rem",
        }}
      >
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <p
            className="font-bold uppercase mb-5"
            style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#C8601A" }}
          >
            Surface Systems
          </p>
          <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-end">
            <h1
              style={{
                fontWeight: 800,
                fontSize: "clamp(3rem, 7vw, 7rem)",
                letterSpacing: "-0.045em",
                lineHeight: 0.9,
                color: "#111111",
              }}
            >
              Purpose-built<br />for BC.
            </h1>
            <div>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#5A5A5A" }}>
                Certified applicators for six proven systems — engineered for Canadian
                winters, tested on BC roads, and backed by 25 years of field installs.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-6 text-sm font-bold transition-all hover:gap-3"
                style={{ color: "#C8601A", letterSpacing: "0.04em" }}
              >
                Request a Spec Sheet <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product list ───────────────────────────────────── */}
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div
          className="divide-y"
          style={{ border: "1px solid #E2DDD8", borderColor: "#E2DDD8", background: "#E2DDD8", gap: "1px" }}
        >
          {PRODUCTS.map((p, i) => (
            <div
              key={p.slug}
              className="group"
              style={{ background: i % 2 === 0 ? "white" : "#FAFAF8" }}
            >
              <div className="grid lg:grid-cols-[1fr_360px]">
                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-between min-h-[280px]">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span
                        className="font-black"
                        style={{ fontSize: "11px", letterSpacing: "0.22em", color: "#E2DDD8" }}
                      >
                        {p.num}/{String(PRODUCTS.length).padStart(2, "0")}
                      </span>
                      <span
                        className="font-bold uppercase"
                        style={{ fontSize: "9px", letterSpacing: "0.22em", color: "#C8601A" }}
                      >
                        {p.category}
                      </span>
                    </div>
                    <h2
                      className="mb-5 transition-colors duration-200 group-hover:text-[#C8601A]"
                      style={{
                        fontWeight: 800,
                        fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                        letterSpacing: "-0.035em",
                        lineHeight: 0.95,
                        color: "#111111",
                      }}
                    >
                      {p.name}
                    </h2>
                    <p
                      className="mb-6"
                      style={{ color: "#5A5A5A", lineHeight: 1.7, maxWidth: "520px" }}
                    >
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-bold uppercase"
                          style={{
                            fontSize: "9px",
                            letterSpacing: "0.14em",
                            padding: "6px 12px",
                            background: "#F6F4F0",
                            color: "#5A5A5A",
                            border: "1px solid #E2DDD8",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/products/${p.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.10em] transition-all duration-200 group-hover:gap-3"
                    style={{ color: "#C8601A" }}
                  >
                    See Installs <Arrow />
                  </Link>
                </div>

                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    borderLeft: "1px solid #E2DDD8",
                    minHeight: "280px",
                  }}
                >
                  <Image
                    src={p.image}
                    alt={`${p.name} — Square One Paving BC`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 360px"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, rgba(17,17,17,0.25) 0%, transparent 60%)" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-28 px-6 sm:px-10" style={{ background: "#0A0C10" }}>
        <div className="max-w-[1500px] mx-auto lg:px-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <p
                className="font-bold uppercase mb-4"
                style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#E8895A" }}
              >
                Have a project in mind?
              </p>
              <h2
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  color: "white",
                }}
              >
                Tell us what you&apos;re building.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <span
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-[0.04em] uppercase text-white transition-all hover:brightness-110 whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
                >
                  Request a Quote
                </span>
              </Link>
              <Link href="/contact">
                <span
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-[0.04em] uppercase transition-all hover:bg-white/10 whitespace-nowrap"
                  style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.65)" }}
                >
                  Download Spec Sheets
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
