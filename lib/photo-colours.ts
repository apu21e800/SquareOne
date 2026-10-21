/**
 * Colours from the photograph (Vern, 21 Oct 2026: "try to make the colour
 * palette match the colors of the images, might be a neat idea. like the
 * color gradients, it needs to work without breaking tho").
 *
 * The fifth style in the home hero's colour switch, Photo (lib/palettes.ts):
 * the colour card's ten chips come from the photograph a page opens on (on
 * the home page, the photograph on screen), so the band under it, the
 * section squares and the footer's edge match it. Pure functions, no DOM:
 * components/PhotoColours.tsx reads the pixels, this picks the colours.
 *
 * How: the photograph's pixels are grouped into a dozen colours (k-means in
 * OKLab, so "close" means close to the eye), and the nine that are both
 * present and colourful are kept, as a colour card would pick them: plenty
 * of a colour counts, but a strong one counts for more than another grey.
 * They are laid out the way every palette is (lib/palettes.ts): the two
 * lightest at chips 5 and 8, the darkest at 10, the rest warm to cool.
 *
 * What keeps it from breaking, whatever the photograph:
 *  - always ten colours, or null for no photograph (the page keeps the
 *    colours it has);
 *  - chip 3 is Square One orange, as in every palette;
 *  - the chips the section labels take hold on white at least as the live
 *    palettes' do, darkened in OKLCH until they do, hue kept: 2.6:1 for
 *    chips 2, 4, 6, 7 and 9, 2:1 for chip 1 (the eighth label, as
 *    Spectrum's Marigold), 7:1 for chip 10, the band's dark anchor;
 *  - chips 5 and 8, the band's own, never paler than 1.7:1 on white, so no
 *    chip vanishes (7 Oct 2026: greys and sands "vanished on photographs
 *    and on white");
 *  - neighbours in the band always differ, so it reads as ten.
 */

export type Lab = [number, number, number]

/** Square One orange: chip 3 in every palette (lib/palettes.ts). */
export const BRAND_ORANGE = "#C85A3A"
const WHITE = "#FFFFFF"

/** The least contrast on white each chip keeps (chip 3 is the orange, 4.2:1). */
export const MIN_ON_WHITE: Record<number, number> = { 1: 2, 2: 2.6, 4: 2.6, 5: 1.7, 6: 2.6, 7: 2.6, 8: 1.7, 9: 2.6, 10: 7 }

const toLinear = (c: number) => {
  const v = c / 255
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}
const toGamma = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055)

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export function rgbToOklab(r: number, g: number, b: number): Lab {
  const lr = toLinear(r)
  const lg = toLinear(g)
  const lb = toLinear(b)
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]
}

function oklabToLinear([L, a, b]: Lab): [number, number, number] {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s]
}

const inGamut = (rgb: number[]) => rgb.every((v) => v >= -1e-6 && v <= 1 + 1e-6)

/** A colour as hex, its chroma reduced (hue and lightness kept) until sRGB can show it. */
export function labToHex(lab: Lab): string {
  const [L0, a, b] = lab
  const L = Math.min(1, Math.max(0, L0))
  const C = Math.hypot(a, b)
  const h = Math.atan2(b, a)
  const at = (c: number): [number, number, number] => oklabToLinear([L, c * Math.cos(h), c * Math.sin(h)])
  let fit = C
  if (!inGamut(at(C))) {
    let lo = 0
    let hi = C
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2
      if (inGamut(at(mid))) lo = mid
      else hi = mid
    }
    fit = lo
  }
  return `#${at(fit)
    .map((v) => Math.round(Math.min(1, Math.max(0, toGamma(Math.min(1, Math.max(0, v))))) * 255).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`
}

export function hexToLab(hex: string): Lab {
  const [r, g, b] = hexToRgb(hex)
  return rgbToOklab(r, g, b)
}

