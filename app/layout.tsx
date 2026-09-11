import type { Metadata } from "next"
import { Poppins, Jost, Inter } from 'next/font/google'
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

// One-face system (canon §2.5 as amended 4 Sept 2026 — Vern's call, the
// alternates stay on /type-test): Poppins carries display at 600 spaced
// caps and body at 400/500. Poppins ships static cuts, so every weight the
// site uses is listed here — nothing renders below 400 except the ghost
// numerals at 300, the one sanctioned exception.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

// The Futura option (11 Sept 2026, Vern: "let's see both"). Jost is the
// open Futura-family cut; Inter is the complementary text face. Neither is
// preloaded and neither renders unless <html data-type="futura"> is set
// (components/TypeToggle, ?type=futura), so the default site pays nothing
// for them. Swap Jost for a licensed Futura here when the client buys one:
// the variable name is all the CSS knows.
const jost = Jost({ subsets: ['latin'], variable: '--font-jost', display: 'swap', preload: false })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', preload: false })

/* Applies the saved type choice before first paint, so a page never flashes
   from one face to the other. ?type=poppins|futura sets it; localStorage
   keeps it. Nothing runs on the server. */
const TYPE_BOOT = `(function(){try{var q=new URLSearchParams(location.search).get('type');if(q==='poppins'||q==='futura'){localStorage.setItem('s1-type',q)}var t=q||localStorage.getItem('s1-type');if(t==='futura'){document.documentElement.setAttribute('data-type','futura')}}catch(e){}})();`

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
    <html lang="en" className={`${poppins.variable} ${jost.variable} ${inter.variable}`}>
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
