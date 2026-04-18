const stats = [
  { number: "51+", label: "BC Projects Completed" },
  { number: "25 yrs", label: "In Operation" },
  { number: "4", label: "Specialist Services" },
  { number: "100%", label: "BC-Based Team" },
]

export default function StatsBar() {
  return (
    <section className="w-full bg-[#F6F4F0] border-y border-[#E2DDD8] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative text-center py-6 lg:py-0">
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-4 bottom-4 w-px bg-[#E2DDD8]" />
              )}
              <div
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-[3.5rem] font-normal text-[#111111] leading-none"
              >
                {stat.number}
              </div>
              <div className="text-[13px] uppercase tracking-[0.1em] text-[#5A5A5A] mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
