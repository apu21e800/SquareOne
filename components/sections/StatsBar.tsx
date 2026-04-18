"use client"

import { motion } from "framer-motion"
import Container from "@/components/ui/Container"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stats = [
  { number: "51+", label: "BC Projects Completed" },
  { number: "25 yrs", label: "In Operation" },
  { number: "4", label: "Specialist Services" },
  { number: "100%", label: "BC-Based Team" },
]

export default function StatsBar() {
  return (
    <section className="w-full bg-[#F6F4F0] border-y border-[#E2DDD8] py-12">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
              className="relative text-center py-6 lg:py-0"
            >
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-4 bottom-4 w-px bg-[#E2DDD8]" />
              )}
              <div
                style={{ fontWeight: 300, letterSpacing: '-0.03em', fontSize: 'clamp(2.25rem, 6vw, 3.5rem)' }}
                className="text-[#111111] leading-none"
              >
                {stat.number}
              </div>
              <div className="text-[13px] uppercase tracking-[0.1em] text-[#5A5A5A] mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
