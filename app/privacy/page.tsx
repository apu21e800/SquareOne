import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    clampDescription("How Square One Paving collects, uses and protects personal information under PIPEDA — enquiries, quotes and squareonepaving.com."),
  alternates: { canonical: `${SITE_URL}/privacy` },
}

const sections = [
  {
    heading: "1. Information We Collect",
    body: `When you use squareonepaving.com or submit an inquiry, we may collect the following personal information:\n\n— Contact details: name, email address, phone number and organization\n— Project information: location, project type, and details you provide in form submissions\n— Usage data: the standard server logs kept by our hosting provider — pages requested, browser type and referring URL\n— Communications: records of email correspondence or form submissions\n\nWe collect this information only when you voluntarily provide it, or when it is automatically collected through your use of the site.`,
  },
  {
    heading: "2. How We Use Your Information",
    body: `We use collected information to:\n\n— Respond to your inquiries and project requests\n— Provide quotes and project consultations\n— Improve our website and service offerings\n— Send relevant updates or service announcements (only with your consent)\n— Comply with legal obligations\n\nWe do not sell, rent, or trade your personal information to third parties.`,
  },
  {
    heading: "3. Legal Basis (PIPEDA)",
    body: `Square One Paving is a Canadian company subject to the Personal Information Protection and Electronic Documents Act (PIPEDA). We collect, use, and disclose personal information with your consent — either express (you fill out a form) or implied (you provide a business card at a job site).\n\nYou may withdraw consent at any time by contacting us at the addresses below, subject to legal or contractual restrictions.`,
  },
  {
    heading: "4. Third-Party Services",
    body: `We use the following third-party services that may process your data:\n\n— Email delivery: Resend (email transmission for form submissions)\n— Hosting: Vercel (site hosting and server logs; data processed in North America)\n\nEach service operates under its own privacy policy. We choose partners who maintain data protection standards consistent with PIPEDA.`,
  },
  {
    heading: "5. Cookies",
    body: `squareonepaving.com does not use cookies for advertising, analytics or cross-site tracking. Your browser may store a display preference locally, and our hosting provider may set cookies needed to serve the site securely.\n\nYou can clear or block cookies and local storage in your browser settings without losing access to the site.`,
  },
  {
    heading: "6. Data Retention",
    body: `We retain personal information for as long as necessary to fulfill the purposes described in this policy, or as required by law. Inquiry records are typically retained for 3 years from the date of last contact. You may request deletion of your data at any time.`,
  },
  {
    heading: "7. Your Rights",
    body: `Under PIPEDA, you have the right to:\n\n— Access the personal information we hold about you\n— Correct inaccurate or incomplete information\n— Withdraw consent to our use of your information\n— Request deletion of your personal information\n— File a complaint with the Office of the Privacy Commissioner of Canada\n\nTo exercise any of these rights, contact us using the information below.`,
  },
  {
    heading: "8. Contact Us",
    body: `For privacy-related inquiries, contact:\n\nSquare One Paving\n19–11720 Stewart Crescent\nMaple Ridge, BC V2X 9E7\noffice@squareonepaving.com | 604-612-6209 | 1-877-391-0270`,
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F5F3F0]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-32 pb-24">
        <p className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
          Legal
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#2D2D2D] mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#626262] mb-12">Last updated: September 2026</p>

        <p className="text-[#626262] leading-relaxed mb-12">
          Square One Paving (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) is committed to protecting your privacy. This
          policy explains how we collect, use, and safeguard your personal
          information when you visit squareonepaving.com or contact us about our
          services.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <div
              key={section.heading}
              className="border-t border-[#8B8680]/20 pt-8"
            >
              <h2 className="text-xl font-bold text-[#2D2D2D] mb-4">
                {section.heading}
              </h2>
              <div className="text-sm text-[#626262] leading-relaxed whitespace-pre-line">
                {section.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
