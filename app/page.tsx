import type { Metadata } from "next"
import Hero from "@/components/sections/Hero"
import { HERO_SLIDES } from "@/lib/hero-slides"
import ProofLine from "@/components/sections/ProofLine"
import HowAJobGoes from "@/components/sections/HowAJobGoes"
import AudienceBand from "@/components/sections/AudienceBand"
import ServicesGrid from "@/components/sections/ServicesGrid"
import MaterialsBand from "@/components/sections/MaterialsBand"
import ProjectsPreview from "@/components/sections/ProjectsPreview"
import DrivewaysBand from "@/components/sections/DrivewaysBand"
import VapourBand from "@/components/sections/VapourBand"
import FollowTheWork from "@/components/sections/FollowTheWork"
import { getSiteSettings, getSlots, getSocialPosts, slotImage, slotText } from "@/lib/cms"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

export const metadata: Metadata = {
  // Absolute (the root template would add the brand twice) and 60 characters
  // even: the two phrases people search, then the province, then the name.
  title: { absolute: "BC Stamped Asphalt & Decorative Pavement | Square One Paving" },
  description:
    clampDescription("Stamped asphalt, coloured coatings and thermoplastic crosswalks for BC cities, developers and homeowners: specified and installed by Square One since 2000."),
  keywords: [
    "decorative pavement BC",
    "stamped asphalt BC",
    "stamped asphalt Vancouver",
    "stamped asphalt Victoria",
    "decorative paving Vancouver",
    "decorative paving Victoria",
    "StreetPrint Vancouver",
    "StreetBond BC",
    "decorative crosswalks BC",
    "decorative driveway Vancouver",
    "decorative paving Lower Mainland",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "BC Stamped Asphalt & Decorative Pavement | Square One Paving",
    description:
      clampDescription("Stamped asphalt, StreetBond coatings and thermoplastic crosswalks for BC cities, developers and homeowners (Lower Mainland and Vancouver Island, since 2000)."),
    images: [
      { url: "/images/og-image.png", width: 1200, height: 600, alt: "Square One Paving, stamped asphalt and decorative pavement installers in BC" },
    ],
  },
}

/**
 * 26 Sept 2026 — the own-company restyle (docs/OWN-COMPANY-BRIEF.md §9).
 * Same bands, same order, one added (How a job goes, after the proof line);
 * every band drawn on the new primitives (components/ui/Container.tsx
 * Section and Row, components/ui/Frame.tsx) and the surface in app/own.css.
 * The reel is exactly as it was.
 *
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

      {/* One quiet line of facts under the hero (19 Sept: the stats band
          read as chunky — Vern). components/sections/StatsBar.tsx stays for
          /about. */}
      <ProofLine />

      {/* 28 Sept 2026 (Vern: "too much text… cut the fat, get straight to
          the point, make the sale"): eight bands where there were eleven,
          each a headline, one line and the pictures. The order is the sale:
          what we do, the work that proves it, how a job goes, who it is
          for, the two offers people come for (driveways, vapour), the
          patterns and colours, the crews on Instagram, then the quote
          (the close band in the footer). "Where the work goes" and the
          blog feed came off the home page; both are one click away in the
          menu. */}
      <ServicesGrid />

      <ProjectsPreview />

      {/* 2 Oct 2026, the client: "a bit overkill info wise, trim some fat".
          The crew photographs under the four steps came off. The
          patterns-and-colours band came off too and came back the same day
          (Vern: "the template and colour palette sections are missing"),
          lower on the page. Eight bands. */}
      <HowAJobGoes tone="paper" crews={false} />

      {/* 2 Oct 2026 (Vern: "a few large grey background sections to break
          things up"): the audience band and the vapour band sit on stone,
          the darker grey; the projects and the close on the lighter one. */}
      <AudienceBand tone="stone" />

      <DrivewaysBand />

      <MaterialsBand />

      <VapourBand />

      <FollowTheWork settings={settings} tiles={tiles} />
    </main>
  )
}
