import Image from "next/image"
import Link from "next/link"

const features: string[] = [
  "Driveways & estate exteriors",
  "Graffiti & storefront refresh",
  "Heritage stone restoration",
  "Industrial steel & marine",
  "Pre-coating substrate prep",
  "Parking-lot stripe removal",
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
              Dustless abrasive blasting &mdash; water and recycled glass at calibrated pressure.
              We strip decades of grime, graffiti, and oxidation without silica dust, surface
              scarring, or harsh chemicals. Mobile across BC, specified by municipalities since
              2000.
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
                &lt; 5% airborne dust &middot; water + recycled glass
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-warm min-[901px]:aspect-auto min-[901px]:min-h-[560px]">
            <Image
              src="/images/products/streetbond/streetbond-cobble-macro-surface-01.jpg"
              alt="Mobile surface restoration substrate — Square One Paving"
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              className="object-cover"
            />
            <div aria-hidden className="scrim" />
            <div className="caption">Mobile across BC</div>
          </div>
        </div>
      </div>
    </section>
  )
}
