"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, MotionConfig, motion, type Transition } from "framer-motion"
import BrandMark from "@/components/BrandMark"
import SearchOverlay from "@/components/SearchOverlay"
import { BUYERS } from "@/lib/buyers"
import { MENU_PREVIEWS, type MenuPreviews } from "@/lib/menu"
import ColourEdge from "@/components/ui/ColourEdge"

/* ------------------------------------------------------------------
   Data — derived from lib/, never duplicated.
   ------------------------------------------------------------------ */

type MenuKey = "services" | "buyers"


interface PrimaryLink {
  label: string
  href: string
  match: string[]
  menu?: MenuKey
}

/** 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.1): services lead. (The
    "text menus, no mega menu" of that day became the sheet below on 28
    Sept.) What we do → Who we work with → Projects → For
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

const HAIRLINE = "#E1E4E7"

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

/* ------------------------------------------------------------------
   2 Oct 2026 (Vern: "still feels text heavy… including the mega menu"):
   the one-line notes under every name, in the panels and the phone
   drawer, came off. The names, the sample squares and the photograph
   carry the menu; the notes stay in lib/menu.ts for the search index.

   The mega menu — second pass, 28 Sept 2026 (Vern: "give the mega menu
   some personality, it's rather lacking… mind the hubss.com design
   patterns"). HUB's menu is four photo tiles in a row on near-black, a
   spaced-caps label under each and a list under that. This one is an
   installer's sample case:

     · what we do is an index, numbered, with the material itself beside
       each name: a square cut from Square One's own photographs, the way
       the sample boards come to a site walk
     · who we work with is a ledger: the buyer in the margin, their
       galleries as a run of words beside them
     · one photograph on the right follows the pointer (and the keyboard),
       revealed by the line from the before/after, the caption under it
     · a strip along the bottom starts a project; the colour card's edge
       closes the sheet

   One sheet stays mounted while either menu is open, so moving between
   the two swaps the contents instead of fading one panel over another.
   ------------------------------------------------------------------ */

interface Row {
  href: string
  name: string
  note: string
  swatch?: string
}

const SERVICE_ROWS: Row[] = [
  // Jan, 19 Sept: two kinds under stamped asphalt, StreetPrint regular and TrafficPatternsXD durable.
  { href: "/services/stamped-asphalt", name: "Stamped asphalt", note: "Brick, cobble or slate pressed into the asphalt already there", swatch: "stamped-asphalt" },
  { href: "/services/decorative-coatings", name: "Decorative coatings", note: "Colour that holds under traffic, on asphalt or concrete", swatch: "decorative-coatings" },
  { href: "/services/preformed-thermoplastic", name: "Preformed thermoplastic", note: "Crosswalks, symbols and street art, cut to the drawing", swatch: "preformed-thermoplastic" },
  { href: "/services/vapor-blasting", name: "Vapour blasting", note: "Graffiti, markings and grime lifted wet; surfaces primed", swatch: "vapor-blasting" },
]

const SERVICE_MORE: Row[] = [
  { href: "/driveways", name: "Driveways", note: "For homeowners in Metro Vancouver and Greater Victoria", swatch: "driveways" },
  { href: "/products", name: "The systems we install", note: "The eight systems behind the four services", swatch: "systems" },
]

/** The preview follows the pointer after a breath, so a pass across the
    rows on the way somewhere else does not set off a string of wipes. */
function usePreview(initial: string) {
  const [state, setState] = useState({ active: initial, prev: initial })
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const show = useCallback((href: string) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setState((s) => (s.active === href ? s : { active: href, prev: s.active }))
    }, 70)
  }, [])
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )
  return [state, show] as const
}

function Swatch({ name, size }: { name: string; size: number }) {
  return (
    <span className="mega-swatch" style={{ width: size, height: size }} aria-hidden="true">
      <Image src={`/images/menu/swatch-${name}.webp`} alt="" width={size} height={size} unoptimized />
    </span>
  )
}

/** The frame on the right: every photograph for this menu is stacked in it,
    the active one on top, wiped in behind the line. */
