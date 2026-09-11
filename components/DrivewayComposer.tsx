"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { DRAWINGS, W, H } from "@/components/PatternTile"
import PatternTile from "@/components/PatternTile"
import {
  STREETPRINT_PATTERNS,
  STREETBOND_COLOURS,
  DRIVEWAY_COLOURS,
  COLOUR_RANGES,
  type PatternId,
  type Swatch,
} from "@/lib/palette"

/**
 * The driveway composer — pick a StreetPrint template and a StreetBond
 * colour and see the two together, large, as a sample board. Built 11 Sept
 * 2026 for the homeowner pages: the one interaction on the site that lets
 * someone play with the actual decision they are making (which pattern,
 * which colour) before anyone calls anyone.
 *
 * Honesty: the board is a drawing of HUB's published template geometry
 * filled with HUB's published colour value — not a photograph, not a
 * rendering of a real driveway, and the caption says so. On-screen colour
 * varies from the cast colour; the sample boards at the site visit decide.
 * The choice travels to /contact as ?pattern=&colour= so the enquiry
 * arrives pre-filled.
 */

/** Procedural asphalt grain — no photograph, so nothing to mistake for one. */
const GRAIN = `<filter id="board-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" seed="7"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.9"/></feComponentTransfer></filter><rect width="100%" height="100%" filter="url(#board-grain)"/>`

function Board({ pattern, swatch }: { pattern: PatternId; swatch: Swatch }) {
  const { body, rotate } = DRAWINGS[pattern]()
  const inner = rotate ? `<g transform="rotate(${rotate} ${W / 2} ${H / 2})">${body}</g>` : body
  // The field is the colour; the joints are asphalt showing through the
  // seal — a dark line with a hair of highlight beside it, which is what a
  // stamped joint does under raking light.
  const svg = `<clipPath id="board-clip"><rect width="${W}" height="${H}"/></clipPath><rect width="${W}" height="${H}" fill="${swatch.hex}"/><g clip-path="url(#board-clip)" fill="none" stroke-linejoin="round"><g transform="translate(0.5 0.5)" stroke="rgba(255,255,255,0.28)" stroke-width="0.55">${inner}</g><g stroke="rgba(24,21,18,0.7)" stroke-width="0.6">${inner}</g></g>`
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-surface-stone shadow-[var(--shadow-rest)]">
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {/* Grain, multiplied into the colour, and a soft raking light */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-[0.28] mix-blend-multiply"
        dangerouslySetInnerHTML={{ __html: GRAIN }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,0.14) 100%)" }}
      />
    </div>
  )
}

