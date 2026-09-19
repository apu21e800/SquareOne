import Image from "next/image"
import Link from "next/link"
import QuoteForm from "@/components/contact/QuoteForm"
import { workMunicipalities } from "@/lib/work"

/* Contact — rebuilt for the fourth time, 19 Sept 2026 (Vern, with the live
   page in front of him: "contact page is still boring"; "no sucky images,
   good ones only"). The three earlier versions each fixed one thing — the
   form's grouping (11 Sept), the wall of text (17 Sept), the type (19
   Sept) — and the page was still a dim photograph, a headline that repeated
   the button, and a form. Every other page on the site now opens on a
   scene; this one opened on a driveway at dusk under a scrim.

   What the page is now, top to bottom:

     opener   a split, on the light surface, no scrim: the invitation on the
              left with the three lines and the mailbox set large — most
              people who reach a contractor's contact page want the number —
              and, on the right, the crew on site at the Spirit Trail in West
              Vancouver (a frame from the record; a passer-by cropped out)
     form     the quote form, unchanged in what it sends, in a titled card;
              beside it the office, the mailbox, what to send, and the two
              shortcuts (a homeowner to the patterns, a specifier to the
              library)
     next     on white: the three steps from a message to a written quote,
              each with its line, against the StreetHeat rig mid-install at
              KB Woodward — how the work is actually done
     where    the two regions with their lines, each on a frame from the
              record, and the municipalities the record carries — drawn from
              lib/work.ts, never typed

   Nothing here is new to the record: the free site visit, the sample boards,
   the written quote, the warranty split, the office, the three lines, the
   regions, the cities. Office hours are still not on record, so they are
   still not here. */

const OPENER = {
  src: "/images/contact/west-vancouver-spirit-trail-crew-on-site-streetbond.jpg",
  alt: "A Square One crew member in a hard hat and high-visibility vest waving a vintage car across a freshly coated StreetBond crossing on the Spirit Trail in West Vancouver",
  caption: "West Vancouver · Spirit Trail · StreetBond",
}

const LINES = [
  { region: "Lower Mainland", display: "604-612-6209", href: "tel:+16046126209" },
  { region: "Vancouver Island", display: "250-391-0270", href: "tel:+12503910270" },
  { region: "Toll-free", display: "1-877-391-0270", href: "tel:+18773910270" },
]

const STEPS = [
  {
    n: "01",
    title: "Tell us the job",
    body: "A description and a location. Photos of the surface as it is and a rough area help; drawings help more.",
  },
  {
    n: "02",
    title: "We walk the site",
    body: "Free, across the Lower Mainland and Vancouver Island. The sample boards come along, so pattern and colour are chosen on the surface they will go on.",
  },
  {
    n: "03",
    title: "You get a written quote",
    body: "From the crew who install it, to the published specification. The manufacturer warrants the material; Square One warrants the workmanship.",
  },
]

const PROCESS = {
  src: "/images/applications/schools-sports-courts/surrey-kb-woodward-installation-decomark-01.jpg",
  alt: "The infrared heater rig parked on a freshly laid grey octagon with blue web lines mid-install at KB Woodward school, Surrey",
  caption: "Surrey · KB Woodward · DecoMark, mid-install",
}

const REGIONS = [
  {
    name: "Lower Mainland",
    line: LINES[0],
    where: "The office, 19–11720 Stewart Crescent, Maple Ridge",
    src: "/images/applications/public-art/vancouver-18th-and-cambie-crossing-streetbond-01.jpg",
    alt: "A StreetBond street mural in green, cream, lilac and red rolling across the crossing at 18th and Cambie, Vancouver, on a sunny afternoon",
    caption: "Vancouver · 18th and Cambie · StreetBond",
    cities: workMunicipalities("Lower Mainland"),
  },
  {
    name: "Vancouver Island",
    line: LINES[1],
    where: "A service region with its own line — the crew comes over",
    src: "/images/applications/public-art/oak-bay-village-intersection-wide-streetbond-01.jpg",
    alt: "A painted medallion of a heron and a salmon in StreetBond filling the Oak Bay Village intersection, seen from above",
    caption: "Oak Bay · Village intersection · StreetBond",
    cities: workMunicipalities("Vancouver Island"),
  },
]

function RailBlock({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-hairline py-6 first:pt-0">
      <div className="label">{heading}</div>
      {children}
    </div>
  )
}

