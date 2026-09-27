import Image from "next/image"
import Link from "next/link"
import { OFFERED_SHEETS, FEATURED_SHEETS, sheetSrc, SHEET_W, SHEET_H, type PatternSheet } from "@/lib/pattern-sheets"

/**
 * The pattern library grid — the sheets at drawing size, on paper.
 *
 * hubss.com/patterns is a three-column grid of cards, each carrying the
 * whole drawing sheet with a name and one line under it. The sheets are the
 * same object here — the drawing whole, at its true proportions, on the
 * sheet's own white. 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the
 * card comes off. Each sheet is a square-cornered frame with a hairline,
 * and the name, Square One's own name for it and the note sit UNDER it in
 * the serif, the way every caption on the site now reads.
 *
 * `limit` shows the first N (the home band shows three and links to the
 * library). The note texts come from lib/pattern-sheets.ts untouched.
 */
export default function PatternSheetGrid({
  sheets = OFFERED_SHEETS,
  limit,
  priority = false,
  columns = 3,
  /** Square One's name for the template, where the sheet's differs. Off on the
      home band — the library is where names matter. */
  subnames = true,
}: {
  sheets?: PatternSheet[]
  limit?: number
  priority?: boolean
  columns?: 2 | 3
  subnames?: boolean
}) {
  const shown = limit ? sheets.slice(0, limit) : sheets
  const cols = columns === 2 ? "grid-cols-2" : "grid-cols-3"
  return (
    <ul className={`grid ${cols} gap-x-7 gap-y-10 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1`} role="list">
      {shown.map((p, i) => (
        <li key={p.slug}>
          <figure className="m-0">
            <span className="relative block aspect-[1800/1390] w-full overflow-hidden border border-hairline bg-white">
              <Image
                src={sheetSrc(p.slug)}
                alt={`${p.name}, StreetPrint template drawing, dimensioned in inches`}
                width={SHEET_W}
                height={SHEET_H}
                sizes="(max-width: 600px) 92vw, (max-width: 900px) 46vw, 400px"
                priority={priority && i < 3}
                className="h-auto w-full"
              />
            </span>
            <figcaption className="cap">
              <span className="block not-italic font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
                {p.name}
              </span>
              {subnames && p.squareOneName && (
                <span className="block">Square One&rsquo;s sheet: {p.squareOneName}</span>
              )}
              <span className="block">{p.note}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}

/** The compact strip used under a heading elsewhere: three sheets and the way in. */
export function PatternSheetTeaser() {
  return (
    <>
      <PatternSheetGrid sheets={FEATURED_SHEETS} subnames={false} />
      <p className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        <Link href="/patterns" className="link">
          The pattern library
        </Link>
        <Link href="/products/streetprint" className="link">
          StreetPrint
        </Link>
      </p>
    </>
  )
}
