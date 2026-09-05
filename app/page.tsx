import type { Metadata } from "next"
import Hero from "@/components/sections/Hero"
import { HERO_SLIDES } from "@/lib/hero-slides"
import StatsBar from "@/components/sections/StatsBar"
import AudienceBand from "@/components/sections/AudienceBand"
import EditorialBand from "@/components/sections/EditorialBand"
import ServicesGrid from "@/components/sections/ServicesGrid"
import FieldPanorama from "@/components/sections/FieldPanorama"
import ProjectsPreview from "@/components/sections/ProjectsPreview"
import ApplicationsSection from "@/components/sections/ApplicationsSection"
import DrivewaysBand from "@/components/sections/DrivewaysBand"
import TrustStrip from "@/components/sections/TrustStrip"
import SiteWalkBar from "@/components/sections/SiteWalkBar"
import BlogFeed from "@/components/sections/BlogFeed"
import FollowTheWork from "@/components/sections/FollowTheWork"
import { getSiteSettings, getSlots, getSocialPosts, slotImage, slotText } from "@/lib/cms"

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
 *   02b Audience band           white, three persona cards (hierarchy order)
 *   03 Editorial statement      warm, one display line, generous air
 *   04 Services       #services white, dense cards
 *   05 Field panorama           full-bleed photograph (breath 2 of 2)
 *   06 Selected work  #work     white, hairline top
 *   07 Applications             warm, contents-rows, hairline top + bottom
 *   07b Driveways band          white, photo + copy — the residential line
 *   08 Trust strip (real client names only)  white
 *   08b Site-walk bar           white, hairline top — slim conversion band
 *   09 Field notes    #journal  warm, hairline top
 *   09b Follow the work #follow white, hairline top — the social strip
 *   10 Site Close               slate — rendered once by app/layout.tsx (Footer)
 *
 * Two full-bleed breaths per page, never more. Section 10 is the page's
 * ONLY dark region. Nothing above it may go slate.
 *
 * ServicesGrid and ProjectsPreview carry #services / #work on their own
 * <section>. BlogFeedGrid does not carry #journal, so the anchor lives here;
 * its scroll-margin clears the 72px sticky nav bar.
 */
export default async function Home() {
  // CMS overlays (lib/cms.ts): every reader falls back to the built-in copy
  // and photography, so the page renders the same with no Sanity project.
  const [settings, tiles, slots] = await Promise.all([getSiteSettings(), getSocialPosts(6), getSlots()])
  const slides = HERO_SLIDES.map((slide, i) => {
    const key = `home.hero.${i + 1}`
    const img = slotImage(slots, key, { src: slide.src, alt: slide.alt })
    return img.src === slide.src ? slide : { ...slide, src: img.src, alt: img.alt, caption: img.caption }
  })
  const eyebrow = slotText(slots, "home.hero.eyebrow", "")
  const title = slotText(slots, "home.hero.title", "")

  return (
    <main>
      <Hero slides={slides} eyebrow={eyebrow || undefined} title={title || undefined} />

      <StatsBar />

      <AudienceBand />

      <EditorialBand statement={slotText(slots, "home.statement", "Twenty-five years on BC ground")} />

      <ServicesGrid />

      <FieldPanorama />

      <ProjectsPreview />

      <ApplicationsSection />

      <DrivewaysBand />

      <TrustStrip />

      <SiteWalkBar />

      <BlogFeed />

      <FollowTheWork settings={settings} tiles={tiles} />
    </main>
  )
}
