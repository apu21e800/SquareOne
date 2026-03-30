import Link from "next/link"

const applications = [
  {
    label: "Residential Driveways",
    desc: "Stamped asphalt and StreetBond coatings that transform your home's entrance.",
    href: "/applications/private-driveways",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z" />
        <path d="M9.5 21V14h5v7" />
        <path d="M9.5 14h5" />
      </svg>
    ),
  },
  {
    label: "Patios & Courtyards",
    desc: "Custom patterns and rich colours for outdoor living spaces and courtyards.",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7.5" height="7.5" rx="1" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1" />
      </svg>
    ),
  },
  {
    label: "Walkways & Paths",
    desc: "Decorative surface treatments for pedestrian paths, trails, and entries.",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3l2 18" />
        <path d="M16 3l-2 18" />
        <path d="M8 3h8" />
        <path d="M6 21h12" />
        <line x1="8.5" y1="9" x2="15.5" y2="9" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    label: "Pool Surrounds",
    desc: "Slip-resistant, UV-stable coatings engineered for wet pool deck environments.",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M5 12c1.3-1.8 2.7-1.8 4 0s2.7 1.8 4 0 2.7-1.8 4 0" />
        <path d="M5 16c1.3-1.8 2.7-1.8 4 0s2.7 1.8 4 0 2.7-1.8 4 0" />
      </svg>
    ),
  },
  {
    label: "Commercial Lots",
    desc: "High-wear coatings and thermoplastic markings for parking and commercial surfaces.",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="8" width="20" height="13" rx="1" />
        <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" />
        <line x1="12" y1="8" x2="12" y2="21" />
        <line x1="7" y1="13" x2="17" y2="13" />
        <line x1="7" y1="17" x2="17" y2="17" />
      </svg>
    ),
  },
  {
    label: "Interlocking Stone",
    desc: "Precision overlay work and surface coatings applied over existing interlocking.",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="8.5" height="5" rx="0.5" />
        <rect x="13.5" y="3" width="8.5" height="5" rx="0.5" />
        <rect x="2" y="10" width="5.5" height="5" rx="0.5" />
        <rect x="9.5" y="10" width="12.5" height="5" rx="0.5" />
        <rect x="2" y="17" width="8.5" height="4" rx="0.5" />
        <rect x="13.5" y="17" width="8.5" height="4" rx="0.5" />
      </svg>
    ),
  },
]

export default function ApplicationsSection() {
  return (
    <section className="w-full py-20 bg-[#F4F4F2] grid-pattern">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            Where We Work
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-[#333333] leading-tight">
              Applications
            </h2>
            <p className="text-[#626262] max-w-sm text-sm leading-relaxed">
              From private driveways to municipal lots — we work across all paved surfaces throughout BC.
            </p>
          </div>
          <div className="mt-6 h-px bg-gradient-to-r from-[#D66620]/40 to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {applications.map((app) => (
            <Link
              key={app.label}
              href={app.href}
              className="group block bg-white rounded-xl p-5 sm:p-6 border border-[#E8E4DE] hover:border-[#D66620]/40 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-9 h-9 text-[#D66620] mb-4 transition-transform duration-200 group-hover:scale-110">
                {app.icon}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#333333] mb-2 group-hover:text-[#D66620] transition-colors leading-snug">
                {app.label}
              </h3>
              <p className="text-[#626262] text-xs sm:text-sm leading-relaxed line-clamp-2">
                {app.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-10 pt-8 border-t border-[#E8E4DE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[#626262] text-sm">
            Not sure what your project needs?{" "}
            <span className="text-[#333333] font-semibold">We do free site consultations.</span>
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
