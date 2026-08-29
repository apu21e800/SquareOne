import type { Metadata } from "next"
import { Inter, Fraunces } from 'next/font/google'
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import StructuredData from "@/components/StructuredData"
import MobileStickyCTA from "@/components/MobileStickyCTA"
import MotionBreath from "@/components/MotionBreath"

// Two-face system per the Rockstar Pass (canon §2.5 as amended, Aug 2026):
// Fraunces 600–640 carries display/H1/H2; Inter variable carries body
// (450–500) and every spaced-caps label at 600. Nothing renders below
// weight 400 — the ghost numerals are the one sanctioned exception.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
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
