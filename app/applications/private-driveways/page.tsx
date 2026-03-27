import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Decorative Driveways BC | Stamped Asphalt & StreetBond Coatings",
  description: "Transform your BC driveway with decorative stamped asphalt or StreetBond coatings. Premium residential paving by Square One — Lower Mainland & Vancouver Island.",
}

const benefits = [
  {
    title: "Curb Appeal That Lasts",
    desc: "Custom patterns, rich colours, and textures that elevate your home's exterior from the street.",
    icon: "◈",
  },
  {
    title: "20+ Year Service Life",
    desc: "Our systems are engineered for BC's wet winters and dry summers — sealed and protected against wear.",
    icon: "◉",
  },
  {
    title: "Increases Property Value",
    desc: "A premium driveway is one of the highest-ROI exterior upgrades for BC homeowners.",
    icon: "◧",
  },
]

const products = [
  {
    name: "StreetBond Coatings",
    desc: "Rich, uniform colour in dozens of tones — from warm terracotta to charcoal grey. Applied over existing asphalt. Fast, affordable, beautiful.",
    image: "/images/products/streetbond/streetbond-1.jpg",
  },
  {
    name: "StreetPrint Stamped Asphalt",
    desc: "Brick, cobblestone, and slate patterns stamped directly into asphalt. The premium choice for homeowners who want maximum visual impact.",
    image: "/images/products/streetprint/streetprint-1.jpg",
  },
]

const process = [
  { num: "01", title: "Free Consultation", desc: "We visit your property, assess your existing surface, and walk you through colour and pattern options." },
  { num: "02", title: "Custom Design", desc: "We help you choose the right product, pattern, and colour to complement your home's architecture." },
  { num: "03", title: "Professional Installation", desc: "Our certified crew installs your new driveway surface — typically in a single day with minimal disruption." },
  { num: "04", title: "The Reveal", desc: "Your new driveway is sealed, cleaned, and ready. The transformation is immediate." },
]

const faqs = [
  {
    q: "How much does a decorative driveway cost?",
    a: "Pricing depends on the size of your driveway and the product you choose. StreetBond coatings start lower, while StreetPrint stamped asphalt is our premium option. We provide free, no-obligation quotes after a site visit.",
  },
  {
    q: "How long does installation take?",
    a: "Most residential driveways are completed in a single day. StreetBond coatings cure within 24 hours. StreetPrint systems are ready for light traffic within 48 hours.",
  },
  {
    q: "How long will it last in BC's climate?",
    a: "Our systems are specifically designed for BC's freeze-thaw cycles and wet conditions. StreetBond lasts 5–8 years before recoating. StreetPrint stamped asphalt carries an 8+ year service life with proper sealing.",
  },
  {
    q: "Is it safe for snowplows and de-icing salt?",
    a: "Yes — both StreetBond and StreetPrint systems are snowplow-safe and resist de-icing chemicals. We recommend rubber-blade plows for the best long-term results.",
  },
  {
    q: "Does my existing driveway need to be replaced?",
    a: "Not necessarily. If your existing asphalt is structurally sound, we can apply StreetBond or StreetPrint directly over it, saving you significant cost. We assess this during the free consultation.",
  },
]

export default function PrivateDrivewaysPage() {
  return (
    <main className="bg-[#FAFAFA]">

      {/* Hero */}
      <section className="relative w-full min-h-[75vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/products/streetbond/streetbond-1.jpg"
            alt="Decorative StreetBond driveway"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#D66620]/15 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 pb-20 pt-40 w-full">
          <p className="text-[#F0A04B] text-xs uppercase tracking-[0.25em] font-semibold mb-5">
            Residential Decorative Paving
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.04] mb-6 max-w-2xl">
            Your Driveway.<br />Reimagined.
          </h1>
          <p className="text-white/70 text-lg max-w-lg mb-10 leading-relaxed">
            Premium decorative paving for BC homeowners. Custom colours, textures, and patterns — installed by BC&apos;s most experienced HUB applicator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Get a Free Consultation
              </span>
            </Link>
            <Link href="/projects">
              <span className="inline-block border border-white/35 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-sm transition-colors">
                See Our Work
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">Why Upgrade</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#333333]">Why BC Homeowners Choose Us</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <span className="text-3xl text-[#D66620] block mb-4">{b.icon}</span>
                <h3 className="text-lg font-black text-[#333333] mb-3">{b.title}</h3>
                <p className="text-[#626262] text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="w-full py-24 bg-[#F2EFE9]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="mb-14">
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">Our Systems</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#333333]">Choose Your Style</h2>
            <div className="mt-4 h-px bg-gradient-to-r from-[#D66620]/40 to-transparent" />
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {products.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl overflow-hidden border border-[#E8E4DE] hover:shadow-xl transition-all">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={p.image} alt={p.name} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="(max-width:1024px) 100vw, 50vw" />
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-black text-[#333333] mb-3">{p.name}</h3>
                  <p className="text-[#626262] text-sm leading-relaxed mb-5">{p.desc}</p>
                  <Link href="/contact">
                    <span className="text-[#D66620] text-xs font-bold uppercase tracking-widest hover:text-[#C05A18] transition-colors">
                      Get a Quote for This System →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">Our Process</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#333333]">From Consultation to Reveal</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step) => (
              <div key={step.num}>
                <div className="text-5xl font-black text-[#D66620]/15 leading-none mb-2">{step.num}</div>
                <div className="w-6 h-1 bg-[#D66620] rounded mb-4" />
                <h3 className="text-base font-black text-[#333333] mb-2">{step.title}</h3>
                <p className="text-[#626262] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="bg-[#D66620] py-5">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-2">
          {["Trusted by BC Homeowners Since 2000", "Authorized HUB Surface Systems Applicator", "Lower Mainland & Vancouver Island", "Free Consultations"].map((t) => (
            <span key={t} className="text-white text-xs font-semibold uppercase tracking-wider">✓ {t}</span>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <section className="w-full py-24 bg-[#F2EFE9]">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">Common Questions</p>
            <h2 className="text-4xl font-black text-[#333333]">FAQ</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-white rounded-xl border border-[#E8E4DE] overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-[#333333] text-sm list-none hover:text-[#D66620] transition-colors">
                  {faq.q}
                  <span className="text-[#D66620] font-bold text-lg ml-4 group-open:rotate-45 transition-transform inline-block">+</span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-[#626262] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 bg-[#32373C]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D66620] via-[#F0A04B] to-transparent" />
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#F0A04B] text-xs uppercase tracking-[0.22em] font-semibold mb-5">Ready to Transform Your Driveway?</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Get a Free Driveway Consultation</h2>
          <p className="text-white/60 text-lg mb-10">We&apos;ll come to your property, walk through the options, and give you a detailed quote — no pressure, no obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Book Free Consultation
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
