"use client"

import { motion } from "framer-motion"
import Container from "@/components/ui/Container"

type ProofPoint = { number: string; title: string; body: string }

const proofPoints: ProofPoint[] = [
  { number: "01", title: "Same crews since 2000", body: "Our applicators have 10+ years of field experience on HUB Surface Systems products. We don't sub out." },
  { number: "02", title: "Two bases, one BC", body: "Metro Vancouver and Vancouver Island offices. Most Lower Mainland and Island jobs don't require travel budget." },
  { number: "03", title: "Municipal specifications", body: "We build to Vision Zero, Complete Streets, and AODA standards — then use the same discipline on residential work." },
  { number: "04", title: "Warrantied systems", body: "StreetBond, TrafficPatterns, and StreetPrint come with 8+ year performance warranties when properly installed." },
]

const trustedClients: string[] = [
  "City of Vancouver", "City of Victoria", "City of Richmond", "District of North Vancouver",
  "District of Saanich", "Nanaimo", "Coquitlam", "Burnaby", "Ladysmith", "Kelowna",
  "Surrey", "Langley", "White Rock", "Sechelt", "UBC", "TransLink", "BC Housing", "Capital Regional District",
]

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function WhySquareOne() {
  const tickerItems = [...trustedClients, ...trustedClients]

  return (
    <section className="relative bg-white section-padding overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(242,100,48,0.08) 0%, transparent 70%)" }} aria-hidden />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 items-end mb-16">
          <motion.div initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: easeOut }}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#F26430] font-semibold mb-4">Why Square One</p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] tracking-[-0.02em] text-[#111111] max-w-2xl">
              Municipal-grade craft.<br />
              <span className="text-[#F26430]">BC-rooted</span> service.
            </h2>
          </motion.div>

          <motion.p initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: easeOut }}
            className="text-base lg:text-lg text-[#2C2C2C] max-w-md leading-relaxed font-light lg:mb-2"
          >
            We do one thing for a living — decorative pavement — and we do it across the toughest environments in the province. Municipal stress-tests become your driveway's baseline.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mt-12 border-t border-[#E2DDD8]">
          {proofPoints.map((point, i) => (
            <motion.div key={point.number} initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
              className="border-b border-[#E2DDD8] sm:border-r sm:last-of-type:border-r-0 lg:[&:nth-child(4)]:border-r-0 p-8 lg:p-10 group cursor-default"
            >
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#8C8C8C] font-semibold">{point.number}</span>
                <div className="h-px flex-1 bg-[#E2DDD8] group-hover:bg-[#F26430] transition-colors duration-300" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-[#111111] leading-tight mb-3">{point.title}</h3>
              <p className="text-sm lg:text-[0.95rem] text-[#5A5A5A] leading-relaxed font-light">{point.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: easeOut }} className="mt-16 pt-10 border-t border-[#E2DDD8]">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#8C8C8C] font-semibold text-center mb-6">Trusted across BC</p>
          <div className="ticker-mask overflow-hidden">
            <div className="ticker-track">
              {tickerItems.map((name, i) => (
                <span key={i} className="flex items-center whitespace-nowrap px-5 text-sm text-[#5A5A5A] font-medium tracking-tight">
                  {name}
                  <span className="mx-5 w-1 h-1 rounded-full bg-[#F26430] opacity-60" />
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
