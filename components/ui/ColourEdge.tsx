import { colour } from "@/lib/palette"

/**
 * The colour card's edge (28 Sept 2026): eight StreetBond colours from the
 * home page's materials band, side by side, as the thin strip along the
 * bottom of the menu and the top of the footer. Values are the chart's own
 * (lib/palette.ts); names show on hover. Decorative: screen readers skip it.
 *
 * 2 Oct 2026 (Vern, on the client's notes: "the pastel grey and brown is a
 * nice touch, lean more towards the grey tones"): the eight re-picked from
 * the chart's greys and sands, light to dark, two warm browns among them.
 */
const EDGE = [
  "Pewter",
  "Driftwood",
  "Gun Metal",
  "Sandy Beige",
  "San Diego Buff",
  "Graphite",
  "Patriot Blue",
  "Slate",
].map(colour)

/** The same eight as one hard-stopped band (6 Oct 2026), for the places the
    edge is drawn as a rule rather than eight spans: the reel's clock at the
    foot of the home hero, the lines over the process steps and the quote
    form's two sections. app/layout.tsx sets it once on <body> as
    --edge-band, so this list stays the only source of the colours. */
export const EDGE_BAND = `linear-gradient(to right, ${EDGE.map(
  (c, i) => `${c.hex} ${((i * 100) / EDGE.length).toFixed(3)}% ${(((i + 1) * 100) / EDGE.length).toFixed(3)}%`,
).join(", ")})`

export default function ColourEdge({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`colour-edge ${className}`}>
      {EDGE.map((c) => (
        <span key={c.name} title={`StreetBond ${c.name}`} style={{ background: c.hex }} />
      ))}
    </div>
  )
}
