import type { Metadata } from "next"
import Hero from "@/components/sections/Hero"
import { HERO_SLIDES } from "@/lib/hero-slides"
import StatsBar from "@/components/sections/StatsBar"
import AudienceBand from "@/components/sections/AudienceBand"
import EditorialBand from "@/components/sections/EditorialBand"
import ServicesGrid from "@/components/sections/ServicesGrid"
import MaterialsBand from "@/components/sections/MaterialsBand"
import ProjectsPreview from "@/components/sections/ProjectsPreview"
import ApplicationsSection from "@/components/sections/ApplicationsSection"
import DrivewaysBand from "@/components/sections/DrivewaysBand"
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
 * Homepage composition — the character pass, 5 Sept 2026 (Vern: "everything
 * is very white", "the huge useless image", "the free site walk section
 * blends together", "weave the clients in somehow else").
 *
 *   Hero                        full-bleed photograph — the one breath
 *   Stats                       warm, tight band, hairline top + bottom
 *   Audience band               white, three persona cards (hierarchy order)
 *   Statement                   SLATE — one display line + the client index
 *   01 Services       #services white, dense cards
 *   02 Materials board          stone, hairline top + bottom — patterns drawn,
 *                               colours by name (replaces the field panorama)
 *   03 Selected work  #work     white, hairline top
 *   04 Applications             warm, photo contents-rows, hairline top + bottom
 *   05 Driveways band           white — the residential line + the orange
 *                               offer card (the old site-walk bar folded in)
 *   06 Field notes    #journal  warm, hairline top
 *   07 Follow the work #follow  white, hairline top — the social strip
 *   Site Close                  slate — rendered once by app/layout.tsx (Footer)
 *
 * Rhythm: white → paper → white → SLATE → white → stone → white → paper →
 * white → paper → white → slate. Two dark bands on the page, never adjacent;
 * one orange block (the offer card). The client names live in the statement
 * band and on /about (lib/clients.ts) — the trust strip is retired.
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

      <MaterialsBand />

      <ProjectsPreview />

      <ApplicationsSection />

      <DrivewaysBand />

      <BlogFeed />

      <FollowTheWork settings={settings} tiles={tiles} />
    </main>
  )
}
