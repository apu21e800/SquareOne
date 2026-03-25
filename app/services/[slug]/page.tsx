import { notFound } from "next/navigation"
import Link from "next/link"
import { services, getServiceBySlug } from "@/lib/services"
import { buildMetadata } from "@/lib/seo"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}

  return buildMetadata({
    title: service.name,
    description: service.shortDescription,
    slug: `services/${service.slug}`,
  })
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#F5F3F0]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/services"
            className="text-sm text-[#8B8680] hover:text-[#E8581A] transition mb-6 inline-block"
          >
            ← Back to Services
          </Link>
          <p className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
            Service
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D2D2D] mb-4 max-w-3xl">
            {service.name}
          </h1>
          <p className="text-xl text-[#E8581A] font-medium mb-6">
            {service.tagline}
          </p>
          <p className="text-lg text-[#8B8680] max-w-3xl">
            {service.fullDescription}
          </p>
        </div>
      </section>

      {/* Image placeholder */}
      <section className="px-6 sm:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="h-80 md:h-96 bg-gradient-to-br from-[#8B8680]/20 to-[#E8581A]/10 rounded-2xl flex items-center justify-center">
            <p className="text-[#8B8680]/60">{service.name} Image</p>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-16 px-6 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Products */}
            <div>
              <h3 className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
                Products Included
              </h3>
              <ul className="space-y-2">
                {service.productsIncluded.map((product) => (
                  <li key={product} className="text-[#2D2D2D] text-sm">
                    {product}
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div>
              <h3 className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
                Applications
              </h3>
              <ul className="space-y-2">
                {service.applications.map((app) => (
                  <li key={app} className="text-[#2D2D2D] text-sm">
                    {app}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal Clients */}
            <div>
              <h3 className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
                Ideal Clients
              </h3>
              <ul className="space-y-2">
                {service.idealClients.map((client) => (
                  <li key={client} className="text-[#2D2D2D] text-sm">
                    {client}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
                Benefits
              </h3>
              <ul className="space-y-2">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="text-[#2D2D2D] text-sm">
                    ✓ {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 sm:px-8 bg-[#2D2D2D]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to get started with {service.name}?
          </h2>
          <p className="text-white/70 mb-10">
            Get a free consultation and quote for your BC project.
          </p>
          <Link href="/contact">
            <button className="bg-[#E8581A] hover:bg-[#d44f16] text-white px-10 py-4 rounded-lg font-semibold text-lg transition">
              Request a Quote
            </button>
          </Link>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 px-6 sm:px-8 bg-[#F5F3F0]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-8">
            Other Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`}>
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition group">
                    <h3 className="text-lg font-bold text-[#2D2D2D] mb-2 group-hover:text-[#E8581A] transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-sm text-[#8B8680]">{s.tagline}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
