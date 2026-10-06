import Link from "next/link"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import { WORK_APPS, workFor, type WorkApp, type WorkPhoto } from "@/lib/work"
import { BUYERS } from "@/lib/buyers"

/* Who we work with, and where — 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md
   §3.1, §9.5). The same eleven links as before — the nine application
   galleries, driveways and vapour blasting — grouped under the four buyers
   an installer actually works for, because a contractor's site is organised
   by who it serves; a supplier's by catalogue. The galleries are untouched
   (lib/work.ts); only the grouping is new (lib/buyers.ts), and it is the
   grouping the menu uses too (components/Nav.tsx). Each group: the buyer in the margin
   column, its rows beside it — thumbnail, name, one line, no arrows.

   Row order inside a group is the business hierarchy from lib/work.ts. Do
   not resort alphabetically or "by interest" — the order is intentional. */

const VAPOUR = {
  label: "Vapour blasting",
  desc: "Surface cleaning, priming, graffiti and mould removal: mobile, dustless, no damage to the surface under it.",
  href: "/services/vapor-blasting",
  thumb: "/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg",
  alt: "Square One crew vapour blasting at Granville Island",
}

function alt(p: WorkPhoto): string {
  const sys = p.systems.join(" and ")
  return p.place ? `${p.subject} in ${sys}, ${p.place}, BC` : `${p.subject} in ${sys}`
}

interface AppRow {
  label: string
  desc: string
  href: string
  thumb?: string
  alt: string
}

function rowFor(slug: WorkApp | "vapour"): AppRow | null {
  if (slug === "vapour") return VAPOUR
  const a = WORK_APPS.find((w) => w.slug === slug)
  if (!a) return null
  const lead = workFor(a.slug)[0]
  return {
    label: a.label,
    desc: a.blurb,
    href: a.slug === "driveways" ? "/driveways" : `/applications/${a.slug}`,
    thumb: lead?.src,
    alt: lead ? alt(lead) : "",
  }
}

export default function ApplicationsSection() {
  return (
    <Section
      label="By client"
      title="Where the work goes"
      link={{ href: "/galleries", label: "Photographs, by application" }}
      tone="warm"
      wide
    >
      <div className="grid grid-cols-12 gap-x-10 gap-y-2 max-[900px]:grid-cols-1">
        {BUYERS.map((buyer) => {
          const rows = buyer.slugs.map(rowFor).filter((r): r is AppRow => r !== null)
          return (
            <div key={buyer.label} className="contents">
              <div className="col-span-3 border-t border-hairline pt-6 pb-4 max-[900px]:col-span-1 max-[900px]:pb-0">
                <h3 className="text-[20px]">{buyer.label}</h3>
                <p className="mt-2 max-w-[28ch] text-[15px] leading-[1.5] text-ink-muted">{buyer.note}</p>
              </div>
              <ul className="col-span-9 max-[900px]:col-span-1">
                {rows.map((app) => (
                  <li key={app.href}>
                    <Link
                      href={app.href}
                      className="group grid grid-cols-[132px_minmax(0,1fr)] items-center gap-x-6 border-t border-hairline py-4 max-[700px]:grid-cols-[96px_minmax(0,1fr)] max-[700px]:gap-x-4"
                    >
                      <Frame src={app.thumb} alt={app.alt} aspect="aspect-[3/2]" sizes="132px" />
                      <span className="min-w-0">
                        <span className="block text-[18px] font-bold leading-[1.25] text-ink" style={{ fontFamily: "var(--font-display)" }}>
                          {app.label}
                        </span>
                        <span className="mt-[4px] line-clamp-2 block max-w-[64ch] text-[15px] leading-[1.5] text-ink-muted max-[700px]:hidden">
                          {app.desc}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
