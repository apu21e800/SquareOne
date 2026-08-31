import Image from "next/image"

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
  lede,
  caption,
  imagePosition = "center",
  children,
}: {
  src: string
  alt: string
  eyebrow: string
  title: React.ReactNode
  lede?: string
  caption?: string
  imagePosition?: string
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
        <div className="eyebrow eyebrow-on-image">{eyebrow}</div>

        <h1 className="stop mt-5 max-w-[24ch] text-white [text-wrap:balance]">{title}</h1>

        {lede && (
          <p className="mt-5 max-w-[52ch] text-[18px] leading-[1.6] text-white/85 [text-wrap:pretty] max-[700px]:text-[16px]">
            {lede}
          </p>
        )}

        {children}
      </div>

      {caption && <div className="caption caption-right z-[1] max-[700px]:hidden">{caption}</div>}
    </section>
  )
}
