import Link from "next/link"
import BeforeAfter from "@/components/BeforeAfter"

/**
 * Vapour blasting on the home page — its own band, 19 Sept 2026 (Vern: "give
 * vapour blasting its own cool section on the homepage"). Until now the
 * supporting trade was the fourth card in What we do and the tenth row of
 * the applications index. This is the one thing on the home page a visitor
 * can do with their hands: the graffiti wipe from the service page, on the
 * slate, with the argument beside it.
 *
 * The two frames are the service page's illustrations (generated/, `gen-`
 * prefix): a demonstration, captioned as one, never a place. Every claim in
 * the copy is the service page's own — wet abrasive, dust on the ground, no
 * damage to the surface, mobile, two regions.
 */
const GEN = "/images/services/vapor-blasting/generated"

export default function VapourBand() {
  return (
    <section className="relative overflow-hidden bg-surface-slate py-[7rem] max-[900px]:py-16">
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
          />
          <p className="mt-4 text-[13px] tracking-[0.02em] text-[color:var(--ink-on-slate-muted)]">
            Demonstration &middot; aerosol graffiti off face brick &middot; drag the line
          </p>
        </div>

        {/* ── The argument ──────── */}
        <div className="col-span-5 max-[900px]:col-span-1">
          <p className="eyebrow eyebrow-on-image">
            <span className="eyebrow-num">06</span>Vapour blasting
          </p>
          <h2 className="mt-5 max-w-[16ch] text-white [text-wrap:balance]">
            Graffiti and old markings, lifted wet
          </h2>
          <p className="mt-6 max-w-[44ch] text-[17px] leading-[1.65] text-[color:var(--ink-on-slate-body)] [text-wrap:pretty]">
            The abrasive travels in water, so the paint comes off and the dust stays on the
            ground &mdash; no dust cloud, no chemical residue, and the brick, stone, concrete or
            steel underneath is left as it was. One mobile rig, both regions: graffiti, mould,
            paint, road markings, and the priming before a coating goes down.
          </p>
          <ul className="mt-8 flex flex-col gap-3 border-t pt-7" style={{ borderColor: "var(--hairline-slate)" }}>
            {[
              ["Graffiti", "off brick, stone, concrete and steel"],
              ["Markings", "old lines and legends off asphalt and concrete"],
              ["Surface prep", "cleaned and primed before a coating"],
            ].map(([k, v]) => (
              <li key={k} className="grid grid-cols-[120px_1fr] gap-x-4 text-[15px] leading-[1.5] max-[420px]:grid-cols-1">
                <span className="font-semibold text-white">{k}</span>
                <span className="text-[color:var(--ink-on-slate-muted)]">{v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link href="/services/vapor-blasting" className="btn-on-image">
              The vapour blasting service
            </Link>
            <a href="tel:+16046126209" className="arrow-link text-white hover:text-[color:var(--accent)]">
              604-612-6209 <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
