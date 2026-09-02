import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

import { workForRegion, type WorkPhoto, type WorkRegion } from "@/lib/work"
import WorkGallery from "@/components/WorkGallery"

/**
 * City landing pages for the driveway pillar — /driveways/vancouver and
 * /driveways/victoria. One template, two pages, each built on the driveway
 * photographs Square One has on record IN that region (lib/work.ts), so a
 * Victoria page shows Saanich, Sooke and Victoria driveways and nothing else.
 *
 *   01 Header      typographic — eyebrow, h1, lede, CTAs, phone for the region
 *   02 Hero figure the region's sharpest driveway, contained (Island only —
 *                  the mainland set is archive scale and stays at tile size)
 *   03 Systems     the three residential systems, short
 *   04 The work    region gallery with system chips
 *   05 Where       communities served in the region
 *   06 Questions   three region-specific answers
 *   07 Close       CTA + the other city
 */

interface Props {
  params: Promise<{ city: string }>
}

interface CityCopy {
  slug: string
  name: string
  region: WorkRegion
  regionLabel: string
  title: string
  headline: string
  lede: string
  intro: string
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
    title: "Stamped Asphalt Driveways Vancouver | Square One Paving",
    headline: "Driveways for Vancouver homes",
    lede:
      "StreetPrint stamped asphalt and StreetBond colour, installed over the driveway you already have — from West Vancouver to Langley, by the crew that has been doing it since 2000.",
    intro:
      "A Vancouver driveway lives in nine months of rain. Stamped asphalt handles that better than pavers or coloured concrete: it is one continuous surface, so there are no joints to heave, no sand to wash out and nothing for moss to take hold in. We imprint the pattern into your existing asphalt and seal it in a StreetBond colour — the driveway stays where it is.",
    phone: "604-466-9902",
    phoneLabel: "Lower Mainland",
    communities: [
      "Vancouver", "West Vancouver", "North Vancouver", "Burnaby", "New Westminster", "Richmond",
      "Delta", "Surrey", "White Rock", "Langley", "Coquitlam", "Port Moody", "Maple Ridge",
      "Pitt Meadows", "Mission", "Abbotsford", "Chilliwack",
    ],
    faqs: [
      {
        q: "How does stamped asphalt handle Vancouver rain?",
        a: "Well — it is asphalt, the same material the city paves roads with, imprinted and sealed. There are no joints for water to get under, and the StreetBond coating is designed to shed water and hold its colour through wet winters.",
      },
      {
        q: "Can you work on a sloped North Shore driveway?",
        a: "Yes. Asphalt is laid on grades all the time, and the stamped texture gives tyres more to hold than a smooth surface. We look at the grade and drainage at the site visit.",
      },
      {
        q: "Do you install driveways outside Vancouver proper?",
        a: "Across the Lower Mainland — the North Shore, Burnaby, Richmond, the Tri-Cities, Surrey, Langley and out to Maple Ridge and the Fraser Valley.",
      },
    ],
    other: "victoria",
  },
  victoria: {
    slug: "victoria",
    name: "Victoria",
    region: "Vancouver Island",
    regionLabel: "Greater Victoria",
    title: "Stamped Asphalt Driveways Victoria | Square One Paving",
    headline: "Driveways for Greater Victoria homes",
    lede:
      "StreetPrint stamped asphalt and StreetBond colour for Victoria, Saanich, Oak Bay and the Peninsula — installed by Square One crews dispatched to the Island, with more driveways on record here than anywhere else we work.",
    intro:
      "Victoria is where a lot of our driveway work lives: Ten Mile Point, Ellis Point, North and West Saanich, Sooke, the Cowichan Valley. The homes are older, the lots are landscaped, and owners want an entrance that looks like stone without tearing out the driveway to get it. Stamped asphalt is that — imprinted into the existing surface and sealed in colour.",
    phone: "250-391-0270",
    phoneLabel: "Vancouver Island",
    communities: [
      "Victoria", "Saanich", "Oak Bay", "Esquimalt", "View Royal", "Langford", "Colwood",
      "North Saanich", "Central Saanich", "Sidney", "Sooke", "Mill Bay", "Duncan", "Nanaimo", "Parksville",
    ],
    faqs: [
      {
        q: "Do you really come to the Island, or is it a mainland crew on a ferry?",
        a: "Crews are dispatched across both regions, and Vancouver Island has its own phone line. The driveways on this page — Saanich, Sooke, Duncan, Victoria — were all installed by Square One.",
      },
      {
        q: "Which patterns suit an older Victoria home?",
        a: "British cobble, cobblestone and offset brick are the patterns on record in Greater Victoria — they sit well beside stone, timber and heritage brick. We bring sample boards to the site visit so you can see them against your own house.",
      },
      {
        q: "How far up-Island do you go?",
        a: "Greater Victoria and the Peninsula, Sooke, the Cowichan Valley, Nanaimo and Parksville are all in the service area. Further up-Island, ask — the answer is usually yes for a project of any size.",
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

const SYSTEMS = [
  { name: "StreetPrint stamped asphalt", body: "Brick, cobble, slate and custom patterns imprinted into your existing asphalt — no excavation, no new base.", href: "/products/streetprint" },
  { name: "StreetBond colour coating", body: "The colour and the seal in one — UV-stable, slip-resistant, and the way an existing driveway gets refreshed.", href: "/products/streetbond" },
  { name: "DuraShield maintenance coating", body: "For a driveway that is sound but faded — a protective black or solar-grey coating that shields the asphalt from UV, fuel and de-icers.", href: "/products/durashield" },
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
    description: `${c.lede} Free site visit and written quote.`,
    keywords: [
      `stamped asphalt driveway ${c.name}`,
      `decorative driveway ${c.name}`,
      `StreetPrint driveway ${c.name}`,
      `driveway paving ${c.name}`,
      `${c.name} driveway resurfacing`,
    ],
    alternates: { canonical: `https://squareonepaving.ca/driveways/${c.slug}` },
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
      {/* ── 01 Header ──────── */}
      <section className="section bg-[color:var(--surface)] pt-28 pb-14 max-[700px]:pt-[88px] max-[700px]:pb-10">
        <div className="container-1280">
          <Link href="/driveways" className="eyebrow w-fit transition-colors hover:text-[color:var(--ink)]">
            Driveways &middot; {c.regionLabel}
          </Link>

          <h1 className="stop mt-7 max-w-[20ch] [text-wrap:balance]">{c.headline}</h1>

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
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
                <Image
                  src={hero.src}
                  alt={heroAlt(hero)}
                  fill
                  priority
                  sizes="(max-width: 1120px) 100vw, 1080px"
                  className="object-cover"
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
            <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.7] text-[color:var(--ink-body)] [text-wrap:pretty]">
              {c.intro}
            </p>
            <Link href="/driveways#patterns" className="arrow-link mt-8">
              Patterns and colours <span aria-hidden="true">&rarr;</span>
            </Link>
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
              <h2 className="mt-4 [text-wrap:balance]">{photos.length} driveways on record in {c.regionLabel === "Metro Vancouver" ? "the Lower Mainland" : "the Island"}</h2>
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

      {/* ── 05 Where ──────── */}
      <section className="section border-y border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
        <div className="container-1280">
          <div className="eyebrow">Where we install</div>
          <h2 className="mt-4">{c.regionLabel} and beyond</h2>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {c.communities.map((place) => (
              <span key={place} className="tag">
                {place}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.6] text-[color:var(--ink-muted)]">
            Free site visit and a written quote, anywhere in the service area.
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
