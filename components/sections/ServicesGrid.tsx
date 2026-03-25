import { services } from "@/lib/services"
import Link from "next/link"

export default function ServicesGrid() {
  return (
    <section className="w-full py-20 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
            Our Services
          </h2>
          <p className="text-lg text-[#8B8680] max-w-2xl mx-auto">
            Four core service lines, all delivered with BC field expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <div className="h-full rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-[#F5F3F0] hover:border-[#E8581A] hover:border-2 border-2 border-transparent cursor-pointer overflow-hidden">
                {/* Placeholder gradient for image */}
                <div className="h-40 bg-gradient-to-br from-[#8B8680]/30 to-[#E8581A]/20" />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">
                    {service.name}
                  </h3>
                  <p className="text-[#8B8680] text-sm mb-2 italic">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-[#8B8680] mb-4 line-clamp-2">
                    {service.shortDescription}
                  </p>
                  <div className="text-[#E8581A] font-semibold text-sm flex items-center gap-2">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
