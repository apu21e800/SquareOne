import Link from "next/link"
import { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd"
import BeforeAfter from "@/components/BeforeAfter"
import Frame from "@/components/ui/Frame"
import IndexImageHero from "@/components/IndexImageHero"
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
// and Victoria backdrops) are off the page and off the site; the files stay
// on disk. Two generated frames stay. The before/after wipe, a demonstration
// with no person in it, captioned as one. And the opener itself (2 Oct 2026,
// Vern: "use the vapor blasting pic of the sunny day with the Burrard Street
// Bridge in the background, same with the vapor blasting page"): the sunlit
// copy of the Granville Island photograph, the real job and the real place,
// its sky enhanced. The steel railing illustration came off the same day
// ("that image is not usable"), and the "From storefront to drydock" section
// it led with it; the surfaces list under the process band carries what the
// section listed. New illustrations wait for a proper shoot.
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

/** The opener: Square One on the Granville Island boardwalk, the Burrard
    Street Bridge behind, the sunlit copy of the photograph, in the wider
    framing Vern made for the hero (2 Oct 2026: "I added more room around
    the edges so it fits better"). The operator stands at the centre, so
    the words keep to a narrower block on the right. */
const HERO = {
  src: `${GEN}/gen-granville-island-vapour-blasting-01-wide.jpg`,
  alt: "A Square One operator vapour blasting a painted marking off the boardwalk at Granville Island, Vancouver, the Burrard Street Bridge behind under a clear sky",
  caption: "Granville Island, Vancouver · marking removal",
}

// ── Headline facts: Square One's own published numbers ─────────────────────────

type Fact = { number: string; label: string }

const facts: Fact[] = [
  { number: "92%", label: "less dust than dry blasting: the water holds it down" },
  { number: "Low heat", label: "little to no heat at the surface, so nothing warps or scorches" },
  { number: "2", label: "regions: Lower Mainland and Vancouver Island, one mobile rig" },
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

      {/* ── Opener: the photograph full-bleed, the words over it on the
             right (the operator stands left of centre), the page's name and
             the caption on the ledger under them ── */}
      <IndexImageHero
        src={HERO.src}
        alt={HERO.alt}
        eyebrow="Vapour blasting"
        title={<>Clean it, prime it, <em>bring it back</em></>}
        fit="Clean it, prime it, bring it back"
        lede="Graffiti, old markings, paint and grime off almost any hard surface, with the dust held down in water. The rig comes to you."
        caption={HERO.caption}
        imagePosition="center 70%"
        align="right"
        tall
        narrow
      >
        <div className="hero-actions mt-9 max-[700px]:mt-7">
          <Link href="/contact" className="btn-primary">
            Get a quote
          </Link>
          <a href="tel:+16046126209" className="btn-on-image">
            604-612-6209
          </a>
        </div>
      </IndexImageHero>

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

      {/* ── Before / after: the one demonstration, captioned as one ── */}
      <Section
        label="Before and after"
        title={<>Drag <em>the line</em></>}
        intro="Aerosol graffiti on face brick, before and after."
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
        title={<>On the job, <em>photographed</em></>}
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
      <HowAJobGoes tone="warm" crews={false} cta={false} steps={VAPOUR_STEPS} />

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
      <Section label="Questions" title={<>What people ask <em>about vapour blasting</em></>}>
        <div className="border-t border-hairline">
          {faqs.map((faq) => (
            <details key={faq.q} className="group border-b border-hairline">
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
        title={<>Send us a photo, <em>we send back a quote</em></>}
        intro="A couple of photos and a postcode. We come back with the approach and a written quote."
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
