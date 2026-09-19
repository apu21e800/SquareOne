import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

import { workForRegion, type WorkPhoto, type WorkRegion } from "@/lib/work"
import WorkGallery from "@/components/WorkGallery"
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd"
import { SITE_URL } from "@/lib/site"
import { fitVars } from "@/lib/type"
import { clampDescription } from "@/lib/seo"

/**
 * City landing pages for the driveway pillar — /driveways/vancouver and
 * /driveways/victoria. One template, two pages, each built on the driveway
 * photographs Square One has on record IN that region (lib/work.ts), so a
 * Victoria page shows Saanich, Sooke and Victoria driveways and nothing else.
 *
 *   01 Header      typographic — eyebrow, h1, lede, CTAs, phone for the region
 *   02 Hero figure the region's sharpest driveway, contained — rendered only
 *                  when the region holds a hi-res original 1600px or wider
 *   03 Systems     the three residential systems, short
 *   04 The work    region gallery with system chips
 *   05 Where       communities served in the region
 *   06 Questions   four region-specific answers
 *   07 Close       CTA + the other city
 *
 * Copy rules (CANON): every place named in CITIES is a driveway in that
 * region's record (lib/work.ts, lib/work-captions.ts, lib/projects.ts) or a
 * community in the service area. Private homes carry the city only, never a
 * street. Performance figures are HUB's and say so. Patterns are offered only
 * as Square One's own template sheet lists them (lib/pattern-sheets.ts).
 */

interface Props {
  params: Promise<{ city: string }>
}

interface CityCopy {
  slug: string
  name: string
  region: WorkRegion
  regionLabel: string
  /** The <title>, before the root template adds " | Square One Paving". */
  title: string
  /** The meta description, ≤ 158 characters — clamped on the way out regardless. */
  description: string
  headline: string
  lede: string
  /** "Why stamped asphalt here" — paragraphs built on this region's driveway record. */
  intro: string[]
  phone: string
  phoneLabel: string
  communities: string[]
  faqs: { q: string; a: string }[]
  other: string
}

