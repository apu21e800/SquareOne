import Image from "next/image"
import Link from "next/link"
import NoPhoto from "@/components/ui/NoPhoto"
import type { ReactNode } from "react"

/**
 * The one record — a project or a blog post reads the same way. Used by
 * /projects and /blog so the two indexes are one system.
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the photo card — image
 * with a caption over a gradient, a chip, a title, an arrow — was HUB's
 * card in light mode. The same record, set the own-company way:
 *
 *   standard   the photograph, square-cornered, with its caption UNDER it
 *              in the serif (place · system · year, or topic · year); then
 *              the kicker as the small voice, the title (which is the link),
 *              a line or two, and the quiet meta line. No chip, no arrow, no
 *              box, no hover zoom.
 *   lead       the first record of an index as a hairline row: the
 *              photograph left with its caption under it, the text beside
 *              it. No border, no background.
 *
 * On a phone the standard record folds into a list row — thumbnail left,
 * kicker · title · meta right — so thirty projects or fifty posts scan in a
 * few screens instead of a long scroll of full-width photographs. That fold
 * hides the caption under the thumbnail; the meta line carries the place.
 *
 * 30 Sept 2026 QA: the line or two under a title is clamped by the browser
 * (three lines, the ellipsis at the line's end) instead of cut at a
 * character count, so a sentence is never sawn off in the middle; the lead
 * record's title is the h2 of its index.
 */
export interface RecordCardProps {
  href: string
  src?: string
  alt: string
  caption?: string
  kicker?: string
  title: string
  description?: string
  /** The quiet last line; a node when a phone needs a different one (the place, when the caption is folded away). */
  meta?: ReactNode
  lead?: boolean
  priority?: boolean
}

export default function RecordCard({
  href,
  src,
  alt,
  caption,
  kicker,
  title,
  description,
  meta,
  lead = false,
  priority = false,
}: RecordCardProps) {
  if (lead) {
    return (
      <article className="row">
        <Link href={href} className="block" tabIndex={-1} aria-hidden="true">
          <figure className="m-0">
            <span className="relative block aspect-[4/3] w-full overflow-hidden bg-surface-stone">
              {src ? (
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority={priority}
                  sizes="(max-width: 700px) 100vw, 520px"
                  className="object-cover"
                />
              ) : (
                <NoPhoto />
              )}
            </span>
            {caption && <figcaption className="cap">{caption}</figcaption>}
          </figure>
        </Link>

        <div className="min-w-0">
          {kicker && <span className="label">{kicker}</span>}
          <h2 className={`card-title rc-title-lead [text-wrap:balance] ${kicker ? "mt-2" : ""}`}>
            <Link href={href} className="text-ink hover:underline hover:underline-offset-[5px] hover:decoration-1">
              {title}
            </Link>
          </h2>
          {description && (
            <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.6] text-ink-body [text-wrap:pretty] max-[600px]:line-clamp-3 max-[600px]:text-[15px]">
              {description}
            </p>
          )}
          {meta && <p className="mt-3 text-[15px] italic text-ink-muted">{meta}</p>}
        </div>
      </article>
    )
  }

  return (
    <article className="max-[600px]:grid max-[600px]:grid-cols-[124px_1fr] max-[600px]:items-start max-[600px]:gap-x-4">
      <Link href={href} className="block" tabIndex={-1} aria-hidden="true">
        <figure className="m-0">
          <span className="relative block aspect-[4/3] w-full overflow-hidden bg-surface-stone">
            {src ? (
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 600px) 124px, (max-width: 700px) 100vw, (max-width: 1000px) 50vw, 400px"
                className="object-cover"
              />
            ) : (
              <NoPhoto />
            )}
          </span>
          {caption && <figcaption className="cap max-[600px]:hidden">{caption}</figcaption>}
        </figure>
      </Link>

      <div className="min-w-0 mt-4 max-[600px]:mt-0">
        {kicker && <span className="label">{kicker}</span>}

        <h3 className={`rc-title [text-wrap:pretty] ${kicker ? "mt-1" : ""}`}>
          <Link href={href} className="text-ink hover:underline hover:underline-offset-[5px] hover:decoration-1">
            {title}
          </Link>
        </h3>

        {description && (
          <p className="mt-2 line-clamp-3 text-[15px] leading-[1.55] text-ink-body [text-wrap:pretty] max-[600px]:hidden">
            {description}
          </p>
        )}

        {meta && (
          <p className="mt-2 text-[15px] italic text-ink-muted max-[600px]:mt-1 max-[600px]:text-[14px]">{meta}</p>
        )}
      </div>
    </article>
  )
}
