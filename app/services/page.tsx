import Link from "next/link"
import IndexImageHero from "@/components/IndexImageHero"
import Frame from "@/components/ui/Frame"
import { Section, Row } from "@/components/ui/Container"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

export const metadata: Metadata = {
  openGraph: { title: "Decorative Pavement Services in BC", description: clampDescription("Stamped asphalt, decorative coatings, preformed thermoplastic and vapour blasting: specified with you and installed by our own crews across the Lower Mainland and Vancouver Island since 2000."), images: [{ url: "/images/applications/public-art/new-westminster-boundary-pump-station-full-field-streetbond-01.jpg" }] },
  title: "Decorative Pavement Services in BC",
  description:
    clampDescription("Stamped asphalt, decorative coatings, preformed thermoplastic and vapour blasting: specified with you and installed by our own crews across the Lower Mainland and Vancouver Island since 2000."),
  alternates: { canonical: `${SITE_URL}/services` },
}

/* The index reads as what Square One does for a project (the 19 Sept 2026
   evening ruling: the pillar pages sell the service, to specifiers). Card
   taglines mirror lib/services. Images are named, verified BC installs —
   same voice as the homepage grid. Slugs and routes come from lib/services
   untouched ("vapor-blasting" stays the route). No absolute market claims
   and no invented exclusivity badges: the honesty constitution outranks
   the sales instinct. Vapour closes — the supporting service. Marks ride
   the first mention of each system on this page; every performance figure
   is the manufacturer's and says so.

   26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the four photo cards are
   four hairline rows — the frame inset with its caption under it (the
   place and the system the alt text already named), the text beside it,
   the applications as words, one underlined link.

   28 Sept 2026, second image pass: each row now shows the frame its service
   page opens on (2023–2026 work), so the row and the page agree. */
const services = [
  {
    slug: "stamped-asphalt",
    name: "Stamped asphalt",
    tagline: "Specified from a dimensioned template sheet, pressed into the asphalt already there by our own crews.",
    desc: "Pattern named from the sheet, colour off the chart, the texturing specification in the library. Then StreetPrint® pressed into the asphalt in place, or heavy-duty TrafficPatternsXD™ for the busiest crossings. A 10–20 year StreetPrint service life, published by the manufacturer.",
    image: "/images/applications/parking-lots/mission-parking-bays-and-lot-streetprint-01.jpg",
    alt: "Grey herringbone StreetPrint parking bays in front of a new commercial building in Mission",
    caption: "Parking bays, Mission · StreetPrint",
    applications: ["Crosswalks", "Roundabouts", "Streetscapes", "Commercial Entries"],
  },
  {
    slug: "decorative-coatings",
    name: "Decorative coatings",
    tagline: "Specified off the colour chart, proved on a sample board, coated in place by our own crews.",
    desc: "StreetBond® in more than fifty standard colours, or matched to your reference, on asphalt or concrete: anti-skid, UV-stable, recoated rather than rebuilt, with an 8+ year life cycle published by the manufacturer. DuraShield for plain asphalt protection.",
    image: "/images/applications/parks-paths/surrey-marine-spray-park-streetbond-01.jpg",
    alt: "A marine spray park in Surrey, a swirl of blue StreetBond water through lime-green and yellow leaf shapes",
    caption: "Marine spray park, Surrey · StreetBond",
    applications: ["Bike Lanes", "Bus Rapid Transit", "Parking Lots", "Spray Parks"],
  },
  {
    slug: "preformed-thermoplastic",
    name: "Preformed thermoplastic",
    tagline: "Cut to your drawing, to the owner's marking standard, and fused into the road by our own crews.",
    desc: "Send the drawing or the artist's file: TrafficPatterns™, DecoMark®, DuraTherm® and PreMark® are cut to the design before they reach the site and heat-fused in place. A TrafficPatterns crossing is open to traffic within minutes of application.",
    image: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2023-09-22-1-50-34-PM.jpg",
    alt: "'Every Child Matters' by Charliss Santos in orange and black TrafficPatterns, New Westminster",
    caption: "'Every Child Matters', New Westminster · TrafficPatterns",
    applications: ["Crosswalk Markings", "School Zones", "Custom Logos", "Stop Bars"],
  },
  {
    slug: "vapor-blasting",
    name: "Vapour blasting",
    tagline: "Clean it, prime it, bring it back.",
    desc: "The supporting service: surface cleaning and priming ahead of a coating or thermoplastic install, and graffiti, mould and marking removal on its own, mobile across the Lower Mainland and Vancouver Island, with up to 92% less dust than dry blasting.",
    image: "/images/services/vapor-blasting/parking-lot-vapour-blasting-01.jpg",
    alt: "Square One removing painted parking symbols from an asphalt lot with the vapour blasting rig",
    caption: "Commercial parking lot · marking removal",
    applications: ["Graffiti Removal", "Marking Removal", "Surface Prep", "Mould and grime"],
  },
]

