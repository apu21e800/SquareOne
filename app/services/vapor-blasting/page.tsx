import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import ImagePlaceholder from "@/components/ui/ImagePlaceholder"

// Route and slug keep the US spelling; display prose reads "vapour blasting".
// This page is the ONLY vapour route — /vapor-blasting redirects here.
//
// Positioning per the business hierarchy (§2.4a): vapour blasting is Square
// One's EXTRA service — cleaning surfaces, priming surfaces, graffiti removal,
// commercial muck like mould. Commercial and municipal paving leads the
// company; this page sells the supporting trade on its own merits.
//
// Every claim below is one Square One has published itself: "uses less water,
// generates up to 92% less dust, produces little to no heat, and creates less
// environmental impact than the alternatives, all while getting the job done
// faster", plus its own list of applications. Nothing else is asserted.
//
// Imagery: the only vapour photography we hold is 524px archive material,
// which rides small and captioned (low-res never goes big). The large image
// positions are designed holds — each carries the shot brief for the
// photography or §11 generated set that replaces it. Swap = one `src`.

export const metadata: Metadata = {
  title: "Vapour Blasting BC | Surface Cleaning, Priming & Graffiti Removal",
  description:
    "Mobile vapour blasting across the Lower Mainland and Vancouver Island — surface cleaning and priming, graffiti, gum and mould removal, road-marking removal, paint and coating stripping. Up to 92% less dust than dry blasting. Square One Paving.",
  keywords: [
    "vapour blasting BC",
    "vapor blasting Vancouver",
    "dustless blasting Vancouver Island",
    "graffiti removal Vancouver",
    "mould removal exterior BC",
    "road marking removal BC",
    "surface priming coating prep BC",
    "wet abrasive blasting BC",
    "marine coating removal BC",
  ],
  alternates: { canonical: "https://squareonepaving.ca/services/vapor-blasting" },
  openGraph: {
    title: "Vapour Blasting BC | Surface Cleaning, Priming & Graffiti Removal",
    description:
      "Graffiti off brick, mould off commercial exteriors, markings off roads, coatings off steel and hulls — with up to 92% less dust than dry blasting. Mobile across BC.",
  },
}

// ── Headline facts — Square One's own published numbers ─────────────────────────

type Fact = { number: string; label: string }

const facts: Fact[] = [
  { number: "92%", label: "less dust than dry blasting — the water holds it down" },
  { number: "Low heat", label: "little to no heat at the surface, so nothing warps or scorches" },
  { number: "2", label: "regions — Lower Mainland and Vancouver Island, one mobile rig" },
]

// ── What it handles — Square One's published applications, grouped by the
//    business hierarchy: commercial and municipal first ──────────────────────

const tiers = [
  {
    eyebrow: "01 · Commercial & municipal",
    title: "Storefronts, plazas, roads",
    body:
      "Graffiti, gum, mould and soot off brick, concrete and stone. Road-marking removal ahead of a new layout. Fire and smoke damage cleaned back to the substrate. Steel and concrete prepared for the next coat — faster than grinding, without the dust cloud of dry blasting.",
    bullets: [
      "Graffiti, gum, mould and soot removal",
      "Road marking removal",
      "Steel and concrete surface preparation",
      "Brick and patio cleaning",
      "Fire and smoke damage cleaning",
    ],
    tag: "Property managers · Municipalities · Strata",
    brief: "Nozzle on heritage brick, contained mist, half of the wall cleaned — the before and after in one frame.",
  },
  {
    eyebrow: "02 · Residential",
    title: "Driveways, patios, railings",
    body:
      "Paint and stain off wood, concrete and steel. Limestone, marble and stucco stains lifted without etching. Iron fences and railings taken back to bare metal before paint. Brick and patio surfaces cleaned, then primed for whatever comes next.",
    bullets: [
      "Paint and stain removal",
      "Wood, concrete and steel cleaning",
      "Limestone, marble and stucco stain removal",
      "Iron fence and railing preparation",
      "Priming before a coating",
    ],
    tag: "Homeowners · Estates",
    brief: "A weathered patio, half restored — wet stone, clean line between old and new.",
  },
  {
    eyebrow: "03 · Marine & industrial",
    title: "Hulls, decks, equipment",
    body:
      "Polyurethane deck coating removal for yachts. On-board coating removal and surface preparation. Steel taken to a clean profile without the heat that warps thin sections — the water does the cooling.",
    bullets: [
      "Polyurethane deck coating removal (yachting)",
      "Marine on-board coating removal",
      "Steel surface preparation",
      "Equipment and frames",
    ],
    tag: "Marine · Manufacturing",
    brief: "Yacht deck coating coming off in a clean band, marina in soft focus behind.",
  },
]

