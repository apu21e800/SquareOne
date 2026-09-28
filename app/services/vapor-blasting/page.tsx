import Link from "next/link"
import { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd"
import BeforeAfter from "@/components/BeforeAfter"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import HowAJobGoes, { VAPOUR_STEPS } from "@/components/sections/HowAJobGoes"
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
// Imagery (28 Sept 2026, Vern: "images show the same dude working… the
// client is a bit put off by the duplicate AI images… the one with the
// Burrard Street Bridge in the background is the OG one, it should be better
// displayed on the blasting hero"). The page now carries the record only:
//
//   public/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg
//     The original photograph of the Granville Island job, the Burrard Street
//     Bridge behind it. The hero, shown whole with its caption under it.
//   parking-lot-, walkway-, nozzle-pavers-01.jpg
//     Square One's other three vapour blasting photographs: "On the record".
//
// The AI illustrations in generated/ (the same operator on six Vancouver
// and Victoria backdrops, and the AI-enhanced copy of the hero) are off the
// page and off the site; the files stay on disk. The one generated pair left
// is the before/after wipe, a demonstration with no person in it, captioned
// as one. New illustrations wait for a proper shoot or an approved
// generation pass (Figma Weave works from Cowork, per run, on approval).
//
// 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): labels in the margin
// column, hairlines, underlined links. The water blue stays: it is this
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

/** The original photograph: Square One on the Granville Island boardwalk, the Burrard Street Bridge behind. */
const HERO = {
  src: `${DIR}/granville-island-vapour-blasting-01.jpg`,
  alt: "A Square One operator vapour blasting a painted marking off the boardwalk at Granville Island, Vancouver, with the Burrard Street Bridge behind",
  caption: "Granville Island, Vancouver · marking removal",
}

// ── Headline facts: Square One's own published numbers ─────────────────────────

type Fact = { number: string; label: string }

const facts: Fact[] = [
  { number: "92%", label: "less dust than dry blasting: the water holds it down" },
  { number: "Low heat", label: "little to no heat at the surface, so nothing warps or scorches" },
  { number: "2", label: "regions: Lower Mainland and Vancouver Island, one mobile rig" },
]

// ── What it handles: Square One's published applications, grouped by the
//    business hierarchy, commercial and municipal first ──────────────────────

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
  },
]

// ── On the record: Square One's other three vapour blasting photographs ─────

const recordFrames = [
  {
    src: `${DIR}/parking-lot-vapour-blasting-01.jpg`,
    alt: "Square One removing painted parking symbols from an asphalt lot with the vapour blasting rig",
    caption: "Commercial parking lot · marking removal",
    position: "center 45%",
  },
  {
    src: `${DIR}/walkway-vapour-blasting-01.jpg`,
    alt: "Square One stripping a red coating from a public walkway with the vapour blasting rig",
    caption: "Public walkway · coating removal",
    position: "center 50%",
  },
  {
    src: `${DIR}/nozzle-pavers-01.jpg`,
    alt: "The vapour blasting nozzle mid-pass over pavers, the wet fan of abrasive and the clean line behind it",
    caption: "Pavers · the nozzle mid-pass",
    position: "center 50%",
  },
]

// ── Substrates: from Square One's published application list ──────────────

const substrates = [
  "Asphalt", "Concrete", "Brick", "Limestone", "Marble", "Stucco", "Steel", "Iron",
  "Wood", "Pavers & patios", "Marine decks", "Hulls & on-board coatings",
]

