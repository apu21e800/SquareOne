"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronRight, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/* ─── Data ───────────────────────────────────────────────── */

const services = [
  {
    name: "Stamped Asphalt",
    slug: "stamped-asphalt",
    desc: "Custom patterns & colours for crosswalks, driveways, and plazas.",
    icon: "◈",
  },
  {
    name: "Decorative Coatings",
    slug: "decorative-coatings",
    desc: "StreetBond coatings for bike lanes, bus corridors, and parking lots.",
    icon: "◉",
  },
  {
    name: "Preformed Thermoplastic",
    slug: "preformed-thermoplastic",
    desc: "Precision thermoplastic markings — arrows, logos, and crosswalks.",
    icon: "◧",
  },
  {
    name: "Vapor Blasting",
    slug: "vapor-blasting",
    desc: "Mobile surface prep — graffiti removal, marking removal, and more.",
    icon: "◌",
  },
]

// Mobile drawer: Vapor Blasting is featured separately, Driveways added
const drawerServiceLinks = [
  { name: "Stamped Asphalt",         href: "/services/stamped-asphalt" },
  { name: "Decorative Coatings",     href: "/services/decorative-coatings" },
  { name: "Preformed Thermoplastic", href: "/services/preformed-thermoplastic" },
  { name: "Decorative Driveways",    href: "/applications/private-driveways" },
]

const products = [
  { name: "StreetPrint",       slug: "streetprint",        desc: "Stamped asphalt impressions — brick, cobblestone & stone patterns." },
  { name: "StreetBond",        slug: "streetbond",         desc: "Durable coloured surface coatings for any paved application." },
  { name: "TrafficPatterns",   slug: "trafficpatterns",    desc: "Preformed thermoplastic for custom pavement art & branding." },
  { name: "TrafficPatternsXD", slug: "trafficpatterns-xd", desc: "Heavy-duty thermoplastic for high-traffic transit corridors." },
  { name: "DecoMark",          slug: "decomark",           desc: "Retroreflective thermoplastic for safety-critical markings." },
  { name: "DuraShield",        slug: "durashield",         desc: "Penetrating pavement coating and protective sealant." },
  { name: "DuraTherm",         slug: "duratherm",          desc: "High-build thermoplastic with textured anti-slip surface." },
  { name: "MMAX",              slug: "mmax",               desc: "MMA coating for durable transit lanes and crosswalks." },
  { name: "PreMark",           slug: "premark",            desc: "Preformed symbols, arrows & regulatory pavement markings." },
]

/* ─── Animation variants ─────────────────────────────────── */

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.06 },
  },
}

const fadeSlide = {
  hidden: { x: 16, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.22, ease: EASE },
  },
}

const vaporVariant = {
  hidden: { x: 16, opacity: 0, scale: 0.97 },
  show: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.28, ease: EASE, delay: 0.02 },
  },
}

/* ─── Component ──────────────────────────────────────────── */

type MegaMenu = "services" | "products" | null

