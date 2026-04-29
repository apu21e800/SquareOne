import type { Metadata } from "next"
import Hero from "@/components/sections/Hero"
import StatsBar from "@/components/sections/StatsBar"
import WhySquareOne from "@/components/sections/WhySquareOne"
import ProcessBand from "@/components/sections/ProcessBand"
import ServicesGrid from "@/components/sections/ServicesGrid"
import ProjectsPreview from "@/components/sections/ProjectsPreview"
import DrivewaysBand from "@/components/sections/DrivewaysBand"
import VaporBlastingBand from "@/components/sections/VaporBlastingBand"
import BlogFeed from "@/components/sections/BlogFeed"
import CTASection from "@/components/sections/CTASection"

export const metadata: Metadata = {
  title: "Decorative Pavement BC | Stamped Asphalt & Coatings | Square One Paving",
  description:
    "BC's most experienced decorative pavement applicators since 2000 — stamped asphalt, StreetPrint, StreetBond, MMAX, and vapor blasting. Metro Vancouver, Fraser Valley, and Vancouver Island.",
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
  alternates: {
    canonical: "https://squareonepaving.ca",
  },
  openGraph: {
    title: "Decorative Pavement BC | Stamped Asphalt & Coatings | Square One Paving",
    description:
      "BC's most experienced decorative pavement applicators since 2000 — stamped asphalt, StreetPrint, StreetBond, MMAX, and vapor blasting. Metro Vancouver, Fraser Valley, and Vancouver Island.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Square One Paving — BC Decorative Pavement Specialists",
      },
    ],
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <WhySquareOne />
      <ProcessBand />
      <ServicesGrid />
      <ProjectsPreview />
      <DrivewaysBand />
      <VaporBlastingBand />
      <BlogFeed />
      <CTASection />
    </main>
  )
}
