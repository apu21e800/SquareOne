import type { Metadata } from "next"

import { projects } from "@/lib/projects"
import { heroFor } from "@/lib/gallery"
import ProjectsIndexClient, { type ProjectCard } from "./ProjectsIndexClient"

/**
 * Projects index — docs/design-v2/Index Pages.dc.html (#projects).
 *
 *   Header   eyebrow + h1 + lede            white
 *   Listing  filter chips + 4:3 card grid   white
 *   Close    slate — rendered once by app/layout.tsx (Footer)
 *
 * The close is the page's ONLY dark region. Nothing above it may go slate.
 */

export const metadata: Metadata = {
  title: "Decorative Pavement Projects Across BC",
  description:
    "Decorative pavement installations from Metro Vancouver to Vancouver Island — municipal corridors, public art, transit hubs, residential estates and surface restoration.",
  alternates: { canonical: "https://squareonepaving.ca/projects" },
}

/** Stand-in imagery per service, used only when a project has no photo of its own. */
const serviceFallback: Record<string, string> = {
  "Stamped Asphalt":         "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
  "Decorative Coatings":     "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
  "Preformed Thermoplastic": "/images/products/streetbond/streetbond-crosswalk-perspective-01.jpg",
  "Vapour Blasting":          "/images/products/streetbond/streetbond-cobble-macro-surface-01.jpg",
}

const SERVICES = ["All", "Stamped Asphalt", "Decorative Coatings", "Preformed Thermoplastic", "Vapour Blasting"]
const APP_TYPES = [...new Set(projects.map((p) => p.application))]

export default function ProjectsPage() {
  // Filesystem first (public/images/projects/<slug>/), then the curated image,
  // then a service stand-in — so dropping photos into a folder is all it takes.
  const cards: ProjectCard[] = projects.map((project) => {
    const fallback =
      project.imageUrl || serviceFallback[project.service] || serviceFallback["Stamped Asphalt"]

    return {
      slug: project.slug,
      title: project.title,
      service: project.service,
      application: project.application,
      city: project.city,
      year: project.year,
      src: heroFor("projects", project.slug, fallback) ?? fallback,
    }
  })

  return (
    <main className="bg-[color:var(--surface)]">
      <section className="pt-[calc(var(--bar-h)+var(--section-y))] max-[700px]:pt-[calc(var(--bar-h)+var(--section-y-sm))]">
        <div className="container-1280">
          <p className="eyebrow">Projects</p>

          <h1 className="stop mt-7 max-w-[18ch]">{projects.length} projects across BC</h1>

          <p className="mt-6 max-w-[56ch] text-[19px] leading-[1.65] text-[color:var(--ink-body)] [text-wrap:pretty] max-[700px]:text-[17px]">
            Municipal, institutional and residential work from the Lower Mainland to Vancouver
            Island, 2000 to today.
          </p>
        </div>
      </section>

      <ProjectsIndexClient
        projects={cards}
        services={SERVICES}
        applications={["All", ...APP_TYPES]}
      />
    </main>
  )
}
