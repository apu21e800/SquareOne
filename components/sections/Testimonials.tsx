// TODO: replace with real client quotes
const testimonials = [
  {
    quote:
      "Square One transformed our strata parkade entrance into something we're genuinely proud of. The StreetPrint work held through two winters.",
    name: "D. Mackenzie",
    context: "Strata Council, Burnaby BC",
  },
  {
    quote:
      "Jan's team was precise, professional, and finished two days ahead of schedule. The inspector complimented the thermoplastic quality on day one.",
    name: "R. Sharma",
    context: "City of Surrey Public Works",
  },
  {
    quote:
      "We've used Square One on three commercial properties. Their vapor blasting prep alone is worth it — the coatings adhere perfectly every time.",
    name: "M. Vandenberg",
    context: "Commercial Property Manager, Victoria BC",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-[#F6F4F0] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mb-14 lg:mb-20 max-w-2xl">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#C8601A] font-medium mb-6">
            Client Voices
          </p>
          <h2 className="text-[#111111]">Trusted across BC.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative bg-white border border-[#E2DDD8] p-8 lg:p-10 flex flex-col"
            >
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8601A]" />
              <blockquote className="font-display italic text-[19px] leading-[1.5] text-[#111111] font-normal mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <span className="block w-6 h-[2px] bg-[#C8601A] mb-6" />
              <figcaption className="mt-auto">
                <p className="font-semibold text-[#111111] text-sm tracking-[-0.01em]">
                  {t.name}
                </p>
                <p className="text-[11px] tracking-[0.12em] uppercase text-[#8C8C8C] mt-1">
                  {t.context}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  )
}
