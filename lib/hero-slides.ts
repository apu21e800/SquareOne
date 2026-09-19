/**
 * The home reel — five of Square One's own frames, every caption the record's
 * place · system · year. Lives outside the client component so app/page.tsx
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
  // 19 Sept 2026 (Vern: "choose better images for the homepage — the old
  // site had more current images"). Five frames from the 2026 library,
  // every one on the record (lib/work-captions.ts): the core service first,
  // then the range — civic art, a crossing, a park, a laneway. Nothing here
  // repeats a frame that Selected Work or the services grid already shows.
  {
    src: "/images/applications/roundabouts/maple-ridge-roundabout-centre-streetprint-01.jpg",
    alt: "A brick-red StreetPrint roundabout apron under a clear sky in Maple Ridge, installed by Square One",
    place: "Maple Ridge",
    system: "StreetPrint",
    position: "center 62%",
  },
  {
    src: "/images/applications/public-art/oak-bay-village-intersection-wide-streetbond-01.jpg",
    alt: "A painted medallion of a heron and a salmon in StreetBond filling the Oak Bay Village intersection, seen from above",
    place: "Oak Bay Village",
    system: "StreetBond",
    position: "center 52%",
  },
  {
    src: "/images/applications/crosswalks/delta-gateway-casino-brick-crossing-trafficpatterns-01.jpg",
    alt: "A red brick-pattern TrafficPatterns crossing with white edge lines running toward the fields in Delta",
    place: "Delta",
    system: "TrafficPatterns",
    position: "center 64%",
  },
  {
    src: "/images/applications/parks-paths/surrey-marine-spray-park-from-above-streetbond-01.jpg",
    alt: "A spray park in Surrey from above — a river of blue StreetBond through green and yellow leaf shapes",
    place: "Surrey",
    system: "StreetBond",
    position: "center 55%",
  },
  {
    // 19 Sept, later: the dusk driveway read as mud at a glance (Vern: "no
    // sucky images") — the wet Oxford laneway carries the residential note
    // in daylight, sharp to the drain.
    src: "/images/applications/driveways/new-westminster-oxford-strata-laneway-wet-streetprint-01.jpg",
    alt: "A wet herringbone StreetPrint strata laneway between two rows of townhomes in New Westminster, a white band across the drain",
    place: "New Westminster",
    system: "StreetPrint",
    position: "center 60%",
  },
]
