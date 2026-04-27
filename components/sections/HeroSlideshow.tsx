"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"

const SLIDES = [
  {
    id: "municipal",
    label: "Crosswalks & Civic",
    bgImage: "/images/products/streetbond/streetbond-red-roundabout-mountains-01.jpg",
    thumbImage: "/images/products/streetbond/streetbond-crosswalk-perspective-01.jpg",
    eyebrow: "Municipal & Civic",
    h1a: "Where streets become",
    h1b: "civic landmarks.",
    body: "Decorative crosswalks, roundabouts, and plazas that define community identity — and last 20+ years in BC’s climate.",
    cta1: { label: "See Civic Projects", href: "/projects" },
    cta2: { label: "Request Spec Sheet", href: "/contact" },
  },
  {
    id: "driveways",
    label: "Driveways & Residential",
    bgImage: "/images/products/streetbond/streetbond-dark-red-brick-pattern-driveway-01.jpg",
    thumbImage: "/images/products/streetbond/streetbond-driveway.jpg",
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
    thumbImage: "/images/products/streetbond/streetbond-red-brick-pattern-waterfront-01.jpg",
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
      style={{ minHeight: "88vh", maxHeight: "960px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero image slideshow"
    >
      {/* ── Background images — cross-fade ──────────────────────────── */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === active ? 1 : 0, zIndex: 1 }}
        >
          <Image
            src={slide.bgImage}
            alt={slide.label}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "50% 65%" }}
          />
        </div>
      ))}

      {/* ── Gradient overlays ───────────────────────────────── */}
      {/* Main vertical vignette — deeper blacks to anchor the bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 28%, rgba(0,0,0,0.62) 62%, rgba(0,0,0,0.96) 100%)",
        }}
      />
      {/* Horizontal vignette — extends further right on wide displays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.40) 30%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.04) 72%, rgba(0,0,0,0) 85%)",
        }}
      />
      {/* Orange atmospheric bloom — bottom-left warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(200,96,26,0.24) 0%, transparent 50%)",
        }}
      />

      {/* ── Chevron arrows ────────────────────────────────── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 lg:left-7 z-30 w-10 h-10 flex items-center justify-center bg-black/25 border border-white/20 hover:bg-black/50 hover:border-white/55 transition-all backdrop-blur-sm rounded-lg"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 lg:right-7 z-30 w-10 h-10 flex items-center justify-center bg-black/25 border border-white/20 hover:bg-black/50 hover:border-white/55 transition-all backdrop-blur-sm rounded-lg"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── Bottom content zone ─────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col">

        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10 pb-5 lg:pb-7 pt-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#E8895A] font-bold mb-5 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#C8601A]" />
            {s.eyebrow}
          </p>

          {/* H1 — no italics, second line in bold orange, same weight 800 */}
          <h1
            className="max-w-[820px]"
            style={{
              fontSize: "clamp(3.5rem, 7vw, 7rem)",
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
              color: "white",
            }}
          >
            {s.h1a}
            <br />
            <span style={{ color: "#C8601A" }}>
              {s.h1b}
            </span>
          </h1>

          <p
            className="text-white/75 max-w-[520px] mt-5 leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}
          >
            {s.body}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 items-center">
            <Link
              href={s.cta1.href}
              className="group inline-flex items-center gap-2 bg-[#C8601A] text-white px-6 py-3.5 text-[13px] font-bold tracking-[0.02em] hover:bg-[#A84F15] transition-colors rounded-lg"
              style={{ boxShadow: "0 4px 20px rgba(200,96,26,0.35)" }}
            >
              {s.cta1.label}
              <svg
                width="13" height="13" viewBox="0 0 14 14" fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href={s.cta2.href}
              className="inline-flex items-center gap-2 border border-white/25 text-white px-6 py-3.5 text-[13px] font-bold hover:border-white/60 hover:bg-white/[0.08] transition-all rounded-lg"
            >
              {s.cta2.label}
            </Link>

            {/* Slide indicator dots — desktop only */}
            <div className="ml-auto hidden lg:flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: i === active ? "22px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background: i === active ? "#C8601A" : "rgba(255,255,255,0.35)",
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

        {/* ── Bottom thumbnail strip ──────────────────────────── */}
        <div className="grid grid-cols-3">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => goTo(i)}
              aria-label={`View ${slide.label}`}
              aria-current={i === active ? "true" : undefined}
              className="relative overflow-hidden group cursor-pointer"
              style={{ height: "80px" }}
            >
              <Image
                src={slide.thumbImage}
                alt={slide.label}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                style={{ objectPosition: "50% 60%" }}
              />
              {/* Darkening overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.65) 100%)",
                  opacity: i === active ? 0.7 : 1,
                }}
              />
              {/* Active orange bar — top */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] bg-[#C8601A] origin-left"
                style={{
                  transform: i === active ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 0.4s ease",
                }}
              />
              {/* Tile separator */}
              <div className="absolute inset-y-0 right-0 w-px bg-black/30" />
              {/* Label — centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.12em] text-center px-2"
                  style={{
                    color: i === active ? "#E8895A" : "rgba(255,255,255,0.78)",
                    transition: "color 0.3s ease",
                    textShadow: "0 1px 4px rgba(0,0,0,0.6)",
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
