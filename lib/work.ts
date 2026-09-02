import fs from "node:fs"
import path from "node:path"

/**
 * The work, on record — Square One's own site photography, captioned with the
 * system installed and where. Every entry is a real Square One installation in
 * BC; nothing here is stock.
 *
 * Built at build time from the filesystem, like lib/gallery.ts:
 *
 *   public/images/S1_update_v2/Old Square One Web Assets/Galleries/<Category>/Gallery/*
 *       the archived site galleries — 667×402 tiles whose filenames carry
 *       "System  Subject, Place BC". Parsed, typo-corrected, overridable.
 *   public/images/S1_update_v2/photos/Featured image options/*
 *       the studio's hi-res set. A file whose name matches a gallery tile
 *       replaces it (sharper original); the rest are listed in EXTRAS with a
 *       caption each, because a hi-res photo says nothing about where it is.
 *
 * Rules of the road:
 *   - `place` is empty when Square One has not yet confirmed the location.
 *     Render the subject alone; never guess a city.
 *   - `w` < 1600 means gallery-tile scale only (never full-bleed). Only
 *     `hires` entries may run larger than ~420px wide.
 *   - `flag` marks a location inferred from dates/landscape and awaiting
 *     confirmation from Square One.
 *   - AirMark / airport material never enters the record.
 *
 * Server-only: reads disk. Import the types from client components with
 * `import type`; pass the photos down as props.
 */

export type WorkApp =
  | "crosswalks"
  | "streetscapes"
  | "roundabouts"
  | "parking-lots"
  | "parks-paths"
  | "schools-sports-courts"
  | "bike-lanes"
  | "public-art"
  | "branding-wayfinding"
  | "driveways"

export type WorkRegion = "Lower Mainland" | "Vancouver Island" | "Interior" | "Sunshine Coast" | "Sea to Sky"

export interface WorkPhoto {
  src: string
  w: number
  h: number
  app: WorkApp
  systems: string[]
  subject: string
  place: string
  region?: WorkRegion
  hires?: boolean
  flag?: boolean
}

export interface WorkAppMeta {
  slug: WorkApp
  label: string
  blurb: string
}

export const WORK_APPS: WorkAppMeta[] = [
  { slug: "crosswalks", label: "Crosswalks", blurb: "Decorative and high-visibility crossings in preformed thermoplastic and stamped asphalt." },
  { slug: "streetscapes", label: "Streetscapes", blurb: "Intersections, medians, lanes and civic corridors with pattern and colour built into the road surface." },
  { slug: "roundabouts", label: "Roundabouts & traffic calming", blurb: "Truck aprons, medians, speed tables and calming devices that read as streetscape, not hardware." },
  { slug: "parking-lots", label: "Parking lots", blurb: "Thresholds, walkways and crosswalks that organise retail, strata and institutional lots." },
  { slug: "parks-paths", label: "Parks & paths", blurb: "Greenways, park walkways and spray parks with colour and pattern underfoot." },
  { slug: "schools-sports-courts", label: "Schools & sports courts", blurb: "Play surfaces, courts and school-zone markings that hold up to recess and rain." },
  { slug: "bike-lanes", label: "Bike lanes", blurb: "Green and red priority surfacing that keeps its colour under daily traffic." },
  { slug: "public-art", label: "Public art", blurb: "Artist-designed pavement — First Nations artwork, murals and community pieces, rendered durably in the surface." },
  { slug: "branding-wayfinding", label: "Branding & wayfinding", blurb: "Logos, legends and decals fused into the pavement for campuses, retail and civic sites." },
  { slug: "driveways", label: "Driveways", blurb: "Stamped asphalt and StreetBond driveways for homes across the Lower Mainland and Vancouver Island." },
]

// ── Sources ────────────────────────────────────────────────────────────────

const PUBLIC = path.join(process.cwd(), "public")
const GAL_REL = "images/S1_update_v2/Old Square One Web Assets/Galleries"
const FIO_REL = "images/S1_update_v2/photos/Featured image options"
const DRV_REL = "images/S1_update_v2/photos/Driveways"

