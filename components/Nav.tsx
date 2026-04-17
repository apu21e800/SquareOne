"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Driveways", href: "/driveways" },
  { label: "Vapor Blasting", href: "/vapor-blasting" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const closeAll = () => setMobileOpen(false)

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-[#E2DDD8]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" onClick={closeAll} className="flex-shrink-0 flex items-center gap-3 py-2 group">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image
                  src="/images/logo/S1_Square.png"
                  alt="Square One Paving"
                  fill
                  className="object-contain"
                  sizes="36px"
                  priority
                />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-[#111111] text-base tracking-tight leading-none">Square One</span>
                <span className="text-[#5A5A5A] font-medium text-[11px] uppercase tracking-[0.14em] leading-none">Paving</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAll}
                  className="px-4 py-2 text-sm font-medium text-[#2C2C2C] hover:text-[#C8601A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/contact" onClick={closeAll} className="hidden lg:inline-flex">
                <span className="bg-[#1C2026] hover:bg-black text-white px-6 py-2.5 text-sm font-semibold tracking-[0.08em] uppercase rounded-none transition-colors">
                  Get a Quote
                </span>
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-none transition-colors"
                style={{
                  background: "transparent",
                  border: "1px solid #E2DDD8",
                }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-[18px] h-[14px]">
                  <span
                    className="absolute left-0 bg-[#1C2026] transition-all duration-300 ease-in-out origin-center"
                    style={{
                      width: 18,
                      height: 2,
                      top: mobileOpen ? 6 : 0,
                      transform: mobileOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  />
                  <span
                    className="absolute left-0 bg-[#1C2026] transition-all duration-300 ease-in-out"
                    style={{
                      width: mobileOpen ? 0 : 18,
                      height: 2,
                      top: 6,
                      opacity: mobileOpen ? 0 : 1,
                    }}
                  />
                  <span
                    className="absolute left-0 bg-[#1C2026] transition-all duration-300 ease-in-out origin-center"
                    style={{
                      width: 18,
                      height: 2,
                      top: mobileOpen ? 6 : 12,
                      transform: mobileOpen ? "rotate(-45deg)" : "rotate(0deg)",
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="overlay"
            className="lg:hidden fixed inset-0 bg-black/40 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer"
            className="lg:hidden fixed top-0 right-0 bottom-0 z-[70] bg-white flex flex-col"
            style={{
              width: "min(88vw, 380px)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.15)",
              borderLeft: "1px solid #E2DDD8",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0, 0.2, 1] }}
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-[#E2DDD8] flex-shrink-0">
              <Link href="/" onClick={closeAll} className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src="/images/logo/S1_Square.png"
                    alt="Square One Paving"
                    fill
                    className="object-contain"
                    sizes="32px"
                  />
                </div>
                <span className="font-semibold text-[#111111] text-[15px] leading-none">Square One</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-11 h-11 hover:bg-[#F6F4F0] transition-colors"
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="#1C2026" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAll}
                  className="flex items-center min-h-[56px] px-6 text-[17px] font-medium text-[#2C2C2C] border-b border-[#EDEBE7] hover:text-[#C8601A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex-shrink-0 border-t border-[#E2DDD8] bg-white grid grid-cols-[1fr_auto]">
              <Link
                href="/contact"
                onClick={closeAll}
                className="bg-[#C8601A] hover:bg-[#A84F15] text-white text-center py-4 text-sm font-semibold tracking-[0.1em] uppercase transition-colors"
              >
                Get a Quote
              </Link>
              <a
                href="tel:18773910270"
                className="bg-[#1C2026] text-white px-6 flex items-center justify-center text-sm font-medium transition-colors hover:bg-black"
              >
                Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
