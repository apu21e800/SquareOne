/**
 * Tests for the colour card's palettes and the Photo palette (21 Oct 2026):
 * `npm run test:colours`.
 *
 * What must hold, whatever the photograph: ten colours or none; Square One
 * orange at chip 3; every chip holding on white as the live palettes' do;
 * no two neighbours alike; the same photograph, the same colours. And the
 * default look doesn't move: Spectrum is exactly the band that went live on
 * 7 Oct, and the other palettes are as they were. No network, no DOM.
 */
import assert from "node:assert/strict"
import { EDGE_BAND, PALETTES, PALETTE_BOOT, PALETTE_CSS, PALETTE_IDS, edgeVars, paletteById } from "../lib/palettes"
import { BRAND_ORANGE, MIN_ON_WHITE, contrast, hexToLab, labToHex, photoChips, rgbToOklab } from "../lib/photo-colours"

let failures = 0
async function check(name: string, fn: () => void | Promise<void>) {
  try {
    await fn()
    console.log(`  ok    ${name}`)
  } catch (err) {
    failures++
    console.log(`  FAIL  ${name}\n        ${err instanceof Error ? err.message : err}`)
  }
}

/** An image as a canvas gives it: blocks of colour, each `n` pixels. */
function image(blocks: [number, number, number, number?][], n = 200): Uint8ClampedArray {
  const px = new Uint8ClampedArray(blocks.length * n * 4)
  blocks.forEach(([r, g, b, a = 255], j) => {
    for (let i = 0; i < n; i++) px.set([r, g, b, a], (j * n + i) * 4)
  })
  return px
}

/** A seeded random number generator, so a failing case can be replayed. */
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const HEX = /^#[0-9A-F]{6}$/
const dist = (x: string, y: string) => {
  const [p, q] = [hexToLab(x), hexToLab(y)]
  return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2])
}

/** Every rule a palette from a photograph keeps. */
function holds(chips: string[] | null, what: string) {
  assert.ok(chips, `${what}: ten colours`)
  assert.equal(chips.length, 10, what)
  for (const c of chips) assert.match(c, HEX, what)
  assert.equal(chips[2], BRAND_ORANGE, `${what}: chip 3 is Square One orange`)
  for (const [chip, min] of Object.entries(MIN_ON_WHITE)) {
    const hex = chips[Number(chip) - 1]
    assert.ok(contrast(hex, "#FFFFFF") >= min, `${what}: chip ${chip} ${hex} is ${contrast(hex, "#FFFFFF").toFixed(2)}:1 on white, under ${min}`)
  }
  for (let i = 1; i < 10; i++) assert.ok(dist(chips[i - 1], chips[i]) >= 0.045, `${what}: chips ${i} and ${i + 1} (${chips[i - 1]}, ${chips[i]}) look alike`)
}

const hue = (hex: string) => {
  const [, a, b] = hexToLab(hex)
  return ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360
}
const chromaOf = (hex: string) => Math.hypot(hexToLab(hex)[1], hexToLab(hex)[2])

