import type { Metadata } from "next"
import Hero from "@/components/sections/Hero"
import StatsBar from "@/components/sections/StatsBar"
import ServicesGrid from "@/components/sections/ServicesGrid"
import ProjectsPreview from "@/components/sections/ProjectsPreview"
import ApplicationsSection from "@/components/sections/ApplicationsSection"
import TrustStrip from "@/components/sections/TrustStrip"
import BlogFeed from "@/components/sections/BlogFeed"

export const metadata: Metadata = {
  title: "Decorative Pavement BC | Stamped Asphalt & Coatings | Square One Paving",
  description:
    "BC's most experienced decorative pavement applicators since 2000 — stamped asphalt, StreetPrint, StreetBond, MMAX, and vapour blasting. Metro Vancouver, Fraser Valley, and Vancouver Island.",
  keywords: [
    "decorative pavement BC",
    "decorative paving Vancouver",
    "decorative paving Victoria",
    "stamped asphalt BC",
    "StreetPrint Vancouver",
    "StreetBond BC",
    "MMAX pavement coating",
    "decorative driveway Vancouver",
    "pavement applicator BC",
    "decorative paving Lower Mainland",
  ],
  alternates: { canonical: "https://squareonepaving.ca" },
  openGraph: {
    title: "Decorative Pavement BC | Stamped Asphalt & Coatings | Square One Paving",
    description:
      "BC's most experienced decorative pavement applicators since 2000 — stamped asphalt, StreetPrint, StreetBond, MMAX, and vapour blasting.",
    images: [
      { url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Square One Paving — BC Decorative Pavement Specialists" },
    ],
  },
}

/**
 * Homepage composition — docs/design-v2/Square One Homepage.dc.html
 *
 *   01 Hero                     white
 *   02 Stats                    warm, hairline top + bottom
 *   03 Services       #services white
 *   04 Selected work  #work     white, hairline top
 *   05 Applications             warm, hairline top + bottom
 *   06 Trust strip + pull quote white
 *   07 Field notes    #journal  warm, hairline top
 *   08 Site Close               slate — rendered once by app/layout.tsx (Footer)
 *
 * Section 08 is the page's ONLY dark region. Nothing above it may go slate.
 *
 * ServicesGrid and ProjectsPreview carry #services / #work on their own
 * <section>. BlogFeedGrid does not carry #journal, so the anchor lives here;
 * its scroll-margin clears the 72px sticky nav bar.
 */
export default function Home() {
  return (
    <main>
      <Hero />

      <StatsBar />

      <ServicesGrid />

      <ProjectsPreview />

      <ApplicationsSection />

      <TrustStrip />

      <BlogFeed />
    </main>
  )
}
