"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { getFeaturedProjects } from "@/lib/projects"
import Container from "@/components/ui/Container"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function ProjectsPreview() {
  const featuredProjects = getFeaturedProjects().slice(0, 6)

  return (
    <section className="bg-[#1C2026] section-padding">
      <Container>

        {/* Header row */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-12 flex flex-wrap gap-4 justify-between items-end"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#C8601A] font-semibold mb-3">
              Our Work
            </p>
            <h2 className="text-[clamp(2rem,4vw,2.5rem)] font-light text-white leading-tight tracking-[-0.02em]">
              Transforming BC, one surface at a time.
            </h2>
          </div>
          <Link
            href="/projects"
            className="hover-underline text-[#C8601A] text-sm font-semibold whitespace-nowrap"
          >
            All Projects &#8594;
          </Link>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block relative overflow-hidden rounded-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  {project.service && (
                    <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-[0.18em] font-semibold bg-[#C8601A] text-white px-3 py-1.5">
                      {project.service}
                    </span>
                  )}
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-none group-hover:scale-105 transition-transform duration-700 ease-out"
                    src={project.imageUrl || "/images/placeholder.jpg"}
                    alt={project.title}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
                  {/* Hover content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-white text-lg leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>
                {/* Bottom orange accent on hover */}
                <div className="h-[3px] bg-[#C8601A] w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  )
}
