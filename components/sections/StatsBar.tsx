import { workCities } from "@/lib/work"

/* Every figure here is provable: Square One has installed since 2000, and the
   community count is read off the photographed work record at build time.
 *
 * 16 Sept 2026 — the client struck two of these in review. The photograph
 * count ("194 site photographs") read as a job total and undersold twenty-five
 * years badly: "we have done 1000s of jobs and it makes it seem like we have
 * only done 194." And "one crew" was advertising the company as smaller than
 * it is. The community figure keeps a "+" for the same reason: the work
 * record is a sample of the work, not a ledger of it. Do not put a bare
 * count of anything countable back into this band.
 */
const stats: { number: string; label: string }[] = [
  { number: "25+", label: "years installing decorative pavement in BC" },
  { number: `${workCities().length}+`, label: "BC communities with Square One work on the ground" },
  { number: "04", label: "specialist services, municipal to residential" },
  { number: "Free", label: "site visit and written quote" },
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
