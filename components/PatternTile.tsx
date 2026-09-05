import type { PatternId } from "@/lib/palette"

/**
 * StreetPrint template line art — drawn, not photographed. One 120×90
 * drawing per template family, hairline strokes in the current text colour,
 * so a tile reads as a plan drawing at rest and darkens on hover. Each
 * drawing is built from HUB's template geometry (brick 2:1, cobble rows,
 * ashlar courses, fans, scallops) and clipped to the tile.
 */

const W = 120
const H = 90

function rect(x: number, y: number, w: number, h: number, rx = 0) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}"${rx ? ` rx="${rx}"` : ""}/>`
}

function offsetBrick(): string {
  const out: string[] = []
  const bh = 15
  const bw = 30
  for (let r = -1; r < H / bh + 1; r++) {
    const shift = r % 2 === 0 ? 0 : bw / 2
    for (let c = -1; c < W / bw + 1; c++) out.push(rect(c * bw + shift, r * bh, bw, bh))
  }
  return out.join("")
}

/** 2:1 herringbone on the lattice t1 = (10,10), t2 = (−20,20). */
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

function ashlarSlate(): string {
  // Four courses of unequal height; the joints never line up.
  const courses: { y: number; h: number; widths: number[]; start: number }[] = [
    { y: -4, h: 22, widths: [34, 22, 40, 26, 34], start: -12 },
    { y: 18, h: 16, widths: [24, 40, 20, 36, 30], start: -6 },
    { y: 34, h: 26, widths: [42, 26, 34, 22, 40], start: -20 },
    { y: 60, h: 18, widths: [28, 36, 22, 40, 26], start: -10 },
    { y: 78, h: 20, widths: [36, 24, 42, 30, 20], start: -16 },
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

function britishCobble(): string {
  const out: string[] = []
  const cw = 15
  const ch = 11
  for (let r = -1; r < H / ch + 1; r++) {
    const shift = r % 2 === 0 ? 0 : cw / 2
    for (let c = -1; c < W / cw + 1; c++) {
      const wobble = ((r * 7 + c * 3) % 3) - 1
      out.push(rect(c * cw + shift + 1, r * ch + 1, cw - 2 + wobble, ch - 2, 3))
    }
  }
  return out.join("")
}

function randomStone(): string {
  // Irregular flags, hand-set: a fixed layout that reads as random.
  const flags: number[][][] = [
    [[-6, -4], [30, -6], [36, 18], [22, 30], [-4, 26]],
    [[32, -6], [70, -4], [66, 20], [40, 22]],
    [[72, -6], [126, -4], [122, 16], [96, 26], [70, 22]],
    [[-6, 30], [20, 34], [26, 56], [4, 62], [-8, 52]],
    [[24, 26], [42, 24], [62, 40], [56, 60], [30, 58]],
    [[44, 24], [68, 22], [98, 30], [92, 50], [64, 44]],
    [[100, 30], [126, 20], [128, 56], [104, 58], [96, 52]],
    [[-8, 56], [22, 60], [30, 82], [12, 96], [-8, 94]],
    [[26, 62], [56, 64], [66, 84], [40, 96], [24, 90]],
    [[60, 48], [90, 54], [100, 76], [78, 96], [58, 86]],
    [[102, 60], [128, 60], [128, 96], [104, 96], [96, 80]],
  ]
  return flags
    .map((pts) => `<polygon points="${pts.map(([x, y]) => `${x},${y}`).join(" ")}"/>`)
    .join("")
}

function eurofan(): string {
  const out: string[] = []
  const R = 26
  const rows = [96, 70, 44, 18, -8]
  rows.forEach((cy, i) => {
    const shift = i % 2 === 0 ? 0 : R
    for (let cx = -R + shift; cx < W + R; cx += 2 * R) {
      for (const r of [8, 17, 26]) {
        out.push(`<path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}"/>`)
      }
      // Two radial joints per fan so the fan reads as set stone
      for (const a of [-60, -120]) {
        const rad = (a * Math.PI) / 180
        out.push(`<line x1="${cx + 8 * Math.cos(rad)}" y1="${cy + 8 * Math.sin(rad)}" x2="${cx + R * Math.cos(rad)}" y2="${cy + R * Math.sin(rad)}"/>`)
      }
    }
  })
  return out.join("")
}

function scallop(): string {
  const out: string[] = []
  const r = 14
  const rowH = 12
  for (let row = -1; row < H / rowH + 2; row++) {
    const cy = row * rowH
    const shift = row % 2 === 0 ? 0 : r
    for (let cx = -r + shift; cx < W + r; cx += 2 * r) {
      out.push(`<path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}"/>`)
    }
  }
  return out.join("")
}

const DRAWINGS: Record<PatternId, () => { body: string; rotate?: number }> = {
  "offset-brick": () => ({ body: offsetBrick() }),
  herringbone: () => ({ body: herringbone() }),
  "diagonal-herringbone": () => ({ body: herringbone(), rotate: 45 }),
  "ashlar-slate": () => ({ body: ashlarSlate() }),
  "british-cobble": () => ({ body: britishCobble() }),
  stone: () => ({ body: randomStone() }),
  eurofan: () => ({ body: eurofan() }),
  scallop: () => ({ body: scallop() }),
}

export default function PatternTile({ id, className = "" }: { id: PatternId; className?: string }) {
  const { body, rotate } = DRAWINGS[id]()
  const clip = `pt-${id}`
  const inner = rotate ? `<g transform="rotate(${rotate} ${W / 2} ${H / 2})">${body}</g>` : body
  // The drawing scales with the tile, so the stroke is set thin in viewBox
  // units: about 1px at phone tile widths, 1.5px on a 27" monitor.
  const svg = `<clipPath id="${clip}"><rect width="${W}" height="${H}"/></clipPath><g clip-path="url(#${clip})" fill="none" stroke="currentColor" stroke-width="0.6" stroke-linejoin="round">${inner}</g>`
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
