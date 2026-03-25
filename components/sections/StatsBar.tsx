export default function StatsBar() {
  const stats = [
    { label: "Decorative pavement in BC since 2000", value: "25+ Years" },
    { label: "Proudly serving the province we call home", value: "BC Only" },
    { label: "From Vancouver to Vancouver Island", value: "500+ Projects" },
    { label: "Initial Consultation", value: "Free" },
  ]

  return (
    <section className="w-full py-16 bg-[#2D2D2D]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-sm font-semibold text-[#E8581A] uppercase tracking-widest mb-2">
                {stat.label}
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
