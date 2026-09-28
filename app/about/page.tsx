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

const trades: { name: string; line: string; href: string; src: string; alt: string; caption: string }[] = [
  {
    name: "Stamped asphalt",
    line: "StreetPrint patterns pressed into the asphalt itself (brick, cobble, slate and custom templates) and TrafficPatternsXD for the busiest crossings.",
    href: "/services/stamped-asphalt",
    src: "/images/hero/victoria-ellis-point-walkway-streetprint.jpg",
    alt: "Brick-red cobble StreetPrint stamped asphalt walkway beside a timber rail at Ellis Point, Victoria",
    caption: "Ellis Point, Victoria · StreetPrint",
  },
  {
    name: "Decorative coatings",
    line: "StreetBond colour on asphalt and concrete: bike lanes, plazas, spray parks, courts and driveways.",
    href: "/services/decorative-coatings",
    src: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
    alt: "Multicolour StreetBond plaza under the SkyTrain guideway at Joyce Station, Vancouver, at dusk",
    caption: "Joyce Station, Vancouver · StreetBond",
  },
  {
    name: "Preformed thermoplastic",
    line: "TrafficPatterns, DecoMark, DuraTherm and PreMark: crosswalks, symbols and public art heat-fused into the road.",
    href: "/services/preformed-thermoplastic",
    src: "/images/projects/ubc-musqueam-crosswalk/ubc-musqueam-crosswalk-trafficpatterns-01.jpg",
    alt: "A bus crossing the blue and green TrafficPatterns crosswalk of the UBC and Musqueam crests at University Boulevard, Vancouver",
    caption: "University Boulevard, Vancouver · TrafficPatterns",
  },
  {
    name: "Vapour blasting",
    line: "Surface cleaning, priming, and graffiti and marking removal with the mobile rig, the supporting service.",
    href: "/services/vapor-blasting",
    src: "/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg",
    alt: "Square One crew vapour blasting at Granville Island",
    caption: "Granville Island, Vancouver · vapour blasting",
  },
]

/* Six things a specifier or a homeowner can hold Square One to. Every line
   restates something on the record — HUB's published product facts
   (lib/products.ts, attributed), the contact canon, or the warranty split —
   and nothing about crews, budgets or timelines that Square One has not
   published. */
const principles = [
  {
    title: "Built for BC weather",
    body: "Every system Square One installs has published performance from its manufacturer: StreetPrint's textured surface is slip-resistant and safe for snowploughs and de-icing salt, and StreetBond is UV-stable with an anti-skid aggregate for wet surfaces.",
  },
  {
    title: "Two kinds of stamped asphalt",
    body: "StreetPrint presses the pattern into the asphalt itself. TrafficPatternsXD is the heavy-duty kind: aggregate-reinforced thermoplastic, heated and stamped into the top of the asphalt for the busiest intersections and transit corridors. The site decides which.",
  },
  {
    title: "Both sides of the Strait",
    body: "One office in Maple Ridge, with crews serving the Lower Mainland and Vancouver Island, and a line of its own for the Island, 250-391-0270. The mobile vapour blasting rig goes wherever the job is.",
  },
  {
    title: "Municipal discipline, residential care",
    body: "Civic work goes in to the owner's marking standard: colours, layout and symbols as specified. A private driveway gets the same crews and the same manufacturer's specification.",
  },
  {
    title: "Two warranties, one installer",
    body: "The manufacturer warrants the material, under its limited warranty against manufacturing defects. Square One warrants the workmanship: every system goes down to the manufacturer's published specification, by Square One's own crews.",
  },
  {
    title: "From the site visit to the walk-through",
    body: "Surface prep through final cure is one company's responsibility. The site visit is free, the quote is written, and we walk the finished surface with you before we leave it.",
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
          <span className="label">About Square One</span>

          <h1 className="mt-6 max-w-[18ch] [text-wrap:balance]">
            Decorative pavement in BC since 2000
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
              Square One Paving has installed decorative pavement across British Columbia since
              2000: municipal crosswalks and streetscapes, transit plazas, school grounds,
              parks, commercial sites and private driveways, from one office in Maple Ridge to
              both sides of the Strait of Georgia.
            </p>
            <p className="col-span-5 max-w-[40ch] self-start pt-2 text-[16px] leading-[1.6] text-ink-muted max-[900px]:max-w-[56ch] max-[900px]:pt-0">
              Decorative pavement installers (stamped asphalt, coatings and preformed
              thermoplastic) since 2000: StreetPrint&reg;, StreetBond&reg;, TrafficPatterns&trade;,
              TrafficPatternsXD&trade;, DecoMark, DuraTherm, PreMark and DuraShield, every one
              installed to its manufacturer&apos;s specification.
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
      <Section label="Our story" title="One trade, done properly" tone="warm" wide>
        <div className="grid grid-cols-12 gap-x-10 gap-y-14 max-[900px]:grid-cols-1">
          <div className="col-span-6 max-[900px]:col-span-1">
            <div className="max-w-[58ch] space-y-5 text-ink-body [text-wrap:pretty]">
              <p>
                Square One Paving started in 2000 doing one thing: decorative pavement, in BC,
                through BC weather. Twenty-five years on it still does one thing (stamped
                asphalt, StreetBond coatings and preformed thermoplastic, installed by its own
                crews) and it warrants the workmanship of every installation.
              </p>
              <p>
                The practice has settled around four trades:{" "}
                <Link href="/services/stamped-asphalt" className="link">stamped asphalt</Link>,{" "}
                <Link href="/services/decorative-coatings" className="link">decorative coatings</Link>,{" "}
                <Link href="/services/preformed-thermoplastic" className="link">preformed thermoplastic</Link>{" "}
                and, as the supporting service,{" "}
                <Link href="/services/vapor-blasting" className="link">vapour blasting</Link>.
                Every pavement system goes down to its manufacturer&apos;s published
                specification.
              </p>
              <p>
                Today Square One works out of Maple Ridge, with crews serving the Lower Mainland
                and Vancouver Island: municipal streets and plazas, campuses and school
                grounds, strata lanes and family driveways. The mobile vapour blasting rig goes
                wherever the surface is.
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

              <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-ink-body [text-wrap:pretty]">
                Decorative pavement is the part of public infrastructure thousands of people
                cross every day without noticing. We notice, and we install it to hold
                its pattern and its colour for the service life the manufacturer publishes.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 4 · What we install — four frames, captioned under, the whole tile a link ──────── */}
      <Section label="What we install" title="Four trades, one standard" link={{ href: "/services", label: "All services" }} wide>
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
      <Section label="How we work" title="Why Square One" tone="warm" wide>
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 min-[701px]:grid-cols-2 min-[1101px]:grid-cols-3">
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
                Won in the open, kept through winters
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
        title="Where we work"
        intro={
          <>
            One office in Maple Ridge, crews on both sides of the Strait. Vancouver, Surrey,
            Burnaby, Richmond, Victoria, Nanaimo and Ladysmith are among the communities we serve,
            and the mobile vapour blasting rig goes wherever the surface is. The{" "}
            <Link href="/galleries" className="link">
              galleries
            </Link>{" "}
            show the work by system and by region, and the{" "}
            <Link href="/projects" className="link">
              projects
            </Link>{" "}
            tell it in full.
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

        <div className="mt-10">
          <Link href="/contact" className="btn-primary">
            Start a project
          </Link>
        </div>
      </Section>
    </main>
  )
}
