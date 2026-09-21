"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AnimatePresence, MotionConfig, motion, type Transition } from "framer-motion"
import BrandMark from "@/components/BrandMark"
import SearchOverlay from "@/components/SearchOverlay"
import { services, type Service } from "@/lib/services"
import { APP_LEADS } from "@/lib/app-leads"

/* ------------------------------------------------------------------
   Data — derived from lib/, never duplicated.
   ------------------------------------------------------------------ */

type MenuKey = "applications" | "services"


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

/** Five items (Vern, 5 Sept 2026: "too many items across the top"), in the
    order a contractor or specifier actually shops (Vern, 19 Sept: "needs to
    work more like a sales funnel for contractors. Applications etc."):
    where the work goes → what we do → the proof → the people who draw it →
    the company. Products left the bar the same night — the client was not
    sure they belonged there; the eight systems live one click deeper, on
    /products, reached by a single link in the Services panel, the drawer
    and the footer (Vern, 19 Sept: "lead potential clients towards
    services"). */
const PRIMARY_LINKS: PrimaryLink[] = [
  { label: "Applications", href: "/applications", match: ["/applications", "/driveways", "/galleries"], menu: "applications" },
  { label: "Services", href: "/services", match: ["/services", "/products"], menu: "services" },
  { label: "Projects", href: "/projects", match: ["/projects"] },
  { label: "Specifiers", href: "/specifiers", match: ["/specifiers", "/resources"] },
  { label: "About", href: "/about", match: ["/about"] },
]

/** The drawer keeps every route the desktop panels reach. */
const DRAWER_LINKS: { label: string; href: string }[] = [
  { label: "Applications", href: "/applications" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Specifiers", href: "/specifiers" },
  { label: "Resources", href: "/resources" },
  { label: "Galleries", href: "/galleries" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
]

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
    src: "/images/services/vapor-blasting/generated/gen-road-marking-removal-02.jpg",
    alt: "Vapour blasting a painted line off wet asphalt — an illustration of the service",
  },
]

/** Where the work goes — the ten application galleries (mirrors lib/work.ts WORK_APPS), each with its gallery's lead photograph. */
const APPLICATIONS: { label: string; href: string; slug: string }[] = [
  { label: "Crosswalks", href: "/applications/crosswalks", slug: "crosswalks" },
  { label: "Streetscapes", href: "/applications/streetscapes", slug: "streetscapes" },
  { label: "Roundabouts & traffic calming", href: "/applications/roundabouts", slug: "roundabouts" },
  { label: "Parking lots", href: "/applications/parking-lots", slug: "parking-lots" },
  { label: "Parks & paths", href: "/applications/parks-paths", slug: "parks-paths" },
  { label: "Schools & sports courts", href: "/applications/schools-sports-courts", slug: "schools-sports-courts" },
  { label: "Bike lanes", href: "/applications/bike-lanes", slug: "bike-lanes" },
  { label: "Public art", href: "/applications/public-art", slug: "public-art" },
  { label: "Branding & wayfinding", href: "/applications/branding-wayfinding", slug: "branding-wayfinding" },
  { label: "Driveways", href: "/driveways", slug: "driveways" },
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

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-[#E7E3DC] pt-5">
        <Link href="/services" onClick={onNavigate} className="arrow-link">
          All services <span>&rarr;</span>
        </Link>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {/* The eight systems live one click deeper (the client, 19 Sept:
              not sure Products belongs in the menu; Vern: "lead potential
              clients towards services") — a single quiet link, not a grid. */}
          <Link href="/products" onClick={onNavigate} className="arrow-link">
            The systems we install <span>&rarr;</span>
          </Link>
          <Link href="/specifiers" onClick={onNavigate} className="arrow-link">
            For specifiers <span>&rarr;</span>
          </Link>
          <Link href="/resources" onClick={onNavigate} className="arrow-link">
            Specifications &amp; documents <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </Panel>
  )
}

