"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/sanity.config"

/**
 * The Studio owns the viewport (fixed, above the site chrome). Keyboard
 * events stop here so the site's own shortcuts (Ctrl/⌘K search, Escape)
 * never fire while someone is editing.
 */
export default function Studio() {
  return (
    <div className="fixed inset-0 z-[1000] bg-white" onKeyDown={(e) => e.stopPropagation()}>
      <NextStudio config={config} />
    </div>
  )
}
