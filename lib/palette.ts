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
/**
 * The shortlist the driveway composer opens with — StreetBond colours that
 * actually get ordered for a house, ahead of the full 52.
 *
 * Expanded 16 Sept 2026 to the eleven the client named in review (bedrock,
 * brick, granite, pewter, Sierra, black, concrete gray, burnt Sienna, brown
 * suede, taupe, graphite). The point of their note is that the old
 * shortlist leaned on the municipal palette — Marigold, Patriot Blue,
 * Celtic Green are bike-lane and plaza colours, and nobody puts them on a
 * driveway. Earth tones and greys first; every name here is on HUB's
 * published chart and is checked against it by `colour()` below.
 */
export const DRIVEWAY_COLOURS: Swatch[] = [
  "Slate",
  "Graphite",
  "Gun Metal",
  "Pewter",
  "Concrete Gray",
  "Black",
  "Bedrock",
  "Granite",
  "Driftwood",
  "Taupe",
  "Sandy Beige",
  "Brown Suede",
  "Sierra",
  "Burnt Sienna",
  "Terra Cotta",
  "Brick",
  "Sage",
].map(colour)

export type PatternId =
  | "ashlar-slate"
  | "random-stone"
  | "offset-brick"
  | "herringbone"
  | "standard-tile"
  | "offset-tile"
  | "soldier-course"
  | "texas-cobble"
  | "stacked-brick"

export interface Pattern {
  /** Field patterns cover the surface; borders run as an edge course. */
  kind: "field" | "border"
  id: PatternId
  name: string
  /** HUB's template family, as printed in the catalogue. */
  family: string
}

/**
 * HUB's StreetPrint Template Catalog, "Popular Patterns", sections 1.0-10.0,
 * named and spelled exactly as HUB prints them (verified against the
 * catalogue's contents page, 11 Sept 2026). The five "Special Purpose"
 * sections — Accent, Radial & Arch Extensions, Numbers & Letters, Signage &
 * Playground, International — are left out on purpose: the page says the
 * list is a selection and custom templates are cut to order. HUB's part
 * numbers never appear on the site; the catalogue is linked instead.
 * "Random stone" was never a HUB name — section 6.0 is Stone Templates and
 * holds Random Slate, Thompson Stone and Random Cobble.
 */
/**
 * The patterns Square One actually installs — taken from Square One's own
 * "Stamped Asphalt Patterns" sheet (public/docs/StreetPrint/
 * SquareOne-StreetPrint-Patterns.pdf), not from HUB's full catalogue.
 *
 * This is the distinction that matters: HUB's Template Catalog lists
 * fifteen sections because HUB sells all of them. Square One's own sheet
 * prints six field patterns and three borders, and those are the nine that
 * get ordered in BC. Showing a catalogue section Square One does not
 * install is a promise the crew has to keep.
 *
 * Confirmed twice over on 16 Sept 2026: the client asked for exactly these
 * additions in review (standard tile, offset tile, random stone,
 * herringbone, soldier course, stacked brick) and for four removals, and
 * the removals are precisely the sections absent from their own sheet —
 * Diagonal Herringbone, British Cobble, Eurofan and Scallop.
 *
 * `family` records where each one sits in HUB's catalogue so the
 * provenance stays traceable, and the names are spelled as Square One
 * prints them. No part numbers: those are HUB's ordering codes and they
 * date — the band links to HUB's live catalogue instead.
 */
export const STREETPRINT_PATTERNS: Pattern[] = [
  { kind: "field", id: "ashlar-slate", name: "Ashlar Slate", family: "HUB Section 4.0" },
  { kind: "field", id: "random-stone", name: "Random Stone", family: "HUB Section 6.0 — Stone Templates" },
  { kind: "field", id: "offset-brick", name: "Offset Brick", family: "HUB Section 1.0" },
  { kind: "field", id: "herringbone", name: "Standard Herringbone", family: "HUB Section 3.0" },
  { kind: "field", id: "standard-tile", name: "Standard Tile", family: "HUB Section 9.0 — Tile Sets" },
  { kind: "field", id: "offset-tile", name: "Offset Tile", family: "HUB Section 9.0 — Tile Sets" },
  { kind: "border", id: "soldier-course", name: "Soldier Course", family: "HUB Section 10.0 — Border Templates" },
  { kind: "border", id: "texas-cobble", name: "Texas Cobble", family: "HUB Section 10.0 — Border Templates" },
  { kind: "border", id: "stacked-brick", name: "Stacked Brick", family: "HUB Section 10.0 — Border Templates" },
]

/** Square One's own sheet, hosted here — the source for the list above. */
export const SQUAREONE_PATTERNS_SHEET = "/docs/StreetPrint/SquareOne-StreetPrint-Patterns.pdf"

/** HUB's public catalogue — linked, never hosted, so it is always the current one. */
export const STREETPRINT_CATALOGUE_URL = "https://hubss.com/docs/streetprint/streetprint-template-catalog.pdf"
