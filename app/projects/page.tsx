"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { projects } from "@/lib/projects"

type FilterType = "all" | "service" | "application"

export default function ProjectsPage() {
  const [filter, setFilter] = useState<{ type: FilterType; value: string }>({
    type: "all",
    value: "",
  })

  const serviceList = [...new Set(projects.map((p) => p.service))]
  const appTypes = [...new Set(projects.map((p) => p.application))]

  const filtered = useMemo(() => {
    if (filter.type === "all") return projects
    if (filter.type === "service")
      return projects.filter((p) => p.service === filter.value)
    if (filter.type === "application")
      return projects.filter((p) => p.application === filter.value)
    return projects
  }, [filter])

  const FilterBtn = ({
    label,
    active,
    onClick,
  }: {
    label: string
    active: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className={`text-xs font-semibold px-4 py-2 rounded transition-all whitespace-nowrap ${
        active
          ? "bg-[#E8581A] text-white"
          : "bg-white text-[#8B8680] border border-[#8B8680]/20 hover:border-[#E8581A]"
      }`}
    >
      {label}
    </button>
  )

  return (
    <main className="min-h-screen bg-[#F5F3F0]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-32 pb-24">
        <div className="mb-14">
          <p className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D2D2D] mb-4">
            Projects
          </h1>
          <p className="text-lg text-[#8B8680]">
            Decorative pavement installations across British Columbia.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-12 pb-2">
          <FilterBtn
            label="All"
            active={filter.type === "all"}
            onClick={() => setFilter({ type: "all", value: "" })}
          />
          <span className="text-xs self-center px-2 text-[#8B8680]">
            Service:
          </span>
          {serviceList.map((s) => (
            <FilterBtn
              key={s}
              label={s}
              active={filter.type === "service" && filter.value === s}
              onClick={() => setFilter({ type: "service", value: s })}
            />
          ))}
          <span className="text-xs self-center px-2 text-[#8B8680]">
            Application:
          </span>
          {appTypes.map((a) => (
            <FilterBtn
              key={a}
              label={a}
              active={filter.type === "application" && filter.value === a}
              onClick={() => setFilter({ type: "application", value: a })}
            />
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <div
              key={project.slug}
              className="group bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {/* Featured badge for first 2 */}
              {i < 2 && (
                <div className="relative">
                  <span className="absolute top-3 left-3 bg-[#E8581A] text-white text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded z-10">
                    Featured
                  </span>
                </div>
              )}
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-[#8B8680]/20 to-[#E8581A]/10 flex items-center justify-center">
                <span className="text-[#8B8680]/60 text-sm">
                  {project.service}
                </span>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-[#E8581A]/10 text-[#E8581A]">
                    {project.service}
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-[#F5F3F0] text-[#8B8680]">
                    {project.application}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-[#2D2D2D] mb-2 group-hover:text-[#E8581A] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[#8B8680] mb-2">{project.city}</p>
                <p className="text-sm text-[#8B8680] mb-4 line-clamp-2">
                  {project.excerpt}
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm font-semibold text-[#E8581A]"
                >
                  View Project →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="py-20 px-6 sm:px-8 bg-[#2D2D2D]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to start your project?
          </h2>
          <p className="text-white/70 mb-10">
            Get a free consultation and quote for your BC surface project.
          </p>
          <Link href="/contact">
            <button className="bg-[#E8581A] hover:bg-[#d44f16] text-white px-10 py-4 rounded-lg font-semibold text-lg transition">
              Request a Quote
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
