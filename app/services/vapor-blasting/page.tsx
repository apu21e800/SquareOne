import Link from "next/link"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Vapor Blasting",
  description:
    "BC's mobile vapor blasting service. Surface prep, road marking removal, graffiti, and coating removal across Lower Mainland and Vancouver Island.",
  slug: "services/vapor-blasting",
})

const steps = [
  {
    number: "01",
    name: "Assess",
    description:
      "We evaluate the surface, identify contaminants, and select the right abrasive media.",
  },
  {
    number: "02",
    name: "Blast",
    description:
      "Controlled water-abrasive mixture removes markings, coatings, and contaminants precisely.",
  },
  {
    number: "03",
    name: "Inspect",
    description:
      "Surface is cleaned, containment removed. You get a clean, bondable, ready-to-coat surface.",
  },
]

const applications = [
  {
    icon: "🛣️",
    title: "Road Marking Removal",
    description: "Old lane markings removed before new installations",
  },
  {
    icon: "🎨",
    title: "Graffiti Removal",
    description: "Graffiti cleaned from concrete, brick, steel",
  },
  {
    icon: "🔧",
    title: "Surface Preparation",
    description: "Pre-treatment for decorative coating systems",
  },
  {
    icon: "🔥",
    title: "Smoke & Fire Damage",
    description: "Soot and smoke residue from structures",
  },
  {
    icon: "⚓",
    title: "Marine Surfaces",
    description: "Hull cleaning and coating prep for vessels",
  },
  {
    icon: "🧱",
    title: "Brick & Stone Cleaning",
    description: "Heritage and commercial masonry restoration",
  },
]

const specs = [
  { label: "Silica Dust", value: "None — wet process eliminates dust" },
  { label: "Water Usage", value: "Recirculated, minimal waste" },
  { label: "Mobility", value: "Self-contained unit, mobile across BC" },
  { label: "Surfaces", value: "Asphalt, concrete, brick, steel, marine" },
  {
    label: "Certifications",
    value: "Certified & insured for all surface types",
  },
  { label: "Service Area", value: "Lower Mainland + Vancouver Island" },
]

export default function VaporBlastingPage() {
  return (
    <main>
      {/* Section 1: Hero */}
      <section className="bg-gradient-to-b from-[#0F2A35] via-[#1A3F4F] to-[#0D1F2A] pt-36 pb-24 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#4ECDC4] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Mobile Vapor Blasting BC
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.04] mb-6 whitespace-pre-line">
            {"Clean Surface.\nClear Results."}
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mb-10">
            Before any decorative surface installation — or after years of
            grime, graffiti, and wear — comes the clean. Our mobile vapor
            blasting system arrives at your job site, removes what doesn&apos;t
            belong, and leaves behind a surface ready for what&apos;s next.
          </p>
          <div className="flex flex-wrap gap-3">
            {["No Silica Dust", "Zero Chemicals", "Mobile to Your Site"].map(
              (pill) => (
                <span
                  key={pill}
                  className="bg-white/10 border border-white/20 text-white text-sm px-5 py-3 rounded-full"
                >
                  {pill}
                </span>
              )
            )}
          </div>

          {/* Water ripple accent */}
          <div className="mt-16 flex justify-center opacity-20">
            <svg
              width="240"
              height="60"
              viewBox="0 0 240 60"
              fill="none"
              aria-hidden="true"
            >
              <ellipse
                cx="120"
                cy="30"
                rx="115"
                ry="25"
                stroke="#4ECDC4"
                strokeWidth="1.5"
              />
              <ellipse
                cx="120"
                cy="30"
                rx="80"
                ry="16"
                stroke="#4ECDC4"
                strokeWidth="1.5"
              />
              <ellipse
                cx="120"
                cy="30"
                rx="42"
                ry="8"
                stroke="#4ECDC4"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section className="bg-white py-24 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F2A35] text-center mb-16">
            How Vapor Blasting Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#4ECDC4] flex items-center justify-center mb-5">
                  <span className="text-[#0F2A35] text-lg font-black">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0F2A35] mb-3">
                  {step.name}
                </h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Applications Grid */}
      <section className="bg-[#F2EFE9] py-24 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F2A35] text-center mb-16">
            What We Remove
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div
                key={app.title}
                className="bg-white rounded-xl p-7 shadow-sm"
              >
                <span className="text-3xl mb-4 block" aria-hidden="true">
                  {app.icon}
                </span>
                <h3 className="text-lg font-bold text-[#0F2A35] mb-2">
                  {app.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {app.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Technical Specs */}
      <section className="bg-[#0F2A35] py-24 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-16">
            Technical Specifications
          </h2>
          <div className="divide-y divide-white/10">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="grid grid-cols-2 gap-6 py-5"
              >
                <span className="text-[#4ECDC4] font-semibold text-sm">
                  {spec.label}
                </span>
                <span className="text-white/70 text-sm">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="bg-gradient-to-b from-[#0D1F2A] to-[#0F2A35] py-24 px-6 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready for a cleaner surface?
          </h2>
          <p className="text-white/60 text-lg mb-10">
            One call books a site assessment.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#0F2A35] hover:bg-[#F2EFE9] px-10 py-4 rounded-lg font-bold transition-colors"
          >
            Book a Site Assessment
          </Link>
        </div>
      </section>
    </main>
  )
}
