"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const differentiators = [
  { text: "BC's only HUB Surface Systems certified applicator" },
  { text: "25 years of installs from Metro Vancouver to Victoria" },
  { text: "Free site visit, written quote in 48 hours" },
  { text: "Snowplow-safe surfaces built for BC winters" },
  { text: "Municipal + residential — one experienced crew" },
]

const trustedClients: string[] = [
  "City of Vancouver",
  "City of Victoria",
  "City of Richmond",
  "District of North Vancouver",
  "District of Saanich",
  "Nanaimo",
  "Coquitlam",
  "Burnaby",
  "Ladysmith",
  "Kelowna",
  "Surrey",
  "Langley",
  "White Rock",
  "Sechelt",
  "UBC",
  "TransLink",
  "BC Housing",
  "Capital Regional District",
]

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function WhySquareOne() {
  const tickerItems = [...trustedClients, ...trustedClients]

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#F8F6F2" }}
    >
      {/* 2-col split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[680px]">

        {/* Left — text content */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-24 lg:py-32">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-5 flex items-center gap-3"
              style={{ color: "#C8601A" }}
            >
              <span className="inline-block w-8 h-px" style={{ background: "#C8601A" }} />
              Why Square One
            </p>
            <h2
              className="mb-5"
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                letterSpacing: "-0.04em",
                color: "#111111",
              }}
            >
              Why crews choose{" "}
              <span style={{ color: "#C8601A" }}>Square One.</span>
            </h2>
            <p
              className="text-[15px] leading-relaxed max-w-md mb-10"
              style={{ color: "#5A5A5A" }}
            >
              We do one thing for a living. Municipal stress-tests become your
              driveway&apos;s baseline. That&apos;s the Square One standard.
            </p>
          </motion.div>

          {/* 5 differentiators */}
          <div
            className="space-y-0"
            style={{ borderTop: "1px solid #E2DDD8" }}
          >
            {differentiators.map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -16, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: easeOut, delay: i * 0.07 }}
                className="flex items-center gap-4 py-4 group"
                style={{ borderBottom: "1px solid #E2DDD8" }}
              >
                <span
                  className="flex-shrink-0 w-5 h-px group-hover:w-8 transition-all duration-300"
                  style={{ background: "#C8601A" }}
                  aria-hidden
                />
                <span
                  className="text-[14px] font-medium leading-snug"
                  style={{ color: "#2C2C2C" }}
                >
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — project photo, no dark overlays — let it breathe */}
        <div className="relative min-h-[420px] lg:min-h-0">
          <Image
            fill
            src="https://squareonepaving.com/wp-content/uploads/2024/11/GPTempDownload-1-scaled-e1731616674862-1024x621.jpg"
            alt="Langley Events Centre — StreetBond public art install by Square One"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Project caption — light pill */}
          <div
            className="absolute bottom-5 right-5 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] font-semibold rounded"
            style={{
              background: "rgba(255,255,255,0.90)",
              backdropFilter: "blur(8px)",
              color: "#5A5A5A",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            Langley Events Centre · 2024
          </div>
        </div>
      </div>

      {/* Trusted clients marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="py-10"
        style={{ borderTop: "1px solid #E2DDD8" }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.22em] font-semibold text-center mb-6"
          style={{ color: "#767676" }}
        >
          Trusted across BC
        </p>
        <div className="ticker-mask overflow-hidden">
          <div className="ticker-track">
            {tickerItems.map((name, i) => (
              <span
                key={i}
                className="flex items-center whitespace-nowrap px-5 text-sm font-medium tracking-tight"
                style={{ color: "#5A5A5A" }}
              >
                {name}
                <span
                  className="mx-5 w-1 h-1 rounded-full"
                  style={{ background: "#C8601A", opacity: 0.5 }}
                />
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
