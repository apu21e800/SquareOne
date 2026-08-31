import type { Metadata } from "next"
import Hero from "@/components/sections/Hero"
import StatsBar from "@/components/sections/StatsBar"
import EditorialBand from "@/components/sections/EditorialBand"
import ServicesGrid from "@/components/sections/ServicesGrid"
import FieldPanorama from "@/components/sections/FieldPanorama"
import ProjectsPreview from "@/components/sections/ProjectsPreview"
import ApplicationsSection from "@/components/sections/ApplicationsSection"
import TrustStrip from "@/components/sections/TrustStrip"
import BlogFeed from "@/components/sections/BlogFeed"

export const metadata: Metadata = {
  title: "Decorative Pavement BC | Stamped Asphalt & Coatings | Square One Paving",
  description:
    "BC's most experienced decorative pavement applicators since 2000 — stamped asphalt, preformed thermoplastic and durable coatings for municipal streets, commercial sites and residential driveways. Metro Vancouver, Fraser Valley, and Vancouver Island.",
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
      "BC's most experienced decorative pavement applicators since 2000 — municipal streets, commercial sites and residential driveways across the Lower Mainland and Vancouver Island.",
    images: [
      { url: "/images/og-image.png", width: 1200, height: 600, alt: "Square One Paving — BC Decorative Pavement Specialists" },
    ],
  },
}

/**
 * Homepage composition — docs/SOUL-PASS.md MOVE 2 (density variance)
 *
 *   01 Hero                     full-bleed photograph (breath 1 of 2)
 *   02 Stats                    warm, TIGHT band, hairline top + bottom
 *   03 Editorial statement      warm, one display line, generous air
 *   04 Services       #services white, dense cards
 *   05 Field panorama           full-bleed photograph (breath 2 of 2)
 *   06 Selected work  #work     white, hairline top
 *   07 Applications             warm, contents-rows, hairline top + bottom
 *   08 Trust strip (real client names only)  white
 *   09 Field notes    #journal  warm, hairline top
 *   10 Site Close               slate — rendered once by app/layout.tsx (Footer)
 *
 * Two full-bleed breaths per page, never more. Section 10 is the page's
 * ONLY dark region. Nothing above it may go slate.
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

      <EditorialBand />

      <ServicesGrid />

      <FieldPanorama />

      <ProjectsPreview />

      <ApplicationsSection />

      <TrustStrip />

      <BlogFeed />
    </main>
  )
}