/* Every line is on record: the free site walk and written quote
   (app/contact, app/about), Square One's own crews to the published
   specification and the warranty split (app/about), the two regions. */
const facts = [
  "Free site walk, written quote",
  "Installed by our own crews",
  "Material warranted by the manufacturer, workmanship by Square One",
  "Lower Mainland & Vancouver Island since 2000",
]

/** The three things a specifier opens first, and the record as precedent. */
const specifierLinks = [
  { href: "/resources", label: "Specification library", note: "Specifications, data sheets, colour cards, SDS and guides for every system" },
  { href: "/patterns", label: "Template sheets", note: "Every StreetPrint template as a dimensioned drawing, named for the plan" },
  { href: "/products/streetbond#colours", label: "StreetBond colour chart", note: "More than fifty standard colours, plus custom matching" },
  { href: "/projects", label: "Projects on record", note: "The installations, told in full: the place, the systems, the photographs" },
]

export default function ServicesPage() {
  return (
    <main className="bg-surface">
      {/* ---- Header — full-bleed image band ---- */}
      <IndexImageHero
        src="/images/applications/public-art/new-westminster-boundary-pump-station-full-field-streetbond-01.jpg"
        alt="The Boundary Road pump station in New Westminster from above, a quilt of red, blue, yellow, pink, black and white StreetBond squares across the whole plaza, installed by Square One"
        eyebrow="What we do"
        title={<>What <em>we do</em></>}
        fit="What we do"
        lede="Three ways to change a surface and one to clean it: a free site walk, a written quote and our own crews, across the Lower Mainland and Vancouver Island since 2000."
        caption="New Westminster · Boundary Road pump station · StreetBond"
        imagePosition="center 45%"
      />

      {/* ---- The four services, as rows ---- */}
      <Section
        id="services"
        label="The services"
        title={<>Three ways we change a surface, <em>and one way we clean it</em></>}
        tone="warm"
        wide
      >
        <div>
          {services.map((service) => (
            <Row key={service.slug} as="article">
              <Frame
                src={service.image}
                alt={service.alt}
                caption={service.caption}
                aspect="aspect-[4/3]"
                sizes="(max-width: 700px) 100vw, 520px"
                href={`/services/${service.slug}`}
              />
              <div className="min-w-0">
                <h3 className="text-[30px] leading-[1.1] max-[700px]:text-[24px]">
                  <Link href={`/services/${service.slug}`} className="hover:underline hover:decoration-1 hover:underline-offset-[6px]">
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-3 max-w-[40ch] text-ink-body [text-wrap:pretty]">{service.tagline}</p>
                <p className="mt-5">
                  <Link href={`/services/${service.slug}`} className="link">
                    The service
                  </Link>
                </p>
              </div>
            </Row>
          ))}
        </div>
      </Section>

      {/* ---- For specifiers — one line and the three things they open first ---- */}
      <Section
        label="For specifiers"
        title={<>Drawing it, specifying it, <em>putting it to tender</em></>}
        intro="The sheets, the colour chart, the specifications and the record: everything to draw it and tender it."
      >
        <ul className="border-t border-hairline">
          {specifierLinks.map((item) => (
            <li key={item.href} className="border-b border-hairline py-4">
              <Link href={item.href} className="link">
                {item.label}
              </Link>
              <span className="mt-1 block max-w-[60ch] text-[15px] leading-[1.5] text-ink-muted">{item.note}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/specifiers" className="link">
            Everything for specifiers
          </Link>
        </p>
      </Section>

      {/* ---- Fact strip — one hairline row in the serif ---- */}
      <section className="border-t border-hairline bg-surface-stone py-7">
        <div className="container-1280 flex flex-wrap justify-center gap-x-12 gap-y-3">
          {facts.map((fact) => (
            <span key={fact} className="label">
              {fact}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}
