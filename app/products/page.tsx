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
    slug: "streetprint",
    num: "01",
    category: "Stamped Asphalt",
    name: "StreetPrint",
    desc: "The only stamped asphalt system engineered for Canadian winters. Cobblestone, brick, herringbone, and slate patterns pressed directly into hot-mix asphalt — structurally identical to standard asphalt, visually transformative.",
    stat: { value: "20+", label: "yr service life" },
    tags: ["Driveways", "Crosswalks", "Plazas", "Town Centres"],
    image: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
  },
  {
    slug: "streetbond",
    num: "02",
    category: "Decorative Coating",
    name: "StreetBond",
    desc: "Pantone-matched surface coating for asphalt and concrete. UV-stable, slip-tested, road-salt resistant — used on BC transit corridors for colour-separated bike lanes, bus lanes, and branded crosswalks.",
    stat: { value: "50+", label: "colours available" },
    tags: ["Bike Lanes", "Crosswalks", "Driveways", "Bus Corridors"],
    image: "/images/applications/bus-bike-lanes/red-bus-lane-long-perspective-01.jpg",
  },
  {
    slug: "trafficpatterns",
    num: "03",
    category: "Preformed Thermoplastic",
    name: "TrafficPatterns",
    desc: "Factory-fabricated thermoplastic markings used by BC municipalities coast to coast. Heat-applied with no curing time — crosswalks, symbols, and regulatory markings that adhere to any pavement surface.",
    stat: { value: "7+", label: "yr service life" },
    tags: ["Crosswalks", "Symbols", "Lane Lines", "Regulatory"],
    image: "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  },
  {
    slug: "trafficpatterns-xd",
    num: "04",
    category: "Thermoplastic XD",
    name: "TrafficPatterns XD",
    desc: "The high-wear variant for BRT corridors, turning lanes, and high-frequency intersections. BPN 65+ skid resistance, tested to withstand years of bus tire abrasion without colour loss or edge lift.",
    stat: { value: "10+", label: "yr service life" },
    tags: ["Intersections", "BRT Corridors", "High-Wear", "Bus Pads"],
    image: "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  },
  {
    slug: "mmax",
    num: "05",
    category: "MMA Resin",
    name: "MMAX",
    desc: "Methyl methacrylate resin — bonds at −10°C and opens to traffic in 60 minutes. The standard for red bus and bike lane systems where downtime is measured in hours, not days.",
    stat: { value: "60min", label: "to open to traffic" },
    tags: ["Bus Lanes", "Bike Lanes", "Year-Round Install", "Fast Cure"],
    image: "/images/applications/bus-bike-lanes/red-bus-lane-long-perspective-01.jpg",
  },
  {
    slug: "decomark",
    num: "06",
    category: "Custom Graphics",
    name: "DecoMark",
    desc: "Large-format custom graphics for murals, Pride crosswalks, Indigenous street art, and landmark placemaking. Full Pantone range, permanent thermoplastic medium, installed directly in the road surface.",
    stat: { value: "Any", label: "design in thermoplastic" },
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

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="bg-white"
        style={{ borderBottom: "1px solid #E2DDD8", paddingTop: "calc(68px + 5rem)", paddingBottom: "4rem" }}
      >
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <p className="font-bold uppercase mb-5" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#C8601A" }}>
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

      {/* ── Card grid ──────────────────────────────────────── */}
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "#E2DDD8", border: "1px solid #E2DDD8" }}
        >
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group bg-white block overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={p.image}
                  alt={`${p.name} — Square One Paving BC`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }}
                />
                {/* Stat badge */}
                <div className="absolute bottom-4 left-4">
                  <span
                    className="block font-black text-white"
                    style={{ fontSize: "2.1rem", lineHeight: 1, letterSpacing: "-0.03em" }}
                  >
                    {p.stat.value}
                  </span>
                  <span
                    className="text-white/70 font-semibold uppercase"
                    style={{ fontSize: "9px", letterSpacing: "0.18em" }}
                  >
                    {p.stat.label}
                  </span>
                </div>
                {/* Number counter top-right */}
                <div
                  className="absolute top-4 right-4 font-black"
                  style={{ fontSize: "11px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)" }}
                >
                  {p.num}/06
                </div>
              </div>

              {/* Content */}
              <div className="p-7 lg:p-9">
                <p
                  className="font-bold uppercase mb-4"
                  style={{ fontSize: "9px", letterSpacing: "0.22em", color: "#C8601A" }}
                >
                  {p.category}
                </p>
                <h2
                  className="mb-4 transition-colors duration-200 group-hover:text-[#C8601A]"
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    letterSpacing: "-0.035em",
                    lineHeight: 0.95,
                    color: "#111111",
                  }}
                >
                  {p.name}
                </h2>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: "#5A5A5A" }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-bold uppercase"
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.14em",
                        padding: "5px 10px",
                        background: "#F6F4F0",
                        color: "#5A5A5A",
                        border: "1px solid #E2DDD8",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.10em] transition-all duration-200 group-hover:gap-3"
                  style={{ color: "#C8601A" }}
                >
                  See Installs <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Authorized applicator strip ──────────────────────── */}
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pb-10">
        <div
          className="flex flex-wrap items-center justify-center gap-3 px-8 py-5 bg-white"
          style={{ border: "1px solid #E2DDD8" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#C8601A] flex-shrink-0" />
          <span className="text-[#5A5A5A] text-xs font-bold tracking-[0.15em] uppercase text-center">
            Authorized HUB Surface Systems Applicator · British Columbia Since 2000 · Vancouver &amp; Victoria
          </span>
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
