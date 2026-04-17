import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Decorative Driveways | Metro Vancouver & Victoria | Square One Paving",
  description:
    "Stamped asphalt and StreetBond driveways installed across Metro Vancouver and Victoria since 2000. Pattern, colour, and texture — engineered for BC freeze-thaw.",
  keywords: [
    "stamped asphalt driveway Vancouver",
    "stamped asphalt driveway Victoria",
    "decorative driveway BC",
    "Vancouver driveways",
    "Victoria driveways",
    "StreetPrint driveway",
    "StreetBond driveway coating",
    "residential driveway paving BC",
    "Metro Vancouver driveway installer",
    "Vancouver Island driveway contractor",
  ],
  alternates: {
    canonical: "https://squareonepaving.com/driveways",
  },
  openGraph: {
    title: "Decorative Driveways | Metro Vancouver & Victoria",
    description:
      "Stamped asphalt and StreetBond driveways installed across Metro Vancouver and Victoria. Engineered for BC freeze-thaw. Free site visits.",
    url: "https://squareonepaving.com/driveways",
    type: "website",
  },
}

const processSteps = [
  {
    n: "01",
    title: "Site visit",
    body: "We walk the driveway. Check the base, read the drainage, flag what matters before a product is selected.",
  },
  {
    n: "02",
    title: "Specification",
    body: "Pattern, colour, and product — chosen to suit the house. StreetPrint or StreetBond, with a written quote and a schedule.",
  },
  {
    n: "03",
    title: "Single-day install",
    body: "Standard residential driveways go down in one day. Cure overnight. Drive on within 24 hours in most conditions.",
  },
  {
    n: "04",
    title: "Season-one check-in",
    body: "We come back the following spring to inspect edges, joints, and colour retention. If something moved, we address it.",
  },
]

const products = [
  {
    name: "StreetPrint Stamped Asphalt",
    eyebrow: "Pattern & Texture",
    body: "Ashlar slate, herringbone, cobblestone, and running-bond brick — stamped into fresh asphalt. Structurally asphalt. Visually hardscape. 15–20 year service life.",
    image: "/images/products/streetprint/streetprint-1.jpg",
  },
  {
    name: "StreetBond Colour Coating",
    eyebrow: "Colour & Finish",
    body: "Premium coating system applied over sound existing asphalt. Slip-resistant, UV-stable, and available in dozens of colours. Recoat cycle every 7–10 years.",
    image: "/images/products/streetbond/streetbond-red-waterfront-promenade-01.jpg",
  },
]

const gallery = [
  "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
  "/images/applications/private-driveways/chilliwack-townhomes-brick-driveway-01.jpg",
  "/images/applications/private-driveways/craftsman-home-charcoal-herringbone-driveway-01.jpg",
  "/images/applications/private-driveways/luxury-grey-gated-driveway-01.jpg",
]

