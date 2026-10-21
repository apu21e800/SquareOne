import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { WORK_APPS, workAppMeta } from "@/lib/work"
import { studioWorkFor } from "@/lib/work-cms"
import { APP_HEROES } from "@/lib/app-heroes"
import IndexImageHero from "@/components/IndexImageHero"
import { getProjects } from "@/lib/projects-cms"
import { photoMetaFor } from "@/lib/projects"
import { getSiteSettings } from "@/lib/cms"
import { telHref } from "@/lib/site-settings"
import OpenerTitle from "@/components/ui/OpenerTitle"
import { openerFor } from "@/lib/page-content"
import { products } from "@/lib/products"
import WorkGallery from "@/components/WorkGallery"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import { SITE_URL } from "@/lib/site"
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd"
import { clampDescription } from "@/lib/seo"
import { plainCase } from "@/lib/text"
import { APP_COPY as COPY } from "@/lib/application-copy"

/**
 * Application page — one template, nine pages (driveways has its own pillar
 * at /driveways and is excluded here).
 *
 *   01 Opener      the record's frame for this kind of work, full bleed,
 *                  eyebrow + h1 over it (lib/app-heroes.ts; 19 Sept 2026 —
 *                  before that these nine pages opened on text alone)
 *   01b Intro      the paragraphs, related links, the one button and the
 *                  record line (systems · projects · regions) as a list  paper
 *   02 The work    the captioned gallery, under a margin-column header   paper
 *   03 Systems     hairline rows for this application's systems          warm
 *   04 Projects    frames with the title and place UNDER them            paper
 *   05 Next        prev / next application, underlined words             paper
 *   Close          slate — Footer, rendered once by app/layout.tsx
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the same five beats, the
 * same words; section headers are the `Section` primitive, cards are rows
 * or frames with the caption under, links are underlined, no arrows.
 *
 * Every photograph on these pages is Square One's own, captioned with the
 * system and the place. Low-res archive shots never leave tile scale.
 *
 * The words (COPY) live in lib/application-copy.ts since 14 Oct 2026, where
 * the blog drafter reads them too; its copy rules (CANON) are there.
 */

interface Props {
  params: Promise<{ slug: string }>
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
    title: copy.title,
    description: clampDescription(copy.seo),
    openGraph: { title: copy.headline, description: clampDescription(copy.seo), images: [{ url: APP_HEROES[slug as keyof typeof APP_HEROES].src, alt: APP_HEROES[slug as keyof typeof APP_HEROES].alt }] },
    alternates: { canonical: `${SITE_URL}/applications/${slug}` },
  }
}

/** "Vancouver, BC" → "Vancouver" — the caption carries the city, not the province. */
function cityName(city: string): string {
  return city.split(",")[0].trim()
}

