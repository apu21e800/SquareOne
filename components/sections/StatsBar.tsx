import { products } from "@/lib/products"

/* Every figure here is provable from the record and none of them counts the
   body of work: since 2000 (CLAUDE.md), four services (lib/services.ts), the
   systems catalogue (lib/products.ts — the manufacturer is never named on the
   site, 19 Sept 2026), and the free site visit Square One itself published (content/blog/stamped-asphalt-vs-concrete-driveways-bc).
 *
 * 16 Sept 2026 — the client struck two of these in review. The photograph
 * count ("194 site photographs") read as a job total and undersold twenty-five
 * years badly: "we have done 1000s of jobs and it makes it seem like we have
 * only done 194." And "one crew" was advertising the company as smaller than
 * it is.
 *
 * 19 Sept 2026 — the community count went the same way. It was read off the
 * photographed record at build time, which made it a count of the sample and
 * not of the work (and the raw figure counted "UBC", "Lower Mainland" and
 * "White Rock Pier" as communities). Do not put a count of anything
 * countable back into this band; every number here is a fact about the
 * company, not a tally of what it has done.
 */
const stats: { number: string; label: string }[] = [
  { number: "25+", label: "years installing decorative pavement across BC" },
  { number: "04", label: "services: stamped asphalt, coatings, thermoplastic, vapour blasting" },
  { number: String(products.length).padStart(2, "0"), label: "pavement systems installed — StreetPrint®, StreetBond® and TrafficPatterns™ among them" },
  { number: "Free", label: "site visit and written quote, Lower Mainland and Vancouver Island" },
]

export default function StatsBar() {
  return (
    // Tight band — deliberate density contrast against the full-bleed hero above
    <section className="grain-paper relative overflow-hidden border-y border-hairline bg-surface-warm py-14 max-[700px]:py-10">

      <div data-reveal-group className="container-1280 relative z-[1] grid grid-cols-4 gap-10 max-[700px]:grid-cols-2 max-[700px]:gap-x-6 max-[700px]:gap-y-8">
        {stats.map((stat) => (
          <div key={stat.label} data-reveal className="stat-rule">
            <div className="stat-num" data-count>{stat.number}</div>
            <div className="mt-3 max-w-[26ch] text-[14px] leading-[1.5] text-ink-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
