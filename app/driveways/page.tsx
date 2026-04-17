import type { Metadata } from "next"
import Link from "next/link"
import { HubBadge } from "@/components/ui/HubBadge"

export const metadata: Metadata = {
  title: "Decorative Driveways | Stamped Asphalt Vancouver & Victoria",
  description:
    "Square One Paving installs stamped asphalt and decorative driveways across Greater Vancouver and Vancouver Island. StreetPrint patterns that perform through BC winters.",
}

export default function DriveawysPage() {
  return (
    <main>
      {/* SECTION 1: HERO */}
      <section
        className="bg-[#F6F4F0] flex flex-col md:flex-row"
        style={{ minHeight: "70vh" }}
      >
        {/* Left content */}
        <div className="flex flex-col justify-center px-8 py-16 sm:px-12 md:px-14 lg:px-20 md:w-[55%]">
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
            Residential Driveways · Vancouver &amp; Victoria
          </span>
          <h1 className="mt-4 font-light tracking-tight text-[#111111]">
            Driveways that earn<br />a second look.
          </h1>
          <hr className="w-12 border-t border-[#C8601A] my-8" />
          <p className="text-[#5A5A5A] text-lg leading-relaxed max-w-md">
            A stamped asphalt or decorative coated driveway does more than define your property line. It announces your home. We design and install driveways in Vancouver, North Shore, Richmond, and across Vancouver Island that perform through BC winters and improve with age.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <Link
              href="/contact"
              className="bg-[#1C2026] text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors hover:bg-[#C8601A] inline-block"
            >
              Request a Quote →
            </Link>
            <Link
              href="/projects"
              className="border border-[#1C2026] text-[#1C2026] px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors hover:bg-[#1C2026] hover:text-white inline-block"
            >
              See Driveway Projects
            </Link>
          </div>
        </div>
        {/* Right image placeholder */}
        <div className="flex-1 min-h-[320px] md:min-h-0 bg-[#EDE9E3] relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8C4BC] to-[#9E9890]" />
          <div className="absolute bottom-6 left-6 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/50">
            West Vancouver · StreetPrint Ashlar
          </div>
        </div>
      </section>

      {/* SECTION 2: PROCESS */}
      <section className="w-full py-24 md:py-32 bg-white border-t border-[#E2DDD8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 text-center">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
              How It Works
            </span>
            <h2 className="mt-3 text-[#111111]">From spec to surface in days.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E2DDD8]">
            {[
              {
                num: "01",
                title: "Site Visit & Consultation",
                body: "Jan visits your property, assesses the existing asphalt, discusses pattern and colour options, and provides a detailed specification.",
              },
              {
                num: "02",
                title: "Material Selection",
                body: "We walk you through the full StreetPrint pattern library and StreetBond colour system, matched to your home's architecture and surroundings.",
              },
              {
                num: "03",
                title: "Professional Installation",
                body: "Our certified crew handles prep, application, and quality control. Most residential driveways are completed in 1–2 days.",
              },
              {
                num: "04",
                title: "20-Year Performance",
                body: "StreetPrint and StreetBond are engineered for extreme climates. Your driveway comes backed by material warranties and our craftsmanship guarantee.",
              },
            ].map((step) => (
              <div key={step.num} className="bg-white p-8">
                <div className="text-6xl font-light text-[#E2DDD8] leading-none mb-6 select-none">
                  {step.num}
                </div>
                <h3 className="text-[#111111] mb-3">{step.title}</h3>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: MATERIALS */}
      <section className="w-full py-24 md:py-32 bg-[#F6F4F0] border-t border-[#E2DDD8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 text-center">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
              The Materials
            </span>
            <h2 className="mt-3 text-[#111111]">
              HUB Surface Systems,<br />installed by specialists.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-[#E2DDD8]">
            {/* StreetPrint card */}
            <div className="bg-white p-10">
              <div className="h-48 bg-[#EDE9E3] mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8C4BC] to-[#9E9890]" />
                <div className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-widest text-white/60">
                  StreetPrint Pattern
                </div>
              </div>
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
                Stamped Asphalt
              </span>
              <h3 className="mt-2 text-[#111111]">StreetPrint</h3>
              <p className="mt-3 text-sm text-[#5A5A5A] leading-relaxed">
                The 20+ year stamped asphalt system used on over 1,000 North American installations. Available in brick, cobblestone, ashlar slate, and custom patterns — with retroreflective and slip-resistant finishes.
              </p>
            </div>

            {/* StreetBond card */}
            <div className="bg-white p-10">
              <div className="h-48 bg-[#EDE9E3] mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8601A]/20 to-[#8C8480]" />
                <div className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-widest text-white/60">
                  StreetBond Colour System
                </div>
              </div>
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
                Decorative Coating
              </span>
              <h3 className="mt-2 text-[#111111]">StreetBond SR</h3>
              <p className="mt-3 text-sm text-[#5A5A5A] leading-relaxed">
                UV-stable decorative coating system in 50+ colours. Engineered for BC&apos;s freeze-thaw cycles — stays bonded through Pacific winters and resists UV fading season after season.
              </p>
            </div>
          </div>

          {/* HubBadge centered below */}
          <div className="mt-10 flex justify-center">
            <HubBadge variant="light" />
          </div>
        </div>
      </section>

      {/* SECTION 4: LOCAL SEO */}
      <section className="w-full py-24 bg-white border-t border-[#E2DDD8]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[#111111]">
            Serving Vancouver, North Shore, Richmond, Surrey, and Vancouver Island.
          </h2>
          <p className="mt-6 text-[#5A5A5A] text-lg leading-relaxed">
            Square One Paving installs decorative driveways across Greater Vancouver and Vancouver Island.
            Whether you&apos;re in West Vancouver, the Westside, Burnaby, Coquitlam, or Victoria,
            our crews bring the same level of precision and care to every project.
            We are BC&apos;s only certified HUB Surface Systems applicator serving both the Lower Mainland and the Island.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="bg-[#1C2026] text-white px-10 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors hover:bg-[#C8601A] inline-block"
            >
              Request a Free Site Visit →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: BOTTOM CTA */}
      <section className="w-full py-20 bg-[#1C2026] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-white font-light">Ready to upgrade your driveway?</h2>
            <p className="mt-3 text-white/60 text-lg">
              We assess, quote, and schedule within the week.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link
              href="/contact"
              className="bg-[#C8601A] text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors hover:bg-[#A84F15] inline-block text-center"
            >
              Get a Quote
            </Link>
            <a
              href="tel:18773910270"
              className="border border-white/30 text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors hover:border-white hover:bg-white/10 inline-block text-center"
            >
              1-877-391-0270
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
