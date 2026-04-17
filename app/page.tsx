import Hero from "@/components/sections/Hero"
import ServicesGrid from "@/components/sections/ServicesGrid"
import StatsBar from "@/components/sections/StatsBar"
import ProjectsPreview from "@/components/sections/ProjectsPreview"
import VaporBlastingBand from "@/components/sections/VaporBlastingBand"
import DrivewaysBand from "@/components/sections/DrivewaysBand"
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
      <VaporBlastingBand />
      <DrivewaysBand />
      <Testimonials />
      <BlogFeed />
      <CTASection />
    </main>
  )
}
