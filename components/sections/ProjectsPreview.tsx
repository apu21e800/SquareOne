import Image from "next/image"
import Link from "next/link"
import { projects, getFeaturedProjects } from "@/lib/projects"

const FALLBACK = "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"

export default function ProjectsPreview() {
  const featured = getFeaturedProjects()
  const pool = featured.length >= 3 ? featured : projects.slice(0, 6)
  const [hero, a, b] = pool.slice(0, 3)

  if (!hero) return null

  const card = (p: typeof hero, aspectClass: string) => (
    <Link
      key={p.slug}
      href={`/projects/${p.slug}`}
      className={`group relative block overflow-hidden bg-[#EDE9E3] ${aspectClass}`}
    >
      <Image
        src={p.imageUrl || FALLBACK}
        alt={p.title}
        fill
        className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
        <p className="text-white font-semibold text-[15px] lg:text-[17px] tracking-[-0.01em] leading-snug">
          {p.title}
        </p>
        <p className="text-white/60 text-[11px] tracking-[0.15em] uppercase mt-1.5">
          {p.city}
        </p>
      </div>
    </Link>
  )

  return (
    <section className="bg-[#F6F4F0] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mb-14 lg:mb-20 max-w-2xl">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#C8601A] font-medium mb-6">
            Selected Work
          </p>
          <h2 className="text-[#111111]">Projects that speak.</h2>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="md:row-span-2">
            {card(hero, "aspect-[3/4] h-full")}
          </div>
          {a && <div>{card(a, "aspect-[4/3]")}</div>}
          {b && <div>{card(b, "aspect-[4/3]")}</div>}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/projects"
            className="inline-block text-[#C8601A] hover:text-[#A84F15] text-sm font-semibold tracking-[0.1em] uppercase underline underline-offset-8 decoration-1"
          >
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  )
}
