import Link from "next/link"

type ServiceCard = {
  slug: string
  eyebrow: string
  name: string
  descriptor: string
  dark: boolean
}

const serviceCards: ServiceCard[] = [
  {
    slug: "stamped-asphalt",
    eyebrow: "Signature Surface",
    name: "Stamped Asphalt",
    descriptor: "StreetPrint patterns that transform ordinary asphalt into architectural pavement.",
    dark: false,
  },
  {
    slug: "decorative-coatings",
    eyebrow: "Colour & Protection",
    name: "Decorative Coatings",
    descriptor: "StreetBond colour systems engineered for BC's freeze-thaw climate.",
    dark: false,
  },
  {
    slug: "preformed-thermoplastic",
    eyebrow: "Precision Markings",
    name: "Thermoplastic Markings",
    descriptor: "DecoMark and TrafficPatterns applied with exacting precision for municipalities and developers.",
    dark: false,
  },
  {
    slug: "vapor-blasting",
    eyebrow: "Specialist Service",
    name: "Vapor Blasting",
    descriptor: "BC's most advanced surface preparation and restoration — the quiet revolution in our studio.",
    dark: true,
  },
]

export default function ServicesGrid() {
  return (
    <section className="w-full py-24 md:py-32 bg-white border-t border-[#E2DDD8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">What We Do</span>
        <h2 className="mt-3 text-[#111111]">Four services. One studio.</h2>
        <p className="mt-4 text-[#5A5A5A] text-lg max-w-md">Each discipline refined over 25 years of BC installations.</p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E2DDD8]">
          {serviceCards.map((card) =>
            card.dark ? (
              <Link key={card.slug} href="/vapor-blasting" className="group block bg-[#1C2026]">
                <div className="aspect-[4/3] bg-[#242A32] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#242A32] to-[#0D1117] group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8601A] border border-[#C8601A]/30 px-2 py-1">
                    BC Exclusive
                  </div>
                </div>
                <div className="p-6 border-t border-white/10">
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">{card.eyebrow}</span>
                  <h3 className="mt-2 text-white">{card.name}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{card.descriptor}</p>
                  <span className="mt-4 inline-block text-[#C8601A] text-xs font-semibold tracking-[0.1em] uppercase">Explore →</span>
                </div>
              </Link>
            ) : (
              <Link key={card.slug} href={`/services/${card.slug}`} className="group block bg-white">
                <div className="aspect-[4/3] bg-[#EDE9E3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E2DDD8] to-[#C8C4BC] group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 border-t border-[#E2DDD8] group-hover:border-[#C8601A] transition-colors">
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">{card.eyebrow}</span>
                  <h3 className="mt-2 text-[#111111]">{card.name}</h3>
                  <p className="mt-2 text-sm text-[#5A5A5A] leading-relaxed">{card.descriptor}</p>
                  <span className="mt-4 inline-block text-[#C8601A] text-xs font-semibold tracking-[0.1em] uppercase">Explore →</span>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  )
}
