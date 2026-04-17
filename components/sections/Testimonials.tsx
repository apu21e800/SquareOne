type Testimonial = {
  quote: string
  name: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The finish held up through three winters without a hairline crack. That alone earned them our repeat work.",
    name: "Public Works Lead",
    role: "Municipal, Fraser Valley",
  },
  {
    quote:
      "Clean site, on schedule, and the colour match on the bike lane was exact. We'll route future corridors their way.",
    name: "Project Coordinator",
    role: "Transit Authority, Greater Victoria",
  },
  {
    quote:
      "They walked the driveway with me before quoting. The install took a single day. Neighbours have been asking ever since.",
    name: "Homeowner",
    role: "West Vancouver",
  },
]

export default function Testimonials() {
  return (
    <section className="w-full bg-[#F6F4F0] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="max-w-2xl mb-14">
          <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
            Reception
          </p>
          <h2
            className="text-[#111111]"
            style={{
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontSize: "clamp(1.8rem, 3vw, 3rem)",
            }}
          >
            What clients tell us after the work is in.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="bg-white border border-[#E2DDD8] p-8 flex flex-col"
            >
              <div className="w-8 h-[2px] bg-[#C8601A] mb-6" />
              <blockquote
                className="text-[#2C2C2C] leading-relaxed mb-8 flex-1"
                style={{
                  fontFamily: "var(--font-playfair), ui-serif, Georgia, serif",
                  fontWeight: 400,
                  fontSize: "1.05rem",
                  lineHeight: 1.5,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption>
                <p className="text-[#111111] text-sm font-semibold leading-tight">
                  {t.name}
                </p>
                <p className="text-[#8C8C8C] text-xs mt-1 uppercase tracking-[0.1em]">
                  {t.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