const CATEGORY_DIRS: Record<string, WorkApp> = {
  "Bike Lanes": "bike-lanes",
  "Branding & Wayfinding": "branding-wayfinding",
  Crosswalks: "crosswalks",
  Driveways: "driveways",
  "Parking Lots": "parking-lots",
  "Parks & Paths": "parks-paths",
  "Public Art": "public-art",
  Roundabouts: "roundabouts",
  "Schools & Sports Courts": "schools-sports-courts",
  Streetscapes: "streetscapes",
}

// ── Caption parsing ─────────────────────────────────────────────────────────

const SYSTEMS = ["TrafficPatternsXD", "TrafficPatterns", "StreetPrint", "StreetBond", "DecoMark", "DuraTherm", "PreMark", "MMAX"]

/** Spelling fixes for the archived filenames, applied before parsing. */
const FIX: [string, string][] = [
  ["Sannich", "Saanich"], ["Richomond", "Richmond"], ["Rochmond", "Richmond"], ["Granvile", "Granville"],
  ["Enterence", "Entrance"], ["Broowning", "Browning"], ["Maridian", "Median"], ["Childrens", "Children's"],
  ["Children’s", "Children's"], ["St. Pauls", "St. Paul's"], ["St. Michaels", "St. Michael's"],
  ["Cycle Grip MMAX", "MMAX"], ["Robson St,", "Robson Street,"], ["Commercial Dr,", "Commercial Drive,"],
  ["FireTruck", "Fire truck"], ["BikeLane", "Bike Lane"], ["Town Home", "Townhome"],
]

const CITY_REGION: Record<string, WorkRegion> = {
  Victoria: "Vancouver Island", Saanich: "Vancouver Island", "North Saanich": "Vancouver Island", "West Saanich": "Vancouver Island",
  Sooke: "Vancouver Island", Duncan: "Vancouver Island", "Mill Bay": "Vancouver Island", Nanaimo: "Vancouver Island",
  Parksville: "Vancouver Island", "North Cowichan": "Vancouver Island", "Lake Cowichan": "Vancouver Island", "View Royal": "Vancouver Island",
  Langford: "Vancouver Island", Tofino: "Vancouver Island", "Mount Douglas": "Vancouver Island", McTavish: "Vancouver Island", Comox: "Vancouver Island",
  Vancouver: "Lower Mainland", Burnaby: "Lower Mainland", Richmond: "Lower Mainland", Surrey: "Lower Mainland", Delta: "Lower Mainland",
  Tsawwassen: "Lower Mainland", Coquitlam: "Lower Mainland", "Port Moody": "Lower Mainland", "New Westminster": "Lower Mainland",
  "North Vancouver": "Lower Mainland", "West Vancouver": "Lower Mainland", "Maple Ridge": "Lower Mainland", Langley: "Lower Mainland",
  Chilliwack: "Lower Mainland", Agassiz: "Lower Mainland", "Horseshoe Bay": "Lower Mainland", GVRD: "Lower Mainland", "Lower Mainland": "Lower Mainland",
  "Windsor Gate": "Lower Mainland", "Evelyn Heights": "Lower Mainland", Kingsway: "Lower Mainland", Steveston: "Lower Mainland", Katzie: "Lower Mainland",
  "Bowen Island": "Lower Mainland", "White Rock": "Lower Mainland", Mission: "Lower Mainland", "Port Coquitlam": "Lower Mainland",
  "Boundary Road": "Lower Mainland",
  Kelowna: "Interior", Vernon: "Interior", "Salmon Arm": "Interior", Osoyoos: "Interior",
  Sechelt: "Sunshine Coast", Squamish: "Sea to Sky",
}

const NOT_PLACE = new Set(["Assembly", "Bridge", "Installation", "Ashlar Slate", "Offset Brick", "Marine Design", "Nemo", "Hops", "Wheat"])

