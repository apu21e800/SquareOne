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
    // 28 Sept 2026, second image pass: the 2024–2026 library leads; the
    // frame the application page opens on is trailed, not repeated up top.
    lead: [
      "502639628_1112360040926014_5391735583045489560_n.jpg",
      "White-Rock-crosswalk-29-1-scaled.jpg",
      "langley-railways-crossing-at-the-heritage-block-trafficpatternsxd-01.jpg",
      "Photo-2024-03-19-3-28-23-PM-1-scaled.jpg",
      "504448297_1112360024259349_5235743119624258372_n-1.jpg",
      "UBC-crosswalk-3-300dpi.jpg",
      "richmond-crossing-between-towers-trafficpatternsxd-01.jpg",
      "Whiterock-Pier-Crosswalk-TrafficPatternsXD-2-scaled.jpg",
      "IMG_1635.jpeg",
    ],
    hide: {},
    trail: [
      "TrafficPatterns  Custom Decorative Crosswalk, Granvile & 68th, Vancouver BC.png",
      "TrafficPatterns Custom Decorative Crosswalk, Sechelt BC.png",
      "TrafficPatterns  Custom Decorative Crosswalk, Squamish BC.png",
      "langley-railways-crossing-crew-on-site-trafficpatternsxd-01.jpg",
    ],
  },
  "driveways": {
    // 28 Sept 2026, second image pass: the five full-size driveways from the
    // client's own folder lead, then the 2026 and 2022 library frames; the
    // 1200px copy of the Maple Ridge dusk frame and the 2013 detail trail.
    lead: [
      "Number 1.jpg",
      "Number 2.jpg",
      "Ten Mile Point Driveway I.jpg",
      "Number 4.jpg",
      "Number 3.jpg",
      "maple-ridge-driveway-recoat-at-dusk-streetbond-01.jpg",
      "richmond-brick-driveway-streetprint-01.jpg",
      "lower-mainland-bc-herringbone-driveway-and-walk-streetprint-01.jpg",
    ],
    hide: {
      "StreetPrint — Stamped Asphalt   Decorative Driveway, North Saanich BC.jpg": "house number 1180 legible twice, private residence (rule 5)",
      "StreetPrint — Stamped Asphalt   Custom Ashlar Slate Driveway, Vancouver BC.jpg": "the same driveway as Number 2.jpg, which is on record at full size",
      "StreetPrint — Stamped Asphalt   Decorative Driveway, Victoria BC.jpg": "the same driveway as Number 3.jpg, which is on record at full size",
    },
    trail: [
      "IMG_9161.jpg",
      "303-IMG_3928.JPG",
    ],
  },
  "parks-paths": {
    // 28 Sept 2026, second image pass: the 2024–2026 library leads; the
    // frame the application page opens on is trailed, not repeated up top.
    lead: [
      "surrey-marine-spray-park-from-above-streetbond-01.jpg",
      "maple-ridge-spray-park-arches-streetbond-01.jpg",
      "vancouver-spray-park-wide-streetbond-01.jpg",
      "surrey-marine-spray-park-streetbond-01.jpg",
      "Photo-2024-06-20-11-31-39-AM-scaled-e1740159565458.jpg",
      "maple-ridge-spray-park-surface-streetbond-01.jpg",
      "Photo-2024-05-31-1-47-03-PM-1-scaled.jpg",
      "Bowen-Island-asphalt-walkway-with-StreetBond150-scaled-1.jpg",
      "Photo-2023-05-25-12-55-19 PM-scaled.jpg",
    ],
    hide: {},
    trail: [
      "StreetBond Gyro Park, Saanich BC.jpg",
      "StreetBond Childrens Hospital, Vancouver BC.jpg",
      "StreetBond Olympic Oval Rochmond BC.jpg",
      "StreetBond Pedestrian Walkway, Ogden Point, Victoria BC.jpg",
      "surrey-marine-spray-park-detail-streetbond-01.jpg",
      "Photo-2025-07-07-11-54-41-AM.jpg",
    ],
  },
  "public-art": {
    // 28 Sept 2026, second image pass: the 2024–2026 library leads; the
    // frame the application page opens on is trailed, not repeated up top.
    lead: [
      "oak-bay-village-intersection-wide-streetbond-01.jpg",
      "port-coquitlam-commemorative-map-inlay-streetbond-01.jpg",
      "greater-victoria-friendship-centre-walkway-streetbond-01.jpg",
      "Photo-2023-09-22-1-50-34-PM.jpg",
      "new-westminster-boundary-pump-station-full-field-streetbond-01.jpg",
      "Langley-event-3-2048x1536.jpg",
      "Labyrinth-Maple-Ridge-c̓əsqənelə-Elementary-2-scaled-1.jpg",
      "IMG_6053-scaled.jpeg",
      "oak-bay-street-mural-crossing-streetbond-01.jpg",
      "burnaby-union-street-thunderbird-decomark-01.jpg",
    ],
    hide: {},
    trail: [
      "TrafficPatterns Rainbow Crosswalk, Sechelt BC.jpg",
      "TrafficPatterns Decorative Crosswalk, Tsawwassen Commons.jpg",
      "DecoMark Public Art, Tsawwassen Commons, Delta BC.jpg",
      "StreetBond BC Childrens Hospital.jpg",
      "oak-bay-village-intersection-medallion-streetbond-01.jpg",
    ],
  },
  "streetscapes": {
    // 28 Sept 2026, second image pass: the 2024–2026 library leads; the
    // frame the application page opens on is trailed, not repeated up top.
    lead: [
      "victoria-town-centre-crossing-streetprint-01.jpg",
      "maplewoods-fire-lane-north-vancouver-streetbond-01.jpg",
      "victoria-town-centre-plaza-streetprint-01.jpg",
      "squamish-strata-laneway-wide-streetbond-01.jpg",
      "Photo-2025-04-03-1-57-51-PM-scaled.jpg",
      "victoria-vic-high-forecourt-streetprint-01.jpg",
      "coquitlam-glen-and-pine-plaza-trafficpatternsxd-01.jpg",
      "StreetPrint-—-Stamped-Asphalt-Decorative-Crosswalk-Windsor-Gate.jpg",
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
      "victoria-town-centre-paving-streetprint-01.jpg",
    ],
  },
  "parking-lots": {
    // 28 Sept 2026, second image pass: the 2024–2026 library leads; the
    // frame the application page opens on is trailed, not repeated up top.
    lead: [
      "mission-parking-bays-at-the-building-streetprint-01.jpg",
      "Photo-2025-07-28-2-10-43-PM-scaled.jpg",
      "Photo-2024-10-15-5-38-42-PM-scaled.jpg",
      "Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Stamped-Asphalt-in-Langley-BC-Canada.jpg",
      "StreetPrint-—-Stamped-Asphalt-Front-Enterence-Agassiz-BC.jpg",
      "StreetBond-High-Visibility-Walkway-Shipspoint-Victoria-BC.jpg",
    ],
    hide: {},
    trail: [
      "StreetBond Parking Lot, Kingsway, Vancouver BC.jpg",
      "TrafficPatterns  Decorative Crosswalk, Mayfair Mall, Victoria BC.png",
      "StreetPrint — Stamped Asphalt  Decorative Parkade, Victoria BC.png",
      "Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Red-Stamped-Asphalt.jpg",
      "mission-parking-bays-and-lot-streetprint-01.jpg",
    ],
  },
  "schools-sports-courts": {
    // 28 Sept 2026, second image pass: the 2024–2026 library leads; the
    // frame the application page opens on is trailed, not repeated up top.
    lead: [
      "vancouver-school-court-streetbond-01.jpg",
      "vancouver-school-play-markings-premark-01.jpg",
      "Photo-2025-09-25-3-48-33-PM-scaled.jpg",
      "abbotsford-basketball-key-streetbond-01.jpg",
      "lower-mainland-bc-elevated-play-deck-wide-streetbond-01.jpg",
      "abbotsford-eagle-mountain-labyrinth-decomark-01.jpg",
      "IMG_1145.jpeg",
      "surrey-kb-woodward-hexagons-decomark-01.jpg",
      "StreetBond-Sports-Court-Brookmere-Park-Coquitlam-BC.jpg",
    ],
    hide: {},
    trail: [
      "Photo-2024-09-13-10-31-48-AM.jpg",
      "StreetBond  Central Middle School, Victoria BC.jpg",
      "StreetPrint — Stamped Asphalt    Quadra Elementary School, Victoria BC.jpg",
      "vancouver-school-entrance-play-area-streetbond-01.jpg",
    ],
  },
  "branding-wayfinding": {
    // 28 Sept 2026, second image pass: the 2024–2026 library leads; the
    // frame the application page opens on is trailed, not repeated up top.
    lead: [
      "coquitlam-red-sol-courtyard-decomark-01.jpg",
      "coquitlam-red-sol-detail-decomark-01.jpg",
      "DecoMark-on-asphalt-Little-Italy-Community-Branding_Commercia-Drive-Vancouver-BC-Canada-op6t525a5rlrtdb6ycgokn391ncum7c5zqlh8og8kw.jpg",
      "langley-townhome-amenity-markings-premark-01.jpg",
    ],
    hide: {},
    trail: [
      "DecoMark Corporate Branding, Molson Coors ,Chilliwack BC.jpg",
      "Decorative-asphalt-sidewalk-with-at-Reunion-housing-development-in-langley-BC-Canada.jpg",
      "coquitlam-retail-plaza-wayfinding-streetbond-01.jpg",
    ],
  },
  "roundabouts": {
    // 28 Sept 2026, second image pass: the 2024–2026 library leads; the
    // frame the application page opens on is trailed, not repeated up top.
    lead: [
      "maple-ridge-roundabout-centre-streetprint-01.jpg",
      "abbotsford-roundabout-wide-streetprint-01.jpg",
      "maple-ridge-traffic-island-streetprint-01.jpg",
      "abbotsford-roundabout-apron-streetprint-01.jpg",
      "StreetBond-—-Coatings-Maridian-Roundabout-Surrey-BC.jpg",
      "StreetPrint-—-Stamped-Asphalt-Roundabout-Vernon-BC.jpg",
    ],
    hide: {},
    trail: [
      "TrafficPatterns Decorative Crosswalk, Sannich.jpg",
      "chilliwack-circular-turnaround-streetprint-01.jpg",
    ],
  },
  "bike-lanes": {
    // 28 Sept 2026, second image pass: the 2024–2026 library leads; the
    // frame the application page opens on is trailed, not repeated up top.
    lead: [
      "sechelt-cowrie-and-trail-lane-and-crossing-decomark-01.jpg",
      "Photo-2024-07-04-10-58-08-AM-scaled.jpg",
      "surrey-32nd-avenue-bike-path-streetprint-01.jpg",
      "sechelt-cowrie-and-trail-lane-markings-decomark-01.jpg",
    ],
    hide: {},
    trail: [
      "PreMark  Green Bike Lane, North Vancouver BC.jpg",
      "PreMark Green Bike Lane, North Vancouver BC.jpg",
      "PreMark Green Bike Lane, Assembly.jpg",
      "sechelt-cowrie-and-trail-intersection-streetbond-01.jpg",
    ],
  },
}

/** Photographs pulled site-wide, whatever gallery they appear in. */
export const HIDE_EVERYWHERE: Record<string, string> = {
  "UNADJUSTEDNONRAW_thumb_3f58.jpg": "house number 2421 stamped into the driveway, private residence",
  // 11 Sept 2026: the brief says Square One does not install MMA systems, and this
  // is the one photograph on record captioned as an MMAX install (from the old
  // site's own gallery). Hidden, not deleted, until Vern rules on whether it is
  // mislabelled or a job that predates the current product line.
  "Cycle Grip MMAX Lower Levels Hwy, North Vancouver BC.jpg": "captioned as MMAX, a system Square One does not install; awaiting Vern",
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
