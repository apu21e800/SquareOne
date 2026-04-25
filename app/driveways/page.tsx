import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Decorative Driveways Vancouver & Victoria | Stamped Asphalt BC | Square One Paving",
  description:
    "Transform your driveway with stamped asphalt, StreetBond coatings, or custom medallions. BC's most experienced decorative pavement installer since 2000. Free quotes — Lower Mainland & Vancouver Island.",
  keywords: [
    "decorative driveway BC",
    "stamped asphalt driveway Vancouver",
    "stamped asphalt driveway Victoria",
    "StreetPrint driveway BC",
    "decorative asphalt driveway Lower Mainland",
    "Vancouver driveway resurfacing",
    "Victoria driveway decorative",
    "concrete driveway alternative BC",
    "driveway paving Vancouver",
    "driveway paving Victoria",
  ],
  alternates: {
    canonical: "https://squareonepaving.ca/driveways",
  },
}

const whyPoints = [
  {
    num: "01",
    title: "Looks like stone.",
    body: "StreetPrint stamps brick, cobblestone, ashlar slate, and custom patterns directly into your existing asphalt. No excavation. No concrete base. Just a surface that looks like it cost three times as much.",
  },
  {
    num: "02",
    title: "Lasts like asphalt.",
    body: "Unlike pavers that heave and crack, stamped asphalt flexes with BC freeze-thaw cycles. StreetPrint installations in Vancouver and Victoria have been performing for 20+ years without major rehabilitation.",
  },
  {
    num: "03",
    title: "Zero annual repainting.",
    body: "StreetBond's UV-stable colour system is backed by a 20-year retention warranty. The pigment is integral to the coating — it doesn't fade, chip, or peel. One installation, decades of colour.",
  },
]

const beforeAfter = [
  {
    img: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
    location: "West Vancouver",
    pattern: "Herringbone Brick",
    alt: "Estate herringbone brick stamped asphalt driveway — West Vancouver BC",
  },
  {
    img: "/images/applications/private-driveways/lakefront-charcoal-herringbone-driveway-01.jpg",
    location: "North Shore",
    pattern: "Charcoal Herringbone",
    alt: "Lakefront charcoal herringbone stamped driveway — North Shore BC",
  },
  {
    img: "/images/applications/private-driveways/orca-driveway-medallion-custom-01.jpg",
    location: "Victoria",
    pattern: "Custom Orca Medallion",
    alt: "Custom orca medallion decorative driveway — Victoria BC",
  },
]

const products = [
  {
    name: "StreetPrint",
    tagline: "Stamped asphalt patterns",
    body: "20+ pattern options — brick, cobblestone, slate, running bond, and custom. Installed over your existing asphalt in 1–2 days. Snowplow safe. ASTM slip-resistant.",
    specs: ["Installed over existing asphalt", "8–12 year service life", "Snowplow and freeze-thaw safe", "25+ patterns available"],
    href: "/products/streetprint",
    img: "/images/applications/private-driveways/craftsman-home-charcoal-herringbone-driveway-01.jpg",
    badge: "Most Popular",
  },
  {
    name: "StreetBond",
    tagline: "Colour coating system",
    body: "UV-stable acrylic coating in 50+ colours, including Pantone custom match. Bonds permanently to asphalt or concrete. Anti-skid aggregate included. 20-year colour warranty.",
    specs: ["Bonds to asphalt & concrete", "20-year colour warranty", "Anti-skid aggregate", "Pantone custom matching"],
    href: "/products/streetbond",
    img: "/images/applications/private-driveways/cobblestone-residential-driveway-closeup-01.jpg",
    badge: null,
  },
  {
    name: "DuraShield",
    tagline: "Pavement rejuvenation",
    body: "Penetrating rejuvenator that restores oxidized binder and extends pavement life 3–5 years. The right first step before any decorative system — or a standalone maintenance treatment.",
    specs: ["Penetrating formula", "Extends life 3–5 years", "Restores oxidized asphalt", "Standalone or prep step"],
    href: "/products/durashield",
    img: "/images/applications/private-driveways/hampton-gate-charcoal-brick-entrance-01.jpg",
    badge: null,
  },
]

const geoRegions = [
  {
    region: "Lower Mainland",
    cities: ["Vancouver", "Burnaby", "Richmond", "Surrey", "North Shore", "Coquitlam", "Langley", "Maple Ridge", "Delta", "Abbotsford"],
    note: "Crews based in Maple Ridge. No travel surcharge within Metro Vancouver.",
  },
  {
    region: "Vancouver Island",
    cities: ["Victoria", "Saanich", "Oak Bay", "Langford", "Esquimalt", "Nanaimo", "Sooke", "Sidney"],
    note: "Island crew based in Victoria. Serving Greater Victoria and south island.",
  },
]

