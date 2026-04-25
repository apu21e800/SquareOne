import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Square One Paving | BC's Decorative Pavement Specialists",
  description:
    "BC's trusted decorative pavement studio since 2000. Serving the Lower Mainland and Vancouver Island.",
}

const differentiators = [
  {
    num: "01",
    title: "BC Climate Expertise",
    desc: "All our systems are designed and tested for BC's unique conditions — wet winters, freeze-thaw cycles, and UV exposure.",
  },
  {
    num: "02",
    title: "Certified Installation",
    desc: "Every crew member is trained and certified on the decorative pavement systems we install — backed by manufacturer warranties.",
  },
  {
    num: "03",
    title: "Lower Mainland + Island",
    desc: "We serve the entire Lower Mainland, Vancouver Island, and surrounding BC communities — with mobile vapor blasting equipment.",
  },
  {
    num: "04",
    title: "25+ Years Experience",
    desc: "Since 2000, we've been installing decorative pavement systems for municipalities, developers, and contractors across BC.",
  },
  {
    num: "05",
    title: "Full Service Capability",
    desc: "From surface prep (vapor blasting) to final installation — we handle the entire project lifecycle under one roof.",
  },
  {
    num: "06",
    title: "Vision Zero Aligned",
    desc: "Our crosswalk and bike lane systems support BC's Vision Zero goals with high-visibility, retroreflective, and durable solutions.",
  },
]

const timeline = [
  { year: "2000", event: "Square One Paving founded in BC" },
  { year: "2005", event: "Added professional decorative pavement systems to portfolio" },
  { year: "2012", event: "Expanded to Vancouver Island operations" },
  { year: "2018", event: "Added mobile vapor blasting service" },
  { year: "2024", event: "100+ municipal and commercial projects completed" },
]

