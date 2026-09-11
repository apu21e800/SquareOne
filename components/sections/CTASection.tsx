import Image from "next/image"
import Link from "next/link"

/**
 * Closing CTA band. v2: no dark surface here — Footer owns the single slate
 * close on every page, so this sits on warm.
 */
export default function CTASection() {
  return (
    <section className="section border-t border-[color:var(--hairline)] bg-surface-warm">
      <div className="container-1280">
        <div className="grid grid-cols-1 gap-10 min-[901px]:grid-cols-2 min-[901px]:items-center min-[901px]:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-stone min-[901px]:aspect-auto min-[901px]:min-h-[520px]">
            <Image
              src="/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg"
              alt="Decorative pavement plaza at dusk"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover"
            />
            <div aria-hidden className="scrim" />
            <div className="caption">SkyTrain plaza &middot; Metro Vancouver</div>
          </div>

          <div>
            <div className="eyebrow">Ready to start</div>

            <h2 className="stop mt-5">Let&apos;s build something worth looking at</h2>

            <p className="mt-6 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body">
              Municipal crosswalk, commercial plaza, or your own driveway
              &mdash; we bring 25 years of BC expertise to every square metre.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Request a quote
              </Link>
              <Link href="/contact" className="btn-secondary">
                Book a site visit
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--hairline)] pt-7">
              <span className="label">Or call us directly</span>
              <a
                href="tel:+16044669902"
                className="text-[17px] font-semibold tracking-[-0.01em] text-ink"
              >
                604-466-9902
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
