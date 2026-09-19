import type { Metadata } from "next"
import { Poppins, Inter, Source_Serif_4 } from 'next/font/google'
import localFont from 'next/font/local'
import "./globals.css"
import "./mobile.css"
import "./refine.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import StructuredData from "@/components/StructuredData"
import MobileStickyCTA from "@/components/MobileStickyCTA"
import MotionBreath from "@/components/MotionBreath"
import TypeToggle from "@/components/TypeToggle"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"
import { TYPEFACE_IDS, LIVE_TYPEFACE } from "@/lib/typefaces"

// TYPE (canon §2.5 as amended 17 Sept 2026 — Vern: "this does not look
// like futura, Futura has sharp edges"). He was looking at Poppins; the
// toggle in his screenshots had Poppins selected. The licensed faces he
// supplied on 16 Sept are now the site rather than an option:
//
//   Futura LT   display — headings, eyebrows, labels, buttons, numerals.
//               The same face as the wordmark, so the page and the logo
//               finally agree. Book at 400, Bold at 700; the CSS never
//               asks for a weight between them.
//   Inter       running text. Futura's small x-height and tight
//               apertures cost reading speed at 16px; Inter does not.
//   Poppins     fallback only, and a working one — see COVERAGE below.
//               Also one of the alternates in the type switch.
//
// The switch itself (components/TypeToggle, lib/typefaces.ts) offers four
// display faces on the real pages so the client chooses from their own site
// rather than from a specimen. Only Futura is preloaded — the alternates
// load on demand, when someone actually flips to them, so the shipping site
// pays nothing for the comparison. Adding a face: a loader here, an entry in
// lib/typefaces.ts, a tracking block in app/refine.css.
//
// COVERAGE — Futura LT is a 235-glyph cut. It has every mark this site
// sets in display type (em dash, middle dot, ellipsis, ®, ™, the accented
// Latin in project titles) but it does NOT have U+2192 → or the
// Halkomelem orthography that appears in real project and blog headings:
// c-with-comma-above, schwa, barred-l, k-with-line-below. Those names are
// not decorative and must not render as tofu or in a face that fights the
// heading around them, so Poppins — already in the bundle, geometric, and
// the site's own second face — sits directly behind Futura in the stack
// and the browser falls through per character. Check coverage before
// swapping this font again.
const futura = localFont({
  src: [
    { path: './fonts/FuturaLT-Book.woff2', weight: '400', style: 'normal' },
    { path: './fonts/FuturaLT-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-futura',
  display: 'swap',
  preload: true,
  fallback: ['Poppins', 'Century Gothic', 'system-ui', 'sans-serif'],
})

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

// The one alternate that brings its own font: Source Serif 4 carries the
// reading text in the "Futura + serif" setting (lib/typefaces.ts). Not
// preloaded — nothing requests it unless html[data-type="futura-serif"] is
// set, which production never does.
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
  preload: false,
})

// Fallback and alternate only, so it is not preloaded. The static cuts the
// site can still reach are listed; nothing renders below 400.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: false,
})

/* Applies the saved type choice before first paint, so a page never flashes
   from one setting to another. The live setting needs no attribute; any
   other id from lib/typefaces.ts sets html[data-type] and localStorage keeps
   it. ?type=<id> overrides and persists. Unknown values are ignored rather
   than written to the DOM. Nothing runs on the server.

   PRODUCTION NEVER RUNS IT. The switch is for the preview deployments the
   client reviews on (Vern, 19 Sept 2026: "a branch that only us and the
   client can see"); the live site ships one setting and cannot be left on
   an alternate by a shared link. */
const TYPE_SWITCH_ENABLED = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
const TYPE_IDS = JSON.stringify(TYPEFACE_IDS)
const TYPE_BOOT = `(function(){try{var ids=${TYPE_IDS},live='${LIVE_TYPEFACE}';var q=new URLSearchParams(location.search).get('type');if(q&&ids.indexOf(q)>-1){localStorage.setItem('s1-type',q)}var t=q||localStorage.getItem('s1-type');if(t&&t!==live&&ids.indexOf(t)>-1){document.documentElement.setAttribute('data-type',t)}}catch(e){}})();`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Square One Paving | BC's Decorative Pavement Specialists since 2000",
    template: "%s | Square One Paving",
  },
  description:
    clampDescription("BC's trusted decorative pavement applicators since 2000. Stamped asphalt, decorative coatings, preformed thermoplastic, and vapour blasting for municipalities, developers, and contractors across BC."),
  keywords: [
    "decorative pavement BC",
    "stamped asphalt Vancouver",
    "decorative coatings BC",
    "preformed thermoplastic BC",
    "vapor blasting Lower Mainland",
    "pavement applicator BC",
  ],
  // No title, description or url here: Next fills og/twitter title and
  // description from each page's own metadata, so a shared link previews as
  // the page, not as the homepage.
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Square One Paving",
    images: [
      { url: "/images/og-image.png", width: 1200, height: 600, alt: "Square One Paving" },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  // Search Console / Bing ownership tokens, if the client verifies by meta
  // tag rather than by a DNS TXT record: paste the token into Vercel as
  // GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION and redeploy. Absent
  // by default, so nothing renders until one is set.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${futura.variable} ${inter.variable} ${sourceSerif.variable}`}>
      <head>
        {TYPE_SWITCH_ENABLED && <script dangerouslySetInnerHTML={{ __html: TYPE_BOOT }} />}
      </head>
      <body className="antialiased">
        <StructuredData />
        <Nav />
        {children}
        <Footer />
        <MobileStickyCTA />
        <MotionBreath />
        {TYPE_SWITCH_ENABLED && <TypeToggle />}
      </body>
    </html>
  )
}
