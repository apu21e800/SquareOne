const stats = [
  { value: "25+", label: "Years in BC", detail: "Since 2000" },
  { value: "500+", label: "Projects Installed", detail: "Across BC" },
  { value: "4", label: "Service Lines", detail: "Full spectrum" },
  { value: "2", label: "Regions Served", detail: "Lower Mainland + VI" },
]

export default function StatsBar() {
  return (
    <section className="w-full bg-white border-y border-[#E8E4DE]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-wrap sm:flex-nowrap divide-y sm:divide-y-0 sm:divide-x divide-[#E8E4DE]">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 w-1/2 sm:w-auto sm:flex-1 py-4 sm:py-5 sm:px-6 first:pl-0 last:pr-0"
            >
              {/* Vertical accent */}
              <div className="w-[3px] h-8 bg-[#D66620] rounded-full flex-shrink-0" />
              <div>
                <span className="text-[#D66620] font-black text-xl leading-none">{stat.value}</span>
                <p className="text-[#1A1A1A] font-semibold text-xs leading-tight mt-0.5">{stat.label}</p>
                <p className="text-[#999] text-[11px] leading-none mt-0.5">{stat.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
