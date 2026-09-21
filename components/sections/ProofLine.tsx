/**
 * One quiet line under the hero — 19 Sept 2026, replacing the stats band
 * (Vern, on the four big numerals: "a bit obnoxious… a bit chunky. let's make
 * the homepage look more pro"). The facts are the same facts, set in the
 * small voice on one hairline, the way an agency letterhead carries them:
 * no numerals shouting, nothing counted. Every item is on the record —
 * since 2000, the Maple Ridge office, the two regions, the free site visit
 * and written quote, the BBB accreditation the footer already carries.
 */
const ITEMS: { label: string; value: string }[] = [
  { label: "Since", value: "2000" },
  { label: "Office", value: "Maple Ridge, BC" },
  { label: "Working", value: "Lower Mainland and Vancouver Island" },
  { label: "First step", value: "Free site visit and written quote" },
  { label: "Accredited", value: "Better Business Bureau" },
]

export default function ProofLine() {
  return (
    <section aria-label="About Square One, in brief" className="border-b border-hairline bg-surface">
      <ul className="container-1280 flex flex-wrap items-baseline gap-x-10 gap-y-3 py-5 max-[700px]:gap-x-7 max-[700px]:py-4">
        {ITEMS.map((item) => (
          <li key={item.label} className="flex items-baseline gap-x-[10px]">
            <span className="label">{item.label}</span>
            <span className="text-[14.5px] font-medium tracking-[-0.005em] text-ink">{item.value}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
