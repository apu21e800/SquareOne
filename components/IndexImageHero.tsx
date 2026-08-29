import Image from "next/image"

/**
 * Full-bleed opening image band for index pages — Rockstar Pass Part 4.
 * The nav runs light over it ([data-nav-on-image], Part 2). Header text
 * sits bottom-left over the rising slate scrim; optional caption
 * bottom-right names the install.
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
      className="relative flex h-[52vh] min-h-[460px] items-end overflow-hidden bg-surface-slate"
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

      <div className="container-1280 relative z-[1] w-full pb-14 max-[700px]:pb-10">
        <div className="eyebrow eyebrow-on-image">{eyebrow}</div>

        <h1 className="display-xl stop mt-5 max-w-[18ch] text-white [text-wrap:balance]">{title}</h1>

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
