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

          {/* Col 1: Logo + tagline + HUB badge */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/square-one-logo.png"
                alt="Square One Paving"
                width={130}
                height={36}
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              BC&apos;s trusted decorative pavement applicator since 2000. Lower Mainland &amp; Vancouver Island.
            </p>
            <div className="flex items-center gap-3">
              <div className="relative w-20 h-6">
                <Image
                  src="/images/hub-logo-white.png"
                  alt="HUB Surface Systems"
                  fill
                  className="object-contain object-left"
                  sizes="80px"
                />
              </div>
              <span className="text-white/40 text-xs">Authorized Applicator</span>
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
                <Link href="/applications/private-driveways" className="hover:text-white transition-colors">
                  Decorative Driveways
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Products */}
          <div>
            <p className="text-[10px] font-bold text-[#D66620] uppercase tracking-[0.2em] mb-4">HUB Products</p>
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
            <div className="space-y-1.5 text-sm text-white/65">
              <a href="tel:6043098212" className="block hover:text-white transition-colors">
                604-309-8212
              </a>
              <a href="mailto:info@squareonepaving.ca" className="block hover:text-white transition-colors">
                info@squareonepaving.ca
              </a>
              <p className="text-white/40 text-xs pt-1">Ladysmith, BC</p>
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
