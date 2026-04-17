import Image from "next/image"
import Link from "next/link"

export default function DrivewaysBand() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2">

      {/* Left: Image */}
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[500px]">
        <Image
          src="/images/products/streetbond/streetbond-driveway.jpg"
          alt="Decorative residential driveway by Square One Paving"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Right: Content */}
      <div className="bg-[#F6F4F0] px-8 py-16 md:px-12 md:py-20 lg:px-16 flex flex-col justify-center">

        <span className="eyebrow">Residential · Vancouver & Victoria</span>

        <h2 className="mt-6 mb-6">
          Your driveway is<br />
          the first impression.
        </h2>

        <p className="text-[#5A5A5A] text-base leading-relaxed mb-8 max-w-lg">
          In Vancouver and Victoria, where architecture sets the standard for the Pacific Northwest,
          your approach should reflect the same care as your home's interior. We design and install
          stamped asphalt driveways that hold their integrity through BC winters and look better
          with age.
        </p>

        {/* Benefit list */}
        <div className="space-y-3 mb-10">
          {[
            "StreetPrint patterns matched to your architecture",
            "Engineered for BC freeze-thaw performance",
            "Installed in days, lasts decades",
            "Local crews, no subcontractors"
          ].map((benefit, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-[3px] h-[20px] bg-[#C8601A] flex-shrink-0 mt-0.5" />
              <p className="text-[#2C2C2C] text-sm leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>

        <Link href="/driveways">
          <button className="bg-[#1C2026] text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-[#C8601A]">
            Explore Driveways →
          </button>
        </Link>
      </div>
    </section>
  )
}
