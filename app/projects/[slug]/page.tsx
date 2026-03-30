import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { projects, getProjectBySlug } from "@/lib/projects"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

const serviceImageMap: Record<string, string> = {
  "Stamped Asphalt": "/images/products/streetprint/streetprint-1.jpg",
  "Decorative Coatings": "/images/products/streetbond/streetbond-1.jpg",
  "Preformed Thermoplastic": "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  "Vapor Blasting": "/images/products/streetbond/streetbond-1.jpg",
}

const serviceSlugMap: Record<string, string> = {
  "Stamped Asphalt": "stamped-asphalt",
  "Decorative Coatings": "decorative-coatings",
  "Preformed Thermoplastic": "preformed-thermoplastic",
  "Vapor Blasting": "vapor-blasting",
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} | Square One Paving BC`,
    description: project.excerpt,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const heroImage = serviceImageMap[project.service] ?? "/images/products/streetprint/streetprint-1.jpg"
  const serviceSlug = serviceSlugMap[project.service] ?? "stamped-asphalt"

  const relatedProjects = projects
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.service === project.service || p.application === project.application)
    )
    .slice(0, 3)

  return (
    <main className="bg-[#FAFAFA]">

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 pb-16 pt-36 w-full">
          <Link href="/projects" className="text-white/60 hover:text-white text-sm transition-colors mb-4 inline-block">
            ← All Projects
          </Link>
          <div className="flex gap-2 mb-4">
            <span className="bg-[#D66620] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">
              {project.service}
            </span>
            <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">
              {project.application}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-3 max-w-3xl">
            {project.title}
          </h1>
          <p className="text-white/80">{project.city}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black text-[#333333] mb-5">Project Overview</h2>
              <p className="text-[#626262] leading-relaxed mb-12 text-base">{project.excerpt}</p>

              {/* Gallery — using service image with multiple cards */}
              <h2 className="text-2xl font-black text-[#333333] mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="relative aspect-square rounded-xl overflow-hidden bg-[#F2EFE9]">
                    <Image
                      src={heroImage}
                      alt={`${project.title} photo ${n}`}
                      fill
                      className="object-cover"
                      sizes="(max-width:640px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-2xl border border-[#E8E4DE] p-7 sticky top-24">
                <h3 className="font-black text-base text-[#333333] mb-5">Project Details</h3>
                <div className="space-y-3 mb-7">
                  {[
                    { label: "Service", value: project.service },
                    { label: "Application", value: project.application },
                    { label: "Location", value: project.city },
                  ].map((detail) => (
                    <div key={detail.label} className="flex justify-between text-sm border-b border-[#F2EFE9] pb-3 gap-3">
                      <span className="text-[#999]">{detail.label}</span>
                      <span className="font-semibold text-[#333333] text-right">{detail.value}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/services/${serviceSlug}`}
                  className="block w-full text-center font-bold py-3.5 rounded-lg text-sm bg-[#D66620] hover:bg-[#C05A18] text-white transition-colors uppercase tracking-wider mb-3"
                >
                  View {project.service}
                </Link>
                <Link
                  href="/contact"
                  className="block w-full text-center font-semibold py-3.5 rounded-lg text-sm border border-[#E8E4DE] text-[#333333] hover:border-[#D66620]/50 hover:text-[#D66620] transition-colors"
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
        <section className="py-16 px-6 sm:px-8 bg-white border-t border-[#E8E4DE]">
          <div className="max-w-6xl mx-auto">
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">Similar Work</p>
            <h2 className="text-2xl font-black text-[#333333] mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => {
                const img = serviceImageMap[p.service] ?? heroImage
                return (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group bg-[#F2EFE9] rounded-xl overflow-hidden border border-[#E8E4DE] hover:border-[#D66620]/40 hover:shadow-lg transition-all"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image src={img} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-2 left-2 bg-[#D66620] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        {p.service}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-black text-sm text-[#333333] group-hover:text-[#D66620] transition-colors mb-1">{p.title}</h3>
                      <p className="text-xs text-[#999]">{p.city}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 sm:px-8 bg-[#32373C]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F0A04B] text-xs uppercase tracking-[0.22em] font-semibold mb-5">Start Your Project</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-5">
            Ready to Transform Your Surface?
          </h2>
          <p className="text-white/75 mb-10">
            Free consultation and quote for your BC surface project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Request a Free Quote
              </span>
            </Link>
            <a href="tel:6043098212">
              <span className="inline-block border border-white/25 text-white hover:bg-white/10 px-10 py-4 rounded-lg font-semibold text-sm transition-colors">
                604-309-8212
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
