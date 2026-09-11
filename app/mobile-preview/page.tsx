import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mobile preview harness",
  robots: { index: false, follow: false },
}

/**
 * Internal review harness — renders key routes in 390x844 iframes so the
 * mobile experience can be audited side by side on a desktop screen.
 * noindex; harmless on the public preview; not linked from anywhere.
 */
const ROUTES = ["/", "/driveways", "/products", "/applications", "/contact", "/blog"]

export default function MobilePreview() {
  return (
    <main style={{ background: "#2A2D31", minHeight: "100vh", padding: "88px 24px 40px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {ROUTES.map((route) => (
          <figure key={route} style={{ margin: 0 }}>
            <figcaption
              style={{
                color: "#9BA1A9",
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 8,
                fontFamily: "var(--font-display)",
              }}
            >
              {route}
            </figcaption>
            <iframe
              src={route}
              title={`Mobile preview of ${route}`}
              style={{ width: 390, height: 780, border: "1px solid #4A4E54", background: "#fff" }}
            />
          </figure>
        ))}
      </div>
    </main>
  )
}
