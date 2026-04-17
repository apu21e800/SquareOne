const stats = [
  { value: "500+", label: "Projects across BC" },
  { value: "25", label: "Years of expertise" },
  { value: "2", label: "Regions served" },
  { value: "4", label: "Core specializations" },
]

export default function StatsBar() {
  return (
    <section className="w-full bg-[#1C2026] py-16 border-t border-[#E2DDD8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`py-8 px-6 text-center border-white/10 ${idx < 3 ? "md:border-r" : ""} ${idx % 2 === 0 ? "border-r md:border-r" : ""} ${idx < 2 ? "border-b md:border-b-0" : ""}`}
            >
              {/* Use Playfair Display via CSS var for the number */}
              <div
                className="text-5xl font-semibold italic text-white leading-none"
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                {stat.value}
              </div>
              <div className="mt-3 text-xs tracking-[0.15em] uppercase text-white/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
