import Hero from "@/components/sections/Hero"
import StatsBar from "@/components/sections/StatsBar"
import WhySquareOne from "@/components/sections/WhySquareOne"
import ServicesGrid from "@/components/sections/ServicesGrid"
import ProjectsPreview from "@/components/sections/ProjectsPreview"
import DrivewaysBand from "@/components/sections/DrivewaysBand"
import BlogFeed from "@/components/sections/BlogFeed"
import CTASection from "@/components/sections/CTASection"

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <WhySquareOne />
      <ServicesGrid />
      <ProjectsPreview />
      <DrivewaysBand />
      <BlogFeed />
      <CTASection />
    </main>
  )
}
