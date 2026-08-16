import Link from "next/link"

const steps: { num: string; title: string; body: string; meta: string }[] = [
  {
    num: "01",
    title: "Site Walk",
    body: "We meet you on site. Substrate condition, drainage, traffic loading, sight lines, neighbour considerations — all logged before a quote ever lands.",
    meta: "Day 1",
  },
  {
    num: "02",
    title: "Specification",
    body: "We pick the system that fits the surface — StreetPrint, StreetBond, TrafficPatterns, MMAX. The wrong product on the right surface is a five-year repair bill.",
    meta: "Day 2–3",
  },
  {
    num: "03",
    title: "Surface Prep",
    body: "Vapour blasting, sweep, prime. Adhesion is decided before the first colour goes down. We don't shortcut the boring step — that's why ours last.",
    meta: "Install Day 1",
  },
  {
    num: "04",
    title: "Application",
    body: "Hot imprint, coat, or thermoplastic — applied by the same crew that has done it for ten years. Municipal-spec discipline, residential-scale care.",
    meta: "Install Day 2–3",
  },
  {
    num: "05",
    title: "Cure & Walk-Through",
    body: "Cure to spec. Final inspection with you. Maintenance schedule handed over so the surface still looks installed in year eight.",
    meta: "Final Day",
  },
]

export default function ProcessBand() {
  return (
    <section className="section border-t border-[color:var(--hairline)] bg-surface">
      <div className="container-1280">
        <div className="grid grid-cols-1 items-end gap-8 min-[901px]:grid-cols-[auto_1fr] min-[901px]:gap-16">
          <div>
            <div className="eyebrow">How we work</div>
            <h2 className="stop mt-5">Five steps, no subcontractors</h2>
          </div>

          <p className="max-w-[56ch] text-[19px] leading-[1.65] text-ink-body">
            Our process hasn&apos;t changed since 2000 because the work hasn&apos;t. Every project,
            municipal or residential, runs the same five steps with the same crew &mdash; the
            boring discipline that makes a pavement install last for a decade.
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
            Same crew, same standard, every project &mdash; municipal or residential.
          </p>
          <Link href="/contact" className="arrow-link whitespace-nowrap">
            Start your site walk <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
