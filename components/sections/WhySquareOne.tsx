type ProofPoint = { number: string; title: string; body: string }

const proofPoints: ProofPoint[] = [
  {
    number: "01",
    title: "Same crews since 2000",
    body: "Our applicators have 10+ years of field experience on HUB Surface Systems products. We don't sub out.",
  },
  {
    number: "02",
    title: "Two bases, one BC",
    body: "Metro Vancouver and Vancouver Island offices. Most Lower Mainland and Island jobs don't require travel budget.",
  },
  {
    number: "03",
    title: "Municipal specifications",
    body: "We build to Vision Zero, Complete Streets, and AODA standards — then use the same discipline on residential work.",
  },
  {
    number: "04",
    title: "Warrantied systems",
    body: "StreetBond, TrafficPatterns, and StreetPrint come with 8+ year performance warranties when properly installed.",
  },
]

const trustedClients: string[] = [
  "City of Vancouver", "City of Victoria", "City of Richmond", "District of North Vancouver",
  "District of Saanich", "Nanaimo", "Coquitlam", "Burnaby", "Ladysmith", "Kelowna",
  "Surrey", "Langley", "White Rock", "Sechelt", "UBC", "TransLink", "BC Housing", "Capital Regional District",
]

export default function WhySquareOne() {
  return (
    <section className="section border-t border-[color:var(--hairline)] bg-surface">
      <div className="container-1280">
        <div className="grid grid-cols-1 items-end gap-8 min-[901px]:grid-cols-[auto_1fr] min-[901px]:gap-16">
          <div>
            <div className="eyebrow">Why Square One</div>
            <h2 className="stop mt-5">
              Municipal-grade craft.
              <br />
              BC-rooted service
            </h2>
          </div>

          <p className="max-w-[56ch] text-[19px] leading-[1.65] text-ink-body">
            We do one thing for a living &mdash; decorative pavement &mdash; and we do it across the
            toughest environments in the province. Municipal stress-tests become your
            driveway&apos;s baseline.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 border-t border-[color:var(--hairline)] min-[701px]:grid-cols-2 min-[1101px]:grid-cols-4">
          {proofPoints.map((point) => (
            <article
              key={point.number}
              className="border-b border-[color:var(--hairline)] px-0 py-8 min-[701px]:border-r min-[701px]:px-8 min-[701px]:[&:nth-child(2n)]:border-r-0 min-[1101px]:[&:nth-child(2n)]:border-r min-[1101px]:[&:nth-child(4n)]:border-r-0"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                  {point.number}
                </span>
                <span aria-hidden className="h-px flex-1 bg-[color:var(--hairline)]" />
              </div>

              <h3 className="mt-6">{point.title}</h3>

              <p className="mt-[10px] text-[15px] leading-[1.55] text-ink-body">{point.body}</p>
            </article>
          ))}
        </div>

        {/* Was a scrolling ticker — v2 renders the same list statically. */}
        <div className="mt-12 border-t border-[color:var(--hairline)] pt-10">
          <div className="label">Trusted across BC</div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {trustedClients.map((name) => (
              <li key={name} className="tag">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
