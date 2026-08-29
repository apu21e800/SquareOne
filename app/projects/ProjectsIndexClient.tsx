"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import ProjectCaption from "@/components/ui/ProjectCaption"
import Link from "next/link"

/**
 * Filter bar + card grid for /projects.
 *
 * Split out of app/projects/page.tsx so the page itself stays a Server
 * Component: lib/gallery.ts reads the filesystem at build time and must never
 * be pulled into a "use client" module. The page resolves every card's image
 * with heroFor() and hands the finished list down here.
 */

export interface ProjectCard {
  slug: string
  title: string
  service: string
  application: string
  city: string
  year?: string
  src: string
}

interface ProjectsIndexClientProps {
  projects: ProjectCard[]
  /** Service filter values — must match Project.service exactly. */
  services: string[]
  /** Application filter values — must match Project.application exactly. */
  applications: string[]
}

const ALL = "All"

/**
 * Display copy only. The values above still match lib/projects.ts character for
 * character — this map only decides how a filter chip and caption read.
 */
const serviceLabel: Record<string, string> = {
  "Stamped Asphalt": "Stamped asphalt",
  "Decorative Coatings": "Decorative coatings",
  "Preformed Thermoplastic": "Preformed thermoplastic",
  "Vapour Blasting": "Vapour blasting",
}

function displayService(value: string): string {
  return serviceLabel[value] ?? value
}

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
  services,
  applications,
}: ProjectsIndexClientProps) {
  const [serviceFilter, setServiceFilter] = useState(ALL)
  const [appFilter, setAppFilter] = useState(ALL)

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const matchService = serviceFilter === ALL || p.service === serviceFilter
        const matchApp = appFilter === ALL || p.application === appFilter
        return matchService && matchApp
      }),
    [projects, serviceFilter, appFilter],
  )

  return (
    <section className="pb-[var(--section-y)] max-[700px]:pb-[var(--section-y-sm)]">
      <div className="container-1280">
        {/* ---- Filters ---- */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label mr-1">Service</span>
            {services.map((s) => (
              <Chip key={s} active={serviceFilter === s} onSelect={() => setServiceFilter(s)}>
                {displayService(s)}
              </Chip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="label mr-1">Type</span>
            {applications.map((a) => (
              <Chip key={a} active={appFilter === a} onSelect={() => setAppFilter(a)}>
                {a}
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
              const meta = [
                cityName(project.city),
                displayService(project.service),
                project.year,
              ]
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
                setServiceFilter(ALL)
                setAppFilter(ALL)
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
