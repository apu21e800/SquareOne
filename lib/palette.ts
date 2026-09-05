/**
 * The materials board — StreetPrint patterns and StreetBond colours.
 *
 * Colours: every name and value below is read off HUB's own StreetBond colour
 * chart (public/images/S1_update_v2/Square One Color update/StreetBond Colors.png):
 * the four ranges as printed — Signature, Standard, Solar-Reflective, Cycle
 * Lane — with each hex sampled from the chart's swatch. Nothing is invented,
 * and the chart's own caveat travels with them: on-screen colour varies from
 * the cast colour, so the sample board decides.
 *
 * Patterns: the StreetPrint template names as HUB publishes them (the
 * "Popular Patterns" catalogue). The line art in components/PatternTile.tsx
 * is drawn from those names, not photographed.
 */

export type ColourRange = "Signature" | "Standard" | "Solar-Reflective" | "Cycle Lane"

export interface Swatch {
  name: string
  hex: string
  range: ColourRange
}

export const STREETBOND_COLOURS: Swatch[] = [
  // Signature
  { name: "Sandy Beige", hex: "#AE946C", range: "Signature" },
  { name: "Driftwood", hex: "#BDB4A3", range: "Signature" },
  { name: "Butterscotch", hex: "#C38256", range: "Signature" },
  { name: "Pumpkin Spice", hex: "#C67241", range: "Signature" },
  { name: "Chestnut Brown", hex: "#A65C3B", range: "Signature" },
  { name: "Mocha", hex: "#8B6844", range: "Signature" },
  { name: "Mustard", hex: "#BC7F35", range: "Signature" },
  { name: "Down To Earth", hex: "#8D7352", range: "Signature" },
  { name: "Paprika", hex: "#A9452E", range: "Signature" },
  { name: "Avocado", hex: "#8C8744", range: "Signature" },
  { name: "Sea Foam", hex: "#93A496", range: "Signature" },
  { name: "Aqua", hex: "#8D8F83", range: "Signature" },
  { name: "Sage", hex: "#BDB5A3", range: "Signature" },
  { name: "Truffle", hex: "#A1906C", range: "Signature" },
  { name: "Patriot Blue", hex: "#444B5B", range: "Signature" },
  { name: "Cobalt Blue", hex: "#4C4C51", range: "Signature" },
  { name: "Gun Metal", hex: "#9D9F9F", range: "Signature" },
  { name: "Merlot", hex: "#4E373A", range: "Signature" },
  { name: "Smokey Mauve", hex: "#81737B", range: "Signature" },
  { name: "Graphite", hex: "#6A665B", range: "Signature" },
  { name: "Bike Path Green", hex: "#82A587", range: "Signature" },
  // Standard
  { name: "San Diego Buff", hex: "#8D7B69", range: "Standard" },
  { name: "Taupe", hex: "#B08C73", range: "Standard" },
  { name: "Burnt Sienna", hex: "#382C28", range: "Standard" },
  { name: "Nutmeg", hex: "#D77840", range: "Standard" },
  { name: "Terra Cotta", hex: "#893F1D", range: "Standard" },
  { name: "Bedrock", hex: "#6B4B39", range: "Standard" },
  { name: "Brick", hex: "#69371E", range: "Standard" },
  { name: "Brown Suede", hex: "#966344", range: "Standard" },
  { name: "Sunset Blush", hex: "#AB6C5A", range: "Standard" },
  { name: "Concrete Gray", hex: "#9E8E6A", range: "Standard" },
  { name: "Marigold", hex: "#F0AA0D", range: "Standard" },
  { name: "Pewter", hex: "#BEBCB8", range: "Standard" },
  { name: "Sierra", hex: "#554231", range: "Standard" },
  { name: "Hunter Green", hex: "#20332F", range: "Standard" },
  { name: "Black", hex: "#302A26", range: "Standard" },
  { name: "Slate", hex: "#3E312B", range: "Standard" },
  { name: "Granite", hex: "#39312D", range: "Standard" },
  // Solar-Reflective
  { name: "SR Sandstone", hex: "#CCC3B3", range: "Solar-Reflective" },
  { name: "SR Khaki", hex: "#D8C0A1", range: "Solar-Reflective" },
  { name: "SR Irish Cream", hex: "#EBD2B7", range: "Solar-Reflective" },
  { name: "SR White", hex: "#F8F4EC", range: "Solar-Reflective" },
  { name: "SR Fawn", hex: "#D9A67F", range: "Solar-Reflective" },
  { name: "SR Sun Baked Clay", hex: "#FAAB6B", range: "Solar-Reflective" },
  { name: "SR Brownstone", hex: "#88492E", range: "Solar-Reflective" },
  { name: "SR Terra Cotta", hex: "#964928", range: "Solar-Reflective" },
  { name: "SR Evergreen", hex: "#595935", range: "Solar-Reflective" },
  { name: "SR Safety Blue", hex: "#2672D4", range: "Solar-Reflective" },
  { name: "SR Slate", hex: "#3D302A", range: "Solar-Reflective" },
  // Cycle Lane
  { name: "CL Shamrock Green", hex: "#78C83A", range: "Cycle Lane" },
  { name: "CL Celtic Green", hex: "#2E9C3A", range: "Cycle Lane" },
  { name: "CL Emerald Green", hex: "#0D794F", range: "Cycle Lane" },
]

export const COLOUR_RANGES: ColourRange[] = ["Signature", "Standard", "Solar-Reflective", "Cycle Lane"]

export function colour(name: string): Swatch {
  const found = STREETBOND_COLOURS.find((c) => c.name === name)
  if (!found) throw new Error(`Unknown StreetBond colour: ${name}`)
  return found
}

/** The home page's dozen — a spread across the four ranges, earth to civic. */
export const FEATURED_COLOURS: Swatch[] = [
  "Sandy Beige",
  "Driftwood",
  "Terra Cotta",
  "Brick",
  "Paprika",
  "Marigold",
  "Sage",
  "Hunter Green",
  "Patriot Blue",
  "Slate",
  "SR Safety Blue",
  "CL Celtic Green",
].map(colour)

/** The six that suit a driveway against siding and stone. */
export const DRIVEWAY_COLOURS: Swatch[] = [
  "Slate",
  "Gun Metal",
  "Driftwood",
  "Sandy Beige",
  "Terra Cotta",
  "Sage",
].map(colour)

export type PatternId =
  | "offset-brick"
  | "herringbone"
  | "diagonal-herringbone"
  | "ashlar-slate"
  | "british-cobble"
  | "stone"
  | "eurofan"
  | "scallop"

export interface Pattern {
  id: PatternId
  name: string
  /** HUB's template family, as printed in the catalogue. */
  family: string
}

export const STREETPRINT_PATTERNS: Pattern[] = [
  { id: "offset-brick", name: "Offset brick", family: "Brick templates" },
  { id: "herringbone", name: "Herringbone", family: "Standard herringbone" },
  { id: "diagonal-herringbone", name: "Diagonal herringbone", family: "Diagonal herringbone" },
  { id: "ashlar-slate", name: "Ashlar slate", family: "Ashlar slate" },
  { id: "british-cobble", name: "British cobble", family: "British cobble" },
  { id: "stone", name: "Random stone", family: "Stone templates" },
  { id: "eurofan", name: "Eurofan", family: "Eurofan templates" },
  { id: "scallop", name: "Scallop", family: "Scallop templates" },
]
