import { useSite } from "../../context/SiteContext.jsx";
import { IconArrowRight } from "./Icons.jsx";

export default function WorkTogether() {
  const { content } = useSite();
  const { cta } = content;

  return (
    <section className="relative overflow-hidden bg-navy py-16 md:py-24">
      <div className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-picto-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-8 bottom-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="content relative max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-fuchsia-200">
          Let&apos;s collaborate
        </span>
        <h2 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-5xl">{cta.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">{cta.description}</p>
        <a href={`#${cta.buttonHref}`} className="btn-primary mt-8">
          {cta.buttonText} <IconArrowRight />
        </a>
      </div>
    </section>
  );
}
