"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/lib/projects"
import { Metadata } from "next"

type FilterType = "all" | "service" | "application"

// Map services to real product images we have
const serviceImageMap: Record<string, string> = {
  "Stamped Asphalt": "/images/products/streetprint/streetprint-1.jpg",
  "Decorative Coatings": "/images/products/streetbond/streetbond-1.jpg",
  "Preformed Thermoplastic": "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  "Vapor Blasting": "/images/products/streetbond/streetbond-1.jpg",
}

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
      className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
        active
          ? "bg-[#D66620] text-white"
          : "bg-white text-[#626262] border border-[#E8E4DE] hover:border-[#D66620]/50 hover:text-[#D66620]"
      }`}
    >
      {label}
    </button>
  )

  return (
    <main className="min-h-screen bg-[#FAFAFA]">

      {/* Page header */}
      <section className="bg-white border-b border-[#E8E4DE] pt-28 pb-14">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">
            Our Work
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-5xl sm:text-6xl font-black text-[#333333] mb-4">
                Projects
              </h1>
              <p className="text-lg text-[#626262] max-w-xl">
                Decorative pavement installations across British Columbia — from Downtown Vancouver to Vancouver Island.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link href="/contact">
                <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-7 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                  Start a Project
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <FilterBtn
            label="All Projects"
            active={filter.type === "all"}
            onClick={() => setFilter({ type: "all", value: "" })}
          />
          <span className="text-xs text-[#999] font-medium px-1 hidden sm:block">|</span>
          <span className="text-xs text-[#999] font-semibold uppercase tracking-wider">Service:</span>
          {serviceList.map((s) => (
            <FilterBtn
              key={s}
              label={s}
              active={filter.type === "service" && filter.value === s}
              onClick={() => setFilter({ type: "service", value: s })}
            />
          ))}
          <span className="text-xs text-[#999] font-medium px-1 hidden sm:block">|</span>
          <span className="text-xs text-[#999] font-semibold uppercase tracking-wider">Type:</span>
          {appTypes.map((a) => (
            <FilterBtn
              key={a}
              label={a}
              active={filter.type === "application" && filter.value === a}
              onClick={() => setFilter({ type: "application", value: a })}
            />
          ))}
        </div>

        {/* Count */}
        <p className="text-sm text-[#999] mb-6">{filtered.length} project{filtered.length !== 1 ? "s" : ""}</p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const imgSrc = serviceImageMap[project.service] ?? "/images/products/streetprint/streetprint-1.jpg"
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group bg-white rounded-2xl border border-[#E8E4DE] hover:border-[#D66620]/40 hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-[#F2EFE9]">
                  <Image
                    src={imgSrc}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-[#D66620] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {project.service}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F2EFE9] text-[#626262]">
                      {project.application}
                    </span>
                    <span className="text-xs text-[#999]">{project.city}</span>
                  </div>
                  <h3 className="font-black text-base text-[#333333] mb-2 group-hover:text-[#D66620] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#626262] line-clamp-2 leading-relaxed">
                    {project.excerpt}
                  </p>
                  <p className="text-[#D66620] text-xs font-bold uppercase tracking-widest mt-4 group-hover:tracking-[0.2em] transition-all duration-200">
                    View Project →
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <section className="py-24 px-6 sm:px-8 bg-[#32373C] mt-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F0A04B] text-xs uppercase tracking-[0.22em] font-semibold mb-5">Work With Us</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/75 text-lg mb-10">
            Free consultation and quote for your BC surface project — no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Request a Free Quote
              </span>
            </Link>
            <a href="tel:6043098212">
              <span className="inline-block border border-white/25 text-white hover:bg-white/10 px-10 py-4 rounded-lg font-semibold text-sm transition-colors">
                604-309-8212
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
