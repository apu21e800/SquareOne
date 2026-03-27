"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

const services = [
  {
    name: "Stamped Asphalt",
    href: "/services/stamped-asphalt",
    desc: "Custom patterns for crosswalks & driveways",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="6" height="6" rx="1" />
        <rect x="12" y="2" width="6" height="6" rx="1" />
        <rect x="2" y="12" width="6" height="6" rx="1" />
        <rect x="12" y="12" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    name: "Decorative Coatings",
    href: "/services/decorative-coatings",
    desc: "Colour & anti-skid for bike lanes & transit",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17c1-1 2-2 3-2h2l7-7a1.41 1.41 0 0 0-2-2L6 13v2c0 1-1 2-3 2z" />
        <path d="M14 5l1-1 1 1-1 1-1-1z" />
      </svg>
    ),
  },
  {
    name: "Preformed Thermoplastic",
    href: "/services/preformed-thermoplastic",
    desc: "Precision markings, fast deployment",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10h16" />
        <path d="M2 6h16" />
        <path d="M2 14h16" />
        <path d="M14 4l3 6-3 6" />
      </svg>
    ),
  },
  {
    name: "Vapor Blasting",
    href: "/services/vapor-blasting",
    desc: "Mobile surface prep & marking removal",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3c0 0-5 4-5 8a5 5 0 0 0 10 0c0-4-5-8-5-8z" />
        <path d="M7 14c0 1.66 1.34 2 3 2" />
      </svg>
    ),
  },
]

export default function Nav() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/96 backdrop-blur-md border-b border-[#E8E4DE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/square-one-logo.png"
                alt="Square One Paving"
                width={160}
                height={48}
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-7">
              {/* Services with mega menu */}
              <div
                className="relative"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
              >
                <button className="flex items-center gap-1 text-[#333333] font-medium hover:text-[#D66620] transition-colors text-sm">
                  Services
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Mega menu panel */}
                <div
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenu}
                  className={`absolute left-0 mt-0 w-[640px] bg-white rounded-xl shadow-2xl border border-[#E8E4DE] overflow-hidden z-50 transition-all duration-200 ease-out ${
                    servicesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="flex">
                    {/* Left column: service cards */}
                    <div className="flex-1 p-4 grid grid-cols-1 gap-1">
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          onClick={() => setServicesOpen(false)}
                          className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-[#F5F3F0] transition-colors group"
                        >
                          <span className="mt-0.5 text-[#D66620] flex-shrink-0">
                            {service.icon}
                          </span>
                          <div>
                            <div className="text-sm font-semibold text-[#333333] group-hover:text-[#D66620] transition-colors">
                              {service.name}
                            </div>
                            <div className="text-xs text-[#8B8680] mt-0.5">
                              {service.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Right column: featured image */}
                    <div className="w-48 flex-shrink-0 flex flex-col">
                      <div className="flex-1 relative overflow-hidden">
                        <Image
                          src="/images/products/streetprint/streetprint-1.jpg"
                          alt="StreetPrint decorative asphalt"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3 border-t border-[#E8E4DE] bg-[#F5F3F0]">
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          className="text-xs font-semibold text-[#D66620] hover:text-[#C05A18] transition-colors"
                        >
                          View All Services →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/projects"
                className="text-[#333333] font-medium hover:text-[#D66620] transition-colors text-sm"
              >
                Projects
              </Link>

              <Link
                href="/about"
                className="text-[#333333] font-medium hover:text-[#D66620] transition-colors text-sm"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-[#333333] font-medium hover:text-[#D66620] transition-colors text-sm"
              >
                Contact
              </Link>

              <Link
                href="/contact"
                className="bg-[#D66620] hover:bg-[#C05A18] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-[#333333] p-1"
              aria-label="Open menu"
              aria-controls="mobile-menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen slide-out */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col" id="mobile-menu">
          {/* Header row */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DE]">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image
                src="/images/square-one-logo.png"
                alt="Square One Paving"
                width={140}
                height={42}
                className="object-contain"
              />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-[#333333] p-1"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
            {/* Services accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between w-full py-4 text-lg font-semibold text-[#333333] border-b border-[#E8E4DE]"
                aria-expanded={mobileServicesOpen}
              >
                Services
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 text-[#8B8680] ${mobileServicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="mt-1 mb-2 space-y-0">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 pl-4 py-3 text-[#8B8680] hover:text-[#D66620] transition-colors"
                    >
                      <span className="text-[#D66620]">{service.icon}</span>
                      <span className="text-sm font-medium">{service.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={() => setMobileOpen(false)}
                    className="block pl-4 py-3 text-sm font-semibold text-[#D66620] hover:text-[#C05A18] transition-colors"
                  >
                    View All Services →
                  </Link>
                </div>
              )}
            </div>

            {[
              { href: "/projects", label: "Projects" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-4 text-lg font-semibold text-[#333333] hover:text-[#D66620] transition-colors border-b border-[#E8E4DE]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Full-width CTA */}
          <div className="px-6 py-6 border-t border-[#E8E4DE]">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full bg-[#D66620] hover:bg-[#C05A18] text-white text-center px-6 py-4 rounded-lg font-semibold text-base transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
