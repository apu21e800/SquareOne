export type PullQuote = {
  quote: string
  attribution: string
}

/**
 * Single source of truth for the homepage pull-quote.
 * Copy is unchanged from the previous three-card rotation (R. Sharma entry).
 * TrustStrip imports this so section 06 and any standalone use never drift.
 */
export const pullQuote: PullQuote = {
  quote:
    "Jan's team was precise, professional, and finished two days ahead of schedule. The municipal inspector complimented the thermoplastic quality on day one.",
  attribution: "R. Sharma, Public Works Coordinator, City of Surrey",
}

export default function Testimonials() {
  return (
    <section className="section bg-surface">
      <div className="container-1280">
        <blockquote className="m-0 p-0">
          <p className="quote-display stop stop-tight m-0 max-w-[44ch] text-[26px] leading-[1.45] text-ink [text-wrap:pretty]">
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
