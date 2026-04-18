import Link from "next/link"
import Image from "next/image"
import Container from "@/components/ui/Container"

export default function Footer() {
  return (
    <footer className="bg-[#111111] pb-8">
      {/* Gradient top border */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #C8601A 20%, #E8895A 50%, #C8601A 80%, transparent 100%)",
        }}
      />
      <Container>
        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pt-16">

          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/logo/S1_Square.png"
                  alt="Square One Paving"
                  fill
                  sizes="40px"
                  className="object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
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
            <p className="text-white/70 text-[15px] mt-5 leading-[1.6] max-w-[280px]">
              BC&#39;s decorative pavement specialists since 2000.
            </p>
            {/* Social icons row */}
            <div className="flex gap-4 mt-6">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-white/50 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="text-white/50 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="text-white/50 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5 pb-2 inline-block border-b-2 border-[#C8601A]">Services</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Asphalt Stamping', href: '/services/stamped-asphalt' },
                { label: 'Decorative Coatings', href: '/services/decorative-coatings' },
                { label: 'Preformed Thermoplastic', href: '/services/preformed-thermoplastic' },
                { label: 'Vapor Blasting', href: '/services/vapor-blasting' },
                { label: 'All Services →', href: '/services' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors hover-underline inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Products */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5 pb-2 inline-block border-b-2 border-[#C8601A]">Products</h4>
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
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors hover-underline inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5 pb-2 inline-block border-b-2 border-[#C8601A]">Contact</h4>
            <address className="not-italic space-y-3 text-white/60 text-sm leading-relaxed">
              <div className="pl-4 border-l-2 border-[#C8601A]">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Metro Vancouver</p>
                <p>505 – 20800 Lougheed Hwy</p>
                <p>Maple Ridge, BC V2X 3P2</p>
              </div>
              <div className="pl-4 border-l-2 border-[#C8601A]">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Vancouver Island</p>
                <p>Ladysmith, BC</p>
              </div>
              <div className="pt-2">
                <a href="mailto:info@squareonepaving.ca" className="text-white hover:text-[#E8895A] transition-colors text-sm font-medium">info@squareonepaving.ca</a>
              </div>
              <div className="text-sm">
                <a href="tel:+16043098212" className="text-white/80 hover:text-white transition-colors">604-309-8212</a>
                <span className="text-white/40 mx-2">/</span>
                <a href="tel:+18776098200" className="text-white/80 hover:text-white transition-colors">1-877-609-8200</a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-white/40 text-xs">
            <span>© {new Date().getFullYear()} Square One Paving Ltd.</span>
            <span className="text-white/20">·</span>
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy</Link>
            <span className="text-white/20">·</span>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <svg viewBox="0 0 20 10" style={{width:28,height:14,display:'inline-block',flexShrink:0}} aria-hidden="true">
              <rect x="0" y="0" width="5" height="10" fill="#D80621"/>
              <rect x="5" y="0" width="10" height="10" fill="#FFFFFF"/>
              <rect x="15" y="0" width="5" height="10" fill="#D80621"/>
              <path d="M10 1.5 L10.6 3.5 L12.5 3.5 L11.1 4.6 L11.6 6.5 L10 5.4 L8.4 6.5 L8.9 4.6 L7.5 3.5 L9.4 3.5 Z" fill="#D80621"/>
            </svg>
            <span>Proudly Canadian · Serving BC since 2000</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
