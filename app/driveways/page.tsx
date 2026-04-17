// ─── SEO PILLAR PAGE ──────────────────────────────────────────────────────────
// This is the primary SEO pillar page for decorative driveway paving in BC.
// Target keywords:
//   - "driveway paving Vancouver"
//   - "driveway paving Victoria"
//   - "stamped asphalt driveway Vancouver"
//   - "decorative driveway BC"
//   - "driveway resurfacing Lower Mainland"
// Page intent: capture high-intent residential + strata buyers researching
// decorative driveway options. Content should prioritize product differentiation
// (StreetPrint, StreetBond, DuraShield), trust signals, and regional coverage.
// TODO: Add structured FAQ schema (JSON-LD) for rich snippet eligibility.
// TODO: Add before/after image gallery with alt-text optimized for local SEO.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

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
    canonical: "https://squareonepaving.com/driveways",
  },
}

const systems = [
  {
    name: "StreetPrint Stamped Asphalt",
    tagline: "The look of stone. The durability of asphalt.",
    desc: "StreetPrint transforms your existing asphalt into a rich decorative surface — brick, cobblestone, slate, and custom patterns — without excavating the base. Installed in place, in days.",
    specs: ["Installed over existing asphalt", "Patterns: Brick, Cobblestone, Slate, Running Bond", "Snowplow safe, ASTM slip-resistant", "8–12 year service life"],
    badge: "Most Popular",
    badgeColor: "#D66620",
  },
  {
    name: "StreetBond Colour Coating",
    tagline: "Vivid colour. 5+ years of retention.",
    desc: "StreetBond is a high-performance acrylic coating that bonds permanently to asphalt or concrete. UV stable, anti-skid, and available in dozens of custom colours. Ideal for refreshing and protecting existing driveways.",
    specs: ["Bonds to asphalt and concrete", "20-year colour retention warranty", "Anti-skid aggregate", "Pantone custom colour matching"],
    badge: "Best Value",
    badgeColor: "#32373C",
  },
  {
    name: "DuraShield Pavement Rejuvenation",
    tagline: "Protect what you have. Extend by years.",
    desc: "DuraShield penetrates oxidized asphalt, rejuvenating the binder and extending pavement life 3–5 years. The smart first step before any decorative system, or a standalone maintenance treatment.",
    specs: ["Penetrating rejuvenator", "Extends pavement life 3–5 years", "Restores oxidized asphalt", "Often the first step before StreetPrint"],
    badge: null,
    badgeColor: null,
  },
]

const regions = [
  { name: "Vancouver", sub: "Metro Vancouver" },
  { name: "Victoria", sub: "Greater Victoria" },
  { name: "Burnaby", sub: "& New Westminster" },
  { name: "Surrey", sub: "& Langley" },
  { name: "Coquitlam", sub: "Tri-Cities" },
  { name: "Richmond", sub: "& Delta" },
  { name: "North Shore", sub: "North Vancouver · West Vancouver" },
  { name: "Saanich", sub: "& Oak Bay" },
  { name: "Langford", sub: "West Shore" },
  { name: "Maple Ridge", sub: "& Pitt Meadows" },
  { name: "Abbotsford", sub: "& Chilliwack" },
  { name: "Nanaimo", sub: "& Central Island" },
]

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
    a: "Contact us with your address and a description of the work. We'll schedule a free site visit, assess the surface, and provide a written quote within 48 hours.",
  },
  {
    q: "Do you serve Vancouver Island?",
    a: "Yes — we serve both the Lower Mainland and Vancouver Island. Our mobile crews operate out of Maple Ridge and Victoria, so no job site in the covered regions is out of reach.",
  },
]

