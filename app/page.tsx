import Hero from "@/components/sections/Hero"
import ServicesGrid from "@/components/sections/ServicesGrid"
import StatsBar from "@/components/sections/StatsBar"
import ProjectsPreview from "@/components/sections/ProjectsPreview"
import DrivewaysBand from "@/components/sections/DrivewaysBand"
import VaporBlastingBand from "@/components/sections/VaporBlastingBand"
import Testimonials from "@/components/sections/Testimonials"
import BlogFeed from "@/components/sections/BlogFeed"
import CTASection from "@/components/sections/CTASection"

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <StatsBar />
      <ProjectsPreview />
      <DrivewaysBand />
      <VaporBlastingBand />
      <Testimonials />
      <BlogFeed />
      <CTASection />
    </main>
  )
}
