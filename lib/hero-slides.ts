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

/** The headline over the reel and the line under it, as the site ships them.
    The Studio's Home page changes them (lib/page-content.ts, 9 Oct 2026). */
export const HERO_HEADLINE = "Surfaces that"
export const HERO_HEADLINE_END = "define a place"
export const HERO_LINE =
  "Stamped asphalt, coloured coatings and crosswalks, installed by our own crews across the Lower Mainland and Vancouver Island since 2000."

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
    // 2 Oct 2026 (Vern: "this hero image does not focus on the installation
    // groundwork"): the portrait frame of the plaza, cropped to its top,
    // showed the building and a sliver of paving. The landscape frame of
    // the same job puts the herringbone in the frame at every width.
    src: "/images/applications/streetscapes/victoria-town-centre-paving-streetprint-01.jpg",
    alt: "Brick-red herringbone StreetPrint stamped asphalt paving a town centre plaza in Victoria, with benches, trees and shopfronts beyond",
    place: "Victoria",
    system: "StreetPrint",
    position: "center 62%",
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
    // 2 Oct 2026: the Coquitlam retail plaza (a portrait frame with its
    // colour in the lower third) showed a glass storefront on a laptop and
    // on a phone, whatever the crop. The Union Street thunderbird in Burnaby
    // fills the frame top to bottom at every width.
    src: "/images/applications/public-art/burnaby-union-street-thunderbird-decomark-01.jpg",
    alt: "A white thunderbird in DecoMark thermoplastic on the black asphalt of the Union Street greenway in Burnaby, seen from above",
    place: "Burnaby",
    system: "DecoMark",
    position: "center 50%",
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
    position: "center 72%",
  },
  {
    src: "/images/applications/public-art/greater-victoria-friendship-centre-walkway-streetbond-01.jpg",
    alt: "A rainbow walkway in StreetBond curving across the lawn at the Friendship Centre in Greater Victoria",
    place: "Greater Victoria",
    system: "StreetBond",
    position: "center 50%",
  },
]
