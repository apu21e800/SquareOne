"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] lg:min-h-screen w-full flex items-end overflow-hidden bg-[#F6F4F0]">
      {/* Background — roundabout with BC mountains */}
      <div className="absolute inset-0">
        <Image
          src="/images/products/streetbond/streetbond-red-roundabout-mountains-01.jpg"
          alt="StreetBond decorative coating on a BC roundabout, mountains in background"
          fill priority sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(246,244,240,0.45) 0%, rgba(246,244,240,0.25) 35%, rgba(246,244,240,0.94) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: "linear-gradient(90deg, rgba(246,244,240,0.95) 0%, rgba(246,244,240,0.60) 45%, rgba(246,244,240,0.0) 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 lg:px-10 pb-20 lg:pb-28 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.2, 0.7, 0.2, 1] }}
            className="max-w-[820px]"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#C8601A] font-bold mb-7 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#C8601A]" />
              BC&apos;s Decorative Pavement Specialists · Since 2000
            </p>

            <h1
              className="text-[#111111]"
              style={{
                fontSize: "clamp(3rem, 5.8vw, 5.5rem)",
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: "-0.045em",
              }}
            >
              From crosswalks
              <br />
              to driveways —
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "#C8601A",
                }}
              >
                built to last.
              </em>
            </h1>

            <p className="text-base lg:text-[17px] text-[#2C2C2C] max-w-xl mt-8 leading-relaxed">
              Municipal crosswalks, BRT corridors, and private driveways — Square One delivers
              decorative pavement that performs in BC&apos;s climate for a generation.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-[#C8601A] text-white px-7 py-4 text-[13px] font-bold tracking-[0.02em] hover:bg-[#A84F15] transition-colors"
                style={{ boxShadow: "0 4px 24px rgba(200,96,26,0.30)" }}
              >
                Request a Quote
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-[#111111]/20 text-[#111111] px-7 py-4 text-[13px] font-bold hover:border-[#111111]/50 hover:bg-white/50 transition-all"
              >
                See Our Work
              </Link>
            </div>
          </motion.div>

          {/* Floating stats card */}
          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
            className="hidden lg:block w-[280px] bg-white/88 backdrop-blur-sm border border-[#E2DDD8] p-7"
            style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)" }}
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#C8601A] font-bold mb-6">At a Glance</p>
            <ul className="divide-y divide-[#E2DDD8]">
              {[
                { num: "51+", label: "BC communities served" },
                { num: "25 yrs", label: "in operation" },
                { num: "4", label: "specialist services" },
              ].map((s) => (
                <li key={s.label} className="py-5 first:pt-0 last:pb-0">
                  <div className="text-[#111111] font-black leading-none tracking-tight"
                    style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", letterSpacing: "-0.04em" }}
                  >
                    {s.num}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-[#5A5A5A] mt-2">{s.label}</div>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>

        <div className="hidden lg:flex items-center justify-between mt-16 pt-6 border-t border-[#111111]/10 text-[#5A5A5A]">
          <span className="text-[10px] uppercase tracking-[0.28em] font-semibold">S1 — Stamping · Coatings · Thermoplastic · Vapor</span>
          <span className="text-[10px] uppercase tracking-[0.22em] font-semibold flex items-center gap-2">
            Scroll
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  )
}
