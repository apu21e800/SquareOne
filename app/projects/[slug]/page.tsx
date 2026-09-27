import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

import { projects, getProjectBySlug } from "@/lib/projects"
import { products } from "@/lib/products"
import { getPostBySlug } from "@/lib/blog"
import { galleryFor } from "@/lib/gallery"
import { WORK_APPS } from "@/lib/work"
import ProjectGallery from "@/components/ProjectGallery"
import Frame from "@/components/ui/Frame"
import { Section, Row } from "@/components/ui/Container"
import { SITE_URL } from "@/lib/site"
import { fitVars } from "@/lib/type"
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd"
import { clampDescription, pageTitle } from "@/lib/seo"

/**
 * A project page — 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the same
 * skeleton (header, the photograph, the facts, the narrative beside the
 * systems installed, the gallery, more projects) on the own-company
 * surface: no full stop, the caption UNDER the photograph, the systems as a
 * hairline block instead of a box, links as underlined words, the two
 * related projects as hairline rows with their captions under the frames.
 */

interface Props {
  params: Promise<{ slug: string }>
}

const serviceSlugMap: Record<string, string> = {
  "Stamped Asphalt": "stamped-asphalt",
  "Decorative Coatings": "decorative-coatings",
  "Preformed Thermoplastic": "preformed-thermoplastic",
  "Vapour Blasting": "vapor-blasting",
}

/**
 * Display copy only. The service strings in lib/projects.ts and the route
 * slugs above are untouched — "Vapour Blasting" stays the datum, "Vapour
 * blasting" is what the page reads.
 */
const serviceLabel: Record<string, string> = {
  "Stamped Asphalt": "Stamped asphalt",
  "Decorative Coatings": "Decorative coatings",
  "Preformed Thermoplastic": "Preformed thermoplastic",
  "Vapour Blasting": "Vapour blasting",
}

/** Two rows fill "More projects" without leaving an orphan. */
const RELATED_COUNT = 2

/** "Vancouver, BC" → "Vancouver" — the caption carries the city, not the province. */
function cityName(city: string): string {
  return city.split(",")[0].trim()
}

/** City · Systems · Year, skipping anything the record does not carry. */
function metaLine(city: string, systems: string[], year?: string): string {
  return [cityName(city), systems.join(" + "), year]
    .filter((part): part is string => Boolean(part))
    .join(" · ")
}

