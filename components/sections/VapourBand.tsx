import Link from "next/link"
import Frame from "@/components/ui/Frame"

/**
 * Vapour blasting on the home page — its own band, 19 Sept 2026 (Vern: "give
 * vapour blasting its own cool section on the homepage").
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §9.9): restyled on the new
 * primitives, with the graffiti wipe from the service page beside the
 * argument.
 *
 * 2 Oct 2026 (Vern: "use the vapor blasting pic of the sunny day with the
 * Burrard Street Bridge in the background"): the wipe gives way to that
 * photograph, Square One on the Granville Island boardwalk with the bridge
 * behind, the sunlit copy of the frame the service page opens on. One
 * photograph, the argument beside it, on the darker grey band.
 */
const GEN = "/images/services/vapor-blasting/generated"

const GRANVILLE = {
  src: `${GEN}/gen-granville-island-vapour-blasting-01-enhanced.jpg`,
  alt: "A Square One operator vapour blasting a painted marking off the boardwalk at Granville Island, Vancouver, the Burrard Street Bridge behind under a clear sky",
  caption: "Granville Island, Vancouver · marking removal",
}

export default function VapourBand() {
  return (
    <section className="sec relative overflow-hidden bg-surface-stone py-[6.5rem] max-[900px]:py-14">
      <div className="container-1280 relative z-[1] grid grid-cols-12 items-center gap-x-14 gap-y-12 max-[900px]:grid-cols-1">
        {/* ── The photograph ──────── */}
        <div className="col-span-7 max-[900px]:col-span-1">
          <Frame
            src={GRANVILLE.src}
            alt={GRANVILLE.alt}
            caption={GRANVILLE.caption}
            aspect="aspect-[16/10] max-[700px]:aspect-[4/3]"
            sizes="(max-width: 900px) 100vw, 720px"
            position="center 55%"
            href="/services/vapor-blasting"
          />
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
            <Link href="/services/vapor-blasting" className="btn-primary">
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
