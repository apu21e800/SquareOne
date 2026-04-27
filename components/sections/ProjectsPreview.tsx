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

  const featuredLabel = hero.application || hero.service || "Featured"

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0A0C10" }}
    >
      {/* Orange accent bar — top left edge */}
      <span
        aria-hidden
        className="absolute left-0 top-0 w-20 h-[3px]"
        style={{
          background: "linear-gradient(90deg, #C8601A 0%, #E8895A 100%)",
        }}
      />

      {/* Radial bloom */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(200,96,26,0.10) 0%, transparent 55%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-5 flex items-center gap-3"
              style={{ color: "#E8895A" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ background: "#C8601A" }}
              />
              Our Work
            </p>
            <h2
              style={{
                fontSize: "clamp(1.9rem, 4vw, 3rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                letterSpacing: "-0.04em",
                color: "white",
              }}
            >
              Transforming BC,{" "}
              <span style={{ color: "#C8601A" }}>one surface at a time.</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="group self-start lg:self-end inline-flex items-center gap-2 text-[#E8895A] text-sm font-semibold hover:gap-3 transition-all"
          >
            All Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">

          {/* HERO card — 2-col wide, 2-row tall */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            className="col-span-2 lg:row-span-2"
          >
            <Link
              href={`/projects/${hero.slug}`}
              className="group block relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[420px] overflow-hidden rounded-xl"
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
                  background:
                    "linear-gradient(180deg, rgba(20,22,26,0) 35%, rgba(20,22,26,0.88) 100%)",
                }}
              />
              <span className="absolute top-5 left-5 inline-flex items-center gap-2 bg-[#C8601A] text-white text-[10px] uppercase tracking-[0.22em] font-bold px-3 py-1.5 rounded">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                Featured {featuredLabel}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <p
                  className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-3"
                  style={{ color: "#E8895A" }}
                >
                  {hero.service} · {hero.city}
                  {hero.year ? ` · ${hero.year}` : ""}
                </p>
                <h3
                  style={{
                    fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                    color: "white",
                  }}
                >
                  {hero.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mt-3 max-w-lg line-clamp-3"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
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
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.06,
                ease: [0.2, 0.7, 0.2, 1],
              }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="group block relative overflow-hidden aspect-[4/3] rounded-xl"
              >
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.80) 100%)",
                  }}
                />
                <span
                  aria-hidden
                  className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#C8601A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p
                    className="text-[9px] uppercase tracking-[0.22em] font-semibold mb-1.5"
                    style={{ color: "#E8895A" }}
                  >
                    {p.application}
                  </p>
                  <h4
                    className="text-[14px] font-semibold leading-tight tracking-tight"
                    style={{ color: "white" }}
                  >
                    {p.title}
                  </h4>
                  <p
                    className="text-[11px] uppercase tracking-[0.12em] mt-1"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {p.city}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
