import Link from "next/link"
import Image from "next/image"
import Container from "@/components/ui/Container"

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/squareonepaving/", path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.81 8.44-4.94 8.44-9.94z" },
  { label: "Instagram", href: "https://www.instagram.com/squareonepaving/", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.81.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.81-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.81-.25-2.23-.42-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.17-.42-.37-1.06-.42-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.81.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.39A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/square-one-paving-ltd/", path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCBDvB4vgdahH67BmP6FeccQ", path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.4-1.9.5-3.8.5-5.8a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" },
]

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
              <Image src="/images/logo/SquareOne-wordmark-white.svg" alt="Square One Paving"
                width={200} height={32} className="h-7 lg:h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity" priority />
            </Link>
            <p className="text-white/60 text-[15px] lg:text-base leading-[1.7] font-normal max-w-md lg:pl-8">
              BC&apos;s decorative pavement studio. Since 2000 we&apos;ve installed the surfaces that
              define communities &mdash; municipal corridors, premium residences, and everything between.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/40 font-semibold">Follow</span>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center text-white/55 hover:text-white border border-white/12 hover:border-[#F26430] hover:bg-[#F26430]/10 transition-all rounded-none">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 py-12">
          <div>
            <h4 className="text-white text-[10.5px] uppercase tracking-[0.28em] font-bold mb-6 flex items-center gap-2">
              <span className="block w-1.5 h-1.5 bg-[#F26430] rounded-full" /> Services
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Stamped Asphalt & Concrete', href: '/services/stamped-asphalt' },
                { label: 'Preformed Thermoplastic', href: '/services/preformed-thermoplastic' },
                { label: 'Decorative Coatings', href: '/services/decorative-coatings' },
                { label: 'Vapor Blasting', href: '/services/vapor-blasting' },
                { label: 'All Services', href: '/services' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-[14px] transition-colors inline-block">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[10.5px] uppercase tracking-[0.28em] font-bold mb-6 flex items-center gap-2">
              <span className="block w-1.5 h-1.5 bg-[#F26430] rounded-full" /> Products
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'StreetPrint', href: '/products/streetprint' },
                { label: 'TrafficPatterns', href: '/products/trafficpatterns' },
                { label: 'TrafficPatterns XD', href: '/products/trafficpatternsxd' },
                { label: 'DecoMark', href: '/products/decomark' },
                { label: 'StreetBond', href: '/products/streetbond' },
                { label: 'All Products', href: '/products' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-[14px] transition-colors inline-block">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[10.5px] uppercase tracking-[0.28em] font-bold mb-6 flex items-center gap-2">
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
                  <Link href={link.href} className="text-white/60 hover:text-white text-[14px] transition-colors inline-block">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[10.5px] uppercase tracking-[0.28em] font-bold mb-6 flex items-center gap-2">
              <span className="block w-1.5 h-1.5 bg-[#F26430] rounded-full" /> Visit
            </h4>
            <address className="not-italic space-y-5 text-[14px] leading-relaxed">
              <div className="border-l border-[#F26430] pl-4">
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-1.5 font-bold">Metro Vancouver</p>
                <p className="text-white/75">505 &ndash; 20800 Lougheed Hwy</p>
                <p className="text-white/75">Maple Ridge, BC V2X 3P2</p>
              </div>
              <div className="border-l border-[#F26430] pl-4">
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-1.5 font-bold">Vancouver Island</p>
                <p className="text-white/75">Vancouver Island</p>
              </div>
              <div className="pt-2 space-y-1.5">
                <a href="mailto:office@squareonepaving.com" className="block text-white hover:text-[#FF8A5C] transition-colors text-[14px] font-medium">office@squareonepaving.com</a>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px]">
                  <a href="tel:+16044669902" className="text-white/70 hover:text-white transition-colors">604-466-9902</a>
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
            <svg viewBox="0 0 32 16" style={{ width: 30, height: 15, display: 'inline-block', flexShrink: 0 }} aria-hidden="true">
              <rect x="0" y="0" width="8" height="16" fill="#D80621" />
              <rect x="8" y="0" width="16" height="16" fill="#FFFFFF" />
              <rect x="24" y="0" width="8" height="16" fill="#D80621" />
              <path d="M16 3.2 L16.55 5.4 L18.25 4.95 L17.55 6.55 L19 7.55 L17.4 8.05 L17.85 9.65 L16.5 8.55 L16 10.7 L15.5 8.55 L14.15 9.65 L14.6 8.05 L13 7.55 L14.45 6.55 L13.75 4.95 L15.45 5.4 Z" fill="#D80621" />
            </svg>
            <span className="uppercase">Proudly Canadian &middot; Serving BC since 2000</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
