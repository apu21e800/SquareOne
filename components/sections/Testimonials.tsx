"use client"

import { motion } from "framer-motion"
import Container from "@/components/ui/Container"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

const testimonials = [
  {
    quote: "Square One transformed our strata's parkade entrance into something we're genuinely proud of. The StreetPrint work held through two winters without any cracking.",
    name: "D. Mackenzie",
    role: "Strata Council President",
    location: "Burnaby, BC",
    rating: 5,
  },
  {
    quote: "Jan's team was precise, professional, and finished two days ahead of schedule. The municipal inspector complimented the thermoplastic quality on day one.",
    name: "R. Sharma",
    role: "Public Works Coordinator",
    location: "City of Surrey",
    rating: 5,
  },
  {
    quote: "We've used Square One on three commercial properties now. Their vapor blasting prep work alone is worth it — the coatings adhere perfectly every time.",
    name: "M. Vandenberg",
    role: "Commercial Property Manager",
    location: "Victoria, BC",
    rating: 5,
  },
]

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill={i < rating ? "#F26430" : "#E2DDD8"} aria-hidden="true">
          <path d="M6 .5l1.7 3.5L11.5 4.5l-2.75 2.7.65 3.8L6 9.2l-3.4 1.8.65-3.8L.5 4.5l3.8-.5z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="relative w-full bg-[#F6F4F0] section-padding overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-50"
        style={{ background: "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(242,100,48,0.06) 0%, transparent 60%)" }} />

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
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#F26430] font-semibold">Client Voices</p>
            </div>
            <h2 className="text-[#0A0A0A] display-h" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}>
              The work speaks.<br />
              <span className="italic font-extralight">So do the clients.</span>
            </h2>
          </div>
          <div className="lg:max-w-md lg:mb-2 lg:pb-2">
            <div className="flex items-center gap-4 mb-3">
              <Stars rating={5} />
              <span className="text-[#0A0A0A] text-[14px] font-semibold tracking-[-0.005em]">5.0 average</span>
              <span className="text-[#8C8C8C] text-[12px]">from 47 BC clients</span>
            </div>
            <p className="text-[#5A5A5A] leading-[1.7] text-[14.5px] font-light">
              Strata councils, city engineers, property managers, homeowners. Every review,
              every site visit, every winter — the surfaces hold.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.1 }}
              className="relative bg-white border border-[#E2DDD8] p-8 lg:p-9 group hover:border-[#F26430]/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-4 right-5 text-[#F26430]/20 text-[64px] leading-none font-serif select-none">&ldquo;</div>

              <Stars rating={t.rating} />

              <p className="text-[#0A0A0A] text-[15.5px] leading-[1.65] mt-5 mb-6 font-normal tracking-[-0.005em]">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="pt-5 border-t border-[#E2DDD8]">
                <p className="text-[#0A0A0A] font-semibold text-[14px] tracking-[-0.005em]">{t.name}</p>
                <p className="text-[#8C8C8C] text-[11.5px] uppercase tracking-[0.14em] mt-1.5 font-medium">{t.role} &middot; {t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
          className="mt-12 lg:mt-16 pt-8 border-t border-[#E2DDD8] grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8"
        >
          {[
            { num: "25", label: "Years In Operation" },
            { num: "51+", label: "BC Communities Served" },
            { num: "100%", label: "Authorized HUB Applicator" },
            { num: "8+", label: "Year Service Life" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-[#0A0A0A] font-extralight leading-none tracking-[-0.04em]" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
                {stat.num}
              </div>
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-[#8C8C8C] mt-2 font-semibold">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
