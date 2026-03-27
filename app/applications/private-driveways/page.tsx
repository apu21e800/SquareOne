import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import FAQAccordion from "./FAQAccordion"

export const metadata: Metadata = {
  title: "Decorative Driveways | Square One Paving",
  description:
    "Transform your driveway with decorative stamped asphalt. StreetBond patterns, 20+ year lifespan, BC's most trusted residential paving specialist since 2000.",
}

export default function PrivateDrivewaysPage() {
  return (
    <main>
      {/* ── Section 1: Hero ── */}
      <section className="relative min-h-[75vh] flex flex-col justify-end pb-20 pt-40 px-6 sm:px-12 overflow-hidden">
        <Image
          src="/images/products/streetbond/streetbond-dark-red-brick-pattern-driveway-01.jpg"
          fill
          alt="Decorative driveway"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-[#F0A04B] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Residential Decorative Paving
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.04] mb-6 whitespace-pre-line">
            {"Your Driveway.\nReimagined."}
          </h1>
          <p className="text-white/70 text-lg max-w-lg mb-10">
            BC's most trusted decorative pavement team transforms asphalt
            driveways into lasting first impressions.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-8 py-4 rounded-lg font-bold tracking-wide transition-colors"
          >
            Get a Free Driveway Consultation
          </Link>
        </div>
      </section>

      {/* ── Section 2: Why Upgrade ── */}
      <section className="bg-white py-20 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D2D2D] text-center mb-12">
            Why Upgrade Your Driveway?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Card 1: Curb Appeal */}
            <div className="bg-white border border-[#E8E4DE] rounded-2xl p-8 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D66620"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
                  <path d="M9 21V12h6v9" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                Curb Appeal
              </h3>
              <p className="text-[#626262] text-sm leading-relaxed">
                First impressions matter. A decorative driveway elevates your
                home's exterior and stands out on the block.
              </p>
            </div>

            {/* Card 2: 20+ Year Lifespan */}
            <div className="bg-white border border-[#E8E4DE] rounded-2xl p-8 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D66620"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 7 12 12 15.5 12" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                20+ Year Lifespan
              </h3>
              <p className="text-[#626262] text-sm leading-relaxed">
                Our stamped asphalt systems are engineered for BC climates —
                freeze-thaw resistant and snowplow safe.
              </p>
            </div>

            {/* Card 3: Property Value */}
            <div className="bg-white border border-[#E8E4DE] rounded-2xl p-8 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D66620"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                Property Value
              </h3>
              <p className="text-[#626262] text-sm leading-relaxed">
                A quality driveway installation adds measurable value. Style
                that works for you every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Product Showcase ── */}
      <section className="bg-[#F2EFE9] py-20 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D2D2D] mb-10">
            Driveway Pattern Options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Left card: Herringbone */}
            <div className="relative h-72 rounded-2xl overflow-hidden">
              <Image
                src="/images/applications/private-driveways/craftsman-home-charcoal-herringbone-driveway-01.jpg"
                fill
                alt="Charcoal herringbone driveway"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-white font-bold text-lg leading-tight">
                  Herringbone Brick
                </p>
                <p className="text-white/75 text-sm mt-1">
                  Classic pattern, timeless appeal
                </p>
              </div>
            </div>

            {/* Right card: Estate */}
            <div className="relative h-72 rounded-2xl overflow-hidden">
              <Image
                src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
                fill
                alt="Estate driveway"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-white font-bold text-lg leading-tight">
                  Estate Pattern
                </p>
                <p className="text-white/75 text-sm mt-1">
                  Premium look for larger driveways
                </p>
              </div>
            </div>
          </div>
          <p className="text-[#626262] text-sm text-center mt-6">
            Dozens of patterns available. We custom-design your driveway in your
            preferred style and colours.
          </p>
        </div>
      </section>

      {/* ── Section 4: How It Works ── */}
      <section className="bg-white py-20 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D2D2D] text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "1",
                title: "Consultation",
                description:
                  "We visit your property, assess the current surface, and discuss design options.",
              },
              {
                number: "2",
                title: "Design",
                description:
                  "You choose your pattern, colour, and finish. We prepare a detailed scope and quote.",
              },
              {
                number: "3",
                title: "Installation",
                description:
                  "Our crew installs with precision — typically completed in 1–2 days.",
              },
              {
                number: "4",
                title: "Reveal",
                description:
                  "Your transformed driveway is ready. Built to last 20+ years in BC conditions.",
              },
            ].map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#D66620] flex items-center justify-center mb-4 shrink-0">
                  <span className="text-white font-black text-lg">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-bold text-[#2D2D2D] mb-2">{step.title}</h3>
                <p className="text-[#626262] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Social Proof Strip ── */}
      <section className="bg-[#32373C] py-8 px-6 sm:px-12">
        <p className="text-white/70 text-sm uppercase tracking-[0.2em] text-center">
          Trusted by BC homeowners since 2000 — over 500 residential projects
          installed
        </p>
      </section>

      {/* ── Section 6: FAQ ── */}
      <section className="bg-white py-20 px-6 sm:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D2D2D] text-center mb-12">
            Common Questions
          </h2>
          <FAQAccordion />
        </div>
      </section>

      {/* ── Section 7: CTA ── */}
      <section className="bg-[#D66620] py-20 px-6 sm:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Ready to Transform Your Driveway?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Free consultation. No obligation. BC's most trusted applicator since
            2000.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#D66620] hover:bg-[#F2EFE9] px-10 py-4 rounded-lg font-bold transition-colors"
          >
            Get a Free Consultation
          </Link>
        </div>
      </section>
    </main>
  )
}
