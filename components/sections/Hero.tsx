"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { useEffect, useState } from "react"
import Container from "@/components/ui/Container"

const heroSlides: { src: string; alt: string; eyebrow: string }[] = [
  {
    src: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
    alt: "StreetBond multicolour transit plaza at dusk — Square One Paving",
    eyebrow: "Transit & Public Realm",
  },
  {
    src: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
    alt: "Estate herringbone driveway with gated entry — Square One Paving",
    eyebrow: "Residential Estates",
  },
  {
    src: "/images/products/streetbond/streetbond-red-roundabout-mountains-01.jpg",
    alt: "Decorative roundabout with mountain backdrop — Square One Paving",
    eyebrow: "Municipal Infrastructure",
  },
]

const tickerItems: string[] = [
  "BC's Decorative Pavement Specialists",
  "Since 2000",
  "Metro Vancouver",
  "Vancouver Island",
  "Ladysmith",
  "Municipal-Grade",
  "25 Years",
  "Vapor Blasting Certified",
  "Stamped Asphalt",
  "StreetBond Applicator",
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3, staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const childVariants: Variants = {
  hidden: { y: 32, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } },
}

const stats: { value: string; label: string }[] = [
  { value: "51+", label: "BC communities" },
  { value: "25", label: "Years in operation" },
  { value: "4", label: "Specialist services" },
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

export default function Hero() {
  const [scrollY, setScrollY] = useState<number>(0)
  const [activeSlide, setActiveSlide] = useState<number>(0)

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return
    const onScroll = () => setScrollY(window.scrollY)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSlide((s) => (s + 1) % heroSlides.length)
    }, 7000)
    return () => window.clearInterval(id)
  }, [])

  const currentSlide = heroSlides[activeSlide]

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#0F1115]">
      <div className="absolute inset-0 will-change-transform" style={{ transform: `translateY(${scrollY * 0.08}px)` }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 ken-burns">
              <Image src={currentSlide.src} alt={currentSlide.alt} fill priority sizes="100vw" className="object-cover" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[rgba(15,17,21,0.55)] via-[rgba(15,17,21,0.45)] to-[rgba(15,17,21,0.92)]" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[rgba(15,17,21,0.65)] via-transparent to-[rgba(15,17,21,0.35)]" />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="absolute top-24 lg:top-28 left-6 lg:left-12 z-10 hidden md:flex items-center gap-3"
      >
        <span className="block w-8 h-[1px] bg-white/40" />
        <span className="text-[10px] uppercase tracking-[0.32em] text-white/65 font-medium">Square One · est. 2000</span>
      </motion.div>

      <Container className="relative z-10 w-full pt-32 pb-24 lg:pb-32">
        <div className="relative max-w-4xl">
          <div aria-hidden="true" className="absolute -left-6 lg:-left-10 top-2 bottom-6 w-[1px] bg-gradient-to-b from-transparent via-white/40 to-transparent" />

          <motion.div variants={containerVariants} initial="hidden" animate="show">
            <motion.div
              key={currentSlide.eyebrow}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-semibold">{currentSlide.eyebrow}</span>
            </motion.div>

            <motion.h1
              variants={childVariants}
              className="font-light leading-[0.92] tracking-[-0.035em] text-white"
              style={{ fontSize: "clamp(2.75rem, 7.5vw, 7rem)" }}
            >
              Surfaces that<br />
              <span className="italic font-extralight text-white/95">define</span>{" "}
              <span className="text-[#F26430]">a place.</span>
            </motion.h1>

            <motion.p variants={childVariants} className="text-base lg:text-xl text-white/80 max-w-xl mt-7 leading-[1.65] font-light">
              From transit corridors and public plazas to estate driveways &mdash; Square One has transformed over 50 BC communities with decorative pavement that performs and inspires.
            </motion.p>

            <motion.div variants={childVariants} className="mt-12 flex flex-wrap gap-3 items-center">
              <Link href="/projects" className="group bg-white text-[#0A0A0A] px-8 py-4 font-semibold text-[13px] tracking-[0.02em] uppercase rounded-none hover:bg-[#F26430] hover:text-white transition-colors duration-300 inline-flex items-center gap-3">
                See Our Work<ArrowRight />
              </Link>
              <Link href="/contact" className="group border border-white/30 text-white px-8 py-4 font-medium text-[13px] tracking-[0.02em] uppercase rounded-none hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300 inline-flex items-center gap-3">
                Request a Quote<ArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        className="hidden lg:block absolute right-8 xl:right-12 bottom-32 z-10 bg-white/[0.06] backdrop-blur-xl border border-white/15 p-7 rounded-none min-w-[240px]"
        style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.04) inset" }}
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className={`py-5 ${i !== 0 ? "border-t border-white/10" : ""}`}>
            <div className="text-white" style={{ fontWeight: 200, letterSpacing: "-0.04em", fontSize: "3.25rem", lineHeight: 1 }}>
              {stat.value}
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/65 mt-2 font-medium">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="absolute left-6 lg:left-12 bottom-20 lg:bottom-24 z-10 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => setActiveSlide(i)} aria-label={`Go to slide ${i + 1}`} className="group flex items-center justify-center h-6 w-6">
            <span className={`block h-[1.5px] transition-all duration-500 ${i === activeSlide ? "w-10 bg-[#F26430]" : "w-5 bg-white/35 group-hover:bg-white/65"}`} />
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-[rgba(15,17,21,0.78)] backdrop-blur-md py-3.5 overflow-hidden ticker-mask">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap px-6 text-[10.5px] uppercase tracking-[0.22em] text-white/65 font-medium">
              {item}
              <span className="mx-7 text-[#F26430]">&middot;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
