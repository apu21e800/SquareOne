"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { services } from "@/lib/services"

// ─── Per-service category labels (Tesla "Midsize SUV" treatment) ───────────────
const CATEGORY: Record<string, string> = {
  "stamped-asphalt":         "Surface Treatment",
  "decorative-coatings":     "Colour + Safety",
  "preformed-thermoplastic": "Precision Markings",
  "vapor-blasting":          "Surface Prep",
}

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function ServicesGrid() {
  const order = [
    "stamped-asphalt",
    "decorative-coatings",
    "preformed-thermoplastic",
    "vapor-blasting",
  ]
  const ordered = order
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  return (
    <section className="bg-white relative">
      {/* Top accent bar */}
      <span
        aria-hidden
        className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
        style={{ background: "linear-gradient(90deg, #C8601A 0%, #E8895A 100%)" }}
      />

      {/* Section header */}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 pt-24 lg:pt-32">
        <div className="flex items-end justify-between gap-8 mb-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#C8601A]" />
              What We Do
            </p>
            <h2
              className="text-[#111111]"
              style={{
                fontSize: "clamp(2.25rem, 4.4vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                letterSpacing: "-0.04em",
                textWrap: "balance",
              }}
            >
              Four services.{" "}
              <span style={{ color: "#C8601A" }}>One specialist team.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden md:inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-[#C8601A] hover:gap-3 transition-all flex-shrink-0 self-end pb-1"
          >
            All Services <ArrowRight />
          </Link>
        </div>
      </div>

      {/* ── Tesla-style horizontal card row ────────────────────────────────── */}
      <div
        className="flex gap-4 pl-6 lg:pl-10 pr-6 pb-24 lg:pb-32 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {ordered.map((service, i) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: i * 0.08, ease: easeOut }}
            className="flex-shrink-0"
            style={{
              scrollSnapAlign: "start",
              width: "clamp(300px, 38vw, 560px)",
            }}
          >
            <Link
              href={`/services/${service.slug}`}
              className="group relative block w-full overflow-hidden"
              style={{ aspectRatio: "4 / 5", borderRadius: "20px" }}
            >
              {/* Full-bleed photography */}
              <Image
                src={service.imageUrl}
                alt={service.name}
                fill
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />

              {/* Cinematic gradient — heavier at bottom for text */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.08) 38%, rgba(0,0,0,0.82) 100%)",
                }}
              />

              {/* Category label — top-left (Tesla treatment) */}
              <p
                className="absolute top-6 left-6 text-white/80 text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
              >
                {CATEGORY[service.slug] ?? "Service"}
              </p>

              {/* Orange top-edge reveal on hover */}
              <div
                className="absolute top-0 inset-x-0 h-[3px] bg-[#C8601A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ borderRadius: "20px 20px 0 0" }}
              />

              {/* Bottom content block */}
              <div className="absolute inset-x-0 bottom-0 p-7">
                {/* Counter */}
                <span className="text-[#E8895A] text-[10px] font-black uppercase tracking-[0.28em] mb-3 block">
                  0{i + 1}&nbsp;/&nbsp;0{ordered.length}
                </span>

                {/* Service name */}
                <h3
                  className="text-white font-black leading-none mb-2.5"
                  style={{
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {service.name}
                </h3>

                {/* Tagline */}
                <p className="text-white/60 text-[13px] leading-snug mb-7 max-w-[280px]">
                  {service.tagline}
                </p>

                {/* Dual CTAs — Tesla pattern */}
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center gap-2 text-white text-[12px] font-bold uppercase tracking-[0.08em] px-5 py-2.5 transition-all hover:brightness-110 whitespace-nowrap"
                    style={{
                      background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)",
                      borderRadius: "8px",
                      boxShadow: "0 2px 12px rgba(200,96,26,0.35)",
                    }}
                  >
                    Explore
                    <ArrowRight />
                  </span>
                  <span
                    className="inline-flex items-center text-white/90 text-[12px] font-semibold px-5 py-2.5 transition-all hover:bg-white/10 whitespace-nowrap"
                    style={{
                      border: "1px solid rgba(255,255,255,0.28)",
                      borderRadius: "8px",
                    }}
                  >
                    Learn More
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* ── Trailing "All Services" card ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.38, ease: easeOut }}
          className="flex-shrink-0"
          style={{
            scrollSnapAlign: "start",
            width: "clamp(160px, 14vw, 200px)",
            aspectRatio: "4 / 5",
          }}
        >
          <Link
            href="/services"
            className="group flex flex-col items-center justify-center text-center w-full h-full"
            style={{
              borderRadius: "20px",
              background: "#F6F4F0",
              border: "1.5px solid #E2DDD8",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#C8601A] group-hover:scale-110"
              style={{ background: "#E2DDD8", color: "#C8601A" }}
            >
              <span className="group-hover:text-white transition-colors">
                <ArrowRight />
              </span>
            </div>
            <p className="text-[#111111] font-bold text-[14px] tracking-tight leading-snug">All{"\n"}Services</p>
            <p className="text-[#767676] text-[11px] mt-2 leading-snug">
              View everything<br />we do
            </p>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
