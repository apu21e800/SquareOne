"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

const applications = [
  {
    label: "Residential Driveways",
    desc: "Stamped asphalt and StreetBond coatings that transform your home entrance. 20+ patterns available.",
    href: "/driveways",
    tag: "Residential",
  },
  {
    label: "Strata & Townhome",
    desc: "Uniform surface upgrades across multi-unit developments. Consistent finishes, one crew.",
    href: "/driveways",
    tag: "Residential",
  },
  {
    label: "Municipal Crosswalks",
    desc: "Vision Zero-compliant decorative crosswalks. AODA-ready patterns with retroreflective finish.",
    href: "/contact",
    tag: "Municipal",
  },
  {
    label: "Bus & Bike Lanes",
    desc: "High-visibility StreetBond coatings for transit corridors — red, green, and custom colours.",
    href: "/contact",
    tag: "Municipal",
  },
  {
    label: "Patios & Courtyards",
    desc: "Custom patterns and rich colours for outdoor living spaces and commercial courtyards.",
    href: "/contact",
    tag: "Commercial",
  },
  {
    label: "Parking Lots",
    desc: "Durable thermoplastic markings, stall layouts, accessible parking, and directional graphics.",
    href: "/contact",
    tag: "Commercial",
  },
  {
    label: "Pools & Splash Pads",
    desc: "Slip-resistant, UV-stable coatings engineered for wet aquatic and play surfaces.",
    href: "/contact",
    tag: "Commercial",
  },
  {
    label: "School Zones",
    desc: "School logo branding, crosswalks, speed legends, and safety markings — all in one install.",
    href: "/contact",
    tag: "Municipal",
  },
  {
    label: "Walkways & Paths",
    desc: "Decorative surface treatments for pedestrian paths, trails, park entries, and plazas.",
    href: "/contact",
    tag: "Municipal",
  },
  {
    label: "Public Art & Plazas",
    desc: "Large-format thermoplastic artwork and custom branded pavement for civic spaces.",
    href: "/contact",
    tag: "Municipal",
  },
  {
    label: "Airports & Transit Hubs",
    desc: "Regulatory and wayfinding markings for high-traffic airport and transit environments.",
    href: "/contact",
    tag: "Commercial",
  },
  {
    label: "Vapor Blasting",
    desc: "Surface removal and prep for any application — graffiti, old markings, or prior coatings.",
    href: "/vapor-blasting",
    tag: "Prep",
  },
]

// WCAG AA-safe on white backgrounds
const tagStyle: Record<string, { color: string; bg: string }> = {
  Residential: { color: "#2D6A2D", bg: "rgba(45,106,45,0.08)" },
  Municipal:   { color: "#1A55A8", bg: "rgba(26,85,168,0.08)" },
  Commercial:  { color: "#8B5000", bg: "rgba(139,80,0,0.08)" },
  Prep:        { color: "#6B2FA0", bg: "rgba(107,47,160,0.08)" },
}

export default function ApplicationsSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Top accent bar */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "#E8E4DE" }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-4 flex items-center gap-3"
              style={{ color: "#C8601A" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ background: "#C8601A" }}
              />
              Where We Work
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                letterSpacing: "-0.04em",
                color: "#111111",
              }}
            >
              Every surface,{" "}
              <span style={{ color: "#C8601A" }}>covered.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
            className="text-sm leading-relaxed max-w-xs lg:text-right"
            style={{ color: "#767676" }}
          >
            From private driveways to municipal transit corridors — every paved surface in BC.
          </motion.p>
        </div>

        {/* Editorial index list */}
        <div style={{ borderTop: "1px solid #E8E4DE" }}>
          {applications.map((app, i) => (
            <motion.div
              key={app.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: easeOut, delay: i * 0.04 }}
            >
              <Link
                href={app.href}
                className="group flex items-center gap-4 lg:gap-8 py-5 transition-all"
                style={{ borderBottom: "1px solid #E8E4DE" }}
              >
                {/* Number */}
                <span
                  className="flex-shrink-0 text-[11px] font-black tabular-nums"
                  style={{ color: "#C8601A", letterSpacing: "0.04em", minWidth: "24px" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Tag — hidden on mobile */}
                <span
                  className="hidden sm:block flex-shrink-0 text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded"
                  style={{
                    color: tagStyle[app.tag]?.color ?? "#5A5A5A",
                    background: tagStyle[app.tag]?.bg ?? "rgba(0,0,0,0.05)",
                    minWidth: "90px",
                    textAlign: "center",
                  }}
                >
                  {app.tag}
                </span>

                {/* Title */}
                <h3
                  className="flex-shrink-0 font-bold transition-colors duration-200 group-hover:text-[#C8601A]"
                  style={{
                    fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
                    letterSpacing: "-0.015em",
                    color: "#111111",
                  }}
                >
                  {app.label}
                </h3>

                {/* Description — desktop only */}
                <p
                  className="hidden lg:block flex-1 text-[13px] truncate"
                  style={{ color: "#767676" }}
                >
                  {app.desc}
                </p>

                {/* Arrow */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="flex-shrink-0 ml-auto transition-all duration-200 group-hover:translate-x-1"
                >
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="#C8601A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="#C8C4BC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{ borderTop: "1px solid #E8E4DE", paddingTop: "2.5rem" }}
        >
          <p className="text-sm" style={{ color: "#5A5A5A" }}>
            Not sure what your project needs?{" "}
            <span style={{ color: "#111111", fontWeight: 600 }}>
              We offer free site consultations across BC.
            </span>
          </p>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#C8601A] text-white px-7 py-3.5 text-[13px] font-bold tracking-[0.02em] hover:bg-[#A84F15] transition-colors rounded-lg"
            style={{ boxShadow: "0 4px 20px rgba(200,96,26,0.22)" }}
          >
            Get a Free Quote
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
