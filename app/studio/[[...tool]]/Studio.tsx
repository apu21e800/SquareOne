"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/sanity.config"
import { STUDIO_HEADINGS, STUDIO_ROOT_ID } from "@/sanity/studio-headings"

/**
 * The Studio owns the viewport (fixed, above the site chrome). Keyboard
 * events stop here so the site's own shortcuts (Ctrl/⌘K search, Escape)
 * never fire while someone is editing. The id and the style beside the
 * Studio keep the site's heading rules off the Studio's own headings
 * (sanity/studio-headings.ts).
 */
export default function Studio() {
  return (
    <div id={STUDIO_ROOT_ID} className="fixed inset-0 z-[1000] bg-white" onKeyDown={(e) => e.stopPropagation()}>
      <style>{STUDIO_HEADINGS}</style>
      <NextStudio config={config} />
    </div>
  )
}
