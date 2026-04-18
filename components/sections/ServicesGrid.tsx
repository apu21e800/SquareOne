import { services } from "@/lib/services"
import Image from "next/image"
import Link from "next/link"

export default function ServicesGrid() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#C8601A] font-semibold mb-3">What We Do</p>
          <h2 className="text-[2.5rem] font-light text-[#111111] leading-tight tracking-[-0.02em]">Four services. One specialist team.</h2>
          <p className="text-[#5A5A5A] mt-4 max-w-xl leading-relaxed">We install the surfaces that define BC communities — from municipal crosswalks to residential driveways.</p>
        </div>

        {/* 4 cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="border border-[#E2DDD8] rounded-none overflow-hidden group block"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover rounded-none"
                  src={service.imageUrl || "/images/applications/crosswalks/crosswalk-hero.jpg"}
                  alt={service.name}
                />
              </div>
              {/* Body */}
              <div className="p-6 bg-white border-t-[3px] border-[#C8601A]">
                <h3 className="font-semibold text-lg text-[#111111]">{service.name}</h3>
                <p className="text-sm text-[#5A5A5A] mt-2 leading-relaxed">{service.tagline}</p>
                <span className="text-[#C8601A] text-sm font-semibold mt-4 flex items-center gap-1">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
