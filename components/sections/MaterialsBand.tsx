import Link from "next/link"
import Image from "next/image"
import { STREETBOND_COLOURS } from "@/lib/palette"
import { OFFERED_SHEETS, FEATURED_SHEETS, sheetSrc, SHEET_W, SHEET_H } from "@/lib/pattern-sheets"

/**
 * Patterns and colours, on the home page — fourth pass, 19 Sept 2026.
 *
 * Vern, late on launch day: "the client did like some semblance of the
 * colours and patterns on the homepage, let's add those back in a smart
 * way. Make this look premium." This is the specifier's version of two
 * facts: three template sheets fanned like drawings on a table, and a strip
 * of eight named colours from the published chart.
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.5, §9.7): restyled in place —
 * the label in the margin voice, the orange squares off the sheet list, the
 * "All 8 pattern sheets" button and the arrow link now two underlined
 * words. No manufacturer named: the site sells Square One's service.
 */

const STRIP = ["Brick", "Terra Cotta", "Sandy Beige", "Driftwood", "Pewter", "Slate", "Bike Path Green", "Patriot Blue"]
  .map((name) => STREETBOND_COLOURS.find((c) => c.name === name))
  .filter((c): c is NonNullable<typeof c> => Boolean(c))

export default function MaterialsBand() {
  const [a, b, c] = FEATURED_SHEETS
  return (
    <section className="sec relative overflow-hidden bg-surface-stone py-[6.5rem] max-[900px]:py-14">
      <div className="container-1280 relative z-[1] grid grid-cols-12 items-center gap-x-14 gap-y-14 max-[900px]:grid-cols-1">
        {/* ── The drawings, fanned ──────── */}
        <div className="col-span-6 max-[900px]:col-span-1">
          <div className="relative mb-[12%] aspect-[1800/1390] w-full" aria-hidden="true">
            {[c, b, a].map((sheet, i) => {
              const offsets = ["translate(0%, 12%) rotate(-4deg)", "translate(7%, 5%) rotate(-1.5deg)", "translate(14%, -2%) rotate(1.5deg)"]
              return (
                <div
                  key={sheet.slug}
                  className="absolute inset-0 w-[84%] overflow-hidden bg-white shadow-[0_18px_44px_rgba(20,22,26,0.14)] ring-1 ring-black/[0.05]"
                  style={{ transform: offsets[i] }}
                >
                  <Image
                    src={sheetSrc(sheet.slug)}
                    alt=""
                    width={SHEET_W}
                    height={SHEET_H}
                    sizes="(max-width: 900px) 90vw, 560px"
                    className="h-auto w-full"
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* ── The argument, and the colours ──────── */}
        <div className="col-span-6 max-[900px]:col-span-1">
          <span className="label">Patterns and colours</span>
          <h2 className="mt-4 max-w-[16ch] [text-wrap:balance]">Specified from a drawing, <em>matched from a card</em></h2>
          <p className="mt-6 max-w-[48ch] text-ink-body [text-wrap:pretty]">
            Every pattern is a dimensioned sheet and every colour a named chip, so what gets
            drawn is what gets installed.
          </p>

          <div className="mt-10">
            <ul className="mt-4 grid grid-cols-8 gap-[6px] max-[560px]:grid-cols-4" role="list">
              {STRIP.map((swatch) => (
                <li key={swatch.name}>
                  <Link href="/products/streetbond#colours" className="group block" title={`${swatch.name} · ${swatch.range}`}>
                    <span
                      aria-hidden="true"
                      className="block aspect-[1/1.15] ring-1 ring-black/10"
                      style={{ background: swatch.hex }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/patterns" className="link">
              All {OFFERED_SHEETS.length} pattern sheets
            </Link>
            <Link href="/products/streetbond#colours" className="link">
              The full colour chart
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
