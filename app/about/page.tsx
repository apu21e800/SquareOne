import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { getWork, workCities } from "@/lib/work"
import { projects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "About Us | BC's Decorative Pavement Specialists Since 2000",
  description:
    "Square One Paving has installed decorative pavement across British Columbia since 2000 — installer of HUB Surface Systems products, serving Metro Vancouver, the Fraser Valley and Vancouver Island.",
  keywords: [
    "Square One Paving BC",
    "HUB Surface Systems installer BC",
    "decorative pavement contractor BC",
    "stamped asphalt contractor Vancouver",
  ],
  alternates: { canonical: "https://squareonepaving.ca/about" },
  openGraph: {
    title: "About Us | BC's Decorative Pavement Specialists Since 2000 | Square One Paving",
    description:
      "Square One Paving has installed decorative pavement across British Columbia since 2000 — cities, municipalities, developers and homeowners.",
    images: [{ url: "/images/hero/white-rock-marine-drive-wave-crosswalk.jpg", width: 1600, height: 1067, alt: "Artist-designed crosswalk on Marine Drive, White Rock, installed by Square One Paving" }],
  },
}

/**
 * About — rebuilt 5 Sept 2026 (Vern: "we don't need Jan and Gord's images,
 * so let's re-do the About page"). The work is the portrait.
 *
 *   1 Header            white  — the claim, the lede
 *   2 Photograph        full-bleed, one install, one caption (breath)
 *   3 Our story         warm,  hairline top + bottom — story, on the record, mission
 *   4 What we install   white  — the four trades, photographed
 *   5 How we work       warm,  hairline top + bottom — six principles
 *   6 Five steps        white
 *   7 Clients           warm,  hairline top + bottom
 *   8 Where we work     white
 *   9 Site Close        slate — rendered once by app/layout.tsx (Footer)
 *
 * Section 9 is the page's ONLY dark region. Nothing above it may go slate.
 * Maple Ridge is the office. Vancouver Island is a service region with its
 * own phone line, never an office.
 */

const trades: { name: string; line: string; href: string; src: string; alt: string }[] = [
  {
    name: "Stamped asphalt",
    line: "StreetPrint patterns pressed into hot asphalt — brick, cobble, slate and custom templates.",
    href: "/services/stamped-asphalt",
    src: "/images/hero/victoria-ellis-point-walkway-streetprint.jpg",
    alt: "British Cobble StreetPrint walkway at Ellis Point, Victoria",
  },
  {
    name: "Decorative coatings",
    line: "StreetBond and MMAX colour systems for asphalt and concrete — plazas, lanes, spray parks, driveways.",
    href: "/services/decorative-coatings",
    src: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
    alt: "StreetBond multicolour plaza at Joyce Station, Vancouver",
  },
  {
    name: "Preformed thermoplastic",
    line: "TrafficPatterns, DecoMark, DuraTherm and PreMark — crosswalks, symbols and public art fused into the road.",
    href: "/services/preformed-thermoplastic",
    src: "/images/projects/ubc-musqueam-crosswalk/ubc-musqueam-crosswalk-trafficpatterns-01.jpg",
    alt: "Musqueam crosswalk artwork at UBC, Vancouver",
  },
  {
    name: "Vapour blasting",
    line: "Surface cleaning, priming and graffiti removal with the mobile rig — the supporting service.",
    href: "/services/vapor-blasting",
    src: "/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg",
    alt: "Square One crew vapour blasting at Granville Island",
  },
]

