import Link from "next/link"
import Frame from "@/components/ui/Frame"
import BeforeAfter from "@/components/BeforeAfter"

/**
 * Vapour blasting on the home page — its own band, 19 Sept 2026 (Vern: "give
 * vapour blasting its own cool section on the homepage"). The one thing on
 * the home page a visitor can do with their hands: the graffiti wipe from
 * the service page, on a water-tinted band, with the argument beside it.
 * The blue is the trade's own accent (refine.css "Water"); the orange stays
 * for pavement.
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §9.9): restyled on the new
 * primitives. The two wipe frames are generated (generated/, `gen-`
 * prefix): a demonstration with no person in it, captioned as one. The
 * three frames under it are Square One's own photographs.
 */
const DIR = "/images/services/vapor-blasting"
const GEN = `${DIR}/generated`

/** Under the wipe: Square One's own vapour blasting photographs from the
    record (28 Sept 2026: the AI illustrations of one operator on six city
    backdrops came off; the client was put off by the repeats). The Granville
    Island photograph leads the "What we do" card above, so it is not here. */
const STRIP = [
  { src: `${DIR}/parking-lot-vapour-blasting-01.jpg`, alt: "Square One removing painted parking symbols from an asphalt lot with the vapour blasting rig", caption: "Parking lot · markings", position: "center 45%" },
  { src: `${DIR}/walkway-vapour-blasting-01.jpg`, alt: "Square One stripping a red coating from a public walkway with the vapour blasting rig", caption: "Walkway · coating", position: "center 50%" },
  { src: `${DIR}/nozzle-pavers-01.jpg`, alt: "The vapour blasting nozzle mid-pass over pavers, the wet fan of abrasive and the clean line behind it", caption: "Pavers · mid-pass", position: "center 50%" },
]

export default function VapourBand() {
  return (
    <section className="band-water sec relative overflow-hidden py-[6.5rem] max-[900px]:py-14">
      <div className="container-1280 relative z-[1] grid grid-cols-12 items-center gap-x-14 gap-y-12 max-[900px]:grid-cols-1">
        {/* ── The wipe ──────── */}
        <div className="col-span-7 max-[900px]:col-span-1">
          <BeforeAfter
            className="aspect-[16/10] max-[700px]:aspect-[4/3]"
            before={{
              src: `${GEN}/gen-brick-graffiti-before.jpg`,
              alt: "A face-brick wall covered in aerosol graffiti tags, before vapour blasting",
            }}
            after={{
              src: `${GEN}/gen-brick-graffiti-after.jpg`,
              alt: "The same face-brick wall after vapour blasting, clean brick, mortar joints intact",
            }}
            sizes="(max-width: 900px) 100vw, 720px"
            tone="water"
          />
          <p className="cap">Demonstration &middot; aerosol graffiti off face brick &middot; drag the line</p>

        </div>

        {/* ── The argument ──────── */}
        <div className="col-span-5 max-[900px]:col-span-1">
          <span className="label">Vapour blasting</span>
          <h2 className="mt-4 max-w-[16ch] [text-wrap:balance]">Graffiti and old markings, <em>lifted wet</em></h2>
          <p className="mt-6 max-w-[40ch] text-ink-body [text-wrap:pretty]">
            The abrasive travels in water: the paint comes off, the dust stays down, and the
            surface underneath is left as it was.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link href="/services/vapor-blasting" className="btn-primary btn-water">
              The vapour blasting service
            </Link>
            <a href="tel:+16046126209" className="link">
              604-612-6209
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
