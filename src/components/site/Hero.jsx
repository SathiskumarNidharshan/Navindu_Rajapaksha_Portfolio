import { useSite } from "../../context/SiteContext.jsx";
import { IconArrowRight } from "./Icons.jsx";

export default function Hero() {
  const { content } = useSite();
  const { hero } = content;

  return (
    <section id="introduction" className="hero-glow relative scroll-mt-24 overflow-hidden py-14 md:py-24">
      <div className="pointer-events-none absolute -left-16 top-20 h-40 w-40 rounded-full bg-fuchsia-200/40 blur-3xl dark:bg-picto-primary/20" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-48 w-48 rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-400/10" />

      <div className="content grid items-center gap-12 lg:grid-cols-2">
        <div className="fade-up">
          {hero.eyebrow !== "" ? (
            <span className="section-eyebrow">{hero.eyebrow || "Freelance UI / UX Designer"}</span>
          ) : null}
          <h1 className="mt-5 text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl md:text-6xl">
            {hero.greeting}
            <span className="mt-2 block bg-gradient-to-r from-picto-primary to-violet-600 bg-clip-text text-transparent">
              {hero.name}
            </span>
          </h1>
          <p className="section-copy mt-6 max-w-xl">{hero.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={`#${hero.buttonHref}`} className="btn-primary">
              {hero.buttonText}
              <IconArrowRight />
            </a>
            <a href="#projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-picto-primary">
              View my work
              <IconArrowRight />
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[520px] justify-center fade-up">
          <div className="relative float-soft">
            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-fuchsia-200/70 via-white to-emerald-100/80 blur-[2px] dark:from-picto-primary/30 dark:via-[#162033] dark:to-emerald-400/15" />
            <div className="absolute -inset-3 rounded-full border border-white/80 dark:border-white/15" />
            <img
              src={hero.image}
              alt={hero.name}
              className="relative z-10 mx-auto h-[320px] w-[320px] rounded-full object-cover object-top shadow-[0_25px_60px_rgba(101,15,160,0.18)] sm:h-[400px] sm:w-[400px]"
            />
          </div>
          <div className="card-shadow-lg absolute bottom-2 left-1/2 z-20 flex w-[min(100%,440px)] -translate-x-1/2 items-center justify-between rounded-3xl border border-white/80 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 dark:border-white/10 dark:bg-[#162033]/95">
            {hero.stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`flex-1 text-center ${index > 0 ? "border-l border-slate-200 dark:border-white/10" : ""}`}
              >
                <div className="text-xl font-semibold text-picto-primary sm:text-2xl">{stat.value}</div>
                <div className="mt-1 text-[11px] text-soft-dark sm:text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
