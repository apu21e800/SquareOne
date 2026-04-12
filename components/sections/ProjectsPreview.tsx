import Image from "next/image"
import Link from "next/link"
import { getFeaturedProjects } from "@/lib/projects"

/* Fallback images by service — always something relevant */
const serviceImageMap: Record<string, string> = {
  "Stamped Asphalt":          "/images/products/streetprint/streetprint-1.jpg",
  "Decorative Coatings":      "/images/products/streetbond/streetbond-1.jpg",
  "Preformed Thermoplastic":  "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  "Vapor Blasting":           "/images/products/streetprint/streetprint-1.jpg",
}

const GLOBAL_FALLBACK = "/images/products/streetprint/streetprint-1.jpg"

export default function ProjectsPreview() {
  const featuredProjects = getFeaturedProjects().slice(0, 3)

  return (
    <section className="w-full py-20 bg-[#F9F6F2]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            Recent Work
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-[#1C2226] leading-tight">
              Featured Projects
            </h2>
            <Link href="/projects">
              <span className="text-[#D66620] font-semibold text-sm hover:text-[#C05A18] transition-colors">
                View All Projects →
              </span>
            </Link>
          </div>
          <div className="mt-6 h-px bg-gradient-to-r from-[#D66620]/40 to-transparent" />
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProjects.map((project) => {
            const imgSrc = project.imageUrl ?? serviceImageMap[project.service] ?? GLOBAL_FALLBACK
            return (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden border border-[#E8E4DE] hover:border-[#D66620]/40 hover:shadow-xl transition-all duration-200">

                  {/* Image */}
                  <div className="relative h-60 overflow-hidden" style={{
                    background: "linear-gradient(135deg, #E8E4DE 0%, #D5D0C8 100%)",
                  }}>
                    {/* Subtle placeholder pattern behind image */}
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)",
                    }} />
                    <Image
                      src={imgSrc}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Service tag */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#D66620] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                        {project.service}
                      </span>
                    </div>

                    {project.year && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-black/50 text-white/85 text-[10px] font-semibold px-2 py-1 rounded">
                          {project.year}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-xs font-medium text-[#A0A0A0]">{project.application}</span>
                      <span className="text-[#D0CCC5]">·</span>
                      <span className="text-xs font-medium text-[#A0A0A0]">{project.city}</span>
                    </div>
                    <h3 className="text-base font-black text-[#1C2226] mb-3 group-hover:text-[#D66620] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[#D66620] text-xs font-bold uppercase tracking-widest">
                      <span className="group-hover:mr-1 transition-all duration-200">View Project</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link href="/projects">
            <span className="inline-block border border-[#D66620]/30 hover:border-[#D66620] text-[#D66620] hover:bg-[#D66620] hover:text-white px-8 py-3 rounded-lg font-bold text-sm transition-all duration-200">
              See All Projects
            </span>
          </Link>
        </div>

      </div>
    </section>
  )
}
