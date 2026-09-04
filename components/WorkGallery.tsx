"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from "react"
import Image from "next/image"
import type { WorkPhoto } from "@/lib/work"

/**
 * The work, photographed on site — a captioned tile grid of Square One's
 * own installation photography (lib/work.ts), and the viewer Jan shows
 * clients: any tile opens full-screen with its caption, and the arrows,
 * keyboard and swipe walk the set (Vern, 4 Sept 2026: "Jan likes to be
 * able to show clients image galleries").
 *
 * Tiles are 5:3 because the archive shots are 667×402: no crop, no upscale.
 * Captions sit under the image in the type canon's small sizes rather than
 * over it — a scrim on a 667px tile reads as mud. The viewer shows the
 * photograph whole (object-contain) on slate, never cropped.
 *
 *   filters   system + region chips (only the values present in `photos`)
 *   initial   tiles shown before "Show all" — 8 fits two rows of four
 *
 * The viewer is exported: components/ProjectGallery.tsx gives the case
 * studies the same full-screen walk.
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

function Chip({
  active,
  onSelect,
  children,
}: {
  active: boolean
  onSelect: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`rounded-[2px] border px-4 py-[9px] text-[14px] transition-colors ${
        active
          ? "border-[color:var(--ink)] bg-[color:var(--ink)] font-semibold text-white"
          : "border-[color:var(--hairline)] font-medium text-[color:var(--ink-muted)] hover:border-[color:var(--hairline-strong)] hover:text-[color:var(--ink)]"
      }`}
    >
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
        <span
          className="text-[12px] font-semibold tracking-[0.12em] text-white/70 tabular-nums"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
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

      {/* Caption */}
      <div className="shrink-0 border-t border-[color:var(--hairline-slate)] px-6 py-4 max-[700px]:px-4 max-[700px]:pb-[max(16px,env(safe-area-inset-bottom))]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
          <div>
            <div className="text-[15px] leading-[1.4] font-semibold text-white">{photo.primary}</div>
            {photo.secondary && (
              <div className="mt-[2px] text-[13px] leading-[1.5] text-white/70">{photo.secondary}</div>
            )}
          </div>
          <div className="text-[12px] text-white/50 max-[700px]:hidden">
            &larr; &rarr; to move &middot; Esc to close
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
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {systems.length > 1 && (
            <div className="chip-rail flex flex-wrap items-center gap-3 max-[700px]:w-full">
              <span className="label mr-1">System</span>
              <Chip active={system === ALL} onSelect={() => setSystem(ALL)}>
                All
              </Chip>
              {systems.map((s) => (
                <Chip key={s} active={system === s} onSelect={() => setSystem(s)}>
                  {s}
                </Chip>
              ))}
            </div>
          )}

          {regions.length > 1 && (
            <div className="chip-rail flex flex-wrap items-center gap-3 max-[700px]:w-full">
              <span className="label mr-1">Region</span>
              <Chip active={region === ALL} onSelect={() => setRegion(ALL)}>
                All
              </Chip>
              {regions.map((r) => (
                <Chip key={r} active={region === r} onSelect={() => setRegion(r)}>
                  {r}
                </Chip>
              ))}
            </div>
          )}

          <span className="label ml-auto whitespace-nowrap" aria-live="polite">
            {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
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
                <figure>
                  <button
                    type="button"
                    onClick={() => show(i)}
                    aria-label={`View ${primary} full screen`}
                    className="thumb group relative block w-full aspect-[5/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)] text-left"
                  >
                    <Image
                      src={p.src}
                      alt={workAlt(p)}
                      fill
                      sizes="(max-width: 700px) 50vw, (max-width: 1023px) 33vw, 300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute right-3 bottom-3 inline-flex h-8 w-8 items-center justify-center rounded-[2px] bg-[rgba(20,24,29,0.55)] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14">
                        <path d="M2 6V2h4M12 8v4H8M2 2l4 4M12 12L8 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <figcaption className="mt-3 max-[700px]:mt-2">
                    <div className="text-[14px] leading-[1.35] font-semibold text-[color:var(--ink)] [text-wrap:pretty] max-[700px]:text-[13px]">
                      {primary}
                    </div>
                    <div className="mt-1 text-[12.5px] leading-[1.45] text-[color:var(--ink-muted)] [text-wrap:pretty] max-[700px]:text-[12px]">
                      {secondary}
                    </div>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="mt-10 border-t border-[color:var(--hairline)] py-20 text-center">
          <p className="text-[17px] text-[color:var(--ink-body)]">No photos match this filter.</p>
          <button
            type="button"
            onClick={() => {
              setSystem(ALL)
              setRegion(ALL)
            }}
            className="arrow-link mt-6"
          >
            Clear filters <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      )}

      {hidden > 0 && (
        <div className="mt-10 flex items-center gap-6 max-[700px]:mt-8 max-[700px]:flex-col max-[700px]:items-stretch max-[700px]:gap-3">
          <button type="button" onClick={() => setExpanded(true)} className="btn-secondary">
            Show all {filtered.length}
          </button>
          <span className="label max-[700px]:text-center">{hidden} more</span>
        </div>
      )}
      {expanded && filtered.length > initial && (
        <div className="mt-10">
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="arrow-link"
          >
            Show fewer <span aria-hidden="true">&uarr;</span>
          </button>
        </div>
      )}

      {open !== null && viewerPhotos[open] && (
        <Lightbox photos={viewerPhotos} index={open} onIndex={setOpen} onClose={close} />
      )}
    </div>
  )
}