export default async function ApplicationPage({ params }: Props) {
  // The office line, from Site Settings (lib/site-settings.ts).
  const site = await getSiteSettings()
  const { slug } = await params
  const meta = workAppMeta(slug)
  if (!meta || slug === "driveways") notFound()

  const copy = COPY[slug as keyof typeof COPY]
  const hero = APP_HEROES[slug as keyof typeof APP_HEROES]
  // The opener as the page has it, with whatever the Studio says on top
  // (a "Page opener" for this application; lib/page-content.ts, 9 Oct 2026).
  const o = await openerFor(
    { page: `/applications/${slug}`, label: meta.label, src: hero.src, alt: hero.alt, caption: hero.caption, position: hero.position, head: copy.headline },
  )
  // This application's gallery, the Studio's photographs included (lib/work-cms.ts, 9 Oct 2026).
  const photos = await studioWorkFor(meta.slug)
  // The Studio's projects (lib/projects-cms.ts, 9 Oct 2026), this application's.
  const caseStudies = (await getProjects()).filter((p) => p.application === meta.label)
  // The gallery skips the opener's frame and the case-study leads told in
  // full further down, so no photograph appears twice on the page.
  const onPage = new Set([hero.src, ...caseStudies.map((p) => p.imageUrl)])
  const galleryPhotos = photos.filter((p) => !onPage.has(p.src))
  const systems = copy.products
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const regions = [...new Set(photos.map((p) => p.region).filter(Boolean))]
  // The systems that appear in this application's photographs, most-photographed first.
  const photographed = [
    ...photos.reduce((m, p) => {
      for (const s of p.systems) m.set(s, (m.get(s) ?? 0) + 1)
      return m
    }, new Map<string, number>()),
  ]
    .sort((a, b) => b[1] - a[1])
    .map(([s]) => s)
    .slice(0, 4)
  const idx = ORDER.indexOf(meta.slug)
  const prev = workAppMeta(ORDER[(idx - 1 + ORDER.length) % ORDER.length])
  const next = workAppMeta(ORDER[(idx + 1) % ORDER.length])

  return (
    <main className="bg-[color:var(--surface)]">
      <JsonLd data={[breadcrumbSchema(SITE_URL, [{ name: "Applications", path: "/applications" }, { name: meta.label, path: `/applications/${slug}` }])]} />
      {/* ── 01 Opener — the record's frame for this kind of work ─────────────────── */}
      <IndexImageHero
        src={o.src}
        alt={o.alt}
        edit={o.edit}
        eyebrow={`Applications · ${meta.label}`}
        title={<OpenerTitle head={o.head} tail={o.tail} />}
        lede={o.lede}
        caption={o.caption}
        imagePosition={o.position}
      />

      {/* ── 01b Intro: the lede and the way in on the left, the record as a
             ledger on the right (28 Sept 2026 QA: 30 lines of copy with the
             right half of the page empty; the later paragraphs listed the
             places the gallery captions already name) ─────────────────────── */}
      <section className="bg-surface pt-16 pb-16 max-[700px]:pt-10 max-[700px]:pb-12">
        <div className="container-1280 grid grid-cols-12 items-start gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
          <div className="col-span-7 max-[900px]:col-span-1">
            <Link href="/applications" className="link">
              All applications
            </Link>

            <p className="lede mt-6 max-w-[56ch] [text-wrap:pretty]">
              {(copy.intro[0] ?? "").split(/(?<=[.!?])\s+(?=[A-Z])/).slice(0, 2).join(" ")}
            </p>

            <p className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
              {copy.links.map((l) => (
                <Link key={l.href} href={l.href} className="link">
                  {l.label}
                </Link>
              ))}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/contact" className="btn-primary">
                Get a quote
              </Link>
              <a href={telHref(site.phoneOffice)} className="link">
                {site.phoneOffice}
              </a>
            </div>
          </div>

          {/* The record line, as a ledger beside the lede. */}
          <dl className="spec-notes col-span-5 max-[900px]:col-span-1 min-[901px]:mt-12">
            <div>
              <dt>Systems</dt>
              <dd>{photographed.length > 0 ? photographed.join(" · ") : "See the gallery"}</dd>
            </div>
            <div>
              <dt>Projects</dt>
              {/* No count: a published number reads as a ceiling on the work
                  (the client, 10 Sept 2026). The row points at the projects. */}
              <dd>
                {caseStudies.length > 0 ? (
                  <a href="#projects" className="link">Told in full, below</a>
                ) : (
                  "See the gallery"
                )}
              </dd>
            </div>
            <div>
              <dt>Regions</dt>
              <dd>{regions.length > 0 ? regions.join(" · ") : "Across BC"}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── 02 The work ─────────────────────────────────────────────────────────── */}
      <Section
        id="work"
        label="Photographed on site"
        title={copy.work}
        intro="Square One’s own photography, captioned with the system installed and where."
        wide
      >
        <WorkGallery photos={galleryPhotos} ariaLabel={`${meta.label} installation photographs`} />
      </Section>

      {/* ── 03 Systems — hairline rows, the whole row a link; "Specs and
             documents" came off every card (docs/OWN-COMPANY-BRIEF.md §3.5) ── */}
      <Section
        id="systems"
        label="The systems"
        title={<>Systems installed <em>for {meta.label.toLowerCase()}</em></>}
        link={{ href: "/products", label: "All systems" }}
        tone="warm"
        wide
      >
        <ul role="list">
          {systems.map((p) => (
            <li
              key={p.slug}
              className="relative grid grid-cols-12 gap-x-10 gap-y-1 border-t border-hairline py-6 last:border-b max-[700px]:grid-cols-1"
            >
              <Link href={`/products/${p.slug}`} aria-label={`${p.name}, the system`} className="absolute inset-0 z-[2]" />
              <span className="label col-span-3 pt-1 max-[700px]:col-span-1">{plainCase(p.category)}</span>
              <div className="col-span-9 min-w-0 max-[700px]:col-span-1">
                <h3>
                  {p.name}
                  {p.mark && <sup className="ml-[1px] text-[0.55em] font-normal">{p.mark}</sup>}
                </h3>
                <p className="mt-2 max-w-[60ch] text-[16px] leading-[1.55] text-ink-body [text-wrap:pretty]">
                  {p.tagline}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── 04 Projects — frames with the title and the record's
             place · system · year UNDER them ─────────────────────────────── */}
      {caseStudies.length > 0 && (
        <Section id="projects" label="Projects" title={<>Projects <em>on record</em></>} link={{ href: "/projects", label: "All projects" }} wide>
          <ul className="grid grid-cols-1 gap-x-7 gap-y-10 min-[701px]:grid-cols-3" role="list">
            {caseStudies.map((project) => {
              const city = cityName(project.city)
              const metaLine = [city, project.systems.join(" + "), project.year]
                .filter((part): part is string => Boolean(part))
                .join(" · ")
              // What the photograph shows: the project, the system, the city when the title does not already carry it.
              const alt = [
                project.title,
                `in ${project.systems.join(" and ")}`,
                project.title.includes(city) ? "" : `, ${city}, BC`,
              ]
                .filter(Boolean)
                .join(" ") + ". Installed by Square One Paving."
              return (
                <li key={project.slug}>
                  <Frame
                    src={project.imageUrl}
                    alt={alt}
                    position={photoMetaFor(project, project.imageUrl)?.position}
                    aspect="aspect-[4/3]"
                    sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
                    href={`/projects/${project.slug}`}
                    caption={
                      <>
                        <span className="block not-italic font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
                          {project.title}
                        </span>
                        <span className="block">{metaLine}</span>
                      </>
                    }
                  />
                </li>
              )
            })}
          </ul>
        </Section>
      )}

      {/* ── 05 Next ─────────────────────────────────────────────────────────────── */}
      <section className="border-t border-hairline bg-surface py-12">
        <div className="container-1280 flex flex-wrap items-baseline justify-between gap-6">
          {prev && (
            <Link href={`/applications/${prev.slug}`} className="link">
              {prev.label}
            </Link>
          )}
          <Link href="/applications" className="link">
            All applications
          </Link>
          {next && (
            <Link href={`/applications/${next.slug}`} className="link">
              {next.label}
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
