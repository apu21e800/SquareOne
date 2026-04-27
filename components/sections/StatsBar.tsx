"use client"

import { motion } from "framer-motion"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * StatsBar — clean white strip between the dark Hero and the service cards.
 * Provides breathing room and contrast. Orange numbers pop on white.
 */
export default function StatsBar() {
  const stats = [
    { num: "25",  suffix: "+", label: "Years in business" },
    { num: "200", suffix: "+", label: "Projects installed across BC" },
    { num: "51",  suffix: "+", label: "BC communities served" },
    { num: "#1",  suffix: "",  label: "HUB certified applicator in BC" },
  ]

  return (
    <section className="bg-white border-b border-[#E8E4DE]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: easeOut, delay: i * 0.08 }}
              className={[
                "flex flex-col px-6 lg:px-10 py-2",
                i === 0 || i === 2 ? "border-r border-[#E8E4DE]" : "",
                i >= 2 ? "border-t border-[#E8E4DE] lg:border-t-0 mt-6 pt-7 lg:mt-0 lg:pt-2" : "",
                i === 0 ? "pl-0" : "",
                i > 0 ? "lg:border-l lg:border-[#E8E4DE]" : "",
              ].filter(Boolean).join(" ")}
            >
              <div className="flex items-baseline gap-0.5 leading-none">
                <span
                  style={{
                    fontSize: "clamp(2.6rem, 4.2vw, 4rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.055em",
                    lineHeight: 0.88,
                    color: "#C8601A",
                  }}
                >
                  {s.num}
                </span>
                {s.suffix && (
                  <span
                    style={{
                      fontSize: "clamp(1.3rem, 2vw, 2rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      color: "#C8601A",
                    }}
                  >
                    {s.suffix}
                  </span>
                )}
              </div>
              <span
                className="text-[11px] uppercase tracking-[0.16em] text-[#5A5A5A] font-semibold mt-3.5 leading-snug max-w-[160px]"
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