export default function DrivewaysPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="w-full bg-white">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] min-h-[80vh]">
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-20 py-16 md:py-24">
            <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-5">
              Serving Metro Vancouver &amp; Victoria
            </p>
            <h1
              className="text-[#111111] mb-0"
              style={{
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.5rem, 5vw, 4.75rem)",
              }}
            >
              Driveways that hold<br />through BC winters.
            </h1>
            <div className="w-12 h-[3px] bg-[#C8601A] my-6" />
            <p className="text-lg font-light text-[#5A5A5A] max-w-md leading-relaxed">
              Stamped asphalt and StreetBond coatings for residential and strata
              driveways across the Lower Mainland and Vancouver Island. Installed
              in a single day. Engineered for freeze-thaw, UV, and rain that doesn&apos;t quit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Link href="/contact">
                <button className="w-full sm:w-auto bg-[#1C2026] hover:bg-black text-white px-7 py-3.5 text-sm font-semibold tracking-[0.08em] uppercase rounded-none transition-colors">
                  Request a Site Visit
                </button>
              </Link>
              <a href="tel:16043098212">
                <button className="w-full sm:w-auto border border-[#1C2026] text-[#1C2026] hover:bg-[#1C2026] hover:text-white px-7 py-3.5 text-sm font-semibold tracking-[0.08em] uppercase rounded-none transition-colors">
                  604-309-8212
                </button>
              </a>
            </div>
          </div>

          <div className="relative min-h-[400px] md:min-h-0">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8601A] z-10" />
            <Image
              src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
              alt="Stamped asphalt driveway — West Vancouver, installed by Square One Paving"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="w-full bg-[#F6F4F0] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="max-w-2xl mb-14">
            <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
              Process
            </p>
            <h2
              className="text-[#111111]"
              style={{
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontSize: "clamp(1.8rem, 3vw, 3rem)",
              }}
            >
              Four steps. No surprises.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E2DDD8]">
            {processSteps.map((step) => (
              <div key={step.n} className="bg-[#F6F4F0] p-8">
                <p
                  className="text-[#C8601A] mb-5"
                  style={{
                    fontFamily: "var(--font-playfair), ui-serif, Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.75rem",
                    lineHeight: 1,
                  }}
                >
                  {step.n}
                </p>
                <h3 className="text-[#111111] text-base font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-[#5A5A5A] text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="w-full bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="max-w-2xl mb-14">
            <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
              Systems
            </p>
            <h2
              className="text-[#111111]"
              style={{
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontSize: "clamp(1.8rem, 3vw, 3rem)",
              }}
            >
              Two products. Chosen to fit the home.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <div
                key={p.name}
                className="border border-[#E2DDD8] flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-[#EDE9E3]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                <div className="p-8">
                  <p className="text-[#C8601A] text-xs uppercase tracking-[0.18em] font-semibold mb-3">
                    {p.eyebrow}
                  </p>
                  <h3
                    className="text-[#111111] mb-4"
                    style={{ fontWeight: 600, fontSize: "1.25rem" }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-[#5A5A5A] text-sm leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="w-full bg-[#F6F4F0] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="max-w-2xl mb-14">
            <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
              Installed
            </p>
            <h2
              className="text-[#111111]"
              style={{
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontSize: "clamp(1.8rem, 3vw, 3rem)",
              }}
            >
              Driveways across BC.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {gallery.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden bg-[#EDE9E3]"
              >
                <Image
                  src={src}
                  alt={`Decorative driveway installation ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local SEO */}
      <section className="w-full bg-white py-20 sm:py-24 border-t border-[#E2DDD8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
                Metro Vancouver
              </p>
              <h3
                className="text-[#111111] mb-5"
                style={{ fontWeight: 500, fontSize: "1.35rem" }}
              >
                Vancouver driveways — Lower Mainland coverage.
              </h3>
              <p className="text-[#5A5A5A] leading-relaxed text-base mb-4">
                West Vancouver. North Vancouver. Burnaby. Coquitlam. Port Moody.
                New Westminster. Richmond. Surrey. Langley. White Rock. Maple
                Ridge. Pitt Meadows.
              </p>
              <p className="text-[#5A5A5A] leading-relaxed text-base">
                Driveway installs across the full Lower Mainland, from hillside
                estates to strata refreshes. Free site visits within a 90-minute
                drive of downtown Vancouver.
              </p>
            </div>
            <div>
              <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
                Vancouver Island
              </p>
              <h3
                className="text-[#111111] mb-5"
                style={{ fontWeight: 500, fontSize: "1.35rem" }}
              >
                Victoria driveways — Island-wide coverage.
              </h3>
              <p className="text-[#5A5A5A] leading-relaxed text-base mb-4">
                Victoria. Saanich. Oak Bay. Langford. Colwood. Sidney. Duncan.
                Ladysmith. Nanaimo. Parksville. Courtenay. Comox.
              </p>
              <p className="text-[#5A5A5A] leading-relaxed text-base">
                Our Vancouver Island crew is based out of Ladysmith. Coverage
                from Victoria north to the Comox Valley. Written quotes,
                honest timelines.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-[#E2DDD8] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h3
                className="text-[#111111] mb-3"
                style={{ fontWeight: 500, fontSize: "1.5rem" }}
              >
                Book a driveway site visit.
              </h3>
              <p className="text-[#5A5A5A] leading-relaxed">
                Free, no-pressure walkthrough. You&apos;ll leave with a written
                quote and a realistic schedule.
              </p>
            </div>
            <Link href="/contact">
              <button className="bg-[#1C2026] hover:bg-black text-white px-8 py-4 text-sm font-semibold tracking-[0.08em] uppercase rounded-none transition-colors">
                Request a Quote
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
