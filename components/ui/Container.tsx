import { ReactNode } from "react"

export default function Container({
  children,
  className = "",
  as: As = "div",
}: {
  children: ReactNode
  className?: string
  as?: "div" | "section" | "header" | "footer" | "main"
}) {
  return (
    <As className={`max-w-[1400px] mx-auto px-6 lg:px-10 ${className}`}>
      {children}
    </As>
  )
}
