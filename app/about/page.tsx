import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | BC's Decorative Pavement Specialists Since 2000",
  description:
    "Jan Stewart and the Square One team have been BC's go-to decorative pavement applicators since 2000 — HUB Surface Systems certified, serving Metro Vancouver, Fraser Valley, and Vancouver Island.",
  keywords: [
    "Square One Paving BC",
    "Jan Stewart paving contractor BC",
    "HUB Surface Systems certified BC",
    "decorative pavement contractor BC",
  ],
  alternates: { canonical: "https://squareonepaving.ca/about" },
  openGraph: {
    title: "About Us | BC's Decorative Pavement Specialists Since 2000 | Square One Paving",
    description:
      "Jan Stewart and the Square One team have been BC's go-to decorative pavement applicators since 2000.",
  },
}

/**
 * About — docs/design-v2/About.dc.html
 *
 *   1 Header            white
 *   2 The people        white  (continues the header block)
 *   3 Our story         warm,  hairline top + bottom
 *   4 Why Square One    white
 *   5 Five steps        warm,  hairline top + bottom
 *   6 Clients           white
 *   7 Where we work     warm,  hairline top
 *   8 Site Close        slate — rendered once by app/layout.tsx (Footer)
 *
 * Section 08 is the page's ONLY dark region. Nothing above it may go slate.
 * Maple Ridge is the office. Vancouver Island — Ladysmith included — is a
 * service region, never an office.
 */

/** Portrait tiles are flat stone with initials until real headshots land in /public/images/about. */
const people = [
  {
    initials: "GS",
    name: "Gord Stewart",
    bio: "On BC pavement since the first StreetPrint rig arrived in 2000.",
  },
  {
    initials: "JS",
    name: "Jan Stewart",
    bio: "Runs the estimating desk; every quote ties to a site we have walked.",
  },
]

const principles = [
  {
    title: "BC climate, by design",
    body: "Every system we install is specified for BC weather — wet winters, freeze-thaw cycles, marine UV. The right product in the wrong climate is a five-year repair bill.",
  },
  {
    title: "No subcontractors",
    body: "Same crews since 2000. The applicators on your job have ten-plus years of HUB Surface Systems experience. We don't sub out the install.",
  },
  {
    title: "Both sides of the Strait",
    body: "One office in Maple Ridge, with crews serving the Lower Mainland and Vancouver Island. Most BC projects don't need a travel budget, and the mobile vapour blasting rig goes wherever the job is.",
  },
  {
    title: "Municipal discipline, residential care",
    body: "We build to Vision Zero, Complete Streets and AODA standards on civic projects — then bring the same discipline to a private driveway.",
  },
  {
    title: "Warrantied systems",
    body: "StreetBond, TrafficPatterns, StreetPrint — all carry 8+ year manufacturer performance warranties when properly installed. We install them properly.",
  },
  {
    title: "End-to-end accountability",
    body: "Surface prep through final cure. One company, one phone number, one accountable team. From the site walk to the eight-year inspection.",
  },
]

const timeline = [
  { year: "2000", event: "Square One Paving founded in BC" },
  { year: "2005", event: "First StreetPrint stamped asphalt installations" },
  { year: "2012", event: "Vancouver Island operations launched" },
  { year: "2018", event: "Mobile vapour blasting service added" },
  { year: "2024", event: "100+ municipal and commercial projects completed" },
  { year: "2026", event: "51+ BC communities served" },
]

const process = [
  { step: "01", title: "Site walk", body: "We measure, photograph and flag substrate issues on site." },
  { step: "02", title: "Specification", body: "Pattern, colours and product matched to traffic and budget." },
  { step: "03", title: "Surface prep", body: "Cleaning, and vapour blasting where the surface needs it." },
  { step: "04", title: "Application", body: "Installed by our own crews, never subcontracted." },
  { step: "05", title: "Cure & walk-through", body: "Open to traffic on schedule; we walk the finished work with you." },
]

const clients: string[] = [
  "City of Vancouver", "City of Victoria", "TransLink", "BC Transit", "City of Richmond", "Burnaby",
  "Coquitlam", "Nanaimo", "Surrey", "Langley", "UBC", "BC Housing", "District of Saanich",
  "Capital Regional District", "Sechelt", "White Rock", "Kelowna", "Mission",
]

const serviceRegions = [
  "Greater Vancouver",
  "Fraser Valley",
  "Sunshine Coast",
  "Vancouver Island",
  "Gulf Islands",
]

