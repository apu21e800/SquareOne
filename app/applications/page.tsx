import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Applications | Square One Paving",
  description:
    "Decorative paving and vapour blasting for driveways, patios, walkways, parking areas, and more across BC. Square One Paving — serving the Lower Mainland and Vancouver Island.",
  alternates: {
    canonical: "https://squareonepaving.com/applications",
  },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const applications = [
  {
    title: "Driveways",
    tag: "Residential",
    desc: "Custom stamped asphalt and StreetBond coatings that transform your home entrance. 20+ patterns and colours — brick, cobblestone, slate, and more.",
    image: "/images/applications/private-driveways/chilliwack-townhomes-brick-driveway-01.jpg",
    alt: "Decorative brick-pattern driveway at BC townhome complex",
    cta: "Explore driveways",
    href: "/driveways",
  },
  {
    title: "Patios & courtyards",
    tag: "Residential",
    desc: "Extend your living space outdoors. Rich colour and durable texture for patios, pool decks, and private courtyards — built for BC's wet climate.",
    image: "/images/applications/parks-paths/winding-park-path-streetbond-01.jpg",
    alt: "Decorative StreetBond pathway in BC park",
    cta: "Request a quote",
    href: "/contact",
  },
  {
    title: "Walkways",
    tag: "Residential / Commercial",
    desc: "Pedestrian paths, front walkways, and access routes — stamped or coated for curb appeal and longevity. Slip-resistant finishes available.",
    image: "/images/applications/parks-paths/eagle-mural-courtyard-aerial-01.jpg",
    alt: "Decorative courtyard with aerial view of paved surface",
    cta: "Request a quote",
    href: "/contact",
  },
  {
    title: "Parking areas",
    tag: "Commercial",
    desc: "Durable decorative coatings and thermoplastic markings for strata, commercial, and multi-family parking lots. Stall lines, accessible markings, directional graphics.",
    image: "/images/applications/parking-lots/apartment-complex-yellow-streetprint-aerial-01.jpg",
    alt: "Aerial view of decorative parking lot with StreetPrint pattern",
    cta: "Request a quote",
    href: "/contact",
  },
  {
    title: "Vapour blasting",
    tag: "All surfaces",
    desc: "Restore any surface to bare condition before coating or repair. No silica dust, no substrate damage — mobile vapour blasting anywhere in BC.",
    image: "/images/products/streetbond/streetbond-cobble-macro-surface-01.jpg",
    alt: "Clean surface ready for decorative coating",
    cta: "Learn about vapour blasting",
    href: "/services/vapor-blasting",
  },
]

const credentials = [
  "Serving BC since 2000",
  "BC's decorative pavement studio",
  "Lower Mainland & Vancouver Island",
  "Free site consultations",
]

// ─── Page ─────────────────────────────────────────────────────────────────────

/**
 * Applications index — docs/design-v2/Index Pages.dc.html (#applications).
 *
 *   Header       eyebrow + h1 + lede + one primary CTA   white
 *   Listing      4:3 photo cards, scrim + tag caption    warm, hairline top + bottom
 *   Credentials  quiet hairline row                      white
 *   Close        slate — rendered once by app/layout.tsx (Footer)
 *
 * The close is the page's ONLY dark region. Nothing above it may go slate.
 * Orange budget in the header viewport: eyebrow square, full stop, primary
 * button. Nothing else on this page is accent-coloured.
 */
export default function ApplicationsPage() {
  return (
    <main>
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section className="bg-[color:var(--surface)] pt-[calc(var(--bar-h)+var(--section-y))] pb-[var(--section-y)] max-[700px]:pt-[calc(var(--bar-h)+var(--section-y-sm))] max-[700px]:pb-[var(--section-y-sm)]">
        <div className="container-1280">
          <p className="eyebrow">Applications</p>

          <h1 className="stop mt-7 max-w-[22ch]">Where these systems are specified</h1>

          <p className="mt-6 max-w-[56ch] text-[19px] leading-[1.65] text-[color:var(--ink-body)] [text-wrap:pretty] max-[700px]:text-[17px]">
            From residential driveways to commercial parking areas — decorative pavement systems
            and vapour blasting, applied across British Columbia. Every surface, every scale.
          </p>

          <div className="mt-11">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── Application cards ────────────────────────────────────────────── */}
      <section className="section border-t border-b border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
        <div className="container-1280">
          <div className="grid grid-cols-1 gap-6 min-[701px]:grid-cols-3">
            {applications.map((app) => (
              <Link
                key={app.title}
                href={app.href}
                className="card group flex flex-col rounded-[2px] border border-[color:var(--hairline)] bg-[color:var(--surface)] p-5"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
                  <Image
                    src={app.image}
                    alt={app.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 400px"
                    className="object-cover"
                  />
                  <div aria-hidden className="scrim" />
                  <div className="caption">{app.tag}</div>
                </div>

                <h3 className="mt-6">{app.title}</h3>

                <p className="mt-[10px] text-[15px] leading-[1.55] text-[color:var(--ink-body)]">
                  {app.desc}
                </p>

                <span className="arrow-link mt-auto pt-7">
                  {app.cta}{" "}
                  <span aria-hidden="true" className="group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials ──────────────────────────────────────────────────── */}
      <section className="section bg-[color:var(--surface)]">
        <div className="container-1280">
          <div className="flex flex-wrap gap-x-10 gap-y-3 border-t border-[color:var(--hairline)] pt-6">
            {credentials.map((c) => (
              <span key={c} className="text-[13px] font-medium text-[color:var(--ink-muted)]">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
