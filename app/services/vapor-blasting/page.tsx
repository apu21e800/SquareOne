import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd"
import IndexImageHero from "@/components/IndexImageHero"
import BeforeAfter from "@/components/BeforeAfter"
import FrameGallery from "@/components/FrameGallery"
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

export const metadata: Metadata = {
  title: "Vapour Blasting BC | Cleaning & Priming",
  description:
    clampDescription("Mobile vapour blasting across the Lower Mainland and Vancouver Island — surface cleaning and priming, graffiti, gum and mould removal, road-marking removal, paint and coating stripping. Up to 92% less dust than dry blasting. Square One Paving."),
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
      clampDescription("Graffiti off brick, mould off commercial exteriors, markings off roads, coatings off steel and hulls — with up to 92% less dust than dry blasting. Mobile across BC."),
    images: [{ url: "/images/og-image.png", width: 1200, height: 600, alt: "Square One Paving" }],
  },
}

const DIR = "/images/services/vapor-blasting"
const GEN = `${DIR}/generated`

// ── Headline facts — Square One's own published numbers ─────────────────────────

type Fact = { number: string; label: string }

const facts: Fact[] = [
  { number: "92%", label: "less dust than dry blasting — the water holds it down" },
  { number: "Low heat", label: "little to no heat at the surface, so nothing warps or scorches" },
  { number: "2", label: "regions — Lower Mainland and Vancouver Island, one mobile rig" },
]

// ── What it handles — Square One's published applications, grouped by the
//    business hierarchy: commercial and municipal first ──────────────────────

const tiers = [
  {
    eyebrow: "01 · Commercial & municipal",
    title: "Storefronts, plazas, roads",
    body: "Graffiti, gum, mould and old markings off brick, concrete, stone and asphalt — without the dust cloud of dry blasting.",
    bullets: [
      "Graffiti, gum, mould and soot removal",
      "Road marking removal",
      "Steel and concrete surface preparation",
      "Brick and patio cleaning",
      "Fire and smoke damage cleaning",
    ],
    tag: "Property managers · Municipalities · Strata",
    photo: {
      src: `${GEN}/gen-brick-graffiti-mid-pass.jpg`,
      alt: "Vapour blasting aerosol graffiti off a face-brick wall — clean brick behind the nozzle, tags ahead of it",
      caption: "Graffiti · face brick",
      position: "center 55%",
    },
  },
  {
    eyebrow: "02 · Residential",
    title: "Driveways, patios, railings",
    body: "Paint, stain, moss and grime off patios, driveways, stone and railings — cleaned, then primed for whatever comes next.",
    bullets: [
      "Paint and stain removal",
      "Wood, concrete and steel cleaning",
      "Limestone, marble and stucco stain removal",
      "Iron fence and railing preparation",
      "Priming before a coating",
    ],
    tag: "Homeowners · Estates",
    photo: {
      src: `${GEN}/gen-patio-pavers-nozzle.jpg`,
      alt: "The vapour blasting nozzle mid-pass over patio pavers, lifting moss and grime from the joints",
      caption: "Patio pavers · cleaning",
      position: "center 40%",
    },
  },
  {
    eyebrow: "03 · Marine & industrial",
    title: "Hulls, decks, equipment",
    body: "Deck and on-board coatings off, steel taken to a clean profile without the heat that warps thin sections.",
    bullets: [
      "Polyurethane deck coating removal (yachting)",
      "Marine on-board coating removal",
      "Steel surface preparation",
      "Equipment and frames",
    ],
    tag: "Marine · Manufacturing",
    photo: {
      src: `${GEN}/gen-steel-railing-rust.jpg`,
      alt: "Vapour blasting rust off a steel railing at the water's edge",
      caption: "Steel railing · rust and paint",
      position: "center 42%",
    },
  },
]

// ── Why wet — each point traces to Square One's own description ────────────


// ── Process — what actually happens, no invented paperwork ─────────────────


// ── Gallery — the record first, then the illustrations, each labelled ──────
//    (Vern, 19 Sept: "add the images to the galleries section"). Opens the
//    same full-screen viewer as /galleries; reached from the hub's card.

