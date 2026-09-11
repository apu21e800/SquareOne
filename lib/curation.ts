/**
 * Photo curation — the photo-editing pass of 5 Sept 2026.
 *
 * A text layer over the work record. Files are never renamed: every entry
 * below is a filename as it sits on disk, so a photograph can be reviewed,
 * moved or dropped without touching a byte of the image.
 *
 *   lead   ordered openers for the gallery; lead[0] is the hero.
 *   hide   never rendered, with the reason it was pulled.
 *   trail  shown last — extra angles of a job already up front, photographs
 *          of the install rather than the finished work, lens-distorted frames.
 *
 * Everything not named here sits between lead and trail, ordered by the
 * resolution gate below: 1200px+ first, then 800-1199px, then the rest. A
 * gallery is never emptied by the gate — low-resolution photographs are
 * demoted, never hidden (Vern, 5 Sept: nothing on the site goes blank).
 *
 * The frames the editor could not rule on alone are not here; they are listed
 * in docs/PHOTO-PASS.md for Vern, and nothing has been done to them.
 */

export interface GalleryCuration {
  lead: string[]
  hide: Record<string, string>
  trail: string[]
}

export const CURATION: Record<string, GalleryCuration> = {
  "crosswalks": {
    lead: [
      "UBC-crosswalk-3-300dpi.jpg",
      "502639628_1112360040926014_5391735583045489560_n.jpg",
      "White-Rock-crosswalk-29-1-scaled.jpg",
      "Photo-2024-03-19-3-28-23-PM-1-scaled.jpg",
      "IMG_1635.jpeg",
      "DuraTherm  Decorative Crosswalk, Spirit Trail, North Vancouver BC.jpg",
      "visible-school-crosswalk-for-safety-6.jpg",
      "Whiterock-Pier-Crosswalk-TrafficPatternsXD-2-scaled.jpg",
    ],
    hide: {},
    trail: [
      "TrafficPatterns  Custom Decorative Crosswalk, Granvile & 68th, Vancouver BC.png",
      "TrafficPatterns Custom Decorative Crosswalk, Sechelt BC.png",
      "TrafficPatterns  Custom Decorative Crosswalk, Squamish BC.png",
    ],
  },
  "driveways": {
    lead: [
      "Number 1.jpg",
      "Ten Mile Point Driveway I.jpg",
      "IMG_9161.jpg",
      "Number 2.jpg",
      "Number 4.jpg",
      "StreetPrint-—-Stamped-Asphalt-Decorative-Driveway-Craigdarroch-Castle-Victoria-BC.jpg",
      "Cobblestone-stamped-asphalt-driveway-colose-up-at-Ellis-Point-Walkway-Victoria-BC-Canada.jpg",
      "303-IMG_3928.JPG",
    ],
    hide: {
      "StreetPrint — Stamped Asphalt   Decorative Driveway, North Saanich BC.jpg": "house number 1180 legible twice — private residence (rule 5)",
    },
    trail: [],
  },
  "parks-paths": {
    lead: [
      "Photo-2024-06-20-11-31-39-AM-scaled-e1740159565458.jpg",
      "Bowen-Island-asphalt-walkway-with-StreetBond150-scaled-1.jpg",
      "Photo-2024-05-31-1-47-03-PM-1-scaled.jpg",
      "StreetPrint-—-Stamped-Asphalt-Mount-Douglas-BC.jpg",
      "StreetBond-Harbour-Walkway-Victoria-BC.jpg",
      "Photo-2023-05-25-12-55-19 PM-scaled.jpg",
      "TrafficPatterns Moody Park, New Westminster BC.jpg",
      "StreetBond  BC Childrens Hospital, Vancouver BC.jpg",
    ],
    hide: {},
    trail: [
      "StreetBond Gyro Park, Saanich BC.jpg",
      "StreetBond Childrens Hospital, Vancouver BC.jpg",
      "StreetBond Olympic Oval Rochmond BC.jpg",
      "StreetBond Pedestrian Walkway, Ogden Point, Victoria BC.jpg",
    ],
  },
  "public-art": {
    lead: [
      "Labyrinth-Maple-Ridge-c̓əsqənelə-Elementary-2-scaled-1.jpg",
      "Langley-event-3-2048x1536.jpg",
      "IMG_6053-scaled.jpeg",
      "Photo-2023-07-05-11-22-34-AM.jpg",
      "Photo-2023-09-22-1-50-34-PM.jpg",
      "TrafficPatterns-Robyn-Sparrow-Design-Granville-68th-Vancouver-BC.jpg",
      "DecoMark Katzie Elementary, Surrey BC.jpg",
      "decorative-asphalt-design-1.jpg",
    ],
    hide: {},
    trail: [
      "TrafficPatterns Rainbow Crosswalk, Sechelt BC.jpg",
      "TrafficPatterns Decorative Crosswalk, Tsawwassen Commons.jpg",
      "DecoMark Public Art, Tsawwassen Commons, Delta BC.jpg",
      "StreetBond BC Childrens Hospital.jpg",
    ],
  },
  "streetscapes": {
    lead: [
      "Photo-2023-05-19-5-56-47 PM-scaled (1).jpg",
      "StreetPrint-—-Stamped-Asphalt-Decorative-Crosswalk-Windsor-Gate.jpg",
      "Photo-2025-04-03-1-57-51-PM-scaled.jpg",
      "DuraTherm St. Pauls Hospital, Comox Street, Vancouver BC.jpg",
      "TrafficPatterns Front Street, New Westminster BC.jpg",
      "TrafficPatternsXD Decorative Crosswalk, Kelowna BC.jpg",
      "DuraTherm  Decorative Crosswalk, Maple Ridge BC.jpg",
      "TrafficPatterns Checker Crosswalk, Coquitlam BC.jpg",
    ],
    hide: {},
    trail: [
      "Mask-Group-6.jpg",
      "TrafficPatternsXD Granville Island, Vancouver BC.jpg",
      "StreetPrint — Stamped Asphalt Parking Lot, Chilliwack BC.jpg",
      "StreetPrint — Stamped Asphalt Pathway, Chilliwack BC.jpg",
      "StreetPrint — Stamped Asphalt     Town Home, North Vancouver BC.jpg",
      "TrafficPatterns  Decorative Crosswalk, Sannich BC.jpg",
      "StreetPrint — Stamped Asphalt  Road Median, Surrey BC.jpg",
    ],
  },
  "parking-lots": {
    lead: [
      "Photo-2025-07-28-2-10-43-PM-scaled.jpg",
      "Photo-2024-10-15-5-38-42-PM-scaled.jpg",
      "Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Stamped-Asphalt-in-Langley-BC-Canada.jpg",
      "StreetPrint-—-Stamped-Asphalt-Front-Enterence-Agassiz-BC.jpg",
      "StreetBond-High-Visibility-Walkway-Shipspoint-Victoria-BC.jpg",
      "DuraTherm  Decorative Yellow Crosswalk, Chilliwack BC.png",
      "StreetPrint — Stamped Asphalt  Townhouse Parking Lot, Kelowna BC.jpg",
      "StreetPrint & TrafficPatternsXD  Decorative Parking Lot Crosswalk, Langford BC.jpg",
    ],
    hide: {},
    trail: [
      "StreetBond Parking Lot, Kingsway, Vancouver BC.jpg",
      "TrafficPatterns  Decorative Crosswalk, Mayfair Mall, Victoria BC.png",
      "StreetPrint — Stamped Asphalt  Decorative Parkade, Victoria BC.png",
      "Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Red-Stamped-Asphalt.jpg",
    ],
  },
  "schools-sports-courts": {
    lead: [
      "IMG_1145.jpeg",
      "Photo-2025-09-25-3-48-33-PM-scaled.jpg",
      "StreetBond-Sports-Court-Brookmere-Park-Coquitlam-BC.jpg",
      "TrafficPatternsXD  Traffic Calming Devices, View Royal BC.jpg",
      "StreetPrint — Stamped Asphalt    Stamped Asphalt, University of British Columbia.jpg",
      "StreetPrint — Stamped Asphalt    Arbutus Middle School, Saanich BC.jpg",
      "StreetBond  Sports Court, Coquitlam BC.jpg",
      "StreetBond  Traffic Calming Device, North Vancouver BC.jpg",
    ],
    hide: {},
    trail: [
      "Photo-2024-09-13-10-31-48-AM.jpg",
      "StreetBond  Central Middle School, Victoria BC.jpg",
      "StreetPrint — Stamped Asphalt    Quadra Elementary School, Victoria BC.jpg",
    ],
  },
  "branding-wayfinding": {
    lead: [
      "DecoMark-on-asphalt-Little-Italy-Community-Branding_Commercia-Drive-Vancouver-BC-Canada-op6t525a5rlrtdb6ycgokn391ncum7c5zqlh8og8kw.jpg",
      "DecoMark Katzie Elementary School.jpg",
      "DecoMark Evergreen Line, Port Moody.jpg",
      "DecoMark — Nemo  Port Moody Park BC.jpg",
      "DecoMark, FireTruck, City of North Vancouve.jpg",
      "StreetBond  Community Branding, Gyro Park, Saanich BC.jpg",
      "DecoMark Browning Park, Marine Design, Saanich BC.jpg",
      "DecoMark, Wayfinding, Pacific Spirit Trail, North Vancouver BC.jpg",
    ],
    hide: {},
    trail: [
      "DecoMark Corporate Branding, Molson Coors ,Chilliwack BC.jpg",
      "Decorative-asphalt-sidewalk-with-at-Reunion-housing-development-in-langley-BC-Canada.jpg",
    ],
  },
  "roundabouts": {
    lead: [
      "TrafficPatterns  Decorative Crosswalk, Sannich.jpg",
      "StreetBond-—-Coatings-Maridian-Roundabout-Surrey-BC.jpg",
      "StreetPrint  Roundabout, North Cowichan BC.jpg",
      "StreetPrint-—-Stamped-Asphalt-Roundabout-Vernon-BC.jpg",
      "StreetPrint — Stamped Asphalt  Roundabout, Duncan BC.jpg",
      "StreetPrint — Stamped Asphalt   Maridian & Roundabout, McTavish Exchange, Victoria BC.jpg",
      "StreetPrint — Stamped Asphalt  Roundabout, West Vancouver BC.jpg",
      "TrafficPatternsXD  Roundabout, Kelowna BC.jpg",
    ],
    hide: {},
    trail: [
      "TrafficPatterns Decorative Crosswalk, Sannich.jpg",
    ],
  },
  "bike-lanes": {
    lead: [
      "Photo-2024-07-04-10-58-08-AM-scaled.jpg",
      "PreMark  Blue Bike Lane, Richmond BC.jpg",
      "TrafficPatternsXD & PreMark Bike Lane & Crosswalk, Kelowna BC.jpg",
      "PreMark Green Bike Lane.jpg",
      "TrafficPatterns Green Bike Lane, North Vancouver BC.jpg",
    ],
    hide: {},
    trail: [
      "PreMark  Green Bike Lane, North Vancouver BC.jpg",
      "PreMark Green Bike Lane, North Vancouver BC.jpg",
      "PreMark Green Bike Lane, Assembly.jpg",
    ],
  },
}

