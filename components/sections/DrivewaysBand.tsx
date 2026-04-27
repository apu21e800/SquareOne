"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * DrivewaysBand — full-bleed photo backdrop, text overlaid.
 * The estate driveway photo fills the entire section; heavy dark overlay
 * keeps typography crisp. Left-side content zone + image fills the rest.
 */
export default function DrivewaysBand() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "680px" }}
    >
      {/* Full-bleed background photo */}
      <Image
        src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
        alt="Stamped asphalt driveway with herringbone pattern"
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "50% 45%" }}
        priority={false}
      />

      {/* Heavy left-side scrim for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(95deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 28%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.10) 78%, rgba(0,0,0,0) 100%)",
        }}
      />
      {/* Bottom scrim */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Orange bloom — bottom-left */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 110%, rgba(200,96,26,0.30) 0%, transparent 46%)",
        }}
      />

      {/* Content zone */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <div className="max-w-[560px]">

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.24em] font-bold mb-5 flex items-center gap-3"
              style={{ color: "#E8895A" }}
            >
              <span
                className="inline-block w-7 h-px"
                style={{ background: "#C8601A" }}
              />
              Premium Residential
            </p>

            <h2
              className="max-w-lg"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                letterSpacing: "-0.045em",
                color: "white",
              }}
            >
              Your driveway.{" "}
              <span style={{ color: "#C8601A" }}>Reimagined.</span>
            </h2>

            <p
              className="text-[15px] leading-relaxed mt-6 max-w-md"
              style={{ color: "rgba(255,255,255,0.62)" }}
            >
              From stamped asphalt that echoes the architecture of your home to
              vapor-blasted surfaces ready for a fresh coat — municipal-grade
              precision, residential scale.
            </p>
          </motion.div>

          {/* Spec bullets */}
          <motion.ul
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.10 }}
            className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 max-w-md"
          >
            {[
              "ASTM D3939 slip-resistant",
              "20+ year service life",
              "Snowplow safe",
              "Custom patterns + colour",
            ].map((spec) => (
              <li
                key={spec}
                className="text-[12.5px] flex items-start gap-2"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                <span
                  aria-hidden
                  className="inline-block w-1 h-1 bg-[#C8601A] mt-2 flex-shrink-0 rounded-full"
                />
                {spec}
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.17 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              href="/applications/private-driveways"
              className="group inline-flex items-center gap-2 bg-[#C8601A] text-white px-7 py-3.5 text-sm font-semibold hover:bg-[#A84F15] transition-colors rounded-lg"
              style={{ boxShadow: "0 4px 20px rgba(200,96,26,0.38)" }}
            >
              See Driveway Projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/25 text-white px-7 py-3.5 text-sm font-semibold hover:border-white/55 hover:bg-white/[0.08] transition-all rounded-lg"
            >
              Get a Quote
            </Link>
          </motion.div>

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.24 }}
            className="mt-7 text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.30)" }}
          >
            <span aria-label="Five stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            &nbsp;&nbsp;Metro Vancouver · Victoria · Vancouver Island
          </motion.p>
        </div>
      </div>
    </section>
  )
}