/** WCAG relative luminance. */
export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(toLinear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG contrast ratio, 1 to 21. */
export function contrast(x: string, y: string): number {
  const [hi, lo] = [luminance(x), luminance(y)].sort((p, q) => q - p)
  return (hi + 0.05) / (lo + 0.05)
}

const dist = (p: Lab, q: Lab) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2])
const chroma = (p: Lab) => Math.hypot(p[1], p[2])

/** k-means in OKLab, seeded deterministically (farthest point first), so one photograph always gives one palette. */
function clusters(points: Lab[], k: number, rounds = 10): { lab: Lab; share: number }[] {
  const n = points.length
  const mean: Lab = [0, 0, 0]
  for (const p of points) for (let j = 0; j < 3; j++) mean[j] += p[j] / n
  const centres: Lab[] = []
  let seed = points[0]
  let best = -1
  for (const p of points) {
    const d = dist(p, mean)
    if (d > best) {
      best = d
      seed = p
    }
  }
  centres.push([...seed])
  const nearest = points.map((p) => dist(p, seed))
  while (centres.length < k) {
    let at = -1
    let far = 0
    for (let i = 0; i < n; i++)
      if (nearest[i] > far) {
        far = nearest[i]
        at = i
      }
    if (at < 0 || far < 1e-4) break
    centres.push([...points[at]])
    for (let i = 0; i < n; i++) nearest[i] = Math.min(nearest[i], dist(points[i], points[at]))
  }
  const owner = new Array<number>(n).fill(0)
  for (let round = 0; round < rounds; round++) {
    for (let i = 0; i < n; i++) {
      let bestJ = 0
      let bestD = Infinity
      for (let j = 0; j < centres.length; j++) {
        const d = dist(points[i], centres[j])
        if (d < bestD) {
          bestD = d
          bestJ = j
        }
      }
      owner[i] = bestJ
    }
    const sums = centres.map(() => [0, 0, 0, 0])
    for (let i = 0; i < n; i++) {
      const s = sums[owner[i]]
      s[0] += points[i][0]
      s[1] += points[i][1]
      s[2] += points[i][2]
      s[3]++
    }
    sums.forEach((s, j) => {
      if (s[3]) centres[j] = [s[0] / s[3], s[1] / s[3], s[2] / s[3]]
    })
  }
  const counts = centres.map(() => 0)
  for (const o of owner) counts[o]++
  return centres.map((lab, j) => ({ lab, share: counts[j] / n })).filter((c) => c.share > 0)
}

/** Warm to cool, as a colour card reads: yellows, oranges, reds; then greys; then greens, blues, violets. */
function warmth(p: Lab): number {
  if (chroma(p) < 0.035) return 150
  const h = ((Math.atan2(p[2], p[1]) * 180) / Math.PI + 360) % 360
  return h < 110 || h >= 330 ? (110 - h + 360) % 360 : 200 + (h - 110)
}

/** Lightness moved, hue and chroma kept, until `ok` holds (or the end of the range). */
function nudge(lab: Lab, ok: (hex: string) => boolean, step: number): string {
  let L = lab[0]
  let hex = labToHex([L, lab[1], lab[2]])
  for (let i = 0; i < 120 && !ok(hex); i++) {
    L = Math.min(0.99, Math.max(0.05, L + step))
    hex = labToHex([L, lab[1], lab[2]])
  }
  return hex
}

/** The pixels a photograph's colours are read from: opaque, and neither blown-out white nor black shadow. */
function readable(rgba: ArrayLike<number>): Lab[] {
  const out: Lab[] = []
  for (let i = 0; i + 3 < rgba.length; i += 4) {
    if (rgba[i + 3] < 200) continue
    const lab = rgbToOklab(rgba[i], rgba[i + 1], rgba[i + 2])
    if (lab[0] < 0.16 || lab[0] > 0.97 || !Number.isFinite(lab[0])) continue
    out.push(lab)
  }
  return out
}

