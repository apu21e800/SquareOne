import Link from "next/link"

const applications = [
  {
    label: "Residential Driveways",
    desc: "Stamped asphalt and StreetBond coatings that transform your home entrance. 20+ patterns available.",
    href: "/driveways",
    emoji: "🏠",
    tag: "Residential",
  },
  {
    label: "Strata & Townhome",
    desc: "Uniform surface upgrades across multi-unit developments. Consistent finishes, one crew.",
    href: "/driveways",
    emoji: "🏘️",
    tag: "Residential",
  },
  {
    label: "Municipal Crosswalks",
    desc: "Vision Zero-compliant decorative crosswalks. AODA-ready patterns with retroreflective finish.",
    href: "/contact",
    emoji: "🦺",
    tag: "Municipal",
  },
  {
    label: "Bus & Bike Lanes",
    desc: "High-visibility StreetBond coatings for transit corridors — red, green, and custom colours.",
    href: "/contact",
    emoji: "🚌",
    tag: "Municipal",
  },
  {
    label: "Patios & Courtyards",
    desc: "Custom patterns and rich colours for outdoor living spaces and commercial courtyards.",
    href: "/contact",
    emoji: "☀️",
    tag: "Commercial",
  },
  {
    label: "Parking Lots",
    desc: "Durable thermoplastic markings, stall layouts, accessible parking, and directional graphics.",
    href: "/contact",
    emoji: "🅿️",
    tag: "Commercial",
  },
  {
    label: "Pools & Splash Pads",
    desc: "Slip-resistant, UV-stable coatings engineered for wet aquatic and play surfaces.",
    href: "/contact",
    emoji: "💧",
    tag: "Commercial",
  },
  {
    label: "School Zones",
    desc: "School logo branding, crosswalks, speed legends, and safety markings — all in one install.",
    href: "/contact",
    emoji: "🏫",
    tag: "Municipal",
  },
  {
    label: "Walkways & Paths",
    desc: "Decorative surface treatments for pedestrian paths, trails, park entries, and plazas.",
    href: "/contact",
    emoji: "🚶",
    tag: "Municipal",
  },
  {
    label: "Public Art & Plazas",
    desc: "Large-format thermoplastic artwork and custom branded pavement for civic spaces.",
    href: "/contact",
    emoji: "🎨",
    tag: "Municipal",
  },
  {
    label: "Airports & Transit",
    desc: "Regulatory and wayfinding markings for high-traffic airport and transit environments.",
    href: "/contact",
    emoji: "✈️",
    tag: "Commercial",
  },
  {
    label: "Vapor Blasting",
    desc: "Surface removal and prep for any of the above — graffiti, old markings, or prior coatings.",
    href: "/services/vapor-blasting",
    emoji: "💨",
    tag: "Prep",
  },
]

const tagColors: Record<string, string> = {
  Residential: "bg-[#E8F4E8] text-[#2D6A2D]",
  Municipal: "bg-[#E8EEF8] text-[#2B4A8C]",
  Commercial: "bg-[#F4F0E8] text-[#7A5A2B]",
  Prep: "bg-[#F2ECF8] text-[#6B3A8C]",
}

export default function ApplicationsSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.2em] font-bold mb-3">
            Where We Work
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-[#1C2226] leading-tight">
              Applications
            </h2>
            <p className="text-[#626262] max-w-sm text-sm leading-relaxed">
              From private driveways to municipal transit corridors — we work across every paved surface in BC.
            </p>
          </div>
          <div className="mt-6 h-px bg-gradient-to-r from-[#D66620]/40 to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {applications.map((app) => (
            <Link
              key={app.label}
              href={app.href}
              className="group block bg-[#FAFAF9] rounded-xl p-5 border border-[#EDEAE4] hover:border-[#D66620]/40 hover:bg-white hover:shadow-md transition-all duration-200"
            >
              {/* Emoji icon */}
              <div className="text-3xl mb-3 transition-transform duration-200 group-hover:scale-110 origin-left">
                {app.emoji}
              </div>

              {/* Tag pill */}
              <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-3 ${tagColors[app.tag]}`}>
                {app.tag}
              </span>

              <h3 className="text-sm font-black text-[#1C2226] mb-2 group-hover:text-[#D66620] transition-colors leading-snug">
                {app.label}
              </h3>
              <p className="text-[#626262] text-xs leading-relaxed line-clamp-2">
                {app.desc}
              </p>

              <p className="text-[#D66620] text-[10px] font-bold uppercase tracking-widest mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More →
              </p>
            </Link>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-10 pt-8 border-t border-[#EDEAE4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[#626262] text-sm">
            Not sure what your project needs?{" "}
            <span className="text-[#1C2226] font-semibold">We offer free site consultations across BC.</span>
          </p>
          <Link href="/contact">
            <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors whitespace-nowrap">
              Get a Free Quote
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
