/**
 * Testimonials — cream bg, 3 client quotes.
 * Google rating strip above. Top-border cards. Hover orange top border.
 */
const testimonials = [
  {
    quote:
      "Square One transformed our strata's parkade entrance into something we're genuinely proud of. The StreetPrint work held through two winters without any cracking.",
    name: "D. Mackenzie",
    context: "Strata Council President, Burnaby BC",
  },
  {
    quote:
      "Jan's team was precise, professional, and finished two days ahead of schedule. The municipal inspector complimented the thermoplastic quality on day one.",
    name: "R. Sharma",
    context: "City of Surrey, Public Works Coordinator",
  },
  {
    quote:
      "We've used Square One on three commercial properties now. Their vapor blasting prep work alone is worth it — the coatings adhere perfectly every time.",
    name: "M. Vandenberg",
    context: "Commercial Property Manager, Victoria BC",
  },
]

export default function Testimonials() {
  return (
    <section className="relative bg-[#F6F4F0]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#C8601A]" />
            Client Stories
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-10">
            <h2
              className="text-[#111111]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                letterSpacing: "-0.04em",
              }}
            >
              Proven across{" "}
              <span style={{ color: "#C8601A" }}>BC.</span>
            </h2>
            {/* Google rating strip */}
            <div className="flex items-center gap-2.5 pb-1">
              <span className="text-[#F59E0B] tracking-tight text-[15px]" aria-hidden="true">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </span>
              <span className="text-[13px] font-semibold text-[#2C2C2C]">4.9</span>
              <span className="text-[13px] text-[#5A5A5A]">on Google</span>
              <span className="text-[#E2DDD8]" aria-hidden="true">&#183;</span>
              <span className="text-[13px] text-[#5A5A5A]">47 Reviews</span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white px-8 py-10 border-t-[2px] border-[#E2DDD8] hover:border-t-[#C8601A] transition-colors duration-200 cursor-default"
            >
              {/* Quote mark */}
              <div className="text-[#E2DDD8] text-5xl font-black leading-none mb-3 select-none" aria-hidden="true">
                &#8220;
              </div>
              <p className="text-[#2C2C2C] text-[15px] leading-relaxed font-light mb-7">
                {t.quote}
              </p>
              <div className="w-6 h-px bg-[#E2DDD8] mb-4" />
              <p className="text-[#111111] text-sm font-semibold">{t.name}</p>
              <p className="text-[11px] tracking-[0.12em] uppercase mt-1" style={{ color: "#767676" }}>{t.context}</p>
            </div>
          ))}
        </div>

        {/* Bottom ghost link */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://g.page/r/squareonepaving/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#111111] hover:bg-[#111111] hover:text-white text-[#111111] px-7 py-4 text-[13px] font-bold tracking-[0.02em] uppercase transition-all duration-200 rounded-lg"
          >
            See All Reviews
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
