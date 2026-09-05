import Image from "next/image"
import Link from "next/link"
import { WORK_APPS, workFor, type WorkPhoto } from "@/lib/work"

/* Row order is the business hierarchy (lib/work.ts WORK_APPS): commercial
   and municipal work leads, residential driveways follow, vapour blasting
   closes as the extra service. Do not resort alphabetically or "by
   interest" — the order is intentional. Each row is one of the ten galleries
   the Services panel and /galleries carry, with its photograph count and
   its lead photograph from the record, so the home page, the menu and the
   galleries name the same ten things the same way.

   Rebuilt 5 Sept 2026 (Vern: "the text feels overwhelming and massive") —
   the row is now a photograph, a name and one quiet line; two columns from
   1536px so the index sits in a single screen on a big monitor. */

const VAPOUR = {
  label: "Vapour blasting",
  desc: "Surface cleaning, priming, graffiti and mould removal — mobile, dustless, no substrate damage. The supporting service.",
  href: "/services/vapor-blasting",
  thumb: "/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg",
  alt: "Square One crew vapour blasting at Granville Island",
}

function alt(p: WorkPhoto): string {
  const sys = p.systems.join(" and ")
  return p.place ? `${p.subject} in ${sys} — ${p.place}, BC` : `${p.subject} in ${sys}`
}

export default function ApplicationsSection() {
  const rows = [
    ...WORK_APPS.map((a) => {
      const photos = workFor(a.slug)
      const lead = photos[0]
      return {
        label: a.label,
        desc: a.blurb,
        href: a.slug === "driveways" ? "/driveways" : `/applications/${a.slug}`,
        count: photos.length,
        thumb: lead?.src,
        alt: lead ? alt(lead) : "",
      }
    }),
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
      <span aria-hidden="true" className="ghost-index">04</span>

      <div className="container-1280 relative z-[1]">
        <div data-reveal className="flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-num">04</span>Applications
            </p>
            <h2 className="mt-5">Where these systems are specified</h2>
          </div>
          <Link href="/galleries" className="arrow-link whitespace-nowrap">
            Every photograph, by application <span>&rarr;</span>
          </Link>
        </div>

        {/* Contents-rows — the catalogue's table-of-contents move (SOUL-PASS
            MOVE 2), now with the lead photograph of each gallery. */}
        <div data-reveal-group className="mt-12 grid grid-cols-1 gap-x-16 min-[1536px]:grid-flow-col min-[1536px]:grid-cols-2 min-[1536px]:grid-rows-6">
          {rows.map((app, i) => (
            <Link
              key={app.href}
              href={app.href}
              data-reveal
              className="app-row group grid grid-cols-[32px_96px_minmax(0,1fr)_auto] items-center gap-x-6 border-b border-hairline py-4 first:border-t min-[1536px]:[&:nth-child(7)]:border-t max-[700px]:grid-cols-[72px_minmax(0,1fr)_auto] max-[700px]:gap-x-4 max-[700px]:py-3"
            >
              <span className="text-[12px] font-semibold tracking-[0.08em] text-ink-muted max-[700px]:hidden">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="thumb relative block aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-surface-stone">
                {app.thumb && (
                  <Image
                    src={app.thumb}
                    alt={app.alt}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                )}
              </span>

              <span className="min-w-0">
                <span className="block text-[17px] font-semibold leading-[1.3] text-ink transition-colors duration-200 group-hover:text-[color:var(--accent-deep)] max-[700px]:text-[16px]">
                  {app.label}
                </span>
                <span className="mt-[3px] line-clamp-2 block text-[14px] leading-[1.5] text-ink-muted max-[700px]:hidden">
                  {app.desc}
                </span>
              </span>

              <span className="flex items-center gap-4 justify-self-end">
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
