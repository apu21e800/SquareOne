import Link from "next/link"

export default function VaporBlastingBand() {
  const benefits = [
    { label: "No Silica Dust", icon: "✓" },
    { label: "Zero Mess", icon: "✓" },
    { label: "Mobile to Your Site", icon: "✓" },
  ]

  const applications = [
    "Road Marking Removal",
    "Graffiti Removal",
    "Surface Prep",
    "Smoke Damage",
    "Marine Surfaces",
    "Brick & Stone",
  ]

  return (
    <section className="relative w-full py-20 bg-[#32373C] overflow-hidden">
      {/* Subtle diagonal texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Orange accent bar — top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D66620] via-[#F0A04B] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-5">
              Our Differentiator
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.04] mb-6">
              Mobile<br />Vapor<br />Blasting
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-lg">
              Surface prep done right — before the beauty begins. We bring
              controlled, dustless vapor blasting directly to your job site.
              No silica hazard, no heavy setup, no mess left behind.
            </p>

            {/* Benefit pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {benefits.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 bg-[#D66620]/15 border border-[#D66620]/30 text-white text-sm font-semibold px-4 py-2 rounded-full"
                >
                  <span className="text-[#D66620]">{b.icon}</span>
                  {b.label}
                </span>
              ))}
            </div>

            {/* Applications list */}
            <div className="mb-10">
              <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-4">
                Applications
              </p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                {applications.map((app) => (
                  <div key={app} className="flex items-center gap-2.5">
                    <div className="w-1 h-1 bg-[#D66620] rounded-full flex-shrink-0" />
                    <span className="text-white/85 text-sm">{app}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/contact">
              <button className="bg-[#D66620] hover:bg-[#C05A18] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Request Vapor Blasting
              </button>
            </Link>
          </div>

          {/* Right: Orange accent panel */}
          <div className="relative">
            <div className="relative h-80 lg:h-[440px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#D66620]/20 to-[#32373C] border border-[#D66620]/20">
              {/* Large decorative "V" mark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[180px] font-black leading-none select-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(214,102,32,0.12), rgba(214,102,32,0.04))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                  VB
                </div>
              </div>
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D66620]/10 rounded-bl-[60px]" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <p className="text-white font-bold text-base mb-1">
                    The cleanest surface prep available.
                  </p>
                  <p className="text-white/75 text-sm leading-relaxed">
                    Used by municipalities removing old road markings before new
                    installations — and by property managers tackling graffiti.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
