import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use | Square One Paving",
  description:
    "Terms of use for squareonepaving.com — governing law, intellectual property, and disclaimer of warranties.",
}

const sections = [
  {
    heading: "1. Acceptance of Terms",
    body: `By accessing or using squareonepaving.com (the "Site"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site. Square One Paving reserves the right to modify these terms at any time. Continued use of the Site following any changes constitutes your acceptance of the revised terms.`,
  },
  {
    heading: "2. Use of the Site",
    body: `You may use this Site for lawful purposes only. You agree not to:\n\n- Use the Site in any way that violates applicable federal, provincial, or local laws\n- Transmit unsolicited commercial communications (spam)\n- Attempt to gain unauthorized access to any portion of the Site or its related systems\n- Use automated tools to scrape, crawl, or extract data from the Site without written permission\n- Reproduce, republish, or redistribute any content without prior written consent`,
  },
  {
    heading: "3. Intellectual Property",
    body: `All content on this Site — including text, images, service descriptions, logos, graphics, and design — is the property of Square One Paving or its licensors and is protected by Canadian and international copyright law.\n\nProduct names including TrafficPatterns, StreetPrint, StreetBond, DecoMark, DuraTherm, and other referenced product systems may be trademarks of their respective owners. Nothing on this Site grants any license or right to use any trademark without prior written permission.`,
  },
  {
    heading: "4. Service Information",
    body: `Service descriptions, performance data, and application guidelines are provided for general information purposes. Actual performance may vary based on site conditions, climate, substrate type, application method, and maintenance practices.\n\nSquare One Paving recommends consulting with our team before specifying services for any project.`,
  },
  {
    heading: "5. Disclaimer of Warranties",
    body: `This Site and its content are provided "as is" without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.\n\nSquare One Paving does not warrant that the Site will be error-free, uninterrupted, or free of viruses or other harmful components.`,
  },
  {
    heading: "6. Limitation of Liability",
    body: `To the maximum extent permitted by applicable law, Square One Paving shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of this Site.\n\nOur total liability for any claim arising out of or relating to these Terms shall not exceed one hundred Canadian dollars (CAD $100).`,
  },
  {
    heading: "7. Links to Third-Party Sites",
    body: `This Site may contain links to third-party websites for your convenience only. Square One Paving does not endorse and is not responsible for the content, privacy practices, or accuracy of any third-party site. Accessing linked sites is at your own risk.`,
  },
  {
    heading: "8. Governing Law",
    body: `These Terms of Use are governed by the laws of the Province of British Columbia and the federal laws of Canada applicable therein, without regard to conflict of law principles.\n\nAny dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of British Columbia, Canada.`,
  },
  {
    heading: "9. Contact",
    body: `Questions about these Terms of Use may be directed to:\n\nSquare One Paving\nMaple Ridge, British Columbia\noffice@squareonepaving.com | 604-466-9902`,
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F5F3F0]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-32 pb-24">
        <p className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
          Legal
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#2D2D2D] mb-3">
          Terms of Use
        </h1>
        <p className="text-sm text-[#626262] mb-12">Last updated: March 2026</p>

        <p className="text-[#626262] leading-relaxed mb-12">
          Please read these Terms of Use carefully before using
          squareonepaving.com, operated by Square One Paving. These terms govern
          your access to and use of the Site.
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
              <p className="text-sm text-[#626262] leading-relaxed whitespace-pre-line">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
