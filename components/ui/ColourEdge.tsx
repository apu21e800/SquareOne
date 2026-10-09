"use client"

import { paletteById } from "@/lib/palettes"
import { usePalette } from "@/lib/use-palette"

/**
 * The colour card's edge (28 Sept 2026): StreetBond colours from the chart,
 * side by side, as the thin strip along the bottom of the menu and the top
 * of the footer. Values are the chart's own (lib/palette.ts); names show on
 * hover. Decorative: screen readers skip it.
 *
 * 2 Oct 2026 (Vern, on the client's notes: "the pastel grey and brown is a
 * nice touch, lean more towards the grey tones"): the eight re-picked from
 * the chart's greys and sands, light to dark, two warm browns among them.
 *
 * 7 Oct 2026 (the client, via Vern: "add a bit more colour to it site wide,
 * borrow colours from our actual colour palettes… include some S1 orange,
 * be tasteful"): ten, still led by the greys, warming through the chart's
 * sands into Square One's own orange, then cooling through a blue to the
 * dark end.
 *
 * 7 Oct 2026, later (Vern: "make the colours a bit more punchy, they don't
 * really show up, including under the hero image"): the greys and sands
 * came out. The ten are the chart's strongest colours, the ones the crews
 * actually put down on streets, set out the way a colour card reads, warm
 * to cool: Marigold, Nutmeg, Square One orange, Paprika and Terra Cotta,
 * then the three cycle-lane greens, Safety Blue and Patriot Blue. Light and
 * dark alternate down the run, so the band holds on a dark photograph and
 * on white alike. Every chip but the orange is a named StreetBond colour.
 */
/*
 * 8 Oct 2026: the colours moved to lib/palettes.ts, which now holds four
 * palettes (Spectrum, the band above, plus Greyscale, Earth and Blueprint)
 * and writes them as CSS variables keyed by html[data-palette]. The chips
 * here draw from --edge-1 … --edge-10, so they follow the palette without
 * waiting for React; only their hover names come from the palette in state.
 */

export default function ColourEdge({ className = "" }: { className?: string }) {
  const palette = paletteById(usePalette())
  return (
    <div
      aria-hidden="true"
      className={`colour-edge ${className}`}
      style={{ gridTemplateColumns: `repeat(${palette.chips.length}, minmax(0, 1fr))` }}
    >
      {palette.chips.map((c, i) => (
        <span key={i} title={c.title} style={{ background: `var(--edge-${i + 1})` }} />
      ))}
    </div>
  )
}