const CITIES: Record<string, CityCopy> = {
  vancouver: {
    slug: "vancouver",
    name: "Vancouver",
    region: "Lower Mainland",
    regionLabel: "Metro Vancouver",
    title: "Stamped Asphalt Driveways in Vancouver",
    description:
      "Stamped asphalt driveways in Vancouver and the Lower Mainland: StreetPrint patterns, StreetBond colour, over the driveway you have. Free site visit and quote.",
    headline: "Stamped asphalt driveways across Metro Vancouver",
    lede:
      "StreetPrint® stamped asphalt and StreetBond® colour, installed over the driveway you already have — Square One driveways on record from West Vancouver and Richmond to New Westminster, Surrey, Langley and Maple Ridge.",
    intro: [
      "A Lower Mainland driveway spends most of the year wet. Stamped asphalt suits that: the StreetPrint template is pressed into the asphalt you already have, so the pattern is part of the surface — one continuous slab with no joints to settle, and none of the weeds or plow damage of a laid cobble lane. StreetBond colour is rolled into the imprint and holds through wet coastal winters; when it dulls, it is recoated rather than rebuilt. The Maple Ridge and Surrey driveways in the gallery below are recoats, one with its medallion carried through.",
      "On record on this side of the Strait: a herringbone driveway and walk, ashlar slate in Langley and Vancouver, brick and offset brick in Richmond, a strata laneway in New Westminster, and driveways in Burnaby, West Vancouver and Maple Ridge. They are private homes, so the captions carry the city and nothing more.",
    ],
    phone: "604-612-6209",
    phoneLabel: "Lower Mainland",
    communities: [
      "Vancouver", "West Vancouver", "North Vancouver", "Burnaby", "New Westminster", "Richmond",
      "Delta", "Surrey", "White Rock", "Langley", "Coquitlam", "Port Moody", "Maple Ridge",
      "Pitt Meadows", "Mission", "Abbotsford", "Chilliwack",
    ],
    faqs: [
      {
        q: "How does stamped asphalt handle Vancouver rain?",
        a: "It is asphalt, the same material the city paves roads with, imprinted and sealed. There are no joints for water to get under, and the StreetBond coating carries an anti-skid aggregate for wet conditions and holds its colour through wet coastal winters. The manufacturer publishes an 8+ year life cycle for the coating, and a dulled coat is recoated rather than replaced.",
      },
      {
        q: "Can you work on a sloped North Shore driveway?",
        a: "Yes. Asphalt is laid on grades all the time, and the stamped texture gives tyres more to hold than a smooth surface — there is a West Vancouver driveway in the gallery. We look at the grade and drainage at the site visit.",
      },
      {
        q: "My driveway was coated years ago and has faded. Can it be refreshed?",
        a: "Yes. StreetBond is refreshed with a recoat rather than replaced — the Maple Ridge and Surrey driveways on this page are recoats, one with its medallion carried through. For a driveway that is sound but faded and was never coloured, DuraShield is the maintenance coating, in black or Solar Gray.",
      },
      {
        q: "Do you install driveways outside Vancouver proper?",
        a: "Yes. The driveways on this page are in West Vancouver, Burnaby, Richmond, New Westminster, Surrey, Langley and Maple Ridge, and the service area runs from the North Shore through the Tri-Cities and Surrey to Mission, Abbotsford and Chilliwack.",
      },
    ],
    other: "victoria",
  },
  victoria: {
    slug: "victoria",
    name: "Victoria",
    region: "Vancouver Island",
    regionLabel: "Greater Victoria",
    title: "Stamped Asphalt Driveways in Victoria",
    description:
      "Stamped asphalt driveways in Victoria, Saanich and Sooke: StreetPrint patterns, StreetBond colour, over the driveway you have. Free site visit and quote.",
    headline: "Stamped asphalt driveways in Greater Victoria",
    lede:
      "StreetPrint® stamped asphalt and StreetBond® colour for Victoria, Saanich, the Peninsula, Sooke and the Cowichan Valley — installed by Square One, with the Island's own line at 250-391-0270 and driveways on record from Ten Mile Point to Mill Bay.",
    intro: [
      "Greater Victoria carries a good share of Square One's driveway record: a grey ashlar slate drive at a Ten Mile Point home in Saanich, running from the street to a stone-and-timber entry; the driveway at Craigdarroch Castle; ashlar slate in North Saanich and Duncan; offset brick in Victoria, on its own and as a border around an ashlar field; and driveways in West Saanich, Sooke and Mill Bay.",
      "Owners here want an entrance that reads as stone without tearing out the driveway to get it, and that is what stamped asphalt is: the StreetPrint template pressed into the existing asphalt, StreetBond colour rolled into the imprint, and a textured surface the manufacturer rates snowplow safe and publishes at a 10–20 year service life under municipal traffic. A driveway sees a fraction of that.",
    ],
    phone: "250-391-0270",
    phoneLabel: "Vancouver Island",
    communities: [
      "Victoria", "Saanich", "Oak Bay", "Esquimalt", "View Royal", "Langford", "Colwood",
      "North Saanich", "Central Saanich", "Sidney", "Sooke", "Mill Bay", "Duncan", "Nanaimo", "Parksville",
    ],
    faqs: [
      {
        q: "Do you actually install on Vancouver Island?",
        a: "Yes. Vancouver Island is a Square One service region with its own line, 250-391-0270. Every driveway on this page — Saanich, North and West Saanich, Sooke, Duncan, Mill Bay and Victoria — was installed by Square One.",
      },
      {
        q: "Which StreetPrint patterns are on record in Greater Victoria?",
        a: "Ashlar slate is the most photographed — Ten Mile Point, North Saanich and Duncan — with offset brick in Victoria, on its own and as a border around an ashlar field. Both are on Square One's template sheet, along with standard herringbone, standard and offset tile and random stone. Sample boards come to the site visit so you can hold them against the house.",
      },
      {
        q: "How does it hold up through an Island winter?",
        a: "The imprinted surface is textured, so tyres and shoes have more to hold than on smooth asphalt, and the manufacturer rates StreetPrint snowplow and de-icing salt safe. StreetBond colour holds through wet coastal winters and is recoated, not replaced, when it eventually dulls.",
      },
      {
        q: "How far up-Island do you go?",
        a: "Greater Victoria and the Peninsula, Sooke, the Cowichan Valley, Nanaimo and Parksville are in the service area, and Square One's record runs further up-Island — Lantzville, Parksville and Tofino among them. Send the address and we will tell you straight away whether it makes sense.",
      },
    ],
    other: "vancouver",
  },
}

