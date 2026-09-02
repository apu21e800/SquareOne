import Image from "next/image"
import Link from "next/link"

const features: string[] = [
  "Graffiti, gum, mould & soot removal",
  "Road marking removal",
  "Steel & concrete surface preparation",
  "Paint & stain removal",
  "Brick & patio cleaning",
  "Marine coating removal",
]

/**
 * Route and slug stay "vapor-blasting"; prose reads "vapour blasting".
 * v2: formerly a dark band — lightened to stone, the slate close is Footer's.
 */
export default function VaporBlastingBand() {
  return (
    <section className="section border-t border-[color:var(--hairline)] bg-surface-stone">
      <div className="container-1280">
        <div className="grid grid-cols-1 gap-10 min-[901px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] min-[901px]:items-center min-[901px]:gap-16">
          <div>
            <div className="eyebrow">Mobile surface restoration</div>

            <h2 className="stop mt-5">The cleanest way to restore a surface</h2>

            <p className="mt-6 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body">
              A powerful, portable blasting solution for surface prep &mdash; less water, up to
              92% less dust, little to no heat and less environmental impact than the
              alternatives, while getting the job done faster. The same rig primes the surfaces
              we coat ourselves.
            </p>

            <ul className="mt-9 grid grid-cols-1 border-t border-[color:var(--hairline)] min-[521px]:grid-cols-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="border-b border-[color:var(--hairline)] py-3.5 text-[15px] leading-[1.55] text-ink-body min-[521px]:odd:pr-6 min-[521px]:even:pl-6 min-[521px]:even:border-l"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/services/vapor-blasting" className="btn-primary">
                Explore vapour blasting
              </Link>
              <span className="label">
                Up to 92% less dust &middot; Lower Mainland &amp; Vancouver Island
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-warm min-[901px]:aspect-auto min-[901px]:min-h-[560px]">
            <Image
              src="/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg"
              alt="Square One crew vapour blasting brick at Granville Island, Vancouver"
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              className="object-cover"
            />
            <div aria-hidden className="scrim" />
            <div className="caption">Granville Island &middot; brick</div>
          </div>
        </div>
      </div>
    </section>
  )
}
