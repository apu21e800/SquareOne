import Image from "next/image"
import ProjectCaption from "@/components/ui/ProjectCaption"
import Link from "next/link"
import { getFeaturedProjects, projects } from "@/lib/projects"

/** "Vancouver, BC" → "Vancouver" — the caption carries the city, not the province. */
function cityName(city: string): string {
  return city.split(",")[0].trim()
}

/* Curated order — adjacent cards alternate warm/cool dominance
   (SOUL-PASS MOVE 5); slugs missing from the data fall through to
   the default featured order. */
const FEATURED_ORDER = [
  "ubc-musqueam-crosswalk", // cool — blues and greens
  "nanaimo-rainbow-intersection", // warm — full spectrum
  "white-rock-custom-crosswalk", // cool — sea blues
  "langley-events-centre-streetbond", // warm — orange and sand
]

export default function ProjectsPreview() {
  const featured = getFeaturedProjects()
  const curated = FEATURED_ORDER.map((slug) =>
    featured.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p))
  const featuredProjects = (curated.length === 4 ? curated : featured).slice(0, 4)

  return (
    <section
      id="work"
      className="section relative overflow-hidden border-t border-[color:var(--hairline)] bg-[color:var(--surface)]"
    >
      <span aria-hidden="true" className="ghost-index">02</span>

      <div className="container-1280 relative z-[1]">
        <div data-reveal className="flex flex-wrap items-baseline justify-between gap-6">
          <h2>Selected work</h2>
          <Link href="/projects" className="arrow-link whitespace-nowrap">
            All {projects.length} projects <span>&rarr;</span>
          </Link>
        </div>

        <div data-reveal-group className="mt-12 grid grid-cols-1 gap-8 min-[701px]:grid-cols-2">
          {featuredProjects.map((project) => {
            const src = project.imageUrl

            const meta = [cityName(project.city), project.systems.join(" + "), project.year]
              .filter((part): part is string => Boolean(part))
              .join(" · ")

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                data-reveal
                className="pattern-running-bond card relative block aspect-[4/3] overflow-hidden rounded-[2px]"
              >
                <Image
                  src={src}
                  alt={project.title}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1280px) 50vw, 616px"
                  className="object-cover"
                />

                <div aria-hidden className="scrim" />

                <ProjectCaption large title={project.title} meta={meta} />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
