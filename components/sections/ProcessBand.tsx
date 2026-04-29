"use client"

import { motion } from "framer-motion"
import Container from "@/components/ui/Container"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

const steps: { num: string; title: string; body: string; meta: string }[] = [
  {
    num: "01",
    title: "Site Walk",
    body: "We meet you on site. Substrate condition, drainage, traffic loading, sight lines, neighbour considerations — all logged before a quote ever lands.",
    meta: "Day 1",
  },
  {
    num: "02",
    title: "Specification",
    body: "We pick the system that fits the surface — StreetPrint, StreetBond, TrafficPatterns, MMAX. The wrong product on the right surface is a five-year repair bill.",
    meta: "Day 2–3",
  },
  {
    num: "03",
    title: "Surface Prep",
    body: "Vapor blasting, sweep, prime. Adhesion is decided before the first colour goes down. We don't shortcut the boring step — that's why ours last.",
    meta: "Install Day 1",
  },
  {
    num: "04",
    title: "Application",
    body: "Hot imprint, coat, or thermoplastic — applied by the same crew that has done it for ten years. Municipal-spec discipline, residential-scale care.",
    meta: "Install Day 2–3",
  },
  {
    num: "05",
    title: "Cure & Walk-Through",
    body: "Cure to spec. Final inspection with you. Maintenance schedule handed over so the surface still looks installed in year eight.",
    meta: "Final Day",
  },
]

export default function ProcessBand() {
  return (
    <section className="relative bg-white section-padding overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-50"
        style={{ background: "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(242,100,48,0.04) 0%, transparent 60%)" }} />

      <Container>
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-14 lg:mb-20 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-end"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#F26430] font-semibold">How We Work</p>
            </div>
            <h2 className="text-[#0A0A0A] display-h" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}>
              Five steps.<br />
              <span className="italic font-extralight">No subcontractors.</span>
            </h2>
          </div>
          <p className="text-[#5A5A5A] max-w-md leading-[1.7] text-[15px] lg:text-base font-light lg:mb-2">
            Our process hasn&apos;t changed since 2000 because the work hasn&apos;t. Every project, municipal or residential, runs the same five steps with the same crew &mdash; the boring discipline that makes a pavement install last for a decade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 border-t border-[#E2DDD8]">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
              className="relative border-b border-[#E2DDD8] md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(5n)]:border-r-0 p-7 lg:p-8 group cursor-default"
            >
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#F26430] font-bold">{step.num}</span>
                <div className="h-px flex-1 bg-[#E2DDD8] group-hover:bg-[#F26430] transition-colors duration-500" />
                <span className="text-[9.5px] uppercase tracking-[0.18em] text-[#8C8C8C] font-medium">{step.meta}</span>
              </div>
              <h3 className="text-[#0A0A0A] font-semibold text-[18px] lg:text-[20px] leading-[1.15] tracking-[-0.01em] mb-3 group-hover:text-[#F26430] transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-[#5A5A5A] text-[13px] lg:text-[13.5px] leading-[1.6] font-light">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.5 }}
          className="mt-12 pt-8 flex flex-wrap items-center justify-between gap-4"
        >
          <p className="text-[12.5px] text-[#5A5A5A] font-light tracking-[0.005em]">
            Same crew, same standard, every project &mdash; municipal or residential.
          </p>
          <a href="/contact" className="group inline-flex items-center gap-3 text-[#0A0A0A] text-[12.5px] uppercase tracking-[0.18em] font-semibold border-b-2 border-[#F26430] pb-1.5 hover:gap-4 transition-all">
            Start your site walk
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
