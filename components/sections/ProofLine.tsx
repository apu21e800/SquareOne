/**
 * One quiet band under the hero.
 *
 * 19 Sept 2026 it replaced the four big numerals (Vern: "a bit obnoxious…
 * let's make the homepage look more pro"). 21 Sept it was rebuilt again,
 * because the fix had its own fault (Vern: "just looks like a jumble of
 * text"): five label-and-value pairs of wildly different lengths, set on a
 * wrapping flex row with a 10px gap inside each pair and a 40px gap between
 * them. At 1440 the fifth pair dropped to a second line on its own and the
 * eye could not tell where one fact ended and the next began — the gaps were
 * too close in size to do the separating work.
 *
 * Now it is a table, which is what it always was: four columns, each with
 * its label set above its value, divided by rules. The eye reads down a
 * column, never across a run of text. Four, not five — "Accredited · Better
 * Business Bureau" comes off, because the footer's legal row and the contact
 * page's badge both carry it and the home page does not need it three times.
 *
 * Every fact is on the record: since 2000, the Maple Ridge office, the two
 * regions, the free site visit and written quote.
 */
const ITEMS: { label: string; value: string }[] = [
  { label: "Since", value: "2000" },
  { label: "Office", value: "Maple Ridge, BC" },
  { label: "Working", value: "Lower Mainland and Vancouver Island" },
  { label: "First step", value: "Free site visit and written quote" },
]

export default function ProofLine() {
  return (
    <section aria-label="About Square One, in brief" className="border-b border-hairline bg-surface">
      <dl className="container-1280 grid grid-cols-4 py-7 max-[900px]:grid-cols-2 max-[900px]:gap-y-6 max-[900px]:py-6">
        {ITEMS.map((item, i) => (
          <div
            key={item.label}
            className={[
              "min-w-0 px-7 first:pl-0 last:pr-0",
              // A rule before every column but the first — the separator the
              // old gap was trying and failing to be.
              i > 0 ? "border-l border-hairline" : "",
              // Two up on phones and tablets: the rule belongs before the
              // right-hand column of each pair, not before every cell.
              "max-[900px]:px-5 max-[900px]:first:pl-0 max-[900px]:[&:nth-child(odd)]:border-l-0 max-[900px]:[&:nth-child(odd)]:pl-0 max-[900px]:[&:nth-child(3)]:border-l-0",
            ].join(" ")}
          >
            <dt className="label">{item.label}</dt>
            <dd className="mt-[7px] text-[15px] leading-[1.4] font-medium tracking-[-0.005em] text-ink [text-wrap:pretty]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
