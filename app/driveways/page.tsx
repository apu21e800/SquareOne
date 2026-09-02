// ──────── SEO PILLAR PAGE ────────
// Primary SEO pillar page for decorative driveway paving in BC.
// Target keywords: "driveway paving Vancouver", "stamped asphalt driveway BC",
// "decorative driveway Lower Mainland", "StreetPrint driveway BC"
//
// Visual layer ports docs/design-v2/Driveways Landing.dc.html:
//
//   01 Hero                       white — split 55/45, photo right
//   02 Benefits                   warm, hairline top + bottom
//   03 Patterns and colours  #patterns  white
//   04 Systems                    white, hairline top
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
import type { Metadata } from "next"

import { workFor } from "@/lib/work"
import WorkGallery from "@/components/WorkGallery"

export const metadata: Metadata = {
  title: "Stamped Asphalt Driveways Vancouver & Victoria",
  description:
    "Stamped asphalt driveways in Metro Vancouver and Greater Victoria — StreetPrint patterns and StreetBond colour installed over the driveway you already have, by Square One Paving since 2000. Free site visit and written quote.",
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
    canonical: "https://squareonepaving.ca/driveways",
  },
}

const faqs = [
  {
    q: "Can you install over my existing driveway?",
    a: "Yes — StreetPrint is stamped into asphalt in good condition, reheated in place, and StreetBond is coated straight over asphalt or concrete, so there's no demolition of the base. We assess the surface at the site visit first: the asphalt has to be sound before it takes a pattern.",
  },
  {
    q: "How long does a decorative driveway last?",
    a: "HUB publishes a 10–20 year service life for StreetPrint in Canadian municipal service, and an 8+ year life cycle for StreetBond, which is easily refreshed with a recoat. A driveway carries a fraction of the traffic a road does.",
  },
  {
    q: "Is stamped asphalt safe in BC winters?",
    a: "Absolutely. StreetPrint's textured surface is slip-resistant, and the impression depth is designed to be snowplow safe. The product has been installed across BC — including areas with regular freeze-thaw cycles — for over 25 years.",
  },
  {
    q: "How do I get a quote?",
    a: "Contact us with your address and a description of the work. We'll schedule a free site visit, assess the surface, and follow up with a written quote.",
  },
  {
    q: "Do you serve Vancouver Island?",
    a: "Yes — we serve both the Lower Mainland and Vancouver Island. Crews are dispatched across both regions, so no job site in the covered areas is out of reach.",
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
  alt: "Grey herringbone StreetPrint stamped asphalt driveway at a two-storey home, installed by Square One Paving",
  caption: "StreetPrint · Herringbone · Square One install",
}

const stats: { number: string; label: string }[] = [
  { number: "10–20", label: "year StreetPrint service life, as published by HUB" },
  { number: "25+", label: "years installing decorative pavement in BC" },
  { number: "Free", label: "site visit and written quote" },
]

/** Real installations, labelled by the pattern actually shown. */
const patterns: (Shot & { label: string })[] = [
  {
    label: "Herringbone",
    src: `${DRV}/Number%201.jpg`,
    alt: "Herringbone StreetPrint driveway in grey, installed by Square One Paving",
  },
  {
    label: "Ashlar slate",
    src: "/images/applications/driveways/langley-ashlar-slate-driveway-streetprint-01.jpg",
    alt: "Ashlar Slate StreetPrint driveway in Langley BC",
  },
  {
    label: "Offset brick",
    src: "/images/applications/driveways/victoria-offset-brick-driveway-streetprint-01.jpg",
    alt: "Offset Brick StreetPrint driveway in Victoria BC",
  },
  {
    label: "British cobble",
    src: "/images/applications/driveways/west-saanich-british-cobble-driveway-streetprint-01.jpg",
    alt: "British Cobble StreetPrint driveway in West Saanich BC",
  },
  {
    label: "Cobblestone",
    src: `${FIO}/Cobblestone-stamped-asphalt-driveway-colose-up-at-Ellis-Point-Walkway-Victoria-BC-Canada.jpg`,
    alt: "Cobblestone StreetPrint close-up at Ellis Point, Victoria BC",
  },
  {
    label: "Circle medallion",
    src: `${DRV}/Number%202.jpg`,
    alt: "Stamped asphalt driveway with a circle medallion, installed by Square One Paving",
  },
]

const colours: { name: string; hex: string }[] = [
  { name: "Charcoal", hex: "#4B4C4E" },
  { name: "Slate grey", hex: "#74787D" },
  { name: "Sandstone", hex: "#C7B296" },
  { name: "Buff", hex: "#D9CBB0" },
  { name: "Terra cotta", hex: "#A96A50" },
  { name: "Moss", hex: "#7C8272" },
]

const systems: {
  name: string
  note: string
  body: string
  specs: string[]
  href: string
  cta: string
}[] = [
  {
    name: "StreetPrint stamped asphalt",
    note: "Most popular",
    body: "StreetPrint imprints brick, cobblestone, slate and custom patterns into your existing asphalt — no excavation, no new base. Reheated and stamped in place.",
    specs: [
      "Stamped into new or existing asphalt — no demolition",
      "Herringbone, offset brick, ashlar slate, British cobble and more",
      "Textured surface, snowplow safe — flush, no raised edges",
      "10–20 year published service life",
    ],
    href: "/products/streetprint",
    cta: "StreetPrint details",
  },
  {
    name: "StreetBond colour coating",
    note: "Best value",
    body: "StreetBond is HUB's epoxy-modified acrylic coating for asphalt and concrete: UV-stable, anti-skid, mixed in dozens of colours. It moves with the pavement instead of peeling or cracking — the simplest way to refresh and protect an existing driveway.",
    specs: [
      "Bonds to asphalt and concrete",
      "UV-stable — 8+ year life cycle, easily refreshed",
      "Anti-skid aggregate included",
      "Standard colours plus custom mixing",
    ],
    href: "/products/streetbond",
    cta: "StreetBond details",
  },
  {
    name: "DuraShield maintenance coating",
    note: "Protect and refresh",
    body: "DuraShield is HUB's two-component asphalt maintenance coating, in black or a solar-reflective grey. It shields the pavement from UV oxidation, fuel, oil and de-icing agents and gives tired asphalt a clean, uniform finish — the right call when the driveway is sound but faded.",
    specs: [
      "Waterborne epoxy-modified acrylic, low VOC",
      "Protects against UV oxidation and chemicals",
      "Black or Solar Gray (SR 0.34) finish",
      "Friction suited to foot and vehicle traffic",
    ],
    href: "/products/durashield",
    cta: "DuraShield details",
  },
]

const steps: { num: string; title: string; desc: string }[] = [
  {
    num: "01",
    title: "Site visit",
    desc: "Jan visits your property, assesses the existing asphalt, and walks you through pattern and colour options.",
  },
  {
    num: "02",
    title: "Written quote",
    desc: "A detailed written quote after the visit. No surprises: we specify the right system for the surface you have.",
  },
  {
    num: "03",
    title: "Installation",
    desc: "Our own crew handles prep, stamping, colour and finishing, and confirms the schedule with your quote.",
  },
  {
    num: "04",
    title: "Built for BC winters",
    desc: "Flush, snowplow-safe surfaces backed by the manufacturer's material warranty — and Square One stands behind the installation.",
  },
]

export default function DrivewaysPage() {
  const gallery = workFor("driveways")

  return (
    <main>

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

            <h1 className="stop mt-7">Make an entrance</h1>

            <p className="mt-7 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body [text-wrap:pretty] max-[700px]:text-[17px]">
              The look of stone or pavers, the wear of asphalt —
              imprinted and coated over the driveway you already have. No demolition, no new
              base.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-[14px]">
              <Link href="/contact" className="btn-primary">
                Book a free site visit
              </Link>
              <Link href="#patterns" className="btn-secondary">
                See patterns and colours
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
      <section id="patterns" className="section relative overflow-hidden bg-surface">

        <div className="container-1280 relative z-[1]">
          <h2>Patterns and colours</h2>

          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
            The StreetPrint patterns we install most, finished in any StreetBond colour. We bring
            sample boards to the site visit so you can see them against your own siding and stone.
          </p>

          <div className="mt-10 grid grid-cols-6 gap-4 max-[700px]:grid-cols-2">
            {patterns.map((pattern) => (
              <div key={pattern.label}>
                <div className="card relative aspect-[4/3] overflow-hidden rounded-[2px] border border-hairline bg-surface-stone">
                  <Image
                    src={pattern.src}
                    alt={pattern.alt}
                    fill
                    sizes="(max-width: 700px) 50vw, (max-width: 1280px) 16vw, 197px"
                    className="object-cover"
                  />
                </div>
                <div className="chip-name">{pattern.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-6 gap-4 max-[700px]:grid-cols-2">
            {colours.map((colour) => (
              <div key={colour.name}>
                <div
                  aria-hidden="true"
                  className="chip h-[52px]"
                  style={{ background: colour.hex }}
                />
                <div className="chip-name">{colour.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 Systems ──────── */}
      <section className="section relative overflow-hidden border-t border-hairline bg-surface">

        <div className="container-1280 relative z-[1]">
          <h2>Three systems, one crew</h2>

          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
            Which one goes down depends on the condition of the surface you already have. We
            specify it at the site visit, not from a price list.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-[700px]:grid-cols-1">
            {systems.map((system) => (
              <article key={system.name} className="card card-panel">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                  {system.note}
                </div>

                <h3 className="mt-6">{system.name}</h3>

                <p className="mt-[10px] text-[15px] leading-[1.55] text-ink-body">{system.body}</p>

                <ul className="mt-6 border-t border-hairline">
                  {system.specs.map((spec) => (
                    <li
                      key={spec}
                      className="border-b border-hairline py-[10px] text-[14px] leading-[1.5] text-ink-muted"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>

                <Link href={system.href} className="arrow-link mt-auto pt-7">
                  {system.cta} <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-t border-hairline pt-6">
            <div className="flex flex-wrap gap-x-10 gap-y-2">
              <span className="text-[13px] font-medium text-ink-muted">
                Installer of HUB Surface Systems products
              </span>
              <span className="text-[13px] font-medium text-ink-muted">
                StreetPrint &middot; StreetBond &middot; TrafficPatterns &middot; DecoMark
              </span>
              <span className="text-[13px] font-medium text-ink-muted">
                Manufacturer-warrantied systems
              </span>
            </div>

            <Link href="/products" className="arrow-link whitespace-nowrap">
              All products <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 05 How it works ──────── */}
      <section className="section relative overflow-hidden border-y border-hairline bg-surface-warm">

        <div className="container-1280 relative z-[1]">
          <h2>How it works</h2>

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
        </div>
      </section>

      {/* ── 06 Driveways on record ──────── */}
      <section id="gallery" className="section relative overflow-hidden bg-surface">

        <div className="container-1280 relative z-[1]">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">Photographed on site</div>
              <h2 className="stop stop-tight mt-4">Driveways from Victoria to Vancouver</h2>
            </div>
            <div className="max-w-[44ch]">
              <p className="text-[15px] leading-[1.6] text-ink-muted">
                {gallery.length} Square One driveways on record — Saanich, Sooke, Duncan and Victoria on
                the Island; Vancouver, West Vancouver, Burnaby, Richmond, Langley and Maple Ridge on
                the mainland. Filter by region, or go straight to your city.
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

          <h2 className="mt-5">We come to you</h2>

          <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
            Mobile crews across the Lower Mainland and Vancouver Island. If you are in one of
            the areas below, we come to you.
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
          <h2>Questions we hear</h2>

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
