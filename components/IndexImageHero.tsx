import Image from "next/image"
import { fitVars } from "@/lib/type"

/**
 * Full-bleed opening image band for index pages — Rockstar Pass Part 4,
 * retuned for direction C (First-Draft fix round): caps titles run at the
 * h1 scale (display-xl is the homepage hero's alone), the band is taller
 * so a two-line caps title never climbs into the bar, and a top scrim
 * keeps the light nav readable over any sky.
 */
export default function IndexImageHero({
  src,
  alt,
  eyebrow,
  title,
  /** The title as plain text, when the caller has it — turns on optical
      sizing so a long word or a long line never outruns the measure. */
  fit,
  lede,
  caption,
  imagePosition = "center",
  align = "left",
  children,
}: {
  src: string
  alt: string
  eyebrow: string
  title: React.ReactNode
  fit?: string
  lede?: string
  caption?: string
  imagePosition?: string
  /** Put the type block on the right when the photograph's subject sits
      left of centre, so the words never cover it. The caption swaps to the
      left corner to stay clear of the block. */
  align?: "left" | "right"
  children?: React.ReactNode
}) {
  return (
    <section
      data-nav-on-image
      className="relative flex h-[58vh] min-h-[560px] items-end overflow-hidden bg-surface-slate"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <div aria-hidden="true" className="scrim-rise" />
      <div aria-hidden="true" className="scrim-top" />

      <div
        className="container-1280 relative z-[1] w-full pb-14 max-[700px]:pb-10"
        style={{ paddingTop: "calc(var(--bar-h) + 2rem)" }}
      >
        <div className={align === "right" ? "ml-auto max-w-[44rem] min-[901px]:pl-8" : undefined}>
          <div className="eyebrow eyebrow-on-image">{eyebrow}</div>

          <div className="fit-host mt-5 max-w-[48rem]">
            <h1
              className="display-fit stop text-white [text-wrap:balance]"
              style={fitVars(fit ?? (typeof title === "string" ? title : ""), { max: "3.5rem" })}
            >
              {title}
            </h1>
          </div>

          {lede && (
            <p className="mt-5 max-w-[52ch] text-[18px] leading-[1.6] text-white/85 [text-wrap:pretty] max-[700px]:text-[16px]">
              {lede}
            </p>
          )}

          {children}
        </div>
      </div>

      {caption && (
        <div className={`caption z-[1] max-[700px]:hidden ${align === "right" ? "" : "caption-right"}`}>
          {caption}
        </div>
      )}
    </section>
  )
}
