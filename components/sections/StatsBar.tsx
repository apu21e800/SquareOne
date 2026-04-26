/**
 * StatsBar — white strip, 4 numbers in orange, column dividers.
 * Sits between Hero and the service sections. Light, clean, Tesla-style.
 */
export default function StatsBar() {
  const stats = [
    { num: "25",  suffix: "+", label: "Years in business" },
    { num: "200", suffix: "+", label: "Projects installed across BC" },
    { num: "51",  suffix: "+", label: "BC communities served" },
    { num: "#1",  suffix: "",  label: "HUB certified applicator in BC" },
  ]

  return (
    <section className="bg-white border-b border-[#E2DDD8]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 lg:py-16">
        {/* 2-col on mobile, 4-col on desktop. Borders set per-cell to avoid
            divide-x misaligning on the second mobile row. */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "flex flex-col px-6 lg:px-10 py-2",
                // Right border on col-1 and col-3 (left column on each row)
                i === 0 || i === 2 ? "border-r border-[#E2DDD8]" : "",
                // Top border on the second row (items 2 & 3) on mobile only
                i >= 2 ? "border-t border-[#E2DDD8] lg:border-t-0 mt-6 pt-8 lg:mt-0 lg:pt-2" : "",
                // Left-flush the first item
                i === 0 ? "pl-0 lg:pl-0" : "",
                // Vertical divider between all 4 on desktop (left border on items 1,2,3)
                i > 0 ? "lg:border-l lg:border-[#E2DDD8]" : "",
              ].filter(Boolean).join(" ")}
            >
              <div className="flex items-baseline gap-0.5 leading-none">
                <span
                  style={{
                    fontSize: "clamp(2.6rem, 4.5vw, 4.25rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.055em",
                    lineHeight: 0.88,
                    color: "#C8601A",
                  }}
                >
                  {s.num}
                </span>
                {s.suffix && (
                  <span
                    style={{
                      fontSize: "clamp(1.3rem, 2.2vw, 2rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      color: "#C8601A",
                    }}
                  >
                    {s.suffix}
                  </span>
                )}
              </div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#5A5A5A] font-semibold mt-4 leading-snug max-w-[160px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