export default function DriveywaysPage() {
  return (
    <main className="bg-[#FAFAFA]">

      {/* ── Hero ── */}
      <section className="w-full min-h-[70vh] bg-[#F6F4F0] grid grid-cols-1 md:grid-cols-2">

        {/* Left: Content */}
        <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16">
          <span className="eyebrow">Residential Driveways · Vancouver & Victoria</span>

          <h1 className="mt-6 mb-6">
            Driveways that earn<br />
            a second look.
          </h1>

          <p className="text-[#5A5A5A] text-lg leading-relaxed mb-10 max-w-lg">
            A stamped asphalt or decorative coated driveway does more than define your
            property line. It announces your home. We design and install driveways in Vancouver,
            North Shore, Richmond, and across Vancouver Island that perform through BC winters
            and improve with age.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <button className="bg-[#1C2026] text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-[#C8601A] w-full sm:w-auto">
                Request a Quote →
              </button>
            </Link>
            <Link href="/projects">
              <button className="border border-[#1C2026] text-[#1C2026] px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-[#1C2026] hover:text-white w-full sm:w-auto">
                See Driveway Projects
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative min-h-[400px] md:min-h-0">
          <Image
            src="/images/applications/private-driveways/chilliwack-townhomes-brick-driveway-01.jpg"
            alt="Decorative stamped asphalt driveway installed by Square One Paving"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="eyebrow">How It Works</span>
          <h2 className="mt-4 mb-16">From spec to surface in days.</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              {
                num: "01",
                title: "Site Visit & Consultation",
                desc: "Jan visits your property, assesses the existing asphalt, discusses pattern and colour options, and provides a detailed specification."
              },
              {
                num: "02",
                title: "Material Selection",
                desc: "We walk you through the full StreetPrint pattern library and StreetBond colour system, matched to your home's architecture and surroundings."
              },
              {
                num: "03",
                title: "Professional Installation",
                desc: "Our certified crew handles prep, application, and quality control. Most residential driveways are completed in 1–2 days."
              },
              {
                num: "04",
                title: "20-Year Performance",
                desc: "StreetPrint and StreetBond are engineered for extreme climates. Your driveway comes backed by material warranties and our craftsmanship guarantee."
              }
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="text-7xl font-light text-[#EDEBE7] absolute -top-4 -left-2">
                  {step.num}
                </div>
                <div className="relative pt-8">
                  <div className="text-sm font-bold text-[#C8601A] mb-2">{step.num}</div>
                  <h3 className="mb-3">{step.title}</h3>
                  <p className="text-[#5A5A5A] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products Used ── */}
      <section className="py-24 md:py-32 bg-[#F6F4F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="eyebrow">The Materials</span>
          <h2 className="mt-4 mb-16">HUB Surface Systems, installed by specialists.</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* StreetPrint */}
            <div className="bg-white border border-[#E2DDD8] p-8">
              <h3 className="mb-2">StreetPrint</h3>
              <p className="text-[#5A5A5A] text-sm mb-6">
                20+ year stamped asphalt system used on over 1,000 North American installations
              </p>
              <ul className="space-y-2.5">
                {systems[0].specs.map((spec) => (
                  <li key={spec} className="flex items-start gap-2.5 text-sm text-[#2C2C2C]">
                    <span className="text-[#C8601A] flex-shrink-0 mt-0.5">✓</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* StreetBond */}
            <div className="bg-white border border-[#E2DDD8] p-8">
              <h3 className="mb-2">StreetBond</h3>
              <p className="text-[#5A5A5A] text-sm mb-6">
                UV-stable decorative coating system in 50+ colours
              </p>
              <ul className="space-y-2.5">
                {systems[1].specs.map((spec) => (
                  <li key={spec} className="flex items-start gap-2.5 text-sm text-[#2C2C2C]">
                    <span className="text-[#C8601A] flex-shrink-0 mt-0.5">✓</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* HubBadge centered */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-[#E2DDD8] text-xs font-semibold tracking-[0.12em] uppercase text-[#5A5A5A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8601A] flex-shrink-0" />
              Authorized HUB Surface Systems Applicator
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery strip placeholder ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="mb-10">
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">Our Work</p>
            <h2 className="text-4xl font-black text-[#333333]">Driveways Across BC</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "/images/applications/private-driveways/chilliwack-townhomes-brick-driveway-01.jpg",
              "/images/applications/private-driveways/cobblestone-residential-driveway-closeup-01.jpg",
              "/images/applications/private-driveways/craftsman-home-charcoal-herringbone-driveway-01.jpg",
              "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
            ].map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-[#F2EFE9]">
                <Image
                  src={src}
                  alt={`Decorative driveway project by Square One Paving — BC`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/projects">
              <span className="inline-block border border-[#32373C]/20 text-[#32373C] hover:bg-[#32373C]/5 px-8 py-3 rounded-lg font-semibold text-sm transition-colors">
                View All Projects →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Regions ── */}
      <section className="py-20 bg-[#F2EFE9]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="mb-10">
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">Service Area</p>
            <h2 className="text-4xl font-black text-[#333333]">We Come to You</h2>
            <p className="text-[#626262] mt-3 max-w-xl">Mobile crews operating from Maple Ridge and Victoria cover both regions. No travel surcharge within service areas.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {regions.map((r) => (
              <div key={r.name} className="bg-white rounded-xl p-4 border border-[#E8E4DE] hover:border-[#D66620]/40 transition-colors text-center">
                <p className="font-black text-[#333333] text-sm">{r.name}</p>
                <p className="text-[#626262] text-xs mt-0.5 leading-tight">{r.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <div className="mb-12 text-center">
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">Common Questions</p>
            <h2 className="text-4xl font-black text-[#333333]">What We Get Asked</h2>
          </div>
          <div className="space-y-0 divide-y divide-[#E8E4DE]">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <p className="font-black text-[#333333] text-base mb-3">{faq.q}</p>
                <p className="text-[#626262] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local SEO Copy Block ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="mb-6">Serving Vancouver, North Shore, Richmond, Surrey, and Vancouver Island.</h2>
          <p className="text-[#5A5A5A] text-lg leading-relaxed mb-10">
            Square One Paving installs decorative driveways across Greater Vancouver and Vancouver Island.
            Whether you&apos;re in West Vancouver, the Westside, Burnaby, Coquitlam, or Victoria,
            our crews bring the same level of precision and care to every project.
            We are BC&apos;s only certified HUB Surface Systems applicator serving both the Lower Mainland and the Island.
          </p>
          <Link href="/contact">
            <button className="bg-[#1C2026] text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-[#C8601A]">
              Request a Free Site Visit →
            </button>
          </Link>
        </div>
      </section>

    </main>
  )
}