function ApplicationsMega({ onNavigate, onMouseEnter, onMouseLeave }: MegaPanelProps) {
  // Where the work goes — the ten kinds of work as photographs, two rows of
  // five, each the lead frame of its gallery. This is the front door of the
  // funnel: a contractor or specifier shops by application, not by system.
  return (
    <Panel label="Applications menu" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="grid grid-cols-5 gap-4">
        {APPLICATIONS.map((a) => (
          <MegaTile
            key={a.href}
            href={a.href}
            src={APP_LEADS[a.slug] ?? "/images/og-image.png"}
            alt=""
            name={a.label}
            aspect="aspect-[16/10]"
            compact
            onNavigate={onNavigate}
          />
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-[#E7E3DC] pt-5">
        <Link href="/applications" onClick={onNavigate} className="arrow-link">
          All applications <span>&rarr;</span>
        </Link>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <Link href="/galleries" onClick={onNavigate} className="arrow-link">
            Image galleries <span>&rarr;</span>
          </Link>
          <Link href="/projects" onClick={onNavigate} className="arrow-link">
            Projects <span>&rarr;</span>
          </Link>
          <Link href="/specifiers" onClick={onNavigate} className="arrow-link">
            For specifiers <span>&rarr;</span>
          </Link>
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
        {/* The five services as a swipeable photo rail — the desktop panel's
            first row, one thumb-width at a time. */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pt-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SERVICE_TILES.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              onClick={onClose}
              className="relative block aspect-[4/3] w-[62vw] max-w-[260px] shrink-0 snap-start overflow-hidden rounded-[2px] bg-[#F1EEE9]"
            >
              <Image src={tile.src} alt={tile.alt} fill sizes="62vw" className="object-cover" />
              <span aria-hidden="true" className="scrim" />
              <span className="absolute inset-x-0 bottom-0 p-3">
                <span className="block text-[12px] font-semibold uppercase tracking-[0.1em] text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {tile.name}
                </span>
                <span className="mt-[2px] block text-[12px] text-white/75">{tile.note}</span>
              </span>
            </Link>
          ))}
        </div>

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
          <Link href="/specifiers" onClick={onClose} className="py-[9px] text-[16px] font-medium text-[#3D4147]">
            For specifiers
          </Link>
          <Link href="/products" onClick={onClose} className="py-[9px] text-[16px] font-medium text-[#3D4147]">
            The systems we install
          </Link>
        </div>

        <div className="label mt-8">Applications</div>
        <div className="mt-3 grid grid-cols-2 gap-x-4">
          {APPLICATIONS.filter((a) => a.href !== "/driveways").map((a) => (
            <Link key={a.href} href={a.href} onClick={onClose} className="flex items-center gap-3 py-[7px] text-[15px] font-medium text-[#3D4147]">
              {APP_LEADS[a.slug] && (
                <span className="relative block h-[30px] w-[40px] shrink-0 overflow-hidden rounded-[2px] bg-[#F1EEE9]">
                  <Image src={APP_LEADS[a.slug]} alt="" fill sizes="40px" className="object-cover" />
                </span>
              )}
              <span className="min-w-0 leading-[1.25]">{a.label}</span>
            </Link>
          ))}
        </div>

      </nav>

      <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-1 border-t border-[#E7E3DC] px-6 py-4 text-[13px] text-[#767B82]">
        <span>
          <a href="tel:+16046126209" className="font-medium text-[#14161A]">604-612-6209</a> Maple Ridge
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
  const [atFooter, setAtFooter] = useState(false)
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

  // The bar steps off the page once the footer is in view — the footer
  // carries its own wordmark, and two logos on one screen looked wrong
  // (Vern, 19 Sept 2026). Any open panel keeps the bar; it comes back the
  // moment the footer leaves the viewport.
  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer || !("IntersectionObserver" in window)) return
    const io = new IntersectionObserver(
      (entries) => setAtFooter(entries.some((e) => e.isIntersecting)),
      { threshold: 0 },
    )
    io.observe(footer)
    return () => io.disconnect()
  }, [pathname])

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
  // Hidden only while nothing is open and the footer is on screen.
  const hidden = atFooter && menu === null && !drawerOpen && !searchOpen

  return (
    // reducedMotion="user": the CSS kill switch cannot stop framer's JS
    // animations, so the dropdown/drawer fades opt out here (MOVE 8).
    <MotionConfig reducedMotion="user">
    <div ref={rootRef}>
      <header
        className={`fixed top-0 right-0 left-0 z-50${light ? " nav-light" : ""}`}
        aria-hidden={hidden || undefined}
        style={{
          background: solid ? "#FFFFFF" : "rgba(255,255,255,0)",
          backdropFilter: solid ? "blur(8px)" : "none",
          WebkitBackdropFilter: solid ? "blur(8px)" : "none",
          borderBottom: `1px solid ${solid ? HAIRLINE : "rgba(231,227,220,0)"}`,
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          pointerEvents: hidden ? "none" : "auto",
          transition: "background 0.25s ease, border-color 0.25s ease, transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
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
        {menu === "applications" && (
          <ApplicationsMega
            onNavigate={closeAll}
            onMouseEnter={() => openMenu("applications")}
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
