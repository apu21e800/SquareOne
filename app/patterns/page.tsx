import type { Metadata } from "next"
import Link from "next/link"
import PatternSheetGrid from "@/components/PatternSheetGrid"
import { Section } from "@/components/ui/Container"
import { OFFERED_SHEETS } from "@/lib/pattern-sheets"
import { SQUAREONE_PATTERNS_SHEET } from "@/lib/palette"
import { clampDescription } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd"

/* /patterns — the library, on paper. Every sheet is the manufacturer's own
   template drawing at its true dimensions; see lib/pattern-sheets.ts for
   where the sheets came from and which are shown. Fields first, then
   borders, the way the sheet numbers run.

   26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the same page, restyled —
   the eyebrow is the small serif voice, no full stop, the two groups sit
   under margin-column headers, the sheets lose their cards and carry their
   notes under them, the arrow links are underlined words. The download of
   Square One's own patterns sheet stays. */

export const metadata: Metadata = {
  title: "StreetPrint Stamped Asphalt Patterns",
  description: clampDescription(
    "StreetPrint stamped asphalt templates Square One installs, as the manufacturer draws them: herringbone, offset brick, ashlar slate, tiles and borders.",
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

  /* The note and the links close whichever group renders last. */
  const closing = (
    <div className="mt-14 border-t border-hairline pt-6">
      <p className="max-w-[70ch] text-[14.5px] italic leading-[1.6] text-ink-muted">
        A selection, not the whole library: custom templates are cut to order, ask us.
        Random Stone is on Square One&rsquo;s sheet and has no standalone drawing. Colour names
        and ranges as the manufacturer publishes them; on-screen colour varies from the cast colour.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        <Link href="/contact" className="btn-primary">Get a quote</Link>
        <Link href="/products/streetprint" className="link">StreetPrint</Link>
        <a href={SQUAREONE_PATTERNS_SHEET} className="link">Square One&rsquo;s patterns sheet</a>
        {/* HUB's template catalogue used to be linked here and on the home
            materials band; off at the client's request (19 Sept 2026,
            "remove the hub template guide as per jan"). */}
      </div>
    </div>
  )

  return (
    <main className="bg-surface">
      <JsonLd data={[breadcrumbSchema(SITE_URL, [{ name: "Patterns", path: "/patterns" }])]} />

      <section className="bg-surface pt-[calc(var(--bar-h)+88px)] pb-14 max-[700px]:pt-[calc(var(--bar-h)+48px)] max-[700px]:pb-10">
        <div className="container-1280">
          <span className="label">StreetPrint&reg; templates</span>
          <h1 className="mt-5 max-w-[20ch] [text-wrap:balance]">The stamped asphalt <em>pattern library</em></h1>
          <div className="mt-8 grid grid-cols-12 gap-x-10 gap-y-5 max-[900px]:grid-cols-1">
            <p className="lede col-span-7 max-w-[56ch] [text-wrap:pretty]">
              {OFFERED_SHEETS.length} stamping templates, shown as the manufacturer draws them,
              dimensioned to the inch. The heated template presses the pattern into the asphalt;
              StreetBond&reg; colour locks it in.
            </p>
            <p className="col-span-5 max-w-[40ch] self-start pt-1 text-[16px] leading-[1.65] text-ink-muted max-[900px]:max-w-[56ch] max-[900px]:pt-0">
              Drawings are the manufacturer&rsquo;s own template sheets. Square One installs them
              on{" "}
              <Link href="/driveways" className="link">driveways</Link>,{" "}
              <Link href="/applications/crosswalks" className="link">crosswalks</Link>,{" "}
              <Link href="/applications/roundabouts" className="link">roundabouts</Link>{" "}
              and{" "}
              <Link href="/applications/parking-lots" className="link">parking lots</Link>;
              the samples come to the site visit, so you see the real surface before you sign.
            </p>
          </div>
        </div>
      </section>

      <Section id="fields" label={`${fields.length} templates`} title="Fields" tone="warm" wide>
        <PatternSheetGrid sheets={fields} priority />
        {borders.length === 0 && closing}
      </Section>

      {borders.length > 0 && (
        <Section id="borders" label={`${borders.length} template${borders.length === 1 ? "" : "s"}`} title="Borders" tone="warm" wide>
          <PatternSheetGrid sheets={borders} />
          {closing}
        </Section>
      )}
    </main>
  )
}