/**
 * The colour card's ten chips for a photograph, from its pixels (RGBA, as a
 * canvas gives them; a few thousand is plenty). Null when there is nothing
 * to read.
 */
export function photoChips(rgba: ArrayLike<number>): string[] | null {
  const points = readable(rgba)
  if (points.length < 16) return null
  const orange = hexToLab(BRAND_ORANGE)
  const found = clusters(points, 12)
    // Plenty of a colour counts, a strong colour counts for more, and shadow
    // (trees, the underside of things) hardly at all: it reads as black.
    .map((c) => ({ ...c, score: Math.sqrt(c.share) * (0.03 + chroma(c.lab)) * Math.min(1, Math.max(0.15, (c.lab[0] - 0.25) / 0.25)) }))
    .sort((p, q) => q.score - p.score)

  // Nine distinct colours: the photograph's own first; if it has fewer, lighter,
  // darker and softer takes on its own (a photograph of one colour still gives
  // ten, all of them its colour).
  const picked: Lab[] = []
  const fits = (lab: Lab, apart: number) => dist(lab, orange) >= 0.06 && picked.every((p) => dist(p, lab) >= apart)
  for (const c of found) if (picked.length < 9 && fits(c.lab, 0.08)) picked.push(c.lab)
  const own = [...picked]
  const takes: [number, number][] = [
    [0.16, 1],
    [-0.16, 1],
    [0.28, 1],
    [-0.28, 1],
    [0.08, 0.5],
    [-0.08, 0.5],
    [0.22, 0.6],
    [-0.22, 0.6],
    [0, 0.4],
  ]
  for (let apart = 0.08; picked.length < 9 && apart > 0.005; apart *= 0.7) {
    for (const base of own) {
      for (const [dL, soft] of takes) {
        if (picked.length >= 9) break
        const lab: Lab = [Math.min(0.9, Math.max(0.3, base[0] + dL)), base[1] * soft, base[2] * soft]
        if (fits(lab, apart)) picked.push(lab)
      }
    }
  }
  while (picked.length < 9) picked.push([0.3 + 0.07 * picked.length, 0, 0])

  // Laid out as every palette is: the two lightest at 5 and 8, the darkest at
  // 10, the other six warm to cool at 1, 2, 4, 6, 7 and 9; the orange at 3.
  const byLight = [...picked].sort((p, q) => q[0] - p[0])
  const light = byLight.slice(0, 2)
  const dark = byLight[byLight.length - 1]
  const rest = byLight.slice(2, -1).sort((p, q) => warmth(p) - warmth(q))
  const labs: (Lab | null)[] = [rest[0], rest[1], null, rest[2], light[0], rest[3], rest[4], light[1], rest[5], dark]

  const holds = (chip: number) => (hex: string) => contrast(hex, WHITE) >= MIN_ON_WHITE[chip]
  const chips = labs.map((lab, i) => (lab ? nudge(lab, holds(i + 1), -0.01) : BRAND_ORANGE))

  // Neighbours must differ, or the band reads as fewer than ten: the later
  // one lightens while it still holds on white, else darkens (which only
  // ever adds contrast).
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 1; i < chips.length; i++) {
      const chip = i + 1
      if (chip === 3) continue
      // Chip 2 sits before the orange, which never moves: it keeps clear of both.
      const others = chip === 2 ? [chips[0], chips[2]] : [chips[i - 1]]
      const apart = (hex: string) => others.every((o) => dist(hexToLab(o), hexToLab(hex)) >= 0.05)
      if (apart(chips[i])) continue
      const lab = hexToLab(chips[i])
      const lighter = nudge(lab, (hex) => apart(hex) || !holds(chip)(hex), 0.01)
      chips[i] = apart(lighter) && holds(chip)(lighter) ? lighter : nudge(lab, (hex) => apart(hex) && holds(chip)(hex), -0.01)
    }
  }
  return chips
}
