/**
 * The home reel — seven of Square One's own frames, every caption the record's
 * place · system (· year, where the record gives one). Lives outside the client component so app/page.tsx
 * (a server component) can overlay CMS photo slots home.hero.1–5 on it.
 */
export interface Slide {
  src: string
  alt: string
  place: string
  system: string
  year?: string
  position: string
  /** Set by a CMS photo slot; replaces the place · system · year line. */
  caption?: string
}

export const HERO_SLIDES: Slide[] = [
  // 28 Sept 2026, second image pass (Vern: "choose better more recent images
  // for the hero slider… we have lots to choose from"). Seven frames, every
  // one shot in 2025 or 2026: the capture dates are the ones the September
  // delivery carries (_image-queue/curated/manifest.json), and every frame is
  // on the record in lib/work-captions.ts. Chosen from a dated pass over all
  // 69 photographs of 2024–2026 work, by eye at hero size on a laptop and a
  // phone: colour and scale first, then the range (a park, a town centre, a
  // village traffic circle, a retail street, a spray park, a civic plaza,
  // the Island). No job here repeats one the home page shows further down.
  {
    src: "/images/applications/parks-paths/surrey-marine-spray-park-from-above-streetbond-01.jpg",
    alt: "The Marine spray park in Surrey from above, a river of blue StreetBond winding through green leaves and yellow flowers",
    place: "Surrey",
    system: "StreetBond",
    position: "center 48%",
  },
  {
    // The Chilliwack turnaround sat here first; on a phone its subject fell
    // behind the headline, so it moved to the audience band, where a
    // portrait crop suits it, and the Victoria plaza took its place.
    src: "/images/applications/streetscapes/victoria-town-centre-plaza-streetprint-01.jpg",
    alt: "Red herringbone StreetPrint across a town centre plaza in Victoria, a clock tower over the trees",
    place: "Victoria",
    system: "StreetPrint",
    position: "center 22%",
  },
  {
    // The record filed this as Oak Bay; the "Welcome to Cadboro Bay" sign in
    // the wide frame of the same job puts it at the Cadboro Bay Village
    // traffic circle, in Saanich.
    src: "/images/applications/public-art/oak-bay-village-intersection-medallion-streetbond-01.jpg",
    alt: "An octopus and fish on a blue sea, painted in StreetBond on the traffic circle in Cadboro Bay Village, Saanich, seen from above",
    place: "Cadboro Bay, Saanich",
    system: "StreetBond",
    position: "center 55%",
  },
  {
    src: "/images/applications/branding-wayfinding/coquitlam-retail-plaza-wayfinding-streetbond-01.jpg",
    alt: "Bands of teal, blue, orange and yellow StreetBond sweeping along a retail plaza sidewalk in Coquitlam",
    place: "Coquitlam",
    system: "StreetBond",
    position: "center 62%",
  },
  {
    src: "/images/applications/parks-paths/maple-ridge-spray-park-arches-streetbond-01.jpg",
    alt: "Blue spray arches over the StreetBond spray park in Maple Ridge, laid in blues and orange",
    place: "Maple Ridge",
    system: "StreetBond",
    position: "center 42%",
  },
  {
    src: "/images/applications/public-art/port-coquitlam-commemorative-map-inlay-streetbond-01.jpg",
    alt: "A map in blue and green StreetBond with a route line across it and a round commemorative marker, beside the stands in Port Coquitlam",
    place: "Port Coquitlam",
    system: "StreetBond",
    position: "center 55%",
  },
  {
    src: "/images/applications/public-art/greater-victoria-friendship-centre-walkway-streetbond-01.jpg",
    alt: "A rainbow walkway in StreetBond curving across the lawn at the Friendship Centre in Greater Victoria",
    place: "Greater Victoria",
    system: "StreetBond",
    position: "center 50%",
  },
]
