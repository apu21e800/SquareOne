import Image from "next/image"
import Link from "next/link"

/* v2: a single still frame. The rotating deck, cross-fade, ken-burns and
   autoplay timer are gone — this is now a plain one-image hero that keeps
   the original export name and (empty) prop signature so any page still
   importing it keeps resolving. */
const SLIDE = {
  image: "/images/products/streetbond/streetbond-multicolour-plaza-green-circles-01.jpg",
  alt: "Circle of Life StreetBond forecourt at Langley Events Centre",
  caption: "Langley · StreetBond · 2024",
  eyebrow: "Municipal & civic",
  headline: "Where streets become civic landmarks",
  body:
    "Decorative crosswalks, roundabouts and plazas that define community identity — and last 20+ years in BC's climate.",
  cta1: { label: "See Projects", href: "/projects" },
  cta2: { label: "Request Spec Sheet", href: "/contact" },
} as const

export default function HeroSlideshow() {
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
        <div className="relative z-[1]">
          <div className="eyebrow">{SLIDE.eyebrow}</div>

          <h1 className="stop mt-7">{SLIDE.headline}</h1>

          <p className="mt-7 max-w-[56ch] text-[19px] leading-[1.65] text-[var(--ink-body)] [text-wrap:pretty] max-[700px]:text-[17px]">
            {SLIDE.body}
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-[14px]">
            <Link href={SLIDE.cta1.href} className="btn-primary">
              {SLIDE.cta1.label}
            </Link>
            <Link href={SLIDE.cta2.href} className="btn-secondary">
              {SLIDE.cta2.label}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Right cell ────────────────────────────────────────── */}
      <div className="relative min-w-0 overflow-hidden bg-[var(--surface-stone)] max-[700px]:aspect-[4/3]">
        <Image
          src={SLIDE.image}
          alt={SLIDE.alt}
          fill
          priority
          sizes="(max-width: 700px) 100vw, 45vw"
          className="object-cover [object-position:center_70%]"
        />
        <div aria-hidden="true" className="scrim scrim-light" />
        <div className="caption">{SLIDE.caption}</div>
      </div>
    </section>
  )
}
