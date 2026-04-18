"use client"

import { services } from "@/lib/services"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Container from "@/components/ui/Container"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function ServicesGrid() {
  return (
    <section className="bg-white section-padding">
      <Container>

        {/* Section header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-16"
        >
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#C8601A] font-semibold mb-3">What We Do</p>
          <h2 className="text-[clamp(2rem,4vw,2.5rem)] font-light text-[#111111] leading-tight tracking-[-0.02em]">Four services. One specialist team.</h2>
          <p className="text-[#5A5A5A] mt-4 max-w-xl leading-relaxed">We install the surfaces that define BC communities — from municipal crosswalks to residential driveways.</p>
        </motion.div>

        {/* 4 cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="border border-[#E2DDD8] rounded-none overflow-hidden group block bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:border-[#C8601A]"
              >
                {/* Image */}
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-[0.18em] font-semibold bg-[#111111] text-white px-3 py-1.5">Service</span>
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover rounded-none group-hover:scale-105 transition-transform duration-700 ease-out"
                    src={service.imageUrl || "/images/applications/crosswalks/crosswalk-hero.jpg"}
                    alt={service.name}
                  />
                </div>
                {/* Body */}
                <div className="p-6 bg-white border-t-[3px] border-[#C8601A]">
                  <h3 className="font-semibold text-lg text-[#111111]">{service.name}</h3>
                  <p className="text-sm text-[#5A5A5A] mt-2 leading-relaxed">{service.tagline}</p>
                  <span className="hover-underline text-[#C8601A] text-sm font-semibold mt-4 inline-flex items-center gap-1">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  )
}
