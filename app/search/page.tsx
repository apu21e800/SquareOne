import { Suspense } from "react"
import type { Metadata } from "next"
import SearchPageClient from "@/components/SearchPageClient"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Search",
  description:
    clampDescription("Search Square One Paving: products, services, applications, projects, the blog and the full specifications library."),
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/search` },
}

/**
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the label as the small
 * serif line, the h1 in Futura sentence case with no full stop.
 */
export default function SearchPage() {
  return (
    <main className="bg-[color:var(--surface)]">
      <section className="section pt-24 max-[700px]:pt-[84px]">
        <div className="container-1280">
          <span className="label">Search</span>

          <h1 className="mt-4 max-w-[20ch]">Find it <em>fast</em></h1>

          <div className="mt-10 max-w-[840px]">
            <Suspense fallback={null}>
              <SearchPageClient />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}
