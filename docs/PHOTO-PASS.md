# Photo pass — 5 September 2026

The whole photo library reviewed on contact sheets, gallery by gallery, and
the result written down as text rather than as renamed files. `lib/curation.ts`
holds the verdicts and the gate; `lib/work.ts` hands it the photographs.

## What the library holds

- **1007 image files** on disk (166 MB), of which **339** are reachable by a visitor
  (271 rendered in the initial HTML across 120 routes, plus the gallery photographs
  that load behind "show more").
- **195 photographs** in the work record across the ten application galleries.
- **76 groups of byte-identical files** and **238 near-duplicate pairs** (perceptual
  distance ≤ 6) across the whole library — almost all of them the old WordPress
  assets duplicated into `/images/galleries/`. None of them render twice on a page.
- **118 of the 270 initially-rendered photographs are under 800px** on the long edge.
  They are the old site's 667×402 gallery tiles.

## The resolution gate

Rule 4 of the brief says hide anything under 800px. Applied literally that empties
/driveways/vancouver (7 of 7), vapour blasting (3 of 3) and strips DuraTherm,
PreMark and StreetPrint down to a handful — which collides with rule 6, improve
only, never degrade. Vern's call, 5 Sept: **no gallery is allowed to go blank.**
So the gate orders rather than deletes:

- 1200px and over — full weight, sorts first
- 800–1199px — sorts behind it
- under 800px — sorts last, but still shown

The only photographs actually hidden are the ones named in `lib/curation.ts`,
each with its reason.

## Verdicts

### crosswalks