/** Same wording as WorkGallery's alt text; kept here because that module is client-only. */
function heroAlt(p: WorkPhoto): string {
  const sys = p.systems.join(" and ")
  return p.place
    ? `${p.subject} in ${sys} — ${p.place}, BC. Installed by Square One Paving.`
    : `${p.subject} in ${sys}. Installed by Square One Paving.`
}

/* The three residential systems, as lib/products.ts describes them. The lede
   above carries the first mention of StreetPrint® and StreetBond® on the page. */
const SYSTEMS = [
  { name: "StreetPrint stamped asphalt", body: "Brick, herringbone, ashlar slate and tile patterns pressed into your existing asphalt — no excavation, no new base.", href: "/products/streetprint" },
  { name: "StreetBond colour coating", body: "The colour and the seal in one — UV-stable, anti-skid, and the way an existing driveway gets refreshed: recoated, not rebuilt.", href: "/products/streetbond" },
  { name: "DuraShield maintenance coating", body: "For a driveway that is sound but faded — a protective coating in black or Solar Gray, shielding the asphalt from UV and resisting chemicals.", href: "/products/durashield" },
]

export async function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({ city }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const c = CITIES[city]
  if (!c) return {}
  return {
    title: c.title,
    description: clampDescription(c.description),
    keywords: [
      `stamped asphalt driveway ${c.name}`,
      `decorative driveway ${c.name}`,
      `StreetPrint driveway ${c.name}`,
      `driveway paving ${c.name}`,
      `${c.name} driveway resurfacing`,
    ],
    alternates: { canonical: `${SITE_URL}/driveways/${c.slug}` },
  }
}

