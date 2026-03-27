import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { projects, getProjectBySlug } from "@/lib/projects"
import { buildMetadata } from "@/lib/seo"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
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

  // Related: same service first, fallback to any 3 other projects
  const sameService = projects.filter(
    (p) => p.slug !== slug && p.service === project.service
  )
  const relatedProjects =
    sameService.length >= 3
      ? sameService.slice(0, 3)
      : [
          ...sameService,
          ...projects.filter(
            (p) =>
              p.slug !== slug &&
              !sameService.find((r) => r.slug === p.slug)
          ),
        ].slice(0, 3)

  return (
    <main className="min-h-screen bg-[#F5F3F0]">
      {/* Hero — full-width image with gradient overlay */}
      <section className="relative h-[55vh] min-h-[400px] w-full">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          priority
          className="object-cover"
        />
        {/* Dark gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

        {/* Back link */}
        <div className="absolute top-0 left-0 right-0 pt-24 px-6 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/projects"
              className="text-sm text-white/80 hover:text-white transition inline-flex items-center gap-1"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-8 pb-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 mb-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E8581A] text-white">
                {project.service}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                {project.application}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
              {project.title}
            </h1>
            <p className="text-white/80 text-sm font-medium">{project.city}</p>
          </div>
        </div>
      </section>

      {/* Content — 2-col on lg */}
      <section className="py-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: description + excerpt */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">
                Project Overview
              </h2>
              <p className="text-[#2D2D2D] leading-relaxed text-base mb-6">
                {project.description}
              </p>
              <p className="text-[#8B8680] leading-relaxed text-sm">
                {project.excerpt}
              </p>
            </div>

            {/* Right: details sidebar */}
            <div>
              <div className="bg-white rounded-xl p-8 shadow-md sticky top-24">
                <h3 className="font-bold text-lg text-[#2D2D2D] mb-6">
                  Project Details
                </h3>
                <div className="space-y-4">
                  {(
                    [
                      { label: "Service", value: project.service },
                      { label: "Application", value: project.application },
                      { label: "City", value: project.city },
                    ] as const
                  ).map((detail) => (
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
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
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
            Start Your Own Project
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
