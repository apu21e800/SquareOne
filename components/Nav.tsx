"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AnimatePresence, MotionConfig, motion, type Transition } from "framer-motion"
import BrandMark from "@/components/BrandMark"
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

/** One featured frame per category — real installs, tall crops. */
const CATEGORY_FEATURE: Record<
  (typeof PRODUCT_CATEGORIES)[number],
  { src: string; alt: string; caption: string }
> = {
  "Stamped Asphalt": {
    src: "/images/products/streetprint/streetprint-victoria-ellis-point-walkway-01.jpg",
    alt: "StreetPrint cobblestone walkway at Ellis Point, Victoria",
    caption: "Ellis Point Walkway · Victoria",
  },
  "Decorative Coatings": {
    src: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
    alt: "StreetBond multicolour plaza at Joyce Station, Vancouver, at dusk",
    caption: "Joyce Station · Vancouver",
  },
  "Thermoplastic": {
    src: "/images/products/traffic-patterns-xd/trafficpatternsxd-victoria-dallas-road-crosswalk-01.jpg",
    alt: "TrafficPatternsXD crosswalk on Dallas Road, Victoria",
    caption: "Dallas Road · Victoria",
  },
  "Surface Protection": {
    src: "/images/products/durashield/durashield-protected-asphalt-surface-01.jpg",
    alt: "DuraShield-protected asphalt surface",
    caption: "DuraShield · Surface protection",
  },
}

const HAIRLINE = "#E7E3DC"

const panelTransition: Transition = { duration: 0.15, ease: "easeOut" }

/* ------------------------------------------------------------------
   Sub-components
   ------------------------------------------------------------------ */

