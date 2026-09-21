import Image from "next/image"
import Link from "next/link"

/* Home — the residential line, after the commercial applications (business
   hierarchy canon: commercial first, driveways second).

   Rebuilt 11 Sept 2026 (Vern: "this page on the homepage still sucks").
   What was wrong: the photograph was a 667px WordPress tile blown up to
   830px — soft at any size, and the one thing a driveway band has to be is
   sharp; the orange card carried two decorative squares that read as
   rendering bugs; the figures row said "2 regions, one crew", which is
   filler. Now: the Ten Mile Point driveway (2048px, Saanich, on the
   record) leads, three more driveways from the record sit under it as a
   strip into /driveways, the offer card is plain, and the only figure left
   is the one HUB publishes. Captions come from lib/work.ts — never guessed. */

/** The two city pages, featured (Vern, 19 Sept 2026: "feature Vancouver
    and Victoria driveways"). Each card is one frame from that region's
    driveway record — the same frame its page opens on — and the
    communities its page names. */
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
    <section className="section relative overflow-hidden bg-surface">
      <div className="container-1280 relative z-[1]">
        {/* 21 Sept 2026 (Vern: "huge white space on Driveways section"). The
            band was seven columns of cards beside five columns of argument.
            The argument column — heading, paragraph, offer card, the
            manufacturer's line and two more links — ran about three hundred
            pixels taller than the cards, and because grid children stretch,
            each card stretched with it and `mt-auto` threw its footer to the
            bottom of a card that was mostly air. The fix is not a height
            tweak: the heading and the paragraph belong above the row, the way
            every other section on this page sets them, and then the two city
            cards and the offer stand as three equal columns. The per-card
            phone numbers came off with it — the offer card carries both
            lines, and four telephone numbers in one band is not a band, it is
            a directory. */}
        <div data-reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-num">05</span>Driveways &middot; Vancouver &amp; Victoria
            </div>
            <h2 className="stop mt-5 max-w-[26ch] [text-wrap:balance] max-[600px]:max-w-none">
              The driveway you already have, made to look like stone
            </h2>
          </div>
          <p className="max-w-[44ch] text-[15px] leading-[1.6] text-ink-muted [text-wrap:pretty]">
            StreetPrint patterns pressed into your existing asphalt and sealed in StreetBond
            colour &mdash; one continuous surface, no joints to heave, nothing for weeds to take
            hold in. Installed by the same crews that do our municipal work.
          </p>
        </div>

        <div data-reveal-group className="mt-12 grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          {CITIES.map((city) => (
            <article key={city.href} data-reveal className="card relative flex flex-col overflow-hidden rounded-[2px] bg-surface">
              <Link href={city.href} aria-label={city.name} className="absolute inset-0 z-[2]" />
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-stone">
                <Image
                  src={city.src}
                  alt={city.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 400px"
                  className="object-cover [object-position:center_70%]"
                />
                <div aria-hidden className="scrim scrim-light" />
                <div className="caption">{city.caption}</div>
              </div>
              <div className="flex flex-1 flex-col border-b border-hairline pt-5 pb-6">
                <div className="label">{city.region}</div>
                <h3 className="mt-2">{city.name}</h3>
                <p className="mt-[10px] text-[14.5px] leading-[1.55] text-ink-body [text-wrap:pretty]">
                  On record from {city.communities}.
                </p>
                <span aria-hidden="true" className="arrow-link mt-auto pt-6">
                  Driveways in {city.region} <span>&rarr;</span>
                </span>
              </div>
            </article>
          ))}

          {/* The offer is the third column, not a block bolted under the
              argument — so it is the same height as the cards beside it. */}
          <div data-reveal className="offer-card flex flex-col">
            <div className="label text-white/75">Free site visit</div>
            <p className="offer-title mt-3">We walk it before we quote it</p>
            <p className="mt-3 text-[14.5px] leading-[1.6] text-white/85 [text-wrap:pretty]">
              We assess the asphalt on site, bring colour and pattern samples, and come back with
              a written quote. No demolition, no new base.
            </p>
            <div className="mt-auto pt-7">
              <Link href="/contact" className="btn-on-slate offer-btn">
                Book a site visit
              </Link>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 text-[13px] font-semibold tracking-[0.02em] text-white/85">
                <a href="tel:+16046126209" className="whitespace-nowrap text-white hover:text-white">604-612-6209</a>
                <span aria-hidden="true" className="text-white/50">&middot;</span>
                <a href="tel:+12503910270" className="whitespace-nowrap text-white hover:text-white">250-391-0270</a>
              </div>
            </div>
          </div>
        </div>

        {/* The manufacturer's line and the way through to the patterns, on one
            rule. It used to be a three-line paragraph plus two arrow links,
            one of which repeated what the cards above already do. */}
        <div className="mt-9 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 border-t border-hairline pt-6">
          <p className="max-w-[62ch] text-[13.5px] leading-[1.6] text-ink-muted">
            The manufacturer publishes a 10&ndash;20 year service life for StreetPrint under
            municipal traffic. The manufacturer warrants the material; Square One warrants the
            workmanship.
          </p>
          <Link href="/patterns" className="arrow-link whitespace-nowrap">
            StreetPrint patterns <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
