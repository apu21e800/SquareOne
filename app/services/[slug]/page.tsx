import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { services, getServiceBySlug } from "@/lib/services"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

const serviceImages: Record<string, string> = {
  "stamped-asphalt": "/images/products/streetprint/streetprint-1.jpg",
  "decorative-coatings": "/images/products/streetbond/streetbond-1.jpg",
  "preformed-thermoplastic": "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  "vapor-blasting": "/images/products/streetbond/streetbond-1.jpg",
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
  return {
    title: `${service.name} | Square One Paving BC`,
    description: service.shortDescription,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const heroImage = serviceImages[service.slug] ?? "/images/products/streetprint/streetprint-1.jpg"

  return (
    <main className="bg-[#FAFAFA]">

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={service.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#D66620]/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 pb-16 pt-36 w-full">
          <Link href="/services" className="text-white/60 hover:text-white text-sm transition-colors mb-4 inline-block">
            ← All Services
          </Link>
          <p className="text-[#F0A04B] text-xs uppercase tracking-[0.25em] font-semibold mb-3">Service</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4 max-w-2xl">
            {service.name}
          </h1>
          <p className="text-white/75 text-lg max-w-xl leading-relaxed">{service.tagline}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 px-6 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#626262] text-base leading-relaxed">{service.fullDescription}</p>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-16 px-6 sm:px-8 bg-[#F2EFE9]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-[10px] font-bold text-[#D66620] uppercase tracking-[0.2em] mb-4">Products Included</h3>
              <ul className="space-y-2.5">
                {service.productsIncluded.map((product) => (
                  <li key={product} className="text-[#333333] text-sm flex items-start gap-2">
                    <span className="text-[#D66620] mt-0.5">◈</span>
                    {product}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-[#D66620] uppercase tracking-[0.2em] mb-4">Applications</h3>
              <ul className="space-y-2.5">
                {service.applications.map((app) => (
                  <li key={app} className="text-[#333333] text-sm flex items-start gap-2">
                    <span className="text-[#D66620] mt-0.5">◉</span>
                    {app}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-[#D66620] uppercase tracking-[0.2em] mb-4">Ideal Clients</h3>
              <ul className="space-y-2.5">
                {service.idealClients.map((client) => (
                  <li key={client} className="text-[#333333] text-sm flex items-start gap-2">
                    <span className="text-[#D66620] mt-0.5">◧</span>
                    {client}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-[#D66620] uppercase tracking-[0.2em] mb-4">Key Benefits</h3>
              <ul className="space-y-2.5">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="text-[#333333] text-sm flex items-start gap-2">
                    <span className="text-[#D66620] font-bold mt-0.5">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 sm:px-8 bg-[#32373C]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F0A04B] text-xs uppercase tracking-[0.22em] font-semibold mb-5">Ready to Get Started?</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-5">
            Get a Free {service.name} Consultation
          </h2>
          <p className="text-white/60 mb-10">
            We&apos;ll assess your site and give you a detailed, no-obligation quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Request a Quote
              </span>
            </Link>
            <a href="tel:6043098212">
              <span className="inline-block border border-white/25 text-white hover:bg-white/10 px-10 py-4 rounded-lg font-semibold text-sm transition-colors">
                604-309-8212
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 px-6 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">More Services</p>
          <h2 className="text-2xl font-black text-[#333333] mb-8">What Else We Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group bg-[#F2EFE9] rounded-xl p-6 border border-[#E8E4DE] hover:border-[#D66620]/40 hover:shadow-md transition-all"
                >
                  <h3 className="font-black text-base text-[#333333] mb-2 group-hover:text-[#D66620] transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-sm text-[#626262]">{s.tagline}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