const principles = [
  {
    title: "BC climate, by design",
    body: "Every system we install is specified for BC weather — wet winters, freeze-thaw cycles, marine UV. The right product in the wrong climate is a five-year repair bill.",
  },
  {
    title: "Precision installation",
    body: "Our team focuses on precision installation, proven materials and surface solutions engineered for long-term performance in real-world conditions.",
  },
  {
    title: "Both sides of the Strait",
    body: "One office in Maple Ridge, with crews serving the Lower Mainland and Vancouver Island. Most BC projects don't need a travel budget, and the mobile vapour blasting rig goes wherever the job is.",
  },
  {
    title: "Municipal discipline, residential care",
    body: "We build to the owner's specification on civic projects — layout, colour and tolerances signed off before the first pass — then bring the same discipline to a private driveway.",
  },
  {
    title: "Specified, not improvised",
    body: "StreetBond coatings carry HUB's limited warranty against manufacturing defects; StreetPrint is expected to last the life of the asphalt it is printed into. Every system goes down to its manufacturer's specification, and Square One stands behind the installation.",
  },
  {
    title: "End-to-end accountability",
    body: "Surface prep through final cure. One company, one phone number, one accountable team — from the site walk to the walk-through.",
  },
]

/* On the record — every figure below is counted from what this site publishes,
   by the same helpers the home page stats use, so the two can never drift. */
const timeline = [
  { year: "2000", event: "Square One Paving begins installing decorative pavement in British Columbia" },
  { year: String(projects.length), event: "published case studies, from Nanaimo to Kelowna" },
  { year: String(getWork().length), event: "site photographs on record, each captioned with the system and the place" },
  { year: "9", event: "HUB Surface Systems products installed, from StreetPrint to PreMark" },
  { year: String(workCities().length), event: "BC communities in the work record" },
]

const process = [
  { step: "01", title: "Site walk", body: "We measure, photograph and flag substrate issues on site." },
  { step: "02", title: "Specification", body: "Pattern, colours and product matched to traffic and budget." },
  { step: "03", title: "Surface prep", body: "Cleaning, and vapour blasting where the surface needs it." },
  { step: "04", title: "Application", body: "Installed by Square One's own crew, to the specification." },
  { step: "05", title: "Cure & walk-through", body: "Open to traffic on schedule; we walk the finished work with you." },
]

