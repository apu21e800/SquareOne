"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { useEffect, useState } from "react"
import Container from "@/components/ui/Container"

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
    transition: {
      duration: 0.3,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const childVariants: Variants = {
  hidden: { y: 32, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

const stats: { value: string; label: string }[] = [
  { value: "51+", label: "BC communities" },
  { value: "25", label: "Years in operation" },
  { value: "4", label: "Specialist services" },
]

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  )
}

export default function Hero() {
  const [scrollY, setScrollY] = useState<number>(0)

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return
    const onScroll = () => setScrollY(window.scrollY)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#14161A]">
      {/* Background image (parallax) */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      >
        <Image
          src="/images/applications/bus-bike-lanes/red-bus-lane-long-perspective-01.jpg"
          alt="Decorative pavement installation by Square One Paving"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[rgba(20,22,26,0.4)] via-[rgba(20,22,26,0.55)] to-[rgba(20,22,26,0.88)]"
      />

      {/* Stamped-asphalt texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('/images/textures/stamped-asphalt-texture.webp')",
          backgroundSize: "cover",
        }}
      />

      {/* Content */}
      <Container className="relative z-10 w-full pt-32 pb-24 lg:pb-32">
        <div className="relative max-w-3xl">
          {/* Left accent bar */}
          <div
            aria-hidden="true"
            className="absolute -left-6 lg:-left-10 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#C8601A] via-[#E8895A] to-[#C8601A] opacity-70"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={childVariants}
              className="text-[11px] uppercase tracking-[0.22em] text-[#E8895A] font-semibold mb-5"
            >
              BC&apos;s Decorative Pavement Specialists &middot; Since 2000
            </motion.p>

            <motion.h1
              variants={childVariants}
              className="font-light leading-[0.95] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}
            >
              Surfaces that{" "}
              <span className="text-[#E8895A]">define</span>
              <br />
              a place.
            </motion.h1>

            <motion.p
              variants={childVariants}
              className="text-base lg:text-xl text-white/85 max-w-xl mt-6 leading-relaxed font-light"
            >
              From crosswalks and transit lanes to driveways and public art
              &mdash; Square One has transformed over 50 BC communities with
              surfaces that perform and inspire.
            </motion.p>

            <motion.div
              variants={childVariants}
              className="mt-10 flex flex-wrap gap-3 items-center"
            >
              <Link
                href="/projects"
                className="group bg-white text-[#111111] px-7 py-3.5 font-semibold text-sm rounded-none hover:bg-[#F6F4F0] transition-colors inline-flex items-center gap-2"
              >
                See Our Work
                <ArrowRight />
              </Link>
              <Link
                href="/contact"
                className="border border-white/40 text-white px-7 py-3.5 font-medium text-sm rounded-none hover:bg-white hover:text-[#111111] transition-colors"
              >
                Get a Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Stat card (desktop only) */}
      <div className="hidden lg:block absolute right-8 xl:right-12 bottom-32 z-10 bg-white/[0.08] backdrop-blur-lg border border-white/15 p-7 rounded-none min-w-[220px]">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`py-5 ${i !== 0 ? "border-t border-white/10" : ""}`}
          >
            <div
              className="text-white"
              style={{
                fontWeight: 300,
                letterSpacing: "-0.03em",
                fontSize: "3rem",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-white/75 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Ticker marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-[rgba(20,22,26,0.72)] backdrop-blur-sm py-3 overflow-hidden ticker-mask">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center whitespace-nowrap px-6 text-[11px] uppercase tracking-[0.18em] text-white/70"
            >
              {item}
              <span className="mx-6 text-[#E8895A]">&middot;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
