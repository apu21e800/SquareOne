"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "@/lib/projects"

// Fallback images by service if project has no imageUrl
const serviceFallback: Record<string, string> = {
  "Stamped Asphalt":       "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
  "Decorative Coatings":   "/images/applications/bus-bike-lanes/red-bus-lane-long-perspective-01.jpg",
  "Preformed Thermoplastic": "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  "Vapor Blasting":        "/images/applications/bus-bike-lanes/red-bus-lane-long-perspective-01.jpg",
}

const SERVICES = ["All", "Stamped Asphalt", "Decorative Coatings", "Preformed Thermoplastic", "Vapor Blasting"]
const APP_TYPES = [...new Set(projects.map((p) => p.application))]

export default function ProjectsPage() {
  const [serviceFilter, setServiceFilter] = useState("All")
  const [appFilter, setAppFilter] = useState("All")

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchService = serviceFilter === "All" || p.service === serviceFilter
      const matchApp = appFilter === "All" || p.application === appFilter
      return matchService && matchApp
    })
  }, [serviceFilter, appFilter])

  return (
    <main style={{ background: "#FAFAFA", minHeight: "100vh" }}>

      {/* ── Page header ─────────────────────────────────────────── */}
      <section
        className="pt-28 pb-14 px-6 sm:px-8"
        style={{ background: "white", borderBottom: "1px solid #E2DDD8" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <p className="eyebrow mb-3">Our Work</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.035em",
                  color: "#111111",
                  lineHeight: 1.0,
                }}
              >
                Projects
              </h1>
              <p className="text-lg mt-3 max-w-xl leading-relaxed" style={{ color: "#5A5A5A" }}>
                Decorative pavement installations across British Columbia — from Downtown Vancouver to Vancouver Island.
              </p>
            </div>
            <Link href="/contact" className="flex-shrink-0">
              <span
                className="inline-block px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-all hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
              >
                Start a Project
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────────────── */}
      <div
        className="sticky top-16 z-30 px-6 sm:px-8 py-4"
        style={{ background: "rgba(246,244,240,0.96)", backdropFilter: "blur(8px)", borderBottom: "1px solid #E2DDD8" }}
      >
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center gap-3">
          {/* Service filters */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold flex-shrink-0" style={{ color: "#8C8C8C" }}>
              Service
            </span>
            {SERVICES.map((s) => (
              <button
                key={s}
                onClick={() => setServiceFilter(s)}
                className="text-xs font-semibold px-3.5 py-1.5 whitespace-nowrap transition-all flex-shrink-0"
                style={{
                  background: serviceFilter === s ? "#C8601A" : "white",
                  color: serviceFilter === s ? "white" : "#5A5A5A",
                  border: serviceFilter === s ? "1px solid #C8601A" : "1px solid #E2DDD8",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="hidden sm:block w-px h-5 bg-[#E2DDD8]" />

          {/* Application filters */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold flex-shrink-0" style={{ color: "#8C8C8C" }}>
              Type
            </span>
            <button
              onClick={() => setAppFilter("All")}
              className="text-xs font-semibold px-3.5 py-1.5 whitespace-nowrap transition-all flex-shrink-0"
              style={{
                background: appFilter === "All" ? "#1C2026" : "white",
                color: appFilter === "All" ? "white" : "#5A5A5A",
                border: appFilter === "All" ? "1px solid #1C2026" : "1px solid #E2DDD8",
              }}
            >
              All
            </button>
            {APP_TYPES.map((a) => (
              <button
                key={a}
                onClick={() => setAppFilter(a)}
                className="text-xs font-semibold px-3.5 py-1.5 whitespace-nowrap transition-all flex-shrink-0"
                style={{
                  background: appFilter === a ? "#1C2026" : "white",
                  color: appFilter === a ? "white" : "#5A5A5A",
                  border: appFilter === a ? "1px solid #1C2026" : "1px solid #E2DDD8",
                }}
              >
                {a}
              </button>
            ))}
          </div>

          {/* Count */}
          <span className="ml-auto text-xs flex-shrink-0" style={{ color: "#8C8C8C" }}>
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-12">
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => {
              const imgSrc = project.imageUrl || serviceFallback[project.service] || serviceFallback["Stamped Asphalt"]

              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block overflow-hidden transition-all duration-250"
                    style={{
                      background: "white",
                      border: "1px solid #E2DDD8",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = "rgba(200,96,26,0.45)"
                      el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.10)"
                      el.style.transform = "translateY(-3px)"
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = "#E2DDD8"
                      el.style.boxShadow = "none"
                      el.style.transform = "translateY(0)"
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
                      <Image
                        src={imgSrc}
                        alt={`${project.title} — ${project.city}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(17,17,17,0.55) 0%, transparent 55%)" }}
                      />
                      {/* Service badge */}
                      <div className="absolute bottom-3 left-3">
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 text-white"
                          style={{ background: "rgba(200,96,26,0.90)", backdropFilter: "blur(4px)" }}
                        >
                          {project.service}
                        </span>
                      </div>
                      {project.featured && (
                        <div className="absolute top-3 right-3">
                          <span
                            className="text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 text-white"
                            style={{ background: "rgba(200,96,26,0.75)", backdropFilter: "blur(4px)" }}
                          >
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span
                          className="text-[10px] font-semibold px-2.5 py-0.5"
                          style={{ background: "#F6F4F0", color: "#5A5A5A", border: "1px solid #E2DDD8" }}
                        >
                          {project.application}
                        </span>
                        <span className="text-xs" style={{ color: "#8C8C8C" }}>
                          {project.city}
                          {project.year && ` · ${project.year}`}
                        </span>
                      </div>
                      <h3
                        className="mb-2 leading-snug transition-colors duration-200 group-hover:text-[#C8601A]"
                        style={{ fontSize: "1rem", fontWeight: 600, color: "#111111" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "#5A5A5A" }}>
                        {project.excerpt}
                      </p>
                      <p
                        className="text-[10px] font-bold uppercase tracking-widest mt-4 transition-all duration-200 group-hover:tracking-[0.2em]"
                        style={{ color: "#C8601A" }}
                      >
                        View Project →
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-lg" style={{ color: "#5A5A5A" }}>No projects match this filter.</p>
            <button
              onClick={() => { setServiceFilter("All"); setAppFilter("All") }}
              className="mt-4 text-sm font-semibold transition-colors hover:underline"
              style={{ color: "#C8601A" }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-8" style={{ background: "#1C2026" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-5" style={{ color: "#E8895A" }}>Work With Us</p>
          <h2
            style={{ fontSize: "clamp(1.9rem, 3vw, 3rem)", fontWeight: 300, color: "white", letterSpacing: "-0.025em" }}
            className="mb-6"
          >
            Ready to Start Your Project?
          </h2>
          <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
            Free consultation and quote for your BC surface project — no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span
                className="inline-block px-10 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
              >
                Request a Free Quote
              </span>
            </Link>
            <a href="tel:6043098212">
              <span
                className="inline-block px-10 py-4 text-sm font-semibold transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
              >
                604-309-8212
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
