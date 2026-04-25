/**
 * StatsBar — warm light band, 4 stats with vertical dividers.
 * Numbers match hero weight (800) so the energy carries past the fold.
 */
export default function StatsBar() {
  const stats = [
    { num: "51+",    label: "BC communities served" },
    { num: "25 yrs", label: "In operation" },
    { num: "4",      label: "Specialist services" },
    { num: "100%",   label: "BC-based team" },
  ]

  return (
    <section className="bg-[#F6F4F0] border-y border-[#E2DDD8] relative">
      <span
        aria-hidden
        className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
        style={{ background: "linear-gradient(90deg, #C8601A 0%, #E8895A 100%)" }}
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E2DDD8]">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-start px-6 lg:px-10 ${
                i === 0 ? "pl-0 lg:pl-0" : ""
              } ${
                i === stats.length - 1 ? "pr-0 lg:pr-0" : ""
              }`}
            >
              <span
                className="text-[#111111] leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 4.5vw, 4.25rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.055em",
                  lineHeight: 0.88,
                }}
              >
                {s.num}
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#5A5A5A] font-semibold mt-4 leading-snug">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
