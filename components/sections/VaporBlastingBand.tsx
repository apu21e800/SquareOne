import Link from "next/link"

export default function VaporBlastingBand() {
  const features: { label: string; right: string }[] = [
    { label: "Concrete & stone restoration",  right: "Pre-coating preparation" },
    { label: "Industrial equipment cleaning", right: "Heritage surface work" },
    { label: "Patio & hardscape refresh",     right: "Automotive & marine" },
  ]

  return (
    <section className="w-full border-t border-white/5">
      <div className="grid md:grid-cols-2">

        {/* Left: Dark content panel */}
        <div className="bg-[#1C2026] px-10 py-16 lg:px-16 lg:py-20 flex flex-col justify-center">
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
            Exclusive Capability
          </span>

          <h2 className="mt-4 text-white font-light">
            Surface restoration<br />
            nobody else in BC<br />
            does better.
          </h2>

          <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-md">
            Vapor blasting uses a pressurised mix of water and fine abrasive media to
            clean and restore surfaces with zero heat stress. The result: factory-fresh
            texture with no media embedment. We brought this technology to BC because
            we believe preparation is as important as installation.
          </p>

          {/* Feature grid — 2 cols */}
          <div className="mt-8 grid grid-cols-2 gap-y-3 gap-x-8">
            {features.flatMap((f, i) => [
              <div
                key={`l-${i}`}
                className="flex items-center gap-2 text-white/80 text-sm"
              >
                <span className="text-[#C8601A]">✓</span> {f.label}
              </div>,
              <div
                key={`r-${i}`}
                className="flex items-center gap-2 text-white/80 text-sm"
              >
                <span className="text-[#C8601A]">✓</span> {f.right}
              </div>,
            ])}
          </div>

          <div className="mt-10">
            <Link
              href="/vapor-blasting"
              className="border border-white/30 text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:border-white hover:bg-white/10 inline-block"
            >
              Learn About Vapor Blasting →
            </Link>
          </div>
        </div>

        {/* Right: Before/after visual panel */}
        <div className="relative min-h-[400px] md:min-h-[560px] bg-[#0D1117] flex items-center justify-center overflow-hidden">
          {/* Background atmosphere */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 60% 40%, rgba(40,100,130,0.3) 0%, transparent 70%)",
            }}
          />

          {/* Simple before/after visual */}
          <div className="relative w-full h-full flex items-end pb-8">
            {/* Before half */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 flex items-end justify-start p-6">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(60,50,40,0.8), rgba(40,30,20,0.6))",
                }}
              />
              <span className="relative text-white/30 text-[10px] font-bold uppercase tracking-widest">
                Before
              </span>
            </div>
            {/* After half */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-end justify-end p-6">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(100,90,75,0.4), rgba(80,70,55,0.3))",
                }}
              />
              <span className="relative text-[#C8601A] text-[10px] font-bold uppercase tracking-widest">
                After
              </span>
            </div>
            {/* Divider line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#C8601A]/60" />
          </div>

          {/* Badge overlay */}
          <div className="absolute top-6 left-6 border border-white/15 text-white/70 text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5">
            BC Exclusive Service
          </div>
        </div>
      </div>
    </section>
  )
}
