import Link from "next/link"
import Image from "next/image"
import { STREETBOND_COLOURS } from "@/lib/palette"
import { OFFERED_SHEETS, FEATURED_SHEETS, sheetSrc, SHEET_W, SHEET_H } from "@/lib/pattern-sheets"

/**
 * Patterns and colours, on the home page — fourth pass, 19 Sept 2026.
 *
 * Vern, late on launch day: "the client did like some semblance of the
 * colours and patterns on the homepage, let's add those back in a smart
 * way. Make this look premium." The earlier band was a full library card
 * grid plus a swatch grid — a catalogue page dropped into the home page.
 * This is the specifier's version of the same two facts:
 *
 *   left   three template sheets, fanned on the slate like drawings on a
 *          table — the whole sheet each time (border, dimensions, title
 *          block), because the sheet is what an engineer files
 *   right  the argument, then a single strip of eight colours from the
 *          published chart, named, the way a colour card reads
 *
 * One dark band, one composition, two ways in. No manufacturer named: the
 * site sells Square One's service (Vern, 19 Sept). The pattern library and
 * the colour card carry the full ranges.
 */

const STRIP = ["Brick", "Terra Cotta", "Sandy Beige", "Driftwood", "Pewter", "Slate", "Bike Path Green", "Patriot Blue"]
  .map((name) => STREETBOND_COLOURS.find((c) => c.name === name))
  .filter((c): c is NonNullable<typeof c> => Boolean(c))

export default function MaterialsBand() {
  const [a, b, c] = FEATURED_SHEETS
  return (
    <section className="relative overflow-hidden bg-surface-slate py-[7rem] max-[900px]:py-16">
      <div className="container-1280 relative z-[1] grid grid-cols-12 items-center gap-x-14 gap-y-14 max-[900px]:grid-cols-1">
        {/* ── The drawings, fanned ──────── */}
        <div className="col-span-6 max-[900px]:col-span-1">
          <div className="relative aspect-[1800/1390] w-full" aria-hidden="true">
            {[c, b, a].map((sheet, i) => {
              const offsets = ["translate(0%, 12%) rotate(-4deg)", "translate(7%, 5%) rotate(-1.5deg)", "translate(14%, -2%) rotate(1.5deg)"]
              return (
                <div
                  key={sheet.slug}
                  className="absolute inset-0 w-[84%] overflow-hidden rounded-[var(--radius)] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
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
          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-2 text-[13px] text-[color:var(--ink-on-slate-muted)]">
            {FEATURED_SHEETS.map((s) => (
              <li key={s.slug} className="flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-[5px] w-[5px] rounded-[1px] bg-[color:var(--accent)]" />
                {s.name}
              </li>
            ))}
          </ul>
        </div>

        {/* ── The argument, and the colours ──────── */}
        <div className="col-span-6 max-[900px]:col-span-1">
          <div className="eyebrow eyebrow-on-image">
            <span className="eyebrow-num">02</span>Patterns and colours
          </div>
          <h2 className="mt-5 max-w-[16ch] text-white [text-wrap:balance]">Specified from a drawing, matched from a card</h2>
          <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.65] text-[color:var(--ink-on-slate-body)] [text-wrap:pretty]">
            Every stamped pattern begins as a dimensioned template sheet, and every colour has a
            published name on the coating chart &mdash; so a landscape architect can draw it, an
            engineer can specify it and the finished surface matches both. The sample boards come
            to the site visit, because a drawing is not a casting.
          </p>

          <div className="mt-10">
            <div className="label label-on-slate">Eight of the colours</div>
            <ul className="mt-4 grid grid-cols-8 gap-[6px] max-[560px]:grid-cols-4" role="list">
              {STRIP.map((swatch) => (
                <li key={swatch.name}>
                  <Link href="/products/streetbond#colours" className="group block" title={`${swatch.name} · ${swatch.range}`}>
                    <span
                      aria-hidden="true"
                      className="block aspect-[1/1.15] rounded-[2px] ring-1 ring-white/10 transition-transform duration-200 group-hover:-translate-y-[2px]"
                      style={{ background: swatch.hex }}
                    />
                    <span className="mt-2 block text-[10.5px] leading-[1.3] tracking-[0.02em] text-[color:var(--ink-on-slate-muted)] transition-colors group-hover:text-white">
                      {swatch.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/patterns" className="btn-on-image">
              All {OFFERED_SHEETS.length} pattern sheets
            </Link>
            <Link href="/products/streetbond#colours" className="arrow-link text-white hover:text-[color:var(--accent)]">
              The full colour chart <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
