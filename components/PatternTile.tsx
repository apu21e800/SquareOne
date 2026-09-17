import type { PatternId } from "@/lib/palette"

/**
 * StreetPrint template line art — drawn, not photographed.
 *
 * Every drawing here is traced from Square One's own "Stamped Asphalt
 * Patterns" sheet (public/docs/StreetPrint/SquareOne-StreetPrint-Patterns.pdf),
 * which prints the nine templates Square One actually installs at their
 * real module geometry. Redrawn 16 Sept 2026 — the previous set was built
 * from HUB's general catalogue and carried four patterns Square One does
 * not offer, and the client asked for the six on their own sheet by name.
 *
 * If a drawing is ever changed, open that PDF and check the module first:
 * a template chip that does not match the casting is a promise the crew
 * has to keep on site.
 *
 * Drawn as hairline strokes in currentColor at HUB's own weight (0.55
 * viewBox units). Inverted 17 Sept 2026 at Vern's call — "use the same
 * patterns we have on the hubss site but make the patterns colour
 * inverted, dark pattern on white background." HUB runs #e8edf4 hairlines
 * on their dark site; these are the same drawings in ink on paper, which
 * is Square One's ground. The colour lives in .pattern-tile, not here, so
 * the same SVG serves the white template chip and the big sample board in
 * components/DrivewayComposer, where the drawing sits on a real StreetBond
 * colour and keeps its light-and-dark joint pair.
 */

export const W = 120
export const H = 90

function rect(x: number, y: number, w: number, h: number, rx = 0) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}"${rx ? ` rx="${rx}"` : ""}/>`
}

/* ---------------------------------------------------------------- fields */

/** Running bond, brick module roughly 3:1 with a generous joint. */
function offsetBrick(): string {
  const out: string[] = []
  const bh = 13
  const bw = 34
  for (let r = -1; r < H / bh + 1; r++) {
    const shift = r % 2 === 0 ? 0 : bw / 2
    for (let c = -1; c < W / bw + 1; c++) out.push(rect(c * bw + shift, r * bh, bw, bh))
  }
  return out.join("")
}

/** 2:1 herringbone on the lattice t1 = (10,10), t2 = (-20,20). */
function herringbone(): string {
  const out: string[] = []
  for (let i = -8; i <= 14; i++) {
    for (let j = -5; j <= 7; j++) {
      const x = 10 * i - 20 * j
      const y = 10 * i + 20 * j
      out.push(rect(x, y, 20, 10))
      out.push(rect(x + 20, y - 10, 10, 20))
    }
  }
  return out.join("")
}

/**
 * Ashlar slate — courses of unequal height, blocks of unequal width, and
 * the head joints never lining up between courses. The sheet mixes small
 * squares into the larger blocks, so a few courses are split in two.
 */
function ashlarSlate(): string {
  const courses: { y: number; h: number; widths: number[]; start: number }[] = [
    { y: -5, h: 13, widths: [26, 14, 32, 18, 24, 14], start: -9 },
    { y: 8, h: 19, widths: [18, 34, 14, 26, 20, 30], start: -14 },
    { y: 27, h: 11, widths: [30, 16, 22, 34, 14, 24], start: -6 },
    { y: 38, h: 22, widths: [22, 30, 16, 20, 34, 18], start: -18 },
    { y: 60, h: 12, widths: [16, 26, 32, 14, 28, 20], start: -11 },
    { y: 72, h: 18, widths: [34, 18, 24, 30, 14, 26], start: -4 },
  ]
  const out: string[] = []
  for (const c of courses) {
    let x = c.start
    for (let k = 0; x < W; k++) {
      const w = c.widths[k % c.widths.length]
      out.push(rect(x, c.y, w, c.h))
      x += w
    }
  }
  return out.join("")
}

/**
 * Random stone — the sheet's crazy paving: irregular rounded cobbles that
 * tessellate with no gaps. Built on a jittered corner lattice so adjoining
 * cells share their corners exactly, then each edge is bowed through a
 * displaced midpoint so nothing reads as a straight cut. Deterministic:
 * the same hash every render, so the drawing never shifts between builds.
 */
