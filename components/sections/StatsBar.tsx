/**
 * StatsBar — warm light band, 4 stats with vertical dividers.
 * Server component. Uses real numbers from the brief.
 */
export default function StatsBar() {
  const stats = [
    { num: "51+", label: "BC Projects Completed" },
    { num: "25 yrs", label: "In Operation" },
    { num: "4", label: "Specialist Services" },
    { num: "100%", label: "BC-Based Team" },
  ]

  return (
    <section className="bg-[#F6F4F0] border-y border-[#E2DDD8]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E2DDD8]">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-start px-6 lg:px-8 ${
                i === 0 ? "pl-0 lg:pl-0" : ""
              } ${i === stats.length - 1 ? "pr-0 lg:pr-0" : ""}`}
            >
              <span
                className="text-[#111111] leading-none tracking-tight"
                style={{
                  fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.035em",
                }}
              >
                {s.num}
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#5A5A5A] font-semibold mt-3 leading-snug">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
