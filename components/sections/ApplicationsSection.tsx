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
   1536px so the index sits in a single screen on a big monitor.

   Moved onto slate 7 Sept 2026, and back onto warm paper 19 Sept 2026 (Vern:
   "too much dark mode overall — a clean light theme; the footer and the
   cinema backdrops are fine"). The ten lead photographs carry the row. */

const VAPOUR = {
  label: "Vapour blasting",
  desc: "Surface cleaning, priming, graffiti and mould removal — mobile, dustless, no substrate damage. The supporting service.",
  href: "/services/vapor-blasting",
  thumb: "/images/services/vapor-blasting/generated/gen-granville-island-vapour-blasting-01-enhanced.jpg",
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
      className="section relative overflow-hidden border-t border-hairline bg-surface-warm"
    >
      <div className="container-1280 relative z-[1]">
        <div data-reveal className="flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-num">01</span>Applications
            </p>
            <h2 className="mt-5">Where these systems are specified</h2>
          </div>
          <Link href="/galleries" className="arrow-link whitespace-nowrap">
            Every photograph, by application <span>&rarr;</span>
          </Link>
        </div>

        {/* Contents-rows — the catalogue's table-of-contents move (SOUL-PASS
            MOVE 2), now with the lead photograph of each gallery.

            21 Sept 2026 (Vern: "feels like a lot of scrolling, not sure we
            need the numbers"). Twelve rows ran in one column until 1536px,
            which is wider than most screens, so on a laptop this one section
            was most of a scroll. It splits into two columns of six from
            1100px — half the height on the screens people actually use — and
            the 01–12 markers are gone. They were a table-of-contents
            affectation: the rows are an index, not a ranking, and the number
            column was pushing the photograph and the label right. */}
        <div data-reveal-group className="mt-12 grid grid-cols-1 gap-x-14 min-[1100px]:grid-flow-col min-[1100px]:grid-cols-2 min-[1100px]:grid-rows-6">
          {rows.map((app) => (
            <Link
              key={app.href}
              href={app.href}
              data-reveal
              style={{ borderColor: "var(--hairline)" }}
              className="app-row group grid grid-cols-[132px_minmax(0,1fr)_auto] items-center gap-x-6 border-b py-4 first:border-t min-[1100px]:[&:nth-child(7)]:border-t min-[1100px]:grid-cols-[104px_minmax(0,1fr)_auto] min-[1100px]:gap-x-5 max-[700px]:grid-cols-[84px_minmax(0,1fr)_auto] max-[700px]:gap-x-4 max-[700px]:py-3"
            >
              <span className="relative block aspect-[3/2] w-full overflow-hidden rounded-[2px] bg-surface-stone">
                {app.thumb && (
                  <Image
                    src={app.thumb}
                    alt={app.alt}
                    fill
                    sizes="(max-width: 700px) 84px, (max-width: 1100px) 132px, 104px"
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
                {/* No photo counts — the client reads a number as a claim
                    about the whole body of work (10 and 18 Sept). */}
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
