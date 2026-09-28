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
   still not here.

   28 Sept 2026 (Vern: "Request a quote page is pretty sad, improve it";
   "mind the hubss.com design patterns"). hubss.com's contact page is a
   dark photograph with the invitation and the offices on the left and a
   dark form card on the right. This one leads with the form, on white:
   the invitation and the three lines across the top, then the form on
   the left in two numbered sections (the work, then you) with the
   project type as tiles, and on the right a rail that stays in view,
   what happens next as a short timeline, what to send, and the seal.
   The Spirit Trail frame moves below the form as a full-width band; the
   regions close the page as before. */

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
    body: "A description and a location. Photos and drawings help.",
  },
  {
    title: "We walk the site",
    body: "Free, with the sample boards, anywhere in the Lower Mainland and on Vancouver Island.",
  },
  {
    title: "You get a written quote",
    body: "To the published specification. We warrant the workmanship.",
  },
]

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
    where: "A service region with its own line, the crew comes over",
    src: "/images/applications/public-art/oak-bay-village-intersection-wide-streetbond-01.jpg",
    alt: "An octopus and fish on a blue sea, painted in StreetBond on the Cadboro Bay Village traffic circle in Saanich, seen from above",
    caption: "Cadboro Bay, Saanich · Village traffic circle · StreetBond",
    cities: workMunicipalities("Vancouver Island"),
  },
]

export default function ContactPage() {
  return (
    <main className="bg-surface">
      {/* ── Opener — the invitation, and the lines for whoever would rather call ──────── */}
      <section className="bg-surface pt-[calc(var(--bar-h)+56px)] pb-12 max-[700px]:pt-[calc(var(--bar-h)+32px)] max-[700px]:pb-8">
        <div className="container-1280 grid grid-cols-12 items-end gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
          <div className="col-span-8 max-[900px]:col-span-1">
            <span className="label">Request a quote &middot; free site visit</span>
            <h1 className="mt-5 max-w-[16ch] [text-wrap:balance]">Tell us the job. <em>We&rsquo;ll walk the site.</em></h1>
            <p className="lede mt-6 max-w-[56ch] [text-wrap:pretty]">
              A description and a location are enough to start. The site visit is free; the quote
              comes in writing.
            </p>
          </div>

          <div className="col-span-4 max-[900px]:col-span-1">
            <span className="label">Rather talk?</span>
            <dl className="q-lines mt-3">
              {LINES.map((l) => (
                <div key={l.href}>
                  <dt>{l.region}</dt>
                  <dd>
                    <a href={l.href}>{l.display}</a>
                  </dd>
                </div>
              ))}
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:office@squareonepaving.com" className="q-mail">
                    office@squareonepaving.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── The form, and the rail beside it ──────── */}
      <section className="bg-surface pb-24 max-[700px]:pb-16">
        <div className="container-1280 grid grid-cols-12 items-start gap-x-12 gap-y-14 max-[900px]:grid-cols-1">
          <div className="col-span-8 max-[900px]:col-span-1">
            <QuoteForm />
          </div>

          <aside className="q-rail col-span-4 max-[900px]:col-span-1">
            <span className="label">What happens next</span>
            <ol className="q-timeline mt-4">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="q-dot" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="q-t-title">
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p className="q-t-body">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-9 border-t border-hairline pt-6">
              <span className="label">What to send</span>
              <ul className="q-list mt-3">
                <li>Photos of the surface as it is</li>
                <li>The address or postal code</li>
                <li>Drawings or a sketch, if you have them</li>
                <li>A rough area in square metres</li>
                <li>When you need it done</li>
              </ul>
              <p className="mt-4 text-[14.5px] leading-[1.6] text-ink-muted">
                Photos and drawings go by email to{" "}
                <a href="mailto:office@squareonepaving.com" className="link text-[14.5px]">
                  office@squareonepaving.com
                </a>
                , with the site address in the subject line.
              </p>
            </div>

            <div className="mt-8 border-t border-hairline pt-6">
              <span className="label">Two shortcuts</span>
              <ul className="mt-3 flex flex-col gap-[12px]">
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
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-hairline pt-6">
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

      {/* ── The crew on site — the frame from the record, full width, caption under ──────── */}
      <section className="bg-surface-warm pt-16 pb-14 max-[700px]:pt-10 max-[700px]:pb-10">
        <div className="container-1280">
          <Frame
            src={OPENER.src}
            alt={OPENER.alt}
            caption={OPENER.caption}
            aspect="aspect-[21/9] max-[700px]:aspect-[4/3]"
            position="8% 62%"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </section>

      {/* ── Where we work — two regions, two lines, the record's cities ──────── */}
      <Section
        label="Where we work"
        title={<>Lower Mainland <em>and Vancouver Island</em></>}
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
                <p className="mt-1 text-[15px] leading-[1.7] text-ink-body">{r.cities.map((c) => c.replace(/ /g, "\u00A0")).join(" · ")}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </main>
  )
}
