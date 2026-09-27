import Link from "next/link"
import { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd"
import IndexImageHero from "@/components/IndexImageHero"
import BeforeAfter from "@/components/BeforeAfter"
import FrameGallery from "@/components/FrameGallery"
import Frame from "@/components/ui/Frame"
import { Section, Row } from "@/components/ui/Container"
import { getServiceBySlug } from "@/lib/services"
import { clampDescription } from "@/lib/seo"

// Route and slug keep the US spelling; display prose reads "vapour blasting".
// This page is the ONLY vapour route — /vapor-blasting redirects here.
//
// Positioning per the business hierarchy (§2.4a): vapour blasting is Square
// One's EXTRA service — cleaning surfaces, priming surfaces, graffiti removal,
// commercial muck like mould. Commercial and municipal paving leads the
// company; this page sells the supporting trade on its own merits.
//
// Every claim below is one Square One has published itself: "uses less water,
// generates up to 92% less dust, produces little to no heat, and creates less
// environmental impact than the alternatives, all while getting the job done
// faster", plus its own list of applications. Nothing else is asserted.
//
// Imagery (19 Sept 2026) — two kinds, kept apart on disk and on the page:
//
//   public/images/services/vapor-blasting/*.jpg
//     The four photographs Square One holds (524px archive tiles, upscaled
//     11 Sept). These are the record. They are the only frames captioned
//     with a place, and they sit together under "From the record".
//
//   public/images/services/vapor-blasting/generated/gen-*.jpg
//     Supplied by Vern 19 Sept, AI-generated. gen-granville-island-…-enhanced
//     is a re-render of the Granville Island photograph above — same job,
//     same frame, a clear sky — and carries the hero and the site's vapour
//     tiles. The other nine are illustrations of the service on real
//     Vancouver and Victoria backdrops; the jobs in them never happened.
//     They are captioned by surface and task only, never by place, and the
//     method section says plainly which frames are the record. The gen-
//     prefix and the generated/ folder keep them out of the search index
//     and the disk-walked galleries (lib/search-index.ts, lib/gallery.ts).
//
// The before / after wipe (components/BeforeAfter) is the page's one
// interactive moment — Vern's bonus for the client, 19 Sept.
//
// 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the same bands on the
// own-company primitives — labels in the margin column, the three tier
// cards as hairline rows with their frames captioned under them, the city
// frames captioned under, the big numerals brought down to one quiet row,
// every arrow link an underlined word. The water blue stays: it is this
// trade's own accent, and this page is the only place it is used.

export const metadata: Metadata = {
  title: "Vapour Blasting BC | Cleaning & Priming",
  description:
    clampDescription("Mobile vapour blasting across the Lower Mainland and Vancouver Island: surface cleaning and priming, graffiti, gum and mould removal, road-marking removal, paint and coating stripping. Up to 92% less dust than dry blasting. Square One Paving."),
  keywords: [
    "vapour blasting BC",
    "vapor blasting Vancouver",
    "dustless blasting Vancouver Island",
    "graffiti removal Vancouver",
    "graffiti removal brick BC",
    "mould removal exterior BC",
    "road marking removal BC",
    "surface priming coating prep BC",
    "wet abrasive blasting BC",
    "marine coating removal BC",
  ],
  alternates: { canonical: `${SITE_URL}/services/vapor-blasting` },
  openGraph: {
    title: "Vapour Blasting BC | Cleaning & Priming | Square One Paving",
    description:
      clampDescription("Graffiti off brick, mould off commercial exteriors, markings off roads, coatings off steel and hulls, with up to 92% less dust than dry blasting. Mobile across BC."),
    images: [{ url: "/images/og-image.png", width: 1200, height: 600, alt: "Square One Paving" }],
  },
}

const DIR = "/images/services/vapor-blasting"
const GEN = `${DIR}/generated`

// ── Headline facts — Square One's own published numbers ─────────────────────────

type Fact = { number: string; label: string }

const facts: Fact[] = [
  { number: "92%", label: "less dust than dry blasting: the water holds it down" },
  { number: "Low heat", label: "little to no heat at the surface, so nothing warps or scorches" },
  { number: "2", label: "regions: Lower Mainland and Vancouver Island, one mobile rig" },
]

// ── What it handles — Square One's published applications, grouped by the
//    business hierarchy: commercial and municipal first ──────────────────────

const tiers = [
  {
    audience: "Commercial & municipal",
    title: "Storefronts, plazas, roads",
    body: "Graffiti, gum, mould and old markings off brick, concrete, stone and asphalt, without the dust cloud of dry blasting.",
    bullets: [
      "Graffiti, gum, mould and soot removal",
      "Road marking removal",
      "Steel and concrete surface preparation",
      "Brick and patio cleaning",
      "Fire and smoke damage cleaning",
    ],
    tags: ["Property managers", "Municipalities", "Strata"],
    photo: {
      src: `${GEN}/gen-brick-graffiti-mid-pass.jpg`,
      alt: "Vapour blasting aerosol graffiti off a face-brick wall, clean brick behind the nozzle, tags ahead of it",
      caption: "Graffiti · face brick",
      position: "center 55%",
    },
  },
  {
    audience: "Residential",
    title: "Driveways, patios, railings",
    body: "Paint, stain, moss and grime off patios, driveways, stone and railings, cleaned, then primed for whatever comes next.",
    bullets: [
      "Paint and stain removal",
      "Wood, concrete and steel cleaning",
      "Limestone, marble and stucco stain removal",
      "Iron fence and railing preparation",
      "Priming before a coating",
    ],
    tags: ["Homeowners", "Estates"],
    photo: {
      src: `${GEN}/gen-patio-pavers-nozzle.jpg`,
      alt: "The vapour blasting nozzle mid-pass over patio pavers, lifting moss and grime from the joints",
      caption: "Patio pavers · cleaning",
      position: "center 40%",
    },
  },
  {
    audience: "Marine & industrial",
    title: "Hulls, decks, equipment",
    body: "Deck and on-board coatings off, steel taken to a clean profile without the heat that warps thin sections.",
    bullets: [
      "Polyurethane deck coating removal (yachting)",
      "Marine on-board coating removal",
      "Steel surface preparation",
      "Equipment and frames",
    ],
    tags: ["Marine", "Manufacturing"],
    photo: {
      src: `${GEN}/gen-steel-railing-rust.jpg`,
      alt: "Vapour blasting rust off a steel railing at the water's edge",
      caption: "Steel railing · rust and paint",
      position: "center 42%",
    },
  },
]

// ── Gallery — the record first, then the illustrations, each labelled ──────
//    (Vern, 19 Sept: "add the images to the galleries section"). Opens the
//    same full-screen viewer as /galleries; reached from the hub's card.

const recordFrames = [
  {
    src: `${GEN}/gen-granville-island-vapour-blasting-01-enhanced.jpg`,
    alt: "Square One removing a painted marking from the Granville Island boardwalk, Vancouver, AI-enhanced from the original photograph",
    primary: "Granville Island, Vancouver",
    secondary: "Marking removal · AI-enhanced from the original photograph",
  },
  {
    src: `${DIR}/parking-lot-vapour-blasting-01.jpg`,
    alt: "Square One removing painted parking symbols from an asphalt lot with the vapour blasting rig",
    primary: "Commercial parking lot",
    secondary: "Marking removal · asphalt",
  },
  {
    src: `${DIR}/walkway-vapour-blasting-01.jpg`,
    alt: "Square One stripping a red coating from a public walkway with the vapour blasting rig",
    primary: "Public walkway",
    secondary: "Coating removal · concrete",
  },
  {
    src: `${DIR}/nozzle-pavers-01.jpg`,
    alt: "The vapour blasting nozzle mid-pass over pavers, the wet fan of abrasive and the clean line behind it",
    primary: "The nozzle mid-pass",
    secondary: "Cleaning · pavers",
  },
]

const illustrationFrames = [
  {
    src: `${GEN}/gen-sidewalk-concrete-cleaning.jpg`,
    alt: "Cleaning a concrete sidewalk beside a stone monument with the vapour blasting rig, the lane coned off",
    primary: "Sidewalk cleaning",
    secondary: "Concrete · lane coned off",
  },
  {
    src: `${GEN}/gen-concrete-pier-graffiti.jpg`,
    alt: "Vapour blasting graffiti off a cast-concrete bridge pier",
    primary: "Graffiti",
    secondary: "Cast concrete",
  },
  {
    src: `${GEN}/gen-road-marking-removal-02.jpg`,
    alt: "Vapour blasting a painted line off wet asphalt, the spray, and the water holding the dust down",
    primary: "Line marking removal",
    secondary: "Asphalt",
  },
  {
    src: `${GEN}/gen-road-marking-removal-01.jpg`,
    alt: "Removing a painted road symbol from asphalt with the vapour blasting rig",
    primary: "Road marking removal",
    secondary: "Painted symbol · asphalt",
  },
  {
    src: `${GEN}/gen-brick-graffiti-before.jpg`,
    alt: "A face-brick wall covered in aerosol graffiti tags, before vapour blasting",
    primary: "Graffiti, before",
    secondary: "Face brick",
  },
  {
    src: `${GEN}/gen-brick-graffiti-mid-pass.jpg`,
    alt: "Vapour blasting aerosol graffiti off a face-brick wall, clean brick behind the nozzle, tags ahead of it",
    primary: "Graffiti, mid-pass",
    secondary: "Face brick",
  },
  {
    src: `${GEN}/gen-brick-graffiti-after.jpg`,
    alt: "The same face-brick wall after vapour blasting, clean brick, mortar joints intact",
    primary: "Graffiti, after",
    secondary: "Face brick",
  },
  {
    src: `${GEN}/gen-steel-railing-rust.jpg`,
    alt: "Vapour blasting rust off a steel railing at the water's edge",
    primary: "Rust and paint removal",
    secondary: "Steel railing",
  },
  {
    src: `${GEN}/gen-patio-pavers-nozzle.jpg`,
    alt: "The vapour blasting nozzle mid-pass over patio pavers, lifting moss and grime from the joints",
    primary: "Patio cleaning",
    secondary: "Pavers · moss and grime",
  },
]

// ── The rig in the city — three illustrations, captioned by task and
//    surface (no place: they are illustrations, not the record) ────────────

const cityFrames = [
  {
    src: `${GEN}/gen-sidewalk-concrete-cleaning.jpg`,
    alt: "Cleaning a concrete sidewalk beside a stone monument with the vapour blasting rig, the lane coned off",
    caption: "Sidewalk cleaning · concrete · lane coned off",
    position: "center 60%",
  },
  {
    src: `${GEN}/gen-concrete-pier-graffiti.jpg`,
    alt: "Vapour blasting graffiti off a cast-concrete bridge pier",
    caption: "Graffiti · cast concrete",
    position: "center 55%",
  },
  {
    src: `${GEN}/gen-road-marking-removal-02.jpg`,
    alt: "Vapour blasting a painted line off wet asphalt, the spray, and the water holding the dust down",
    caption: "Line marking removal · asphalt",
    position: "center 60%",
  },
]

// ── Substrates — from Square One's published application list ──────────────

const substrates = [
  "Asphalt", "Concrete", "Brick", "Limestone", "Marble", "Stucco", "Steel", "Iron",
  "Wood", "Pavers & patios", "Marine decks", "Hulls & on-board coatings",
]

// ── Service area — the same regions every other page names ─────────────────

const cities = [
  "Vancouver", "North Vancouver", "West Vancouver", "Burnaby", "Richmond", "Surrey",
  "Coquitlam", "Maple Ridge", "Langley", "Abbotsford", "Chilliwack",
  "Victoria", "Saanich", "Langford", "Duncan", "Nanaimo", "Parksville",
]

const YOUTUBE = "https://www.youtube.com/channel/UCBDvB4vgdahH67BmP6FeccQ"

export default function VaporBlastingServicePage() {
  const service = getServiceBySlug("vapor-blasting")
  const faqs = service?.faqs ?? []
  return (
    <main>
      <JsonLd
        data={[
          {
            "@type": "Service",
            name: "Vapour blasting",
            serviceType: "Vapour blasting: surface cleaning, priming, graffiti and marking removal",
            description: metadata.description,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "AdministrativeArea", name: "Lower Mainland, British Columbia" },
              { "@type": "AdministrativeArea", name: "Vancouver Island, British Columbia" },
            ],
            url: `${SITE_URL}/services/vapor-blasting`,
          },
          faqSchema(faqs),
          breadcrumbSchema(SITE_URL, [
            { name: "Services", path: "/services" },
            { name: "Vapour blasting", path: "/services/vapor-blasting" },
          ]),
        ]}
      />

      {/* ── Hero — full-bleed: Square One's Granville Island job, enhanced.
             One button over the photograph; the number is an underlined word. ── */}
      <IndexImageHero
        src={`${GEN}/gen-granville-island-vapour-blasting-01-enhanced.jpg`}
        alt="A Square One operator vapour blasting a painted marking off the boardwalk at Granville Island, Vancouver"
        eyebrow="Service · Mobile cleaning and priming"
        title="Clean it, prime it, bring it back"
        lede="A powerful, portable blasting solution for surface prep. Vapour blasting uses less water, generates up to 92% less dust, produces little to no heat and creates less environmental impact than the alternatives, while getting the job done faster."
        caption="Granville Island, Vancouver · marking removal"
        imagePosition="30% 58%"
        align="right"
      >
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/contact" className="btn-primary btn-water">
            Get a quote
          </Link>
          <a
            href="tel:+16046126209"
            className="text-[16px] text-white underline decoration-white/60 underline-offset-[5px] transition-colors hover:decoration-white"
          >
            604-612-6209
          </a>
        </div>
      </IndexImageHero>

      {/* ── Facts — one quiet row on the water tint, divided by rules ── */}
      <section className="band-water border-b py-8 max-[700px]:py-6" aria-label="Vapour blasting, in brief">
        <ul className="container-1280 grid grid-cols-3 max-[700px]:grid-cols-1 max-[700px]:gap-y-5">
          {facts.map((fact, i) => (
            <li
              key={fact.label}
              className={`min-w-0 px-7 first:pl-0 last:pr-0 max-[700px]:px-0 max-[700px]:border-l-0 ${
                i > 0 ? "border-l border-[color:var(--water-hairline)]" : ""
              }`}
            >
              <span className="block text-[22px] font-bold leading-none text-ink" style={{ fontFamily: "var(--font-display)" }}>
                {fact.number}
              </span>
              <span className="mt-2 block max-w-[32ch] text-[15px] leading-[1.5] text-ink-muted">{fact.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Before / after — the wall cleans itself, then it's yours ── */}
      <Section
        label="Before and after"
        title="Drag the line"
        intro="Aerosol graffiti on face brick. The abrasive travels in water, so the paint comes off and the dust stays on the ground: no shutdown, no dust cloud, no chemical residue."
        wide
      >
        <BeforeAfter
          tone="water"
          className="aspect-[16/9] max-[700px]:aspect-[4/3]"
          before={{
            src: `${GEN}/gen-brick-graffiti-before.jpg`,
            alt: "A face-brick wall covered in aerosol graffiti tags, before vapour blasting",
          }}
          after={{
            src: `${GEN}/gen-brick-graffiti-after.jpg`,
            alt: "The same face-brick wall after vapour blasting, clean brick, mortar joints intact",
          }}
        />
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="cap mt-0">Demonstration &middot; aerosol graffiti off face brick &middot; drag the line</p>
          <Link href="/contact" className="link">
            Send us a photo of your wall
          </Link>
        </div>
      </Section>

      {/* ── The rig in the city — the three illustrations Vern and the
             client worked hardest on, at full width, captioned by task and
             surface only (illustrations of the service, never a place) ──── */}
      <Section
        label="One rig, any surface"
        title="Sidewalks, piers, lines: wherever the paint is"
        intro="Illustrations of the service. The real frames are in the gallery below."
        wide
      >
        <ul className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          {cityFrames.map((frame) => (
            <li key={frame.src}>
              <Frame
                src={frame.src}
                alt={frame.alt}
                caption={frame.caption}
                aspect="aspect-[16/10]"
                sizes="(max-width: 900px) 100vw, 400px"
                position={frame.position}
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* ── What it handles — three rows, commercial first ──────── */}
      <Section
        label="What it handles"
        title="From storefront to drydock"
        intro="Vapour blasting works on almost every hard surface. The difference between a parkade, a patio and a yacht deck is the pressure and the media, not the method."
        tone="warm"
        wide
      >
        <div>
          {tiers.map((tier) => (
            <Row key={tier.title} as="article">
              <Frame
                src={tier.photo.src}
                alt={tier.photo.alt}
                caption={tier.photo.caption}
                aspect="aspect-[5/3]"
                sizes="(max-width: 700px) 100vw, 520px"
                position={tier.photo.position}
              />
              <div className="min-w-0">
                <span className="label">{tier.audience}</span>
                <h3 className="mt-1">{tier.title}</h3>
                <p className="mt-3 max-w-[48ch] text-ink-body [text-wrap:pretty]">{tier.body}</p>
                <ul className="mt-5 max-w-[48ch] border-t border-hairline">
                  {tier.bullets.map((bullet) => (
                    <li key={bullet} className="border-b border-hairline py-[9px] text-[15px] leading-[1.5] text-ink-body">
                      {bullet}
                    </li>
                  ))}
                </ul>
                <p className="mt-4">
                  {tier.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </p>
              </div>
            </Row>
          ))}
        </div>

        {/* Surfaces and the service area, on one rule — what the Scope
            section used to say in three columns (trimmed 19 Sept 2026,
            Vern: "too much text on the vapour blasting page"). */}
        <div className="mt-12 grid grid-cols-12 gap-x-12 gap-y-6 border-t border-hairline pt-7 max-[900px]:grid-cols-1">
          <div className="col-span-7 max-[900px]:col-span-1">
            <span className="label">Surfaces</span>
            <p className="mt-3">
              {substrates.map((substrate) => (
                <span key={substrate} className="tag">
                  {substrate}
                </span>
              ))}
            </p>
          </div>
          <div className="col-span-5 max-[900px]:col-span-1">
            <span className="label">Service area</span>
            <p className="mt-3 text-[16px] leading-[1.6] text-ink-body">
              Lower Mainland and Vancouver Island. The rig is mobile, and it comes to the site.
            </p>
            <p className="mt-2 text-[15px] italic leading-[1.6] text-ink-muted">{cities.join(" · ")}</p>
          </div>
        </div>
      </Section>

      {/* ── Gallery — the record, then the illustrations. The one link is
             external, so the header is set by hand on the Section's classes. ── */}
      <section id="gallery" className="sec section scroll-mt-[72px] bg-surface-warm">
        <div className="container-1280">
          <div className="sec-grid">
            <div className="sec-label">
              <span className="label">Gallery</span>
            </div>
            <div className="sec-body">
              <div className="sec-head">
                <h2>On record, and in illustration</h2>
                <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="link">
                  Demonstration videos on our YouTube channel
                </a>
              </div>
            </div>
            <div className="sec-content col-span-12">
              <FrameGallery
                ariaLabel="Vapour blasting photographs"
                groups={[
                  {
                    label: "From the record",
                    note: "Square One's own jobs. The first frame is the hero of this page, AI-enhanced from the original photograph.",
                    photos: recordFrames,
                  },
                  {
                    label: "Illustrations of the service",
                    note: "Generated scenes of the rig at work, the surfaces and the method, not records of specific jobs.",
                    photos: illustrationFrames,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Questions ────────────────────────────────────────────── */}
      <Section label="Questions" title="What people ask about vapour blasting">
        <div className="border-t border-hairline">
          {faqs.map((faq, i) => (
            <details key={faq.q} open={i === 0} className="group border-b border-hairline">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[20px] [&::-webkit-details-marker]:hidden">
                <span className="text-[1.125rem] font-semibold leading-[1.4] text-ink">{faq.q}</span>
                <span aria-hidden="true" className="flex-shrink-0 text-[22px] font-normal leading-none text-ink-muted">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">&minus;</span>
                </span>
              </summary>
              <p className="max-w-[64ch] pb-6 pr-10 text-[16px] leading-[1.6] text-ink-body max-[700px]:pr-0">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ── Close ───────────────────────────────────────────────────── */}
      <Section
        label="Get a quote"
        title="Send us a photo, we send back a quote"
        intro="The fastest path to a quote is a couple of photos and a postcode. We identify the surface, suggest the approach and come back with a written estimate."
        tone="warm"
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/contact" className="btn-primary">
            Get a quote
          </Link>
          <a href="tel:+16046126209" className="link">
            604-612-6209
          </a>
        </div>

        <p className="mt-8 text-[15px] leading-[1.8] text-ink-muted">
          Vancouver Island{" "}
          <a href="tel:+12503910270" className="link">
            250-391-0270
          </a>{" "}
          &middot; toll-free{" "}
          <a href="tel:+18773910270" className="link">
            1-877-391-0270
          </a>{" "}
          &middot;{" "}
          <a href="mailto:office@squareonepaving.com" className="link">
            office@squareonepaving.com
          </a>
        </p>
      </Section>
    </main>
  )
}
