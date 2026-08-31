import Image from "next/image"
import Link from "next/link"
import BrandMark from "@/components/BrandMark"

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/squareonepaving/", path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.81 8.44-4.94 8.44-9.94z" },
  { label: "Instagram", href: "https://www.instagram.com/squareonepaving/", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.81.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.81-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.81-.25-2.23-.42-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.17-.42-.37-1.06-.42-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.81.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.39A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/square-one-paving-ltd/", path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCBDvB4vgdahH67BmP6FeccQ", path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.4-1.9.5-3.8.5-5.8a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" },
]

interface FooterLink {
  label: string
  href: string
}

const serviceLinks: FooterLink[] = [
  { label: "Stamped asphalt", href: "/services/stamped-asphalt" },
  { label: "Decorative coatings", href: "/services/decorative-coatings" },
  { label: "Preformed thermoplastic", href: "/services/preformed-thermoplastic" },
  { label: "Vapour blasting", href: "/services/vapor-blasting" },
  { label: "Driveways", href: "/driveways" },
  { label: "All services", href: "/services" },
]

const productLinks: FooterLink[] = [
  { label: "StreetPrint", href: "/products/streetprint" },
  { label: "TrafficPatterns", href: "/products/trafficpatterns" },
  { label: "TrafficPatterns XD", href: "/products/trafficpatterns-xd" },
  { label: "DecoMark", href: "/products/decomark" },
  { label: "StreetBond", href: "/products/streetbond" },
  { label: "All products", href: "/products" },
]

const studioLinks: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
]

const hairline = "var(--hairline-slate)"

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="label label-on-slate">
      {children}
    </div>
  )
}

function LinkColumn({ heading, links }: { heading: string; links: FooterLink[] }) {
  return (
    <div>
      <ColumnHeading>{heading}</ColumnHeading>
      <div className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[15px] text-[#C6CBD1] transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[12px] text-[#8A9098]">{label}</div>
      {children}
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <div className="bg-[color:var(--surface-slate)]">
      {/* ---- Closing CTA — the single dark close for every page ---- */}
      <section className="section text-center">
        <div className="container-1280">
          <p className="eyebrow eyebrow-center text-[#9BA1A9]">Start a project</p>

          <h2 className="mx-auto mt-6 max-w-[20ch] text-white">
            Let&rsquo;s build something worth looking at
          </h2>

          <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-[1.65] text-[#9BA1A9]">
            Send drawings, a site address, or a rough description. We will walk the site before
            we quote it.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link href="/contact" className="btn-on-slate">
              Request a quote
            </Link>
            <span className="text-[15px] text-[#8A9098]">
              or call{" "}
              <a
                href="tel:+16044669902"
                className="font-medium text-[#C6CBD1] transition-colors hover:text-white"
              >
                604-466-9902
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* ---- Footer proper ---- */}
      <footer
        className="border-t px-6 pt-14 min-[701px]:px-10 min-[701px]:pt-20"
        style={{ borderColor: hairline }}
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-2 gap-10 min-[701px]:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 min-[701px]:col-span-1">
              <Link
                href="/"
                className="flex items-center gap-3"
                aria-label="Square One Paving — home"
              >
                <BrandMark tone="light" size="footer" />
              </Link>

              <p className="mt-[18px] max-w-[30ch] text-[14px] leading-[1.6] text-[#8A9098]">
                BC&rsquo;s decorative pavement studio since 2000. Based in Maple Ridge, serving
                the Lower Mainland and Vancouver Island.
              </p>

              <div className="-ml-[11px] mt-5 flex items-center gap-0.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center text-[#8A9098] transition-colors hover:text-white"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <LinkColumn heading="Services" links={serviceLinks} />
            <LinkColumn heading="Products" links={productLinks} />
            <LinkColumn heading="Studio" links={studioLinks} />

            {/* Contact */}
            <div>
              <ColumnHeading>Contact</ColumnHeading>
              <div className="mt-5 flex flex-col gap-[14px]">
                <ContactRow label="Office">
                  <address className="mt-[3px] text-[15px] not-italic leading-[1.5] text-[#C6CBD1]">
                    505&ndash;20800 Lougheed Highway
                    <br />
                    Maple Ridge, BC V2X 3P2
                  </address>
                </ContactRow>

                <ContactRow label="Lower Mainland">
                  <a
                    href="tel:+16044669902"
                    className="mt-[3px] block text-[15px] text-[#C6CBD1] transition-colors hover:text-white"
                  >
                    604-466-9902
                  </a>
                </ContactRow>

                <ContactRow label="Vancouver Island">
                  <a
                    href="tel:+12503910270"
                    className="mt-[3px] block text-[15px] text-[#C6CBD1] transition-colors hover:text-white"
                  >
                    250-391-0270
                  </a>
                </ContactRow>

                <ContactRow label="Toll-free">
                  <a
                    href="tel:+18773910270"
                    className="mt-[3px] block text-[15px] text-[#C6CBD1] transition-colors hover:text-white"
                  >
                    1-877-391-0270
                  </a>
                </ContactRow>

                <ContactRow label="Email">
                  <a
                    href="mailto:office@squareonepaving.com"
                    className="mt-[3px] block text-[15px] text-[#C6CBD1] transition-colors hover:text-white [overflow-wrap:anywhere]"
                  >
                    office@squareonepaving.com
                  </a>
                </ContactRow>
              </div>
            </div>
          </div>

          <p className="mt-14 text-[13px] leading-[1.8] text-[#7E848C] min-[701px]:mt-[72px]">
            Lower Mainland &mdash; Vancouver, Burnaby, Richmond, Surrey, Langley, Maple Ridge
            &middot; Vancouver Island &mdash; Victoria, Nanaimo, Courtenay
          </p>

          <div
            className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t py-6"
            style={{ borderColor: hairline }}
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[#7E848C]">
              <span>&copy; {year} Square One Paving</span>
              <span>BBB Accredited Business</span>
              <span className="flex items-center gap-2">
                <svg
                  viewBox="0 0 32 16"
                  width="18"
                  height="9"
                  aria-hidden="true"
                  className="flex-shrink-0"
                >
                  <rect x="0" y="0" width="8" height="16" fill="#D80621" />
                  <rect x="8" y="0" width="16" height="16" fill="#FFFFFF" />
                  <rect x="24" y="0" width="8" height="16" fill="#D80621" />
                  <path
                    d="M16 3.2 L16.55 5.4 L18.25 4.95 L17.55 6.55 L19 7.55 L17.4 8.05 L17.85 9.65 L16.5 8.55 L16 10.7 L15.5 8.55 L14.15 9.65 L14.6 8.05 L13 7.55 L14.45 6.55 L13.75 4.95 L15.45 5.4 Z"
                    fill="#D80621"
                  />
                </svg>
                Proudly Canadian
              </span>
            </div>

            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-[13px] text-[#7E848C] transition-colors hover:text-white"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-[13px] text-[#7E848C] transition-colors hover:text-white"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
