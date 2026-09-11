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

const LEAD = {
  src: "/images/S1_update_v2/photos/Driveways/Ten Mile Point Driveway I.jpg",
  alt: "StreetPrint stamped asphalt driveway at Ten Mile Point, Saanich, installed by Square One",
  caption: "Ten Mile Point, Saanich · StreetPrint",
}

const STRIP: { src: string; alt: string; caption: string }[] = [
  {
    src: "/images/S1_update_v2/photos/Driveways/Number 1.jpg",
    alt: "Ashlar slate StreetPrint driveway installed by Square One",
    caption: "Ashlar slate",
  },
  {
    src: "/images/S1_update_v2/photos/Driveways/Number 2.jpg",
    alt: "StreetPrint driveway with a circle medallion, installed by Square One",
    caption: "Circle medallion",
  },
  {
    src: "/images/S1_update_v2/photos/Driveways/Number 3.jpg",
    alt: "Charcoal cobble StreetPrint driveway installed by Square One",
    caption: "Charcoal cobble",
  },
]

export default function DrivewaysBand() {
  return (
    <section className="section relative overflow-hidden bg-surface">
      <div className="container-1280 relative z-[1]">
        <div className="grid grid-cols-12 gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
          {/* ── The photographs ──────── */}
          <div className="col-span-7 max-[900px]:col-span-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-stone">
              <Image
                src={LEAD.src}
                alt={LEAD.alt}
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                className="object-cover"
              />
              <div aria-hidden className="scrim scrim-light" />
              <div className="caption">{LEAD.caption}</div>
            </div>

            <ul className="mt-4 grid grid-cols-3 gap-4 max-[560px]:gap-3">
              {STRIP.map((photo) => (
                <li key={photo.src}>
                  <Link
                    href="/driveways"
                    className="group relative block aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-stone"
                    aria-label={`${photo.caption} — more driveways`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 900px) 33vw, 19vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span aria-hidden="true" className="scrim scrim-light" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                      <span
                        className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white max-[560px]:hidden"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {photo.caption}
                      </span>
                      <span aria-hidden="true" className="text-[14px] leading-none text-white/80 transition-transform duration-200 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── The line, and the offer ──────── */}
          <div className="col-span-5 flex flex-col justify-center max-[900px]:col-span-1">
            <div className="eyebrow">
              <span className="eyebrow-num">05</span>Driveways &middot; Vancouver &amp; Victoria
            </div>

            <h2 className="stop mt-5 max-w-[20ch] [text-wrap:balance] max-[600px]:max-w-none">
              The driveway you already have, made to look like stone
            </h2>

            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.65] text-ink-body [text-wrap:pretty]">
              StreetPrint patterns pressed into your existing asphalt and sealed in StreetBond
              colour &mdash; one continuous surface, no joints to heave, nothing for weeds to take
              hold in. Installed by the crews that do our municipal work, on both sides of the Strait.
            </p>

            {/* The offer card — the page's one accent block. */}
            <div className="offer-card mt-8">
              <div className="label text-white/75">Free site visit</div>
              <p className="offer-title mt-3">We walk it before we quote it</p>
              <p className="mt-3 max-w-[40ch] text-[14.5px] leading-[1.6] text-white/85">
                We assess the asphalt on site, bring the sample boards, and come back with a written
                quote. No demolition, no new base.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="/contact" className="btn-on-slate offer-btn">
                  Book a site visit
                </Link>
                <span className="inline-flex flex-wrap items-center gap-x-2 text-[13px] font-semibold tracking-[0.02em] text-white/85">
                  <a href="tel:+16044669902" className="whitespace-nowrap text-white hover:text-white">604-466-9902</a>
                  <span aria-hidden="true" className="text-white/50">&middot;</span>
                  <a href="tel:+12503910270" className="whitespace-nowrap text-white hover:text-white">250-391-0270</a>
                </span>
              </div>
            </div>

            <p className="mt-6 max-w-[46ch] text-[13.5px] leading-[1.6] text-ink-muted">
              HUB Surface Systems publishes a 10&ndash;20 year service life for StreetPrint under
              municipal traffic.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/driveways" className="arrow-link">
                Driveways <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/driveways/vancouver" className="arrow-link">
                Vancouver <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/driveways/victoria" className="arrow-link">
                Victoria <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
