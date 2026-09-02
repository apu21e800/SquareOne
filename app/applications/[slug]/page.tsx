import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

import { WORK_APPS, workAppMeta, workFor, type WorkApp } from "@/lib/work"
import { getProjectsByApplication } from "@/lib/projects"
import { products } from "@/lib/products"
import WorkGallery from "@/components/WorkGallery"
import ProjectCaption from "@/components/ui/ProjectCaption"

/**
 * Application page — one template, nine pages (driveways has its own pillar
 * at /driveways and is excluded here).
 *
 *   01 Header      typographic — eyebrow, h1, lede, CTAs, record line   white
 *   02 The work    captioned tile gallery, system + region chips        white
 *   03 Systems     product cards for this application                   warm
 *   04 Case studies project cards where the application matches        white
 *   05 Next        prev / next application                              white
 *   Close          slate — Footer, rendered once by app/layout.tsx
 *
 * Every photograph on these pages is Square One's own, captioned with the
 * system and the place. Low-res archive shots never leave tile scale.
 */

interface Props {
  params: Promise<{ slug: string }>
}

const PHONE = "604-466-9902"

interface AppCopy {
  headline: string
  intro: string
  products: string[]
  /** Keywords the page should rank for — folded into the meta description. */
  seo: string
}

const COPY: Record<Exclude<WorkApp, "driveways">, AppCopy> = {
  crosswalks: {
    headline: "Crossings that read from a block away",
    intro:
      "A decorative crosswalk does two jobs at once: it protects the person in it and it tells the driver something is happening here. We install them in preformed thermoplastic — TrafficPatterns, TrafficPatternsXD, DuraTherm — and in StreetPrint stamped asphalt, from rainbow and Indigenous-art crossings to plain high-visibility brick at a school.",
    products: ["trafficpatterns", "trafficpatterns-xd", "streetprint", "duratherm", "streetbond"],
    seo: "Decorative and high-visibility crosswalks in preformed thermoplastic and stamped asphalt, installed across the Lower Mainland and Vancouver Island.",
  },
  streetscapes: {
    headline: "Pattern and colour built into the street",
    intro:
      "Intersections, medians, lanes and civic frontages where the surface itself carries the design. StreetPrint imprints the pattern into the asphalt; StreetBond gives it colour that holds through wet winters; thermoplastic adds the crisp graphics. The result is a street that reads as a place, not a road allowance.",
    products: ["streetprint", "streetbond", "trafficpatterns-xd", "duratherm", "decomark"],
    seo: "Decorative streetscapes — stamped asphalt intersections, coloured medians and civic corridors across BC.",
  },
  roundabouts: {
    headline: "Aprons, medians and tables that look like streetscape",
    intro:
      "Truck aprons, splitter islands, speed tables and raised crossings have to survive turning trucks and plow blades while telling drivers to slow down. Stamped asphalt and aggregate-reinforced thermoplastic do that without the maintenance of pavers — and they look like part of the street rather than hardware bolted onto it.",
    products: ["streetprint", "trafficpatterns-xd", "streetbond", "premark"],
    seo: "Roundabout truck aprons, medians, speed tables and traffic-calming surfaces in stamped asphalt and thermoplastic, BC.",
  },
  "parking-lots": {
    headline: "Lots that direct people without a sign",
    intro:
      "A brick-pattern walkway across a parking lot moves pedestrians where you want them and tells drivers to expect them. We build thresholds, aprons, walkways and crosswalks for retail centres, strata and institutional sites — StreetPrint for the pattern, StreetBond for colour, thermoplastic for stalls, symbols and accessible-parking graphics.",
    products: ["streetprint", "streetbond", "trafficpatterns-xd", "decomark", "premark"],
    seo: "Decorative parking lot walkways, thresholds, crosswalks and stall markings for retail, strata and institutional sites across BC.",
  },
  "parks-paths": {
    headline: "Colour underfoot, from greenway to spray pad",
    intro:
      "Park pathways, greenways, plazas and spray parks — surfaces people walk, run and play on barefoot. StreetBond coatings give a spray pad its colour and grip; StreetPrint gives a walkway the look of stone; DecoMark drops medallions and wayfinding into the path. Slip-resistant throughout, and repairable in sections rather than all at once.",
    products: ["streetbond", "streetprint", "trafficpatterns", "decomark"],
    seo: "Park pathways, greenways, plazas and spray park surfacing in StreetBond coatings and stamped asphalt across BC.",
  },
  "schools-sports-courts": {
    headline: "Play surfaces that survive recess",
    intro:
      "Sports courts, school-zone crossings, sensory pathways and labyrinths — surfaces that take hundreds of kids a day and come back for more. StreetBond turns an asphalt court into a colour-coded playing surface; DecoMark and TrafficPatterns add the games, legends and crossings; StreetPrint makes a school crosswalk impossible to miss.",
    products: ["streetbond", "decomark", "trafficpatterns", "streetprint"],
    seo: "School crosswalks, sports court coatings, sensory pathways and play surfaces for BC schools and parks.",
  },
  "bike-lanes": {
    headline: "Priority lanes that keep their colour",
    intro:
      "Green bike lanes and red transit lanes are only useful while they are still green and red. PreMark preformed thermoplastic and MMAX coatings are engineered for the lane itself — daily traffic, street sweepers, winter grit — and StreetPrint brings a brick-pattern multi-use path to the same durability.",
    products: ["premark", "mmax", "streetbond", "trafficpatterns"],
    seo: "Green bike lane and red priority lane surfacing in PreMark thermoplastic and MMAX coatings across the Lower Mainland and Vancouver Island.",
  },
  "public-art": {
    headline: "Artwork rendered in the road itself",
    intro:
      "First Nations crosswalks, community murals, memorial plazas and labyrinths — pieces where the artist's design becomes the pavement. We carry the work from drawing to surface: colour-matched StreetBond fields, factory-cut TrafficPatterns and DecoMark graphics, and the layout precision a circular motif or a woven crest demands.",
    products: ["streetbond", "trafficpatterns", "decomark", "duratherm"],
    seo: "Pavement public art — Indigenous artwork, community murals and memorial plazas installed in thermoplastic and StreetBond coatings across BC.",
  },
  "branding-wayfinding": {
    headline: "Logos and legends fused into the pavement",
    intro:
      "Campus marks, neighbourhood logos, corporate branding and wayfinding decals that are heat-fused into the asphalt rather than painted on it. DecoMark holds a logo's exact colour and geometry for years of foot and vehicle traffic; PreMark carries the symbols and legends; StreetBond fills the field behind them.",
    products: ["decomark", "streetbond", "premark", "duratherm"],
    seo: "Pavement branding and wayfinding — logos, decals and legends in DecoMark thermoplastic for campuses, retail and civic sites across BC.",
  },
}

