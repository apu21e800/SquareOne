import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vapor Blasting | Mobile Surface Restoration | Square One Paving",
  description:
    "Mobile vapor blasting across BC. Wet-abrasive surface prep, road marking removal, graffiti and coating removal — no silica dust, no chemical runoff.",
  keywords: [
    "vapor blasting BC",
    "wet blasting Vancouver",
    "mobile vapor blasting Lower Mainland",
    "dustless blasting Victoria",
    "road marking removal BC",
    "graffiti removal Vancouver",
    "surface prep BC",
    "paint removal concrete BC",
  ],
  alternates: {
    canonical: "https://squareonepaving.com/vapor-blasting",
  },
}

const applications = [
  {
    title: "Road marking removal",
    body: "Thermoplastic, paint, and tape removed cleanly before new lane configuration.",
  },
  {
    title: "Decorative surface prep",
    body: "Bringing existing asphalt and concrete to bare surface for coating systems.",
  },
  {
    title: "Graffiti removal",
    body: "Brick, stone, and concrete cleaned without surface damage or chemical residue.",
  },
  {
    title: "Coating strip-back",
    body: "Failed paints, epoxies, and urethanes removed without heat or solvents.",
  },
  {
    title: "Heritage surface restoration",
    body: "Controlled profile for brick, sandstone, and historic concrete facades.",
  },
  {
    title: "Fleet and equipment prep",
    body: "Rust, oxidation, and contamination removed ahead of recoating or inspection.",
  },
]

const whyPoints = [
  {
    eyebrow: "01",
    title: "Zero silica dust",
    body: "Water suppresses the airborne dust profile at the source. Safer for crews, bystanders, and adjacent workspaces.",
  },
  {
    eyebrow: "02",
    title: "No chemical runoff",
    body: "Inert abrasive media combined with municipal water. No solvent discharge, no chemical containment required.",
  },
  {
    eyebrow: "03",
    title: "Mobile across BC",
    body: "Truck-mounted equipment. We come to the site — industrial yard, heritage facade, highway corridor, driveway.",
  },
  {
    eyebrow: "04",
    title: "Surface-accurate profile",
    body: "Calibrated pressure and media selection for the substrate — brick reads as brick when we leave, not abraded.",
  },
]

export default function VaporBlastingPage() {
  return (
    <main className="bg-[#1C2026]">
      {/* Hero */}
      <section className="relative w-full bg-[#1C2026] pt-20 pb-24 sm:pt-28 sm:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="max-w-4xl">
            <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-6">
              Signature Service
            </p>
            <h1
              className="text-white mb-0"
              style={{
                fontWeight: 300,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.8rem, 6vw, 6rem)",
              }}
            >
              Vapor blasting.<br />Mobile across BC.
            </h1>
            <div className="w-12 h-[3px] bg-[#C8601A] my-8" />
            <p className="text-white/70 text-lg font-light leading-relaxed max-w-2xl">
              Wet-abrasive surface restoration brought directly to the job site.
              Used by municipalities, general contractors, and property managers
              from the Lower Mainland to Vancouver Island.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Link href="/contact">
                <button className="w-full sm:w-auto bg-white hover:bg-[#F6F4F0] text-[#1C2026] px-8 py-4 text-sm font-semibold tracking-[0.08em] uppercase rounded-none transition-colors">
                  Request a Site Visit
                </button>
              </Link>
              <a href="tel:16043098212">
                <button className="w-full sm:w-auto border border-white/30 hover:border-white text-white hover:bg-white/5 px-8 py-4 text-sm font-semibold tracking-[0.08em] uppercase rounded-none transition-colors">
                  604-309-8212
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is it */}
      <section className="w-full bg-[#242A32] py-20 sm:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20">
            <div>
              <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
                The Process
              </p>
              <h2
                className="text-white"
                style={{
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(1.8rem, 3vw, 3rem)",
                }}
              >
                Water, abrasive media, and calibrated pressure.
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-white/70 text-base leading-relaxed">
                Vapor blasting is a wet-abrasive process. A fine mineral abrasive
                is suspended in a controlled water stream and delivered at
                calibrated pressure to strip coatings, markings, and surface
                contamination from hard substrates.
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                Unlike dry sandblasting, the water suppresses airborne silica
                at the source — which means crews can work on active sites, next
                to occupied buildings, and inside environmental containment
                zones that would never accept a dry process.
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                Unlike chemical stripping, there is no solvent, no neutralising
                agent, and no disposal burden beyond the spent abrasive and
                captured coating residue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="w-full bg-[#1C2026] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="max-w-2xl mb-14">
            <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
              Applications
            </p>
            <h2
              className="text-white"
              style={{
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontSize: "clamp(1.8rem, 3vw, 3rem)",
              }}
            >
              Six use cases. One mobile unit.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {applications.map((a) => (
              <div key={a.title} className="bg-[#1C2026] p-8">
                <div className="w-8 h-[2px] bg-[#C8601A] mb-6" />
                <h3 className="text-white text-base font-semibold mb-3">
                  {a.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why S1 */}
      <section className="w-full bg-[#242A32] py-20 sm:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="max-w-2xl mb-14">
            <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
              Why Square One
            </p>
            <h2
              className="text-white"
              style={{
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontSize: "clamp(1.8rem, 3vw, 3rem)",
              }}
            >
              BC&apos;s mobile vapor blasting contractor.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {whyPoints.map((p) => (
              <div key={p.eyebrow} className="bg-[#242A32] p-10">
                <p
                  className="text-[#C8601A] mb-5"
                  style={{
                    fontFamily: "var(--font-playfair), ui-serif, Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.75rem",
                    lineHeight: 1,
                  }}
                >
                  {p.eyebrow}
                </p>
                <h3 className="text-white text-lg font-semibold mb-4">
                  {p.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#1C2026] py-24 sm:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-end">
            <div className="max-w-3xl">
              <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-6">
                Book a Site Assessment
              </p>
              <h2
                className="text-white mb-6"
                style={{
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                }}
              >
                Tell us what the surface<br />needs to be.
              </h2>
              <div className="w-12 h-[2px] bg-[#C8601A] mb-6" />
              <p className="text-white/60 text-base leading-relaxed max-w-md">
                We&apos;ll walk the site, assess substrate and contamination, and
                come back with a written scope. Mobile across the Lower Mainland
                and Vancouver Island.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
              <Link href="/contact">
                <button className="w-full sm:w-auto bg-white hover:bg-[#F6F4F0] text-[#1C2026] px-8 py-4 text-sm font-semibold tracking-[0.08em] uppercase rounded-none transition-colors">
                  Request a Quote
                </button>
              </Link>
              <a href="tel:16043098212">
                <button className="w-full sm:w-auto border border-white/25 hover:border-white text-white hover:bg-white/5 px-8 py-4 text-sm font-semibold tracking-[0.08em] uppercase rounded-none transition-colors">
                  604-309-8212
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
