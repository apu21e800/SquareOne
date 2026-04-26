import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#F6F4F0]">
      {/* Top border */}
      <div className="h-px w-full bg-[#E2DDD8]" />

      <div className="max-w-[1500px] mx-auto px-5 sm:px-8">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="inline-flex items-center mb-5">
              <Image
                src="/images/logo/square-one-logo-dark.svg"
                alt="Square One Surface Solutions"
                width={180}
                height={30}
                className="object-contain"
              />
            </Link>
            <p className="text-[#5A5A5A] text-[14px] leading-[1.65] max-w-[240px] mt-2">
              BC&#39;s certified HUB Surface Systems applicator since 2000.
            </p>
            {/* Proudly Canadian */}
            <div className="flex items-center gap-2.5 mt-5">
              <Image
                src="/images/logo/canada-flag.svg"
                alt="Canada"
                width={24}
                height={12}
                className="object-contain flex-shrink-0"
              />
              <span className="text-[#767676] text-[11px] uppercase tracking-[0.12em] font-medium">Proudly Canadian</span>
            </div>
            {/* Social icons */}
            <div className="flex gap-4 mt-5">
              <a href="#" aria-label="Instagram" className="text-[#767676] hover:text-[#C8601A] transition-colors">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-[#767676] hover:text-[#C8601A] transition-colors">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-[#767676] hover:text-[#C8601A] transition-colors">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="text-[#767676] hover:text-[#C8601A] transition-colors">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="X (Twitter)" className="text-[#767676] hover:text-[#C8601A] transition-colors">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h4 className="text-[#111111] font-bold text-[10px] uppercase tracking-[0.18em] mb-5">Services</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Asphalt Stamping', href: '/services/stamped-asphalt' },
                { label: 'Decorative Coatings', href: '/services/decorative-coatings' },
                { label: 'Preformed Thermoplastic', href: '/services/preformed-thermoplastic' },
                { label: 'Vapor Blasting', href: '/vapor-blasting' },
                { label: 'Driveways', href: '/driveways' },
                { label: 'All Services →', href: '/services' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#5A5A5A] hover:text-[#C8601A] text-[13.5px] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Products */}
          <div>
            <h4 className="text-[#111111] font-bold text-[10px] uppercase tracking-[0.18em] mb-5">Products</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'StreetPrint', href: '/products/streetprint' },
                { label: 'StreetBond', href: '/products/streetbond' },
                { label: 'TrafficPatterns', href: '/products/trafficpatterns' },
                { label: 'TrafficPatterns XD', href: '/products/trafficpatternsxd' },
                { label: 'DecoMark', href: '/products/decomark' },
                { label: 'All Products →', href: '/products' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#5A5A5A] hover:text-[#C8601A] text-[13.5px] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="text-[#111111] font-bold text-[10px] uppercase tracking-[0.18em] mb-5">Contact</h4>
            <address className="not-italic space-y-3.5 text-[#5A5A5A] text-[13.5px] leading-relaxed">
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#C8601A] font-semibold mb-1">Metro Vancouver</p>
                <p>505 &#8211; 20800 Lougheed Hwy</p>
                <p>Maple Ridge, BC V2X 3P2</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#C8601A] font-semibold mb-1">Vancouver Island</p>
                <p>Victoria, BC</p>
              </div>
              <div>
                <a href="mailto:jan@squareonepaving.com" className="text-[#C8601A] hover:text-[#A84F15] transition-colors font-medium block">
                  jan@squareonepaving.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-[13.5px]">
                <a href="tel:+16044669902" className="text-[#2C2C2C] hover:text-[#C8601A] transition-colors">604 466 9902</a>
                <span className="text-[#E2DDD8]" aria-hidden="true">|</span>
                <a href="tel:+12502162190" className="text-[#2C2C2C] hover:text-[#C8601A] transition-colors">250 216 2190</a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E2DDD8] py-7 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex flex-wrap items-center gap-2 text-[#767676] text-[11px]">
            <span>&#169; {new Date().getFullYear()} Square One Surface Solutions Ltd.</span>
            <span className="text-[#E2DDD8]" aria-hidden="true">&#183;</span>
            <Link href="/privacy" className="hover:text-[#2C2C2C] transition-colors">Privacy</Link>
            <span className="text-[#E2DDD8]" aria-hidden="true">&#183;</span>
            <Link href="/terms" className="hover:text-[#2C2C2C] transition-colors">Terms</Link>
          </div>
          <div className="flex items-center gap-2 text-[#767676] text-[11px]">
            <span>HUB Certified &#183; BC since 2000</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
