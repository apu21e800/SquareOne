import Link from "next/link"
import Image from "next/image"
import { services } from "@/lib/services"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Services",
  description:
    "BC's trusted decorative pavement applicator. Stamped asphalt, decorative coatings, preformed thermoplastic, and vapor blasting services across the Lower Mainland and Vancouver Island.",
  slug: "services",
})

const serviceImages: Record<string, string> = {
  "stamped-asphalt": "/images/products/streetprint/streetprint-1.jpg",
  "decorative-coatings": "/images/products/streetbond/streetbond-red-brick-pattern-waterfront-01.jpg",
  "preformed-thermoplastic": "/images/applications/regulatory-markings/premark-arrows-intersection-01.jpg",
  "vapor-blasting": "/images/applications/traffic-calming/roundabout-red-brick-mountains-01.jpg",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F5F3F0]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
            What We Do
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D2D2D] mb-6 max-w-3xl">
            From Concept to Curb
          </h1>
          <p className="text-lg text-[#8B8680] max-w-2xl">
            As an authorized HUB Surface Systems applicator, Square One Paving
            delivers high-performance surface solutions across BC. From stamped
            asphalt crosswalks to vapor blasting for surface prep, we bring
            precision and durability to every project.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <div className="group h-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden">
                  {/* Real image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={serviceImages[service.slug] ?? "/images/hero/hero-bg.jpg"}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-[#2D2D2D] mb-2 group-hover:text-[#E8581A] transition-colors">
                      {service.name}
                    </h2>
                    <p className="text-[#E8581A] font-medium text-sm mb-4">
                      {service.tagline}
                    </p>
                    <p className="text-[#8B8680] mb-6">
                      {service.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.applications.slice(0, 4).map((app) => (
                        <span
                          key={app}
                          className="text-xs px-3 py-1 rounded-full bg-[#F5F3F0] text-[#8B8680]"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                    <span className="text-[#E8581A] font-semibold text-sm">
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Vapor Blasting differentiator band */}
          <div className="mt-12 rounded-2xl overflow-hidden bg-gradient-to-r from-[#0F2A35] to-[#1A3F4F] p-10 lg:p-14">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-block bg-[#4ECDC4]/20 text-[#4ECDC4] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                  Our Differentiator
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Mobile Vapor Blasting</h2>
                <p className="text-white/65 mb-8">The only clean surface prep system that comes to you — no silica dust, no harsh chemicals, no mess. We blast your surface, bag our waste, and leave you with a surface that&apos;s ready for anything.</p>
                <Link href="/services/vapor-blasting">
                  <span className="inline-block bg-white text-[#0F2A35] font-bold px-7 py-3.5 rounded-lg text-sm hover:bg-[#F2EFE9] transition-colors">
                    Learn More About Vapor Blasting →
                  </span>
                </Link>
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/applications/traffic-calming/roundabout-red-brick-mountains-01.jpg"
                  alt="Vapor blasting service"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 sm:px-8 bg-[#2D2D2D]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Not sure which service you need?
          </h2>
          <p className="text-white/70 mb-10">
            Tell us about your project and we&apos;ll recommend the right
            solution.
          </p>
          <Link href="/contact">
            <button className="bg-[#E8581A] hover:bg-[#d44f16] text-white px-10 py-4 rounded-lg font-semibold text-lg transition">
              Get a Free Consultation
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
