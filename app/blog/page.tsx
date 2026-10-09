import type { Metadata } from "next"
import IndexImageHero from "@/components/IndexImageHero"
import OpenerTitle from "@/components/ui/OpenerTitle"
import { getPageOpener } from "@/lib/page-content"
import { getPosts } from "@/lib/blog"
import BlogFilterClient from "@/components/blog/BlogFilterClient"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

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

export const metadata: Metadata = {
  // One separator: the root template adds " | Square One Paving" (59 chars all in).
  title: "Blog: Guides & Project Stories from BC",
  description:
    clampDescription("Project stories and practical guides from Square One Paving: stamped asphalt, StreetBond coatings, thermoplastic and vapour blasting across BC since 2000."),
  keywords: [
    "decorative pavement blog BC",
    "StreetPrint project BC",
    "stamped asphalt guide Vancouver",
    "stamped asphalt vs concrete driveway BC",
    "driveway paving tips BC",
    "decorative crosswalk projects BC",
    "decorative coatings guide",
  ],
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Blog: Guides & Project Stories from BC | Square One Paving",
    description:
      clampDescription("Project stories and practical guides from Square One Paving: decorative pavement across BC since 2000."),
    images: [{ url: "/images/og-image.png", width: 1200, height: 600, alt: "Square One Paving" }],
  },
}

export default async function BlogPage() {
  // The opener, with whatever the Studio says on top (lib/page-content.ts, 9 Oct 2026).
  const o = await getPageOpener("/blog")
  const posts = await getPosts()

  return (
    <main className="bg-[color:var(--surface)]">
      {/* ---- Header — full-bleed image band (Rockstar Part 4) ---- */}
      <IndexImageHero
        src={o.src}
        alt={o.alt}
        eyebrow="Blog"
        title={<OpenerTitle head={o.head} tail={o.tail} />}
        fit={o.fit}
        lede={o.lede}
        caption={o.caption}
        imagePosition={o.position}
      />

      {/* ---- Category filter + posts (client component, data wiring unchanged) ---- */}
      <section
        aria-labelledby="journal-heading"
        className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface-warm)]"
      >
        <h2 id="journal-heading" className="sr-only">
          All posts
        </h2>

        <div className="container-1280">
          <BlogFilterClient posts={posts} />
        </div>
      </section>
    </main>
  )
}
