export function HubBadge({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  return (
    <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 border text-xs font-semibold tracking-[0.12em] uppercase
      ${variant === 'dark'
        ? 'border-white/20 text-white/70'
        : 'border-[#E2DDD8] text-[#5A5A5A]'
      }`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#F26430] flex-shrink-0" />
      Authorized HUB Surface Systems Applicator
    </div>
  )
}
