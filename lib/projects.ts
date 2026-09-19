/**
 * Project record — every entry is an installation Square One has published on
 * its own site or blog, with the studio's own photography. Nothing here is
 * inferred from stock imagery, and no client, artist, date or place appears
 * unless Square One has stated it.
 *
 *   images[0]   the hero. `heroWide` is true only when that file is ≥1600px
 *               wide and may run full-bleed; otherwise the detail page keeps
 *               the hero contained (low-res never goes big — house rule).
 *   year        only when Square One published an installation date.
 *   flag        location inferred from photo dates and landscape, awaiting a
 *               yes from Square One. Shown, but listed in the review notes.
 *
 * Order is the business hierarchy: municipal and commercial work first,
 * residential driveways last.
 */

export type ProjectService =
  | "Stamped Asphalt"
  | "Decorative Coatings"
  | "Preformed Thermoplastic"
  | "Vapour Blasting"

export type ProjectRegion =
  | "Lower Mainland"
  | "Vancouver Island"
  | "Interior"
  | "Sunshine Coast"
  | "Sea to Sky"

export interface Project {
  title: string
  slug: string
  service: ProjectService
  /** Matches a WORK_APPS label in lib/work.ts so pages can cross-link. */
  application: string
  city: string
  region: ProjectRegion
  systems: string[]
  client?: string
  artist?: string
  year?: string
  excerpt: string
  /**
   * The project, told — two to four paragraphs beneath the excerpt. Written
   * only from the record: this entry, the matching blog post, the captioned
   * photographs and HUB's published product facts (attributed). No client,
   * artist, date, dimension or place that Square One has not stated.
   */
  story?: string[]
  /** Slug of the blog post that tells this project in full, when one exists. */
  post?: string
  images: string[]
  /** Convenience alias for images[0] — older callers read this. */
  imageUrl: string
  heroWide: boolean
  featured?: boolean
  flag?: boolean
}

type ProjectInput = Omit<Project, "imageUrl">

const FIO = "/images/S1_update_v2/photos/Featured%20image%20options"
const DRV = "/images/S1_update_v2/photos/Driveways"
const GAL = "/images/S1_update_v2/Old%20Square%20One%20Web%20Assets/Galleries"

