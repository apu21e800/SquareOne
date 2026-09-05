import Link from "next/link"
import PatternTile from "@/components/PatternTile"
import { FEATURED_COLOURS, STREETPRINT_PATTERNS } from "@/lib/palette"

/**
 * The materials board — replaces the field panorama (5 Sept 2026, Vern:
 * "not a fan of the huge useless image on the front page"). Where the
 * photograph only breathed, this band works: the StreetPrint templates as
 * plan drawings, and a dozen StreetBond colours by their published names,
 * each tile a route into the product page. Stone surface, hairline frame —
 * the one band on the page that reads as a drawing rather than a photograph.
 */
export default function MaterialsBand() {
  return (
    <section className="grain-paper section relative overflow-hidden border-y border-hairline bg-surface-stone">
      <span aria-hidden="true" className="ghost-index ghost-index-stone">02</span>

      <div className="container-1280 relative z-[1]">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-num">02</span>Patterns and colours
            </div>
            <h2 className="mt-5 max-w-[16ch]">Stamped in, sealed in colour</h2>
            <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.65] text-ink-body [text-wrap:pretty]">
              StreetPrint templates press the pattern into hot asphalt; StreetBond colour seals it
              &mdash; four ranges on HUB&apos;s chart, Signature to Cycle Lane. The sample boards come to
              the site visit, because a screen never matches a casting.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 pb-1">
            <Link href="/products/streetprint" className="arrow-link whitespace-nowrap">
              StreetPrint patterns <span>&rarr;</span>
            </Link>
            <Link href="/products/streetbond" className="arrow-link whitespace-nowrap">
              StreetBond colours <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* ── Templates, drawn ──────── */}
        <div data-reveal-group className="mt-12 grid grid-cols-8 gap-4 max-[1100px]:grid-cols-4 max-[560px]:grid-cols-3 max-[560px]:gap-3">
          {STREETPRINT_PATTERNS.map((pattern) => (
            <Link key={pattern.id} href="/products/streetprint" data-reveal className="group block">
              <div className="pattern-tile relative aspect-[4/3] overflow-hidden rounded-[2px] border border-hairline bg-surface">
                <PatternTile id={pattern.id} className="absolute inset-0 h-full w-full" />
              </div>
              <div className="chip-name">{pattern.name}</div>
            </Link>
          ))}
        </div>

        {/* ── Colours, by their published names ──────── */}
        <div data-reveal-group className="mt-10 grid grid-cols-12 gap-3 max-[1100px]:grid-cols-6 max-[560px]:grid-cols-4 max-[560px]:gap-2">
          {FEATURED_COLOURS.map((swatch) => (
            <Link key={swatch.name} href="/products/streetbond" data-reveal className="group block">
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

        <p className="mt-8 max-w-[64ch] text-[13px] leading-[1.6] text-ink-muted">
          Names and ranges as HUB publishes them; on-screen colour varies from the cast colour.
          Every pattern and colour above is installed to the manufacturer&apos;s specification.
        </p>
      </div>
    </section>
  )
}
