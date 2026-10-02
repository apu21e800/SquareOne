import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"
import LegalDocument from "@/components/LegalDocument"

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    clampDescription("Terms of use for squareonepaving.com: permitted use, intellectual property, disclaimer of warranties and governing law in British Columbia."),
  alternates: { canonical: `${SITE_URL}/terms` },
}

/*
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.10): rewritten in Square One's
 * own sentences. Until then this page was the sibling site's legal template
 * with the names swapped, and the same sentences on two domains compete in
 * search. The substance is unchanged — acceptance, permitted use, copyright
 * and the product trademarks, the general-information caveat, "as is",
 * the CAD $100 cap, links, BC law and courts, the contact block — only the
 * words are ours.
 */
const sections = [
  {
    heading: "1. Agreeing to these terms",
    body: `Using the Site means you accept these terms. If there is something in them you cannot accept, the right thing to do is to stop using the Site.\n\nWe can change these terms at any time. If you keep using the Site after a change, you have accepted the changed terms.`,
  },
  {
    heading: "2. Using the Site",
    body: `The Site is there to be read, and to be used for lawful purposes. A few things are not allowed:\n\n- Using the Site in a way that breaks a federal, provincial or local law\n- Sending spam: unsolicited commercial messages of any kind\n- Trying to get into any part of the Site, or the systems behind it, that you are not authorized to reach\n- Running scrapers, crawlers or other automated tools against the Site to pull out its content or data, unless we have given you written permission\n- Copying, republishing or passing on the Site's content without our written consent first`,
  },
  {
    heading: "3. Text, photographs and trademarks",
    body: `The words on this Site, the photographs, the descriptions of our services, the logo, the graphics and the design of the pages belong to Square One Paving or to the people who license them to us. Canadian copyright law protects them, and so does the copyright law of other countries.\n\nStreetPrint®, StreetBond®, TrafficPatterns™, TrafficPatternsXD™, DecoMark, DuraTherm, PreMark and DuraShield are the names of products we install, and each is a trademark of the company that makes it. Other names on the Site may be trademarks of their owners too. Nothing here gives anyone a licence or a right to use any of these marks, ours included, without written permission first.`,
  },
  {
    heading: "4. What the Site says about our work",
    body: `What the Site says about our services (the descriptions, the performance figures and the guidance on where each system is used) is general information. How a surface actually performs depends on the site, the weather it lives in, what is underneath it, how it was applied and how it is looked after.\n\nBefore a project is planned around any of it, talk to us.`,
  },
  {
    heading: "5. No warranty on the Site",
    body: `The Site and everything on it are offered "as is". That means no warranty of any kind, express or implied: not merchantability, not fitness for a particular purpose, not non-infringement.\n\nWe do not promise that the Site will be free of errors, that it will always be up, or that it carries no virus or other harmful code.`,
  },
  {
    heading: "6. Limits on our liability",
    body: `As far as the law allows, Square One Paving is not liable for indirect, incidental, special, consequential or punitive damages that arise from your use of the Site or in connection with it.\n\nIf a claim does arise out of these terms or in relation to them, the most we will be liable for, in total, is one hundred Canadian dollars (CAD $100).`,
  },
  {
    heading: "7. Links to other sites",
    body: `Some links on the Site lead to websites that are not ours. They are there for convenience. A link is not an endorsement, and we are not responsible for what those sites say, how accurate it is, or how they treat your privacy. You follow them at your own risk.`,
  },
  {
    heading: "8. Governing law",
    body: `British Columbia law governs these terms, together with the federal laws of Canada that apply in the province, and conflict-of-law rules do not change that.\n\nAny dispute over these terms, or connected to them, goes to the courts of British Columbia, and only there.`,
  },
  {
    heading: "9. Contact",
    body: `Questions about these terms go to:\n\nSquare One Paving\n19–11720 Stewart Crescent\nMaple Ridge, BC V2X 9E7\noffice@squareonepaving.com | 604-612-6209 | 1-877-391-0270`,
  },
]

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of use"
      updated="26 September 2026"
      applies="squareonepaving.com, and everyone who uses it"
      lede={
        <p>
          squareonepaving.com is run by Square One Paving. What follows are the terms on which we
          make it available, and they apply to anyone who uses the site (the &ldquo;Site&rdquo;).
          Take a minute with them before you go further.
        </p>
      }
      sections={sections}
      other={{ href: "/privacy", label: "Privacy policy" }}
    />
  )
}
