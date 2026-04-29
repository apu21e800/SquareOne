import type { Metadata } from "next"
import { Poppins, Inter } from 'next/font/google'
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

// Primary brand font — matches the wordmark
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

// Inter retained as fallback for body if needed
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL("https://squareonepaving.ca"),
  title: {
    default: "Square One Paving | BC's Decorative Pavement Specialists since 2000",
    template: "%s | Square One Paving",
  },
  description:
    "BC's trusted decorative pavement applicators since 2000. Stamped asphalt, decorative coatings, preformed thermoplastic, and vapor blasting for municipalities, developers, and contractors across BC.",
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
      { url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Square One Paving" },
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
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="antialiased font-poppins">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
