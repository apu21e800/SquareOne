"use client"

import Image from "next/image"
import { useState } from "react"

/* Three directions, one switch. Sizes preview the Part-1b target scale:
   hero clamp(3.5rem,6vw,6rem), H2 clamp(2rem,3.5vw,3rem), body Inter 460.
   Eyebrows and button labels are spaced caps 600 in every direction —
   that part is the luxury signature regardless of the pick. */

type DirectionKey = "A" | "B" | "C"

const DIRECTIONS: Record<
  DirectionKey,
  {
    tab: string
    blurb: string
    family: string
    displayWeight: number
    displaySpacing: string
    displayTransform: "none" | "uppercase"
    displayLineHeight: number
    heroSize: string
    h2Size: string
    cardWeight: number
  }
> = {
  A: {
    tab: "A — Fraunces",
    blurb: "High-contrast crafted serif, 580 weight. Luxury with soul.",
    family: "var(--tt-fraunces)",
    displayWeight: 580,
    displaySpacing: "-0.015em",
    displayTransform: "none",
    displayLineHeight: 1.02,
    heroSize: "clamp(3.5rem, 6vw, 6rem)",
    h2Size: "clamp(2rem, 3.5vw, 3rem)",
    cardWeight: 560,
  },
  B: {
    tab: "B — Playfair Display",
    blurb: "Classic didone, 650 weight. Fashion-house authority.",
    family: "var(--tt-playfair)",
    displayWeight: 650,
    displaySpacing: "-0.008em",
    displayTransform: "none",
    displayLineHeight: 1.04,
    heroSize: "clamp(3.5rem, 6vw, 6rem)",
    h2Size: "clamp(2rem, 3.5vw, 3rem)",
    cardWeight: 600,
  },
  C: {
    tab: "C — Jost spaced caps",
    blurb: "Uppercase 600, 0.08em tracking. The wordmark's Futura DNA, Tom Ford register.",
    family: "var(--tt-jost)",
    displayWeight: 600,
    displaySpacing: "0.08em",
    displayTransform: "uppercase",
    displayLineHeight: 1.14,
    heroSize: "clamp(2.5rem, 4.4vw, 4.25rem)",
    h2Size: "clamp(1.5rem, 2.6vw, 2.25rem)",
    cardWeight: 600,
  },
}

const CAPS: React.CSSProperties = {
  fontFamily: "var(--tt-inter)",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
}

