import type { Metadata } from "next"
import { Jost, Inter, Poppins, Mulish, Nunito_Sans, Montserrat } from "next/font/google"
import TypeTestClient from "./TypeTestClient"

/* Unlinked type lab. Six sans directions rendered as the real hero, a
   section header and a product card, with a body toggle (Inter / Poppins)
   and a case toggle (spaced caps / title case). Serif directions retired
   4 Sept 2026 at Vern's call; Jost stays the live default until the client
   picks. Nothing on this page sits below weight 400. */

const jost = Jost({ subsets: ["latin"], display: "swap", variable: "--tt-jost" })
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--tt-inter" })
const poppins = Poppins({ subsets: ["latin"], display: "swap", variable: "--tt-poppins", weight: ["400", "500", "600", "700"] })
const mulish = Mulish({ subsets: ["latin"], display: "swap", variable: "--tt-mulish" })
const nunitoSans = Nunito_Sans({ subsets: ["latin"], display: "swap", variable: "--tt-nunito" })
const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--tt-montserrat" })

export const metadata: Metadata = {
  title: "Type options — sans directions",
  robots: { index: false, follow: false },
}

export default function TypeTestPage() {
  return (
    <div className={`${jost.variable} ${inter.variable} ${poppins.variable} ${mulish.variable} ${nunitoSans.variable} ${montserrat.variable}`}>
      <TypeTestClient />
    </div>
  )
}
