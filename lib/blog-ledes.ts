/** Pure data — no imports, so scripts/cms-seed.ts can load it under plain Node. */

/**
 * Lede photographs for the grandfathered posts, keyed by slug. The post
 * bodies and front-matter are not rewritten (they are the record as Square One
 * published it; an `unlisted` line with its reason, and a link to a post since
 * folded away, are the only edits), so the honest photograph for each is fixed here instead:
 * every path below is a Square One photograph of the project the post is
 * about, from the S1 archive. A slug mapped to "" runs without a lede — the
 * only picture on file was of a different site. Posts not listed keep their
 * front-matter image.
 */
const FIO = "/images/S1_update_v2/photos/Featured%20image%20options"
const OLD = "/images/S1_update_v2/Old%20Square%20One%20Web%20Assets"
const CROSSWALKS = `${OLD}/Galleries/Crosswalks/Gallery`

/*
 * 7 Nov 2026 (Vern: "eliminate the duplicate projects and images on the
 * 'Projects' page"): no photograph twice on /blog. Four posts wore another
 * post's photograph, or another site's; each now has one of its own or
 * none. The Studio's lead photograph wins over this map (lib/blog.ts
 * fromDoc), so scripts/fix-lead-photos.ts makes the same change there.
 */
export const LEDE: Record<string, string> = {
  // Wore the Mission parking bays, the lead of "Parking lot marking prep" (6 Nov 2026). Square One's own gallery: a StreetBond parking lot on Kingsway.
  "commercial-parking-lot-coatings-bc": `${OLD}/Galleries/Parking%20Lots/Gallery/StreetBond%20Parking%20Lot%2C%20Kingsway%2C%20Vancouver%20BC.jpg`,
  // Wore Rutland Centennial Park, Kelowna (the Rutland post's own job photograph); no photograph of the Comox path is on file.
  "decorative-asphalt-for-mckenzie-park-in-comox-bc": "",
  "boundary-road-pump-station": `${FIO}/Photo-2023-07-05-11-22-34-AM.jpg`,
  "bowen-island-stamped-asphalt-walkway": `${FIO}/Bowen-Island-asphalt-walkway-with-StreetBond150-scaled-1.jpg`,
  "brewers-park-streetbond-installation": "",
  "cesqenele-elementary-labyrinth": `${FIO}/Labyrinth-Maple-Ridge-c%CC%93%C9%99sq%C9%99nel%C9%99-Elementary-2-scaled-1.jpg`,
  "checkerboard-crosswalks-coquitlam": `${CROSSWALKS}/TrafficPatterns%20%20Custom%20Decorative%20Checker%20Crosswalk%2C%20Coquitlam%20BC.png`,
  "decorative-asphalt-for-rutland-centennial-park-kelowna": `${FIO}/Rutland-Park-Kelowna-DecoMark-StreetBond.jpg`,
  "decorative-asphalt-plaza": `${FIO}/decorative-asphalt-design-1.jpg`,
  "decorative-asphalt-sidewalk-for-langley-housing-development": `${FIO}/Decorative-asphalt-sidewalk-with-at-Reunion-housing-development-in-langley-BC-Canada.jpg`,
  "decorative-paving-stamped-asphalt": `${FIO}/decorative-crosswalk-with-stamped-asphalt-at-granville-island-brewery-crosswalk-sign-scaled-1-2048x1536.jpg`,
  "every-child-matters-new-westminster": `${FIO}/Photo-2023-09-22-1-50-34-PM.jpg`,
  "first-nations-crosswalk-design-granville-street": `${FIO}/TrafficPatterns-Robyn-Sparrow-Design-Granville-68th-Vancouver-BC.jpg`,
  "joyce-skytrain-art-installation": "/images/projects/joyce-skytrain-art-installation/joyce-station-carpeting-renee-van-halm-streetbond-02.jpg",
  "keswick-waterpark-burnaby": `${FIO}/keswick-splash-water-park-burnaby-canada-3.png`,
  "langley-events-centre-streetbond": `${FIO}/Langley-event-3-2048x1536.jpg`,
  "little-italy-vancouver-crosswalks": "/images/applications/commercial-spaces/little-italy-aerial-colourful-intersection-01.jpg",
  "mission-bc-streetscape": `${FIO}/Photo-2025-04-03-1-57-51-PM-scaled.jpg`,
  "north-vancouver-maplewoods-decorative-fire-lane": `${FIO}/maplewoods-fire-lane-north-vancouver-streetbond-01.jpg`,
  "pictograph-crosswalk-sechelt": `${CROSSWALKS}/TrafficPatterns%20Custom%20Decorative%20Crosswalk%2C%20Sechelt%20BC.png`,
  "rainbow-crosswalk-squamish": `${CROSSWALKS}/TrafficPatterns%20%20Custom%20Decorative%20Crosswalk%2C%20Squamish%20BC.png`,
  "ralphs-farm-market-decorative-parking-lot": `${FIO}/Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Stamped-Asphalt-in-Langley-BC-Canada.jpg`,
  "richmond-brighouse-translink": `${FIO}/IMG_3178-scaled-e1590114559108.jpeg`,
  "school-crosswalk-for-high-visibility": `${FIO}/visible-school-crosswalk-for-safety-6.jpg`,
  // The front-matter frame is one the client marked "not ours" (19 Sept). The post tells South Langford Elementary, whose one photograph leads the South Langford post; the guide takes the school crest in DecoMark at Katzie Elementary School (7 Nov 2026).
  "school-zone-thermoplastic-bc": `${OLD}/Galleries/Branding%20%26%20Wayfinding/Gallery/DecoMark%20Katzie%20Elementary%20School.jpg`,
  "south-langford-elementary": `${FIO}/Photo-2025-09-25-3-48-33-PM-scaled.jpg`,
  "sport-court-asphalt-paving": `${FIO}/StreetBond-Sports-Court-Brookmere-Park-Coquitlam-BC.jpg`,
  "ubc-musqueam-crosswalk": `${FIO}/UBC-crosswalk-3-300dpi.jpg`,
  "victoria-harbour-walkway": `${FIO}/StreetBond-Harbour-Walkway-Victoria-BC.jpg`,
  "white-rock-crosswalk": `${FIO}/Whiterock-Pier-Crosswalk-TrafficPatternsXD-1-scaled.jpg`,
  // The same frame as the Windsor Gate post's; the post is unlisted since 7 Nov 2026 (the same job told twice).
  "windsor-gate-townhouse-driveway-2": `${FIO}/StreetPrint-%E2%80%94-Stamped-Asphalt-Decorative-Crosswalk-Windsor-Gate.jpg`,
  "windsor-gate-townhouse-driveway": "/images/projects/windsor-gate-coquitlam/windsor-gate-crosswalk-streetprint-03.jpg",
  // Front-matter pointed at wp-content URLs that 404 on the live WordPress site —
  // the rest run without a lede until Gord sends the photograph. Tsain-Ko: the
  // old site's own photograph of the crossing, the one the post describes (7 Nov
  // 2026; the archive's "Decorative Crosswalk, Sechelt" it wore until then is the
  // Cowrie Street and Trail Avenue crossing, the pictograph post's lead).
  "traffic-pattern-crosswalk-upgrade-for-tsain-ko-centre": "/images/blog/tsain-ko-crosswalk-sechelt/featured.jpg",
  "lickman-interchange": "",
  // 19 Sept 2026: four of those now have honest frames — the captioned 2026
  // library (Oxford, Wesburn) and the old site's own post images.
  "new-westminster-oxford-townhomes": "/images/applications/driveways/new-westminster-oxford-strata-laneway-streetprint-01.jpg",
  "parc-riviera-mews-streetbond-asphalt-walkway": "/images/blog/parc-riviera-streetbond-walkway/featured.jpg",
  "townhouse-driveway-natures-walk": "/images/blog/roadway-accents-natures-walk/featured.jpg",
  "tsuyuki-park-maple-ridge": "",
  "wesburn-water-park-burnaby": "/images/applications/parks-paths/burnaby-wesburn-park-surface-streetbond-01.jpg",
  "west-vancouver-rainbow-crosswalk": "",
  "agnes-greenway-new-westminster": "/images/applications/crosswalks/new-westminster-agnes-greenway-crossing-trafficpatternsxd-01.jpg",
  "alexandra-greenway-public-art": "",
  "confederation-water-park-burnaby": "",
  "connaught-park-spray-park-renewal": "",
  "stamped-asphalt-vs-concrete-driveways-bc": "/images/S1_update_v2/photos/Driveways/Number%202.jpg",
}

/** The fixed photograph for a grandfathered post, "" for none, undefined when the slug is not listed. */
export function ledeOverride(slug: string): string | undefined {
  return slug in LEDE ? LEDE[slug] : undefined
}
