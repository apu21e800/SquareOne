import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPostBySlug } from "@/lib/blog"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.featured_image ? [{ url: post.featured_image }] : [],
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  return (
    <main className="bg-[#FAFAFA]">

      {/* Hero image */}
      {post.featured_image && (
        <div className="relative w-full h-[55vh] min-h-[380px] overflow-hidden">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-8 pb-12 max-w-4xl mx-auto w-full">
            {post.category && (
              <p className="text-[#F0A04B] text-xs uppercase tracking-[0.22em] font-semibold mb-3">
                {post.category}
              </p>
            )}
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight max-w-3xl">
              {post.title}
            </h1>
          </div>
        </div>
      )}

      {/* Article */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-14">

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-[#E8E4DE]">
          <span className="text-[#8B8680] text-sm">{formatDate(post.date)}</span>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[#F2EFE9] text-[#626262] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* MDX content */}
        <div className="prose prose-neutral max-w-none prose-headings:font-black prose-headings:text-[#333333] prose-p:text-[#444444] prose-p:leading-relaxed prose-a:text-[#D66620] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#333333] prose-li:text-[#444444] prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3">
          <MDXRemote source={post.content} />
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-10 border-t border-[#E8E4DE]">
          <div className="bg-[#F2EFE9] rounded-2xl p-8 sm:p-10">
            <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">
              Ready to Get Started?
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-[#333333] mb-4">
              Book a Free Site Consultation
            </h3>
            <p className="text-[#626262] mb-7 leading-relaxed">
              We&apos;ll come to your property, assess your surface, and walk you through the best options — no pressure, no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact">
                <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-8 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                  Request a Quote
                </span>
              </Link>
              <a href="tel:6043098212">
                <span className="inline-block border border-[#D66620]/40 text-[#D66620] hover:bg-[#D66620]/5 px-8 py-3.5 rounded-lg font-semibold text-sm transition-colors">
                  604-309-8212
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link href="/blog" className="text-[#8B8680] text-sm hover:text-[#D66620] transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </main>
  )
}
