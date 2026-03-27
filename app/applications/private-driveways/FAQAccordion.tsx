"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How much does a decorative driveway cost?",
    answer:
      "Cost varies by size, pattern complexity, and current surface condition. Most residential driveways range from $3,000–$12,000+. We provide free, no-obligation quotes.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most residential driveways are completed in 1–2 days. We handle all surface prep and cleanup.",
  },
  {
    question: "How durable is stamped asphalt in BC winters?",
    answer:
      "Our systems are specifically designed for BC's freeze-thaw climate. Snowplow safe, UV stable, and built to last 20+ years with basic maintenance.",
  },
  {
    question: "What maintenance is required?",
    answer:
      "Minimal. An annual inspection and occasional resealing (every 5–7 years) keeps your driveway looking new.",
  },
  {
    question: "Can you work on an existing asphalt driveway?",
    answer:
      "Yes — in most cases we can apply our decorative systems over existing asphalt in good condition, saving you the cost of full removal.",
  },
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-[#E8E4DE]">
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between py-5 text-left gap-4"
            aria-expanded={openIndex === index}
          >
            <span className="text-[#2D2D2D] font-semibold text-base">
              {faq.question}
            </span>
            <ChevronDown
              className={`shrink-0 text-[#D66620] transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              size={20}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-40 pb-5" : "max-h-0"
            }`}
          >
            <p className="text-[#626262] text-base leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
