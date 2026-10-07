import { ReactNode } from "react"
import Link from "next/link"

export default function Container({
  children,
  className = "",
  as: As = "div",
}: {
  children: ReactNode
  className?: string
  as?: "div" | "section" | "header" | "footer" | "main"
}) {
  return (
    <As className={`max-w-[1400px] mx-auto px-6 lg:px-10 ${className}`}>
      {children}
    </As>
  )
}

/* ------------------------------------------------------------------
   The own-company primitives (26 Sept 2026, docs/OWN-COMPANY-BRIEF.md
   §3.7). One section header for the whole site, one way to set a
   photograph, one row. The CSS is in app/own.css (.sec, .row, .cap).
   ------------------------------------------------------------------ */

/**
 * Section — a hairline above, the label in the left margin column (3 of
 * 12) and the heading with its one underlined link in the content column;
 * the content itself sits under the heading in the same column, so the
 * margin stays open down the band. Stacks under 900px. This is the one
 * layout move the restyle makes, and it is the move HUB does not make.
 *
 * `wide` lets the content run the full twelve columns under the header
 * (galleries, grids of six) while the header keeps its margin.
 */
export function Section({
  id,
  label,
  title,
  link,
  intro,
  tone = "paper",
  wide = false,
  children,
  className = "",
  headingLevel: H = "h2",
}: {
  id?: string
  label?: ReactNode
  title: ReactNode
  link?: { href: string; label: string }
  /** One reading-size paragraph under the heading, when a section needs it. */
  intro?: ReactNode
  tone?: "paper" | "warm" | "stone" | "none"
  wide?: boolean
  children?: ReactNode
  className?: string
  headingLevel?: "h1" | "h2"
}) {
  const bg =
    tone === "warm" ? "bg-surface-warm" : tone === "stone" ? "bg-surface-stone" : tone === "paper" ? "bg-surface" : ""
  return (
    <section id={id} className={`sec section ${bg} ${className}`}>
      <div className="container-1280">
        <div className="sec-grid">
          <div className="sec-label">{label && <span className="label">{label}</span>}</div>
          <div className="sec-body">
            <div className="sec-head">
              <H>{title}</H>
              {link && (
                <Link href={link.href} className="link whitespace-nowrap">
                  {link.label}
                </Link>
              )}
            </div>
            {intro && <p className="mt-5 max-w-[60ch] text-ink-body [text-wrap:pretty]">{intro}</p>}
            {children && !wide && <div className="sec-content">{children}</div>}
          </div>
          {children && wide && <div className="sec-content col-span-12">{children}</div>}
        </div>
      </div>
    </section>
  )
}

/** A hairline row: the photograph (with its caption under it) beside the text. */
export function Row({
  children,
  compact = false,
  className = "",
  as: As = "div",
}: {
  children: ReactNode
  compact?: boolean
  className?: string
  as?: "div" | "li" | "article"
}) {
  return <As className={`row ${compact ? "row-compact" : ""} ${className}`}>{children}</As>
}
