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
    communities: "West Vancouver to Maple Ridge",
  },
  {
    href: "/driveways/victoria",
    name: "Victoria driveways",
    region: "Greater Victoria",
    src: "/images/S1_update_v2/photos/Driveways/Ten%20Mile%20Point%20Driveway%20I.jpg",
    alt: "Grey ashlar StreetPrint stamped asphalt driveway with a charcoal border, running up to a stone-and-timber entry at Ten Mile Point, Saanich",
    caption: "Ten Mile Point, Saanich · StreetPrint",
    communities: "Victoria, Saanich, the Peninsula and Sooke",
  },
]

export default function DrivewaysBand() {
  return (
    <Section
      label="Driveways · Vancouver and Victoria"
      title={<>The driveway you already have, <em>made to look like stone</em></>}
      link={{ href: "/patterns", label: "StreetPrint patterns" }}
      intro="StreetPrint pressed into the asphalt you have, sealed in StreetBond colour. No joints to heave, no new base."
      wide
    >
      <div className="grid grid-cols-12 gap-x-10 gap-y-12 max-[900px]:grid-cols-1">
        {CITIES.map((city) => (
          <article key={city.href} className="col-span-4 max-[900px]:col-span-1">
            <Frame
              src={city.src}
              alt={city.alt}
              aspect="aspect-[4/3]"
              sizes="(max-width: 900px) 100vw, 400px"
              position="center 70%"
              href={city.href}
            />
            <h3 className="mt-5">
              <Link href={city.href} className="hover:underline hover:decoration-1 hover:underline-offset-[6px]">
                {city.name}
              </Link>
            </h3>
            <p className="mt-1 text-[16px] leading-[1.55] text-ink-body">{city.communities}</p>
          </article>
        ))}

        {/* The offer, as a paragraph: the page's one orange button here. */}
        <div className="col-span-4 border-t border-hairline pt-6 max-[900px]:col-span-1">
          <span className="label">Free site visit</span>
          <h3 className="mt-1">We walk it before we quote it</h3>
          <p className="mt-2 max-w-[40ch] text-[16px] leading-[1.55] text-ink-body [text-wrap:pretty]">
            The samples come to your driveway; the quote comes in writing.
          </p>
          <div className="mt-6">
            <Link href="/contact" className="btn-primary">
              Get a quote
            </Link>
          </div>
          <p className="mt-4 text-[15px] text-ink-muted">
            or call <a href="tel:+16046126209" className="link">604-612-6209</a>
          </p>
        </div>
      </div>

    </Section>
  )
}
