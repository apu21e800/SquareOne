import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import type { CSSProperties } from "react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPost, getPosts } from "@/lib/blog"
import type { AnyPost, BlogPostMeta } from "@/lib/blog"
import PortableBody from "@/components/blog/PortableBody"
import Frame from "@/components/ui/Frame"
import { Row } from "@/components/ui/Container"
import { SITE_URL } from "@/lib/site"
import JsonLd from "@/components/JsonLd"
import { fitVars } from "@/lib/type"
import { clampDescription, pageTitle } from "@/lib/seo"

/**
 * A post — 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the article
 * column keeps its skeleton and its `prose` body; the header and meta are
 * in the new voice (the category as the small serif line, no full stop,
 * the byline in the serif), the lede photograph carries its caption UNDER
 * it, the tags are words, the two related posts are hairline rows, and
 * every link is an underlined word — no arrows, no orange on hover.
 */

interface Props {
  params: Promise<{ slug: string }>
}

/**
 * ISR: the blog is the one CMS-backed surface (lib/blog merges content/blog
 * MDX with Sanity posts when the CMS is enabled). Revalidate hourly at most;
 * a Sanity webhook to /api/revalidate refreshes on publish, and sanityFetch
 * caps CMS reads at 60s when the CMS is live. Do NOT copy this to the home,
 * gallery or product pages: they read public/images at build time through
 * lib/work and lib/gallery, and public/ is excluded from the serverless
 * bundle (next.config.ts) — regenerating them at runtime would fail.
 */
export const revalidate = 3600

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  // The H1 keeps the post's full title; the <title> fits the 60 characters
  // a result shows (lib/seo.ts pageTitle), and "| Blog" keeps a post's tag
  // distinct from the project page of the same job.
  return {
    title: { absolute: pageTitle(post.title, "Blog") },
    description: clampDescription(post.description),
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: clampDescription(post.description),
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : ["Square One Paving"],
      images: post.featured_image
        ? [{ url: post.featured_image, width: 1200, height: 630, alt: post.title }]
        : [{ url: "/images/og-image.png", width: 1200, height: 600, alt: "Square One Paving" }],
    },
  }
}

