import { services } from "@/lib/services"
import Image from "next/image"
import Link from "next/link"

const serviceImages: Record<string, string> = {
  "stamped-asphalt": "/images/products/streetprint/streetprint-1.jpg",
  "decorative-coatings": "/images/products/streetbond/streetbond-1.jpg",
  "preformed-thermoplastic": "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  "vapor-blasting": "/images/products/streetbond/streetbond-1.jpg",
}

const serviceIcons: Record<string, string> = {
  "stamped-asphalt": "◈",
  "decorative-coatings": "◉",
  "preformed-thermoplastic": "◧",
  "vapor-blasting": "◌",
}

export default function ServicesGrid() {
  return (
    <section className="w-full py-24 bg-[#F2EFE9]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="mb-14">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">What We Do</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-[#333333]">Our Services</h2>
            <p className="text-[#626262] max-w-sm text-sm leading-relaxed">
              Four core service lines. Every crew certified. Every install built to outlast the warranty.
            </p>
          </div>
          <div className="mt-6 h-px bg-gradient-to-r from-[#D66620]/40 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const img = serviceImages[service.slug]
            const icon = serviceIcons[service.slug] ?? "◈"
            return (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group block bg-white rounded-xl overflow-hidden border border-[#E8E4DE] hover:border-[#D66620]/40 hover:shadow-xl transition-all">
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-[#F2EFE9]">
                  {img ? (
                    <Image
                      src={img}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="h-full bg-gradient-to-br from-[#D66620]/20 to-[#F0A04B]/10" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-lg">{icon}</span>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-black text-[#333333] mb-1.5 group-hover:text-[#D66620] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-[#D66620] text-xs font-semibold mb-2">{service.tagline}</p>
                  <p className="text-sm text-[#626262] line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <p className="text-[#D66620] text-xs font-bold uppercase tracking-widest mt-3 group-hover:tracking-[0.2em] transition-all duration-200">
                    Learn More →
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
