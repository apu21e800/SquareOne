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
 * surface needs it (the service pages), the walk-through and the warranty
 * split (/about). Nothing here is a new claim.
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
    body: "Send a few photographs and the address, and we walk the site, free: the surface and its condition, the drainage, the traffic it carries and the layout it has to meet. The sample boards come with us.",
  },
  {
    title: "Written quote",
    body: "A written quote sets out the system, the pattern and the colours for the surface you have. Drawings help, and we work from yours.",
  },
  {
    title: "Install",
    body: "Surface prep comes first: cleaning, and vapour blasting where the surface needs it. Then the work goes down, by Square One's own crews, to the published specification.",
  },
  {
    title: "Aftercare",
    body: "Once the surface has cured we walk the finished work with you. The manufacturer warrants the material; Square One warrants the workmanship.",
  },
]

/** The one line /specifiers adds under the quote (§4 of the brief). */
export const SPECIFIER_LINE =
  "For a tender, the manufacturer's specifications and colour cards are in the document library, and we support the specification."

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
    src: "/images/applications/crosswalks/langley-railways-crossing-crew-on-site-trafficpatternsxd-01.jpg",
    alt: "The railway-tie crossing in the City of Langley with a crew member at the far kerb",
    caption: "City of Langley · crew on site · TrafficPatternsXD",
    position: "center 50%",
  },
]

export default function HowAJobGoes({
  tone = "warm",
  specifiers = false,
  crews = true,
  title = "How a job goes",
  cta = true,
}: {
  tone?: "paper" | "warm" | "stone"
  /** Adds the specification-support line under step 2. */
  specifiers?: boolean
  /** The four crew frames under the steps. */
  crews?: boolean
  title?: string
  cta?: boolean
}) {
  return (
    <Section id="how-a-job-goes" label="The same four steps, every job" title={title} tone={tone} wide>
      <ol className="grid grid-cols-4 gap-x-10 gap-y-10 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        {STEPS.map((step, i) => (
          <li key={step.title} className="border-t border-hairline pt-6">
            <span className="step-num" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="mt-5">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-3 text-[16px] leading-[1.6] text-ink-body [text-wrap:pretty]">{step.body}</p>
            {specifiers && i === 1 && (
              <p className="mt-3 text-[16px] leading-[1.6] text-ink-body [text-wrap:pretty]">{SPECIFIER_LINE}</p>
            )}
          </li>
        ))}
      </ol>

      {crews && (
        <ul className="mt-14 grid grid-cols-4 gap-x-6 gap-y-8 max-[900px]:grid-cols-2 max-[900px]:mt-10">
          {CREWS.map((frame) => (
            <li key={frame.src}>
              <Frame
                src={frame.src}
                alt={frame.alt}
                caption={frame.caption}
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
            Book a site visit
          </Link>
          <span className="text-[16px] text-ink-muted">
            or call <a href="tel:+16046126209" className="link">604-612-6209</a>
          </span>
        </div>
      )}
    </Section>
  )
}
