import Image from "next/image"
import { fitVars } from "@/lib/type"

/**
 * Full-bleed opening image band for index pages.
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7, §5 step 5): the opener stays
 * — a photograph with the title over it — but the surface changes. The h1
 * is Futura in sentence case with no orange full stop (`stop` is gone from
 * the class list; own.css also retires the glyph), and no eyebrow over it.
 * The caption over the photograph stays: this is an opener, not a row, and
 * the captions-under-the-frame rule is for rows and galleries. `fitVars`
 * keeps a long title inside its measure.
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
  /** Kept for every caller; not drawn since 26 Sept 2026 (see below). */
  eyebrow?: string
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
        fetchPriority="high"
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
        <div className={`hero-in ${align === "right" ? "ml-auto max-w-[44rem] min-[901px]:pl-8" : ""}`}>
          {/* No eyebrow over the photograph (27 Sept 2026): the openers are
              simplified the way the home hero is — the title, one line, the
              caption. A label above a headline over a photo is HUB's shape
              whatever face it is set in. `eyebrow` stays a prop so no caller
              changes, and it still names the page for a screen reader. */}
          {eyebrow && <span className="sr-only">{eyebrow}</span>}

          <div className="fit-host max-w-[48rem]">
            <h1
              className="display-fit text-white [text-wrap:balance]"
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
