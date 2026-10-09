import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { WORK_APPS, workAppMeta, type WorkApp } from "@/lib/work"
import { studioWorkFor } from "@/lib/work-cms"
import { APP_HEROES } from "@/lib/app-heroes"
import IndexImageHero from "@/components/IndexImageHero"
import { getProjects } from "@/lib/projects-cms"
import OpenerTitle from "@/components/ui/OpenerTitle"
import { getOpenerDoc, mergeOpener } from "@/lib/page-content"
import { products } from "@/lib/products"
import WorkGallery from "@/components/WorkGallery"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import { SITE_URL } from "@/lib/site"
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd"
import { clampDescription } from "@/lib/seo"
import { plainCase } from "@/lib/text"

/**
 * Application page — one template, nine pages (driveways has its own pillar
 * at /driveways and is excluded here).
 *
 *   01 Opener      the record's frame for this kind of work, full bleed,
 *                  eyebrow + h1 over it (lib/app-heroes.ts; 19 Sept 2026 —
 *                  before that these nine pages opened on text alone)
 *   01b Intro      the paragraphs, related links, the one button and the
 *                  record line (systems · projects · regions) as a list  paper
 *   02 The work    the captioned gallery, under a margin-column header   paper
 *   03 Systems     hairline rows for this application's systems          warm
 *   04 Projects    frames with the title and place UNDER them            paper
 *   05 Next        prev / next application, underlined words             paper
 *   Close          slate — Footer, rendered once by app/layout.tsx
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the same five beats, the
 * same words; section headers are the `Section` primitive, cards are rows
 * or frames with the caption under, links are underlined, no arrows.
 *
 * Every photograph on these pages is Square One's own, captioned with the
 * system and the place. Low-res archive shots never leave tile scale.
 *
 * Copy rules (CANON): every place, artist and system named in COPY is in the
 * record — lib/work.ts, lib/work-captions.ts, lib/projects.ts, lib/products.ts,
 * lib/services.ts or content/blog. Performance figures are HUB's and say so.
 * ® / ™ go on the first mention of each mark per page, which is the intro.
 */

interface Props {
  params: Promise<{ slug: string }>
}

const PHONE = "604-612-6209"

interface AppCopy {
  /** The <title>, before the root template adds " | Square One Paving". */
  title: string
  headline: string
  /** Paragraphs above the gallery — the first is set as the lede. */
  intro: string[]
  /** Product slugs (lib/products.ts) rendered as the systems cards, in order. */
  products: string[]
  /** The meta description — application, region, systems and one concrete benefit. Clamped on the way out. */
  seo: string
  /** Gallery heading, in the words a searcher would use. */
  work: string
  /** Where this application sits in the site: the service behind it, a system, the projects. Existing routes only. */
  links: { label: string; href: string }[]
}

