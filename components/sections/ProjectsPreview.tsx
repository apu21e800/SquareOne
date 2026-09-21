import Image from "next/image"
import ProjectCaption from "@/components/ui/ProjectCaption"
import Link from "next/link"
import { getFeaturedProjects } from "@/lib/projects"

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
      <div className="container-1280 relative z-[1]">
        <div data-reveal className="flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-num">04</span>Projects
            </div>
            <h2 className="mt-5">Selected work</h2>
          </div>
          {/* No project count here: a published count reads as a ceiling on
              the work (the client, 10 Sept 2026: "we have done 1000s of jobs"). */}
          <Link href="/projects" className="arrow-link whitespace-nowrap">
            All projects <span>&rarr;</span>
          </Link>
        </div>

        <div data-reveal-group className="rail-m mt-12 grid grid-cols-1 gap-8 min-[701px]:grid-cols-2">
          {featuredProjects.map((project) => {
            const src = project.imageUrl

            const meta = [cityName(project.city), project.systems.join(" + "), project.year]
              .filter((part): part is string => Boolean(part))
              .join(" · ")

            // What the photograph shows, from the record: the project, the
            // system installed and the place.
            const alt = `${project.title} — ${project.systems.join(" and ")} installed by Square One in ${project.city}`

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                data-reveal
                className="pattern-running-bond card relative block aspect-[4/3] overflow-hidden rounded-[2px]"
              >
                <Image
                  src={src}
                  alt={alt}
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