/** Photographs pulled site-wide, whatever gallery they appear in. */
export const HIDE_EVERYWHERE: Record<string, string> = {
  "UNADJUSTEDNONRAW_thumb_3f58.jpg": "house number 2421 stamped into the driveway — private residence",
  // 11 Sept 2026: the brief says Square One does not install MMA systems, and this
  // is the one photograph on record captioned as an MMAX install (from the old
  // site's own gallery). Hidden, not deleted, until Vern rules on whether it is
  // mislabelled or a job that predates the current product line.
  "Cycle Grip MMAX Lower Levels Hwy, North Vancouver BC.jpg": "captioned as MMAX — a system Square One does not install; awaiting Vern",
}

/* ------------------------------------------------------------------
   Applying it — imported by lib/work.ts, which owns the photo record.
   ------------------------------------------------------------------ */

/** The resolution gate (rule 4): 1200px+ carries full weight, 800-1199px
 *  sorts behind it, anything smaller sorts last. Nothing is hidden for size
 *  alone — a gallery is never emptied by the gate. */
const FULL_PX = 1200
const MIN_PX = 800

/** The filename as it sits on disk, from a web path that may be encoded. */
function basename(src: string): string {
  return decodeURIComponent(src.split("/").pop() ?? "")
}

interface Curatable {
  src: string
  app: string
  w: number
  h: number
  hires?: boolean
  place: string
  subject: string
}

