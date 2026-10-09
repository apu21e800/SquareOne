"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from "react"
import { HERO_SLIDES, type Slide } from "@/lib/hero-slides"
import { paletteById } from "@/lib/palettes"
import { nextPalette, setPalette, usePalette } from "@/lib/use-palette"

/* Home hero — an image reel (Vern, 4 Sept 2026: "some sort of image slider
   experience on a reel like the current S1 website"). Five of Square One's
   own frames on a slow crossfade under one headline; every caption is the
   record's place · system · year, nothing invented. The progress hairline
   IS the timer (the advance fires on its animationend), so pausing the bar
   pauses the reel with it. Autoplay pauses on hover, focus and touch,
   stops under prefers-reduced-motion (no drift either), and every frame is
   reachable by button, keyboard arrow or swipe. */

const FADE = 1100
const SWIPE = 44

const pad = (n: number) => String(n).padStart(2, "0")

interface HeroProps {
  slides?: Slide[]
  eyebrow?: string
  title?: string
}

export default function Hero({ slides, eyebrow, title }: HeroProps) {
  const SLIDES = slides && slides.length > 0 ? slides : HERO_SLIDES
  const count = SLIDES.length
  const [pos, setPos] = useState({ index: 0, prev: -1 })
  const [held, setHeld] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [reduced, setReduced] = useState(false)
  // The four frames behind the first are mounted a beat after load, so the
  // opening paint competes with one hero-size image, not five (19 Sept
  // 2026 — Lighthouse on a simulated phone: every slide was fetched at once).
  const [warm, setWarm] = useState(false)
  const touchX = useRef<number | null>(null)

  useEffect(() => {
    const t = window.setTimeout(() => setWarm(true), 1200)
    return () => window.clearTimeout(t)
  }, [])

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

  /* The colour card switch (8 Oct 2026; Vern, after the client: "put an
     easter egg in the hero somewhere, that will let the user cycle through
     style options… apply changes site wide"). A small copy of the band sits
     in the ledger beside the counter; each press moves the whole site to the
     next palette (lib/palettes.ts: Spectrum, Greyscale, Earth, Blueprint) and
     the reel's clock right under it changes with it, so the press answers
     itself. The name shows for a moment above the switch and is announced to
     screen readers; the choice is remembered on every page after. */
  const palette = usePalette()
  const [paletteShown, setPaletteShown] = useState<string | null>(null)
  // Nothing about the switch is in the page until it is first pressed, so the
  // hero's server-rendered words are the headline and the caption, as before.
  const [paletteTouched, setPaletteTouched] = useState(false)
  const paletteTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cyclePalette = () => {
    const next = nextPalette(palette)
    setPalette(next)
    setPaletteTouched(true)
    setPaletteShown(next)
    if (paletteTimer.current) clearTimeout(paletteTimer.current)
    paletteTimer.current = setTimeout(() => setPaletteShown(null), 2600)
  }
  useEffect(
    () => () => {
      if (paletteTimer.current) clearTimeout(paletteTimer.current)
    },
    [],
  )
  // While the name fades out it keeps the words it was showing.
  const toastPalette = paletteById(paletteShown ?? palette)

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
  const caption = slide.caption ?? [slide.place, slide.system, slide.year].filter(Boolean).join(" · ")
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
      className="relative h-[100vh] min-h-[560px] overflow-hidden bg-surface-slate supports-[height:100svh]:h-[100svh]"
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
            {(i === 0 || warm) && (
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : undefined}
                sizes="100vw"
                className={`reel-frame object-cover${active ? " reel-frame-active" : ""}`}
                style={{ objectPosition: s.position }}
              />
            )}
          </div>
        )
      })}

      {/* Rising slate scrim — keeps the headline legible, lets the surface speak above it */}
      <div aria-hidden="true" className="scrim-rise z-[1]" />
      <div aria-hidden="true" className="scrim-top z-[1]" />

      {/* ── Headline block, bottom-left ────────
          26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §9.2): the reel is exactly
          as it was; over it, the headline in sentence case, one line in the
          display face. The `eyebrow` slot (a CMS field) renders as the line
          under the headline.

          2 Oct 2026 (Vern: "hero sections still feel a bit unfinished";
          "bring back what might have been lost from the live site"): the
          second action is back beside the first, as the live site had it,
          and the caption, the counter and the controls sit on one hairline
          ledger under the words instead of floating in the corners. The
          reel's clock is the hero's bottom edge, in seven segments. */}
      <div className="absolute inset-x-0 bottom-0 z-[2]">
        <div className="hero-in container-1280 pb-[40px] max-[700px]:pb-[30px]">
          <h1 className="display-xl max-w-none text-white">
            {title ?? (
              <>
                Surfaces that <em>define a place</em>
              </>
            )}
          </h1>

          <p className="mt-6 max-w-[46ch] text-[19px] leading-[1.5] text-white/90 [text-wrap:pretty] max-[700px]:mt-5 max-[700px]:text-[17px]">
            {eyebrow ?? (
              <>
                Stamped asphalt, coloured coatings and crosswalks, installed by our own crews across
                the Lower Mainland and Vancouver Island since 2000.
              </>
            )}
          </p>

          <div className="hero-actions mt-9 max-[700px]:mt-7">
            <Link href="/contact" className="btn-primary">
              Get a quote
            </Link>
            <Link href="/projects" className="btn-on-image">
              See the work
            </Link>
          </div>

          <div className="hero-ledger">
            {/* On a phone there is no room above the switch without covering the
                buttons, so the palette's name takes the caption's place for the
                moment it shows, then the caption comes back (app/own.css). */}
            <span className="cap-on-image truncate" data-palette-shown={paletteShown ? "" : undefined}>
              <span className="cap-text">{caption}</span>
              {paletteShown && (
                <span className="cap-palette" aria-hidden="true">
                  <strong>{toastPalette.name}</strong> {toastPalette.line}
                </span>
              )}
            </span>
            <div className="flex shrink-0 items-center gap-4">
              <div className="palette-switch">
                <button
                  type="button"
                  onClick={cyclePalette}
                  className="palette-chip"
                  aria-label={`Colour card: ${paletteById(palette).name}. Show the next one`}
                  title="Another colour card"
                >
                  <span aria-hidden="true" />
                </button>
                {paletteTouched && (
                  <span className="palette-toast" data-shown={paletteShown ? "" : undefined} aria-hidden="true">
                    <strong>{toastPalette.name}</strong>
                    {toastPalette.line}
                  </span>
                )}
              </div>
              <span className="sr-only" aria-live="polite">
                {paletteShown ? `${toastPalette.name}. ${toastPalette.line}.` : ""}
              </span>
              <span className="reel-counter">
                {pad(index + 1)} / {pad(count)}
              </span>
              <div className="reel-controls">
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
          </div>
        </div>
      </div>

      {/* ── The reel's clock: the hero's foot, drawn as the colour card's
             edge, the footer's band. The track is the band behind a white
             veil; each frame reveals its slice at full colour as it plays
             (6 Oct 2026, Vern: "the progress bar line under the hero gets
             lost, nobody even notices it… a gradient like the footer").
             The hero is the full viewport now, so the next section starts
             below the fold. ──────── */}
      <div aria-hidden="true" className="hero-clock" style={{ ["--n" as string]: count } as CSSProperties}>
        {SLIDES.map((s, i) => (
          <div key={s.src} className="reel-seg" style={{ ["--i" as string]: i } as CSSProperties}>
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
    </section>
  )
}
