"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

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

const products = [
  { name: "StreetPrint",      slug: "streetprint" },
  { name: "StreetBond",       slug: "streetbond" },
  { name: "TrafficPatterns",  slug: "trafficpatterns" },
  { name: "TrafficPatternsXD",slug: "trafficpatterns-xd" },
  { name: "DecoMark",         slug: "decomark" },
  { name: "DuraShield",       slug: "durashield" },
  { name: "DuraTherm",        slug: "duratherm" },
  { name: "MMAX",             slug: "mmax" },
  { name: "PreMark",          slug: "premark" },
]

/* ─── Component ──────────────────────────────────────────── */

type MegaMenu = "services" | "products" | null

export default function Nav() {
  const [mobileOpen,         setMobileOpen]         = useState(false)
  const [activeMega,         setActiveMega]         = useState<MegaMenu>(null)
  const [mobileServices,     setMobileServices]     = useState(false)
  const [mobileProducts,     setMobileProducts]     = useState(false)

  // Close timeout ref — lets us add a small grace-period so the panel
  // doesn't snap shut as the cursor travels from the trigger to the panel.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMenu  = useCallback((which: MegaMenu) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMega(which)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 120)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  // Close on outside click
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

  // Close menus on route change (mobile)
  const closeAll = () => {
    setMobileOpen(false)
    setActiveMega(null)
    setMobileServices(false)
    setMobileProducts(false)
  }

  /* ── Shared mega-panel wrapper props ── */
  const panelProps = {
    onMouseEnter: cancelClose,
    onMouseLeave: scheduleClose,
  }

  return (
    <nav ref={navRef} className="sticky top-0 z-50 w-full bg-white/97 backdrop-blur-md border-b border-[#E8E4DE]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-0">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" onClick={closeAll} className="flex-shrink-0 py-2">
            <Image
              src="/images/square-one-logo.png"
              alt="Square One Paving"
              width={130}
              height={36}
              className="object-contain h-9 w-auto"
              priority
            />
          </Link>

          {/* ── Desktop nav ── */}
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
                  activeMega === "services" ? "text-[#D66620] bg-[#FFF7F2]" : "text-[#333333] hover:text-[#D66620] hover:bg-[#FFF7F2]"
                }`}
              >
                Services
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${activeMega === "services" ? "rotate-180" : ""}`}
                />
              </button>

              {/* ── Services mega panel ── */}
              {activeMega === "services" && (
                <div
                  {...panelProps}
                  className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[560px] bg-white rounded-2xl shadow-2xl border border-[#E8E4DE] overflow-hidden"
                >
                  <div className="grid grid-cols-[1fr_220px]">
                    {/* Left: links */}
                    <div className="p-4 space-y-0.5">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-semibold mb-2 px-3">What We Do</p>
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          onClick={closeAll}
                          className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-[#F9F5F2] group transition-colors"
                        >
                          <span className="text-[#D66620] text-base mt-0.5 leading-none flex-shrink-0">{s.icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-[#333333] group-hover:text-[#D66620] transition-colors">{s.name}</p>
                            <p className="text-xs text-[#626262] leading-snug mt-0.5">{s.desc}</p>
                          </div>
                        </Link>
                      ))}
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

                    {/* Right: feature panel */}
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
                        <span className="absolute bottom-2 left-3 text-white text-xs font-semibold">StreetPrint</span>
                      </div>
                      <p className="text-xs text-[#626262] mb-3 leading-relaxed">
                        Authorized HUB Surface Systems applicator. Serving BC since 2000.
                      </p>
                      <Link
                        href="/contact"
                        onClick={closeAll}
                        className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors text-center"
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
                  activeMega === "products" ? "text-[#D66620] bg-[#FFF7F2]" : "text-[#333333] hover:text-[#D66620] hover:bg-[#FFF7F2]"
                }`}
              >
                Products
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${activeMega === "products" ? "rotate-180" : ""}`}
                />
              </button>

              {/* ── Products mega panel ── */}
              {activeMega === "products" && (
                <div
                  {...panelProps}
                  className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[480px] bg-white rounded-2xl shadow-2xl border border-[#E8E4DE] overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-semibold">HUB Surface Systems</p>
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

            {/* Direct links */}
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
            <button
              onClick={() => { setMobileOpen(!mobileOpen); setActiveMega(null) }}
              className="lg:hidden text-[#333333] p-1.5 rounded-lg hover:bg-[#F2EFE9] transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E8E4DE] bg-white max-h-[85vh] overflow-y-auto">
          <div className="max-w-6xl mx-auto px-5 py-3 space-y-0">

            {/* Services accordion */}
            <div>
              <button
                onClick={() => setMobileServices(!mobileServices)}
                className="w-full flex items-center justify-between py-3.5 text-[#333333] font-semibold text-[15px]"
              >
                Services
                <ChevronDown size={15} className={`text-[#626262] transition-transform duration-200 ${mobileServices ? "rotate-180" : ""}`} />
              </button>
              {mobileServices && (
                <div className="pb-2 pl-3 space-y-0">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={closeAll}
                      className="flex items-center gap-2.5 py-3 text-[#626262] hover:text-[#D66620] text-sm font-medium transition-colors border-b border-[#F5F2EE] last:border-0"
                    >
                      <span className="text-[#D66620] text-xs">{s.icon}</span>
                      {s.name}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={closeAll}
                    className="block pt-3 text-xs font-bold text-[#D66620] uppercase tracking-widest"
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
                className="w-full flex items-center justify-between py-3.5 text-[#333333] font-semibold text-[15px]"
              >
                Products
                <ChevronDown size={15} className={`text-[#626262] transition-transform duration-200 ${mobileProducts ? "rotate-180" : ""}`} />
              </button>
              {mobileProducts && (
                <div className="pb-3 pl-3">
                  <div className="grid grid-cols-2 gap-x-4">
                    {products.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        onClick={closeAll}
                        className="py-2.5 text-[#626262] hover:text-[#D66620] text-sm font-medium transition-colors border-b border-[#F5F2EE]"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Static links */}
            {[
              { label: "Projects",   href: "/projects" },
              { label: "Driveways",  href: "/applications/private-driveways", highlight: true },
              { label: "About",      href: "/about" },
              { label: "Contact",    href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeAll}
                className={`block py-3.5 text-[15px] font-semibold border-t border-[#F2EFE9] transition-colors ${
                  item.highlight ? "text-[#D66620]" : "text-[#333333] hover:text-[#D66620]"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile CTAs */}
            <div className="pt-4 pb-4 flex flex-col gap-3 border-t border-[#E8E4DE]">
              <Link href="/contact" onClick={closeAll}>
                <span className="block w-full bg-[#D66620] hover:bg-[#C05A18] text-white text-center py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors">
                  Get a Free Quote
                </span>
              </Link>
              <a href="tel:18773910270" className="block text-center text-[#626262] text-sm font-medium py-1">
                Call 1-877-391-0270
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