/**
 * Drops the hidden photographs and orders what is left: the editor's lead,
 * then everything else by resolution, then the trail. `order` carries the
 * application sequence (the business hierarchy) from lib/work.ts.
 */
export function curate<T extends Curatable>(photos: T[], order: Map<string, number>): T[] {
  const kept = photos.filter((p) => {
    const file = basename(p.src)
    if (HIDE_EVERYWHERE[file]) return false
    return !CURATION[p.app]?.hide[file]
  })

  const rank = (p: T): [number, number] => {
    const file = basename(p.src)
    const c = CURATION[p.app]
    const lead = c ? c.lead.indexOf(file) : -1
    if (lead >= 0) return [0, lead]
    if (c && c.trail.includes(file)) return [3, 0]
    const long = Math.max(p.w, p.h)
    return [1, long >= FULL_PX ? 0 : long >= MIN_PX ? 1 : 2]
  }

  return kept.sort((a, b) => {
    const [ab, ai] = rank(a)
    const [bb, bi] = rank(b)
    return (
      (order.get(a.app) ?? 0) - (order.get(b.app) ?? 0) ||
      ab - bb ||
      ai - bi ||
      Number(Boolean(b.hires)) - Number(Boolean(a.hires)) ||
      Number(a.place === "") - Number(b.place === "") ||
      a.place.localeCompare(b.place) ||
      a.subject.localeCompare(b.subject)
    )
  })
}
