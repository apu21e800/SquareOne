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
    desc: "Surface restoration — paint, coatings, graffiti, and rust removed without damage.",
    icon: "◌",
  },
]

const drawerServiceLinks = [
  { name: "Stamped Asphalt",         href: "/services/stamped-asphalt" },
  { name: "Decorative Coatings",     href: "/services/decorative-coatings" },
  { name: "Preformed Thermoplastic", href: "/services/preformed-thermoplastic" },
  { name: "Vapor Blasting",          href: "/vapor-blasting" },
]


/* ─── Animation variants ─────────────────────────────────── */

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
}

const fadeSlide = {
  hidden: { x: 16, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.22, ease: EASE } },
}

const vaporVariant = {
  hidden: { x: 16, opacity: 0, scale: 0.97 },
  show: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.28, ease: EASE, delay: 0.02 } },
}

/* ─── Component ──────────────────────────────────────────── */

type MegaMenu = "services" | null

export default function Nav() {
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [activeMega,     setActiveMega]     = useState<MegaMenu>(null)
  const [mobileServices, setMobileServices] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

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
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveMega(null)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const closeAll = () => {
    setMobileOpen(false)
    setActiveMega(null)
    setMobileServices(false)
  }

  const panelProps = { onMouseEnter: cancelClose, onMouseLeave: scheduleClose }

  return (
    <>
      <style>{`
        @keyframes megaIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Nav bar ── */}
      <nav ref={navRef} className="relative sticky top-0 z-50 w-full bg-white border-b border-[#E2DDD8]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-0">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo + wordmark — inline, not stacked ── */}
            <Link href="/" onClick={closeAll} className="flex-shrink-0 flex items-center gap-3 py-2 group">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image src="/images/square-one-logo.png" alt="Square One Paving" fill className="object-contain" sizes="36px" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-[#32373C] text-base tracking-tight leading-none">Square One</span>
                <span className="text-[#C85A3A] font-bold text-[11px] uppercase tracking-[0.14em] leading-none">Paving</span>
              </div>
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Services trigger */}
              <div onMouseEnter={() => openMenu("services")} onMouseLeave={scheduleClose}>
                <button
                  onClick={() => setActiveMega(activeMega === "services" ? null : "services")}
                  aria-expanded={activeMega === "services"}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeMega === "services" ? "text-[#C85A3A] bg-[#FFF7F2]" : "text-[#2D2D2D] hover:text-[#C8601A] hover:bg-[#FFF7F2]"
                  }`}
                >
                  Services
                  <ChevronDown size={13} className={`transition-transform duration-200 ${activeMega === "services" ? "rotate-180" : ""}`} />
                </button>
              </div>

              <Link href="/projects" onClick={closeAll} className="px-3 py-2 rounded-lg text-sm font-medium text-[#2D2D2D] hover:text-[#C8601A] hover:bg-[#FFF7F2] transition-colors">
                Projects
              </Link>
              <Link href="/driveways" onClick={closeAll} className="px-3 py-2 text-sm font-medium text-[#2D2D2D] hover:text-[#C8601A] hover:bg-[#FFF7F2] transition-colors">
                Driveways
              </Link>
              <Link href="/vapor-blasting" onClick={closeAll} className="px-3 py-2 text-sm font-medium text-[#2D2D2D] hover:text-[#C8601A] hover:bg-[#FFF7F2] transition-colors">
                Vapor Blasting
              </Link>
              <Link href="/about" onClick={closeAll} className="px-3 py-2 rounded-lg text-sm font-medium text-[#2D2D2D] hover:text-[#C8601A] hover:bg-[#FFF7F2] transition-colors">
                About
              </Link>
              <Link href="/contact" onClick={closeAll} className="px-3 py-2 rounded-lg text-sm font-medium text-[#2D2D2D] hover:text-[#C8601A] hover:bg-[#FFF7F2] transition-colors">
                Contact
              </Link>
            </div>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2">
              <Link href="/contact" onClick={closeAll} className="hidden lg:inline-flex">
                <span className="bg-[#1C2026] hover:bg-[#C8601A] text-white px-5 py-2.5 font-semibold text-sm tracking-[0.06em] uppercase transition-colors duration-200">
                  Get a Quote
                </span>
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => { setMobileOpen(!mobileOpen); setActiveMega(null) }}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg transition-colors"
                style={{ background: "rgba(50,55,60,0.08)", border: "1px solid rgba(50,55,60,0.15)" }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-[18px] h-[14px]">
                  <span className="absolute left-0 rounded-full bg-[#32373C] transition-all duration-300 ease-in-out origin-center"
                    style={{ width: 18, height: 2, top: mobileOpen ? 6 : 0, transform: mobileOpen ? "rotate(45deg)" : "rotate(0deg)" }} />
                  <span className="absolute left-0 rounded-full bg-[#32373C] transition-all duration-300 ease-in-out"
                    style={{ width: mobileOpen ? 0 : 18, height: 2, top: 6, opacity: mobileOpen ? 0 : 1 }} />
                  <span className="absolute left-0 rounded-full bg-[#32373C] transition-all duration-300 ease-in-out origin-center"
                    style={{ width: 18, height: 2, top: mobileOpen ? 6 : 12, transform: mobileOpen ? "rotate(-45deg)" : "rotate(0deg)" }} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Services mega panel ── */}
        {activeMega === "services" && (
          <div
            {...panelProps}
            style={{ animation: "megaIn 200ms ease-out both" }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t-2 border-[#C8601A] z-50"
          >
            <div className="grid grid-cols-[28%_42%_30%] min-h-[400px]">

              {/* Col 1: Vapor Blasting feature — dark panel */}
              <div className="bg-[#2D2D2D] text-white p-8 flex flex-col justify-between">
                <div>
                  <p className="text-[#C85A3A] text-[10px] uppercase tracking-[0.25em] font-bold mb-4">
                    Signature Service
                  </p>
                  <h3 className="text-white text-2xl font-black leading-tight mb-4" style={{ color: "#ffffff" }}>
                    Vapor<br />Blasting
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-6">
                    Wet abrasive blasting for road marking removal, surface prep, and restoration.
                  </p>
                  <div className="space-y-2">
                    {["✓ No Dust", "✓ Mobile Service", "✓ BC Coverage"].map((tag) => (
                      <div key={tag} className="text-sm text-white/80 font-medium">{tag}</div>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <div className="w-full h-px bg-white/10 mb-5" />
                  <Link
                    href="/vapor-blasting"
                    onClick={closeAll}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#C8601A] hover:text-white transition-colors group"
                  >
                    Learn More
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Col 2: Services list */}
              <div className="p-8 bg-white">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C85A3A] font-bold mb-5">
                  Our Services
                </p>
                <div className="space-y-1">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={closeAll}
                      className="flex items-start gap-3 px-3 py-3.5 rounded-lg hover:bg-[#F5F3F0] border-l-2 border-transparent hover:border-[#C8601A] group transition-all"
                    >
                      <span className="text-[#C85A3A] text-base mt-0.5 flex-shrink-0">{s.icon}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-[#2D2D2D] group-hover:text-[#C8601A] transition-colors">{s.name}</p>
                          {s.slug === "vapor-blasting" && (
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-[#C85A3A] text-white px-1.5 py-0.5 rounded-full leading-none">
                              SIGNATURE
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#8B8680] leading-snug">{s.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="pt-5 mt-3 border-t border-[#E8E4DE]">
                  <Link href="/services" onClick={closeAll} className="text-xs font-bold text-[#C85A3A] uppercase tracking-widest hover:text-[#B74D2E] transition-colors">
                    View All Services →
                  </Link>
                </div>
              </div>

              {/* Col 3: Featured project */}
              <div className="p-8 bg-[#F5F3F0] border-l border-[#E8E4DE]">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C85A3A] font-bold mb-5">
                  Featured Project
                </p>
                <div className="relative h-48 rounded-xl overflow-hidden mb-5">
                  <Image
                    src="/images/products/streetprint/streetprint-1.jpg"
                    alt="Stamped asphalt crosswalk installation"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-[10px] uppercase tracking-wider text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      Stamped Asphalt
                    </span>
                    <p className="text-white font-bold text-sm mt-1.5 leading-tight">Downtown Crosswalk Enhancement</p>
                    <p className="text-white/60 text-xs mt-0.5">Vancouver, BC</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E8E4DE] mb-4">
                  <p className="text-xs text-[#8B8680] leading-relaxed">
                    StreetPrint stamped asphalt with brick pattern and retroreflective finish.
                  </p>
                </div>
                <Link href="/projects" onClick={closeAll} className="text-xs font-bold text-[#C85A3A] uppercase tracking-widest hover:text-[#B74D2E] transition-colors">
                  View All Projects →
                </Link>
              </div>
            </div>
          </div>
        )}

      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

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
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.32, 0, 0.2, 1] }}
            aria-modal="true" role="dialog" aria-label="Navigation menu"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0 bg-white">
              <Link href="/" onClick={closeAll} className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image src="/images/square-one-logo.png" alt="Square One Paving" fill className="object-contain" sizes="32px" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-black text-[#32373C] text-[15px] leading-none">Square One</span>
                  <span className="text-[#C85A3A] font-bold text-[11px] uppercase tracking-[0.14em] leading-none">Paving</span>
                </div>
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

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="px-4 pt-4">

                {/* Vapor Blasting featured card */}
                <motion.div variants={vaporVariant}>
                  <Link
                    href="/vapor-blasting"
                    onClick={closeAll}
                    className="flex items-center gap-3 mb-3 rounded-xl px-5 py-4 transition-opacity active:opacity-70"
                    style={{ background: "rgba(200,90,58,0.08)", border: "1px solid rgba(200,90,58,0.20)" }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,90,58,0.15)" }}>
                      <Zap size={17} className="text-[#C85A3A]" fill="currentColor" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-[#32373C] text-sm">Vapor Blasting</span>
                        <span className="bg-[#C85A3A] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full leading-none">Signature</span>
                      </div>
                      <p className="text-xs text-gray-400">Surface prep & restoration</p>
                    </div>
                    <ChevronRight size={14} className="text-[#C85A3A] flex-shrink-0" />
                  </Link>
                </motion.div>

                {/* Services accordion */}
                <motion.div variants={fadeSlide} className="border-t border-gray-100">
                  <button
                    onClick={() => setMobileServices(!mobileServices)}
                    className="w-full flex items-center justify-between py-4 text-[#32373C] font-semibold text-lg min-h-[56px]"
                  >
                    Services
                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${mobileServices ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileServices && (
                      <motion.div key="services-panel"
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }} className="overflow-hidden"
                      >
                        <div className="pb-4 space-y-0.5">
                          {drawerServiceLinks.map((s) => (
                            <Link key={s.href} href={s.href} onClick={closeAll}
                              className="flex items-center gap-3 min-h-[48px] py-2.5 px-4 text-gray-500 hover:text-[#C8601A] active:text-[#C8601A] text-sm font-medium transition-colors rounded-lg hover:bg-gray-50">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C85A3A] flex-shrink-0" />
                              {s.name}
                            </Link>
                          ))}
                          <Link href="/services" onClick={closeAll} className="flex items-center min-h-[40px] px-4 pt-1 text-xs font-bold text-[#C85A3A] uppercase tracking-widest">
                            All Services →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Static links */}
                {[
                  { label: "Projects",      href: "/projects",      highlight: false },
                  { label: "Driveways",     href: "/driveways",     highlight: false },
                  { label: "Vapor Blasting", href: "/vapor-blasting", highlight: false },
                  { label: "About",         href: "/about",         highlight: false },
                  { label: "Contact",       href: "/contact",        highlight: false },
                ].map((item) => (
                  <motion.div key={item.href} variants={fadeSlide}>
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      className={`flex items-center min-h-[56px] py-4 text-lg font-semibold border-t border-gray-100 transition-colors ${
                        item.highlight ? "text-[#C85A3A]" : "text-[#32373C] hover:text-[#C8601A]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <div className="px-5 py-5 border-t border-gray-100 flex-shrink-0 space-y-3 bg-white">
              <Link href="/contact" onClick={closeAll} className="block">
                <span className="block w-full bg-[#1C2026] hover:bg-[#C8601A] text-white text-center py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors">
                  Get a Quote
                </span>
              </Link>
              <div className="flex items-center justify-center gap-4 pt-1">
                <a href="tel:16043098212" className="text-sm text-gray-400 hover:text-[#C8601A] font-medium transition-colors">604-309-8212</a>
                <span className="text-gray-200">·</span>
                <a href="mailto:info@squareonepaving.ca" className="text-sm text-gray-400 hover:text-[#C8601A] font-medium transition-colors">info@squareonepaving.ca</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