const recordFrames = [
  {
    src: `${GEN}/gen-granville-island-vapour-blasting-01-enhanced.jpg`,
    alt: "Square One removing a painted marking from the Granville Island boardwalk, Vancouver — AI-enhanced from the original photograph",
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
    alt: "The vapour blasting nozzle mid-pass over pavers — the wet fan of abrasive and the clean line behind it",
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
    alt: "Vapour blasting a painted line off wet asphalt — the spray, and the water holding the dust down",
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
    alt: "Vapour blasting aerosol graffiti off a face-brick wall — clean brick behind the nozzle, tags ahead of it",
    primary: "Graffiti, mid-pass",
    secondary: "Face brick",
  },
  {
    src: `${GEN}/gen-brick-graffiti-after.jpg`,
    alt: "The same face-brick wall after vapour blasting — clean brick, mortar joints intact",
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
    alt: "Vapour blasting a painted line off wet asphalt — the spray, and the water holding the dust down",
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
            serviceType: "Vapour blasting — surface cleaning, priming, graffiti and marking removal",
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

      {/* ── Hero — full-bleed: Square One's Granville Island job, enhanced ── */}
      <IndexImageHero
        src={`${GEN}/gen-granville-island-vapour-blasting-01-enhanced.jpg`}
        alt="A Square One operator vapour blasting a painted marking off the boardwalk at Granville Island, Vancouver"
        eyebrow="Service · Mobile cleaning and priming"
        title="Clean it, prime it, bring it back"
        lede="A powerful, portable blasting solution for surface prep. Vapour blasting uses less water, generates up to 92% less dust, produces little to no heat and creates less environmental impact than the alternatives — while getting the job done faster."
        caption="Granville Island, Vancouver · marking removal"
        imagePosition="30% 58%"
        align="right"
      >
        <div className="mt-9 flex flex-wrap items-center gap-[14px]">
          <Link href="/contact" className="btn-primary btn-water">
            Request a quote
          </Link>
          <a href="tel:+16046126209" className="btn-on-image">
            604-612-6209
          </a>
        </div>
      </IndexImageHero>

      {/* ── Facts ───────────────────────────────────────────────────── */}
      <section className="band-water section border-b">
        <div className="container-1280 grid grid-cols-3 gap-10 max-[700px]:grid-cols-1 max-[700px]:gap-9">
          {facts.map((fact) => (
            <div key={fact.label} className="stat-rule stat-water">
              <div className="stat-num">{fact.number}</div>
              <div className="mt-[14px] text-[15px] text-ink-muted">{fact.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Before / after — the wall cleans itself, then it's yours ── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div>
              <p className="eyebrow eyebrow-water">Before and after</p>
              <h2 className="mt-5">Drag the line</h2>
            </div>
            <p className="max-w-[46ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
              Aerosol graffiti on face brick. The abrasive travels in water, so the paint comes
              off and the dust stays on the ground — no shutdown, no dust cloud, no chemical
              residue.
            </p>
          </div>

          <BeforeAfter
            tone="water"
            className="mt-10 aspect-[16/9] max-[700px]:aspect-[4/3]"
            before={{
              src: `${GEN}/gen-brick-graffiti-before.jpg`,
              alt: "A face-brick wall covered in aerosol graffiti tags, before vapour blasting",
            }}
            after={{
              src: `${GEN}/gen-brick-graffiti-after.jpg`,
              alt: "The same face-brick wall after vapour blasting — clean brick, mortar joints intact",
            }}
          />

          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <p className="text-[13px] tracking-[0.02em] text-ink-muted">
              Demonstration &middot; aerosol graffiti off face brick
            </p>
            <Link href="/contact" className="arrow-link">
              Send us a photo of your wall <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── The rig in the city — the three illustrations Vern and the
             client worked hardest on, at full width, captioned by task and
             surface only (illustrations of the service, never a place) ──── */}
      <section className="section relative overflow-hidden border-t border-hairline bg-surface">
        <div className="container-1280 relative z-[1]">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div>
              <p className="eyebrow eyebrow-water">One rig, any surface</p>
              <h2 className="mt-5 max-w-[20ch] [text-wrap:balance]">Sidewalks, piers, lines &mdash; wherever the paint is</h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] text-ink-muted [text-wrap:pretty]">
              Illustrations of the service. The real frames are in the gallery below.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
            {cityFrames.map((frame) => (
              <figure key={frame.src} className="thumb relative aspect-[16/10] overflow-hidden rounded-[2px] bg-surface-stone">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 400px"
                  className="object-cover"
                  style={{ objectPosition: frame.position }}
                />
                <div aria-hidden="true" className="scrim scrim-light" />
                <figcaption className="caption">{frame.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── What it handles — three tiers, commercial first ──────── */}
      <section className="section relative overflow-hidden border-t border-hairline bg-surface-warm">
        <div className="container-1280 relative z-[1]">
          <p className="eyebrow eyebrow-water">What it handles</p>

          <h2 className="mt-5">From storefront to drydock</h2>

          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
            Vapour blasting works on almost every hard surface. The difference between a parkade,
            a patio and a yacht deck is the pressure and the media — not the method.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
            {tiers.map((tier) => (
              <article
                key={tier.eyebrow}
                className="flex flex-col rounded-[2px] border border-hairline bg-surface"
              >
                <div className="relative aspect-[5/3] overflow-hidden rounded-t-[2px] border-b border-hairline bg-surface-stone">
                  <Image
                    src={tier.photo.src}
                    alt={tier.photo.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 400px"
                    className="object-cover"
                    style={{ objectPosition: tier.photo.position }}
                  />
                  <div aria-hidden="true" className="scrim scrim-light" />
                  <div className="caption">{tier.photo.caption}</div>
                </div>

                <div className="flex flex-1 flex-col p-8 max-[700px]:p-6">
                  <p className="label">{tier.eyebrow}</p>

                  <h3 className="mt-4">{tier.title}</h3>

                  <p className="mt-4 text-[15px] leading-[1.6] text-ink-body">{tier.body}</p>

                  <ul className="mt-6 border-t border-hairline">
                    {tier.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="border-b border-hairline py-[10px] text-[14px] leading-[1.5] text-ink-body"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-auto pt-6 text-[12px] font-medium tracking-[0.08em] text-ink-muted">
                    {tier.tag}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Surfaces and the service area, on one rule — what the Scope
              section used to say in three columns (trimmed 19 Sept 2026,
              Vern: "too much text on the vapour blasting page"). */}
          <div className="mt-12 grid grid-cols-12 gap-x-12 gap-y-6 border-t border-hairline pt-7 max-[900px]:grid-cols-1">
            <div className="col-span-7 max-[900px]:col-span-1">
              <p className="label">Surfaces</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {substrates.map((substrate) => (
                  <span key={substrate} className="tag">
                    {substrate}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-span-5 max-[900px]:col-span-1">
              <p className="label">Service area</p>
              <p className="mt-4 text-[15px] leading-[1.6] text-ink-body">
                Lower Mainland and Vancouver Island &mdash; the rig is mobile, and it comes to the site.
              </p>
              <p className="mt-2 text-[14px] leading-[1.6] text-ink-muted">{cities.join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery — the record, then the illustrations ─────────────── */}
      <section id="gallery" className="section scroll-mt-[72px] border-t border-hairline bg-surface-warm">
        <div className="container-1280">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div>
              <p className="eyebrow eyebrow-water">Gallery</p>
              <h2 className="mt-5">On record, and in illustration</h2>
            </div>
            <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="arrow-link">
              Demonstration videos on our YouTube channel <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="mt-10">
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
                  note: "Generated scenes of the rig at work — the surfaces and the method, not records of specific jobs.",
                  photos: illustrationFrames,
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Questions ────────────────────────────────────────────── */}
      <section className="section border-t border-hairline bg-surface">
        <div className="container-1280">
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 max-[900px]:grid-cols-1">
            <div className="col-span-4 max-[900px]:col-span-1">
              <p className="eyebrow eyebrow-water">Questions</p>
              <h2 className="mt-5 [text-wrap:balance]">What people ask about vapour blasting</h2>
            </div>
            <div className="col-span-8 border-t border-hairline max-[900px]:col-span-1">
              {faqs.map((faq, i) => (
                <details key={faq.q} open={i === 0} className="group border-b border-hairline">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[20px] [&::-webkit-details-marker]:hidden">
                    <span className="text-[1.125rem] font-semibold leading-[1.4] tracking-[-0.01em] text-ink">{faq.q}</span>
                    <span aria-hidden="true" className="flex-shrink-0 text-[22px] font-normal leading-none text-ink-muted">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">&minus;</span>
                    </span>
                  </summary>
                  <p className="max-w-[64ch] pb-6 pr-10 text-[15px] leading-[1.65] text-ink-body max-[700px]:pr-0">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Close ───────────────────────────────────────────────────── */}
      <section className="section border-t border-hairline bg-surface-warm">
        <div className="container-1280">
          <p className="eyebrow eyebrow-water">Get a quote</p>

          <h2 className="stop mt-5 max-w-[20ch]">Send us a photo, we send back a quote</h2>

          <p className="mt-6 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body [text-wrap:pretty]">
            The fastest path to a quote is a couple of photos and a postcode. We identify the
            surface, suggest the approach and come back with a written estimate.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-[14px]">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
            <a href="tel:+16046126209" className="btn-secondary">
              604-612-6209
            </a>
          </div>

          <p className="mt-8 text-[15px] text-ink-muted">
            Vancouver Island{" "}
            <a href="tel:+12503910270" className="font-semibold text-ink">
              250-391-0270
            </a>{" "}
            &middot; toll-free{" "}
            <a href="tel:+18773910270" className="font-semibold text-ink">
              1-877-391-0270
            </a>{" "}
            &middot;{" "}
            <a href="mailto:office@squareonepaving.com" className="font-semibold text-ink">
              office@squareonepaving.com
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
