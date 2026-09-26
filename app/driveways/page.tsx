// ──────── SEO PILLAR PAGE ────────
// Primary SEO pillar page for decorative driveway paving in BC.
// Target keywords: "driveway paving Vancouver", "stamped asphalt driveway BC",
// "decorative driveway Lower Mainland", "StreetPrint driveway BC"
//
// Visual layer ports docs/design-v2/Driveways Landing.dc.html. The "Three
// systems" band (StreetPrint / StreetBond / DuraShield cards) was removed in
// client review, 16 Sept 2026: "only want the focus on driveways", StreetPrint
// only. The pattern strip and composer carry the product story now.
//
//   01 Hero                       white — split 55/45, photo right
//   02 Benefits                   warm, hairline top + bottom
//   03 Patterns               #patterns  white   HUB's sheets, three + library
//   05 How it works               warm, hairline top + bottom
//   06 Selected driveways         white
//   07 Service area               warm, hairline top + bottom
//   08 Questions we hear          white, hairline top
//   ── Site Close                 slate — rendered once by app/layout.tsx (Footer)
//
// The slate close is the page's ONLY dark region. Nothing above it may go dark.
// ────────

import Link from "next/link"
import Image from "next/image"
import { PatternSheetTeaser } from "@/components/PatternSheetGrid"
import type { Metadata } from "next"

import { workFor } from "@/lib/work"
import WorkGallery from "@/components/WorkGallery"
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

export const metadata: Metadata = {
  openGraph: { title: "Stamped Asphalt Driveways in BC", images: [{ url: "/images/S1_update_v2/photos/Driveways/Ten%20Mile%20Point%20Driveway%20I.jpg" }] },
  title: "Stamped Asphalt Driveways in BC",
  description:
    clampDescription("Stamped asphalt driveways in Metro Vancouver and Greater Victoria: StreetPrint patterns and StreetBond colour over the asphalt you have. Free site visit."),
  keywords: [
    "decorative driveway BC",
    "stamped asphalt driveway Vancouver",
    "stamped asphalt driveway Victoria",
    "StreetPrint driveway BC",
    "decorative asphalt driveway Lower Mainland",
    "Vancouver driveway resurfacing",
    "Victoria driveway decorative",
    "concrete driveway alternative BC",
  ],
  alternates: {
    canonical: `${SITE_URL}/driveways`,
  },
}

/* Every answer restates something already on this page or in the record —
   lib/products.ts, lib/services.ts, lib/pattern-sheets.ts, lib/palette.ts.
   Performance figures are HUB's and say so. */
const faqs = [
  {
    q: "Can you install stamped asphalt over my existing driveway?",
    a: "Yes, when the asphalt is sound. StreetPrint is stamped into asphalt in good condition, reheated in place, and StreetBond is coated straight over asphalt or concrete, so there is no demolition and no new base. We assess the surface at the site visit first: the asphalt has to be sound before it takes a pattern, and if it is not, we say so.",
  },
  {
    q: "How long does a stamped asphalt driveway last?",
    a: "The manufacturer publishes a 10–20 year service life for StreetPrint under municipal traffic, and an 8+ year life cycle for StreetBond, which is refreshed with a recoat rather than replaced. A driveway carries a fraction of the traffic a road does.",
  },
  {
    q: "Which patterns and colours can I choose?",
    a: "The StreetPrint templates on Square One's own sheet: ashlar slate, offset brick, standard herringbone, random stone, standard tile and offset tile, with soldier-course, stacked-brick and Texas cobble borders. The manufacturer draws the templates as dimensioned sheets — three are shown above, the rest are in the pattern library. StreetBond colour comes from the published chart of more than fifty; for a house that usually means the greys, black and the earth tones — bedrock, brick, granite, pewter, sierra, black, concrete gray, burnt sienna, brown suede, taupe and graphite. Sample boards come to the site visit.",
  },
  {
    q: "Is stamped asphalt safe in BC winters?",
    a: "Yes. The imprinted surface is textured, so tyres and shoes have more to hold than on smooth asphalt, and the manufacturer rates StreetPrint snowplow and de-icing salt safe. Square One has installed it across BC since 2000, through wet coastal winters and the freeze-thaw cycles inland.",
  },
  {
    q: "How do I get a quote?",
    a: "Contact us with your address and a description of the work, or a photo of the driveway. We schedule a free site visit, assess the surface, and follow up with a written quote.",
  },
  {
    q: "Do you install driveways on Vancouver Island?",
    a: "Yes. Vancouver Island is a Square One service region with its own line, 250-391-0270. The Island driveways on this page — Saanich, North and West Saanich, Sooke, Duncan, Mill Bay and Victoria — were all installed by Square One.",
  },
  {
    q: "Do you work outside the Lower Mainland and Vancouver Island?",
    a: "For the right project, yes. Okanagan and Interior installations are in the project record. Send the address and a description and we will tell you straight away whether it makes sense for both of us.",
  },
]

