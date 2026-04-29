const testimonials = [
  {
    quote: "Square One transformed our strata's parkade entrance into something we're genuinely proud of. The StreetPrint work held through two winters without any cracking.",
    name: "D. Mackenzie",
    context: "Strata Council President, Burnaby BC"
  },
  {
    quote: "Jan's team was precise, professional, and finished two days ahead of schedule. The municipal inspector complimented the thermoplastic quality on day one.",
    name: "R. Sharma",
    context: "City of Surrey, Public Works Coordinator"
  },
  {
    quote: "We've used Square One on three commercial properties now. Their vapor blasting prep work alone is worth it — the coatings adhere perfectly every time.",
    name: "M. Vandenberg",
    context: "Commercial Property Manager, Victoria BC"
  }
]

export default function Testimonials() {
  return (
    <section className="w-full py-24 md:py-32 bg-[#F6F4F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="relative bg-white px-8 py-8 border border-[#E2DDD8]">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#F26430]" />

              <p className="text-[#2C2C2C] text-base leading-relaxed font-light mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="w-6 h-[1px] bg-[#F26430] mb-4" />

              <p className="text-[#111111] text-sm font-semibold">
                {t.name}
              </p>
              <p className="text-[#8C8C8C] text-xs tracking-wide uppercase mt-1">
                {t.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
