import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { services, getServiceBySlug } from "@/lib/services"
import type { Metadata } from "next"
import Container from "@/components/ui/Container"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
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

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const serviceIndex = services.findIndex((s) => s.slug === service.slug)
  const accent = String(serviceIndex + 1).padStart(2, "0")
  const otherServices = services.filter((s) => s.slug !== service.slug)

  return (
    <main className="bg-white">
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0">
          <Image src={service.imageUrl} alt={service.name} fill priority sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.55)] via-[rgba(10,10,10,0.45)] to-[rgba(10,10,10,0.92)]" />
          <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)" }} />
        </div>

        <Container className="relative z-10 w-full pt-32 pb-20 lg:pb-28">
          <Link href="/services" className="group inline-flex items-center gap-2 text-white/65 hover:text-white text-[11px] uppercase tracking-[0.22em] font-semibold mb-8 transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
              <path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
            All Services
          </Link>

          <div className="flex items-center gap-3 mb-7">
            <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-bold">Service · {accent}</span>
          </div>
          <h1 className="text-white display-h max-w-4xl" style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}>
            {service.name}.
          </h1>
          <p className="text-white/80 text-base lg:text-xl mt-7 max-w-2xl leading-[1.65] font-light italic">
            {service.tagline}
          </p>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-20">
            <div className="lg:max-w-[280px]">
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#F26430] font-bold">Overview</p>
              </div>
              <h2 className="text-[#0A0A0A] display-h" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
                What it is.<br />
                <span className="italic font-extralight">Why it works.</span>
              </h2>
            </div>
            <div className="lg:pt-2">
              <p className="text-[#2C2C2C] text-[16px] lg:text-[17px] leading-[1.75] font-light max-w-3xl">
                {service.fullDescription}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-[#F6F4F0]">
        <Container>
          <div className="mb-12 lg:mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#F26430] font-bold">The Spec Sheet</p>
            </div>
            <h2 className="text-[#0A0A0A] display-h" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)" }}>
              Everything that goes into <span className="italic font-extralight">a {service.name.toLowerCase()} install.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-[#E2DDD8]">
            {[
              { eyebrow: "01", title: "Products Included", items: service.productsIncluded },
              { eyebrow: "02", title: "Applications", items: service.applications },
              { eyebrow: "03", title: "Ideal Clients", items: service.idealClients },
              { eyebrow: "04", title: "Key Benefits", items: service.benefits },
            ].map((col) => (
              <div key={col.title} className="border-b border-[#E2DDD8] md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 p-7 lg:p-8 bg-white">
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#F26430] font-bold">{col.eyebrow}</span>
                  <div className="h-px flex-1 bg-[#E2DDD8]" />
                </div>
                <h3 className="text-[#0A0A0A] font-semibold text-[17px] tracking-[-0.005em] leading-[1.2] mb-5">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-[#2C2C2C] leading-[1.55] font-light">
                      <span className="text-[#F26430] flex-shrink-0 mt-1" aria-hidden>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5.5L4 7.5L8 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative bg-[#0A0A0A] py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={service.imageUrl} alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-25" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.92)] via-[rgba(10,10,10,0.85)] to-[rgba(10,10,10,0.95)]" />
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(242,100,48,0.14) 0%, transparent 65%)" }} />

        <Container className="relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="block w-8 h-[1px] bg-[#F26430]/60" />
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#FF8A5C] font-bold">Ready to Spec</p>
              <span className="block w-8 h-[1px] bg-[#F26430]/60" />
            </div>
            <h2 className="text-white display-h" style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}>
              A free {service.name.toLowerCase()}<br />
              <span className="italic font-extralight">consultation,</span>{" "}
              <span className="text-[#F26430]">on us.</span>
            </h2>
            <p className="text-white/70 mt-7 text-[15.5px] lg:text-base leading-[1.7] font-light max-w-lg mx-auto">
              We&apos;ll meet you on site, assess substrate and conditions, and put together a detailed quote. No obligation, no charge for the visit.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-8 py-4 font-semibold text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:bg-[#F26430] hover:text-white transition-colors duration-300">
                Request a Quote<ArrowRight />
              </Link>
              <a href="tel:+16044669902" className="border border-white/25 text-white px-8 py-4 font-medium text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:bg-white hover:text-[#0A0A0A] hover:border-white transition-colors duration-300">
                604-466-9902
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#F26430] font-bold">More Services</p>
              </div>
              <h2 className="text-[#0A0A0A] display-h" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2rem)" }}>
                What else we do.
              </h2>
            </div>
            <Link href="/services" className="group inline-flex items-center gap-3 text-[#0A0A0A] text-[12px] uppercase tracking-[0.18em] font-bold border-b-2 border-[#F26430] pb-1.5 hover:gap-4 transition-all">
              All services<ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group block relative aspect-[4/3] overflow-hidden bg-[#0A0A0A] border border-[#E2DDD8] hover:border-[#F26430]/40 transition-all">
                <Image src={s.imageUrl} alt={s.name} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.92)] via-[rgba(10,10,10,0.30)] to-transparent" />
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-white/85 font-semibold">0{services.findIndex(x => x.slug === s.slug) + 1}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <h3 className="text-white font-semibold text-[18px] tracking-[-0.005em] leading-[1.2] mb-1 group-hover:text-[#FF8A5C] transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-white/70 text-[12.5px] leading-[1.5] font-light line-clamp-2">{s.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