function Wordmark({ onClick, light = false }: { onClick?: () => void; light?: boolean }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Square One Paving — home"
      className="flex shrink-0 items-center"
    >
      <BrandMark tone={light ? "light" : "dark"} />
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
  const [active, setActive] = useState<(typeof PRODUCT_CATEGORIES)[number]>(PRODUCT_CATEGORIES[0])
  const panelRef = useRef<HTMLDivElement>(null)
  const column = productColumns.find((c) => c.category === active) ?? productColumns[0]
  const feature = CATEGORY_FEATURE[active]

  // Arrow keys: up/down within a column, right into the product rows,
  // left back to the category list (Rockstar Part 3).
  const onKeyDown = (e: React.KeyboardEvent) => {
    const panel = panelRef.current
    if (!panel) return
    const cats = Array.from(panel.querySelectorAll<HTMLElement>("[data-mega-cat]"))
    const items = Array.from(panel.querySelectorAll<HTMLElement>("[data-mega-item]"))
    const el = document.activeElement as HTMLElement | null
    if (!el) return
    const inCats = cats.includes(el)
    const inItems = items.includes(el)
    if (!inCats && !inItems) return
    const group = inCats ? cats : items
    const i = group.indexOf(el)
    if (e.key === "ArrowDown") { e.preventDefault(); group[Math.min(i + 1, group.length - 1)]?.focus() }
    if (e.key === "ArrowUp") { e.preventDefault(); group[Math.max(i - 1, 0)]?.focus() }
    if (e.key === "ArrowRight" && inCats) { e.preventDefault(); items[0]?.focus() }
    if (e.key === "ArrowLeft" && inItems) { e.preventDefault(); cats.find((c) => c.dataset.megaCat === active)?.focus() }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={panelTransition}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed top-[72px] right-0 left-0 z-40 hidden border-t border-b border-[#E7E3DC] bg-white min-[821px]:block"
    >
      <div
        ref={panelRef}
        onKeyDown={onKeyDown}
        className="mx-auto grid max-w-[1280px] grid-cols-8 gap-x-8 px-10 py-8"
      >
        {/* ── Cols 1–2: categories ──────────────────────────── */}
        <div className="col-span-2 flex flex-col border-r border-[#E7E3DC] pr-8">
          {productColumns.map((col) => (
            <button
              key={col.category}
              type="button"
              data-mega-cat={col.category}
              onMouseEnter={() => setActive(col.category)}
              onFocus={() => setActive(col.category)}
              onClick={() => setActive(col.category)}
              className={`flex items-baseline justify-between gap-4 rounded-[2px] px-3 py-[14px] text-left text-[12px] font-semibold tracking-[0.12em] uppercase transition-colors duration-150 ${
                active === col.category
                  ? "bg-[#FAF8F5] text-[#14161A]"
                  : "text-[#767B82] hover:text-[#14161A]"
              }`}
            >
              <span>{col.category}</span>
              <span className="text-[11px] tracking-[0.08em] text-[#A9A297]">
                {String(col.items.length).padStart(2, "0")}
              </span>
            </button>
          ))}
          <Link href="/products" onClick={onNavigate} className="arrow-link mt-auto px-3 pt-6">
            All products <span>&rarr;</span>
          </Link>
        </div>

        {/* ── Cols 3–6: products of the active category ─────── */}
        <div className="col-span-4 flex flex-col gap-1">
          {column.items.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              data-mega-item
              onClick={onNavigate}
              className="group flex items-center gap-4 rounded-[2px] px-3 py-2 transition-colors duration-150 hover:bg-[#FAF8F5]"
            >
              <span className="relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-[2px] bg-[#F1EEE9]">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold text-[#14161A]">
                  {product.name}
                </span>
                <span className="mt-[2px] block truncate text-[13px] leading-[1.5] text-[#767B82]">
                  {PRODUCT_DESCRIPTOR[product.slug] ?? product.tagline}
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* ── Cols 7–8: featured frame, changes per category ── */}
        <div className="col-span-2">
          <Link
            href="/projects"
            onClick={onNavigate}
            className="relative block h-full min-h-[280px] overflow-hidden rounded-[2px] bg-[#F1EEE9]"
          >
            <Image
              key={feature.src}
              src={feature.src}
              alt={feature.alt}
              fill
              sizes="320px"
              className="object-cover"
            />
            <span aria-hidden="true" className="scrim" />
            <span className="caption">{feature.caption}</span>
          </Link>
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
          className="px-3 py-2 text-[28px] leading-none font-normal text-[#14161A]"
        >
          &times;
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-auto px-6 pt-2 pb-6">
        {DRAWER_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="block border-b border-[#E7E3DC] py-[18px] text-[24px] leading-tight font-medium tracking-[-0.02em] text-[#14161A]"
          >
            {link.label}
          </Link>
        ))}

        <div className="label mt-9">Services</div>
        <div className="mt-3 flex flex-col">
          {serviceLinks.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              onClick={onClose}
              className="py-[9px] text-[16px] font-medium text-[#3D4147]"
            >
              {SERVICE_LABEL[service.slug] ?? service.name}
            </Link>
          ))}
        </div>

        <div className="label mt-8">Products</div>
        <div className="mt-3 grid grid-cols-2 gap-x-6">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="py-[9px] text-[16px] font-medium text-[#3D4147]"
            >
              {product.name}
            </Link>
          ))}
        </div>
      </nav>

      <Link
        href="/contact"
        onClick={onClose}
        className="flex h-16 shrink-0 items-center justify-center bg-[#F26430] text-[13px] font-semibold tracking-[0.12em] uppercase text-white transition-colors hover:bg-[#D8511F] hover:text-white"
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
  const [onImage, setOnImage] = useState(false)
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

  // Over-hero state: pages that open on a full-bleed photograph mark it
  // with [data-nav-on-image]; the bar runs light until it gains its
  // backdrop (Rockstar Pass Part 2).
  useEffect(() => {
    setOnImage(Boolean(document.querySelector("[data-nav-on-image]")))
  }, [pathname])

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

  // Menus and the drawer sit on white, so the light treatment yields to them
  const light = onImage && !scrolled && menu === null

  return (
    // reducedMotion="user": the CSS kill switch cannot stop framer's JS
    // animations, so the dropdown/drawer fades opt out here (MOVE 8).
    <MotionConfig reducedMotion="user">
    <div ref={rootRef}>
      <header
        className={`fixed top-0 right-0 left-0 z-50${light ? " nav-light" : ""}`}
        style={{
          // Fully opaque once scrolled. The reference's 0.92 wash let section
          // text ghost through behind the nav links; the bar sits over
          // photography and dense copy, so it has to be solid.
          background: scrolled || menu ? "#FFFFFF" : "rgba(255,255,255,0)",
          backdropFilter: scrolled || menu ? "blur(8px)" : "none",
          WebkitBackdropFilter: scrolled || menu ? "blur(8px)" : "none",
          borderBottom: `1px solid ${scrolled || menu ? HAIRLINE : "rgba(231,227,220,0)"}`,
          transition: "background 0.25s ease, border-color 0.25s ease",
        }}
      >
        <div className="container-1280 flex h-[72px] min-w-0 items-center gap-x-6">
          <Wordmark onClick={closeAll} light={light} />

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
            className="nav-cta ml-10 hidden shrink-0 rounded-[2px] border px-[19px] py-[11px] text-[12px] font-semibold tracking-[0.12em] uppercase transition-colors min-[821px]:inline-block"
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
            <span aria-hidden="true" className="nav-burger-bar block h-[1.5px] w-[22px]" />
            <span aria-hidden="true" className="nav-burger-bar block h-[1.5px] w-[22px]" />
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
    </MotionConfig>
  )
}
