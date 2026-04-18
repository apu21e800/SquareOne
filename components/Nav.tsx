"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface ProductItem {
  label: string
  href: string
}

interface ProductColumn {
  category: string
  items: ProductItem[]
}

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

interface ServiceItem {
  label: string
  href: string
  description: string
}

const serviceItems: ServiceItem[] = [
  {
    label: "Asphalt Stamping",
    href: "/services/stamped-asphalt",
    description: "Custom patterns, slip-resistant, 8+ year life",
  },
  {
    label: "Decorative Coatings",
    href: "/services/decorative-coatings",
    description: "StreetBond systems for parks, plazas, transit",
  },
  {
    label: "Preformed Thermoplastic",
    href: "/services/preformed-thermoplastic",
    description: "High-visibility markings that last",
  },
  {
    label: "Vapor Blasting",
    href: "/services/vapor-blasting",
    description: "Surface prep & removal, no chemicals",
  },
]

// ---------------------------------------------------------------------------
// Shared animation variant
// ---------------------------------------------------------------------------

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const panelTransitionIn: Transition = { duration: 0.18, ease: "easeOut" }

// ---------------------------------------------------------------------------
// Products mega panel
// ---------------------------------------------------------------------------

function ProductsPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={panelTransitionIn}
      className="absolute top-full left-0 right-0 bg-white border-b border-[#E2DDD8]"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          {productColumns.map((col) => (
            <div key={col.category}>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#8C8C8C] font-semibold mb-3">
                {col.category}
              </p>
              <ul className="space-y-0.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center min-h-[38px] px-3 text-sm font-semibold text-[#111111] hover:text-[#C8601A] hover:bg-[#F6F4F0] border-l-2 border-transparent hover:border-[#C8601A] transition-all"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-8 pt-5 border-t border-[#E2DDD8] flex items-center gap-8">
          <Link
            href="/products"
            onClick={onClose}
            className="text-sm font-semibold text-[#C8601A] hover:underline"
          >
            View All Products →
          </Link>
          <Link
            href="/products"
            onClick={onClose}
            className="text-sm font-semibold text-[#C8601A] hover:underline"
          >
            Download Spec Sheets →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Services mega panel
// ---------------------------------------------------------------------------

function ServicesPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={panelTransitionIn}
      className="absolute top-full left-0 right-0 bg-white border-b border-[#E2DDD8]"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <div className="grid grid-cols-2 gap-3">
          {serviceItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex flex-col justify-center min-h-[64px] px-4 py-3 border-l-2 border-transparent hover:border-[#C8601A] hover:bg-[#F6F4F0] transition-all group"
            >
              <span className="text-sm font-semibold text-[#111111] group-hover:text-[#C8601A] transition-colors">
                {item.label}
              </span>
              <span className="text-xs text-[#5A5A5A] mt-0.5">{item.description}</span>
            </Link>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-8 pt-5 border-t border-[#E2DDD8]">
          <Link
            href="/contact"
            onClick={onClose}
            className="text-sm font-semibold text-[#C8601A] hover:underline"
          >
            Book a Site Visit →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Mobile accordion section
// ---------------------------------------------------------------------------

interface MobileAccordionProps {
  label: string
  children: React.ReactNode
}

function MobileAccordion({ label, children }: MobileAccordionProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#EDEBE7]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full min-h-[56px] px-6 text-[17px] font-medium text-[#2C2C2C] hover:text-[#C8601A] transition-colors"
        aria-expanded={open}
      >
        <span>{label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M1 4L6 9L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="accordion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------

type ActivePanel = "products" | "services" | null

export default function Nav() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  // Close panel on click outside
  useEffect(() => {
    if (!activePanel) return
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActivePanel(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [activePanel])

  const closeAll = () => {
    setActivePanel(null)
    setMobileOpen(false)
  }

  const togglePanel = (panel: ActivePanel) => {
    setActivePanel((prev) => (prev === panel ? null : panel))
  }

  const chevronDown = (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
      className="inline-block ml-1 flex-shrink-0"
    >
      <path
        d="M1 3.5L5.5 8L10 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-[#E2DDD8]"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" onClick={closeAll} className="flex-shrink-0 flex items-center gap-3 py-2">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image
                  src="/images/logo/S1_Square.png"
                  alt="Square One Paving"
                  fill
                  className="object-contain"
                  sizes="36px"
                  priority
                />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-[#111111] text-base tracking-tight leading-none">
                  Square One
                </span>
                <span className="text-[#5A5A5A] font-medium text-[11px] uppercase tracking-[0.14em] leading-none">
                  Paving
                </span>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-0">
              {/* Products dropdown trigger */}
              <button
                onClick={() => togglePanel("products")}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                  activePanel === "products"
                    ? "text-[#C8601A]"
                    : "text-[#2C2C2C] hover:text-[#C8601A]"
                }`}
                aria-expanded={activePanel === "products"}
                aria-haspopup="true"
              >
                Products
                <span
                  className={`transition-transform duration-200 ${activePanel === "products" ? "rotate-180" : ""}`}
                >
                  {chevronDown}
                </span>
              </button>

              {/* Services dropdown trigger */}
              <button
                onClick={() => togglePanel("services")}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                  activePanel === "services"
                    ? "text-[#C8601A]"
                    : "text-[#2C2C2C] hover:text-[#C8601A]"
                }`}
                aria-expanded={activePanel === "services"}
                aria-haspopup="true"
              >
                Services
                <span
                  className={`transition-transform duration-200 ${activePanel === "services" ? "rotate-180" : ""}`}
                >
                  {chevronDown}
                </span>
              </button>

              {/* Plain links */}
              {(
                [
                  { label: "Projects", href: "/projects" },
                  { label: "Driveways", href: "/driveways" },
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ] as const
              ).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAll}
                  className="px-4 py-2 text-sm font-medium text-[#2C2C2C] hover:text-[#C8601A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <Link href="/contact" onClick={closeAll} className="hidden lg:inline-flex">
                <span className="bg-[#C8601A] hover:brightness-110 text-white px-5 py-2.5 text-sm font-semibold rounded-none transition-all">
                  Get a Quote
                </span>
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-11 h-11 border border-[#E2DDD8] transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-[18px] h-[14px]">
                  <span
                    className="absolute left-0 bg-[#1C2026] transition-all duration-300 ease-in-out origin-center"
                    style={{
                      width: 18,
                      height: 2,
                      top: mobileOpen ? 6 : 0,
                      transform: mobileOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  />
                  <span
                    className="absolute left-0 bg-[#1C2026] transition-all duration-300 ease-in-out"
                    style={{
                      width: mobileOpen ? 0 : 18,
                      height: 2,
                      top: 6,
                      opacity: mobileOpen ? 0 : 1,
                    }}
                  />
                  <span
                    className="absolute left-0 bg-[#1C2026] transition-all duration-300 ease-in-out origin-center"
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

        {/* Desktop mega panels (absolutely positioned below nav bar, inside nav for click-outside to work) */}
        <AnimatePresence>
          {activePanel === "products" && (
            <ProductsPanel key="products-panel" onClose={closeAll} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activePanel === "services" && (
            <ServicesPanel key="services-panel" onClose={closeAll} />
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile: full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            className="lg:hidden fixed inset-0 z-[70] bg-white flex flex-col"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-[#E2DDD8] flex-shrink-0">
              <Link href="/" onClick={closeAll} className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src="/images/logo/S1_Square.png"
                    alt="Square One Paving"
                    fill
                    className="object-contain"
                    sizes="32px"
                  />
                </div>
                <span className="font-semibold text-[#111111] text-[15px] leading-none">
                  Square One
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-11 h-11 hover:bg-[#F6F4F0] transition-colors"
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M1 1L13 13M13 1L1 13"
                    stroke="#1C2026"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile nav items */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Products accordion */}
              <MobileAccordion label="Products">
                {productColumns.map((col) => (
                  <div key={col.category} className="px-6 pt-3 pb-1">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#8C8C8C] font-semibold mb-1">
                      {col.category}
                    </p>
                    {col.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeAll}
                        className="flex items-center min-h-[40px] pl-2 text-[15px] font-medium text-[#2C2C2C] hover:text-[#C8601A] transition-colors border-l-2 border-transparent hover:border-[#C8601A]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="px-6 py-3 border-t border-[#EDEBE7] mt-2">
                  <Link
                    href="/products"
                    onClick={closeAll}
                    className="text-sm font-semibold text-[#C8601A] hover:underline"
                  >
                    View All Products →
                  </Link>
                </div>
              </MobileAccordion>

              {/* Services accordion */}
              <MobileAccordion label="Services">
                <div className="px-6 py-2 space-y-0.5">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="flex flex-col min-h-[52px] justify-center pl-2 py-2 border-l-2 border-transparent hover:border-[#C8601A] hover:bg-[#F6F4F0] transition-all"
                    >
                      <span className="text-[15px] font-medium text-[#2C2C2C] hover:text-[#C8601A]">
                        {item.label}
                      </span>
                      <span className="text-xs text-[#5A5A5A]">{item.description}</span>
                    </Link>
                  ))}
                </div>
                <div className="px-6 py-3 border-t border-[#EDEBE7] mt-1">
                  <Link
                    href="/contact"
                    onClick={closeAll}
                    className="text-sm font-semibold text-[#C8601A] hover:underline"
                  >
                    Book a Site Visit →
                  </Link>
                </div>
              </MobileAccordion>

              {/* Plain links */}
              {(
                [
                  { label: "Projects", href: "/projects" },
                  { label: "Driveways", href: "/driveways" },
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ] as const
              ).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAll}
                  className="flex items-center min-h-[56px] px-6 text-[17px] font-medium text-[#2C2C2C] border-b border-[#EDEBE7] hover:text-[#C8601A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile footer CTA */}
            <div className="flex-shrink-0 border-t border-[#E2DDD8] bg-white">
              <Link
                href="/contact"
                onClick={closeAll}
                className="block bg-[#C8601A] hover:brightness-110 text-white text-center py-4 text-sm font-semibold tracking-[0.1em] uppercase transition-all"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
