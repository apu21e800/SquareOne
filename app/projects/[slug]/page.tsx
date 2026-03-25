import { notFound } from "next/navigation"
import Link from "next/link"
import { projects, getProjectBySlug } from "@/lib/projects"
import { buildMetadata } from "@/lib/seo"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return buildMetadata({
    title: project.title,
    description: project.excerpt,
    slug: `projects/${project.slug}`,
  })
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = projects
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.service === project.service || p.application === project.application)
    )
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-[#F5F3F0]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/projects"
            className="text-sm text-[#8B8680] hover:text-[#E8581A] transition mb-6 inline-block"
          >
            ← Back to Projects
          </Link>
          <div className="flex gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E8581A]/10 text-[#E8581A]">
              {project.service}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#8B8680]/10 text-[#8B8680]">
              {project.application}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
            {project.title}
          </h1>
          <p className="text-[#8B8680]">{project.city}</p>
        </div>
      </section>

      {/* Image placeholder */}
      <section className="px-6 sm:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="h-80 md:h-[500px] bg-gradient-to-br from-[#8B8680]/20 to-[#E8581A]/10 rounded-2xl flex items-center justify-center">
            <p className="text-[#8B8680]/60">Project Image</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">
                Project Overview
              </h2>
              <p className="text-[#8B8680] leading-relaxed mb-10">
                {project.excerpt}
              </p>

              {/* Gallery placeholder */}
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">
                Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="aspect-square bg-gradient-to-br from-[#8B8680]/10 to-[#E8581A]/5 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-[#8B8680]/40 text-xs">Photo {n}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl p-8 shadow-md sticky top-24">
                <h3 className="font-bold text-lg text-[#2D2D2D] mb-6">
                  Project Details
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Service", value: project.service },
                    { label: "Application", value: project.application },
                    { label: "Location", value: project.city },
                  ].map((detail) => (
                    <div
                      key={detail.label}
                      className="flex justify-between text-sm border-b border-[#8B8680]/10 pb-3"
                    >
                      <span className="text-[#8B8680]">{detail.label}</span>
                      <span className="font-semibold text-[#2D2D2D] text-right">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/services/${project.service.toLowerCase().replace(/ /g, "-")}`}
                  className="block w-full text-center font-semibold py-4 rounded-lg mt-8 text-sm bg-[#E8581A] hover:bg-[#d44f16] text-white transition"
                >
                  View {project.service} Service
                </Link>
                <Link
                  href="/contact"
                  className="block w-full text-center font-semibold py-4 rounded-lg mt-3 text-sm border border-[#8B8680]/20 text-[#2D2D2D] hover:border-[#E8581A] transition"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 px-6 sm:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-8">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group bg-[#F5F3F0] rounded-xl overflow-hidden hover:shadow-md transition"
                >
                  <div className="h-40 bg-gradient-to-br from-[#8B8680]/20 to-[#E8581A]/10 flex items-center justify-center">
                    <span className="text-[#8B8680]/60 text-sm">
                      {p.service}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[#E8581A]/10 text-[#E8581A] mb-3 inline-block">
                      {p.service}
                    </span>
                    <h3 className="font-bold text-sm text-[#2D2D2D] group-hover:text-[#E8581A] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#8B8680] mt-1">{p.city}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 sm:px-8 bg-[#2D2D2D]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to start your project?
          </h2>
          <p className="text-white/70 mb-10">
            Get a free consultation and quote for your BC surface project.
          </p>
          <Link href="/contact">
            <button className="bg-[#E8581A] hover:bg-[#d44f16] text-white px-10 py-4 rounded-lg font-semibold text-lg transition">
              Request a Quote
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
