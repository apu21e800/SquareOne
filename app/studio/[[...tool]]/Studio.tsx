"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/sanity.config"
import { STUDIO_HEADINGS, STUDIO_ROOT_ID } from "@/sanity/studio-headings"

/**
 * The Studio owns the viewport (fixed, above the site chrome). The id and
 * the style beside the Studio keep the site's heading rules off the Studio's
 * own headings (sanity/studio-headings.ts).
 *
 * Keys go through (23 Oct 2026). Until then the frame stopped every key
 * press, to keep the site's Ctrl/⌘K search away from the editor, and that
 * also stopped the Studio's own: Sanity listens for Escape (close a menu, a
 * dialog, the crop window) and Ctrl/⌘K (its search) on the window, so
 * neither worked. The site's search shortcut now stands down while this
 * frame is on the page (components/Nav.tsx); `npm run test:studio` checks
 * both.
 */
export default function Studio() {
  return (
    <div id={STUDIO_ROOT_ID} className="fixed inset-0 z-[1000] bg-white">
      <style>{STUDIO_HEADINGS}</style>
      <NextStudio config={config} />
    </div>
  )
}
