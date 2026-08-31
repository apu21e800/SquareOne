import Link from "next/link"

type Application = {
  label: string
  desc: string
  href: string
}

const applications: Application[] = [
  {
    label: "Driveways",
    desc: "Stamped asphalt drives for Victoria and Vancouver homes — patterned and coloured to suit the house.",
    href: "/driveways",
  },
  {
    label: "Commercial spaces",
    desc: "Plazas, retail thresholds and parking lots that bring order and identity to large paved sites.",
    href: "/applications",
  },
  {
    label: "Crosswalks",
    desc: "Decorative and high-visibility crossings in thermoplastic or stamped asphalt.",
    href: "/applications",
  },
  {
    label: "Bus & bike lanes",
    desc: "Red and green priority lane surfacing that holds its colour under traffic.",
    href: "/applications",
  },
  {
    label: "Public spaces",
    desc: "Plazas, greenways and park paths with pattern and colour underfoot.",
    href: "/applications",
  },
  {
    label: "School zones",
    desc: "Slip-resistant, high-visibility markings for pedestrian priority areas.",
    href: "/applications",
  },
  {
    label: "Vapour blasting",
    desc: "Mobile wet-abrasive restoration for pavement, brick, concrete and steel — no dust, no scarring.",
    href: "/vapor-blasting",
  },
]

export default function ApplicationsSection() {
  return (
    <section
      className="grain-paper section relative overflow-hidden"
      style={{
        background: "var(--surface-warm)",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >

      <span aria-hidden="true" className="ghost-index">03</span>

      <div className="container-1280 relative z-[1]">
        <div data-reveal>
          <p className="eyebrow">Applications</p>

          <h2 className="mt-5">Where these systems are specified</h2>
        </div>

        {/* Contents-rows — the catalogue's table-of-contents move (SOUL-PASS MOVE 2) */}
        <div data-reveal-group className="mt-12">
          {applications.map((app, i) => (
            <Link
              key={app.label}
              href={app.href}
              data-reveal
              className="group grid grid-cols-[72px_minmax(180px,1fr)_2fr_auto] items-baseline gap-x-8 border-b border-hairline py-6 first:border-t max-[700px]:grid-cols-[44px_1fr_auto] max-[700px]:py-5"
            >
              <span className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="transition-colors duration-200 group-hover:text-[color:var(--accent-deep)]">
                {app.label}
              </h3>
              <p
                className="m-0 text-[15px] leading-[1.55] max-[700px]:hidden"
                style={{ color: "var(--ink-muted)" }}
              >
                {app.desc}
              </p>
              <span
                aria-hidden="true"
                className="arrow-link justify-self-end text-ink-muted"
              >
                <span>&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
