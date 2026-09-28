import type { Metadata } from "next"
import Link from "next/link"

import { WORK_APPS, getWork, workFor, workForRegion, type WorkPhoto } from "@/lib/work"
import { products } from "@/lib/products"
import IndexImageHero from "@/components/IndexImageHero"
import WorkGallery from "@/components/WorkGallery"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

/**
 * Galleries hub — every photograph Square One has on record, opened by
 * application, by system, by region, then all at once (Vern, 4 Sept 2026:
 * "Jan likes to be able to show clients image galleries to showcase
 * products and applications"). The old site's /galleries lives on here:
 * its ten galleries are the first grid, one for one. Every frame on every
 * gallery page opens full screen (components/WorkGallery).
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7, §5 step 5): the same four
 * bands on the own-company surface. Each gallery is a square-cornered
 * frame with its name UNDER it — no gradient, no text over the
 * photograph, no arrows — and each band is a Section with its label in
 * the margin column and its one link as an underlined word.
 *
 * No photograph counts on this page (the client, 16 Sept 2026: "don't love
 * saying the numbers"); the counts are used only to decide which frames
 * exist and in what order.
 */

export const metadata: Metadata = {
  openGraph: { title: "Photo Galleries: Our Work Across BC", images: [{ url: "/images/hero/white-rock-pier-crosswalk-trafficpatternsxd.jpg" }] },
  // One separator: the root template adds " | Square One Paving" (56 chars all in).
  title: "Photo Galleries: Our Work Across BC",
  description:
    clampDescription("Square One Paving’s own photographs of decorative pavement in BC: crosswalks, parks, schools, public art, parking lots and driveways, by system and region."),
  keywords: [
    "stamped asphalt photos BC",
    "decorative crosswalk photos",
    "StreetPrint gallery",
    "StreetBond gallery",
    "decorative pavement gallery BC",
  ],
  alternates: { canonical: `${SITE_URL}/galleries` },
}

/** The sharpest available frame leads a gallery. */
function cover(photos: WorkPhoto[]): WorkPhoto | undefined {
  return photos.find((p) => p.hires && p.w >= 1600) ?? photos.find((p) => p.hires) ?? photos[0]
}

/** One gallery: the frame, its name under it in Futura, the whole thing the link. */
function GalleryCover({
  href,
  photo,
  title,
  sizes,
  priority = false,
}: {
  href: string
  photo?: Pick<WorkPhoto, "src">
  title: string
  sizes: string
  priority?: boolean
}) {
  return (
    <Frame
      src={photo?.src}
      alt={photo ? `${title}, gallery of Square One installations` : ""}
      aspect="aspect-[4/3]"
      sizes={sizes}
      priority={priority}
      href={href}
      caption={
        <span className="block not-italic font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </span>
      }
    />
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

  // The supporting service gets its own frame (Vern, 19 Sept: "add the
  // images to the galleries section"). Its frames are not all from the
  // record, so they live on the service page in labelled groups rather than
  // in lib/work.ts; the cover is Square One's own Granville Island job.
  const vapour = {
    slug: "vapour-blasting",
    label: "Vapour blasting",
    href: "/services/vapor-blasting#gallery",
    count: 0,
    photo: { src: "/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg" },
  }

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

  const threeUp = "(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
  const fourUp = "(max-width: 700px) 100vw, (max-width: 1280px) 25vw, 300px"

  return (
    <main className="bg-[color:var(--surface)]">
      <IndexImageHero
        src="/images/hero/white-rock-pier-crosswalk-trafficpatternsxd.jpg"
        alt="Red brick-pattern TrafficPatternsXD crosswalk with white edge lines, leading across the road to the White Rock Pier and the beach"
        eyebrow="Galleries"
        title="Photographs of our own work"
        lede="Square One's own installation photography across the Lower Mainland and Vancouver Island, captioned with the system and the place it was installed, by application, by system and by region."
        caption="White Rock Pier · TrafficPatternsXD · 2019"
        imagePosition="center 62%"
      />

      {/* ── By application ──────── */}
      <Section
        id="galleries-applications"
        label="By application"
        title="A gallery for each kind of work"
        link={{ href: "/applications", label: "The application pages" }}
        wide
      >
        <ul className="grid grid-cols-3 gap-x-7 gap-y-10 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {byApplication.map((g, i) => (
            <li key={g.slug}>
              <GalleryCover href={g.href} photo={g.photo} title={g.label} sizes={threeUp} priority={i < 3} />
            </li>
          ))}
          <li key={vapour.slug}>
            <GalleryCover href={vapour.href} photo={vapour.photo} title={vapour.label} sizes={threeUp} />
          </li>
        </ul>
      </Section>

      {/* ── By system ──────── */}
      <Section
        id="galleries-systems"
        label="By system"
        title="The same photographs, sorted by what was installed"
        link={{ href: "/products", label: "The systems" }}
        tone="warm"
        wide
      >
        <ul className="grid grid-cols-4 gap-x-7 gap-y-10 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {bySystem.map((g) => (
            <li key={g.slug}>
              <GalleryCover href={g.href} photo={g.photo} title={g.name} sizes={fourUp} />
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Driveways and projects ──────── */}
      <Section id="galleries-more" label="Driveways and projects" title="For homeowners, and for the full story" wide>
        <div className="grid grid-cols-3 gap-x-7 gap-y-10 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {driveways.map((g) => (
            <GalleryCover key={g.href} href={g.href} photo={cover(g.photos)} title={g.label} sizes={threeUp} />
          ))}
          <div className="border-t border-hairline pt-6">
            <span className="label">Projects</span>
            <h3 className="mt-1">Projects, told in full</h3>
            <p className="mt-3 max-w-[40ch] text-[16px] leading-[1.6] text-ink-body [text-wrap:pretty]">
              Each with its photographs, the systems installed and the place, and the
              story behind the crossing, the plaza or the driveway.
            </p>
            <p className="mt-5">
              <Link href="/projects" className="link">
                All projects
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {/* ── Every photograph ──────── */}
      <Section
        id="galleries-all"
        label="All the galleries, together"
        title="A selection from years of work across BC"
        intro="A sample of the work, not the full list. Filter by system or region, then click any photograph to open the viewer."
        tone="warm"
        wide
      >
        <WorkGallery photos={all} initial={12} ariaLabel="Every installation photograph on record" />
      </Section>
    </main>
  )
}
