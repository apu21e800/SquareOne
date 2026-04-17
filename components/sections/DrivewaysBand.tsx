import Link from "next/link"

export default function DrivewaysBand() {
  const benefits = [
    "StreetPrint patterns matched to your architecture",
    "Engineered for BC freeze-thaw performance",
    "Installed in days, lasts decades",
    "Local crews, no subcontractors",
  ]

  return (
    <section className="w-full border-t border-[#E2DDD8]">
      <div className="grid md:grid-cols-2">

        {/* Left: Image placeholder */}
        <div className="relative min-h-[400px] md:min-h-[560px] bg-[#EDE9E3]">
          {/* Gradient overlay for visual interest */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D5D0C8] to-[#B8B0A4]" />
          {/* Architectural grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "repeating-linear-gradient(0deg, #1C2026 0px, #1C2026 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, #1C2026 0px, #1C2026 1px, transparent 1px, transparent 48px)"
          }} />
          <div className="absolute bottom-6 left-6 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/60">
            West Vancouver · Stamped Asphalt
          </div>
        </div>

        {/* Right: Content on warm bg */}
        <div className="bg-[#F6F4F0] px-10 py-16 lg:px-16 lg:py-20 flex flex-col justify-center">
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
            Residential · Vancouver &amp; Victoria
          </span>

          <h2 className="mt-4 text-[#111111]">
            Your driveway is<br />
            the first impression.
          </h2>

          <p className="mt-6 text-[#5A5A5A] text-lg leading-relaxed max-w-md">
            In Vancouver and Victoria, where architecture sets the standard for the Pacific Northwest,
            your approach should reflect the same care as your home&apos;s interior. We design and install
            stamped asphalt driveways that hold their integrity through BC winters and look better with age.
          </p>

          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <div className="w-[3px] self-stretch bg-[#C8601A] flex-shrink-0 mt-1" />
                <span className="text-sm text-[#5A5A5A] leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/driveways"
              className="bg-[#1C2026] text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-[#C8601A] inline-block"
            >
              Explore Driveways →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
