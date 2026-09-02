import type { Metadata } from "next"
import Link from "next/link"

import { projects } from "@/lib/projects"
import { WORK_APPS, workFor } from "@/lib/work"
import IndexImageHero from "@/components/IndexImageHero"
import ProjectsIndexClient, { type ProjectCard } from "./ProjectsIndexClient"

/**
 * Projects index — docs/design-v2/Index Pages.dc.html (#projects).
 *
 *   Header   full-bleed image, eyebrow + h1 + lede        slate scrim
 *   Listing  application + region chips, 4:3 card grid   white
 *   By use   the work by application — tile row           warm
 *   Close    slate — rendered once by app/layout.tsx (Footer)
 *
 * Every card is a case study Square One has published, with the studio's own
 * photography. The gallery-scale record (195 captioned site photos) lives on
 * the application pages, linked from the bottom row.
 */

const FIO = "/images/S1_update_v2/photos/Featured%20image%20options"

export const metadata: Metadata = {
  title: "Decorative Pavement Projects Across BC",
  description:
    "Case studies from Square One Paving — crosswalks, public art, transit stations, spray parks, parking lots and driveways from Metro Vancouver to Vancouver Island and the Interior, since 2000.",
  alternates: { canonical: "https://squareonepaving.ca/projects" },
}

const APP_LABELS = WORK_APPS.map((a) => a.label).filter((label) =>
  projects.some((p) => p.application === label),
)
const REGIONS = ["Lower Mainland", "Vancouver Island", "Interior"].filter((r) =>
  projects.some((p) => p.region === r),
)

const APP_HREF: Record<string, string> = Object.fromEntries(
  WORK_APPS.map((a) => [a.slug, a.slug === "driveways" ? "/driveways" : `/applications/${a.slug}`]),
)

export default function ProjectsPage() {
  const cards: ProjectCard[] = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    application: project.application,
    region: project.region,
    city: project.city,
    systems: project.systems,
    year: project.year,
    src: project.imageUrl,
  }))

  const byUse = WORK_APPS.map((a) => ({ ...a, count: workFor(a.slug).length, href: APP_HREF[a.slug] }))

  return (
    <main className="bg-[color:var(--surface)]">
      <IndexImageHero
        src={`${FIO}/UBC-crosswalk-3-300dpi.jpg`}
        alt="UBC and Musqueam crosswalk in TrafficPatterns, installed by Square One Paving"
        eyebrow="Projects"
        title={projects.length + " projects across BC"}
        lede="Municipal, institutional, commercial and residential work from the Lower Mainland to Vancouver Island and the Interior — installed by Square One since 2000."
        caption="UBC · TrafficPatterns"
        imagePosition="center 55%"
      />

      <ProjectsIndexClient projects={cards} applications={["All", ...APP_LABELS]} regions={["All", ...REGIONS]} />

      {/* ── By application ────────────────────────────────────────────────────── */}
      <section className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">The record</div>
              <h2 className="mt-4 [text-wrap:balance]">The work, by application</h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] text-[color:var(--ink-muted)]">
              {byUse.reduce((n, a) => n + a.count, 0)} site photographs, each captioned with the
              system installed and where.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-[2px] min-[701px]:grid-cols-3 min-[1024px]:grid-cols-5">
            {byUse.map((a) => (
              <li key={a.slug}>
                <Link
                  href={a.href}
                  className="group flex items-baseline justify-between gap-4 border-t border-[color:var(--hairline)] py-4 transition-colors hover:border-[color:var(--hairline-strong)]"
                >
                  <span className="text-[15px] font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--accent-deep)]">
                    {a.label}
                  </span>
                  <span className="label whitespace-nowrap">{a.count} photos</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
