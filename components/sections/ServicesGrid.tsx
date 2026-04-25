"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { services } from "@/lib/services"

export default function ServicesGrid() {
  const order = [
    "stamped-asphalt",
    "decorative-coatings",
    "preformed-thermoplastic",
    "vapor-blasting",
  ]
  const ordered = order
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  return (
    <section className="bg-white relative">
      <span
        aria-hidden
        className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
        style={{ background: "linear-gradient(90deg, #C8601A 0%, #E8895A 100%)" }}
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-20 items-end mb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#C8601A]" />
              What We Do
            </p>
            <h2
              className="text-[#111111]"
              style={{
                fontSize: "clamp(2.25rem, 4.4vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                letterSpacing: "-0.04em",
                textWrap: "balance",
              }}
            >
              Four services.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "#C8601A" }}>
                One specialist team.
              </em>
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-[#5A5A5A] max-w-md lg:justify-self-end">
            We install the surfaces that define BC communities — crosswalks, transit corridors, plazas,
            and driveways. Each service is run in house, by the same crew, to a single municipal-grade standard.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ordered.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group block bg-white border border-[#E2DDD8] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE9E3]">
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.22em] text-white/85 font-semibold">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex-1 p-6 border-t-[3px] border-[#C8601A] bg-white flex flex-col">
                  <h3 className="text-[17px] font-semibold text-[#111111] tracking-tight">
                    {service.name}
                  </h3>
                  <p className="text-[13.5px] text-[#5A5A5A] leading-relaxed mt-2 flex-1">
                    {service.tagline}
                  </p>
                  <span className="text-[12.5px] font-semibold text-[#C8601A] mt-5 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Learn more
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
