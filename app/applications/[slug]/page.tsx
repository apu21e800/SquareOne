import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Applications | Square One Paving",
  description: "Decorative pavement applications by Square One Paving — BC's trusted installer since 2000.",
}

export default async function ApplicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
      <div className="text-center px-6 py-40">
        <p className="text-xs font-semibold text-[#D66620] uppercase tracking-widest mb-4">Application</p>
        <h1 className="text-4xl font-black text-[#333333] mb-6">{title}</h1>
        <p className="text-[#626262] text-lg mb-10 max-w-md mx-auto">
          We install decorative pavement for {title.toLowerCase()} applications across BC.
          Contact us to discuss your project.
        </p>
        <Link href="/contact">
          <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-8 py-4 rounded-lg font-bold transition-colors">
            Get a Quote
          </span>
        </Link>
      </div>
    </main>
  )
}
