"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion"

// ─── Data ──────────────────────────────────────────────────

interface ProductItem { label: string; href: string }
interface ProductColumn { category: string; items: ProductItem[] }

const productColumns: ProductColumn[] = [
  {
    category: "Stamped Asphalt",
    items: [
      { label: "StreetPrint", href: "/products/streetprint" },
      { label: "TrafficPatterns XD", href: "/products/trafficpatternsxd" },
    ],
  },
  {
    category: "Decorative Coatings",
    items: [
      { label: "StreetBond", href: "/products/streetbond" },
      { label: "StreetBondSR", href: "/products/streetbondsr" },
      { label: "MMAX", href: "/products/mmax" },
      { label: "DuraShield", href: "/products/durashield" },
    ],
  },
  {
    category: "Thermoplastic",
    items: [
      { label: "TrafficPatterns", href: "/products/trafficpatterns" },
      { label: "DecoMark", href: "/products/decomark" },
      { label: "DuraTherm", href: "/products/duratherm" },
      { label: "PreMark", href: "/products/premark" },
    ],
  },
]

interface ServiceItem { label: string; href: string; description: string }

const serviceItems: ServiceItem[] = [
  { label: "Asphalt Stamping", href: "/services/stamped-asphalt", description: "Custom patterns, slip-resistant, 8+ year life" },
  { label: "Decorative Coatings", href: "/services/decorative-coatings", description: "StreetBond systems for BC parks, plazas & transit" },
  { label: "Preformed Thermoplastic", href: "/services/preformed-thermoplastic", description: "High-visibility markings engineered to last" },
  { label: "Vapor Blasting", href: "/vapor-blasting", description: "Surface prep & line removal — zero chemicals" },
]

const vaporItems = [
  { label: "Surface Preparation", desc: "Profiling & cleaning — no chemical runoff" },
  { label: "Line & Marking Removal", desc: "Precision thermoplastic & paint removal" },
  { label: "Concrete & Asphalt Prep", desc: "Micro-blasting for coating adhesion" },
  { label: "BC-Wide Coverage", desc: "Lower Mainland to Vancouver Island" },
]

// ─── Animation ───────────────────────────────────────────────

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}
const panelT: Transition = { duration: 0.18, ease: "easeOut" }

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-shrink-0">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Products Panel ─────────────────────────────────────────────

function ProductsPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={panelVariants} initial="hidden" animate="visible" exit="exit" transition={panelT}
      className="absolute top-full left-0 right-0 bg-white border-b border-[#E2DDD8]"
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.10)" }}
    >
      <div className="max-w-[1500px] mx-auto px-8 py-10">
        <div className="grid grid-cols-[1fr_360px] gap-14">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8C8C8C] font-bold mb-7">Product Lines</p>
            <div className="grid grid-cols-3 gap-10">
              {productColumns.map((col) => (
                <div key={col.category}>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#C8601A] font-bold mb-3.5">{col.category}</p>
                  <ul className="space-y-0">
                    {col.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href} onClick={onClose}
                          className="flex items-center min-h-[40px] px-3 text-[13.5px] font-semibold text-[#111111] hover:text-[#C8601A] hover:bg-[#F6F4F0] border-l-2 border-transparent hover:border-[#C8601A] transition-all duration-150"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-9 pt-6 border-t border-[#E2DDD8] flex items-center gap-8">
              <Link href="/products" onClick={onClose} className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C8601A] hover:underline">
                View All Products →
              </Link>
              <Link href="/contact" onClick={onClose} className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C8601A] hover:underline">
                Download Spec Sheets →
              </Link>
            </div>
          </div>

          <div className="overflow-hidden" style={{ background: "#F6F4F0" }}>
            <div className="relative" style={{ height: 220 }}>
              <Image
                fill src="/images/applications/bus-bike-lanes/red-bus-lane-long-perspective-01.jpg"
                alt="StreetBond red bus lane corridor, British Columbia"
                className="object-cover" sizes="360px"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(17,17,17,0.72) 0%, transparent 55%)" }} />
              <div className="absolute bottom-4 left-5">
                <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/60 mb-0.5">Most Installed · BC</p>
                <p className="text-white font-black text-[15px] tracking-tight">StreetBond</p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-[13px] text-[#5A5A5A] leading-relaxed mb-4">
                The standard for decorative coatings on BC transit corridors, roundabouts, and urban plazas. Mountain-tested.
              </p>
              <Link href="/products/streetbond" onClick={onClose}
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8601A] hover:gap-3 transition-all"
              >
                Explore StreetBond <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Services Panel ─────────────────────────────────────────────

function ServicesPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={panelVariants} initial="hidden" animate="visible" exit="exit" transition={panelT}
      className="absolute top-full left-0 right-0 bg-white border-b border-[#E2DDD8]"
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.10)" }}
    >
      <div className="max-w-[1500px] mx-auto px-8 py-10">
        <div className="grid grid-cols-[1fr_360px] gap-14">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8C8C8C] font-bold mb-7">What We Do</p>
            <div className="grid grid-cols-2 gap-2">
              {serviceItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={onClose}
                  className="flex flex-col justify-center min-h-[76px] px-5 py-4 border-l-2 border-transparent hover:border-[#C8601A] hover:bg-[#F6F4F0] transition-all group"
                >
                  <span className="text-[14px] font-bold text-[#111111] group-hover:text-[#C8601A] transition-colors tracking-[-0.01em]">
                    {item.label}
                  </span>
                  <span className="text-[12px] text-[#5A5A5A] mt-1 leading-snug">{item.description}</span>
                </Link>
              ))}
            </div>
            <div className="mt-9 pt-6 border-t border-[#E2DDD8]">
              <Link href="/contact" onClick={onClose} className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C8601A] hover:underline">
                Book a Free Site Visit →
              </Link>
            </div>
          </div>

          <div className="overflow-hidden" style={{ background: "#F6F4F0" }}>
            <div className="relative" style={{ height: 220 }}>
              <Image
                fill src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
                alt="Stamped asphalt herringbone driveway, BC"
                className="object-cover" sizes="360px"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(17,17,17,0.72) 0%, transparent 55%)" }} />
              <div className="absolute bottom-4 left-5">
                <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/60 mb-0.5">Flagship Service · BC</p>
                <p className="text-white font-black text-[15px] tracking-tight">Stamped Asphalt</p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-[13px] text-[#5A5A5A] leading-relaxed mb-4">
                Custom herringbone, cobble, and slate patterns — engineered for BC driveways, crosswalks, and civic plazas.
              </p>
              <Link href="/services/stamped-asphalt" onClick={onClose}
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8601A] hover:gap-3 transition-all"
              >
                See Stamped Asphalt <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Vapor Blasting Panel (dark industrial) ───────────────────────────

function VaporBlastingPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={panelVariants} initial="hidden" animate="visible" exit="exit" transition={panelT}
      className="absolute top-full left-0 right-0 border-b border-[#1A2028]"
      style={{ background: "#0F1216", boxShadow: "0 20px 60px rgba(0,0,0,0.45)" }}
    >
      <div className="max-w-[1500px] mx-auto px-8 py-10">
        <div className="grid grid-cols-[1fr_360px] gap-14">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#E8895A] font-bold">Industrial Division</span>
              <span className="flex-1 h-px bg-white/10" />
            </div>
            <h3 className="text-white font-black mb-3" style={{ fontSize: "clamp(1.4rem, 2vw, 1.9rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              Vapor Blasting
            </h3>
            <p className="text-[#7A8A9A] text-[13px] leading-relaxed max-w-lg mb-8">
              Precision wet-abrasive blasting for surface prep, line removal, and old marking elimination.
              Zero chemical runoff — fully BC-compliant, contractor-ready across the Lower Mainland and Vancouver Island.
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {vaporItems.map((item) => (
                <div key={item.label}
                  className="border border-white/10 px-4 py-3.5 hover:border-[#E8895A]/40 hover:bg-white/5 transition-all"
                >
                  <p className="text-white text-[13px] font-bold tracking-[-0.01em]">{item.label}</p>
                  <p className="text-[#4A5A6A] text-[11px] mt-0.5 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-8">
              <Link href="/vapor-blasting" onClick={onClose}
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#E8895A] hover:gap-3 transition-all"
              >
                Explore Vapor Blasting <ArrowRight />
              </Link>
              <Link href="/contact" onClick={onClose}
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5A6878] hover:text-white transition-colors"
              >
                Get an Estimate →
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden border border-white/10">
            <Image
              fill src="/images/products/durashield/durashield-1.jpg"
              alt="Vapor blasting industrial surface preparation, BC"
              className="object-cover" sizes="360px"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex gap-6">
                {([["0", "Chemicals"], ["BC", "Wide"], ["Zero", "Dust"]] as [string, string][]).map(([n, l]) => (
                  <div key={l}>
                    <p className="text-white font-black text-xl leading-none tracking-tight">{n}</p>
                    <p className="text-white/40 text-[9px] uppercase tracking-[0.16em] mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Mobile Accordion ──────────────────────────────────────────────

function MobileAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#EDEBE7]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full min-h-[56px] px-6 text-[17px] font-bold text-[#2C2C2C] hover:text-[#C8601A] transition-colors"
        aria-expanded={open}
      >
        <span>{label}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true"
        >
          <path d="M1 4L6 9L11 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="ac"
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────

type ActivePanel = "products" | "services" | "vapor" | null

export default function Nav() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    fn(); window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  useEffect(() => {
    if (!activePanel) return
    const fn = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActivePanel(null)
    }
    document.addEventListener("mousedown", fn)
    return () => document.removeEventListener("mousedown", fn)
  }, [activePanel])

  useEffect(() => {
    if (!activePanel && !mobileOpen) return
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActivePanel(null); setMobileOpen(false) }
    }
    document.addEventListener("keydown", fn)
    return () => document.removeEventListener("keydown", fn)
  }, [activePanel, mobileOpen])

  const closeAll = () => { setActivePanel(null); setMobileOpen(false) }
  const togglePanel = (panel: ActivePanel) => setActivePanel(prev => prev === panel ? null : panel)

  const openPanel = (panel: ActivePanel) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    setActivePanel(panel)
  }
  const scheduleClose = () => {
    hoverTimer.current = setTimeout(() => setActivePanel(null), 150)
  }
  const cancelClose = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
  }

  const dropdownItems: { id: ActivePanel; label: string }[] = [
    { id: "products", label: "Products" },
    { id: "services", label: "Services" },
    { id: "vapor",    label: "Vapor Blasting" },
  ]

  const plainLinks = [
    { label: "Projects", href: "/projects" },
    { label: "Driveways", href: "/driveways" },
    { label: "About",    href: "/about" },
  ]

  return (
    <>
      <nav
        ref={navRef}
        onMouseLeave={scheduleClose}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? "bg-white/96 backdrop-blur-md border-b border-[#E2DDD8] shadow-[0_1px_24px_rgba(0,0,0,0.06)]"
            : "bg-white"
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <Link href="/" onClick={closeAll} className="flex-shrink-0 flex items-center py-2">
              <Image
                src="/images/logo/square-one-logo-dark.svg"
                alt="Square One Surface Solutions"
                width={194}
                height={32}
                priority
                className="object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center">
              {dropdownItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => togglePanel(id)}
                  onMouseEnter={() => openPanel(id)}
                  className={`relative flex items-center gap-1 px-4 py-2 text-[13px] font-semibold tracking-[-0.005em] transition-colors ${
                    activePanel === id ? "text-[#C8601A]" : "text-[#2C2C2C] hover:text-[#C8601A]"
                  }`}
                  aria-expanded={activePanel === id}
                >
                  {label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
                    className={`transition-transform duration-200 ${activePanel === id ? "rotate-180" : ""}`}
                  >
                    <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {activePanel === id && (
                    <motion.span
                      layoutId="nav-ul"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#C8601A]"
                    />
                  )}
                </button>
              ))}

              {plainLinks.map(({ label, href }) => (
                <Link key={href} href={href} onClick={closeAll}
                  className="px-4 py-2 text-[13px] font-semibold tracking-[-0.005em] text-[#2C2C2C] hover:text-[#C8601A] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <Link href="/contact" onClick={closeAll} className="hidden lg:inline-flex">
                <span
                  className="inline-flex items-center gap-2 text-white px-5 py-2.5 text-[13px] font-bold rounded-[5px] transition-all hover:brightness-110 hover:shadow-[0_4px_20px_rgba(200,96,26,0.30)]"
                  style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
                >
                  Get a Quote
                  <ArrowRight />
                </span>
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden relative w-11 h-11 flex items-center justify-center"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <span className="absolute block h-[2px] w-6 bg-[#111111] transition-all duration-300"
                  style={{ transform: mobileOpen ? "translateY(0) rotate(45deg)" : "translateY(-4px)" }} />
                <span className="absolute block h-[2px] w-6 bg-[#111111] transition-all duration-300"
                  style={{ transform: mobileOpen ? "translateY(0) rotate(-45deg)" : "translateY(4px)" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Mega panels */}
        <div onMouseEnter={cancelClose}>
          <AnimatePresence>
            {activePanel === "products" && <ProductsPanel key="products" onClose={closeAll} />}
          </AnimatePresence>
          <AnimatePresence>
            {activePanel === "services" && <ServicesPanel key="services" onClose={closeAll} />}
          </AnimatePresence>
          <AnimatePresence>
            {activePanel === "vapor" && <VaporBlastingPanel key="vapor" onClose={closeAll} />}
          </AnimatePresence>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div key="mob"
            className="lg:hidden fixed inset-0 z-[70] bg-white flex flex-col"
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-modal="true" role="dialog" aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between px-5 h-[68px] border-b border-[#E2DDD8] flex-shrink-0">
              <Link href="/" onClick={closeAll}>
                <Image
                  src="/images/logo/square-one-logo-dark.svg"
                  alt="Square One Surface Solutions"
                  width={160}
                  height={26}
                  className="object-contain"
                />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="relative w-11 h-11 flex items-center justify-center" aria-label="Close menu">
                <span className="absolute block h-[2px] w-6 bg-[#111111]" style={{ transform: "rotate(45deg)" }} />
                <span className="absolute block h-[2px] w-6 bg-[#111111]" style={{ transform: "rotate(-45deg)" }} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain pb-12">
              <MobileAccordion label="Products">
                {productColumns.map((col) => (
                  <div key={col.category} className="px-6 pt-3 pb-1">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#C8601A] font-bold mb-1">{col.category}</p>
                    {col.items.map((item) => (
                      <Link key={item.href} href={item.href} onClick={closeAll}
                        className="flex items-center min-h-[48px] pl-2 text-[15px] font-semibold text-[#2C2C2C] hover:text-[#C8601A] transition-colors border-l-2 border-transparent hover:border-[#C8601A]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="px-6 py-3 border-t border-[#EDEBE7] mt-2">
                  <Link href="/products" onClick={closeAll} className="text-sm font-bold text-[#C8601A] hover:underline">View All Products →</Link>
                </div>
              </MobileAccordion>

              <MobileAccordion label="Services">
                <div className="px-6 py-2 space-y-0.5">
                  {serviceItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={closeAll}
                      className="flex flex-col min-h-[56px] justify-center pl-2 py-2 border-l-2 border-transparent hover:border-[#C8601A] hover:bg-[#F6F4F0] transition-all"
                    >
                      <span className="text-[15px] font-bold text-[#2C2C2C]">{item.label}</span>
                      <span className="text-xs text-[#5A5A5A]">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion label="Vapor Blasting">
                <div className="px-6 py-3" style={{ background: "#F6F4F0" }}>
                  <p className="text-xs text-[#5A5A5A] mb-4">Industrial surface prep — no chemicals, BC-wide service.</p>
                  {vaporItems.map((item) => (
                    <div key={item.label} className="py-2.5 border-b border-[#EDEBE7] last:border-0">
                      <span className="text-[14px] font-bold text-[#2C2C2C] block">{item.label}</span>
                      <span className="text-xs text-[#5A5A5A]">{item.desc}</span>
                    </div>
                  ))}
                  <Link href="/vapor-blasting" onClick={closeAll}
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-[#C8601A] hover:underline"
                  >
                    Explore Vapor Blasting <ArrowRight />
                  </Link>
                </div>
              </MobileAccordion>

              {[
                { label: "Projects",  href: "/projects" },
                { label: "Driveways", href: "/driveways" },
                { label: "About",     href: "/about" },
                { label: "Contact",   href: "/contact" },
              ].map(({ label, href }) => (
                <Link key={href} href={href} onClick={closeAll}
                  className="flex items-center min-h-[56px] px-6 text-[17px] font-bold text-[#2C2C2C] border-b border-[#EDEBE7] hover:text-[#C8601A] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex-shrink-0 border-t border-[#E2DDD8]">
              <Link href="/contact" onClick={closeAll}
                className="flex items-center justify-center gap-2 text-white py-4 text-sm font-bold tracking-[0.08em] uppercase transition-all hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
              >
                Get a Quote <ArrowRight />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
