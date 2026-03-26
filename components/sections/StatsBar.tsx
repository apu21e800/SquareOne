export default function StatsBar() {
  const stats = [
    { value: "25+", label: "Years in BC", sub: "Since 2000" },
    { value: "500+", label: "Projects Installed", sub: "Across BC" },
    { value: "4", label: "Service Lines", sub: "Full spectrum" },
    { value: "#1", label: "HUB Applicator", sub: "Western Canada" },
  ]

  return (
    <section className="w-full py-14 bg-[#32373C]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center lg:px-10">
              <p className="text-4xl sm:text-5xl font-black text-[#D66620] mb-1 leading-none">
                {stat.value}
              </p>
              <p className="text-white font-semibold text-sm uppercase tracking-widest mb-0.5">
                {stat.label}
              </p>
              <p className="text-white/40 text-xs uppercase tracking-wider">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
