"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, MotionConfig, motion, type Transition } from "framer-motion"
import BrandMark from "@/components/BrandMark"
import SearchOverlay from "@/components/SearchOverlay"
import { services, type Service } from "@/lib/services"
import { BUYERS } from "@/lib/buyers"

/* ------------------------------------------------------------------
   Data — derived from lib/, never duplicated.
   ------------------------------------------------------------------ */

type MenuKey = "services" | "buyers"


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

/** 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.1): services lead, text
    menus, no mega menu. What we do → Who we work with → Projects → For
    specifiers → About, the office number, Get a quote. A contractor's site
    is organised by what it does and who it does it for; a supplier's by
    catalogue. The application galleries are all still here, grouped under
    the four buyers (BUYERS, shared with the home page). */
const PRIMARY_LINKS: PrimaryLink[] = [
  { label: "What we do", href: "/services", match: ["/services", "/products", "/driveways", "/patterns"], menu: "services" },
  { label: "Who we work with", href: "/applications", match: ["/applications", "/galleries"], menu: "buyers" },
  { label: "Projects", href: "/projects", match: ["/projects"] },
  { label: "For specifiers", href: "/specifiers", match: ["/specifiers", "/resources"] },
  { label: "About", href: "/about", match: ["/about", "/blog"] },
]


/** Where the work goes — the ten application galleries (mirrors lib/work.ts WORK_APPS). */
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
  { label: "Vapour blasting", href: "/services/vapor-blasting", slug: "vapour" },
]

const byslug = (slug: string) => APPLICATIONS.find((a) => a.slug === slug)

/** The four buyers, each with its galleries (the same grouping as the home page's ApplicationsSection). */
const BUYER_GROUPS = BUYERS.map((b) => ({
  label: b.label,
  note: b.note,
  items: b.slugs.map(byslug).filter((a): a is NonNullable<typeof a> => Boolean(a)),
}))

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
      aria-label="Square One Paving, home"
      className="flex shrink-0 items-center"
    >
      <BrandMark tone={light ? "light" : "dark"} />
    </Link>
  )
}

