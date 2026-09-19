import type { WorkApp } from "@/lib/work"

/**
 * The opening photograph of each application page — one frame from the
 * record per kind of work, chosen by eye from every hi-res frame the record
 * holds for that application (19 Sept 2026, Vern: "do a fantastic job of hero
 * images, site wide"). Until now the nine application pages opened on text
 * alone; every other page on the site opens on a photograph.
 *
 * Rules: the frame is Square One's own and on the record (lib/work-captions
 * .ts carries its place and system); the caption is place · subject · system,
 * never a claim; `position` is the object-position that keeps the subject in
 * the 58vh band at desktop and phone widths; no faces, plates or house numbers
 * survive the crop. Driveways has its own pillar at /driveways.
 */
export interface AppHero {
  src: string
  alt: string
  caption: string
  position: string
}

export const APP_HEROES: Record<Exclude<WorkApp, "driveways">, AppHero> = {
  crosswalks: {
    src: "/images/applications/crosswalks/langley-railways-crossing-crew-on-site-trafficpatternsxd-01.jpg",
    alt: "A railway-tie pattern TrafficPatternsXD crossing in tan and white running across a wide intersection in Langley, a flagger in high-visibility gear at the far corner",
    caption: "Langley · Railways crossing · TrafficPatternsXD",
    position: "center 58%",
  },
  streetscapes: {
    src: "/images/applications/streetscapes/victoria-town-centre-paving-streetprint-01.jpg",
    alt: "Brick-red herringbone StreetPrint stamped asphalt paving a town centre plaza in Victoria, with benches, trees and shopfronts beyond",
    caption: "Victoria · Town centre paving · StreetPrint",
    position: "center 62%",
  },
  roundabouts: {
    src: "/images/applications/roundabouts/chilliwack-circular-turnaround-streetprint-01.jpg",
    alt: "A charcoal StreetPrint brick-pattern circular turnaround with a concrete kerb ring in front of a new apartment building in Chilliwack",
    caption: "Chilliwack · Circular turnaround · StreetPrint",
    position: "center 66%",
  },
  "parking-lots": {
    src: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2024-10-15-5-38-42-PM-scaled.jpg",
    alt: "A wide grey cobble-pattern StreetPrint apron at the glass entrance of a commercial building, the parking lot beyond",
    caption: "Commercial entrance apron · StreetPrint",
    position: "center 70%",
  },
  "parks-paths": {
    src: "/images/applications/parks-paths/coquitlam-sheffield-park-from-above-streetbond-01.jpg",
    alt: "Sheffield Park in Coquitlam from above — a StreetBond polka-dot path in white on grey curving around a spray pad between new houses and tall firs",
    caption: "Coquitlam · Sheffield Park · StreetBond",
    position: "center 55%",
  },
  "schools-sports-courts": {
    src: "/images/applications/schools-sports-courts/abbotsford-eagle-mountain-labyrinth-decomark-01.jpg",
    alt: "A bright orange DecoMark labyrinth on black asphalt at Eagle Mountain school in Abbotsford, freshly installed",
    caption: "Abbotsford · Eagle Mountain labyrinth · DecoMark",
    position: "center 68%",
  },
  "bike-lanes": {
    src: "/images/applications/bike-lanes/sechelt-cowrie-and-trail-intersection-streetbond-01.jpg",
    alt: "The Cowrie and Trail intersection in Sechelt from above — green StreetBond bike lanes with white dashes meeting at a crossing, red DecoMark symbols at the kerbs",
    caption: "Sechelt · Cowrie and Trail intersection · StreetBond",
    position: "center 72%",
  },
  "public-art": {
    src: "/images/applications/public-art/langley-events-centre-circle-of-life-decomark-01.jpg",
    alt: "'Circle of Life' at Langley Events Centre from above — a medallion of orange, blue, green and cream DecoMark thermoplastic on a concrete plaza",
    caption: "Langley · Events Centre, 'Circle of Life' · DecoMark",
    position: "center 52%",
  },
  "branding-wayfinding": {
    src: "/images/applications/branding-wayfinding/coquitlam-red-sol-detail-decomark-01.jpg",
    alt: "Blue DecoMark circles and sweeping white-edged blue lines set into a grey concrete courtyard at Red Sol, Coquitlam",
    caption: "Coquitlam · Red Sol courtyard · DecoMark",
    position: "center 60%",
  },
}
