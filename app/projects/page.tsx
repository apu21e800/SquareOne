"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "@/lib/projects"
import Container from "@/components/ui/Container"

const serviceFallback: Record<string, string> = {
  "Stamped Asphalt":         "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
  "Decorative Coatings":     "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
  "Preformed Thermoplastic": "/images/products/streetbond/streetbond-crosswalk-perspective-01.jpg",
  "Vapor Blasting":          "/images/products/streetbond/streetbond-cobble-macro-surface-01.jpg",
}

const SERVICES = ["All", "Stamped Asphalt", "Decorative Coatings", "Preformed Thermoplastic", "Vapor Blasting"]
const APP_TYPES = [...new Set(projects.map((p) => p.application))]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

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
    <main className="bg-white min-h-screen">
      <section className="relative bg-[#0A0A0A] overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0">
          <Image src="/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg" alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-30" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.85)] via-[rgba(10,10,10,0.75)] to-[rgba(10,10,10,0.95)]" />
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(242,100,48,0.10) 0%, transparent 60%)" }} />

        <Container className="relative">
          <div className="flex items-center gap-3 mb-7">
            <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-bold">Selected Work</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end">
            <h1 className="text-white display-h max-w-3xl" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
              Projects across<br />
              <span className="italic font-extralight text-white/95">British</span> <span className="text-[#F26430]">Columbia.</span>
            </h1>
            <div className="lg:max-w-md lg:pb-3">
              <p className="text-white/70 text-[15px] lg:text-base leading-[1.7] font-light mb-6">
                Decorative pavement installations from downtown Vancouver to Vancouver Island &mdash; municipal corridors, public art, transit hubs, residential estates, and surface restoration.
              </p>
              <Link href="/contact" className="group inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-7 py-3.5 font-semibold text-[12px] tracking-[0.04em] uppercase rounded-none hover:bg-[#F26430] hover:text-white transition-colors duration-300">
                Start a Project<ArrowRight />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <div className="sticky top-[68px] z-30 bg-white/95 backdrop-blur-md border-b border-[#E2DDD8]">
        <Container>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#F26430] font-bold flex-shrink-0">Service</span>
              {SERVICES.map((s) => (
                <button key={s} onClick={() => setServiceFilter(s)}
                  className={`text-[11.5px] font-semibold tracking-[0.04em] uppercase px-3.5 py-1.5 whitespace-nowrap transition-all flex-shrink-0 border ${
                    serviceFilter === s
                      ? "bg-[#F26430] text-white border-[#F26430]"
                      : "bg-white text-[#5A5A5A] border-[#E2DDD8] hover:border-[#F26430]/40 hover:text-[#0A0A0A]"
                  }`}>
                  {s}
                </button>
              ))}
            </div>

            <div className="hidden sm:block w-px h-5 bg-[#E2DDD8]" />

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C8C8C] font-bold flex-shrink-0">Type</span>
              <button onClick={() => setAppFilter("All")}
                className={`text-[11.5px] font-semibold tracking-[0.04em] uppercase px-3.5 py-1.5 whitespace-nowrap transition-all flex-shrink-0 border ${
                  appFilter === "All"
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                    : "bg-white text-[#5A5A5A] border-[#E2DDD8] hover:border-[#0A0A0A]/40 hover:text-[#0A0A0A]"
                }`}>
                All
              </button>
              {APP_TYPES.map((a) => (
                <button key={a} onClick={() => setAppFilter(a)}
                  className={`text-[11.5px] font-semibold tracking-[0.04em] uppercase px-3.5 py-1.5 whitespace-nowrap transition-all flex-shrink-0 border ${
                    appFilter === a
                      ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                      : "bg-white text-[#5A5A5A] border-[#E2DDD8] hover:border-[#0A0A0A]/40 hover:text-[#0A0A0A]"
                  }`}>
                  {a}
                </button>
              ))}
            </div>

            <span className="ml-auto text-[11.5px] uppercase tracking-[0.18em] text-[#8C8C8C] font-medium flex-shrink-0">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12 lg:py-16">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {filtered.map((project, i) => {
                const imgSrc = project.imageUrl || serviceFallback[project.service] || serviceFallback["Stamped Asphalt"]
                return (
                  <motion.div key={project.slug} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.4), ease: [0.22, 1, 0.36, 1] }}>
                    <Link href={`/projects/${project.slug}`} className="group block bg-white border border-[#E2DDD8] overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F26430]/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                      <div className="relative aspect-[3/2] overflow-hidden bg-[#0A0A0A]">
                        <Image src={imgSrc} alt={`${project.title} — ${project.city}`} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.55)] via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-[rgba(10,10,10,0.65)] backdrop-blur-md px-3 py-1.5">
                          <span className="block w-1 h-1 rounded-full bg-[#F26430]" />
                          <span className="text-[10px] uppercase tracking-[0.22em] text-white font-semibold">{project.service}</span>
                        </div>
                        {project.featured && (
                          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#F26430] px-2.5 py-1">
                            <span className="text-[9.5px] uppercase tracking-[0.22em] text-white font-bold">Featured</span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3 text-[10.5px] uppercase tracking-[0.18em] text-[#8C8C8C] font-medium">
                          <span>{project.application}</span>
                          <span className="text-[#E2DDD8]">/</span>
                          <span>{project.city}</span>
                          {project.year && (
                            <>
                              <span className="text-[#E2DDD8]">/</span>
                              <span>{project.year}</span>
                            </>
                          )}
                        </div>
                        <h3 className="text-[#0A0A0A] font-semibold text-[17px] leading-[1.25] tracking-[-0.005em] mb-3 group-hover:text-[#F26430] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-[#5A5A5A] text-[13.5px] leading-[1.6] line-clamp-2 font-light">
                          {project.excerpt}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 text-[#F26430] text-[10.5px] uppercase tracking-[0.22em] font-bold">
                          View Project<ArrowRight />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-[#5A5A5A] text-[15px] font-light">No projects match this filter.</p>
              <button onClick={() => { setServiceFilter("All"); setAppFilter("All") }} className="mt-5 inline-flex items-center gap-2 text-[#F26430] text-[12px] uppercase tracking-[0.18em] font-bold border-b-2 border-[#F26430] pb-1.5 hover:gap-3 transition-all">
                Clear filters<ArrowRight />
              </button>
            </div>
          )}
        </div>
      </Container>

      <section className="relative bg-[#0A0A0A] py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg" alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-25" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.92)] via-[rgba(10,10,10,0.85)] to-[rgba(10,10,10,0.95)]" />
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(242,100,48,0.14) 0%, transparent 65%)" }} />

        <Container className="relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="block w-8 h-[1px] bg-[#F26430]/60" />
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#FF8A5C] font-bold">Work With Us</p>
              <span className="block w-8 h-[1px] bg-[#F26430]/60" />
            </div>
            <h2 className="text-white display-h" style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}>
              Ready to start<br />
              <span className="italic font-extralight">your project?</span>
            </h2>
            <p className="text-white/70 mt-7 text-[15.5px] lg:text-base leading-[1.7] font-light max-w-lg mx-auto">
              Free site walk and quote for your BC surface project &mdash; no obligation. Most quotes are back to you within 48 hours of the visit.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-8 py-4 font-semibold text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:bg-[#F26430] hover:text-white transition-colors duration-300">
                Request a Quote<ArrowRight />
              </Link>
              <a href="tel:+16044669902" className="border border-white/25 text-white px-8 py-4 font-medium text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:bg-white hover:text-[#0A0A0A] hover:border-white transition-colors duration-300">
                604-466-9902
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
