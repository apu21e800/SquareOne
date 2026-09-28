import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import NoPhoto from "@/components/ui/NoPhoto"

/**
 * A photograph, set the own-company way (26 Sept 2026): the frame is square-
 * cornered and inset in its column; the caption sits UNDER it in the serif,
 * never over it on a gradient. One component for every photograph outside
 * the hero reel and the page openers, so rows, grids and galleries read as
 * one system. No hover zoom, no scrim, no overlay.
 *
 * `href` wraps the frame (and its caption) in a link; the text beside a
 * Row carries its own link, so a row never nests two.
 */
export default function Frame({
  src,
  alt,
  caption,
  aspect = "aspect-[4/3]",
  sizes = "(max-width: 700px) 100vw, 50vw",
  position,
  href,
  priority = false,
  className = "",
  children,
}: {
  src?: string
  alt: string
  caption?: ReactNode
  /** A Tailwind aspect class, e.g. "aspect-[3/2]". */
  aspect?: string
  sizes?: string
  position?: string
  href?: string
  priority?: boolean
  className?: string
  /** Anything to draw over the photograph that is not a caption (the wipe's handle, a drawing). */
  children?: ReactNode
}) {
  const figure = (
    <figure className={`m-0 ${className}`}>
      <span className={`relative block w-full overflow-hidden bg-surface-stone ${aspect}`}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
            style={position ? { objectPosition: position } : undefined}
          />
        ) : (
          <NoPhoto />
        )}
        {children}
      </span>
      {caption && <figcaption className="cap">{caption}</figcaption>}
    </figure>
  )
  if (!href) return figure
  return (
    <Link href={href} className="block">
      {figure}
    </Link>
  )
}
