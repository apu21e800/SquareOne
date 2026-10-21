import OfficeGuide from "../../components/OfficeGuide"
import { GUIDE_PATH } from "../../lib/office-guide"

/**
 * The Studio's first item, "Start here" (sanity/structure.ts): the office's
 * one-page guide inside the Studio, with the address of the same page to
 * bookmark on a phone (app/studio/guide/page.tsx).
 */
export default function GuidePane() {
  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#fff" }}>
      <p style={{ maxWidth: 680, margin: "0 auto", padding: "16px 20px 0", fontSize: 15, color: "#5B6168" }}>
        <a href={GUIDE_PATH} target="_blank" rel="noopener" style={{ color: "#B24E2E" }}>
          Open this guide as a page to bookmark
        </a>
      </p>
      <OfficeGuide compact />
    </div>
  )
}
