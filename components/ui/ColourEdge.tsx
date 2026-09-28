import { colour } from "@/lib/palette"

/**
 * The colour card's edge (28 Sept 2026): eight StreetBond colours from the
 * home page's materials band, side by side, as the thin strip along the
 * bottom of the menu and the top of the footer. Values are the chart's own
 * (lib/palette.ts); names show on hover. Decorative: screen readers skip it.
 */
const EDGE = [
  "Brick",
  "Terra Cotta",
  "Sandy Beige",
  "Driftwood",
  "Pewter",
  "Slate",
  "Bike Path Green",
  "Patriot Blue",
].map(colour)

export default function ColourEdge({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`colour-edge ${className}`}>
      {EDGE.map((c) => (
        <span key={c.name} title={`StreetBond ${c.name}`} style={{ background: c.hex }} />
      ))}
    </div>
  )
}
