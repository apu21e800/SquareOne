import Link from "next/link"

export default function CTASection() {
  return (
    <section className="w-full py-20 bg-[#F5F3F0]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-6">
          Ready to build something that lasts?
        </h2>
        <p className="text-lg text-[#8B8680] mb-10">
          Get a free consultation for your next BC surface project.
        </p>
        <Link href="/contact">
          <button className="bg-[#E8581A] hover:bg-[#d44f16] text-white px-10 py-4 rounded-lg font-semibold text-lg transition">
            Request a Quote
          </button>
        </Link>
      </div>
    </section>
  )
}
