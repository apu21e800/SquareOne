import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mobile Vapor Blasting BC | Surface Prep & Removal",
  description: "BC's mobile vapor blasting specialists. Graffiti removal, road marking removal, surface prep — no silica dust, no mess. Lower Mainland & Vancouver Island.",
}

const applications = [
  { title: "Road Marking Removal", desc: "Remove old thermoplastic, paint, or epoxy markings before new installations.", icon: "⬡" },
  { title: "Graffiti Removal", desc: "Clean concrete, brick, and asphalt surfaces without chemical damage.", icon: "◎" },
  { title: "Surface Prep", desc: "Prepare asphalt and concrete for new coatings or decorative applications.", icon: "◈" },
  { title: "Smoke & Fire Damage", desc: "Restore surfaces after smoke damage — commercial and municipal.", icon: "◉" },
  { title: "Marine Surfaces", desc: "Clean steel, fibreglass, and composite surfaces — dockside or mobile.", icon: "◌" },
  { title: "Brick & Stone Cleaning", desc: "Deep clean heritage brick, natural stone, and concrete block.", icon: "◧" },
]

const specs = [
  { label: "Dust Control", value: "Water-controlled — no silica hazard" },
  { label: "Mobility", value: "Fully mobile to your BC job site" },
  { label: "Surfaces", value: "Asphalt, concrete, brick, steel, marine" },
  { label: "Service Area", value: "Lower Mainland + Vancouver Island" },
  { label: "Certification", value: "Certified & fully insured" },
  { label: "Turnaround", value: "Faster than grinding or sandblasting" },
]

const steps = [
  { num: "01", title: "Site Assessment", desc: "We assess the surface type, contamination level, and surrounding environment to determine the right approach and media." },
  { num: "02", title: "Setup & Containment", desc: "We establish containment zones, protect surrounding surfaces, and configure the mobile vapor blasting unit on-site." },
  { num: "03", title: "Vapor Blast", desc: "Controlled water-and-abrasive blasting removes markings, coatings, or contamination cleanly — no silica dust, no harsh chemicals." },
  { num: "04", title: "Inspect & Clear", desc: "We inspect the surface, clean the zone, and confirm it's ready for whatever comes next — new coatings, thermoplastic, or bare surface." },
]

export default function VaporBlastingPage() {
  return (
    <main className="bg-[#FAFAFA]">

      {/* Hero — deep teal water feel */}
      <section className="relative w-full min-h-[72vh] flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0F2A35 0%, #1A3F4F 50%, #0D1F2A 100%)" }}>
        {/* Animated water shimmer */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(ellipse at 30% 50%, rgba(42,107,124,0.6) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(26,63,79,0.8) 0%, transparent 50%)",
        }} />
        {/* Wave lines */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
          <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,120 L0,120 Z" fill="white" />
            <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,40 1440,60 L1440,120 L0,120 Z" fill="white" opacity="0.5" />
          </svg>
        </div>

        {/* Orange top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C85A3A] via-[#C85A3A] to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 py-24">
          <div className="max-w-2xl">
            <p className="text-[#C85A3A] text-xs uppercase tracking-[0.25em] font-semibold mb-5">
              Mobile Vapor Blasting · BC
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.04] mb-6">
              Clean Surface.<br />Clear Results.
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-lg">
              Surface prep done right — before the beauty begins. We bring controlled, dustless vapor blasting directly to your job site. No silica hazard. No mess. Just a clean surface ready for what comes next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <span className="inline-block bg-[#C85A3A] hover:bg-[#B74D2E] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                  Book a Site Assessment
                </span>
              </Link>
              <a href="tel:6043098212">
                <span className="inline-block border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-sm transition-colors">
                  604-309-8212
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Floating spec badges */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3">
          {["No Silica Dust", "Zero Mess", "Mobile to Site", "Certified & Insured"].map((badge) => (
            <span key={badge} className="bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-semibold px-4 py-2.5 rounded-full">
              ✓ {badge}
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <p className="text-[#C85A3A] text-xs uppercase tracking-[0.22em] font-semibold mb-3">The Process</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#333333]">How It Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <div className="text-6xl font-black text-[#C85A3A]/10 leading-none mb-3">{step.num}</div>
                <div className="w-8 h-1 bg-[#C85A3A] rounded mb-4" />
                <h3 className="text-lg font-black text-[#333333] mb-2">{step.title}</h3>
                <p className="text-[#626262] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="w-full py-24 bg-[#F2EFE9]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="mb-14">
            <p className="text-[#C85A3A] text-xs uppercase tracking-[0.22em] font-semibold mb-3">What We Remove</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#333333]">Applications</h2>
            <div className="mt-4 h-px bg-gradient-to-r from-[#C85A3A]/40 to-transparent" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {applications.map((app) => (
              <div key={app.title} className="bg-white rounded-xl p-6 border border-[#E8E4DE] hover:border-[#C85A3A]/30 hover:shadow-md transition-all">
                <span className="text-2xl text-[#C85A3A] block mb-3">{app.icon}</span>
                <h3 className="text-base font-black text-[#333333] mb-2">{app.title}</h3>
                <p className="text-[#626262] text-sm leading-relaxed">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical specs */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C85A3A] text-xs uppercase tracking-[0.22em] font-semibold mb-3">The Details</p>
            <h2 className="text-4xl font-black text-[#333333]">Technical Specs</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#E8E4DE]">
            {specs.map((spec, i) => (
              <div key={spec.label} className={`flex items-start gap-6 px-8 py-5 ${i % 2 === 0 ? "bg-[#F2EFE9]" : "bg-white"}`}>
                <span className="text-[#626262] text-sm font-semibold w-36 flex-shrink-0">{spec.label}</span>
                <span className="text-[#333333] text-sm font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24" style={{ background: "linear-gradient(135deg, #0F2A35 0%, #1A3F4F 60%, #0D1F2A 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#C85A3A] text-xs uppercase tracking-[0.22em] font-semibold mb-5">Ready to Start?</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Book a Free Site Assessment</h2>
          <p className="text-white/75 text-lg mb-10 leading-relaxed">
            Tell us what you need removed. We&apos;ll come to your site, assess the surface, and give you a clear quote — no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-[#C85A3A] hover:bg-[#B74D2E] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Book Assessment
              </span>
            </Link>
            <a href="tel:6043098212">
              <span className="inline-block border border-white/25 text-white hover:bg-white/10 px-10 py-4 rounded-lg font-semibold text-sm transition-colors">
                604-309-8212
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
