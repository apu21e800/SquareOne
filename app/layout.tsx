import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://squareonepaving.com"),
  title: {
    default: "Square One Paving | BC's Decorative Pavement Studio",
    template: "%s | Square One Paving",
  },
  description:
    "BC's decorative pavement studio since 2000. Stamped asphalt, decorative coatings, preformed thermoplastics, and vapor blasting across the Lower Mainland and Vancouver Island.",
  keywords: [
    "decorative pavement BC",
    "stamped asphalt Vancouver",
    "decorative coatings Victoria",
    "thermoplastic markings BC",
    "vapor blasting Lower Mainland",
    "decorative pavement installer BC",
    "crosswalk installation BC",
    "bike lane coatings Vancouver",
    "surface preparation BC",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://squareonepaving.com",
    siteName: "Square One Paving",
    title: "Square One Paving | BC's Decorative Pavement Studio",
    description:
      "BC's decorative pavement studio since 2000. Stamped asphalt, decorative coatings, preformed thermoplastics, and vapor blasting across the Lower Mainland and Vancouver Island.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Square One Paving",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Square One Paving | BC's Decorative Pavement Studio",
    description:
      "BC's decorative pavement studio since 2000. Stamped asphalt, decorative coatings, preformed thermoplastics, and vapor blasting across the Lower Mainland and Vancouver Island.",
  },
  alternates: {
    canonical: "https://squareonepaving.com",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
