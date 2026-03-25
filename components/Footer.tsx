import Link from "next/link"
import S1Logo from "./S1Logo"

export default function Footer() {
  return (
    <footer className="w-full bg-[#2D2D2D] text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        {/* Top section */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo + Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <S1Logo size="md" className="bg-[#F5F3F0]" />
              <span className="font-bold text-white">Square One Paving</span>
            </div>
            <p className="text-sm text-white/70">
              Built for Beauty, Durability, and Performance.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-sm font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
              Services
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  href="/services/stamped-asphalt"
                  className="hover:text-white transition"
                >
                  Stamped Asphalt
                </Link>
              </li>
              <li>
                <Link
                  href="/services/decorative-coatings"
                  className="hover:text-white transition"
                >
                  Decorative Coatings
                </Link>
              </li>
              <li>
                <Link
                  href="/services/preformed-thermoplastic"
                  className="hover:text-white transition"
                >
                  Thermoplastic
                </Link>
              </li>
              <li>
                <Link
                  href="/services/vapor-blasting"
                  className="hover:text-white transition"
                >
                  Vapor Blasting
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-sm font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
              Company
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/projects" className="hover:text-white transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
              Contact
            </p>
            <p className="text-sm text-white/70 mb-2">
              <a
                href="tel:6043098212"
                className="hover:text-white transition"
              >
                604-309-8212
              </a>
            </p>
            <p className="text-sm text-white/70 mb-2">
              <a
                href="mailto:info@squareonepaving.ca"
                className="hover:text-white transition"
              >
                info@squareonepaving.ca
              </a>
            </p>
            <p className="text-sm text-white/70">
              Serving Greater Vancouver, Vancouver Island &amp; BC Interior
            </p>
            <p className="text-xs text-white/40 mt-3">
              Authorized HUB Surface Systems Applicator
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Square One Paving. All rights
            reserved. | Authorized HUB Surface Systems Applicator 🇨🇦
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
