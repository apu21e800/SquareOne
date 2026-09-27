"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type TouchEvent } from "react"
import Image from "next/image"
import type { WorkPhoto } from "@/lib/work"

/**
 * The work, photographed on site — a captioned grid of Square One's own
 * installation photography (lib/work.ts), and the viewer Jan shows clients:
 * any frame opens full-screen with its caption, and the arrows, keyboard
 * and swipe walk the set (Vern, 4 Sept 2026: "Jan likes to be able to show
 * clients image galleries").
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7, §5 step 5): the same grid,
 * set the own-company way. Every frame is square-cornered with its caption
 * UNDER it in the serif (`.cap`) — place, then system and subject; nothing
 * over the photograph, no scrim, no hover zoom, no expand badge. The filter
 * chips are underlined words (`.link`); the one in force is plain ink with
 * `aria-pressed`. "Show all" and "Show fewer" are words too.
 *
 * Frames are 5:3 because the archive shots are 667×402: no crop, no
 * upscale. The viewer shows the photograph whole (object-contain) on slate,
 * never cropped.
 *
 *   filters   system + region words (only the values present in `photos`)
 *   initial   frames shown before "Show all" — 8 fits two rows of four
 *
 * The viewer is exported: components/ProjectGallery.tsx and
 * components/FrameGallery.tsx give their sets the same full-screen walk.
 */

interface WorkGalleryProps {
  photos: WorkPhoto[]
  filters?: boolean
  initial?: number
  /** Heading is rendered by the caller; this is the aria label for the grid. */
  ariaLabel?: string
}

/** What the viewer needs of a photograph — the record's caption, nothing more. */
export interface ViewerPhoto {
  src: string
  alt: string
  primary: string
  secondary?: string
}

const ALL = "All"
const SWIPE = 44

/** The filter in force reads as the current word, not a link: ink, no
    underline. own.css sets `.link` unlayered, so the override is inline. */
const CURRENT: CSSProperties = { textDecoration: "none", color: "var(--ink)" }

/** One filter word — an underlined link, or the plain current word. */
export function FilterWord({
  active,
  onSelect,
  children,
}: {
  active: boolean
  onSelect: () => void
  children: React.ReactNode
}) {
  return (
    <button type="button" onClick={onSelect} aria-pressed={active} className="link" style={active ? CURRENT : undefined}>
      {children}
    </button>
  )
}

/** Alt text states what the photo shows and where — never a keyword string. */
export function workAlt(p: WorkPhoto): string {
  const sys = p.systems.join(" and ")
  return p.place
    ? `${p.subject} in ${sys} — ${p.place}, BC. Installed by Square One Paving.`
    : `${p.subject} in ${sys}. Installed by Square One Paving.`
}

function captionLines(p: WorkPhoto): { primary: string; secondary: string } {
  const primary = p.place || p.subject
  const secondary = p.place
    ? [p.systems.join(" + "), p.subject].filter(Boolean).join(" · ")
    : p.systems.join(" + ")
  return { primary, secondary }
}

function toViewer(p: WorkPhoto): ViewerPhoto {
  const { primary, secondary } = captionLines(p)
  return { src: p.src, alt: workAlt(p), primary, secondary }
}

/**
 * One frame of a gallery: a square-cornered button holding the photograph,
 * the caption under it. Shared by the three galleries so they read as one.
 */
export function GalleryFrame({
  src,
  alt,
  primary,
  secondary,
  aspect = "aspect-[5/3]",
  sizes = "(max-width: 700px) 50vw, (max-width: 1023px) 33vw, 300px",
  ariaLabel,
  onOpen,
}: {
  src: string
  alt: string
  primary: string
  secondary?: string
  aspect?: string
  sizes?: string
  ariaLabel: string
  onOpen: () => void
}) {
  return (
    <figure className="m-0">
      <button
        type="button"
        onClick={onOpen}
        aria-label={ariaLabel}
        className={`relative block w-full overflow-hidden bg-surface-stone text-left ${aspect}`}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </button>
      {/* Two lines: the place leads in ink, the system and subject follow
          muted. One line: the quiet caption alone. */}
      <figcaption className="cap [text-wrap:pretty]">
        <span className={secondary ? "block text-ink" : "block"}>{primary}</span>
        {secondary && <span className="block">{secondary}</span>}
      </figcaption>
    </figure>
  )
}

/* ------------------------------------------------------------------
   Viewer — full-screen, slate, the photograph whole
   ------------------------------------------------------------------ */

