import Image from "next/image"
import Link from "next/link"

/* Home — the residential line, after the commercial applications (business
   hierarchy canon: commercial first, driveways second). Every figure is
   published: StreetPrint's 10–20 year municipal service life (hubss.com),
   Square One installing since 2000, two regions on two phone lines. The
   photograph is a Square One driveway from the record.

   Rebuilt 5 Sept 2026 (Vern: "the free site walk section — everything just
   blends together"). The offer is now its own object: an orange card, the
   one accent block on the page, carrying the site-visit promise that
   /driveways and /contact already make. The old site-walk bar folded into
   it. Figures shrink to a hairline row so the card leads. */

const figures: { value: string; label: string }[] = [
  { value: "10–20", label: "years — StreetPrint's published service life" },
  { value: "25+", label: "years installing driveways across BC" },
  { value: "2", label: "regions, one crew — Metro Vancouver and Greater Victoria" },
]

export default function DrivewaysBand() {
  return (
    <section className="section relative overflow-hidden bg-surface">
      <span aria-hidden="true" className="ghost-index">05</span>

      <div className="container-1280 relative z-[1]">
        <div className="grid grid-cols-12 gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
          {/* ── The photograph ──────── */}
          <div className="relative col-span-7 min-h-[560px] overflow-hidden rounded-[2px] bg-surface-stone max-[900px]:col-span-1 max-[900px]:aspect-[4/3] max-[900px]:min-h-0">
            <Image
              src="/images/applications/driveways/victoria-offset-brick-ashlar-driveway-streetprint-01.jpg"
              alt="Offset brick and ashlar slate StreetPrint driveway in Victoria, installed by Square One"
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
              className="object-cover"
            />
            <div aria-hidden className="scrim scrim-light" />
            <div className="caption">Victoria &middot; StreetPrint &middot; Offset brick on ashlar slate</div>
          </div>

          {/* ── The line, and the offer ──────── */}
          <div className="col-span-5 flex flex-col justify-center max-[900px]:col-span-1">
            <div className="eyebrow">
              <span className="eyebrow-num">05</span>Driveways &middot; Vancouver &amp; Victoria
            </div>

            <h2 className="stop mt-5 max-w-[20ch] [text-wrap:balance] max-[600px]:max-w-none">
              The driveway you already have, made to look like stone
            </h2>

            <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.65] text-ink-body [text-wrap:pretty]">
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

            {/* Three figures, small — a hairline row under the card. */}
            <dl className="mt-8 grid grid-cols-3 gap-x-6 border-t border-hairline pt-5 max-[560px]:grid-cols-1 max-[560px]:gap-y-4">
              {figures.map((f) => (
                <div key={f.label}>
                  <dt className="figure whitespace-nowrap">{f.value}</dt>
                  <dd className="mt-1 max-w-[18ch] text-[13px] leading-[1.45] text-ink-muted">{f.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
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
