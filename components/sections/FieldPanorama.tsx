import Image from "next/image"

/**
 * Field panorama — MOVE 2 of docs/SOUL-PASS.md.
 * One full-bleed image band, ~55vh, no parallax — just the ground.
 * Caption only. Second and last full-bleed breath on the page.
 */
const PANORAMA = {
  src: "/images/hero/victoria-ellis-point-walkway-streetprint.jpg",
  alt: "Cobblestone-stamped asphalt walkway at Ellis Point, Victoria, low to the surface",
  caption: "Victoria · StreetPrint",
} as const

export default function FieldPanorama() {
  return (
    <section className="relative h-[55vh] min-h-[380px] overflow-hidden bg-surface-stone">
      <Image
        src={PANORAMA.src}
        alt={PANORAMA.alt}
        fill
        sizes="100vw"
        className="object-cover [object-position:center_68%]"
      />
      <div aria-hidden="true" className="scrim scrim-light" />
      <div className="caption caption-right">{PANORAMA.caption}</div>
    </section>
  )
}
