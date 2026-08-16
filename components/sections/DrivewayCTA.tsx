import Image from "next/image"
import Link from "next/link"

const benefits = [
  {
    title: "Lasting 20+ Years",
    desc: "Engineered for BC's freeze-thaw cycles. Sealed, protected, and built to outlast basic asphalt.",
  },
  {
    title: "Custom Patterns & Colours",
    desc: "Choose from brick, cobblestone, slate, and more — in dozens of colours matched to your home.",
  },
  {
    title: "Applied in a Single Day",
    desc: "Most residential driveways are complete in one day with minimal disruption to your property.",
  },
]

export default function DrivewayCTA() {
  return (
    <section className="section border-t border-[color:var(--hairline)] bg-surface-warm">
      <div className="container-1280">
        <div className="grid grid-cols-1 gap-10 min-[901px]:grid-cols-2 min-[901px]:items-center min-[901px]:gap-16">
          <div>
            <div className="eyebrow">Residential &amp; strata</div>

            <h2 className="stop mt-5">Decorative driveways done right</h2>

            <p className="mt-6 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body">
              Square One is BC&apos;s most experienced decorative driveway installer. Stamped
              asphalt and StreetBond coatings that transform your home&apos;s first impression
              &mdash; and hold up for decades.
            </p>

            <ul className="mt-9 border-t border-[color:var(--hairline)]">
              {benefits.map((benefit) => (
                <li key={benefit.title} className="border-b border-[color:var(--hairline)] py-5">
                  <h3>{benefit.title}</h3>
                  <p className="mt-[6px] text-[15px] leading-[1.55] text-ink-body">
                    {benefit.desc}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Get a free driveway quote
              </Link>
              <Link href="/driveways" className="btn-secondary">
                See driveway options
              </Link>
            </div>
          </div>

          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-stone">
              <Image
                src="/images/products/streetbond/streetbond-1.jpg"
                alt="Decorative StreetBond driveway installation by Square One Paving"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover"
              />
              <div aria-hidden className="scrim" />
              <div className="caption">StreetBond driveway coating</div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[color:var(--hairline)] pt-8">
              <div>
                <div className="stat-num">25+</div>
                <div className="label mt-3">years installing</div>
              </div>
              <div>
                <div className="stat-num">1 day</div>
                <div className="label mt-3">typical residential install</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
