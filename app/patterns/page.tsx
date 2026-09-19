import type { Metadata } from "next"
import Link from "next/link"
import PatternSheetGrid from "@/components/PatternSheetGrid"
import { OFFERED_SHEETS, PATTERN_SHEETS } from "@/lib/pattern-sheets"
import { SQUAREONE_PATTERNS_SHEET } from "@/lib/palette"
import { clampDescription } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd"

/* /patterns — the library, as hubss.com/patterns shows it and on paper.
   Every card is HUB's own template drawing at the sheet's true dimensions;
   see lib/pattern-sheets.ts for where the sheets came from and which are
   shown. Fields first, then borders, the way the sheet numbers run. */

export const metadata: Metadata = {
  title: "StreetPrint Stamped Asphalt Patterns",
  description: clampDescription(
    "StreetPrint stamped asphalt templates Square One installs, as the manufacturer draws them — herringbone, offset brick, ashlar slate, tiles and borders.",
  ),
  keywords: [
    "StreetPrint patterns",
    "stamped asphalt patterns",
    "stamped asphalt templates BC",
    "ashlar slate stamped asphalt",
    "herringbone stamped asphalt",
  ],
  alternates: { canonical: `${SITE_URL}/patterns` },
}

export default function PatternsPage() {
  const fields = OFFERED_SHEETS.filter((p) => p.kind === "field")
  const borders = OFFERED_SHEETS.filter((p) => p.kind === "border")
  return (
    <main className="bg-surface">
      <JsonLd data={[breadcrumbSchema(SITE_URL, [{ name: "Patterns", path: "/patterns" }])]} />

      <section className="bg-surface pt-[calc(var(--bar-h)+88px)] pb-14 max-[700px]:pt-[calc(var(--bar-h)+48px)] max-[700px]:pb-10">
        <div className="container-1280">
          <div className="eyebrow">StreetPrint&reg; templates</div>
          <h1 className="stop mt-7 max-w-[20ch] [text-wrap:balance]">The stamped asphalt pattern library</h1>
          <div className="mt-8 grid grid-cols-12 gap-x-10 gap-y-5 max-[900px]:grid-cols-1">
            <p className="col-span-7 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body [text-wrap:pretty] max-[700px]:text-[17px]">
              {OFFERED_SHEETS.length} stamping templates, shown as the manufacturer draws them &mdash;
              dimensioned to the inch. The heated template presses the pattern into the asphalt;
              StreetBond&reg; colour locks it in.
            </p>
            <p className="col-span-5 max-w-[40ch] self-start pt-1 text-[15px] leading-[1.65] text-ink-muted max-[900px]:max-w-[56ch] max-[900px]:pt-0">
              Drawings are the manufacturer&rsquo;s own template sheets. Square One installs them
              on{" "}
              <Link href="/driveways" className="font-medium text-ink underline-offset-4 hover:underline">driveways</Link>,{" "}
              <Link href="/applications/crosswalks" className="font-medium text-ink underline-offset-4 hover:underline">crosswalks</Link>,{" "}
              <Link href="/applications/roundabouts" className="font-medium text-ink underline-offset-4 hover:underline">roundabouts</Link>{" "}
              and{" "}
              <Link href="/applications/parking-lots" className="font-medium text-ink underline-offset-4 hover:underline">parking lots</Link>;
              the samples come to the site visit, because a drawing is not a casting.
            </p>
          </div>
        </div>
      </section>

      <section className="section border-t border-hairline bg-surface-warm pt-14">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <h2>Fields</h2>
            <span className="label">{fields.length} templates</span>
          </div>
          <div className="mt-8">
            <PatternSheetGrid sheets={fields} priority />
          </div>

          {borders.length > 0 && (
            <>
              <div className="mt-16 flex flex-wrap items-baseline justify-between gap-6">
                <h2>Borders</h2>
                <span className="label">{borders.length} template{borders.length === 1 ? "" : "s"}</span>
              </div>
              <div className="mt-8">
                <PatternSheetGrid sheets={borders} />
              </div>
            </>
          )}

          <p className="mt-12 max-w-[70ch] text-[13px] leading-[1.6] text-ink-muted">
            A selection, not the whole library &mdash; custom templates are cut to order, ask us.
            Random Stone is on Square One&rsquo;s sheet and has no standalone drawing. Colour names
            and ranges as the manufacturer publishes them; on-screen colour varies from the cast colour.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/contact" className="btn-primary">Request a quote</Link>
            <Link href="/products/streetprint" className="arrow-link">StreetPrint <span aria-hidden="true">&rarr;</span></Link>
            <a href={SQUAREONE_PATTERNS_SHEET} className="arrow-link">Square One&rsquo;s patterns sheet <span aria-hidden="true">&darr;</span></a>
            {/* HUB's template catalogue used to be linked here and on the home
                materials band; off at the client's request (19 Sept 2026,
                "remove the hub template guide as per jan"). */}
          </div>
        </div>
      </section>
    </main>
  )
}
