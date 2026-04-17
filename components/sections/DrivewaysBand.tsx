import Image from "next/image"
import Link from "next/link"

export default function DrivewaysBand() {
  return (
    <section className="w-full bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#EDE9E3]">
            <Image
              src="/images/products/streetbond/streetbond-1.jpg"
              alt="Decorative driveway installed by Square One Paving"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>

          <div>
            <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
              Residential Driveways
            </p>
            <h2
              className="text-[#111111] mb-6"
              style={{
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontSize: "clamp(1.8rem, 3vw, 2.75rem)",
              }}
            >
              Driveways that hold through BC winters.
            </h2>
            <div className="w-12 h-[2px] bg-[#C8601A] mb-6" />
            <p className="text-[#5A5A5A] text-base leading-relaxed mb-6 max-w-md">
              Stamped asphalt and StreetBond coatings for residential and strata
              driveways across the Lower Mainland and Vancouver Island. Installed
              in a single day. Engineered for freeze-thaw, UV, and the kind of rain
              that doesn&apos;t quit.
            </p>
            <p className="text-[#5A5A5A] text-base leading-relaxed mb-10 max-w-md">
              Pattern, texture, and colour — selected to match the house, not
              overwhelm it.
            </p>
            <Link
              href="/driveways"
              className="inline-flex items-center gap-2 text-[#C8601A] hover:text-[#A84F15] text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
            >
              Learn about driveways
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
