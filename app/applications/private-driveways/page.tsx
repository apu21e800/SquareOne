import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"

import { heroFor } from "@/lib/gallery"

export const metadata: Metadata = {
  title: "Decorative Driveways BC | Stamped Asphalt & StreetBond Coatings",
  description: "Decorative stamped asphalt and StreetBond coatings, installed over your existing BC driveway by Square One — Lower Mainland & Vancouver Island.",
}

const benefits = [
  {
    title: "Curb appeal that lasts",
    desc: "Custom patterns, colours and textures, chosen against your own siding and stone.",
  },
  {
    title: "20+ year service life",
    desc: "Our systems are engineered for BC's wet winters and dry summers — sealed and protected against wear.",
  },
  {
    title: "Increases property value",
    desc: "A decorative driveway is one of the highest-return exterior upgrades a BC home can get.",
  },
]

const products = [
  {
    name: "StreetBond coatings",
    desc: "Rich, uniform colour in dozens of tones — from warm terracotta to charcoal grey. Applied over existing asphalt. Most jobs finished in days.",
    image: "/images/products/streetbond/streetbond-1.jpg",
    alt: "StreetBond coated residential driveway",
  },
  {
    name: "StreetPrint stamped asphalt",
    desc: "Brick, cobblestone, and slate patterns stamped directly into asphalt. For homeowners who want the full pattern-and-colour treatment.",
    image: "/images/products/streetprint/streetprint-1.jpg",
    alt: "StreetPrint stamped asphalt driveway in a brick pattern",
  },
]

const process = [
  { num: "01", title: "Free consultation", desc: "We visit your property, assess your existing surface, and walk you through colour and pattern options." },
  { num: "02", title: "Custom design", desc: "We help you choose the right product, pattern, and colour to complement your home's architecture." },
  { num: "03", title: "Professional installation", desc: "Our certified crew installs your new driveway surface — typically in a single day with minimal disruption." },
  { num: "04", title: "The reveal", desc: "Your new driveway is sealed, cleaned, and ready to drive on." },
]

const faqs = [
  {
    q: "How much does a decorative driveway cost?",
    a: "Pricing depends on the size of your driveway and the product you choose. StreetBond coatings start lower, while StreetPrint stamped asphalt is the larger job. We provide free, no-obligation quotes after a site visit.",
  },
  {
    q: "How long does installation take?",
    a: "Most residential driveways are completed in a single day. StreetBond coatings cure within 24 hours. StreetPrint systems are ready for light traffic within 48 hours.",
  },
  {
    q: "How long will it last in BC's climate?",
    a: "Our systems are specifically designed for BC's freeze-thaw cycles and wet conditions. StreetBond lasts 5–8 years before recoating. StreetPrint stamped asphalt carries an 8+ year service life with proper sealing.",
  },
  {
    q: "Is it safe for snowplows and de-icing salt?",
    a: "Yes — both StreetBond and StreetPrint systems are snowplow-safe and resist de-icing chemicals. We recommend rubber-blade plows for the best long-term results.",
  },
  {
    q: "Does my existing driveway need to be replaced?",
    a: "Not necessarily. If your existing asphalt is structurally sound, we can apply StreetBond or StreetPrint directly over it, saving you significant cost. We assess this during the free consultation.",
  },
]

const credentials = [
  "Trusted by BC homeowners since 2000",
  "Certified decorative pavement installers",
  "Lower Mainland & Vancouver Island",
  "Free consultations",
]

/**
 * Application detail — docs/design-v2/Application Detail School Zones.dc.html.
 *
 *   Header    eyebrow + h1 + lede + CTAs + one photograph   white
 *   Why       3-up, hairline-topped                         warm, hairline top + bottom
 *   Systems   2-up photo cards                              white
 *   Process   4-up numbered steps                           warm, hairline top + bottom
 *   FAQ       hairline rows + credential row                white
 *   Close     slate — rendered once by app/layout.tsx (Footer)
 *
 * The close is the page's ONLY dark region. Nothing above it may go slate.
 * Orange budget in the header viewport: eyebrow square, full stop, primary
 * button. Nothing else on this page is accent-coloured.
 */
