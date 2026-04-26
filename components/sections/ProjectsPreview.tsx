"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { getFeaturedProjects } from "@/lib/projects"

export default function ProjectsPreview() {
  const featured = getFeaturedProjects().filter(
    (p) => p.application !== "Driveways",
  )
  const [hero, ...rest] = featured
  const grid = rest.slice(0, 4)

  if (!hero) return null

  // Derive a readable badge from the project's own data rather than hardcoding
  const featuredLabel = hero.application || hero.service || "Featured"

  return (
    <section className="relative bg-[#EDE9E3] overflow-hidden">
      <span
        aria-hidden
        className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
        style={{ background: "linear-gradient(90deg, #C8601A 0%, #E8895A 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/textures/stamped-asphalt-texture.webp')",
          backgroundSize: "cover",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#C8601A]" />
              Our Work
            </p>
            <h2
              className="text-[#111111]"
              style={{
                fontSize: "clamp(1.9rem, 4vw, 3rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                letterSpacing: "-0.04em",
                textWrap: "balance",
              }}
            >
              Transforming BC,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "#C8601A" }}>
                one surface at a time.
              </em>
            </h2>
          </div>
          <Link
            href="/projects"
            className="group self-start lg:self-end inline-flex items-center gap-2 text-[#C8601A] text-sm font-semibold hover:gap-3 transition-all"
          >
            All Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            className="col-span-2 lg:row-span-2"
          >
            <Link
              href={`/projects/${hero.slug}`}
              className="group block relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[420px] overflow-hidden bg-[#F6F4F0] border border-[#E2DDD8]"
            >
              <Image
                src={hero.imageUrl}
                alt={hero.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(20,22,26,0) 35%, rgba(20,22,26,0.78) 100%)",
                }}
              />
              <span className="absolute top-5 left-5 inline-flex items-center gap-2 bg-[#C8601A] text-white text-[10px] uppercase tracking-[0.22em] font-bold px-3 py-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                Featured {featuredLabel}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#E8895A] font-semibold mb-3">
                  {hero.service} · {hero.city}{hero.year ? ` · ${hero.year}` : ""}
                </p>
                <h3
                  className="text-white"
                  style={{
                    fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                    textWrap: "balance",
                  }}
                >
                  {hero.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-lg line-clamp-3">
                  {hero.excerpt}
                </p>
                <span
                  aria-hidden
                  className="block mt-5 h-[2px] bg-[#C8601A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
              </div>
            </Link>
          </motion.div>

          {/* Standard cards */}
          {grid.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="group block relative bg-white border border-[#E2DDD8] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE9E3]">
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[#C8601A] font-semibold mb-2">
                    {p.application}
                  </p>
                  <h4 className="text-[#111111] text-[14.5px] font-semibold leading-tight tracking-tight">
                    {p.title}
                  </h4>
                  <p className="text-[#5A5A5A] text-[11px] uppercase tracking-[0.12em] mt-1.5">
                    {p.city}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#C8601A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
