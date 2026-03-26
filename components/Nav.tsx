"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import S1Logo from "./S1Logo"

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-[#E8E4DE]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <S1Logo size="md" />
            <span className="hidden sm:inline font-bold text-[#2D2D2D]">
              Square One
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown */}
            <div className="group relative">
              <button className="text-[#2D2D2D] font-medium hover:text-[#D66620] transition">
                Services
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <Link
                  href="/services/stamped-asphalt"
                  className="block px-4 py-2 text-[#2D2D2D] hover:bg-[#F5F3F0] hover:text-[#D66620]"
                >
                  Stamped Asphalt
                </Link>
                <Link
                  href="/services/decorative-coatings"
                  className="block px-4 py-2 text-[#2D2D2D] hover:bg-[#F5F3F0] hover:text-[#D66620]"
                >
                  Decorative Coatings
                </Link>
                <Link
                  href="/services/preformed-thermoplastic"
                  className="block px-4 py-2 text-[#2D2D2D] hover:bg-[#F5F3F0] hover:text-[#D66620]"
                >
                  Thermoplastic
                </Link>
                <Link
                  href="/services/vapor-blasting"
                  className="block px-4 py-2 text-[#2D2D2D] hover:bg-[#F5F3F0] hover:text-[#D66620]"
                >
                  Vapor Blasting
                </Link>
              </div>
            </div>

            <Link
              href="/projects"
              className="text-[#2D2D2D] font-medium hover:text-[#D66620] transition"
            >
              Projects
            </Link>

            <Link
              href="/services/vapor-blasting"
              className="text-[#D66620] font-semibold hover:text-[#C05A18] transition"
            >
              Vapor Blasting
            </Link>

            <Link
              href="/about"
              className="text-[#2D2D2D] font-medium hover:text-[#D66620] transition"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-[#2D2D2D] font-medium hover:text-[#D66620] transition"
            >
              Contact
            </Link>
          </div>

          {/* CTA Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden lg:block">
              <button className="bg-[#D66620] hover:bg-[#C05A18] text-white px-6 py-2.5 rounded-lg font-semibold transition">
                Get a Quote
              </button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#2D2D2D]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4 border-t border-[#8B8680]/10 pt-4">
            <Link
              href="/services"
              className="block text-[#2D2D2D] font-medium hover:text-[#D66620]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/services/stamped-asphalt"
              className="block text-[#8B8680] text-sm pl-4 hover:text-[#D66620]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Stamped Asphalt
            </Link>
            <Link
              href="/services/decorative-coatings"
              className="block text-[#8B8680] text-sm pl-4 hover:text-[#D66620]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Decorative Coatings
            </Link>
            <Link
              href="/services/preformed-thermoplastic"
              className="block text-[#8B8680] text-sm pl-4 hover:text-[#D66620]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Thermoplastic
            </Link>
            <Link
              href="/services/vapor-blasting"
              className="block text-[#8B8680] text-sm pl-4 hover:text-[#D66620]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vapor Blasting
            </Link>

            <Link
              href="/projects"
              className="block text-[#2D2D2D] font-medium hover:text-[#D66620]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>

            <Link
              href="/about"
              className="block text-[#2D2D2D] font-medium hover:text-[#D66620]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="block text-[#2D2D2D] font-medium hover:text-[#D66620]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full bg-[#D66620] hover:bg-[#C05A18] text-white px-6 py-3 rounded-lg font-semibold transition">
                Get a Quote
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
