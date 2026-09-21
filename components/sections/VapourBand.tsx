import Link from "next/link"
import Image from "next/image"
import BeforeAfter from "@/components/BeforeAfter"

/**
 * Vapour blasting on the home page — its own band, 19 Sept 2026 (Vern: "give
 * vapour blasting its own cool section on the homepage"). Until now the
 * supporting trade was the fourth card in What we do and the tenth row of
 * the applications index. This is the one thing on the home page a visitor
 * can do with their hands: the graffiti wipe from the service page, on
 * a water-tinted band (light — Vern, 19 Sept: "too much dark mode"; then
 * "add some blue accent to the vapour blasting section"), with the
 * argument beside it. The blue is the trade's own accent (refine.css
 * "Water"); the orange stays for pavement.
 *
 * The two frames are the service page's illustrations (generated/, `gen-`
 * prefix): a demonstration, captioned as one, never a place. Every claim in
 * the copy is the service page's own — wet abrasive, dust on the ground, no
 * damage to the surface, mobile, two regions.
 */
const GEN = "/images/services/vapor-blasting/generated"

/** Three more illustrations of the service under the wipe (Vern, 19 Sept:
    "add these images to the vapour blasting page, and sections"). Captioned
    by task and surface — never a place. */
const STRIP = [
  { src: `${GEN}/gen-sidewalk-concrete-cleaning.jpg`, alt: "Cleaning a concrete sidewalk beside a stone monument with the vapour blasting rig", caption: "Sidewalk · concrete", position: "center 60%" },
  { src: `${GEN}/gen-concrete-pier-graffiti.jpg`, alt: "Vapour blasting graffiti off a cast-concrete bridge pier", caption: "Graffiti · concrete", position: "center 55%" },
  { src: `${GEN}/gen-road-marking-removal-02.jpg`, alt: "Vapour blasting a painted line off wet asphalt", caption: "Line removal · asphalt", position: "center 60%" },
]

export default function VapourBand() {
  return (
    <section className="band-water relative overflow-hidden border-t py-[7rem] max-[900px]:py-16">
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
              alt: "The same face-brick wall after vapour blasting — clean brick, mortar joints intact",
            }}
            sizes="(max-width: 900px) 100vw, 720px"
            tone="water"
          />
          <p className="mt-4 text-[13px] tracking-[0.02em] text-ink-muted">
            Demonstration &middot; aerosol graffiti off face brick &middot; drag the line
          </p>

          <ul className="mt-5 grid grid-cols-3 gap-4 max-[560px]:gap-3">
            {STRIP.map((frame) => (
              <li key={frame.src}>
                <Link
                  href="/services/vapor-blasting#gallery"
                  className="thumb group relative block aspect-[3/2] overflow-hidden rounded-[2px] bg-surface-stone"
                  aria-label={`${frame.caption} — the vapour blasting gallery`}
                >
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(max-width: 900px) 33vw, 230px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: frame.position }}
                  />
                  <span aria-hidden="true" className="scrim scrim-light" />
                  <span className="caption max-[560px]:hidden">{frame.caption}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── The argument ──────── */}
        <div className="col-span-5 max-[900px]:col-span-1">
          <p className="eyebrow eyebrow-water">
            <span className="eyebrow-num">06</span>Vapour blasting
          </p>
          <h2 className="mt-5 max-w-[16ch] [text-wrap:balance]">
            Graffiti and old markings, lifted wet
          </h2>
          <p className="mt-6 max-w-[44ch] text-[17px] leading-[1.65] text-ink-body [text-wrap:pretty]">
            The abrasive travels in water, so the paint comes off and the dust stays on the
            ground &mdash; no dust cloud, no chemical residue, and the brick, stone, concrete or
            steel underneath is left as it was. One mobile rig, both regions: graffiti, mould,
            paint, road markings, and the priming before a coating goes down.
          </p>
          <ul className="mt-8 flex flex-col gap-3 border-t pt-7" style={{ borderColor: "var(--water-hairline)" }}>
            {[
              ["Graffiti", "off brick, stone, concrete and steel"],
              ["Markings", "old lines and legends off asphalt and concrete"],
              ["Surface prep", "cleaned and primed before a coating"],
            ].map(([k, v]) => (
              <li key={k} className="grid grid-cols-[120px_1fr] gap-x-4 text-[15px] leading-[1.5] max-[420px]:grid-cols-1">
                <span className="font-semibold text-water">{k}</span>
                <span className="text-ink-muted">{v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link href="/services/vapor-blasting" className="btn-primary btn-water">
              The vapour blasting service
            </Link>
            <a href="tel:+16046126209" className="arrow-link">
              604-612-6209 <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
