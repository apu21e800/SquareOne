import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"
import LegalDocument from "@/components/LegalDocument"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    clampDescription("How Square One Paving collects, uses and protects personal information under PIPEDA: enquiries, quotes and squareonepaving.com."),
  alternates: { canonical: `${SITE_URL}/privacy` },
}

/*
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.10): rewritten in Square One's
 * own sentences. Until then this page was the sibling site's legal template
 * with the names swapped, and the same sentences on two domains compete in
 * search. The substance is unchanged — what is collected, what it is used
 * for, PIPEDA, the two processors, cookies, the three-year retention line,
 * the rights, the contact block — only the words are ours.
 */
const sections = [
  {
    heading: "1. What we collect",
    body: `Most of the personal information we hold arrives through the quote form and by email: your name, your email address, a phone number, the company or organization you work for if you give one, and whatever you tell us about the job: where it is, what kind of work it is, and the details you type into the form.\n\nThe emails and form submissions themselves are kept, as the record of what was asked and what we said.\n\nThe site gathers less than the form does. Our hosting provider keeps ordinary server logs: which pages were requested, the browser that asked for them, and the page that sent you here.\n\nPersonal information reaches us in one of two ways: because you chose to send it, or because your browser sent a request to the site.`,
  },
  {
    heading: "2. What we use it for",
    body: `We use it to get back to you. An enquiry gets an answer, a quote request gets a quote, and a job that needs a conversation gets one.\n\nWhat we learn from enquiries and from the site's logs also goes into improving the website and the services we offer.\n\nIf we ever want to send you news about our services, we ask first; nothing of that kind goes out without your consent.\n\nWhere the law requires us to keep or produce a record, we do.\n\nYour personal information is not for sale. We do not sell it, rent it out or trade it with anyone.`,
  },
  {
    heading: "3. Consent, and the law that applies (PIPEDA)",
    body: `Square One Paving is a Canadian company, and the federal Personal Information Protection and Electronic Documents Act (PIPEDA) governs what we do with personal information.\n\nWe collect it, use it and disclose it with your consent. Sometimes that consent is express: you fill in the form and press send. Sometimes it is implied: you hand one of us a business card on a site.\n\nConsent can be withdrawn at any time: contact us at the address below. The exception is where a law or a contract stands in the way.`,
  },
  {
    heading: "4. Who else handles it",
    body: `Two outside services touch this information on our behalf.\n\nThe form's email is delivered by Resend, which carries the message from the site to our inbox. The site is hosted by Vercel, which serves the pages and keeps the server logs; that processing happens in North America.\n\nEach of them works under a privacy policy of its own. We choose providers whose data protection holds to the standard PIPEDA sets.`,
  },
  {
    heading: "5. Cookies",
    body: `This site sets no cookie to advertise to you, to measure you for analytics, or to follow you from one site to another.\n\nYour browser may keep a display preference in its own local storage, and our hosting provider may set a cookie where one is needed to serve the site securely.\n\nClear them or block them in your browser settings if you prefer; the site stays open to you either way.`,
  },
  {
    heading: "6. How long we keep it",
    body: `We keep personal information for as long as the purpose it was collected for still stands, or for as long as the law requires.\n\nFor an enquiry, that usually means three years from the last time we were in touch.\n\nYou can ask us to delete your information at any time.`,
  },
  {
    heading: "7. Your rights",
    body: `PIPEDA gives you the following rights over the personal information we hold:\n\n- To see what we hold about you\n- To have anything that is wrong or incomplete corrected\n- To withdraw your consent to our using it\n- To ask us to delete it\n- To complain to the Office of the Privacy Commissioner of Canada\n\nTo use any of them, get in touch by the details in the next section.`,
  },
  {
    heading: "8. Contact",
    body: `Anything about privacy (a question, a correction, a request to see or delete what we hold) goes to:\n\nSquare One Paving\n19–11720 Stewart Crescent\nMaple Ridge, BC V2X 9E7\noffice@squareonepaving.com | 604-612-6209 | 1-877-391-0270`,
  },
]

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy policy"
      updated="26 September 2026"
      applies="squareonepaving.com, and the enquiries sent to Square One Paving"
      lede={
        <p>
          This page is about the personal information that reaches Square One Paving through
          squareonepaving.com and through the enquiries people send us. It says what we collect,
          what we do with it, how we look after it, and how to reach us about any of that. Where it
          says &ldquo;we&rdquo;, it means Square One Paving.
        </p>
      }
      sections={sections}
      other={{ href: "/terms", label: "Terms of use" }}
    />
  )
}