function randomStone(): string {
  const cols = 5
  const rows = 4
  const cw = (W + 24) / cols
  const ch = (H + 20) / rows
  const hash = (i: number, j: number, k: number) => {
    const n = Math.sin(i * 127.1 + j * 311.7 + k * 74.7) * 43758.5453
    return n - Math.floor(n) - 0.5 // -0.5..0.5
  }
  // Shared corner lattice — jittered once, reused by all four neighbours.
  const P = (i: number, j: number): [number, number] => [
    -12 + i * cw + hash(i, j, 1) * cw * 0.42,
    -10 + j * ch + hash(i, j, 2) * ch * 0.42,
  ]
  // Shared edge midpoint, bowed off the chord — also reused by both cells.
  const M = (a: [number, number], b: [number, number], i: number, j: number, k: number): [number, number] => {
    const mx = (a[0] + b[0]) / 2
    const my = (a[1] + b[1]) / 2
    const dx = b[0] - a[0]
    const dy = b[1] - a[1]
    const bow = hash(i, j, k) * 0.36
    return [mx - dy * bow, my + dx * bow]
  }
  const out: string[] = []
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const a = P(i, j)
      const b = P(i + 1, j)
      const c = P(i + 1, j + 1)
      const d = P(i, j + 1)
      const ab = M(a, b, i, j, 3)
      const bc = M(b, c, i + 1, j, 4)
      const cd = M(d, c, i, j + 1, 3)
      const da = M(a, d, i, j, 4)
      out.push(
        `<path d="M ${a[0].toFixed(1)} ${a[1].toFixed(1)}` +
          ` Q ${ab[0].toFixed(1)} ${ab[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}` +
          ` Q ${bc[0].toFixed(1)} ${bc[1].toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}` +
          ` Q ${cd[0].toFixed(1)} ${cd[1].toFixed(1)} ${d[0].toFixed(1)} ${d[1].toFixed(1)}` +
          ` Q ${da[0].toFixed(1)} ${da[1].toFixed(1)} ${a[0].toFixed(1)} ${a[1].toFixed(1)} Z"/>`,
      )
    }
  }
  return out.join("")
}

/** Standard tile — square modules, joints aligned both ways. */
function standardTile(): string {
  const out: string[] = []
  const s = 15
  for (let r = -1; r < H / s + 1; r++) {
    for (let c = -1; c < W / s + 1; c++) out.push(rect(c * s, r * s, s, s))
  }
  return out.join("")
}

/**
 * Offset tile — the same square module run in vertical columns, with every
 * second column dropped half a tile, so the bed joints break across the
 * run instead of gridding up. The sheet shows the columns reading as
 * distinct vertical bands; the half-drop is what produces that.
 */
function offsetTile(): string {
  const out: string[] = []
  const s = 15
  for (let c = -1; c < W / s + 1; c++) {
    const drop = c % 2 === 0 ? 0 : s / 2
    for (let r = -1; r < H / s + 2; r++) out.push(rect(c * s, r * s + drop, s, s))
  }
  return out.join("")
}

/* --------------------------------------------------------------- borders */

/**
 * The three borders are edge courses, not fields. Each is drawn as its band
 * repeated down the tile so the swatch shows the course itself rather than
 * a single lonely strip.
 */

/** Soldier course — bricks stood on end between two thin header rails. */
function soldierCourse(): string {
  const out: string[] = []
  const rail = 4
  const soldier = 15
  const band = rail * 2 + soldier
  const bw = 7
  for (let y = -6; y < H + band; y += band + 5) {
    out.push(rect(-2, y, W + 4, rail))
    out.push(rect(-2, y + rail + soldier, W + 4, rail))
    for (let x = -bw; x < W + bw; x += bw) out.push(rect(x, y + rail, bw, soldier))
  }
  return out.join("")
}

/** Texas cobble — a single run of square setts. */
function texasCobble(): string {
  const out: string[] = []
  const s = 13
  for (let y = -4; y < H + s; y += s + 9) {
    for (let x = -s; x < W + s; x += s) out.push(rect(x, y, s, s))
  }
  return out.join("")
}

/** Stacked brick — a single run of narrow bricks stood on end, no rails. */
function stackedBrick(): string {
  const out: string[] = []
  const bh = 16
  const bw = 6
  for (let y = -4; y < H + bh; y += bh + 8) {
    for (let x = -bw; x < W + bw; x += bw) out.push(rect(x, y, bw, bh))
  }
  return out.join("")
}

export const DRAWINGS: Record<PatternId, () => { body: string; rotate?: number }> = {
  "ashlar-slate": () => ({ body: ashlarSlate() }),
  "random-stone": () => ({ body: randomStone() }),
  "offset-brick": () => ({ body: offsetBrick() }),
  herringbone: () => ({ body: herringbone() }),
  "standard-tile": () => ({ body: standardTile() }),
  "offset-tile": () => ({ body: offsetTile() }),
  "soldier-course": () => ({ body: soldierCourse() }),
  "texas-cobble": () => ({ body: texasCobble() }),
  "stacked-brick": () => ({ body: stackedBrick() }),
}

export default function PatternTile({ id, className = "" }: { id: PatternId; className?: string }) {
  const { body, rotate } = DRAWINGS[id]()
  const clip = `pt-${id}`
  const inner = rotate ? `<g transform="rotate(${rotate} ${W / 2} ${H / 2})">${body}</g>` : body
  // The drawing scales with the tile, so the stroke is set thin in viewBox
  // units — 0.55, the same weight HUB draws its own template line art at,
  // which is about 1px at phone tile widths and 1.4px on a 27" monitor.
  const svg = `<clipPath id="${clip}"><rect width="${W}" height="${H}"/></clipPath><g clip-path="url(#${clip})" fill="none" stroke="currentColor" stroke-width="0.55" stroke-linejoin="round">${inner}</g>`
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
