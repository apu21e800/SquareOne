import Link from "next/link"
import PatternTile from "@/components/PatternTile"
import { FEATURED_COLOURS, STREETPRINT_PATTERNS, STREETPRINT_CATALOGUE_URL } from "@/lib/palette"

/**
 * The materials board — replaces the field panorama (5 Sept 2026, Vern:
 * "not a fan of the huge useless image on the front page"). Where the
 * photograph only breathed, this band works: the StreetPrint templates as
 * plan drawings, and a dozen StreetBond colours by their published names,
 * each tile a route into the product page.
 *
 * 7 Sept 2026: the template drawings were hairline-strong (#A9A297) on white
 * inside a stone band — pale on pale, and effectively invisible. The tile is
 * now asphalt and the template is the joint line pressed into it, which is
 * what StreetPrint actually leaves behind. The band still reads as a drawing
 * rather than a photograph; now it reads at all.
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
            <a href={STREETPRINT_CATALOGUE_URL} target="_blank" rel="noopener" className="arrow-link whitespace-nowrap">
              HUB&rsquo;s template catalogue <span>&#8599;</span>
            </a>
            <Link href="/products/streetbond" className="arrow-link whitespace-nowrap">
              StreetBond colours <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* ── Templates, drawn ──────── */}
        <div data-reveal-group className="mt-12 grid grid-cols-5 gap-4 max-[1100px]:grid-cols-5 max-[700px]:grid-cols-2 max-[700px]:gap-3">
          {STREETPRINT_PATTERNS.map((pattern) => (
            <Link key={pattern.id} href={`/driveways?pattern=${pattern.id}#patterns`} data-reveal className="group block" title={`See ${pattern.name} in colour`}>
              <div
                className="pattern-tile relative aspect-[4/3] overflow-hidden rounded-[2px] border bg-surface-slate"
                style={{ borderColor: "var(--hairline-slate)" }}
              >
                <PatternTile id={pattern.id} className="absolute inset-0 h-full w-full" />
              </div>
              <div className="chip-name">{pattern.name}</div>
            </Link>
          ))}
        </div>

        {/* ── Colours, by their published names ──────── */}
        <div data-reveal-group className="mt-10 grid grid-cols-12 gap-3 max-[1100px]:grid-cols-6 max-[560px]:grid-cols-4 max-[560px]:gap-2">
          {FEATURED_COLOURS.map((swatch) => (
            <Link key={swatch.name} href={`/driveways?colour=${encodeURIComponent(swatch.name)}#patterns`} data-reveal className="group block" title={`See ${swatch.name} on a pattern`}>
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
          The ten popular patterns from HUB&rsquo;s StreetPrint&reg; template catalogue, named as HUB
          prints them &mdash; a selection, not the whole library; custom templates are cut to order,
          ask us. Colour names and ranges as HUB publishes them; on-screen colour varies from the cast
          colour. Every pattern and colour above is installed to the manufacturer&apos;s specification.
        </p>
      </div>
    </section>
  )
}
