const stats: { number: string; label: string }[] = [
  { number: "51", label: "BC communities served" },
  { number: "25", label: "years in operation" },
  { number: "04", label: "specialist services" },
  { number: "100", label: "percent BC owned and operated" },
]

export default function StatsBar() {
  return (
    // Tight band — deliberate density contrast against the full-bleed hero above
    <section className="grain-paper relative overflow-hidden border-y border-hairline bg-surface-warm py-16 max-[700px]:py-10">

      <div data-reveal-group className="container-1280 relative z-[1] grid grid-cols-4 gap-10 max-[700px]:grid-cols-2 max-[700px]:gap-x-6 max-[700px]:gap-y-9">
        {stats.map((stat) => (
          <div key={stat.label} data-reveal className="stat-rule">
            <div className="stat-num" data-count>{stat.number}</div>
            <div className="mt-[14px] text-[15px] text-ink-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
