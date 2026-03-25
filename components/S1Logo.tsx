{/* TODO: replace with real S1 logo from Desktop/S1-logos/ */}

interface S1LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function S1Logo({ className = "", size = "md" }: S1LogoProps) {
  const sizes = {
    sm: { width: 32, height: 32, text: "text-xs" },
    md: { width: 40, height: 40, text: "text-sm" },
    lg: { width: 48, height: 48, text: "text-base" },
  }

  const { width, height, text } = sizes[size]

  return (
    <div
      className={`flex items-center justify-center bg-[#2D2D2D] rounded-sm ${className}`}
      style={{ width, height }}
    >
      <span className={`text-white font-bold ${text}`}>S1</span>
    </div>
  )
}
