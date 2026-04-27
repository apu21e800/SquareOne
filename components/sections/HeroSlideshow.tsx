"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"

const SLIDES = [
  {
    id: "municipal",
    label: "Crosswalks & Civic",
    bgImage: "/images/products/streetbond/streetbond-red-roundabout-mountains-01.jpg",
    bgPosition: "50% 70%",
    eyebrow: "Municipal & Civic",
    h1a: "Where streets become",
    h1b: "civic landmarks.",
    body: "Decorative crosswalks, roundabouts, and plazas that define community identity — and last 20+ years in BC’s climate.",
    cta1: { label: "See Projects", href: "/projects" },
    cta2: { label: "Request Spec Sheet", href: "/contact" },
  },
  {
    id: "driveways",
    label: "Driveways & Residential",
    bgImage: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
    bgPosition: "50% 50%",
    eyebrow: "Driveways & Residential",
    h1a: "Curb appeal that",
    h1b: "outlasts trends.",
    body: "Stamped asphalt and decorative coatings for driveways, strata entries, and townhome communities across Metro Vancouver and the Island.",
    cta1: { label: "Driveway Services", href: "/driveways" },
    cta2: { label: "Get a Quote", href: "/contact" },
  },
  {
    id: "transit",
    label: "Roads & Transit",
    bgImage: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
    bgPosition: "50% 55%",
    eyebrow: "Roads & Transit",
    h1a: "Infrastructure that",
    h1b: "moves communities.",
    body: "Bus lanes, bike corridors, and transit plazas. Vision Zero–compliant, AODA-ready, and engineered for BC’s traffic demands.",
    cta1: { label: "Road Projects", href: "/projects" },
    cta2: { label: "Contact Us", href: "/contact" },
  },
]

export default function HeroSlideshow() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((i: number) => {
    setActive(((i % SLIDES.length) + SLIDES.length) % SLIDES.length)
  }, [])

  const prev = useCallback(() => goTo(active - 1), [active, goTo])
  const next = useCallback(() => goTo(active + 1), [active, goTo])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [paused])

  const s = SLIDES[active]

  return (
    <section
      className="relative w-full overflow-hidden bg-[#111]"
      style={{ minHeight: "100svh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero image slideshow"
    >
      {/* ── Background images ─────────────────────────── */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === active ? 1 : 0, zIndex: 1 }}
        >
          <Image
            src={slide.bgImage}
            alt={slide.label}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: slide.bgPosition }}
          />
        </div>
      ))}

      {/* ── Gradient overlays ─────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 20%, rgba(0,0,0,0.60) 55%, rgba(0,0,0,0.98) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(95deg, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.44) 30%, rgba(0,0,0,0.10) 55%, rgba(0,0,0,0) 72%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse at 0% 110%, rgba(200,96,26,0.32) 0%, transparent 50%)",
        }}
      />

      {/* ── Prev / Next arrows ────────────────────────── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 lg:left-8 z-30 w-11 h-11 flex items-center justify-center bg-black/25 border border-white/15 hover:bg-black/55 hover:border-white/45 transition-all backdrop-blur-sm rounded-lg"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 lg:right-8 z-30 w-11 h-11 flex items-center justify-center bg-black/25 border border-white/15 hover:bg-black/55 hover:border-white/45 transition-all backdrop-blur-sm rounded-lg"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── Right-edge slide counter (desktop only) ───── */}
      <div
        className="hidden lg:flex absolute right-8 z-20 flex-col items-center gap-3"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: "2px",
              height: i === active ? "38px" : "14px",
              borderRadius: "1px",
              background: i === active ? "#C8601A" : "rgba(255,255,255,0.26)",
              transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* ── Bottom content zone ───────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10 pb-14 lg:pb-20">

          {/* Eyebrow */}
          <p
            className="text-[10px] uppercase tracking-[0.24em] font-bold mb-5 flex items-center gap-3"
            style={{ color: "#E8895A" }}
          >
            <span className="inline-block w-7 h-px" style={{ background: "#C8601A" }} />
            {s.eyebrow}
          </p>

          {/* H1 */}
          <h1
            className="max-w-[820px]"
            style={{
              fontSize: "clamp(3.2rem, 5.5vw, 6.5rem)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.045em",
              color: "white",
            }}
          >
            {s.h1a}{" "}
            <span style={{ color: "#C8601A" }}>{s.h1b}</span>
          </h1>

          {/* Body */}
          <p
            className="max-w-[500px] mt-5 leading-relaxed"
            style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "rgba(255,255,255,0.62)" }}
          >
            {s.body}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <Link
              href={s.cta1.href}
              className="group inline-flex items-center gap-2 bg-[#C8601A] text-white px-7 py-3.5 text-[13px] font-bold tracking-[0.02em] hover:bg-[#A84F15] transition-colors rounded-lg"
              style={{ boxShadow: "0 4px 24px rgba(200,96,26,0.42)" }}
            >
              {s.cta1.label}
              <svg
                width="12" height="12" viewBox="0 0 14 14" fill="none"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href={s.cta2.href}
              className="inline-flex items-center gap-2 border border-white/22 text-white px-7 py-3.5 text-[13px] font-bold hover:border-white/55 hover:bg-white/[0.08] transition-all rounded-lg"
            >
              {s.cta2.label}
            </Link>

            {/* Dot indicators — mobile only */}
            <div className="ml-auto lg:hidden flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: i === active ? "22px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background: i === active ? "#C8601A" : "rgba(255,255,255,0.32)",
                    transition: "all 0.35s ease",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Slim label strip (replaces photo thumbnail grid) ── */}
        <div
          className="grid grid-cols-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => goTo(i)}
              aria-label={`View ${slide.label}`}
              aria-current={i === active ? "true" : undefined}
              className="relative flex items-center justify-center py-4 cursor-pointer transition-colors"
              style={{
                background: i === active ? "rgba(200,96,26,0.12)" : "rgba(0,0,0,0.52)",
                backdropFilter: "blur(6px)",
              }}
            >
              {/* Active top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: "#C8601A",
                  opacity: i === active ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
              {/* Column separator */}
              <div
                className="absolute inset-y-0 right-0 w-px"
                style={{ background: "rgba(255,255,255,0.07)" }}
              />
              <div className="flex items-center gap-2">
                <span
                  className="text-[9px] font-black uppercase tracking-[0.20em]"
                  style={{
                    color: i === active ? "#E8895A" : "rgba(255,255,255,0.32)",
                    transition: "color 0.3s",
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  className="text-[9px] font-semibold uppercase tracking-[0.13em] hidden sm:block"
                  style={{
                    color: i === active ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.38)",
                    transition: "color 0.3s",
                  }}
                >
                  {slide.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
