export default function StatsBar() {
  const stats = [
    { number: "500+", label: "Projects across BC" },
    { number: "25", label: "Years of expertise" },
    { number: "2", label: "Regions served" },
    { number: "4", label: "Core specializations" },
  ]

  return (
    <section className="w-full bg-[#1C2026] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="px-6 first:pl-0 last:pr-0">
              <div className="font-display italic text-5xl text-white mb-2">
                {stat.number}
              </div>
              <div className="text-xs tracking-[0.15em] uppercase text-white/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
