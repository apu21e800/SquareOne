"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

/**
 * VaporBlastingBand — dark industrial sub-brand callout.
 * Dark #0F1216 background. Brand-within-a-brand treatment.
 * H2 at 800 weight to match hero energy.
 */
export default function VaporBlastingBand() {
  const specs = [
    { num: "0",     unit: "chemicals",  label: "Water + abrasive only" },
    { num: "1.2k",  unit: "PSI",        label: "Variable system pressure" },
    { num: "8+",    unit: "surfaces",   label: "Concrete, steel, brick, marine" },
    { num: "BC",    unit: "wide",       label: "Mobile across the province" },
  ]

  return (
    <section
      id="vapor-blasting"
      className="relative bg-[#0F1216] text-[#F6F4F0] overflow-hidden"
      style={{ fontFeatureSettings: '"ss01", "tnum"' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px 500px at 88% 18%, rgba(232,137,90,0.16), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.025), transparent 30%)",
        }}
      />
      <div className="absolute left-6 lg:left-10 top-8 z-10 flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.28em] text-white/55">
        <span className="inline-block w-6 h-px bg-[#C8601A]" />
        SquareOne
        <span className="text-[#E8895A] tracking-[0.22em]"> / S1 — Industrial Division </span>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#E8895A] font-bold mb-6">
              S1 / 04 — Vapor Blasting
            </p>
            <h2
              className="text-white"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                letterSpacing: "-0.045em",
                textWrap: "balance",
              }}
            >
              Surface prep,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "#E8895A" }}>
                done right.
              </em>
            </h2>
            <p className="text-[15px] lg:text-base leading-relaxed text-white/70 mt-7 max-w-lg">
              Mobile vapor blasting across BC — water-controlled, no harsh chemicals, faster than mechanical
              grinding. The same crew that installs your decorative surfaces preps them properly first.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-y-7 gap-x-8 max-w-lg border-t border-white/10 pt-8">
              {specs.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-white leading-none"
                      style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.045em" }}
                    >
                      {s.num}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#E8895A] font-semibold">
                      {s.unit}
                    </span>
                  </div>
                  <span className="text-[12px] text-white/55 mt-2 leading-snug">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/services/vapor-blasting"
                className="group inline-flex items-center gap-2 bg-white text-[#111111] px-6 py-3.5 text-sm font-semibold hover:bg-[#F6F4F0] transition-colors"
              >
                Vapor Blasting Spec
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3.5 text-sm font-semibold hover:border-white hover:bg-white/5 transition-colors"
              >
                Request a Site Visit
              </Link>
            </div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0A0C0F] border border-white/10">
              <Image
                src="/images/services/vapor-blasting/hero.jpg"
                alt="Square One vapor blasting — mobile surface preparation across BC"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none mix-blend-multiply"
                style={{
                  background: "linear-gradient(180deg, rgba(15,18,22,0.0) 0%, rgba(15,18,22,0.4) 100%)",
                }}
              />
              {(["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"] as const).map((pos) => (
                <span key={pos} aria-hidden className={`absolute ${pos} w-3 h-3 border border-[#E8895A] opacity-70`} />
              ))}
              <div className="absolute inset-x-0 bottom-0 px-5 py-3 bg-black/55 backdrop-blur-sm border-t border-white/10 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
                <span className="text-white/60">Highway 1 · Lower Mainland</span>
                <span className="text-[#E8895A] font-semibold">REC · 2023</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-white/40">
          <span>Mobile · Lower Mainland · Vancouver Island</span>
          <span>S1-IND / Rev. 04.26</span>
        </div>
      </div>
    </section>
  )
}
