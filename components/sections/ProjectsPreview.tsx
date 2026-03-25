import Link from "next/link"

export default function ProjectsPreview() {
  const featuredProjects = [
    {
      id: "1",
      name: "Downtown Vancouver Crosswalk",
      service: "Stamped Asphalt",
      location: "Vancouver, BC",
    },
    {
      id: "2",
      name: "BC Transit Priority Lane",
      service: "Decorative Coatings",
      location: "Victoria, BC",
    },
    {
      id: "3",
      name: "Westshore Parking Markings",
      service: "Preformed Thermoplastic",
      location: "Langford, BC",
    },
  ]

  return (
    <section className="w-full py-20 bg-[#F5F3F0]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-[#8B8680] max-w-2xl mx-auto">
            Recent installations across BC. Field-tested, designed to last.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <div className="h-full rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden bg-white">
                {/* Placeholder gradient for image */}
                <div className="h-56 bg-gradient-to-br from-[#8B8680]/30 to-[#E8581A]/20" />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-[#E8581A] font-semibold mb-2">
                    {project.service}
                  </p>
                  <p className="text-sm text-[#8B8680] mb-4">
                    {project.location}
                  </p>
                  <div className="text-[#E8581A] font-semibold text-sm">
                    View Project →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects">
            <button className="text-[#E8581A] font-semibold hover:underline">
              View All Projects →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
