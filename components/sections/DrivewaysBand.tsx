import Image from "next/image"
import Link from "next/link"

const stats: { value: string; label: string }[] = [
  { value: "8+", label: "year service life" },
  { value: "60%", label: "cost vs. concrete pavers" },
  { value: "1 wk", label: "typical install" },
]

export default function DrivewaysBand() {
  return (
    <section className="section border-t border-[color:var(--hairline)] bg-surface">
      <div className="container-1280">
        <div className="grid grid-cols-1 gap-10 min-[901px]:grid-cols-2 min-[901px]:items-center min-[901px]:gap-16">
          <div className="min-[901px]:order-2 relative aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-stone min-[901px]:aspect-auto min-[901px]:min-h-[560px]">
            <Image
              src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
              alt="Decorative stamped asphalt driveway by Square One Paving"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover"
            />
            <div aria-hidden className="scrim" />
            <div className="caption">Custom medallion driveway &middot; Vancouver Island estate</div>
          </div>

          <div className="min-[901px]:order-1">
            <div className="eyebrow">Driveways &amp; estates</div>

            <h2 className="stop mt-5">Your driveway, reimagined</h2>

            <p className="mt-6 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body">
              From stamped asphalt that echoes the architecture of your home to vapour-blasted
              surfaces ready for fresh coating &mdash; we bring the same municipal-grade precision
              to residential projects across Metro Vancouver and Vancouver Island.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[color:var(--hairline)] pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="stat-num">{stat.value}</div>
                  <div className="label mt-3">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/driveways" className="btn-primary">
                See driveway projects
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get a quote
              </Link>
            </div>

            <p className="mt-7 text-[15px] leading-[1.55] text-ink-muted">
              Metro Vancouver &middot; Victoria &middot; Vancouver Island
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
