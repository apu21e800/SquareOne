import Image from "next/image"
import Link from "next/link"
import { getFeaturedProjects, projects } from "@/lib/projects"

const FALLBACK = "/images/products/streetprint/streetprint-1.jpg"

export default function ProjectsPreview() {
  const featured = getFeaturedProjects()
  const [one, two, three] =
    featured.length >= 3
      ? [featured[0], featured[1], featured[2]]
      : [projects[0], projects[1], projects[2]]

  return (
    <section className="w-full bg-[#F6F4F0] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
              Selected Work
            </p>
            <h2
              className="text-[#111111]"
              style={{
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontSize: "clamp(1.8rem, 3vw, 3rem)",
              }}
            >
              A record of installed surfaces.
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-[#1C2026] hover:text-[#C8601A] text-xs font-semibold uppercase tracking-[0.18em] transition-colors inline-flex items-center gap-2"
          >
            View All Projects
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href={`/projects/${one.slug}`}
            className="group block md:row-span-1"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#EDE9E3]">
              <Image
                src={one.imageUrl || FALLBACK}
                alt={one.title}
                fill
                className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                <p className="text-[#E8C9A8] text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">
                  {one.service} · {one.city}
                </p>
                <h3
                  className="text-white"
                  style={{ fontWeight: 500, fontSize: "1.35rem", lineHeight: 1.25 }}
                >
                  {one.title}
                </h3>
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-6 md:col-span-2">
            {[two, three].map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-[#EDE9E3]">
                  <Image
                    src={project.imageUrl || FALLBACK}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                    <p className="text-[#E8C9A8] text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">
                      {project.service} · {project.city}
                    </p>
                    <h3
                      className="text-white"
                      style={{ fontWeight: 500, fontSize: "1.15rem", lineHeight: 1.25 }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
