import Image from "next/image"
import { handleFrom, type SiteSettings, type SocialTile } from "@/lib/cms"

/**
 * Follow the work — the home page's social strip (hubss.com parity; Vern,
 * 4 Sept 2026: "an instagram section on the homepage… even include tiktok").
 * Six square tiles, newest first, each linking to the post it came from; the
 * marketing team adds them in the Studio (Social grid). Until they do, the
 * strip shows six Square One installs that link to the Instagram profile —
 * no invented posts. The TikTok button appears the moment Site settings
 * carries the account link.
 */

const ICON: Record<SocialTile["platform"], string> = {
  Instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.81.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.81-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.81-.25-2.23-.42-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.17-.42-.37-1.06-.42-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.81.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.39A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  TikTok:
    "M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  Facebook:
    "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.81 8.44-4.94 8.44-9.94z",
  LinkedIn:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z",
  YouTube:
    "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.4-1.9.5-3.8.5-5.8a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z",
}

function Glyph({ platform, size = 14 }: { platform: SocialTile["platform"]; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d={ICON[platform]} />
    </svg>
  )
}

export default function FollowTheWork({ settings, tiles }: { settings: SiteSettings; tiles: SocialTile[] }) {
  if (tiles.length === 0) return null
  const handle = handleFrom(settings.instagram) || "@squareonepaving"
  const live = tiles.some((t) => !t.fallback)

  return (
    <section
      id="follow"
      aria-labelledby="follow-heading"
      className="section relative overflow-hidden border-t border-[color:var(--hairline)] bg-[color:var(--surface)]"
    >
      <span aria-hidden="true" className="ghost-index">06</span>

      <div className="container-1280 relative z-[1]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div data-reveal>
            <div className="eyebrow">On Instagram &middot; {handle}</div>
            <h2 id="follow-heading" className="mt-4 [text-wrap:balance]">
              {settings.socialHeading}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.65] text-[color:var(--ink-body)]">
              {settings.socialLede}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 max-[700px]:w-full">
            <a href={settings.instagram} target="_blank" rel="noopener" className="btn-primary inline-flex items-center gap-[10px]">
              <Glyph platform="Instagram" />
              Instagram
            </a>
            {settings.tiktok && (
              <a href={settings.tiktok} target="_blank" rel="noopener" className="btn-secondary inline-flex items-center gap-[10px]">
                <Glyph platform="TikTok" />
                TikTok
              </a>
            )}
          </div>
        </div>

        <ul
          data-reveal-group
          aria-label={live ? "Latest social posts" : "Square One installs"}
          className="mt-10 grid grid-cols-6 gap-3 max-[1000px]:grid-cols-3 max-[700px]:gap-2"
        >
          {tiles.slice(0, 6).map((tile, i) => (
            <li key={`${tile.url}-${i}`} data-reveal>
              <a
                href={tile.url}
                target="_blank"
                rel="noopener"
                aria-label={tile.fallback ? `${tile.caption} — Square One on Instagram` : `${tile.caption} — view on ${tile.platform}`}
                className="thumb group relative block aspect-square overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]"
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 700px) 33vw, (max-width: 1000px) 33vw, 200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-end bg-[rgba(20,24,29,0.62)] p-3 text-[12px] leading-[1.4] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {tile.caption}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-[2px] bg-[rgba(20,24,29,0.45)] text-white"
                >
                  {tile.isVideo ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M3.5 2l6 4-6 4z" />
                    </svg>
                  ) : (
                    <Glyph platform={tile.platform} size={13} />
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[color:var(--ink-muted)]">
          <span>{live ? "Newest first." : "Photographs from the record. Posts from the marketing team appear here as they go up."}</span>
          <span className="flex flex-wrap items-center gap-x-5">
            {(
              [
                ["Facebook", settings.facebook],
                ["LinkedIn", settings.linkedin],
                ["YouTube", settings.youtube],
              ] as [SocialTile["platform"], string][]
            ).map(([platform, href]) => (
              <a key={platform} href={href} target="_blank" rel="noopener" className="inline-flex items-center gap-[6px] font-semibold text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-deep)]">
                <Glyph platform={platform} size={13} />
                {platform}
              </a>
            ))}
          </span>
        </div>
      </div>
    </section>
  )
}
