const stats = [
  { value: "500+", label: "Projects" },
  { value: "25",   label: "Years" },
  { value: "2",    label: "Regions" },
  { value: "4",    label: "Services" },
]

export default function StatsBar() {
  return (
    <section className="w-full bg-[#1C2026] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#1C2026] px-6 py-10 text-center">
              <div className="font-display italic text-5xl lg:text-6xl text-white font-normal leading-none tracking-[-0.02em]">
                {s.value}
              </div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-4 font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
