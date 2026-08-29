import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

import { galleryWithFallback, heroFor } from "@/lib/gallery"

// Route and slug keep the US spelling; display prose reads "vapour blasting".
export const metadata: Metadata = {
  title: "Vapour Blasting BC — Mobile Surface Restoration | Square One Paving",
  description:
    "BC's mobile vapour blasting specialists. Heritage stonework, industrial equipment, marine, and concrete — wet abrasive surface restoration without heat damage or surface scarring. Ladysmith & Kelowna.",
  keywords: [
    "vapour blasting BC",
    "wet blasting Vancouver Island",
    "surface restoration BC",
    "heritage building cleaning BC",
    "mobile vapour blasting Vancouver Island",
    "industrial surface prep BC",
    "dustless blasting BC",
    "marine hull cleaning BC",
  ],
  alternates: { canonical: "https://squareonepaving.com/vapor-blasting" },
}

const HERO_FALLBACK = "/images/services/vapor-blasting/hero.jpg"

/** Passed to lib/gallery so nothing 404s before the folder is populated. */
const GALLERY_FALLBACK: readonly string[] = [
  "/images/products/streetbond/streetbond-cobble-macro-surface-01.jpg",
  "/images/applications/parking-lots/storage-facility-red-brick-apron-01.jpg",
  "/images/products/streetbond/streetbond-cobble-texture-detail-01.jpg",
  "/images/products/streetbond/streetbond-cobblestone-grey-closeup-01.jpg",
  "/images/applications/parking-lots/laneway-red-streetbond-installation-01.jpg",
  "/images/applications/parking-lots/rbc-royal-bank-brick-threshold-01.jpg",
]

type Fact = { number: string; label: string }

const facts: Fact[] = [
  { number: "< 5%", label: "airborne dust, against 100 percent for dry blasting" },
  { number: "0", label: "harsh chemicals — water and recycled glass only" },
  { number: "25", label: "years restoring surfaces across British Columbia" },
]

type ComparisonRow = { attr: string; vapour: string; sand: string; grind: string }

const comparisonRows: ComparisonRow[] = [
  { attr: "Dust output",     vapour: "< 5% airborne",       sand: "High — full PPE",    grind: "High — full PPE" },
  { attr: "Heat damage",     vapour: "None — water cooled", sand: "Localised",          grind: "Risk of warping" },
  { attr: "Surface finish",  vapour: "Uniform satin",       sand: "Aggressive profile", grind: "Linear scoring" },
  { attr: "Heritage-safe",   vapour: "Yes",                 sand: "No",                 grind: "No" },
  { attr: "Speed (typical)", vapour: "15–25 m²/hr",         sand: "20–30 m²/hr",        grind: "5–10 m²/hr" },
  { attr: "Mobile",          vapour: "Yes — truck-mounted", sand: "Yes",                grind: "Limited" },
]

type Item = { num: string; title: string; desc: string }

const applications: Item[] = [
  { num: "01", title: "Industrial equipment", desc: "Pumps, motors, frames, hydraulic components — full restoration without disassembly damage." },
  { num: "02", title: "Heritage stonework",   desc: "Sandstone, limestone and granite façades. Pollution and biofilm removed, substrate untouched." },
  { num: "03", title: "Concrete surfaces",    desc: "Coating removal, laitance prep, line stripe removal and graffiti abatement on concrete and pavers." },
  { num: "04", title: "Metal fabrication",    desc: "Mill scale, weld discolouration, oxidation. Uniform satin profile ready for coating or inspection." },
  { num: "05", title: "Marine",               desc: "Hulls, decks, props and anchors. Antifouling and barnacle removal without gelcoat damage." },
  { num: "06", title: "Pre-coating prep",     desc: "Surface profile to spec for paint, powder coat, plasma spray or thermal barrier coatings." },
]

const processSteps: Item[] = [
  { num: "01", title: "Assess",  desc: "On-site walkthrough. Substrate identification, contamination type, target finish spec." },
  { num: "02", title: "Prep",    desc: "Containment, runoff control, surface masking. Adjacent areas protected before water meets media." },
  { num: "03", title: "Blast",   desc: "Wet abrasive at calibrated pressure. Continuous monitoring of surface profile and consumption rate." },
  { num: "04", title: "Inspect", desc: "Sign-off photo set, profile gauge readings and a written report. Site cleared, runoff captured." },
]

type Result = { location: string; title: string; specs: string[] }

const results: Result[] = [
  {
    location: "Victoria · Inner Harbour",
    title: "Heritage limestone façade restoration",
    specs: ["240 m²", "4 days", "Recycled glass", "Heritage permit"],
  },
  {
    location: "Nanaimo · Industrial",
    title: "Hydraulic pump frame — coating removal",
    specs: ["12 units", "2 days", "No disassembly", "Pre-paint profile"],
  },
  {
    location: "Vancouver · Concrete",
    title: "Parkade deck — line stripe and coating removal",
    specs: ["1,400 m²", "6 days", "Occupied facility", "Night shift"],
  },
  {
    location: "Sidney · Marine",
    title: "Aluminum hull — antifouling removal",
    specs: ["52 ft vessel", "3 days", "Gelcoat preserved"],
  },
]

