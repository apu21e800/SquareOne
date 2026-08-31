import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import type { CSSProperties } from "react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import type { BlogPost, BlogPostMeta } from "@/lib/blog"

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
    alternates: {
      canonical: `https://squareonepaving.ca/blog/${slug}`,
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

/**
 * Photo caption — the reference reads "Richmond · TrafficPatternsXD · 2019".
 * Frontmatter carries category and date, so the caption is category + year.
 * Returns "" when there is nothing honest to say, in which case the scrim is
 * dropped too: .scrim exists for caption legibility, never for decoration.
 */
function captionFor(post: Pick<BlogPostMeta, "category" | "date">): string {
  const year = post.date ? new Date(post.date).getFullYear() : Number.NaN
  return [post.category, Number.isFinite(year) ? String(year) : ""]
    .filter(Boolean)
    .join(" · ")
}

/** Same category scores highest, then shared tags, then recency. */
function relatedPosts(current: BlogPost, limit = 2): BlogPostMeta[] {
  const currentTags = new Set((current.tags ?? []).map((tag) => tag.toLowerCase()))
  const currentCategory = current.category?.toLowerCase() ?? ""

  return getAllPosts()
    .filter((post) => post.slug !== current.slug)
    .map((post) => {
      let score = 0
      if (currentCategory && post.category?.toLowerCase() === currentCategory) score += 3
      for (const tag of post.tags ?? []) {
        if (currentTags.has(tag.toLowerCase())) score += 1
      }
      return { post, score }
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    )
    .slice(0, limit)
    .map((entry) => entry.post)
}

/**
 * Prose colours come from v2 tokens. The typography plugin owns the element
 * selectors, so the type scale has to be restated inside `prose-*` modifiers
 * below — it is the one place the base layer cannot reach.
 */
type CSSVars = CSSProperties & Record<string, string>

const proseTokens: CSSVars = {
  "--tw-prose-body": "var(--ink-body)",
  "--tw-prose-headings": "var(--ink)",
  "--tw-prose-lead": "var(--ink-body)",
  "--tw-prose-links": "var(--ink)",
  "--tw-prose-bold": "var(--ink)",
  "--tw-prose-counters": "var(--ink-muted)",
  "--tw-prose-bullets": "var(--hairline-strong)",
  "--tw-prose-hr": "var(--hairline)",
  "--tw-prose-quotes": "var(--ink)",
  "--tw-prose-quote-borders": "var(--ink)",
  "--tw-prose-captions": "var(--ink-muted)",
  "--tw-prose-code": "var(--ink)",
  "--tw-prose-pre-code": "var(--ink)",
  "--tw-prose-pre-bg": "var(--surface-stone)",
  "--tw-prose-th-borders": "var(--hairline)",
  "--tw-prose-td-borders": "var(--hairline)",
}

const proseClass = [
  "prose max-w-none text-[17px]",
  // Body
  "prose-p:text-[17px] prose-p:leading-[1.75] prose-p:[text-wrap:pretty]",
  "prose-li:text-[17px] prose-li:leading-[1.6] prose-li:my-[6px]",
  "prose-strong:font-semibold",
  // Headings — v2 display scale
  "prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-[clamp(1.75rem,3vw,2.75rem)]",
  "prose-h2:font-semibold prose-h2:tracking-[-0.008em] prose-h2:leading-[1.06]",
  "prose-h3:mt-14 prose-h3:mb-4 prose-h3:text-[1.25rem] prose-h3:font-semibold",
  "prose-h3:tracking-[-0.015em] prose-h3:leading-[1.4]",
  "prose-h4:mt-10 prose-h4:mb-3 prose-h4:text-[1rem] prose-h4:font-semibold",
  "prose-h4:tracking-[-0.01em]",
  // Links — ink at rest, deep orange on hover, so body copy spends no accent
  "prose-a:font-medium prose-a:underline prose-a:underline-offset-[3px]",
  "prose-a:decoration-[color:var(--hairline-strong)]",
  "[&_a:hover]:text-[color:var(--accent-deep)]",
  "[&_a:hover]:decoration-[color:var(--accent-deep)]",
  // Pull quote — 2px ink rule, no italics, no smart quotes
  "prose-blockquote:my-12 prose-blockquote:border-l-2 prose-blockquote:pl-7",
  "prose-blockquote:not-italic prose-blockquote:font-medium",
  "[&_blockquote_p]:text-[23px] [&_blockquote_p]:leading-[1.5]",
  "[&_blockquote_p]:tracking-[-0.01em] [&_blockquote_p]:text-[color:var(--ink)]",
  "[&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none",
  // Everything else
  "prose-img:rounded-[2px] prose-figcaption:text-[13px]",
  "prose-hr:border-[color:var(--hairline)] prose-hr:my-14",
  "prose-code:font-normal prose-pre:rounded-[2px]",
  "prose-th:border-[color:var(--hairline)] prose-td:border-[color:var(--hairline)]",
].join(" ")

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const related = relatedPosts(post)
  const heroCaption = captionFor(post)
  const shareUrl = `https://squareonepaving.ca/blog/${slug}`

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
      url: "https://squareonepaving.ca",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://squareonepaving.ca/blog/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-[color:var(--surface)]">
        <article
          className="
            mx-auto w-full max-w-[calc(68ch_+_80px)] px-10 pt-24 pb-28 text-[17px]
            max-[700px]:px-6 max-[700px]:pt-[88px] max-[700px]:pb-16
          "
        >
          {/* ── Breadcrumb ──────────────────────────────────────── */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[13px] text-[color:var(--ink-muted)]"
          >
            <Link href="/" className="text-[color:var(--ink-muted)] hover:text-[color:var(--accent-deep)]">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="text-[color:var(--ink-muted)] hover:text-[color:var(--accent-deep)]">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[color:var(--ink)]">{post.title}</span>
          </nav>

          {/* ── Title block ───────────────────────────────────── */}
          {post.category && (
            <div className="mt-8">
              <span className="tag">{post.category}</span>
            </div>
          )}

          <h1 className={`stop ${post.category ? "mt-6" : "mt-8"} [text-wrap:balance]`}>
            {post.title}
          </h1>

          <div className="mt-[18px] text-[14px] text-[color:var(--ink-muted)]">
            By {post.author || "Square One Paving"}
            {post.date && <> &middot; {formatDate(post.date)}</>}
            {post.content && <> &middot; {estimateReadTime(post.content)} min read</>}
          </div>

          {/* ── Lede photograph ───────────────────────────────── */}
          {post.featured_image && (
            <figure className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 700px) 100vw, 640px"
                className="object-cover"
              />
              {heroCaption && (
                <>
                  <div aria-hidden="true" className="scrim scrim-light" />
                  <figcaption className="caption">{heroCaption}</figcaption>
                </>
              )}
            </figure>
          )}

          {/* ── Article body ──────────────────────────────────── */}
          <div className={`mt-12 ${proseClass}`} style={proseTokens}>
            <MDXRemote source={post.content} />
          </div>

          {/* ── Quiet conversion panel ──────────────────────────── */}
          <aside className="card-panel mt-16">
            <div className="eyebrow">Planning something similar?</div>
            <p className="mt-4 text-[16px] leading-[1.6] text-[color:var(--ink-body)]">
              We work across the Lower Mainland and Vancouver Island. Free site visit,
              written quote within 48 hours.
            </p>
            <Link href="/contact" className="btn-primary mt-7 self-start">
              Request a quote
            </Link>
          </aside>

          {/* ── Filed under ───────────────────────────────────── */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-14 border-t border-[color:var(--hairline)] pt-7">
              <div className="label">Filed under</div>
              <div className="mt-4 flex flex-wrap gap-[10px]">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[2px] border border-[color:var(--hairline)] px-3 py-[6px] text-[13px] font-medium text-[color:var(--ink-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Related notes ─────────────────────────────────── */}
          {related.length > 0 && (
            <section className="mt-14">
              <h2>Related notes</h2>

              <div className="mt-8 grid grid-cols-2 gap-6 max-[700px]:grid-cols-1 max-[700px]:gap-10">
                {related.map((entry) => (
                  <RelatedNote key={entry.slug} post={entry} />
                ))}
              </div>
            </section>
          )}

          {/* ── Foot of article ───────────────────────────────── */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-[color:var(--hairline)] pt-7">
            <Link href="/blog" className="arrow-link">
              &larr; Back to Blog
            </Link>

            <div className="flex items-center gap-5">
              <span className="label">Share</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-semibold text-[color:var(--ink-muted)] hover:text-[color:var(--accent-deep)]"
              >
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-semibold text-[color:var(--ink-muted)] hover:text-[color:var(--accent-deep)]"
              >
                Facebook
              </a>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}

/* ── Related note card ───────────────────────────────────────────── */

function RelatedNote({ post }: { post: BlogPostMeta }) {
  const caption = captionFor(post)

  return (
    <Link href={`/blog/${post.slug}`} className="card block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
        {post.featured_image && (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            sizes="(max-width: 700px) 100vw, 300px"
            className="object-cover"
          />
        )}
        {post.featured_image && caption && (
          <>
            <div aria-hidden="true" className="scrim scrim-light" />
            <div className="caption">{caption}</div>
          </>
        )}
      </div>

      {post.category && (
        <div className="mt-4">
          <span className="tag">{post.category}</span>
        </div>
      )}

      <h3 className="mt-3 [text-wrap:pretty]">{post.title}</h3>

      {post.date && (
        <div className="mt-2 text-[13px] text-[color:var(--ink-muted)]">
          {formatDate(post.date)}
        </div>
      )}
    </Link>
  )
}
