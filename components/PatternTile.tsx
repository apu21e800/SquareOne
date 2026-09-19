import type { PatternId } from "@/lib/palette"
import { PATTERN_ART } from "@/lib/pattern-art"

/**
 * A StreetPrint template, drawn at HUB's own geometry.
 *
 * This file used to carry nine hand-built drawing functions. It no longer
 * draws anything: the geometry lives in lib/pattern-art.ts, lifted from the
 * manufacturer's template shop drawings, and this is the renderer. See that
 * file for where each one came from and what was done to it.
 *
 * Colour is inherited, never set here, so the same component serves the
 * white template chip (ink on paper, app/refine.css .pattern-tile) and the
 * sample board in components/DrivewayComposer, where the drawing sits on a
 * real StreetBond colour and takes a light-and-dark joint pair.
 */
export default function PatternTile({ id, className = "" }: { id: PatternId; className?: string }) {
  const art = PATTERN_ART[id]
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${art.w} ${art.h}`}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth={art.sw}
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
    >
      <path d={art.d} />
    </svg>
  )
}
