"use client"

import { services } from "@/lib/services"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Container from "@/components/ui/Container"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ServicesGrid() {
  const [lead, ...rest] = services

  return (
    <section className="bg-white section-padding relative overflow-hidden">
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none opacity-50" style={{ background: "radial-gradient(ellipse, rgba(242,100,48,0.05) 0%, transparent 70%)" }} />

      <Container>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mb-14 lg:mb-20 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-end"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#F26430] font-semibold">What We Do</p>
            </div>
            <h2 className="text-[clamp(2.25rem,4.5vw,3.5rem)] font-light text-[#0A0A0A] leading-[0.98] tracking-[-0.03em]">
              Four services.<br />
              <span className="italic font-extralight">One specialist team.</span>
            </h2>
          </div>
          <p className="text-[#5A5A5A] max-w-md leading-[1.7] text-[15px] lg:text-base font-light lg:mb-2">
            We install the surfaces that define BC communities — from municipal crosswalks and transit corridors to estate driveways and public plazas. No subcontractors. No compromise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: easeOut }}
            className="lg:col-span-7"
          >
            <Link href={`/services/${lead.slug}`} className="group block relative overflow-hidden rounded-none bg-[#0F1115]">
              <div className="relative aspect-[16/10] lg:aspect-[16/11] w-full overflow-hidden">
                <Image fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" src={lead.imageUrl} alt={lead.name} priority />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(15,17,21,0.92)] via-[rgba(15,17,21,0.35)] to-[rgba(15,17,21,0.10)]" />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
                  <span className="text-[10px] uppercase tracking-[0.28em] text-white/85 font-semibold">Flagship Service · 01</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-10">
                  <h3 className="text-white font-light leading-[0.98] tracking-[-0.02em] text-[clamp(2rem,4vw,3rem)] mb-3">{lead.name}</h3>
                  <p className="text-white/75 text-[15px] lg:text-base leading-[1.6] max-w-md font-light">{lead.tagline}</p>
                  <span className="mt-6 inline-flex items-center gap-3 text-white text-[13px] uppercase tracking-[0.18em] font-semibold border-b border-white/30 pb-2 group-hover:border-[#F26430] group-hover:text-[#FF8A5C] transition-colors duration-300">
                    Explore service<ArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-4">
            {rest.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: easeOut, delay: 0.1 + i * 0.08 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-stretch gap-0 bg-white border border-[#E2DDD8] hover:border-[#F26430]/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden h-full"
                >
                  <div className="relative w-[40%] sm:w-full lg:w-[42%] aspect-square sm:aspect-[3/2] lg:aspect-auto overflow-hidden flex-shrink-0">
                    <Image fill sizes="(max-width: 640px) 40vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" src={service.imageUrl || "/images/applications/crosswalks/crosswalk-1.jpg"} alt={service.name} />
                  </div>
                  <div className="flex-1 p-5 lg:p-6 flex flex-col justify-center min-w-0">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C8C8C] font-semibold mb-2">0{i + 2}</span>
                    <h3 className="font-semibold text-[15px] lg:text-base text-[#0A0A0A] leading-tight group-hover:text-[#F26430] transition-colors duration-300">{service.name}</h3>
                    <p className="text-[13px] text-[#5A5A5A] mt-2 leading-[1.55] line-clamp-2 font-light">{service.tagline}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
          className="mt-12 lg:mt-16 pt-8 border-t border-[#E2DDD8] flex flex-wrap items-center justify-between gap-4"
        >
          <p className="text-[13px] text-[#5A5A5A] font-light">Not sure which service fits your project?</p>
          <Link href="/contact" className="group inline-flex items-center gap-3 text-[#0A0A0A] text-[13px] uppercase tracking-[0.18em] font-semibold border-b-2 border-[#F26430] pb-1.5 hover:gap-4 transition-all">
            Talk to a specialist<ArrowRight />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
