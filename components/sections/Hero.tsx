"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { useEffect, useState } from "react"
import Container from "@/components/ui/Container"

const heroSlides: { src: string; alt: string; eyebrow: string; tag: string; locale: string }[] = [
  {
    src: "/images/S1_update_v2/photos/Featured image options/UBC-crosswalk-3-300dpi.jpg",
    alt: "UBC × Musqueam crosswalk by Square One Paving",
    eyebrow: "Indigenous Public Art",
    tag: "Vancouver, BC",
    locale: "UBC × Musqueam Crosswalk, TrafficPatterns",
  },
  {
    src: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
    alt: "Premium residential driveway by Square One Paving",
    eyebrow: "Residential Estates",
    tag: "Vancouver Island",
    locale: "Custom estate driveway",
  },
  {
    src: "/images/applications/bus-bike-lanes/green-bike-lane-bridge-gopro-01.jpg",
    alt: "Green bike lane on bridge by Square One Paving",
    eyebrow: "Vision Zero Infrastructure",
    tag: "BC Bridges",
    locale: "Coloured cycling corridor",
  },
  {
    src: "/images/products/streetbond/streetbond-multicolour-plaza-green-circles-01.jpg",
    alt: "Langley Events Centre — Circle of Life public art by Square One Paving",
    eyebrow: "Civic Public Art",
    tag: "Langley, BC",
    locale: "Langley Events Centre — Circle of Life",
  },
  {
    src: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
    alt: "StreetBond multicolour transit plaza at dusk — Square One Paving",
    eyebrow: "Transit & Public Realm",
    tag: "Metro Vancouver",
    locale: "Joyce SkyTrain Plaza, multi-colour StreetBond",
  },
]

const tickerItems: string[] = [
  "BC's Decorative Pavement Studio",
  "Since 2000",
  "Metro Vancouver",
  "Vancouver Island",
  "Ladysmith",
  "Municipal-Grade",
  "25 Years",
  "Vapor Blasting Certified",
  "Stamped Asphalt",
  "Authorized HUB Applicator",
  "Vision Zero Capable",
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.08, delayChildren: 0.15 } },
}

const childVariants: Variants = {
  hidden: { y: 32, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } },
}

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
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#0A0A0A]">
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

      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.45)] via-[rgba(10,10,10,0.40)] to-[rgba(10,10,10,0.92)]" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,10,0.65)] via-transparent to-[rgba(10,10,10,0.30)]" />
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)" }} />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="absolute top-24 lg:top-28 left-6 lg:left-12 z-10 hidden md:flex items-center gap-3"
      >
        <span className="block w-10 h-[1px] bg-white/40" />
        <span className="text-[10px] uppercase tracking-[0.32em] text-white/65 font-medium">
          BC&apos;s Decorative Pavement Studio &middot; est. 2000
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-24 lg:top-28 right-6 lg:right-12 z-10 hidden md:flex items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.32em] text-white/65 font-medium">
          {String(activeSlide + 1).padStart(2, "0")}
          <span className="text-white/30 mx-1.5">/</span>
          {String(heroSlides.length).padStart(2, "0")}
        </span>
        <span className="block w-10 h-[1px] bg-white/40" />
      </motion.div>

      <Container className="relative z-10 w-full pt-32 pb-28 lg:pb-40">
        <div className="relative max-w-5xl">
          <div aria-hidden className="absolute -left-6 lg:-left-10 top-2 bottom-6 w-[1px] bg-gradient-to-b from-transparent via-white/40 to-transparent" />

          <motion.div variants={containerVariants} initial="hidden" animate="show">
            <motion.div
              key={currentSlide.eyebrow}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-semibold">
                {currentSlide.eyebrow}
              </span>
              <span className="hidden sm:block w-px h-3 bg-white/20" />
              <span className="hidden sm:block text-[10.5px] uppercase tracking-[0.18em] text-white/55 font-medium">
                {currentSlide.tag}
              </span>
            </motion.div>

            <motion.h1
              variants={childVariants}
              className="text-white display-h"
              style={{ fontSize: "clamp(2.75rem, 8vw, 7.5rem)" }}
            >
              Surfaces<br />
              that <span className="italic font-extralight text-white/95">define</span>{" "}
              <span className="text-[#F26430]">a place.</span>
            </motion.h1>

            <motion.p variants={childVariants} className="text-base lg:text-xl text-white/80 max-w-xl mt-8 leading-[1.65] font-light">
              From transit corridors and public plazas to estate driveways &mdash; Square One has
              transformed over 50 BC communities with decorative pavement that performs and inspires.
            </motion.p>

            <motion.div variants={childVariants} className="mt-12 flex flex-wrap gap-3 items-center">
              <Link href="/projects" className="group bg-white text-[#0A0A0A] px-9 py-4 font-semibold text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:bg-[#F26430] hover:text-white transition-colors duration-300 inline-flex items-center gap-3">
                See Our Work<ArrowRight />
              </Link>
              <Link href="/contact" className="group border border-white/30 text-white px-9 py-4 font-medium text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300 inline-flex items-center gap-3">
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
        className="hidden lg:block absolute right-8 xl:right-12 bottom-32 z-10 w-[280px]"
      >
        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/15 p-7"
          style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.04) inset" }}>
          <div className="flex items-center gap-2 mb-5">
            <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#FF8A5C] font-semibold">Now Showing</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.locale}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-white text-[15px] leading-[1.5] font-light tracking-[-0.005em]">
                {currentSlide.locale}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-4">
            <div>
              <div className="text-white text-[2rem] font-extralight leading-none tracking-[-0.04em]">51<span className="text-[#F26430] text-[1.2rem]">+</span></div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/55 mt-1.5 font-medium">communities</div>
            </div>
            <div>
              <div className="text-white text-[2rem] font-extralight leading-none tracking-[-0.04em]">25</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/55 mt-1.5 font-medium">years</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute left-6 lg:left-12 bottom-20 lg:bottom-24 z-10 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => setActiveSlide(i)} aria-label={`Go to slide ${i + 1}`} className="group flex items-center justify-center h-6 w-7">
            <span className={`block h-[1.5px] transition-all duration-500 ${i === activeSlide ? "w-10 bg-[#F26430]" : "w-5 bg-white/35 group-hover:bg-white/65"}`} />
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-[rgba(10,10,10,0.78)] backdrop-blur-md py-3.5 overflow-hidden ticker-mask">
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