const ORDER = WORK_APPS.filter((a) => a.slug !== "driveways").map((a) => a.slug)

export async function generateStaticParams() {
  return ORDER.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const meta = workAppMeta(slug)
  if (!meta || slug === "driveways") return {}
  const copy = COPY[slug as keyof typeof COPY]
  return {
    title: `${meta.label} | Decorative Pavement BC`,
    description: `${copy.seo} Square One Paving — installer of HUB Surface Systems products since 2000.`,
    alternates: { canonical: `https://squareonepaving.ca/applications/${slug}` },
  }
}

/** "Vancouver, BC" → "Vancouver" — the caption carries the city, not the province. */
function cityName(city: string): string {
  return city.split(",")[0].trim()
}

export default async function ApplicationPage({ params }: Props) {
  const { slug } = await params
  const meta = workAppMeta(slug)
  if (!meta || slug === "driveways") notFound()

  const copy = COPY[slug as keyof typeof COPY]
  const photos = workFor(meta.slug)
  const caseStudies = getProjectsByApplication(meta.label)
  const systems = copy.products
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const regions = [...new Set(photos.map((p) => p.region).filter(Boolean))]
  const idx = ORDER.indexOf(meta.slug)
  const prev = workAppMeta(ORDER[(idx - 1 + ORDER.length) % ORDER.length])
  const next = workAppMeta(ORDER[(idx + 1) % ORDER.length])

  return (
    <main className="bg-[color:var(--surface)]">
      {/* ── 01 Header ─────────────────────────────────────────────────────────────── */}
      <section className="section bg-[color:var(--surface)] pt-28 pb-16 max-[700px]:pt-[88px] max-[700px]:pb-12">
        <div className="container-1280">
          <Link
            href="/applications"
            className="eyebrow w-fit transition-colors hover:text-[color:var(--ink)]"
          >
            Applications · {meta.label}
          </Link>

          <h1 className="stop mt-7 max-w-[22ch] [text-wrap:balance]">{copy.headline}</h1>

          <p className="mt-7 max-w-[60ch] text-[19px] leading-[1.65] text-[color:var(--ink-body)] [text-wrap:pretty] max-[700px]:text-[17px]">
            {copy.intro}
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
            <a href={`tel:${PHONE.replace(/-/g, "")}`} className="arrow-link">
              {PHONE} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-8 border-t border-[color:var(--hairline)] pt-6 max-[700px]:grid-cols-1 max-[700px]:gap-5">
            <div>
              <dt className="label">On record</dt>
              <dd className="mt-2 text-[17px] font-semibold text-[color:var(--ink)]">
                {photos.length} installation photo{photos.length !== 1 ? "s" : ""}
              </dd>
            </div>
            <div>
              <dt className="label">Case studies</dt>
              <dd className="mt-2 text-[17px] font-semibold text-[color:var(--ink)]">
                {caseStudies.length > 0 ? caseStudies.length : "See the gallery"}
              </dd>
            </div>
            <div>
              <dt className="label">Regions</dt>
              <dd className="mt-2 text-[17px] font-semibold text-[color:var(--ink)]">
                {regions.length > 0 ? regions.join(" · ") : "Across BC"}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── 02 The work ─────────────────────────────────────────────────────────── */}
      <section className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface)]">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">Photographed on site</div>
              <h2 className="mt-4 [text-wrap:balance]">
                {meta.label} across BC
              </h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] text-[color:var(--ink-muted)]">
              Square One&rsquo;s own photography, captioned with the system installed and where.
              Archive shots stay small on purpose.
            </p>
          </div>

          <div className="mt-10">
            <WorkGallery photos={photos} ariaLabel={`${meta.label} installation photographs`} />
          </div>
        </div>
      </section>

      {/* ── 03 Systems ──────────────────────────────────────────────────────────── */}
      <section className="section border-y border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <h2>Systems for {meta.label.toLowerCase()}</h2>
            <Link href="/products" className="arrow-link whitespace-nowrap">
              All systems <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 min-[701px]:grid-cols-2 min-[1024px]:grid-cols-3">
            {systems.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="card group flex flex-col rounded-[2px] border border-[color:var(--hairline)] bg-[color:var(--surface)] p-6"
              >
                <div className="label">{p.category}</div>
                <h3 className="mt-3">{p.name}</h3>
                <p className="mt-[10px] text-[15px] leading-[1.55] text-[color:var(--ink-body)] [text-wrap:pretty]">
                  {p.tagline}
                </p>
                <span className="arrow-link mt-auto pt-6">
                  Specs and documents{" "}
                  <span aria-hidden="true" className="group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 Case studies ─────────────────────────────────────────────────────── */}
      {caseStudies.length > 0 && (
        <section className="section bg-[color:var(--surface)]">
          <div className="container-1280">
            <div className="flex flex-wrap items-baseline justify-between gap-6">
              <h2>Case studies</h2>
              <Link href="/projects" className="arrow-link whitespace-nowrap">
                All projects <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 min-[701px]:grid-cols-3">
              {caseStudies.map((project) => {
                const metaLine = [cityName(project.city), project.systems.join(" + "), project.year]
                  .filter((part): part is string => Boolean(part))
                  .join(" · ")
                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="card relative block aspect-[4/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]"
                  >
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
                      className="object-cover"
                    />
                    <div aria-hidden className="scrim" />
                    <ProjectCaption title={project.title} meta={metaLine} />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 05 Next ─────────────────────────────────────────────────────────────── */}
      <section className="border-t border-[color:var(--hairline)] bg-[color:var(--surface)] py-12">
        <div className="container-1280 flex flex-wrap items-center justify-between gap-6">
          {prev && (
            <Link href={`/applications/${prev.slug}`} className="arrow-link">
              <span aria-hidden="true">&larr;</span> {prev.label}
            </Link>
          )}
          <Link href="/applications" className="label transition-colors hover:text-[color:var(--ink)]">
            All applications
          </Link>
          {next && (
            <Link href={`/applications/${next.slug}`} className="arrow-link">
              {next.label} <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
