"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

/**
 * Hero — light, full-bleed image with a soft warm scrim. Dark text on top.
 *
 * Composition:
 *   - Full-bleed photo (municipal install) with a light warm overlay so
 *     dark headline + body type sits comfortably on top.
 *   - Eyebrow — editorial H1 (clamp 3rem–5.5rem, weight 300, italic accent
 *     in primary orange).
 *   - Two CTAs: primary (orange, 8px radius) + secondary outline.
 *   - Floating stats card on the right (cream w/ subtle border).
 */
export default function Hero() {
  return (
    <section className="relative min-h-[88vh] lg:min-h-screen w-full flex items-end overflow-hidden bg-[#F6F4F0]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/products/streetbond/streetbond-red-roundabout-mountains-01.jpg"
          alt="StreetBond decorative coating across a BC roundabout"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Light warm scrim — keeps headline legible without going dark */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(246,244,240,0.55) 0%, rgba(246,244,240,0.35) 35%, rgba(246,244,240,0.92) 100%)",
          }}
        />
        {/* Side wash from left so the type column has a calm reading surface */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(246,244,240,0.92) 0%, rgba(246,244,240,0.55) 45%, rgba(246,244,240,0.0) 75%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 lg:pb-28 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="max-w-[820px]"
          >
            {/* Eyebrow */}
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-6 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#C8601A]" />
              BC&apos;s Decorative Pavement Specialists · Since 2000
            </p>

            {/* Headline */}
            <h1
              className="text-[#111111]"
              style={{
                fontSize: "clamp(3rem, 5.8vw, 5.5rem)",
                fontWeight: 300,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                textWrap: "balance",
              }}
            >
              From crosswalks to driveways —{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#C8601A",
                }}
              >
                built to last.
              </em>
            </h1>

            {/* Sub */}
            <p className="text-base lg:text-lg text-[#2C2C2C] max-w-xl mt-7 leading-relaxed">
              From municipal crosswalks and BRT corridors to private driveways — Square One delivers decorative
              pavement that performs in BC&apos;s climate and stands up to a generation of weather.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-[#C8601A] text-white px-6 py-3.5 text-sm font-semibold rounded-[8px] hover:bg-[#A84F15] transition-colors"
                style={{ boxShadow: "0 4px 20px rgba(200,96,26,0.25)" }}
              >
                Request a Quote
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-[#111111]/15 text-[#111111] px-6 py-3.5 text-sm font-semibold rounded-[8px] hover:border-[#111111]/40 hover:bg-white/40 transition-colors"
              >
                See Our Work
              </Link>
            </div>
          </motion.div>

          {/* Floating stats card (desktop) */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
            className="hidden lg:block w-[300px] bg-white/85 backdrop-blur-sm border border-[#E2DDD8] p-7"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)" }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#C8601A] font-semibold mb-5">
              At a glance
            </p>
            <ul className="divide-y divide-[#E2DDD8]">
              {[
                { num: "51+", label: "BC communities served" },
                { num: "25 yrs", label: "in operation" },
                { num: "4", label: "specialist services" },
              ].map((s) => (
                <li key={s.label} className="py-4 first:pt-0 last:pb-0">
                  <div className="text-[#111111] text-[2.25rem] leading-none font-light tracking-tight">
                    {s.num}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-[#5A5A5A] mt-1.5">
                    {s.label}
                  </div>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>

        {/* Bottom rule */}
        <div className="hidden lg:flex items-center justify-between mt-16 pt-6 border-t border-[#111111]/10 text-[#5A5A5A]">
          <span className="text-[10px] uppercase tracking-[0.28em]">
            S1 — Stamping · Coatings · Thermoplastic · Vapor
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] flex items-center gap-2">
            Scroll
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 2v10M3 8l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  )
}
