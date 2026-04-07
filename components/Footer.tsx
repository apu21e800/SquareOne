import Link from "next/link"
import Image from "next/image"

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
    <footer className="w-full bg-[#32373C] text-white">
      {/* Orange top accent */}
      <div className="h-1 bg-gradient-to-r from-[#D66620] via-[#F0A04B] to-transparent" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        {/* Top grid */}
        <div className="grid md:grid-cols-4 gap-10 mb-14">

          {/* Col 1: Logo + tagline */}
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
                <span className="text-[#D66620] font-bold text-[11px] uppercase tracking-[0.14em] leading-none">Paving</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              BC&apos;s leading decorative pavement installer since 2000. Lower Mainland &amp; Vancouver Island.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/40 border border-white/10 rounded-md px-3 py-2 w-fit">
              <span className="text-[#D66620]">✓</span>
              <span>Authorized HUB Surface Systems Applicator</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <p className="text-[10px] font-bold text-[#D66620] uppercase tracking-[0.2em] mb-4">Services</p>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li>
                <Link href="/services/stamped-asphalt" className="hover:text-white transition-colors">
                  Stamped Asphalt
                </Link>
              </li>
              <li>
                <Link href="/services/decorative-coatings" className="hover:text-white transition-colors">
                  Decorative Coatings
                </Link>
              </li>
              <li>
                <Link href="/services/preformed-thermoplastic" className="hover:text-white transition-colors">
                  Preformed Thermoplastic
                </Link>
              </li>
              <li>
                <Link href="/services/vapor-blasting" className="hover:text-white transition-colors">
                  Vapor Blasting
                </Link>
              </li>
              <li>
                <Link href="/driveways" className="hover:text-white transition-colors">
                  Decorative Driveways
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Products */}
          <div>
            <p className="text-[10px] font-bold text-[#D66620] uppercase tracking-[0.2em] mb-4">Products We Apply</p>
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

          {/* Col 4: Company + Contact */}
          <div>
            <p className="text-[10px] font-bold text-[#D66620] uppercase tracking-[0.2em] mb-4">Company</p>
            <ul className="space-y-2.5 text-sm text-white/65 mb-6">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
            <p className="text-[10px] font-bold text-[#D66620] uppercase tracking-[0.2em] mb-3">Contact</p>
            <div className="space-y-1.5 text-sm text-white/75">
              <a href="tel:18773910270" className="block hover:text-white transition-colors">
                1-877-391-0270 <span className="text-white/40 text-xs">Toll Free</span>
              </a>
              <a href="tel:6046126209" className="block hover:text-white transition-colors">
                604-612-6209 <span className="text-white/40 text-xs">Lower Mainland</span>
              </a>
              <a href="tel:2503910270" className="block hover:text-white transition-colors">
                250-391-0270 <span className="text-white/40 text-xs">Vancouver Island</span>
              </a>
              <a href="mailto:info@squareonepaving.ca" className="block hover:text-white transition-colors">
                info@squareonepaving.ca
              </a>
              <p className="text-white/50 text-xs pt-1">Maple Ridge, BC</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Square One Paving Ltd. All rights reserved.
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
