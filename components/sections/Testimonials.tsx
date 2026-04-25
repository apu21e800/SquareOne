/**
 * Testimonials — 3 client quotes, white bg (contrasts with the warm F6F4F0
 * DrivewaysBand above and the dark VaporBlastingBand below).
 */
const testimonials = [
  {
    quote:
      "Square One transformed our strata’s parkade entrance into something we’re genuinely proud of. The StreetPrint work held through two winters without any cracking.",
    name: "D. Mackenzie",
    context: "Strata Council President, Burnaby BC",
  },
  {
    quote:
      "Jan’s team was precise, professional, and finished two days ahead of schedule. The municipal inspector complimented the thermoplastic quality on day one.",
    name: "R. Sharma",
    context: "City of Surrey, Public Works Coordinator",
  },
  {
    quote:
      "We’ve used Square One on three commercial properties now. Their vapor blasting prep work alone is worth it — the coatings adhere perfectly every time.",
    name: "M. Vandenberg",
    context: "Commercial Property Manager, Victoria BC",
  },
]

export default function Testimonials() {
  return (
    <section className="relative bg-white overflow-hidden">
      <span
        aria-hidden
        className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
        style={{ background: "linear-gradient(90deg, #C8601A 0%, #E8895A 100%)" }}
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#C8601A]" />
            Client Stories
          </p>
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
            <em style={{ fontStyle: "italic", fontWeight: 700, color: "#C8601A" }}>BC.</em>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-[#F6F4F0] px-8 py-8 border border-[#E2DDD8]"
            >
              {/* Left orange accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8601A]" />
              <p className="text-[#2C2C2C] text-[15px] leading-relaxed font-light mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="w-6 h-px bg-[#C8601A] mb-4" />
              <p className="text-[#111111] text-sm font-semibold">{t.name}</p>
              <p className="text-[#8C8C8C] text-[11px] tracking-[0.12em] uppercase mt-1">{t.context}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