/* Owners and developers Square One has itself named as clients in its published project record. */
const clients: string[] = [
  "TransLink", "City of Vancouver", "UBC", "Musqueam", "City of Burnaby", "Vancouver Park Board",
  "City of New Westminster", "City of Langley", "Squamish Nation", "Polygon Realty", "Onni Group",
  "DAVA Developments",
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
          <div className="eyebrow">About Square One</div>

          <h1 className="stop mt-7 max-w-[18ch] [text-wrap:balance]">
            Decorative pavement since 2000
          </h1>

          <div className="mt-9 grid grid-cols-12 gap-x-10 gap-y-6 max-[900px]:grid-cols-1">
            <p className="col-span-7 max-w-[56ch] text-[19px] leading-[1.7] text-ink-body [text-wrap:pretty] max-[700px]:text-[17px]">
              Square One Paving has installed decorative pavement across British Columbia since
              2000, and is recognized as the most experienced decorative stamped asphalt applicator
              in Western Canada. Cities, municipalities, organizations, companies and private
              owners &mdash; from the Maple Ridge office to both sides of the Strait of Georgia.
            </p>
            <p className="col-span-5 max-w-[40ch] self-start pt-2 text-[15px] leading-[1.65] text-ink-muted max-[900px]:max-w-[56ch] max-[900px]:pt-0">
              Installer of HUB Surface Systems products &mdash; StreetPrint, StreetBond, MMAX,
              TrafficPatterns, TrafficPatternsXD, DecoMark, DuraTherm, PreMark and DuraShield
              &mdash; every one installed to its manufacturer&apos;s specification.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2 · Photograph — the work is the portrait ──────── */}
      <section className="relative h-[62vh] min-h-[420px] overflow-hidden bg-surface-stone">
        <Image
          src="/images/hero/white-rock-marine-drive-wave-crosswalk.jpg"
          alt="Artist-designed crosswalk of waves, sand and sky in TrafficPatterns on Marine Drive, White Rock, installed by Square One Paving"
          fill
          priority
          sizes="100vw"
          className="object-cover [object-position:center_60%]"
        />
        <div aria-hidden="true" className="scrim scrim-light" />
        <div className="caption">Marine Drive, White Rock &middot; TrafficPatterns &middot; 2025</div>
      </section>

      {/* ── 3 · Our story ──────── */}
      <section className="section border-b border-[color:var(--hairline)] bg-surface-warm">
        <div className="container-1280">
          <div className="grid grid-cols-1 gap-14 min-[901px]:grid-cols-2 min-[901px]:gap-x-20">
            <div>
              <div className="eyebrow">Our story</div>

              <h2 className="mt-5">One trade, done properly</h2>

              <div className="mt-8 space-y-5 text-[16px] leading-[1.7] text-ink-body">
                <p>
                  Square One Paving started in 2000 doing one thing: decorative pavement, in BC,
                  through BC weather. Twenty-five years on, the work has earned a longstanding
                  reputation for quality installations of stamped asphalt, StreetBond coatings and
                  decorative preformed thermoplastics &mdash; and the people who quote a job are
                  still the people who stand behind it.
                </p>
                <p>
                  The practice has settled around four trades &mdash; stamped asphalt, decorative
                  coatings, preformed thermoplastic and, as the supporting service, vapour
                  blasting. Every system we install is specified for Canadian conditions and goes
                  down to its manufacturer&apos;s specification.
                </p>
                <p>
                  Today Square One works out of Maple Ridge, with crews serving the Lower Mainland
                  and Vancouver Island &mdash; TransLink, UBC, the cities and districts, the
                  developers, the strata councils, the families. The mobile vapour blasting rig
                  goes wherever the surface is.
                </p>
              </div>

              <div className="mt-12">
                <div className="label">On the record</div>

                <ol className="mt-5 border-t border-[color:var(--hairline)]">
                  {timeline.map((item) => (
                    <li
                      key={item.year}
                      className="grid grid-cols-[72px_1fr] items-baseline gap-6 border-b border-[color:var(--hairline)] py-4"
                    >
                      <span className="text-[22px] font-medium [font-family:var(--font-display)] leading-none tracking-[-0.01em] text-ink">
                        {item.year}
                      </span>
                      <span className="text-[15px] leading-[1.55] text-ink-body">{item.event}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <figure className="relative m-0 aspect-[4/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
                <Image
                  src="/images/S1_update_v2/photos/Featured%20image%20options/Langley-event-3-2048x1536.jpg"
                  alt="Circle of Life artwork in StreetBond at Langley Events Centre, installed by Square One Paving"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="object-cover"
                />
                <div aria-hidden="true" className="scrim scrim-light" />
                <figcaption className="caption">
                  Langley Events Centre &middot; StreetBond
                </figcaption>
              </figure>

              <div className="rounded-[2px] border border-[color:var(--hairline)] bg-[color:var(--surface)] p-8 max-[700px]:p-6">
                <div className="label">Our mission</div>

                <blockquote className="m-0 mt-5 p-0">
                  <p className="quote-display m-0 text-[24px] leading-[1.4] text-ink [text-wrap:pretty] max-[700px]:text-[21px]">
                    &ldquo;Build surfaces that perform as good as they look &mdash; and last.&rdquo;
                  </p>
                </blockquote>

                <p className="mt-6 text-[15px] leading-[1.65] text-ink-body">
                  Decorative pavement is the part of public infrastructure thousands of people
                  cross every day without noticing. We notice. And we make sure it&apos;s the part
                  of the streetscape that gets better with time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 · What we install ──────── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">What we install</div>
              <h2 className="mt-4">Four trades, one crew</h2>
            </div>
            <Link href="/services" className="arrow-link whitespace-nowrap">
              All services <span>&rarr;</span>
            </Link>
          </div>

          <div className="rail-m mt-10 grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            {trades.map((t) => (
              <Link key={t.href} href={t.href} className="card group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
                  <Image src={t.src} alt={t.alt} fill sizes="(max-width: 900px) 50vw, 25vw" className="object-cover" />
                </div>
                <h3 className="mt-5">{t.name}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-body [text-wrap:pretty]">{t.line}</p>
                <span className="arrow-link mt-3 inline-block">
                  Explore <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 · How we work ──────── */}
      <section className="section border-y border-[color:var(--hairline)] bg-surface-warm">
        <div className="container-1280">
          <div className="eyebrow">How we work</div>
          <h2 className="mt-4">Why Square One</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-16 gap-y-12 min-[701px]:grid-cols-2 min-[1101px]:grid-cols-3">
            {principles.map((principle) => (
              <div key={principle.title} className="border-t border-[color:var(--hairline)] pt-6">
                <h3>{principle.title}</h3>
                <p className="mt-2.5 max-w-[46ch] text-[15px] leading-[1.65] text-ink-body">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 · Five steps, one crew ──────── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <div className="eyebrow">From the site walk to the walk-through</div>
          <h2 className="mt-4">Five steps, one crew</h2>

          <div className="mt-10 grid grid-cols-1 gap-10 min-[701px]:grid-cols-2 min-[1001px]:grid-cols-5">
            {process.map((item) => (
              <div key={item.step} className="border-t border-[color:var(--hairline)] pt-7">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                  {item.step}
                </div>
                <h3 className="mt-4">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 · Clients ──────── */}
      <section className="section border-y border-[color:var(--hairline)] bg-surface-warm">
        <div className="container-1280">
          <div className="eyebrow">Client organizations since 2000</div>

          <div className="mt-8 flex max-w-[1080px] flex-wrap gap-x-11 gap-y-3.5">
            {clients.map((client) => (
              <span key={client} className="text-[16px] font-medium text-ink-body">
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8 · Where we work ──────── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <h2>Where we work</h2>

          <p className="mt-7 max-w-[56ch] text-[17px] leading-[1.65] text-ink-body [text-wrap:pretty]">
            One office in Maple Ridge, crews on both sides of the Strait. Vancouver, Surrey,
            Burnaby, Richmond, Victoria, Nanaimo and Ladysmith are among the communities we serve &mdash;
            and the mobile vapour blasting rig goes wherever the surface is.
          </p>

          <div className="mt-11 grid grid-cols-1 gap-12 min-[701px]:grid-cols-2 min-[701px]:gap-6">
            <div className="border-t border-[color:var(--hairline)] pt-6">
              <div className="label">Office</div>
              <h3 className="mt-2">Maple Ridge, BC</h3>
              <p className="mt-1.5 text-[15px] leading-[1.6] text-ink-muted">
                505&ndash;20800 Lougheed Highway, V2X 3P2
              </p>
              <p className="mt-1.5 text-[15px] leading-[1.6] text-ink-muted">
                <a href="tel:+16044669902">604-466-9902</a>
                {" · "}
                <a href="tel:+18773910270">1-877-391-0270</a>
              </p>
              <p className="mt-1.5 text-[15px] leading-[1.6]">
                <a href="mailto:office@squareonepaving.com">office@squareonepaving.com</a>
              </p>
            </div>

            <div className="border-t border-[color:var(--hairline)] pt-6">
              <div className="label">Service region</div>
              <h3 className="mt-2">Vancouver Island</h3>
              <p className="mt-1.5 text-[15px] leading-[1.6] text-ink-muted">
                Crews serve Greater Victoria, the Cowichan Valley and Nanaimo
              </p>
              <p className="mt-1.5 text-[15px] leading-[1.6] text-ink-muted">
                <a href="tel:+12503910270">250-391-0270</a>
              </p>
            </div>
          </div>

          <div className="mt-11 flex flex-wrap gap-2.5">
            {serviceRegions.map((region) => (
              <span key={region} className="tag">
                {region}
              </span>
            ))}
          </div>

          <div className="mt-11">
            <Link href="/contact" className="btn-primary">
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
