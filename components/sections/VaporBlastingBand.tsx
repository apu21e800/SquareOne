import Image from "next/image"
import Link from "next/link"

export default function VaporBlastingBand() {
  const benefits = [
    { label: "No Silica Dust" },
    { label: "Zero Chemical Runoff" },
    { label: "Mobile to Your Site" },
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
    <section className="relative w-full py-20 bg-[#1C2226] overflow-hidden">
      {/* Orange accent bar — top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D66620] via-[#F0A04B] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <div>
            <p className="text-[#F0A04B] text-xs uppercase tracking-[0.22em] font-bold mb-5">
              Our Differentiator
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.04] mb-6">
              Mobile<br />Vapor<br />Blasting
            </h2>
            <p className="text-white/75 text-lg mb-8 leading-relaxed max-w-lg">
              Surface prep done right — before the beauty begins. We bring
              controlled, dustless vapor blasting directly to your job site.
              No silica hazard, no heavy setup, no mess left behind.
            </p>

            {/* Benefit pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {benefits.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-white text-sm font-semibold px-4 py-2.5 rounded-full"
                >
                  <span className="w-4 h-4 rounded-full bg-[#D66620] flex items-center justify-center flex-shrink-0">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  {b.label}
                </span>
              ))}
            </div>

            {/* Applications list */}
            <div className="mb-10">
              <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">
                Applications
              </p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                {applications.map((app) => (
                  <div key={app} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#D66620] rounded-full flex-shrink-0" />
                    <span className="text-white/80 text-sm">{app}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact">
                <button className="bg-[#D66620] hover:bg-[#C05A18] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                  Book a Site Assessment
                </button>
              </Link>
              <Link href="/services/vapor-blasting">
                <button className="border border-white/20 text-white hover:bg-white/8 px-8 py-4 rounded-lg font-semibold text-sm transition-colors">
                  Learn More →
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Visual panel — water/teal atmosphere + process steps */}
          <div className="relative">
            {/* Main visual card */}
            <div
              className="relative h-80 lg:h-[460px] rounded-2xl overflow-hidden border border-white/10"
              style={{ background: "linear-gradient(135deg, #0F2A35 0%, #1A3F4F 50%, #0D1F2A 100%)" }}
            >
              {/* Water shimmer */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "radial-gradient(ellipse at 30% 50%, rgba(42,107,124,0.8) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(26,63,79,0.6) 0%, transparent 50%)",
              }} />

              {/* Wave lines at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 opacity-15">
                <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0,30 C100,50 200,10 300,30 C350,40 380,20 400,30 L400,80 L0,80 Z" fill="white" />
                  <path d="M0,45 C100,65 200,25 300,45 C350,55 380,35 400,45 L400,80 L0,80 Z" fill="white" opacity="0.5" />
                </svg>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-7">
                {/* Top: label */}
                <div>
                  <span className="inline-block bg-white/10 border border-white/15 text-white/80 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    Vapor Blasting · BC Exclusive
                  </span>
                </div>

                {/* Center: large stat */}
                <div className="text-center">
                  <p className="text-[80px] lg:text-[100px] font-black text-white/10 leading-none select-none">VB</p>
                </div>

                {/* Bottom: key claim */}
                <div className="bg-black/35 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <p className="text-[#F0A04B] text-xs font-bold uppercase tracking-widest mb-2">The Process</p>
                  <p className="text-white font-bold text-base leading-snug mb-1">
                    Clean surface. Clear results.
                  </p>
                  <p className="text-white/65 text-sm leading-relaxed">
                    Water + abrasive media removes markings, coatings, and contamination without silica dust or chemical runoff.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating stat pill */}
            <div className="absolute -top-4 -right-4 bg-[#D66620] rounded-xl px-4 py-3 shadow-xl">
              <p className="text-white font-black text-lg leading-none">Zero</p>
              <p className="text-white/80 text-[10px] font-semibold uppercase tracking-wider mt-0.5">Silica Dust</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
