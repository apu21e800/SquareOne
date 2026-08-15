"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion"

interface ProductItem { label: string; href: string; tag?: string }
interface ProductColumn { category: string; items: ProductItem[]; accent: string }

const productColumns: ProductColumn[] = [
  {
    category: "Stamped Asphalt",
    accent: "01",
    items: [
      { label: "StreetPrint", href: "/products/streetprint", tag: "Imprint System" },
      { label: "TrafficPatterns XD", href: "/products/trafficpatternsxd", tag: "Heavy Traffic" },
    ],
  },
  {
    category: "Decorative Coatings",
    accent: "02",
    items: [
      { label: "StreetBond", href: "/products/streetbond", tag: "Flagship" },
      { label: "StreetBondSR", href: "/products/streetbondsr", tag: "Solar Reflective" },
      { label: "MMAX", href: "/products/mmax", tag: "Bus Lanes" },
      { label: "DuraShield", href: "/products/durashield", tag: "Sealcoat" },
    ],
  },
  {
    category: "Thermoplastic",
    accent: "03",
    items: [
      { label: "TrafficPatterns", href: "/products/trafficpatterns", tag: "Inset Marking" },
      { label: "DecoMark", href: "/products/decomark", tag: "Custom Graphics" },
      { label: "DuraTherm", href: "/products/duratherm", tag: "Premium" },
      { label: "PreMark", href: "/products/premark", tag: "MUTCD Compliant" },
    ],
  },
]

interface ServiceItem { label: string; href: string; description: string; eyebrow: string }