export default async function DrivewayCityPage({ params }: Props) {
  const { city } = await params
  const c = CITIES[city]
  if (!c) notFound()

  const photos = workForRegion("driveways", c.region)
  const hero = photos.find((p) => p.hires && p.w >= 1600)
  const gallery = hero ? photos.filter((p) => p.src !== hero.src) : photos
  const other = CITIES[c.other]

  return (
    <main className="bg-[color:var(--surface)]">
      <JsonLd
        data={[
          faqSchema(c.faqs),
          breadcrumbSchema(SITE_URL, [
            { name: "Driveways", path: "/driveways" },
            { name: c.name, path: `/driveways/${c.slug}` },
          ]),
        ]}
      />
      {/* ── 01 Header ──────── */}
      <section className="section bg-[color:var(--surface)] pt-28 pb-14 max-[700px]:pt-[88px] max-[700px]:pb-10">
        <div className="container-1280">
          <Link href="/driveways" className="eyebrow w-fit transition-colors hover:text-[color:var(--ink)]">
            Driveways &middot; {c.regionLabel}
          </Link>

          <div className="fit-host mt-7 max-w-[44rem]">
            <h1 className="display-fit stop [text-wrap:balance]" style={fitVars(c.headline)}>{c.headline}</h1>
          </div>

          <p className="mt-7 max-w-[58ch] text-[19px] leading-[1.65] text-[color:var(--ink-body)] [text-wrap:pretty] max-[700px]:text-[17px]">
            {c.lede}
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/contact" className="btn-primary">
              Book a free site visit
            </Link>
            <a href={`tel:${c.phone.replace(/-/g, "")}`} className="arrow-link">
              {c.phoneLabel} {c.phone} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 02 Hero figure — only when the region holds a sharp original ──────── */}
      {hero && (
        <section className="bg-[color:var(--surface)] pb-16 max-[700px]:pb-10">
          <div className="container-1280">
            <figure className="max-w-[1080px]">
              {/* Driveway photographs carry the surface in the lower half, so the crop anchors to the bottom edge. */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
                <Image
                  src={hero.src}
                  alt={heroAlt(hero)}
                  fill
                  priority
                  sizes="(max-width: 1120px) 100vw, 1080px"
                  className="object-cover [object-position:center_100%]"
                />
              </div>
              <figcaption className="label mt-3">
                {[hero.place, hero.systems.join(" + "), hero.subject].filter(Boolean).join(" · ")}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* ── 03 Intro + systems ──────── */}
      <section className="section border-y border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
        <div className="container-1280 grid grid-cols-[1fr_1.1fr] gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div>
            <div className="eyebrow">Why stamped asphalt here</div>
            {c.intro.map((para, i) => (
              <p
                key={i}
                className={`${i === 0 ? "mt-6" : "mt-4"} max-w-[52ch] text-[17px] leading-[1.7] text-[color:var(--ink-body)] [text-wrap:pretty]`}
              >
                {para}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
              <Link href="/patterns" className="arrow-link">
                The pattern library <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/services/stamped-asphalt" className="arrow-link">
                Stamped asphalt, the service <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/projects" className="arrow-link">
                Driveway projects <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {SYSTEMS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="card group flex items-baseline justify-between gap-6 rounded-[2px] border border-[color:var(--hairline)] bg-[color:var(--surface)] p-6"
              >
                <div>
                  <h3>{s.name}</h3>
                  <p className="mt-2 max-w-[46ch] text-[15px] leading-[1.55] text-[color:var(--ink-body)]">{s.body}</p>
                </div>
                <span aria-hidden="true" className="arrow-link whitespace-nowrap group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 The work ──────── */}
      <section className="section bg-[color:var(--surface)]">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">Photographed on site</div>
              <h2 className="mt-4 [text-wrap:balance]">Stamped asphalt driveways on record {c.region === "Lower Mainland" ? "in the Lower Mainland" : "on Vancouver Island"}</h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] text-[color:var(--ink-muted)]">
              Square One driveways, captioned with the pattern and the community. Archive shots
              stay small on purpose.
            </p>
          </div>

          <div className="mt-10">
            <WorkGallery photos={gallery} initial={12} ariaLabel={`${c.name} driveway photographs`} />
          </div>
        </div>
      </section>

      {/* ── 04b Try it — HELD BACK with the templates (Vern, 19 Sept). ──────── */}

      {/* ── 05 Where ──────── */}
      <section className="section border-y border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
        <div className="container-1280">
          <div className="eyebrow">Where we install</div>
          <h2 className="mt-4">Driveways across {c.regionLabel} and beyond</h2>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {c.communities.map((place) => (
              <span key={place} className="tag">
                {place}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.6] text-[color:var(--ink-muted)]">
            Free site visit and a written quote, anywhere in the service area. Elsewhere in BC,
            we travel for the right job &mdash; ask.
          </p>
        </div>
      </section>

      {/* ── 06 Questions ──────── */}
      <section className="section bg-[color:var(--surface)]">
        <div className="container-1280">
          <h2>Questions from {c.name} homeowners</h2>

          <div className="mt-10 max-w-[760px] border-t border-[color:var(--hairline)]">
            {c.faqs.map((faq, i) => (
              <details key={faq.q} open={i === 0} className="group border-b border-[color:var(--hairline)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[22px] [&::-webkit-details-marker]:hidden">
                  <span className="text-[1.25rem] font-semibold leading-[1.4] tracking-[-0.015em] text-[color:var(--ink)]">
                    {faq.q}
                  </span>
                  <span aria-hidden="true" className="flex-shrink-0 text-[22px] font-normal leading-none text-[color:var(--ink-muted)]">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">&minus;</span>
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-6 pr-10 text-[15px] leading-[1.65] text-[color:var(--ink-body)] max-[700px]:pr-0">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 Close ──────── */}
      <section className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
        <div className="container-1280">
          <div className="eyebrow">Free site visit</div>
          <h2 className="stop mt-5 max-w-[22ch] [text-wrap:balance]">Send a photo of your driveway and we will come back with a written quote</h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
            <a href={`tel:${c.phone.replace(/-/g, "")}`} className="btn-secondary">
              {c.phone}
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[color:var(--hairline)] pt-6">
            <Link href="/driveways" className="arrow-link">
              All driveways <span aria-hidden="true">&rarr;</span>
            </Link>
            {other && (
              <Link href={`/driveways/${other.slug}`} className="arrow-link">
                Driveways in {other.name} <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