const regions = [
  { name: "Vancouver", sub: "Metro Vancouver" },
  { name: "Victoria", sub: "Greater Victoria" },
  { name: "Burnaby", sub: "& New Westminster" },
  { name: "Surrey", sub: "& Langley" },
  { name: "Coquitlam", sub: "Tri-Cities" },
  { name: "Richmond", sub: "& Delta" },
  { name: "North Shore", sub: "North Van · West Van" },
  { name: "Saanich", sub: "& Oak Bay" },
  { name: "Langford", sub: "West Shore" },
  { name: "Maple Ridge", sub: "& Pitt Meadows" },
  { name: "Abbotsford", sub: "& Chilliwack" },
  { name: "Nanaimo", sub: "& Central Island" },
]

type Shot = { src: string; alt: string }

const FIO = "/images/S1_update_v2/photos/Featured%20image%20options"
const DRV = "/images/S1_update_v2/photos/Driveways"

/* Every photograph on this page is a Square One driveway. Where the record
   carries a location it is in the caption; where it does not, the caption
   says only what the photo shows. Nothing is stock. */

const HERO: Shot & { caption: string } = {
  src: `${DRV}/Number%201.jpg`,
  alt: "Grey ashlar slate StreetPrint stamped asphalt driveway at a three-bay garage, installed by Square One Paving",
  caption: "StreetPrint · Ashlar slate · Square One install",
}

/* The hero lede above carries the first mention of StreetPrint® and StreetBond® on this page. */
const stats: { number: string; label: string }[] = [
  { number: "10–20", label: "year StreetPrint service life, as published by the manufacturer" },
  { number: "25+", label: "years installing decorative pavement in BC" },
  { number: "Free", label: "site visit and written quote" },
]

