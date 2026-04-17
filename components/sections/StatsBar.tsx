const stats = [
  { value: "500+", label: "Projects across BC" },
  { value: "25", label: "Years of expertise" },
  { value: "2", label: "Regions served" },
  { value: "4", label: "Core services" },
]

export default function StatsBar() {
  return (
    <section className="w-full bg-[#1C2026] py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start px-6 sm:px-8 first:pl-0 py-4 md:py-0"
            >
              <span
                className="text-white mb-3"
                style={{
                  fontFamily: "var(--font-playfair), ui-serif, Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(2.5rem, 4vw, 3.25rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                {stat.value}
              </span>
              <span className="text-white/50 text-xs uppercase tracking-[0.15em] font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
