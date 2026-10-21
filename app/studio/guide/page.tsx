import type { Metadata } from "next"
import OfficeGuide from "@/components/OfficeGuide"
import { OFFICE_GUIDE } from "@/lib/office-guide"

/**
 * /studio/guide: the office's one-page guide (lib/office-guide.ts), a page to
 * bookmark on a phone; the same guide is the Studio's first item. Under
 * /studio, so it is never indexed (app/studio/layout.tsx, and vercel.json's
 * X-Robots-Tag) and never in the sitemap. A static route: it wins over the
 * Studio's own catch-all at /studio/[[...tool]].
 */
export const metadata: Metadata = {
  title: { absolute: `${OFFICE_GUIDE.title} | Square One Paving` },
  description: OFFICE_GUIDE.lead,
  robots: { index: false, follow: false },
}

export default function GuidePage() {
  return (
    <main className="bg-white">
      <OfficeGuide />
    </main>
  )
}