**Lead** (in order; #1 is the hero the gallery and the page open on)

1. `UBC-crosswalk-3-300dpi.jpg`
2. `502639628_1112360040926014_5391735583045489560_n.jpg`
3. `White-Rock-crosswalk-29-1-scaled.jpg`
4. `Photo-2024-03-19-3-28-23-PM-1-scaled.jpg`
5. `IMG_1635.jpeg`
6. `DuraTherm  Decorative Crosswalk, Spirit Trail, North Vancouver BC.jpg`
7. `visible-school-crosswalk-for-safety-6.jpg`
8. `Whiterock-Pier-Crosswalk-TrafficPatternsXD-2-scaled.jpg`

**Trail** (shown last)

- `TrafficPatterns  Custom Decorative Crosswalk, Granvile & 68th, Vancouver BC.png`
- `TrafficPatterns Custom Decorative Crosswalk, Sechelt BC.png`
- `TrafficPatterns  Custom Decorative Crosswalk, Squamish BC.png`

**Uncertain — for Vern to rule on**

- `TrafficPatternsXD  Decorative Crosswalk, Commercial Dr, Vancouver BC.jpg`

### driveways

**Lead** (in order; #1 is the hero the gallery and the page open on)

1. `Number 1.jpg`
2. `Ten Mile Point Driveway I.jpg`
3. `IMG_9161.jpg`
4. `Number 2.jpg`
5. `Number 4.jpg`
6. `StreetPrint-—-Stamped-Asphalt-Decorative-Driveway-Craigdarroch-Castle-Victoria-BC.jpg`
7. `Cobblestone-stamped-asphalt-driveway-colose-up-at-Ellis-Point-Walkway-Victoria-BC-Canada.jpg`
8. `303-IMG_3928.JPG`

**Hidden**

- `StreetPrint — Stamped Asphalt   Decorative Driveway, North Saanich BC.jpg` — house number 1180 legible twice — private residence (rule 5)

### parks-paths

**Lead** (in order; #1 is the hero the gallery and the page open on)

1. `Photo-2024-06-20-11-31-39-AM-scaled-e1740159565458.jpg`
2. `Bowen-Island-asphalt-walkway-with-StreetBond150-scaled-1.jpg`
3. `Photo-2024-05-31-1-47-03-PM-1-scaled.jpg`
4. `StreetPrint-—-Stamped-Asphalt-Mount-Douglas-BC.jpg`
5. `StreetBond-Harbour-Walkway-Victoria-BC.jpg`
6. `Photo-2023-05-25-12-55-19 PM-scaled.jpg`
7. `TrafficPatterns Moody Park, New Westminster BC.jpg`
8. `StreetBond  BC Childrens Hospital, Vancouver BC.jpg`

**Trail** (shown last)

- `StreetBond Gyro Park, Saanich BC.jpg`
- `StreetBond Childrens Hospital, Vancouver BC.jpg`
- `StreetBond Olympic Oval Rochmond BC.jpg`
- `StreetBond Pedestrian Walkway, Ogden Point, Victoria BC.jpg`

**Uncertain — for Vern to rule on**

- `Photo-2025-07-07-11-54-41-AM.jpg`

### public-art

**Lead** (in order; #1 is the hero the gallery and the page open on)

1. `Labyrinth-Maple-Ridge-c̓əsqənelə-Elementary-2-scaled-1.jpg`
2. `Langley-event-3-2048x1536.jpg`
3. `IMG_6053-scaled.jpeg`
4. `Photo-2023-07-05-11-22-34-AM.jpg`
5. `Photo-2023-09-22-1-50-34-PM.jpg`
6. `TrafficPatterns-Robyn-Sparrow-Design-Granville-68th-Vancouver-BC.jpg`
7. `DecoMark Katzie Elementary, Surrey BC.jpg`
8. `decorative-asphalt-design-1.jpg`

**Trail** (shown last)

- `TrafficPatterns Rainbow Crosswalk, Sechelt BC.jpg`
- `TrafficPatterns Decorative Crosswalk, Tsawwassen Commons.jpg`
- `DecoMark Public Art, Tsawwassen Commons, Delta BC.jpg`
- `StreetBond BC Childrens Hospital.jpg`

### streetscapes

**Lead** (in order; #1 is the hero the gallery and the page open on)

1. `Photo-2023-05-19-5-56-47 PM-scaled (1).jpg`
2. `StreetPrint-—-Stamped-Asphalt-Decorative-Crosswalk-Windsor-Gate.jpg`
3. `Photo-2025-04-03-1-57-51-PM-scaled.jpg`
4. `DuraTherm St. Pauls Hospital, Comox Street, Vancouver BC.jpg`
5. `TrafficPatterns Front Street, New Westminster BC.jpg`
6. `TrafficPatternsXD Decorative Crosswalk, Kelowna BC.jpg`
7. `DuraTherm  Decorative Crosswalk, Maple Ridge BC.jpg`
8. `TrafficPatterns Checker Crosswalk, Coquitlam BC.jpg`

**Trail** (shown last)

- `Mask-Group-6.jpg`
- `TrafficPatternsXD Granville Island, Vancouver BC.jpg`
- `StreetPrint — Stamped Asphalt Parking Lot, Chilliwack BC.jpg`
- `StreetPrint — Stamped Asphalt Pathway, Chilliwack BC.jpg`
- `StreetPrint — Stamped Asphalt     Town Home, North Vancouver BC.jpg`
- `TrafficPatterns  Decorative Crosswalk, Sannich BC.jpg`
- `StreetPrint — Stamped Asphalt  Road Median, Surrey BC.jpg`

**Uncertain — for Vern to rule on**

- `StreetBond 800 Robson Street, Vancouver BC.jpg`

### parking-lots

**Lead** (in order; #1 is the hero the gallery and the page open on)

1. `Photo-2025-07-28-2-10-43-PM-scaled.jpg`
2. `Photo-2024-10-15-5-38-42-PM-scaled.jpg`
3. `Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Stamped-Asphalt-in-Langley-BC-Canada.jpg`
4. `StreetPrint-—-Stamped-Asphalt-Front-Enterence-Agassiz-BC.jpg`
5. `StreetBond-High-Visibility-Walkway-Shipspoint-Victoria-BC.jpg`
6. `DuraTherm  Decorative Yellow Crosswalk, Chilliwack BC.png`
7. `StreetPrint — Stamped Asphalt  Townhouse Parking Lot, Kelowna BC.jpg`
8. `StreetPrint & TrafficPatternsXD  Decorative Parking Lot Crosswalk, Langford BC.jpg`

**Trail** (shown last)

- `StreetBond Parking Lot, Kingsway, Vancouver BC.jpg`
- `TrafficPatterns  Decorative Crosswalk, Mayfair Mall, Victoria BC.png`
- `StreetPrint — Stamped Asphalt  Decorative Parkade, Victoria BC.png`
- `Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Red-Stamped-Asphalt.jpg`

**Uncertain — for Vern to rule on**

- `StreetPrint — Stamped Asphalt  Parking Lot, Duncan BC.png`
- `StreetPrint-—-Stamped-Asphalt-Parking-Lot-Walkway-Nanaimo-BC.jpg`
- `TrafficPatternsXD  Decorative Crosswalk, Walmart, Richmond BC.jpg`

### schools-sports-courts

**Lead** (in order; #1 is the hero the gallery and the page open on)

1. `IMG_1145.jpeg`
2. `Photo-2025-09-25-3-48-33-PM-scaled.jpg`
3. `StreetBond-Sports-Court-Brookmere-Park-Coquitlam-BC.jpg`
4. `TrafficPatternsXD  Traffic Calming Devices, View Royal BC.jpg`
5. `StreetPrint — Stamped Asphalt    Stamped Asphalt, University of British Columbia.jpg`
6. `StreetPrint — Stamped Asphalt    Arbutus Middle School, Saanich BC.jpg`
7. `StreetBond  Sports Court, Coquitlam BC.jpg`
8. `StreetBond  Traffic Calming Device, North Vancouver BC.jpg`

**Trail** (shown last)

- `Photo-2024-09-13-10-31-48-AM.jpg`
- `StreetBond  Central Middle School, Victoria BC.jpg`
- `StreetPrint — Stamped Asphalt    Quadra Elementary School, Victoria BC.jpg`

### branding-wayfinding

**Lead** (in order; #1 is the hero the gallery and the page open on)

1. `DecoMark-on-asphalt-Little-Italy-Community-Branding_Commercia-Drive-Vancouver-BC-Canada-op6t525a5rlrtdb6ycgokn391ncum7c5zqlh8og8kw.jpg`
2. `DecoMark Katzie Elementary School.jpg`
3. `DecoMark Evergreen Line, Port Moody.jpg`
4. `DecoMark — Nemo  Port Moody Park BC.jpg`
5. `DecoMark, FireTruck, City of North Vancouve.jpg`
6. `StreetBond  Community Branding, Gyro Park, Saanich BC.jpg`
7. `DecoMark Browning Park, Marine Design, Saanich BC.jpg`
8. `DecoMark, Wayfinding, Pacific Spirit Trail, North Vancouver BC.jpg`

**Trail** (shown last)

- `DecoMark Corporate Branding, Molson Coors ,Chilliwack BC.jpg`
- `Decorative-asphalt-sidewalk-with-at-Reunion-housing-development-in-langley-BC-Canada.jpg`

**Uncertain — for Vern to rule on**

- `DecoMark Electric Vehicle Decals, Bay Centre, Victoria BC.jpg`

### roundabouts

**Lead** (in order; #1 is the hero the gallery and the page open on)

1. `TrafficPatterns  Decorative Crosswalk, Sannich.jpg`
2. `StreetBond-—-Coatings-Maridian-Roundabout-Surrey-BC.jpg`
3. `StreetPrint  Roundabout, North Cowichan BC.jpg`
4. `StreetPrint-—-Stamped-Asphalt-Roundabout-Vernon-BC.jpg`
5. `StreetPrint — Stamped Asphalt  Roundabout, Duncan BC.jpg`
6. `StreetPrint — Stamped Asphalt   Maridian & Roundabout, McTavish Exchange, Victoria BC.jpg`
7. `StreetPrint — Stamped Asphalt  Roundabout, West Vancouver BC.jpg`
8. `TrafficPatternsXD  Roundabout, Kelowna BC.jpg`

**Trail** (shown last)

- `TrafficPatterns Decorative Crosswalk, Sannich.jpg`

### bike-lanes

**Lead** (in order; #1 is the hero the gallery and the page open on)

1. `Photo-2024-07-04-10-58-08-AM-scaled.jpg`
2. `PreMark  Blue Bike Lane, Richmond BC.jpg`
3. `TrafficPatternsXD & PreMark Bike Lane & Crosswalk, Kelowna BC.jpg`
4. `PreMark Green Bike Lane.jpg`
5. `TrafficPatterns Green Bike Lane, North Vancouver BC.jpg`

**Trail** (shown last)

- `Cycle Grip MMAX Lower Levels Hwy, North Vancouver BC.jpg`
- `PreMark  Green Bike Lane, North Vancouver BC.jpg`
- `PreMark Green Bike Lane, North Vancouver BC.jpg`
- `PreMark Green Bike Lane, Assembly.jpg`

## Uncertain — the whole list, one decision each

Nothing below has been acted on.

1. **Children in frame.** `Photo-2025-07-07-11-54-41-AM.jpg` (Maple Ridge spray
   park) is the best spray-park photograph in the library and it is full of
   children. Do Gord and Jan have consent to use it in marketing?
2. **Third-party wordmarks.** Walmart (×2), RONA, Hillside Mall, Bay Centre and
   Ralph's Farm Market are legible in parking-lot and wayfinding photographs of
   real Square One installs. Fine to show the client's brand, or not?
3. **People at the kerb.** `Little Italy` and `800 Robson Street` carry
   pedestrians; faces are small and incidental. Keep?
4. `Public-Art@2x.jpg` (934×504) looks like a wider crop of the BC Children's
   Hospital labyrinth already on the site at 666×379. Same photograph or not?
   If it is, it replaces the smaller one.

## Held for approval

Two page heroes. Neither has been changed — see the before/after sheet.

- **/resources** runs a 666×402 photograph full-bleed, against the rule that low-
  resolution sources never run full-bleed. Proposed: the Langley railroad-inspired
  crosswalk, 2400×1800.
- **/applications** and **/about** share the same White Rock photograph. Proposed:
  give /applications the Nanaimo rainbow intersection, 2048×1152, and leave White
  Rock to /about.

## Still to place

43 photographs in `public/images/S1_update_v2/photos/` have never been on the site
— 15 driveways at 1024×768 and 28 in "Featured image options", 22 of them 1200px+.
They are strong: spray parks, sports courts, medallions, a labyrinth, a compass
rose. Each needs a caption Square One can vouch for before it goes up, because the
filenames mostly do not say where the work is (rule 2: never invent provenance).
Contact sheets are in the photo-pass working folder.

## Changed on disk

Originals copied to `public/images/_pre-photo-pass/` first; nothing was renamed.

- Four school sports-court tiles replaced at the same path by the studio's own
  copy of the same photograph at twice the resolution (667×402 → 1334×804).
- `mmax-green-sharrow-bike-lane-close-01.jpg` stood upright (it carried EXIF
  orientation 6 and rendered on its side).
- GPS coordinates stripped from two blog photographs.
- Every write: EXIF orientation applied, metadata dropped, long edge capped at
  2400px, JPEG quality 85.

## Known defect, not fixed here

`lib/products.ts` references `/images/S1_update_v2/logos/streetbond/streetbond-color
tile-vector.svg`, which is not on disk. It is the only genuinely broken image
reference on the site.
