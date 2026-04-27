"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * CTASection — full-height dark closer. The page lands here and stays.
 * Near-full-viewport height, commanding typography, layered atmosphere.
 */
export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        background: "#0A0C10",
        minHeight: "72vh",
      }}
    >
      {/* Radial orange bloom — top center */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 pointer-events-none"
        style={{
          width: "900px",
          height: "900px",
          background:
            "radial-gradient(circle, rgba(200,96,26,0.18) 0%, transparent 62%)",
        }}
      />
      {/* Bottom-left warm bloom */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(200,96,26,0.10) 0%, transparent 60%)",
        }}
      />
      {/* Noise texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />
      {/* Top hairline */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      <div className="relative w-full max-w-[1100px] mx-auto px-6 lg:px-10 py-32 lg:py-48 text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-8 inline-flex items-center gap-3"
          style={{ color: "#E8895A" }}
        >
          <span
            className="inline-block w-8 h-px"
            style={{ background: "#C8601A" }}
          />
          Ready to Start?
          <span
            className="inline-block w-8 h-px"
            style={{ background: "#C8601A" }}
          />
        </motion.p>

        {/* H2 */}
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: easeOut, delay: 0.08 }}
          className="max-w-3xl mx-auto"
          style={{
            fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-0.05em",
            color: "white",
          }}
        >
          Your Surface{" "}
          <span style={{ color: "#C8601A" }}>Is Ready.</span>
          <br />
          <span style={{ color: "white" }}>Let&apos;s Talk.</span>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: easeOut, delay: 0.16 }}
          className="mt-8 max-w-md mx-auto leading-relaxed"
          style={{ fontSize: 15, color: "rgba(255,255,255,0.58)" }}
        >
          Free site visit. Written quote in 48 hours. We&apos;ve been doing this in BC since 2000.
        </motion.p>

        {/* CTA pair */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: easeOut, delay: 0.22 }}
          className="mt-10 flex justify-center flex-wrap gap-3"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-white px-9 py-4 text-[13px] font-bold tracking-[0.02em] uppercase transition-colors rounded-lg"
            style={{
              background: "#C8601A",
              boxShadow: "0 6px 36px rgba(200,96,26,0.44)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#A84F15")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#C8601A")
            }
          >
            Request a Quote
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <a
            href="tel:+16044669902"
            className="inline-flex items-center gap-2 border text-white px-9 py-4 text-[13px] font-bold tracking-[0.02em] uppercase transition-all hover:bg-white/10 rounded-lg"
            style={{ borderColor: "rgba(255,255,255,0.22)" }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 10.5a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Call Us
          </a>
        </motion.div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.30 }}
          className="mt-20 pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-[10px] uppercase tracking-[0.22em]"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          <span>Metro Vancouver</span>
          <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.12)" }}>
            &#183;
          </span>
          <span>Vancouver Island</span>
          <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.12)" }}>
            &#183;
          </span>
          <span>Serving BC since 2000</span>
        </motion.div>
      </div>
    </section>
  )
}
