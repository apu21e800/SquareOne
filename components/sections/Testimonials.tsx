const testimonials = [
  {
    quote: "Square One transformed our strata's parkade entrance into something we're genuinely proud of. The StreetPrint work held through two winters without any cracking.",
    name: "D. Mackenzie",
    context: "Strata Council President · Burnaby, BC",
  },
  {
    quote: "Jan's team was precise, professional, and finished two days ahead of schedule. The municipal inspector complimented the thermoplastic quality on day one.",
    name: "R. Sharma",
    context: "Public Works Coordinator · City of Surrey",
  },
  {
    quote: "We've used Square One on three commercial properties now. Their vapor blasting prep work alone is worth it — the coatings adhere perfectly every time.",
    name: "M. Vandenberg",
    context: "Commercial Property Manager · Victoria, BC",
  },
]

export default function Testimonials() {
  return (
    <section className="w-full py-24 md:py-32 bg-[#F6F4F0] border-t border-[#E2DDD8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 text-center">
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
            Client Work
          </span>
          <h2 className="mt-3 text-[#111111]">What BC clients say.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="relative bg-white border border-[#E2DDD8] px-8 py-8">
              {/* 3px left orange accent */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8601A]" />

              <p className="text-[#2C2C2C] text-base italic leading-relaxed font-light">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Separator */}
              <div className="w-6 border-t border-[#C8601A] my-6" />

              <div className="text-[#111111] text-sm font-semibold">{t.name}</div>
              <div className="text-[#8C8C8C] text-xs tracking-wide uppercase mt-1">{t.context}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
