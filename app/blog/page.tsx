import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog | Square One Paving",
  description:
    "Insights, project stories, and practical guides from BC's trusted decorative pavement applicator.",
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="bg-[#FAFAFA]">

      {/* Header */}
      <section className="bg-white border-b border-[#E8E4DE] pt-28 pb-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">
            From the Field
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-[#333333] mb-5 max-w-2xl leading-tight">
            Square One Blog
          </h1>
          <p className="text-lg text-[#626262] max-w-xl leading-relaxed">
            Project guides, product insights, and real talk about decorative paving in BC.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-[#626262]">No posts yet — check back soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl border border-[#E8E4DE] hover:border-[#D66620]/40 hover:shadow-xl transition-all overflow-hidden"
                >
                  {post.featured_image && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#F2EFE9]">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-7">
                    {post.category && (
                      <p className="text-[#D66620] text-xs uppercase tracking-[0.18em] font-semibold mb-2">
                        {post.category}
                      </p>
                    )}
                    <h2 className="text-lg font-black text-[#333333] leading-snug mb-3 group-hover:text-[#D66620] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[#626262] text-sm leading-relaxed mb-5 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8B8680] text-xs">{formatDate(post.date)}</span>
                      <span className="text-[#D66620] text-xs font-bold uppercase tracking-widest group-hover:tracking-[0.2em] transition-all duration-200">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 sm:px-8 bg-[#32373C]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F0A04B] text-xs uppercase tracking-[0.22em] font-semibold mb-5">
            Ready to Start a Project?
          </p>
          <h2 className="text-4xl font-black text-white mb-6">
            Get a Free Consultation
          </h2>
          <p className="text-white/60 text-lg mb-10">
            We serve the Lower Mainland and Vancouver Island. Free site visits, no pressure quotes.
          </p>
          <Link href="/contact">
            <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
              Contact Us
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
