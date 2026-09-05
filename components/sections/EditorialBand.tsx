import { CLIENTS } from "@/lib/clients"

/**
 * Editorial statement band — the page inhaling, now on slate.
 *
 * 5 Sept 2026 (Vern: "everything is very white"; "selected clients is very
 * boring — weave that in somehow else"): the one display line moves onto
 * the site's slate, and the client names come with it as a quiet index in
 * the right-hand column. This is the page's one dark band above the close;
 * it is never adjacent to another dark band. No button, no image.
 */
export default function EditorialBand({ statement = "Twenty-five years on BC ground" }: { statement?: string }) {
  return (
    <section className="relative overflow-hidden bg-surface-slate py-[7rem] max-[700px]:py-16">
      <span aria-hidden="true" className="ghost-index ghost-index-slate">2000</span>

      <div className="container-1280 relative z-[1]">
        <div className="grid grid-cols-12 gap-x-12 gap-y-12 max-[900px]:grid-cols-1">
          <div className="col-span-7 flex flex-col justify-center max-[900px]:col-span-1">
            <div className="eyebrow eyebrow-on-image">Since 2000</div>
            <p data-reveal className="display-statement stop m-0 mt-6 max-w-[24ch] text-white [text-wrap:balance]">
              {statement}
            </p>
          </div>

          <div className="col-span-5 self-center max-[900px]:col-span-1">
            <div className="label label-on-slate">Installed for</div>
            <ul className="mt-4 grid grid-cols-2 gap-x-8">
              {CLIENTS.map((client) => (
                <li
                  key={client}
                  className="border-t py-[11px] text-[15px] font-medium leading-[1.4] text-[color:var(--ink-on-slate-body)]"
                  style={{ borderColor: "var(--hairline-slate)" }}
                >
                  {client}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] leading-[1.6] text-[color:var(--ink-on-slate-muted)]">
              Owners and developers Square One has installed for, as published in its project record.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
