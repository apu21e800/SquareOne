import Link from "next/link"
import { telHref } from "@/lib/site-settings"

/**
 * The intro ledger (7 Nov 2026): under an opener's intro, the one button
 * and the office line on the left, the page's related links on the right,
 * on a hairline, the way the hero's ledger sets its caption and controls
 * (components/sections/Hero.tsx). Until then the button sat alone under
 * the links with the right half of the row empty (Vern, with a screenshot
 * of an application page: "objects look like they are floating"). Styles:
 * app/own.css, .intro-ledger.
 */
export default function IntroLedger({
  phone,
  links = [],
  cta = { href: "/contact", label: "Get a quote" },
}: {
  /** The office line, from Site Settings (lib/site-settings.ts). */
  phone: string
  /** The page's related links, right of the button. */
  links?: { href: string; label: string }[]
  cta?: { href: string; label: string }
}) {
  return (
    <div className="intro-ledger">
      <div className="intro-ledger-act">
        <Link href={cta.href} className="btn-primary">
          {cta.label}
        </Link>
        <span className="intro-ledger-call">
          or call{" "}
          <a href={telHref(phone)} className="link">
            {phone}
          </a>
        </span>
      </div>
      {links.length > 0 && (
        <div className="intro-ledger-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="link">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