export default function DrivewayComposer({
  initialPattern = "ashlar-slate",
  initialColour = "Slate",
  city,
}: {
  initialPattern?: PatternId
  initialColour?: string
  /** Named on the enquiry link when the page is a city page. */
  city?: string
}) {
  const [pattern, setPattern] = useState<PatternId>(initialPattern)
  const [colourName, setColourName] = useState(initialColour)
  const [allColours, setAllColours] = useState(false)

  // Arriving from the home materials board (?pattern=&colour=): open on that
  // choice. Read once, on the client, and ignored if the value is unknown.
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search)
      const p = q.get("pattern")
      const c = q.get("colour")
      if (p && STREETPRINT_PATTERNS.some((x) => x.id === p)) setPattern(p as PatternId)
      if (c && STREETBOND_COLOURS.some((x) => x.name === c)) {
        setColourName(c)
        if (!DRIVEWAY_COLOURS.some((x) => x.name === c)) setAllColours(true)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const swatch = useMemo(
    () => STREETBOND_COLOURS.find((c) => c.name === colourName) ?? DRIVEWAY_COLOURS[0],
    [colourName],
  )
  const patternMeta = STREETPRINT_PATTERNS.find((p) => p.id === pattern) ?? STREETPRINT_PATTERNS[0]
  const shown = allColours ? STREETBOND_COLOURS : DRIVEWAY_COLOURS

  const enquiry = `/contact?pattern=${encodeURIComponent(patternMeta.name)}&colour=${encodeURIComponent(swatch.name)}${city ? `&city=${encodeURIComponent(city)}` : ""}`

  return (
    <div className="grid grid-cols-12 gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
      {/* ── The board ──────── */}
      <div className="col-span-7 max-[900px]:col-span-1">
        <Board pattern={pattern} swatch={swatch} />
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="text-[15px] font-medium text-ink" aria-live="polite">
            {patternMeta.name} in {swatch.name}
            <span className="text-ink-muted"> &middot; StreetBond {swatch.range}</span>
          </p>
          <p className="max-w-[44ch] text-[12.5px] leading-[1.5] text-ink-muted">
            A drawing of HUB&rsquo;s template in HUB&rsquo;s published colour, not a photograph.
            On-screen colour varies from the cast colour; the sample boards decide.
          </p>
        </div>
      </div>

      {/* ── The choices ──────── */}
      <div className="col-span-5 max-[900px]:col-span-1">
        <div className="label">Pattern</div>
        <ul className="mt-3 grid grid-cols-5 gap-2 max-[560px]:grid-cols-4" role="list">
          {STREETPRINT_PATTERNS.map((p) => {
            const on = p.id === pattern
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setPattern(p.id)}
                  aria-pressed={on}
                  title={p.name}
                  className={`group block w-full cursor-pointer rounded-[2px] border p-[3px] text-left transition-colors ${
                    on ? "border-[color:var(--ink)]" : "border-[color:var(--hairline)] hover:border-[color:var(--hairline-strong)]"
                  }`}
                >
                  <span className="pattern-tile block aspect-[4/3] w-full overflow-hidden rounded-[1px] bg-[#1E1B18]">
                    <PatternTile id={p.id} className="h-full w-full" />
                  </span>
                  <span className={`mt-[6px] block min-h-[26px] text-[9.5px] font-semibold uppercase leading-[1.25] tracking-[0.05em] ${on ? "text-ink" : "text-ink-muted"}`} style={{ fontFamily: "var(--font-display)" }}>
                    {p.name.replace(/ Templates?$/, "").replace("Standard Herringbone", "Herringbone").replace("Diagonal Herringbone", "Diagonal h'bone")}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-8 flex items-baseline justify-between gap-4">
          <div className="label">Colour</div>
          <button
            type="button"
            onClick={() => setAllColours((v) => !v)}
            className="text-[12.5px] font-semibold text-ink-muted underline-offset-4 hover:text-ink hover:underline"
          >
            {allColours ? "Just the driveway six" : `All ${STREETBOND_COLOURS.length} StreetBond colours`}
          </button>
        </div>

        {allColours ? (
          <div className="mt-3 flex flex-col gap-4">
            {COLOUR_RANGES.map((range) => (
              <div key={range}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-muted" style={{ fontFamily: "var(--font-display)" }}>
                  {range}
                </div>
                <ul className="mt-2 flex flex-wrap gap-[6px]" role="list">
                  {STREETBOND_COLOURS.filter((c) => c.range === range).map((c) => (
                    <li key={c.name}>
                      <button
                        type="button"
                        onClick={() => setColourName(c.name)}
                        aria-pressed={c.name === swatch.name}
                        title={c.name}
                        aria-label={c.name}
                        className={`block h-8 w-8 cursor-pointer rounded-[2px] border-2 transition-transform hover:scale-[1.08] ${
                          c.name === swatch.name ? "border-[color:var(--ink)]" : "border-white"
                        }`}
                        style={{ background: c.hex, boxShadow: "0 0 0 1px var(--hairline)" }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="mt-3 grid grid-cols-3 gap-2" role="list">
            {shown.map((c) => {
              const on = c.name === swatch.name
              return (
                <li key={c.name}>
                  <button
                    type="button"
                    onClick={() => setColourName(c.name)}
                    aria-pressed={on}
                    className={`block w-full cursor-pointer rounded-[2px] border p-[3px] text-left transition-colors ${
                      on ? "border-[color:var(--ink)]" : "border-[color:var(--hairline)] hover:border-[color:var(--hairline-strong)]"
                    }`}
                  >
                    <span className="block h-12 w-full rounded-[1px]" style={{ background: c.hex }} />
                    <span className={`mt-[6px] block text-[10.5px] font-semibold uppercase tracking-[0.06em] ${on ? "text-ink" : "text-ink-muted"}`} style={{ fontFamily: "var(--font-display)" }}>
                      {c.name}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-hairline pt-6">
          <Link href={enquiry} className="btn-primary">
            Book a site visit with this
          </Link>
          <span className="text-[13px] leading-[1.5] text-ink-muted">
            Your choice arrives with the enquiry. We bring sample boards to the site visit.
          </span>
        </div>
      </div>
    </div>
  )
}
