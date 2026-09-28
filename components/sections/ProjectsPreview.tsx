import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import { getFeaturedProjects, projects } from "@/lib/projects"

/** "Vancouver, BC" → "Vancouver" — the caption carries the city, not the province. */
function cityName(city: string): string {
  return city.split(",")[0].trim()
}

/* Curated order — adjacent frames alternate warm/cool dominance
   (SOUL-PASS MOVE 5); slugs missing from the data fall through to
   the default featured order. */
const FEATURED_ORDER = [
  // 28 Sept 2026, second image pass (Vern: "more recent images… feature the
  // best looking"): newest first. The two large frames are the two
  // strongest 2025 projects; the four under them run 2025, 2024, 2023, 2023,
  // Island and Mainland. UBC (2019) and the Langley Events Centre moved off
  // the home page; both lead their own pages under /projects.
  "nanaimo-rainbow-intersection", // warm — full spectrum, 2025
  "white-rock-custom-crosswalk", // cool — sea blues, 2025
  "south-langford-elementary", // warm — alphabet path, 2025
  "victoria-high-school-whorl-canoes", // cool — turquoise, Victoria, 2024
  "boundary-road-pump-station", // warm — the quilt, 2023
  "every-child-matters-new-westminster", // warm — orange, 2023
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
    projects.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p))
  const featuredProjects = (curated.length === 6 ? curated : featured).slice(0, 6)

  // 28 Sept 2026 (Vern: "they are just thumbnails on a page"): an
  // editorial grid, two large frames and then four, instead of six equal
  // tiles. The same six projects, the same captions under them.
  const lead = featuredProjects.slice(0, 2)
  const rest = featuredProjects.slice(2)
  const item = (project: (typeof featuredProjects)[number], big: boolean) => {
    const meta = [cityName(project.city), project.systems.join(" + "), project.year]
      .filter((part): part is string => Boolean(part))
      .join(" · ")
    // What the photograph shows, from the record: the project, the
    // system installed and the place.
    const alt = `${project.title}, ${project.systems.join(" and ")} installed by Square One in ${project.city}`
    return (
      <li key={project.slug} data-reveal>
        <Frame
          src={project.imageUrl}
          alt={alt}
          aspect={big ? "aspect-[4/3]" : "aspect-[1/1]"}
          sizes={big ? "(max-width: 700px) 100vw, 620px" : "(max-width: 1100px) 50vw, 300px"}
          href={`/projects/${project.slug}`}
          caption={
            <>
              <span
                className={`block not-italic font-bold text-ink ${big ? "text-[17px]" : ""}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </span>
              <span className="block">{meta}</span>
            </>
          }
        />
      </li>
    )
  }

  return (
    <Section id="work" label="Projects" title={<>Selected <em>work</em></>} link={{ href: "/projects", label: "All projects" }} tone="warm" wide>
      <ul data-reveal-group className="grid grid-cols-1 gap-x-8 gap-y-10 min-[701px]:grid-cols-2" role="list">
        {lead.map((p) => item(p, true))}
      </ul>
      <ul data-reveal-group className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 min-[701px]:gap-x-6 min-[701px]:gap-y-10 min-[1100px]:grid-cols-4" role="list">
        {rest.map((p) => item(p, false))}
      </ul>
    </Section>
  )
}
