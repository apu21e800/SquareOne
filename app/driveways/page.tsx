// ─── SEO PILLAR PAGE ────────────────────────────────────────────────────────────────────────────────
// Primary SEO pillar page for decorative driveway paving in BC.
// Target keywords: "driveway paving Vancouver", "stamped asphalt driveway BC",
// "decorative driveway Lower Mainland", "StreetPrint driveway BC"
// ─────────────────────────────────────────────────────────────────────────────────

import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Decorative Driveways BC | Stamped Asphalt & Coatings | Square One Paving",
  description:
    "Transform your driveway with stamped asphalt, StreetBond coatings, or StreetPrint patterns. BC's most experienced decorative pavement installer. Free quotes — Lower Mainland & Vancouver Island.",
  keywords: [
    "decorative driveway BC",
    "stamped asphalt driveway Vancouver",
    "stamped asphalt driveway Victoria",
    "StreetPrint driveway BC",
    "decorative asphalt driveway Lower Mainland",
    "Vancouver driveway resurfacing",
    "Victoria driveway decorative",
    "concrete driveway alternative BC",
  ],
  alternates: {
    canonical: "https://squareonepaving.ca/driveways",
  },
}

const faqs = [
  {
    q: "Can you install over my existing driveway?",
    a: "Yes — StreetPrint and StreetBond are applied directly over existing asphalt, so there's no demolition of the base. We assess the surface condition first and may recommend DuraShield rejuvenation if the base is oxidized.",
  },
  {
    q: "How long does a decorative driveway last?",
    a: "StreetPrint stamped asphalt typically lasts 8–12 years in BC conditions. StreetBond coatings carry a 20-year colour retention warranty. Maintenance cycles and recoats can extend service life significantly.",
  },
  {
    q: "Is stamped asphalt safe in BC winters?",
    a: "Absolutely. StreetPrint patterns are ASTM D3939 slip-resistant, and the impression depth is designed to be snowplow safe. The product has been installed across BC — including areas with regular freeze-thaw cycles — for over 25 years.",
  },
  {
    q: "How do I get a quote?",
    a: "Contact us with your address and a description of the work. We\'ll schedule a free site visit, assess the surface, and provide a written quote within 48 hours.",
  },
  {
    q: "Do you serve Vancouver Island?",
    a: "Yes — we serve both the Lower Mainland and Vancouver Island. Our mobile crews operate out of Maple Ridge and Victoria, so no job site in the covered regions is out of reach.",
  },
]

const regions = [
  { name: "Vancouver", sub: "Metro Vancouver" },
  { name: "Victoria", sub: "Greater Victoria" },
  { name: "Burnaby", sub: "& New Westminster" },
  { name: "Surrey", sub: "& Langley" },
  { name: "Coquitlam", sub: "Tri-Cities" },
  { name: "Richmond", sub: "& Delta" },
  { name: "North Shore", sub: "North Van · West Van" },
  { name: "Saanich", sub: "& Oak Bay" },
  { name: "Langford", sub: "West Shore" },
  { name: "Maple Ridge", sub: "& Pitt Meadows" },
  { name: "Abbotsford", sub: "& Chilliwack" },
  { name: "Nanaimo", sub: "& Central Island" },
]