function formatDate(dateStr: string) {
  // Front-matter dates are plain "YYYY-MM-DD" strings, which parse as UTC
  // midnight; formatting in UTC keeps the day the author wrote.
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

function estimateReadTime(words: number) {
  return Math.max(2, Math.ceil(words / 200))
}

function wordCount(post: AnyPost): number {
  return "body" in post ? post.words : (post.content?.split(/\s+/).length ?? 0)
}

/**
 * Photo caption — the reference reads "Richmond · TrafficPatternsXD · 2019".
 * Frontmatter carries category and date, so the caption is category + year.
 * Returns "" when there is nothing honest to say, and then no caption line
 * renders under the frame.
 */
function captionFor(post: Pick<BlogPostMeta, "category" | "date">): string {
  const year = post.date ? new Date(post.date).getFullYear() : Number.NaN
  return [post.category, Number.isFinite(year) ? String(year) : ""]
    .filter(Boolean)
    .join(" · ")
}

/** Same category scores highest, then shared tags, then recency. */
function relatedPosts(current: AnyPost, all: BlogPostMeta[], limit = 2): BlogPostMeta[] {
  const currentTags = new Set((current.tags ?? []).map((tag) => tag.toLowerCase()))
  const currentCategory = current.category?.toLowerCase() ?? ""

  return all
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
  // Links — ink, underlined; the underline darkens on hover. No orange.
  "prose-a:font-medium prose-a:underline prose-a:underline-offset-[3px]",
  "prose-a:decoration-[color:var(--hairline-strong)]",
  "[&_a:hover]:text-[color:var(--ink)]",
  "[&_a:hover]:decoration-[color:var(--ink)]",
  // Pull quote — 2px ink rule, no italics, no smart quotes
  "prose-blockquote:my-12 prose-blockquote:border-l-2 prose-blockquote:pl-7",
  "prose-blockquote:not-italic prose-blockquote:font-medium",
  "[&_blockquote_p]:text-[23px] [&_blockquote_p]:leading-[1.5]",
  "[&_blockquote_p]:tracking-[-0.01em] [&_blockquote_p]:text-[color:var(--ink)]",
  "[&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none",
  // Everything else — square corners, captions in the small serif
  "prose-img:rounded-none prose-figcaption:text-[14px] prose-figcaption:italic",
  "prose-hr:border-[color:var(--hairline)] prose-hr:my-14",
  "prose-code:font-normal prose-pre:rounded-none",
  "prose-th:border-[color:var(--hairline)] prose-td:border-[color:var(--hairline)]",
].join(" ")

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const related = relatedPosts(post, await getPosts())
  const heroCaption = captionFor(post)
  const shareUrl = `${SITE_URL}/blog/${slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.featured_image ?? "",
    datePublished: post.date,
    dateModified: post.date,
    // A named author is a Person; the company byline is the Organization.
    author:
      post.author && post.author !== "Square One Paving"
        ? { "@type": "Person", name: post.author }
        : { "@type": "Organization", name: "Square One Paving", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Square One Paving",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  }

  return (
    <>
      {/* Through JsonLd, escaped: the headline and summary come from the
          Studio (security sweep, 9 Oct 2026). */}
      <JsonLd data={jsonLd} />

      <main className="bg-[color:var(--surface)]">
        <article
          className="
            mx-auto w-full max-w-[calc(68ch_+_80px)] px-10 pt-24 pb-28 text-[17px]
            max-[700px]:px-6 max-[700px]:pt-[88px] max-[700px]:pb-16
          "
        >
          {/* ── Breadcrumb ──────── */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[15px] italic text-ink-muted"
          >
            <Link href="/" className="link">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="link">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{post.title}</span>
          </nav>

          {/* ── Title block ──────── */}
          {post.category && <span className="label label-sq label-page mt-8">{post.category}</span>}

          <div className={`fit-host ${post.category ? "mt-3" : "mt-8"}`}>
            <h1
              className="display-fit headline-sentence [text-wrap:balance]"
              style={fitVars(post.title, { max: "3.25rem", sentence: true })}
            >
              {post.title}
            </h1>
          </div>

          <p className="mt-4 text-[15px] italic text-ink-muted">
            By {post.author || "Square One Paving"}
            {post.date && <> &middot; {formatDate(post.date)}</>}
            {wordCount(post) > 0 && <> &middot; {estimateReadTime(wordCount(post))} min read</>}
          </p>

          {/* ── Lede photograph — the caption under it ──────── */}
          {post.featured_image && (
            <Frame
              className="mt-12"
              src={post.featured_image}
              alt={post.title}
              caption={heroCaption || undefined}
              aspect="aspect-[16/9]"
              sizes="(max-width: 700px) 100vw, 640px"
              priority
            />
          )}

          {/* ── Article body ──────── */}
          <div className={`mt-12 ${proseClass}`} style={proseTokens}>
            {"body" in post ? <PortableBody value={post.body} /> : <MDXRemote source={post.content} />}
          </div>

          {/* ── Quiet conversion panel — a hairline block, the one button ──────── */}
          <aside className="mt-16 border-t border-hairline pt-6">
            <span className="label">Planning something similar?</span>
            <p className="mt-3 max-w-[60ch] text-ink-body [text-wrap:pretty]">
              Square One installs across the Lower Mainland and Vancouver Island. Free site
              visit, written quote. More of the work is in the{" "}
              <Link href="/projects" className="link">
                projects
              </Link>{" "}
              and the{" "}
              <Link href="/galleries" className="link">
                galleries
              </Link>
              ; the systems are under{" "}
              <Link href="/services" className="link">
                services
              </Link>
              .
            </p>
            <div className="mt-7">
              <Link href="/contact" className="btn-primary">
                Get a quote
              </Link>
            </div>
          </aside>

          {/* ── Filed under — the tags as words ──────── */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-14 border-t border-hairline pt-7">
              <span className="label">Filed under</span>
              <p className="mt-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </p>
            </div>
          )}

          {/* ── Related posts — hairline rows ──────── */}
          {related.length > 0 && (
            <section className="mt-14">
              <h2>Related posts</h2>

              <ul className="mt-6">
                {related.map((entry) => (
                  <RelatedNote key={entry.slug} post={entry} />
                ))}
              </ul>
            </section>
          )}

          {/* ── Foot of article ──────── */}
          <div className="mt-14 flex flex-wrap items-baseline justify-between gap-5 border-t border-hairline pt-7">
            <Link href="/blog" className="link">
              Back to the blog
            </Link>

            <div className="flex items-baseline gap-5">
              <span className="label">Share</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
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

/* ── Related post — a compact hairline row: the frame, the title, one line ──────── */

function RelatedNote({ post }: { post: BlogPostMeta }) {
  return (
    <Row as="li" compact className="relative">
      <Link href={`/blog/${post.slug}`} aria-label={post.title} className="absolute inset-0 z-[2]" />
      <Frame src={post.featured_image || undefined} alt="" aspect="aspect-[3/2]" sizes="132px" />
      <div className="min-w-0">
        <h3 className="[text-wrap:pretty]">{post.title}</h3>
        <p className="mt-2 text-[15px] italic text-ink-muted">
          {post.category ? `${post.category} · ` : ""}
          {post.date ? formatDate(post.date) : ""}
        </p>
      </div>
    </Row>
  )
}