type WhyStat = { stat: string; label: string; desc: string }

const whyStats: WhyStat[] = [
  {
    stat: "25",
    label: "Years on the ground",
    desc: "Square One has run BC restoration work since 2000 — through every regulatory shift in airborne particulate, runoff containment and heritage permitting.",
  },
  {
    stat: "100%",
    label: "BC owned, on site",
    desc: "Based in Maple Ridge, with the mobile rig dispatched province-wide, usually the same week. No subcontractors, ever.",
  },
  {
    stat: "51",
    label: "Communities served",
    desc: "City of Nanaimo, District of Saanich, City of Kelowna, BC Transit. The same compliance and reporting standards apply on every private job.",
  },
]

export default function VaporBlastingPage() {
  const heroSrc = heroFor("services", "vapor-blasting", HERO_FALLBACK) ?? HERO_FALLBACK
  const gallery = galleryWithFallback("services", "vapor-blasting", GALLERY_FALLBACK)
    .filter((src) => src !== heroSrc)
    .slice(0, 6)

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative grid min-h-[620px] grid-cols-[55fr_45fr] overflow-hidden bg-surface max-[700px]:min-h-0 max-[700px]:grid-cols-1">
        <div
          className="
            relative flex items-center
            pt-24 pb-24 pr-[72px] pl-[max(calc((100vw_-_1280px)/2),40px)]
            max-[700px]:pt-[72px] max-[700px]:pr-6 max-[700px]:pb-14 max-[700px]:pl-6
          "
        >
          <div className="relative z-[1]">
            <p className="eyebrow">Mobile vapour blasting &middot; British Columbia</p>

            <h1 className="stop mt-7">Surface restoration, without the dust</h1>

            <p className="mt-7 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body [text-wrap:pretty] max-[700px]:text-[17px]">
              Vapour blasting lifts rust, coatings and contamination without heat damage,
              warping or surface scarring. Mobile across British Columbia, specified by
              municipalities, heritage sites and food-grade facilities since 2000.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-[14px]">
              <a href="#quote" className="btn-primary">
                Request a vapour blast
              </a>
              <a href="#process" className="btn-secondary">
                See the process
              </a>
            </div>
          </div>
        </div>

        <div className="relative min-w-0 overflow-hidden bg-surface-stone max-[700px]:aspect-[4/3]">
          <Image
            src={heroSrc}
            alt="Square One Paving mobile vapour blasting rig at work in British Columbia"
            fill
            priority
            sizes="(max-width: 700px) 100vw, 45vw"
            className="object-cover [object-position:center_60%]"
          />
          <div aria-hidden="true" className="scrim scrim-light" />
          <div className="caption">Mobile rig &middot; Wet abrasive &middot; British Columbia</div>
        </div>
      </section>

      {/* ── Facts ────────────────────────────────────────────── */}
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

      {/* ── The method ───────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-surface">

        <div className="container-1280 relative z-[1]">
          <p className="eyebrow">The method</p>

          <h2 className="mt-5 max-w-[20ch]">Water and abrasive media, pressurised together</h2>

          <div className="mt-10 grid grid-cols-2 gap-10 max-[700px]:grid-cols-1 max-[700px]:gap-6">
            <p className="text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
              Compressed water and recycled glass media meet at the nozzle. The water cushions
              the abrasive, suppressing more than 95 percent of airborne dust and lowering the
              working temperature — so we clean, prep or restore without damaging the substrate
              underneath.
            </p>
            <p className="text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
              The result is a uniform, contaminant-free surface ready for inspection, coating or
              service. No warping, no micro-fractures, no dust cloud — which is why we are
              cleared to work in occupied facilities, heritage sites and food-grade environments
              that dry methods cannot enter.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-[2px] border border-hairline">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="bg-surface-stone">
                  <th className="label px-5 py-4 text-left">Attribute</th>
                  <th className="label px-5 py-4 text-left">Vapour blasting</th>
                  <th className="label px-5 py-4 text-left">Sandblasting</th>
                  <th className="label px-5 py-4 text-left">Grinding</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.attr}
                    className={`border-t border-hairline ${i % 2 === 1 ? "bg-surface-warm" : "bg-surface"}`}
                  >
                    <th scope="row" className="label px-5 py-4 text-left font-semibold">
                      {row.attr}
                    </th>
                    <td className="px-5 py-4 text-[15px] font-semibold text-ink">{row.vapour}</td>
                    <td className="px-5 py-4 text-[15px] text-ink-muted">{row.sand}</td>
                    <td className="px-5 py-4 text-[15px] text-ink-muted">{row.grind}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link href="/services/vapor-blasting" className="arrow-link mt-8 inline-block">
            Full service overview <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* ── Applications ─────────────────────────────────────── */}
      <section className="section relative overflow-hidden border-y border-hairline bg-surface-warm">

        <div className="container-1280 relative z-[1]">
          <p className="eyebrow">Applications</p>

          <h2 className="mt-5">Where we work</h2>

          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
            From a single industrial component to a multi-storey heritage façade — same rig,
            same crew, same reporting.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-x-10 gap-y-12 max-[700px]:grid-cols-1 max-[700px]:gap-y-9">
            {applications.map((app) => (
              <div key={app.num} className="border-t border-hairline pt-6">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                  {app.num}
                </div>
                <h3 className="mt-4">{app.title}</h3>
                <p className="mt-[10px] max-w-[44ch] text-[15px] leading-[1.55] text-ink-body">
                  {app.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      <section id="process" className="section relative overflow-hidden bg-surface">

        <div className="container-1280 relative z-[1]">
          <p className="eyebrow">How it works</p>

          <h2 className="mt-5">Four steps, documented every time</h2>

          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
            Every job ships with a pre-blast assessment, mid-job inspection photos and a
            post-blast surface profile report.
          </p>

          <div className="mt-10 grid grid-cols-4 gap-10 border-t border-hairline max-[700px]:grid-cols-1 max-[700px]:gap-8">
            {processSteps.map((step) => (
              <div key={step.num} className="pt-7">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                  {step.num}
                </div>
                <h3 className="mt-4">{step.title}</h3>
                <p className="mt-[10px] max-w-[44ch] text-[15px] leading-[1.55] text-ink-body">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent restorations ──────────────────────────────── */}
      <section className="section relative overflow-hidden border-y border-hairline bg-surface-warm">

        <div className="container-1280 relative z-[1]">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <p className="eyebrow">Recent work</p>
              <h2 className="mt-5">Restorations across BC</h2>
            </div>
            <Link href="/projects" className="arrow-link whitespace-nowrap">
              All projects <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {gallery.length > 0 && (
            <div className="mt-10 grid grid-cols-3 gap-6 max-[700px]:grid-cols-1">
              {gallery.map((src) => (
                <div
                  key={src}
                  className="card relative aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-stone"
                >
                  <Image
                    src={src}
                    alt="Surface restored by Square One Paving with vapour blasting"
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
                    className="object-cover"
                  />
                  <div aria-hidden="true" className="scrim scrim-light" />
                  </div>
              ))}
            </div>
          )}

          <div className="mt-14 grid grid-cols-4 gap-10 max-[700px]:grid-cols-1 max-[700px]:gap-8">
            {results.map((result) => (
              <div key={result.location} className="border-t border-hairline pt-6">
                <p className="label">{result.location}</p>
                <h3 className="mt-4">{result.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.specs.map((spec) => (
                    <span key={spec} className="tag">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Square One ───────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-surface">

        <div className="container-1280 relative z-[1]">
          <p className="eyebrow">Why Square One</p>

          <h2 className="mt-5 max-w-[24ch]">Few BC contractors offer this. None have done it longer</h2>

          <div className="mt-10 grid grid-cols-3 gap-10 max-[700px]:grid-cols-1 max-[700px]:gap-9">
            {whyStats.map((item) => (
              <div key={item.label} className="stat-rule">
                <div className="stat-num">{item.stat}</div>
                <h3 className="mt-4">{item.label}</h3>
                <p className="mt-[10px] max-w-[44ch] text-[15px] leading-[1.55] text-ink-body">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ────────────────────────────────────────────── */}
      <section id="quote" className="section border-t border-hairline bg-surface-warm">
        <div className="container-1280 grid grid-cols-[minmax(0,480px)_1fr] gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div>
            <p className="eyebrow">Get a quote</p>

            <h2 className="mt-5">Tell us what needs blasting</h2>

            <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
              We spec it within one business day. Every quote includes a substrate assessment,
              target finish profile, runoff plan and a fixed-price written estimate. We do not
              take work we cannot spec accurately.
            </p>

            <ul className="mt-8 border-t border-hairline">
              {[
                "On-site or remote assessment",
                "Surface profile spec to SSPC / NACE",
                "Containment and runoff plan included",
                "Before and after photo documentation",
              ].map((item) => (
                <li
                  key={item}
                  className="border-b border-hairline py-4 text-[15px] leading-[1.55] text-ink-body"
                >
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[15px] text-ink-muted">
              Prefer to talk it through?{" "}
              <a href="tel:+16044669902" className="font-semibold text-ink">
                604-466-9902
              </a>{" "}
              &middot;{" "}
              <a href="mailto:office@squareonepaving.com" className="font-semibold text-ink">
                office@squareonepaving.com
              </a>
            </p>
          </div>

          {/* The quote form lives on /contact, which owns the client-side
              submit to /api/contact. A native form POST here would send
              form-encoded data to a JSON endpoint and navigate away. */}
          <div className="rounded-[2px] border border-hairline bg-surface p-8 max-[700px]:p-6">
            <h3>Request a vapour blasting quote</h3>
            <p className="mt-3 text-[15px] leading-[1.55] text-ink-body">
              Tell us the surface area, substrate and current condition. We walk the
              site before we quote it.
            </p>
            <Link href="/contact" className="btn-primary mt-7 inline-block">
              Request a quote
            </Link>
            <p className="mt-4 text-[13px] text-ink-muted">
              We respond within one business day.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
