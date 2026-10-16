import { useSite } from "../../context/SiteContext.jsx";
import { ProcessIcon } from "./Icons.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function Services() {
  const { content } = useSite();
  const { services } = content;

  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute left-0 top-20 h-64 w-64 rounded-full bg-fuchsia-100/50 blur-3xl dark:bg-picto-primary/15" />
      <div className="content relative grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeader eyebrow="What I offer" title={services.title} subtitle={services.paragraph1} />
          <p className="section-copy mt-4">{services.paragraph2}</p>
          <a href={`#${services.buttonHref}`} className="btn-primary mt-8">
            {services.buttonText}
          </a>
        </div>
        <div className="space-y-5">
          {services.items.map((item, index) => (
            <article
              key={item.id}
              className={`site-card p-6 ${index === 0 ? "ring-1 ring-picto-primary/25" : ""}`}
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-fuchsia-50 dark:bg-picto-primary/15">
                  <ProcessIcon name={item.icon} />
                </div>
                <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
              </div>
              <p className="text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
