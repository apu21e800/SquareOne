/**
 * The focal point the office drags in the Studio (the hotspot), as CSS
 * object-position on the photograph the site serves (14 Oct 2026).
 *
 * Sanity measures both the crop and the hotspot against the whole photograph
 * as uploaded, but the site is served the cropped photograph (the image URL
 * carries the crop). So the point is moved into the crop's own frame first:
 * a hotspot at 60% across a photograph cropped to its middle half sits at 70%
 * of what is served. Without that, every cropped photograph framed itself on
 * the wrong spot (hubss.com's tiles still do).
 *
 * object-position puts that point of the photograph at the same point of the
 * frame, so whatever shape a frame takes (a 5:3 gallery tile, a square, a
 * full-width opener on a phone) the focal point stays in view.
 *
 * Nothing is returned for a photograph nobody has framed: the page keeps its
 * own framing.
 */

export interface SanityCrop {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export interface SanityHotspot {
  x?: number
  y?: number
  width?: number
  height?: number
}

const num = (v: unknown): number => (typeof v === "number" && Number.isFinite(v) ? v : 0)
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const pct = (v: number) => `${Math.round(clamp01(v) * 100)}%`

/** The hotspot, moved into the cropped photograph's frame, as "x% y%". */
export function focalPosition(hotspot: SanityHotspot | null | undefined, crop?: SanityCrop | null): string | undefined {
  if (!hotspot || typeof hotspot.x !== "number" || typeof hotspot.y !== "number" || !Number.isFinite(hotspot.x) || !Number.isFinite(hotspot.y)) return undefined
  const left = num(crop?.left)
  const right = num(crop?.right)
  const top = num(crop?.top)
  const bottom = num(crop?.bottom)
  const w = 1 - left - right
  const h = 1 - top - bottom
  const x = w > 0 ? (hotspot.x - left) / w : 0.5
  const y = h > 0 ? (hotspot.y - top) / h : 0.5
  return `${pct(x)} ${pct(y)}`
}

/** True when the office has cropped the photograph in the Studio. */
export function isCropped(crop?: SanityCrop | null): boolean {
  return Boolean(crop && (num(crop.top) || num(crop.bottom) || num(crop.left) || num(crop.right)))
}

/** The served (cropped) photograph's size, from the uploaded size and the crop. */
export function croppedSize(width: number, height: number, crop?: SanityCrop | null): { width: number; height: number } {
  const w = Math.max(1, Math.round(width * (1 - num(crop?.left) - num(crop?.right))))
  const h = Math.max(1, Math.round(height * (1 - num(crop?.top) - num(crop?.bottom))))
  return { width: w, height: h }
}
