import { pullQuote } from "@/components/sections/Testimonials"

/**
 * Section 06 — Selected clients + pull-quote.
 * Plain text names, no logos, no cards, no ticker.
 * Every name below is already carried by lib/projects.ts or existing site copy.
 */
const selectedClients = [
  "City of Vancouver",
  "TransLink",
  "UBC",
  "City of Burnaby",
  "City of Richmond",
  "District of Maple Ridge",
]

export default function TrustStrip() {
  return (
    <section className="section relative overflow-hidden bg-surface">
      <div aria-hidden="true" className="ghost-index">
        06
      </div>

      <div className="container-1280 relative z-[1]">
        <div className="eyebrow">Selected clients</div>

        <div className="mt-7 flex flex-wrap gap-x-12 gap-y-4">
          {selectedClients.map((client) => (
            <span key={client} className="text-[15px] font-medium text-ink-muted">
              {client}
            </span>
          ))}
        </div>

        <blockquote className="mt-14 p-0">
          <p className="stop stop-tight m-0 max-w-[44ch] text-[26px] font-light leading-[1.45] tracking-[-0.01em] text-ink [text-wrap:pretty]">
            &ldquo;{pullQuote.quote}&rdquo;
          </p>
          <footer className="mt-5 text-[14px] text-ink-muted">
            {pullQuote.attribution}
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
