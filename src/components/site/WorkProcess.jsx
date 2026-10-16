import { useSite } from "../../context/SiteContext.jsx";
import { ProcessIcon } from "./Icons.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function WorkProcess() {
  const { content } = useSite();
  const { process } = content;

  return (
    <section id="work-process" className="scroll-mt-24 bg-[linear-gradient(180deg,#ffffff_0%,#faf7ff_100%)] py-16 md:py-24 dark:bg-[linear-gradient(180deg,#0e1624_0%,#141c2c_100%)]">
      <div className="content grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeader
            eyebrow="How I work"
            title={process.title}
            subtitle={process.paragraph1}
          />
          <p className="section-copy mt-4">{process.paragraph2}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {process.steps.map((step, index) => (
            <article
              key={step.id}
              className="process-card group p-6"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-fuchsia-50 text-picto-primary dark:bg-picto-primary/15">
                  <ProcessIcon name={step.icon} />
                </div>
                <span className="text-sm font-semibold text-picto-primary/70">0{step.number}</span>
              </div>
              <h3 className="text-lg font-semibold text-ink">
                {step.number}. {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
