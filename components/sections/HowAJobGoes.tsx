import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"

/**
 * How a job goes: the one process band (26 Sept 2026, docs/OWN-COMPANY-BRIEF.md
 * §3.4 and §9.3). Until now the steps lived in four places with three
 * wordings: /about (five), every service page (five), /specifiers (five),
 * /contact (three). This is the one wording, four steps, numbered because
 * it is a real sequence — the numeral is the site's signature figure and
 * appears nowhere else.
 *
 * Every line restates what the site already says on record: the free site
 * visit and the sample boards (/contact, /about), the written quote and the
 * specification support (/specifiers), Square One's own crews to the
 * published specification, surface prep and vapour blasting where the
 * surface needs it (the service pages), the walk-through (/about). Nothing
 * here is a new claim.
 *
 * The four photographs are the crews from the record, captioned by the
 * place in their file names: Langley (public/images/applications/crosswalks),
 * and the three frames the photo pass curated into _image-queue and are now
 * in public/images/process.
 */
export interface Step {
  title: string
  body: string
}

export const STEPS: Step[] = [
  {
    title: "Site visit",
    body: "We walk the site with you and bring the sample boards. Free.",
  },
  {
    title: "Written quote",
    body: "The system, the pattern and the colours, in writing, before anything starts.",
  },
  {
    title: "Install",
    body: "Our own crews prep the surface and install to the published specification.",
  },
  {
    title: "Aftercare",
    // 6 Oct 2026 (the client, on the preview: "remove anything about
    // warranty"): the warranty sentence is gone; the walk-through stays.
    body: "We walk the finished work with you before we leave the site.",
  },
]

/** The one line /specifiers adds under the quote (§4 of the brief). */
export const SPECIFIER_LINE =
  "For a tender: the specifications and colour cards are in the document library, and we support the spec."

const CREWS = [
  {
    src: "/images/process/north-vancouver-template-layout-before-stamping-streetprint-01.jpg",
    alt: "The template laid out in white on a townhouse laneway in North Vancouver before the asphalt is stamped",
    caption: "North Vancouver · template laid out before stamping · StreetPrint",
    position: "center 40%",
  },
  {
    src: "/images/process/richmond-crew-at-the-intersection-trafficpatternsxd-01.jpg",
    alt: "Square One's crew at a coned-off intersection in Richmond with the template laid on the crossing",
    caption: "Richmond · the crew at the intersection · TrafficPatternsXD",
    position: "center 55%",
  },
  {
    src: "/images/process/penticton-crew-installing-the-crossing-trafficpatternsxd-01.jpg",
    alt: "Square One's crew heat-fusing a rainbow crossing under the pedestrian signals in Penticton",
    caption: "Penticton · installing the crossing · TrafficPatternsXD",
    position: "center 60%",
  },
  {
    // 28 Sept 2026 QA: the Langley frame here showed a finished crossing under
    // "crew on site", a scroll after the same crossing in the specifiers row.
    src: "/images/applications/schools-sports-courts/surrey-kb-woodward-installation-decomark-01.jpg",
    alt: "The infrared heater rig parked on a freshly laid grey octagon with blue web lines mid-install at KB Woodward school, Surrey",
    caption: "Surrey · KB Woodward · DecoMark, mid-install",
    position: "center 55%",
  },
]

/** The four steps for vapour blasting (28 Sept 2026 QA: the paving steps, with
    their patterns, colours and cure, read wrong on a cleaning service). Each
    line restates the vapour page: the free site visit, the written quote, the
    rig on site with the abrasive in water, and the primed surface. */
export const VAPOUR_STEPS: Step[] = [
  {
    title: "Photos and the address",
    body: "Send photos of the surface and what has to come off it. We look at the site, free.",
  },
  {
    title: "Written quote",
    body: "A written quote for the job, before anything starts.",
  },
  {
    title: "On site",
    body: "The rig comes to you. The abrasive travels in water, so the dust stays down.",
  },
  {
    title: "Walk-through",
    body: "We walk the cleaned surface with you, primed if a coating follows.",
  },
]

export default function HowAJobGoes({
  tone = "warm",
  specifiers = false,
  crews = true,
  title = (
    <>
      Four steps, <em>every job</em>
    </>
  ),
  cta = true,
  steps = STEPS,
  label = "How a job goes",
}: {
  steps?: Step[]
  label?: string
  tone?: "paper" | "warm" | "stone"
  /** Adds the specification-support line under step 2. */
  specifiers?: boolean
  /** The four crew frames under the steps. */
  crews?: boolean
  title?: ReactNode
  cta?: boolean
}) {
  return (
    <Section id="how-a-job-goes" label={label} title={title} tone={tone} wide>
      {/* 6 Oct 2026 (Vern: "add some kind of colour to the Four steps
          section… the lines above each step, keep it in alignment with the
          rest of the site"): the rule over each step is a slice of the
          colour card's edge, so the four read as one band, light to dark,
          the same band as the hero's foot and the footer's top. */}
      <ol
        data-reveal-group
        className="steps-edge grid grid-cols-4 gap-x-10 gap-y-10 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
        style={{ ["--n" as string]: steps.length } as CSSProperties}
      >
        {steps.map((step, i) => (
          <li key={step.title} data-reveal style={{ ["--i" as string]: i } as CSSProperties}>
            <span className="step-num" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="mt-5">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-3 max-w-[30ch] text-[16.5px] leading-[1.55] text-ink-body [text-wrap:pretty]">{step.body}</p>
            {specifiers && i === 1 && (
              <p className="mt-3 text-[16px] leading-[1.6] text-ink-body [text-wrap:pretty]">{SPECIFIER_LINE}</p>
            )}
          </li>
        ))}
      </ol>

      {crews && (
        <ul className="mt-14 grid grid-cols-4 gap-x-6 gap-y-6 max-[900px]:mt-10 max-[900px]:grid-cols-2 max-[900px]:gap-x-3 max-[900px]:gap-y-3">
          {CREWS.map((frame) => (
            <li key={frame.src}>
              <Frame
                src={frame.src}
                alt={frame.alt}
                aspect="aspect-[4/3]"
                sizes="(max-width: 900px) 50vw, 300px"
                position={frame.position}
              />
            </li>
          ))}
        </ul>
      )}

      {cta && (
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 max-[900px]:mt-9">
          <Link href="/contact" className="btn-primary">
            Get a quote
          </Link>
          <span className="text-[16px] text-ink-muted">
            or call <a href="tel:+16046126209" className="link">604-612-6209</a>
          </span>
        </div>
      )}
    </Section>
  )
}
