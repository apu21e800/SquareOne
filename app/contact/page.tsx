import Image from "next/image"
import Link from "next/link"
import QuoteForm from "@/components/contact/QuoteForm"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
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
     next     the three steps from a message to a written quote, numbered,
              beside the StreetHeat rig mid-install at KB Woodward — how the
              work is actually done
     where    the two regions with their lines, each on a frame from the
              record, and the municipalities the record carries — drawn from
              lib/work.ts, never typed

   26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the same page on the
   own-company primitives — the captions under the frames, the label in the
   margin column, the steps with the site's numeral on hairlines, the region
   cards as frames with the text under them, every arrow link an underlined
   word, no orange on a phone number. The form (components/contact/QuoteForm)
   is untouched. The band keeps its own three steps beside the KB Woodward
   frame rather than taking the four-step band, so the photograph stays where
   it is.

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
    title: "Tell us the job",
    body: "A description and a location. Photos of the surface as it is and a rough area help; drawings help more.",
  },
  {
    title: "We walk the site",
    body: "Free, across the Lower Mainland and Vancouver Island. The sample boards come along, so pattern and colour are chosen on the surface they will go on.",
  },
  {
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
      <span className="label">{heading}</span>
      {children}
    </div>
  )
}

export default function ContactPage() {
  return (
    <main className="bg-surface">
      {/* ── Opener — the invitation, the lines, the crew on site (caption under) ──────── */}
      <section className="relative grid min-h-[680px] grid-cols-[52fr_48fr] overflow-hidden bg-surface pt-[var(--bar-h)] max-[900px]:min-h-0 max-[900px]:grid-cols-1">
        <div
          className="
            relative flex items-center
            pt-20 pb-20 pr-[72px] pl-[max(calc((100vw_-_1280px)/2),40px)]
            max-[900px]:pt-14 max-[900px]:pr-6 max-[900px]:pb-12 max-[900px]:pl-6
          "
        >
          <div className="relative z-[1] w-full max-w-[560px]">
            <span className="label">Contact &middot; Free site visit</span>
            <h1 className="h1-tight mt-6 [text-wrap:balance]">Tell us the job. We&rsquo;ll walk the site.</h1>
            <p className="lede mt-6 max-w-[50ch] [text-wrap:pretty]">
              A crosswalk, a plaza, a parking area, a driveway &mdash; a description and a location
              are enough to start, and drawings help. The site visit is free across the Lower Mainland
              and Vancouver Island, the sample boards come along, and the quote is written by the
              crew who install it.
            </p>

            {/* 21 Sept 2026 (Vern: "contact page text too big in some
                areas"). The four lines were set at 26px Futura Bold — h3 size
                for a telephone number — in a two-column table whose labels ran
                from eight characters to sixteen, so a river of space opened
                between the short labels and their numbers and the mailbox had
                to drop a size of its own to fit. Stacked pairs, two up: the
                numbers stay the loudest thing in the block without shouting,
                the mailbox sets at the same size as the rest, and it reads the
                same way as the footer and the proof line. */}
            <dl className="mt-10 grid grid-cols-3 gap-x-7 gap-y-6 border-t border-hairline pt-8 max-[700px]:grid-cols-2 max-[420px]:grid-cols-1 max-[420px]:gap-y-5">
              {[...LINES, { region: "Email", display: "office@squareonepaving.com", href: "mailto:office@squareonepaving.com" }].map((l) => (
                <div key={l.href} className={l.region === "Email" ? "col-span-3 min-w-0 max-[700px]:col-span-2 max-[420px]:col-span-1" : "min-w-0"}>
                  <dt className="label">{l.region}</dt>
                  <dd>
                    <a
                      href={l.href}
                      className="mt-[3px] inline-block font-[family-name:var(--font-display)] text-[19px] leading-[1.25] font-bold tracking-[-0.01em] tabular-nums text-ink underline-offset-4 hover:underline [overflow-wrap:anywhere] max-[700px]:text-[17.5px]"
                    >
                      {l.display}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9">
              <a href="#quote" className="btn-primary">Request a quote</a>
            </div>
          </div>
        </div>

        <figure className="relative m-0 flex min-w-0 flex-col">
          <span className="relative block min-h-0 flex-1 overflow-hidden bg-surface-stone max-[900px]:aspect-[4/3] max-[900px]:flex-none">
            <Image
              src={OPENER.src}
              alt={OPENER.alt}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 48vw"
              className="object-cover [object-position:8%_62%]"
            />
          </span>
          <figcaption className="cap px-6 pb-5">{OPENER.caption}</figcaption>
        </figure>
      </section>

      {/* ── The form, and the office beside it ──────── */}
      <section className="border-t border-hairline bg-surface-warm py-24 max-[700px]:py-14">
        <div className="container-1280 grid grid-cols-12 items-start gap-x-12 gap-y-14 max-[900px]:grid-cols-1">
          <div className="col-span-7 max-[900px]:col-span-1">
            <QuoteForm />
          </div>

          <aside className="col-span-5 max-[900px]:col-span-1 min-[901px]:pl-4">
            <RailBlock heading="Office">
              <address className="mt-2 text-[1.25rem] font-semibold not-italic leading-[1.4] text-ink">
                19&ndash;11720 Stewart Crescent
              </address>
              <p className="mt-1 text-[15px] text-ink-muted">Maple Ridge, BC V2X 9E7</p>
            </RailBlock>

            <RailBlock heading="What to send">
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-[9px] text-[15px] leading-[1.4] text-ink-body max-[420px]:grid-cols-1">
                <li>Photos of the surface as it is</li>
                <li>The address or postal code</li>
                <li>Drawings or a sketch, if you have them</li>
                <li>A rough area in square metres</li>
                <li>When you need it done</li>
              </ul>
              <p className="mt-4 text-[14px] leading-[1.6] text-ink-muted">
                Photos and drawings go by email to{" "}
                <a href="mailto:office@squareonepaving.com" className="link">office@squareonepaving.com</a>
                {" "}&mdash; put the site address in the subject line.
              </p>
            </RailBlock>

            <RailBlock heading="Two shortcuts">
              <ul className="mt-3 flex flex-col gap-[14px]">
                <li>
                  <Link href="/driveways#patterns" className="link">
                    Building a driveway? See the patterns first
                  </Link>
                </li>
                <li>
                  <Link href="/specifiers" className="link">
                    Writing a spec? Drawings, sheets and documents
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
              <p className="text-[14px] italic leading-[1.5] text-ink-muted">Decorative pavement across BC since 2000</p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── What happens next — the three steps, numbered, and how the work is done ──────── */}
      <section className="sec section bg-surface">
        <div className="container-1280 grid grid-cols-12 items-center gap-x-14 gap-y-12 max-[900px]:grid-cols-1">
          <div className="col-span-6 max-[900px]:col-span-1">
            <span className="label">What happens next</span>
            <h2 className="mt-4 max-w-[18ch] [text-wrap:balance]">From a message to a written quote</h2>
            <ol className="mt-10">
              {STEPS.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[64px_1fr] gap-x-5 border-t border-hairline py-7 last:border-b max-[420px]:grid-cols-[48px_1fr]">
                  <span className="step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3>
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-[46ch] text-[16px] leading-[1.6] text-ink-body [text-wrap:pretty]">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="col-span-6 max-[900px]:col-span-1">
            <Frame
              src={PROCESS.src}
              alt={PROCESS.alt}
              caption={PROCESS.caption}
              aspect="aspect-[4/3]"
              sizes="(max-width: 900px) 100vw, 560px"
            />
          </div>
        </div>
      </section>

      {/* ── Where we work — two regions, two lines, the record's cities ──────── */}
      <Section
        label="Where we work"
        title="Lower Mainland and Vancouver Island"
        link={{ href: "/projects", label: "All projects" }}
        intro="The office is in Maple Ridge and the Island has its own line. The record also runs to Squamish, Sechelt and the Okanagan when the job calls for it."
        tone="warm"
        wide
      >
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 max-[900px]:grid-cols-1">
          {REGIONS.map((r) => (
            <article key={r.name}>
              <Frame
                src={r.src}
                alt={r.alt}
                caption={r.caption}
                aspect="aspect-[3/2]"
                sizes="(max-width: 900px) 100vw, 600px"
              />
              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3>{r.name}</h3>
                <a
                  href={r.line.href}
                  className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold leading-[1.2] tabular-nums text-ink underline-offset-4 hover:underline"
                >
                  {r.line.display}
                </a>
              </div>
              <p className="mt-2 text-[15px] leading-[1.5] text-ink-muted">{r.where}</p>
              <div className="mt-5 border-t border-hairline pt-4">
                <span className="label">On the record</span>
                <p className="mt-1 text-[15px] leading-[1.7] text-ink-body">{r.cities.join(" · ")}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </main>
  )
}
