import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { workForRegion, type WorkPhoto, type WorkRegion } from "@/lib/work"
import WorkGallery from "@/components/WorkGallery"
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import { SITE_URL } from "@/lib/site"
import { fitVars } from "@/lib/type"
import { clampDescription } from "@/lib/seo"

/**
 * City landing pages for the driveway pillar — /driveways/vancouver and
 * /driveways/victoria. One template, two pages, each built on the driveway
 * photographs Square One has on record IN that region (lib/work.ts), so a
 * Victoria page shows Saanich, Sooke and Victoria driveways and nothing else.
 *
 *   01 Header      typographic — label, h1, lede, the button, the region's line
 *   02 Hero figure the region's sharpest driveway, contained, captioned under —
 *                  rendered only when the region holds a hi-res original 1600px or wider
 *   03 Why here    the label in the margin column, the paragraphs, the three
 *                  residential systems as hairline rows beside them
 *   04 The work    region gallery
 *   05 Where       communities served in the region
 *   06 Questions   four region-specific answers
 *   07 Close       CTA + the other city
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the same skeleton on the
 * own-company primitives — no orange full stop, the caption under the
 * opening frame, the system cards as hairline rows, every arrow link an
 * underlined word. Copy, facts and hrefs are the ones that were here.
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
  /** The opening figure, from the region's record — chosen by eye (19 Sept 2026). */
  heroSrc?: string
}

const CITIES: Record<string, CityCopy> = {
  vancouver: {
    slug: "vancouver",
    name: "Vancouver",
    region: "Lower Mainland",
    regionLabel: "Metro Vancouver",
    heroSrc: "/images/applications/driveways/richmond-brick-driveway-streetprint-01.jpg",
    title: "Stamped Asphalt Driveways in Vancouver",
    description:
      "Stamped asphalt driveways in Vancouver and the Lower Mainland: StreetPrint patterns, StreetBond colour, over the driveway you have. Free site visit and quote.",
    headline: "Stamped asphalt driveways across Metro Vancouver",
    lede:
      "StreetPrint® stamped asphalt and StreetBond® colour, installed over the driveway you already have: Square One driveways on record from West Vancouver and Richmond to New Westminster, Surrey, Langley and Maple Ridge.",
    intro: [
      "A Lower Mainland driveway spends most of the year wet. Stamped asphalt suits that: the StreetPrint template is pressed into the asphalt you already have, so the pattern is part of the surface: one continuous slab with no joints to settle, and none of the weeds or plow damage of a laid cobble lane. StreetBond colour is rolled into the imprint and holds through wet coastal winters; when it dulls, it is recoated rather than rebuilt. The Maple Ridge and Surrey driveways in the gallery below are recoats, one with its medallion carried through.",
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
        a: "Yes. Asphalt is laid on grades all the time, and the stamped texture gives tyres more to hold than a smooth surface. There is a West Vancouver driveway in the gallery. We look at the grade and drainage at the site visit.",
      },
      {
        q: "My driveway was coated years ago and has faded. Can it be refreshed?",
        a: "Yes. StreetBond is refreshed with a recoat rather than replaced: the Maple Ridge and Surrey driveways on this page are recoats, one with its medallion carried through. For a driveway that is sound but faded and was never coloured, DuraShield is the maintenance coating, in black or Solar Gray.",
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
    heroSrc: "/images/S1_update_v2/photos/Driveways/Ten%20Mile%20Point%20Driveway%20I.jpg",
    title: "Stamped Asphalt Driveways in Victoria",
    description:
      "Stamped asphalt driveways in Victoria, Saanich and Sooke: StreetPrint patterns, StreetBond colour, over the driveway you have. Free site visit and quote.",
    headline: "Stamped asphalt driveways in Greater Victoria",
    lede:
      "StreetPrint® stamped asphalt and StreetBond® colour for Victoria, Saanich, the Peninsula, Sooke and the Cowichan Valley, installed by Square One, with the Island's own line at 250-391-0270 and driveways on record from Ten Mile Point to Mill Bay.",
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
        a: "Yes. Vancouver Island is a Square One service region with its own line, 250-391-0270. Every driveway on this page (Saanich, North and West Saanich, Sooke, Duncan, Mill Bay and Victoria) was installed by Square One.",
      },
      {
        q: "Which StreetPrint patterns are on record in Greater Victoria?",
        a: "Ashlar slate is the most photographed (Ten Mile Point, North Saanich and Duncan) with offset brick in Victoria, on its own and as a border around an ashlar field. Both are on Square One's template sheet, along with standard herringbone, standard and offset tile and random stone. Sample boards come to the site visit so you can hold them against the house.",
      },
      {
        q: "How does it hold up through an Island winter?",
        a: "The imprinted surface is textured, so tyres and shoes have more to hold than on smooth asphalt, and the manufacturer rates StreetPrint snowplow and de-icing salt safe. StreetBond colour holds through wet coastal winters and is recoated, not replaced, when it eventually dulls.",
      },
      {
        q: "How far up-Island do you go?",
        a: "Greater Victoria and the Peninsula, Sooke, the Cowichan Valley, Nanaimo and Parksville are in the service area, and Square One's record runs further up-Island: Lantzville, Parksville and Tofino among them. Send the address and we will tell you straight away whether it makes sense.",
      },
    ],
    other: "vancouver",
  },
}

