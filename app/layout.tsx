import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import StructuredData from "@/components/StructuredData"
import MobileStickyCTA from "@/components/MobileStickyCTA"
import MotionBreath from "@/components/MotionBreath"

// Single typeface for the whole system — 200 for display numerals,
// 300 for headlines, 400–700 for UI and body.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL("https://squareonepaving.ca"),
  title: {
    default: "Square One Paving | BC's Decorative Pavement Specialists since 2000",
    template: "%s | Square One Paving",
  },
  description:
    "BC's trusted decorative pavement applicators since 2000. Stamped asphalt, decorative coatings, preformed thermoplastic, and vapour blasting for municipalities, developers, and contractors across BC.",
  keywords: [
    "decorative pavement BC",
    "stamped asphalt Vancouver",
    "decorative coatings BC",
    "preformed thermoplastic BC",
    "vapor blasting Lower Mainland",
    "pavement applicator BC",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://squareonepaving.ca",
    siteName: "Square One Paving",
    title: "Square One Paving | BC's Decorative Pavement Specialists since 2000",
    description:
      "BC's trusted decorative pavement applicators since 2000.",
    images: [
      { url: "/images/og-image.png", width: 1200, height: 600, alt: "Square One Paving" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Square One Paving | BC's Decorative Pavement Specialists since 2000",
    description: "BC's trusted decorative pavement applicators since 2000.",
  },
  alternates: { canonical: "https://squareonepaving.ca" },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <StructuredData />
        <Nav />
        {children}
        <Footer />
        <MobileStickyCTA />
        <MotionBreath />
      </body>
    </html>
  )
}
