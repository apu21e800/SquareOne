import Image from "next/image"

const trustItems = [
  "Manufacturer-Certified Installer",
  "25+ Years Field Experience",
  "500+ Projects Across BC",
  "Lower Mainland & Vancouver Island",
]

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="7" fill="#D66620" />
      <path d="M4 7L6.2 9.5L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function TrustStrip() {
  return (
    <section className="w-full py-5 bg-[#F9F6F2] border-t border-[#E8E4DE]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-0">

          {/* S1 logo + name */}
          <div className="flex items-center gap-3 flex-shrink-0 sm:pr-8 sm:border-r sm:border-[#E0DBD4]">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/images/square-one-logo.png"
                alt="Square One Paving"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <div>
              <p className="text-[#1A1A1A] text-sm font-bold leading-tight">Square One Paving</p>
              <p className="text-[#888] text-[11px] leading-none mt-0.5">BC&apos;s Leading Decorative Pavement Installer</p>
            </div>
          </div>

          {/* Trust items */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 sm:pl-8">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-[#3A3A3A] text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