async function main() {
  console.log("the palettes as they were")

  await check("Spectrum is the band that went live on 7 Oct, and the default", () => {
    assert.equal(PALETTE_IDS[0], "spectrum")
    assert.equal(
      EDGE_BAND,
      "linear-gradient(to right, #F0AA0D 0.000% 10.000%, #D77840 10.000% 20.000%, #C85A3A 20.000% 30.000%, #A9452E 30.000% 40.000%, #893F1D 40.000% 50.000%, #0D794F 50.000% 60.000%, #2E9C3A 60.000% 70.000%, #78C83A 70.000% 80.000%, #2672D4 80.000% 90.000%, #444B5B 90.000% 100.000%)",
    )
    assert.ok(PALETTE_CSS.startsWith(`:root{--edge-band:${EDGE_BAND};`), "the default's variables come first, on :root")
  })

  await check("the four from 8 Oct are where they were, with Photo fifth in the switch", () => {
    assert.deepEqual(PALETTE_IDS, ["spectrum", "grey", "earth", "blueprint", "photo"])
    assert.ok(PALETTE_BOOT.includes('"photo"'), "a ?palette=photo link and a remembered Photo are honoured")
    for (const p of PALETTES) assert.equal(p.chips.length, 10, p.id)
    for (const p of PALETTES) assert.equal(p.chips[2].hex, BRAND_ORANGE, `${p.id}: chip 3 is Square One orange`)
  })

  await check("Photo's own ten, shown until a page's photograph is read, keep every rule", () => {
    holds(
      paletteById("photo").chips.map((c) => c.hex),
      "Photo's ten",
    )
    assert.ok(PALETTE_CSS.includes(':root[data-palette="photo"]{'), "in the stylesheet like the others")
  })

  await check("the variables a photograph sets are the ones the stylesheet sets", () => {
    const chips = paletteById("earth").chips.map((c) => c.hex)
    const vars = edgeVars(chips)
    assert.deepEqual(Object.keys(vars), ["--edge-band", ...chips.map((_, i) => `--edge-${i + 1}`)])
    const css = PALETTE_CSS.split("\n").find((l) => l.startsWith(':root[data-palette="earth"]'))!
    for (const [name, value] of Object.entries(vars)) assert.ok(css.includes(`${name}:${value}`), name)
  })

  console.log("colours from a photograph")

  await check("a colourful photograph: its own reds, yellows, blues and greens, by the rules", () => {
    const chips = photoChips(
      image([
        [214, 48, 49],
        [240, 200, 40],
        [40, 110, 200],
        [60, 160, 70],
        [120, 120, 120],
        [235, 235, 230],
        [200, 120, 170],
      ]),
    )
    holds(chips, "colourful")
    const hues = chips!.filter((c) => chromaOf(c) > 0.06 && c !== BRAND_ORANGE).map(hue)
    for (const [name, lo, hi] of [
      ["red", 0, 40],
      ["yellow", 75, 115],
      ["green", 120, 160],
      ["blue", 230, 275],
    ] as const)
      assert.ok(
        hues.some((h) => h >= lo && h <= hi),
        `a ${name} among ${chips!.join(" ")}`,
      )
  })

  await check("a photograph of one colour still gives ten, in its colour", () => {
    const chips = photoChips(image([[46, 110, 190]], 900))
    holds(chips, "one blue")
    const blues = chips!.filter((c) => c !== BRAND_ORANGE && chromaOf(c) > 0.04 && hue(c) > 220 && hue(c) < 290)
    assert.ok(blues.length >= 6, chips!.join(" "))
  })

  await check("grey asphalt gives greys that still show, on white and in the band", () => {
    holds(
      photoChips(
        image([
          [90, 92, 95],
          [128, 128, 126],
          [170, 168, 165],
        ]),
      ),
      "greys",
    )
  })

  await check("nothing to read: no colours, so the page keeps its own", () => {
    assert.equal(photoChips(image([[0, 0, 0]])), null, "black")
    assert.equal(photoChips(image([[255, 255, 255]])), null, "blown-out white")
    assert.equal(photoChips(image([[200, 40, 40, 0]])), null, "transparent")
    assert.equal(photoChips(new Uint8ClampedArray(0)), null, "empty")
  })

  await check("the same photograph, the same colours", () => {
    const px = image([
      [214, 48, 49],
      [40, 110, 200],
      [235, 235, 230],
      [60, 160, 70],
    ])
    assert.deepEqual(photoChips(px), photoChips(px))
  })

  await check("whatever the photograph: 400 random ones, every rule holds", () => {
    const rnd = random(21102026)
    for (let k = 0; k < 400; k++) {
      const blocks: [number, number, number][] = Array.from({ length: 1 + Math.floor(rnd() * 12) }, () => [Math.floor(rnd() * 256), Math.floor(rnd() * 256), Math.floor(rnd() * 256)])
      const chips = photoChips(image(blocks, 20 + Math.floor(rnd() * 120)))
      if (chips === null) {
        // Only when every pixel is near-black or blown-out white.
        assert.ok(blocks.every(([r, g, b]) => rgbToOklab(r, g, b)[0] < 0.16 || rgbToOklab(r, g, b)[0] > 0.97), JSON.stringify(blocks))
        continue
      }
      holds(chips, `random photograph ${k}: ${JSON.stringify(blocks)}`)
    }
  })

  await check("colour arithmetic: hex in, hex out; contrast as WCAG measures it", () => {
    for (const hex of ["#C85A3A", "#2672D4", "#F0AA0D", "#444B5B", "#FFFFFF", "#000000"]) assert.equal(labToHex(hexToLab(hex)), hex)
    assert.equal(contrast("#FFFFFF", "#000000").toFixed(1), "21.0")
    assert.equal(contrast("#C85A3A", "#FFFFFF").toFixed(2), "4.22")
  })

  console.log(failures ? `\n${failures} failed` : "\nall passed")
  process.exit(failures ? 1 : 0)
}

main()
