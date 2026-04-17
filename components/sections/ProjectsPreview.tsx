import Image from "next/image"
import Link from "next/link"
import { getFeaturedProjects } from "@/lib/projects"

const serviceImageMap: Record<string, string> = {
  "Stamped Asphalt":          "/images/products/streetprint/streetprint-1.jpg",
  "Decorative Coatings":      "/images/products/streetbond/streetbond-red-roundabout-mountains-01.jpg",
  "Preformed Thermoplastic":  "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  "Vapor Blasting":           "/images/services/vapor-blasting/hero.jpg",
}

const GLOBAL_FALLBACK = "/images/products/streetprint/streetprint-1.jpg"

export default function ProjectsPreview() {
  const featuredProjects = getFeaturedProjects().slice(0, 3)

  return (
    <section className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16">
          <span className="eyebrow">Selected Work</span>
          <h2 className="mt-4">Projects that speak.</h2>
        </div>

        {/* Asymmetric grid: col 1 (tall), cols 2+3 (standard) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, idx) => {
            const imgSrc = project.imageUrl ?? serviceImageMap[project.service] ?? GLOBAL_FALLBACK
            const isFeatured = idx === 0

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`group block relative overflow-hidden ${
                  isFeatured ? 'md:row-span-2' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${
                  isFeatured ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}>
                  <Image
                    src={imgSrc}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes={isFeatured ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 768px) 100vw, 30vw"}
                  />
                  {/* Bottom info strip */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-white font-semibold text-sm">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-xs mt-0.5">
                      {project.city}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA link */}
        <div className="text-center">
          <Link href="/projects" className="inline-flex items-center gap-2 text-[#C8601A] text-sm font-semibold border-b border-[#C8601A] pb-1 hover:gap-3 transition-all">
            View All Projects <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
