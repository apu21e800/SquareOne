import Link from "next/link"
import { WORK_APPS } from "@/lib/work"
import { fitVars } from "@/lib/type"

/**
 * Editorial statement band — the page inhaling. On slate from 5 Sept; back
 * on warm paper 19 Sept 2026 (Vern: "too much dark mode overall").
 *
 * 18 Sept 2026, the client: "quite often we work for a contractor who is
 * hired by the cities and/or these corporations so we have to remove this
 * section before I confirm who we have actually worked for." The names are
 * out until she confirms the list (lib/clients.ts keeps it). In their place,
 * the index the band was always for: the ten kinds of work, each a link to
 * its gallery — which is what Jan shows clients. Swapping the names back is
 * one import.
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §9.8a): the statement in Futura
 * sentence case without the orange full stop; "Since 2000" in the margin
 * voice; the list stays.
 */
export default function EditorialBand({ statement = "Twenty-five years on BC ground" }: { statement?: string }) {
  return (
    <section className="sec relative overflow-hidden bg-surface-warm py-[6.5rem] max-[700px]:py-14">
      <div className="container-1280 relative z-[1]">
        <div className="grid grid-cols-12 items-start gap-x-14 gap-y-12 max-[900px]:grid-cols-1">
          <div className="col-span-5 max-[900px]:col-span-1">
            <span className="label">Since 2000</span>
            <div className="fit-host mt-6">
              <p
                data-reveal
                className="display-statement display-fit m-0 [text-wrap:balance]"
                style={fitVars(statement, { max: "3.5rem", pref: "3.6vw" })}
              >
                {/* A hyphenated word never splits at its hyphen — "Twenty-" /
                    "five" read as a typo when balance chose that break. */}
                {statement.split(" ").map((word, i, all) => (
                  <span key={i} className={word.includes("-") ? "whitespace-nowrap" : undefined}>
                    {word}
                    {i < all.length - 1 ? " " : ""}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="col-span-7 max-[900px]:col-span-1">
            <span className="label">The work</span>
            {/* Three columns from 700px, four rows — matches the statement's
                height, so the band reads as one composition. */}
            <ul className="mt-4 grid grid-cols-3 gap-x-8 max-[700px]:grid-cols-2">
              {WORK_APPS.map((app) => (
                <li key={app.slug} className="border-t border-hairline text-[16px] leading-[1.4]">
                  <Link
                    href={app.slug === "driveways" ? "/driveways#gallery" : `/applications/${app.slug}`}
                    className="block py-[11px] text-ink-body transition-colors hover:text-ink"
                  >
                    {app.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[14.5px] italic leading-[1.6] text-ink-muted">
              Ten kinds of work across the Lower Mainland and Vancouver Island, each with its own gallery.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