const COPY: Record<Exclude<WorkApp, "driveways">, AppCopy> = {
  crosswalks: {
    title: "Decorative Crosswalks in BC",
    headline: "Decorative crosswalks that read from a block away",
    intro: [
      "A decorative crosswalk does two jobs at once: it protects the person in it and it tells the driver something is happening here. Square One installs them in preformed thermoplastic (TrafficPatterns™, heat-fused to the pavement and open to traffic within minutes, and TrafficPatternsXD™, the 150-mil aggregate-reinforced sheet made for arterial crossings and transit hubs) and in StreetPrint® stamped asphalt, which the manufacturer publishes at a 10–20 year service life and offers with retroreflective options. DuraTherm carries the crosswalk bars, stop bars and legends around them.",
      "The record runs from the UBC and Musqueam crossing on University Boulevard and the rainbow intersection in Nanaimo to a plain high-visibility brick crosswalk at Grandview Heights School in Surrey. Municipalities, school districts, developers and transit agencies commission them. Square One installs across the Lower Mainland and Vancouver Island, with crossings in Kelowna, Sechelt and Squamish also on record.",
    ],
    products: ["trafficpatterns", "trafficpatterns-xd", "streetprint", "duratherm", "streetbond"],
    seo: "Decorative crosswalks in TrafficPatterns thermoplastic and StreetPrint stamped asphalt, Lower Mainland and Vancouver Island. Open to traffic in minutes.",
    work: "Decorative crosswalks across BC",
    links: [
      { label: "Preformed thermoplastic", href: "/services/preformed-thermoplastic" },
      { label: "Stamped asphalt", href: "/services/stamped-asphalt" },
      { label: "Crosswalk projects", href: "/projects" },
    ],
  },
  streetscapes: {
    title: "Stamped Asphalt Streetscapes in BC",
    headline: "Streetscapes with pattern and colour built in",
    intro: [
      "A streetscape is the part of the road people are meant to notice: the intersection, the median, the lane behind a townhome row, the forecourt of a civic building. Square One builds them in StreetPrint® stamped asphalt (a heated steel template presses brick, herringbone or ashlar slate into the asphalt, so the pattern is part of the surface rather than painted on it) and colours the imprint with StreetBond®, a water-based acrylic coating with an anti-skid aggregate and more than fifty standard colours. TrafficPatternsXD™ takes the highest-wear crossings; DuraTherm and DecoMark add the markings and graphics.",
      "On record: a StreetPrint town centre, plaza and heritage forecourt in Victoria, the 32nd Avenue median in Surrey, a pewter herringbone street in Mission, the StreetBond fire lane at Maplewoods Townhomes in North Vancouver and a strata laneway in Squamish. Municipalities, developers and landscape architects specify the work; Square One installs it across the Lower Mainland and Vancouver Island.",
    ],
    products: ["streetprint", "streetbond", "trafficpatterns-xd", "duratherm", "decomark"],
    seo: "Stamped asphalt streetscapes in StreetPrint and StreetBond, Lower Mainland and Vancouver Island: medians, laneways and forecourts with the pattern pressed in.",
    work: "Stamped asphalt streetscapes across BC",
    links: [
      { label: "Stamped asphalt", href: "/services/stamped-asphalt" },
      { label: "Decorative coatings", href: "/services/decorative-coatings" },
      { label: "Streetscape projects", href: "/projects" },
    ],
  },
  roundabouts: {
    title: "Roundabouts & Traffic Calming in BC",
    headline: "Roundabouts and traffic calming that read as streetscape",
    intro: [
      "Roundabout aprons, traffic islands and medians have to take turning trucks and plow blades and still tell drivers to slow down. Square One builds them in StreetPrint® stamped asphalt (a textured, slip-resistant surface the manufacturer rates snowplow and de-icing salt safe, with a published 10–20 year service life and nothing to peel or re-lay) and in TrafficPatternsXD™, the 150-mil aggregate-reinforced thermoplastic for the busiest intersections. StreetBond® colour sets the apron off from the travel lane, and PreMark carries the turn arrows.",
      "Roundabouts in Duncan, North Cowichan and at McTavish Exchange in North Saanich; aprons and islands in Abbotsford and Maple Ridge; a coloured median and roundabout in Surrey; traffic-calming devices in View Royal and North Vancouver. The record covers both sides of the Strait and reaches into the Interior at Kelowna and Vernon. Municipalities and developers commission the work; Square One installs it across the Lower Mainland and Vancouver Island.",
    ],
    products: ["streetprint", "trafficpatterns-xd", "streetbond", "premark"],
    seo: "Roundabout aprons, traffic islands and traffic calming in StreetPrint stamped asphalt and TrafficPatternsXD across BC. Snowplow safe; published 10–20 yr life.",
    work: "Roundabouts and traffic calming across BC",
    links: [
      { label: "Stamped asphalt", href: "/services/stamped-asphalt" },
      { label: "StreetPrint", href: "/products/streetprint" },
      { label: "All projects", href: "/projects" },
    ],
  },
  "parking-lots": {
    title: "Decorative Parking Lot Paving in BC",
    headline: "Parking lots that direct people without a sign",
    intro: [
      "A brick-pattern walkway across a parking lot moves pedestrians where you want them and tells drivers to expect them. Square One builds thresholds, entrance aprons, walkways and crosswalks for retail centres, strata and commercial sites: StreetPrint® stamped asphalt for the pattern, pressed into the lot's own asphalt with minimal closure time; StreetBond® for colour and grip, on asphalt or concrete; and preformed thermoplastic (TrafficPatternsXD™ for the crossings, PreMark for the arrows and accessible-parking symbols, DecoMark for a logo at the entrance) heat-fused to the pavement rather than sprayed on. For a lot that is sound but tired, DuraShield is the maintenance coating, in black or Solar Gray.",
      "The record runs from Ralph's Farm Market in Murrayville, Langley and StreetPrint parking bays in Mission to a high-visibility walkway at Shipspoint and the Hillside Mall crosswalk in Victoria, with a townhouse lot in Kelowna and a parkade in Victoria alongside. Property managers, developers and parking operators commission it; Square One installs across the Lower Mainland and Vancouver Island.",
    ],
    products: ["streetprint", "streetbond", "trafficpatterns-xd", "premark", "decomark", "durashield"],
    seo: "Decorative parking lot paving, Lower Mainland and Vancouver Island: StreetPrint walkways and crosswalks, StreetBond colour, thermoplastic stall markings.",
    work: "Parking lot paving across BC",
    links: [
      { label: "Stamped asphalt", href: "/services/stamped-asphalt" },
      { label: "Decorative coatings", href: "/services/decorative-coatings" },
      { label: "Parking lot projects", href: "/projects" },
    ],
  },
  "parks-paths": {
    title: "Park Paths & Spray Park Surfacing in BC",
    headline: "Park paths and spray parks with colour underfoot",
    intro: [
      "Park pathways, greenways, plazas and spray parks are surfaces people walk, run and play on, often barefoot. Square One coats them in StreetBond®, a water-based acrylic with an anti-skid aggregate for wet surfaces, UV-stable colour and a manufacturer-published 8+ year life cycle that is refreshed with a recoat rather than rebuilt; StreetBond SR is the solar-reflective version. StreetPrint® gives a park walkway the look of stone, pressed into the asphalt, and DecoMark and TrafficPatterns™ add medallions, wayfinding and crossings in preformed thermoplastic.",
      "Spray parks in Maple Ridge, Surrey and Vancouver and at Wesburn Park and Keswick Water Park in Burnaby; the Spirit Trail in West Vancouver; Alexandra Park in Richmond; the Snug Cove walkway on Bowen Island; a StreetPrint walkway at Mount Douglas in Saanich and the Harbour Walkway in Victoria, with Rutland Centennial Park in Kelowna and a solar-reflective pathway in Osoyoos in the Interior. Municipalities, landscape architects and strata councils commission the work; Square One installs it across the Lower Mainland and Vancouver Island.",
    ],
    products: ["streetbond", "streetprint", "trafficpatterns", "decomark"],
    seo: "Park paths, greenways and spray parks in StreetBond coatings and StreetPrint stamped asphalt across BC. Anti-skid colour that is recoated rather than rebuilt.",
    work: "Park paths and spray parks across BC",
    links: [
      { label: "Decorative coatings", href: "/services/decorative-coatings" },
      { label: "StreetBond", href: "/products/streetbond" },
      { label: "Park projects", href: "/projects" },
    ],
  },
  "schools-sports-courts": {
    title: "School & Sports Court Surfacing in BC",
    headline: "School grounds and sports courts that survive recess",
    intro: [
      "School grounds take more wear than almost any other pavement a district owns. Square One turns an asphalt court into a colour-coded playing surface with StreetBond®, an anti-skid, UV-stable acrylic coating that is recoated rather than replaced; drops hopscotch grids, target circles, play shapes and a labyrinth onto the playground in DecoMark and PreMark preformed thermoplastic, cut to the design and heat-fused in place; and makes a school crosswalk hard to miss in StreetPrint® stamped asphalt, which the manufacturer offers with retroreflective options, or TrafficPatterns™ thermoplastic.",
      "On record: StreetBond sports courts at Brookmere Park in Coquitlam and St. Michael's University School in Victoria; the sensory play pathway at South Langford Elementary; PreMark play markings at Corpus Christi in Vancouver; the Eagle Mountain labyrinth in Abbotsford; KB Woodward's hexagons in Surrey; and the high-visibility school crosswalk at Grandview Heights in Surrey. School districts, municipalities and strata councils commission the work; Square One installs across the Lower Mainland and Vancouver Island.",
    ],
    products: ["streetbond", "decomark", "premark", "trafficpatterns", "streetprint"],
    seo: "School crosswalks, sports court coatings and play markings in StreetBond, DecoMark and PreMark for schools across the Lower Mainland and Vancouver Island.",
    work: "School and sports court surfaces across BC",
    links: [
      { label: "Decorative coatings", href: "/services/decorative-coatings" },
      { label: "Preformed thermoplastic", href: "/services/preformed-thermoplastic" },
      { label: "School projects", href: "/projects" },
    ],
  },
  "bike-lanes": {
    title: "Bike Lane Coatings & Markings in BC",
    headline: "Bike lanes that keep their colour",
    intro: [
      "A green bike lane is only useful while it is still green. Square One installs the lane surface itself: PreMark preformed thermoplastic, manufactured to exact dimensions with embedded retroreflective glass beads and heat-applied for a permanent bond, and StreetBond®, a water-based acrylic coating with an anti-skid aggregate for wet conditions, UV-stable colour and a manufacturer-published 8+ year life cycle that is refreshed with a recoat. The bicycle symbols and arrows go down in PreMark to the owner's marking standard, and StreetPrint® stamped asphalt gives a multi-use path a brick pattern with the manufacturer's published 10–20 year service life.",
      "Green PreMark bike lanes in North Vancouver, a blue bike lane in Richmond, the Cowrie and Trail lane and crossing in Sechelt, a StreetPrint bike path on 32nd Avenue in Surrey. The record covers both regions. Municipalities commission the work; Square One installs it across the Lower Mainland and Vancouver Island.",
    ],
    products: ["premark", "streetbond", "trafficpatterns", "streetprint"],
    seo: "Green bike lanes and multi-use paths in PreMark thermoplastic, StreetBond coatings and StreetPrint, Lower Mainland and Vancouver Island. A published 8+ year life cycle.",
    work: "Bike lanes across BC",
    links: [
      { label: "Decorative coatings", href: "/services/decorative-coatings" },
      { label: "PreMark", href: "/products/premark" },
      { label: "Why green means more than visibility", href: "/blog/why-green-means-more-than-visibility" },
    ],
  },
  "public-art": {
    title: "Pavement Public Art in BC",
    headline: "Public art rendered in the road itself",
    intro: [
      "Pavement public art is a piece where the artist's drawing becomes the road surface. Square One carries it from the drawing to the ground: colour-matched fields in StreetBond®, a water-based acrylic coating with custom colour mixing and an anti-skid aggregate, and factory-cut graphics in TrafficPatterns™ and DecoMark preformed thermoplastic, which reproduce a logo, emblem or complex design in full colour with the durability of a standard road marking. DuraTherm handles the crosswalk bars where the piece is also a crossing, and the layout is set out on site to the geometry a circular motif or a woven crest demands.",
      "Robyn Sparrow's Musqueam design on Granville Street; 'Every Child Matters' by Charliss Santos in New Westminster; 'Circle of Life' by Drew and Elinor Atkins at Langley Events Centre; the whorl-and-canoes medallion at Victoria High School; 'Carpeting' by Renée Van Halm at Joyce Station; Terry Fox Hometown Square in Port Coquitlam; the labyrinth at c̓əsqənelə Elementary in Maple Ridge; the village traffic circle in Cadboro Bay. Municipalities, transit agencies, First Nations and community organisations commission the work; Square One installs it across the Lower Mainland and Vancouver Island.",
    ],
    products: ["streetbond", "trafficpatterns", "decomark", "duratherm"],
    seo: "Pavement public art in TrafficPatterns, DecoMark thermoplastic and StreetBond, Lower Mainland and Vancouver Island: First Nations designs, murals and plazas.",
    work: "Pavement public art across BC",
    links: [
      { label: "Preformed thermoplastic", href: "/services/preformed-thermoplastic" },
      { label: "Decorative coatings", href: "/services/decorative-coatings" },
      { label: "Public art projects", href: "/projects" },
    ],
  },
  "branding-wayfinding": {
    title: "Pavement Branding & Wayfinding in BC",
    headline: "Logos and wayfinding fused into the pavement",
    intro: [
      "Pavement branding puts a school mark, a neighbourhood logo or a wayfinding symbol into the surface itself, heat-fused rather than painted. DecoMark, the fully custom preformed thermoplastic, reproduces a logo's exact geometry in the full colour spectrum with the durability of a standard road marking; PreMark carries the arrows and the bicycle and accessible-parking symbols to the owner's marking standard, with embedded retroreflective glass beads; StreetBond® fills the field behind them in any of more than fifty standard colours or a custom match.",
      "Little Italy's neighbourhood branding on Commercial Drive; community branding at Tsawwassen Commons in Delta; school branding at Katzie Elementary in Surrey; oak-leaf sidewalk decals at Reunion in Murrayville, Langley; wayfinding on the Pacific Spirit Trail in North Vancouver; corporate branding in Chilliwack and provincial branding in Salmon Arm. Municipalities, developers, school districts and commercial properties commission the work; Square One installs across the Lower Mainland and Vancouver Island.",
    ],
    products: ["decomark", "premark", "streetbond", "duratherm"],
    seo: "Pavement branding and wayfinding in DecoMark and PreMark thermoplastic with StreetBond colour for schools, retail and civic sites in BC. Fused, not painted.",
    work: "Pavement branding and wayfinding across BC",
    links: [
      { label: "Preformed thermoplastic", href: "/services/preformed-thermoplastic" },
      { label: "DecoMark", href: "/products/decomark" },
      { label: "Branding projects", href: "/projects" },
    ],
  },
}

