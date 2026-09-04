"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react"

/* Home hero — an image reel (Vern, 4 Sept 2026: "some sort of image slider
   experience on a reel like the current S1 website"). Five of Square One's
   own frames on a slow crossfade under one headline; every caption is the
   record's place · system · year, nothing invented. The progress hairline
   IS the timer (the advance fires on its animationend), so pausing the bar
   pauses the reel with it. Autoplay pauses on hover, focus and touch,
   stops under prefers-reduced-motion (no drift either), and every frame is
   reachable by button, keyboard arrow or swipe. */

interface Slide {
  src: string
  alt: string
  place: string
  system: string
  year?: string
  position: string
}

const SLIDES: Slide[] = [
  {
    src: "/images/hero/white-rock-pier-crosswalk-trafficpatternsxd.jpg",
    alt: "Red TrafficPatternsXD crosswalk leading to the White Rock Pier, Semiahmoo Bay at low tide beyond",
    place: "White Rock Pier",
    system: "TrafficPatternsXD",
    year: "2019",
    position: "center 62%",
  },
  {
    src: "/images/hero/white-rock-marine-drive-wave-crosswalk.jpg",
    alt: "Artist-designed crosswalk of waves, sand and sky in TrafficPatterns on Marine Drive, White Rock",
    place: "Marine Drive, White Rock",
    system: "TrafficPatterns",
    year: "2025",
    position: "center 60%",
  },
  {
    src: "/images/hero/granville-island-crosswalk-streetprint.jpg",
    alt: "Brick-red TrafficPatternsXD crosswalk outside Granville Island Brewing, Vancouver",
    place: "Granville Island, Vancouver",
    system: "TrafficPatternsXD",
    position: "center 66%",
  },
  {
    src: "/images/hero/bowen-island-polka-dot-walkway-streetbond.jpg",
    alt: "Polka-dot StreetBond walkway with a bald eagle asking a question, Snug Cove, Bowen Island",
    place: "Snug Cove, Bowen Island",
    system: "StreetBond",
    position: "center 50%",
  },
  {
    src: "/images/hero/victoria-ellis-point-walkway-streetprint.jpg",
    alt: "British Cobble StreetPrint walkway in a warm brick tone at Ellis Point, Victoria",
    place: "Ellis Point, Victoria",
    system: "StreetPrint",
    position: "center 60%",
  },
]

const FADE = 1100
const SWIPE = 44

const pad = (n: number) => String(n).padStart(2, "0")

export default function Hero() {
  const count = SLIDES.length
  const [pos, setPos] = useState({ index: 0, prev: -1 })
  const [held, setHeld] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [reduced, setReduced] = useState(false)
  const touchX = useRef<number | null>(null)

  const go = useCallback(
    (n: number) => setPos((p) => ({ index: (p.index + n + count) % count, prev: p.index })),
    [count],
  )

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      go(1)
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      go(-1)
    }
  }

  const onTouchStart = (e: TouchEvent<HTMLElement>) => {
    touchX.current = e.touches[0]?.clientX ?? null
    setHeld(true)
  }
  const onTouchEnd = (e: TouchEvent<HTMLElement>) => {
    const start = touchX.current
    touchX.current = null
    setHeld(false)
    if (start === null) return
    const dx = (e.changedTouches[0]?.clientX ?? start) - start
    if (Math.abs(dx) > SWIPE) go(dx < 0 ? 1 : -1)
  }

  const { index, prev } = pos
  const slide = SLIDES[index]
  const caption = [slide.place, slide.system, slide.year].filter(Boolean).join(" · ")
  const paused = held || !playing

  return (
    <section
      data-nav-on-image
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured work"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative h-[92vh] min-h-[560px] overflow-hidden bg-surface-slate supports-[height:92svh]:h-[92svh]"
    >
      {/* ── Frames ──────── */}
      {SLIDES.map((s, i) => {
        const active = i === index
        const leaving = i === prev
        return (
          <div
            key={s.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${s.place}`}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity ease-[cubic-bezier(0.4,0,0.2,1)] ${
              active ? "z-[1] opacity-100" : leaving ? "z-0 opacity-100" : "z-0 opacity-0"
            }`}
            style={{ transitionDuration: `${FADE}ms` }}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`reel-frame object-cover${active ? " reel-frame-active" : ""}`}
              style={{ objectPosition: s.position }}
            />
          </div>
        )
      })}

      {/* Rising slate scrim — keeps the headline legible, lets the surface speak above it */}
      <div aria-hidden="true" className="scrim-rise z-[1]" />
      <div aria-hidden="true" className="scrim-top z-[1]" />

      {/* ── Headline block, bottom-left ──────── */}
      <div className="absolute inset-x-0 bottom-0 z-[2]">
        <div className="container-1280 pb-[72px] max-[700px]:pb-16">
          <div className="eyebrow eyebrow-on-image">
            BC&rsquo;s decorative pavement studio &middot; Since 2000
          </div>

          <h1 className="display-xl stop mt-6 max-w-[15ch] text-white [text-wrap:balance]">
            Surfaces that define a place
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-[14px]">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
            <Link href="/projects" className="btn-on-image">
              See our work
            </Link>
          </div>
        </div>
      </div>

      {/* ── Reel controls, bottom-right (wide screens) ──────── */}
      <div className="absolute right-10 bottom-[100px] z-[2] hidden flex-col items-end gap-4 min-[1101px]:flex">
        <div
          className="text-right text-[12px] font-semibold tracking-[0.05em] text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {caption}
        </div>
        <div className="flex items-center gap-3">
          <span
            className="mr-2 text-[12px] font-semibold tracking-[0.12em] text-white/80 tabular-nums"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {pad(index + 1)} / {pad(count)}
          </span>
          <button type="button" onClick={() => go(-1)} aria-label="Previous frame" className="reel-btn">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next frame" className="reel-btn">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause the reel" : "Play the reel"}
            aria-pressed={!playing}
            className="reel-btn"
          >
            {playing ? (
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
                <path d="M3.5 2v8M8.5 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
                <path d="M3.5 2l6 4-6 4z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Progress hairlines — the reel's clock ──────── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-6 bottom-5 z-[2] flex gap-[6px] min-[1101px]:inset-x-auto min-[1101px]:right-10 min-[1101px]:bottom-[72px] min-[1101px]:w-[252px]"
      >
        {SLIDES.map((s, i) => (
          <div key={s.src} className="reel-seg flex-1">
            {i < index && <div className="reel-seg-fill is-done" />}
            {i === index &&
              (reduced ? (
                <div className="reel-seg-fill is-done" />
              ) : (
                <div
                  key={index}
                  className={`reel-seg-fill is-running${paused ? " is-paused" : ""}`}
                  onAnimationEnd={() => go(1)}
                />
              ))}
          </div>
        ))}
      </div>

      {/* ── Quiet scroll cue ──────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 z-[2] h-9 w-px -translate-x-1/2 bg-white/40 max-[1100px]:hidden"
      />
    </section>
  )
}