interface PanelProps {
  onNavigate: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

/**
 * The mega menu (28 Sept 2026, Vern: "mega menu too… let's go pro"). A
 * full-width sheet under the bar: the words on the left, a column that
 * starts a project on the right. No photo tiles, no captions over
 * gradients: that is HUB's menu. This one reads like an installer's.
 */
function MegaPanel({
  label,
  children,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: PanelProps & { label: string; children: React.ReactNode }) {
  return (
    <motion.div
      role="region"
      aria-label={label}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={panelTransition}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="mega-panel hidden min-[1024px]:block"
    >
      <div className="container-1280 grid grid-cols-12 gap-x-12 py-10">
        <div className="col-span-8">{children}</div>
        <StartProject onNavigate={onNavigate} />
      </div>
    </motion.div>
  )
}

/** The column that ends every menu: the free site visit, the lines, the button. */
function StartProject({ onNavigate }: { onNavigate: () => void }) {
  return (
    <aside className="mega-aside col-span-4 self-start">
      <span className="label">Start a project</span>
      <p className="mt-2 text-[22px] font-bold leading-[1.2] text-ink [text-wrap:balance]" style={{ fontFamily: "var(--font-display)" }}>
        Free site visit, written quote
      </p>
      <p className="mt-3 text-[16px] leading-[1.55] text-ink-body">
        Send a few photos and the address. We walk the site with the sample boards and follow
        with a written quote.
      </p>
      <div className="mt-6">
        <Link href="/contact" onClick={onNavigate} className="btn-primary">
          Get a quote
        </Link>
      </div>
      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[15px] leading-[1.5]">
        <dt className="italic text-ink-muted">Lower Mainland</dt>
        <dd>
          <a href="tel:+16046126209" className="tabular-nums text-ink hover:underline hover:underline-offset-4">604-612-6209</a>
        </dd>
        <dt className="italic text-ink-muted">Vancouver Island</dt>
        <dd>
          <a href="tel:+12503910270" className="tabular-nums text-ink hover:underline hover:underline-offset-4">250-391-0270</a>
        </dd>
      </dl>
    </aside>
  )
}

/** What we do: the four trades, the residential line, and the systems behind them. */
const SERVICE_COLUMNS: { href: string; name: string; note: string }[][] = [
  [
    // Jan, 19 Sept: two kinds under stamped asphalt, StreetPrint regular and TrafficPatternsXD durable.
    { href: "/services/stamped-asphalt", name: "Stamped asphalt", note: "Brick, cobble or slate pressed into the asphalt already there" },
    { href: "/services/decorative-coatings", name: "Decorative coatings", note: "Colour that holds under traffic, on asphalt or concrete" },
    { href: "/services/preformed-thermoplastic", name: "Preformed thermoplastic", note: "Crosswalks, symbols and street art, cut to the drawing" },
  ],
  [
    { href: "/services/vapor-blasting", name: "Vapour blasting", note: "Graffiti, markings and grime lifted wet; surfaces primed" },
    { href: "/driveways", name: "Driveways", note: "For homeowners in Metro Vancouver and Greater Victoria" },
    { href: "/products", name: "The systems we install", note: "The eight systems behind the four services" },
  ],
]

function ServicesMega({ onNavigate, onMouseEnter, onMouseLeave }: PanelProps) {
  return (
    <MegaPanel label="What we do" onNavigate={onNavigate} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <span className="label">What we do</span>
      <div className="mt-4 grid grid-cols-2 gap-x-10">
        {SERVICE_COLUMNS.map((col, i) => (
          <ul key={i}>
            {col.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={onNavigate} className="mega-item">
                  <span className="mega-name">{item.name}</span>
                  <span className="mega-note">{item.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="mega-foot">
        <Link href="/services" onClick={onNavigate} className="link">
          All services
        </Link>
        <Link href="/specifiers" onClick={onNavigate} className="link">
          For specifiers
        </Link>
        <Link href="/projects" onClick={onNavigate} className="link">
          Projects
        </Link>
      </div>
    </MegaPanel>
  )
}

function BuyersMega({ onNavigate, onMouseEnter, onMouseLeave }: PanelProps) {
  return (
    <MegaPanel label="Who we work with" onNavigate={onNavigate} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <span className="label">Who we work with</span>
      <div className="mt-4 grid grid-cols-2 gap-x-10 gap-y-7">
        {BUYER_GROUPS.map((g) => (
          <div key={g.label} className="border-t border-hairline pt-4">
            <span className="mega-name">{g.label}</span>
            <span className="mega-note">{g.note}</span>
            <ul className="mt-2">
              {g.items.map((a) => (
                <li key={a.href}>
                  <Link href={a.href} onClick={onNavigate} className="mega-sub">
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mega-foot">
        <Link href="/galleries" onClick={onNavigate} className="link">
          Every photograph, by application
        </Link>
        <Link href="/projects" onClick={onNavigate} className="link">
          Projects
        </Link>
      </div>
    </MegaPanel>
  )
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const pathname = usePathname()
  const row = "block border-b border-[#E7E3DC] py-[16px] text-[22px] leading-tight font-bold tracking-[-0.01em] text-[#14161A]"
  const sub = "block py-[8px] text-[16px] text-[#3D4147]"
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

      {/* The same list as the bar, one level deep, as text (26 Sept 2026). */}
      <nav aria-label="Mobile" className="flex-1 overflow-auto px-6 pt-2 pb-6">
        <Link href="/services" onClick={onClose} className={row} style={{ fontFamily: "var(--font-display)" }}>
          What we do
        </Link>
        <div className="border-b border-[#E7E3DC] py-2">
          {serviceLinks.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} onClick={onClose} className={sub}>
              {SERVICE_LABEL[service.slug] ?? service.name}
            </Link>
          ))}
          <Link href="/driveways" onClick={onClose} className={sub}>
            Driveways
          </Link>
          <Link href="/products" onClick={onClose} className={sub}>
            The systems we install
          </Link>
        </div>

        <Link href="/applications" onClick={onClose} className={row} style={{ fontFamily: "var(--font-display)" }}>
          Who we work with
        </Link>
        <div className="border-b border-[#E7E3DC] py-2">
          {BUYER_GROUPS.map((g) => (
            <div key={g.label} className="py-2">
              <span className="label">{g.label}</span>
              <div className="grid grid-cols-2 gap-x-4">
                {g.items.map((a) => (
                  <Link key={a.href} href={a.href} onClick={onClose} className={sub}>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {[
          { label: "Projects", href: "/projects" },
          { label: "For specifiers", href: "/specifiers" },
          { label: "Blog", href: "/blog" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ].map((link) => (
          <Link key={link.href} href={link.href} onClick={onClose} className={row} style={{ fontFamily: "var(--font-display)" }}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-1 border-t border-[#E7E3DC] px-6 py-4 text-[14px] text-[#5F646B]">
        <span>
          <a href="tel:+16046126209" className="font-medium text-[#14161A]">604-612-6209</a> Maple Ridge
        </span>
        <span>
          <a href="tel:+12503910270" className="font-medium text-[#14161A]">250-391-0270</a> Vancouver Island
        </span>
      </div>

      <Link
        href={pathname === "/contact" ? "/contact#quote" : "/contact"}
        onClick={onClose}
        className="flex h-16 shrink-0 items-center justify-center bg-[color:var(--accent-deep)] text-[15px] font-bold text-white transition-colors hover:bg-[color:var(--accent-press)] hover:text-white"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Get a quote
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
            className="ml-auto hidden items-center gap-6 min-[1024px]:flex min-[1280px]:gap-7"
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

          {/* The office number, in the bar (26 Sept 2026, the brief §3.1). */}
          <a href="tel:+16046126209" className="nav-phone ml-6 hidden min-[1180px]:inline-block">
            604-612-6209
          </a>

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

          {/* 21 Sept 2026: on /contact this used to link to /contact, so the
              page's loudest button did nothing. It now goes to the form. */}
          <Link
            href={pathname === "/contact" ? "/contact#quote" : "/contact"}
            onClick={closeAll}
            style={{ fontFamily: "var(--font-display)" }}
            className="nav-cta ml-2 hidden shrink-0 border transition-colors min-[1024px]:inline-block"
          >
            Get a quote
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

      {/* The page steps back while a menu is open; a click on it closes the menu. */}
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
        {menu === "services" && (
          <ServicesMega onNavigate={closeAll} onMouseEnter={() => openMenu("services")} onMouseLeave={scheduleClose} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menu === "buyers" && (
          <BuyersMega onNavigate={closeAll} onMouseEnter={() => openMenu("buyers")} onMouseLeave={scheduleClose} />
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
