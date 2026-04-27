import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | BC's HUB Certified Applicator Since 2000 | Square One Surface Solutions",
  description:
    "Jan Stewart and the Square One team have been BC's only certified HUB Surface Systems applicator since 2000 — serving Metro Vancouver, Fraser Valley, and Vancouver Island with StreetPrint, StreetBond, and specialty coatings.",
  keywords: [
    "Square One Paving BC",
    "Jan Stewart paving contractor BC",
    "HUB Surface Systems certified BC",
    "decorative pavement contractor BC",
    "BC paving company since 2000",
    "decorative pavement Maple Ridge",
    "stamped asphalt contractor Lower Mainland",
    "StreetPrint certified applicator BC",
  ],
  alternates: {
    canonical: "https://squareonepaving.ca/about",
  },
  openGraph: {
    title: "About Us | BC's HUB Certified Applicator Since 2000 | Square One Surface Solutions",
    description:
      "Jan Stewart and the Square One team have been BC's only certified HUB Surface Systems applicator since 2000 — serving Metro Vancouver, Fraser Valley, and Vancouver Island.",
  },
}

const timeline = [
  { year: "2000", event: "Square One Surface Solutions founded in Maple Ridge, BC" },
  { year: "2004", event: "Became BC's only certified HUB Surface Systems applicator" },
  { year: "2012", event: "Expanded operations to Vancouver Island" },
  { year: "2018", event: "Added vapor blasting division with mobile equipment" },
  { year: "2025", event: "25 years — 200+ projects across 51+ BC communities" },
]

const stats = [
  { num: "25+",  label: "Years in business" },
  { num: "200+", label: "BC projects completed" },
  { num: "51+",  label: "Communities served" },
  { num: "4",    label: "Specialist services" },
]