function MegaPreview({
  keys,
  previews,
  active,
  prev,
}: {
  keys: string[]
  previews: MenuPreviews
  active: string
  prev: string
}) {
  const current = previews[active]
  return (
    <figure className="mega-preview">
      <div className="mega-frame">
        {keys.map((k) => {
          const p = previews[k]
          if (!p) return null
          const state = k === active ? " is-active" : k === prev ? " is-prev" : ""
          return (
            <Image
              key={k}
              src={p.src}
              alt=""
              aria-hidden="true"
              fill
              loading="eager"
              sizes="(min-width: 1280px) 500px, 40vw"
              className={`mega-shot${state}`}
            />
          )
        })}
        {current && <span key={active} className="mega-line" aria-hidden="true" />}
      </div>
      <figcaption className="cap">{current?.caption ?? " "}</figcaption>
    </figure>
  )
}

interface MenuProps {
  previews: MenuPreviews
  onNavigate: () => void
}

function ServicesMenu({ previews, onNavigate }: MenuProps) {
  const [pv, show] = usePreview(SERVICE_ROWS[0].href)
  const keys = [...SERVICE_ROWS, ...SERVICE_MORE].map((r) => r.href)
  return (
    <>
      <div className="col-span-7">
        <div className="mega-head">
          <span className="label">What we do</span>
          <Link href="/services" onClick={onNavigate} className="link">
            All services
          </Link>
        </div>
        <ol className="mega-index">
          {SERVICE_ROWS.map((row, i) => (
            <li key={row.href}>
              <Link
                href={row.href}
                onClick={onNavigate}
                onMouseEnter={() => show(row.href)}
                onFocus={() => show(row.href)}
                className="mega-row"
                data-active={pv.active === row.href || undefined}
              >
                <span className="mega-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {row.swatch && <Swatch name={row.swatch} size={56} />}
                <span className="min-w-0">
                  <span className="mega-name">{row.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <ul className="mega-more">
          {SERVICE_MORE.map((row) => (
            <li key={row.href}>
              <Link
                href={row.href}
                onClick={onNavigate}
                onMouseEnter={() => show(row.href)}
                onFocus={() => show(row.href)}
                className="mega-row mega-row-sm"
                data-active={pv.active === row.href || undefined}
              >
                {row.swatch && <Swatch name={row.swatch} size={40} />}
                <span className="min-w-0">
                  <span className="mega-name">{row.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-5">
        <MegaPreview keys={keys} previews={previews} active={pv.active} prev={pv.prev} />
      </div>
    </>
  )
}

function BuyersMenu({ previews, onNavigate }: MenuProps) {
  const first = BUYER_GROUPS[0]?.items[0]?.href ?? "/applications/crosswalks"
  const [pv, show] = usePreview(first)
  const keys = BUYER_GROUPS.flatMap((g) => g.items.map((a) => a.href))
  return (
    <>
      <div className="col-span-7">
        <div className="mega-head">
          <span className="label">Who we work with</span>
          <Link href="/galleries" onClick={onNavigate} className="link">
            Every photograph, by application
          </Link>
        </div>
        <div className="mega-ledger">
          {BUYER_GROUPS.map((g) => (
            <div key={g.label}>
              <div>
                <span className="mega-name">{g.label}</span>
              </div>
              <ul className="mega-run">
                {g.items.map((a) => (
                  <li key={a.href}>
                    <Link
                      href={a.href}
                      onClick={onNavigate}
                      onMouseEnter={() => show(a.href)}
                      onFocus={() => show(a.href)}
                      data-active={pv.active === a.href || undefined}
                    >
                      {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-5">
        <MegaPreview keys={keys} previews={previews} active={pv.active} prev={pv.prev} />
      </div>
    </>
  )
}

/** The strip that closes every menu: the free site visit, the two lines, the button. */
function MegaStrip({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mega-strip">
      <div className="container-1280 flex items-center gap-x-8 py-[18px]">
        <p className="min-w-0 flex-1 text-[16px] leading-[1.45] text-ink-body">
          <span className="font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
            Free site visit, written quote.
          </span>{" "}
        </p>
        <dl className="mega-lines">
          <div>
            <dt>Lower Mainland</dt>
            <dd>
              <a href="tel:+16046126209">604-612-6209</a>
            </dd>
          </div>
          <div>
            <dt>Vancouver Island</dt>
            <dd>
              <a href="tel:+12503910270">250-391-0270</a>
            </dd>
          </div>
        </dl>
        <Link href="/contact" onClick={onNavigate} className="btn-primary shrink-0">
          Get a quote
        </Link>
      </div>
    </div>
  )
}

function MegaSheet({
  menu,
  previews,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: {
  menu: MenuKey
  previews: MenuPreviews
  onNavigate: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return (
    <motion.div
      role="region"
      aria-label={menu === "services" ? "What we do" : "Who we work with"}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
      transition={panelTransition}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="mega-panel hidden min-[1024px]:block"
    >
      <div key={menu} className="mega-swap container-1280 grid grid-cols-12 gap-x-12 pt-8 pb-9">
        {menu === "services" ? (
          <ServicesMenu previews={previews} onNavigate={onNavigate} />
        ) : (
          <BuyersMenu previews={previews} onNavigate={onNavigate} />
        )}
      </div>
      <MegaStrip onNavigate={onNavigate} />
      <ColourEdge />
    </motion.div>
  )
}

/* ------------------------------------------------------------------
   The phone's drawer — the same character as the sheet: the services
   with their swatches, the buyers as a ledger, the lines and the button.
   ------------------------------------------------------------------ */

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const pathname = usePathname()
  const bigRow =
    "block border-b border-hairline py-[15px] text-[21px] leading-tight font-bold tracking-[-0.01em] text-ink"
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-[300] flex flex-col bg-white min-[1024px]:hidden"
    >
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-hairline px-6">
        <Wordmark onClick={onClose} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="px-3 py-2 text-[28px] leading-none font-normal text-ink"
        >
          &times;
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-auto px-6 pt-5 pb-8">
        <div className="flex items-baseline justify-between">
          <span className="label">What we do</span>
          <Link href="/services" onClick={onClose} className="link text-[15px]">
            All services
          </Link>
        </div>
        <ul className="mt-2 border-t border-hairline">
          {[...SERVICE_ROWS, ...SERVICE_MORE].map((row) => (
            <li key={row.href}>
              <Link href={row.href} onClick={onClose} className="drawer-row">
                {row.swatch && <Swatch name={row.swatch} size={44} />}
                <span className="min-w-0">
                  <span className="drawer-name">{row.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-9 flex items-baseline justify-between">
          <span className="label">Who we work with</span>
          <Link href="/galleries" onClick={onClose} className="link text-[15px]">
            All photographs
          </Link>
        </div>
        <div className="mt-2 border-t border-hairline">
          {BUYER_GROUPS.map((g) => (
            <div key={g.label} className="border-b border-hairline py-4">
              <span className="drawer-name text-[17px]">{g.label}</span>
              <ul className="mega-run mt-1 text-[16px]">
                {g.items.map((a) => (
                  <li key={a.href}>
                    <Link href={a.href} onClick={onClose}>
                      {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-9">
          {[
            { label: "Projects", href: "/projects" },
            { label: "For specifiers", href: "/specifiers" },
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link key={link.href} href={link.href} onClick={onClose} className={bigRow} style={{ fontFamily: "var(--font-display)" }}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-1 border-t border-hairline px-6 py-4 text-[14px] text-ink-muted">
        <span>
          <a href="tel:+16046126209" className="font-medium text-ink">604-612-6209</a> Lower Mainland
        </span>
        <span>
          <a href="tel:+12503910270" className="font-medium text-ink">250-391-0270</a> Vancouver Island
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
      <ColourEdge />
    </motion.div>
  )
}

/* ------------------------------------------------------------------
   Nav
   ------------------------------------------------------------------ */

export default function Nav({ previews = MENU_PREVIEWS }: { previews?: MenuPreviews }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [onImage, setOnImage] = useState(false)
  const [atFooter, setAtFooter] = useState(false)
  const [deep, setDeep] = useState(false)
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

  // Bar goes opaque past 24px; "deep" once the visitor has really scrolled
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      setDeep(window.scrollY > 320)
    }
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
  // 28 Sept 2026 QA: on a short page (search, the 404) the footer is in view
  // on arrival, and the bar vanished before anyone scrolled. It steps off
  // only once the visitor has scrolled into the page.
  const hidden = atFooter && deep && menu === null && !drawerOpen && !searchOpen

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
          borderBottom: `1px solid ${solid ? HAIRLINE : "rgba(225,228,231,0)"}`,
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
        {menu && (
          <MegaSheet
            key="mega"
            menu={menu}
            previews={previews}
            onNavigate={closeAll}
            onMouseEnter={() => openMenu(menu)}
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
