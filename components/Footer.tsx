import Link from "next/link"
import BrandMark from "@/components/BrandMark"
import FooterClose from "@/components/FooterClose"
import { getSiteSettings } from "@/lib/cms"

/* Site close — rebuilt 4 Sept 2026 at Vern's call ("just looks like a jumble
   of text") as a dark CTA into a four-column footer; rebuilt again 26 Sept
   2026 as the own-company close (docs/OWN-COMPANY-BRIEF.md §3.7): a light
   closing band, then the letterhead. Contact canon only: 604-612-6209
   office, 250-391-0270 Vancouver Island, 1-877-391-0270 toll-free,
   office@squareonepaving.com, 19-11720 Stewart Crescent, Maple Ridge. */

const TIKTOK_PATH =
  "M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"

/** Icon paths by network; the links themselves come from Site settings (CMS) with the record as fallback. */
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

const whatWeDo: FooterLink[] = [
  { label: "Stamped asphalt", href: "/services/stamped-asphalt" },
  { label: "Decorative coatings", href: "/services/decorative-coatings" },
  { label: "Preformed thermoplastic", href: "/services/preformed-thermoplastic" },
  { label: "Vapour blasting", href: "/services/vapor-blasting" },
  { label: "Driveways", href: "/driveways" },
  { label: "StreetPrint patterns", href: "/patterns" },
]

