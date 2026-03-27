import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Square One Paving | BC Surface Specialists Since 2000",
  description:
    "Square One Paving — BC's most trusted decorative pavement applicators since 2000. Authorized HUB Surface Systems applicator serving the Lower Mainland and Vancouver Island.",
}

const values = [
  {
    title: "Quality",
    description:
      "We don't cut corners. Every installation follows manufacturer specs, and we're not done until the surface is right.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-[#D66620]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
  },
  {
    title: "Reliability",
    description:
      "When we say we'll be there Monday at 7am, we're there. BC municipalities and developers trust us to execute on schedule.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-[#D66620]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
  },
  {
    title: "Community",
    description:
      "We're BC-based and BC-focused. We understand the local climate, local specs, and local expectations.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-[#D66620]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
  },
]

const serviceAreas = [
  "Greater Vancouver",
  "North Shore",
  "Burnaby & New Westminster",
  "Surrey & Fraser Valley",
  "Langley & Abbotsford",
  "Vancouver Island (Victoria to Campbell River)",
  "Whistler & Sea-to-Sky",
  "BC Interior (on request)",
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Section 1: Hero */}
      <section className="bg-[#F2EFE9] pt-36 pb-20 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#D66620] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            BC&apos;s Surface Specialists
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#333333] leading-[1.04] mb-6">
            Trusted Since
            <br />
            2000.
          </h1>
          <p className="text-[#626262] text-xl max-w-2xl">
            Square One Paving started with a simple mission: install decorative
            pavement with the craft and care it deserves. Over 25 years later,
            we&apos;ve done it 500+ times across British Columbia.
          </p>
        </div>
      </section>

      {/* Section 2: Story */}
      <section className="bg-white py-20 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <p className="text-[#D66620] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-8">
                Built on BC Roads Since 2000
              </h2>
              <div className="space-y-5 text-[#626262] text-base leading-relaxed">
                <p>
                  Square One Paving was founded in Ladysmith, BC, with the
                  belief that decorated roads should do more than look good —
                  they should last. We started installing StreetPrint and
                  StreetBond systems when decorative asphalt was still a niche
                  concept in Canada.
                </p>
                <p>
                  Today, we&apos;re Western Canada&apos;s most experienced HUB
                  Surface Systems applicator. From crosswalks in downtown
                  Vancouver to driveway replacements on the Sunshine Coast,
                  we&apos;ve installed decorative surfaces across BC.
                </p>
                <p>
                  We added vapor blasting to our service offering because we
                  realized the best decorative surface starts with the best
                  prepared surface. Now we&apos;re the only contractor in BC
                  that can remove your old markings and install your new ones.
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative h-full min-h-[400px]">
              <Image
                src="/images/hero/hero-1.jpg"
                alt="Square One Paving crew"
                fill
                className="object-cover rounded-l-[32px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Three Values */}
      <section className="bg-[#F2EFE9] py-20 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-12">
            What We Stand For
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8E4DE]"
              >
                <div className="mb-5">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#333333] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#626262] text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Service Area */}
      <section className="bg-white py-20 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-6">
                Serving All of BC
              </h2>
              <p className="text-[#626262] text-base leading-relaxed">
                Our base is Ladysmith on Vancouver Island, but our work is
                everywhere. We regularly deploy to the Lower Mainland, Greater
                Vancouver, and throughout BC.
              </p>
            </div>

            {/* Right: Area list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceAreas.map((area) => (
                <div key={area} className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-[#D66620] mt-0.5 shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#333333] text-sm">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Partnership Band */}
      <section className="bg-[#32373C] py-20 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#D66620] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Our Manufacturer Partner
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            Authorized HUB Surface Systems Applicator
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-10">
            HUB Surface Systems is the manufacturer behind StreetPrint,
            StreetBond, TrafficPatterns, DecoMark, and a full line of decorative
            pavement products trusted by municipalities across North America. As
            an authorized applicator, we receive ongoing technical training,
            product support, and warranty backing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white/10 text-white text-sm font-semibold px-5 py-2.5 rounded-full border border-white/20">
              Western Canada Coverage
            </span>
            <span className="bg-white/10 text-white text-sm font-semibold px-5 py-2.5 rounded-full border border-white/20">
              Certified Installation Partner
            </span>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="bg-[#D66620] py-20 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Tell us about your project and we&apos;ll get back to you within one
            business day.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#D66620] hover:bg-[#F2EFE9] px-10 py-4 rounded-lg font-bold transition-colors"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </main>
  )
}
