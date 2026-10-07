import type { Metadata } from "next"
import Link from "next/link"

import { projects } from "@/lib/projects"
import { WORK_APPS } from "@/lib/work"
import IndexImageHero from "@/components/IndexImageHero"
import { Section } from "@/components/ui/Container"
import ProjectsIndexClient, { type ProjectCard } from "./ProjectsIndexClient"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

/**
 * Projects index.
 *
 *   Header   full-bleed opener, the title over the photograph
 *   Listing  one-line filter bar, a lead row, then a grid of frames with
 *            their captions under them                                paper
 *   By use   the work by application — hairline rows of links         warm
 *   Close    rendered once by app/layout.tsx (Footer)
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7, §5 step 5): the same
 * skeleton on the own-company surface — no eyebrow with a square, no
 * full stop, no cards, no captions over gradients, no arrows; the
 * "by application" band is a Section with its label in the margin.
 *
 * Every record is a project Square One has published, with the studio's
 * own photography. The gallery-scale record lives on the application
 * pages, linked from the bottom row.
 *
 * No counts anywhere on this page — not of projects, not of photographs.
 * The client, 10 Sept 2026: "we have done 1000s of jobs and it makes it
 * seem like we have only done 194." A published count reads as a ceiling.
 */

export const metadata: Metadata = {
  openGraph: { title: "Decorative Pavement Projects Across BC", description: clampDescription("Square One Paving projects across BC: crosswalks, public art, spray parks, parking lots and driveways, each with the system installed and the place."), images: [{ url: "/images/S1_update_v2/photos/Featured%20image%20options/502639628_1112360040926014_5391735583045489560_n.jpg" }] },
  title: "Decorative Pavement Projects Across BC",
  description:
    clampDescription("Square One Paving projects across BC: crosswalks, public art, spray parks, parking lots and driveways, each with the system installed and the place."),
  alternates: { canonical: `${SITE_URL}/projects` },
}

const APP_HREF: Record<string, string> = Object.fromEntries(
  WORK_APPS.map((a) => [a.slug, a.slug === "driveways" ? "/driveways" : `/applications/${a.slug}`]),
)

export default function ProjectsPage() {
  // 28 Sept 2026 (Vern: "more recent images… up front"): newest first. The
  // projects with a published year lead, latest year first; the rest keep
  // the record's own order behind them (Array.prototype.sort is stable).
  const newestFirst = [...projects].sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0))
  const cards: ProjectCard[] = newestFirst.map((project) => ({
    slug: project.slug,
    title: project.title,
    application: project.application,
    region: project.region,
    city: project.city,
    systems: project.systems,
    year: project.year,
    excerpt: project.excerpt,
    src: project.imageUrl,
  }))

  const byUse = WORK_APPS.map((a) => ({ ...a, href: APP_HREF[a.slug] }))

  return (
    <main className="bg-[color:var(--surface)]">
      {/* 28 Sept 2026: the opener was the White Rock pier project's own lead
          frame, so it showed twice on this page; the Cadboro Bay traffic
          circle (May 2026) is on the record and leads no project. */}
      <IndexImageHero
        src="/images/applications/public-art/oak-bay-village-intersection-wide-streetbond-01.jpg"
        alt="An octopus and fish on a blue sea, painted in StreetBond on the Cadboro Bay Village traffic circle in Saanich, the village shops behind"
        eyebrow="Projects"
        title={<>Decorative pavement projects <em>across BC</em></>}
        fit="Decorative pavement projects across BC"
        lede="Municipal, commercial and residential work, each with the system and the place on record."
        caption="Cadboro Bay, Saanich · Village traffic circle · StreetBond"
        imagePosition="center 55%"
      />

      <ProjectsIndexClient projects={cards} />

      {/* ── By application — the galleries, as hairline rows of links ──────── */}
      <Section
        label="The galleries"
        title={<>The work, <em>by application</em></>}
        link={{ href: "/galleries", label: "All the galleries" }}
        tone="warm"
        wide
      >
        <ul className="grid grid-cols-1 gap-x-8 min-[560px]:grid-cols-2 min-[701px]:grid-cols-3 min-[1024px]:grid-cols-5">
          {byUse.map((a) => (
            <li key={a.slug}>
              <Link
                href={a.href}
                className="block border-t border-hairline py-4 text-[18px] font-bold leading-[1.25] text-ink transition-colors hover:underline hover:underline-offset-[5px] hover:decoration-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {a.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  )
}
