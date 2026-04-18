"use client"

import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-end pb-20 lg:pb-28 bg-[#1C2026] pt-16"
    >
      {/* Background image */}
      <Image
        src="/images/applications/bus-bike-lanes/red-bus-lane-long-perspective-01.jpg"
        alt="Decorative pavement installation by Square One Paving"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(20,22,26,0.72)]" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#C8601A] font-semibold mb-4">
            BC's Decorative Pavement Specialists · Since 2000
          </p>

          {/* Headline */}
          <h1
            className="font-light text-white leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3.5rem, 6vw, 6rem)" }}
          >
            Surfaces that{" "}
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "var(--font-display)",
                color: "#C8601A",
              }}
            >
              define
            </span>
            <br />
            a place.
          </h1>

          {/* Body copy */}
          <p className="text-lg text-white/70 max-w-lg mt-5 leading-relaxed">
            From crosswalks and transit lanes to driveways and public art —
            Square One has transformed over 50 BC communities with surfaces
            that perform and inspire.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="bg-white text-[#111111] px-6 py-3 font-semibold text-sm rounded-none hover:bg-[#F6F4F0] transition-colors duration-200"
            >
              See Our Work
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-white px-6 py-3 font-semibold text-sm rounded-none hover:border-white transition-colors duration-200"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Floating stat card — desktop only */}
      <div className="hidden md:block absolute right-12 bottom-20 z-10 bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-none">
        {/* Stat: communities */}
        <div className="py-4">
          <div
            className="text-white leading-none"
            style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 400 }}
          >
            51+
          </div>
          <div className="text-xs text-white/60 uppercase tracking-wider mt-0.5">
            BC communities served
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/15" />

        {/* Stat: years */}
        <div className="py-4">
          <div
            className="text-white leading-none"
            style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 400 }}
          >
            25 yrs
          </div>
          <div className="text-xs text-white/60 uppercase tracking-wider mt-0.5">
            in operation
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/15" />

        {/* Stat: services */}
        <div className="py-4">
          <div
            className="text-white leading-none"
            style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 400 }}
          >
            4
          </div>
          <div className="text-xs text-white/60 uppercase tracking-wider mt-0.5">
            specialist services
          </div>
        </div>
      </div>
    </section>
  )
}
