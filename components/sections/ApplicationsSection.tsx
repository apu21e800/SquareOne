import Link from "next/link"

type Application = {
  label: string
  desc: string
  href: string
}

const applications: Application[] = [
  {
    label: "Crosswalks",
    desc: "Decorative and high-visibility crossings in thermoplastic or stamped asphalt.",
    href: "/contact",
  },
  {
    label: "Bus & bike lanes",
    desc: "Red and green priority lane surfacing that holds its colour under traffic.",
    href: "/contact",
  },
  {
    label: "Parking lots",
    desc: "Coatings and markings that bring order to large paved sites.",
    href: "/contact",
  },
  {
    label: "Driveways",
    desc: "Stamped asphalt drives patterned and coloured to suit the house.",
    href: "/driveways",
  },
  {
    label: "School zones",
    desc: "Slip-resistant, high-visibility markings for pedestrian priority areas.",
    href: "/contact",
  },
  {
    label: "Public spaces",
    desc: "Plazas, greenways and park paths with pattern and colour underfoot.",
    href: "/contact",
  },
  {
    label: "Surface prep",
    desc: "Vapour blasting that cleans and profiles pavement before coating.",
    href: "/vapor-blasting",
  },
]

export default function ApplicationsSection() {
  return (
    <section
      className="section relative overflow-hidden"
      style={{
        background: "var(--surface-warm)",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >

      <div className="container-1280 relative z-[1]">
        <p className="eyebrow">Applications</p>

        <h2 className="mt-5">Where these systems are specified</h2>

        <div className="mt-10 grid grid-cols-1 gap-10 min-[701px]:grid-cols-4 min-[701px]:gap-x-10 min-[701px]:gap-y-14">
          {applications.map((app) => (
            <Link key={app.label} href={app.href} className="group block">
              <h3 className="transition-colors duration-200 group-hover:text-[color:var(--accent-deep)]">
                {app.label}
              </h3>
              <p
                className="mt-2 text-[15px] leading-[1.55]"
                style={{ color: "var(--ink-muted)" }}
              >
                {app.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
