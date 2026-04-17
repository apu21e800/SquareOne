"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

/* ─── Data ───────────────────────────────────────────── */

const services = [
  {
    name: "Stamped Asphalt",
    slug: "stamped-asphalt",
    desc: "Architectural pavement patterns installed to last.",
  },
  {
    name: "Decorative Coatings",
    slug: "decorative-coatings",
    desc: "UV-stable colour systems engineered for BC's climate.",
  },
  {
    name: "Preformed Thermoplastic",
    slug: "preformed-thermoplastic",
    desc: "Precision markings for municipalities and developers.",
  },
  {
    name: "Vapor Blasting",
    slug: "vapor-blasting",
    desc: "BC's most advanced surface preparation.",
  },
]

const navLinks = [
  { label: "Projects",       href: "/projects" },
  { label: "Driveways",      href: "/driveways" },
  { label: "Vapor Blasting", href: "/vapor-blasting" },
  { label: "About",          href: "/about" },
  { label: "Contact",        href: "/contact" },
]

/* ─── Component ──────────────────────────────────────── */

export default function Nav() {
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [servicesOpen, setServicesOpen]   = useState(false)
  const [mobileServices, setMobileServices] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }, [])
  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120)
  }, [])
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setServicesOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const closeAll = () => {
    setMobileOpen(false)
    setServicesOpen(false)
    setMobileServices(false)
  }

  return (
    <>
      {/* ── Nav bar ── */}
      <nav ref={navRef} className="relative sticky top-0 z-50 w-full bg-white border-b border-[#E2DDD8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" onClick={closeAll} className="flex-shrink-0 flex items-center gap-3 py-2">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/images/logo/S1_Square.png"
                  alt="Square One Paving"
                  fill
                  className="object-contain"
                  sizes="32px"
                  priority
                />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[#111111] text-[15px] tracking-[-0.01em] font-semibold leading-none">
                  Square One
                </span>
                <span className="hidden sm:inline text-[#8C8C8C] text-[10px] uppercase tracking-[0.2em] font-medium leading-none">
                  Paving · BC
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Services dropdown */}
              <div onMouseEnter={openMenu} onMouseLeave={scheduleClose} className="relative">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-expanded={servicesOpen}
                  className="flex items-center gap-1 text-[13px] font-medium tracking-[-0.005em] text-[#2C2C2C] hover:text-[#111111] transition-colors py-6"
                >
                  Services
                  <ChevronDown size={13} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeAll}
                  className="text-[13px] font-medium tracking-[-0.005em] text-[#2C2C2C] hover:text-[#111111] transition-colors py-6"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Right side CTA */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                onClick={closeAll}
                className="hidden lg:inline-flex bg-[#1C2026] text-white px-6 py-2.5 text-xs font-semibold tracking-[0.08em] uppercase hover:bg-[#111111] transition-colors"
              >
                Get a Quote
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-11 h-11"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-[18px] h-[12px]">
                  <span
                    className="absolute left-0 bg-[#111111] transition-all duration-300 ease-in-out origin-center"
                    style={{ width: 18, height: 1.5, top: mobileOpen ? 5 : 0, transform: mobileOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  />
                  <span
                    className="absolute left-0 bg-[#111111] transition-all duration-300 ease-in-out origin-center"
                    style={{ width: 18, height: 1.5, top: mobileOpen ? 5 : 11, transform: mobileOpen ? "rotate(-45deg)" : "rotate(0deg)" }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Services mega panel ── */}
        {servicesOpen && (
          <div
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="absolute top-full left-0 w-full bg-white border-b border-[#E2DDD8] shadow-[0_20px_40px_rgba(0,0,0,0.05)] z-50"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 grid grid-cols-[1fr_380px] gap-12">

              {/* Services list */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={closeAll}
                    className="group border-l border-[#E2DDD8] pl-5 hover:border-[#C8601A] transition-colors"
                  >
                    <p className="text-[15px] font-semibold text-[#111111] mb-1.5 tracking-[-0.01em]">
                      {s.name}
                    </p>
                    <p className="text-[13px] text-[#5A5A5A] leading-relaxed">{s.desc}</p>
                  </Link>
                ))}
              </div>

              {/* Featured image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE9E3]">
                <Image
                  src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
                  alt="Featured installation — estate driveway"
                  fill
                  className="object-cover"
                  sizes="380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/70 mb-1">
                    Featured Project
                  </p>
                  <p className="text-white text-sm font-semibold tracking-[-0.01em]">
                    Estate driveway · West Vancouver
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/30 z-[60]"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            className="lg:hidden fixed top-0 right-0 bottom-0 z-[70] bg-white flex flex-col border-l border-[#E2DDD8]"
            style={{ width: "min(86vw, 380px)" }}
            role="dialog"
            aria-modal="true"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-[#E2DDD8] flex-shrink-0">
              <Link href="/" onClick={closeAll} className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 flex-shrink-0">
                  <Image src="/images/logo/S1_Square.png" alt="Square One Paving" fill className="object-contain" sizes="28px" />
                </div>
                <span className="text-[#111111] text-[14px] font-semibold leading-none tracking-[-0.01em]">
                  Square One
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-11 h-11 flex items-center justify-center"
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-6 flex flex-col">

                {/* Services accordion */}
                <button
                  onClick={() => setMobileServices(!mobileServices)}
                  className="flex items-center justify-between py-4 text-[#111111] font-medium text-lg border-b border-[#E2DDD8]"
                >
                  Services
                  <ChevronDown size={16} className={`text-[#8C8C8C] transition-transform duration-200 ${mobileServices ? "rotate-180" : ""}`} />
                </button>
                {mobileServices && (
                  <div className="py-3 border-b border-[#E2DDD8]">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onClick={closeAll}
                        className="block py-2.5 text-[14px] text-[#5A5A5A] hover:text-[#C8601A] transition-colors"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}

                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={closeAll}
                    className="py-4 text-[#111111] font-medium text-lg border-b border-[#E2DDD8]"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom CTA strip */}
            <div className="flex-shrink-0 border-t border-[#E2DDD8]">
              <Link
                href="/contact"
                onClick={closeAll}
                className="block w-full bg-[#C8601A] hover:bg-[#A84F15] text-white text-center py-5 text-sm font-semibold tracking-[0.08em] uppercase transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
