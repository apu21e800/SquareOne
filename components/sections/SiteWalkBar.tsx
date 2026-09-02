import Link from "next/link"

/**
 * Site-walk bar — the conversion close, done the S1 way: one slim white
 * band between the client names and the field notes. Every claim here is
 * already established elsewhere on the site (free site visit on /driveways
 * and /contact; written quote ditto) — nothing new is promised. Accent budget in-viewport: eyebrow square + primary button.
 */
export default function SiteWalkBar() {
  return (
    <section className="border-t border-hairline bg-surface py-14 max-[700px]:py-10">
      <div className="container-1280 flex flex-wrap items-center justify-between gap-x-12 gap-y-7">
        <div>
          <p className="eyebrow">Free site walk</p>

          <h2 className="mt-4 max-w-[26ch] text-pretty">
            Send a photo of your surface and we will come back with a written quote
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-[14px]">
          <Link href="/contact" className="btn-primary">
            Request a quote
          </Link>
          <a href="tel:+16044669902" className="btn-secondary">
            604-466-9902
          </a>
        </div>
      </div>
    </section>
  )
}
