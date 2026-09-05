"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AnimatePresence, MotionConfig, motion, type Transition } from "framer-motion"
import BrandMark from "@/components/BrandMark"
import SearchOverlay from "@/components/SearchOverlay"
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

/** Five items (Vern, 5 Sept 2026: "too many items across the top").
    Applications and Driveways live inside the Services panel — the four
    trades, the residential line, and where the work goes — so the bar
    reads as a sentence: what we do, what we install, the proof, the
    specs, the company. */
const PRIMARY_LINKS: PrimaryLink[] = [
  { label: "Services", href: "/services", match: ["/services", "/applications", "/driveways", "/galleries"], menu: "services" },
  { label: "Products", href: "/products", match: ["/products"], menu: "products" },
  { label: "Projects", href: "/projects", match: ["/projects"] },
  { label: "Resources", href: "/resources", match: ["/resources"] },
  { label: "About", href: "/about", match: ["/about"] },
]

/** The drawer keeps every route the desktop panels reach. */
const DRAWER_LINKS: { label: string; href: string }[] = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Galleries", href: "/galleries" },
  { label: "Blog", href: "/blog" },
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

/** Services panel — the four trades and the residential line as photo tiles. */
const SERVICE_TILES: { href: string; name: string; note: string; src: string; alt: string }[] = [
  {
    href: "/services/stamped-asphalt",
    name: "Stamped asphalt",
    note: "Patterns pressed into hot asphalt",
    src: "/images/hero/victoria-ellis-point-walkway-streetprint.jpg",
    alt: "British Cobble StreetPrint walkway at Ellis Point, Victoria",
  },
  {
    href: "/services/decorative-coatings",
    name: "Decorative coatings",
    note: "Colour that holds under traffic",
    src: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
    alt: "StreetBond multicolour plaza at Joyce Station, Vancouver",
  },
  {
    href: "/services/preformed-thermoplastic",
    name: "Preformed thermoplastic",
    note: "Crosswalks, symbols, civic art",
    src: "/images/projects/ubc-musqueam-crosswalk/ubc-musqueam-crosswalk-trafficpatterns-01.jpg",
    alt: "Musqueam crosswalk artwork at UBC, Vancouver",
  },
  {
    href: "/driveways",
    name: "Driveways",
    note: "For homeowners — Vancouver & Victoria",
    src: "/images/S1_update_v2/photos/Driveways/Number%201.jpg",
    alt: "Ashlar slate StreetPrint driveway installed by Square One",
  },
  {
    href: "/services/vapor-blasting",
    name: "Vapour blasting",
    note: "Cleaning, priming, graffiti removal",
    src: "/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg",
    alt: "Square One crew vapour blasting at Granville Island",
  },
]

/** Where the work goes — the ten application galleries (mirrors lib/work.ts WORK_APPS). */
const APPLICATIONS: { label: string; href: string }[] = [
  { label: "Crosswalks", href: "/applications/crosswalks" },
  { label: "Streetscapes", href: "/applications/streetscapes" },
  { label: "Roundabouts & traffic calming", href: "/applications/roundabouts" },
  { label: "Parking lots", href: "/applications/parking-lots" },
  { label: "Parks & paths", href: "/applications/parks-paths" },
  { label: "Schools & sports courts", href: "/applications/schools-sports-courts" },
  { label: "Bike lanes", href: "/applications/bike-lanes" },
  { label: "Public art", href: "/applications/public-art" },
  { label: "Branding & wayfinding", href: "/applications/branding-wayfinding" },
  { label: "Driveways", href: "/driveways" },
]

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

