"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, type Transition } from "framer-motion"
import { products, type Product } from "@/lib/products"
import { services, type Service } from "@/lib/services"

/* ------------------------------------------------------------------
   Data — derived from lib/, never duplicated.
   ------------------------------------------------------------------ */

type MenuKey = "services" | "products"

const PRODUCT_CATEGORIES = [
  "Stamped Asphalt",
  "Decorative Coatings",
  "Thermoplastic",
  "Surface Protection",
] as const

/** Short nav-only descriptor. Falls back to the product tagline. */
const PRODUCT_DESCRIPTOR: Record<string, string> = {
  streetprint: "Patterned hot asphalt pavers",
  streetbond: "Water-based colour coating",
  mmax: "MMA coating for high wear",
  trafficpatterns: "Preformed pattern sheets",
  "trafficpatterns-xd": "Heavy-duty intersections",
  duratherm: "Inlaid textured surfaces",
  decomark: "Shapes, symbols, graphics",
  premark: "Standard legends and bars",
  durashield: "Clear protective seal",
}

interface ProductColumn {
  category: (typeof PRODUCT_CATEGORIES)[number]
  items: Product[]
}

const productColumns: ProductColumn[] = PRODUCT_CATEGORIES.map((category) => ({
  category,
  items: products.filter((p) => p.category === category),
}))

const SERVICE_ORDER = [
  "stamped-asphalt",
  "decorative-coatings",
  "preformed-thermoplastic",
  "vapor-blasting",
]

/** Canadian English in prose; slugs and routes stay untouched. */
const SERVICE_LABEL: Record<string, string> = {
  "stamped-asphalt": "Stamped asphalt",
  "decorative-coatings": "Decorative coatings",
  "preformed-thermoplastic": "Preformed thermoplastic",
  "vapor-blasting": "Vapour blasting",
}

const serviceLinks: Service[] = SERVICE_ORDER.map((slug) =>
  services.find((s) => s.slug === slug),
).filter((s): s is Service => s !== undefined)

interface PrimaryLink {
  label: string
  href: string
  match: string[]
  menu?: MenuKey
}

const PRIMARY_LINKS: PrimaryLink[] = [
  { label: "Services", href: "/services", match: ["/services", "/vapor-blasting"], menu: "services" },
  { label: "Products", href: "/products", match: ["/products"], menu: "products" },
  { label: "Applications", href: "/applications", match: ["/applications", "/driveways"] },
  { label: "Projects", href: "/projects", match: ["/projects"] },
  { label: "Journal", href: "/blog", match: ["/blog"] },
  { label: "About", href: "/about", match: ["/about"] },
]

/** Mobile drawer keeps every route the desktop bar reaches, including the
    two that live inside the mega menu on desktop. */
const DRAWER_LINKS: { label: string; href: string }[] = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "Driveways", href: "/driveways" },
  { label: "Projects", href: "/projects" },
  { label: "Journal", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
]

const FEATURE_IMAGE = "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"

const HAIRLINE = "#E7E3DC"

const panelTransition: Transition = { duration: 0.16, ease: "easeOut" }

/* ------------------------------------------------------------------
   Sub-components
   ------------------------------------------------------------------ */

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Square One Paving — home"
      className="flex shrink-0 items-center gap-3"
    >
      <span
        aria-hidden="true"
        className="flex h-7 w-7 items-center justify-center rounded-[2px] bg-[#14181D] text-[11px] font-semibold tracking-[0.02em] text-white"
      >
        S1
      </span>
      <span className="text-[15px] font-semibold text-[#14161A]">Square One Paving</span>
    </Link>
  )
}

function ServicesDropdown({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={panelTransition}
      className="absolute top-full left-[-24px] z-[60] w-[288px] rounded-[2px] border border-[#E7E3DC] bg-white py-[10px]"
    >
      {serviceLinks.map((service) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          onClick={onNavigate}
          className="block px-6 py-[10px] text-[15px] font-semibold hover:bg-[#FAF8F5]"
        >
          {SERVICE_LABEL[service.slug] ?? service.name}
        </Link>
      ))}
    </motion.div>
  )
}

