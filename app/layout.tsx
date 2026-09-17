import type { Metadata } from "next"
import { Poppins, Inter } from 'next/font/google'
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
//               Also what ?type=poppins puts back for a side-by-side.
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
   from one face to the other. Futura is the default and needs no attribute;
   ?type=poppins sets the alternate and localStorage keeps it. Nothing runs
   on the server. */
const TYPE_BOOT = `(function(){try{var q=new URLSearchParams(location.search).get('type');if(q==='poppins'||q==='futura'){localStorage.setItem('s1-type',q)}var t=q||localStorage.getItem('s1-type');if(t==='poppins'){document.documentElement.setAttribute('data-type','poppins')}}catch(e){}})();`

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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${futura.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TYPE_BOOT }} />
      </head>
      <body className="antialiased">
        <StructuredData />
        <Nav />
        {children}
        <Footer />
        <MobileStickyCTA />
        <MotionBreath />
        <TypeToggle />
      </body>
    </html>
  )
}
