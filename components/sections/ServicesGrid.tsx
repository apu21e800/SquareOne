import { services } from "@/lib/services"
import Image from "next/image"
import Link from "next/link"

const serviceImages: Record<string, string> = {
  "stamped-asphalt": "/images/products/streetprint/streetprint-1.jpg",
  "decorative-coatings": "/images/products/streetbond/streetbond-red-roundabout-mountains-01.jpg",
  "preformed-thermoplastic": "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  "vapor-blasting": "/images/services/vapor-blasting/hero.jpg",
}

const serviceDescriptors: Record<string, { eyebrow: string; descriptor: string }> = {
  "stamped-asphalt": {
    eyebrow: "Signature Surface",
    descriptor: "StreetPrint patterns that transform ordinary asphalt into architectural pavement."
  },
  "decorative-coatings": {
    eyebrow: "Colour & Protection",
    descriptor: "StreetBond colour systems engineered for BC's freeze-thaw climate."
  },
  "preformed-thermoplastic": {
    eyebrow: "Precision Markings",
    descriptor: "DecoMark and TrafficPatterns applied with exacting precision for municipalities and developers."
  },
  "vapor-blasting": {
    eyebrow: "Specialist Service",
    descriptor: "BC's most advanced surface preparation and restoration — the quiet revolution in our studio."
  },
}

export default function ServicesGrid() {
  return (
    <section className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <span className="eyebrow">What We Do</span>
          <h2 className="mt-4 mb-4">Four services. One studio.</h2>
          <p className="text-[#5A5A5A] text-lg">
            Each discipline refined over 25 years of BC installations.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const img = serviceImages[service.slug]
            const meta = serviceDescriptors[service.slug]
            const isVaporBlasting = service.slug === "vapor-blasting"

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block overflow-hidden border border-[#E2DDD8] transition-all duration-300 hover:border-[#C8601A] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {img ? (
                    <Image
                      src={img}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="h-full bg-[#F6F4F0]" />
                  )}
                </div>

                {/* Content below image */}
                <div className={`p-6 border-x border-b border-[#E2DDD8] ${
                  isVaporBlasting ? 'bg-[#1C2026]' : 'bg-white'
                }`}>
                  <span className={`text-[10px] font-semibold tracking-[0.15em] uppercase ${
                    isVaporBlasting ? 'text-[#C8601A]' : 'text-[#C8601A]'
                  }`}>
                    {meta?.eyebrow || service.tagline}
                  </span>
                  <h3 className={`mt-2 mb-3 ${
                    isVaporBlasting ? 'text-white' : 'text-[#111111]'
                  }`}>
                    {service.name}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 ${
                    isVaporBlasting ? 'text-white/70' : 'text-[#5A5A5A]'
                  }`}>
                    {meta?.descriptor || service.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#C8601A] text-sm font-semibold group-hover:gap-3 transition-all">
                    Explore <span>→</span>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
