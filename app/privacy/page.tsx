import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Square One Paving",
  description:
    "Square One Paving privacy policy — how we collect, use, and protect your personal information under PIPEDA.",
}

const sections = [
  {
    heading: "1. Information We Collect",
    body: `When you use squareonepaving.com or submit an inquiry, we may collect the following personal information:

— Contact details: name, email address, phone number, company name, and job title
— Project information: location, project type, and details you provide in form submissions
— Usage data: pages visited, time on site, browser type, and referring URL (collected via cookies and analytics tools)
— Communications: records of email correspondence or form submissions

We collect this information only when you voluntarily provide it, or when it is automatically collected through your use of the site.`,
  },
  {
    heading: "2. How We Use Your Information",
    body: `We use collected information to:

— Respond to your inquiries and project requests
— Provide quotes and project consultations
— Improve our website and service offerings
— Send relevant updates or service announcements (only with your consent)
— Comply with legal obligations

We do not sell, rent, or trade your personal information to third parties.`,
  },
  {
    heading: "3. Legal Basis (PIPEDA)",
    body: `Square One Paving is a Canadian company subject to the Personal Information Protection and Electronic Documents Act (PIPEDA). We collect, use, and disclose personal information with your consent — either express (you fill out a form) or implied (you provide a business card at a job site).

You may withdraw consent at any time by contacting us at the addresses below, subject to legal or contractual restrictions.`,
  },
  {
    heading: "4. Third-Party Services",
    body: `We use the following third-party services that may process your data:

— Email delivery: Resend (email transmission for form submissions)
— Analytics: Vercel Analytics (anonymized usage data)
— Hosting: Vercel (site hosting; data processed in North America)

Each service operates under its own privacy policy. We choose partners who maintain data protection standards consistent with PIPEDA.`,
  },
  {
    heading: "5. Cookies",
    body: `squareonepaving.com uses cookies to:

— Remember your preferences and session state
— Collect anonymized analytics data
— Improve site performance

You can disable cookies in your browser settings. Disabling cookies may affect some site functionality. We do not use cookies for advertising or cross-site tracking.`,
  },
  {
    heading: "6. Data Retention",
    body: `We retain personal information for as long as necessary to fulfill the purposes described in this policy, or as required by law. Inquiry records are typically retained for 3 years from the date of last contact. You may request deletion of your data at any time.`,
  },
  {
    heading: "7. Your Rights",
    body: `Under PIPEDA, you have the right to:

— Access the personal information we hold about you
— Correct inaccurate or incomplete information
— Withdraw consent to our use of your information
— Request deletion of your personal information
— File a complaint with the Office of the Privacy Commissioner of Canada

To exercise any of these rights, contact us using the information below.`,
  },
  {
    heading: "8. Contact Us",
    body: `For privacy-related inquiries, contact:

Square One Paving
Ladysmith, British Columbia
info@squareonepaving.com | 604-309-8212`,
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
        <p className="text-sm text-[#8B8680] mb-12">Last updated: March 2026</p>

        <p className="text-[#8B8680] leading-relaxed mb-12">
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
              <div className="text-sm text-[#8B8680] leading-relaxed whitespace-pre-line">
                {section.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
