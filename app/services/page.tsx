import Link from "next/link"
import { services } from "@/lib/services"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Services",
  description:
    "BC's trusted decorative pavement applicator. Stamped asphalt, decorative coatings, preformed thermoplastic, and vapor blasting services across the Lower Mainland and Vancouver Island.",
  slug: "services",
})

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
            Decorative Pavement Services
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
                  {/* Image placeholder */}
                  <div className="h-56 bg-gradient-to-br from-[#8B8680]/20 to-[#E8581A]/10 flex items-center justify-center">
                    <p className="text-[#8B8680]/60 text-sm">{service.name}</p>
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
