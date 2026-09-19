import type { Metadata } from "next"
import Link from "next/link"

import { projects } from "@/lib/projects"
import { WORK_APPS } from "@/lib/work"
import IndexImageHero from "@/components/IndexImageHero"
import ProjectsIndexClient, { type ProjectCard } from "./ProjectsIndexClient"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

/**
 * Projects index — docs/design-v2/Index Pages.dc.html (#projects).
 *
 *   Header   full-bleed image, eyebrow + h1 + lede        slate scrim
 *   Listing  one-line filter bar, lead card + 16:10 grid  white
 *   By use   the work by application — tile row           warm
 *   Close    slate — rendered once by app/layout.tsx (Footer)
 *
 * Every card is a project Square One has published, with the studio's own
 * photography. The gallery-scale record lives on the application pages,
 * linked from the bottom row.
 *
 * No counts anywhere on this page — not of projects, not of photographs.
 * The client, 10 Sept 2026: "we have done 1000s of jobs and it makes it
 * seem like we have only done 194." A published count reads as a ceiling.
 */

const FIO = "/images/S1_update_v2/photos/Featured%20image%20options"

export const metadata: Metadata = {
  openGraph: { title: "Decorative Pavement Projects Across BC", description: clampDescription("Square One Paving projects across BC — crosswalks, public art, spray parks, parking lots and driveways, each with the system installed and the place."), images: [{ url: "/images/S1_update_v2/photos/Featured%20image%20options/502639628_1112360040926014_5391735583045489560_n.jpg" }] },
  title: "Decorative Pavement Projects Across BC",
  description:
    clampDescription("Square One Paving projects across BC — crosswalks, public art, spray parks, parking lots and driveways, each with the system installed and the place."),
  alternates: { canonical: `${SITE_URL}/projects` },
}

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
    excerpt: project.excerpt,
    src: project.imageUrl,
  }))

  const byUse = WORK_APPS.map((a) => ({ ...a, href: APP_HREF[a.slug] }))

  return (
    <main className="bg-[color:var(--surface)]">
      <IndexImageHero
        src={`${FIO}/502639628_1112360040926014_5391735583045489560_n.jpg`}
        alt="The rainbow intersection in Nanaimo from above — the whole crossing in bands of red, orange, yellow, green, blue and purple TrafficPatternsXD, installed by Square One Paving"
        eyebrow="Projects"
        title="Decorative pavement projects across BC"
        lede="Municipal, institutional, commercial and residential work from the Lower Mainland to Vancouver Island and the Interior — installed by Square One since 2000, each with the system and the place on record."
        caption="Nanaimo · Rainbow intersection · TrafficPatternsXD"
        imagePosition="center 50%"
      />

      <ProjectsIndexClient projects={cards} />

      {/* ── By application ──────── */}
      <section className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
        <div className="container-1280">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <div className="eyebrow">The galleries</div>
              <h2 className="mt-4 [text-wrap:balance]">The work, by application</h2>
            </div>
            <Link href="/galleries" className="arrow-link max-w-full">
              Every photograph, by application and system{" "}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-[2px] min-[560px]:grid-cols-2 min-[701px]:grid-cols-3 min-[1024px]:grid-cols-5">
            {byUse.map((a) => (
              <li key={a.slug}>
                <Link
                  href={a.href}
                  className="group flex items-baseline justify-between gap-4 border-t border-[color:var(--hairline)] py-4 transition-colors hover:border-[color:var(--hairline-strong)]"
                >
                  <span className="text-[15px] font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--accent-deep)]">
                    {a.label}
                  </span>
                  <span className="label whitespace-nowrap">Gallery &rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
