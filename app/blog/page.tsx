import type { Metadata } from "next"
import IndexImageHero from "@/components/IndexImageHero"
import { getAllPosts } from "@/lib/blog"
import BlogFilterClient from "@/components/blog/BlogFilterClient"

export const metadata: Metadata = {
  title: "Field Notes | Decorative Pavement Guides & Project Stories",
  description:
    "Project documentation, product deep-dives, and real-world case studies from BC's most experienced decorative pavement crew. StreetPrint, StreetBond, stamped asphalt, vapour blasting — all documented.",
  keywords: [
    "decorative pavement blog BC",
    "StreetPrint project BC",
    "stamped asphalt guide Vancouver",
    "driveway paving tips BC",
    "pavement project case study BC",
    "decorative coatings guide",
  ],
  alternates: {
    canonical: "https://squareonepaving.ca/blog",
  },
  openGraph: {
    title: "Field Notes | Decorative Pavement Guides & Project Stories | Square One Paving",
    description:
      "Project documentation, product deep-dives, and real-world case studies from BC's most experienced decorative pavement crew.",
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="bg-[color:var(--surface)]">
      {/* ---- Header — full-bleed image band (Rockstar Part 4) ---- */}
      <IndexImageHero
        src="/images/hero/bowen-island-polka-dot-walkway-streetbond.jpg"
        alt="Polka-dot StreetBond walkway along a road on Bowen Island"
        eyebrow="Blog"
        title="Field notes"
        lede="Notes from the crews and the estimating desk: materials, methods, and what holds up on BC pavement."
        caption="Bowen Island · StreetBond"
        imagePosition="center 40%"
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
