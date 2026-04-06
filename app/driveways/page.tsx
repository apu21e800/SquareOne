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
    canonical: "https://squareonepaving.ca/driveways",
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
      <section className="relative overflow-hidden bg-[#1A1A1A] min-h-[75vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/applications/residential-driveways/residential-driveways-01.jpg"
            alt="Decorative stamped asphalt driveway installed by Square One Paving"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/70 to-[#1A1A1A]/20" />
        {/* Orange top accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D66620] via-[#F0A04B] to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 py-28">
          <div className="max-w-2xl">
            <p className="text-[#D66620] text-xs uppercase tracking-[0.25em] font-bold mb-5">
              Decorative Driveways · BC
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[0.96] tracking-tight mb-7">
              The Driveway<br />
              <span className="text-[#D66620]">Your Property</span><br />
              Deserves.
            </h1>
            <p className="text-white/80 text-xl leading-relaxed mb-10 max-w-lg">
              Stamped asphalt patterns, decorative colour coatings, and pavement
              rejuvenation — installed by BC&apos;s most experienced crew.
              No demolition. No disruption. Just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                  Get a Free Quote
                </span>
              </Link>
              <a href="tel:6046126209">
                <span className="inline-block border border-white/25 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-sm transition-colors">
                  604-612-6209
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Floating trust signals */}
        <div className="absolute right-10 bottom-10 hidden lg:flex flex-col gap-3">
          {["No Excavation Required", "Free Site Visits", "Serving BC Since 2000", "Lower Mainland + Vancouver Island"].map((t) => (
            <span key={t} className="bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-semibold px-4 py-2 rounded-full">
              ✓ {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── Why S1 ── */}
      <section className="py-20 bg-white border-b border-[#E8E4DE]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "◈",
                title: "Installed In-Place",
                desc: "No excavation. No base removal. We work directly over your existing asphalt — cleaner, faster, and significantly less expensive than full replacement.",
              },
              {
                icon: "◉",
                title: "25 Years of BC Installs",
                desc: "We've installed decorative driveways across the Lower Mainland and Vancouver Island in every climate condition BC throws at a surface.",
              },
              {
                icon: "◌",
                title: "Manufacturer-Certified",
                desc: "We're an authorized HUB Surface Systems applicator — the only way to access StreetPrint, StreetBond, and DuraShield for residential and commercial installations.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-5">
                <div className="text-2xl text-[#D66620] flex-shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-black text-[#333333] text-lg mb-2">{item.title}</h3>
                  <p className="text-[#626262] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Systems ── */}
      <section className="py-24 px-6 sm:px-8 bg-[#F2EFE9]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">What We Install</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#333333] mb-4">Three Systems. One Right Fit.</h2>
            <p className="text-[#626262] text-lg max-w-2xl">We&apos;ll assess your surface and recommend the right system — or a combination of them.</p>
            <div className="mt-6 h-px bg-gradient-to-r from-[#D66620]/40 to-transparent" />
          </div>

          <div className="grid lg:grid-cols-3 gap-7">
            {systems.map((s) => (
              <div key={s.name} className="bg-white rounded-2xl border border-[#E8E4DE] p-8 flex flex-col relative overflow-hidden hover:shadow-xl hover:border-[#D66620]/30 transition-all">
                {s.badge && (
                  <span
                    className="absolute top-5 right-5 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                    style={{ background: s.badgeColor! }}
                  >
                    {s.badge}
                  </span>
                )}
                <h3 className="text-xl font-black text-[#333333] mb-1.5 pr-24">{s.name}</h3>
                <p className="text-[#D66620] text-sm font-semibold mb-4">{s.tagline}</p>
                <p className="text-[#626262] text-sm leading-relaxed mb-7 flex-1">{s.desc}</p>
                <ul className="space-y-2.5">
                  {s.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2.5 text-sm text-[#333333]">
                      <span className="text-[#D66620] flex-shrink-0 mt-0.5">✓</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
              "/images/applications/residential-driveways/residential-driveways-01.jpg",
              "/images/applications/residential-driveways/residential-driveways-02.jpg",
              "/images/applications/residential-driveways/residential-driveways-03.jpg",
              "/images/applications/residential-driveways/residential-driveways-04.jpg",
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

      {/* ── CTA ── */}
      <section className="py-24 bg-[#32373C]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#F0A04B] text-xs uppercase tracking-[0.22em] font-semibold mb-5">Ready to Get Started?</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Get a Free Driveway Quote
          </h2>
          <p className="text-white/75 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            Tell us your address, surface condition, and what you have in mind.
            We&apos;ll come to you, assess the surface, and give you a clear written quote — no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Request a Quote
              </span>
            </Link>
            <a href="tel:6046126209">
              <span className="inline-block border border-white/25 text-white hover:bg-white/10 px-10 py-4 rounded-lg font-semibold text-sm transition-colors">
                604-612-6209 · Lower Mainland
              </span>
            </a>
          </div>
          <p className="text-white/40 text-xs mt-6">Also serving Victoria & Vancouver Island · 250-391-0270</p>
        </div>
      </section>

    </main>
  )
}
