import Image from "next/image"
import Link from "next/link"

const benefits = [
  "StreetPrint patterns matched to your architecture",
  "Engineered for BC freeze-thaw performance",
  "Installed in days, lasts decades",
  "Local crews, no subcontractors",
]

export default function DrivewaysBand() {
  return (
    <section className="bg-white">
      <div className="grid md:grid-cols-2">

        {/* Left: image */}
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[640px] bg-[#EDE9E3]">
          <Image
            src="/images/applications/private-driveways/craftsman-home-charcoal-herringbone-driveway-01.jpg"
            alt="Residential driveway — BC craftsman home"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right: content panel */}
        <div className="bg-[#F6F4F0] p-10 lg:p-20 flex items-center">
          <div className="max-w-lg">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#C8601A] font-medium mb-6">
              Residential · Vancouver &amp; Victoria
            </p>

            <h2 className="text-[#111111] mb-6">
              Your driveway is the first impression.
            </h2>

            <p className="text-[#5A5A5A] text-[15px] leading-relaxed mb-8 font-light">
              In Vancouver and Victoria, where architecture defines the Pacific Northwest,
              your approach should match your home&apos;s interior. We install stamped asphalt
              driveways that hold through BC winters and improve with age.
            </p>

            <ul className="space-y-3 mb-10">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="relative pl-5 text-sm text-[#2C2C2C] leading-relaxed border-l-[2px] border-[#C8601A]"
                >
                  {b}
                </li>
              ))}
            </ul>

            <Link
              href="/driveways"
              className="inline-flex items-center bg-[#1C2026] text-white px-8 py-4 text-xs font-semibold tracking-[0.08em] uppercase hover:bg-[#111111] transition-colors"
            >
              Explore Driveways →
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
