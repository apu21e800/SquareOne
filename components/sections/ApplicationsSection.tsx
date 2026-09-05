import Link from "next/link"
import { WORK_APPS, workFor } from "@/lib/work"

/* Row order is the business hierarchy (lib/work.ts WORK_APPS): commercial
   and municipal work leads, residential driveways follow, vapour blasting
   closes as the extra service. Do not resort alphabetically or "by
   interest" — the order is intentional. Each row is one of the ten galleries
   the Services panel and /galleries carry, with its photograph count from
   the record, so the home page, the menu and the galleries name the same
   ten things the same way. */

const VAPOUR = {
  label: "Vapour blasting",
  desc: "Surface cleaning, priming, graffiti and mould removal — mobile, dustless, no substrate damage. The supporting service.",
  href: "/services/vapor-blasting",
}

export default function ApplicationsSection() {
  const rows = [
    ...WORK_APPS.map((a) => ({
      label: a.label,
      desc: a.blurb,
      href: a.slug === "driveways" ? "/driveways" : `/applications/${a.slug}`,
      count: workFor(a.slug).length,
    })),
    { ...VAPOUR, count: 0 },
  ]

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
        <div data-reveal className="flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <p className="eyebrow">Applications</p>
            <h2 className="mt-5">Where these systems are specified</h2>
          </div>
          <Link href="/galleries" className="arrow-link whitespace-nowrap">
            Every photograph, by application <span>&rarr;</span>
          </Link>
        </div>

        {/* Contents-rows — the catalogue's table-of-contents move (SOUL-PASS MOVE 2) */}
        <div data-reveal-group className="mt-12">
          {rows.map((app, i) => (
            <Link
              key={app.href}
              href={app.href}
              data-reveal
              className="group grid grid-cols-[72px_minmax(220px,1fr)_2fr_auto] items-baseline gap-x-8 border-b border-hairline py-6 first:border-t max-[700px]:grid-cols-[44px_1fr_auto] max-[700px]:py-5"
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
              <span className="flex items-baseline gap-5 justify-self-end">
                {app.count > 0 && (
                  <span className="label whitespace-nowrap max-[700px]:hidden">{app.count} photos</span>
                )}
                <span aria-hidden="true" className="arrow-link text-ink-muted">
                  <span>&rarr;</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