/** Same wording as WorkGallery's alt text; kept here because that module is client-only. */
function heroAlt(p: WorkPhoto): string {
  const sys = p.systems.join(" and ")
  return p.place
    ? `${p.subject} in ${sys}, ${p.place}, BC. Installed by Square One Paving.`
    : `${p.subject} in ${sys}. Installed by Square One Paving.`
}

/* The three residential systems, as lib/products.ts describes them. The lede
   above carries the first mention of StreetPrint® and StreetBond® on the page. */
const SYSTEMS = [
  { name: "StreetPrint stamped asphalt", body: "Brick, herringbone, ashlar slate and tile patterns pressed into your existing asphalt, no excavation, no new base.", href: "/products/streetprint" },
  { name: "StreetBond colour coating", body: "The colour and the seal in one, UV-stable, anti-skid, and the way an existing driveway gets refreshed: recoated, not rebuilt.", href: "/products/streetbond" },
  { name: "DuraShield maintenance coating", body: "For a driveway that is sound but faded: a protective coating in black or Solar Gray, shielding the asphalt from UV and resisting chemicals.", href: "/products/durashield" },
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
    ...(c.heroSrc ? { openGraph: { title: c.headline, description: clampDescription(c.description), images: [{ url: c.heroSrc, alt: c.headline }] } } : {}),
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
  const hero = photos.find((p) => p.src === c.heroSrc) ?? photos.find((p) => p.hires && p.w >= 1600)
  const gallery = hero ? photos.filter((p) => p.src !== hero.src) : photos
  const other = CITIES[c.other]
  const tel = `tel:${c.phone.replace(/-/g, "")}`

  return (
    <main className="bg-surface">
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
      <section className="section bg-surface pt-28 pb-14 max-[700px]:pt-[88px] max-[700px]:pb-10">
        <div className="container-1280">
          <Link href="/driveways" className="label w-fit transition-colors hover:text-ink">
            Driveways &middot; {c.regionLabel}
          </Link>

          <div className="fit-host mt-6 max-w-[44rem]">
            <h1 className="display-fit [text-wrap:balance]" style={fitVars(c.headline)}>{c.headline}</h1>
          </div>

          <p className="lede mt-7 max-w-[58ch] [text-wrap:pretty]">
            {c.lede}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/contact" className="btn-primary">
              Book a free site visit
            </Link>
            <a href={tel} className="link">
              {c.phoneLabel} {c.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── 02 Hero figure — only when the region holds a sharp original ──────── */}
      {hero && (
        <section className="bg-surface pb-16 max-[700px]:pb-10">
          <div className="container-1280">
            {/* Driveway photographs carry the surface in the lower half, so the crop anchors to the bottom edge. */}
            <Frame
              src={hero.src}
              alt={heroAlt(hero)}
              aspect="aspect-[16/10]"
              sizes="(max-width: 1120px) 100vw, 1080px"
              position="center 78%"
              priority
              className="max-w-[1080px]"
              caption={[hero.place, hero.systems.join(" + "), hero.subject].filter(Boolean).join(" · ")}
            />
          </div>
        </section>
      )}

      {/* ── 03 Why here — the label in the margin, the paragraphs, the
             three residential systems as hairline rows beside them ──────── */}
      <section className="sec section bg-surface-warm">
        <div className="container-1280 grid grid-cols-12 gap-x-10 gap-y-10 max-[900px]:grid-cols-1">
          <div className="col-span-3 max-[900px]:col-span-1">
            <span className="label">Why stamped asphalt here</span>
          </div>

          <div className="col-span-5 max-[900px]:col-span-1">
            {c.intro.map((para, i) => (
              <p key={i} className={`${i === 0 ? "" : "mt-4"} max-w-[52ch] text-ink-body [text-wrap:pretty]`}>
                {para}
              </p>
            ))}
            <p className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
              <Link href="/patterns" className="link">
                The pattern library
              </Link>
              <Link href="/services/stamped-asphalt" className="link">
                Stamped asphalt, the service
              </Link>
              <Link href="/projects" className="link">
                Driveway projects
              </Link>
            </p>
          </div>

          <ul className="col-span-4 border-t border-hairline max-[900px]:col-span-1">
            {SYSTEMS.map((s) => (
              <li key={s.href} className="border-b border-hairline py-5">
                <h3>
                  <Link href={s.href} className="underline-offset-4 hover:underline">
                    {s.name}
                  </Link>
                </h3>
                <p className="mt-2 max-w-[46ch] text-[15px] leading-[1.55] text-ink-body [text-wrap:pretty]">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 04 The work ──────── */}
      <Section
        label="Photographed on site"
        title={`Stamped asphalt driveways on record ${c.region === "Lower Mainland" ? "in the Lower Mainland" : "on Vancouver Island"}`}
        intro="Square One driveways, captioned with the pattern and the community. Archive shots stay small on purpose."
        wide
      >
        <WorkGallery photos={gallery} initial={12} ariaLabel={`${c.name} driveway photographs`} />
      </Section>

      {/* ── 04b Try it — HELD BACK with the templates (Vern, 19 Sept). ──────── */}

      {/* ── 05 Where ──────── */}
      <Section label="Where we install" title={`Driveways across ${c.regionLabel} and beyond`} tone="warm">
        <p>
          {c.communities.map((place) => (
            <span key={place} className="tag">
              {place}
            </span>
          ))}
        </p>
        <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.6] text-ink-muted [text-wrap:pretty]">
          Free site visit and a written quote, anywhere in the service area. Elsewhere in BC,
          we travel for the right job, ask.
        </p>
      </Section>

      {/* ── 06 Questions ──────── */}
      <Section label="Questions" title={`Questions from ${c.name} homeowners`}>
        <div className="border-t border-hairline">
          {c.faqs.map((faq, i) => (
            <details key={faq.q} open={i === 0} className="group border-b border-hairline">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[22px] [&::-webkit-details-marker]:hidden">
                <span className="text-[1.125rem] font-semibold leading-[1.4] text-ink">
                  {faq.q}
                </span>
                <span aria-hidden="true" className="flex-shrink-0 text-[22px] font-normal leading-none text-ink-muted">
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

      {/* ── 07 Close ──────── */}
      <Section
        label="Free site visit"
        title="Send a photo of your driveway and we will come back with a written quote"
        tone="warm"
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/contact" className="btn-primary">
            Get a quote
          </Link>
          <a href={tel} className="link">
            {c.phone}
          </a>
        </div>
        <p className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline pt-6">
          <Link href="/driveways" className="link">
            All driveways
          </Link>
          {other && (
            <Link href={`/driveways/${other.slug}`} className="link">
              Driveways in {other.name}
            </Link>
          )}
        </p>
      </Section>
    </main>
  )
}
