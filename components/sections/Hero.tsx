import Image from "next/image"
import Link from "next/link"

/* Full-bleed single-photograph hero — MOVE 1 of docs/SOUL-PASS.md.
   The photograph is S1's own frame (not shared with hubss.com): the
   TrafficPatternsXD crosswalk at the White Rock Pier approach, 2019.
   Eyebrow → headline → CTAs over a rising slate scrim; caption bottom-right.
   The 55/45 split layout this replaced lives on at /driveways. */
const HERO_IMAGE = {
  src: "/images/hero/white-rock-pier-crosswalk-trafficpatternsxd.jpg",
  alt: "Red TrafficPatternsXD crosswalk leading to the White Rock Pier, Semiahmoo Bay at low tide beyond",
  caption: "White Rock · TrafficPatternsXD · 2019",
} as const

export default function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[560px] overflow-hidden bg-surface-slate supports-[height:92svh]:h-[92svh]">
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover [object-position:center_62%]"
      />

      {/* Rising slate scrim — keeps the headline legible, lets the surface speak above it */}
      <div aria-hidden="true" className="scrim-rise" />

      {/* ── Headline block, bottom-left ───────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 z-[1]">
        <div className="container-1280 pb-[72px] max-[700px]:pb-16">
          <div className="eyebrow eyebrow-on-image">
            BC&rsquo;s decorative pavement studio &middot; Since 2000
          </div>

          <h1 className="display-xl stop mt-6 max-w-[15ch] text-white [text-wrap:balance]">
            Surfaces that define a place
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-[14px]">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
            <Link href="/projects" className="btn-on-image">
              See our work
            </Link>
          </div>
        </div>
      </div>

      {/* ── Caption, bottom-right ─────────────────────────────── */}
      <div className="caption caption-right z-[1] max-[700px]:hidden">{HERO_IMAGE.caption}</div>

      {/* ── Quiet scroll cue ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 z-[1] h-9 w-px -translate-x-1/2 bg-white/40 max-[900px]:hidden"
      />
    </section>
  )
}
