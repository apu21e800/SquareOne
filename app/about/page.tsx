import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { products } from "@/lib/products"
import { services } from "@/lib/services"
import { WORK_APPS } from "@/lib/work"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"
import HowAJobGoes from "@/components/sections/HowAJobGoes"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"

export const metadata: Metadata = {
  // One separator: the root template adds " | Square One Paving" (58 chars all in).
  title: "About: Decorative Pavement Since 2000",
  description:
    clampDescription("Decorative pavement installers in BC since 2000: stamped asphalt, coatings and thermoplastic from Maple Ridge, for the Lower Mainland and Vancouver Island."),
  keywords: [
    "Square One Paving BC",
    "decorative pavement installer BC",
    "decorative pavement contractor BC",
    "stamped asphalt contractor Vancouver",
    "stamped asphalt contractor Victoria",
  ],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About: Decorative Pavement Since 2000 | Square One Paving",
    description:
      clampDescription("Square One Paving has installed decorative pavement across British Columbia since 2000: municipal, commercial and residential work, Lower Mainland and Vancouver Island."),
    images: [{ url: "/images/hero/white-rock-marine-drive-wave-crosswalk.jpg", width: 1600, height: 1067, alt: "Artist-designed crosswalk of waves, sand and sky in TrafficPatterns on Marine Drive, White Rock, installed by Square One Paving" }],
  },
}

/**
 * About — rebuilt 5 Sept 2026 (Vern: "we don't need Jan and Gord's images,
 * so let's re-do the About page"). The work is the portrait.
 *
 *   1 Header            paper — the claim, the lede
 *   2 Photograph        full-bleed, one install, one caption under it (breath)
 *   3 Our story         warm — story, on the record, mission
 *   4 What we install   paper — the four trades, photographed
 *   5 How we work       warm — six principles
 *   6 How a job goes    paper — the one process band, with the crew frames
 *   7 The work          warm — the ten kinds of work
 *   8 Where we work     paper
 *   9 Site Close        slate — rendered once by app/layout.tsx (Footer)
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the same bands on the
 * own-company primitives — labels in the margin column, the captions under
 * the frames, the five steps replaced by the one process band
 * (components/sections/HowAJobGoes, which carries the crew frames here),
 * every arrow link an underlined word, no orange full stops. Maple Ridge is
 * the office. Vancouver Island is a service region with its own phone line,
 * never an office.
 */

/* 28 Sept 2026, second image pass (Vern: "more recent images… site wide"):
   three of the four frames are 2025–2026 work from the September delivery
   (Chilliwack, Maple Ridge, South Langford); vapour keeps Granville Island. */
const trades: { name: string; line: string; href: string; src: string; alt: string; caption: string }[] = [
  {
    name: "Stamped asphalt",
    line: "Brick, cobble and slate, pressed into the asphalt itself.",
    href: "/services/stamped-asphalt",
    src: "/images/applications/roundabouts/chilliwack-circular-turnaround-streetprint-01.jpg",
    alt: "A circular turnaround in charcoal herringbone StreetPrint in front of a new apartment building in Chilliwack",
    caption: "Chilliwack · StreetPrint",
  },
  {
    name: "Decorative coatings",
    line: "StreetBond colour on asphalt and concrete.",
    href: "/services/decorative-coatings",
    src: "/images/applications/parks-paths/maple-ridge-spray-park-surface-streetbond-01.jpg",
    alt: "Blue and orange StreetBond around the play features of the spray park in Maple Ridge",
    caption: "Spray park, Maple Ridge · StreetBond",
  },
  {
    name: "Preformed thermoplastic",
    line: "Crosswalks, symbols and public art, fused into the road.",
    href: "/services/preformed-thermoplastic",
    src: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2025-09-25-3-48-33-PM-scaled.jpg",
    alt: "An alphabet path in rainbow-coloured DecoMark winding along a school walkway at South Langford Elementary, Langford",
    caption: "South Langford Elementary, Langford · DecoMark",
  },
  {
    name: "Vapour blasting",
    line: "Cleaning, priming, graffiti and marking removal.",
    href: "/services/vapor-blasting",
    src: "/images/services/vapor-blasting/generated/gen-granville-island-vapour-blasting-01-enhanced.jpg",
    alt: "Square One crew vapour blasting at Granville Island",
    caption: "Granville Island, Vancouver · vapour blasting",
  },
]

/* Six things a specifier or a homeowner can hold Square One to. Every line
   restates something on the record — HUB's published product facts
   (lib/products.ts, attributed), the contact canon, the site walk with the
   sample boards — and nothing about crews, budgets or timelines that Square
   One has not published. No warranty wording (6 Oct 2026, the client:
   "remove anything about warranty"). */
const principles = [
  {
    title: "Built for BC weather",
    body: "Slip-resistant, snowplow-safe, UV-stable: the manufacturer publishes how every system we install performs.",
  },
  {
    title: "Municipal discipline, residential care",
    body: "Civic work goes in to the owner's marking standard. A driveway gets the same crews.",
  },
  {
    title: "Chosen against the real site",
    body: "Patterns are drawn to scale and colours come off the published chart, held up on sample boards where the work will go.",
  },
]

