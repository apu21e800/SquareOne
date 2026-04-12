"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

/* ── Carousel slides ──────────────────────────────────────── */
const slides = [
  {
    src: "/images/hero/hero-1.jpg",
    alt: "UBC TrafficPatterns decorative crosswalk — Square One Paving",
    badge: "UBC · TrafficPatterns",
    location: "Vancouver, BC",
    tagline: "UBC Campus Safety Network",
    year: "2022",
  },
  {
    src: "/images/hero/hero-2.jpg",
    alt: "TrafficPatternsXD high-durability thermoplastic detail — Square One Paving",
    badge: "TrafficPatternsXD",
    location: "Victoria, BC",
    tagline: "Heavy-Traffic Transit Corridor",
    year: "2023",
  },
  {
    src: "/images/hero/hero-bg.jpg",
    alt: "StreetBond decorative coating bike lane — Square One Paving",
    badge: "StreetBond Coating",
    location: "Surrey, BC",
    tagline: "Keswick Waterpark Surface",
    year: "2023",
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const advance = useCallback((next: number) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(next)
      setAnimating(false)
    }, 320)
  }, [animating])

  // Auto-advance every 6s
  useEffect(() => {
    const t = setInterval(() => {
      advance((current + 1) % slides.length)
    }, 6000)
    return () => clearInterval(t)
  }, [current, advance])

  const slide = slides[current]

  return (
    <section className="bg-[#F4F0EB] flex flex-col md:flex-row" style={{ minHeight: "calc(100vh - 64px)" }}>

      {/* ── Left: Content column ── */}
      <div className="flex flex-col justify-center px-8 py-14 sm:px-12 md:px-14 lg:px-20 xl:px-24 md:w-[52%] lg:w-[50%] xl:w-[48%]">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2.5 mb-8 w-fit">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C85A3A]" />
          <span className="text-[#C85A3A] text-xs font-bold uppercase tracking-[0.2em]">
            Authorized HUB Surface Systems Applicator — BC, Lower Mainland & Vancouver Island
          </span>
        </div>

        {/* Headline — fluid, fills the column */}
        <h1
          className="font-black text-[#1A1A1A] leading-[0.92] tracking-tight mb-8"
          style={{ fontSize: "clamp(3.4rem, 6.5vw, 6rem)" }}
        >
          Paving That<br />
          <span className="text-[#C85A3A]">Performs.</span>
        </h1>

        {/* Divider accent */}
        <div className="w-14 h-[3px] bg-[#C85A3A] rounded mb-8" />

        {/* Sub-text */}
        <p className="text-[#5A5A5A] text-base lg:text-lg leading-relaxed max-w-[440px] mb-10">
          Decorative hardscape, traffic markings, and vapor blasting services — installed by BC&apos;s most experienced crew since 2000.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <Link href="/contact">
            <button className="w-full sm:w-auto bg-[#C85A3A] hover:bg-[#B74D2E] active:bg-[#A6432A] text-white px-8 py-4 rounded-lg font-bold text-sm tracking-wide transition-colors shadow-sm shadow-[#C85A3A]/20">
              Get a Quote
            </button>
          </Link>
          <Link href="/projects">
            <button className="w-full sm:w-auto border border-[#32373C]/20 text-[#32373C] hover:bg-[#32373C]/5 active:bg-[#32373C]/10 px-8 py-4 rounded-lg font-semibold text-sm transition-colors">
              View Our Work
            </button>
          </Link>
        </div>
      </div>

      {/* ── Right: Carousel column (desktop) ── */}
      <div className="hidden md:flex flex-col flex-1 relative overflow-hidden min-h-[500px]">

        {/* Image with crossfade */}
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                className="object-cover object-center"
                priority={i === 0}
                sizes="(max-width: 768px) 0vw, 52vw"
              />
            </div>
          ))}
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4F0EB]/25 via-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none z-10" />
        </div>

        {/* Orange left-edge accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#C85A3A] via-[#C85A3A] to-[#C85A3A]/40 z-20" />

        {/* Top-right stat badge */}
        <div className="absolute top-8 right-8 z-20 bg-[#C85A3A] rounded-xl px-4 py-3 shadow-lg">
          <p className="text-white font-black text-xl leading-none">25+</p>
          <p className="text-white/80 text-[10px] font-semibold uppercase tracking-wider mt-0.5">Years in BC</p>
        </div>

        {/* Bottom: info card + carousel controls */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex items-end justify-between gap-4">

          {/* Project info card — animated */}
          <div
            className="bg-white/93 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/60 shadow-xl max-w-[260px] transition-opacity duration-300"
            style={{ opacity: animating ? 0 : 1 }}
          >
            <p className="text-[#C85A3A] text-[10px] font-bold uppercase tracking-widest mb-1">{slide.badge}</p>
            <p className="text-[#1A1A1A] font-black text-sm leading-tight mb-0.5">{slide.tagline}</p>
            <p className="text-[#888] text-xs">{slide.location} · {slide.year}</p>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Dot indicators */}
            <div className="flex gap-1.5 mr-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => advance(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? 20 : 6,
                    height: 6,
                    background: i === current ? "#C85A3A" : "rgba(255,255,255,0.5)",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            {/* Next button */}
            <button
              onClick={() => advance((current + 1) % slides.length)}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all border border-white/40"
              aria-label="Next project"
            >
              <ChevronRight size={16} className="text-[#1A1A1A]" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile: Photo below text ── */}
      <div className="block md:hidden relative w-full overflow-hidden" style={{ height: "60vw", minHeight: 240, maxHeight: 380 }}>
        <Image
          src={slides[0].src}
          alt="Decorative stamped asphalt installation by Square One Paving"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Mobile info badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
          <p className="text-[#C85A3A] text-[9px] font-bold uppercase tracking-wider">Since 2000</p>
          <p className="text-[#1A1A1A] font-black text-xs leading-tight">500+ Projects Across BC</p>
        </div>
      </div>

    </section>
  )
}
