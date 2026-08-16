// ─── SEO PILLAR PAGE ────────────────────────────────────────────────────────────────────────────────
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
// ─────────────────────────────────────────────────────────────────────────────────

import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

import { galleryWithFallback } from "@/lib/gallery"

export const metadata: Metadata = {
  title: "Decorative Driveways BC | Stamped Asphalt & Coatings | Square One Paving",
  description:
    "Transform your driveway with stamped asphalt, StreetBond coatings, or StreetPrint patterns. BC's most experienced decorative pavement installer. Free quotes — Lower Mainland & Vancouver Island.",
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
    a: "Yes — StreetPrint and StreetBond are applied directly over existing asphalt, so there's no demolition of the base. We assess the surface condition first and may recommend DuraShield rejuvenation if the base is oxidized.",
  },
  {
    q: "How long does a decorative driveway last?",
    a: "StreetPrint stamped asphalt typically lasts 8–12 years in BC conditions. StreetBond coatings carry a 20-year colour retention warranty. Maintenance cycles and recoats can extend service life significantly.",
  },
  {
    q: "Is stamped asphalt safe in BC winters?",
    a: "Absolutely. StreetPrint patterns are ASTM D3939 slip-resistant, and the impression depth is designed to be snowplow safe. The product has been installed across BC — including areas with regular freeze-thaw cycles — for over 25 years.",
  },
  {
    q: "How do I get a quote?",
    a: "Contact us with your address and a description of the work. We'll schedule a free site visit, assess the surface, and provide a written quote within 48 hours.",
  },
  {
    q: "Do you serve Vancouver Island?",
    a: "Yes — we serve both the Lower Mainland and Vancouver Island. Our mobile crews operate out of Maple Ridge and Victoria, so no job site in the covered regions is out of reach.",
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

/** Curated fallback — used until public/images/applications/driveways/ is populated. */
const galleryFallback: Shot[] = [
  { src: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg", alt: "Estate herringbone stamped asphalt driveway, Metro Vancouver BC" },
  { src: "/images/applications/private-driveways/luxury-grey-gated-driveway-01.jpg", alt: "Luxury grey gated driveway, StreetPrint installation BC" },
  { src: "/images/applications/private-driveways/red-herringbone-circle-medallion-driveway-01.jpg", alt: "Red herringbone with custom circle medallion, BC driveway" },
  { src: "/images/applications/private-driveways/orca-driveway-medallion-custom-01.jpg", alt: "Custom orca medallion decorative driveway, Vancouver Island" },
  { src: "/images/applications/private-driveways/craftsman-home-charcoal-herringbone-driveway-01.jpg", alt: "Craftsman home charcoal herringbone driveway, Lower Mainland" },
  { src: "/images/applications/private-driveways/fall-estate-dark-brick-gated-driveway-01.jpg", alt: "Fall estate dark brick driveway, gated entrance BC" },
  { src: "/images/applications/private-driveways/hampton-gate-charcoal-brick-entrance-01.jpg", alt: "Hampton gate charcoal brick entrance driveway, BC" },
  { src: "/images/applications/private-driveways/lakefront-charcoal-herringbone-driveway-01.jpg", alt: "Lakefront charcoal herringbone stamped asphalt driveway BC" },
]

const HERO: Shot & { caption: string } = {
  src: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
  alt: "Estate herringbone stamped asphalt driveway installed by Square One Paving, BC",
  caption: "Metro Vancouver · StreetPrint · Herringbone",
}

const stats: { number: string; label: string }[] = [
  { number: "8–12", label: "year StreetPrint service life in BC conditions" },
  { number: "25+", label: "years installing decorative pavement in BC" },
  { number: "Free", label: "site visit and written quote" },
]

/** Real installations, labelled by the pattern actually shown. */
const patterns: (Shot & { label: string })[] = [
  {
    label: "Herringbone",
    src: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
    alt: "Herringbone StreetPrint pattern on a gated estate driveway, Metro Vancouver BC",
  },
  {
    label: "Running bond brick",
    src: "/images/applications/private-driveways/chilliwack-townhomes-brick-driveway-01.jpg",
    alt: "Running bond brick pattern driveway at townhomes in Chilliwack BC",
  },
  {
    label: "Cobblestone",
    src: "/images/applications/private-driveways/cobblestone-residential-driveway-closeup-01.jpg",
    alt: "Cobblestone StreetPrint pattern, residential driveway close-up BC",
  },
  {
    label: "Charcoal herringbone",
    src: "/images/applications/private-driveways/craftsman-home-charcoal-herringbone-driveway-01.jpg",
    alt: "Charcoal herringbone driveway at a craftsman home, Lower Mainland BC",
  },
  {
    label: "Red brick",
    src: "/images/applications/private-driveways/townhomes-red-brick-driveway-01.jpg",
    alt: "Red brick pattern stamped asphalt driveway at townhomes, BC",
  },
  {
    label: "Custom medallion",
    src: "/images/applications/private-driveways/orca-driveway-medallion-custom-01.jpg",
    alt: "Custom orca medallion set into a decorative driveway, Vancouver Island BC",
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
    body: "StreetPrint transforms your existing asphalt into a rich decorative surface — brick, cobblestone, slate, and custom patterns — without excavating the base. Installed in place, in days.",
    specs: [
      "Applied over existing asphalt — no demolition",
      "Patterns: brick, cobblestone, slate, running bond",
      "ASTM slip-resistant, snowplow safe",
      "8–12 year service life in BC conditions",
    ],
    href: "/products/streetprint",
    cta: "StreetPrint details",
  },
  {
    name: "StreetBond colour coating",
    note: "Best value",
    body: "StreetBond is a high-performance acrylic coating that bonds permanently to asphalt or concrete. UV stable, anti-skid, and available in dozens of custom colours. The smartest way to refresh and protect an existing driveway.",
    specs: [
      "Bonds to asphalt and concrete",
      "20-year colour retention warranty",
      "Anti-skid aggregate included",
      "Pantone custom colour matching",
    ],
    href: "/products/streetbond",
    cta: "StreetBond details",
  },
  {
    name: "DuraShield rejuvenation",
    note: "Surface prep and protection",
    body: "DuraShield penetrates oxidized asphalt, rejuvenating the binder and extending pavement life 3–5 years. The smart first step before any decorative system, or a standalone maintenance treatment.",
    specs: [
      "Penetrating rejuvenator",
      "Extends pavement life 3–5 years",
      "Restores oxidized asphalt",
      "Pairs with StreetPrint",
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
    desc: "A detailed written quote within 48 hours. No surprises. We specify the right system for your surface condition.",
  },
  {
    num: "03",
    title: "Installation",
    desc: "Our certified crew handles prep, application, and quality control. Most residential driveways: 1–2 days.",
  },
  {
    num: "04",
    title: "20-year performance",
    desc: "StreetPrint and StreetBond are engineered for BC winters. Backed by material warranties and our craftsmanship guarantee.",
  },
]

export default function DriveywaysPage() {
  const altBySrc = new Map(galleryFallback.map((shot) => [shot.src, shot.alt]))

  const gallery = galleryWithFallback(
    "applications",
    "driveways",
    galleryFallback.map((shot) => shot.src),
  )

  return (
    <main>

      {/* ── 01 Hero ─────────────────────────────────────────────── */}
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
              Residential driveways &middot; Metro Vancouver &amp; Vancouver Island
            </div>

            <h1 className="stop mt-7">Make an entrance</h1>

            <p className="mt-7 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body [text-wrap:pretty] max-[700px]:text-[17px]">
              The look of premium stone or pavers with the strength and performance of asphalt —
              imprinted and coated over the driveway you already have. No demolition, most jobs
              finished in days.
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

      {/* ── 02 Benefits ─────────────────────────────────────────── */}
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

      {/* ── 03 Patterns and colours ─────────────────────────────── */}
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
                <div className="mt-[10px] text-[13px] font-semibold text-ink">{pattern.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-6 gap-4 max-[700px]:grid-cols-2">
            {colours.map((colour) => (
              <div key={colour.name}>
                <div
                  aria-hidden="true"
                  className="h-[52px] rounded-[2px] border border-hairline"
                  style={{ background: colour.hex }}
                />
                <div className="mt-[10px] text-[13px] text-ink-body">{colour.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 Systems ──────────────────────────────────────────── */}
      <section className="section relative overflow-hidden border-t border-hairline bg-surface">

        <div className="container-1280 relative z-[1]">
          <h2>Three systems, one certified crew</h2>

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
                BC&rsquo;s only certified HUB Surface Systems applicator
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

      {/* ── 05 How it works ─────────────────────────────────────── */}
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

      {/* ── 06 Selected driveways ───────────────────────────────── */}
      <section className="section relative overflow-hidden bg-surface">

        <div className="container-1280 relative z-[1]">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <h2 className="stop stop-tight">Driveways across BC</h2>
            <Link href="/projects" className="arrow-link whitespace-nowrap">
              All projects <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-6 max-[700px]:grid-cols-2 max-[700px]:gap-4">
            {gallery.map((src) => (
              <div
                key={src}
                className="card relative aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-stone"
              >
                <Image
                  src={src}
                  alt={
                    altBySrc.get(src) ??
                    "Decorative stamped asphalt driveway by Square One Paving, British Columbia"
                  }
                  fill
                  sizes="(max-width: 700px) 50vw, (max-width: 1280px) 25vw, 296px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 Service area ─────────────────────────────────────── */}
      <section className="section relative overflow-hidden border-y border-hairline bg-surface-warm">

        <div className="container-1280 relative z-[1]">
          <p className="eyebrow">Service area</p>

          <h2 className="mt-5">We come to you</h2>

          <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
            Mobile crews from Maple Ridge and Victoria. No travel surcharge within the service
            areas below.
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

      {/* ── 08 Questions we hear ────────────────────────────────── */}
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
                    className="flex-shrink-0 text-[22px] font-light leading-none text-ink-muted"
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
