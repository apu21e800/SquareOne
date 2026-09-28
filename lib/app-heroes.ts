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
    // 28 Sept 2026, second image pass: the Chilliwack turnaround, April 2026,
    // in place of the 2023 Maple Ridge frame (which now leads the gallery).
    src: "/images/applications/roundabouts/chilliwack-circular-turnaround-streetprint-01.jpg",
    alt: "A circular turnaround in charcoal herringbone StreetPrint in front of a new apartment building in Chilliwack, installed by Square One",
    caption: "Chilliwack · Circular turnaround · StreetPrint",
    position: "center 64%",
  },
  "parking-lots": {
    // 28 Sept 2026, second image pass: the Mission parking bays, April 2025,
    // along the shopfronts (the wider frame of the same job leads the Mission
    // case study lower on the page, so it is not used twice).
    src: "/images/applications/parking-lots/mission-parking-bays-at-the-building-streetprint-01.jpg",
    alt: "Grey herringbone StreetPrint parking bays along the glass shopfronts of a new building in Mission",
    caption: "Mission · Parking bays at the building · StreetPrint",
    position: "center 50%",
  },
  "parks-paths": {
    src: "/images/applications/parks-paths/surrey-marine-spray-park-detail-streetbond-01.jpg",
    alt: "A blue StreetBond swirl and sea creatures across the Marine spray park in Surrey",
    caption: "Surrey · Marine spray park · StreetBond",
    position: "center 50%",
  },
  "schools-sports-courts": {
    // 28 Sept 2026, second image pass: a Vancouver school entrance, August
    // 2026, in place of the 2022 Abbotsford labyrinth.
    src: "/images/applications/schools-sports-courts/vancouver-school-entrance-play-area-streetbond-01.jpg",
    alt: "A path of blue StreetBond hexagons running across a school playground in Vancouver to the front doors, stars and shapes set around it",
    caption: "Vancouver · School entrance play area · StreetBond",
    position: "center 60%",
  },
  "bike-lanes": {
    src: "/images/applications/bike-lanes/sechelt-cowrie-and-trail-intersection-streetbond-01.jpg",
    alt: "The Cowrie and Trail intersection in Sechelt from above, green StreetBond bike lanes with white dashes meeting at a crossing, red DecoMark symbols at the kerbs",
    caption: "Sechelt · Cowrie and Trail intersection · StreetBond",
    position: "center 72%",
  },
  "public-art": {
    // 28 Sept 2026, second image pass: the Cadboro Bay Village traffic
    // circle, May 2026 (Every Child Matters leads the thermoplastic page).
    src: "/images/applications/public-art/oak-bay-village-intersection-medallion-streetbond-01.jpg",
    alt: "An octopus and fish on a blue sea, painted in StreetBond on the traffic circle in Cadboro Bay Village, Saanich, seen from above",
    caption: "Cadboro Bay, Saanich · Village traffic circle · StreetBond",
    position: "center 55%",
  },
  "branding-wayfinding": {
    // 28 Sept 2026, second image pass: the Coquitlam retail plaza, July 2025.
    src: "/images/applications/branding-wayfinding/coquitlam-retail-plaza-wayfinding-streetbond-01.jpg",
    alt: "Bands of teal, blue, orange and yellow StreetBond sweeping along a retail plaza sidewalk in Coquitlam",
    caption: "Coquitlam · Retail plaza wayfinding · StreetBond",
    position: "center 62%",
  },
}
