import Link from "next/link"
import Image from "next/image"
import Container from "@/components/ui/Container"

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] pb-10 overflow-hidden">
      <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #F26430 20%, #FF8A5C 50%, #F26430 80%, transparent 100%)" }} />

      <div aria-hidden className="absolute -top-32 -right-32 w-[600px] h-[600px] pointer-events-none opacity-60"
        style={{ background: "radial-gradient(circle, rgba(242,100,48,0.10) 0%, transparent 70%)" }} />

      <Container>
        <div className="pt-20 pb-12 border-b border-white/8">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-end gap-8 lg:gap-16">
            <Link href="/" className="inline-flex items-center group" aria-label="Square One Paving — home">
              <Image
                src="/images/logo/SquareOne-wordmark-white.svg"
                alt="Square One Paving"
                width={280}
                height={44}
                className="h-10 lg:h-12 w-auto opacity-95 group-hover:opacity-100 transition-opacity"
                priority
              />
            </Link>
            <p className="text-white/60 text-[15px] lg:text-base leading-[1.7] font-light max-w-md lg:pl-8">
              BC&apos;s decorative pavement studio. Since 2000 we&apos;ve installed the surfaces that
              define communities &mdash; municipal corridors, premium residences, and everything between.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/40 font-medium">Follow</span>
              <div className="flex gap-2">
                {[
                  { label: "Instagram", path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.9.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.9.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.9-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.9-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.4-.5.2-.9.5-1.3.9-.4.4-.7.8-.9 1.3-.2.4-.4 1-.4 2.1-.1 1.2-.1 1.5-.1 4.7s0 3.5.1 4.7c0 1.1.2 1.7.4 2.1.2.5.5.9.9 1.3.4.4.8.7 1.3.9.4.2 1 .4 2.1.4 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.4.5-.2.9-.5 1.3-.9.4-.4.7-.8.9-1.3.2-.4.4-1 .4-2.1.1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.4-2.1-.2-.5-.5-.9-.9-1.3-.4-.4-.8-.7-1.3-.9-.4-.2-1-.4-2.1-.4-1.2-.1-1.5-.1-4.7-.1zM12 7c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm0 1.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2 3.2-1.4 3.2-3.2-1.4-3.2-3.2-3.2zm5.2-3.1c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2z" },
                  { label: "Facebook", path: "M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12z" },
                  { label: "LinkedIn", path: "M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-.5 15.5v-5.3c0-1.7-1.3-3-3-3-.8 0-1.7.5-2 1.2V11h-3v7.5h3v-4.4c0-.7.6-1.3 1.3-1.3.7 0 1.2.5 1.2 1.3v4.4h2.5zM6.9 9.2c.9 0 1.7-.8 1.7-1.7 0-.9-.8-1.7-1.7-1.7-.9 0-1.7.8-1.7 1.7 0 .9.8 1.7 1.7 1.7zm1.2 9.3V11H5.7v7.5h2.4z" },
                ].map((s) => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className="w-9 h-9 flex items-center justify-center text-white/55 hover:text-white border border-white/15 hover:border-[#F26430] hover:bg-[#F26430]/10 transition-all rounded-none">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 py-12">
          <div>
            <h4 className="text-white text-[10.5px] uppercase tracking-[0.28em] font-semibold mb-6 flex items-center gap-2">
              <span className="block w-1.5 h-1.5 bg-[#F26430] rounded-full" /> Services
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Stamped Asphalt', href: '/services/stamped-asphalt' },
                { label: 'Decorative Coatings', href: '/services/decorative-coatings' },
                { label: 'Preformed Thermoplastic', href: '/services/preformed-thermoplastic' },
                { label: 'Vapor Blasting', href: '/services/vapor-blasting' },
                { label: 'All Services', href: '/services' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-[14px] transition-colors inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[10.5px] uppercase tracking-[0.28em] font-semibold mb-6 flex items-center gap-2">
              <span className="block w-1.5 h-1.5 bg-[#F26430] rounded-full" /> Products
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'StreetPrint', href: '/products/streetprint' },
                { label: 'StreetBond', href: '/products/streetbond' },
                { label: 'TrafficPatterns', href: '/products/trafficpatterns' },
                { label: 'TrafficPatterns XD', href: '/products/trafficpatternsxd' },
                { label: 'DecoMark', href: '/products/decomark' },
                { label: 'All Products', href: '/products' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-[14px] transition-colors inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[10.5px] uppercase tracking-[0.28em] font-semibold mb-6 flex items-center gap-2">
              <span className="block w-1.5 h-1.5 bg-[#F26430] rounded-full" /> Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Projects', href: '/projects' },
                { label: 'Driveways', href: '/driveways' },
                { label: 'About', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-[14px] transition-colors inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[10.5px] uppercase tracking-[0.28em] font-semibold mb-6 flex items-center gap-2">
              <span className="block w-1.5 h-1.5 bg-[#F26430] rounded-full" /> Visit
            </h4>
            <address className="not-italic space-y-5 text-[14px] leading-relaxed">
              <div className="border-l border-[#F26430] pl-4">
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-1.5 font-semibold">Metro Vancouver</p>
                <p className="text-white/75">505 &ndash; 20800 Lougheed Hwy</p>
                <p className="text-white/75">Maple Ridge, BC V2X 3P2</p>
              </div>
              <div className="border-l border-[#F26430] pl-4">
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-1.5 font-semibold">Vancouver Island</p>
                <p className="text-white/75">Ladysmith, BC</p>
              </div>
              <div className="pt-2 space-y-1.5">
                <a href="mailto:info@squareonepaving.ca" className="block text-white hover:text-[#FF8A5C] transition-colors text-[14px] font-medium">
                  info@squareonepaving.ca
                </a>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px]">
                  <a href="tel:+16043098212" className="text-white/70 hover:text-white transition-colors">604-309-8212</a>
                  <span className="text-white/25">/</span>
                  <a href="tel:+18776098200" className="text-white/70 hover:text-white transition-colors">1-877-609-8200</a>
                </div>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-white/40 text-[12px]">
            <span>&copy; {new Date().getFullYear()} Square One Paving Ltd.</span>
            <span className="text-white/20">&middot;</span>
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy</Link>
            <span className="text-white/20">&middot;</span>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
          </div>
          <div className="flex items-center gap-2.5 text-white/45 text-[11px] tracking-[0.04em]">
            <svg viewBox="0 0 20 10" style={{ width: 28, height: 14, display: 'inline-block', flexShrink: 0 }} aria-hidden="true">
              <rect x="0" y="0" width="5" height="10" fill="#D80621" />
              <rect x="5" y="0" width="10" height="10" fill="#FFFFFF" />
              <rect x="15" y="0" width="5" height="10" fill="#D80621" />
              <path d="M10 1.5 L10.6 3.5 L12.5 3.5 L11.1 4.6 L11.6 6.5 L10 5.4 L8.4 6.5 L8.9 4.6 L7.5 3.5 L9.4 3.5 Z" fill="#D80621" />
            </svg>
            <span className="uppercase">Proudly Canadian &middot; Serving BC since 2000</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
