import Link from "next/link"
import IndexImageHero from "@/components/IndexImageHero"
import OpenerTitle from "@/components/ui/OpenerTitle"
import { getPageOpener } from "@/lib/page-content"
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
   page opens on (2023–2026 work), so the row and the page agree.

   2 Oct 2026 (the client: the audience is people buying decorative
   hardscapes, commercial and residential): the three taglines say what the
   buyer gets rather than how it is specified. */
const services = [
  {
    slug: "stamped-asphalt",
    name: "Stamped asphalt",
    tagline: "Brick, cobble or slate, pressed into the asphalt you already have, by our own crews.",
    desc: "Pattern named from the sheet, colour off the chart, the texturing specification in the library. Then StreetPrint® pressed into the asphalt in place, or heavy-duty TrafficPatternsXD™ for the busiest crossings. A 10–20 year StreetPrint service life, published by the manufacturer.",
    image: "/images/applications/parking-lots/mission-parking-bays-and-lot-streetprint-01.jpg",
    alt: "Grey herringbone StreetPrint parking bays in front of a new commercial building in Mission",
    caption: "Parking bays, Mission · StreetPrint",
    applications: ["Crosswalks", "Roundabouts", "Streetscapes", "Commercial entries"],
  },
  {
    slug: "decorative-coatings",
    name: "Decorative coatings",
    tagline: "Colour off the chart, proved on a sample board, coated in place by our own crews.",
    desc: "StreetBond® in more than fifty standard colours, or matched to your reference, on asphalt or concrete: anti-skid, UV-stable, recoated rather than rebuilt, with an 8+ year life cycle published by the manufacturer. DuraShield for plain asphalt protection.",
    image: "/images/applications/parks-paths/surrey-marine-spray-park-streetbond-01.jpg",
    alt: "A marine spray park in Surrey, a swirl of blue StreetBond water through lime-green and yellow leaf shapes",
    caption: "Marine spray park, Surrey · StreetBond",
    applications: ["Bike lanes", "Bus rapid transit", "Parking lots", "Spray parks"],
  },
  {
    slug: "preformed-thermoplastic",
    name: "Preformed thermoplastic",
    tagline: "Crosswalks, symbols and logos, cut to the drawing and fused into the road by our own crews.",
    desc: "Send the drawing or the artist's file: TrafficPatterns™, DecoMark®, DuraTherm® and PreMark® are cut to the design before they reach the site and heat-fused in place. A TrafficPatterns crossing is open to traffic within minutes of application.",
    image: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2023-09-22-1-50-34-PM.jpg",
    alt: "\u2018Every Child Matters\u2019 by Charliss Santos in orange and black TrafficPatterns, New Westminster",
    caption: "\u2018Every Child Matters\u2019, New Westminster · TrafficPatterns",
    applications: ["Crosswalk markings", "School zones", "Custom logos", "Stop bars"],
  },
  {
    slug: "vapor-blasting",
    name: "Vapour blasting",
    tagline: "Clean it, prime it, bring it back.",
    desc: "The supporting service: surface cleaning and priming ahead of a coating or thermoplastic install, and graffiti, mould and marking removal on its own, mobile across the Lower Mainland and Vancouver Island, with up to 92% less dust than dry blasting.",
    // 7 Oct 2026: the sunlit Granville Island frame, as the home band, the
    // menu and the service's own opener show it.
    image: "/images/services/vapor-blasting/generated/gen-granville-island-vapour-blasting-01-enhanced.jpg",
    alt: "A Square One operator vapour blasting a painted marking off the boardwalk at Granville Island, Vancouver, the Burrard Street Bridge behind under a clear sky",
    caption: "Granville Island, Vancouver · marking removal",
    applications: ["Graffiti removal", "Marking removal", "Surface prep", "Mould and grime"],
  },
]

/* Every line is on record: the free site walk and written quote
   (app/contact, app/about), Square One's own crews to the published
   specification, the two regions. No warranty wording (6 Oct 2026, the
   client: "remove anything about warranty"). */
const facts = [
  "Free site walk, written quote",
  "Installed by our own crews",
  "Lower Mainland & Vancouver Island since 2000",
]

/** The three things a specifier opens first, and the record as precedent. */

export default async function ServicesPage() {
  // The opener, with whatever the Studio says on top (lib/page-content.ts, 9 Oct 2026).
  const o = await getPageOpener("/services")
  return (
    <main className="bg-surface">
      {/* ---- Header — full-bleed image band ---- */}
      <IndexImageHero
        src={o.src}
        alt={o.alt}
        eyebrow="What we do"
        title={<OpenerTitle head={o.head} tail={o.tail} />}
        fit={o.fit}
        lede={o.lede}
        caption={o.caption}
        imagePosition={o.position}
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
          {services.map((service, i) => (
            <Row key={service.slug} as="article" className={`row-service${service.slug === "vapor-blasting" ? " row-vapour" : ""}`}>
              <Frame
                src={service.image}
                alt={service.alt}
                caption={service.caption}
                aspect="aspect-[4/3]"
                sizes="(max-width: 700px) 100vw, 600px"
                href={`/services/${service.slug}`}
                priority={i === 0}
              />
              {/* 30 Sept 2026 QA: the words sat high beside a tall frame with
                  the right half of the row empty. The column is wider, the
                  text meets the photograph at its middle, and the kinds of
                  work each service is specified for run under the line. */}
              <div className="min-w-0">
                <span className="label tabular-nums" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[34px] leading-[1.05] max-[700px]:text-[26px]">
                  <Link href={`/services/${service.slug}`} className="hover:underline hover:decoration-1 hover:underline-offset-[6px]">
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-4 max-w-[44ch] text-[18px] leading-[1.5] text-ink-body [text-wrap:pretty] max-[700px]:text-[17px]">
                  {service.tagline}
                </p>
                <p className="label mt-5">{service.applications.join(" · ")}</p>
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

      {/* The "For specifiers" section came off on 2 Oct 2026 (the client:
          "for specifiers section is not required"; Vern: "just hide the
          specifiers section for now"). The route still answers; it is
          linked from nowhere. */}

      {/* ---- Fact strip — one hairline row in the serif ---- */}
      <section className="fact-strip border-t border-hairline bg-surface-stone py-7">
        <div className="container-1280 flex flex-wrap justify-center gap-x-12 gap-y-3">
          {facts.map((fact) => (
            <span key={fact} className="label label-sq">
              {fact}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}
