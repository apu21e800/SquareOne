import Link from "next/link"

/* ── SVG icon library ─────────────────────────────────────── */
// All icons 20×20 viewBox, stroke-based, no fill

function IconHome() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L10 3l7 6.5" /><path d="M5 8.5V17h4v-4h2v4h4V8.5" />
    </svg>
  )
}
function IconBuilding() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="7" height="12" /><rect x="11" y="2" width="7" height="16" />
      <line x1="5" y1="10" x2="7" y2="10" /><line x1="13" y1="6" x2="15" y2="6" /><line x1="13" y1="10" x2="15" y2="10" />
    </svg>
  )
}
function IconCrosswalk() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="5" x2="17" y2="5" /><line x1="3" y1="9" x2="17" y2="9" />
      <line x1="3" y1="13" x2="17" y2="13" /><path d="M6 2v16M14 2v16" strokeOpacity="0.3" />
    </svg>
  )
}
function IconBus() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="14" height="10" rx="2" /><line x1="3" y1="9" x2="17" y2="9" />
      <circle cx="6.5" cy="16.5" r="1.5" /><circle cx="13.5" cy="16.5" r="1.5" />
      <line x1="7" y1="5" x2="7" y2="9" /><line x1="13" y1="5" x2="13" y2="9" />
    </svg>
  )
}
function IconPatio() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 16l4-8 4 5 3-4 5 7H2z" /><circle cx="14" cy="5" r="2" />
    </svg>
  )
}
function IconParking() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <path d="M8 7h3a2 2 0 010 4H8V7zM8 11v4" />
    </svg>
  )
}
function IconDroplet() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3C10 3 4 9 4 13a6 6 0 0012 0c0-4-6-10-6-10z" />
    </svg>
  )
}
function IconSchool() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 10l8-6 8 6v8H2V10z" /><rect x="7" y="13" width="6" height="5" /><path d="M10 4v3" />
    </svg>
  )
}
function IconPath() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17C3 17 5 11 10 10s7-7 7-7" /><path d="M3 13s2-1 4 0 4 2 6 0" strokeOpacity="0.4" />
    </svg>
  )
}
function IconArt() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7" /><path d="M7 10a3 3 0 006 0" /><circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconAirplane() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 13l3-1 2-6 3-2 3 2 2 6 3 1-5 2v3l-3-1-3 1v-3L2 13z" />
    </svg>
  )
}
function IconWater() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12c2-3 4-3 6 0s4 3 6 0" /><path d="M3 8c2-3 4-3 6 0s4 3 6 0" />
      <circle cx="17" cy="4" r="1.5" /><path d="M17 2.5V4" strokeWidth="1" />
    </svg>
  )
}

/* ── Data ─────────────────────────────────────────────────── */

const applications = [
  {
    label: "Residential Driveways",
    desc: "Stamped asphalt and StreetBond coatings that transform your home entrance. 20+ patterns available.",
    href: "/driveways",
    Icon: IconHome,
    tag: "Residential",
  },
  {
    label: "Strata & Townhome",
    desc: "Uniform surface upgrades across multi-unit developments. Consistent finishes, one crew.",
    href: "/driveways",
    Icon: IconBuilding,
    tag: "Residential",
  },
  {
    label: "Municipal Crosswalks",
    desc: "Vision Zero-compliant decorative crosswalks. AODA-ready patterns with retroreflective finish.",
    href: "/contact",
    Icon: IconCrosswalk,
    tag: "Municipal",
  },
  {
    label: "Bus & Bike Lanes",
    desc: "High-visibility StreetBond coatings for transit corridors — red, green, and custom colours.",
    href: "/contact",
    Icon: IconBus,
    tag: "Municipal",
  },
  {
    label: "Patios & Courtyards",
    desc: "Custom patterns and rich colours for outdoor living spaces and commercial courtyards.",
    href: "/contact",
    Icon: IconPatio,
    tag: "Commercial",
  },
  {
    label: "Parking Lots",
    desc: "Durable thermoplastic markings, stall layouts, accessible parking, and directional graphics.",
    href: "/contact",
    Icon: IconParking,
    tag: "Commercial",
  },
  {
    label: "Pools & Splash Pads",
    desc: "Slip-resistant, UV-stable coatings engineered for wet aquatic and play surfaces.",
    href: "/contact",
    Icon: IconDroplet,
    tag: "Commercial",
  },
  {
    label: "School Zones",
    desc: "School logo branding, crosswalks, speed legends, and safety markings — all in one install.",
    href: "/contact",
    Icon: IconSchool,
    tag: "Municipal",
  },
  {
    label: "Walkways & Paths",
    desc: "Decorative surface treatments for pedestrian paths, trails, park entries, and plazas.",
    href: "/contact",
    Icon: IconPath,
    tag: "Municipal",
  },
  {
    label: "Public Art & Plazas",
    desc: "Large-format thermoplastic artwork and custom branded pavement for civic spaces.",
    href: "/contact",
    Icon: IconArt,
    tag: "Municipal",
  },
  {
    label: "Airports & Transit",
    desc: "Regulatory and wayfinding markings for high-traffic airport and transit environments.",
    href: "/contact",
    Icon: IconAirplane,
    tag: "Commercial",
  },
  {
    label: "Vapor Blasting",
    desc: "Surface removal and prep for any application — graffiti, old markings, or prior coatings.",
    href: "/vapor-blasting",
    Icon: IconWater,
    tag: "Prep",
  },
]

const tagColors: Record<string, { pill: string; icon: string }> = {
  Residential: { pill: "bg-[#E8F4E8] text-[#2D6A2D]",  icon: "text-[#2D6A2D]" },
  Municipal:   { pill: "bg-[#E8EEF8] text-[#2B4A8C]",  icon: "text-[#2B4A8C]" },
  Commercial:  { pill: "bg-[#F4F0E8] text-[#7A5A2B]",  icon: "text-[#7A5A2B]" },
  Prep:        { pill: "bg-[#F2ECF8] text-[#6B3A8C]",  icon: "text-[#6B3A8C]" },
}

export default function ApplicationsSection() {
  return (
    <section className="w-full py-20 bg-[#F4F0EB]">
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
              From private driveways to municipal transit corridors — every paved surface in BC.
            </p>
          </div>
          <div className="mt-6 h-px bg-gradient-to-r from-[#D66620]/40 to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {applications.map((app) => {
            const { Icon } = app
            const colors = tagColors[app.tag]
            return (
              <Link
                key={app.label}
                href={app.href}
                className="group block bg-white rounded-xl p-5 border border-[#E8E4DE] hover:border-[#D66620]/40 hover:shadow-md transition-all duration-200"
              >
                {/* Icon */}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${colors.icon} bg-current/5`}
                  style={{ backgroundColor: "rgba(0,0,0,0.04)" }}>
                  <span className={colors.icon}>
                    <Icon />
                  </span>
                </div>

                {/* Tag pill */}
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-3 ${colors.pill}`}>
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
            )
          })}
        </div>

        {/* Section CTA */}
        <div className="mt-10 pt-8 border-t border-[#E0DBD5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
