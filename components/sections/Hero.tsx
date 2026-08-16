import Image from "next/image"
import Link from "next/link"

/* Single still photograph — no ken-burns, no cross-fade, no autoplay.
   Section 01 of docs/design-v2/Square One Homepage.dc.html */
const HERO_IMAGE = {
  src: "/images/S1_update_v2/photos/Featured image options/UBC-crosswalk-3-300dpi.jpg",
  alt: "UBC × Musqueam crosswalk by Square One Paving",
  caption: "Vancouver · TrafficPatterns · 2025",
} as const

export default function Hero() {
  return (
    <section className="relative grid min-h-[620px] grid-cols-[55fr_45fr] overflow-hidden bg-[var(--surface)] max-[700px]:min-h-0 max-[700px]:grid-cols-1">
      {/* ── Left cell ─────────────────────────────────────────── */}
      <div
        className="
          relative flex items-center
          pt-24 pb-24 pr-[72px] pl-[max(calc((100vw_-_1280px)/2),40px)]
          max-[700px]:pt-[72px] max-[700px]:pr-6 max-[700px]:pb-14 max-[700px]:pl-6
        "
      >
        <div aria-hidden="true" className="ghost-index top-24 right-2">
          01
        </div>

        <div className="relative z-[1]">
          <div className="eyebrow">BC&rsquo;s decorative pavement studio &middot; Since 2000</div>

          <h1 className="stop mt-7">Surfaces that define a place</h1>

          <p className="mt-7 max-w-[56ch] text-[19px] leading-[1.65] text-[var(--ink-body)] [text-wrap:pretty] max-[700px]:text-[17px]">
            Stamped asphalt, decorative coatings and preformed thermoplastic, installed by the
            same crews across 51 British Columbia communities.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-[14px]">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
            <Link href="/projects" className="btn-secondary">
              See our work
            </Link>
          </div>
        </div>
      </div>

      {/* ── Right cell ────────────────────────────────────────── */}
      <div className="relative min-w-0 overflow-hidden bg-[var(--surface-stone)] max-[700px]:aspect-[4/3]">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="(max-width: 700px) 100vw, 45vw"
          className="object-cover [object-position:center_70%]"
        />
        <div aria-hidden="true" className="scrim scrim-light" />
        <div className="caption">{HERO_IMAGE.caption}</div>
      </div>
    </section>
  )
}
