import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import Container from "@/components/ui/Container"

export const metadata: Metadata = {
  title: "About Us | BC's Decorative Pavement Specialists Since 2000 | Square One Paving",
  description:
    "Jan Stewart and the Square One team have been BC's go-to decorative pavement applicators since 2000 — HUB Surface Systems certified, serving Metro Vancouver, Fraser Valley, and Vancouver Island.",
  keywords: [
    "Square One Paving BC",
    "Jan Stewart paving contractor BC",
    "HUB Surface Systems certified BC",
    "decorative pavement contractor BC",
  ],
  alternates: { canonical: "https://squareonepaving.ca/about" },
  openGraph: {
    title: "About Us | BC's Decorative Pavement Specialists Since 2000 | Square One Paving",
    description:
      "Jan Stewart and the Square One team have been BC's go-to decorative pavement applicators since 2000.",
  },
}

const principles = [
  { num: "01", title: "BC climate, by design", body: "Every system we install is specified for BC weather — wet winters, freeze-thaw cycles, marine UV. The right product on the wrong climate is a five-year repair bill." },
  { num: "02", title: "No subcontractors", body: "Same crew since 2000. The applicators on your job have ten-plus years of HUB Surface Systems experience. We don't sub out the install." },
  { num: "03", title: "Two bases, one province", body: "Metro Vancouver and Vancouver Island offices. Most BC projects don't need a travel budget. Mobile vapor blasting equipment goes anywhere the job is." },
  { num: "04", title: "Municipal discipline, residential care", body: "We build to Vision Zero, Complete Streets, and AODA standards on civic projects — then bring the same discipline to a private driveway." },
  { num: "05", title: "Warrantied systems", body: "StreetBond, TrafficPatterns, StreetPrint — all carry 8+ year manufacturer performance warranties when properly installed. We install them properly." },
  { num: "06", title: "End-to-end accountability", body: "Surface prep through final cure. One company, one phone number, one accountable team. From the site walk to the eight-year inspection." },
]

const timeline = [
  { year: "2000", event: "Square One Paving founded in BC" },
  { year: "2005", event: "First StreetPrint stamped asphalt installations" },
  { year: "2012", event: "Vancouver Island operations launched" },
  { year: "2018", event: "Mobile vapor blasting service added" },
  { year: "2024", event: "100+ municipal and commercial projects completed" },
  { year: "2026", event: "51+ BC communities served" },
]