/** Where this application's gallery lives. */
function applicationHref(label: string): string | undefined {
  const app = WORK_APPS.find((a) => a.label === label)
  if (!app) return undefined
  return app.slug === "driveways" ? "/driveways" : `/applications/${app.slug}`
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: { absolute: pageTitle(project.title) },
    description: clampDescription(project.excerpt),
    alternates: { canonical: `${SITE_URL}/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: clampDescription(project.excerpt),
      images: [project.imageUrl],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  // The record's curated images lead; anything extra dropped into
  // public/images/projects/<slug>/ follows, de-duplicated by filename.
  const curatedNames = new Set(project.images.map((p) => decodeURIComponent(p.split("/").pop()!.toLowerCase())))
  const extras = galleryFor("projects", slug).filter(
    (p) => !curatedNames.has(decodeURIComponent(p.split("/").pop()!.toLowerCase())),
  )
  const gallery = [...project.images, ...extras]
  const heroImage = gallery[0]
  const galleryRest = gallery.slice(1)

  const serviceSlug = serviceSlugMap[project.service] ?? "stamped-asphalt"
  const serviceName = serviceLabel[project.service] ?? project.service

  // The systems installed, from the catalogue — the manufacturer's own
  // description and figures, attributed on the page. "StreetBond150" and
  // the like resolve to the StreetBond entry.
  const installed = project.systems
    .map((name) => products.find((p) => p.name === name || (name.startsWith("StreetBond") && p.name === "StreetBond")))
    .filter((p, i, all): p is NonNullable<typeof p> => Boolean(p) && all.indexOf(p) === i)

  // The blog post that tells this project in full, when the record has one.
  const post = getPostBySlug(project.post ?? slug)
  const caption = metaLine(project.city, project.systems, project.year)
  const appHref = applicationHref(project.application)

  const facts: { label: string; value: string; href?: string }[] = [
    { label: "Location", value: project.city },
    ...(project.year ? [{ label: "Year", value: project.year }] : []),
    // No "Client" row: the client's rule (18–19 Sept 2026) is that the site
    // claims the ground and not the contract — "installed at", never "for".
    { label: project.systems.length > 1 ? "Systems" : "System", value: project.systems.join(", ") },
    { label: "Application", value: project.application, href: appHref },
  ]

  // Related — same application first, then same region, always with different hero images.
  const seen = new Set<string>([project.imageUrl])
  const related: typeof projects = []
  for (const pool of [
    projects.filter((p) => p.slug !== slug && p.application === project.application),
    projects.filter((p) => p.slug !== slug && p.region === project.region),
    projects.filter((p) => p.slug !== slug),
  ]) {
    for (const p of pool) {
      if (related.length === RELATED_COUNT) break
      if (seen.has(p.imageUrl) || related.includes(p)) continue
      seen.add(p.imageUrl)
      related.push(p)
    }
  }

  return (
    <main className="bg-[color:var(--surface)]">
      <JsonLd data={[breadcrumbSchema(SITE_URL, [{ name: "Projects", path: "/projects" }, { name: project.title, path: `/projects/${project.slug}` }])]} />

      {/* ── 01 Project header ──────── */}
      <section className="pt-[calc(var(--bar-h)+96px)] max-[700px]:pt-[calc(var(--bar-h)+56px)]">
        <div className="container-1280">
          <Link href="/projects" className="link">
            Projects
          </Link>

          {/* One sizing mechanism, not two: lib/type.ts now carries both the
              length judgement the old headlineSize() made and the longest-word
              ceiling it could not make. */}
          <div className="fit-host mt-6 max-w-[54rem]">
            <h1 className="display-fit [text-wrap:balance]" style={fitVars(project.title)}>
              {project.title}
            </h1>
          </div>
        </div>

        {project.heroWide ? (
          /* Full-bleed frame; the caption under it, in the column. */
          <figure className="m-0 mt-10">
            <div className="relative aspect-[21/9] overflow-hidden bg-[color:var(--surface-stone)] max-[700px]:aspect-[3/2]">
              <Image
                src={heroImage}
                alt={project.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="container-1280">
              <figcaption className="cap">{caption}</figcaption>
            </div>
          </figure>
        ) : (
          /* Archive-scale photography stays contained — never full-bleed. */
          <div className="container-1280">
            <Frame
              className="mt-10 max-w-[960px]"
              src={heroImage}
              alt={project.title}
              caption={caption}
              aspect="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 960px"
              priority
            />
          </div>
        )}

        <div className="container-1280">
          <dl className={`grid gap-10 border-b border-hairline pt-12 pb-[88px] max-[700px]:grid-cols-2 max-[700px]:gap-x-6 max-[700px]:gap-y-7 max-[700px]:pb-14 ${
            facts.length >= 5 ? "grid-cols-5" : "grid-cols-4"
          }`}>
            {facts.map((fact) => (
              <div key={fact.label} className="border-t border-hairline pt-4">
                <dt className="label">{fact.label}</dt>
                <dd className="mt-2 text-[18px] leading-[1.4] text-ink [text-wrap:pretty]">
                  {fact.href ? (
                    <Link href={fact.href} className="link">
                      {fact.value}
                    </Link>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 02 Narrative ──────── */}
      <section className="section bg-[color:var(--surface)] pb-28 max-[700px]:pb-14">
        <div className="container-1280">
          <div className="grid grid-cols-12 gap-x-12 gap-y-12 max-[900px]:grid-cols-1">
            <div className="col-span-7 max-[900px]:col-span-1">
              <p className="lede max-w-[60ch] [text-wrap:pretty]">
                {project.excerpt}
              </p>

              {project.story?.map((paragraph, i) => (
                <p
                  key={i}
                  className={`max-w-[60ch] text-ink-body [text-wrap:pretty] ${i === 0 ? "mt-8" : "mt-5"}`}
                >
                  {paragraph}
                </p>
              ))}

              {project.artist && (
                <div className="mt-8 max-w-[60ch]">
                  <span className="label">Design</span>
                  <p className="mt-1 text-[15px] leading-[1.6] text-ink-muted">{project.artist}</p>
                </div>
              )}

              {post && (
                <p className="mt-8">
                  <Link href={`/blog/${post.slug}`} className="link">
                    Read the full story: {post.title}
                  </Link>
                </p>
              )}
            </div>

            {installed.length > 0 && (
              <aside className="col-span-5 max-[900px]:col-span-1">
                <div className="border-t border-hairline pt-6">
                  <h2 className="label">{installed.length > 1 ? "The systems installed" : "The system installed"}</h2>
                  {installed.map((product) => (
                    <div key={product.slug} className="mt-6 border-t border-hairline pt-5 first:mt-3 first:border-t-0 first:pt-0">
                      <h3>
                        {product.name}
                        {product.mark && <sup className="ml-[1px] text-[0.55em] font-normal">{product.mark}</sup>}
                      </h3>
                      <p className="mt-2 text-[16px] leading-[1.6] text-ink-body">{product.shortDescription}</p>
                      <ul className="mt-4">
                        {product.keyBenefits.slice(0, 3).map((benefit) => (
                          <li key={benefit} className="border-t border-hairline py-[9px] text-[15px] leading-[1.5] text-ink-body">
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4">
                        <Link href={`/products/${product.slug}`} className="link">
                          {product.name}
                        </Link>
                      </p>
                    </div>
                  ))}
                  <p className="mt-6 text-[14px] italic leading-[1.55] text-ink-muted">
                    Descriptions and figures are the manufacturer&rsquo;s. Square One
                    installs the system and warrants the workmanship.
                  </p>
                </div>
              </aside>
            )}
          </div>

          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
            <Link href={`/services/${serviceSlug}`} className="link">
              More on {serviceName.toLowerCase()}
            </Link>
            {appHref && (
              <Link href={appHref} className="link">
                All {project.application.toLowerCase()} work
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── 03 Gallery — every photograph opens the full-screen viewer ──────── */}
      {galleryRest.length > 0 && (
        <section className="section border-y border-hairline bg-[color:var(--surface-warm)]">
          <div className="container-1280">
            <ProjectGallery
              caption={caption}
              photos={gallery.map((src, i) => ({
                src,
                alt: i === 0 ? project.title : `${project.title} — photo ${i + 1} of ${gallery.length}`,
                primary: project.title,
                secondary: caption,
              }))}
            />
          </div>
        </section>
      )}

      {/* ── 04 More projects — two hairline rows ──────── */}
      {related.length > 0 && (
        <Section label="Projects" title="More projects" link={{ href: "/projects", label: "All projects" }} wide>
          <div>
            {related.map((p) => (
              <Row key={p.slug} as="article">
                <Frame
                  src={p.imageUrl}
                  alt={p.title}
                  caption={metaLine(p.city, p.systems, p.year)}
                  aspect="aspect-[4/3]"
                  sizes="(max-width: 700px) 100vw, 520px"
                  href={`/projects/${p.slug}`}
                />
                <div className="min-w-0">
                  <span className="label">{p.application}</span>
                  <h3 className="mt-1">
                    <Link href={`/projects/${p.slug}`} className="text-ink hover:underline hover:underline-offset-[5px] hover:decoration-1">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.6] text-ink-body [text-wrap:pretty]">{p.excerpt}</p>
                </div>
              </Row>
            ))}
          </div>
        </Section>
      )}
    </main>
  )
}
