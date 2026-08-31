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
      <span aria-hidden="true" className="ghost-index">04</span>

      <div className="container-1280 relative z-[1]">
        <div data-reveal>
          <div className="eyebrow">Selected clients</div>

          <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.65] text-ink-body">
            Municipal work is won in open tenders and kept by holding up
            through winters. These are some of the owners we install for.
          </p>

        <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
          {selectedClients.map((client) => (
            <span key={client} className="text-[15px] font-medium text-ink-muted">
              {client}
            </span>
          ))}
          </div>
        </div>

      </div>
    </section>
  )
}
