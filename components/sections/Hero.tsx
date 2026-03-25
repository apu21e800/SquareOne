import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#F5F3F0] to-[#FFFFFF]">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D2D2D] leading-tight mb-6">
          BC's Most Trusted Decorative Pavement Applicators
        </h1>
        <p className="text-lg sm:text-xl text-[#8B8680] mb-10 max-w-2xl mx-auto">
          Stamped asphalt, coloured coatings, thermoplastic markings, and vapor
          blasting — installed right, backed by 25 years of BC experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <button className="bg-[#E8581A] hover:bg-[#d44f16] text-white px-8 py-4 rounded-lg font-semibold transition w-full sm:w-auto">
              Get a Quote
            </button>
          </Link>
          <Link href="/projects">
            <button className="border-2 border-[#E8581A] text-[#E8581A] hover:bg-[#E8581A]/10 px-8 py-4 rounded-lg font-semibold transition w-full sm:w-auto">
              See Our Work
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
