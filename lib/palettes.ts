import { colour, type Swatch } from "@/lib/palette"

/**
 * The colour card, four ways (8 Oct 2026).
 *
 * Vern, after the client: "The most recent style we have is multi-colored based
 * on S1 color palettes. We should put an easter egg in the hero somewhere, that
 * will let the user cycle through style options: multi-colour (as is),
 * greyscale (maybe with some orange accent), earth tone (see Drawn to scale,
 * matched from a card), one more that an architect might appreciate. Apply
 * changes site wide."
 *
 * The colour card's edge is the site's one decorative colour system: the band
 * under every photo opener, the home reel's clock, the menu's and footer's
 * edge, the rules over the process steps and the quote form's sections, the
 * square that leads every section label, the fact strip and search's group
 * squares, and on vapour blasting the water. Every one of those reads a CSS
 * variable (--edge-band, --edge-1 … --edge-10, --water-band). This file is the
 * only source of those variables: PALETTE_CSS sets them on :root for the
 * default and under :root[data-palette="…"] for the other three, so switching
 * palette is one attribute on <html>, and PALETTE_BOOT sets that attribute
 * before the first paint so a visitor who chose Earth never sees a flash of
 * Spectrum.
 *
 * What a palette never changes: buttons, links, the quote form, focus rings,
 * the logo's copper, the vapour page's own blue accents, and the product
 * colours shown as colours (the StreetBond chart, the Drawn to scale strip,
 * the driveway shortlist). Those are things a visitor clicks or orders; the
 * palette only re-dresses the card's edge.
 *
 * How the ten are arranged, in every palette (CLAUDE.md, 7 Oct: greys and
 * sands "vanished on photographs and on white"):
 *  - chip 3 is the accent: Square One orange, or the redline. It is the chip
 *    the first section label on every page takes, the fact strip's first and
 *    search's application square, so the accent leads wherever it appears;
 *  - chips 5 and 8 are the palette's two lightest. The section labels take
 *    chips 3, 9, 7, 2, 10, 4, 6 and 1 down a page and never 5 or 8, so the
 *    pale chips only ever sit in the band, between darker neighbours;
 *  - chip 10 is the one dark anchor, where Patriot Blue sits in Spectrum, so
 *    the band never shows two dark gaps on a dark photograph or the footer.
 * Light and dark alternate down the run, as the 7 Oct band does.
 */

export type PaletteId = "spectrum" | "grey" | "earth" | "blueprint"

export interface Chip {
  hex: string
  /** What the chip's hover title says: the StreetBond name for a chart
      colour, the plain name for anything else. */
  title: string
}

export interface Palette {
  id: PaletteId
  name: string
  /** One short line, shown under the name when a visitor switches to it. */
  line: string
  /** Exactly ten, in band order. */
  chips: Chip[]
  /** Vapour blasting's water, light to deep. */
  water: string[]
}

const SQUARE_ONE_ORANGE: Chip = { hex: "#C85A3A", title: "Square One orange" }
/** A chip from the published StreetBond chart; colour() throws on a name that is not on it. */
const sb = (name: string): Chip => {
  const s: Swatch = colour(name)
  return { hex: s.hex, title: `StreetBond ${s.name}` }
}
const own = (hex: string, title: string): Chip => ({ hex, title })

