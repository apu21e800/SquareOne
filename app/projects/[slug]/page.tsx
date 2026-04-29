import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { projects, getProjectBySlug } from "@/lib/projects"
import type { Metadata } from "next"
import Container from "@/components/ui/Container"

interface Props {
  params: Promise<{ slug: string }>
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
    alternates: { canonical: `https://squareonepaving.ca/projects/${slug}` },
    openGraph: {
      title: `${project.title} | Square One Paving BC`,
      description: project.excerpt,
      images: project.imageUrl ? [project.imageUrl] : undefined,
    },
  }
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const heroImage = project.imageUrl || "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
  const serviceSlug = serviceSlugMap[project.service] ?? "stamped-asphalt"

  // Related projects — same service or application, but with DIFFERENT images so the row is varied.
  const relatedPool = projects.filter(
    (p) => p.slug !== slug && (p.service === project.service || p.application === project.application)
  )
  const seenImages = new Set<string>()
  const relatedProjects: typeof projects = []
  for (const p of relatedPool) {
    if (!seenImages.has(p.imageUrl)) {
      seenImages.add(p.imageUrl)
      relatedProjects.push(p)
      if (relatedProjects.length === 3) break
    }
  }
  // If we still have fewer than 3 (small pool), top up with any other featured projects with unique imagery.
  if (relatedProjects.length < 3) {
    for (const p of projects) {
      if (p.slug === slug) continue
      if (seenImages.has(p.imageUrl)) continue
      seenImages.add(p.imageUrl)
      relatedProjects.push(p)
      if (relatedProjects.length === 3) break
    }
  }

  return (
    <main className="bg-white">

      {/* ── Hero — cinematic, uses the project's actual image ─────────────── */}
      <section className="relative min-h-[68vh] lg:min-h-[78vh] flex items-end overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.45)] via-[rgba(10,10,10,0.30)] to-[rgba(10,10,10,0.95)]" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,10,0.55)] via-transparent to-[rgba(10,10,10,0.20)]" />
        </div>

        <Container className="relative z-10 w-full pt-32 pb-20 lg:pb-28">
          <Link href="/projects" className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-[12px] uppercase tracking-[0.18em] font-semibold transition-colors mb-7">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
              <path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
            All Projects
          </Link>

          <div className="flex items-center gap-3 mb-7 flex-wrap">
            <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-bold">{project.service}</span>
            <span className="hidden sm:block w-px h-3 bg-white/20" />
            <span className="text-[10.5px] uppercase tracking-[0.18em] text-white/60 font-semibold">{project.application}</span>
            {project.year && (
              <>
                <span className="hidden sm:block w-px h-3 bg-white/20" />
                <span className="text-[10.5px] uppercase tracking-[0.18em] text-white/60 font-semibold">{project.year}</span>
              </>
            )}
          </div>

          <h1 className="text-white display-h max-w-4xl" style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}>
            {project.title}
          </h1>
          <p className="text-white/75 mt-6 text-[15px] lg:text-base font-light tracking-[-0.005em]">{project.city}</p>
        </Container>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main column */}
            <div className="lg:col-span-2">
              <p className="text-[10.5px] uppercase tracking-[0.28em] text-[#F26430] font-bold mb-4">Project Overview</p>
              <h2 className="text-[#0A0A0A] display-h mb-7" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
                The brief, in detail.
              </h2>
              <p className="text-[#2C2C2C] leading-[1.8] text-[15.5px] font-light max-w-2xl">
                {project.excerpt}
              </p>

              {/* Single hero image as the lead visual instead of a duplicate gallery */}
              <div className="mt-12 lg:mt-16 relative aspect-[16/10] overflow-hidden bg-[#F6F4F0]">
                <Image
                  src={heroImage}
                  alt={`${project.title} — surface system installation`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-[11.5px] uppercase tracking-[0.18em] text-[#8C8C8C] font-semibold">
                {project.title} &middot; {project.city}
              </p>

              {/* Quick facts strip */}
              <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-[#E2DDD8]">
                {[
                  { label: "Service", value: project.service },
                  { label: "Application", value: project.application },
                  { label: "Location", value: project.city },
                ].map((d, i) => (
                  <div key={d.label} className={`p-6 lg:p-7 border-b border-[#E2DDD8] ${i < 2 ? "sm:border-r border-[#E2DDD8]" : ""}`}>
                    <p className="text-[10.5px] uppercase tracking-[0.28em] text-[#F26430] font-bold mb-2.5">{d.label}</p>
                    <p className="text-[#0A0A0A] font-semibold text-[15px] leading-[1.4] tracking-[-0.005em]">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-[#F6F4F0] border-l-2 border-[#F26430] p-7 lg:p-8 lg:sticky lg:top-28">
                <p className="text-[10.5px] uppercase tracking-[0.28em] text-[#F26430] font-bold mb-5">Project Details</p>
                <div className="space-y-4 mb-7">
                  {[
                    { label: "Service", value: project.service },
                    { label: "Application", value: project.application },
                    { label: "Location", value: project.city },
                    ...(project.year ? [{ label: "Year", value: project.year }] : []),
                  ].map((d) => (
                    <div key={d.label} className="flex justify-between gap-3 text-[13px] border-b border-[#E2DDD8] pb-3 last:border-b-0">
                      <span className="text-[#8C8C8C] font-medium tracking-[0.02em]">{d.label}</span>
                      <span className="font-semibold text-[#0A0A0A] text-right tracking-[-0.005em]">{d.value}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/services/${serviceSlug}`}
                  className="group block w-full text-center font-semibold py-3.5 text-[12px] tracking-[0.18em] uppercase bg-[#0A0A0A] hover:bg-[#F26430] text-white transition-colors mb-3 inline-flex items-center justify-center gap-3"
                >
                  View {project.service}<ArrowRight />
                </Link>
                <Link
                  href="/contact"
                  className="block w-full text-center font-semibold py-3.5 text-[12px] tracking-[0.18em] uppercase border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors"
                >
                  Request a Quote
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── Related Projects ─────────────────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section className="bg-[#F6F4F0] py-20 lg:py-24 border-t border-[#E2DDD8]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-12 items-end mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#F26430] font-semibold">Similar Work</p>
                </div>
                <h2 className="text-[#0A0A0A] display-h" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)" }}>
                  Related projects.
                </h2>
              </div>
              <Link href="/projects" className="group inline-flex items-center gap-3 text-[#0A0A0A] text-[12px] uppercase tracking-[0.18em] font-semibold border-b border-[#0A0A0A] pb-1.5 hover:gap-4 transition-all self-end justify-self-start lg:justify-self-end">
                See all projects<ArrowRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group bg-white border border-[#E2DDD8] hover:border-[#F26430]/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-500 overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.imageUrl || "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.55)] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-[rgba(10,10,10,0.65)] backdrop-blur-md px-3 py-1.5">
                      <span className="block w-1 h-1 rounded-full bg-[#F26430]" />
                      <span className="text-[10px] uppercase tracking-[0.22em] text-white font-semibold">{p.service}</span>
                    </div>
                  </div>
                  <div className="p-5 lg:p-6">
                    <h3 className="font-semibold text-[#0A0A0A] text-[15.5px] leading-[1.3] tracking-[-0.005em] group-hover:text-[#F26430] transition-colors mb-2">
                      {p.title}
                    </h3>
                    <p className="text-[12.5px] text-[#5A5A5A] font-light">{p.city}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0A0A0A] py-20 lg:py-28 overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(242,100,48,0.14) 0%, transparent 65%)" }} />
        <Container className="relative">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-bold">Start Your Project</p>
            </div>
            <h2 className="text-white display-h mb-7" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
              Ready to transform<br />
              <span className="italic font-extralight">a surface?</span>
            </h2>
            <p className="text-white/75 text-[15.5px] leading-[1.7] mb-9 max-w-xl font-light">
              Free consultation and quote across BC. Tell us what you&apos;re working with &mdash; we&apos;ll come back the same week with the right specification.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="group bg-white text-[#0A0A0A] px-9 py-4 font-semibold text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:bg-[#F26430] hover:text-white transition-colors duration-300 inline-flex items-center gap-3">
                Request a Quote<ArrowRight />
              </Link>
              <a href="tel:6043098212" className="group border border-white/30 text-white px-9 py-4 font-medium text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300 inline-flex items-center gap-3">
                604-309-8212
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
