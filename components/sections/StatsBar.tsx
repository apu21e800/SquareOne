"use client"

import { motion } from "framer-motion"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * StatsBar — dark industrial band, flows seamlessly from the dark Hero.
 * No more white strip; orange numbers on near-black background.
 */
export default function StatsBar() {
  const stats = [
    { num: "25",  suffix: "+", label: "Years in business" },
    { num: "200", suffix: "+", label: "Projects installed across BC" },
    { num: "51",  suffix: "+", label: "BC communities served" },
    { num: "#1",  suffix: "",  label: "HUB certified applicator in BC" },
  ]

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0F1216" }}
    >
      {/* Radial orange bloom */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, rgba(200,96,26,0.16) 0%, transparent 62%)",
        }}
      />
      {/* Top hairline */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: easeOut, delay: i * 0.08 }}
              className={[
                "flex flex-col px-6 lg:px-10 py-2",
                i === 0 || i === 2 ? "border-r" : "",
                i >= 2 ? "border-t lg:border-t-0 mt-8 pt-8 lg:mt-0 lg:pt-2" : "",
                i === 0 ? "pl-0" : "",
                i > 0 ? "lg:border-l" : "",
              ].filter(Boolean).join(" ")}
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-baseline gap-0.5 leading-none">
                <span
                  style={{
                    fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)",
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
                      fontSize: "clamp(1.4rem, 2.2vw, 2.2rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      color: "#E8895A",
                    }}
                  >
                    {s.suffix}
                  </span>
                )}
              </div>
              <span
                className="text-[11px] uppercase tracking-[0.16em] font-semibold mt-4 leading-snug max-w-[160px]"
                style={{ color: "rgba(255,255,255,0.42)" }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom hairline */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />
    </section>
  )
}
