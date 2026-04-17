import Link from "next/link"
import { getFeaturedProjects } from "@/lib/projects"

export default function ProjectsPreview() {
  const projects = getFeaturedProjects().slice(0, 3)

  const gradients = [
    "from-[#C8C4BC] to-[#9E9890]",
    "from-[#B8B0A4] to-[#8C8480]",
    "from-[#D5D0C8] to-[#A8A09A]",
  ]

  return (
    <section className="w-full py-24 md:py-32 bg-white border-t border-[#E2DDD8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
              Selected Work
            </span>
            <h2 className="mt-3 text-[#111111]">Projects that speak.</h2>
          </div>
          <Link
            href="/projects"
            className="text-[#C8601A] text-sm font-semibold underline-offset-4 hover:underline"
          >
            View All Projects →
          </Link>
        </div>

        {/* Asymmetric grid — single row on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E2DDD8]">
          {projects.map((project, i) => {
            const isFirst = i === 0
            const paddingMobile = "75%"
            const paddingDesktop = isFirst ? "100%" : "75%"

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative overflow-hidden bg-[#EDE9E3]"
              >
                {/* Placeholder bg */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradients[i] ?? gradients[0]} group-hover:scale-105 transition-transform duration-700`}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Aspect ratio spacers — different per breakpoint */}
                <div className="block md:hidden" style={{ paddingBottom: paddingMobile }} />
                <div className="hidden md:block" style={{ paddingBottom: paddingDesktop }} />

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-5">
                  <div className="text-white font-semibold text-sm leading-snug">
                    {project.title}
                  </div>
                  <div className="text-white/60 text-xs mt-1">{project.city}</div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom link */}
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="text-[#C8601A] text-sm font-semibold tracking-[0.08em] uppercase hover:underline"
          >
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  )
}
