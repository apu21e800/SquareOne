"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

export default function DrivewaysBand() {
  return (
    <section className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[680px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: easeOut }}
          className="relative h-[440px] lg:h-auto group overflow-hidden order-1 lg:order-2"
        >
          <Image
            src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
            alt="Premium decorative driveway by Square One Paving"
            fill
            className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div aria-hidden className="absolute inset-0 lg:hidden bg-gradient-to-t from-[rgba(10,10,10,0.5)] via-transparent to-transparent" />
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-[rgba(10,10,10,0.65)] backdrop-blur-md px-3.5 py-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-white font-semibold">Premium Residential</span>
          </div>
          <div className="absolute bottom-6 left-6 hidden lg:block">
            <div className="bg-[rgba(10,10,10,0.6)] backdrop-blur-md px-4 py-2.5">
              <p className="text-[10.5px] uppercase tracking-[0.18em] text-white/70 font-medium">Custom medallion driveway</p>
              <p className="text-[10px] tracking-[0.04em] text-white/50 mt-0.5">Vancouver Island estate</p>
            </div>
          </div>
        </motion.div>

        <div className="relative bg-[#F6F4F0] p-10 lg:p-20 flex flex-col justify-center overflow-hidden order-2 lg:order-1">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(242,100,48,0.06) 0%, transparent 70%)" }} aria-hidden />
          <div aria-hidden className="absolute right-10 lg:right-20 top-10 lg:top-20 bottom-10 lg:bottom-20 w-[1px] bg-gradient-to-b from-transparent via-[#F26430]/30 to-transparent hidden lg:block" />

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="relative z-10 max-w-md lg:pr-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
              <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#F26430] font-bold">Driveways &amp; Estates</span>
            </div>

            <h2 className="text-[#0A0A0A] display-h mb-6" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}>
              Your driveway.<br />
              <span className="italic font-extralight">Reimagined.</span>
            </h2>

            <p className="text-[#2C2C2C] leading-[1.7] text-[15px] font-light">
              From stamped asphalt that echoes the architecture of your home to vapor-blasted surfaces ready for fresh
              coating &mdash; we bring the same municipal-grade precision to residential projects across Metro
              Vancouver and Vancouver Island.
            </p>

            <div className="mt-9 grid grid-cols-3 gap-4 pb-8 border-b border-[#E2DDD8]">
              {[
                { value: "8+", label: "year service life" },
                { value: "60%", label: "cost vs. concrete pavers" },
                { value: "1 wk", label: "typical install" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-[#0A0A0A] font-extralight leading-none text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.04em]">{s.value}</div>
                  <div className="text-[10.5px] uppercase tracking-[0.14em] text-[#5A5A5A] mt-2">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/driveways" className="group bg-[#0A0A0A] text-white px-7 py-3.5 rounded-none font-semibold text-[12px] uppercase tracking-[0.04em] hover:bg-[#F26430] transition-colors duration-300 inline-flex items-center gap-3">
                See Driveway Projects<ArrowRight />
              </Link>
              <Link href="/contact" className="border border-[#0A0A0A]/30 text-[#0A0A0A] px-7 py-3.5 rounded-none font-medium text-[12px] uppercase tracking-[0.04em] hover:bg-[#0A0A0A] hover:text-white transition-colors duration-300">
                Get a Quote
              </Link>
            </div>
            <p className="mt-6 text-[10.5px] uppercase tracking-[0.18em] text-[#8C8C8C]">★★★★★ &nbsp;Metro Vancouver &middot; Victoria &middot; Vancouver Island</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