/**
 * Real installations, labelled by the pattern actually shown.
 *
 * Trimmed 16 Sept 2026 to the patterns Square One still offers. The client
 * marked four of the six for removal in review — British cobble,
 * Cobblestone, Two-tone brick and Circle medallion — and all four are
 * templates absent from Square One's own patterns sheet, so the strip was
 * advertising work that can no longer be ordered.
 *
 * The photographs themselves are real and stay in the record (the full
 * gallery at #gallery still carries them); it is only this "what you can
 * order" strip they have come off. Herringbone restocked from the 2026
 * library. Still wanted: Random Stone, Standard Tile and Offset Tile as
 * installed — only label a frame whose template Square One has named.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- the strip is
// held back with the templates section (19 Sept); the photographs are real
// and come straight back with it.
const patterns: (Shot & { label: string })[] = [
  {
    label: "Ashlar slate",
    src: `${DRV}/Number%201.jpg`,
    alt: "Ashlar slate StreetPrint driveway in grey, installed by Square One Paving",
  },
  {
    label: "Offset brick",
    src: "/images/applications/driveways/victoria-offset-brick-driveway-streetprint-01.jpg",
    alt: "Offset Brick StreetPrint driveway in Victoria BC",
  },
  {
    label: "Herringbone",
    src: "/images/applications/driveways/lower-mainland-bc-herringbone-driveway-and-walk-streetprint-01.jpg",
    alt: "Herringbone StreetPrint driveway and walk in the Lower Mainland, installed by Square One Paving",
  },
]

const steps: { num: string; title: string; desc: string }[] = [
  {
    num: "01",
    title: "Free site visit",
    desc: "We come to the house, assess the existing asphalt and walk you through the pattern and colour options with the sample boards against your own siding and stone.",
  },
  {
    num: "02",
    title: "Written quote",
    desc: "A written quote follows the visit, specifying the system and the pattern for the surface you have. The asphalt has to be sound before it takes a pattern; if it is not, we say so.",
  },
  {
    num: "03",
    title: "Installation",
    desc: "Square One handles the preparation, the stamping, the StreetBond colour and the finishing, and confirms the schedule with your quote. No demolition and no new base.",
  },
  {
    num: "04",
    title: "Built for BC winters",
    desc: "A flush, textured surface the manufacturer rates snowplow and de-icing salt safe, installed to its specification. The manufacturer warrants the material; Square One warrants the workmanship.",
  },
]

export default function DrivewaysPage() {
  const gallery = workFor("driveways")

  return (
    <main>

      <JsonLd data={[faqSchema(faqs), breadcrumbSchema(SITE_URL, [{ name: "Driveways", path: "/driveways" }])]} />

      {/* ── 01 Hero ──────── */}
      <section className="relative grid min-h-[640px] grid-cols-[55fr_45fr] overflow-hidden bg-surface max-[700px]:min-h-0 max-[700px]:grid-cols-1">
        <div
          className="
            relative flex items-center
            pt-24 pb-24 pr-[72px] pl-[max(calc((100vw_-_1280px)/2),40px)]
            max-[700px]:pt-[72px] max-[700px]:pr-6 max-[700px]:pb-14 max-[700px]:pl-6
          "
        >

          <div className="relative z-[1]">
            <div className="eyebrow">
              Residential driveways &middot; Metro Vancouver &amp; Greater Victoria
            </div>

            <h1 className="stop mt-7">Stamped asphalt driveways for BC homes</h1>

            <p className="mt-7 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body [text-wrap:pretty] max-[700px]:text-[17px]">
              The look of brick or stone with the wear of asphalt: a StreetPrint&reg; pattern
              pressed into the driveway you already have and sealed in StreetBond&reg; colour.
              No demolition, no new base &mdash; and a free site visit before anything is quoted.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-[14px]">
              <Link href="/contact" className="btn-primary">
                Book a free site visit
              </Link>
              <Link href="#patterns" className="btn-secondary">
                See the patterns
              </Link>
            </div>
          </div>
        </div>

        <div className="relative min-w-0 overflow-hidden bg-surface-stone max-[700px]:aspect-[4/3]">
          <Image
            src={HERO.src}
            alt={HERO.alt}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 700px) 100vw, 45vw"
            className="object-cover [object-position:center_70%]"
          />
          <div aria-hidden="true" className="scrim scrim-light" />
          <div className="caption">{HERO.caption}</div>
        </div>
      </section>

      {/* ── 02 Benefits ──────── */}
      <section className="section relative overflow-hidden border-y border-hairline bg-surface-warm">

        <div className="container-1280 relative z-[1] grid grid-cols-3 gap-10 max-[700px]:grid-cols-1 max-[700px]:gap-9">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-hairline pt-6">
              <div className="stat-num">{stat.number}</div>
              <div className="mt-3 max-w-[28ch] text-[15px] leading-[1.5] text-ink-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03 Patterns and colours ──────── */}
      {/* ── 03 Patterns — HUB's template sheets, three of them and the library.
             (The composer that lived here is held back — 19 Sept — and is
             untouched in components/DrivewayComposer.tsx.) ──────── */}
      <section id="patterns" className="section relative overflow-hidden bg-surface">
        <div className="container-1280 relative z-[1]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Patterns</p>
              <h2 className="mt-5">StreetPrint driveway patterns, as the manufacturer draws them</h2>
            </div>
            <p className="max-w-[48ch] text-[15px] leading-[1.6] text-ink-muted [text-wrap:pretty]">
              Every StreetPrint template is a dimensioned drawing before it is a driveway. Three of
              the sheets are here; the rest are in the pattern library, and the sample boards come to
              your driveway and get held against the house.
            </p>
          </div>
          <div className="mt-10">
            <PatternSheetTeaser />
          </div>
        </div>
      </section>

      {/* ── 05 How it works ──────── */}
      <section className="section relative overflow-hidden border-y border-hairline bg-surface-warm">

        <div className="container-1280 relative z-[1]">
          <h2>How a stamped asphalt driveway is installed</h2>

          <div className="mt-10 grid grid-cols-4 gap-x-12 gap-y-10 border-t border-hairline max-[700px]:grid-cols-1">
            {steps.map((step) => (
              <div key={step.num} className="pt-7">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                  {step.num}
                </div>
                <h3 className="mt-4">{step.title}</h3>
                <p className="mt-[10px] max-w-[44ch] text-[15px] leading-[1.65] text-ink-body">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/services/stamped-asphalt" className="arrow-link">
              Stamped asphalt, the service <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/products/streetbond" className="arrow-link">
              StreetBond colour <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/projects" className="arrow-link">
              Driveway projects <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 06 Driveways on record ──────── */}
      <section id="gallery" className="section relative overflow-hidden bg-surface">

        <div className="container-1280 relative z-[1]">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">Photographed on site</div>
              <h2 className="stop stop-tight mt-4">Stamped asphalt driveways from Victoria to Vancouver</h2>
            </div>
            <div className="max-w-[44ch]">
              <p className="text-[15px] leading-[1.6] text-ink-muted">
                Square One driveways from the record &mdash; Saanich, Sooke, Duncan, Mill Bay and
                Victoria on the Island; Vancouver, West Vancouver, Burnaby, New Westminster,
                Richmond, Surrey, Langley and Maple Ridge on the mainland. Filter by region, or go
                straight to your city.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
                <Link href="/driveways/vancouver" className="arrow-link">
                  Vancouver driveways <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link href="/driveways/victoria" className="arrow-link">
                  Victoria driveways <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <WorkGallery photos={gallery} initial={12} ariaLabel="Driveway installation photographs" />
          </div>
        </div>
      </section>

      {/* ── 07 Service area ──────── */}
      <section className="section relative overflow-hidden border-y border-hairline bg-surface-warm">

        <div className="container-1280 relative z-[1]">
          <p className="eyebrow">Service area</p>

          <h2 className="mt-5">Where we install driveways</h2>

          <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
            Across the Lower Mainland and Vancouver Island, from one office in Maple Ridge and
            the Island&rsquo;s own line. If you are in one of the areas below, we come to you.
          </p>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.6] text-ink-muted [text-wrap:pretty]">
            Elsewhere in BC &mdash; the Okanagan and the Interior are already in our project
            record &mdash; we travel for the right job. Tell us where, and we will say straight
            away whether it makes sense.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 min-[701px]:grid-cols-4 lg:grid-cols-6">
            {regions.map((region) => (
              <div
                key={region.name}
                className="rounded-[2px] border border-hairline bg-surface p-4 text-center"
              >
                <p className="text-[13px] font-semibold text-ink">{region.name}</p>
                <p className="mt-[3px] text-[11px] leading-[1.35] text-ink-muted">{region.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 08 Questions we hear ──────── */}
      <section className="section relative overflow-hidden border-t border-hairline bg-surface">

        <div className="container-1280 relative z-[1]">
          <h2>Questions about stamped asphalt driveways</h2>

          <div className="mt-10 max-w-[760px] border-t border-hairline">
            {faqs.map((faq, i) => (
              <details key={faq.q} open={i === 0} className="group border-b border-hairline">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[22px] [&::-webkit-details-marker]:hidden">
                  <span className="text-[1.25rem] font-semibold leading-[1.4] tracking-[-0.015em] text-ink">
                    {faq.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 text-[22px] font-normal leading-none text-ink-muted"
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">&minus;</span>
                  </span>
                </summary>

                <p className="max-w-[60ch] pb-6 pr-10 text-[15px] leading-[1.65] text-ink-body max-[700px]:pr-0">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
