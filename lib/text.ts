/**
 * Cut a line of copy to at most `max` characters on a word boundary, with an
 * ellipsis (28 Sept 2026 QA: card excerpts were cut mid-word by CSS line
 * clamps: "civic identit…").
 */
export function clampWords(text: string | undefined, max = 120): string {
  if (!text) return ""
  const t = text.trim()
  if (t.length <= max) return t
  let cut = t.slice(0, max)
  const space = cut.lastIndexOf(" ")
  if (space > max * 0.6) cut = cut.slice(0, space)
  return cut.replace(/[\s,;:·–-]+$/u, "") + "…"
}

/** Common nouns and adjectives that drop a stray capital inside a label
    (28 Sept 2026 QA: Title Case kept creeping into lists and captions that the
    rest of the site sets in sentence case). A list of the generic words, not
    a rule for every word, so names stay as written: Beban Park, Spirit Trail,
    Victoria High School and Musqueam keep their capitals. */
const LOWER = new Set([
  "crosswalk", "crosswalks", "crossing", "crossings", "driveway", "driveways", "walkway", "walkways",
  "lot", "lots", "lane", "lanes", "decorative", "ashlar", "slate", "brick", "offset", "checker",
  "calming", "parking", "branding", "wayfinding", "graphics", "art", "median", "medians", "entries",
  "entry", "zone", "zones", "bars", "arrows", "stop", "rapid", "transit", "corridors", "corridor",
  "parks", "public", "stalls", "courts", "areas", "intersection", "intersections", "roundabout",
  "roundabouts", "visibility", "parkade", "path", "paths", "devices", "device", "decals", "bike",
  "commercial", "yellow", "markings", "marking", "removal", "prep", "logos", "custom", "traffic",
  "pattern", "patterns", "border", "borders", "tile", "tiles", "surface", "surfacing", "coating",
  "coatings", "mural", "murals", "rainbow", "herringbone", "cobble", "medallion", "apron", "aprons",
  "streetscapes", "streetscape", "accessible", "and", "the", "with", "for", "of",
])

/** Generic words that are also parts of names ("Victoria High School"): these
    drop a capital only after a word that is already lower case. */
const LOWER_AFTER_LOWER = new Set(["school", "sports", "park", "street", "trail", "centre", "station"])

/**
 * "Streetscapes and Medians" → "Streetscapes and medians". The first word
 * keeps its capital; a later word drops its capital only when it is one of
 * the generic words above.
 */
export function sentenceCase(label: string): string {
  let first = true
  let prevLower = false
  return label
    .split(/(\s+)/)
    .map((w) => {
      if (w === "" || /^\s+$/.test(w)) return w
      const bare = w.replace(/[^A-Za-z]/g, "")
      if (first) {
        first = false
        prevLower = false
        return w
      }
      const key = bare.toLowerCase()
      let out = w
      if (/^[A-Z][a-z]+$/.test(bare) && (LOWER.has(key) || (LOWER_AFTER_LOWER.has(key) && prevLower))) {
        out = w.replace(bare, key)
      }
      prevLower = /^[a-z&]/.test(out.replace(/^[^A-Za-z&]+/, ""))
      return out
    })
    .join("")
}

/** For labels made only of generic words (the four product categories:
    "Stamped Asphalt" → "Stamped asphalt"). Never use it on a name. */
export function plainCase(label: string): string {
  const t = label.trim()
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()
}
