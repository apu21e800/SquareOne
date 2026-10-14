"use client"

import { VisualEditing, type VisualEditingProps } from "next-sanity/visual-editing/client-component"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

type Refresh = NonNullable<VisualEditingProps["refresh"]>

/**
 * Edit on the page (14 Oct 2026): mounted by app/layout.tsx only while
 * draft mode is on, which is only ever an editor's own browser.
 *
 * VisualEditing draws the outlines that open a field in the Studio. The
 * page re-renders as the editor types: next-sanity 13's own handler ignores
 * the Studio's edit events (it expects next-sanity's Live setup, which this
 * site doesn't use), so `refresh` asks the server for the page again, and
 * draft reads are uncached (found by the independent review, 14 Oct 2026).
 * Outside the Studio's frame (an editor who opened the site in a tab with
 * the preview still on) a small bar says the page shows unpublished
 * changes and turns the preview off. The Studio itself shares this layout,
 * so nothing here runs on /studio.
 */
export default function PreviewTools() {
  const pathname = usePathname() ?? "/"
  const router = useRouter()
  const [framed, setFramed] = useState(true)

  useEffect(() => {
    try {
      setFramed(window.self !== window.top)
    } catch {
      setFramed(true) // a cross-origin parent: framed
    }
  }, [])

  const refresh = useCallback<Refresh>(
    (payload) => {
      if (payload.source !== "manual" && payload.source !== "mutation") return false
      router.refresh()
      return new Promise<void>((resolve) => setTimeout(resolve, 1000))
    },
    [router],
  )

  if (pathname.startsWith("/studio")) return null

  return (
    <>
      <VisualEditing refresh={refresh} />
      {!framed && (
        <div
          role="status"
          style={{
            position: "fixed",
            left: 16,
            bottom: 16,
            zIndex: 2147483000,
            display: "flex",
            gap: 12,
            alignItems: "center",
            padding: "10px 14px",
            background: "#14161A",
            color: "#FFFFFF",
            font: "500 13px/1.3 var(--font-inter, Inter, system-ui, sans-serif)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
          }}
        >
          <span>Previewing unpublished changes</span>
          {/* A plain link, never next/link: a prefetch would turn the preview off before the click. */}
          <a href={`/api/draft-mode/disable?to=${encodeURIComponent(pathname)}`} style={{ color: "#FFFFFF", textDecoration: "underline" }}>
            Exit preview
          </a>
        </div>
      )}
    </>
  )
}