const galleryImages = [
  { src: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg", alt: "Estate herringbone stamped asphalt driveway, Metro Vancouver BC" },
  { src: "/images/applications/private-driveways/luxury-grey-gated-driveway-01.jpg", alt: "Luxury grey gated driveway, StreetPrint installation BC" },
  { src: "/images/applications/private-driveways/red-herringbone-circle-medallion-driveway-01.jpg", alt: "Red herringbone with custom circle medallion, BC driveway" },
  { src: "/images/applications/private-driveways/orca-driveway-medallion-custom-01.jpg", alt: "Custom orca medallion decorative driveway, Vancouver Island" },
  { src: "/images/applications/private-driveways/craftsman-home-charcoal-herringbone-driveway-01.jpg", alt: "Craftsman home charcoal herringbone driveway, Lower Mainland" },
  { src: "/images/applications/private-driveways/fall-estate-dark-brick-gated-driveway-01.jpg", alt: "Fall estate dark brick driveway, gated entrance BC" },
  { src: "/images/applications/private-driveways/hampton-gate-charcoal-brick-entrance-01.jpg", alt: "Hampton gate charcoal brick entrance driveway, BC" },
  { src: "/images/applications/private-driveways/lakefront-charcoal-herringbone-driveway-01.jpg", alt: "Lakefront charcoal herringbone stamped asphalt driveway BC" },
]

export default function DriveywaysPage() {
  return (
    <main style={{ background: "#F6F4F0" }}>

      {/* ── Full-bleed hero ── */}
      <section
        className="relative flex items-end"
        style={{ minHeight: "85vh", paddingTop: 68 }}
      >
        <Image
          fill
          src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
          alt="Estate herringbone stamped asphalt driveway installed by Square One Paving, BC"
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,12,16,0.88) 0%, rgba(10,12,16,0.35) 55%, transparent 100%)" }}
        />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-20">
          <p
            className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-5 flex items-center gap-3"
            style={{ color: "#E8895A" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#C8601A" }} />
            Residential Driveways · Vancouver & Vancouver Island
          </p>
          {/* H1 — color in style prop: global CSS h1{color:#111} beats className="text-white" */}
          <h1
            className="mb-8"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 0.93,
              letterSpacing: "-0.04em",
              maxWidth: "16ch",
              color: "white",
            }}
          >
            Driveways that earn{" "}
            <em style={{ fontStyle: "italic", fontWeight: 700, color: "#E8895A" }}>
              a second look.
            </em>
          </h1>
          <p
            className="text-white/70 mb-10"
            style={{ fontSize: "1.1rem", maxWidth: "44ch", lineHeight: 1.55 }}
          >
            Stamped asphalt, decorative coatings, and custom patterns installed over your existing
            driveway — no demolition. Most jobs done in 1–2 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#C8601A] hover:bg-[#A84F15] text-white px-8 py-4 text-[13px] font-bold tracking-[0.06em] uppercase transition-colors"
              style={{ boxShadow: "0 4px 20px rgba(200,96,26,0.35)" }}
            >
              Request a Free Quote
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 text-[13px] font-bold tracking-[0.06em] uppercase transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.80)" }}
            >
              See Driveway Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-white border-b border-[#E2DDD8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 lg:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E2DDD8]">
            {[
              { num: "8–12", unit: "yr", label: "StreetPrint service life" },
              { num: "25+",  unit: "",   label: "Years installing in BC" },
              { num: "Free", unit: "",   label: "Site visit & written quote" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center gap-4 py-6 ${
                  i === 0 ? "sm:pr-8 lg:pr-12" : i === 2 ? "sm:pl-8 lg:pl-12" : "sm:px-8 lg:px-12"
                }`}
              >
                <span
                  style={{
                    fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    lineHeight: 0.88,
                    color: "#C8601A",
                  }}
                >
                  {s.num}
                  {s.unit && (
                    <span style={{ fontSize: "60%", letterSpacing: "-0.02em" }}>{s.unit}</span>
                  )}
                </span>
                <span className="text-[12px] uppercase tracking-[0.14em] text-[#5A5A5A] font-semibold leading-snug">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── StreetPrint — 2-col: text left, photo right ── */}
      <section className="bg-white border-b border-[#E2DDD8]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">

            {/* Left */}
            <div className="flex flex-col justify-center px-6 lg:px-16 py-16 lg:py-20">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-[#C8601A]" />
                Most Popular
              </p>
              <h2
                className="text-[#111111] mb-5"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                }}
              >
                StreetPrint Stamped Asphalt
              </h2>
              <p className="text-[15px] text-[#5A5A5A] leading-relaxed mb-8" style={{ maxWidth: "42ch" }}>
                StreetPrint transforms your existing asphalt into a rich decorative surface —
                brick, cobblestone, slate, and custom patterns — without excavating the base.
                Installed in place, in days.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Applied over existing asphalt — no demolition",
                  "Patterns: Brick, Cobblestone, Slate, Running Bond",
                  "ASTM slip-resistant, snowplow safe",
                  "8–12 year service life in BC conditions",
                ].map((spec) => (
                  <li key={spec} className="flex items-start gap-3 text-[14px] text-[#2C2C2C]">
                    <span className="text-[#C8601A] flex-shrink-0 font-bold mt-0.5">✓</span>
                    {spec}
                  </li>
                ))}
              </ul>
              <Link
                href="/products/streetprint"
                className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.04em] uppercase text-[#C8601A] hover:gap-3 transition-all"
              >
                StreetPrint Product Details
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Right — photo */}
            <div className="relative min-h-[400px] lg:min-h-0">
              <Image
                src="/images/applications/private-driveways/craftsman-home-charcoal-herringbone-driveway-01.jpg"
                alt="Charcoal herringbone StreetPrint stamped asphalt driveway, BC"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 hidden lg:block"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.08) 0%, transparent 30%)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── StreetBond — 2-col: photo left, text right ── */}
      <section className="bg-[#F6F4F0] border-b border-[#E2DDD8]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

            {/* Left — photo */}
            <div className="relative min-h-[400px] lg:min-h-0 order-last lg:order-first">
              <Image
                src="/images/applications/private-driveways/luxury-grey-gated-driveway-01.jpg"
                alt="Luxury grey StreetBond coated driveway, Lower Mainland BC"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 hidden lg:block"
                style={{ background: "linear-gradient(to left, rgba(246,244,240,0.08) 0%, transparent 30%)" }}
              />
            </div>

            {/* Right */}
            <div className="flex flex-col justify-center px-6 lg:px-16 py-16 lg:py-20">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-[#C8601A]" />
                Best Value
              </p>
              <h2
                className="text-[#111111] mb-5"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                }}
              >
                StreetBond Colour Coating
              </h2>
              <p className="text-[15px] text-[#5A5A5A] leading-relaxed mb-8" style={{ maxWidth: "42ch" }}>
                StreetBond is a high-performance acrylic coating that bonds permanently to
                asphalt or concrete. UV stable, anti-skid, and available in dozens of custom
                colours. The smartest way to refresh and protect an existing driveway.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Bonds to asphalt and concrete",
                  "20-year colour retention warranty",
                  "Anti-skid aggregate included",
                  "Pantone custom colour matching",
                ].map((spec) => (
                  <li key={spec} className="flex items-start gap-3 text-[14px] text-[#2C2C2C]">
                    <span className="text-[#C8601A] flex-shrink-0 font-bold mt-0.5">✓</span>
                    {spec}
                  </li>
                ))}
              </ul>
              <Link
                href="/products/streetbond"
                className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.04em] uppercase text-[#C8601A] hover:gap-3 transition-all"
              >
                StreetBond Product Details
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── DuraShield — cream banner ── */}
      <section className="bg-white border-b border-[#E2DDD8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#767676] font-semibold mb-4 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-[#E2DDD8]" />
                Surface Prep & Protection
              </p>
              <h2
                className="text-[#111111] mb-4"
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.0,
                }}
              >
                DuraShield Pavement Rejuvenation
              </h2>
              <p className="text-[15px] text-[#5A5A5A] leading-relaxed mb-5" style={{ maxWidth: "55ch" }}>
                DuraShield penetrates oxidized asphalt, rejuvenating the binder and extending
                pavement life 3–5 years. The smart first step before any decorative system,
                or a standalone maintenance treatment.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Penetrating rejuvenator", "Extends life 3–5 years", "Restores oxidized asphalt", "Pairs with StreetPrint"].map((t) => (
                  <span
                    key={t}
                    className="text-[12px] font-semibold px-3 py-1.5 text-[#5A5A5A]"
                    style={{ border: "1px solid #E2DDD8" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#C8601A] hover:bg-[#A84F15] text-white px-7 py-4 text-[13px] font-bold tracking-[0.06em] uppercase transition-colors whitespace-nowrap"
            >
              Ask About DuraShield
            </Link>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-[#F6F4F0] border-b border-[#E2DDD8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#C8601A]" />
            How It Works
          </p>
          <h2
            className="text-[#111111] mb-16"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            From spec to surface in days.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                num: "01",
                title: "Site Visit",
                desc: "Jan visits your property, assesses the existing asphalt, and walks you through pattern and colour options.",
              },
              {
                num: "02",
                title: "Written Quote",
                desc: "A detailed written quote within 48 hours. No surprises. We specify the right system for your surface condition.",
              },
              {
                num: "03",
                title: "Installation",
                desc: "Our certified crew handles prep, application, and quality control. Most residential driveways: 1–2 days.",
              },
              {
                num: "04",
                title: "20-Year Performance",
                desc: "StreetPrint and StreetBond are engineered for BC winters. Backed by material warranties and our craftsmanship guarantee.",
              },
            ].map((step) => (
              <div key={step.num}>
                <div
                  className="mb-5"
                  style={{
                    fontSize: "clamp(3.5rem, 5vw, 5rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.06em",
                    lineHeight: 0.85,
                    color: "#E2DDD8",
                  }}
                >
                  {step.num}
                </div>
                <h3
                  className="text-[#111111] mb-3"
                  style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em" }}
                >
                  {step.title}
                </h3>
                <p className="text-[14px] text-[#5A5A5A] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="bg-white border-b border-[#E2DDD8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-3 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-[#C8601A]" />
                Our Work
              </p>
              <h2
                className="text-[#111111]"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                }}
              >
                Driveways across BC.
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.06em] uppercase text-[#C8601A] hover:gap-3 transition-all"
            >
              All Projects
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden bg-[#EDE9E3] group ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                style={{ aspectRatio: i === 0 ? "1/1" : "4/3" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  sizes={
                    i === 0
                      ? "(max-width: 768px) 50vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            ))}
          </div>

          <div className="mt-8 sm:hidden text-center">
            <Link href="/projects">
              <span
                className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.06em] uppercase"
                style={{ color: "#C8601A" }}
              >
                All Projects →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Regions ── */}
      <section className="bg-[#F6F4F0] border-b border-[#E2DDD8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-3 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#C8601A]" />
            Service Area
          </p>
          <h2
            className="text-[#111111] mb-3"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            We come to you.
          </h2>
          <p className="text-[14px] text-[#5A5A5A] mb-8" style={{ maxWidth: "50ch" }}>
            Mobile crews from Maple Ridge and Victoria. No travel surcharge within service areas.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {regions.map((r) => (
              <div
                key={r.name}
                className="bg-white p-4 text-center hover:border-[#C8601A]/40 transition-colors"
                style={{ border: "1px solid #E2DDD8" }}
              >
                <p className="font-bold text-[#111111] text-[13px]">{r.name}</p>
                <p className="text-[#767676] text-[11px] mt-0.5 leading-tight">{r.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HUB certified badge strip ── */}
      <section className="bg-white border-b border-[#E2DDD8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "#C8601A" }}
              />
              <p className="text-[13px] font-bold text-[#111111] tracking-tight">
                BC&apos;s only certified HUB Surface Systems applicator
              </p>
              <span className="hidden sm:block text-[#E2DDD8]">|</span>
              <p className="hidden sm:block text-[13px] text-[#5A5A5A]">
                StreetPrint, StreetBond, TrafficPatterns, DecoMark — all require certified installation
              </p>
            </div>
            <Link
              href="/products"
              className="text-[12px] font-bold tracking-[0.06em] uppercase text-[#C8601A] hover:text-[#A84F15] transition-colors whitespace-nowrap"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white border-b border-[#E2DDD8]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#C8601A]" />
            Common Questions
          </p>
          <h2
            className="text-[#111111] mb-12"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            What we get asked.
          </h2>
          <div className="divide-y divide-[#E2DDD8]">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-7">
                <p
                  className="text-[#111111] mb-3"
                  style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em" }}
                >
                  {faq.q}
                </p>
                <p className="text-[14px] text-[#5A5A5A] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA — dark ── */}
      <section className="relative overflow-hidden" style={{ background: "#0A0C10" }}>
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200,96,26,0.14) 0%, transparent 65%)" }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-5 flex items-center gap-3"
                style={{ color: "#E8895A" }}
              >
                <span className="inline-block w-8 h-px" style={{ background: "#C8601A" }} />
                Ready to Start?
              </p>
              <h2
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  color: "white",
                }}
              >
                Your surface is ready.
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 700, color: "#E8895A" }}>
                  Let&apos;s talk.
                </em>
              </h2>
              <p
                className="mt-6"
                style={{ color: "rgba(255,255,255,0.50)", fontSize: "0.95rem", maxWidth: "42ch" }}
              >
                Free site visit. Written quote in 48 hours. We\'ve been doing this in BC since 2000.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#C8601A] hover:bg-[#A84F15] text-white px-8 py-4 text-[13px] font-bold tracking-[0.06em] uppercase transition-colors whitespace-nowrap"
                style={{ boxShadow: "0 4px 20px rgba(200,96,26,0.35)" }}
              >
                Request a Quote
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href="tel:+16044669902"
                className="inline-flex items-center gap-2 px-8 py-4 text-[13px] font-bold tracking-[0.06em] uppercase transition-all hover:bg-white/10 whitespace-nowrap"
                style={{ border: "1px solid rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.75)" }}
              >
                Call 604 466 9902
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
