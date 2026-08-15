"use client"

import { motion } from "framer-motion"
import Container from "@/components/ui/Container"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stats: { number: string; label: string; sublabel: string }[] = [
  { number: "51", label: "BC Communities", sublabel: "from Tofino to Hope" },
  { number: "25", label: "Years In Operation", sublabel: "since the year 2000" },
  { number: "04", label: "Specialist Services", sublabel: "vapor blast to thermoplastic" },
  { number: "100", label: "Percent BC", sublabel: "owned, operated, applied" },
]

export default function StatsBar() {
  return (
    <section className="relative w-full bg-[#0F1115] overflow-hidden border-y border-white/5">
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-50" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(242,100,48,0.07) 0%, transparent 70%)" }} />
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-40" style={{ background: "linear-gradient(90deg, transparent, #F26430 50%, transparent)" }} />

      <Container>
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-0 py-16 lg:py-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeOut, delay: i * 0.1 }}
              className="relative px-4 lg:px-8 py-6 lg:py-2"
            >
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-2 bottom-2 w-px bg-white/10" />
              )}

              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#FF8A5C] font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="block w-6 h-[1px] bg-[#FF8A5C]/40" />
              </div>

              <div className="flex items-start gap-1">
                <span className="text-white" style={{ fontWeight: 200, letterSpacing: "-0.05em", fontSize: "clamp(3rem, 8vw, 5.5rem)", lineHeight: 0.92 }}>
                  {stat.number}
                </span>
                <span className="text-[#F26430] font-light" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                  {stat.number === "100" ? "%" : "+"}
                </span>
              </div>

              <div className="mt-4">
                <div className="text-[12px] uppercase tracking-[0.16em] text-white font-semibold">{stat.label}</div>
                <div className="text-[11px] tracking-[0.04em] text-white/45 mt-1 font-light">{stat.sublabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
