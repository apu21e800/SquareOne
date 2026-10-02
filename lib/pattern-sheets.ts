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
 * NAMES are HUB's, from hubss.com/patterns, lightly adjusted to the sheet
 * each one actually is — they are what people ask for, so they stay as the
 * manufacturer prints them. HUB shows sixteen; two of theirs (Stacked Brick
 * Border and Flexible Stacked Brick Border as standalone sheets) have no PDF
 * in the archive, so this library is fourteen.
 *
 * NOTES are Square One's (26 Sept 2026, docs/OWN-COMPANY-BRIEF.md §3.10,
 * §7): what a homeowner or an engineer sees on the ground once the sheet is
 * stamped, in plain words. They were HUB's one-liners verbatim until then,
 * and the same sentence on two sites competes in search. No figures, no
 * superlatives, no performance claims — the drawing carries the dimensions.
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
  /** Square One's one line under the drawing: what the pattern looks like on the ground. */
  note: string
  kind: PatternKind
  /** On Square One's confirmed sheet. Off = rendered, registered, not shown. */
  offered: boolean
  /** Which of Square One's nine this is, where the names differ. */
  squareOneName?: string
}

export const PATTERN_SHEETS: PatternSheet[] = [
  // ── Fields ────────────────────────────────────────────────────────────
  { slug: "herringbone", name: "Standard Herringbone", note: "A zigzag of bricks, laid square to the edge.", kind: "field", offered: true },
  { slug: "diagonal-herringbone", name: "Diagonal Herringbone", note: "A zigzag of bricks turned corner-on to the edge.", kind: "field", offered: false },
  { slug: "herringbone-stacked-border", name: "Herringbone + Stacked Border", note: "The zigzag field with a straight course of bricks along the edge.", kind: "field", offered: true, squareOneName: "Stacked Brick border" },
  { slug: "herringbone-tile-border", name: "Herringbone + Tile Border", note: "The zigzag field with a row of square tiles along the edge.", kind: "field", offered: false },
  { slug: "diagonal-herringbone-tile-border", name: "Diagonal Herringbone + Tile Border", note: "The corner-on zigzag with a row of square tiles along the edge.", kind: "field", offered: false },
  { slug: "offset-brick", name: "Offset Brick", note: "Bricks in staggered rows, the way a brick wall is laid.", kind: "field", offered: true },
  { slug: "offset-brick-border", name: "Offset Brick + Border", note: "Staggered bricks, edged with a row of bricks standing on end.", kind: "field", offered: true, squareOneName: "Soldier Course border" },
  { slug: "ashlar-slate", name: "Ashlar Slate", note: "Slabs of different sizes, fitted so no joint runs straight through.", kind: "field", offered: true },
  { slug: "british-cobble", name: "British Cobble", note: "Small cobbles in tight staggered rows, like an old stone street.", kind: "field", offered: false },
  { slug: "tiles-6in", name: "6″ Tiles", note: "Small square tiles in a straight grid, joints lined up both ways.", kind: "field", offered: true, squareOneName: "Standard Tile" },
  { slug: "tiles-8in", name: "8″ Tiles", note: "Larger square tiles in a straight grid, every joint in line.", kind: "field", offered: false },
  { slug: "offset-tile-8in", name: "8″ Offset Tile", note: "Square tiles in staggered rows, each row stepped over from the last.", kind: "field", offered: true, squareOneName: "Offset Tile" },
  // ── Borders ───────────────────────────────────────────────────────────
  { slug: "double-tile-border", name: "Double Tile Border", note: "A two-row band of square tiles along the edge.", kind: "border", offered: false },
  { slug: "flexible-tile-border", name: "Flexible Tile Border", note: "One row of square tiles that bends with a curved edge.", kind: "border", offered: true, squareOneName: "Texas Cobble" },
]

// 25 Sept 2026: the 19 Sept do-up (4aca1ef) switched all fourteen on, which
// put back templates the client had taken off and made the drafted reply to
// 13.4–13.9 ("the nine on your own patterns sheet, and nothing else") untrue.
// Back to the confirmed set. Switching one on is still the client's call.
export const OFFERED_SHEETS = PATTERN_SHEETS.filter((p) => p.offered)

/** The three the home page and the driveways page lead with — three
 *  genuinely different geometries, not two herringbones and a brick. */
export const FEATURED_SHEETS = ["herringbone", "offset-brick", "ashlar-slate"]
  .map((slug) => PATTERN_SHEETS.find((p) => p.slug === slug)!)
  .filter(Boolean)

export const sheetSrc = (slug: string) => `/images/patterns/${slug}.webp`

/** The rendered sheets are all the same drawing frame, trimmed the same way. */
export const SHEET_W = 1800
export const SHEET_H = 1390
