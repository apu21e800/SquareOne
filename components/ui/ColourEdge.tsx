import { colour } from "@/lib/palette"

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
 * dark end. Every chip but the orange is a named StreetBond colour.
 */
const SQUARE_ONE_ORANGE = { name: "Square One orange", hex: "#C85A3A" }

const EDGE: { name: string; hex: string }[] = [
  colour("Pewter"),
  colour("Driftwood"),
  colour("Sea Foam"),
  colour("Gun Metal"),
  colour("Sandy Beige"),
  colour("Butterscotch"),
  SQUARE_ONE_ORANGE,
  colour("Patriot Blue"),
  colour("Graphite"),
  colour("Slate"),
]

/** The band as hard-stopped stops, for a CSS gradient. */
function band(list: { hex: string }[]): string {
  return `linear-gradient(to right, ${list
    .map((c, i) => `${c.hex} ${((i * 100) / list.length).toFixed(3)}% ${(((i + 1) * 100) / list.length).toFixed(3)}%`)
    .join(", ")})`
}

/** The same colours as one hard-stopped band (6 Oct 2026), for the places
    the edge is drawn as a rule rather than spans: the reel's clock, the
    page openers' foot, the process steps, the quote form's sections and the
    search's top edge. app/layout.tsx sets it once on <body> as --edge-band,
    with each chip as --edge-1…--edge-10 for the section labels' squares, so
    this list stays the only source of the colours. */
export const EDGE_BAND = band(EDGE)
export const EDGE_COLOURS = EDGE.map((c) => c.hex)

/** Vapour blasting's water (7 Oct 2026, "more complementary blue touches on
    the vapour blasting pages and sections"): pale to deep, through the
    chart's SR Safety Blue and Patriot Blue, for the vapour page's rules. */
const WATER = [
  { hex: "#D3E1EE" },
  { hex: "#A6C4DF" },
  { hex: "#6E9FCC" },
  colour("SR Safety Blue"),
  { hex: "#1F6FB2" },
  { hex: "#17568C" },
  colour("Patriot Blue"),
  { hex: "#2D3033" },
]
export const WATER_BAND = band(WATER)

export default function ColourEdge({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`colour-edge ${className}`}
      style={{ gridTemplateColumns: `repeat(${EDGE.length}, minmax(0, 1fr))` }}
    >
      {EDGE.map((c) => (
        <span
          key={c.name}
          title={c.name === SQUARE_ONE_ORANGE.name ? c.name : `StreetBond ${c.name}`}
          style={{ background: c.hex }}
        />
      ))}
    </div>
  )
}
