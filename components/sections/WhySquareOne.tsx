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
    <section className="relative bg-[#F6F4F0] overflow-hidden">

      {/* 2-col Tesla split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

        {/* Left — text content */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-20 lg:py-28">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#C8601A]" />
              Why Square One
            </p>
            <h2
              className="text-[#111111] mb-5"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                letterSpacing: "-0.04em",
              }}
            >
              Why crews choose{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "#C8601A" }}>Square One.</em>
            </h2>
            <p className="text-[15px] text-[#5A5A5A] leading-relaxed max-w-md mb-10">
              We do one thing for a living. Municipal stress-tests become your
              driveway&apos;s baseline. That&apos;s the Square One standard.
            </p>
          </motion.div>

          {/* 5 differentiators */}
          <div className="space-y-0 border-t border-[#E2DDD8]">
            {differentiators.map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -16, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: easeOut, delay: i * 0.07 }}
                className="flex items-center gap-4 py-4 border-b border-[#E2DDD8] group"
              >
                <span
                  className="flex-shrink-0 w-5 h-px group-hover:w-8 transition-all duration-300"
                  style={{ background: "#C8601A" }}
                  aria-hidden
                />
                <span className="text-[14px] text-[#2C2C2C] font-medium leading-snug">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — full-height photo: municipal roundabout (distinct from DrivewaysBand) */}
        <div className="relative min-h-[400px] lg:min-h-0">
          <Image
            fill
            src="/images/products/streetbond/streetbond-red-roundabout-mountains-01.jpg"
            alt="StreetBond decorative coating on a BC municipal roundabout"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle gradient on left edge to blend into cream */}
          <div
            className="absolute inset-y-0 left-0 w-12 hidden lg:block"
            style={{ background: "linear-gradient(to right, #F6F4F0, transparent)" }}
          />
        </div>
      </div>

      {/* Trusted clients marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="border-t border-[#E2DDD8] py-10"
      >
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8C8C8C] font-semibold text-center mb-6">
          Trusted across BC
        </p>
        <div className="ticker-mask overflow-hidden">
          <div className="ticker-track">
            {tickerItems.map((name, i) => (
              <span
                key={i}
                className="flex items-center whitespace-nowrap px-5 text-sm text-[#5A5A5A] font-medium tracking-tight"
              >
                {name}
                <span className="mx-5 w-1 h-1 rounded-full bg-[#C8601A] opacity-60" />
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
