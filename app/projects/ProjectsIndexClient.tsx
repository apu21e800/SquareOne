"use client"

import { useMemo, useState } from "react"
import FilterBar, { type FilterDef } from "@/components/ui/FilterBar"
import RecordCard from "@/components/ui/RecordCard"

/**
 * Filter bar + card grid for /projects.
 *
 * Split out of app/projects/page.tsx so the page itself stays a Server
 * Component. One line of filters — the three questions a specifier asks:
 * what kind of work, where, and with which system. Cards are the shared
 * RecordCard, so this index and /blog read as one system.
 */

export interface ProjectCard {
  slug: string
  title: string
  application: string
  region: string
  city: string
  systems: string[]
  year?: string
  excerpt: string
  src: string
}

interface ProjectsIndexClientProps {
  projects: ProjectCard[]
}

const ALL = "all"

/** "Vancouver, BC" → "Vancouver" — the caption carries the city, not the province. */
function cityName(city: string): string {
  return city.split(",")[0].trim()
}

function options(values: string[], all: string) {
  const counts = new Map<string, number>()
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1)
  return [
    { value: ALL, label: all },
    ...[...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([value, count]) => ({ value, label: value, count })),
  ]
}

export default function ProjectsIndexClient({ projects }: ProjectsIndexClientProps) {
  const [app, setApp] = useState(ALL)
  const [region, setRegion] = useState(ALL)
  const [system, setSystem] = useState(ALL)

  const filters: FilterDef[] = [
    { key: "app", label: "Application", value: app, onChange: setApp, options: options(projects.map((p) => p.application), "All applications") },
    { key: "region", label: "Region", value: region, onChange: setRegion, options: options(projects.map((p) => p.region), "All regions") },
    { key: "system", label: "System", value: system, onChange: setSystem, options: options(projects.flatMap((p) => p.systems), "All systems") },
  ]

  const active = app !== ALL || region !== ALL || system !== ALL

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (app === ALL || p.application === app) &&
          (region === ALL || p.region === region) &&
          (system === ALL || p.systems.includes(system)),
      ),
    [projects, app, region, system],
  )

  const clear = () => {
    setApp(ALL)
    setRegion(ALL)
    setSystem(ALL)
  }

  const [lead, ...rest] = filtered

  return (
    <section className="pb-[var(--section-y)] max-[700px]:pb-[var(--section-y-sm)]">
      <div className="container-1280">
        <div className="mt-12">
          <FilterBar
            filters={filters}
            summary={`${filtered.length} project${filtered.length !== 1 ? "s" : ""}`}
            onClear={clear}
            active={active}
          />
        </div>

        {filtered.length > 0 ? (
          <>
            {lead && (
              <div className="mt-10">
                <RecordCard
                  lead
                  priority
                  href={`/projects/${lead.slug}`}
                  src={lead.src}
                  alt={lead.title}
                  caption={[cityName(lead.city), lead.systems.join(" + "), lead.year].filter(Boolean).join(" · ")}
                  kicker={lead.application}
                  title={lead.title}
                  description={lead.excerpt}
                  meta={[cityName(lead.city), lead.region].join(" · ")}
                />
              </div>
            )}

            {rest.length > 0 && (
              <div className="mt-10 grid grid-cols-3 gap-6 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1 max-[700px]:gap-10">
                {rest.map((project) => (
                  <RecordCard
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    src={project.src}
                    alt={project.title}
                    caption={[cityName(project.city), project.systems.join(" + "), project.year]
                      .filter(Boolean)
                      .join(" · ")}
                    kicker={project.application}
                    title={project.title}
                    description={project.excerpt}
                    meta={[cityName(project.city), project.region].join(" · ")}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 border-t border-[color:var(--hairline)] py-24 text-center">
            <p className="text-[17px] text-[color:var(--ink-body)]">No projects match this filter.</p>
            <button type="button" onClick={clear} className="arrow-link mt-6">
              Clear filters <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
