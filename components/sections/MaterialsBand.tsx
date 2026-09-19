import Link from "next/link"
import PatternSheetGrid from "@/components/PatternSheetGrid"
import { FEATURED_COLOURS } from "@/lib/palette"
import { OFFERED_SHEETS, FEATURED_SHEETS } from "@/lib/pattern-sheets"

/**
 * The materials board — patterns and colours, on the home page.
 *
 * 19 Sept 2026, third time: Vern, with the site live, "the templates still
 * look like shit … should look exactly like HUBSS hubss.com/patterns." The
 * first version drew the nine templates by hand; the second cropped a
 * window out of HUB's real drawings and showed it as a chip — a small grid
 * on a white square, which is graph paper. HUB shows the WHOLE SHEET: the
 * drawing border, the coordinate markers, the dimensions, the title block.
 * That is the entire difference, and this band now does the same — three
 * full sheets in HUB's card, on paper, and the way into the library.
 *
 * Colours stay: a dozen StreetBond swatches by their published names, each
 * a route to the StreetBond page. lib/pattern-sheets.ts is the registry.
 */
export default function MaterialsBand() {
  return (
    <section className="grain-paper section relative overflow-hidden border-y border-hairline bg-surface-stone">
      <div className="container-1280 relative z-[1]">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-num">02</span>Patterns and colours
            </div>
            <h2 className="mt-5 max-w-[26ch] [text-wrap:balance]">Stamped in, sealed in colour</h2>
            <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.65] text-ink-body [text-wrap:pretty]">
              StreetPrint templates press the pattern into hot asphalt; StreetBond colour seals it
              &mdash; four ranges on HUB&apos;s chart, Signature to Cycle Lane. The sample boards come to
              the site visit, because a screen never matches a casting.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 pb-1">
            <Link href="/patterns" className="arrow-link whitespace-nowrap">
              All {OFFERED_SHEETS.length} templates <span>&rarr;</span>
            </Link>
            <Link href="/products/streetbond" className="arrow-link whitespace-nowrap">
              StreetBond colours <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* ── Three of the sheets, as HUB draws them ──────── */}
        <div data-reveal className="mt-12">
          <PatternSheetGrid sheets={FEATURED_SHEETS} subnames={false} priority />
        </div>

        {/* ── Colours, by their published names ──────── */}
        <div data-reveal-group className="mt-12 grid grid-cols-12 gap-3 max-[1100px]:grid-cols-6 max-[560px]:grid-cols-4 max-[560px]:gap-2">
          {FEATURED_COLOURS.map((swatch) => (
            <Link key={swatch.name} href="/products/streetbond" data-reveal className="group block" title={`${swatch.name} — StreetBond ${swatch.range}`}>
              <div
                aria-hidden="true"
                className="chip h-14 transition-transform duration-200 group-hover:-translate-y-[2px]"
                style={{ background: swatch.hex }}
              />
              <div className="chip-name">{swatch.name}</div>
              <div className="mt-[2px] text-[11px] leading-[1.4] text-ink-muted">{swatch.range}</div>
            </Link>
          ))}
        </div>

        <p className="mt-8 max-w-[70ch] text-[13px] leading-[1.6] text-ink-muted">
          Template drawings are HUB Surface Systems&rsquo; own, dimensioned to the inch &mdash; a
          selection, not the whole library; custom templates are cut to order, ask us. Colour names
          and ranges as HUB publishes them; on-screen colour varies from the cast colour. Every
          pattern and colour above is installed to the manufacturer&apos;s specification.
        </p>
      </div>
    </section>
  )
}