/** One photographic tile — the shared voice of both panels. */
function MegaTile({
  href,
  src,
  alt,
  name,
  note,
  aspect = "aspect-[16/10]",
  compact = false,
  onNavigate,
}: {
  href: string
  src: string
  alt: string
  name: string
  note?: string
  aspect?: string
  /** Five-across tiles: a smaller name below 1536px, and the note only from 1536px up. */
  compact?: boolean
  onNavigate: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      data-mega-item
      className={`group relative block overflow-hidden rounded-[2px] bg-[#F1EEE9] ${aspect}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1280px) 33vw, 420px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span aria-hidden="true" className="scrim" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <span className="min-w-0">
          <span
            className={`block font-semibold uppercase text-white ${
              compact ? "text-[12px] tracking-[0.08em] min-[1536px]:text-[13px] min-[1536px]:tracking-[0.1em]" : "text-[13px] tracking-[0.1em]"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {name}
          </span>
          {note && (
            <span className={`mt-[3px] block text-[12px] leading-[1.45] text-white/75 ${compact ? "max-[1535px]:hidden" : ""}`}>
              {note}
            </span>
          )}
        </span>
        <span
          aria-hidden="true"
          className="mb-[1px] shrink-0 text-[15px] leading-none text-white/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
        >
          &rarr;
        </span>
      </span>
    </Link>
  )
}

interface MegaPanelProps {
  onNavigate: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

/** The panel frame — fixed under the bar, the site's container width. */
function Panel({
  label,
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  label: string
  children: React.ReactNode
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return (
    <motion.div
      role="region"
      aria-label={label}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={panelTransition}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed top-[72px] right-0 left-0 z-40 hidden border-t border-b border-[#E7E3DC] bg-white min-[1024px]:block"
    >
      <div className="mx-auto py-8" style={{ maxWidth: "var(--container)", paddingInline: "var(--gutter)" }}>
        {children}
      </div>
    </motion.div>
  )
}

function ServicesMega({ onNavigate, onMouseEnter, onMouseLeave }: MegaPanelProps) {
  return (
    <Panel label="Services menu" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {/* ── The trades, the residential line, and the supporting service —
             one row of five photographs, in the business order ──────── */}
      <div className="grid grid-cols-5 gap-4">
        {SERVICE_TILES.map((tile) => (
          <MegaTile
            key={tile.href}
            href={tile.href}
            src={tile.src}
            alt={tile.alt}
            name={tile.name}
            note={tile.note}
            aspect="aspect-[4/3]"
            compact
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {/* ── Where the work goes — the same ten applications the galleries
             and the home page carry, as one band under the photographs ──────── */}
      <div className="mt-7 border-t border-[#E7E3DC] pt-5">
        <div className="label">Where it goes</div>
        <ul className="mt-2 grid grid-cols-4 gap-x-8 min-[1920px]:grid-cols-5">
          {APPLICATIONS.map((a) => (
            <li key={a.href}>
              <Link
                href={a.href}
                onClick={onNavigate}
                data-mega-item
                className="group flex items-baseline gap-2 py-[7px] text-[14px] font-medium text-[#3D4147] transition-colors hover:text-[#14161A]"
              >
                {a.label}
                <span aria-hidden="true" className="text-[#A9A297] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#14161A]">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-[#E7E3DC] pt-5">
        <Link href="/services" onClick={onNavigate} className="arrow-link">
          All services <span>&rarr;</span>
        </Link>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <Link href="/galleries" onClick={onNavigate} className="arrow-link">
            Image galleries <span>&rarr;</span>
          </Link>
          <Link href="/applications" onClick={onNavigate} className="arrow-link">
            All applications <span>&rarr;</span>
          </Link>
          <Link href="/resources" onClick={onNavigate} className="arrow-link">
            Specifications &amp; documents <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </Panel>
  )
}

function ProductsMega({ onNavigate, onMouseEnter, onMouseLeave }: MegaPanelProps) {
  const [active, setActive] = useState<(typeof PRODUCT_CATEGORIES)[number]>(PRODUCT_CATEGORIES[0])
  const panelRef = useRef<HTMLDivElement>(null)
  const column = productColumns.find((c) => c.category === active) ?? productColumns[0]
  const feature = CATEGORY_FEATURE[active]
  const tileCount = column.items.length + (column.items.length < 3 ? 1 : 0)

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
    <Panel label="Products menu" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div ref={panelRef} onKeyDown={onKeyDown} className="grid grid-cols-8 gap-x-8">
        {/* ── Cols 1–2: categories ──────── */}
        <div className="col-span-2 flex flex-col border-r border-[#E7E3DC] pr-8">
          {productColumns.map((col) => (
            <button
              key={col.category}
              type="button"
              data-mega-cat={col.category}
              onMouseEnter={() => setActive(col.category)}
              onFocus={() => setActive(col.category)}
              onClick={() => setActive(col.category)}
              style={{ fontFamily: "var(--font-display)" }}
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

        {/* ── Cols 3–8: the active category as large photo tiles ─ */}
        <div className="col-span-6">
          <div className={`grid gap-5 ${tileCount <= 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {column.items.map((product) => (
              <MegaTile
                key={product.slug}
                href={`/products/${product.slug}`}
                src={product.image}
                alt={`${product.name} installed by Square One`}
                name={product.name}
                note={PRODUCT_DESCRIPTOR[product.slug] ?? product.tagline}
                onNavigate={onNavigate}
              />
            ))}
            {column.items.length < 3 && (
              <MegaTile
                href="/projects"
                src={feature.src}
                alt={feature.alt}
                name="In the field"
                note={feature.caption}
                onNavigate={onNavigate}
              />
            )}
          </div>
        </div>
      </div>
    </Panel>
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
      className="fixed inset-0 z-[300] flex flex-col bg-white min-[1024px]:hidden"
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
          <Link href="/driveways" onClick={onClose} className="py-[9px] text-[16px] font-medium text-[#3D4147]">
            Driveways
          </Link>
        </div>

        <div className="label mt-8">Applications</div>
        <div className="mt-3 grid grid-cols-2 gap-x-6">
          {APPLICATIONS.filter((a) => a.href !== "/driveways").map((a) => (
            <Link key={a.href} href={a.href} onClick={onClose} className="py-[9px] text-[16px] font-medium text-[#3D4147]">
              {a.label}
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

      <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-1 border-t border-[#E7E3DC] px-6 py-4 text-[13px] text-[#767B82]">
        <span>
          <a href="tel:+16044669902" className="font-medium text-[#14161A]">604-466-9902</a> Maple Ridge
        </span>
        <span>
          <a href="tel:+12503910270" className="font-medium text-[#14161A]">250-391-0270</a> Vancouver Island
        </span>
      </div>

      <Link
        href="/contact"
        onClick={onClose}
        className="flex h-16 shrink-0 items-center justify-center bg-[#F26430] text-[13px] font-semibold tracking-[0.12em] uppercase text-white transition-colors hover:bg-[#D8511F] hover:text-white"
        style={{ fontFamily: "var(--font-display)" }}
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
  const [searchOpen, setSearchOpen] = useState(false)
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

  // Over-hero state: only a page that opens on a full-bleed photograph
  // ([data-nav-on-image]) gets the transparent, light bar. Everywhere
  // else the bar is solid white from the first pixel, so it can never
  // sink into a split-hero photograph (Vern, 5 Sept 2026).
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

  // Cmd/Ctrl+K opens search from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        clearCloseTimer()
        setMenu(null)
        setDrawerOpen(false)
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [clearCloseTimer])

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

  // Solid unless the page opens on a photograph and we are still at the top.
  const solid = scrolled || menu !== null || !onImage
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
          background: solid ? "#FFFFFF" : "rgba(255,255,255,0)",
          backdropFilter: solid ? "blur(8px)" : "none",
          WebkitBackdropFilter: solid ? "blur(8px)" : "none",
          borderBottom: `1px solid ${solid ? HAIRLINE : "rgba(231,227,220,0)"}`,
          transition: "background 0.25s ease, border-color 0.25s ease",
        }}
      >
        <div className="container-1280 flex h-[72px] min-w-0 items-center gap-x-6">
          <Wordmark onClick={closeAll} light={light} />

          <nav
            aria-label="Primary"
            className="ml-auto hidden items-center gap-6 min-[1024px]:flex min-[1280px]:gap-8"
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
                      // Open panel + click again (or hover-open + click) =
                      // go to the index page. Closed = open the panel.
                      if (menu === menuKey) {
                        closeAll()
                        return
                      }
                      e.preventDefault()
                      openMenu(menuKey)
                    }}
                    className={`${linkClass} inline-flex items-center gap-[6px]`}
                  >
                    {link.label}
                    <svg
                      aria-hidden="true"
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      className={`shrink-0 transition-transform duration-150 ${
                        menu === menuKey ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  </Link>
                </div>
              )
            })}
          </nav>

          <button
            type="button"
            onClick={() => {
              closeAll()
              setSearchOpen(true)
            }}
            aria-label="Search the site"
            title="Search (Ctrl+K)"
            className="nav-link ml-2 hidden h-10 w-10 shrink-0 items-center justify-center rounded-[2px] min-[1024px]:flex"
          >
            <svg aria-hidden="true" width="17" height="17" viewBox="0 0 18 18">
              <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M12.5 12.5L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <Link
            href="/contact"
            onClick={closeAll}
            style={{ fontFamily: "var(--font-display)" }}
            className="nav-cta ml-2 hidden shrink-0 rounded-[2px] border px-[19px] py-[11px] text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors min-[1024px]:inline-block"
          >
            Request a quote
          </Link>

          <button
            type="button"
            onClick={() => {
              closeAll()
              setSearchOpen(true)
            }}
            aria-label="Search the site"
            className="nav-link ml-auto flex h-11 w-11 items-center justify-center min-[1024px]:hidden"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
              <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M12.5 12.5L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] min-[1024px]:hidden"
          >
            <span aria-hidden="true" className="nav-burger-bar block h-[1.5px] w-[22px]" />
            <span aria-hidden="true" className="nav-burger-bar block h-[1.5px] w-[22px]" />
          </button>
        </div>
      </header>

      {/* The page steps back while a panel is open; a click on it closes the panel */}
      <AnimatePresence>
        {menu && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={closeMenu}
            className="mega-scrim hidden min-[1024px]:block"
          />
        )}
      </AnimatePresence>

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
        {menu === "services" && (
          <ServicesMega
            onNavigate={closeAll}
            onMouseEnter={() => openMenu("services")}
            onMouseLeave={scheduleClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {drawerOpen && <MobileDrawer onClose={closeAll} />}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
    </MotionConfig>
  )
}