const records: ProjectInput[] = [
  // ── Municipal & civic ────────

  {
    title: "Rainbow intersection — Nanaimo",
    slug: "nanaimo-rainbow-intersection",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Nanaimo, BC",
    region: "Vancouver Island",
    systems: ["TrafficPatternsXD"],
    year: "2025",
    featured: true,
    excerpt:
      "A full intersection in rainbow colour, installed June 2025 in TrafficPatternsXD — aggregate-reinforced preformed thermoplastic fused into stamped asphalt, so the colour holds under turning traffic and plow blades.",
    story: [
      "This Nanaimo crossing is not one crosswalk but the whole junction. Bands of red, orange, yellow, green, blue and purple run edge to edge across the intersection, with a chevron of black, brown, light blue, pink and white cutting in from one corner, and the white crosswalk lines set into the colour. An intersection is harder on a surface than a mid-block crossing: every vehicle that passes turns across it, and the surface has to take plough blades as well as tires.",
      "Square One installed it in June 2025 in TrafficPatternsXD, an aggregate-reinforced preformed thermoplastic. The manufacturer publishes it as a 150-mil sheet, heavier than standard TrafficPatterns, heated and stamped into the top layer of prepared asphalt rather than laid on it, with fresh anti-skid elements exposed as the sheet wears. It is the system the manufacturer positions for major intersections and transit hubs, which is what a full-intersection treatment is.",
      "The photographs show the intersection from above, the cones still out, and from street level, where the bands meet the kerb and the tactile paving at the corner. A municipality planning a full-intersection treatment should ask for TrafficPatternsXD rather than a coating, and for the standard crosswalk lines to be part of the design from the first drawing.",
    ],
    images: [
      `${FIO}/502639628_1112360040926014_5391735583045489560_n.jpg`,
      `${FIO}/504448297_1112360024259349_5235743119624258372_n-1.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Railroad-inspired crosswalk — Langley",
    slug: "langley-railroad-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Langley, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatternsXD"],
    client: "City of Langley",
    year: "2025",
    featured: true,
    excerpt:
      "Rail ties in tan thermoplastic set into dark stamped asphalt — a nod to the city's railway history, installed March 2025 in TrafficPatternsXD at the heritage block in the City of Langley.",
    story: [
      "The crossing at the heritage block nods to the City of Langley's railway history, and the design is a track seen from above: two continuous white rails with a run of tan ties between them, set into a field of dark stamped asphalt across the street. It reads as a crosswalk at a glance and as a piece of local history a moment later.",
      "Square One installed it in March 2025 in TrafficPatternsXD, an aggregate-reinforced preformed thermoplastic. Each tie is a cut sheet, heated and stamped into the prepared asphalt so it sits flush with the surface rather than on top of it. The manufacturer publishes the sheet at 150 mil, heavier than standard TrafficPatterns, with new anti-skid elements exposed as it wears, and positions it for the crossings that carry the most traffic.",
      "One photograph looks along the crossing toward the intersection, the ties receding like a track; the other is close enough to show the tan panels fused flush into the black asphalt beside the white lines. A municipality with a story to tell in the pavement should ask for a design that works as a marking first, and for TrafficPatternsXD where the crossing carries daily traffic.",
    ],
    images: [
      `${FIO}/Photo-2025-03-07-2-54-05-PM-scaled.jpg`,
      `${FIO}/Photo-2025-03-06-3-06-49-PM-scaled-e1743101603782.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Artist-designed crosswalk — White Rock",
    slug: "white-rock-custom-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "White Rock, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatterns"],
    year: "2025",
    featured: true,
    excerpt:
      "Waves, sand and sky in custom aggregate-reinforced TrafficPatterns — an artist's design for a downtown White Rock crossing, installed spring 2025.",
    story: [
      "White Rock is a waterfront town, and this downtown crossing carries the shoreline across the road: a band of sand at one end, then water in two blues with white wave lines running through it, all held between white borders. The design is an artist's. The brief for the installer was to reproduce it exactly, at street scale, in a material that would take traffic.",
      "Square One installed it in spring 2025 in TrafficPatterns preformed thermoplastic. The sheets are cut to the artwork before they arrive on site and then heat-fused to the pavement in place, which is how a curve drawn on paper keeps its line on the road. The manufacturer publishes the sheet at 125 mil with anti-skid elements throughout, and says a crossing can be open to traffic within minutes of application, which matters on a downtown street that cannot close for long.",
      "The photographs show the crossing between new residential towers and the shops on the far side, with the tactile strip at the kerb and the red-brown sidewalk bands picking up the colour of the sand. A municipality or business district commissioning crosswalk art should ask for the artwork to be prepared as cut thermoplastic sheets, so what goes into the road is what the artist drew.",
    ],
    images: [
      `${FIO}/White-Rock-crosswalk-29-1-scaled.jpg`,
      `${FIO}/White-Rock-crosswalk-32-scaled.jpg`,
      `${FIO}/White-Rock-Crosswalk.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "UBC & Musqueam Crosswalk",
    slug: "ubc-musqueam-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Vancouver, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatterns"],
    client: "University of British Columbia and Musqueam",
    featured: true,
    excerpt:
      "A feature crosswalk at University Boulevard and Wesbrook Mall, built with UBC and Musqueam — the two crests woven together in TrafficPatterns, acknowledging that the campus stands on unceded Musqueam territory.",
    story: [
      "At University Boulevard and Wesbrook Mall, the crosswalk carries the crests of UBC and Musqueam woven together rather than set side by side. The design came out of conversations between the university and the Musqueam Indian Band, and weaving the two was deliberate: every pedestrian who crosses is reminded that the campus stands on unceded Musqueam territory. The brief to Square One was to render that design so it reads cleanly from a driver's sightline and holds its colours under BC sun.",
      "The crossing is TrafficPatterns preformed thermoplastic. The sheets come pre-cut from the artwork; the crew heats the asphalt and the sheet together and the material fuses into the road surface as it cools, so the marking is part of the pavement rather than something sitting on it. The manufacturer publishes the sheet at 125 mil with anti-skid elements throughout, made to the owner's marking standard, and open to traffic within minutes of application.",
      "The photographs show the crossing in blue, green and gold at the foot of the UBC letters, with an express bus rolling across it, and a close view of the salmon in white and grey at the centre of the design. A university or First Nations partner planning a crossing of this kind should ask for the artwork to be prepared as cut thermoplastic sheets, and for colour and placement to be walked through before the install day.",
    ],
    post: "ubc-musqueam-crosswalk",
    images: [
      `${FIO}/UBC-crosswalk-3-300dpi.jpg`,
      `${FIO}/UBC-Crosswalk-TrafficPatterns_20191010_143939-scaled.jpg`,
      "/images/projects/ubc-musqueam-crosswalk/ubc-musqueam-crosswalk-trafficpatterns-01.jpg",
      "/images/projects/ubc-musqueam-crosswalk/ubc-musqueam-crosswalk-trafficpatterns-04.jpg",
      "/images/projects/ubc-musqueam-crosswalk/ubc-musqueam-salmon-detail-01.jpg",
      "/images/projects/ubc-musqueam-crosswalk/ubc-musqueam-crosswalk-trafficpatterns-03.jpg",
    ],
    heroWide: true,
  },
  {
    title: "Musqueam crosswalk on Granville Street",
    slug: "granville-street-musqueam-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Public art",
    city: "Vancouver, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatterns"],
    client: "Musqueam",
    artist: "Robyn Sparrow",
    excerpt:
      "An original crosswalk design by Musqueam artist Robyn Sparrow, rendered in TrafficPatterns on Granville Street and unveiled to coincide with National Indigenous Peoples Day.",
    story: [
      "On Granville Street, in collaboration with Musqueam, Square One installed a crosswalk designed by Musqueam artist Robyn Sparrow, unveiled to coincide with National Indigenous Peoples Day. The design is a run of nested chevrons in deep red, gold, grey and mauve that spans the full width of the crossing. It is the kind of project that shows what a road surface can do when it is treated as community recognition rather than traffic management alone.",
      "Robyn Sparrow's artwork was translated into the colour separations and sheet geometry that TrafficPatterns preformed thermoplastic is cut from, and Square One worked with the Musqueam project team on colour, scale and placement so the finished crossing reads as it was designed. Because the sheets arrive cut, the geometry holds however complex the design; because they are heat-fused into the asphalt, the work is quick enough that an intersection can close for a single work day rather than several.",
      "The photographs show the chevrons close up, where the flush edges of the fused sheets are visible, and from across Granville Street with traffic passing over them. The manufacturer publishes the sheet at 125 mil with anti-skid elements throughout. A municipality or Nation commissioning artwork for a crossing should ask for the artist's file to be prepared for cut sheets early, so colour and scale are settled before anything is heated.",
    ],
    post: "first-nations-crosswalk-design-granville-street",
    images: [
      `${FIO}/TrafficPatterns-Robyn-Sparrow-Design-Granville-68th-Vancouver-BC.jpg`,
      `${FIO}/decorativ-crosswalk_granville-and-70th.jpg`,
    ],
    heroWide: false,
  },
  {
    title: "Public art at Joyce SkyTrain Station",
    slug: "joyce-skytrain-art-installation",
    service: "Decorative Coatings",
    application: "Public art",
    city: "Vancouver, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    client: "TransLink",
    artist: "Renée Van Halm",
    featured: true,
    excerpt:
      "Renée Van Halm's 'Carpeting' rendered in StreetBond across the concourse at Joyce Station — commissioned through the transit system's public art program and installed during overnight non-revenue windows.",
    story: [
      "'Carpeting', by Vancouver-based artist Renée Van Halm, runs across the concourse at Joyce–Collingwood Station, installed at TransLink's SkyTrain, as a field of coloured blocks, orange, blue, pink, green, red, yellow and purple, laid out like a carpet across the pedestrian transition zones. It was commissioned through the transit system's public art program. A station concourse is a hard place for colour: continuous foot traffic, wheeled luggage and strollers, winter salt tracked in from the platform stairs, and daily wet cleaning with industrial equipment.",
      "The piece is rendered in StreetBond, a water-based acrylic pavement coating chosen for how it holds up in that environment. The manufacturer publishes it for asphalt and concrete, with an anti-skid aggregate and an 8+ year life cycle that is recoated rather than replaced. Colour was matched to the artist's specification under both natural and station lighting, with sample panels run on site first, and the substrate was vapour-blasted back to a uniform profile before any coating went down.",
      "Joyce Station did not close. The work happened in phased overnight windows outside revenue hours, staged after the last train and cleared, cured enough to walk on, before the first morning departures, with transit dispatch, station agents and security coordinated each night. The cure window and the overnight work window had to line up exactly; a miscue on either side would have shut the concourse, which was not an option.",
      "The photograph shows the blocks wrapping around a tree well and a wayfinding sign, with the same colours carried up the walls of a small station structure. A transit agency or public art program planning a surface installation should ask for on-site colour panels, a masking and sequencing plan for the colour boundaries, and a cure schedule that fits inside the operating window.",
    ],
    post: "joyce-skytrain-art-installation",
    images: [
      "/images/projects/joyce-skytrain-art-installation/joyce-collingwood-station-plaza-streetbond-01.jpg",
      "/images/projects/joyce-skytrain-art-installation/joyce-station-carpeting-renee-van-halm-streetbond-02.jpg",
    ],
    heroWide: false,
  },
  {
    title: "Victoria High School — whorl and canoes",
    slug: "victoria-high-school-whorl-canoes",
    service: "Preformed Thermoplastic",
    application: "Public art",
    city: "Victoria, BC",
    region: "Vancouver Island",
    systems: ["DecoMark", "StreetBond"],
    client: "Victoria High School",
    year: "2024",
    excerpt:
      "DecoMark and StreetBond coatings combined for two art installations at Victoria High School — a First Nations whorl at the entrance and a run of canoes down the plaza walk. Installed May 2024.",
    story: [
      "Two installations at Victoria High School, completed in May 2024. At the entrance, a First Nations whorl: a circle in deep red carrying faces and forms in brown, black and white, set into the concrete pad at the foot of the school steps. Down the plaza walk, a run of canoes: several canoe forms in a row on a teal field, with a grey band beside them carrying a globe, a hand and a feather.",
      "Both pieces combine DecoMark and StreetBond, cut graphics and coated colour working together. DecoMark is a preformed thermoplastic for fully custom graphics, heat-fused to the pavement, which the manufacturer publishes with the same durability as standard road-marking thermoplastic. StreetBond is a water-based acrylic coating for asphalt or concrete, with an anti-skid aggregate and an 8+ year life cycle that is recoated rather than replaced.",
      "The walk the canoes sit in is a red tile-pattern surface; Square One's captioned photographs record StreetPrint stamped asphalt on the Vic High approach and forecourt. The photographs here show the whorl from the steps, the canoe run from above with the school's brick and glass behind it, and the canoes close up. A school or district planning artwork in its grounds should ask for DecoMark where the figures need sharp edges and StreetBond where the design needs a field of colour.",
    ],
    images: [
      `${FIO}/IMG_4531-scaled.jpeg`,
      `${FIO}/IMG_5995-scaled-e1720551462740.jpeg`,
      `${FIO}/IMG_6053-scaled.jpeg`,
    ],
    heroWide: true,
  },
  {
    title: "Brighouse Station — TrafficPatternsXD crosswalks",
    slug: "richmond-brighouse-translink",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Richmond, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatternsXD"],
    client: "TransLink",
    featured: true,
    excerpt:
      "TrafficPatternsXD crosswalks within the Brighouse Station development area and across No. 3 Road — heavy-duty decorative marking installed at TransLink's Canada Line terminus in Richmond.",
    story: [
      "Brighouse Station sits at the south end of the Canada Line, where No. 3 Road runs through one of the busier transit interchanges on the Lower Mainland: bus bays, taxi ranks, rideshare pickups, and pedestrians from early morning until midnight. The brief was TrafficPatternsXD across the pedestrian transition zones, within the station development area and across No. 3 Road itself.",
      "TrafficPatternsXD is a heavy-duty preformed thermoplastic: 150-mil aggregate-reinforced sheets, heated and stamped into the top layer of prepared asphalt, with new anti-skid elements exposed as the surface wears. The manufacturer positions it for transit hubs and major intersections. The colour runs through the full depth of the sheet rather than sitting on top, so wear from buses and delivery vehicles does not erase the marking the way it erases paint.",
      "Transit sites do not close for pavement work. The crew worked in coordinated overnight windows, staging after the last revenue train and clearing before morning service. Before the sheets went down the substrate was assessed and prepared, with oil, adhesive residue and surface contamination removed in the same window, because a thermoplastic install over a contaminated substrate is a failed install waiting to surface.",
      "The photographs show the crossing in a pale grey large-format tile pattern with a white border under the Canada Line guideway, a train on the guideway above and a delivery van waiting at the line. A transit agency planning markings at a station should ask three things: how the material reads under the site's lighting, how long it lasts against the maintenance window, and whether the install fits the overnight operating gap.",
    ],
    post: "richmond-brighouse-translink",
    images: [
      `${FIO}/IMG_3178-scaled-e1590114559108.jpeg`,
      "/images/projects/richmond-brighouse-translink/brighouse-station-crosswalk-trafficpatternsxd-01.jpg",
    ],
    heroWide: true,
  },
  {
    title: "Circle of Life — Langley Events Centre",
    slug: "langley-events-centre-streetbond",
    service: "Decorative Coatings",
    application: "Public art",
    city: "Langley, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    artist: "Nəq̓ɑɬc̓i (Drew Atkins) and Miməwqθelət (Elinor Atkins), k'wy'i'y'e Spring Salmon Studio",
    featured: true,
    excerpt:
      "A circular gathering-space motif portraying the Circle of Life, designed by Drew and Elinor Atkins of Spring Salmon Studio and installed in StreetBond across the plaza at Langley Events Centre.",
    story: [
      "'Circle of Life' fills a circle in the forecourt of the Langley Events Centre, the first surface every visitor walks across. The artists, Drew Atkins and Elinor Atkins of Spring Salmon Studio, were commissioned to make a permanent installation that grounds the arrival at the building in the cultural context of the land it stands on. Circular motifs in the artists' tradition speak to continuity, ceremony and interdependence.",
      "It is rendered in StreetBond, a water-based acrylic pavement coating. The manufacturer publishes more than fifty standard colours with custom mixing, and custom tones were mixed here to match the artists' specification sheets. Test panels were run on site and the artists reviewed them in daylight before the full install went ahead. Centre-lines for the circular pattern were plotted onto the real surface and the colour boundaries masked so each edge stayed crisp under a coating that self-levels as it cures.",
      "The photographs show the circle on the pale plaza with the stadium lights and grandstand behind it, and from above: a blue profile at the centre, ringed by forms in orange, green and teal. The manufacturer publishes StreetBond with an anti-skid aggregate and an 8+ year life cycle, recoated rather than replaced. A civic body commissioning an artist-led surface should ask for colour matched to the artist's sheets and for panels the artist signs off on site.",
    ],
    post: "langley-events-centre-streetbond",
    images: [
      `${FIO}/Langley-event-3-2048x1536.jpg`,
      "/images/projects/langley-events-centre-streetbond/langley-events-centre-streetbond-01.jpg",
      `${FIO}/GPTempDownload-1-scaled-e1731616674862-2000x1213.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Every Child Matters — New Westminster",
    slug: "every-child-matters-new-westminster",
    service: "Preformed Thermoplastic",
    application: "Public art",
    city: "New Westminster, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatterns"],
    client: "Orange Shirt Society, City of New Westminster and Spirit of Children Society",
    artist: "Charliss Santos",
    year: "2023",
    excerpt:
      "Every Child Matters pavement art for the National Day for Truth and Reconciliation — the 2023 national design by Charliss Santos, installed in TrafficPatterns on September 22, 2023.",
    story: [
      "On September 22, 2023, in the lead-up to the National Day for Truth and Reconciliation, Square One installed an Every Child Matters pavement piece in New Westminster. The design is Charliss Santos's, the 2023 winner of the national Every Child Matters T-shirt design contest, and the work was made possible through the Orange Shirt Society, the municipality and the Spirit of Children Society. It is not a poster that comes down; it is in the ground every day of the year.",
      "The piece is TrafficPatterns preformed thermoplastic. The sheets were pre-cut from the artist's artwork and installed in a single heat cycle: the asphalt and the sheet are brought to bonding temperature together and fuse as they cool, so the finished surface is part of the pavement rather than a coating over it. The manufacturer publishes the sheet at 125 mil with anti-skid elements throughout. The choice here was about holding the edges and colours of a design that carries the weight this one does.",
      "The photographs show an orange field set into the paving of a public square, with the design in black, two hands holding a circle and the words Every Child Matters, and a view from above with the bollards at the square's edge. Square One's role was narrow: not the design, not the funding, not the meaning, only the surface. A municipality or organization planning an observance piece should ask for cut thermoplastic sheets from the artist's file so the artwork is reproduced exactly.",
    ],
    post: "every-child-matters-new-westminster",
    images: [
      `${FIO}/Photo-2023-09-22-1-50-34-PM.jpg`,
      `${FIO}/GPTempDow-e1703097129496.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Little Italy crosswalks — Commercial Drive",
    slug: "little-italy-vancouver-crosswalks",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Vancouver, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatternsXD", "DecoMark"],
    featured: true,
    excerpt:
      "Crosswalks at three Commercial Drive intersections in the green, white and red of the Italian flag — TrafficPatternsXD crossings with DecoMark neighbourhood branding for Little Italy.",
    story: [
      "The stretch of Commercial Drive that Vancouver still calls Little Italy now carries its identity in the road. Crosswalks at three intersections are laid out in the green, white and red of the Italian flag, and the sidewalk corners carry a round Little Italy, The Drive medallion in the same colours. The work was installed in coordination with the Commercial Drive Business Society.",
      "The crossings are TrafficPatternsXD, an aggregate-reinforced preformed thermoplastic, because a crosswalk on the Drive takes turning and through traffic, winter salt and abrasion, and a painted tricolour would be visibly worn within a season or two. The manufacturer publishes the sheet at 150 mil, heated and stamped into the asphalt, with new anti-skid elements exposed as it wears. The medallions are DecoMark, preformed thermoplastic for custom graphics, used here as neighbourhood branding.",
      "Commercial Drive does not close for pavement work, so the crossings went in intersection by intersection in overnight blocks: closed, prepped, marked, installed and reopened before morning traffic. Prep was the longest part of each night, clearing oil, gum and surface film so the thermoplastic would bond. The layout meets the city's crosswalk-visibility standard while still reading as the flag.",
      "The photographs show the intersection from above, with the coloured crossings meeting at the intersection, a crossing at street level with the pattern in angular blocks of green, white and red, and the medallion at the kerb. A business improvement area planning branded crossings should ask for TrafficPatternsXD in the road and DecoMark for the branding, with the layout checked against the city's marking standard before anything is cut.",
    ],
    post: "little-italy-vancouver-crosswalks",
    images: [
      "/images/applications/commercial-spaces/little-italy-aerial-colourful-intersection-01.jpg",
      `${FIO}/IMG_1635.jpeg`,
      `${FIO}/DecoMark-on-asphalt-Little-Italy-Community-Branding_Commercia-Drive-Vancouver-BC-Canada-op6t525a5rlrtdb6ycgokn391ncum7c5zqlh8og8kw.jpg`,
      "/images/projects/little-italy-vancouver-crosswalks/little-italy-community-branding-decomark-01.jpg",
    ],
    heroWide: false,
  },
  {
    title: "Granville Island crosswalk — two years on",
    slug: "granville-island-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Vancouver, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatternsXD"],
    excerpt:
      "A TrafficPatternsXD crosswalk outside Granville Island Brewing, photographed just over two years after installation and looking as it did on day one — the case for aggregate-reinforced thermoplastic under delivery traffic.",
    story: [
      "Granville Island is not a gentle test. Delivery trucks serve the Public Market, transit buses run through, passenger vehicles turn over constantly and, in summer, pedestrian volumes at the crossings are intense. The TrafficPatternsXD crosswalk outside Granville Island Brewing was photographed just over two years after it went in, and it looked as it did on the first day: colour still saturated, edges still clean, no delamination at the margins.",
      "Square One installed it in cooperation with the manufacturer. TrafficPatternsXD is a heavy-duty preformed thermoplastic, 150-mil aggregate-reinforced sheets heated and stamped into the top layer of prepared asphalt, and the manufacturer publishes it for the busiest crossings, with new anti-skid elements exposed as the sheet wears. It was specified here because crossing frequency and turning vehicles would have worn a lesser material early.",
      "The photographs show a red-brown brick pattern with white borders running from the kerb to the brewery doors, a truck waiting at the line, and a wet day with the pedestrian sign in the foreground. Two years at a crossing like this is the equivalent of many more at a suburban intersection, which is why the check-in was worth recording. A developer or municipality asking how long a crossing will last should ask to see installed work of a similar age under similar traffic.",
    ],
    post: "decorative-paving-stamped-asphalt",
    images: [
      `${FIO}/decorative-crosswalk-with-stamped-asphalt-at-granville-island-brewery-crosswalk-sign-scaled-1-2048x1536.jpg`,
      `${FIO}/decorative-crosswalk-with-stamped-asphalt-at-granville-island-beer-scaled-1-2048x1536.jpg`,
      `${GAL}/Crosswalks/Gallery/TrafficPatternsXD%20%20Decorative%20Crosswalk%2C%20Granville%20Island%2C%20Vancouver%20BC.png`,
    ],
    heroWide: true,
  },
  {
    title: "White Rock Pier crosswalk",
    slug: "white-rock-pier-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "White Rock, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatternsXD"],
    excerpt:
      "When the rebuilt White Rock Pier re-opened on the Labour Day weekend, it came with a new TrafficPatternsXD decorative crosswalk at the waterfront — brick pattern, sea air, and thousands of visitors a day.",
    story: [
      "When White Rock reopened the rebuilt pier over the Labour Day long weekend, the approach came with a new TrafficPatternsXD crosswalk. The pier is among the most heavily used waterfront promenades on the Lower Mainland; on a summer weekend, families, cyclists and dog walkers converge on the same narrow coastal approach. The crossing here has to work as a traffic-safety element first and a piece of the streetscape second.",
      "Square One recommended the XD line over standard TrafficPatterns for this site because of the concentrated pedestrian loads on summer weekends and the salt spray and sun of a foreshore location. TrafficPatternsXD is an aggregate-reinforced preformed thermoplastic; the manufacturer publishes it at 150 mil, heated and stamped into prepared asphalt, with new anti-skid elements exposed as it wears. The install is a direct torch-and-fuse process: heat the substrate, position the pre-cut sheets, torch through, and the crossing is ready for foot and vehicle traffic within a few hours of cooling.",
      "The photographs show a brick pattern in red-brown between white borders, running from the road to the bollards and the Memorial Park sign, with the pier, the beach and the water beyond. A municipality specifying crossings as part of a waterfront or high-pedestrian civic upgrade should ask which grade of thermoplastic the site's loads call for, and for the crossing to be on the renovation drawings rather than added afterwards.",
    ],
    post: "white-rock-crosswalk",
    images: [
      `${FIO}/Whiterock-Pier-Crosswalk-TrafficPatternsXD-1-scaled.jpg`,
      `${FIO}/Whiterock-Pier-Crosswalk-TrafficPatternsXD-2-scaled.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Sports-themed crosswalk — Beban Park, Nanaimo",
    slug: "beban-park-sports-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Nanaimo, BC",
    region: "Vancouver Island",
    systems: ["Preformed thermoplastic"],
    excerpt:
      "A colourful crossing connecting the Beban Park parking lot to the pool, social centre and arena — hockey sticks, baseballs and bikes in preformed thermoplastic on a route walked by thousands of kids.",
    story: [
      "At Beban Park in Nanaimo, the route from the parking lot to the pool, social centre and arena is walked by thousands of kids. The crossing that connects them is themed to what they are walking toward: a field of blue and green waves carrying white sports icons outlined in orange, skates, a hockey stick, baseballs, a bicycle, a soccer ball, a tennis racket, footprints, held between white borders.",
      "The crossing is preformed thermoplastic; Square One's photo record files it under TrafficPatterns, a preformed thermoplastic system. Each icon and each wave is a cut piece, heat-fused to the pavement in place, so the shapes stay crisp and the colour runs through the sheet rather than sitting on top of it. The manufacturer publishes the sheet at 125 mil with anti-skid elements throughout, and says a crossing can be open to traffic within minutes of application.",
      "The photographs show the crossing from the parking-lot side with the lot and the trees beyond, and straight down from above, where the whole design can be read at once. A parks department planning a crossing at a pool, arena or school should ask for the design to be cut in thermoplastic rather than painted, so the icons keep their edges under traffic and the borders still read as a crosswalk to drivers.",
    ],
    images: [
      `${FIO}/Photo-2024-03-19-3-28-23-PM-1-scaled.jpg`,
      `${FIO}/432882580_808070794688275_3605505723429052731_n-e1715193644580.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Terry Fox Hometown Square — Port Coquitlam",
    slug: "terry-fox-hometown-square",
    service: "Decorative Coatings",
    application: "Public art",
    city: "Port Coquitlam, BC",
    region: "Lower Mainland",
    systems: ["StreetBond", "DecoMark"],
    excerpt:
      "The plaza at Port Coquitlam Community Centre, officially renamed Terry Fox Hometown Square — StreetBond colour fields with DecoMark medallions marking the days and miles of the Marathon of Hope.",
    story: [
      "Terry Fox grew up in Port Coquitlam, and the plaza at the community centre that bears his name was officially renamed Terry Fox Hometown Square. It is where the community gathers, where children play and where events are held. As part of that transformation Square One was engaged to install StreetBond and DecoMark surface treatments across the plaza.",
      "StreetBond, a water-based acrylic coating, carries the colour field, the broad zones that set the character of the square. DecoMark, a preformed thermoplastic for custom graphics, carries the detail: cut medallions with imagery and text tied to Terry Fox and the Marathon of Hope. Each medallion marks a day of the run, the date, the place, the day count, the miles run that day and the running total, around the silhouette of Terry running.",
      "The photograph shows two of the medallions in dark red with a blue ring and white lettering, set along a brick-pattern route that winds across a sand-coloured field with shapes in teal. The manufacturer publishes StreetBond for asphalt and concrete with an anti-skid aggregate, and DecoMark with the same durability as standard road-marking thermoplastic. A municipality planning a commemorative plaza should ask for a coating for the field and cut thermoplastic for anything that has to carry words.",
    ],
    post: "decorative-asphalt-plaza",
    images: [`${FIO}/decorative-asphalt-design-1.jpg`],
    heroWide: false,
  },
  {
    title: "Boundary Road Pump Station — quilt motif",
    slug: "boundary-road-pump-station",
    service: "Decorative Coatings",
    application: "Public art",
    city: "Boundary Road, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    excerpt:
      "A utility site turned landmark — a StreetBond quilt motif in eight colours wrapping the paths and stairs around the Boundary Road pump station, so a piece of infrastructure reads as public art.",
    story: [
      "Pump stations, substations and treatment works are in every municipality, and most are either hidden or plainly unremarkable where they break the surface. The Boundary Road pump station took a different approach. A quilt motif in eight colours of StreetBond wraps the paths, the plaza and the stairs around the station, so the site reads as public art rather than plant.",
      "The geometry of a quilt is precise: a consistent grid and clean-edged colour zones. The layout was set from CAD references before the coating crew began, and StreetBond, a water-based acrylic coating, was applied in multiple colours across the surface. The manufacturer publishes StreetBond for asphalt and concrete, in more than fifty standard colours with custom mixing, with an anti-skid aggregate and an 8+ year life cycle that is recoated rather than replaced.",
      "The photographs show the full field from the road, blocks of red, yellow, blue, magenta, black and white among them running to the kerb; the plaza in front of the pump house, whose walls carry the same palette; and the coloured path along the channel. A utility or municipality with an infrastructure site on a public street should ask for a designed surface as part of the civil works, laid out from drawings so the pattern lands where it should.",
    ],
    post: "boundary-road-pump-station",
    images: [
      `${FIO}/Photo-2023-07-05-11-22-34-AM.jpg`,
      `${FIO}/Photo-2023-04-20-12-58-16-PM.jpg`,
      `${FIO}/Photo-2023-06-08-12-56-51-PM.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Maplewoods Townhomes — decorative fire lane",
    slug: "north-vancouver-maplewoods-fire-lane",
    service: "Decorative Coatings",
    application: "Streetscapes",
    city: "North Vancouver, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    excerpt:
      "Blue StreetBond with white current lines across the emergency access lane at Maplewoods in North Vancouver — a fire lane that reads as a river instead of a no-parking zone.",
    story: [
      "Every strata and multi-family development needs a fire lane, and the fire code is specific about marking it. The trouble is that the colouring required can cut across an otherwise well-designed exterior. At Maplewoods in North Vancouver the emergency access lane is coated in Safety Blue StreetBond with white current lines flowing down its length, so a lane that must stay clear reads as a river between the townhomes rather than a no-parking zone.",
      "StreetBond is a water-based acrylic pavement coating. It suits a fire lane because the colour is consistent across the full surface rather than patched from several passes, the aggregate gives traction in the wet North Shore conditions this site sees for much of the year, and the finish stands up to the occasional heavy vehicle, delivery trucks and emergency apparatus, that a fire lane exists for. The manufacturer publishes an 8+ year life cycle, recoated rather than replaced, which keeps the maintenance burden on the strata small.",
      "The photographs show the lane from the townhome side, the blue running the full width between the retaining wall and the fence, and from the stairs above, where the white lines read as current. Red fire lanes are the traditional specification; blue is increasingly what architects and developers ask for because it sits with the grey-and-glass language of a modern strata building. A developer specifying a fire lane should ask for the marking colour and the finish together, not one after the other.",
    ],
    post: "north-vancouver-maplewoods-decorative-fire-lane",
    images: [
      `${FIO}/maplewoods-fire-lane-north-vancouver-streetbond-01.jpg`,
      `${FIO}/Photo-2023-05-19-5-59-11%E2%80%AFPM-scaled.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Solar-reflective park pathway — Osoyoos",
    slug: "osoyoos-park-pathway",
    service: "Decorative Coatings",
    application: "Parks & paths",
    city: "Osoyoos, BC",
    region: "Interior",
    systems: ["StreetBond SR"],
    year: "2023",
    excerpt:
      "A park pathway coated in StreetBond SR — all the benefits of StreetBond 150 with solar-reflective characteristics that keep the surface cooler underfoot. Installed May 2023.",
    story: [
      "A dark asphalt path in full sun gets hot underfoot. This park pathway in Osoyoos was coated in StreetBond SR in May 2023, the solar-reflective version of the StreetBond coating: the benefits of StreetBond 150, with a surface that reflects more of the sun and stays cooler underfoot. On a path in the Interior, that is the property that matters.",
      "StreetBond is a water-based acrylic pavement coating, published by its manufacturer for asphalt and concrete with an anti-skid aggregate for wet conditions, UV-stable colour and an 8+ year life cycle that is recoated rather than replaced. On a park path the coating does two jobs at once: it marks the route clearly against the lawn, and it gives the path a colour that reads as part of the park rather than a strip of road.",
      "The photographs show the path in a warm terracotta tone leaving the parking lot, splitting around a lawn toward the playground and the park building, and curving up the hill beside a retaining wall. A parks department in the Interior should ask for StreetBond SR where a path or plaza takes full sun, and the standard StreetBond 150 where it does not.",
    ],
    images: [
      `${FIO}/Photo-2023-05-25-12-55-19%E2%80%AFPM-scaled.jpg`,
      `${FIO}/Photo-2023-05-25-12-56-23%E2%80%AFPM-scaled.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Maple Ridge Spray Park",
    slug: "maple-ridge-spray-park",
    service: "Decorative Coatings",
    application: "Parks & paths",
    city: "Maple Ridge, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    year: "2025",
    excerpt:
      "StreetBond 150 across a new spray park in Maple Ridge — blue and orange colour fields around the water features, slip-resistant, installed July 2025.",
    story: [
      "A spray park surface is wet for most of the operating day, run across barefoot, and closed all winter. Colour is part of the experience, so a coating that fades, peels or gets slick fails on every count. The new spray park in Maple Ridge was coated in StreetBond 150 in July 2025: fields of blue and orange wrapping around the water features, with boulders and spray arches rising out of the surface.",
      "StreetBond is a water-based acrylic pavement coating, published by its manufacturer for asphalt and concrete with an anti-skid aggregate for wet conditions, UV-stable colour and an 8+ year life cycle that is recoated rather than replaced. Those are the properties a spray pad needs: grip when wet, colour that holds under summer sun, and a surface that can be recoated in a later season rather than rebuilt.",
      "The photographs show the pad before opening, with the blue arches and the orange tower standing over the fresh surface, and from above in July with the park full and the colour reading clearly against the concrete around it. A municipality planning a spray park should ask for StreetBond 150 across the whole pad, with the colour plan drawn around the features before the surface goes down.",
    ],
    images: [
      `${FIO}/Photo-2025-07-07-11-54-41-AM.jpg`,
      `${FIO}/Photo-2025-06-16-5-06-20-PM-scaled.jpg`,
      `${FIO}/Photo-2025-06-16-5-07-47-PM-scaled.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Keswick Water Park — StreetBond 150 recoat",
    slug: "keswick-waterpark",
    service: "Decorative Coatings",
    application: "Parks & paths",
    city: "Burnaby, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    client: "City of Burnaby",
    excerpt:
      "Recoat, restoration and addition at Keswick Splash Water Park — StreetBond 150 remains the product of choice for bold, colourful, long-lasting spray pads.",
    story: [
      "Keswick Water Park is a neighbourhood spray park in Burnaby. Ahead of the 2024 season a StreetBond 150 recoat of the park's surface was specified, with restoration where the coating had worn and an addition to the work. The park opened on schedule in June with the colours the neighbourhood expected to see.",
      "A recoat is the maintenance path the manufacturer publishes for StreetBond: an 8+ year life cycle, recoated rather than replaced. The existing surface was pressure-cleaned and inspected, small spots where wear had exposed the asphalt were repaired, and a fresh colour layer went over the top. The install was scheduled in late May to leave cure time before opening, within the cure window the manufacturer specifies and with buffer in case of weather.",
      "The City asked for a faithful match to the original palette rather than a new one, so sample panels were run on site against the weathered surface and reviewed by the Parks team before the full recoat began. Matching to a weathered surface is a different problem from matching to a specification sheet, and the panel is the only way to confirm it under site light.",
      "The photographs show the finished pad: rings of green, grey and charcoal around a blue centre, on the lawn beside the playground. A parks team with StreetBond surfaces past their colour should ask for a condition assessment and a recoat before considering a full reinstall; the closure is shorter and the material beneath is usually still sound.",
    ],
    post: "keswick-waterpark-burnaby",
    images: [
      `${FIO}/keswick-splash-water-park-burnaby-canada-3.png`,
      "/images/projects/keswick-waterpark/keswick-water-park-streetbond-01.jpg",
    ],
    heroWide: false,
  },
  {
    title: "Rutland Centennial Park — Kelowna",
    slug: "rutland-centennial-park-kelowna",
    service: "Decorative Coatings",
    application: "Parks & paths",
    city: "Kelowna, BC",
    region: "Interior",
    systems: ["StreetBond", "DecoMark"],
    excerpt:
      "The fourth and final phase of Rutland Centennial Park — StreetBond decorative coatings across the plaza and court surfaces with DecoMark medallions: attractive, durable and highly visible at a cost that works for a park budget.",
    story: [
      "Rutland Centennial Park is a community park in Kelowna's Rutland neighbourhood, used by residents across a wide age range. The City improved it in phases, which spread the budget and limited disruption to park users, and the fourth and final phase brought Square One back to finish the decorative surfaces: StreetBond across the plaza and court areas, with DecoMark medallions and markings.",
      "Phased work has a requirement single installs do not: the StreetBond formulations for the last phase had to match the first three so the finished park reads as one design rather than a patchwork of eras. Square One keeps the product batches, colour codes and aggregate specifications from each phase for exactly this reason, and matched phase four to the existing installation. StreetBond is a water-based acrylic coating; the manufacturer publishes it as UV-stable, which matters under Okanagan sun.",
      "The photographs show a teal plaza with white dots and table-tennis tables set into it, a blue lane marked in white with metre divisions from zero to fifteen, and a round yellow-and-white medallion, the DecoMark elements, preformed thermoplastic for custom graphics, heat-fused to the pavement. A parks department planning a multi-year park should ask its installer to keep batch and colour records from the first phase.",
    ],
    post: "decorative-asphalt-for-rutland-centennial-park-kelowna",
    images: [
      `${FIO}/Rutland-Park-Kelowna-DecoMark-StreetBond.jpg`,
      `${FIO}/DecoMark-and-StreetBond-Rutland-Park-Kelowna.jpg`,
      `${FIO}/DecoMark-Rutland-Park-Kelowna.jpg`,
    ],
    heroWide: false,
  },
  {
    title: "South Langford Elementary",
    slug: "south-langford-elementary",
    service: "Preformed Thermoplastic",
    application: "Schools & sports courts",
    city: "Langford, BC",
    region: "Vancouver Island",
    systems: ["DecoMark", "TrafficPatterns"],
    year: "2025",
    excerpt:
      "DecoMark sensory play designs and TrafficPatterns crosswalks for a brand-new Island school — an interactive pathway built for longevity, completed ahead of the September 2025 opening.",
    story: [
      "South Langford Elementary opened in September 2025, a new school in one of the fastest-growing districts in the Capital Region. Square One was asked to install its pavement graphics and safety markings ahead of the opening. The scope split two ways: DecoMark for the sensory play designs and identity graphics on the arrival surfaces, and TrafficPatterns for the crosswalks at the school.",
      "The split is the one Square One recommends for most new schools. DecoMark, the preformed thermoplastic for fully custom graphics, carries the play designs and school identity; TrafficPatterns, the preformed thermoplastic for crossings, carries the markings where children meet vehicles. The manufacturer publishes both as heat-fused to the pavement with the durability of standard road-marking thermoplastic, and TrafficPatterns at 125 mil with anti-skid elements throughout.",
      "A school opening is a hard deadline. The install was worked back from the September opening: layout surveying, pattern plotting and substrate inspection over several days, the decorative fields first, then the crosswalks beside them so the two did not conflict. The photograph shows the sensory pathway, an alphabet snake in coloured segments winding up a fenced asphalt path. A district planning a new school should specify DecoMark for the identity surfaces and TrafficPatterns for the safety-critical markings, and put both on the opening schedule early.",
    ],
    post: "south-langford-elementary",
    images: [`${FIO}/Photo-2025-09-25-3-48-33-PM-scaled.jpg`],
    heroWide: false,
  },
  {
    title: "c̓əsqənelə Elementary labyrinth — Maple Ridge",
    slug: "cesqenele-elementary-labyrinth",
    service: "Decorative Coatings",
    application: "Public art",
    city: "Maple Ridge, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    excerpt:
      "A stand-out walking labyrinth at the new c̓əsqənelə Elementary School in Maple Ridge — concentric StreetBond lines held to a consistent width across the full diameter. Our most recent labyrinth, and the most detailed.",
    story: [
      "A walking labyrinth at the new c̓əsqənelə Elementary School in Maple Ridge: concentric orange lines on fresh black asphalt, laid out so the path stays a consistent width from the outer ring to the centre. It is a walking pathway that invites students to slow down and move through the design on purpose, and it is among the most detailed labyrinths Square One has installed.",
      "The difficulty with a labyrinth on asphalt is precision. Any drift in the width or spacing of the lines shows as the eye follows the path inward, so the layout was set from CAD references before the coating crew touched the surface. The lines are StreetBond, a water-based acrylic coating, which gives exact colour coordinates and an aggregate finish with traction for the running and jumping of a school recess while staying comfortable for the slow walk the labyrinth is meant for.",
      "The photographs show the labyrinth from above with the school grounds still under construction behind it. The manufacturer publishes StreetBond for asphalt and concrete with an 8+ year life cycle, recoated rather than replaced. A school district or architect planning a labyrinth or grounds feature should ask for CAD layout on site before the first line goes down, and for a coating with an anti-skid aggregate rather than paint.",
    ],
    post: "cesqenele-elementary-labyrinth",
    images: [
      `${FIO}/Labyrinth-Maple-Ridge-c%CC%93%C9%99sq%C9%99nel%C9%99-Elementary-2-scaled-1.jpg`,
      `${FIO}/IMG_3659-scaled.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "High-visibility school crosswalk — Grandview Heights",
    slug: "grandview-heights-school-crosswalk",
    service: "Stamped Asphalt",
    application: "Schools & sports courts",
    city: "Surrey, BC",
    region: "Lower Mainland",
    systems: ["StreetPrint"],
    excerpt:
      "StreetPrint stamped asphalt in red with yellow borders — a defined, visible crossing for a school zone, where a crossing you can't miss is the whole point.",
    story: [
      "A school crossing has one job: to be seen. Grandview Heights School specified StreetPrint stamped asphalt for a new crosswalk, and the result is a red tile-pattern crossing with wide yellow borders on the road at the school's parking lot. A crossing that is visually distinct from the road around it makes drivers slow earlier, and one that stays distinct through the winter keeps doing so.",
      "StreetPrint is an asphalt imprinting system. A heated steel template is pressed into the asphalt so the pattern is built into the surface, then StreetBond colour is rolled into the imprint. The texture reads as different from the surrounding road before a driver registers the colour; the colour on top does the rest. The manufacturer publishes a 10–20 year service life, a slip-resistant textured surface that is snowplough and de-icing salt safe, and retroreflective options for crosswalks.",
      "The photographs show the crossing from the sidewalk with the pedestrian sign in the foreground, and straight on, where the red field and the yellow borders read from the far end of the lot. A school or district planning a crossing should ask for a stamped, coloured surface rather than painted bars, and for the border colour to be part of the design from the start.",
    ],
    post: "school-crosswalk-for-high-visibility",
    images: [
      `${FIO}/visible-school-crosswalk-for-safety-6.jpg`,
      `${FIO}/visible-school-crosswalk-for-safety-1-e1624560748675.jpg`,
    ],
    heroWide: false,
  },

  // ── Commercial & strata ────────

  {
    title: "Ralph's Farm Market — Murrayville, Langley",
    slug: "ralphs-farm-market-parking-lot",
    service: "Stamped Asphalt",
    application: "Parking lots",
    city: "Langley, BC",
    region: "Lower Mainland",
    systems: ["StreetPrint"],
    excerpt:
      "A one-of-a-kind stamped asphalt parking lot at Ralph's Farm Market — red brick StreetPrint walkways and aprons that tie the site to the store's branding, built in partnership with the manufacturer.",
    story: [
      "Ralph's Farm Market on Fraser Highway in Murrayville began as a seasonal hay wagon and grew into a year-round market. When the owners upgraded the parking lot they wanted a surface that reflected the care they put into the rest of the operation: a lot that works for customers and delivery vehicles and looks as though a designer specified it.",
      "Square One and the manufacturer worked together on a custom stamped asphalt design that ties in the store's branding. StreetPrint, the asphalt imprinting system, presses the brick pattern into the asphalt with a heated steel template; StreetBond colour is then rolled into the imprint, in tones chosen to complement the market's palette. The manufacturer publishes StreetPrint with a 10–20 year service life, a slip-resistant textured surface, and snowplough and de-icing salt safety, practical properties for a working parking lot.",
      "The photographs show red brick walkways and aprons running across the black lot: out from the market's entrance sign to the stalls, a T-junction of walkways with a pickup parked beside it, and a border strip along the garden beds. The lot still does its practical work, drainage, clear lane markings, accessible pathways, while the walkways carry the brand outdoors. A retailer planning a lot should ask for the pedestrian routes to be stamped and coloured and the parking field left plain.",
    ],
    post: "ralphs-farm-market-decorative-parking-lot",
    images: [
      `${FIO}/Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Stamped-Asphalt-in-Langley-BC-Canada.jpg`,
      `${FIO}/Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Red-Stamped-Asphalt.jpg`,
      `${FIO}/Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Stamped-Asphalt-with-truck.jpg`,
      `${FIO}/Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Stamped-Asphalt.jpg`,
    ],
    heroWide: false,
  },
  {
    title: "StreetPrint in Pewter — Mission",
    slug: "mission-bc-streetscape",
    service: "Stamped Asphalt",
    application: "Parking lots",
    city: "Mission, BC",
    region: "Lower Mainland",
    systems: ["StreetPrint", "StreetBond"],
    year: "2025",
    excerpt:
      "Herringbone StreetPrint stamped asphalt sealed in StreetBond 150 Pewter — a grey-on-grey commercial frontage in Mission, installed April 2025.",
    story: [
      "Grey on grey. The parking bays along this commercial frontage in Mission are herringbone StreetPrint stamped asphalt sealed in StreetBond 150 Pewter, a neutral grey with warm undertones that reads as slate or aged stone under overcast light, with the stall lines in white. Square One installed it in April 2025.",
      "StreetPrint is an asphalt imprinting system: a heated steel template pressed into the asphalt so the herringbone is built into the surface, then StreetBond colour rolled into the imprint. The manufacturer publishes a 10–20 year service life for StreetPrint, a slip-resistant textured surface, and snowplough and de-icing salt safety. Pewter is one of more than fifty standard StreetBond colours the manufacturer publishes; a neutral was chosen here because it will date more slowly than a saturated colour.",
      "The photograph shows the bays in front of the building's glass doors, the herringbone running the length of the frontage and the white lines set between the stalls. A property owner or developer planning a commercial frontage should ask to see the StreetBond colour card against the building's materials before choosing a tone; the pattern is built into the asphalt and the colour is what sets the mood.",
    ],
    post: "mission-bc-streetscape",
    images: [`${FIO}/Photo-2025-04-03-1-57-51-PM-scaled.jpg`],
    heroWide: false,
  },
  {
    title: "Reunion Housing — DecoMark sidewalk decals",
    slug: "reunion-housing-murrayville",
    service: "Preformed Thermoplastic",
    application: "Branding & wayfinding",
    city: "Langley, BC",
    region: "Lower Mainland",
    systems: ["DecoMark"],
    excerpt:
      "Oak-leaf DecoMark decals along the asphalt sidewalks of the Reunion housing complex in Murrayville — custom wayfinding and horizontal surface graphics that show best in dappled spring light.",
    story: [
      "Walk through the Reunion housing complex in Murrayville, Langley, in spring or summer and you notice the decorative sidewalk work in the dappled light under the trees: clusters of green oak leaves set into the asphalt paths at intervals along the way. They are custom DecoMark decals, installed as wayfinding and horizontal surface graphics across the development's pedestrian areas.",
      "DecoMark is a preformed thermoplastic for custom graphics. The leaves were manufactured off site to the design, then thermally bonded to the asphalt on installation day, which is why they hold their edges and colour where a painted sidewalk graphic fades within a season. The manufacturer publishes DecoMark with a full colour spectrum and the same durability as standard road-marking thermoplastic.",
      "The photographs show a leaf cluster on the path in front of the houses, and one close up, the fused sheet lying flush with the asphalt. Housing developments tend to spend on buildings and landscaping and treat the paths as purely functional; a small repeated graphic gives a place an identity residents notice every day. A developer planning a complex should ask for DecoMark where a graphic has to survive foot traffic and weather.",
    ],
    post: "decorative-asphalt-sidewalk-for-langley-housing-development",
    images: [
      `${FIO}/Decorative-asphalt-sidewalk-with-at-Reunion-housing-development-in-langley-BC-Canada.jpg`,
      `${FIO}/Decorative-asphalt-sidewalk-with-thermoplastic-closeup-decal-at-Reunion-housing-development-in-langley-BC-Canada.jpg`,
    ],
    heroWide: false,
  },
  {
    title: "Snug Cove community walkway — Bowen Island",
    slug: "bowen-island-snug-cove-walkway",
    service: "Decorative Coatings",
    application: "Public art",
    city: "Bowen Island, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    excerpt:
      "A public art feature along the walkway at Snug Cove — StreetBond 150 on asphalt, each custom colour representing part of the island community, with the local wildlife asking the questions.",
    story: [
      "Snug Cove is the heart of Bowen Island: the ferry landing, the commercial area, the place the island gathers. The walkway there is the first thing visitors see coming off the ferry and the daily route for residents who walk it year-round. Square One was engaged to install a public art feature along it in StreetBond 150, with each custom colour in the design representing part of the island community.",
      "The design runs down the walkway as a scatter of ovals in yellow, blue, green and grey, with the local wildlife asking the questions: a seal and an eagle each speak to passers-by from a white speech bubble. StreetBond is a water-based acrylic pavement coating, published by its manufacturer for asphalt and concrete with an anti-skid aggregate for surfaces that stay wet for months at a time, and more than fifty standard colours with custom mixing, which is how the island's palette was matched.",
      "Bowen's marine climate, salt air, high humidity and freeze-thaw, is the reason a coating made for outdoor Canadian conditions was specified. Application was direct to the existing asphalt and concrete after cleaning, profiling and priming where required, and the crew mobilized by ferry, as it does for island communities across BC. An island municipality or First Nation planning a community piece should ask for the colour palette to be developed with the community before the coating is mixed.",
    ],
    post: "bowen-island-stamped-asphalt-walkway",
    images: [
      `${FIO}/Bowen-Island-asphalt-walkway-with-StreetBond150-scaled-1.jpg`,
      `${FIO}/Bowen-Island-asphalt-walkway-with-StreetBond-scaled-1.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Windsor Gate — strata laneways, Coquitlam",
    slug: "windsor-gate-coquitlam",
    service: "Stamped Asphalt",
    // 19 Sept 2026, the client on the projects card: "not a driveway" — a
    // strata's laneways and crossings, filed with the streetscapes.
    application: "Streetscapes",
    city: "Coquitlam, BC",
    region: "Lower Mainland",
    systems: ["StreetPrint", "StreetBond"],
    client: "Polygon Realty",
    excerpt:
      "Stamped asphalt laneways and crossings across the Windsor Gate master-planned community in Coquitlam — coloured and sealed with the StreetBond coating system.",
    story: [
      "Windsor Gate is a master-planned community in Coquitlam, a development with a high bar for exterior finishes and common areas. Square One was specified to deliver the laneway and crossing surfaces for the townhouse component, and returned for a second phase across additional lots. The brief asked for a surface that felt considered: stamped asphalt with a colour coating, not bare concrete or painted asphalt.",
      "The work starts after the paving crew has placed and compacted the asphalt. StreetPrint, the asphalt imprinting system, presses the pattern into the hot asphalt with a heated steel template while the material is still workable; once it has cooled, StreetBond colour is applied and bonds into the texture of the imprint. The manufacturer publishes a 10–20 year service life for StreetPrint, slip resistance and snowplough safety, and an 8+ year life cycle for the StreetBond coating, recoated rather than replaced.",
      "The second phase raised the question every phased project raises: colour. The StreetBond formulations had to match the first phase exactly, because a drift between phases shows when they are seen together. Square One keeps batch records and colour specifications from every phase for this reason, and the match was exact.",
      "The photographs show a full street of brick-pattern stamped asphalt in a red-brown tone, with a cream crossing bordered in charcoal and a small motif set at its centre. A developer specifying stamped asphalt for a multi-phase community should ask the installer to keep batch and colour records from phase one, so the later phases match.",
    ],
    post: "windsor-gate-townhouse-driveway",
    images: [
      "/images/projects/windsor-gate-coquitlam/windsor-gate-crosswalk-streetprint-03.jpg",
      `${FIO}/StreetPrint-%E2%80%94-Stamped-Asphalt-Decorative-Crosswalk-Windsor-Gate.jpg`,
    ],
    heroWide: false,
  },

  // ── Residential driveways ────────

  {
    title: "Ten Mile Point driveway — Saanich",
    slug: "ten-mile-point-driveway-saanich",
    service: "Stamped Asphalt",
    application: "Driveways",
    city: "Saanich, BC",
    region: "Vancouver Island",
    systems: ["StreetPrint"],
    excerpt:
      "A stamped asphalt driveway for a Ten Mile Point home in Saanich — grey ashlar pattern running from the street to a stone-and-timber entry.",
    story: [
      "A driveway at a Ten Mile Point home in Saanich, stamped in a grey ashlar pattern that runs from the street to the house's stone-and-timber entry. The pattern is ashlar, large rectangles laid in broken courses, with a darker border band following the edge of the drive, and it sits with the stone piers and timber posts of the house in a way a plain asphalt drive would not.",
      "StreetPrint is an asphalt imprinting system: a heated steel template pressed into the asphalt so the pattern is built into the surface, with StreetBond colour rolled into the imprint. The manufacturer publishes a 10–20 year service life, a slip-resistant textured surface, and snowplough and de-icing salt safety; because the pattern is in the asphalt there is nothing to peel and nothing to re-lay, and it can go over sound existing asphalt. A homeowner planning a driveway should ask to see pattern and colour together, and whether the existing asphalt is sound enough to take a stamp.",
    ],
    images: [`${DRV}/Ten%20Mile%20Point%20Driveway%20I.jpg`],
    heroWide: true,
  },
  {
    title: "British Cobble walkway — Ellis Point, Victoria",
    slug: "ellis-point-cobblestone-victoria",
    service: "Stamped Asphalt",
    // 19 Sept 2026, the client on the projects card: "not a driveway" — a
    // walkway, filed with the parks and paths.
    application: "Parks & paths",
    city: "Victoria, BC",
    region: "Vancouver Island",
    systems: ["StreetPrint"],
    excerpt:
      "British Cobble StreetPrint in a warm brick tone at Ellis Point — the texture of a cobbled lane with none of the weeds, settling or plow damage.",
    story: [
      "British Cobble StreetPrint in a warm brick tone at Ellis Point in Victoria: the rounded stones and irregular joints of a cobbled lane, with the texture a real cobble has and none of the weeds, settling or plough damage. The photograph is a close view of the surface running beside a timber fence toward the house, where the individual stones and the depth of the joints are plain to see.",
      "StreetPrint is an asphalt imprinting system. A heated steel template is pressed into the asphalt so the cobble is built into the surface rather than laid on it, and StreetBond colour is rolled into the imprint. The manufacturer publishes a 10–20 year service life, a slip-resistant textured surface, and snowplough and de-icing salt safety. A homeowner who wants the look of cobble without the maintenance should ask for the British Cobble pattern and a colour chosen against the house's materials.",
    ],
    images: [`${FIO}/Cobblestone-stamped-asphalt-driveway-colose-up-at-Ellis-Point-Walkway-Victoria-BC-Canada.jpg`],
    heroWide: true,
  },
]

export const projects: Project[] = records.map((r) => ({ ...r, imageUrl: r.images[0] }))

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

export const getFeaturedProjects = (): Project[] => projects.filter((p) => p.featured)

/** Projects whose application matches a WORK_APPS label (see lib/work.ts). */
export const getProjectsByApplication = (label: string): Project[] =>
  projects.filter((p) => p.application === label)
