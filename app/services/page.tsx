import Image from "next/image"
import Link from "next/link"
import IndexImageHero from "@/components/IndexImageHero"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Decorative Pavement Services in BC",
  description:
    clampDescription("Stamped asphalt, decorative coatings, preformed thermoplastic and vapour blasting — specified with you and installed by our own crews across the Lower Mainland and Vancouver Island since 2000."),
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
   is the manufacturer's and says so. */
const services = [
  {
    num: "01",
    slug: "stamped-asphalt",
    name: "Stamped asphalt",
    tagline: "Specified from a dimensioned template sheet, pressed into the asphalt already there by our own crews.",
    desc: "Pattern named from the sheet, colour off the chart, the texturing specification in the library — then StreetPrint® pressed into the asphalt in place, or heavy-duty TrafficPatternsXD™ for the busiest crossings. A 10–20 year StreetPrint service life, published by the manufacturer.",
    image: "/images/hero/victoria-ellis-point-walkway-streetprint.jpg",
    alt: "Cobblestone-pattern StreetPrint walkway in a red-brown colour beside a timber rail at Ellis Point, Victoria",
    applications: ["Crosswalks", "Roundabouts", "Streetscapes", "Commercial Entries"],
  },
  {
    num: "02",
    slug: "decorative-coatings",
    name: "Decorative coatings",
    tagline: "Specified off the colour chart, proved on a sample board, coated in place by our own crews.",
    desc: "StreetBond® in more than fifty standard colours, or matched to your reference, on asphalt or concrete — anti-skid, UV-stable, recoated rather than rebuilt, with an 8+ year life cycle published by the manufacturer. DuraShield for plain asphalt protection.",
    image: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
    alt: "Multicolour StreetBond plaza under the SkyTrain guideway at Joyce Station, Vancouver, at dusk",
    applications: ["Bike Lanes", "Bus Rapid Transit", "Parking Lots", "Spray Parks"],
  },
  {
    num: "03",
    slug: "preformed-thermoplastic",
    name: "Preformed thermoplastic",
    tagline: "Cut to your drawing, to the owner's marking standard, and fused into the road by our own crews.",
    desc: "Send the drawing or the artist's file: TrafficPatterns™, DecoMark®, DuraTherm® and PreMark® are cut to the design before they reach the site and heat-fused in place. A TrafficPatterns crossing is open to traffic within minutes of application.",
    image: "/images/projects/ubc-musqueam-crosswalk/ubc-musqueam-crosswalk-trafficpatterns-01.jpg",
    alt: "A bus crossing the Musqueam artwork in TrafficPatterns thermoplastic on the UBC crosswalk, University Boulevard, Vancouver",
    applications: ["Crosswalk Markings", "School Zones", "Custom Logos", "Stop Bars"],
  },
  {
    num: "04",
    slug: "vapor-blasting",
    name: "Vapour blasting",
    tagline: "Clean it, prime it, bring it back.",
    desc: "The supporting service: surface cleaning and priming ahead of a coating or thermoplastic install, and graffiti, mould and marking removal on its own — mobile across the Lower Mainland and Vancouver Island, with up to 92% less dust than dry blasting.",
    image: "/images/services/vapor-blasting/generated/gen-granville-island-vapour-blasting-01-enhanced.jpg",
    alt: "A Square One operator vapour blasting a painted marking off the boardwalk at Granville Island, Vancouver",
    applications: ["Graffiti Removal", "Marking Removal", "Surface Prep", "Mould & Muck"],
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

export default function ServicesPage() {
  const total = String(services.length).padStart(2, "0")

  return (
    <main className="bg-[color:var(--surface)]">
      {/* ---- Header — full-bleed image band (Rockstar Part 4) ---- */}
      <IndexImageHero
        src="/images/hero/granville-island-crosswalk-streetprint.jpg"
        alt="Brick-red TrafficPatternsXD crosswalk on wet pavement outside Granville Island Brewing, Vancouver"
        eyebrow="What we do"
        title="What Square One does for a project"
        lede="A free site walk, help specifying — template sheets, colour chart, sample boards, the manufacturer's specifications — a written quote, and installation by our own crews. Four services, Lower Mainland and Vancouver Island, since 2000."
        caption="Granville Island · TrafficPatternsXD"
        imagePosition="center 70%"
      />

      {/* ---- The four services ---- */}
      <section
        aria-labelledby="services-heading"
        className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface-warm)]"
      >
        <h2 id="services-heading" className="sr-only">
          Decorative pavement services in the Lower Mainland and on Vancouver Island
        </h2>

        <div className="container-1280">
          <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card group flex flex-col overflow-hidden border border-[color:var(--hairline)] bg-[color:var(--surface)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--surface-stone)]">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, (max-width: 1280px) 50vw, 616px"
                    className="object-cover"
                  />
                  <div aria-hidden="true" className="scrim scrim-light" />
                </div>

                <div className="flex flex-1 flex-col p-8 max-[700px]:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="label">
                      {service.num} / {total}
                    </span>
                  </div>

                  <h3 className="mt-5">{service.name}</h3>

                  <p className="mt-[10px] text-[15px] leading-[1.55] text-[color:var(--ink-body)]">
                    {service.tagline}
                  </p>

                  <p className="mt-4 text-[15px] leading-[1.6] text-[color:var(--ink-muted)]">
                    {service.desc}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.applications.map((application) => (
                      <span key={application} className="tag">
                        {application}
                      </span>
                    ))}
                  </div>

                  <span className="arrow-link mt-auto pt-8">
                    Explore service{" "}
                    <span aria-hidden="true" className="group-hover:translate-x-[4px]">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- For specifiers — one line and the three things they open first ---- */}
      <section className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface)]">
        <div className="container-1280 grid grid-cols-12 items-start gap-x-12 gap-y-8 max-[900px]:grid-cols-1">
          <div className="col-span-6 max-[900px]:col-span-1">
            <p className="eyebrow">For specifiers</p>
            <h2 className="mt-5 [text-wrap:balance]">Drawing it, specifying it, putting it to tender</h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.65] text-[color:var(--ink-body)] [text-wrap:pretty]">
              A landscape architect, an engineer or a municipal project specifier can take the whole
              job from this site: the template sheets as dimensioned drawings, the colour chart, the
              manufacturer&rsquo;s specifications and data sheets, the installed work as precedent
              &mdash; and a site walk with the sample boards when you are ready.
            </p>
            <Link href="/specifiers" className="btn-primary mt-8">
              Everything for specifiers
            </Link>
          </div>
          <ul className="col-span-6 border-t border-[color:var(--hairline)] max-[900px]:col-span-1">
            {[
              { href: "/resources", label: "Specification library", note: "Specifications, data sheets, colour cards, SDS and guides for every system" },
              { href: "/patterns", label: "Template sheets", note: "Every StreetPrint template as a dimensioned drawing, named for the plan" },
              { href: "/products/streetbond#colours", label: "StreetBond colour chart", note: "More than fifty standard colours, plus custom matching" },
              { href: "/projects", label: "Projects on record", note: "The installations, told in full — the place, the systems, the photographs" },
            ].map((item) => (
              <li key={item.href} className="border-b border-[color:var(--hairline)]">
                <Link href={item.href} className="group flex items-baseline justify-between gap-6 py-4">
                  <span>
                    <span className="block text-[16px] font-semibold text-[color:var(--ink)]">{item.label}</span>
                    <span className="mt-1 block text-[14px] leading-[1.5] text-[color:var(--ink-muted)]">{item.note}</span>
                  </span>
                  <span aria-hidden="true" className="arrow-link whitespace-nowrap">
                    <span>&rarr;</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Fact strip ---- */}
      <section className="border-t border-[color:var(--hairline)] bg-[color:var(--surface-stone)] py-7">
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
