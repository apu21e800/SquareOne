import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-[#32373C] text-white">
      <div className="max-w-6xl mx-auto py-16 px-6 sm:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Column 1: Square One */}
          <div>
            <Image
              src="/images/square-one-logo.png"
              alt="Square One Paving"
              width={140}
              height={42}
              className="object-contain brightness-0 invert mb-4"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              BC&apos;s trusted decorative pavement applicators since 2000.
            </p>
            <p className="text-xs text-[#D66620] mt-4">
              Authorized HUB Surface Systems Applicator
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href="https://www.linkedin.com/company/square-one-paving"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white text-xs transition"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/squareonepaving"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white text-xs transition"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/squareonepaving"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white text-xs transition"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <p className="text-xs font-semibold text-[#D66620] uppercase tracking-widest mb-5">
              Services
            </p>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="/services/stamped-asphalt" className="hover:text-white transition">
                  Stamped Asphalt
                </Link>
              </li>
              <li>
                <Link href="/services/decorative-coatings" className="hover:text-white transition">
                  Decorative Coatings
                </Link>
              </li>
              <li>
                <Link href="/services/preformed-thermoplastic" className="hover:text-white transition">
                  Preformed Thermoplastic
                </Link>
              </li>
              <li>
                <Link href="/services/vapor-blasting" className="hover:text-white transition">
                  Vapor Blasting
                </Link>
              </li>
              <li>
                <Link href="/applications/private-driveways" className="hover:text-white transition">
                  Driveways
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <p className="text-xs font-semibold text-[#D66620] uppercase tracking-widest mb-5">
              Products
            </p>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="/products/streetprint" className="hover:text-white transition">
                  StreetPrint
                </Link>
              </li>
              <li>
                <Link href="/products/streetbond-sr" className="hover:text-white transition">
                  StreetBond SR
                </Link>
              </li>
              <li>
                <Link href="/products/traffic-patterns" className="hover:text-white transition">
                  TrafficPatterns
                </Link>
              </li>
              <li>
                <Link href="/products/traffic-patterns-xd" className="hover:text-white transition">
                  TrafficPatterns XD
                </Link>
              </li>
              <li>
                <Link href="/products/decomark" className="hover:text-white transition">
                  DecoMark
                </Link>
              </li>
              <li>
                <Link href="/products/duratherm" className="hover:text-white transition">
                  DuraTherm
                </Link>
              </li>
              <li>
                <Link href="/products/durashield" className="hover:text-white transition">
                  DuraShield
                </Link>
              </li>
              <li>
                <Link href="/products/mmax" className="hover:text-white transition">
                  MMAX
                </Link>
              </li>
              <li>
                <Link href="/products/premark" className="hover:text-white transition">
                  PreMark
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <p className="text-xs font-semibold text-[#D66620] uppercase tracking-widest mb-5">
              Contact
            </p>
            <a
              href="tel:6043098212"
              className="block text-white text-base font-bold mb-3 hover:text-white/80 transition"
            >
              604-309-8212
            </a>
            <a
              href="mailto:info@squareonepaving.ca"
              className="block text-sm text-white/70 mb-4 hover:text-white transition"
            >
              info@squareonepaving.ca
            </a>
            <p className="text-sm text-white/70">Ladysmith, BC</p>
            <p className="text-sm text-white/50 mt-1">
              Lower Mainland + Vancouver Island
            </p>
            <p className="text-xs text-[#D66620] mt-5">
              Authorized HUB Surface Systems Applicator
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Square One Paving. All rights reserved.
          </p>
          <p className="text-sm text-white/60 text-center">
            Authorized HUB Surface Systems Applicator 🇨🇦
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
