// ──────── SEO PILLAR PAGE ────────
// Primary SEO pillar page for decorative driveway paving in BC.
// Target keywords: "driveway paving Vancouver", "stamped asphalt driveway BC",
// "decorative driveway Lower Mainland", "StreetPrint driveway BC"
//
// Visual layer ports docs/design-v2/Driveways Landing.dc.html. The "Three
// systems" band (StreetPrint / StreetBond / DuraShield cards) was removed in
// client review, 16 Sept 2026: "only want the focus on driveways", StreetPrint
// only. The pattern strip carries the product story now (the composer is held
// back and renders nowhere — 19 Sept).
//
//   01 Hero                       paper — split 55/45, photo right, caption under
//   02 Facts                      warm, one quiet row divided by rules
//   03 Patterns               #patterns  paper   the template sheets, three + library
//   05 How it works               warm — the driveway's four steps, numbered
//   06 Selected driveways         paper
//   07 Service area               warm — the communities as a hairline list
//   08 Questions we hear          paper
//   ── Site Close                 slate — rendered once by app/layout.tsx (Footer)
//
// 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the same skeleton on the
// own-company primitives — labels in the margin column, the caption under the
// opening frame, the big numerals brought down to one row, the region tiles
// as a hairline list, the arrow links as underlined words. Every fact, href
// and photograph is the one that was here.
// ────────

import type { CSSProperties } from "react"
import Link from "next/link"
import Image from "next/image"
import PatternSheetGrid from "@/components/PatternSheetGrid"
import { FEATURED_SHEETS } from "@/lib/pattern-sheets"
import type { Metadata } from "next"

import { workFor } from "@/lib/work"
import WorkGallery from "@/components/WorkGallery"
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd"
import { Section } from "@/components/ui/Container"
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
    a: "The StreetPrint templates on Square One's own sheet: ashlar slate, offset brick, standard herringbone, random stone, standard tile and offset tile, with soldier-course, stacked-brick and Texas cobble borders. The manufacturer draws the templates as dimensioned sheets. Three are shown above, the rest are in the pattern library. StreetBond colour comes from the published chart of more than fifty; for a house that usually means the greys, black and the earth tones: bedrock, brick, granite, pewter, sierra, black, concrete gray, burnt sienna, brown suede, taupe and graphite. Sample boards come to the site visit.",
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
    a: "Yes. Vancouver Island is a Square One service region with its own line, 250-391-0270. The Island driveways on this page (Saanich, North and West Saanich, Sooke, Duncan, Mill Bay and Victoria) were all installed by Square One.",
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

/* The driveway's own four steps — the same sequence as the site's process
   band (site visit, written quote, install, the finished surface), with the
   things a homeowner asks about: the boards against the house, no demolition
   and no new base, the winter rating. Numbered because it is a sequence. */
const steps: { title: string; desc: string }[] = [
  {
    title: "Free site visit",
    desc: "We assess the asphalt and hold the samples against your house.",
  },
  {
    title: "Written quote",
    desc: "The pattern and the colour, in writing. If the asphalt isn't sound, we say so.",
  },
  {
    title: "Installation",
    desc: "Prep, stamping, colour and finish, by our own crews. No demolition.",
  },
  {
    title: "Built for BC winters",
    desc: "Snowplow and de-icing salt safe, as the manufacturer rates it.",
  },
]

