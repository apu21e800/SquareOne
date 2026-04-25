"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function DrivewaysBand() {
  return (
    <section className="overflow-hidden">
      <div className="flex flex-col lg:flex-row">

        {/* Left: Image */}
        <div className="relative h-[500px] lg:h-auto lg:flex-1">
          <Image
            src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
            alt="Estate herringbone gated driveway by Square One Paving"
            fill
            className="object-cover rounded-none"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right: Content */}
        <div className="relative bg-[#F6F4F0] p-8 lg:p-20 flex flex-col justify-center lg:flex-1 overflow-hidden">
          {/* Subtle corner bloom */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(200,96,26,0.07) 0%, transparent 70%)" }}
            aria-hidden
          />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="relative z-10"
          >
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#C8601A] font-semibold mb-3">
              Premium Residential
            </p>
            <h2 className="text-[clamp(2rem,4vw,2.5rem)] font-light text-[#111111] leading-tight tracking-[-0.02em] mb-4">
              Your driveway. Reimagined.
            </h2>
            <p className="max-w-md text-[#2C2C2C] leading-relaxed">
              From stamped asphalt that echoes the architecture of your home to
              vapor-blasted surfaces ready for fresh coating — we bring the same
              municipal-grade precision to residential projects across Metro Vancouver
              and Victoria.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/driveways"
                className="bg-[#C8601A] text-white px-6 py-3 rounded-none font-semibold text-sm hover:brightness-110 transition-all"
              >
                See Driveway Projects
              </Link>
              <Link
                href="/contact"
                className="border border-[#C8601A] text-[#C8601A] px-6 py-3 rounded-none font-semibold text-sm hover:bg-[#C8601A] hover:text-white transition-all"
              >
                Get a Quote
              </Link>
            </div>
            <p className="mt-6 text-xs text-[#8C8C8C]">
              &#9733;&#9733;&#9733;&#9733;&#9733;&nbsp; Metro Vancouver &#183; Victoria &#183; Vancouver Island
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
