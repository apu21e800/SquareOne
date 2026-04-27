"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * DrivewaysBand — magazine-style 50/50 split.
 * Photo left at full saturation (no overlay), cream content panel right.
 * Premium residential showcase — let the herringbone pattern sell itself.
 */
export default function DrivewaysBand() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#F6F4F0" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">

        {/* Left — full-bleed photo, no overlays */}
        <div className="relative min-h-[380px] lg:min-h-0">
          <Image
            src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
            alt="Stamped asphalt driveway with herringbone pattern"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: "50% 45%" }}
          />
        </div>

        {/* Right — cream content panel */}
        <div className="relative flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-24 lg:py-32">
          {/* Orange top accent bar */}
          <span
            aria-hidden
            className="absolute top-0 right-0 left-0 lg:left-auto w-full lg:w-20 h-[3px]"
            style={{ background: "linear-gradient(90deg, #C8601A 0%, #E8895A 100%)" }}
          />

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.24em] font-bold mb-5 flex items-center gap-3"
              style={{ color: "#C8601A" }}
            >
              <span className="inline-block w-7 h-px" style={{ background: "#C8601A" }} />
              Premium Residential
            </p>

            <h2
              className="max-w-lg"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                letterSpacing: "-0.045em",
                color: "#111111",
              }}
            >
              Your driveway.{" "}
              <span style={{ color: "#C8601A" }}>Reimagined.</span>
            </h2>

            <p
              className="text-[15px] leading-relaxed mt-6 max-w-md"
              style={{ color: "#5A5A5A" }}
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
            style={{ borderTop: "1px solid #E2DDD8", paddingTop: "1.5rem" }}
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
                style={{ color: "#2C2C2C" }}
              >
                <span
                  aria-hidden
                  className="inline-block w-1 h-1 mt-2 flex-shrink-0 rounded-full"
                  style={{ background: "#C8601A" }}
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
              style={{ boxShadow: "0 4px 20px rgba(200,96,26,0.25)" }}
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
              className="inline-flex items-center gap-2 border text-[#111111] px-7 py-3.5 text-sm font-semibold hover:bg-[#111111] hover:text-white transition-all rounded-lg"
              style={{ borderColor: "#C8C4BC" }}
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
            style={{ color: "#767676" }}
          >
            <span aria-label="Five stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            &nbsp;&nbsp;Metro Vancouver · Victoria · Vancouver Island
          </motion.p>
        </div>
      </div>
    </section>
  )
}
