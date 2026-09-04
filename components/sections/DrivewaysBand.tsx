import Image from "next/image"
import Link from "next/link"

/* Home — the residential line, after the commercial applications (business
   hierarchy canon: commercial first, driveways second). Every figure is
   published: StreetPrint's 10–20 year municipal service life (hubss.com),
   Square One installing since 2000, two regions on two phone lines. The
   photograph is a Square One driveway from the record. */

const stats: { value: string; label: string }[] = [
  { value: "10–20", label: "years — StreetPrint's published service life" },
  { value: "25+", label: "years installing driveways across BC" },
  { value: "2", label: "regions, one crew — Metro Vancouver and Greater Victoria" },
]

export default function DrivewaysBand() {
  return (
    <section className="section border-t border-[color:var(--hairline)] bg-surface">
      <div className="container-1280">
        <div className="grid grid-cols-1 gap-10 min-[901px]:grid-cols-2 min-[901px]:items-center min-[901px]:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-stone min-[901px]:order-2 min-[901px]:aspect-auto min-[901px]:min-h-[560px]">
            <Image
              src="/images/applications/driveways/victoria-offset-brick-ashlar-driveway-streetprint-01.jpg"
              alt="Offset brick and ashlar slate StreetPrint driveway in Victoria, installed by Square One"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover"
            />
            <div aria-hidden className="scrim scrim-light" />
            <div className="caption">Victoria &middot; StreetPrint &middot; Offset brick on ashlar slate</div>
          </div>

          <div className="min-[901px]:order-1">
            <div className="eyebrow">Driveways &middot; Vancouver &amp; Victoria</div>

            <h2 className="stop mt-5 max-w-[18ch] [text-wrap:balance] max-[600px]:max-w-none">
              The driveway you already have, made to look like stone
            </h2>

            <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.7] text-ink-body [text-wrap:pretty]">
              StreetPrint patterns pressed into your existing asphalt and sealed in StreetBond
              colour &mdash; one continuous surface, with no joints to heave and nothing for weeds
              to take hold in. Installed by the same crews that do our municipal work, on both
              sides of the Strait.
            </p>

            {/* Three figures: a row of numerals on wide screens; on a phone each
                becomes a hairline row — numeral left, its line right — so the
                long labels never stack four deep. */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[color:var(--hairline)] pt-8 max-[560px]:grid-cols-1 max-[560px]:gap-0 max-[560px]:pt-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="max-[560px]:flex max-[560px]:items-baseline max-[560px]:gap-5 max-[560px]:border-b max-[560px]:border-[color:var(--hairline)] max-[560px]:py-4"
                >
                  <div className="stat-num whitespace-nowrap max-[560px]:w-[124px] max-[560px]:shrink-0 max-[560px]:text-[36px]">{stat.value}</div>
                  <div className="label mt-3 max-w-[18ch] leading-[1.5] max-[560px]:mt-0 max-[560px]:max-w-none">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 max-[560px]:gap-x-8">
              <Link href="/driveways" className="btn-primary">
                Driveways
              </Link>
              <Link href="/driveways/vancouver" className="arrow-link">
                Vancouver <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/driveways/victoria" className="arrow-link">
                Victoria <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <p className="mt-7 text-[14px] leading-[1.6] text-ink-muted">
              Site visit and written quote &middot; 604-466-9902 Lower Mainland &middot; 250-391-0270 Vancouver Island
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