const company: FooterLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "Galleries", href: "/galleries" },
  { label: "Applications", href: "/applications" },
  { label: "Products", href: "/products" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

/** "604-612-6209" → "tel:+16046126209" */
const tel = (display: string) => {
  const digits = display.replace(/\D/g, "")
  return `tel:+${digits.length === 10 ? "1" + digits : digits}`
}

const hairline = "var(--hairline-slate)"

export default async function Footer() {
  const year = new Date().getFullYear()
  const site = await getSiteSettings()
  // 25 Sept 2026, Vern, on the live footer: "drop the phone numbers down a
  // line, same is top text: Office · Maple Ridge / 604-612-6209". Every line
  // is label over number; the office keeps its town, which also says the
  // Island line is a region and not a second office.
  const phones = [
    { label: "Office · Maple Ridge", display: site.phoneOffice, href: tel(site.phoneOffice) },
    { label: "Vancouver Island", display: site.phoneIsland, href: tel(site.phoneIsland) },
    { label: "Toll-free", display: site.phoneTollFree, href: tel(site.phoneTollFree) },
  ]
  const links: Record<string, string | undefined> = {
    Facebook: site.facebook,
    Instagram: site.instagram,
    LinkedIn: site.linkedin,
    YouTube: site.youtube,
  }
  const networks = [
    ...socials.map((n) => ({ ...n, href: links[n.label] ?? n.href })),
    ...(site.tiktok ? [{ label: "TikTok", href: site.tiktok, path: TIKTOK_PATH }] : []),
  ]

  /* 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7, §9.12–13): the closing
     band goes LIGHT — the line, one button and the office number on paper —
     and the footer proper is the site's one dark band, set as a letterhead:
     the mark, the address and the lines as one text block, then one row of
     links, then the legal line. HUB closes on a dark CTA into a four-column
     footer; this does neither. FooterClose keeps the /contact rule. */
  return (
    <div>
      {/* ── The close — light, for every page but /contact ──────── */}
      <FooterClose>
        <section className="sec bg-surface-warm py-[5.5rem] max-[700px]:py-14">
          <div className="container-1280">
            <div className="sec-grid">
              <div className="sec-label">
                <span className="label">Start a project</span>
              </div>
              <div className="sec-body">
                <h2 className="max-w-[20ch] [text-wrap:balance]">Send a few photos and a site address</h2>
                <p className="mt-5 max-w-[52ch] text-ink-body [text-wrap:pretty]">
                  Drawings help if you have them. We walk the site before we quote it,
                  Lower Mainland and Vancouver Island, free.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <Link href="/contact" className="btn-primary">
                    Get a quote
                  </Link>
                  <span className="text-[16px] text-ink-muted">
                    or call{" "}
                    <a href={tel(site.phoneOffice)} className="link">
                      {site.phoneOffice}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FooterClose>

      {/* ── The letterhead ──────── */}
      <footer className="bg-[color:var(--surface-slate)] text-[color:var(--ink-on-slate-body)]">
        <div className="container-1280 pt-16 pb-8 max-[700px]:pt-12">
          <div className="grid grid-cols-12 gap-x-10 gap-y-12 max-[900px]:grid-cols-1">
            {/* The mark and the line */}
            <div className="col-span-5 max-[900px]:col-span-1">
              <Link href="/" className="inline-flex items-center" aria-label="Square One Paving, home">
                <BrandMark tone="light" size="footer" />
              </Link>
              <p className="mt-7 max-w-[38ch] text-[16.5px] leading-[1.6] text-[color:var(--ink-on-slate-body)] [text-wrap:pretty]">
                {site.positioning}
              </p>
            </div>

            {/* The address and the lines, as one block — the way a letterhead sets them */}
            <address className="col-span-4 not-italic max-[900px]:col-span-1">
              <span className="label-on-slate">Square One Paving</span>
              <p className="mt-3 text-[16.5px] leading-[1.6] text-white">
                {site.addressLine1}
                <br />
                {site.addressLine2}
              </p>
              <dl className="mt-5 flex flex-col gap-y-[6px]">
                {phones.map((p) => (
                  <div key={p.href} className="flex flex-wrap items-baseline gap-x-3">
                    <dt className="text-[15px] italic text-[color:var(--ink-on-slate-muted)]">{p.label}</dt>
                    <dd>
                      <a href={p.href} className="whitespace-nowrap text-[16.5px] tabular-nums text-white transition-colors hover:text-[color:var(--ink-on-slate-body)]">
                        {p.display}
                      </a>
                    </dd>
                  </div>
                ))}
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <dt className="text-[15px] italic text-[color:var(--ink-on-slate-muted)]">Email</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} className="text-[16.5px] text-white transition-colors hover:text-[color:var(--ink-on-slate-body)] [overflow-wrap:anywhere]">
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </address>

            {/* Where else we are */}
            <div className="col-span-3 max-[900px]:col-span-1">
              <span className="label-on-slate">Elsewhere</span>
              <ul className="mt-3 flex flex-col gap-y-[6px]">
                {networks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="foot-link inline-flex items-center gap-[9px]"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d={s.path} />
                      </svg>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* One row of links */}
          <nav aria-label="Footer" className="mt-14 border-t pt-6 max-[700px]:mt-10" style={{ borderColor: hairline }}>
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              {[...whatWeDo, ...company].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="foot-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Service area — one quiet line. Every place named here is on the
              record in lib/work.ts or lib/projects.ts. Courtenay was not, so
              it came off on 19 Sept 2026. */}
          <p className="mt-8 text-[14.5px] italic leading-[1.7] text-[color:var(--ink-on-slate-muted)]">
            Working across Vancouver, Burnaby, Richmond, Surrey, Langley, Maple Ridge and the Fraser Valley
            &middot; Victoria, Nanaimo, Duncan, Comox and Vancouver Island &middot; Sunshine Coast,
            Sea to Sky and Okanagan projects on record
          </p>

          {/* Legal row */}
          <div
            className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t pt-6"
            style={{ borderColor: hairline }}
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[color:var(--ink-on-slate-legal)]">
              <span>&copy; {year} Square One Paving</span>
              <span>BBB Accredited Business</span>
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 44 22" width="22" height="11" aria-hidden="true" className="flex-shrink-0">
                  {/* 21 Sept 2026 (Vern: "Canadian flag in footer does not
                      show maple leaf properly"). An eleven-point leaf with the
                      sinuses cut deep enough to survive the reduction. */}
                  <rect x="0" y="0" width="11" height="22" fill="#D80621" />
                  <rect x="11" y="0" width="22" height="22" fill="#FFFFFF" />
                  <rect x="33" y="0" width="11" height="22" fill="#D80621" />
                  <path d="M 22.00 2.00 L 23.44 7.04 L 26.32 5.96 L 25.60 9.56 L 30.46 8.48 L 27.76 11.36 L 28.84 13.88 L 24.52 13.16 L 25.60 17.12 L 22.90 15.68 L 23.26 20.00 L 20.74 20.00 L 21.10 15.68 L 18.40 17.12 L 19.48 13.16 L 15.16 13.88 L 16.24 11.36 L 13.54 8.48 L 18.40 9.56 L 17.68 5.96 L 20.56 7.04 L 22.00 2.00 Z" fill="#D80621" />
                </svg>
                Proudly Canadian
              </span>
            </div>

            <div className="flex gap-6 text-[14px]">
              <Link href="/privacy" className="text-[color:var(--ink-on-slate-legal)] transition-colors hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-[color:var(--ink-on-slate-legal)] transition-colors hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
