import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { WORK_APPS, getWork, workFor, workForRegion, type WorkPhoto } from "@/lib/work"
import { products } from "@/lib/products"
import { projects } from "@/lib/projects"
import IndexImageHero from "@/components/IndexImageHero"
import WorkGallery from "@/components/WorkGallery"
import ProjectCaption from "@/components/ui/ProjectCaption"

/**
 * Galleries hub — every photograph Square One has on record, opened by
 * application, by system, by region, then all at once (Vern, 4 Sept 2026:
 * "Jan likes to be able to show clients image galleries to showcase
 * products and applications"). The old site's /galleries lives on here:
 * its ten galleries are the first grid, one for one. Every tile on every
 * gallery page opens full screen (components/WorkGallery).
 */

export const metadata: Metadata = {
  title: "Image Galleries | Decorative Pavement Across BC",
  description:
    "Photographs of Square One Paving's own work across BC — crosswalks, streetscapes, parks, schools, public art, parking lots, bike lanes, branding and driveways — by application, by system and by region.",
  alternates: { canonical: "https://squareonepaving.ca/galleries" },
}

/** The sharpest available frame leads a gallery card. */
function cover(photos: WorkPhoto[]): WorkPhoto | undefined {
  return photos.find((p) => p.hires && p.w >= 1600) ?? photos.find((p) => p.hires) ?? photos[0]
}

function GalleryCard({
  href,
  photo,
  title,
  count,
  priority = false,
}: {
  href: string
  photo?: WorkPhoto
  title: string
  count: number
  priority?: boolean
}) {
  return (
    <Link
      href={href}
      className="card relative block aspect-[4/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]"
    >
      {photo && (
        <Image
          src={photo.src}
          alt={`${title} — ${count} photographs`}
          fill
          priority={priority}
          sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
          className="object-cover"
        />
      )}
      <div aria-hidden className="scrim" />
      <ProjectCaption title={title} meta={`${count} photograph${count === 1 ? "" : "s"}`} />
    </Link>
  )
}

export default function GalleriesPage() {
  const all = getWork()

  const byApplication = WORK_APPS.map((a) => {
    const photos = workFor(a.slug)
    return {
      slug: a.slug,
      label: a.label,
      href: a.slug === "driveways" ? "/driveways#gallery" : `/applications/${a.slug}`,
      count: photos.length,
      photo: cover(photos),
    }
  }).filter((g) => g.count > 0)

  const bySystem = products
    .map((p) => {
      const photos = all.filter((photo) =>
        photo.systems.some((s) => s === p.name || (p.name === "StreetBond" && s.startsWith("StreetBond"))),
      )
      return { slug: p.slug, name: p.name, href: `/products/${p.slug}#work`, count: photos.length, photo: cover(photos) }
    })
    .filter((g) => g.count > 0)
    .sort((a, b) => b.count - a.count)

  const driveways = [
    { label: "Vancouver & the Lower Mainland", href: "/driveways/vancouver", photos: workForRegion("driveways", "Lower Mainland") },
    { label: "Victoria & Vancouver Island", href: "/driveways/victoria", photos: workForRegion("driveways", "Vancouver Island") },
  ].filter((g) => g.photos.length > 0)

  return (
    <main className="bg-[color:var(--surface)]">
      <IndexImageHero
        src="/images/hero/white-rock-pier-crosswalk-trafficpatternsxd.jpg"
        alt="Red TrafficPatternsXD crosswalk leading to the White Rock Pier"
        eyebrow="Galleries"
        title={`${all.length} photographs of our own work`}
        lede="Every gallery on this page is Square One's own installation photography, captioned with the system and the place. Open a gallery, then click any photograph to view it full screen — arrows, keyboard and swipe walk the set."
        caption="White Rock Pier · TrafficPatternsXD · 2019"
        imagePosition="center 62%"
      />

      {/* ── By application ──────── */}
      <section className="section" aria-labelledby="galleries-applications">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">By application</div>
              <h2 id="galleries-applications" className="mt-4 [text-wrap:balance]">
                {byApplication.length} galleries, one for each kind of work
              </h2>
            </div>
            <Link href="/applications" className="arrow-link whitespace-nowrap">
              The application pages <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {byApplication.map((g, i) => (
              <GalleryCard key={g.slug} href={g.href} photo={g.photo} title={g.label} count={g.count} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>

      {/* ── By system ──────── */}
      <section className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface-warm)]" aria-labelledby="galleries-systems">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">By system</div>
              <h2 id="galleries-systems" className="mt-4 [text-wrap:balance]">
                The same photographs, sorted by what was installed
              </h2>
            </div>
            <Link href="/products" className="arrow-link whitespace-nowrap">
              The systems <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-6 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {bySystem.map((g) => (
              <GalleryCard key={g.slug} href={g.href} photo={g.photo} title={g.name} count={g.count} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Driveways and case studies ──────── */}
      <section className="section border-t border-[color:var(--hairline)]" aria-labelledby="galleries-more">
        <div className="container-1280">
          <div className="eyebrow">Driveways and case studies</div>
          <h2 id="galleries-more" className="mt-4 [text-wrap:balance]">
            For homeowners, and for the full story
          </h2>

          <div className="mt-10 grid grid-cols-3 gap-6 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {driveways.map((g) => (
              <GalleryCard key={g.href} href={g.href} photo={cover(g.photos)} title={g.label} count={g.photos.length} />
            ))}
            <Link
              href="/projects"
              className="card-panel min-h-[240px] justify-between rounded-[2px]"
            >
              <div>
                <div className="label">Case studies</div>
                <h3 className="mt-4 text-[22px] leading-[1.25]">{projects.length} projects, told in full</h3>
                <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
                  Each with its photographs, the systems installed, the place and the year.
                </p>
              </div>
              <span className="arrow-link mt-6">
                Projects <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Every photograph ──────── */}
      <section className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface-warm)]" aria-labelledby="galleries-all">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">Everything on record</div>
              <h2 id="galleries-all" className="mt-4 [text-wrap:balance]">
                All {all.length} photographs
              </h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] text-[color:var(--ink-muted)]">
              Filter by system or region, then click any photograph to open the viewer.
            </p>
          </div>
          <div className="mt-10">
            <WorkGallery photos={all} initial={12} ariaLabel="Every installation photograph on record" />
          </div>
        </div>
      </section>
    </main>
  )
}
