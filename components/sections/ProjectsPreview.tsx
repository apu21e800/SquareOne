import Image from "next/image"
import Link from "next/link"

const featuredProjects = [
  {
    slug: "downtown-vancouver-crosswalk",
    name: "Downtown Vancouver Crosswalk",
    service: "Stamped Asphalt",
    location: "Vancouver, BC",
    image: "/images/applications/crosswalks/crosswalk-1.jpg",
  },
  {
    slug: "bc-transit-victoria",
    name: "BC Transit Priority Lane",
    service: "Decorative Coatings",
    location: "Victoria, BC",
    image: "/images/applications/bus-lanes/beebe-hospital-brick-crosswalk-entry-01.jpg",
  },
  {
    slug: "westshore-parking-markings",
    name: "Westshore Town Centre",
    service: "Preformed Thermoplastic",
    location: "Langford, BC",
    image: "/images/applications/roundabouts/roundabout-01.jpg",
  },
]

export default function ProjectsPreview() {
  return (
    <section className="w-full py-20 bg-[#FAFAFA] grid-pattern">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            Recent Work
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-[#333333] leading-tight">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
              <div className="bg-white rounded-xl overflow-hidden border border-[#E8E4DE] hover:border-[#D66620]/40 hover:shadow-xl transition-all duration-200">
                {/* Image */}
                <div className="relative h-56 bg-[#F2EFE9] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Service tag */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#D66620] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {project.service}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#333333] mb-1">
                    {project.name}
                  </h3>
                  <p className="text-[#626262] text-sm mb-4">
                    {project.location}
                  </p>
                  <span className="text-[#D66620] text-xs font-bold uppercase tracking-widest group-hover:tracking-[0.2em] transition-all duration-200">
                    View Project →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
