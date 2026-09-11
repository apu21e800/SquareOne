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
  {
    src: "/images/hero/white-rock-pier-crosswalk-trafficpatternsxd.jpg",
    alt: "Red TrafficPatternsXD crosswalk leading to the White Rock Pier, Semiahmoo Bay at low tide beyond",
    place: "White Rock Pier",
    system: "TrafficPatternsXD",
    year: "2019",
    position: "center 62%",
  },
  {
    src: "/images/hero/white-rock-marine-drive-wave-crosswalk.jpg",
    alt: "Artist-designed crosswalk of waves, sand and sky in TrafficPatterns on Marine Drive, White Rock",
    place: "Marine Drive, White Rock",
    system: "TrafficPatterns",
    year: "2025",
    position: "center 60%",
  },
  {
    src: "/images/hero/granville-island-crosswalk-streetprint.jpg",
    alt: "Brick-red TrafficPatternsXD crosswalk outside Granville Island Brewing, Vancouver",
    place: "Granville Island, Vancouver",
    system: "TrafficPatternsXD",
    position: "center 66%",
  },
  {
    src: "/images/hero/bowen-island-polka-dot-walkway-streetbond.jpg",
    alt: "Polka-dot StreetBond walkway with a bald eagle asking a question, Snug Cove, Bowen Island",
    place: "Snug Cove, Bowen Island",
    system: "StreetBond",
    position: "center 50%",
  },
  {
    src: "/images/hero/victoria-ellis-point-walkway-streetprint.jpg",
    alt: "British Cobble StreetPrint walkway in a warm brick tone at Ellis Point, Victoria",
    place: "Ellis Point, Victoria",
    system: "StreetPrint",
    position: "center 60%",
  },
]
