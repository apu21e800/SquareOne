import type { Metadata } from "next"
import { Fraunces, Playfair_Display, Jost, Inter, Source_Serif_4, DM_Serif_Display, Young_Serif, Poppins, Mulish, Nunito_Sans, Montserrat } from "next/font/google"
import TypeTestClient from "./TypeTestClient"

/* ROCKSTAR-PASS Part 1a — unlinked type lab. Three complete directions
   rendered as the real hero, a section header, and a product card.
   Nothing on this page sits below weight 400. Vern + team pick on real
   screens; Part 1b applies the winner sitewide. */

const fraunces = Fraunces({ subsets: ["latin"], display: "swap", variable: "--tt-fraunces", axes: ["SOFT"] })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], display: "swap", variable: "--tt-source-serif" })
const dmSerif = DM_Serif_Display({ subsets: ["latin"], display: "swap", variable: "--tt-dm-serif", weight: "400" })
const youngSerif = Young_Serif({ subsets: ["latin"], display: "swap", variable: "--tt-young-serif", weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--tt-playfair" })
const jost = Jost({ subsets: ["latin"], display: "swap", variable: "--tt-jost" })
const interVar = Inter({ subsets: ["latin"], display: "swap", variable: "--tt-inter" })
const poppins = Poppins({ subsets: ["latin"], display: "swap", variable: "--tt-poppins", weight: ["500", "600", "700"] })
const mulish = Mulish({ subsets: ["latin"], display: "swap", variable: "--tt-mulish" })
const nunitoSans = Nunito_Sans({ subsets: ["latin"], display: "swap", variable: "--tt-nunito" })
const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--tt-montserrat" })

export const metadata: Metadata = {
  title: "Type test — direction C and sans alternates",
  robots: { index: false, follow: false },
}

export default function TypeTestPage() {
  return (
    <div className={`${fraunces.variable} ${playfair.variable} ${jost.variable} ${interVar.variable} ${sourceSerif.variable} ${dmSerif.variable} ${youngSerif.variable} ${poppins.variable} ${mulish.variable} ${nunitoSans.variable} ${montserrat.variable}`}>
      <TypeTestClient />
    </div>
  )
}
