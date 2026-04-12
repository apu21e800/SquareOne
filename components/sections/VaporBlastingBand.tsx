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
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D66620] via-[#F0A04B] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Content */}
          <div>
            <p className="text-[#F0A04B] text-xs uppercase tracking-[0.22em] font-bold mb-5">
              Our Differentiator
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.04] mb-6">
              Mobile<br />Vapor<br />Blasting
            </h2>
            <p className="text-white/70 text-base lg:text-lg mb-8 leading-relaxed max-w-lg">
              Surface prep done right — before the beauty begins. We bring
              controlled, dustless vapor blasting directly to your job site.
              No silica hazard, no heavy setup, no mess left behind.
            </p>

            {/* Benefit chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              {benefits.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 bg-white/8 border border-white/12 text-white/90 text-sm font-semibold px-4 py-2.5 rounded-full"
                >
                  <span className="w-4 h-4 rounded-full bg-[#D66620] flex items-center justify-center flex-shrink-0">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {b.label}
                </span>
              ))}
            </div>

            {/* Applications list */}
            <div className="mb-10">
              <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-4">
                Applications
              </p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                {applications.map((app) => (
                  <div key={app} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#D66620] rounded-full flex-shrink-0" />
                    <span className="text-white/75 text-sm">{app}</span>
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
              <Link href="/vapor-blasting">
                <button className="border border-white/20 text-white hover:bg-white/8 px-8 py-4 rounded-lg font-semibold text-sm transition-colors">
                  Learn More →
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Visual — vapor blasting illustration panel */}
          <div className="relative">

            {/* Main card */}
            <div
              className="relative h-[440px] lg:h-[500px] rounded-2xl overflow-hidden border border-white/10"
              style={{ background: "linear-gradient(160deg, #0A1A22 0%, #112533 55%, #0D1F2A 100%)" }}
            >

              {/* ── Atmospheric mist layers ──────────────────── */}
              {/* Deep background glow */}
              <div className="absolute inset-0" style={{
                background: "radial-gradient(ellipse 70% 50% at 60% 40%, rgba(40,100,130,0.35) 0%, transparent 70%)",
              }} />

              {/* Surface plane at bottom — light warm concrete */}
              <div className="absolute bottom-0 left-0 right-0" style={{ height: "38%" }}>
                {/* Concrete surface */}
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(90,80,65,0.0) 0%, rgba(90,80,65,0.45) 40%, rgba(70,60,50,0.7) 100%)" }}
                />
                {/* Surface texture lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                  {/* Horizontal surface lines (perspective) */}
                  {[0, 0.18, 0.36, 0.55, 0.74, 0.9].map((y, i) => (
                    <line key={i}
                      x1="0" y1={y * 160} x2="400" y2={y * 160}
                      stroke="rgba(255,255,255,0.07)" strokeWidth="1"
                    />
                  ))}
                  {/* Dirty/marked surface left half */}
                  <rect x="0" y="0" width="190" height="160" fill="rgba(80,65,45,0.3)" />
                  {/* Clean surface right half */}
                  <rect x="210" y="0" width="190" height="160" fill="rgba(160,145,120,0.15)" />
                  {/* Dividing treatment line */}
                  <line x1="200" y1="0" x2="200" y2="160" stroke="#D66620" strokeWidth="2" strokeDasharray="6 4" />
                </svg>

                {/* Before / After labels */}
                <div className="absolute bottom-4 left-6 text-white/40 text-[10px] font-bold uppercase tracking-widest">Before</div>
                <div className="absolute bottom-4 right-6 text-[#F0A04B] text-[10px] font-bold uppercase tracking-widest">After</div>
              </div>

              {/* ── Mist cone from nozzle ──────────────────── */}
              <div className="absolute" style={{ top: "12%", left: "40%", width: "55%", height: "55%" }}>
                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                  {/* Mist cone */}
                  <path d="M20,10 L180,80 L180,140 L20,90 Z"
                    fill="url(#mistGrad)" opacity="0.22" />
                  {/* Mist particles — scattered dots */}
                  {[
                    [60, 50],[90,40],[120,55],[150,70],[80,80],[110,90],[140,85],
                    [70,110],[100,100],[130,95],[160,105],[85,130],[115,120],
                    [145,115],[50,70],[45,85],[55,95],
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 2.5 : 1.5}
                      fill="rgba(200,230,255,0.55)" />
                  ))}
                  {/* Fine mist lines */}
                  <line x1="20" y1="20" x2="170" y2="85" stroke="rgba(200,230,255,0.15)" strokeWidth="1" />
                  <line x1="20" y1="50" x2="175" y2="110" stroke="rgba(200,230,255,0.12)" strokeWidth="1" />
                  <line x1="20" y1="75" x2="178" y2="132" stroke="rgba(200,230,255,0.10)" strokeWidth="1" />
                  <defs>
                    <linearGradient id="mistGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                      <stop offset="100%" stopColor="rgba(200,230,255,0)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* ── Machine / nozzle icon ──────────────────── */}
              <div className="absolute" style={{ top: "8%", left: "28%" }}>
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  {/* Hose body */}
                  <path d="M15,60 Q20,40 30,35 L55,25" stroke="rgba(255,255,255,0.5)"
                    strokeWidth="6" strokeLinecap="round" />
                  {/* Nozzle tip */}
                  <path d="M55,25 L68,18" stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round" />
                  <ellipse cx="70" cy="17" rx="5" ry="3" fill="rgba(240,160,75,0.8)" transform="rotate(-30 70 17)" />
                  {/* Trigger grip */}
                  <rect x="28" y="32" width="14" height="18" rx="3" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                  <rect x="32" y="42" width="6" height="8" rx="1" fill="rgba(214,102,32,0.7)" />
                </svg>
              </div>

              {/* ── Top badge ──────────────────────────────── */}
              <div className="absolute top-5 left-5">
                <span className="inline-block bg-white/10 border border-white/15 text-white/80 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  BC Exclusive Service
                </span>
              </div>

              {/* ── Process descriptor card ────────────────── */}
              <div className="absolute bottom-5 left-5 right-5 bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-white/8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#D66620]/20 border border-[#D66620]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 10C4 6 6 4 10 3" stroke="#F0A04B" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="10.5" cy="2.5" r="1.5" stroke="#F0A04B" strokeWidth="1" />
                      <path d="M3 12c2-1 4-1 8 0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#F0A04B] text-[10px] font-bold uppercase tracking-widest mb-1">How It Works</p>
                    <p className="text-white font-bold text-sm leading-snug">Water + media. Zero silica.</p>
                    <p className="text-white/55 text-xs mt-1 leading-relaxed">
                      Removes markings, coatings & contamination without dust or chemicals — mobile to any BC site.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Floating stat pill */}
            <div className="absolute -top-4 -right-4 bg-[#D66620] rounded-xl px-4 py-3 shadow-xl shadow-[#D66620]/30">
              <p className="text-white font-black text-lg leading-none">Zero</p>
              <p className="text-white/80 text-[10px] font-semibold uppercase tracking-wider mt-0.5">Silica Dust</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
