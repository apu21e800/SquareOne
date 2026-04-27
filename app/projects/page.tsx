"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "@/lib/projects"

const serviceFallback: Record<string, string> = {
  "Stamped Asphalt":         "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
  "Decorative Coatings":     "/images/applications/bus-bike-lanes/red-bus-lane-long-perspective-01.jpg",
  "Preformed Thermoplastic": "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  "Vapor Blasting":          "/images/products/durashield/durashield-1.jpg",
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

  const featured = useMemo(() => projects.filter((p) => p.featured).slice(0, 2), [])

  return (
    <main style={{ background: "#F6F4F0", minHeight: "100vh" }}>

      {/* ── Page header ────────────────────────────────────── */}
      <section className="relative bg-white border-b border-[#E2DDD8] pt-28 pb-16 px-6 sm:px-8">
        <div
          className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
          style={{ background: "linear-gradient(to right, #C8601A, #E8895A)" }}
        />
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: "#C8601A" }} />
                <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}>Our Work</p>
              </div>
              <h1
                style={{
                  fontSize: "clamp(3rem, 6vw, 6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.9,
                  color: "#111111",
                }}
              >
                Projects
              </h1>
              <p className="text-[17px] mt-5 max-w-xl leading-relaxed" style={{ color: "#5A5A5A" }}>
                Decorative pavement across British Columbia — from Vancouver&apos;s transit corridors
                to Vancouver Island driveways and mountain-town civic plazas.
              </p>
            </div>
            <Link href="/contact" className="flex-shrink-0">
              <span
                className="inline-flex items-center gap-2 px-7 py-4 text-sm font-bold tracking-[0.02em] text-white transition-all hover:brightness-110 rounded-lg"
                style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)", boxShadow: "0 4px 20px rgba(200,96,26,0.25)" }}
              >
                Start a Project
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured projects strip ───────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-white border-b border-[#E2DDD8] px-6 sm:px-8 py-12">
          <div className="max-w-[1500px] mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px" style={{ background: "#C8601A" }} />
              <p className="font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.22em", color: "#8C8C8C" }}>Featured Projects</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map((p) => {
                const img = p.imageUrl || serviceFallback[p.service] || serviceFallback["Stamped Asphalt"]
                return (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group relative overflow-hidden block"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <Image
                      fill src={img}
                      alt={`${p.title} — ${p.city}, BC`}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectPosition: "50% 65%" }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(17,17,17,0.82) 0%, rgba(17,17,17,0.25) 50%, transparent 100%)" }} />
                    <div className="absolute inset-x-0 bottom-0 p-7">
                      <span
                        className="text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 text-white mb-3 inline-block rounded"
                        style={{ background: "rgba(200,96,26,0.90)" }}
                      >
                        {p.service}
                      </span>
                      <h3
                        className="text-white font-black mt-1 group-hover:text-[#E8895A] transition-colors"
                        style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
                      >
                        {p.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-1.5">{p.city}{p.year ? ` · ${p.year}` : ""}</p>
                    </div>
                    <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">View →</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Filters ──────────────────────────────────────── */}
      <div
        className="sticky top-[68px] z-30 px-6 sm:px-8 py-4"
        style={{ background: "rgba(246,244,240,0.97)", backdropFilter: "blur(10px)", borderBottom: "1px solid #E2DDD8" }}
      >
        <div className="max-w-[1500px] mx-auto flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold flex-shrink-0" style={{ color: "#8C8C8C" }}>Service</span>
            {SERVICES.map((s) => (
              <button
                key={s}
                onClick={() => setServiceFilter(s)}
                className="text-[11px] font-bold px-3.5 py-1.5 whitespace-nowrap transition-all flex-shrink-0 uppercase tracking-[0.08em] rounded"
                style={{
                  background: serviceFilter === s ? "#111111" : "white",
                  color: serviceFilter === s ? "white" : "#5A5A5A",
                  border: serviceFilter === s ? "1px solid #111111" : "1px solid #E2DDD8",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="hidden sm:block w-px h-4 bg-[#E2DDD8]" />

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold flex-shrink-0" style={{ color: "#8C8C8C" }}>Type</span>
            <button
              onClick={() => setAppFilter("All")}
              className="text-[11px] font-bold px-3.5 py-1.5 whitespace-nowrap transition-all flex-shrink-0 uppercase tracking-[0.08em] rounded"
              style={{
                background: appFilter === "All" ? "#C8601A" : "white",
                color: appFilter === "All" ? "white" : "#5A5A5A",
                border: appFilter === "All" ? "1px solid #C8601A" : "1px solid #E2DDD8",
              }}
            >
              All
            </button>
            {APP_TYPES.map((a) => (
              <button
                key={a}
                onClick={() => setAppFilter(a)}
                className="text-[11px] font-bold px-3.5 py-1.5 whitespace-nowrap transition-all flex-shrink-0 uppercase tracking-[0.08em] rounded"
                style={{
                  background: appFilter === a ? "#C8601A" : "white",
                  color: appFilter === a ? "white" : "#5A5A5A",
                  border: appFilter === a ? "1px solid #C8601A" : "1px solid #E2DDD8",
                }}
              >
                {a}
              </button>
            ))}
          </div>

          <span className="ml-auto text-[11px] font-bold flex-shrink-0" style={{ color: "#8C8C8C" }}>
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────── */}
      <div className="max-w-[1500px] mx-auto px-6 sm:px-8 py-12">
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project, i) => {
              const imgSrc = project.imageUrl || serviceFallback[project.service] || serviceFallback["Stamped Asphalt"]
              return (
                <motion.div
                  key={project.slug} layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.3) }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block overflow-hidden bg-white border border-[#E2DDD8] transition-all duration-300 hover:border-[#C8601A]/30 hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 rounded-lg"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-t-lg" style={{ aspectRatio: "4/3" }}>
                      <Image
                        src={imgSrc}
                        alt={`${project.title} — ${project.city}, BC`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ objectPosition: "50% 65%" }}
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(17,17,17,0.55) 0%, transparent 50%)" }} />
                      <div className="absolute bottom-3 left-3">
                        <span
                          className="text-[9px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 text-white rounded"
                          style={{ background: "rgba(200,96,26,0.92)" }}
                        >
                          {project.service}
                        </span>
                      </div>
                      {project.featured && (
                        <div className="absolute top-3 right-3">
                          <span className="text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-1 bg-white/15 backdrop-blur-sm text-white border border-white/20 rounded">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="text-[9px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded"
                          style={{ background: "#F6F4F0", color: "#5A5A5A", border: "1px solid #E2DDD8" }}
                        >
                          {project.application}
                        </span>
                        <span className="text-[11px] font-semibold" style={{ color: "#8C8C8C" }}>
                          {project.city}{project.year ? ` · ${project.year}` : ""}
                        </span>
                      </div>
                      <h3
                        className="mb-2 leading-snug transition-colors duration-200 group-hover:text-[#C8601A]"
                        style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111111", letterSpacing: "-0.02em" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color: "#5A5A5A" }}>
                        {project.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 mt-4">
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-200 group-hover:tracking-[0.22em]"
                          style={{ color: "#C8601A" }}
                        >
                          View Project
                        </span>
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="text-[#C8601A] transition-transform group-hover:translate-x-0.5">
                          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-lg font-semibold" style={{ color: "#5A5A5A" }}>No projects match this filter.</p>
            <button
              onClick={() => { setServiceFilter("All"); setAppFilter("All") }}
              className="mt-5 text-sm font-bold uppercase tracking-[0.12em] hover:underline"
              style={{ color: "#C8601A" }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="relative py-28 px-6 sm:px-8" style={{ background: "#1C2026" }}>
        <div
          className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
          style={{ background: "linear-gradient(to right, #C8601A, #E8895A)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(200,96,26,0.12) 0%, transparent 65%)" }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: "#E8895A" }} />
            <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#E8895A" }}>Work With Us</p>
            <div className="w-8 h-px" style={{ background: "#E8895A" }} />
          </div>
          <h2
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.04em", lineHeight: 0.95 }}
            className="mb-7"
          >
            Ready to start{" "}
            <span style={{ color: "#E8895A" }}>your project?</span>
          </h2>
          <p className="text-[17px] mb-12" style={{ color: "rgba(255,255,255,0.55)" }}>
            Free site visit and written quote for your BC surface project — no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span
                className="inline-flex items-center gap-2 px-10 py-4 text-sm font-bold tracking-[0.04em] uppercase text-white transition-all hover:brightness-110 rounded-lg"
                style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)", boxShadow: "0 4px 24px rgba(200,96,26,0.35)" }}
              >
                Request a Free Quote
              </span>
            </Link>
            <a href="tel:6043098212">
              <span
                className="inline-flex items-center gap-2 px-10 py-4 text-sm font-bold tracking-[0.04em] uppercase transition-all hover:bg-white/10 rounded-lg"
                style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)" }}
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
