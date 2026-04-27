import Image from "next/image"
import Link from "next/link"

const benefits = [
  {
    title: "Lasting 20+ Years",
    desc: "Engineered for BC's freeze-thaw cycles. Sealed, protected, and built to outlast basic asphalt.",
  },
  {
    title: "Custom Patterns & Colours",
    desc: "Choose from brick, cobblestone, slate, and more — in dozens of colours matched to your home.",
  },
  {
    title: "Applied in a Single Day",
    desc: "Most residential driveways are complete in one day with minimal disruption to your property.",
  },
]

export default function DrivewayCTA() {
  return (
    <section className="w-full py-20 bg-white border-t border-[#EDEAE4]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: Content */}
          <div>
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
              Residential &amp; Strata
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#333333] leading-[1.05] mb-5">
              Decorative Driveways{" "}
              <span className="text-[#D66620]">Done Right.</span>
            </h2>
            <p className="text-[#626262] text-lg leading-relaxed mb-8 max-w-md">
              Square One is BC&apos;s most experienced decorative driveway installer. Stamped asphalt
              and StreetBond coatings that transform your home&apos;s first impression — and hold up for decades.
            </p>

            {/* Benefit list */}
            <ul className="space-y-5 mb-10">
              {benefits.map((b) => (
                <li key={b.title} className="flex gap-4">
                  <span className="mt-1 w-5 h-5 rounded-full bg-[#D66620]/12 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D66620]" />
                  </span>
                  <div>
                    <p className="text-[#333333] font-bold text-sm leading-tight mb-1">{b.title}</p>
                    <p className="text-[#626262] text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact">
                <button className="bg-[#D66620] hover:bg-[#C05A18] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                  Get a Free Driveway Quote
                </button>
              </Link>
              <Link href="/driveways">
                <button className="border border-[#D66620]/30 text-[#D66620] hover:bg-[#D66620]/5 px-8 py-4 rounded-lg font-semibold text-sm transition-colors">
                  See Driveway Options
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Product image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/products/streetbond/streetbond-1.jpg"
                alt="Decorative StreetBond driveway installation by Square One Paving"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-5 py-3 shadow-lg border border-[#E8E4DE]">
              <p className="text-[#D66620] font-black text-xl leading-none">25+</p>
              <p className="text-[#626262] text-xs uppercase tracking-widest font-semibold mt-0.5">
                Years Installing
              </p>
            </div>
            {/* Second badge */}
            <div className="absolute -top-4 -right-4 bg-[#D66620] rounded-xl px-4 py-3 shadow-lg">
              <p className="text-white font-black text-sm leading-none">BC&apos;s Most</p>
              <p className="text-white/80 text-xs font-semibold mt-0.5">Experienced</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
