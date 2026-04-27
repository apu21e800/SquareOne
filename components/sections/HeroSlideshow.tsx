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
    // Pull down to show the red roundabout surface, not sky
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
    thumbImage: "/images/products/streetbond/streetbond-driveway.jpg",
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
    thumbImage: "/images/products/streetbond/streetbond-red-brick-pattern-waterfront-01.jpg",
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
      style={{ minHeight: "90vh", maxHeight: "1000px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero image slideshow"
    >
      {/* ── Background images ────────────────────────────────── */}
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
            style={{ objectPosition: slide.bgPosition }}
          />
        </div>
      ))}

      {/* ── Gradient overlays ───────────────────────────────── */}
      {/* Heavy base scrim — locks the bottom into near-black */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.08) 22%, rgba(0,0,0,0.65) 58%, rgba(0,0,0,0.97) 100%)",
        }}
      />
      {/* Left-side vignette for text legibility on wide screens */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(95deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 28%, rgba(0,0,0,0.12) 52%, rgba(0,0,0,0) 70%)",
        }}
      />
      {/* Orange atmospheric bloom — bottom-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse at 0% 105%, rgba(200,96,26,0.28) 0%, transparent 48%)",
        }}
      />

      {/* ── Prev / Next arrows ──────────────────────────────── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 lg:left-7 z-30 w-10 h-10 flex items-center justify-center bg-black/30 border border-white/20 hover:bg-black/55 hover:border-white/50 transition-all backdrop-blur-sm rounded-lg"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 lg:right-7 z-30 w-10 h-10 flex items-center justify-center bg-black/30 border border-white/20 hover:bg-black/55 hover:border-white/50 transition-all backdrop-blur-sm rounded-lg"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── Bottom content zone ──────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col">
        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10 pb-6 lg:pb-8">

          {/* Eyebrow */}
          <p className="text-[10px] uppercase tracking-[0.24em] font-bold mb-4 flex items-center gap-3" style={{ color: "#E8895A" }}>
            <span className="inline-block w-7 h-px" style={{ background: "#C8601A" }} />
            {s.eyebrow}
          </p>

          {/* H1 — inline flow, no forced <br />, orange second phrase same weight */}
          <h1
            className="max-w-[680px]"
            style={{
              fontSize: "clamp(2.6rem, 3.5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.04em",
              color: "white",
            }}
          >
            {s.h1a}{" "}
            <span style={{ color: "#C8601A" }}>{s.h1b}</span>
          </h1>

          {/* Body */}
          <p
            className="text-white/72 max-w-[480px] mt-4 leading-relaxed"
            style={{ fontSize: "clamp(13px, 1.1vw, 15px)" }}
          >
            {s.body}
          </p>

          {/* CTAs + dots */}
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <Link
              href={s.cta1.href}
              className="group inline-flex items-center gap-2 bg-[#C8601A] text-white px-6 py-3 text-[13px] font-bold tracking-[0.02em] hover:bg-[#A84F15] transition-colors rounded-lg"
              style={{ boxShadow: "0 4px 18px rgba(200,96,26,0.38)" }}
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
              className="inline-flex items-center gap-2 border border-white/22 text-white px-6 py-3 text-[13px] font-bold hover:border-white/55 hover:bg-white/[0.08] transition-all rounded-lg"
            >
              {s.cta2.label}
            </Link>

            {/* Indicator dots */}
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

        {/* ── Thumbnail strip ───────────────────────────────── */}
        <div className="grid grid-cols-3">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => goTo(i)}
              aria-label={`View ${slide.label}`}
              aria-current={i === active ? "true" : undefined}
              className="relative overflow-hidden group cursor-pointer"
              style={{ height: "72px" }}
            >
              <Image
                src={slide.thumbImage}
                alt={slide.label}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                style={{ objectPosition: "50% 60%" }}
              />
              {/* Scrim */}
              <div
                className="absolute inset-0"
                style={{
                  background: i === active
                    ? "rgba(0,0,0,0.35)"
                    : "rgba(0,0,0,0.58)",
                  transition: "background 0.3s ease",
                }}
              />
              {/* Active orange top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] bg-[#C8601A] origin-left"
                style={{
                  transform: i === active ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 0.4s ease",
                }}
              />
              {/* Tile separator */}
              <div className="absolute inset-y-0 right-0 w-px" style={{ background: "rgba(0,0,0,0.35)" }} />
              {/* Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.14em] text-center px-2"
                  style={{
                    color: i === active ? "#F0B28A" : "rgba(255,255,255,0.70)",
                    transition: "color 0.3s ease",
                    textShadow: "0 1px 3px rgba(0,0,0,0.7)",
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