export default function AboutPage() {
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
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: "#C8601A" }} />
            <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}>
              About Square One Paving
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
            BC&apos;s Trusted Decorative
            <br />
            Pavement{" "}
            <em style={{ fontStyle: "italic", fontWeight: 700, color: "#C8601A" }}>Specialists.</em>
          </h1>
          <p className="text-[17px] mt-6 max-w-xl leading-relaxed" style={{ color: "#5A5A5A" }}>
            Since 2000, Square One Paving has been the partner BC municipalities, developers, and contractors
            call when a surface needs to perform — and look good doing it.
          </p>
        </div>
      </section>

      {/* ── Story + Mission ──────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 bg-white" style={{ borderBottom: "1px solid #E2DDD8" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: "#C8601A" }} />
                <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}>Our Story</p>
              </div>
              <div className="space-y-4 leading-relaxed text-sm" style={{ color: "#5A5A5A" }}>
                <p>
                  Square One Paving was founded with a simple goal: bring
                  high-quality decorative pavement systems to BC communities.
                  Too often, municipalities and developers were limited to
                  generic paint solutions that faded quickly in BC&apos;s wet climate.
                </p>
                <p>
                  Over 25 years we&apos;ve built a portfolio of professional
                  decorative pavement systems — stamped asphalt, decorative
                  coatings, preformed thermoplastic, and vapor blasting. Each
                  system is engineered for Canadian conditions and backed by
                  manufacturer warranties.
                </p>
                <p>
                  Today, Square One operates across the Lower Mainland and
                  Vancouver Island, serving municipalities, TransLink, BC
                  Transit, developers, and contractors. Our vapor blasting
                  equipment is mobile — we come to you.
                </p>
              </div>

              {/* Timeline */}
              <div className="mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px" style={{ background: "#C8601A" }} />
                  <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}>Milestones</p>
                </div>
                <div className="space-y-4">
                  {timeline.map((item) => (
                    <div key={item.year} className="flex items-start gap-5">
                      <span
                        className="flex-shrink-0 font-black w-10"
                        style={{ fontSize: "12px", letterSpacing: "0.1em", color: "#C8601A" }}
                      >
                        {item.year}
                      </span>
                      <div className="flex-1 flex items-start gap-3 pt-0.5">
                        <div className="w-1.5 h-1.5 flex-shrink-0 mt-1.5" style={{ background: "#C8601A" }} />
                        <p className="text-sm" style={{ color: "#5A5A5A" }}>{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {/* Mission */}
              <div
                className="p-8 mb-8"
                style={{ background: "#F6F4F0", borderLeft: "3px solid #C8601A" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px" style={{ background: "#C8601A" }} />
                  <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}>Our Mission</p>
                </div>
                <blockquote
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    color: "#111111",
                  }}
                >
                  &ldquo;Build surfaces that perform as good as they look — and last.&rdquo;
                </blockquote>
                <p className="text-sm leading-relaxed mt-5" style={{ color: "#5A5A5A" }}>
                  We believe BC&apos;s public spaces deserve better than fading paint and cracking concrete.
                  Our decorative pavement systems combine aesthetics with durability — crosswalks that
                  stay bright, bike lanes that stay visible, and surfaces that hold up year after year.
                </p>
              </div>

              {/* Hero image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/products/streetprint/streetprint-1.jpg"
                  alt="Square One Paving work"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(17,17,17,0.55) 0%, transparent 50%)" }} />
                <div className="absolute bottom-5 left-5">
                  <span className="text-white text-sm font-bold">StreetPrint Stamped Asphalt</span>
                  <p className="text-white/60 text-xs mt-0.5">Lower Mainland, BC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Square One ─────────────────────────────────── */}
      <section className="relative py-20 px-6 lg:px-10" style={{ background: "#F6F4F0" }}>
        <div
          className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
          style={{ background: "linear-gradient(to right, #C8601A, #E8895A)" }}
        />
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#C8601A" }} />
              <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}>Our Difference</p>
            </div>
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.97,
                color: "#111111",
              }}
            >
              Why{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "#C8601A" }}>Square One.</em>
            </h2>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "1px", background: "#E2DDD8" }}
          >
            {differentiators.map((d, i) => (
              <div
                key={d.title}
                className="p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)]"
                style={{ background: i % 2 === 0 ? "white" : "#FAFAF8" }}
              >
                <span
                  className="font-black block mb-4"
                  style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#E2DDD8" }}
                >
                  {d.num}
                </span>
                <div className="w-6 h-[2px] mb-4" style={{ background: "#C8601A" }} />
                <h3
                  className="mb-3"
                  style={{ fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.02em", color: "#111111" }}
                >
                  {d.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5A5A5A" }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service area + contact ──────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 bg-white" style={{ borderTop: "1px solid #E2DDD8" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8" style={{ background: "#F6F4F0", border: "1px solid #E2DDD8" }}>
              <div className="h-[2px] w-10 mb-5" style={{ background: "#C8601A" }} />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px" style={{ background: "#C8601A" }} />
                <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}>Service Area</p>
              </div>
              <h3
                className="mb-4"
                style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.03em", color: "#111111" }}
              >
                Lower Mainland &amp; Vancouver Island
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#5A5A5A" }}>
                We serve communities across BC — Vancouver, Surrey, Burnaby, Richmond,
                Victoria, Nanaimo, Ladysmith, and surrounding areas. Mobile vapor blasting
                equipment goes wherever the job is.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Greater Vancouver", "Fraser Valley", "Sunshine Coast", "Vancouver Island", "Gulf Islands"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1.5"
                    style={{ background: "white", border: "1px solid #E2DDD8", color: "#5A5A5A" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8" style={{ background: "#1C2026" }}>
              <div className="h-[2px] w-10 mb-5" style={{ background: "#C8601A" }} />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px" style={{ background: "#E8895A" }} />
                <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#E8895A" }}>Contact Us</p>
              </div>
              <h3
                className="mb-4"
                style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.03em", color: "white" }}
              >
                Square One Paving
              </h3>
              <div className="space-y-3 text-sm mb-8">
                <p style={{ color: "rgba(255,255,255,0.6)" }}>Ladysmith, British Columbia</p>
                <a href="tel:6043098212" className="block font-bold transition-colors hover:text-[#E8895A]" style={{ color: "white" }}>
                  604-309-8212
                </a>
                <a href="mailto:info@squareonepaving.com" className="block transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.6)" }}>
                  info@squareonepaving.com
                </a>
              </div>
              <Link href="/contact">
                <span
                  className="inline-block text-white text-sm font-bold uppercase tracking-[0.1em] px-7 py-3.5 transition-all hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
                >
                  Get a Free Quote
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 lg:px-10" style={{ background: "#0A0C10" }}>
        <div
          className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
          style={{ background: "linear-gradient(to right, #C8601A, #E8895A)" }}
        />
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: "#E8895A" }} />
                <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#E8895A" }}>Ready to Start?</p>
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
                Start a Project
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 700, color: "#E8895A" }}>With Us.</em>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <span
                  className="inline-flex items-center gap-2 px-10 py-4 text-sm font-bold tracking-[0.04em] uppercase text-white transition-all hover:brightness-110 whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
                >
                  Request a Free Quote
                </span>
              </Link>
              <Link href="/projects">
                <span
                  className="inline-flex items-center gap-2 px-10 py-4 text-sm font-bold tracking-[0.04em] uppercase transition-all hover:bg-white/10 whitespace-nowrap"
                  style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)" }}
                >
                  View Our Projects
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