// ── Why wet — each point traces to Square One's own description ────────────

const advantages = [
  {
    num: "01",
    title: "Up to 92% less dust",
    body:
      "The abrasive travels in water, so the particulate that makes dry blasting a shutdown job stays on the ground. Occupied buildings and busy frontages keep operating around the work.",
  },
  {
    num: "02",
    title: "Little to no heat",
    body:
      "No friction heat at the surface — no warping thin steel, no scorching stone, no glazing the substrate you are trying to save.",
  },
  {
    num: "03",
    title: "Less water, less impact",
    body:
      "Less water than pressure washing, less environmental impact than chemical stripping. The finish is a clean, primed surface — not a chemical residue.",
  },
  {
    num: "04",
    title: "Faster, and it comes to you",
    body:
      "A portable rig that gets the job done faster than the alternatives, dispatched across the Lower Mainland and Vancouver Island. Nothing gets trucked to a shop.",
  },
]

// ── Process — what actually happens, no invented paperwork ─────────────────

const process = [
  { num: "01", title: "Photos and a postcode", body: "Send a couple of photos of the surface and where it is. We identify the substrate and what is on it." },
  { num: "02", title: "Written quote", body: "A written estimate with the approach — pressure, media, containment — and how long the site is affected." },
  { num: "03", title: "The rig on site", body: "Adjacent surfaces protected, runoff managed, the surface taken back to clean in passes." },
  { num: "04", title: "Primed for what's next", body: "Ready for paint, coating, sealer or the decorative system we install ourselves — same crew, same day if it suits." },
]

// ── Field records — the archive shots at the one size they hold ───────────

const fieldRecords = [
  {
    src: "/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg",
    alt: "Square One crew vapour blasting brick at Granville Island, Vancouver",
    caption: "Granville Island · brick",
  },
  {
    src: "/images/services/vapor-blasting/parking-lot-vapour-blasting-01.jpg",
    alt: "Vapour blasting a commercial parking lot surface",
    caption: "Commercial parking lot",
  },
  {
    src: "/images/services/vapor-blasting/walkway-vapour-blasting-01.jpg",
    alt: "Public walkway during vapour blasting by Square One",
    caption: "Public walkway",
  },
]

// ── Substrates — from Square One's published application list ──────────────

const substrates = [
  "Asphalt", "Concrete", "Brick", "Limestone", "Marble", "Stucco", "Steel", "Iron",
  "Wood", "Pavers & patios", "Marine decks", "Hulls & on-board coatings",
]

// ── Service area — the same regions every other page names ─────────────────

const cities = [
  "Vancouver", "North Vancouver", "West Vancouver", "Burnaby", "Richmond", "Surrey",
  "Coquitlam", "Maple Ridge", "Langley", "Abbotsford", "Chilliwack",
  "Victoria", "Saanich", "Langford", "Duncan", "Nanaimo", "Parksville",
]

const YOUTUBE = "https://www.youtube.com/channel/UCBDvB4vgdahH67BmP6FeccQ"

