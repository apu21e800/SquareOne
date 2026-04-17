import Link from "next/link"
import Image from "next/image"
import { HubBadge } from "@/components/ui/HubBadge"

const services = [
  { name: "Stamped Asphalt", href: "/services/stamped-asphalt" },
  { name: "Decorative Coatings", href: "/services/decorative-coatings" },
  { name: "Preformed Thermoplastic", href: "/services/preformed-thermoplastic" },
  { name: "Vapor Blasting", href: "/vapor-blasting" },
  { name: "Decorative Driveways", href: "/driveways" },
]

const products = [
  { name: "StreetPrint", slug: "streetprint" },
  { name: "StreetBond", slug: "streetbond" },
  { name: "TrafficPatterns", slug: "trafficpatterns" },
  { name: "TrafficPatternsXD", slug: "trafficpatterns-xd" },
  { name: "DecoMark", slug: "decomark" },
  { name: "DuraShield", slug: "durashield" },
  { name: "DuraTherm", slug: "duratherm" },
  { name: "MMAX", slug: "mmax" },
  { name: "PreMark", slug: "premark" },
]

export default function Footer() {
  return (
    <footer className="w-full bg-[#1C2026] text-white">
      {/* Orange top accent — 3px solid, not gradient */}
      <div className="h-[3px] bg-[#C8601A]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Top grid */}
        <div className="grid md:grid-cols-4 gap-10 mb-14">

          {/* Col 1: Logo + tagline + HubBadge */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image
                  src="/images/square-one-logo.png"
                  alt="Square One Paving"
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-white font-black text-base tracking-tight leading-none">Square One</span>
                <span className="text-[#C8601A] font-bold text-[11px] uppercase tracking-[0.14em] leading-none">Paving</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              BC&apos;s trusted decorative pavement studio since 2000. Lower Mainland &amp; Vancouver Island.
            </p>
            <HubBadge variant="dark" />
          </div>

          {/* Col 2: Services */}
          <div>
            <p className="text-[10px] font-bold text-[#C8601A] uppercase tracking-[0.2em] mb-4">Services</p>
            <ul className="space-y-2.5 text-sm text-white/65">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Products */}
          <div>
            <p className="text-[10px] font-bold text-[#C8601A] uppercase tracking-[0.2em] mb-4">Products We Apply</p>
            <ul className="space-y-2.5 text-sm text-white/65">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="hover:text-white transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact — two regional blocks */}
          <div>
            <p className="text-[10px] font-bold text-[#C8601A] uppercase tracking-[0.2em] mb-4">Contact</p>

            {/* Lower Mainland */}
            <div className="mb-6">
              <div className="flex items-start gap-3">
                <div className="w-[3px] self-stretch bg-[#C8601A] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Lower Mainland</p>
                  <div className="space-y-1 text-sm text-white/65">
                    <p>Jan Stewart — Owner</p>
                    <a href="tel:6046126209" className="block hover:text-white transition-colors">604-612-6209</a>
                    <a href="tel:18773910270" className="block hover:text-white transition-colors">
                      1-877-391-0270 <span className="text-white/40 text-xs">Toll-Free</span>
                    </a>
                    <a href="mailto:info@squareonepaving.com" className="block hover:text-white transition-colors">info@squareonepaving.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Vancouver Island */}
            <div>
              <div className="flex items-start gap-3">
                <div className="w-[3px] self-stretch bg-[#C8601A] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Vancouver Island</p>
                  <div className="space-y-1 text-sm text-white/65">
                    <a href="tel:2503910270" className="block hover:text-white transition-colors">250-391-0270</a>
                    <p>Serving Victoria &amp; beyond</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Square One Paving Ltd. All rights reserved. · Authorized HUB Surface Systems Applicator · BC Canada
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
