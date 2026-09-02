"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import type { WorkPhoto } from "@/lib/work"

/**
 * The work, photographed on site — a captioned tile grid of Square One's
 * own installation photography (lib/work.ts).
 *
 * Tiles are 5:3 because the archive shots are 667×402: no crop, no upscale.
 * Captions sit under the image in the type canon's small sizes rather than
 * over it — a scrim on a 667px tile reads as mud. Nothing here links to a
 * detail page; the photo and its caption ARE the record.
 *
 *   filters   system + region chips (only the values present in `photos`)
 *   initial   tiles shown before "Show all" — 8 fits two rows of four
 */

interface WorkGalleryProps {
  photos: WorkPhoto[]
  filters?: boolean
  initial?: number
  /** Heading is rendered by the caller; this is the aria label for the grid. */
  ariaLabel?: string
}

const ALL = "All"

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

export default function WorkGallery({
  photos,
  filters = true,
  initial = 8,
  ariaLabel = "Installation photographs",
}: WorkGalleryProps) {
  const [system, setSystem] = useState(ALL)
  const [region, setRegion] = useState(ALL)
  const [expanded, setExpanded] = useState(false)

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

  const visible = expanded ? filtered : filtered.slice(0, initial)
  const hidden = filtered.length - visible.length

  return (
    <div>
      {filters && (systems.length > 1 || regions.length > 1) && (
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {systems.length > 1 && (
            <div className="flex flex-wrap items-center gap-3">
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
            <div className="flex flex-wrap items-center gap-3">
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
            filters ? "mt-10" : ""
          }`}
        >
          {visible.map((p) => {
            const primary = p.place || p.subject
            const secondary = p.place
              ? [p.systems.join(" + "), p.subject].filter(Boolean).join(" · ")
              : p.systems.join(" + ")

            return (
              <li key={p.src}>
                <figure>
                  <div className="thumb relative aspect-[5/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
                    <Image
                      src={p.src}
                      alt={workAlt(p)}
                      fill
                      sizes="(max-width: 700px) 50vw, (max-width: 1023px) 33vw, 300px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3">
                    <div className="text-[14px] leading-[1.35] font-semibold text-[color:var(--ink)] [text-wrap:pretty]">
                      {primary}
                    </div>
                    <div className="mt-1 text-[12.5px] leading-[1.45] text-[color:var(--ink-muted)] [text-wrap:pretty]">
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
        <div className="mt-10 flex items-center gap-6">
          <button type="button" onClick={() => setExpanded(true)} className="btn-secondary">
            Show all {filtered.length}
          </button>
          <span className="label">{hidden} more</span>
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
    </div>
  )
}