export default function ContactPage() {
  return (
    <main className="bg-surface">
      {/* ── Opener — the invitation, the lines, the crew on site ──────── */}
      <section className="relative grid min-h-[680px] grid-cols-[52fr_48fr] overflow-hidden bg-surface pt-[var(--bar-h)] max-[900px]:min-h-0 max-[900px]:grid-cols-1">
        <div
          className="
            relative flex items-center
            pt-20 pb-20 pr-[72px] pl-[max(calc((100vw_-_1280px)/2),40px)]
            max-[900px]:pt-14 max-[900px]:pr-6 max-[900px]:pb-12 max-[900px]:pl-6
          "
        >
          <div className="relative z-[1] w-full max-w-[560px]">
            <p className="eyebrow">Contact &middot; Free site visit</p>
            <h1 className="h1-tight mt-6 [text-wrap:balance]">Tell us the job. We&rsquo;ll walk the site.</h1>
            <p className="mt-6 max-w-[50ch] text-[18px] leading-[1.65] text-ink-body [text-wrap:pretty] max-[700px]:text-[17px]">
              A crosswalk, a plaza, a parking area, a driveway &mdash; a description and a location
              are enough to start, and drawings help. The site visit is free across the Lower Mainland
              and Vancouver Island, the sample boards come along, and the quote is written by the
              crew who install it.
            </p>

            <dl className="mt-11 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-hairline pt-8 max-[420px]:grid-cols-1 max-[420px]:gap-y-1">
              {LINES.map((l) => (
                <div key={l.href} className="contents">
                  <dt className="self-baseline text-[13px] font-medium tracking-[0.02em] text-ink-muted max-[420px]:mt-3">{l.region}</dt>
                  <dd>
                    <a
                      href={l.href}
                      className="font-[family-name:var(--font-display)] text-[1.625rem] font-bold leading-[1.15] tracking-[-0.015em] tabular-nums text-ink transition-colors hover:text-[color:var(--accent-deep)] max-[700px]:text-[1.375rem]"
                    >
                      {l.display}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="contents">
                <dt className="self-baseline text-[13px] font-medium tracking-[0.02em] text-ink-muted max-[420px]:mt-3">Email</dt>
                <dd>
                  <a
                    href="mailto:office@squareonepaving.com"
                    className="font-[family-name:var(--font-display)] text-[1.375rem] font-bold leading-[1.2] tracking-[-0.01em] text-ink transition-colors hover:text-[color:var(--accent-deep)] max-[700px]:text-[1.1875rem] max-[420px]:break-all"
                  >
                    office@squareonepaving.com
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-9">
              <a href="#quote" className="btn-primary">Request a quote</a>
            </div>
          </div>
        </div>

        <div className="relative min-w-0 overflow-hidden bg-surface-stone max-[900px]:aspect-[4/3]">
          <Image
            src={OPENER.src}
            alt={OPENER.alt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
            className="object-cover [object-position:8%_62%]"
          />
          <div aria-hidden="true" className="scrim scrim-light" />
          <div className="caption">{OPENER.caption}</div>
        </div>
      </section>

      {/* ── The form, and the office beside it ──────── */}
      <section className="border-t border-hairline bg-surface-warm py-24 max-[700px]:py-14">
        <div className="container-1280 grid grid-cols-12 items-start gap-x-12 gap-y-14 max-[900px]:grid-cols-1">
          <div className="col-span-7 max-[900px]:col-span-1">
            <QuoteForm />
          </div>

          <aside className="col-span-5 max-[900px]:col-span-1 min-[901px]:pl-4">
            <RailBlock heading="Office">
              <address className="mt-[10px] text-[1.25rem] font-semibold not-italic leading-[1.4] tracking-[-0.015em] text-ink">
                19&ndash;11720 Stewart Crescent
              </address>
              <p className="mt-1 text-[14px] text-ink-muted">Maple Ridge, BC V2X 9E7</p>
            </RailBlock>

            <RailBlock heading="What to send">
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-[9px] text-[14px] leading-[1.4] text-ink-body max-[420px]:grid-cols-1">
                <li>Photos of the surface as it is</li>
                <li>The address or postal code</li>
                <li>Drawings or a sketch, if you have them</li>
                <li>A rough area in square metres</li>
                <li>When you need it done</li>
              </ul>
              <p className="mt-4 text-[13px] leading-[1.5] text-ink-muted">
                Photos and drawings go by email to{" "}
                <a href="mailto:office@squareonepaving.com" className="font-medium text-ink-body">office@squareonepaving.com</a>
                {" "}&mdash; put the site address in the subject line.
              </p>
            </RailBlock>

            <RailBlock heading="Two shortcuts">
              <ul className="mt-3 flex flex-col gap-[14px]">
                <li>
                  <Link href="/driveways#patterns" className="arrow-link">
                    Building a driveway? See the patterns first <span aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
                <li>
                  <Link href="/specifiers" className="arrow-link">
                    Writing a spec? Drawings, sheets and documents <span aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              </ul>
            </RailBlock>

            <div className="mt-7 flex items-center gap-4">
              <Image
                src="/images/S1_update_v2/Old%20Square%20One%20Web%20Assets/Contact%20Page/BBB-Logo.png"
                alt="BBB Accredited Business seal"
                width={131}
                height={51}
                className="h-8 w-auto flex-shrink-0"
              />
              <p className="text-[13px] leading-[1.5] text-ink-muted">Decorative pavement across BC since 2000</p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── What happens next — the three steps, and how the work is done ──────── */}
      <section className="relative overflow-hidden border-t border-hairline bg-surface py-[7rem] max-[900px]:py-16">
        <div className="container-1280 relative z-[1] grid grid-cols-12 items-center gap-x-14 gap-y-12 max-[900px]:grid-cols-1">
          <div className="col-span-6 max-[900px]:col-span-1">
            <p className="eyebrow">What happens next</p>
            <h2 className="mt-5 max-w-[18ch] [text-wrap:balance]">From a message to a written quote</h2>
            <ol className="mt-10 flex flex-col">
              {STEPS.map((s) => (
                <li key={s.n} className="grid grid-cols-[52px_1fr] gap-x-5 border-t py-7 first:pt-0 first:border-t-0 max-[420px]:grid-cols-[40px_1fr]" style={{ borderColor: "var(--hairline)" }}>
                  <span className="label pt-[3px] text-[color:var(--accent-deep)]">{s.n}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p className="mt-2 max-w-[46ch] text-[15.5px] leading-[1.6] text-ink-body [text-wrap:pretty]">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="col-span-6 max-[900px]:col-span-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-stone shadow-[0_18px_44px_rgba(20,22,26,0.14)]">
              <Image
                src={PROCESS.src}
                alt={PROCESS.alt}
                fill
                sizes="(max-width: 900px) 100vw, 560px"
                className="object-cover"
              />
              <div aria-hidden="true" className="scrim scrim-light" />
              <div className="caption">{PROCESS.caption}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Where we work — two regions, two lines, the record's cities ──────── */}
      <section className="section border-t border-hairline bg-surface-warm">
        <div className="container-1280">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Where we work</p>
              <h2 className="mt-5 max-w-[20ch] [text-wrap:balance]">Lower Mainland and Vancouver Island</h2>
              <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.65] text-ink-body [text-wrap:pretty]">
                The office is in Maple Ridge and the Island has its own line. The record also runs
                to Squamish, Sechelt and the Okanagan when the job calls for it.
              </p>
            </div>
            <Link href="/projects" className="arrow-link whitespace-nowrap">
              All projects <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 max-[900px]:grid-cols-1">
            {REGIONS.map((r) => (
              <article key={r.name} className="flex flex-col overflow-hidden rounded-[2px] border border-hairline bg-white">
                <div className="relative aspect-[3/2] overflow-hidden bg-surface-stone">
                  <Image
                    src={r.src}
                    alt={r.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 616px"
                    className="object-cover"
                  />
                  <div aria-hidden="true" className="scrim scrim-light" />
                  <div className="caption">{r.caption}</div>
                </div>
                <div className="flex flex-1 flex-col p-8 max-[700px]:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3>{r.name}</h3>
                    <a
                      href={r.line.href}
                      className="font-[family-name:var(--font-display)] text-[1.375rem] font-bold leading-[1.2] tracking-[-0.012em] tabular-nums text-ink transition-colors hover:text-[color:var(--accent-deep)]"
                    >
                      {r.line.display}
                    </a>
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.5] text-ink-muted">{r.where}</p>
                  <p className="mt-6 border-t border-hairline pt-5 text-[13.5px] leading-[1.7] text-ink-body">
                    <span className="label mr-2">On the record</span>
                    {r.cities.join(" · ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
