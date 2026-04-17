import Image from "next/image"
import Link from "next/link"

const applications = [
  "Concrete & stone",
  "Pre-coating prep",
  "Industrial equipment",
  "Heritage surfaces",
  "Patio refresh",
  "Automotive & marine",
]

export default function VaporBlastingBand() {
  return (
    <section className="bg-[#1C2026]">
      <div className="grid md:grid-cols-[40fr_60fr]">

        {/* Left: content panel */}
        <div className="p-10 lg:p-20 flex items-center">
          <div className="max-w-md">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#C8601A] font-medium mb-6">
              Exclusive Capability
            </p>

            <h2 className="text-white font-light mb-6 tracking-[-0.02em]">
              Surface restoration nobody else in BC does better.
            </h2>

            <p className="text-white/60 text-[15px] leading-relaxed mb-8 font-light">
              Vapor blasting uses pressurised water and fine abrasive media to clean
              surfaces at the microscopic level. No heat stress. No media embedment.
              We brought this to BC because the surfaces we install deserve better
              than sandblasting.
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-10">
              {applications.map((a) => (
                <div key={a} className="flex items-start gap-2 text-white/80 text-sm leading-relaxed">
                  <span className="text-[#C8601A] flex-shrink-0 mt-0.5">✓</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>

            <Link
              href="/vapor-blasting"
              className="inline-flex items-center border border-white/30 text-white px-8 py-4 text-xs font-semibold tracking-[0.08em] uppercase hover:bg-white hover:text-[#1C2026] hover:border-white transition-colors"
            >
              Learn About Vapor Blasting →
            </Link>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[640px] bg-[#242A32]">
          <Image
            src="/images/applications/commercial-spaces/granville-island-installation-crew-01.jpg"
            alt="Vapor blasting surface preparation"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>

      </div>
    </section>
  )
}