const faqs = [
  {
    q: "Can you install over my existing asphalt?",
    a: "Yes — StreetPrint and StreetBond install directly over your existing asphalt surface, so there's no demolition or base work. We assess the surface condition first and may recommend DuraShield rejuvenation if the base is oxidized.",
  },
  {
    q: "How long does a decorative driveway last in BC?",
    a: "StreetPrint stamped asphalt typically performs 8–12 years in BC conditions. StreetBond coatings carry a 20-year colour retention warranty. Recoat cycles can extend service life significantly beyond that.",
  },
  {
    q: "Is stamped asphalt safe to snowplow?",
    a: "Yes. StreetPrint patterns are designed with controlled depth and are fully snowplow safe. The product has been installed across BC — including areas with regular freeze-thaw cycles — for over 25 years.",
  },
  {
    q: "Do you serve Vancouver Island?",
    a: "Yes — we maintain crews on both the Lower Mainland and Vancouver Island. Our Victoria-based team serves Greater Victoria and the south island. No job in our service area is out of reach.",
  },
  {
    q: "How long does installation take?",
    a: "Most residential driveways are completed in 1–2 days, depending on size and surface condition. We handle prep, application, and quality control. You'll be driving on it within 24 hours of completion.",
  },
]

export default function DriveywaysPage() {
  return (
    <main>

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex flex-col justify-end"
        style={{ paddingTop: "68px" }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
            alt="Estate herringbone gated driveway by Square One Paving — West Vancouver BC"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Gradient overlay — dark at bottom, lighter at top */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.60) 40%, rgba(10,10,10,0.20) 100%)",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 md:pb-28 w-full">
          <p
            className="text-[#C8601A] font-semibold tracking-[0.22em] uppercase mb-5"
            style={{ fontSize: "0.72rem" }}
          >
            Residential Driveways · Vancouver &amp; Victoria
          </p>

          <h1
            className="text-white mb-8"
            style={{
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 0.92,
              fontSize: "clamp(3.2rem, 7vw, 7rem)",
              maxWidth: "820px",
            }}
          >
            Your driveway.<br />
            Elevated.
          </h1>

          <p
            className="text-white/70 mb-10 max-w-lg"
            style={{ fontSize: "1.1rem", lineHeight: 1.6 }}
          >
            Stamped asphalt and decorative coatings that outlast concrete,
            survive BC winters, and make your property impossible to forget.
            Free site visit. Written quote in 48 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <span
                className="inline-block bg-[#C8601A] text-white px-8 py-4 font-bold text-sm tracking-[0.1em] uppercase transition-all duration-200 hover:bg-[#b35518]"
                style={{ letterSpacing: "0.1em" }}
              >
                Get a Free Quote
              </span>
            </Link>
            <Link href="/projects">
              <span className="inline-block border border-white/30 text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-all duration-200 hover:border-white/70 hover:bg-white/5">
                See Our Work
              </span>
            </Link>
          </div>

          {/* Trust strip */}
          <div
            className="mt-16 pt-8 border-t border-white/15 flex flex-wrap gap-x-10 gap-y-3"
          >
            {[
              "BC Since 2000",
              "City of Vancouver",
              "City of Victoria",
              "TransLink",
              "BC Transit",
              "District of Saanich",
            ].map((name) => (
              <span
                key={name}
                className="text-white/50 font-semibold text-xs tracking-[0.15em] uppercase"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Section ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-[#F6F4F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20">
            <p className="text-[#C8601A] text-xs font-semibold tracking-[0.22em] uppercase mb-5">
              Why Square One
            </p>
            <h2
              style={{
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                fontSize: "clamp(2rem, 4vw, 3.75rem)",
                maxWidth: "600px",
              }}
            >
              The surface<br />your property deserves.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
            {whyPoints.map((pt) => (
              <div key={pt.num} className="relative">
                <div
                  className="absolute -top-3 -left-1 select-none pointer-events-none"
                  style={{
                    fontSize: "7rem",
                    fontWeight: 800,
                    lineHeight: 1,
                    color: "#E8E4DE",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {pt.num}
                </div>
                <div className="relative pt-10">
                  <h3
                    className="mb-4 text-[#111111]"
                    style={{ fontWeight: 800, letterSpacing: "-0.025em", fontSize: "1.35rem" }}
                  >
                    {pt.title}
                  </h3>
                  <p className="text-[#5A5A5A] leading-relaxed" style={{ fontSize: "0.95rem" }}>
                    {pt.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Before / After Showcase ──────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[#C8601A] text-xs font-semibold tracking-[0.22em] uppercase mb-5">
              Our Work
            </p>
            <h2
              className="text-white"
              style={{
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                fontSize: "clamp(2rem, 4vw, 3.75rem)",
              }}
            >
              BC driveways,<br />transformed.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {beforeAfter.map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden"
                style={{ aspectRatio: "4/5" }}
              >
                {/* Before (grayscale — left half via clip) */}
                <div
                  className="absolute inset-0 transition-all duration-700"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                >
                  <Image
                    src={item.img}
                    alt={`Before — ${item.alt}`}
                    fill
                    className="object-cover object-center"
                    style={{ filter: "grayscale(100%) brightness(0.7)" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    className="absolute top-4 left-4 bg-black/70 text-white text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1.5"
                  >
                    Before
                  </div>
                </div>

                {/* After (full colour — right half via clip) */}
                <div
                  className="absolute inset-0"
                  style={{ clipPath: "inset(0 0 0 50%)" }}
                >
                  <Image
                    src={item.img}
                    alt={item.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    className="absolute top-4 right-4 bg-[#C8601A] text-white text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1.5"
                  >
                    After
                  </div>
                </div>

                {/* Center divider line */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/40 z-10" />

                {/* Center arrow icon */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-[#C8601A] flex items-center justify-center shadow-xl"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h12M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="square" />
                  </svg>
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-white font-black text-sm tracking-[-0.01em]">{item.location}</p>
                  <p className="text-white/60 text-xs mt-0.5">{item.pattern}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/projects">
              <span className="inline-block border border-white/20 text-white/70 hover:border-white/50 hover:text-white px-8 py-4 text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-200">
                View All Projects →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Products ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[#C8601A] text-xs font-semibold tracking-[0.22em] uppercase mb-5">
              The Materials
            </p>
            <h2
              style={{
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                fontSize: "clamp(2rem, 4vw, 3.75rem)",
                maxWidth: "560px",
              }}
            >
              HUB Surface Systems,<br />installed by specialists.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((p) => (
              <div
                key={p.name}
                className="group relative flex flex-col bg-[#F6F4F0] overflow-hidden transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <Image
                    src={p.img}
                    alt={`${p.name} decorative driveway — Square One Paving BC`}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {p.badge && (
                    <div className="absolute top-4 left-4 bg-[#C8601A] text-white text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1.5">
                      {p.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-7">
                  <p className="text-[#C8601A] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                    {p.tagline}
                  </p>
                  <h3
                    className="text-[#111111] mb-4"
                    style={{ fontWeight: 800, letterSpacing: "-0.025em", fontSize: "1.4rem" }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-[#5A5A5A] text-sm leading-relaxed mb-6">{p.body}</p>

                  <ul className="space-y-2 mb-8">
                    {p.specs.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-[0.82rem] text-[#2C2C2C]">
                        <span
                          className="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-[#C8601A]"
                          style={{ marginTop: "6px" }}
                        />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link href={p.href}>
                      <span
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] tracking-[-0.01em] transition-colors duration-200 group-hover:text-[#C8601A]"
                      >
                        Product Details
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7h10M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Bottom hover line */}
                <div
                  className="absolute bottom-0 left-0 h-[3px] bg-[#C8601A] transition-all duration-300"
                  style={{ width: "0%" }}
                  data-hover-line
                />
              </div>
            ))}
          </div>

          {/* Authorized applicator badge */}
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-3 border border-[#E2DDD8]">
              <span className="w-2 h-2 rounded-full bg-[#C8601A] flex-shrink-0" />
              <span className="text-[#5A5A5A] text-xs font-bold tracking-[0.15em] uppercase">
                Authorized HUB Surface Systems Applicator · BC Since 2000
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Service Regions ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#F6F4F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[#C8601A] text-xs font-semibold tracking-[0.22em] uppercase mb-5">
              Service Area
            </p>
            <h2
              style={{
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                fontSize: "clamp(2rem, 4vw, 3.75rem)",
              }}
            >
              We come to you.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {geoRegions.map((geo) => (
              <div
                key={geo.region}
                className="bg-white p-10 border border-[#E2DDD8]"
              >
                <h3
                  className="text-[#111111] mb-2"
                  style={{ fontWeight: 800, letterSpacing: "-0.025em", fontSize: "1.5rem" }}
                >
                  {geo.region}
                </h3>
                <p className="text-[#5A5A5A] text-sm mb-8">{geo.note}</p>

                <div className="flex flex-wrap gap-2">
                  {geo.cities.map((city) => (
                    <span
                      key={city}
                      className="px-3 py-1.5 bg-[#F6F4F0] border border-[#E2DDD8] text-[#2C2C2C] text-xs font-semibold tracking-[0.04em]"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Get a Quote ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left: pitch */}
            <div>
              <p className="text-[#C8601A] text-xs font-semibold tracking-[0.22em] uppercase mb-6">
                Free Consultation
              </p>
              <h2
                className="text-white mb-8"
                style={{
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                }}
              >
                Let&apos;s talk about<br />your driveway.
              </h2>
              <p className="text-white/60 leading-relaxed mb-10" style={{ fontSize: "1rem" }}>
                Tell us about your project and we&apos;ll schedule a free site visit.
                Written quote within 48 hours. No pressure, no obligation.
              </p>
              <div className="space-y-5">
                {[
                  { label: "Free site visit", sub: "We come to you across Greater Vancouver & Greater Victoria" },
                  { label: "Written quote in 48h", sub: "Detailed scope, material spec, and pricing" },
                  { label: "25+ year track record", sub: "BC's most experienced decorative pavement installer" },
                ].map((pt) => (
                  <div key={pt.label} className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8601A] flex-shrink-0 mt-1.5" />
                    <div>
                      <p className="text-white font-bold text-sm">{pt.label}</p>
                      <p className="text-white/50 text-xs mt-0.5">{pt.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <form
              action="/api/contact"
              method="POST"
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs font-semibold tracking-[0.1em] uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#C8601A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-semibold tracking-[0.1em] uppercase mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="604-xxx-xxxx"
                    className="w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#C8601A] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold tracking-[0.1em] uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@email.com"
                  className="w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#C8601A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold tracking-[0.1em] uppercase mb-2">
                  Region
                </label>
                <select
                  name="region"
                  className="w-full bg-white/5 border border-white/15 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#C8601A] transition-colors appearance-none"
                  style={{ colorScheme: "dark" }}
                >
                  <optgroup label="Lower Mainland">
                    <option value="Vancouver">Vancouver</option>
                    <option value="Burnaby">Burnaby</option>
                    <option value="Richmond">Richmond</option>
                    <option value="North Shore">North Shore</option>
                    <option value="Surrey">Surrey / Langley</option>
                    <option value="Coquitlam">Coquitlam / Tri-Cities</option>
                    <option value="Maple Ridge">Maple Ridge</option>
                    <option value="Abbotsford">Abbotsford / Chilliwack</option>
                  </optgroup>
                  <optgroup label="Vancouver Island">
                    <option value="Victoria">Victoria</option>
                    <option value="Saanich">Saanich / Oak Bay</option>
                    <option value="Langford">Langford / West Shore</option>
                    <option value="Nanaimo">Nanaimo</option>
                    <option value="Sidney">Sidney / Saanichton</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold tracking-[0.1em] uppercase mb-2">
                  Tell us about your project
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Driveway size, current condition, desired look..."
                  className="w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#C8601A] transition-colors resize-none"
                />
              </div>

              <input type="hidden" name="source" value="driveways-page" />

              <button
                type="submit"
                className="w-full bg-[#C8601A] text-white py-4 font-bold text-sm tracking-[0.1em] uppercase transition-all duration-200 hover:bg-[#b35518]"
              >
                Request Free Quote
              </button>

              <p className="text-white/30 text-xs text-center">
                We respond within one business day. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-16 text-center">
            <p className="text-[#C8601A] text-xs font-semibold tracking-[0.22em] uppercase mb-5">
              Common Questions
            </p>
            <h2
              style={{
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              What we&apos;re asked.
            </h2>
          </div>
          <div className="divide-y divide-[#E8E4DE]">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-7">
                <p
                  className="text-[#111111] mb-3"
                  style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.01em" }}
                >
                  {faq.q}
                </p>
                <p className="text-[#5A5A5A] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Local SEO / CTA ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#F6F4F0]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="mb-8"
            style={{
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            Serving Vancouver, North Shore,<br />
            Richmond, Surrey, and Vancouver Island.
          </h2>
          <p
            className="text-[#5A5A5A] mb-12 mx-auto"
            style={{ fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "600px" }}
          >
            Square One Paving installs decorative driveways across Greater Vancouver and
            Vancouver Island. We&apos;re BC&apos;s only certified HUB Surface Systems applicator
            serving both regions — one team, one standard, coast to coast.
          </p>
          <Link href="/contact">
            <span className="inline-block bg-[#1C2026] text-white px-10 py-4 font-bold text-sm tracking-[0.1em] uppercase transition-all duration-200 hover:bg-[#C8601A]">
              Book a Free Site Visit →
            </span>
          </Link>
        </div>
      </section>

    </main>
  )
}