const CITIES_BY_LENGTH = Object.keys(CITY_REGION).sort((a, b) => b.length - a.length)

function regionFor(place: string): WorkRegion | undefined {
  for (const city of CITIES_BY_LENGTH) {
    if (new RegExp(`\\b${city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(place)) return CITY_REGION[city]
  }
  return undefined
}

const SYSTEM_ALT = SYSTEMS.join("|")
const HEAD_RE = new RegExp(`^((?:${SYSTEM_ALT})(?:\\s*(?:—|-|&|with|and|,)?\\s*(?:${SYSTEM_ALT}|Stamped Asphalt|Coatings))*)\\s*[—,-]?\\s*(.*)$`)

function parseName(fileName: string): { systems: string[]; subject: string; place: string } {
  let stem = fileName.replace(/\.[a-z0-9]+$/i, "")
  for (const [from, to] of FIX) stem = stem.split(from).join(to)
  stem = stem.replace(/\bVancouve\b/g, "Vancouver").replace(/\s+/g, " ").trim()

  const systems: string[] = []
  let rest = stem
  const m = HEAD_RE.exec(stem)
  if (m) {
    const head = m[1]
    rest = m[2]
    for (const s of SYSTEMS) {
      if (new RegExp(`\\b${s}\\b`).test(head) && !systems.includes(s)) systems.push(s)
    }
    if (systems.includes("TrafficPatternsXD") && systems.includes("TrafficPatterns") && !/TrafficPatterns\b(?!XD)/.test(head)) {
      systems.splice(systems.indexOf("TrafficPatterns"), 1)
    }
  }

  const subjectParts: string[] = []
  const placeParts: string[] = []
  for (const raw of rest.split(",").map((p) => p.trim()).filter(Boolean)) {
    const p = raw.replace(/\s*BC$/, "").trim()
    if (NOT_PLACE.has(p)) subjectParts.push(p)
    else if (regionFor(p) || raw.endsWith("BC") || placeParts.length > 0) placeParts.push(p)
    else subjectParts.push(p)
  }
  return { systems, subject: subjectParts.join(", "), place: placeParts.join(", ") }
}

/** Caption corrections the filename cannot express, keyed by archive filename. */
const OVERRIDES: Record<string, Partial<Pick<WorkPhoto, "subject" | "place">>> = {
  "Cycle Grip MMAX Lower Levels Hwy, North Vancouver BC.jpg": { subject: "Cycle Grip bike lane, Lower Levels Highway", place: "North Vancouver" },
  "PreMark Green Bike Lane, Assembly.jpg": { subject: "Green bike lane — installation", place: "" },
  "PreMark Green Bike Lane.jpg": { subject: "Green bike lane", place: "" },
  "DecoMark  Think Train, City of Vancouver.jpg": { subject: "'Think Train' safety graphic", place: "Vancouver" },
  "DecoMark Katzie Elementary School.jpg": { subject: "School branding", place: "Katzie Elementary" },
  "DecoMark Katzie Elementary, Surrey BC.jpg": { subject: "School artwork", place: "Katzie Elementary" },
  "DecoMark Tsawwassen Commons.jpg": { subject: "Community branding", place: "Tsawwassen Commons, Delta" },
  "DecoMark Community Branding, Tsawwassen Commons.jpg": { place: "Tsawwassen Commons, Delta" },
  "DecoMark — Nemo  Port Moody Park BC.jpg": { subject: "'Nemo' park graphic", place: "Port Moody" },
  "DecoMark, FireTruck, City of North Vancouve.jpg": { subject: "Fire truck graphic", place: "North Vancouver" },
  "DecoMark  Provincial Branding, Salmon Arm BC.jpg": { subject: "Provincial branding" },
  "TrafficPatterns  Custom Decorative Crosswalk, Tsawwassen Commons.png": { place: "Tsawwassen Commons, Delta" },
  "TrafficPatterns Decorative Crosswalk, Tsawwassen Commons.jpg": { place: "Tsawwassen Commons, Delta" },
  "TrafficPatterns  Custom Decorative Crosswalk, Granvile & 68th, Vancouver BC.png": { subject: "Musqueam design by Robyn Sparrow", place: "Granville Street, Vancouver" },
  "TrafficPatterns Robyn Sparrow Design, Granville & 68th, Vancouver BC.jpg": { subject: "Musqueam design by Robyn Sparrow", place: "Granville Street, Vancouver" },
  "TrafficPatterns with PreMark BikeLane, Kelowna BC.png": { subject: "Crosswalk with green bike lane" },
  "StreetPrint — Stamped Asphalt   Decorative Driveway, Sooke, BC.jpg": { place: "Sooke" },
  "StreetPrint — Stamped Asphalt   Decorative Driveway, Offset Brick on Ashlar Slate, Victoria BC.jpg": { subject: "Offset Brick border on Ashlar Slate" },
  "StreetPrint — Stamped Asphalt   Decorative Driveway, Craigdarroch Castle, Victoria BC.jpg": { subject: "Decorative driveway", place: "Craigdarroch Castle, Victoria" },
  "StreetPrint — Stamped Asphalt  Front Enterence, Agassiz, BC.png": { subject: "Front entrance", place: "Agassiz" },
  "StreetPrint — Stamped Asphalt  Decorative Crosswalk, Hillside Mall Victoria BC.png": { place: "Hillside Mall, Victoria" },
  "StreetBond Parking Lot, Kingsway, Vancouver BC.jpg": { subject: "Parking lot", place: "Kingsway, Vancouver" },
  "StreetPrint — Stamped Asphalt  Town Home, Tofino BC.png": { subject: "Townhome parking" },
  "StreetBond Olympic Oval Rochmond BC.jpg": { subject: "Olympic Oval", place: "Richmond" },
  "StreetPrint — Stamped Asphalt Mount Douglas BC.jpg": { subject: "Park walkway", place: "Mount Douglas, Saanich" },
  "StreetPrint — Stamped Asphalt  Walkway, Parksville, BC.jpg": { place: "Parksville" },
  "StreetBond Childrens Hospital, Vancouver BC.jpg": { subject: "BC Children's Hospital" },
  "DecoMark Public Art, Coming and Going by Soren Henrich, Vancouver BC.jpg": { subject: "'Coming and Going' by Soren Henrich", place: "Evergreen Line, Port Moody" },
  "DecoMark — Whatever the Weather Public Art by Mia Weinberg, North Vancouver BC.jpg": { subject: "'Whatever the Weather' by Mia Weinberg", place: "North Vancouver" },
  "StreetBond Carpeting by Renée Van Halm, Joyce Station, Vancouver BC.jpg": { subject: "'Carpeting' by Renée Van Halm", place: "Joyce Station, Vancouver" },
  "StreetBond BC Childrens Hospital.jpg": { subject: "BC Children's Hospital", place: "Vancouver" },
  "StreetBond BC Children’s Hospital.jpg": { subject: "BC Children's Hospital", place: "Vancouver" },
  "DecoMark Public Art, Tsawwassen Commons, Delta BC.jpg": { subject: "Public art" },
  "StreetPrint — Stamped Asphalt   Maridian & Roundabout, McTavish Exchange, Victoria BC.jpg": { subject: "Median & roundabout", place: "McTavish Exchange, North Saanich" },
  "StreetPrint — Stamped Asphalt    Stamped Asphalt, University of British Columbia.jpg": { subject: "Campus walkway", place: "UBC, Vancouver" },
  "StreetPrint — Stamped Asphalt   Victoria High, Victoria BC.jpg": { subject: "Victoria High School", place: "Victoria" },
  "StreetBond  Sports Court,  St. Michaels University Junior School, Victoria BC.jpg": { subject: "Sports court, St. Michael's University School" },
  "StreetPrint — Stamped Asphalt Decorative Crosswalk, Windsor Gate.jpg": { place: "Windsor Gate, Coquitlam" },
  "DuraTherm St. Pauls Hospital, Comox Street, Vancouver BC.jpg": { subject: "St. Paul's Hospital crossing", place: "Comox Street, Vancouver" },
  "StreetPrint — Stamped Asphalt     Town Home, North Vancouver BC.jpg": { subject: "Townhome entry" },
}

const DEFAULT_SUBJECT: Partial<Record<WorkApp, string>> = {
  crosswalks: "Decorative crosswalk",
  driveways: "Decorative driveway",
  "parks-paths": "Park pathway",
  roundabouts: "Roundabout",
}

// ── Hi-res extras — each needs a caption because the file says nothing ─────

type Extra = [dir: "fio" | "drv", file: string, app: WorkApp, systems: string[], subject: string, place: string, flag?: true]

const EXTRAS: Extra[] = [
  ["fio", "Photo-2025-03-07-2-54-05-PM-scaled.jpg", "crosswalks", ["TrafficPatternsXD"], "Railroad-inspired crosswalk", "City of Langley"],
  ["fio", "Photo-2025-03-06-3-06-49-PM-scaled-e1743101603782.jpg", "crosswalks", ["TrafficPatternsXD"], "Railroad-inspired crosswalk — detail", "City of Langley"],
  ["fio", "White-Rock-crosswalk-29-1-scaled.jpg", "crosswalks", ["TrafficPatterns"], "Custom artist-designed crosswalk", "White Rock"],
  ["fio", "Whiterock-Pier-Crosswalk-TrafficPatternsXD-2-scaled.jpg", "crosswalks", ["TrafficPatternsXD"], "Pier crosswalk", "White Rock Pier"],
  ["fio", "decorative-crosswalk-with-stamped-asphalt-at-granville-island-brewery-crosswalk-sign-scaled-1-2048x1536.jpg", "crosswalks", ["TrafficPatternsXD"], "Decorative crosswalk", "Granville Island, Vancouver"],
  ["fio", "UBC-crosswalk-3-300dpi.jpg", "crosswalks", ["TrafficPatterns"], "UBC & Musqueam crosswalk", "University Boulevard, UBC"],
  ["fio", "Photo-2024-03-19-3-28-23-PM-1-scaled.jpg", "crosswalks", ["TrafficPatterns"], "Sports-themed crosswalk", "Beban Park, Nanaimo"],
  ["fio", "visible-school-crosswalk-for-safety-6.jpg", "crosswalks", ["StreetPrint"], "High-visibility school crosswalk", "Grandview Heights School, Surrey"],
  ["fio", "IMG_1635.jpeg", "crosswalks", ["TrafficPatternsXD"], "Little Italy crosswalk", "Commercial Drive, Vancouver"],
  ["fio", "502639628_1112360040926014_5391735583045489560_n.jpg", "crosswalks", ["TrafficPatternsXD"], "Rainbow intersection", "Nanaimo"],
  ["fio", "504448297_1112360024259349_5235743119624258372_n-1.jpg", "crosswalks", ["TrafficPatternsXD"], "Rainbow intersection — street level", "Nanaimo"],
  ["fio", "Photo-2025-04-03-1-57-51-PM-scaled.jpg", "streetscapes", ["StreetPrint", "StreetBond"], "Pewter herringbone stamped asphalt", "Mission"],
  ["fio", "Photo-2023-05-19-5-56-47 PM-scaled (1).jpg", "streetscapes", ["StreetBond"], "Decorative fire lane", "Maplewoods Townhomes, North Vancouver"],
  ["fio", "Mask-Group-6.jpg", "streetscapes", ["StreetPrint"], "Red brick road median — installation", ""],
  ["fio", "Bowen-Island-asphalt-walkway-with-StreetBond150-scaled-1.jpg", "parks-paths", ["StreetBond"], "Snug Cove community walkway", "Bowen Island"],
  ["fio", "Photo-2023-05-25-12-55-19 PM-scaled.jpg", "parks-paths", ["StreetBond"], "Solar-reflective park pathway", "Osoyoos", true],
  ["fio", "Photo-2025-07-07-11-54-41-AM.jpg", "parks-paths", ["StreetBond"], "Spray park surfacing", "Maple Ridge", true],
  ["fio", "keswick-splash-water-park-burnaby-canada-3.png", "parks-paths", ["StreetBond"], "Keswick Water Park", "Burnaby"],
  ["fio", "Rutland-Park-Kelowna-DecoMark-StreetBond.jpg", "parks-paths", ["StreetBond", "DecoMark"], "Rutland Centennial Park", "Kelowna"],
  ["fio", "IMG_1807-1-2048x1536.jpg", "parks-paths", ["StreetBond"], "Spray park surfacing", ""],
  ["fio", "Photo-2024-06-20-11-31-39-AM-scaled-e1740159565458.jpg", "parks-paths", ["StreetBond"], "Spray park surfacing", ""],
  ["fio", "Photo-2024-05-31-1-47-03-PM-1-scaled.jpg", "parks-paths", ["StreetBond"], "Spray park surfacing", ""],
  ["fio", "IMG_20200813_112454.jpg", "parks-paths", ["StreetBond"], "Spray park surfacing", ""],
  ["fio", "Photo-2023-09-22-1-50-34-PM.jpg", "public-art", ["TrafficPatterns"], "'Every Child Matters' by Charliss Santos", "New Westminster"],
  ["fio", "Langley-event-3-2048x1536.jpg", "public-art", ["StreetBond"], "'Circle of Life' by Drew & Elinor Atkins", "Langley Events Centre, Langley"],
  ["fio", "decorative-asphalt-design-1.jpg", "public-art", ["StreetBond", "DecoMark"], "Terry Fox Hometown Square", "Port Coquitlam"],
  ["fio", "TrafficPatterns-Robyn-Sparrow-Design-Granville-68th-Vancouver-BC.jpg", "public-art", ["TrafficPatterns"], "Musqueam design by Robyn Sparrow", "Granville Street, Vancouver"],
  ["fio", "Labyrinth-Maple-Ridge-c̓əsqənelə-Elementary-2-scaled-1.jpg", "public-art", ["StreetBond"], "Labyrinth", "c̓əsqənelə Elementary, Maple Ridge"],
  ["fio", "Photo-2023-07-05-11-22-34-AM.jpg", "public-art", ["StreetBond"], "Quilt motif", "Boundary Road Pump Station"],
  ["fio", "IMG_4531-scaled.jpeg", "public-art", ["DecoMark", "StreetBond"], "First Nations canoe motif", ""],
  ["fio", "IMG_6053-scaled.jpeg", "public-art", ["DecoMark", "StreetBond"], "First Nations canoe motif — detail", ""],
  ["fio", "IMG_3229-1-scaled.jpg", "public-art", ["DecoMark"], "Plaza graphics", "800 Robson Street, Vancouver"],
  ["fio", "Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Stamped-Asphalt-in-Langley-BC-Canada.jpg", "parking-lots", ["StreetPrint"], "Ralph's Farm Market", "Murrayville, Langley"],
  ["fio", "Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Red-Stamped-Asphalt.jpg", "parking-lots", ["StreetPrint"], "Ralph's Farm Market — walkways", "Murrayville, Langley"],
  ["fio", "Photo-2024-10-15-5-38-42-PM-scaled.jpg", "parking-lots", ["StreetPrint"], "Commercial entrance apron", ""],
  ["fio", "Photo-2025-07-28-2-10-43-PM-scaled.jpg", "parking-lots", ["StreetBond"], "Retail plaza entrance", ""],
  ["fio", "Photo-2025-09-25-3-48-33-PM-scaled.jpg", "schools-sports-courts", ["DecoMark"], "Sensory play pathway", "South Langford Elementary, Langford"],
  ["fio", "IMG_1145.jpeg", "schools-sports-courts", ["StreetBond"], "School sports court", ""],
  ["fio", "Photo-2024-09-13-10-31-48-AM.jpg", "schools-sports-courts", ["StreetBond"], "Strata courtyard play surface", ""],
  ["fio", "Photo-2024-07-04-10-58-08-AM-scaled.jpg", "bike-lanes", ["StreetPrint"], "Red brick multi-use path", ""],
  ["fio", "Decorative-asphalt-sidewalk-with-at-Reunion-housing-development-in-langley-BC-Canada.jpg", "branding-wayfinding", ["DecoMark"], "Oak-leaf sidewalk decals", "Reunion, Murrayville, Langley"],
  ["fio", "DecoMark-on-asphalt-Little-Italy-Community-Branding_Commercia-Drive-Vancouver-BC-Canada-op6t525a5rlrtdb6ycgokn391ncum7c5zqlh8og8kw.jpg", "branding-wayfinding", ["DecoMark"], "Little Italy neighbourhood branding", "Commercial Drive, Vancouver"],
  ["drv", "Number 1.jpg", "driveways", ["StreetPrint"], "Ashlar slate driveway", ""],
  ["drv", "Number 2.jpg", "driveways", ["StreetPrint"], "Driveway with circle medallion", ""],
  ["drv", "Number 3.jpg", "driveways", ["StreetPrint"], "Charcoal cobble driveway", ""],
  ["drv", "Number 4.jpg", "driveways", ["StreetPrint"], "Ashlar garden walkway", ""],
  ["drv", "Ten Mile Point Driveway I.jpg", "driveways", ["StreetPrint"], "Ten Mile Point driveway", "Saanich"],
  ["fio", "IMG_9161.jpg", "driveways", ["StreetPrint"], "Herringbone driveway with circle medallion", ""],
  ["fio", "Cobblestone-stamped-asphalt-driveway-colose-up-at-Ellis-Point-Walkway-Victoria-BC-Canada.jpg", "driveways", ["StreetPrint"], "Cobblestone close-up, Ellis Point", "Victoria"],
  ["fio", "Photo-2023-09-29-4-48-15 PM-1-scaled.jpg", "driveways", ["StreetPrint"], "Townhome laneway, ashlar slate", ""],
  ["fio", "townhouse-driveway.png", "driveways", ["StreetPrint"], "Townhouse driveway grid", ""],
  ["fio", "303-IMG_3928.JPG", "driveways", ["StreetPrint"], "Red brick with charcoal border — detail", ""],
]

// ── Filesystem helpers ──────────────────────────────────────────────────────

const IMAGE_EXT = /\.(jpe?g|png)$/i

/** Pixel dimensions from the file header — PNG IHDR or the first JPEG SOF marker. */
function dims(file: string): [number, number] {
  let buf: Buffer
  try {
    buf = fs.readFileSync(file)
  } catch {
    return [0, 0]
  }
  if (buf.length > 24 && buf.toString("latin1", 1, 4) === "PNG") {
    return [buf.readUInt32BE(16), buf.readUInt32BE(20)]
  }
  let i = 2
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1
      continue
    }
    const marker = buf[i + 1]
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)]
    }
    i += 2 + buf.readUInt16BE(i + 2)
  }
  return [0, 0]
}

function webPath(rel: string, file: string): string {
  return "/" + [...rel.split("/"), file].map((seg) => encodeURIComponent(seg)).join("/")
}

/** "StreetPrint — Stamped Asphalt  Decorative Crosswalk, Hillside Mall Victoria BC.png" → "streetprintstampedasphalt…" */
function normName(file: string): string {
  return file.replace(/\.[a-z0-9]+$/i, "").toLowerCase().replace(/[^a-z0-9]/g, "")
}

function listFiles(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((f) => IMAGE_EXT.test(f))
  } catch {
    return []
  }
}

// ── The record ──────────────────────────────────────────────────────────────

let cache: WorkPhoto[] | undefined

function build(): WorkPhoto[] {
  const fioDir = path.join(PUBLIC, FIO_REL)
  const drvDir = path.join(PUBLIC, DRV_REL)
  const fioByNorm = new Map(listFiles(fioDir).map((f) => [normName(f), f]))
  const order = new Map(WORK_APPS.map((a, i) => [a.slug, i]))
  const seen = new Set<string>()
  const photos: WorkPhoto[] = []

  // Archived galleries — parsed captions, hi-res originals swapped in where they exist
  for (const [folder, app] of Object.entries(CATEGORY_DIRS)) {
    const dir = path.join(PUBLIC, GAL_REL, folder, "Gallery")
    for (const file of listFiles(dir).sort()) {
      if (/hero/i.test(file) || /YVR|Airport|Air Port/.test(file)) continue
      const parsed = parseName(file)
      const override = OVERRIDES[file] ?? {}
      let src = webPath(`${GAL_REL}/${folder}/Gallery`, file)
      let [w, h] = dims(path.join(dir, file))
      const sharper = fioByNorm.get(normName(file))
      if (sharper) {
        const [sw, sh] = dims(path.join(fioDir, sharper))
        if (sw > w) {
          src = webPath(FIO_REL, sharper)
          w = sw
          h = sh
        }
      }
      if (seen.has(src)) continue
      seen.add(src)
      let place = (override.place ?? parsed.place).replace(/,\s*$/, "").trim()
      if (place.startsWith("City of ")) place = place.slice(8)
      const subject = override.subject ?? parsed.subject ?? ""
      photos.push({
        src,
        w,
        h,
        app,
        systems: parsed.systems,
        subject: subject || DEFAULT_SUBJECT[app] || "Decorative pavement",
        place,
        region: regionFor(place),
      })
    }
  }

  // Hi-res extras
  for (const [where, file, app, systems, subject, place, flag] of EXTRAS) {
    const rel = where === "drv" ? DRV_REL : FIO_REL
    const abs = path.join(where === "drv" ? drvDir : fioDir, file)
    const [w, h] = dims(abs)
    if (w === 0) continue
    const src = webPath(rel, file)
    if (seen.has(src)) continue
    seen.add(src)
    photos.push({ src, w, h, app, systems, subject, place, region: regionFor(place), hires: true, ...(flag ? { flag: true } : {}) })
  }

  photos.sort(
    (a, b) =>
      (order.get(a.app) ?? 0) - (order.get(b.app) ?? 0) ||
      Number(Boolean(b.hires)) - Number(Boolean(a.hires)) ||
      Number(a.place === "") - Number(b.place === "") ||
      a.place.localeCompare(b.place) ||
      a.subject.localeCompare(b.subject),
  )
  return photos
}

/** Every photo on record, sorted by application → hi-res first → located first. */
export function getWork(): WorkPhoto[] {
  if (!cache) cache = build()
  return cache
}

/** Photos for one application. */
export function workFor(app: WorkApp): WorkPhoto[] {
  return getWork().filter((p) => p.app === app)
}

/** Photos for one application within a region (e.g. driveways on the Island). */
export function workForRegion(app: WorkApp, region: WorkRegion): WorkPhoto[] {
  return getWork().filter((p) => p.app === app && p.region === region)
}

export function workAppMeta(slug: string): WorkAppMeta | undefined {
  return WORK_APPS.find((a) => a.slug === slug)
}

/** "TrafficPatternsXD · Decorative crosswalk" — the caption's first line. */
export function workLabel(p: WorkPhoto): string {
  return [p.systems.join(" + "), p.subject].filter(Boolean).join(" · ")
}

/** Distinct cities in the record, most-photographed first. */
export function workCities(): { city: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const p of getWork()) {
    if (!p.place) continue
    const city = p.place.split(",").pop()!.trim()
    counts.set(city, (counts.get(city) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count || a.city.localeCompare(b.city))
}
