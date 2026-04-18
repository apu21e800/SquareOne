import Image from "next/image"
import Link from "next/link"
import { getFeaturedProjects } from "@/lib/projects"

export default function ProjectsPreview() {
  const featuredProjects = getFeaturedProjects().slice(0, 6)

  return (
    <section className="bg-[#1C2026] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header row */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#C8601A] font-semibold mb-3">
              Our Work
            </p>
            <h2 className="text-[2.5rem] font-light text-white leading-tight tracking-[-0.02em]">
              Transforming BC, one surface at a time.
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-[#C8601A] text-sm font-semibold hover:underline whitespace-nowrap"
          >
            All Projects →
          </Link>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block relative overflow-hidden rounded-none"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-none transition-transform duration-500 group-hover:scale-105"
                  src={project.imageUrl || "/images/placeholder.jpg"}
                  alt={project.title}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
                {/* Hover content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[10px] uppercase tracking-wider text-[#C8601A] font-semibold">
                    {project.service}
                  </p>
                  <h3 className="font-semibold text-white text-lg leading-tight mt-1">
                    {project.title}
                  </h3>
                </div>
              </div>
              {/* Bottom orange accent on hover */}
              <div className="h-[3px] bg-[#C8601A] w-0 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
