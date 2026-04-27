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
    title: `${post.title} | Square One Paving`,
    description: post.description,
    alternates: {
      canonical: `https://squareonepaving.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : ["Square One Paving"],
      images: post.featured_image
        ? [{ url: post.featured_image, width: 1200, height: 630, alt: post.title }]
        : [],
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

function estimateReadTime(content: string) {
  const words = content?.split(/\s+/).length ?? 0
  return Math.max(2, Math.ceil(words / 200))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.featured_image ?? "",
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author ?? "Square One Paving",
    },
    publisher: {
      "@type": "Organization",
      name: "Square One Paving",
      url: "https://squareonepaving.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://squareonepaving.com/blog/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ background: "#F6F4F0" }}>

        {/* ── Hero image ────────────────────────────────────────────────────── */}
        {post.featured_image && (
          <div className="relative w-full overflow-hidden" style={{ height: "clamp(280px, 55vh, 580px)" }}>
            <div
              className="absolute left-6 lg:left-10 top-0 w-16 h-[3px] z-10"
              style={{ background: "linear-gradient(to right, #C8601A, #E8895A)" }}
            />
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(17,17,17,0.82) 0%, rgba(17,17,17,0.25) 55%, transparent 100%)" }}
            />
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-10" style={{ maxWidth: "960px" }}>
              {post.category && (
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-px" style={{ background: "#E8895A" }} />
                  <p
                    className="font-semibold uppercase"
                    style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#E8895A" }}
                  >
                    {post.category}
                  </p>
                </div>
              )}
              <h1
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3.25rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.045em",
                  color: "white",
                  lineHeight: 0.95,
                  maxWidth: "800px",
                }}
              >
                {post.title}
              </h1>
            </div>
          </div>
        )}

        {/* ── Article body ────────────────────────────────────────────────── */}
        <div className="max-w-[720px] mx-auto px-6 sm:px-8 py-12">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: "#767676" }}>
            <Link href="/" className="hover:text-[#C8601A] transition-colors">Home</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-[#C8601A] transition-colors">Blog</Link>
            <span>›</span>
            <span style={{ color: "#2C2C2C" }}>{post.title}</span>
          </nav>

          {/* Meta strip */}
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 pb-8"
            style={{ borderBottom: "1px solid #E2DDD8" }}
          >
            {post.author && (
              <span className="text-sm font-medium" style={{ color: "#2C2C2C" }}>
                {post.author}
              </span>
            )}
            <span className="text-sm" style={{ color: "#767676" }}>
              {formatDate(post.date)}
            </span>
            {post.content && (
              <span className="text-sm" style={{ color: "#767676" }}>
                {estimateReadTime(post.content)} min read
              </span>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 ml-auto">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 font-medium rounded"
                    style={{ background: "white", color: "#5A5A5A", border: "1px solid #E2DDD8" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* MDX prose */}
          <div
            className="prose max-w-none"
            style={{
              "--tw-prose-body": "#2C2C2C",
              "--tw-prose-headings": "#111111",
              "--tw-prose-links": "#C8601A",
              "--tw-prose-bold": "#111111",
              "--tw-prose-counters": "#5A5A5A",
              "--tw-prose-bullets": "#C8601A",
              "--tw-prose-hr": "#E2DDD8",
              "--tw-prose-quotes": "#111111",
              "--tw-prose-quote-borders": "#C8601A",
              "--tw-prose-captions": "#767676",
              "--tw-prose-code": "#111111",
              "--tw-prose-pre-code": "#F6F4F0",
              "--tw-prose-pre-bg": "#1C2026",
              fontSize: "1.1rem",
              lineHeight: "1.8",
            } as React.CSSProperties}
          >
            <MDXRemote source={post.content} />
          </div>

          {/* Mid-article CTA */}
          <div
            className="my-14 p-8"
            style={{ background: "white", borderLeft: "3px solid #C8601A" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px" style={{ background: "#C8601A" }} />
              <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}>Working on a similar project?</p>
            </div>
            <p className="text-base mb-5" style={{ color: "#5A5A5A" }}>
              We serve the Lower Mainland and Vancouver Island. Free site visit, written quote within 48 hours.
            </p>
            <Link href="/contact">
              <span
                className="inline-block px-7 py-3 text-sm font-bold text-white uppercase tracking-[0.08em] transition-all hover:brightness-110 rounded-lg"
                style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
              >
                Request a Quote →
              </span>
            </Link>
          </div>

          {/* Footer nav */}
          <div
            className="flex items-center justify-between pt-8"
            style={{ borderTop: "1px solid #E2DDD8" }}
          >
            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-[#C8601A]" style={{ color: "#5A5A5A" }}>
              ← Back to Blog
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider" style={{ color: "#767676" }}>Share</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://squareonepaving.com/blog/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold transition-colors hover:text-[#C8601A]"
                style={{ color: "#5A5A5A" }}
              >
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://squareonepaving.com/blog/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold transition-colors hover:text-[#C8601A]"
                style={{ color: "#5A5A5A" }}
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
