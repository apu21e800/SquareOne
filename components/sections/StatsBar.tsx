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
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E2DDD8]">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-start px-8 lg:px-12 ${
                i === 0 ? "pl-0 lg:pl-0" : ""
              } ${
                i === stats.length - 1 ? "pr-0 lg:pr-0" : ""
              } ${
                i >= 2 ? "mt-8 lg:mt-0" : ""
              }`}
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
