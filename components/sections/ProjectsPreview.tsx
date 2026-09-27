import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import { getFeaturedProjects } from "@/lib/projects"

/** "Vancouver, BC" → "Vancouver" — the caption carries the city, not the province. */
function cityName(city: string): string {
  return city.split(",")[0].trim()
}

/* Curated order — adjacent frames alternate warm/cool dominance
   (SOUL-PASS MOVE 5); slugs missing from the data fall through to
   the default featured order. */
const FEATURED_ORDER = [
  "ubc-musqueam-crosswalk", // cool — blues and greens
  "nanaimo-rainbow-intersection", // warm — full spectrum
  "white-rock-custom-crosswalk", // cool — sea blues
  "langley-events-centre-streetbond", // warm — orange and sand
  // Two more, 21 Sept 2026 (Vern: "add two more to selected work"). Both were
  // already featured in lib/projects.ts and neither repeats a place or a
  // system pairing already in the four above: a transit plaza and a street.
  "richmond-brighouse-translink", // cool — grey and steel
  "little-italy-vancouver-crosswalks", // warm — Commercial Drive
]

/**
 * Selected work — 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §9.8): the same
 * six projects, each a square-cornered frame with the title and the record's
 * place · system · year UNDER it, in the serif. No scrim, no overlay, no
 * chips, no hover zoom. No project count anywhere: a published count reads
 * as a ceiling on the work (the client, 10 Sept 2026).
 */
export default function ProjectsPreview() {
  const featured = getFeaturedProjects()
  const curated = FEATURED_ORDER.map((slug) =>
    featured.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p))
  const featuredProjects = (curated.length === 6 ? curated : featured).slice(0, 6)

  return (
    <Section id="work" label="Projects" title="Selected work" link={{ href: "/projects", label: "All projects" }} wide>
      <ul className="rail-m grid grid-cols-1 gap-x-7 gap-y-10 min-[701px]:grid-cols-2 min-[1100px]:grid-cols-3">
        {featuredProjects.map((project) => {
          const meta = [cityName(project.city), project.systems.join(" + "), project.year]
            .filter((part): part is string => Boolean(part))
            .join(" · ")
          // What the photograph shows, from the record: the project, the
          // system installed and the place.
          const alt = `${project.title}, ${project.systems.join(" and ")} installed by Square One in ${project.city}`
          return (
            <li key={project.slug}>
              <Frame
                src={project.imageUrl}
                alt={alt}
                aspect="aspect-[4/3]"
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 410px"
                href={`/projects/${project.slug}`}
                caption={
                  <>
                    <span className="block not-italic font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
                      {project.title}
                    </span>
                    <span className="block">{meta}</span>
                  </>
                }
              />
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