export default function PrivateDrivewaysPage() {
  // Filesystem first (public/images/applications/private-driveways/), curated
  // shot as the fallback — drop a photo in the folder and it leads the page.
  const heroFallback = "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
  const heroSrc = heroFor("applications", "private-driveways", heroFallback) ?? heroFallback

  return (
    <main>
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <section className="bg-[color:var(--surface)] pt-[calc(var(--bar-h)+var(--section-y))] pb-[var(--section-y)] max-[700px]:pt-[calc(var(--bar-h)+var(--section-y-sm))] max-[700px]:pb-[var(--section-y-sm)]">
        <div className="container-1280">
          <p className="eyebrow">Applications &middot; Residential</p>

          <h1 className="stop mt-7 max-w-[16ch]">Your driveway, reimagined</h1>

          <p className="mt-6 max-w-[56ch] text-[19px] leading-[1.65] text-[color:var(--ink-body)] [text-wrap:pretty] max-[700px]:text-[17px]">
            Decorative paving for BC homeowners. Custom colours, textures and patterns —
            installed by BC&apos;s most experienced HUB applicator.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-[14px]">
            <Link href="/contact" className="btn-primary">
              Book a consultation
            </Link>
            <Link href="/projects" className="btn-secondary">
              See our work
            </Link>
          </div>

          <div className="relative mt-16 aspect-[21/9] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)] max-[700px]:mt-10 max-[700px]:aspect-[4/3]">
            <Image
              src={heroSrc}
              alt="Decorative stamped asphalt driveway installed by Square One Paving"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Why ──────────────────────────────────────────────────────────── */}
      <section className="section border-t border-b border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
        <div className="container-1280">
          <h2>Why BC homeowners choose us</h2>

          <div className="mt-10 grid grid-cols-1 gap-10 min-[701px]:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="border-t border-[color:var(--hairline)] pt-6">
                <h3>{b.title}</h3>
                <p className="mt-[10px] max-w-[44ch] text-[15px] leading-[1.65] text-[color:var(--ink-body)]">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Systems ──────────────────────────────────────────────────────── */}
      <section className="section bg-[color:var(--surface)]">
        <div className="container-1280">
          <h2>Choose your style</h2>

          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-[color:var(--ink-body)] [text-wrap:pretty]">
            Two systems, both installed over sound existing asphalt. We bring sample boards to the
            site visit so you can see them against your own siding and stone.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 min-[701px]:grid-cols-2">
            {products.map((p) => (
              <Link
                key={p.name}
                href="/contact"
                className="card group flex flex-col rounded-[2px] border border-[color:var(--hairline)] bg-[color:var(--surface-warm)] p-5"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1280px) 50vw, 610px"
                    className="object-cover"
                  />
                  <div aria-hidden="true" className="scrim scrim-light" />
                </div>

                <h3 className="mt-6">{p.name}</h3>

                <p className="mt-[10px] text-[15px] leading-[1.55] text-[color:var(--ink-body)]">
                  {p.desc}
                </p>

                <span className="arrow-link mt-auto pt-7">
                  Request a quote for this system{" "}
                  <span aria-hidden="true" className="group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="section border-t border-b border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
        <div className="container-1280">
          <h2>From consultation to reveal</h2>

          <div className="mt-10 grid grid-cols-1 gap-10 border-t border-[color:var(--hairline)] min-[701px]:grid-cols-4 min-[701px]:gap-12">
            {process.map((step) => (
              <div key={step.num} className="pt-7">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-[color:var(--ink-muted)]">
                  {step.num}
                </div>
                <h3 className="mt-4">{step.title}</h3>
                <p className="mt-[10px] max-w-[44ch] text-[15px] leading-[1.65] text-[color:var(--ink-body)]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="section bg-[color:var(--surface)]">
        <div className="container-1280">
          <h2>Questions we hear</h2>

          <div className="mt-10 max-w-[760px] border-t border-[color:var(--hairline)]">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-[color:var(--hairline)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[22px] [&::-webkit-details-marker]:hidden">
                  <h3 className="transition-colors group-hover:text-[color:var(--accent-deep)]">
                    {faq.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="inline-block flex-shrink-0 text-[22px] leading-none font-light text-[color:var(--ink-muted)] transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[60ch] pt-0 pr-10 pb-6 text-[15px] leading-[1.65] text-[color:var(--ink-body)]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-3 border-t border-[color:var(--hairline)] pt-6">
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
