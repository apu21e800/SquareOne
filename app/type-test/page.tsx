import type { Metadata } from "next"
import { Fraunces, Playfair_Display, Jost, Inter } from "next/font/google"
import TypeTestClient from "./TypeTestClient"

/* ROCKSTAR-PASS Part 1a — unlinked type lab. Three complete directions
   rendered as the real hero, a section header, and a product card.
   Nothing on this page sits below weight 400. Vern + team pick on real
   screens; Part 1b applies the winner sitewide. */

const fraunces = Fraunces({ subsets: ["latin"], display: "swap", variable: "--tt-fraunces" })
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--tt-playfair" })
const jost = Jost({ subsets: ["latin"], display: "swap", variable: "--tt-jost" })
const interVar = Inter({ subsets: ["latin"], display: "swap", variable: "--tt-inter" })

export const metadata: Metadata = {
  title: "Type test — three directions",
  robots: { index: false, follow: false },
}

export default function TypeTestPage() {
  return (
    <div className={`${fraunces.variable} ${playfair.variable} ${jost.variable} ${interVar.variable}`}>
      <TypeTestClient />
    </div>
  )
}
