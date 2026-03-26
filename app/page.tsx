import Hero from "@/components/sections/Hero"
import StatsBar from "@/components/sections/StatsBar"
import ProductsGrid from "@/components/sections/ProductsGrid"
import VaporBlastingBand from "@/components/sections/VaporBlastingBand"
import DrivewayCTA from "@/components/sections/DrivewayCTA"
import ProjectsPreview from "@/components/sections/ProjectsPreview"
import TrustStrip from "@/components/sections/TrustStrip"
import CTASection from "@/components/sections/CTASection"

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <ProductsGrid />
      <VaporBlastingBand />
      <DrivewayCTA />
      <ProjectsPreview />
      <TrustStrip />
      <CTASection />
    </main>
  )
}
