"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"

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
]

const products = [
  { name: "StreetPrint",       slug: "streetprint" },
  { name: "StreetBond",        slug: "streetbond" },
  { name: "TrafficPatterns",   slug: "trafficpatterns" },
  { name: "TrafficPatternsXD", slug: "trafficpatterns-xd" },
  { name: "DecoMark",          slug: "decomark" },
  { name: "DuraShield",        slug: "durashield" },
  { name: "DuraTherm",         slug: "duratherm" },
  { name: "MMAX",              slug: "mmax" },
  { name: "PreMark",           slug: "premark" },
]

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
      {/* ─────────────────────────── Nav bar ─────────────────────────── */}
      <nav
        ref={navRef}
        className="sticky top-0 z-50 w-full bg-white/97 backdrop-blur-md border-b border-[#E8E4DE]"
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
                className="relative"
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

                {activeMega === "services" && (
                  <div
                    {...panelProps}
                    className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[580px] bg-white rounded-2xl shadow-2xl border border-[#E8E4DE] overflow-hidden"
                  >
                    <div className="grid grid-cols-[1fr_220px]">
                      <div className="p-4 space-y-0.5">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-semibold mb-2 px-3">
                          What We Do
                        </p>
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            onClick={closeAll}
                            className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-[#F9F5F2] group transition-colors"
                          >
                            <span className="text-[#D66620] text-base mt-0.5 leading-none flex-shrink-0">{s.icon}</span>
                            <div>
                              <p className="text-sm font-semibold text-[#333333] group-hover:text-[#D66620] transition-colors">
                                {s.name}
                              </p>
                              <p className="text-xs text-[#626262] leading-snug mt-0.5">{s.desc}</p>
                            </div>
                          </Link>
                        ))}
                        {/* Vapor Blasting featured in services menu */}
                        <Link
                          href="/services/vapor-blasting"
                          onClick={closeAll}
                          className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-[#FFF7F2] group transition-colors border border-[#FFDDC5] mt-1"
                        >
                          <span className="text-[#D66620] text-base mt-0.5 leading-none flex-shrink-0">◌</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-[#333333] group-hover:text-[#D66620] transition-colors">
                                Vapor Blasting
                              </p>
                              <span className="bg-[#D66620] text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full leading-none">
                                Exclusive
                              </span>
                            </div>
                            <p className="text-xs text-[#626262] leading-snug mt-0.5">
                              Mobile surface prep — graffiti removal, marking removal, and more.
                            </p>
                          </div>
                        </Link>
                        <div className="pt-2 px-3 border-t border-[#F2EFE9] mt-2">
                          <Link
                            href="/services"
                            onClick={closeAll}
                            className="text-xs font-bold text-[#D66620] uppercase tracking-widest hover:text-[#C05A18] transition-colors"
                          >
                            View All Services →
                          </Link>
                        </div>
                      </div>

                      <div className="bg-[#F9F5F2] p-4 flex flex-col justify-between border-l border-[#EDE9E3]">
                        <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                          <Image
                            src="/images/products/streetprint/streetprint-1.jpg"
                            alt="Stamped asphalt crosswalk"
                            fill
                            className="object-cover"
                            sizes="220px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <span className="absolute bottom-2 left-3 text-white text-xs font-semibold">
                            StreetPrint
                          </span>
                        </div>
                        <p className="text-xs text-[#626262] mb-3 leading-relaxed">
                          Authorized HUB Surface Systems applicator. Serving BC since 2000.
                        </p>
                        <Link
                          href="/contact"
                          onClick={closeAll}
                          className="block bg-[#D66620] hover:bg-[#C05A18] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors text-center"
                        >
                          Get a Free Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Products trigger */}
              <div
                className="relative"
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

                {activeMega === "products" && (
                  <div
                    {...panelProps}
                    className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[480px] bg-white rounded-2xl shadow-2xl border border-[#E8E4DE] overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3 px-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-semibold">
                          HUB Surface Systems
                        </p>
                        <Link
                          href="/products"
                          onClick={closeAll}
                          className="text-xs font-bold text-[#D66620] uppercase tracking-widest hover:text-[#C05A18] transition-colors"
                        >
                          All Products →
                        </Link>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {products.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/products/${p.slug}`}
                            onClick={closeAll}
                            className="group px-3 py-2.5 rounded-xl hover:bg-[#F9F5F2] transition-colors"
                          >
                            <p className="text-sm font-semibold text-[#333333] group-hover:text-[#D66620] transition-colors leading-snug">
                              {p.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-[#F2EFE9] px-1">
                        <p className="text-xs text-[#999]">
                          Authorized applicator — full HUB product portfolio installed across BC
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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

              {/* Hamburger — 44×44 tap target */}
              <button
                onClick={() => { setMobileOpen(!mobileOpen); setActiveMega(null) }}
                className="lg:hidden flex items-center justify-center w-11 h-11 text-[#333333] rounded-lg hover:bg-[#F2EFE9] transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─────────────────── Mobile drawer (portal-style) ─────────────────── */}

      {/* Backdrop */}
      <div
        className="lg:hidden fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer — slides in from right */}
      <div
        className="lg:hidden fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-[360px] bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-out"
        style={{ transform: mobileOpen ? "translateX(0)" : "translateX(100%)" }}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DE] flex-shrink-0">
          <Link href="/" onClick={closeAll} className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#D66620] rounded-md flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm tracking-tight">S1</span>
            </div>
            <span className="font-bold text-[#32373C] text-[15px]">Square One</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#F2EFE9] transition-colors text-[#333333]"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">

          {/* Vapor Blasting — featured card */}
          <div className="px-4 pt-4 pb-2">
            <Link
              href="/services/vapor-blasting"
              onClick={closeAll}
              className="flex items-center justify-between p-4 bg-[#FFF7F2] rounded-xl border border-[#FFDDC5] active:bg-[#FFE8D5]"
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold text-[#333333]">Vapor Blasting</span>
                  <span className="bg-[#D66620] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Exclusive
                  </span>
                </div>
                <p className="text-xs text-[#626262]">BC&apos;s only professional service</p>
              </div>
              <ChevronRight size={16} className="text-[#D66620] flex-shrink-0" />
            </Link>
          </div>

          <div className="px-4">

            {/* Services accordion */}
            <div className="border-t border-[#F2EFE9]">
              <button
                onClick={() => setMobileServices(!mobileServices)}
                className="w-full flex items-center justify-between py-4 text-[#333333] font-semibold text-[15px] min-h-[56px]"
              >
                Services
                <ChevronDown
                  size={16}
                  className={`text-[#626262] transition-transform duration-200 ${mobileServices ? "rotate-180" : ""}`}
                />
              </button>
              {mobileServices && (
                <div className="pb-3 space-y-0.5">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={closeAll}
                      className="flex items-center gap-3 min-h-[52px] py-3 px-2 text-[#626262] hover:text-[#D66620] active:text-[#D66620] text-sm font-medium transition-colors border-b border-[#F5F2EE] last:border-0"
                    >
                      <span className="text-[#D66620] text-xs w-4 flex-shrink-0">{s.icon}</span>
                      {s.name}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={closeAll}
                    className="flex items-center min-h-[44px] px-2 pt-2 text-xs font-bold text-[#D66620] uppercase tracking-widest"
                  >
                    All Services →
                  </Link>
                </div>
              )}
            </div>

            {/* Products accordion */}
            <div className="border-t border-[#F2EFE9]">
              <button
                onClick={() => setMobileProducts(!mobileProducts)}
                className="w-full flex items-center justify-between py-4 text-[#333333] font-semibold text-[15px] min-h-[56px]"
              >
                Products
                <ChevronDown
                  size={16}
                  className={`text-[#626262] transition-transform duration-200 ${mobileProducts ? "rotate-180" : ""}`}
                />
              </button>
              {mobileProducts && (
                <div className="pb-3">
                  <div className="grid grid-cols-2 gap-x-2">
                    {products.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        onClick={closeAll}
                        className="flex items-center min-h-[52px] py-3 text-[#626262] hover:text-[#D66620] active:text-[#D66620] text-sm font-medium transition-colors border-b border-[#F5F2EE]"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/products"
                    onClick={closeAll}
                    className="flex items-center min-h-[44px] pt-3 text-xs font-bold text-[#D66620] uppercase tracking-widest"
                  >
                    All Products →
                  </Link>
                </div>
              )}
            </div>

            {/* Static links */}
            {[
              { label: "Projects",  href: "/projects" },
              { label: "Driveways", href: "/applications/private-driveways", highlight: true },
              { label: "About",     href: "/about" },
              { label: "Contact",   href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeAll}
                className={`flex items-center min-h-[56px] py-4 text-[15px] font-semibold border-t border-[#F2EFE9] transition-colors ${
                  item.highlight ? "text-[#D66620]" : "text-[#333333] hover:text-[#D66620]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA — always pinned */}
        <div className="px-5 py-5 border-t border-[#E8E4DE] flex-shrink-0 space-y-3">
          <Link href="/contact" onClick={closeAll}>
            <span className="block w-full bg-[#D66620] hover:bg-[#C05A18] active:bg-[#B04E15] text-white text-center py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors">
              Get a Free Quote
            </span>
          </Link>
          <a
            href="tel:18773910270"
            className="block text-center text-[#626262] text-sm font-medium py-1 min-h-[44px] flex items-center justify-center"
          >
            1-877-391-0270
          </a>
        </div>
      </div>
    </>
  )
}