const clients: string[] = [
  "City of Vancouver", "City of Victoria", "TransLink", "BC Transit", "City of Richmond", "Burnaby",
  "Coquitlam", "Nanaimo", "Surrey", "Langley", "UBC", "BC Housing", "District of Saanich",
  "Capital Regional District", "Sechelt", "White Rock", "Kelowna", "Mission",
]

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0">
          <Image src="/images/products/streetbond/streetbond-coloured-plaza-art-mural-01.jpg" alt="Square One Paving — BC public realm streetscape" fill priority sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.55)] via-[rgba(10,10,10,0.45)] to-[rgba(10,10,10,0.92)]" />
          <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)" }} />
        </div>
        <Container className="relative z-10 w-full pt-32 pb-20 lg:pb-28">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-7">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-semibold">About</span>
              <span className="hidden sm:block w-px h-3 bg-white/20" />
              <span className="hidden sm:block text-[10.5px] uppercase tracking-[0.18em] text-white/55 font-medium">Square One Paving Ltd.</span>
            </div>
            <h1 className="text-white display-h" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
              The same crew,<br />
              <span className="italic font-extralight text-white/95">the same standard,</span>{" "}
              <span className="text-[#F26430]">since 2000.</span>
            </h1>
            <p className="text-white/75 text-base lg:text-xl mt-8 max-w-2xl leading-[1.65] font-light">
              Jan Stewart and the Square One team have spent 25 years installing decorative pavement across British Columbia &mdash; one specialism, one province, no subcontractors.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#F26430] font-semibold">Our Story</p>
              </div>
              <h2 className="text-[#0A0A0A] display-h mb-8" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)" }}>
                One specialism, done deeply.
              </h2>
              <div className="space-y-5 text-[#2C2C2C] leading-[1.75] text-[15.5px] font-light">
                <p>Square One Paving was founded with a simple thesis: BC communities deserve better than fading paint and cracking concrete. Too often, municipalities and developers were defaulting to generic surfacing that didn&apos;t survive the first wet winter.</p>
                <p>Over twenty-five years we&apos;ve built a portfolio around four professional decorative pavement systems &mdash; stamped asphalt, decorative coatings, preformed thermoplastic, and vapor blasting. Each system is engineered for Canadian conditions and backed by manufacturer warranties.</p>
                <p>Today Square One operates from Maple Ridge, with crews serving every municipality and authority south of Prince George. TransLink, BC Transit, UBC, the cities, the school districts, the strata councils, the families. The mobile vapor blasting unit goes wherever the surface is.</p>
              </div>
              <div className="mt-12">
                <p className="text-[10.5px] uppercase tracking-[0.28em] text-[#F26430] font-bold mb-6">Milestones</p>
                <ol className="space-y-0 border-t border-[#E2DDD8]">
                  {timeline.map((item) => (
                    <li key={item.year} className="grid grid-cols-[80px_1fr] gap-6 items-baseline border-b border-[#E2DDD8] py-4 group hover:bg-[#FAF7F4] -mx-3 px-3 transition-colors">
                      <span className="text-[#0A0A0A] font-extralight text-2xl leading-none tracking-[-0.03em]">{item.year}</span>
                      <span className="text-[#2C2C2C] text-[14.5px] leading-[1.5] font-light">{item.event}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0A0A0A] mb-8">
                <Image src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg" alt="Square One Paving — premium estate work" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.85)] via-[rgba(10,10,10,0.20)] to-transparent" />
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-[rgba(10,10,10,0.65)] backdrop-blur-md px-3.5 py-2">
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-white font-semibold">Estate Project</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-white text-[10.5px] uppercase tracking-[0.18em] font-semibold mb-2">Custom Stamped Asphalt</p>
                  <p className="text-white/70 text-[13px] font-light">Vancouver Island residential install &mdash; circular medallion driveway with brick-pattern surround.</p>
                </div>
              </div>

              <div className="relative bg-[#F6F4F0] p-9 lg:p-10 border-l-2 border-[#F26430]">
                <p className="text-[10.5px] uppercase tracking-[0.28em] text-[#F26430] font-bold mb-5">Our Mission</p>
                <blockquote className="text-[#0A0A0A] display-h leading-[1.05] tracking-[-0.025em]" style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.95rem)" }}>
                  &ldquo;Build surfaces that perform<br />
                  <span className="italic font-extralight">as good as they look</span> &mdash; and last.&rdquo;
                </blockquote>
                <p className="text-[#5A5A5A] text-[14px] leading-[1.7] mt-6 font-light">
                  Decorative pavement is the part of public infrastructure that thousands of people interact with every day, often without noticing. We notice. And we make sure it&apos;s the part of the streetscape that actually gets better with time.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative section-padding bg-[#F6F4F0] overflow-hidden">
        <div aria-hidden className="absolute -top-32 -left-32 w-[500px] h-[500px] pointer-events-none opacity-50" style={{ background: "radial-gradient(circle, rgba(242,100,48,0.07) 0%, transparent 70%)" }} />
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-end mb-14 lg:mb-20">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#F26430] font-semibold">How We Work</p>
              </div>
              <h2 className="text-[#0A0A0A] display-h" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}>
                Six principles.<br />
                <span className="italic font-extralight">No exceptions.</span>
              </h2>
            </div>
            <p className="text-[#5A5A5A] max-w-md leading-[1.7] text-[15px] lg:text-base font-light lg:mb-2">
              These are the conditions under which we&apos;ll take a project. They are not aspirational &mdash; they are operational. If we can&apos;t hit all six, the project is the wrong fit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-[#E2DDD8]">
            {principles.map((p) => (
              <div key={p.num} className="border-b border-[#E2DDD8] md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 p-7 lg:p-9 group bg-white hover:bg-[#FAF7F4] transition-colors">
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#F26430] font-bold">{p.num}</span>
                  <div className="h-px flex-1 bg-[#E2DDD8] group-hover:bg-[#F26430] transition-colors duration-500" />
                </div>
                <h3 className="text-[#0A0A0A] font-semibold text-[18px] lg:text-[19px] leading-[1.2] tracking-[-0.005em] mb-3">{p.title}</h3>
                <p className="text-[#5A5A5A] text-[13.5px] leading-[1.65] font-light">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="text-center mb-12">
            <p className="text-[10.5px] uppercase tracking-[0.32em] text-[#F26430] font-bold mb-4">Trusted Across BC</p>
            <h2 className="text-[#0A0A0A] display-h max-w-3xl mx-auto" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)" }}>
              The cities that build BC, build with us.
            </h2>
          </div>
          <div className="ticker-mask overflow-hidden border-y border-[#E2DDD8] py-6">
            <div className="ticker-track">
              {[...clients, ...clients].map((name, i) => (
                <span key={i} className="flex items-center whitespace-nowrap px-7 text-[14.5px] text-[#2C2C2C] font-medium tracking-[-0.005em]">
                  {name}
                  <span className="mx-7 w-1 h-1 rounded-full bg-[#F26430] opacity-60" />
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative bg-[#0A0A0A] py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg" alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-25" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.92)] via-[rgba(10,10,10,0.85)] to-[rgba(10,10,10,0.95)]" />
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(242,100,48,0.14) 0%, transparent 65%)" }} />

        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-bold">Service Area</p>
              </div>
              <h3 className="text-white display-h mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
                Lower Mainland<br />
                <span className="italic font-extralight">&amp; Vancouver Island.</span>
              </h3>
              <p className="text-white/70 text-[15px] leading-[1.7] mb-8 font-light max-w-md">
                Two bases, one province. Vancouver, Surrey, Burnaby, Richmond, Victoria, Nanaimo, Ladysmith, and surrounding BC communities &mdash; mobile vapor blasting equipment goes wherever the job is.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {["Greater Vancouver", "Fraser Valley", "Sunshine Coast", "Vancouver Island", "Gulf Islands"].map((tag) => (
                  <span key={tag} className="text-[11px] uppercase tracking-[0.18em] font-semibold px-4 py-2 border border-white/15 text-white/75 bg-white/[0.03] backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-bold">Contact</p>
              </div>
              <h3 className="text-white display-h mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
                Square One Paving Ltd.
              </h3>
              <div className="space-y-4 mb-10 text-[14.5px] font-light">
                <div className="border-l border-[#F26430] pl-4">
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.22em] mb-1.5 font-semibold">Metro Vancouver</p>
                  <p className="text-white/85">505 &ndash; 20800 Lougheed Hwy</p>
                  <p className="text-white/85">Maple Ridge, BC V2X 3P2</p>
                </div>
                <div className="border-l border-[#F26430] pl-4">
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.22em] mb-1.5 font-semibold">Vancouver Island</p>
                  <p className="text-white/85">Vancouver Island</p>
                </div>
                <div className="pt-2">
                  <a href="mailto:office@squareonepaving.com" className="block text-white hover:text-[#FF8A5C] transition-colors font-medium">
                    office@squareonepaving.com
                  </a>
                  <a href="tel:+16043098212" className="block text-white/75 hover:text-white transition-colors text-[13.5px] mt-1.5">
                    604-466-9902
                  </a>
                </div>
              </div>
              <Link href="/contact" className="group inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-8 py-4 font-semibold text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:bg-[#F26430] hover:text-white transition-colors duration-300">
                Start a project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