export default function VaporBlastingServicePage() {
  return (
    <main>
      {/* ── Hero — 55/45 split: typographic left, designed image hold right ── */}
      <section className="relative grid min-h-[600px] grid-cols-[55fr_45fr] overflow-hidden bg-surface max-[900px]:min-h-0 max-[900px]:grid-cols-1">
        <div className="relative flex items-center pt-28 pb-16 pr-[72px] pl-[max(calc((100vw_-_1280px)/2),40px)] max-[900px]:pt-[88px] max-[900px]:pr-10 max-[900px]:pb-12 max-[900px]:pl-10 max-[700px]:px-6">
          <div className="relative z-[1]">
            <p className="eyebrow">Service &middot; Mobile surface cleaning and priming</p>

            <h1 className="stop mt-7 max-w-[20ch] [text-wrap:balance]">Clean it, prime it, bring it back</h1>

            <p className="mt-7 max-w-[54ch] text-[19px] leading-[1.65] text-ink-body [text-wrap:pretty] max-[700px]:text-[17px]">
              A powerful, portable blasting solution for surface prep. Vapour blasting uses less
              water, generates up to 92% less dust, produces little to no heat and creates less
              environmental impact than the alternatives — while getting the job done faster.
            </p>

            <p className="mt-5 max-w-[54ch] text-[15px] leading-[1.6] text-ink-muted [text-wrap:pretty]">
              Graffiti, gum and mould off commercial exteriors. Markings off roads. Coatings off
              steel and hulls. It is also how we prime surfaces for the decorative systems
              Square One has installed across BC since 2000.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-[14px]">
              <Link href="/contact" className="btn-primary">
                Request a quote
              </Link>
              <a href="tel:+16044669902" className="btn-secondary">
                604-466-9902
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex items-center p-10 pl-0 max-[900px]:px-10 max-[900px]:pb-12 max-[700px]:px-6">
          <ImagePlaceholder
            ratio="aspect-[4/5] w-full max-h-[640px]"
            brief="Hero: the rig at work on a brick storefront — operator in silhouette, a soft cone of mist, the cleaned band brighter than the rest. Vertical, daylight, Vancouver street context."
          />
        </div>
      </section>

      {/* ── Facts ───────────────────────────────────────────────────── */}
      <section className="section border-y border-hairline bg-surface-warm">
        <div className="container-1280 grid grid-cols-3 gap-10 max-[700px]:grid-cols-1 max-[700px]:gap-9">
          {facts.map((fact) => (
            <div key={fact.label} className="stat-rule">
              <div className="stat-num">{fact.number}</div>
              <div className="mt-[14px] text-[15px] text-ink-muted">{fact.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What it handles — three tiers, commercial first ──────── */}
      <section className="section relative overflow-hidden bg-surface">
        <div className="container-1280 relative z-[1]">
          <p className="eyebrow">What it handles</p>

          <h2 className="mt-5">From storefront to drydock</h2>

          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
            Vapour blasting works on almost every hard surface. The difference between a parkade,
            a patio and a yacht deck is the pressure and the media — not the method.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
            {tiers.map((tier) => (
              <article
                key={tier.eyebrow}
                className="flex flex-col rounded-[2px] border border-hairline bg-surface"
              >
                <ImagePlaceholder ratio="aspect-[5/3]" className="rounded-b-none border-0 border-b" brief={tier.brief} />

                <div className="flex flex-1 flex-col p-8 max-[700px]:p-6">
                  <p className="label">{tier.eyebrow}</p>

                  <h3 className="mt-4">{tier.title}</h3>

                  <p className="mt-4 text-[15px] leading-[1.6] text-ink-body">{tier.body}</p>

                  <ul className="mt-6 border-t border-hairline">
                    {tier.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="border-b border-hairline py-[10px] text-[14px] leading-[1.5] text-ink-body"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-auto pt-6 text-[12px] font-medium tracking-[0.08em] text-ink-muted">
                    {tier.tag}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why wet ──────────────────────────────────────────────────── */}
      <section className="section relative overflow-hidden border-y border-hairline bg-surface-warm">
        <div className="container-1280 relative z-[1] grid grid-cols-[1fr_1.15fr] gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div>
            <p className="eyebrow">Why wet beats dry</p>

            <h2 className="mt-5">The dust stays on the ground</h2>

            <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
              Dry sandblasting turns a cleaning job into a shutdown. Because the abrasive travels
              in water, vapour blasting takes a surface back to clean while the building beside it
              stays open — and leaves it primed rather than scarred.
            </p>

            <div className="mt-8">
              <ImagePlaceholder
                ratio="aspect-[4/3]"
                brief="Detail: the nozzle head mid-pass on concrete — the wet fan of abrasive, the sharp edge between grimy and clean."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-2 max-[700px]:grid-cols-1">
            {advantages.map((advantage) => (
              <div key={advantage.num} className="border-t border-hairline py-7">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                  {advantage.num}
                </div>
                <h3 className="mt-4">{advantage.title}</h3>
                <p className="mt-[10px] max-w-[40ch] text-[15px] leading-[1.55] text-ink-body">
                  {advantage.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prep for our own installs ────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-surface">
        <div className="container-1280 relative z-[1] grid grid-cols-2 gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div>
            <p className="eyebrow">The supporting trade</p>

            <h2 className="mt-5">The same rig primes our own work</h2>

            <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
              Before StreetBond goes on a spray pad or DecoMark goes on a plaza, the surface has to
              be clean and open. Vapour blasting is how we get there on our own installs — which is
              why we offer it to everyone else as a service in its own right.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link href="/services/decorative-coatings" className="arrow-link">
                Decorative coatings <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/services/preformed-thermoplastic" className="arrow-link">
                Preformed thermoplastic <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <ImagePlaceholder
            ratio="aspect-[3/2]"
            brief="Wide: a cleaned, primed parking lot with the Square One crew laying StreetBond colour on one half — prep and finish in the same frame."
          />
        </div>
      </section>

      {/* ── The method + field records ───────────────────────────────────── */}
      <section className="section relative overflow-hidden border-y border-hairline bg-surface-warm">
        <div className="container-1280 relative z-[1]">
          <p className="eyebrow">The method</p>

          <h2 className="mt-5">Photos to primed surface, four steps</h2>

          <div className="mt-10 grid grid-cols-4 gap-10 border-t border-hairline max-[700px]:grid-cols-1 max-[700px]:gap-8">
            {process.map((step) => (
              <div key={step.num} className="pt-7">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                  {step.num}
                </div>
                <h3 className="mt-4">{step.title}</h3>
                <p className="mt-[10px] max-w-[44ch] text-[15px] leading-[1.55] text-ink-body">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-hairline pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-6">
              <p className="label">Field records</p>
              <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="arrow-link">
                Demonstration videos on our YouTube channel <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid max-w-[920px] grid-cols-3 gap-4 max-[700px]:gap-2">
              {fieldRecords.map((record) => (
                <figure key={record.src} className="m-0">
                  <span className="relative block aspect-[5/3] overflow-hidden rounded-[2px] bg-surface-stone">
                    <Image
                      src={record.src}
                      alt={record.alt}
                      fill
                      sizes="(max-width: 700px) 33vw, 296px"
                      className="object-cover"
                    />
                  </span>
                  <figcaption className="mt-2 text-[12px] font-medium tracking-[0.04em] text-ink-muted max-[700px]:text-[11px]">
                    {record.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Scope: substrates, environment, service area ──────── */}
      <section className="section relative overflow-hidden bg-surface">
        <div className="container-1280 relative z-[1]">
          <p className="eyebrow">Scope</p>

          <h2 className="mt-5">What we take on, and where</h2>

          <div className="mt-10 grid grid-cols-3 gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-10">
            <div className="border-t border-hairline pt-6">
              <p className="label">Surfaces</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {substrates.map((substrate) => (
                  <span key={substrate} className="tag">
                    {substrate}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-hairline pt-6">
              <p className="label">Environment</p>
              <p className="mt-5 text-[15px] leading-[1.6] text-ink-body">
                Less water than pressure washing, up to 92% less dust than dry blasting, and less
                environmental impact than chemical stripping — with little to no heat at the
                surface.
              </p>
              <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
                Adjacent surfaces are protected and runoff is managed on every job. Ask for the
                approach in writing with your quote.
              </p>
            </div>

            <div className="border-t border-hairline pt-6">
              <p className="label">Service area</p>
              <p className="mt-5 text-[15px] leading-[1.6] text-ink-body">
                Lower Mainland and Vancouver Island — the rig is mobile, and it comes to the site.
              </p>
              <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
                {cities.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Close ───────────────────────────────────────────────────── */}
      <section className="section border-t border-hairline bg-surface-warm">
        <div className="container-1280">
          <p className="eyebrow">Get a quote</p>

          <h2 className="stop mt-5 max-w-[20ch]">Send us a photo, we send back a quote</h2>

          <p className="mt-6 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body [text-wrap:pretty]">
            The fastest path to a quote is a couple of photos and a postcode. We identify the
            surface, suggest the approach and come back with a written estimate.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-[14px]">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
            <a href="tel:+16044669902" className="btn-secondary">
              604-466-9902
            </a>
          </div>

          <p className="mt-8 text-[15px] text-ink-muted">
            Vancouver Island{" "}
            <a href="tel:+12503910270" className="font-semibold text-ink">
              250-391-0270
            </a>{" "}
            &middot; toll-free{" "}
            <a href="tel:+18773910270" className="font-semibold text-ink">
              1-877-391-0270
            </a>{" "}
            &middot;{" "}
            <a href="mailto:office@squareonepaving.com" className="font-semibold text-ink">
              office@squareonepaving.com
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