export const PALETTES: Palette[] = [
  {
    // Exactly the band that went live on 7 Oct 2026, chip for chip, and
    // exactly its water: the default must not move by a pixel.
    id: "spectrum",
    name: "Spectrum",
    line: "The chart's strongest colours",
    chips: [
      sb("Marigold"),
      sb("Nutmeg"),
      SQUARE_ONE_ORANGE,
      sb("Paprika"),
      sb("Terra Cotta"),
      sb("CL Emerald Green"),
      sb("CL Celtic Green"),
      sb("CL Shamrock Green"),
      sb("SR Safety Blue"),
      sb("Patriot Blue"),
    ],
    water: ["#8FBCE6", "#5A9BDB", colour("SR Safety Blue").hex, "#1F6FB2", "#17568C", colour("Patriot Blue").hex],
  },
  {
    // The chart's greys and stone, with one Square One orange: the client's
    // "lean towards the grey tones" of 2 Oct, with the brand mark kept.
    id: "grey",
    name: "Greyscale",
    line: "The chart's greys, one Square One orange",
    chips: [
      sb("Gun Metal"),
      sb("Graphite"),
      SQUARE_ONE_ORANGE,
      sb("Smokey Mauve"),
      sb("Pewter"),
      sb("Aqua"),
      sb("Cobalt Blue"),
      sb("SR Sandstone"),
      sb("San Diego Buff"),
      sb("Granite"),
    ],
    water: ["#B9C1C8", "#9AA4AE", "#7D8893", "#636D78", colour("Cobalt Blue").hex, "#3A3F46"],
  },
  {
    // The home page's "Drawn to scale, matched from a card" strip (Brick,
    // Terra Cotta, Sandy Beige, Driftwood, Pewter, Slate, Bike Path Green)
    // with Mustard and Avocado from the same chart, and the orange.
    id: "earth",
    name: "Earth",
    line: "Matched from the card",
    chips: [
      sb("Mustard"),
      sb("Brick"),
      SQUARE_ONE_ORANGE,
      sb("Terra Cotta"),
      sb("Driftwood"),
      sb("Sandy Beige"),
      sb("Bike Path Green"),
      sb("Pewter"),
      sb("Avocado"),
      sb("Slate"),
    ],
    water: ["#A9BDB9", colour("Sea Foam").hex, colour("Bike Path Green").hex, "#6E8C8A", "#56707A", colour("Patriot Blue").hex],
  },
  {
    // For the people who draw it: cyanotype blues, light to ink, and one
    // redline, the colour a drawing set is marked up in. Not chart colours,
    // so the titles are the drawing room's own names.
    id: "blueprint",
    name: "Blueprint",
    line: "Cyanotype blues, one redline",
    chips: [
      own("#4F86BD", "Cyanotype"),
      own("#1E5490", "Prussian blue"),
      own("#D7362E", "Redline"),
      own("#3B78B5", "Drafting blue"),
      own("#A7C6E1", "Tracing paper"),
      own("#2F6AA8", "Section blue"),
      own("#5E93C6", "Elevation blue"),
      own("#8DB6DA", "Vellum"),
      own("#245E9E", "Plan blue"),
      own("#0E335D", "Ink blue"),
    ],
    water: ["#A7C6E1", "#8DB6DA", "#5E93C6", "#3B78B5", "#1E5490", "#0E335D"],
  },
]

export const DEFAULT_PALETTE: PaletteId = "spectrum"
export const PALETTE_IDS: PaletteId[] = PALETTES.map((p) => p.id)
/** localStorage key and URL parameter (?palette=earth). */
export const PALETTE_KEY = "s1-palette"
export const PALETTE_PARAM = "palette"

export function paletteById(id: string | null | undefined): Palette {
  return PALETTES.find((p) => p.id === id) ?? PALETTES[0]
}

/** The band as hard-stopped stops, for a CSS gradient. Byte-for-byte the
    7 Oct function, so Spectrum's --edge-band is the string that is live. */
function band(list: string[]): string {
  return `linear-gradient(to right, ${list
    .map((hex, i) => `${hex} ${((i * 100) / list.length).toFixed(3)}% ${(((i + 1) * 100) / list.length).toFixed(3)}%`)
    .join(", ")})`
}

function declarations(p: Palette): string {
  return [
    `--edge-band:${band(p.chips.map((c) => c.hex))}`,
    `--water-band:${band(p.water)}`,
    ...p.chips.map((c, i) => `--edge-${i + 1}:${c.hex}`),
  ].join(";")
}

/** The variables, once for the default on :root and once per other palette.
    Rendered into <head> by app/layout.tsx. */
export const PALETTE_CSS = [
  `:root{${declarations(PALETTES[0])}}`,
  ...PALETTES.slice(1).map((p) => `:root[data-palette="${p.id}"]{${declarations(p)}}`),
].join("\n")

/** Runs in <head> before the body paints. A ?palette= link wins and is
    remembered; otherwise the remembered choice; otherwise the default. Each
    step is guarded on its own, so a browser that refuses storage still
    honours a link. Spectrum is the absence of the attribute. */
export const PALETTE_BOOT = `(function(){var ids=${JSON.stringify(PALETTE_IDS)},d=document.documentElement,p=null;try{var q=new URLSearchParams(location.search).get(${JSON.stringify(PALETTE_PARAM)});if(q&&ids.indexOf(q)>-1)p=q}catch(e){}try{if(p)localStorage.setItem(${JSON.stringify(PALETTE_KEY)},p);else p=localStorage.getItem(${JSON.stringify(PALETTE_KEY)})}catch(e){}if(p&&p!==${JSON.stringify(DEFAULT_PALETTE)}&&ids.indexOf(p)>-1)d.setAttribute("data-palette",p)})();`

/* The 7 Oct exports, kept so nothing that imported them breaks: Spectrum's
   values, exactly as they were. */
export const EDGE_BAND = band(PALETTES[0].chips.map((c) => c.hex))
export const EDGE_COLOURS = PALETTES[0].chips.map((c) => c.hex)
export const WATER_BAND = band(PALETTES[0].water)
