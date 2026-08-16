import Image from "next/image"
import Link from "next/link"
import { getFeaturedProjects, projects } from "@/lib/projects"
import { heroFor } from "@/lib/gallery"

/** "Vancouver, BC" → "Vancouver" — the caption carries the city, not the province. */
function cityName(city: string): string {
  return city.split(",")[0].trim()
}

export default function ProjectsPreview() {
  const featuredProjects = getFeaturedProjects().slice(0, 6)

  return (
    <section
      id="work"
      className="section relative overflow-hidden border-t border-[color:var(--hairline)] bg-[color:var(--surface)]"
    >

      <div className="container-1280 relative z-[1]">
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <h2>Selected work</h2>
          <Link href="/projects" className="arrow-link whitespace-nowrap">
            All {projects.length} projects <span>&rarr;</span>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 min-[701px]:grid-cols-3">
          {featuredProjects.map((project) => {
            const src =
              heroFor("projects", project.slug, project.imageUrl) ?? project.imageUrl

            const meta = [cityName(project.city), project.service, project.year]
              .filter((part): part is string => Boolean(part))
              .join(" · ")

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="card relative block aspect-[4/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]"
              >
                <Image
                  src={src}
                  alt={project.title}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
                  className="object-cover"
                />

                <div aria-hidden className="scrim" />

                <div className="pointer-events-none absolute bottom-5 left-6 right-6">
                  <div className="text-[16px] font-semibold leading-[1.3] text-white">
                    {project.title}
                  </div>
                  <div className="mt-1 text-[13px] leading-[1.4] text-[rgba(255,255,255,0.78)]">
                    {meta}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
