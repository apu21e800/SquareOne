import Link from "next/link"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"

/* Home — the residential line, after the commercial applications (business
   hierarchy canon: commercial first, driveways second).

   26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §9.9): the two city cards and the
   charcoal offer card were HUB's card grid in another palette. The same
   two regions are now two frames with their captions under them and the
   text beside each; the offer is a plain paragraph with the one button, and
   the manufacturer's service-life line closes the band on a hairline.
   Captions come from lib/work.ts — never guessed. Every figure is the one
   the manufacturer publishes. */

/** The two city pages, featured (Vern, 19 Sept 2026: "feature Vancouver
    and Victoria driveways"). Each is one frame from that region's driveway
    record — the same frame its page opens on — and the communities its
    page names. */
const CITIES: { href: string; name: string; region: string; src: string; alt: string; caption: string; communities: string }[] = [
  {
    href: "/driveways/vancouver",
    name: "Vancouver driveways",
    region: "Metro Vancouver",
    src: "/images/applications/driveways/richmond-brick-driveway-streetprint-01.jpg",
    alt: "A red-brown brick-pattern StreetPrint driveway in front of a stucco bungalow in Richmond, installed by Square One",
    caption: "Richmond · StreetPrint",
    communities: "West Vancouver and Richmond to New Westminster, Surrey, Langley and Maple Ridge",
  },
  {
    href: "/driveways/victoria",
    name: "Victoria driveways",
    region: "Greater Victoria",
    src: "/images/S1_update_v2/photos/Driveways/Ten%20Mile%20Point%20Driveway%20I.jpg",
    alt: "Grey ashlar StreetPrint stamped asphalt driveway with a charcoal border, running up to a stone-and-timber entry at Ten Mile Point, Saanich",
    caption: "Ten Mile Point, Saanich · StreetPrint",
    communities: "Victoria, Saanich, the Peninsula, Sooke and the Cowichan Valley",
  },
]

export default function DrivewaysBand() {
  return (
    <Section
      label="Driveways · Vancouver and Victoria"
      title="The driveway you already have, made to look like stone"
      link={{ href: "/patterns", label: "StreetPrint patterns" }}
      intro="StreetPrint patterns pressed into your existing asphalt and sealed in StreetBond colour: one continuous surface, no joints to heave, nothing for weeds to take hold in. Installed by the same crews that do our municipal work."
      wide
    >
      <div className="grid grid-cols-12 gap-x-10 gap-y-12 max-[900px]:grid-cols-1">
        {CITIES.map((city) => (
          <article key={city.href} className="col-span-4 max-[900px]:col-span-1">
            <Frame
              src={city.src}
              alt={city.alt}
              caption={city.caption}
              aspect="aspect-[4/3]"
              sizes="(max-width: 900px) 100vw, 400px"
              position="center 70%"
              href={city.href}
            />
            <span className="label mt-6">{city.region}</span>
            <h3 className="mt-1">{city.name}</h3>
            <p className="mt-2 max-w-[40ch] text-[16px] leading-[1.55] text-ink-body [text-wrap:pretty]">
              On record from {city.communities}.
            </p>
            <p className="mt-4">
              <Link href={city.href} className="link">
                Driveways in {city.region}
              </Link>
            </p>
          </article>
        ))}

        {/* The offer, as a paragraph: the page's one orange button here. */}
        <div className="col-span-4 border-t border-hairline pt-6 max-[900px]:col-span-1">
          <span className="label">Free site visit</span>
          <h3 className="mt-1">We walk it before we quote it</h3>
          <p className="mt-2 max-w-[40ch] text-[16px] leading-[1.55] text-ink-body [text-wrap:pretty]">
            We assess the asphalt on site, bring colour and pattern samples, and come back with a
            written quote. No demolition, no new base.
          </p>
          <div className="mt-6">
            <Link href="/contact" className="btn-primary">
              Book a site visit
            </Link>
          </div>
          <p className="mt-4 text-[15px] text-ink-muted">
            <a href="tel:+16046126209" className="link">604-612-6209</a> Lower Mainland
            <span className="mx-2 text-[color:var(--hairline-strong)]" aria-hidden="true">·</span>
            <a href="tel:+12503910270" className="link">250-391-0270</a> Vancouver Island
          </p>
        </div>
      </div>

      {/* The manufacturer's line, on one rule. */}
      <p className="mt-12 max-w-[70ch] border-t border-hairline pt-6 text-[15px] italic leading-[1.6] text-ink-muted">
        The manufacturer publishes a 10&ndash;20 year service life for StreetPrint under municipal
        traffic. The manufacturer warrants the material; Square One warrants the workmanship.
      </p>
    </Section>
  )
}
