import OfficeGuide from "../../components/OfficeGuide"
import { GUIDE_PATH } from "../../lib/office-guide"
import QuietBoundary from "./QuietBoundary"

const LINK = { color: "#B24E2E" }

/**
 * The Studio's first item, "Start here" (sanity/structure.ts): the office's
 * one-page guide inside the Studio, with the address of the same page to
 * bookmark on a phone (app/studio/guide/page.tsx). If the guide ever fails
 * to show here, the pane still says where to read it (12 Nov 2026).
 */
export default function GuidePane() {
  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#fff" }}>
      <p style={{ maxWidth: 680, margin: "0 auto", padding: "16px 20px 0", fontSize: 15, color: "#5B6168" }}>
        <a href={GUIDE_PATH} target="_blank" rel="noopener" style={LINK}>
          Open this guide as a page to bookmark
        </a>
      </p>
      <QuietBoundary
        name="The guide"
        fallback={
          <p style={{ maxWidth: 680, margin: "0 auto", padding: "16px 20px", fontSize: 15, color: "#14161A" }}>
            The guide can't show here just now. Read it on its own page:{" "}
            <a href={GUIDE_PATH} target="_blank" rel="noopener" style={LINK}>
              squareonepaving.com{GUIDE_PATH}
            </a>
          </p>
        }
      >
        <OfficeGuide compact />
      </QuietBoundary>
    </div>
  )
}
