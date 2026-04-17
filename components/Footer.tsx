import Link from "next/link"
import Image from "next/image"

const serviceLinks = [
  { label: "Stamped Asphalt", href: "/services/stamped-asphalt" },
  { label: "Decorative Coatings", href: "/services/decorative-coatings" },
  { label: "Preformed Thermoplastic", href: "/services/preformed-thermoplastic" },
  { label: "Vapor Blasting", href: "/vapor-blasting" },
  { label: "Driveways", href: "/driveways" },
]

const studioLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export default function Footer() {
  return (
    <footer className="w-full bg-[#1C2026] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-20 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 md:gap-10 mb-16">
          {/* Brand block */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/logo/S1_Square.png"
                  alt="Square One Paving"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-white font-semibold text-base tracking-tight leading-none">
                  Square One
                </span>
                <span className="text-white/55 font-medium text-[11px] uppercase tracking-[0.14em] leading-none">
                  Paving
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              BC&apos;s decorative pavement studio. Installed across the Lower
              Mainland and Vancouver Island since 2000.
            </p>
            <div className="w-10 h-[2px] bg-[#C8601A]" />
          </div>

          {/* Services */}
          <div>
            <p className="text-[#C8601A] text-[10px] font-semibold uppercase tracking-[0.22em] mb-5">
              Services
            </p>
            <ul className="space-y-3 text-sm text-white/70">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div>
            <p className="text-[#C8601A] text-[10px] font-semibold uppercase tracking-[0.22em] mb-5">
              Studio
            </p>
            <ul className="space-y-3 text-sm text-white/70">
              {studioLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — single compact block */}
          <div>
            <p className="text-[#C8601A] text-[10px] font-semibold uppercase tracking-[0.22em] mb-5">
              Contact
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="tel:16043098212"
                className="block text-white/80 hover:text-white transition-colors"
              >
                604-309-8212
              </a>
              <a
                href="mailto:info@squareonepaving.ca"
                className="block text-white/80 hover:text-white transition-colors"
              >
                info@squareonepaving.ca
              </a>
            </div>
          </div>
        </div>

        {/* Regional blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 mb-16">
          <div className="bg-[#1C2026] p-8">
            <p className="text-[#C8601A] text-[10px] font-semibold uppercase tracking-[0.22em] mb-4">
              Lower Mainland
            </p>
            <p className="text-white text-lg font-medium leading-tight mb-3">
              Metro Vancouver coverage.
            </p>
            <p className="text-white/55 text-sm leading-relaxed mb-4">
              Vancouver · Burnaby · Coquitlam · Surrey · Langley · Richmond ·
              North Shore · Fraser Valley.
            </p>
            <a
              href="tel:16043098212"
              className="text-white/80 hover:text-white text-sm font-semibold transition-colors"
            >
              604-309-8212
            </a>
          </div>
          <div className="bg-[#1C2026] p-8">
            <p className="text-[#C8601A] text-[10px] font-semibold uppercase tracking-[0.22em] mb-4">
              Vancouver Island
            </p>
            <p className="text-white text-lg font-medium leading-tight mb-3">
              Based in Ladysmith. Island-wide.
            </p>
            <p className="text-white/55 text-sm leading-relaxed mb-4">
              Victoria · Saanich · Langford · Duncan · Nanaimo · Parksville ·
              Courtenay · Comox Valley.
            </p>
            <a
              href="tel:16043098212"
              className="text-white/80 hover:text-white text-sm font-semibold transition-colors"
            >
              604-309-8212
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Square One Paving Ltd. Independent
            BC studio.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <Link
              href="/privacy"
              className="hover:text-white/70 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white/70 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
