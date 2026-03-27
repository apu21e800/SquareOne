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
  {
    name: "Vapor Blasting",
    slug: "vapor-blasting",
    desc: "Mobile surface prep — graffiti removal, marking removal, and more.",
    icon: "◌",
  },
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
