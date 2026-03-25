import Link from "next/link"

export default function VaporBlastingBand() {
  const applications = [
    "Road Marking Removal",
    "Graffiti Removal",
    "Surface Prep",
    "Smoke Damage",
    "Marine Surfaces",
    "Brick & Stone",
  ]

  return (
    <section className="relative w-full py-20 bg-[#2D2D2D] overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest">
            Featured Service
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              The Differentiator.
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Vapor blasting is controlled, precise surface removal. Unlike
              traditional sandblasting, our mobile system uses water and
              abrasive — no harsh chemicals, no environmental hazard. We're the
              choice for municipalities removing old road markings before new
              installations, property managers tackling graffiti, and
              contractors prepping surfaces.
            </p>

            <div className="mb-8">
              <p className="text-sm font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
                Applications
              </p>
              <div className="grid grid-cols-2 gap-4">
                {applications.map((app, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#E8581A] rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-white">{app}</p>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/services/vapor-blasting">
              <button className="bg-[#E8581A] hover:bg-[#d44f16] text-white px-6 py-3 rounded-lg font-semibold transition">
                Request a Demo
              </button>
            </Link>
          </div>

          {/* Right: Image placeholder */}
          <div className="h-80 lg:h-96 bg-gradient-to-br from-[#E8581A]/20 to-[#4A7C9E]/20 rounded-2xl flex items-center justify-center border border-[#E8581A]/20">
            <div className="text-center">
              <p className="text-white/40 text-sm">
                Vapor Blasting in Action
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
