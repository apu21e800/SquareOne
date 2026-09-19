import Link from "next/link"

/* Not rendered on any page at present (app/page.tsx dropped it in the
   5 Sept 2026 composition; /about carries its own five steps). The copy is
   kept honest all the same, so it can return without a review: no day
   counts — Square One publishes no lead times — and nothing about crews
   that the client has asked not to advertise. */
const steps: { num: string; title: string; body: string; meta: string }[] = [
  {
    num: "01",
    title: "Site visit",
    body: "We meet you on site and look at the asphalt — its condition, the drainage, the traffic it carries — before anything is quoted. The visit is free.",
    meta: "Before the quote",
  },
  {
    num: "02",
    title: "Specification",
    body: "Pattern, colour and system matched to the surface and the traffic — StreetPrint, StreetBond or TrafficPatterns — and set out in a written quote.",
    meta: "Before the quote",
  },
  {
    num: "03",
    title: "Surface prep",
    body: "Cleaning, and vapour blasting where the surface needs it. Adhesion is decided here, before the first colour goes down.",
    meta: "On site",
  },
  {
    num: "04",
    title: "Application",
    body: "Heated template, coating or thermoplastic, installed by Square One's own crews to the manufacturer's specification.",
    meta: "On site",
  },
  {
    num: "05",
    title: "Cure and walk-through",
    body: "The surface cures, then we walk the finished work with you. The manufacturer warrants the material; Square One warrants the workmanship.",
    meta: "Handover",
  },
]

export default function ProcessBand() {
  return (
    <section className="section border-t border-[color:var(--hairline)] bg-surface">
      <div className="container-1280">
        <div className="grid grid-cols-1 items-end gap-8 min-[901px]:grid-cols-[auto_1fr] min-[901px]:gap-16">
          <div>
            <div className="eyebrow">How we work</div>
            <h2 className="stop mt-5">Five steps, every job</h2>
          </div>

          <p className="max-w-[56ch] text-[19px] leading-[1.65] text-ink-body">
            Every project, municipal or residential, runs the same five steps &mdash; a site visit
            before the quote, the surface prepared before the colour, and a walk-through before we
            leave. It is the discipline that makes decorative pavement last.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 border-t border-[color:var(--hairline)] min-[701px]:grid-cols-2 min-[1101px]:grid-cols-5">
          {steps.map((step) => (
            <article
              key={step.num}
              className="border-b border-[color:var(--hairline)] px-0 py-8 min-[701px]:border-r min-[701px]:px-7 min-[701px]:[&:nth-child(2n)]:border-r-0 min-[1101px]:px-7 min-[1101px]:[&:nth-child(2n)]:border-r min-[1101px]:[&:nth-child(5n)]:border-r-0"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                  {step.num}
                </span>
                <span aria-hidden className="h-px flex-1 bg-[color:var(--hairline)]" />
                <span className="label">{step.meta}</span>
              </div>

              <h3 className="mt-6">{step.title}</h3>

              <p className="mt-[10px] text-[15px] leading-[1.55] text-ink-body">{step.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[15px] leading-[1.55] text-ink-muted">
            The same five steps on every project, municipal or residential, across the Lower
            Mainland and Vancouver Island.
          </p>
          <Link href="/contact" className="arrow-link whitespace-nowrap">
            Book a site visit <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
