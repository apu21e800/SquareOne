"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function CTASection() {
  return (
    <section className="relative bg-[#0F1115] py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg" alt="" fill aria-hidden sizes="100vw" className="object-cover opacity-25" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(15,17,21,0.92)] via-[rgba(15,17,21,0.85)] to-[rgba(15,17,21,0.95)]" />
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(242,100,48,0.14) 0%, transparent 65%)" }} />
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-48" style={{ background: "linear-gradient(90deg, transparent, #F26430 50%, transparent)" }} />

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: easeOut }}
        className="relative max-w-[1000px] mx-auto px-6 lg:px-8 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block w-8 h-[1px] bg-[#F26430]/60" />
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#FF8A5C] font-semibold">Ready to Start</p>
          <span className="block w-8 h-[1px] bg-[#F26430]/60" />
        </div>

        <h2 className="font-light text-white leading-[0.95] tracking-[-0.035em]" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          Let&apos;s build something<br />
          <span className="italic font-extralight text-white/95">worth</span>{" "}
          <span className="text-[#F26430]">looking at.</span>
        </h2>

        <p className="max-w-xl mx-auto text-white/70 mt-8 text-[16px] lg:text-lg leading-[1.7] font-light">
          Whether it&apos;s a municipal crosswalk, a commercial plaza, or your home driveway &mdash; we bring 25 years of BC expertise to every square metre.
        </p>

        <div className="mt-12 flex justify-center flex-wrap gap-3">
          <Link href="/contact" className="group bg-white text-[#0A0A0A] px-9 py-4 font-semibold text-[13px] tracking-[0.02em] uppercase rounded-none hover:bg-[#F26430] hover:text-white transition-colors duration-300 inline-flex items-center gap-3">
            Request a Quote
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </Link>
          <Link href="/contact" className="border border-white/25 text-white px-9 py-4 font-medium text-[13px] tracking-[0.02em] uppercase rounded-none hover:bg-white hover:text-[#0A0A0A] hover:border-white transition-colors duration-300">
            Book a Site Visit
          </Link>
        </div>

        <p className="mt-10 text-white/45 text-[12px] uppercase tracking-[0.22em] font-medium">
          Or call us directly &nbsp;·&nbsp;{" "}
          <a href="tel:+16043098212" className="text-white hover:text-[#FF8A5C] transition-colors">604-309-8212</a>
        </p>
      </motion.div>
    </section>
  )
}
