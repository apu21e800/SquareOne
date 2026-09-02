/**
 * Section 06 — Selected clients.
 * Plain text names, no logos, no cards, no ticker.
 * Every name below is an owner Square One has itself published as a client
 * on squareonepaving.com or in its project posts — nothing inferred.
 */
const selectedClients = [
  "TransLink",
  "City of Vancouver",
  "UBC",
  "Musqueam",
  "City of Burnaby",
  "Vancouver Park Board",
  "City of New Westminster",
  "City of Langley",
  "Squamish Nation",
  "Polygon Realty",
  "Onni Group",
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
            through winters. These are some of the owners and developers we have installed for.
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
