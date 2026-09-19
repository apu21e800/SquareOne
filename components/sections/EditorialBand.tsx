import Link from "next/link"
import { WORK_APPS } from "@/lib/work"
import { fitVars } from "@/lib/type"

/**
 * Editorial statement band — the page inhaling, now on slate.
 *
 * 5 Sept 2026 (Vern: "everything is very white"; "selected clients is very
 * boring — weave that in somehow else"): the one display line moves onto
 * the site's slate, and the client names come with it as a quiet index in
 * the right-hand column. This is the page's one dark band above the close;
 * it is never adjacent to another dark band. No button, no image.
 *
 * 17 Sept 2026: the statement was set at band scale — 39px against a
 * twelve-name list — so it read as a caption beside a table and left the
 * left half of a dark band empty. It is the only editorial line on the home
 * page and it now takes the size that implies, fitted to its column so a
 * longer statement still lands on two lines (lib/type.ts), and the two
 * columns swap weight — 5 for the statement, 7 for the names in three
 * columns — so the band is one composition rather than two unequal halves.
 *
 * 18 Sept 2026, the client: "quite often we work for a contractor who is
 * hired by the cities and/or these corporations so we have to remove this
 * section before I confirm who we have actually worked for. Maybe we should
 * just say 'installed at' vs 'Installed for'?" Her word, taken: the label is
 * "Installed at" and the caption claims the ground and not the contract —
 * the sites carry the work, whoever held the paper. If she still wants the
 * band gone after seeing it, it is one component and comes out clean.
 *
 * 19 Sept 2026: she does — "we have to remove this section before I confirm
 * who we have actually worked for." The names are out until she confirms
 * the list (lib/clients.ts keeps it). In their place, the index the band was
 * always for: the ten kinds of work, each a link to its gallery — which is
 * what Jan shows clients. Swapping the names back is one import.
 */
export default function EditorialBand({ statement = "Twenty-five years on BC ground" }: { statement?: string }) {
  return (
    <section className="relative overflow-hidden bg-surface-slate py-[6.5rem] max-[700px]:py-16">
      <div className="container-1280 relative z-[1]">
        <div className="grid grid-cols-12 items-start gap-x-14 gap-y-12 max-[900px]:grid-cols-1">
          <div className="col-span-5 max-[900px]:col-span-1">
            <div className="eyebrow eyebrow-on-image">Since 2000</div>
            <div className="fit-host mt-7">
              <p
                data-reveal
                className="display-statement display-fit stop m-0 text-white [text-wrap:balance]"
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
            <div className="label label-on-slate">The work</div>
            {/* Three columns from 700px, four rows — matches the statement's
                height, so the band reads as one composition. */}
            <ul className="mt-4 grid grid-cols-3 gap-x-8 max-[700px]:grid-cols-2">
              {WORK_APPS.map((app) => (
                <li
                  key={app.slug}
                  className="border-t text-[15px] font-medium leading-[1.4]"
                  style={{ borderColor: "var(--hairline-slate)" }}
                >
                  <Link
                    href={app.slug === "driveways" ? "/driveways#gallery" : `/applications/${app.slug}`}
                    className="block py-[11px] text-[color:var(--ink-on-slate-body)] transition-colors hover:text-white"
                  >
                    {app.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] leading-[1.6] text-[color:var(--ink-on-slate-muted)]">
              Ten kinds of work across the Lower Mainland and Vancouver Island, each with its own gallery.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
