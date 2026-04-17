import Image from "next/image"
import Link from "next/link"

export default function VaporBlastingBand() {
  return (
    <section className="relative w-full bg-[#1C2026] py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-5">
              Signature Service
            </p>
            <h2
              className="text-white mb-6"
              style={{
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              Vapor blasting.<br />Mobile across BC.
            </h2>
            <div className="w-12 h-[2px] bg-[#C8601A] mb-6" />
            <p className="text-white/70 text-base leading-relaxed mb-4 max-w-md">
              Wet-abrasive surface prep and marking removal, brought directly to
              the job site. No silica dust. No chemical runoff. No heavy setup
              left behind.
            </p>
            <p className="text-white/70 text-base leading-relaxed mb-10 max-w-md">
              Used by municipalities, general contractors, and property managers
              from Vancouver to Victoria.
            </p>
            <Link
              href="/vapor-blasting"
              className="inline-flex items-center gap-2 text-[#C8601A] hover:text-[#E58B3D] text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
            >
              Learn about vapor blasting
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden bg-[#242A32]">
            <Image
              src="/images/products/durashield/durashield-parking-lot-sealcoat-01.jpg"
              alt="Mobile vapor blasting by Square One Paving"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8601A]" />
          </div>
        </div>
      </div>
    </section>
  )
}
