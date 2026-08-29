import Link from "next/link"

import { services } from "@/lib/services"

/**
 * Display copy only. Routes and slugs come from lib/services.ts untouched —
 * "vapor-blasting" stays the slug, "Vapour blasting" is what the card reads.
 */
const displayName: Record<string, string> = {
  "stamped-asphalt": "Stamped asphalt",
  "preformed-thermoplastic": "Preformed thermoplastic",
  "decorative-coatings": "Decorative coatings",
  "vapor-blasting": "Vapour blasting",
}

export default function ServicesGrid() {
  return (
    <section id="services" className="section relative overflow-hidden bg-surface">
      <span aria-hidden="true" className="ghost-index">01</span>

      <div className="container-1280 relative z-[1]">
        <div className="eyebrow">What we do</div>
        <h2 className="mt-5">Four services, one standard</h2>

        <div className="mt-10 grid grid-cols-4 gap-6 max-[700px]:grid-cols-1">
          {services.map((service, i) => (
            <article key={service.slug} className="card card-panel">
              <div className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                {String(i + 1).padStart(2, "0")}
              </div>

              <h3 className="mt-6">{displayName[service.slug] ?? service.name}</h3>

              <p className="mt-[10px] text-[15px] leading-[1.55] text-ink-body">
                {service.tagline}
              </p>

              <Link
                href={`/services/${service.slug}`}
                className="arrow-link mt-auto pt-7"
                aria-label={`Explore ${displayName[service.slug] ?? service.name}`}
              >
                Explore <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
