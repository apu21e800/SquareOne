import Hero from "@/components/sections/Hero"
import StatsBar from "@/components/sections/StatsBar"
import ServicesGrid from "@/components/sections/ServicesGrid"
import VaporBlastingBand from "@/components/sections/VaporBlastingBand"
import ProjectsPreview from "@/components/sections/ProjectsPreview"
import TrustStrip from "@/components/sections/TrustStrip"
import CTASection from "@/components/sections/CTASection"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />

      {/* Vapor Blasting featured callout */}
      <section className="w-full bg-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-stone-900 text-white rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-1">
                <p className="text-[#E8581A] text-xs uppercase tracking-widest font-semibold mb-2">Featured Service</p>
                <h3 className="text-2xl font-bold mb-3">Mobile Vapor Blasting</h3>
                <p className="text-stone-300 leading-relaxed">
                  The cleanest surface prep available. We bring mobile vapor blasting to your site —
                  for graffiti removal, coating prep, line removal, and surface restoration.
                  No silica dust. No mess. Just a clean surface ready for whatever comes next.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  href="/services/vapor-blasting"
                  className="inline-block bg-[#E8581A] hover:bg-[#d44f16] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesGrid />

      {/* HUB partnership trust signal */}
      <section className="py-12 border-t border-stone-200 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Authorized Applicator</p>
            <p className="text-stone-700 font-semibold text-lg">HUB Surface Systems Products</p>
            <p className="text-stone-500 text-sm mt-1">We install the same systems specified by 500+ Canadian municipalities — StreetPrint, StreetBond, TrafficPatterns, DecoMark.</p>
          </div>
          <a
            href="https://hubss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#E8581A] hover:underline font-medium whitespace-nowrap"
          >
            Learn about HUB products →
          </a>
        </div>
      </section>

      <VaporBlastingBand />
      <ProjectsPreview />
      <TrustStrip />
      <CTASection />
    </main>
  )
}