const ORDER = WORK_APPS.filter((a) => a.slug !== "driveways").map((a) => a.slug)

export async function generateStaticParams() {
  return ORDER.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const meta = workAppMeta(slug)
  if (!meta || slug === "driveways") return {}
  const copy = COPY[slug as keyof typeof COPY]
  return {
    title: copy.title,
    description: clampDescription(copy.seo),
    openGraph: { title: copy.headline, description: clampDescription(copy.seo), images: [{ url: APP_HEROES[slug as keyof typeof APP_HEROES].src, alt: APP_HEROES[slug as keyof typeof APP_HEROES].alt }] },
    alternates: { canonical: `${SITE_URL}/applications/${slug}` },
  }
}

/** "Vancouver, BC" → "Vancouver" — the caption carries the city, not the province. */
function cityName(city: string): string {
  return city.split(",")[0].trim()
}

export default async function ApplicationPage({ params }: Props) {
  const { slug } = await params
  const meta = workAppMeta(slug)
  if (!meta || slug === "driveways") notFound()

  const copy = COPY[slug as keyof typeof COPY]
  const hero = APP_HEROES[slug as keyof typeof APP_HEROES]
  // The opener as the page has it, with whatever the Studio says on top
  // (a "Page opener" for this application; lib/page-content.ts, 9 Oct 2026).
  const o = mergeOpener(
    { page: `/applications/${slug}`, label: meta.label, src: hero.src, alt: hero.alt, caption: hero.caption, position: hero.position, head: copy.headline },
    await getOpenerDoc(`/applications/${slug}`),
  )
  // This application's gallery, the Studio's photographs included (lib/work-cms.ts, 9 Oct 2026).
  const photos = await studioWorkFor(meta.slug)
  // The Studio's projects (lib/projects-cms.ts, 9 Oct 2026), this application's.
  const caseStudies = (await getProjects()).filter((p) => p.application === meta.label)
  // The gallery skips the opener's frame and the case-study leads told in
  // full further down, so no photograph appears twice on the page.
  const onPage = new Set([hero.src, ...caseStudies.map((p) => p.imageUrl)])
  const galleryPhotos = photos.filter((p) => !onPage.has(p.src))
  const systems = copy.products
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const regions = [...new Set(photos.map((p) => p.region).filter(Boolean))]
  // The systems that appear in this application's photographs, most-photographed first.
  const photographed = [
    ...photos.reduce((m, p) => {
      for (const s of p.systems) m.set(s, (m.get(s) ?? 0) + 1)
      return m
    }, new Map<string, number>()),
  ]
    .sort((a, b) => b[1] - a[1])
    .map(([s]) => s)
    .slice(0, 4)
  const idx = ORDER.indexOf(meta.slug)
  const prev = workAppMeta(ORDER[(idx - 1 + ORDER.length) % ORDER.length])
  const next = workAppMeta(ORDER[(idx + 1) % ORDER.length])

  return (
    <main className="bg-[color:var(--surface)]">
      <JsonLd data={[breadcrumbSchema(SITE_URL, [{ name: "Applications", path: "/applications" }, { name: meta.label, path: `/applications/${slug}` }])]} />
      {/* ── 01 Opener — the record's frame for this kind of work ─────────────────── */}
      <IndexImageHero
        src={o.src}
        alt={o.alt}
        eyebrow={`Applications · ${meta.label}`}
        title={<OpenerTitle head={o.head} tail={o.tail} />}
        lede={o.lede}
        caption={o.caption}
        imagePosition={o.position}
      />

      {/* ── 01b Intro: the lede and the way in on the left, the record as a
             ledger on the right (28 Sept 2026 QA: 30 lines of copy with the
             right half of the page empty; the later paragraphs listed the
             places the gallery captions already name) ─────────────────────── */}
      <section className="bg-surface pt-16 pb-16 max-[700px]:pt-10 max-[700px]:pb-12">
        <div className="container-1280 grid grid-cols-12 items-start gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
          <div className="col-span-7 max-[900px]:col-span-1">
            <Link href="/applications" className="link">
              All applications
            </Link>

            <p className="lede mt-6 max-w-[56ch] [text-wrap:pretty]">
              {(copy.intro[0] ?? "").split(/(?<=[.!?])\s+(?=[A-Z])/).slice(0, 2).join(" ")}
            </p>

            <p className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
              {copy.links.map((l) => (
                <Link key={l.href} href={l.href} className="link">
                  {l.label}
                </Link>
              ))}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/contact" className="btn-primary">
                Get a quote
              </Link>
              <a href={`tel:${PHONE.replace(/-/g, "")}`} className="link">
                {PHONE}
              </a>
            </div>
          </div>

          {/* The record line, as a ledger beside the lede. */}
          <dl className="spec-notes col-span-5 max-[900px]:col-span-1 min-[901px]:mt-12">
            <div>
              <dt>Systems</dt>
              <dd>{photographed.length > 0 ? photographed.join(" · ") : "See the gallery"}</dd>
            </div>
            <div>
              <dt>Projects</dt>
              {/* No count: a published number reads as a ceiling on the work
                  (the client, 10 Sept 2026). The row points at the projects. */}
              <dd>
                {caseStudies.length > 0 ? (
                  <a href="#projects" className="link">Told in full, below</a>
                ) : (
                  "See the gallery"
                )}
              </dd>
            </div>
            <div>
              <dt>Regions</dt>
              <dd>{regions.length > 0 ? regions.join(" · ") : "Across BC"}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── 02 The work ─────────────────────────────────────────────────────────── */}
      <Section
        id="work"
        label="Photographed on site"
        title={copy.work}
        intro="Square One’s own photography, captioned with the system installed and where."
        wide
      >
        <WorkGallery photos={galleryPhotos} ariaLabel={`${meta.label} installation photographs`} />
      </Section>

      {/* ── 03 Systems — hairline rows, the whole row a link; "Specs and
             documents" came off every card (docs/OWN-COMPANY-BRIEF.md §3.5) ── */}
      <Section
        id="systems"
        label="The systems"
        title={<>Systems installed <em>for {meta.label.toLowerCase()}</em></>}
        link={{ href: "/products", label: "All systems" }}
        tone="warm"
        wide
      >
        <ul role="list">
          {systems.map((p) => (
            <li
              key={p.slug}
              className="relative grid grid-cols-12 gap-x-10 gap-y-1 border-t border-hairline py-6 last:border-b max-[700px]:grid-cols-1"
            >
              <Link href={`/products/${p.slug}`} aria-label={`${p.name}, the system`} className="absolute inset-0 z-[2]" />
              <span className="label col-span-3 pt-1 max-[700px]:col-span-1">{plainCase(p.category)}</span>
              <div className="col-span-9 min-w-0 max-[700px]:col-span-1">
                <h3>
                  {p.name}
                  {p.mark && <sup className="ml-[1px] text-[0.55em] font-normal">{p.mark}</sup>}
                </h3>
                <p className="mt-2 max-w-[60ch] text-[16px] leading-[1.55] text-ink-body [text-wrap:pretty]">
                  {p.tagline}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── 04 Projects — frames with the title and the record's
             place · system · year UNDER them ─────────────────────────────── */}
      {caseStudies.length > 0 && (
        <Section id="projects" label="Projects" title={<>Projects <em>on record</em></>} link={{ href: "/projects", label: "All projects" }} wide>
          <ul className="grid grid-cols-1 gap-x-7 gap-y-10 min-[701px]:grid-cols-3" role="list">
            {caseStudies.map((project) => {
              const city = cityName(project.city)
              const metaLine = [city, project.systems.join(" + "), project.year]
                .filter((part): part is string => Boolean(part))
                .join(" · ")
              // What the photograph shows: the project, the system, the city when the title does not already carry it.
              const alt = [
                project.title,
                `in ${project.systems.join(" and ")}`,
                project.title.includes(city) ? "" : `, ${city}, BC`,
              ]
                .filter(Boolean)
                .join(" ") + ". Installed by Square One Paving."
              return (
                <li key={project.slug}>
                  <Frame
                    src={project.imageUrl}
                    alt={alt}
                    aspect="aspect-[4/3]"
                    sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
                    href={`/projects/${project.slug}`}
                    caption={
                      <>
                        <span className="block not-italic font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
                          {project.title}
                        </span>
                        <span className="block">{metaLine}</span>
                      </>
                    }
                  />
                </li>
              )
            })}
          </ul>
        </Section>
      )}

      {/* ── 05 Next ─────────────────────────────────────────────────────────────── */}
      <section className="border-t border-hairline bg-surface py-12">
        <div className="container-1280 flex flex-wrap items-baseline justify-between gap-6">
          {prev && (
            <Link href={`/applications/${prev.slug}`} className="link">
              {prev.label}
            </Link>
          )}
          <Link href="/applications" className="link">
            All applications
          </Link>
          {next && (
            <Link href={`/applications/${next.slug}`} className="link">
              {next.label}
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
