"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function CTASection() {
  return (
    <section className="relative bg-[#1C2026] py-24 lg:py-32 overflow-hidden">
      {/* Subtle radial bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(200,96,26,0.10) 0%, transparent 60%)" }}
        aria-hidden
      />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="relative max-w-[900px] mx-auto px-6 lg:px-8 text-center"
      >
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#C8601A] font-semibold mb-4">Ready to Start?</p>
        <h2 className="text-[clamp(2rem,4vw,2.5rem)] font-light text-white leading-tight tracking-[-0.02em]">
          Let&#39;s build something{' '}
          <span className="text-[#C8601A] font-normal">
            worth looking at.
          </span>
        </h2>
        <p className="max-w-xl mx-auto text-white/80 mt-4 leading-relaxed">
          Whether it&#39;s a municipal crosswalk, a commercial plaza, or your home driveway —
          we bring 25 years of BC expertise to every square metre.
        </p>
        <div className="mt-10 flex justify-center flex-wrap gap-4">
          <Link
            href="/contact"
            className="bg-[#C8601A] text-white px-8 py-4 rounded-none font-semibold hover:brightness-110 transition-all"
          >
            Request a Quote
          </Link>
          <Link
            href="/contact"
            className="border border-white/30 text-white px-8 py-4 rounded-none hover:border-white transition-colors"
          >
            Book a Site Visit
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