export function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
}: {
  photos: ViewerPhoto[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const count = photos.length
  const photo = photos[index]
  const touchX = useRef<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const step = useCallback((n: number) => onIndex((index + n + count) % count), [index, count, onIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, step])

  const onTouchStart = (e: TouchEvent<HTMLElement>) => {
    touchX.current = e.touches[0]?.clientX ?? null
  }
  const onTouchEnd = (e: TouchEvent<HTMLElement>) => {
    const start = touchX.current
    touchX.current = null
    if (start === null) return
    const dx = (e.changedTouches[0]?.clientX ?? start) - start
    if (Math.abs(dx) > SWIPE) step(dx < 0 ? 1 : -1)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph ${index + 1} of ${count}: ${photo.primary}`}
      className="fixed inset-0 z-[500] flex flex-col bg-[color:var(--surface-slate)] text-white"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="flex h-[64px] shrink-0 items-center justify-between px-6 max-[700px]:px-4">
        <span className="text-[14px] italic text-white/70 tabular-nums">
          {index + 1} of {count}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close the viewer"
          className="reel-btn"
        >
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Photograph — whole, never cropped */}
      <div className="relative min-h-0 flex-1">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close the viewer"
          className="absolute inset-0 cursor-default"
        />
        <div className="pointer-events-none absolute inset-0 mx-auto max-w-[1600px] px-6 max-[700px]:px-2">
          <div className="relative h-full w-full">
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photograph"
              className="reel-btn absolute top-1/2 left-4 -translate-y-1/2 bg-[rgba(20,24,29,0.5)] max-[700px]:left-2"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photograph"
              className="reel-btn absolute top-1/2 right-4 -translate-y-1/2 bg-[rgba(20,24,29,0.5)] max-[700px]:right-2"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Caption — the serif, under the photograph */}
      <div className="shrink-0 border-t border-[color:var(--hairline-slate)] px-6 py-4 max-[700px]:px-4 max-[700px]:pb-[max(16px,env(safe-area-inset-bottom))]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
          <div className="italic">
            <div className="text-[15px] leading-[1.4] text-white">{photo.primary}</div>
            {photo.secondary && (
              <div className="mt-[2px] text-[14px] leading-[1.5] text-white/70">{photo.secondary}</div>
            )}
          </div>
          <div className="text-[13px] italic text-white/50 max-[700px]:hidden">
            Arrow keys to move &middot; Esc to close
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Grid
   ------------------------------------------------------------------ */

export default function WorkGallery({
  photos,
  filters = true,
  initial = 8,
  ariaLabel = "Installation photographs",
}: WorkGalleryProps) {
  const [system, setSystem] = useState(ALL)
  const [region, setRegion] = useState(ALL)
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const opener = useRef<HTMLElement | null>(null)

  const systems = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of photos) for (const s of p.systems) counts.set(s, (counts.get(s) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([s]) => s)
  }, [photos])

  const regions = useMemo(() => {
    const seen = new Set<string>()
    for (const p of photos) if (p.region) seen.add(p.region)
    const order = ["Lower Mainland", "Vancouver Island", "Interior", "Sunshine Coast", "Sea to Sky"]
    return order.filter((r) => seen.has(r))
  }, [photos])

  const filtered = useMemo(
    () =>
      photos.filter(
        (p) =>
          (system === ALL || p.systems.includes(system)) &&
          (region === ALL || p.region === region),
      ),
    [photos, system, region],
  )

  const viewerPhotos = useMemo(() => filtered.map(toViewer), [filtered])
  const visible = expanded ? filtered : filtered.slice(0, initial)
  const hidden = filtered.length - visible.length

  const show = (i: number) => {
    opener.current = document.activeElement as HTMLElement | null
    setOpen(i)
  }
  const close = useCallback(() => {
    setOpen(null)
    opener.current?.focus()
    opener.current = null
  }, [])

  return (
    <div>
      {filters && (systems.length > 1 || regions.length > 1) && (
        <div className="flex flex-col gap-y-3">
          {systems.length > 1 && (
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="label mr-1">System</span>
              <FilterWord active={system === ALL} onSelect={() => setSystem(ALL)}>
                All
              </FilterWord>
              {systems.map((s) => (
                <FilterWord key={s} active={system === s} onSelect={() => setSystem(s)}>
                  {s}
                </FilterWord>
              ))}
            </div>
          )}

          {regions.length > 1 && (
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="label mr-1">Region</span>
              <FilterWord active={region === ALL} onSelect={() => setRegion(ALL)}>
                All
              </FilterWord>
              {regions.map((r) => (
                <FilterWord key={r} active={region === r} onSelect={() => setRegion(r)}>
                  {r}
                </FilterWord>
              ))}
            </div>
          )}

          {/* No count — the client reads a number as a claim about the whole
              body of work (10 and 18 Sept 2026). The live region still tells
              a screen reader the filter took. */}
          <span className="sr-only" aria-live="polite">
            {filtered.length} photograph{filtered.length !== 1 ? "s" : ""} shown
          </span>
        </div>
      )}

      {filtered.length > 0 ? (
        <ul
          aria-label={ariaLabel}
          className={`grid grid-cols-2 gap-x-5 gap-y-8 min-[701px]:grid-cols-3 min-[1024px]:grid-cols-4 max-[700px]:gap-x-3 max-[700px]:gap-y-6 ${
            filters ? "mt-10 max-[700px]:mt-8" : ""
          }`}
        >
          {visible.map((p, i) => {
            const { primary, secondary } = captionLines(p)
            return (
              <li key={p.src}>
                <GalleryFrame
                  src={p.src}
                  alt={workAlt(p)}
                  primary={primary}
                  secondary={secondary}
                  ariaLabel={`View ${primary} full screen`}
                  onOpen={() => show(i)}
                />
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="mt-10 border-t border-hairline py-20 text-center">
          <p className="text-ink-body">No photos match this filter.</p>
          <button
            type="button"
            onClick={() => {
              setSystem(ALL)
              setRegion(ALL)
            }}
            className="link mt-6"
          >
            Clear filters
          </button>
        </div>
      )}

      {hidden > 0 && (
        <div className="mt-10 max-[700px]:mt-8">
          <button type="button" onClick={() => setExpanded(true)} className="link">
            Show all
          </button>
        </div>
      )}
      {expanded && filtered.length > initial && (
        <div className="mt-10">
          <button type="button" onClick={() => setExpanded(false)} className="link">
            Show fewer
          </button>
        </div>
      )}

      {open !== null && viewerPhotos[open] && (
        <Lightbox photos={viewerPhotos} index={open} onIndex={setOpen} onClose={close} />
      )}
    </div>
  )
}
