"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Container from "@/components/ui/Container"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function CTASection() {
  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] min-h-[640px]">
        <div className="relative h-[420px] lg:h-auto overflow-hidden">
          <Image
            src="/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg"
            alt="Decorative pavement plaza at dusk"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,10,0.30)] via-transparent to-[rgba(10,10,10,0.55)]" />
          <div aria-hidden className="absolute inset-0 lg:hidden bg-gradient-to-t from-[rgba(10,10,10,0.92)] via-[rgba(10,10,10,0.30)] to-transparent" />

          <div className="absolute top-6 left-6 flex items-center gap-2 bg-[rgba(10,10,10,0.65)] backdrop-blur-md px-3.5 py-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-white font-semibold">SkyTrain Plaza · Metro Vancouver</span>
          </div>

          <div className="absolute bottom-6 left-6 hidden lg:block">
            <p className="text-white/85 text-[11px] uppercase tracking-[0.18em] font-semibold">StreetBond Multi-Colour</p>
            <p className="text-white/55 text-[10px] tracking-[0.04em] mt-1">Coloured concourse coating</p>
          </div>
        </div>

        <div className="relative bg-[#0A0A0A] flex flex-col justify-center p-10 lg:p-20 overflow-hidden">
          <div aria-hidden className="absolute -top-32 -right-32 w-[600px] h-[600px] pointer-events-none opacity-70"
            style={{ background: "radial-gradient(circle, rgba(242,100,48,0.12) 0%, transparent 65%)" }} />

          <div aria-hidden className="absolute left-10 lg:left-20 top-12 bottom-12 w-[1px] bg-gradient-to-b from-transparent via-[#F26430]/35 to-transparent hidden lg:block" />

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: easeOut }}
            className="relative z-10 max-w-md lg:pl-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
              <span className="text-[10.5px] uppercase tracking-[0.32em] text-[#FF8A5C] font-bold">Ready to Start</span>
            </div>

            <h2 className="text-white display-h" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}>
              Let&apos;s build<br />
              <span className="italic font-extralight">something worth</span><br />
              <span className="text-[#F26430]">looking at.</span>
            </h2>

            <p className="text-white/75 text-[15px] lg:text-base leading-[1.7] mt-7 font-normal max-w-md">
              Whether it&apos;s a municipal crosswalk, a commercial plaza, or your home driveway &mdash;
              we bring 25 years of BC expertise to every square metre.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-7 py-4 font-semibold text-[12px] tracking-[0.06em] uppercase rounded-none hover:bg-[#F26430] hover:text-white transition-colors duration-300">
                Request a Quote
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </Link>
              <Link href="/contact" className="border border-white/20 text-white px-7 py-4 font-medium text-[12px] tracking-[0.06em] uppercase rounded-none hover:bg-white hover:text-[#0A0A0A] hover:border-white transition-colors duration-300">
                Book a Site Visit
              </Link>
            </div>

            <div className="mt-9 pt-7 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-white/45 text-[10.5px] uppercase tracking-[0.22em] font-semibold">Or call us directly</span>
              <a href="tel:+16043098212" className="text-white text-[15px] font-semibold tracking-[-0.005em] hover:text-[#FF8A5C] transition-colors">
                604-309-8212
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
