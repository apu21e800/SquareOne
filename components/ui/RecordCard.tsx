import Image from "next/image"
import Link from "next/link"

/**
 * The one record card — a project or a blog post reads the same way:
 * photograph with a caption (place · system · year, or topic · year),
 * kicker, title, one or two lines, a quiet meta line. `lead` turns the first
 * card of an index into the wide opener (image left, text right). Used by
 * /projects and /blog so the two indexes are one system.
 */
export interface RecordCardProps {
  href: string
  src?: string
  alt: string
  caption?: string
  kicker?: string
  title: string
  description?: string
  meta?: string
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
      <Link
        href={href}
        className="card group grid grid-cols-[7fr_5fr] items-stretch overflow-hidden rounded-[2px] border border-[color:var(--hairline)] bg-[color:var(--surface-warm)] max-[820px]:grid-cols-1"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--surface-stone)]">
          {src && (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 820px) 100vw, 700px"
              className="object-cover"
            />
          )}
          {src && caption && (
            <>
              <div aria-hidden="true" className="scrim scrim-light" />
              <div className="caption">{caption}</div>
            </>
          )}
        </div>

        <div className="flex flex-col justify-center px-12 py-10 max-[820px]:px-7 max-[820px]:py-8">
          {kicker && (
            <div>
              <span className="tag">{kicker}</span>
            </div>
          )}
          <h3 className="mt-5 text-[28px] leading-[1.2] [text-wrap:balance] max-[820px]:text-[22px]">{title}</h3>
          {description && (
            <p className="mt-[14px] max-w-[48ch] text-[16px] leading-[1.65] text-[color:var(--ink-body)] [text-wrap:pretty]">
              {description}
            </p>
          )}
          {meta && <div className="mt-4 text-[13px] text-[color:var(--ink-muted)]">{meta}</div>}
          <span className="arrow-link mt-6">
            Read <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="card group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 400px"
            className="object-cover"
          />
        )}
        {src && caption && (
          <>
            <div aria-hidden="true" className="scrim scrim-light" />
            <div className="caption">{caption}</div>
          </>
        )}
      </div>

      {kicker && (
        <div className="mt-5">
          <span className="tag">{kicker}</span>
        </div>
      )}

      <h3 className="mt-[14px] [text-wrap:pretty]">{title}</h3>

      {description && (
        <p className="mt-[10px] line-clamp-3 text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
          {description}
        </p>
      )}

      {meta && <div className="mt-[10px] text-[13px] text-[color:var(--ink-muted)]">{meta}</div>}
    </Link>
  )
}
