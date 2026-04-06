const trustItems = [
  { label: "Manufacturer-Certified Installer" },
  { label: "25+ Years Field Experience" },
  { label: "500+ Projects Across BC" },
  { label: "Lower Mainland & Vancouver Island" },
]

export default function TrustStrip() {
  return (
    <section className="w-full py-10 bg-white border-t border-[#E8E4DE]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-0 sm:justify-between">
          {/* S1 credential badge */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#D66620] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-black">S1</span>
            </div>
            <div>
              <p className="text-[#333333] text-sm font-bold leading-tight">Square One Paving</p>
              <p className="text-[#626262] text-xs">BC&apos;s Leading Decorative Pavement Installer</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-[#E8E4DE]" />

          {/* Trust items */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[#D66620] font-bold text-sm">✓</span>
                <span className="text-[#626262] text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
