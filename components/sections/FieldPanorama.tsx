import Image from "next/image"
import Link from "next/link"

/**
 * Field panorama — MOVE 2 of docs/SOUL-PASS.md, retuned for the First-Draft
 * Pass: the second breath now carries the vapour-blasting service (client
 * push, 31 Aug 2026). Still one full-bleed band, ~55vh, no parallax — the
 * ground plus one whispered line. Real S1 work at Granville Island.
 */
const PANORAMA = {
  src: "/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg",
  alt: "Square One crew vapour blasting pavement at Granville Island, Vancouver",
  caption: "Granville Island · Vapour blasting",
} as const

export default function FieldPanorama() {
  return (
    <section className="relative h-[55vh] min-h-[380px] overflow-hidden bg-surface-stone">
      <Image
        src={PANORAMA.src}
        alt={PANORAMA.alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden="true" className="scrim" />
      <div className="absolute inset-x-0 bottom-0 z-[1]">
        <div className="container-1280 pb-10">
          <p className="eyebrow eyebrow-on-image">Mobile vapour blasting</p>
          <Link
            href="/vapor-blasting"
            className="arrow-link mt-3 inline-block text-white hover:text-white"
          >
            Surface restoration, Lower Mainland to the Island{" "}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
      <div className="caption caption-right z-[1]">{PANORAMA.caption}</div>
    </section>
  )
}
