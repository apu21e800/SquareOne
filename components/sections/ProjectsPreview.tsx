"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { getFeaturedProjects } from "@/lib/projects"
import Container from "@/components/ui/Container"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ProjectsPreview() {
  const featuredProjects = getFeaturedProjects().slice(0, 6)

  return (
    <section className="relative bg-[#0F1115] section-padding overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 80% 0%, rgba(242,100,48,0.08) 0%, transparent 60%)" }} />

      <Container>
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-14 lg:mb-20 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-end"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-semibold">Selected Work</p>
            </div>
            <h2 className="font-light text-white leading-[0.98] tracking-[-0.03em]" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}>
              Transforming BC,<br />
              <span className="italic font-extralight">one surface at a time.</span>
            </h2>
          </div>
          <Link href="/projects" className="group inline-flex items-center gap-3 text-white text-[13px] uppercase tracking-[0.18em] font-semibold border-b border-white/30 pb-2 hover:border-[#F26430] hover:text-[#FF8A5C] transition-colors duration-300 self-end justify-self-start lg:justify-self-end">
            View all projects<ArrowRight />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {featuredProjects.map((project, i) => {
            const isFeatured = i === 0
            return (
              <motion.div
                key={project.slug}
                initial={{ y: 32, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: easeOut, delay: i * 0.06 }}
                className={isFeatured ? "lg:col-span-2 lg:row-span-2" : ""}
              >
                <Link href={`/projects/${project.slug}`} className="group block relative overflow-hidden rounded-none bg-[#181C22] h-full">
                  <div className={`relative overflow-hidden ${isFeatured ? "aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-[4/3]"}`}>
                    <Image
                      fill
                      sizes={isFeatured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      src={project.imageUrl || "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"}
                      alt={project.title}
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(15,17,21,0.92)] via-[rgba(15,17,21,0.20)] to-transparent" />

                    {project.service && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-[rgba(15,17,21,0.65)] backdrop-blur-md px-3 py-1.5">
                        <span className="block w-1 h-1 rounded-full bg-[#F26430]" />
                        <span className="text-[10px] uppercase tracking-[0.22em] text-white font-semibold">{project.service}</span>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7">
                      <h3 className={`font-semibold text-white leading-tight tracking-[-0.01em] ${isFeatured ? "text-xl lg:text-2xl" : "text-base lg:text-lg"}`}>
                        {project.title}
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70 group-hover:text-[#FF8A5C] transition-colors duration-300">
                        Read case<ArrowRight />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
