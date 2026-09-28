import { services } from "@/lib/services"
import { workFor, type WorkApp, type WorkPhoto } from "@/lib/work"

/**
 * The photographs behind the menu's preview frame (28 Sept 2026, Vern: "give
 * the mega menu some personality, it's rather lacking"). Server-side only:
 * lib/work.ts reads the photo folders from disk, so app/layout.tsx builds
 * this once and hands it to the Nav, which is a client component.
 *
 * Keyed by the link's href. Every frame is one the site already shows in
 * that place: a service's own opener, or the lead photograph of a gallery
 * (the same one the home page's "Where the work goes" row uses). Captions
 * are the record's: place · subject · system. Nothing new is asserted.
 */
export interface MenuPreview {
  src: string
  alt: string
  caption: string
}

export type MenuPreviews = Record<string, MenuPreview>

const GALLERIES: WorkApp[] = [
  "crosswalks",
  "streetscapes",
  "roundabouts",
  "parking-lots",
  "parks-paths",
  "schools-sports-courts",
  "bike-lanes",
  "public-art",
  "branding-wayfinding",
  "driveways",
]

function captionFor(p: WorkPhoto): string {
  return [p.place, p.subject, p.systems.join(" + ")].filter(Boolean).join(" · ")
}

function altFor(p: WorkPhoto): string {
  const sys = p.systems.join(" and ")
  return p.place ? `${p.subject} in ${sys}, ${p.place}, BC` : `${p.subject} in ${sys}`
}

export function menuPreviews(): MenuPreviews {
  const out: MenuPreviews = {}

  for (const s of services) {
    out[`/services/${s.slug}`] = {
      src: s.imageUrl,
      alt: s.imageAlt,
      caption:
        s.imageCaption ??
        (s.slug === "vapor-blasting" ? "Vancouver · Granville Island · marking removal" : s.name),
    }
  }

  for (const app of GALLERIES) {
    const lead = workFor(app)[0]
    if (!lead) continue
    const preview = { src: lead.src, alt: altFor(lead), caption: captionFor(lead) }
    out[app === "driveways" ? "/driveways" : `/applications/${app}`] = preview
  }

  // The systems: the drawing a specifier works from, not a photograph.
  out["/products"] = {
    src: "/images/patterns/herringbone.webp",
    alt: "The StreetPrint Standard Herringbone template sheet: a dimensioned drawing of the brick pattern with its title block",
    caption: "StreetPrint · Standard Herringbone · the template sheet",
  }

  return out
}