interface ProductsMegaProps {
  onNavigate: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function ProductsMega({ onNavigate, onMouseEnter, onMouseLeave }: ProductsMegaProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={panelTransition}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed top-[72px] right-0 left-0 z-40 hidden border-t border-b border-[#E7E3DC] bg-white min-[821px]:block"
    >
      <div
        className="mx-auto grid max-w-[1280px] gap-8 px-10 pt-8 pb-[30px]"
        style={{ gridTemplateColumns: "repeat(4, 1fr) 1.25fr" }}
      >
        {productColumns.map((column) => (
          <div key={column.category}>
            {/* .label, not .eyebrow — four squares here would blow the
                three-orange-elements budget, and the reference uses a bare
                label in the mega menu. */}
            <div className="label">{column.category}</div>
            <div className="mt-[18px] flex flex-col gap-3">
              {column.items.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  onClick={onNavigate}
                  className="block text-[15px] font-semibold"
                >
                  {product.name}
                  <span className="mt-[3px] block text-[13px] leading-[1.5] font-normal text-[#767B82]">
                    {PRODUCT_DESCRIPTOR[product.slug] ?? product.tagline}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="border-l border-[#E7E3DC] pl-8">
          <Link
            href="/driveways"
            onClick={onNavigate}
            className="relative block aspect-[16/10] overflow-hidden rounded-[2px] bg-[#E4DDD1]"
          >
            <Image
              src={FEATURE_IMAGE}
              alt="Herringbone StreetPrint driveway at a gated estate"
              fill
              sizes="300px"
              className="object-cover object-[center_70%]"
            />
            <span aria-hidden="true" className="scrim scrim-light" />
            <span className="caption">StreetPrint herringbone driveway</span>
          </Link>
          <div className="mt-[18px] flex flex-col gap-[10px]">
            <Link href="/products" onClick={onNavigate} className="arrow-link">
              All products <span>&rarr;</span>
            </Link>
            <Link href="/resources" onClick={onNavigate} className="arrow-link">
              Technical documents <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="fixed inset-0 z-[300] flex flex-col bg-white min-[821px]:hidden"
    >
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#E7E3DC] px-6">
        <Wordmark onClick={onClose} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="px-3 py-2 text-[28px] leading-none font-light text-[#14161A]"
        >
          &times;
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-auto px-6 pt-2">
        {DRAWER_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="block border-b border-[#E7E3DC] py-[22px] text-[26px] leading-tight font-light tracking-[-0.02em] text-[#14161A]"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/contact"
        onClick={onClose}
        className="flex h-16 shrink-0 items-center justify-center bg-[#F26430] text-[16px] font-semibold text-white transition-colors hover:bg-[#D8511F] hover:text-white"
      >
        Request a quote
      </Link>
    </motion.div>
  )
}

/* ------------------------------------------------------------------
   Nav
   ------------------------------------------------------------------ */

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState<MenuKey | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const openMenu = useCallback(
    (key: MenuKey) => {
      clearCloseTimer()
      setMenu(key)
    },
    [clearCloseTimer],
  )

  const closeMenu = useCallback(() => {
    clearCloseTimer()
    setMenu(null)
  }, [clearCloseTimer])

  const scheduleClose = useCallback(() => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setMenu(null), 140)
  }, [clearCloseTimer])

  const hoverOpen = useCallback(
    (key: MenuKey) => {
      if (window.matchMedia("(hover: hover)").matches) openMenu(key)
    },
    [openMenu],
  )

  const toggleMenu = useCallback(
    (key: MenuKey) => {
      clearCloseTimer()
      setMenu((prev) => (prev === key ? null : key))
    },
    [clearCloseTimer],
  )

  const closeAll = useCallback(() => {
    clearCloseTimer()
    setMenu(null)
    setDrawerOpen(false)
  }, [clearCloseTimer])

  // Bar goes opaque past 24px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [drawerOpen])

  // Escape closes both
  useEffect(() => {
    if (!menu && !drawerOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [menu, drawerOpen, closeAll])

  // Outside click closes the dropdown
  useEffect(() => {
    if (!menu) return
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) closeMenu()
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [menu, closeMenu])

  useEffect(() => clearCloseTimer, [clearCloseTimer])

  const isActive = (link: PrimaryLink) =>
    link.match.some((base) => pathname === base || pathname.startsWith(`${base}/`))

  return (
    <div ref={rootRef}>
      <header
        className="fixed top-0 right-0 left-0 z-50"
        style={{
          // Fully opaque once scrolled. The reference's 0.92 wash let section
          // text ghost through behind the nav links; the bar sits over
          // photography and dense copy, so it has to be solid.
          background: scrolled ? "#FFFFFF" : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: `1px solid ${scrolled ? HAIRLINE : "rgba(231,227,220,0)"}`,
          transition: "background 0.25s ease, border-color 0.25s ease",
        }}
      >
        <div className="container-1280 flex h-[72px] min-w-0 items-center gap-x-6">
          <Wordmark onClick={closeAll} />

          <nav
            aria-label="Primary"
            className="ml-auto hidden items-center gap-8 min-[821px]:flex"
          >
            {PRIMARY_LINKS.map((link) => {
              const menuKey = link.menu
              const linkClass = `nav-link${isActive(link) ? " nav-link-active" : ""}`

              if (!menuKey) {
                return (
                  <Link key={link.href} href={link.href} onClick={closeAll} className={linkClass}>
                    {link.label}
                  </Link>
                )
              }

              return (
                <div
                  key={link.href}
                  className="relative flex h-[72px] items-center"
                  onMouseEnter={() => hoverOpen(menuKey)}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={link.href}
                    aria-haspopup="true"
                    aria-expanded={menu === menuKey}
                    onClick={(e) => {
                      e.preventDefault()
                      toggleMenu(menuKey)
                    }}
                    className={linkClass}
                  >
                    {link.label}
                  </Link>
                  {menuKey === "services" && (
                    <AnimatePresence>
                      {menu === "services" && <ServicesDropdown onNavigate={closeAll} />}
                    </AnimatePresence>
                  )}
                </div>
              )
            })}
          </nav>

          <Link
            href="/contact"
            onClick={closeAll}
            className="ml-10 hidden shrink-0 rounded-[2px] border border-[#14161A] px-[19px] py-[10px] text-[14px] font-semibold text-[#14161A] transition-colors hover:bg-[#14161A] hover:text-white min-[821px]:inline-block"
          >
            Request a quote
          </Link>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            className="ml-auto flex h-11 w-11 flex-col items-center justify-center gap-[5px] min-[821px]:hidden"
          >
            <span aria-hidden="true" className="block h-[1.5px] w-[22px] bg-[#14161A]" />
            <span aria-hidden="true" className="block h-[1.5px] w-[22px] bg-[#14161A]" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menu === "products" && (
          <ProductsMega
            onNavigate={closeAll}
            onMouseEnter={() => openMenu("products")}
            onMouseLeave={scheduleClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {drawerOpen && <MobileDrawer onClose={closeAll} />}
      </AnimatePresence>
    </div>
  )
}
