import { OFFICE_GUIDE, labelRuns, type OfficeGuideContent } from "../lib/office-guide"

/**
 * The office's one-page guide (lib/office-guide.ts), set for a phone: one
 * column, each step numbered, its screenshot, what you do, what happens
 * next. This build's guide unless it is handed one (with the add-ons off or
 * on, lib/addons.ts). The same component is the Studio's first item ("Start here",
 * sanity/structure.ts) and the page at /studio/guide, so it carries its own
 * inline styles and plain elements: it renders the same inside the Studio
 * and on the site (whose stylesheet resets list markers; the page clears the
 * site's fixed bar with --bar-h).
 * Relative imports only: the Sanity CLI reads it through sanity.config.ts.
 */

const INK = "#2D3033"
const MUTED = "#5B6168"
const RULE = "#E1E4E7"
const ACCENT = "#B24E2E"

function Line({ text }: { text: string }) {
  return (
    <>
      {labelRuns(text).map((r, i) =>
        r.bold ? (
          <strong key={i} style={{ fontWeight: 700, color: INK }}>
            {r.text}
          </strong>
        ) : (
          <span key={i}>{r.text}</span>
        ),
      )}
    </>
  )
}

export default function OfficeGuide({ compact = false, guide = OFFICE_GUIDE }: { compact?: boolean; guide?: OfficeGuideContent }) {
  const g = guide
  return (
    <article style={{ maxWidth: 680, margin: "0 auto", padding: compact ? "20px 20px 48px" : "calc(var(--bar-h, 72px) + 40px) 16px 72px", color: INK, fontSize: 17, lineHeight: 1.55 }}>
      <h1 style={{ fontSize: compact ? 24 : 32, lineHeight: 1.2, margin: "0 0 12px", fontWeight: 700 }}>{g.title}</h1>
      <p style={{ margin: "0 0 28px", color: MUTED }}>{g.lead}</p>
      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {g.steps.map((s, i) => (
          <li key={s.id} id={s.id} style={{ borderTop: `1px solid ${RULE}`, padding: "28px 0 8px", scrollMarginTop: 96 }}>
            <h2 style={{ display: "flex", alignItems: "baseline", gap: 12, fontSize: compact ? 20 : 24, lineHeight: 1.25, margin: "0 0 6px", fontWeight: 700 }}>
              <span aria-hidden="true" style={{ color: ACCENT, fontVariantNumeric: "tabular-nums" }}>
                {i + 1}
              </span>
              <span>{s.title}</span>
            </h2>
            <p style={{ margin: "0 0 16px", color: MUTED }}>{s.when}</p>
            {s.shot ? (
              <img
                src={s.shot.src}
                alt={s.shot.alt}
                width={s.shot.width}
                height={s.shot.height}
                loading="lazy"
                style={{ display: "block", width: "100%", maxWidth: 360, height: "auto", margin: "0 0 20px", border: `1px solid ${RULE}`, borderRadius: 10 }}
              />
            ) : null}
            <ol style={{ listStyle: "decimal", margin: "0 0 16px", paddingLeft: 22 }}>
              {s.steps.map((t, j) => (
                <li key={j} style={{ margin: "0 0 8px", paddingLeft: 4 }}>
                  <Line text={t} />
                </li>
              ))}
            </ol>
            <p style={{ margin: "0 0 6px", fontWeight: 700 }}>What happens next</p>
            <ul style={{ listStyle: "disc", margin: "0 0 16px", paddingLeft: 22 }}>
              {s.next.map((t, j) => (
                <li key={j} style={{ margin: "0 0 8px", paddingLeft: 4 }}>
                  <Line text={t} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p style={{ borderTop: `1px solid ${RULE}`, paddingTop: 20, margin: "12px 0 0", color: MUTED }}>{g.foot}</p>
    </article>
  )
}
