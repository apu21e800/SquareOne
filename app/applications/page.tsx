import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Applications | Square One Paving",
  description:
    "Decorative paving and vapor blasting for driveways, patios, walkways, parking areas, and more across BC. Square One Paving — serving the Lower Mainland and Vancouver Island.",
  alternates: {
    canonical: "https://squareonepaving.com/applications",
  },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const applications = [
  {
    title: "Driveways",
    tag: "Residential",
    desc: "Custom stamped asphalt and StreetBond coatings that transform your home entrance. 20+ patterns and colours — brick, cobblestone, slate, and more.",
    image: "/images/applications/private-driveways/chilliwack-townhomes-brick-driveway-01.jpg",
    alt: "Decorative brick-pattern driveway at BC townhome complex",
    cta: "Explore Driveways",
    href: "/driveways",
    highlight: true,
  },
  {
    title: "Patios & Courtyards",
    tag: "Residential",
    desc: "Extend your living space outdoors. Rich colour and durable texture for patios, pool decks, and private courtyards — built for BC's wet climate.",
    image: "/images/applications/parks-paths/winding-park-path-streetbond-01.jpg",
    alt: "Decorative StreetBond pathway in BC park",
    cta: "Get a Quote",
    href: "/contact",
    highlight: false,
  },
  {
    title: "Walkways",
    tag: "Residential / Commercial",
    desc: "Pedestrian paths, front walkways, and access routes — stamped or coated for curb appeal and longevity. Slip-resistant finishes available.",
    image: "/images/applications/parks-paths/eagle-mural-courtyard-aerial-01.jpg",
    alt: "Decorative courtyard with aerial view of paved surface",
    cta: "Get a Quote",
    href: "/contact",
    highlight: false,
  },
  {
    title: "Parking Areas",
    tag: "Commercial",
    desc: "Durable decorative coatings and thermoplastic markings for strata, commercial, and multi-family parking lots. Stall lines, accessible markings, directional graphics.",
    image: "/images/applications/parking-lots/apartment-complex-yellow-streetprint-aerial-01.jpg",
    alt: "Aerial view of decorative parking lot with StreetPrint pattern",
    cta: "Get a Quote",
    href: "/contact",
    highlight: false,
  },
  {
    title: "Vapor Blasting",
    tag: "All Surfaces",
    desc: "Restore any surface to bare condition before coating or repair. No silica dust, no substrate damage — mobile vapor blasting anywhere in BC.",
    image: "/images/products/streetbond/streetbond-red-brick-pattern-waterfront-01.jpg",
    alt: "Clean surface ready for decorative coating",
    cta: "Learn About Vapor Blasting",
    href: "/services/vapor-blasting",
    highlight: false,
    dark: true,
  },
]

const tagColors: Record<string, string> = {
  "Residential":           "bg-[#E8F4E8] text-[#2D6A2D]",
  "Residential / Commercial": "bg-[#F4F0E8] text-[#7A5A2B]",
  "Commercial":            "bg-[#E8EEF8] text-[#2B4A8C]",
  "All Surfaces":          "bg-[#F2ECF8] text-[#6B3A8C]",
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApplicationsPage() {
  return (
    <main className="bg-[#FAFAFA]">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E8E4DE] pt-28 pb-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">
            What We Do
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-5xl sm:text-6xl font-black text-[#333333] leading-tight">
                Applications
              </h1>
              <p className="text-[#626262] text-base leading-relaxed mt-4 max-w-xl">
                From residential driveways to commercial parking areas — we apply decorative pavement
                systems and vapor blasting across BC. Every surface. Every scale.
              </p>
            </div>
            <Link href="/contact">
              <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors whitespace-nowrap">
                Get a Free Quote
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Application cards ────────────────────────────────────────────── */}
      <section className="w-full py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="space-y-8">
            {applications.map((app, i) => (
              <div
                key={app.title}
                className={`group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#E8E4DE] hover:shadow-xl transition-all duration-300 ${
                  app.dark ? "bg-[#0F2530]" : "bg-white"
                }`}
              >
                {/* Image — alternate left/right */}
                <div className={`relative h-64 md:h-auto min-h-[280px] overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <Image
                    src={app.image}
                    alt={app.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {app.dark && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F2530]/60 to-transparent" />
                  )}
                </div>

                {/* Content */}
                <div className={`p-8 md:p-10 flex flex-col justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      tagColors[app.tag] ?? "bg-[#F4F0E8] text-[#7A5A2B]"
                    }`}>
                      {app.tag}
                    </span>
                  </div>
                  <h2 className={`text-3xl sm:text-4xl font-black leading-tight mb-4 ${
                    app.dark ? "text-white" : "text-[#333333]"
                  }`}>
                    {app.title}
                  </h2>
                  <p className={`text-base leading-relaxed mb-8 ${
                    app.dark ? "text-white/70" : "text-[#626262]"
                  }`}>
                    {app.desc}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={app.href}>
                      <span className={`inline-block px-7 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors ${
                        app.dark
                          ? "bg-[#D66620] hover:bg-[#C05A18] text-white"
                          : app.highlight
                          ? "bg-[#D66620] hover:bg-[#C05A18] text-white"
                          : "border border-[#D66620] text-[#D66620] hover:bg-[#D66620] hover:text-white"
                      }`}>
                        {app.cta}
                      </span>
                    </Link>
                    {app.highlight && (
                      <Link href="/projects">
                        <span className="inline-block border border-[#E8E4DE] text-[#626262] hover:border-[#D66620] hover:text-[#D66620] px-7 py-3.5 rounded-lg font-semibold text-sm transition-colors">
                          See Our Work
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ──────────────────────────────────────────────────── */}
      <div className="bg-[#D66620] py-5">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-2">
          {[
            "Serving BC Since 2000",
            "BC Decorative Pavement Studio",
            "Lower Mainland & Vancouver Island",
            "Free Consultations",
          ].map((t) => (
            <span key={t} className="text-white text-xs font-semibold uppercase tracking-wider">
              ✓ {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
            Not Sure What You Need?
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#333333] mb-5 leading-tight">
            Let&apos;s Talk About Your Project
          </h2>
          <p className="text-[#626262] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            We offer free site consultations across BC. Tell us what you&apos;re working with
            and we&apos;ll recommend the right solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Get a Free Quote
              </span>
            </Link>
            <a href="tel:6043098212">
              <span className="inline-block border border-[#E8E4DE] text-[#626262] hover:border-[#D66620] hover:text-[#D66620] px-10 py-4 rounded-lg font-semibold text-sm transition-colors">
                604-309-8212
              </span>
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