// ── Service area: the same regions every other page names ─────────────────

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

      {/* ── Opener: the words on paper, the original photograph beside them,
             shown whole (the bridge, the operator and the marking), its
             caption under it ── */}
      <section className="bg-surface pt-[calc(var(--bar-h)+64px)] pb-16 max-[900px]:pt-[calc(var(--bar-h)+36px)] max-[900px]:pb-12">
        <div className="container-1280 grid grid-cols-12 items-center gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
          <div className="col-span-5 max-[900px]:col-span-1">
            <span className="label">Vapour blasting &middot; mobile cleaning and priming</span>
            <h1 className="mt-5 max-w-[18ch]">Clean it, prime it, bring it back</h1>
            <p className="lede mt-6 max-w-[48ch] [text-wrap:pretty]">
              A powerful, portable blasting solution for surface prep. Vapour blasting uses less
              water, generates up to 92% less dust, produces little to no heat and creates less
              environmental impact than the alternatives, while getting the job done faster.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/contact" className="btn-primary">
                Get a quote
              </Link>
              <a href="tel:+16046126209" className="link">
                604-612-6209
              </a>
            </div>
          </div>
          <div className="col-span-7 max-[900px]:col-span-1">
            <Frame
              src={HERO.src}
              alt={HERO.alt}
              caption={HERO.caption}
              aspect="aspect-[5/3]"
              sizes="(max-width: 900px) 100vw, 760px"
              position="center 50%"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Facts: one quiet row on the water tint, divided by rules ── */}
      <section className="band-water border-y py-8 max-[700px]:py-6" aria-label="Vapour blasting, in brief">
        <ul className="container-1280 grid grid-cols-3 max-[700px]:grid-cols-1 max-[700px]:gap-y-5">
          {facts.map((fact, i) => (
            <li
              key={fact.label}
              className={`min-w-0 px-7 first:pl-0 last:pr-0 max-[700px]:px-0 max-[700px]:border-l-0 ${
                i > 0 ? "border-l border-[color:var(--water-hairline)]" : ""
              }`}
            >
              <span className="block text-[24px] font-bold leading-none text-ink" style={{ fontFamily: "var(--font-display)" }}>
                {fact.number}
              </span>
              <span className="mt-2 block max-w-[32ch] text-[15px] leading-[1.5] text-ink-muted">{fact.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── What it handles: three columns, commercial first ──────── */}
      <Section
        label="What it handles"
        title="From storefront to drydock"
        intro="Vapour blasting works on almost every hard surface. The difference between a parkade, a patio and a yacht deck is the pressure and the media, not the method."
        wide
      >
        <div className="grid grid-cols-3 gap-x-10 gap-y-12 max-[1000px]:grid-cols-1">
          {tiers.map((tier) => (
            <article key={tier.title} className="border-t border-hairline pt-6">
              <span className="label">{tier.audience}</span>
              <h3 className="mt-1">{tier.title}</h3>
              <p className="mt-3 max-w-[44ch] text-[16px] leading-[1.6] text-ink-body [text-wrap:pretty]">{tier.body}</p>
              <ul className="mt-5 border-t border-hairline">
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
            </article>
          ))}
        </div>
      </Section>

      {/* ── Before / after: the one demonstration, captioned as one ── */}
      <Section
        label="Before and after"
        title="Drag the line"
        intro="Aerosol graffiti on face brick. The abrasive travels in water, so the paint comes off and the dust stays on the ground: no shutdown, no dust cloud, no chemical residue."
        tone="warm"
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

      {/* ── On the record: the three other photographs of Square One's
             vapour blasting jobs, captioned under the frame ── */}
      <Section
        id="gallery"
        label="On the record"
        title="Square One's vapour blasting, photographed on the job"
        link={{ href: YOUTUBE, label: "Demonstration videos on YouTube" }}
        className="scroll-mt-[72px]"
        wide
      >
        <ul className="grid grid-cols-3 gap-x-7 gap-y-10 max-[900px]:grid-cols-1">
          {recordFrames.map((frame) => (
            <li key={frame.src}>
              <Frame
                src={frame.src}
                alt={frame.alt}
                caption={frame.caption}
                aspect="aspect-[4/3]"
                sizes="(max-width: 900px) 100vw, 400px"
                position={frame.position}
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* ── How a job goes: the site's one process band ── */}
      <HowAJobGoes tone="warm" crews={false} cta={false} steps={VAPOUR_STEPS} label="Four steps, every job" />

      {/* ── Surfaces and the service area, on one rule ── */}
      <section className="bg-surface-warm pb-20 max-[700px]:pb-14" aria-label="Surfaces and service area">
        <div className="container-1280">
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 border-t border-hairline pt-7 max-[900px]:grid-cols-1">
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