/* On the record — facts about the company, not a tally of its work. The
   client struck the photograph count on 10 Sept 2026 ("we have done 1000s of
   jobs and it makes it seem like we have only done 194"), and the project
   and community counts read the same way, so they are gone: nothing here
   counts what Square One has done. The three catalogue figures are read
   from lib/ so they can never drift from the pages. */
const timeline = [
  { year: "2000", event: "Square One Paving begins installing decorative pavement in British Columbia" },
  { year: String(services.length), event: "services: stamped asphalt, decorative coatings, preformed thermoplastic and vapour blasting" },
  { year: String(products.length), event: "pavement systems installed, from StreetPrint to PreMark" },
  { year: String(WORK_APPS.length), event: "kinds of work, each with a gallery of Square One's own photographs" },
]

const serviceRegions = [
  "Metro Vancouver",
  "Fraser Valley",
  "Sea to Sky",
  "Sunshine Coast",
  "Vancouver Island",
  "Okanagan",
]

export default function AboutPage() {
  return (
    <main>
      {/* ── 1 · Header ──────── */}
      <section className="bg-surface pt-[calc(var(--bar-h)+96px)] pb-20 max-[700px]:pt-[calc(var(--bar-h)+56px)] max-[700px]:pb-12">
        <div className="container-1280">
          <span className="label label-sq label-page">About Square One</span>

          <h1 className="mt-6 max-w-[18ch] [text-wrap:balance]">
            Decorative pavement <em>in BC since 2000</em>
          </h1>

          <div className="mt-9 grid grid-cols-12 gap-x-10 gap-y-6 max-[900px]:grid-cols-1">
            <p className="lede col-span-7 max-w-[56ch] [text-wrap:pretty]">
              {/* "recognized as the most experienced decorative stamped asphalt
                  applicator in Western Canada" stood here until 17 Sept 2026.
                  It is a superlative with no source anywhere in the record —
                  recognised by whom is never answered — and it was the first
                  sentence on the page, doing the work that the client list,
                  the twenty-five years and 300 photographs do better and
                  provably. Flagged to Vern: if Square One has a citation for
                  it, it can come back with the citation. */}
              Crosswalks, streetscapes, plazas, parks, school grounds and driveways, installed by
              our own crews from one office in Maple Ridge, on both sides of the Strait.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2 · Photograph — the work is the portrait; the caption under it ──────── */}
      <figure className="m-0 bg-surface">
        <span className="relative block h-[62vh] min-h-[420px] overflow-hidden bg-surface-stone">
          <Image
            src="/images/hero/white-rock-marine-drive-wave-crosswalk.jpg"
            alt="Artist-designed crosswalk of waves, sand and sky in TrafficPatterns on Marine Drive, White Rock, installed by Square One Paving"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover [object-position:center_60%]"
          />
        </span>
        <figcaption className="cap container-1280 pb-10 max-[700px]:pb-7">
          Marine Drive, White Rock &middot; TrafficPatterns &middot; 2025
        </figcaption>
      </figure>

      {/* ── 3 · Our story ──────── */}
      <Section label="Our story" title={<>One kind of work, <em>done properly</em></>} tone="warm" wide>
        <div className="grid grid-cols-12 gap-x-10 gap-y-14 max-[900px]:grid-cols-1">
          <div className="col-span-6 max-[900px]:col-span-1">
            <div className="max-w-[58ch] space-y-5 text-ink-body [text-wrap:pretty]">
              <p>
                Square One Paving started in 2000 doing one kind of work: decorative pavement, in
                BC, through BC weather. More than twenty-five years on, we still do that one kind
                of work, with our own crews.
              </p>
            </div>

            <div className="mt-12">
              <span className="label">On the record</span>

              <ol className="mt-4 border-t border-hairline">
                {timeline.map((item) => (
                  <li
                    key={item.event}
                    className="grid grid-cols-[72px_1fr] items-baseline gap-6 border-b border-hairline py-4"
                  >
                    <span className="text-[22px] font-bold leading-none text-ink" style={{ fontFamily: "var(--font-display)" }}>
                      {item.year}
                    </span>
                    <span className="text-[16px] leading-[1.5] text-ink-body">{item.event}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="col-span-6 max-[900px]:col-span-1">
            <Frame
              src="/images/S1_update_v2/photos/Featured%20image%20options/Langley-event-3-2048x1536.jpg"
              alt="Circle of Life artwork in StreetBond at Langley Events Centre, installed by Square One Paving"
              caption="Langley Events Centre · StreetBond"
              aspect="aspect-[4/3]"
              sizes="(max-width: 900px) 100vw, 50vw"
            />

            <div className="mt-10 border-t border-hairline pt-6">
              <span className="label">Our mission</span>

              <blockquote className="m-0 mt-4 p-0">
                <p className="quote-display m-0 text-[24px] leading-[1.4] text-ink [text-wrap:pretty] max-[700px]:text-[21px]">
                  &ldquo;Build surfaces that perform as well as they look, and last.&rdquo;
                </p>
              </blockquote>

            </div>
          </div>
        </div>
      </Section>

      {/* ── 4 · What we install — four frames, captioned under, the whole tile a link ──────── */}
      <Section label="What we install" title={<>Four trades, <em>one standard</em></>} link={{ href: "/services", label: "All services" }} wide>
        <ul className="rail-m grid grid-cols-4 gap-x-6 gap-y-10 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {trades.map((t) => (
            <li key={t.href} className="relative">
              <Link href={t.href} aria-label={`${t.name}, the service`} className="absolute inset-0 z-[2]" />
              <Frame src={t.src} alt={t.alt} caption={t.caption} aspect="aspect-[4/3]" sizes="(max-width: 900px) 50vw, 25vw" />
              <h3 className="mt-5">{t.name}</h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-ink-body [text-wrap:pretty]">{t.line}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── 5 · How we work ──────── */}
      <Section label="How we work" title={<>Why <em>Square One</em></>} tone="warm" wide>
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 min-[901px]:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.title} className="border-t border-hairline pt-6">
              <h3>{principle.title}</h3>
              <p className="mt-2.5 max-w-[46ch] text-[16px] leading-[1.6] text-ink-body [text-wrap:pretty]">
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 6 · How a job goes — the one process band, with the crews on site ──────── */}
      <HowAJobGoes crews tone="paper" />

      {/* ── 7 · The work ────────
          Was the client list ("Installed at"). Off at the client's request,
          19 Sept 2026, until she confirms who Square One has worked for;
          lib/clients.ts keeps the names. */}
      <section className="sec relative overflow-hidden bg-surface-warm py-[6.5rem] max-[700px]:py-14">
        <div className="container-1280 relative z-[1]">
          <div className="grid grid-cols-12 gap-x-12 gap-y-12 max-[900px]:grid-cols-1">
            <div className="col-span-5 flex flex-col justify-center max-[900px]:col-span-1">
              <span className="label">The work</span>
              <p className="display-statement m-0 mt-5 max-w-[22ch] [text-wrap:balance]">
                Won in the open, <em>kept through winters</em>
              </p>
              <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.6] text-ink-body [text-wrap:pretty]">
                Municipal work is won in open tenders and kept by holding up. Ten kinds of it, each
                with a gallery of Square One&rsquo;s own installations.
              </p>
            </div>

            <div className="col-span-7 self-center max-[900px]:col-span-1">
              <ul className="grid grid-cols-3 gap-x-8 max-[700px]:grid-cols-2">
                {WORK_APPS.map((app) => (
                  <li key={app.slug} className="border-t border-hairline text-[16px] leading-[1.4]">
                    <Link
                      href={app.slug === "driveways" ? "/driveways#gallery" : `/applications/${app.slug}`}
                      className="block py-[12px] text-ink underline-offset-4 hover:underline"
                    >
                      {app.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 · Where we work ──────── */}
      <Section
        label="Regions"
        title={<>Where <em>we work</em></>}
        intro={
          <>
            One office in Maple Ridge, crews on both sides of the Strait, and the vapour blasting
            rig goes wherever the surface is.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-10 min-[701px]:grid-cols-2 min-[701px]:gap-6">
          <div className="border-t border-hairline pt-6">
            <span className="label">Office</span>
            <h3 className="mt-2">Maple Ridge, BC</h3>
            <p className="mt-2 text-[16px] leading-[1.6] text-ink-muted">
              19&ndash;11720 Stewart Crescent, V2X 9E7
            </p>
            <p className="mt-2 text-[16px] leading-[1.8]">
              <a href="tel:+16046126209" className="link">604-612-6209</a>
              {" · "}
              <a href="tel:+18773910270" className="link">1-877-391-0270</a>
            </p>
            <p className="mt-1 text-[16px] leading-[1.8]">
              <a href="mailto:office@squareonepaving.com" className="link">office@squareonepaving.com</a>
            </p>
          </div>

          <div className="border-t border-hairline pt-6">
            <span className="label">Service region</span>
            <h3 className="mt-2">Vancouver Island</h3>
            <p className="mt-2 text-[16px] leading-[1.6] text-ink-muted">
              Crews serve Greater Victoria, the Cowichan Valley and Nanaimo
            </p>
            <p className="mt-2 text-[16px] leading-[1.8]">
              <a href="tel:+12503910270" className="link">250-391-0270</a>
            </p>
          </div>
        </div>

        <p className="mt-10">
          {serviceRegions.map((region) => (
            <span key={region} className="tag">
              {region}
            </span>
          ))}
        </p>
        {/* No button here (28 Sept QA): the closing band right under this
            section carries the page's one "Get a quote". */}
      </Section>
    </main>
  )
}