export default function AboutPage() {
  return (
    <main style={{ background: "#F6F4F0" }}>

      {/* ── Full-bleed hero ── */}
      <section
        className="relative flex items-end"
        style={{ minHeight: "60vh", paddingTop: 68 }}
      >
        <Image
          fill
          src="/images/products/streetprint/streetprint-1.jpg"
          alt="Square One Surface Solutions stamped asphalt install, BC"
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,12,16,0.85) 0%, rgba(10,12,16,0.30) 60%, transparent 100%)" }}
        />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-4 flex items-center gap-3" style={{ color: "#E8895A" }}>
            <span className="inline-block w-8 h-px" style={{ background: "#C8601A" }} />
            About Square One
          </p>
          <h1
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              maxWidth: "14ch",
              color: "white",
            }}
          >
            BC&apos;s Surface{" "}
            <span style={{ color: "#E8895A" }}>Specialists</span>{" "}
            Since 2000.
          </h1>
        </div>
      </section>

      {/* ── Jan's story — 2-col narrative ── */}
      <section className="bg-white border-b border-[#E2DDD8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — copy */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-[#C8601A]" />
                Our Story
              </p>
              <h2
                className="text-[#111111] mb-7"
                style={{
                  fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.0,
                }}
              >
                BC&apos;s only certified HUB
                <br />Surface Systems applicator.
              </h2>

              <div className="space-y-5 text-[15px] text-[#5A5A5A] leading-relaxed">
                <p>
                  Jan Stewart founded Square One Surface Solutions in 2000 with a
                  clear belief: that BC&apos;s pavements could be exceptional —
                  beautiful enough to define a neighbourhood, durable enough to
                  survive BC winters.
                </p>
                <p>
                  Twenty-five years later, Square One is BC&apos;s only certified HUB
                  Surface Systems applicator. That certification isn&apos;t a badge —
                  it&apos;s a body of knowledge built through hundreds of installs
                  across Metro Vancouver and Vancouver Island. When a municipality
                  specifies StreetBond for a crosswalk, or a homeowner wants a
                  herringbone driveway that lasts 20 years, they need a certified
                  installer. In BC, that&apos;s Square One.
                </p>
                <p>
                  The same discipline Jan&apos;s team brings to a Vision Zero crosswalk
                  in Surrey becomes the baseline for a residential driveway in West
                  Vancouver. Municipal stress-tests. Residential finishing.
                  One crew.
                </p>
              </div>

              {/* Jan's direct contact */}
              <div className="mt-10 pt-8 border-t border-[#E2DDD8]">
                <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#C8601A] mb-4">Get in Touch</p>
                <p className="text-[14px] font-semibold text-[#111111] mb-1">Jan Stewart, Managing Partner</p>
                <div className="flex flex-col gap-1.5 text-[14px]">
                  <a href="mailto:jan@squareonepaving.com" className="text-[#C8601A] hover:text-[#A84F15] transition-colors">
                    jan@squareonepaving.com
                  </a>
                  <span className="text-[#2C2C2C]">
                    <a href="tel:+16044669902" className="hover:text-[#C8601A] transition-colors">604 466 9902</a>
                    <span className="text-[#E2DDD8] mx-2">|</span>
                    <a href="tel:+12502162190" className="hover:text-[#C8601A] transition-colors">250 216 2190</a>
                  </span>
                </div>
              </div>
            </div>

            {/* Right — photo + mission */}
            <div className="space-y-6">
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
                  alt="Premium stamped asphalt driveway, BC"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(17,17,17,0.50) 0%, transparent 55%)" }}
                />
                <div className="absolute bottom-5 left-5">
                  <p className="text-white text-[13px] font-bold">StreetPrint Herringbone</p>
                  <p className="text-white/60 text-[11px] mt-0.5">Metro Vancouver, BC</p>
                </div>
              </div>

              {/* Mission quote */}
              <div className="bg-[#F6F4F0] px-8 py-7 border-t-2 border-[#C8601A]">
                <blockquote
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.2,
                    color: "#111111",
                  }}
                >
                  &ldquo;Build surfaces that perform as good as they look
                  — and hold up through BC winters.&rdquo;
                </blockquote>
                <p className="text-[12px] text-[#767676] uppercase tracking-[0.14em] font-semibold mt-4">
                  Jan Stewart &middot; Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 stats — white bg ── */}
      <section className="bg-white border-b border-[#E2DDD8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 lg:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={[
                  "flex flex-col items-start px-8 lg:px-12",
                  i === 0 ? "pl-0 lg:pl-0" : "",
                  i === stats.length - 1 ? "pr-0 lg:pr-0" : "",
                  i === 0 || i === 2 ? "border-r border-[#E2DDD8]" : "",
                  i >= 2 ? "border-t border-[#E2DDD8] lg:border-t-0 mt-8 pt-8 lg:mt-0 lg:pt-0" : "",
                  i > 0 ? "lg:border-l lg:border-[#E2DDD8]" : "",
                ].filter(Boolean).join(" ")}
              >
                <span
                  style={{
                    fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.055em",
                    lineHeight: 0.88,
                    color: "#C8601A",
                  }}
                >
                  {s.num}
                </span>
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#5A5A5A] font-semibold mt-4 leading-snug">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestones ── */}
      <section className="bg-[#F6F4F0] border-b border-[#E2DDD8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-8 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#C8601A]" />
            25 Years
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border-t border-[#E2DDD8]">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="py-8 pr-8 border-b lg:border-b-0 lg:border-r border-[#E2DDD8] last:border-0"
              >
                <span
                  className="block mb-3"
                  style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#C8601A" }}
                >
                  {item.year}
                </span>
                <p className="text-[13px] text-[#5A5A5A] leading-snug">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service area ── */}
      <section className="bg-white border-b border-[#E2DDD8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-4 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-[#C8601A]" />
                Service Area
              </p>
              <h3
                className="text-[#111111] mb-4"
                style={{ fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.03em" }}
              >
                Metro Vancouver &amp; Vancouver Island
              </h3>
              <p className="text-[14px] text-[#5A5A5A] leading-relaxed mb-5">
                Two bases. One BC. We serve municipalities, developers, and
                homeowners from the Lower Mainland to Victoria — with mobile vapor
                blasting equipment that goes wherever the job is.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Greater Vancouver", "Fraser Valley", "Sunshine Coast", "Vancouver Island", "Gulf Islands"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] font-semibold px-3 py-1.5 border border-[#E2DDD8] text-[#5A5A5A] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#F6F4F0] p-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-4 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-[#C8601A]" />
                HUB Certified
              </p>
              <h3
                className="text-[#111111] mb-3"
                style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}
              >
                BC's only certified applicator for HUB Surface Systems
              </h3>
              <p className="text-[14px] text-[#5A5A5A] leading-relaxed mb-5">
                StreetPrint, StreetBond, TrafficPatterns, and DecoMark are HUB
                products. Certified installation is required for warranty, municipal
                specification compliance, and performance assurance. In BC,
                that certification belongs to Square One.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#C8601A] hover:bg-[#A84F15] text-white px-6 py-3 text-[13px] font-bold tracking-[0.02em] uppercase transition-colors rounded-lg"
              >
                Work With Us
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA — dark ── */}
      <section className="relative overflow-hidden" style={{ background: "#0A0C10" }}>
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200,96,26,0.12) 0%, transparent 65%)" }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-5 flex items-center gap-3" style={{ color: "#E8895A" }}>
                <span className="inline-block w-8 h-px" style={{ background: "#C8601A" }} />
                Ready to Start?
              </p>
              <h2
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.97,
                  color: "white",
                }}
              >
                Your surface is ready.{" "}
                <span style={{ color: "#E8895A" }}>Let&apos;s talk.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#C8601A] hover:bg-[#A84F15] text-white px-8 py-4 text-[13px] font-bold tracking-[0.02em] uppercase transition-colors whitespace-nowrap rounded-lg"
                style={{ boxShadow: "0 4px 20px rgba(200,96,26,0.35)" }}
              >
                Request a Quote
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 text-[13px] font-bold tracking-[0.02em] uppercase transition-all hover:bg-white/10 whitespace-nowrap rounded-lg"
                style={{ border: "1px solid rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.75)" }}
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
