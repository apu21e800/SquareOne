import type { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"
import BlogFilterClient from "@/components/blog/BlogFilterClient"

export const metadata: Metadata = {
  title: "Field Notes | Decorative Pavement Guides & Project Stories | Square One Paving",
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
      {/* ---- Header ---- */}
      <section className="relative overflow-hidden pt-[calc(var(--bar-h)_+_6rem)] pb-16 max-[700px]:pt-[calc(var(--bar-h)_+_3rem)] max-[700px]:pb-10">

        <div className="container-1280 relative z-[1]">
          <div className="eyebrow">Journal</div>

          <h1 className="stop mt-5">Field notes</h1>

          <p className="mt-5 max-w-[56ch] text-[19px] leading-[1.65] text-[color:var(--ink-body)] [text-wrap:pretty] max-[700px]:text-[17px]">
            Notes from the crews and the estimating desk: materials, methods, and what holds
            up on BC pavement.
          </p>
        </div>
      </section>

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