export default function DrivewaysPage() {
  // The hero frame is not repeated as the first tile of the gallery below it.
  const gallery = workFor("driveways").filter((p) => p.src !== HERO.src)

  return (
    <main>

      <JsonLd data={[faqSchema(faqs), breadcrumbSchema(SITE_URL, [{ name: "Driveways", path: "/driveways" }])]} />

      {/* ── 01 Hero — the split stays; the caption sits under the frame ──────── */}
      <section className="relative grid min-h-[640px] grid-cols-[55fr_45fr] overflow-hidden bg-surface max-[700px]:min-h-0 max-[700px]:grid-cols-1">
        <div
          className="
            relative flex items-center
            pt-24 pb-24 pr-[72px] pl-[max(calc((100vw_-_1280px)/2),40px)]
            max-[700px]:pt-[112px] max-[700px]:pr-6 max-[700px]:pb-12 max-[700px]:pl-6
          "
        >

          <div className="relative z-[1]">
            <span className="label label-sq label-page">
              Residential driveways &middot; Metro Vancouver &amp; Greater Victoria
            </span>

            <h1 className="mt-6">Stamped asphalt driveways <em>for BC homes</em></h1>

            <p className="lede mt-7 max-w-[56ch] [text-wrap:pretty]">
              Brick or stone to look at, asphalt to live with: a StreetPrint&reg; pattern pressed
              into the driveway you have, sealed in StreetBond&reg; colour. No new base.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/contact" className="btn-primary">
                Get a quote
              </Link>
              <Link href="#patterns" className="link">
                See the patterns
              </Link>
            </div>
          </div>
        </div>

        <figure className="relative m-0 flex min-w-0 flex-col">
          <span className="relative block min-h-0 flex-1 overflow-hidden bg-surface-stone max-[700px]:aspect-[4/3] max-[700px]:flex-none">
            <Image
              src={HERO.src}
              alt={HERO.alt}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 700px) 100vw, 45vw"
              className="object-cover [object-position:center_70%]"
            />
          </span>
          <figcaption className="cap px-6 pb-5 max-[700px]:px-6">{HERO.caption}</figcaption>
        </figure>
        {/* The colour card's edge along the foot, as every opener (7 Oct 2026). */}
        <div aria-hidden="true" className="opener-edge" />
      </section>

      {/* ── 02 Facts — one quiet row, divided by rules ──────── */}
      <section className="border-y border-hairline bg-surface-warm py-8 max-[700px]:py-6" aria-label="Stamped asphalt driveways, in brief">
        <ul className="container-1280 grid grid-cols-3 max-[700px]:grid-cols-1 max-[700px]:gap-y-5">
          {stats.map((stat, i) => (
            <li
              key={stat.label}
              className={`min-w-0 px-7 first:pl-0 last:pr-0 max-[700px]:px-0 max-[700px]:border-l-0 ${i > 0 ? "border-l border-hairline" : ""}`}
            >
              <span className="block text-[22px] font-bold leading-none text-ink" style={{ fontFamily: "var(--font-display)" }}>
                {stat.number}
              </span>
              <span className="mt-2 block max-w-[30ch] text-[15px] leading-[1.5] text-ink-muted">{stat.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 03 Patterns — the template sheets, three of them and the library.
             (The composer that lived here is held back — 19 Sept — and is
             untouched in components/DrivewayComposer.tsx.) ──────── */}
      <Section
        id="patterns"
        label="Patterns"
        title={<>Driveway patterns, <em>drawn to scale</em></>}
        intro="Every pattern starts as a dimensioned drawing. The samples come to your driveway."
        className="scroll-mt-[72px]"
        wide
      >
        <PatternSheetGrid sheets={FEATURED_SHEETS} subnames={false} rail />
        <p className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link href="/patterns" className="link">
            The pattern library
          </Link>
          <Link href="/products/streetprint" className="link">
            StreetPrint
          </Link>
        </p>
      </Section>

      {/* ── 05 How it works — the driveway's four steps, numbered, under the
             same colour-card band as the site's process steps (6 Oct 2026) ──────── */}
      <Section label="How it works" title={<>How a driveway <em>goes in</em></>} tone="warm" wide>
        <ol
          className="steps-edge grid grid-cols-4 gap-x-10 gap-y-10 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
          style={{ ["--n" as string]: steps.length } as CSSProperties}
        >
          {steps.map((step, i) => (
            <li key={step.title} style={{ ["--i" as string]: i } as CSSProperties}>
              <span className="step-num" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-5">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 max-w-[44ch] text-[16px] leading-[1.6] text-ink-body [text-wrap:pretty]">{step.desc}</p>
            </li>
          ))}
        </ol>

        {/* 6 Oct 2026 (the client: "link going to the wrong page"): the colour
            link lands on the colour chart, and the projects link on the
            driveways themselves, just below, not the all-projects index. */}
        <p className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline pt-6">
          <Link href="/services/stamped-asphalt" className="link">
            Stamped asphalt, the service
          </Link>
          <Link href="/products/streetbond#colours" className="link">
            StreetBond colour
          </Link>
          <Link href="#gallery" className="link">
            Driveway projects
          </Link>
        </p>
      </Section>

      {/* ── 06 Driveways on record ──────── */}
      <Section
        id="gallery"
        label="Photographed on site"
        title={<>Driveways from Victoria <em>to Vancouver</em></>}
        intro={
          <>
            Square One driveways from the record, on the Island and the mainland.
            <span className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              <Link href="/driveways/vancouver" className="link">
                Vancouver driveways
              </Link>
              <Link href="/driveways/victoria" className="link">
                Victoria driveways
              </Link>
            </span>
          </>
        }
        className="scroll-mt-[72px]"
        wide
      >
        <WorkGallery photos={gallery} initial={12} ariaLabel="Driveway installation photographs" />
      </Section>

      {/* ── 07 Service area ──────── */}
      <Section
        label="Service area"
        title={<>Where we <em>install driveways</em></>}
        intro={
          <>
            In one of the areas below, we come to you. Elsewhere in BC, ask: we travel for the
            right job.
          </>
        }
        tone="warm"
      >
        <ul className="grid grid-cols-2 gap-x-8 gap-y-6 min-[701px]:grid-cols-3 lg:grid-cols-4">
          {regions.map((region) => (
            <li key={region.name} className="border-t border-hairline pt-3">
              <span className="block text-[16px] font-bold leading-[1.3] text-ink" style={{ fontFamily: "var(--font-display)" }}>
                {region.name}
              </span>
              <span className="mt-1 block text-[14px] italic leading-[1.4] text-ink-muted">{region.sub}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── 08 Questions we hear ──────── */}
      <Section label="Questions" title={<>Questions <em>about driveways</em></>}>
        <div className="border-t border-hairline">
          {faqs.map((faq, i) => (
            <details key={faq.q} open={i === 0} className="group border-b border-hairline">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[22px] [&::-webkit-details-marker]:hidden">
                <span className="text-[1.125rem] font-semibold leading-[1.4] text-ink">
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

              <p className="max-w-[60ch] pb-6 pr-10 text-[16px] leading-[1.6] text-ink-body max-[700px]:pr-0">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

    </main>
  )
}