export default function Nav() {
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [activeMega,     setActiveMega]     = useState<MegaMenu>(null)
  const [mobileServices, setMobileServices] = useState(false)
  const [mobileProducts, setMobileProducts] = useState(false)

  /* ── Lock body scroll when drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  /* ── Desktop mega menu hover logic ── */
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMenu = useCallback((which: MegaMenu) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMega(which)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 120)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMega(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const closeAll = () => {
    setMobileOpen(false)
    setActiveMega(null)
    setMobileServices(false)
    setMobileProducts(false)
  }

  const panelProps = {
    onMouseEnter: cancelClose,
    onMouseLeave: scheduleClose,
  }

  return (
    <>
      <style>{`
        @keyframes megaIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ─────────────────────────── Nav bar ─────────────────────────── */}
      <nav
        ref={navRef}
        className="relative sticky top-0 z-50 w-full bg-white/97 backdrop-blur-md border-b border-[#E8E4DE]"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-0">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo + wordmark ── */}
            <Link href="/" onClick={closeAll} className="flex-shrink-0 flex items-center gap-2.5 py-2">
              <div className="w-8 h-8 bg-[#D66620] rounded-md flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm tracking-tight">S1</span>
              </div>
              <span className="font-bold text-[#32373C] text-lg tracking-tight">Square One</span>
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden lg:flex items-center gap-1">

              {/* Services trigger */}
              <div
                onMouseEnter={() => openMenu("services")}
                onMouseLeave={scheduleClose}
              >
                <button
                  onClick={() => setActiveMega(activeMega === "services" ? null : "services")}
                  aria-expanded={activeMega === "services"}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeMega === "services"
                      ? "text-[#D66620] bg-[#FFF7F2]"
                      : "text-[#333333] hover:text-[#D66620] hover:bg-[#FFF7F2]"
                  }`}
                >
                  Services
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${activeMega === "services" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {/* Products trigger */}
              <div
                onMouseEnter={() => openMenu("products")}
                onMouseLeave={scheduleClose}
              >
                <button
                  onClick={() => setActiveMega(activeMega === "products" ? null : "products")}
                  aria-expanded={activeMega === "products"}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeMega === "products"
                      ? "text-[#D66620] bg-[#FFF7F2]"
                      : "text-[#333333] hover:text-[#D66620] hover:bg-[#FFF7F2]"
                  }`}
                >
                  Products
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${activeMega === "products" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              <Link
                href="/projects"
                onClick={closeAll}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#333333] hover:text-[#D66620] hover:bg-[#FFF7F2] transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/applications/private-driveways"
                onClick={closeAll}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-[#D66620] hover:bg-[#FFF7F2] transition-colors"
              >
                Driveways
              </Link>
              <Link
                href="/about"
                onClick={closeAll}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#333333] hover:text-[#D66620] hover:bg-[#FFF7F2] transition-colors"
              >
                About
              </Link>
            </div>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2">
              <a
                href="tel:18773910270"
                className="hidden lg:inline-flex items-center gap-1.5 text-[#626262] hover:text-[#D66620] text-sm font-medium transition-colors px-2 py-1"
              >
                1-877-391-0270
              </a>
              <Link href="/contact" onClick={closeAll} className="hidden lg:inline-flex">
                <span className="bg-[#D66620] hover:bg-[#C05A18] text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors">
                  Get a Quote
                </span>
              </Link>

              {/* ── Hamburger — three-line morph to X ── */}
              <button
                onClick={() => { setMobileOpen(!mobileOpen); setActiveMega(null) }}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg transition-colors"
                style={{
                  background: "rgba(50,55,60,0.08)",
                  border: "1px solid rgba(50,55,60,0.15)",
                }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {/* Three lines that morph to X */}
                <div className="relative w-[18px] h-[14px]">
                  <span
                    className="absolute left-0 rounded-full bg-[#32373C] transition-all duration-300 ease-in-out origin-center"
                    style={{
                      width: 18,
                      height: 2,
                      top: mobileOpen ? 6 : 0,
                      transform: mobileOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  />
                  <span
                    className="absolute left-0 rounded-full bg-[#32373C] transition-all duration-300 ease-in-out"
                    style={{
                      width: mobileOpen ? 0 : 18,
                      height: 2,
                      top: 6,
                      opacity: mobileOpen ? 0 : 1,
                    }}
                  />
                  <span
                    className="absolute left-0 rounded-full bg-[#32373C] transition-all duration-300 ease-in-out origin-center"
                    style={{
                      width: 18,
                      height: 2,
                      top: mobileOpen ? 6 : 12,
                      transform: mobileOpen ? "rotate(-45deg)" : "rotate(0deg)",
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Services mega panel — full width ── */}
        {activeMega === "services" && (
          <div
            {...panelProps}
            style={{ animation: "megaIn 200ms ease-out both" }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t-2 border-[#D66620] z-50"
          >
            <div className="grid grid-cols-[30%_40%_30%]">

              {/* Column 1: Editorial Feature — Vapor Blasting */}
              <div className="bg-[#32373C] text-white p-8 flex flex-col justify-between min-h-[340px]">
                <div>
                  <p className="text-[#D66620] text-[10px] uppercase tracking-[0.25em] font-semibold mb-3">
                    OUR DIFFERENTIATOR
                  </p>
                  <h3 className="text-white text-[28px] font-bold leading-tight mb-3">
                    Vapor Blasting
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-5">
                    BC&apos;s only mobile vapor blasting service. Dustless, precise, zero mess.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["No Silica Dust", "Mobile to Site", "BC Exclusive"].map((tag) => (
                      <span key={tag} className="text-xs border border-white/25 text-white/65 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/services/vapor-blasting"
                  onClick={closeAll}
                  className="text-sm font-bold text-[#D66620] hover:text-[#F07030] transition-colors mt-8"
                >
                  Explore Vapor Blasting →
                </Link>
              </div>

              {/* Column 2: Services list */}
              <div className="p-8">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D66620] font-semibold mb-4">
                  What We Do
                </p>
                <div className="space-y-0.5">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={closeAll}
                      className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-[#F9F5F2] border-l-2 border-transparent hover:border-[#D66620] group transition-all"
                    >
                      <span className="text-[#D66620] text-base mt-0.5 flex-shrink-0">{s.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[#333333] group-hover:text-[#D66620] transition-colors">
                            {s.name}
                          </p>
                          {s.slug === "vapor-blasting" && (
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-[#D66620] text-white px-1.5 py-0.5 rounded-full leading-none">
                              EXCLUSIVE
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#626262] leading-snug mt-0.5">{s.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="pt-4 mt-2 border-t border-[#F2EFE9]">
                  <Link
                    href="/services"
                    onClick={closeAll}
                    className="text-xs font-bold text-[#D66620] uppercase tracking-widest hover:text-[#C05A18] transition-colors"
                  >
                    View All Services →
                  </Link>
                </div>
              </div>

              {/* Column 3: Featured project card */}
              <div className="p-8 border-l border-[#F2EFE9]">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D66620] font-semibold mb-4">
                  Featured Project
                </p>
                <div className="relative h-44 rounded-xl overflow-hidden mb-4">
                  <Image
                    src="/images/products/streetprint/streetprint-1.jpg"
                    alt="Stamped asphalt crosswalk installation"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-[10px] uppercase tracking-wider text-white/75 bg-black/30 px-2 py-0.5 rounded-full">
                      Stamped Asphalt
                    </span>
                    <p className="text-white font-semibold text-sm mt-1.5">Decorative Crosswalk</p>
                    <p className="text-white/60 text-xs mt-0.5">Vancouver, BC</p>
                  </div>
                </div>
                <Link
                  href="/projects"
                  onClick={closeAll}
                  className="text-xs font-bold text-[#D66620] uppercase tracking-widest hover:text-[#C05A18] transition-colors"
                >
                  View All Projects →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── Products mega panel — full width ── */}
        {activeMega === "products" && (
          <div
            {...panelProps}
            style={{ animation: "megaIn 200ms ease-out both" }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t-2 border-[#D66620] z-50"
          >
            <div className="grid grid-cols-[25%_75%]">

              {/* Left sidebar: HUB info */}
              <div className="bg-[#32373C] text-white p-8 flex flex-col justify-between min-h-[320px]">
                <div>
                  <h3 className="text-white text-lg font-bold mb-1">
                    HUB Surface Systems
                  </h3>
                  <p className="text-white/60 text-sm mb-5">
                    Authorized Western Canada Applicator
                  </p>
                  <div className="w-10 h-0.5 bg-[#D66620] mb-5" />
                  <p className="text-white/70 text-sm leading-relaxed">
                    We install the full HUB product suite — specified by 500+ Canadian municipalities.
                  </p>
                </div>
                <Link
                  href="/products"
                  onClick={closeAll}
                  className="text-sm font-bold text-[#D66620] hover:text-[#F07030] transition-colors mt-6 block"
                >
                  Browse All Products →
                </Link>
              </div>

              {/* Right: product grid */}
              <div className="p-8">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D66620] font-semibold mb-5">
                  Product Line
                </p>
                <div className="grid grid-cols-3 gap-1">
                  {products.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      onClick={closeAll}
                      className="group px-3 py-3 rounded-lg hover:bg-gray-50 border-l-2 border-transparent hover:border-[#D66620] transition-all"
                    >
                      <p className="text-sm font-bold text-[#333333] group-hover:text-[#D66620] transition-colors leading-snug">
                        {p.name}
                      </p>
                      <p className="text-xs text-[#888] leading-snug mt-0.5">{p.desc}</p>
                      <p className="text-xs font-semibold text-[#D66620] mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn More →
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ─────────────────── Mobile drawer ─────────────────────────── */}

      {/* Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Drawer — slides in from right */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden fixed top-0 right-0 bottom-0 z-[70] bg-[#fafaf9] flex flex-col"
            style={{
              width: "min(85vw, 360px)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.15)",
              borderLeft: "1px solid rgba(0,0,0,0.06)",
              borderTop: "3px solid #D66620",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.32, 0, 0.2, 1] }}
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
          >
            {/* ── Drawer header ── */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0" style={{ background: "#ffffff" }}>
              <Link href="/" onClick={closeAll} className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#D66620] rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-sm tracking-tight">S1</span>
                </div>
                <span className="font-bold text-[#32373C] text-[15px]">Square One</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                style={{ width: 44, height: 44, minWidth: 44 }}
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="#32373C" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* ── Scrollable content ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="px-4 pt-4"
              >

                {/* Vapor Blasting — featured card */}
                <motion.div variants={vaporVariant}>
                  <Link
                    href="/services/vapor-blasting"
                    onClick={closeAll}
                    className="flex items-center gap-3 mb-3 rounded-xl px-5 py-4 transition-opacity active:opacity-70"
                    style={{
                      background: "rgba(214,102,32,0.08)",
                      border: "1px solid rgba(214,102,32,0.20)",
                    }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(214,102,32,0.15)" }}>
                      <Zap size={17} className="text-[#D66620]" fill="currentColor" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-[#32373C] text-sm">Vapor Blasting</span>
                        <span className="bg-[#D66620] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full leading-none">
                          Exclusive
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">BC&apos;s only mobile service</p>
                    </div>
                    <ChevronRight size={14} className="text-[#D66620] flex-shrink-0" />
                  </Link>
                </motion.div>

                {/* Services accordion */}
                <motion.div variants={fadeSlide} className="border-t border-gray-100">
                  <button
                    onClick={() => setMobileServices(!mobileServices)}
                    className="w-full flex items-center justify-between py-4 text-[#32373C] font-semibold text-lg min-h-[56px]"
                  >
                    Services
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-200 ${mobileServices ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileServices && (
                      <motion.div
                        key="services-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 space-y-0.5">
                          {drawerServiceLinks.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              onClick={closeAll}
                              className="flex items-center gap-3 min-h-[48px] py-2.5 px-4 text-gray-500 hover:text-[#D66620] active:text-[#D66620] text-sm font-medium transition-colors rounded-lg hover:bg-gray-50"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D66620] flex-shrink-0" />
                              {s.name}
                            </Link>
                          ))}
                          <Link
                            href="/services"
                            onClick={closeAll}
                            className="flex items-center min-h-[40px] px-4 pt-1 text-xs font-bold text-[#D66620] uppercase tracking-widest"
                          >
                            All Services →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Products accordion */}
                <motion.div variants={fadeSlide} className="border-t border-gray-100">
                  <button
                    onClick={() => setMobileProducts(!mobileProducts)}
                    className="w-full flex items-center justify-between py-4 text-[#32373C] font-semibold text-lg min-h-[56px]"
                  >
                    Products
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-200 ${mobileProducts ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileProducts && (
                      <motion.div
                        key="products-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 space-y-0.5">
                          {products.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/products/${p.slug}`}
                              onClick={closeAll}
                              className="flex items-center gap-3 min-h-[48px] py-2.5 px-4 text-gray-500 hover:text-[#D66620] active:text-[#D66620] text-sm font-medium transition-colors rounded-lg hover:bg-gray-50"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D66620] flex-shrink-0" />
                              {p.name}
                            </Link>
                          ))}
                          <Link
                            href="/products"
                            onClick={closeAll}
                            className="flex items-center min-h-[40px] px-4 pt-1 text-xs font-bold text-[#D66620] uppercase tracking-widest"
                          >
                            All Products →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Static links */}
                {[
                  { label: "Projects",  href: "/projects",                   highlight: false },
                  { label: "Driveways", href: "/applications/private-driveways", highlight: true  },
                  { label: "About",     href: "/about",                      highlight: false },
                ].map((item) => (
                  <motion.div key={item.href} variants={fadeSlide}>
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      className={`flex items-center min-h-[56px] py-4 text-lg font-semibold border-t border-gray-100 transition-colors ${
                        item.highlight
                          ? "text-[#D66620]"
                          : "text-[#32373C] hover:text-[#D66620]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ── Bottom CTA — always pinned ── */}
            <div className="px-5 py-5 border-t border-gray-100 flex-shrink-0 space-y-3" style={{ background: "#ffffff" }}>
              <Link href="/contact" onClick={closeAll} className="block">
                <span className="block w-full bg-[#D66620] hover:bg-[#C05A18] active:bg-[#B04E15] text-white text-center py-4 rounded-xl font-semibold text-base transition-colors">
                  Get a Free Quote
                </span>
              </Link>
              <Link href="/projects" onClick={closeAll} className="block">
                <span className="block w-full border border-gray-200 hover:border-[#D66620] text-[#32373C] hover:text-[#D66620] text-center py-3.5 rounded-xl font-semibold text-base transition-colors">
                  View Our Projects
                </span>
              </Link>
              <div className="flex items-center justify-center gap-4 pt-1">
                <a
                  href="tel:18773910270"
                  className="text-sm text-gray-400 hover:text-[#D66620] font-medium transition-colors"
                >
                  1-877-391-0270
                </a>
                <span className="text-gray-200">·</span>
                <a
                  href="mailto:info@squareonepaving.ca"
                  className="text-sm text-gray-400 hover:text-[#D66620] font-medium transition-colors"
                >
                  info@squareonepaving.ca
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
