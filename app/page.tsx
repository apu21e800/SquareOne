import Hero from "@/components/sections/Hero"
import StatsBar from "@/components/sections/StatsBar"
import ServicesGrid from "@/components/sections/ServicesGrid"
import WhySquareOne from "@/components/sections/WhySquareOne"
import ProjectsPreview from "@/components/sections/ProjectsPreview"
import DrivewaysBand from "@/components/sections/DrivewaysBand"
import Testimonials from "@/components/sections/Testimonials"
import VaporBlastingBand from "@/components/sections/VaporBlastingBand"
import BlogFeed from "@/components/sections/BlogFeed"
import CTASection from "@/components/sections/CTASection"

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <WhySquareOne />
      <ProjectsPreview />
      <DrivewaysBand />
      <Testimonials />
      <VaporBlastingBand />
      <BlogFeed />
      <CTASection />
    </main>
  )
}
