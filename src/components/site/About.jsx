import { useSite } from "../../context/SiteContext.jsx";
import { IconDownload, SocialIcon } from "./Icons.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function About() {
  const { content } = useSite();
  const { about } = content;

  return (
    <section id="profile" className="relative scroll-mt-24 overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-fuchsia-50/70 to-transparent dark:from-picto-primary/10" />
      <div className="content relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="mx-auto w-full max-w-[520px]">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-3xl bg-picto-primary/10" />
            <div className="absolute -bottom-4 -right-4 h-28 w-28 rounded-full bg-emerald-100/70 dark:bg-emerald-400/15" />
            <div className="relative overflow-hidden rounded-[36px] border border-slate-100 bg-[#f6f7f9] shadow-[0_30px_70px_rgba(19,34,56,0.08)] dark:border-white/10 dark:bg-surface dark:shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
              <img
                src={about.image}
                alt="About"
                className="h-[560px] w-full object-cover object-[center_12%]"
              />
            </div>
          </div>
        </div>

        <div>
          <SectionHeader eyebrow="About me" title={about.title} />
          <p className="section-copy mt-6">{about.paragraph1}</p>
          <p className="section-copy mt-4">{about.paragraph2}</p>
          <div className="mt-7 inline-flex items-center gap-3 rounded-full border-2 border-picto-primary/70 bg-white px-4 py-3 shadow-sm dark:bg-surface">
            {about.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-soft-white text-ink transition hover:bg-picto-primary hover:text-white"
              >
                <SocialIcon label={social.label} />
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={`#${about.primaryHref}`} className="btn-primary">
              {about.primaryButton}
            </a>
            <a href={about.cvUrl} className="btn-outline">
              <IconDownload />
              {about.secondaryButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