export default function AboutPage() {
  return (
    <main>
      {/* ── 1 · Header ─────────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <div className="eyebrow">The studio</div>

          <h1 className="stop mt-7 max-w-[18ch] [text-wrap:balance]">
            Same crews since 2000
          </h1>

          <p className="mt-7 max-w-[56ch] text-[19px] leading-[1.7] text-ink-body [text-wrap:pretty] max-[700px]:text-[17px]">
            Square One Paving has installed decorative pavement across British Columbia since 2000,
            and is recognized as the most experienced decorative stamped asphalt applicator in
            Western Canada. The crews that stamped our first crosswalks still run our installs
            today, from our Maple Ridge base to both sides of the Strait of Georgia.
          </p>
        </div>
      </section>

      {/* ── 2 · The people ─────────────────────────────────────── */}
      <section className="bg-surface pb-28 max-[700px]:pb-14">
        <div className="container-1280">
          <h2>The people</h2>

          <div className="mt-10 grid max-w-[880px] grid-cols-1 gap-12 min-[701px]:grid-cols-2 min-[701px]:gap-6">
            {people.map((person) => (
              <div key={person.name}>
                <div className="relative aspect-[4/5] max-w-[320px] overflow-hidden rounded-[2px] border border-[color:var(--hairline)] bg-[color:var(--surface-stone)]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center text-[64px] font-semibold [font-family:var(--font-display)] tracking-[-0.01em] text-[rgba(20,22,26,0.22)]"
                  >
                    {person.initials}
                  </span>
                </div>

                <h3 className="mt-[18px]">{person.name}</h3>

                <p className="mt-1.5 max-w-[36ch] text-[15px] leading-[1.6] text-ink-muted">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Our story ──────────────────────────────────────── */}
      <section className="section border-y border-[color:var(--hairline)] bg-surface-warm">
        <div className="container-1280">
          <div className="grid grid-cols-1 gap-14 min-[901px]:grid-cols-2 min-[901px]:gap-x-20">
            <div>
              <div className="eyebrow">Our story</div>

              <h2 className="mt-5">One trade, done properly</h2>

              <div className="mt-8 space-y-5 text-[16px] leading-[1.65] text-ink-body">
                <p>
                  Square One Paving started in 2000 doing one thing: decorative pavement, in BC,
                  through BC weather. The first crosswalks and driveways we imprinted are still
                  underfoot. What has not changed since is how the work gets done — the same
                  crews walk the site, quote it, and stand behind it.
                </p>
                <p>
                  Over twenty-five years we&apos;ve built the practice around four decorative
                  pavement systems — stamped asphalt, decorative coatings, preformed thermoplastic
                  and vapour blasting. Each one is engineered for Canadian conditions and backed by
                  a manufacturer warranty.
                </p>
                <p>
                  Today Square One works out of Maple Ridge, with crews serving every municipality
                  and authority south of Prince George. TransLink, BC Transit, UBC, the cities, the
                  school districts, the strata councils, the families. The mobile vapour blasting
                  unit goes wherever the surface is.
                </p>
              </div>

              <div className="mt-12">
                <div className="label">Milestones</div>

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

            <div>
              <figure className="relative m-0 aspect-[4/5] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
                <Image
                  src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
                  alt="Gated estate driveway in herringbone-stamped asphalt by Square One Paving"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="object-cover"
                />
                <div aria-hidden="true" className="scrim scrim-light" />
                <figcaption className="caption">
                  Vancouver Island &middot; Custom stamped asphalt
                </figcaption>
              </figure>

              <div className="mt-6 rounded-[2px] border border-[color:var(--hairline)] bg-[color:var(--surface)] p-8 max-[700px]:p-6">
                <div className="label">Our mission</div>

                <blockquote className="m-0 mt-5 p-0">
                  <p className="quote-display m-0 text-[24px] leading-[1.4] text-ink [text-wrap:pretty] max-[700px]:text-[21px]">
                    &ldquo;Build surfaces that perform as good as they look — and last.&rdquo;
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

      {/* ── 4 · Why Square One ─────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <h2>Why Square One</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-24 gap-y-14 min-[701px]:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title} className="border-t border-[color:var(--hairline)] pt-6">
                <h3>{principle.title}</h3>
                <p className="mt-2.5 max-w-[52ch] text-[15px] leading-[1.65] text-ink-body">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 · Five steps, one crew ───────────────────────────── */}
      <section className="section border-y border-[color:var(--hairline)] bg-surface-warm">
        <div className="container-1280">
          <h2>Five steps, one crew</h2>

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

      {/* ── 6 · Clients ────────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <div className="eyebrow">Client organizations since 2000</div>

          <div className="mt-8 flex max-w-[1080px] flex-wrap gap-x-11 gap-y-3.5">
            {clients.map((client) => (
              <span key={client} className="text-[15px] font-medium text-ink-muted">
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 · Where we work ──────────────────────────────────── */}
      <section className="section border-t border-[color:var(--hairline)] bg-surface-warm">
        <div className="container-1280">
          <h2>Where we work</h2>

          <p className="mt-7 max-w-[56ch] text-[17px] leading-[1.65] text-ink-body [text-wrap:pretty]">
            One office in Maple Ridge, crews on both sides of the Strait. Vancouver, Surrey,
            Burnaby, Richmond, Victoria, Nanaimo and Ladysmith are among the communities we serve —
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
                Crews serve the Island and the Gulf Islands
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
