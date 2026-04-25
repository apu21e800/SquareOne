import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Square One Paving | BC's Decorative Pavement Specialists",
  description:
    "BC's trusted decorative pavement studio since 2000. Serving the Lower Mainland and Vancouver Island.",
}

const differentiators = [
  {
    title: "BC Climate Expertise",
    desc: "All our systems are designed and tested for BC's unique conditions — wet winters, freeze-thaw cycles, and UV exposure.",
    icon: "◈",
  },
  {
    title: "Certified Installation Training",
    desc: "Every crew member is trained and certified on the decorative pavement systems we install — backed by manufacturer warranties and 25 years of field experience.",
    icon: "◉",
  },
  {
    title: "Lower Mainland + Island",
    desc: "We serve the entire Lower Mainland, Vancouver Island, and surrounding BC communities — with mobile vapor blasting equipment.",
    icon: "▧",
  },
  {
    title: "25+ Years Experience",
    desc: "Since 2000, we've been installing decorative pavement systems for municipalities, developers, and contractors across BC.",
    icon: "◌",
  },
  {
    title: "Full Service Capability",
    desc: "From surface prep (vapor blasting) to final installation — we handle the entire project lifecycle under one roof.",
    icon: "◈",
  },
  {
    title: "Vision Zero Aligned",
    desc: "Our crosswalk and bike lane systems support BC's Vision Zero goals with high-visibility, retroreflective, and durable solutions.",
    icon: "◉",
  },
]

const timeline = [
  { year: "2000", event: "Square One Paving founded in BC" },
  { year: "2005", event: "Added professional decorative pavement systems to portfolio" },
  { year: "2012", event: "Expanded to Vancouver Island operations" },
  { year: "2018", event: "Added mobile vapor blasting service" },
  { year: "2024", event: "100+ municipal and commercial projects completed" },
]

export default function AboutPage() {
  return (
    <main className="bg-[#FAFAFA]">

      {/* Hero */}
      <section className="bg-white border-b border-[#E8E4DE] pt-28 pb-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">
            About Square One Paving
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-[#333333] mb-5 max-w-3xl leading-tight">
            BC&apos;s Trusted Decorative Pavement Specialists
          </h1>
          <p className="text-lg text-[#626262] max-w-2xl leading-relaxed">
            Since 2000, Square One Paving has been the partner BC municipalities, developers, and contractors
            call when a surface needs to perform — and look good doing it.
          </p>
        </div>
      </section>

      {/* Story + Mission */}
      <section className="py-20 px-6 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-4">Our Story</p>
              <div className="space-y-4 text-[#626262] leading-relaxed text-sm">
                <p>
                  Square One Paving was founded with a simple goal: bring
                  high-quality decorative pavement systems to BC communities.
                  Too often, municipalities and developers were limited to
                  generic paint solutions that faded quickly in BC&apos;s wet
                  climate.
                </p>
                <p>
                  Over 25 years we&apos;ve built a portfolio of professional
                  decorative pavement systems — stamped asphalt, decorative
                  coatings, preformed thermoplastic, and vapor blasting. Each
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

              {/* Timeline */}
              <div className="mt-10">
                <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-5">Milestones</p>
                <div className="space-y-3">
                  {timeline.map((item) => (
                    <div key={item.year} className="flex items-start gap-4">
                      <span className="text-[#D66620] font-black text-sm w-10 flex-shrink-0">{item.year}</span>
                      <div className="flex-1 flex items-start gap-3 pt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#D66620] mt-1 flex-shrink-0" />
                        <p className="text-[#626262] text-sm">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {/* Mission quote */}
              <div className="bg-[#F2EFE9] rounded-2xl p-8 mb-8 border border-[#E8E4DE]">
                <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-4">Our Mission</p>
                <blockquote className="text-xl font-black text-[#333333] leading-snug border-l-4 border-[#D66620] pl-6">
                  &ldquo;Build surfaces that perform as good as they look — and last.&rdquo;
                </blockquote>
                <p className="text-[#626262] text-sm leading-relaxed mt-5">
                  We believe BC&apos;s public spaces deserve better than fading paint and cracking concrete.
                  Our decorative pavement systems combine aesthetics with durability — crosswalks that
                  stay bright, bike lanes that stay visible, and surfaces that hold up year after year.
                </p>
              </div>

              {/* Hero image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/products/streetprint/streetprint-1.jpg"
                  alt="Square One Paving work"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="text-white text-sm font-bold">StreetPrint Stamped Asphalt</span>
                  <p className="text-white/70 text-xs mt-0.5">Lower Mainland, BC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Square One */}
      <section className="py-20 px-6 sm:px-8 bg-[#F2EFE9]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">Our Difference</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#333333]">Why Square One</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((d) => (
              <div key={d.title} className="bg-white rounded-2xl p-7 border border-[#E8E4DE] hover:shadow-lg transition-shadow">
                <span className="text-[#D66620] text-2xl block mb-4">{d.icon}</span>
                <div className="w-6 h-1 bg-[#D66620] rounded mb-4" />
                <h3 className="font-black text-base text-[#333333] mb-3">{d.title}</h3>
                <p className="text-sm text-[#626262] leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service area + contact */}
      <section className="py-20 px-6 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F2EFE9] rounded-2xl p-8 border border-[#E8E4DE]">
              <div className="h-1 w-12 bg-[#D66620] rounded mb-5" />
              <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">Service Area</p>
              <h3 className="text-2xl font-black text-[#333333] mb-4">Lower Mainland &amp; Vancouver Island</h3>
              <p className="text-sm text-[#626262] leading-relaxed mb-6">
                We serve communities across BC — Vancouver, Surrey, Burnaby, Richmond,
                Victoria, Nanaimo, Ladysmith, and surrounding areas. Mobile vapor blasting
                equipment goes wherever the job is.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Greater Vancouver", "Fraser Valley", "Sunshine Coast", "Vancouver Island", "Gulf Islands"].map((tag) => (
                  <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#E8E4DE] text-[#626262]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#32373C] rounded-2xl p-8">
              <div className="h-1 w-12 bg-[#D66620] rounded mb-5" />
              <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">Contact Us</p>
              <h3 className="text-2xl font-black text-white mb-4">Square One Paving</h3>
              <div className="space-y-3 text-sm mb-8">
                <p className="text-white/75">Ladysmith, British Columbia</p>
                <a href="tel:6043098212" className="block text-white hover:text-[#F0A04B] transition-colors font-semibold">
                  604-309-8212
                </a>
                <a href="mailto:info@squareonepaving.com" className="block text-white/70 hover:text-white transition-colors">
                  info@squareonepaving.com
                </a>
              </div>
              <Link href="/contact">
                <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-7 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                  Get a Free Quote
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 sm:px-8 bg-[#32373C]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F0A04B] text-xs uppercase tracking-[0.22em] font-semibold mb-5">Ready to Start?</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Start a Project With Us
          </h2>
          <p className="text-white/75 text-lg mb-10">
            Free consultation for your next BC surface project — no pressure, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Request a Free Quote
              </span>
            </Link>
            <Link href="/projects">
              <span className="inline-block border border-white/25 text-white hover:bg-white/10 px-10 py-4 rounded-lg font-semibold text-sm transition-colors">
                View Our Projects
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
