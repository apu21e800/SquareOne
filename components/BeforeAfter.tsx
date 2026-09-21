"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

/**
 * Before / after wipe — the one interactive moment on the vapour blasting
 * page (Vern, 19 Sept 2026: "a before and after slider on the red brick
 * wall... the one bonus I would like to add for the client").
 *
 * How it works: the AFTER frame sits underneath; the BEFORE frame sits on
 * top, clipped to the left of a divider. A native range input covers the
 * whole figure — invisible, but it is what the pointer and keyboard drive,
 * so mouse, touch, arrow keys and screen readers all work without any
 * gesture maths of our own.
 *
 * On first scroll into view the divider runs once from the right edge to a
 * third of the way across, so the wall visibly cleans itself before the
 * reader is asked to do anything. Reduced-motion users get the handle
 * parked at the half-way mark instead.
 *
 * Both frames must share a camera: the pair here are two renders of the
 * same scene (see the page comment on provenance).
 */
export default function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  /** Where the divider settles after the opening wipe, 0–100. */
  rest = 36,
  className = "",
  priority = false,
  sizes = "(max-width: 1280px) 100vw, 1280px",
  tone = "ink",
}: {
  before: { src: string; alt: string }
  after: { src: string; alt: string }
  beforeLabel?: string
  afterLabel?: string
  rest?: number
  className?: string
  priority?: boolean
  sizes?: string
  /** "water" colours the handle in the vapour blue (the only place it is used). */
  tone?: "ink" | "water"
}) {
  const [pos, setPos] = useState(100)
  const [touched, setTouched] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const played = useRef(false)
  const raf = useRef<number | null>(null)
  const touchedRef = useRef(false)

  // Opening wipe — once, when the figure is comfortably in view.
  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduce) {
      setPos(50)
      played.current = true
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting)
        if (!hit || played.current) return
        played.current = true
        io.disconnect()

        const from = 100
        const to = rest
        const duration = 2200
        const delay = 350
        const start = performance.now() + delay
        const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

        const step = (now: number) => {
          if (touchedRef.current) return
          const t = Math.min(1, Math.max(0, (now - start) / duration))
          setPos(from + (to - from) * ease(t))
          if (t < 1) raf.current = requestAnimationFrame(step)
        }
        raf.current = requestAnimationFrame(step)
      },
      { threshold: 0.55 },
    )
    io.observe(node)

    return () => {
      io.disconnect()
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [rest])

  // The wipe yields the moment the reader takes the handle.
  const take = () => {
    if (!touchedRef.current) {
      touchedRef.current = true
      played.current = true
      setTouched(true)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }

  const clamp = Math.min(100, Math.max(0, pos))

  return (
    <div
      ref={rootRef}
      className={`group relative isolate select-none overflow-hidden rounded-[2px] bg-surface-stone [&:has(input:focus-visible)]:outline-2 [&:has(input:focus-visible)]:outline-offset-2 [&:has(input:focus-visible)]:outline-[color:var(--accent)] ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      {/* After — the clean wall, full frame underneath */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        draggable={false}
      />

      {/* Before — on top, clipped to the left of the divider */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - clamp}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Divider + handle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-[2]"
        style={{ left: `${clamp}%` }}
      >
        <div className="absolute inset-y-0 -left-px w-[2px] bg-white/95 shadow-[0_0_0_1px_rgba(24,21,18,0.25)]" />
        <div
          className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 text-white shadow-[0_4px_18px_rgba(24,21,18,0.35)] backdrop-blur-[2px] transition-transform duration-150 group-hover:scale-105 group-active:scale-95"
          style={{ background: tone === "water" ? "rgba(31,111,178,0.88)" : "rgba(24,21,18,0.62)" }}
        >
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 1 1 7l5 6" />
            <path d="m16 1 5 6-5 6" />
          </svg>
        </div>
      </div>

      {/* Frame labels — each fades as its side is wiped away */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-4 left-4 z-[2] rounded-[2px] bg-[rgba(24,21,18,0.62)] px-[10px] py-[6px] font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition-opacity duration-200"
        style={{ opacity: clamp < 10 ? 0 : 1 }}
      >
        {beforeLabel}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-4 z-[2] rounded-[2px] bg-[rgba(24,21,18,0.62)] px-[10px] py-[6px] font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition-opacity duration-200"
        style={{ opacity: clamp > 90 ? 0 : 1 }}
      >
        {afterLabel}
      </div>

      {/* Drag hint — goes the moment the reader takes over */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-1/2 z-[2] -translate-x-1/2 rounded-[2px] bg-[rgba(24,21,18,0.62)] px-[10px] py-[6px] font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition-opacity duration-300"
        style={{ opacity: touched ? 0 : 1 }}
      >
        Drag the line
      </div>

      {/* The control. Invisible, full-bleed, native — pointer, touch and keys. */}
      <input
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={clamp}
        aria-label={`${beforeLabel} and ${afterLabel} comparison — move to reveal the cleaned surface`}
        aria-valuetext={`${Math.round(clamp)}% ${beforeLabel.toLowerCase()}`}
        onChange={(e) => {
          take()
          setPos(Number(e.target.value))
        }}
        onPointerDown={take}
        onKeyDown={take}
        className="absolute inset-0 z-[3] m-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 outline-none [&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-12 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
      />
    </div>
  )
}
