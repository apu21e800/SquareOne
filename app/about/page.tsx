import Link from "next/link"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "About Square One Paving",
  description:
    "BC's trusted decorative pavement applicator since 2000. Authorized HUB Surface Systems partner serving the Lower Mainland and Vancouver Island.",
  slug: "about",
})

const differentiators = [
  {
    title: "BC Climate Expertise",
    desc: "All our systems are designed and tested for BC's unique conditions — wet winters, freeze-thaw cycles, and UV exposure.",
  },
  {
    title: "Authorized Applicator",
    desc: "Square One is an authorized HUB Surface Systems applicator, backed by manufacturer warranties and certified training.",
  },
  {
    title: "Lower Mainland + Island",
    desc: "We serve the entire Lower Mainland, Vancouver Island, and surrounding BC communities — with mobile vapor blasting equipment.",
  },
  {
    title: "25+ Years Experience",
    desc: "Since 2000, we've been installing decorative pavement systems for municipalities, developers, and contractors across BC.",
  },
  {
    title: "Full Service",
    desc: "From surface prep (vapor blasting) to installation — we handle the entire project lifecycle under one roof.",
  },
  {
    title: "Vision Zero Aligned",
    desc: "Our crosswalk and bike lane systems support BC's Vision Zero goals with high-visibility, retroreflective, and durable solutions.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F5F3F0]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
            About Square One Paving
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D2D2D] mb-6 max-w-3xl">
            BC&apos;s Trusted Decorative Pavement Applicators
          </h1>
          <p className="text-lg text-[#8B8680] max-w-2xl">
            Since 2000, Square One Paving has been the partner BC municipalities,
            developers, and contractors call when a surface needs to perform —
            and look good doing it. From crosswalks in Vancouver to parking
            markings on the Island, our work is designed to last.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-[#8B8680]">
                <p>
                  Square One Paving was founded with a simple goal: bring
                  high-quality decorative pavement systems to BC communities.
                  Too often, municipalities and developers were limited to
                  generic paint solutions that faded quickly in BC&apos;s wet
                  climate.
                </p>
                <p>
                  We partnered with HUB Surface Systems to bring their proven
                  product portfolio to Western Canada — stamped asphalt,
                  decorative coatings, preformed thermoplastic, and more. Each
                  system is engineered for Canadian conditions and backed by
                  manufacturer warranties.
                </p>
                <p>
                  Today, Square One operates across the Lower Mainland and
                  Vancouver Island, serving municipalities, TransLink, BC
                  Transit, developers, and contractors. Our vapor blasting
                  equipment is mobile — we come to you.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-[#2D2D2D] border-l-4 border-[#E8581A] pl-6 mb-6">
                &ldquo;Build surfaces that perform as good as they look — and
                last.&rdquo;
              </p>
              <p className="text-[#8B8680]">
                We believe that BC&apos;s public spaces deserve better than
                fading paint and cracking concrete. Our decorative pavement
                systems combine aesthetics with durability — crosswalks that
                stay bright, bike lanes that stay visible, and surfaces that
                hold up to BC&apos;s climate year after year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Square One */}
      <section className="py-20 px-6 sm:px-8 bg-[#F5F3F0]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2D2D2D] mb-12">
            Why Square One
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((d) => (
              <div key={d.title} className="bg-white rounded-xl p-8 shadow-md">
                <div className="w-10 h-1 bg-[#E8581A] mb-5" />
                <h3 className="font-bold text-lg text-[#2D2D2D] mb-3">
                  {d.title}
                </h3>
                <p className="text-sm text-[#8B8680]">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-6 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2D2D2D] mb-10">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F5F3F0] rounded-xl p-8">
              <div className="w-full h-1 bg-[#E8581A] mb-6 rounded" />
              <p className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-3">
                Service Area
              </p>
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
                Lower Mainland & Vancouver Island
              </h3>
              <p className="text-sm text-[#8B8680] mb-6">
                We serve communities across British Columbia, including
                Vancouver, Surrey, Burnaby, Richmond, Victoria, Nanaimo, and
                surrounding areas.
              </p>
              <div className="flex flex-wrap gap-2">
                {["BC", "Lower Mainland", "Vancouver Island"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1 rounded bg-[#E8581A]/10 text-[#E8581A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-[#F5F3F0] rounded-xl p-8">
              <div className="w-full h-1 bg-[#E8581A] mb-6 rounded" />
              <p className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-3">
                Contact
              </p>
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
                Square One Paving
              </h3>
              <div className="space-y-2 text-sm text-[#8B8680]">
                <p>Ladysmith, British Columbia</p>
                <a
                  href="mailto:info@squareonepaving.ca"
                  className="block hover:text-[#E8581A] transition"
                >
                  info@squareonepaving.ca
                </a>
                <a
                  href="tel:6043098212"
                  className="block hover:text-[#E8581A] transition"
                >
                  604-309-8212
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 sm:px-8 bg-[#2D2D2D]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to start a project?
          </h2>
          <p className="text-white/70 mb-10">
            Get a free consultation for your next BC surface project.
          </p>
          <Link href="/contact">
            <button className="bg-[#E8581A] hover:bg-[#d44f16] text-white px-10 py-4 rounded-lg font-semibold text-lg transition">
              Request a Quote
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
