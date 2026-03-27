import type { Metadata } from "next"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://squareonepaving.ca"),
  title: {
    default: "Square One Paving | BC Decorative Pavement Specialists",
    template: "%s | Square One Paving",
  },
  description: "BC's most trusted decorative pavement applicators since 2000. StreetPrint stamped asphalt, StreetBond coatings, thermoplastic markings & vapor blasting — Lower Mainland and Vancouver Island.",
  keywords: [
    "decorative asphalt BC",
    "stamped asphalt Vancouver",
    "StreetPrint installer BC",
    "vapor blasting BC",
    "decorative pavement contractor",
    "HUB Surface Systems applicator",
    "bike lane coatings BC",
    "crosswalk installation Vancouver",
    "thermoplastic road markings BC",
    "decorative coatings contractor",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://squareonepaving.ca",
    siteName: "Square One Paving",
    title: "Square One Paving | BC Decorative Pavement Specialists",
    description: "Stamped asphalt, decorative coatings, thermoplastic markings, and vapor blasting — installed by BC's most trusted crew since 2000.",
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
    title: "Square One Paving | BC Decorative Pavement Specialists",
    description: "Stamped asphalt, decorative coatings, thermoplastic markings, and vapor blasting since 2000.",
  },
  alternates: {
    canonical: "https://squareonepaving.ca",
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
    <html lang="en">
      <body className="antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
