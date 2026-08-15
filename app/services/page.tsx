import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Decorative Pavement Services BC | Square One Paving",
  description:
    "BC's trusted decorative pavement applicator. Stamped asphalt, decorative coatings, preformed thermoplastic, and vapor blasting services across the Lower Mainland and Vancouver Island.",
}

const services = [
  {
    num: "01",
    slug: "stamped-asphalt",
    name: "Stamped Asphalt",
    tagline: "Pattern, colour, and texture — built into the asphalt itself.",
    desc: "Custom StreetPrint patterns for crosswalks, driveways, plazas, and roundabouts. Durable, slip-resistant, and designed for BC's climate.",
    image: "/images/products/streetprint/streetprint-1.jpg",
    applications: ["Crosswalks", "Roundabouts", "Driveways", "Commercial Entries"],
    featured: false,
  },
  {
    num: "02",
    slug: "decorative-coatings",
    name: "Decorative Coatings",
    tagline: "Colour and safety for bike lanes, bus corridors, and parking lots.",
    desc: "StreetBond coatings in dozens of colours — retroreflective, anti-skid, and UV stable. The go-to for Vision Zero infrastructure across BC.",
    image: "/images/products/streetbond/streetbond-1.jpg",
    applications: ["Bike Lanes", "Bus Rapid Transit", "Parking Lots", "School Zones"],
    featured: false,
  },
  {
    num: "03",
    slug: "preformed-thermoplastic",
    name: "Preformed Thermoplastic",
    tagline: "Precision road markings with no spray drift, no inconsistency.",
    desc: "TrafficPatterns and DecoMark preformed systems for crosswalk markings, custom logos, arrows, and zone graphics. Fast deployment, long service life.",
    image: "/images/products/traffic-patterns/trafficpatterns-1.jpg",
    applications: ["Crosswalk Markings", "School Zones", "Custom Logos", "Stop Bars"],
    featured: false,
  },
  {
    num: "04",
    slug: "vapor-blasting",
    name: "Vapor Blasting",
    tagline: "Mobile surface prep — clean, safe, and environmentally responsible.",
    desc: "BC's only mobile vapor blasting service. Graffiti removal, road marking removal, and surface prep without silica dust or harsh chemicals.",
    image: "/images/products/streetbond/streetbond-1.jpg",
    applications: ["Road Marking Removal", "Graffiti Removal", "Surface Prep", "Marine"],
    featured: true,
  },
]

const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function ServicesPage() {
  return (
    <main style={{ background: "#F6F4F0" }}>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        className="relative bg-white"
        style={{ borderBottom: "1px solid #E2DDD8", paddingTop: "calc(68px + 5rem)", paddingBottom: "4rem" }}
      >
        <div
          className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
          style={{ background: "linear-gradient(to right, #C8601A, #E8895A)" }}
        />
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: "#C8601A" }} />
            <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}>
              What We Do
            </p>
          </div>
          <h1
            style={{
              fontSize: "clamp(3rem, 6vw, 6rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              color: "#111111",
            }}
          >
            Decorative Pavement{" "}<span style={{ color: "#C8601A" }}>Services.</span>
          </h1>
          <p className="text-[17px] mt-6 max-w-xl leading-relaxed" style={{ color: "#5A5A5A" }}>
            BC&apos;s decorative pavement studio since 2000. From stamped asphalt crosswalks to mobile
            vapor blasting — precision and durability on every surface we touch.
          </p>
        </div>
      </section>

      {/* ── Services list ──────────────────────────────────── */}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-12">
        <div style={{ background: "#E2DDD8", display: "flex", flexDirection: "column", gap: "1px" }}>
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block"
              style={{ background: i % 2 === 0 ? "white" : "#FAFAF8" }}
            >
              <div className="grid lg:grid-cols-[1fr_380px]">
                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-between min-h-[280px]">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span
                        className="font-black"
                        style={{ fontSize: "11px", letterSpacing: "0.22em", color: "#E2DDD8" }}
                      >
                        {service.num}/{String(services.length).padStart(2, "0")}
                      </span>
                      {service.featured && (
                        <span
                          className="font-bold uppercase px-2.5 py-1 rounded"
                          style={{
                            fontSize: "9px",
                            letterSpacing: "0.18em",
                            color: "#C8601A",
                            background: "rgba(200,96,26,0.08)",
                            border: "1px solid rgba(200,96,26,0.2)",
                          }}
                        >
                          Square One Exclusive
                        </span>
                      )}
                    </div>
                    <h2
                      className="mb-2 transition-colors duration-200 group-hover:text-[#C8601A]"
                      style={{
                        fontWeight: 800,
                        fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                        letterSpacing: "-0.04em",
                        lineHeight: 0.97,
                        color: "#111111",
                      }}
                    >
                      {service.name}
                    </h2>
                    <p className="mb-5" style={{ color: "#C8601A", fontSize: "0.9rem", fontWeight: 600 }}>
                      {service.tagline}
                    </p>
                    <p className="mb-6 max-w-md" style={{ color: "#5A5A5A", lineHeight: 1.7 }}>
                      {service.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.applications.map((app) => (
                        <span
                          key={app}
                          className="font-bold uppercase rounded"
                          style={{
                            fontSize: "9px",
                            letterSpacing: "0.14em",
                            padding: "6px 12px",
                            background: "#F6F4F0",
                            color: "#5A5A5A",
                            border: "1px solid #E2DDD8",
                          }}
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.10em] transition-all duration-200 group-hover:gap-3"
                    style={{ color: "#C8601A" }}
                  >
                    Explore Service <Arrow />
                  </span>
                </div>

                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ borderLeft: "1px solid #E2DDD8", minHeight: "280px" }}
                >
                  <Image
                    src={service.image}
                    alt={`${service.name} — Square One Paving BC`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width:1024px) 100vw, 380px"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, rgba(17,17,17,0.25) 0%, transparent 60%)" }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Trust band ─────────────────────────────────────── */}
      <div style={{ background: "#C8601A", padding: "1.25rem 0" }}>
        <div className="max-w-[1500px] mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-2">
          {["BC Decorative Pavement Studio", "Serving BC Since 2000", "Free Site Consultations", "Lower Mainland & Vancouver Island"].map((t) => (
            <span key={t} className="text-white text-xs font-bold uppercase tracking-wider">✓ {t}</span>
          ))}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 lg:px-10" style={{ background: "#0A0C10" }}>
        <div
          className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
          style={{ background: "linear-gradient(to right, #C8601A, #E8895A)" }}
        />
        <div className="max-w-[1500px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: "#E8895A" }} />
                <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#E8895A" }}>Not Sure Where to Start?</p>
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
                Tell us about{" "}<span style={{ color: "#E8895A" }}>your project.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <span
                  className="inline-flex items-center gap-2 px-10 py-4 text-sm font-bold tracking-[0.04em] uppercase text-white transition-all hover:brightness-110 whitespace-nowrap rounded-lg"
                  style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
                >
                  Get a Free Consultation
                </span>
              </Link>
              <a href="tel:6043098212">
                <span
                  className="inline-flex items-center gap-2 px-10 py-4 text-sm font-bold tracking-[0.04em] uppercase transition-all hover:bg-white/10 whitespace-nowrap rounded-lg"
                  style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)" }}
                >
                  604-466-9902
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
