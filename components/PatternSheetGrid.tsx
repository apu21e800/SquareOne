import Image from "next/image"
import Link from "next/link"
import { OFFERED_SHEETS, sheetSrc, SHEET_W, SHEET_H, type PatternSheet } from "@/lib/pattern-sheets"

/**
 * The pattern library grid — HUB's card, on paper.
 *
 * hubss.com/patterns: a three-column grid of cards, each carrying the whole
 * drawing sheet with a name and one line under it. That is the reference
 * and this is the same object in Square One's ground: a paper card with a
 * hairline, the sheet's own white for the drawing, Inter for the name and
 * the note. Nothing else — the sheets are the design.
 *
 * `limit` shows the first N (the home band shows three and links to the
 * library). `linkTo` wraps each card in a link to the library page.
 */
export default function PatternSheetGrid({
  sheets = OFFERED_SHEETS,
  limit,
  priority = false,
  columns = 3,
}: {
  sheets?: PatternSheet[]
  limit?: number
  priority?: boolean
  columns?: 2 | 3
}) {
  const shown = limit ? sheets.slice(0, limit) : sheets
  const cols = columns === 2 ? "grid-cols-2" : "grid-cols-3"
  return (
    <ul className={`grid ${cols} gap-5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1`} role="list">
      {shown.map((p, i) => (
        <li key={p.slug} className="pattern-sheet card-panel !p-0">
          <div className="relative aspect-[1800/1390] overflow-hidden rounded-t-[var(--radius)] bg-white">
            <Image
              src={sheetSrc(p.slug)}
              alt={`${p.name} — StreetPrint template drawing, dimensioned in inches`}
              width={SHEET_W}
              height={SHEET_H}
              sizes="(max-width: 600px) 92vw, (max-width: 900px) 46vw, 400px"
              priority={priority && i < 3}
              className="h-auto w-full"
            />
          </div>
          <div className="px-5 pb-5 pt-4">
            <div className="text-[16px] font-semibold leading-[1.3] text-ink">
              {p.name}
              {p.squareOneName && (
                <span className="ml-2 text-[12px] font-medium text-ink-muted">{p.squareOneName}</span>
              )}
            </div>
            <p className="mt-1 text-[13.5px] leading-[1.5] text-ink-muted">{p.note}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

/** The compact strip used under a heading elsewhere: three sheets and the way in. */
export function PatternSheetTeaser() {
  return (
    <>
      <PatternSheetGrid limit={3} />
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        <Link href="/patterns" className="arrow-link">
          The pattern library <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link href="/products/streetprint" className="arrow-link">
          StreetPrint <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </>
  )
}
