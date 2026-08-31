import { Suspense } from "react"
import type { Metadata } from "next"
import SearchPageClient from "@/components/SearchPageClient"

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Square One Paving — products, services, applications, projects, the blog and the full specifications library.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://squareonepaving.ca/search" },
}

export default function SearchPage() {
  return (
    <main className="bg-[color:var(--surface)]">
      <section className="section pt-24 max-[700px]:pt-[84px]">
        <div className="container-1280">
          <div className="eyebrow">Search</div>

          <h1 className="stop mt-6 max-w-[20ch]">Find it fast</h1>

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