const serviceItems: ServiceItem[] = [
  { label: "Stamped Asphalt", href: "/services/stamped-asphalt", description: "Custom patterns, slip-resistant, 8+ year life", eyebrow: "01" },
  { label: "Decorative Coatings", href: "/services/decorative-coatings", description: "StreetBond systems for parks, plazas, transit", eyebrow: "02" },
  { label: "Preformed Thermoplastic", href: "/services/preformed-thermoplastic", description: "High-visibility markings that last", eyebrow: "03" },
  { label: "Vapor Blasting", href: "/services/vapor-blasting", description: "Surface prep & removal, no chemicals", eyebrow: "04" },
]

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const panelTransitionIn: Transition = { duration: 0.25, ease: [0.22, 1, 0.36, 1] }

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function ProductsPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div variants={panelVariants} initial="hidden" animate="visible" exit="exit" transition={panelTransitionIn}
      className="absolute top-full left-0 right-0 bg-white border-b border-[#E2DDD8] shadow-[0_24px_64px_rgba(0,0,0,0.10)]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-10">
        <div className="grid grid-cols-[1fr_400px] gap-12">
          <div className="grid grid-cols-3 gap-10">
            {productColumns.map((col) => (
              <div key={col.category}>
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#E2DDD8]">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#F26430] font-bold">{col.accent}</span>
                  <span className="text-[10.5px] uppercase tracking-[0.16em] text-[#0A0A0A] font-semibold">{col.category}</span>
                </div>
                <ul className="space-y-1">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={onClose}
                        className="group/item flex items-center justify-between min-h-[44px] px-3 -mx-3 text-[13.5px] font-semibold tracking-[0.005em] text-[#0A0A0A] hover:text-[#F26430] hover:bg-[#F6F4F0] rounded-sm transition-all">
                        <span>{item.label}</span>
                        {item.tag && (
                          <span className="text-[9.5px] uppercase tracking-[0.18em] text-[#8C8C8C] group-hover/item:text-[#F26430] transition-colors font-medium">
                            {item.tag}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link href="/products/streetbond" onClick={onClose} className="group relative bg-[#0F1115] overflow-hidden block">
            <div className="relative aspect-[4/3.2]">
              <Image fill src="/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg"
                alt="StreetBond at transit plaza" className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" sizes="400px" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(15,17,21,0.96)] via-[rgba(15,17,21,0.40)] to-transparent" />
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-white font-semibold">Most Specified</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-white font-light text-2xl tracking-[-0.02em] leading-tight mb-2">StreetBond by HUB</h4>
                <p className="text-white/70 text-[13px] leading-[1.6] mb-4 font-light max-w-[280px]">
                  Our most-installed decorative coating &mdash; proven on BC transit corridors, cycle lanes, and urban plazas.
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-white border-b border-white/40 pb-1.5 group-hover:border-[#F26430] group-hover:text-[#FF8A5C] transition-all">
                  Explore StreetBond<ArrowRight />
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E2DDD8] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/products" onClick={onClose} className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-semibold text-[#0A0A0A] hover:text-[#F26430] transition-colors">
              View All Products<ArrowRight />
            </Link>
            <Link href="/products" onClick={onClose} className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-semibold text-[#5A5A5A] hover:text-[#F26430] transition-colors">
              Download Spec Sheets<ArrowRight />
            </Link>
          </div>
          <p className="text-[11px] text-[#8C8C8C] tracking-[0.04em]">
            Authorized HUB Surface Systems Applicator
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function ServicesPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div variants={panelVariants} initial="hidden" animate="visible" exit="exit" transition={panelTransitionIn}
      className="absolute top-full left-0 right-0 bg-white border-b border-[#E2DDD8] shadow-[0_24px_64px_rgba(0,0,0,0.10)]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-10">
        <div className="grid grid-cols-[1fr_400px] gap-12">
          <div className="grid grid-cols-2 gap-3">
            {serviceItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose}
                className="group relative flex flex-col justify-between min-h-[120px] p-5 border border-[#E2DDD8] hover:border-[#F26430]/50 hover:bg-[#FAF7F4] transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[#F26430] font-bold">{item.eyebrow}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity"><ArrowRight /></span>
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold tracking-[-0.005em] text-[#0A0A0A] group-hover:text-[#F26430] transition-colors mb-1.5">{item.label}</h4>
                  <p className="text-[12.5px] text-[#5A5A5A] leading-[1.5] font-light">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/services/stamped-asphalt" onClick={onClose} className="group relative bg-[#0F1115] overflow-hidden block">
            <div className="relative aspect-[4/3.2]">
              <Image fill src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
                alt="Stamped asphalt estate driveway" className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" sizes="400px" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(15,17,21,0.96)] via-[rgba(15,17,21,0.30)] to-transparent" />
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-white font-semibold">Flagship Service</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-white font-light text-2xl tracking-[-0.02em] leading-tight mb-2">Stamped Asphalt</h4>
                <p className="text-white/70 text-[13px] leading-[1.6] mb-4 font-light max-w-[280px]">
                  Custom patterns, slip-resistant, 8+ year life. Our foundational service for driveways, crosswalks, and plazas.
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-white border-b border-white/40 pb-1.5 group-hover:border-[#F26430] group-hover:text-[#FF8A5C] transition-all">
                  See stamped asphalt<ArrowRight />
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E2DDD8] flex flex-wrap items-center justify-between gap-4">
          <Link href="/contact" onClick={onClose} className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-semibold text-[#0A0A0A] hover:text-[#F26430] transition-colors">
            Book a Site Visit<ArrowRight />
          </Link>
          <p className="text-[11px] text-[#8C8C8C] tracking-[0.04em]">25 years &middot; 51+ BC communities &middot; Mobile across BC</p>
        </div>
      </div>
    </motion.div>
  )
}

interface MobileAccordionProps { label: string; children: React.ReactNode }

function MobileAccordion({ label, children }: MobileAccordionProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#EDEBE7]">
      <button onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full min-h-[56px] px-6 text-[17px] font-medium text-[#2C2C2C] hover:text-[#F26430] transition-colors"
        aria-expanded={open}>
        <span>{label}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true">
          <path d="M1 4L6 9L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="accordion-content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }} className="overflow-hidden">
            <div className="pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type ActivePanel = "products" | "services" | null

export default function Nav() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  useEffect(() => {
    if (!activePanel) return
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActivePanel(null)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [activePanel])

  useEffect(() => {
    if (!activePanel && !mobileOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActivePanel(null); setMobileOpen(false) }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [activePanel, mobileOpen])

  const closeAll = () => { setActivePanel(null); setMobileOpen(false) }
  const togglePanel = (panel: ActivePanel) => { setActivePanel((prev) => (prev === panel ? null : panel)) }

  const chevronDown = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="inline-block ml-1.5 flex-shrink-0">
      <path d="M1 3.5L5.5 8L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <>
      <nav ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md border-b border-[#E2DDD8] shadow-[0_2px_24px_rgba(0,0,0,0.04)]" : "bg-white/80 backdrop-blur-sm"}`}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[68px]">
            <Link href="/" onClick={closeAll} className="flex-shrink-0 inline-flex items-center group" aria-label="Square One Paving — home">
              <Image
                src="/images/logo/SquareOne-wordmark-dark.svg"
                alt="Square One Paving"
                width={200}
                height={32}
                className="h-7 lg:h-8 w-auto"
                priority
              />
            </Link>

            <div className="hidden lg:flex items-center gap-0">
              <button onClick={() => togglePanel("products")}
                className={`flex items-center px-4 py-2 text-[13px] font-semibold tracking-[0.005em] transition-colors ${activePanel === "products" ? "text-[#F26430]" : "text-[#0A0A0A] hover:text-[#F26430]"}`}
                aria-expanded={activePanel === "products"} aria-haspopup="true">
                Products
                <span className={`transition-transform duration-200 ${activePanel === "products" ? "rotate-180" : ""}`}>{chevronDown}</span>
              </button>

              <button onClick={() => togglePanel("services")}
                className={`flex items-center px-4 py-2 text-[13px] font-semibold tracking-[0.005em] transition-colors ${activePanel === "services" ? "text-[#F26430]" : "text-[#0A0A0A] hover:text-[#F26430]"}`}
                aria-expanded={activePanel === "services"} aria-haspopup="true">
                Services
                <span className={`transition-transform duration-200 ${activePanel === "services" ? "rotate-180" : ""}`}>{chevronDown}</span>
              </button>

              {([
                { label: "Projects", href: "/projects" },
                { label: "Driveways", href: "/driveways" },
                { label: "Resources", href: "/resources" },
                { label: "Blog", href: "/blog" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ] as const).map((link) => (
                <Link key={link.href} href={link.href} onClick={closeAll}
                  className="px-4 py-2 text-[13px] font-semibold tracking-[0.005em] text-[#0A0A0A] hover:text-[#F26430] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Proudly Canadian flag — standalone, premium */}
              <span className="hidden xl:flex items-center gap-2 pr-3 mr-1 border-r border-[#E2DDD8]" aria-label="Proudly Canadian">
                <svg viewBox="0 0 32 16" style={{ width: 26, height: 13, display: 'inline-block', flexShrink: 0 }} aria-hidden="true">
                  <rect x="0" y="0" width="8" height="16" fill="#D80621" />
                  <rect x="8" y="0" width="16" height="16" fill="#FFFFFF" />
                  <rect x="24" y="0" width="8" height="16" fill="#D80621" />
                  <path d="M16 3.2 L16.55 5.4 L18.25 4.95 L17.55 6.55 L19 7.55 L17.4 8.05 L17.85 9.65 L16.5 8.55 L16 10.7 L15.5 8.55 L14.15 9.65 L14.6 8.05 L13 7.55 L14.45 6.55 L13.75 4.95 L15.45 5.4 Z" fill="#D80621" />
                </svg>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#5A5A5A] font-semibold whitespace-nowrap">Proudly Canadian</span>
              </span>

              <Link href="/contact" onClick={closeAll} className="hidden lg:inline-flex">
                <span className="group inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-5 py-2.5 text-[12.5px] font-semibold tracking-[0.04em] uppercase rounded-none transition-all hover:bg-[#F26430] hover:shadow-[0_8px_24px_rgba(242,100,48,0.30)]">
                  Get a Quote<ArrowRight />
                </span>
              </Link>

              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden relative w-11 h-11 flex items-center justify-center"
                aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
                <span className="absolute block h-[2px] w-6 bg-[#0A0A0A] transition-all duration-300"
                  style={{ transform: mobileOpen ? "translateY(0) rotate(45deg)" : "translateY(-4px)" }} />
                <span className="absolute block h-[2px] w-6 bg-[#0A0A0A] transition-all duration-300"
                  style={{ transform: mobileOpen ? "translateY(0) rotate(-45deg)" : "translateY(4px)" }} />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>{activePanel === "products" && <ProductsPanel key="products-panel" onClose={closeAll} />}</AnimatePresence>
        <AnimatePresence>{activePanel === "services" && <ServicesPanel key="services-panel" onClose={closeAll} />}</AnimatePresence>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div key="mobile-menu" className="lg:hidden fixed inset-0 w-full h-full z-[70] bg-white flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }} aria-modal="true" role="dialog" aria-label="Navigation menu">

            <div className="flex items-center justify-between px-5 h-[68px] border-b border-[#E2DDD8] flex-shrink-0">
              <Link href="/" onClick={closeAll} className="inline-flex items-center">
                <Image src="/images/logo/SquareOne-wordmark-dark.svg" alt="Square One Paving" width={170} height={28} className="h-7 w-auto" />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="relative w-11 h-11 flex items-center justify-center hover:bg-[#F6F4F0] transition-colors" aria-label="Close menu">
                <span className="absolute block h-[2px] w-6 bg-[#0A0A0A] transition-all duration-300" style={{ transform: "translateY(0) rotate(45deg)" }} />
                <span className="absolute block h-[2px] w-6 bg-[#0A0A0A] transition-all duration-300" style={{ transform: "translateY(0) rotate(-45deg)" }} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain pb-12">
              <MobileAccordion label="Products">
                {productColumns.map((col) => (
                  <div key={col.category} className="px-6 pt-3 pb-1">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#F26430] font-bold mb-1">{col.category}</p>
                    {col.items.map((item) => (
                      <Link key={item.href} href={item.href} onClick={closeAll}
                        className="flex items-center min-h-[48px] pl-2 text-[15px] font-medium text-[#2C2C2C] hover:text-[#F26430] transition-colors border-l-2 border-transparent hover:border-[#F26430]">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="px-6 py-3 border-t border-[#EDEBE7] mt-2 space-y-2">
                  <div className="flex items-center gap-5 flex-wrap">
                    <Link href="/products" onClick={closeAll} className="text-sm font-semibold text-[#F26430] hover:underline">View All Products &rarr;</Link>
                    <Link href="/resources" onClick={closeAll} className="text-sm font-semibold text-[#5A5A5A] hover:text-[#F26430] hover:underline">Download Spec Sheets &rarr;</Link>
                  </div>
                  <p className="text-[11px] text-[#8C8C8C] tracking-[0.04em]">Authorized HUB Surface Systems Applicator</p>
                </div>
              </MobileAccordion>

              <MobileAccordion label="Services">
                <div className="px-6 py-2 space-y-0.5">
                  {serviceItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={closeAll}
                      className="flex flex-col min-h-[56px] justify-center pl-2 py-2 border-l-2 border-transparent hover:border-[#F26430] hover:bg-[#F6F4F0] transition-all">
                      <span className="text-[15px] font-medium text-[#2C2C2C] hover:text-[#F26430]">{item.label}</span>
                      <span className="text-xs text-[#5A5A5A]">{item.description}</span>
                    </Link>
                  ))}
                </div>
                <div className="px-6 py-3 border-t border-[#EDEBE7] mt-1 space-y-1.5">
                  <Link href="/contact" onClick={closeAll} className="text-sm font-semibold text-[#F26430] hover:underline">Book a Site Visit &rarr;</Link>
                  <p className="text-[11px] text-[#8C8C8C] tracking-[0.04em]">25 years &middot; 51+ BC communities &middot; Mobile across BC</p>
                </div>
              </MobileAccordion>

              {([
                { label: "Projects", href: "/projects" },
                { label: "Driveways", href: "/driveways" },
                { label: "Resources", href: "/resources" },
                { label: "Blog", href: "/blog" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ] as const).map((link) => (
                <Link key={link.href} href={link.href} onClick={closeAll}
                  className="flex items-center min-h-[56px] px-6 text-[17px] font-medium text-[#2C2C2C] border-b border-[#EDEBE7] hover:text-[#F26430] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex-shrink-0 border-t border-[#E2DDD8] bg-white">
              <Link href="/contact" onClick={closeAll}
                className="block bg-[#0A0A0A] text-white text-center py-4 text-sm font-semibold tracking-[0.1em] uppercase transition-all hover:bg-[#F26430]">
                Get a Quote &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
