import Hero from "@/components/sections/Hero"
import StatsBar from "@/components/sections/StatsBar"
import ServicesGrid from "@/components/sections/ServicesGrid"
import ProjectsPreview from "@/components/sections/ProjectsPreview"
import ApplicationsSection from "@/components/sections/ApplicationsSection"
import VaporBlastingBand from "@/components/sections/VaporBlastingBand"
import DrivewayCTA from "@/components/sections/DrivewayCTA"
import TrustStrip from "@/components/sections/TrustStrip"
import CTASection from "@/components/sections/CTASection"

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <ProjectsPreview />
      <ApplicationsSection />
      <VaporBlastingBand />
      <DrivewayCTA />
      <TrustStrip />
      <CTASection />
    </main>
  )
}
