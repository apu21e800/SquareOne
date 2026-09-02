"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import ProjectCaption from "@/components/ui/ProjectCaption"

/**
 * Filter bar + card grid for /projects.
 *
 * Split out of app/projects/page.tsx so the page itself stays a Server
 * Component. Filters are the two questions a specifier actually asks —
 * what kind of work, and where — not the internal service taxonomy.
 */

export interface ProjectCard {
  slug: string
  title: string
  application: string
  region: string
  city: string
  systems: string[]
  year?: string
  src: string
}

interface ProjectsIndexClientProps {
  projects: ProjectCard[]
  /** Application filter values — must match Project.application exactly. */
  applications: string[]
  /** Region filter values — must match Project.region exactly. */
  regions: string[]
}

const ALL = "All"

/** "Vancouver, BC" → "Vancouver" — the caption carries the city, not the province. */
function cityName(city: string): string {
  return city.split(",")[0].trim()
}

function Chip({
  active,
  onSelect,
  children,
}: {
  active: boolean
  onSelect: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`rounded-[2px] border px-4 py-[9px] text-[14px] transition-colors ${
        active
          ? "border-[color:var(--ink)] bg-[color:var(--ink)] font-semibold text-white"
          : "border-[color:var(--hairline)] font-medium text-[color:var(--ink-muted)] hover:border-[color:var(--hairline-strong)] hover:text-[color:var(--ink)]"
      }`}
    >
      {children}
    </button>
  )
}

export default function ProjectsIndexClient({
  projects,
  applications,
  regions,
}: ProjectsIndexClientProps) {
  const [appFilter, setAppFilter] = useState(ALL)
  const [regionFilter, setRegionFilter] = useState(ALL)

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const matchApp = appFilter === ALL || p.application === appFilter
        const matchRegion = regionFilter === ALL || p.region === regionFilter
        return matchApp && matchRegion
      }),
    [projects, appFilter, regionFilter],
  )

  return (
    <section className="pb-[var(--section-y)] max-[700px]:pb-[var(--section-y-sm)]">
      <div className="container-1280">
        {/* ---- Filters ---- */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label mr-1">Application</span>
            {applications.map((a) => (
              <Chip key={a} active={appFilter === a} onSelect={() => setAppFilter(a)}>
                {a}
              </Chip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="label mr-1">Region</span>
            {regions.map((r) => (
              <Chip key={r} active={regionFilter === r} onSelect={() => setRegionFilter(r)}>
                {r}
              </Chip>
            ))}
          </div>

          <span className="label ml-auto whitespace-nowrap" aria-live="polite">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ---- Grid ---- */}
        {filtered.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 min-[701px]:grid-cols-3">
            {filtered.map((project) => {
              const meta = [cityName(project.city), project.systems.join(" + "), project.year]
                .filter((part): part is string => Boolean(part))
                .join(" · ")

              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="card relative block aspect-[4/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]"
                >
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
                    className="object-cover"
                  />

                  <div aria-hidden className="scrim" />

                  <ProjectCaption title={project.title} meta={meta} />
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="mt-10 border-t border-[color:var(--hairline)] py-24 text-center">
            <p className="text-[17px] text-[color:var(--ink-body)]">
              No projects match this filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setAppFilter(ALL)
                setRegionFilter(ALL)
              }}
              className="arrow-link mt-6"
            >
              Clear filters <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