export default function TypeTestClient() {
  const [dir, setDir] = useState<DirectionKey>("A")
  const d = DIRECTIONS[dir]

  const display: React.CSSProperties = {
    fontFamily: d.family,
    fontWeight: d.displayWeight,
    letterSpacing: d.displaySpacing,
    textTransform: d.displayTransform,
    lineHeight: d.displayLineHeight,
  }
  const body: React.CSSProperties = {
    fontFamily: "var(--tt-inter)",
    fontWeight: 460,
    fontSize: "17px",
    lineHeight: 1.65,
  }

  return (
    <main style={{ fontFamily: "var(--tt-inter)", fontWeight: 450 }} className="bg-white text-[#3D4147]">
      {/* ── Switcher ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 border-b border-[#E7E3DC] bg-white/95 backdrop-blur-sm">
        <div className="container-1280 flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
          <span style={{ ...CAPS, fontSize: 11 }} className="text-[#767B82]">
            Type test · unlinked
          </span>
          <div className="flex gap-2">
            {(Object.keys(DIRECTIONS) as DirectionKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setDir(key)}
                style={{ ...CAPS, fontSize: 12 }}
                className={`rounded-[2px] border px-4 py-2 transition-colors duration-150 ${
                  dir === key
                    ? "border-[#14161A] bg-[#14161A] text-white"
                    : "border-[#E7E3DC] text-[#3D4147] hover:border-[#A9A297]"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
          <span style={{ fontWeight: 500 }} className="text-[14px] text-[#767B82]">
            {DIRECTIONS[dir].tab} — {DIRECTIONS[dir].blurb}
          </span>
        </div>
      </div>

      {/* ── Specimen 1: the real hero ────────────────────────── */}
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden bg-[#14181D]">
        <Image
          src="/images/hero/white-rock-pier-crosswalk-trafficpatternsxd.jpg"
          alt="TrafficPatternsXD crosswalk at the White Rock Pier"
          fill
          priority
          sizes="100vw"
          className="object-cover [object-position:center_62%]"
        />
        <div aria-hidden="true" className="scrim-rise" />
        <div className="absolute inset-x-0 bottom-0 z-[1]">
          <div className="container-1280 pb-16">
            <div style={{ ...CAPS, fontSize: 11 }} className="text-white/80">
              <span aria-hidden="true" className="mr-[10px] inline-block h-[6px] w-[6px] rounded-[1px] bg-[#F26430] align-middle" />
              BC&rsquo;s decorative pavement studio &middot; Since 2000
            </div>
            <h1 style={{ ...display, fontSize: d.heroSize }} className="mt-6 max-w-[17ch] text-white">
              Surfaces that define a place
              <span aria-hidden="true" className="ml-4 inline-block h-[8px] w-[8px] rounded-[1px] bg-[#F26430]" />
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-[14px]">
              <span
                style={{ ...CAPS, fontSize: 13 }}
                className="inline-block cursor-pointer rounded-[2px] bg-[#F26430] px-7 py-4 text-white"
              >
                Request a quote
              </span>
              <span
                style={{ ...CAPS, fontSize: 13 }}
                className="inline-block cursor-pointer rounded-[2px] border border-white/45 px-7 py-4 text-white"
              >
                See our work
              </span>
            </div>
          </div>
        </div>
        <div style={{ fontWeight: 600 }} className="caption caption-right z-[1]">
          White Rock · TrafficPatternsXD · 2019
        </div>
      </section>

      {/* ── Specimen 2: section header ───────────────────────── */}
      <section className="border-b border-[#E7E3DC] bg-[#FAF8F5] py-24">
        <div className="container-1280">
          <div style={{ ...CAPS, fontSize: 11 }} className="text-[#767B82]">
            <span aria-hidden="true" className="mr-[10px] inline-block h-[6px] w-[6px] rounded-[1px] bg-[#F26430] align-middle" />
            What we do
          </div>
          <h2 style={{ ...display, fontSize: d.h2Size }} className="mt-5 max-w-[24ch] text-[#14161A]">
            Four services, one standard
          </h2>
          <p style={body} className="mt-6 max-w-[56ch]">
            Stamped asphalt, decorative coatings, preformed thermoplastic and mobile vapour
            blasting — installed by the same crews across the Lower Mainland and Vancouver
            Island since 2000. This paragraph is Inter 460 at 17px: judge the pairing, not
            just the headline.
          </p>
        </div>
      </section>

      {/* ── Specimen 3: product card ─────────────────────────── */}
      <section className="bg-white py-24">
        <div className="container-1280">
          <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
            <article className="card overflow-hidden rounded-[2px] border border-[#E7E3DC] bg-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/products/streetprint/streetprint-victoria-ellis-point-walkway-01.jpg"
                  alt="StreetPrint stamped asphalt walkway at Ellis Point, Victoria"
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className="object-cover"
                />
                <div aria-hidden="true" className="scrim scrim-light" />
                <div style={{ fontWeight: 600 }} className="caption">
                  Victoria · StreetPrint
                </div>
              </div>
              <div className="p-7">
                <h3
                  style={{
                    fontFamily: d.family,
                    fontWeight: d.cardWeight,
                    letterSpacing: d.displayTransform === "uppercase" ? "0.07em" : d.displaySpacing,
                    textTransform: d.displayTransform,
                    fontSize: d.displayTransform === "uppercase" ? 17 : 22,
                    lineHeight: 1.25,
                  }}
                  className="text-[#14161A]"
                >
                  StreetPrint
                </h3>
                <p style={{ ...body, fontSize: 15 }} className="mt-2 text-[#767B82]">
                  Brick, cobble and slate patterns imprinted into the asphalt you already have.
                </p>
                <div style={{ ...CAPS, fontSize: 12 }} className="mt-6 text-[#14161A]">
                  Explore <span aria-hidden="true">&rarr;</span>
                </div>
              </div>
            </article>

            <div className="col-span-2 flex items-center max-[900px]:col-span-1">
              <p style={body} className="max-w-[48ch] text-[#767B82]">
                The card at left renders the direction&rsquo;s product-title treatment against a
                real photograph, the unified grade, and the caption system. Switch A / B / C in
                the bar above — the hero, the section header, and this card all follow. Nothing
                on this page sits below weight 400.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
