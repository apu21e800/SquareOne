import Image from "next/image"
import Link from "next/link"

export default function DrivewayCTA() {
  return (
    <section className="w-full py-24 bg-[#F2EFE9]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-5">
              Residential Services
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#333333] leading-tight mb-6">
              Elevate Your Home&apos;s<br />First Impression
            </h2>
            <p className="text-[#626262] text-lg leading-relaxed mb-8 max-w-md">
              Transform your driveway into a signature statement. Decorative
              stamped asphalt and StreetBond coatings bring colour, texture,
              and lasting beauty to residential properties across BC.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="inline-flex items-center gap-2 bg-white border border-[#D66620]/25 text-[#333333] text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                <span className="w-2 h-2 bg-[#D66620] rounded-full" />
                Decorative Driveways
              </span>
              <span className="inline-flex items-center gap-2 bg-white border border-[#D66620]/25 text-[#333333] text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                <span className="w-2 h-2 bg-[#D66620] rounded-full" />
                Lasting 20+ Years
              </span>
              <span className="inline-flex items-center gap-2 bg-white border border-[#D66620]/25 text-[#333333] text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                <span className="w-2 h-2 bg-[#D66620] rounded-full" />
                BC-Wide Service
              </span>
            </div>

            <Link href="/contact">
              <button className="bg-[#D66620] hover:bg-[#C05A18] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Get a Driveway Quote
              </button>
            </Link>
          </div>

          {/* Right: Product image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/products/streetbond/streetbond-1.jpg"
                alt="Decorative StreetBond driveway installation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-5 py-3 shadow-lg border border-[#E8E4DE]">
              <p className="text-[#D66620] font-black text-lg leading-none">25+</p>
              <p className="text-[#626262] text-xs uppercase tracking-widest font-semibold mt-0.5">
                Years Installing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
