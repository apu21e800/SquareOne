/**
 * The pattern library — HUB's template shop drawings, as HUB shows them.
 *
 * Vern, 19 Sept, with the site live: "the templates still look like shit …
 * The templates should look exactly like HUBSS https://hubss.com/patterns."
 * He was right. The first two passes cropped a window out of the pattern
 * FIELD and showed it as a chip — a small grid on a white square, which is
 * graph paper. HUB shows the WHOLE SHEET: the drawing border, the A–D and
 * 1–4 coordinate markers, the dimension set, the title block. That is what
 * makes it read as an engineering document rather than a texture, and it is
 * the entire difference.
 *
 * So each entry here is one full sheet, rendered from HUB's own PDF (ODA
 * export, March 2025; HUBSS repo, _archive/design-assets/apshalt patterns/)
 * at 120 dpi, trimmed to the drawing border, and set as ink on paper — the
 * PDFs are black-on-white already; HUB inverts them for their dark site and
 * this site does not. 30–160 KB each as WebP.
 *
 * NAMES AND DESCRIPTIONS are HUB's, from hubss.com/patterns, lightly
 * adjusted to the sheet each one actually is. HUB shows sixteen; two of
 * theirs (Stacked Brick Border and Flexible Stacked Brick Border as
 * standalone sheets) have no PDF in the archive, so this library is
 * fourteen.
 *
 * `offered` — Square One's own patterns sheet lists nine templates and the
 * client confirmed those nine on 16 Sept, taking four off the site by name.
 * The eight sheets that correspond to a confirmed template ship; the six
 * that do not are here, rendered and ready, behind the flag. Flipping one on
 * is the client's call — they took them off — and it is one word here.
 * Random Stone is on Square One's sheet but HUB publishes no standalone
 * drawing for it, so it has no card.
 */

export type PatternKind = "field" | "border"

export interface PatternSheet {
  slug: string
  name: string
  /** HUB's one-liner. */
  note: string
  kind: PatternKind
  /** On Square One's confirmed sheet. Off = rendered, registered, not shown. */
  offered: boolean
  /** Which of Square One's nine this is, where the names differ. */
  squareOneName?: string
}

export const PATTERN_SHEETS: PatternSheet[] = [
  // ── Fields ────────────────────────────────────────────────────────────
  { slug: "herringbone", name: "Standard Herringbone", note: "The classic interlock — strongest visual texture per pass", kind: "field", offered: true },
  { slug: "diagonal-herringbone", name: "Diagonal Herringbone", note: "45° set — dynamic movement across the surface", kind: "field", offered: false },
  { slug: "herringbone-stacked-border", name: "Herringbone + Stacked Border", note: "Standard field with a stacked-brick frame", kind: "field", offered: true, squareOneName: "Stacked Brick border" },
  { slug: "herringbone-tile-border", name: "Herringbone + Tile Border", note: "Standard field with a square-tile frame", kind: "field", offered: false },
  { slug: "diagonal-herringbone-tile-border", name: "Diagonal Herringbone + Tile Border", note: "Diagonal field, framed", kind: "field", offered: false },
  { slug: "offset-brick", name: "Offset Brick", note: "Running bond — the street-brick standard", kind: "field", offered: true },
  { slug: "offset-brick-border", name: "Offset Brick + Border", note: "Running bond with a soldier-course frame", kind: "field", offered: true, squareOneName: "Soldier Course border" },
  { slug: "ashlar-slate", name: "Ashlar Slate", note: "Mixed-size cut stone — natural randomness", kind: "field", offered: true },
  { slug: "british-cobble", name: "British Cobble", note: "Tight sett-stone texture", kind: "field", offered: false },
  { slug: "tiles-6in", name: "6″ Tiles", note: "Fine square grid", kind: "field", offered: true, squareOneName: "Standard Tile" },
  { slug: "tiles-8in", name: "8″ Tiles", note: "Standard square grid", kind: "field", offered: false },
  { slug: "offset-tile-8in", name: "8″ Offset Tile", note: "Square tile, running-bond offset", kind: "field", offered: true, squareOneName: "Offset Tile" },
  // ── Borders ───────────────────────────────────────────────────────────
  { slug: "double-tile-border", name: "Double Tile Border", note: "Two-course tile edging", kind: "border", offered: false },
  { slug: "flexible-tile-border", name: "Flexible Tile Border", note: "Tile edging that follows curves", kind: "border", offered: true, squareOneName: "Texas Cobble" },
]

export const OFFERED_SHEETS = PATTERN_SHEETS.filter((p) => p.offered)

export const sheetSrc = (slug: string) => `/images/patterns/${slug}.webp`

/** The rendered sheets are all the same drawing frame, trimmed the same way. */
export const SHEET_W = 1800
export const SHEET_H = 1390
