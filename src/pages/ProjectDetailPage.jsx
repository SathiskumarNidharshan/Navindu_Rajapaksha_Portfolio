import { useEffect, useLayoutEffect, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useSite } from "../context/SiteContext.jsx";
import Footer from "../components/site/Footer.jsx";
import ScrollTop from "../components/site/ScrollTop.jsx";
import ThemeToggle from "../components/site/ThemeToggle.jsx";
import { IconArrowLeft, IconArrowRight } from "../components/site/Icons.jsx";

const storyIcons = {
  Overview: "01",
  "The challenge": "02",
  "The solution": "03",
  Results: "04",
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { content, ready } = useSite();
  const { site, portfolio } = content;

  const project = useMemo(
    () => portfolio.items.find((item) => item.id === id),
    [portfolio.items, id]
  );

  const related = useMemo(() => {
    if (!project) return [];
    return portfolio.items.filter((item) => item.id !== project.id).slice(0, 3);
  }, [portfolio.items, project]);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    html.scrollTop = 0;
    document.body.scrollTop = 0;
    html.style.scrollBehavior = previous;
  }, [id]);

  useEffect(() => {
    if (!project) return;
    document.title = `${project.title} | ${site.name || "Projects"}`;
  }, [project, site.name]);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f3ff] text-sm font-medium text-slate-500 dark:bg-page dark:text-slate-400">
        Loading project…
      </div>
    );
  }

  if (!project) {
    return <Navigate to={{ pathname: "/", hash: "projects" }} replace />;
  }

  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : String(project.technologies || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  const gallery = Array.isArray(project.gallery)
    ? project.gallery.filter(Boolean)
    : [];

  const storyBlocks = [
    ["Overview", project.overview || project.description],
    ["The challenge", project.challenge],
    ["The solution", project.solution],
    ["Results", project.results],
  ].filter(([, text]) => Boolean(text));

  return (
    <div className="min-h-screen bg-page text-ink">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 text-ink backdrop-blur-xl dark:border-white/10 dark:bg-[#0e1624]/90">
        <div className="content flex items-center justify-between gap-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            {site.logoImage ? (
              <img
                src={site.logoImage}
                alt={site.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-fuchsia-100 dark:ring-picto-primary/30"
              />
            ) : (
              <span className="grid h-10 w-10 place-items-center rounded-full bg-picto-primary text-sm font-bold text-white">
                {site.logoText || "B"}
              </span>
            )}
            <span className="text-lg font-semibold text-ink">{site.name}</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-picto-primary bg-white px-4 py-2.5 text-sm font-semibold text-picto-primary transition hover:bg-picto-primary hover:text-white dark:bg-transparent"
            >
              <IconArrowLeft /> Back to projects
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-[78vh] overflow-hidden">
          <img
            src={project.image}
            alt=""
            className="absolute inset-0 h-full w-full scale-105 object-cover"
            aria-hidden="true"
          />
          <div className="project-hero-mask absolute inset-0" />
          <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-picto-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="content relative flex min-h-[78vh] flex-col justify-end pb-14 pt-28 md:pb-20 md:pt-36">
            <div className="project-fade max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                  {project.category || "Case Study"}
                </span>
                {project.year ? (
                  <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
                    {project.year}
                  </span>
                ) : null}
              </div>
              <h1 className="project-fade project-fade-delay-1 mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                {project.title}
              </h1>
              <p className="project-fade project-fade-delay-2 mt-5 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
                {project.description}
              </p>
              <div className="project-fade project-fade-delay-3 mt-8 flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    View live project <IconArrowRight />
                  </a>
                ) : null}
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 bg-transparent px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#132238]"
                >
                  Start a project
                </Link>
              </div>
            </div>

            <div className="project-fade project-fade-delay-4 mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Client", project.client || "Confidential"],
                ["Year", project.year || "—"],
                ["Role", project.role || "UI/UX Design"],
                ["Category", project.category || "Design"],
              ].map(([label, value]) => (
                <div key={label} className="project-meta-chip">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative -mt-8 md:-mt-12">
          <div className="content">
            <div className="overflow-hidden rounded-[32px] border border-white bg-white shadow-[0_30px_80px_rgba(19,34,56,0.16)] ring-1 ring-slate-100 dark:border-white/10 dark:bg-surface dark:ring-white/10 dark:shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
              <img
                src={project.image}
                alt={project.title}
                className="max-h-[620px] w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="content grid gap-8 py-14 md:grid-cols-[1.45fr_0.85fr] md:py-20">
          <div className="space-y-6">
            {storyBlocks.map(([label, text], index) => (
              <article
                key={label}
                className="project-story-card project-fade"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <div className="flex items-start justify-between gap-4 pl-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-picto-primary">
                      {label}
                    </p>
                    <p className="mt-4 whitespace-pre-wrap text-base leading-8 text-muted">
                      {text}
                    </p>
                  </div>
                  <span className="hidden shrink-0 text-3xl font-semibold text-fuchsia-100 sm:block dark:text-picto-primary/25">
                    {storyIcons[label] || String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-6 md:sticky md:top-28 md:self-start">
            <div className="overflow-hidden rounded-[28px] border border-fuchsia-100 bg-[linear-gradient(165deg,#faf5ff_0%,#ffffff_55%,#f8fafc_100%)] p-7 shadow-[0_18px_40px_rgba(153,41,251,0.08)] dark:border-picto-primary/20 dark:bg-[linear-gradient(165deg,#1a2033_0%,#162033_55%,#141e2e_100%)] dark:shadow-[0_18px_40px_rgba(153,41,251,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-picto-primary">
                Stack
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">Technologies</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {technologies.length ? (
                  technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-fuchsia-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-picto-primary shadow-sm transition hover:-translate-y-0.5 hover:border-picto-primary/40 hover:shadow-md dark:border-picto-primary/25 dark:bg-picto-primary/10"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted">No technologies listed yet.</p>
                )}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] bg-navy p-7 text-white shadow-[0_24px_50px_rgba(19,34,56,0.25)]">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-picto-primary/40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 left-0 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-200">
                Next step
              </p>
              <h2 className="relative mt-2 text-2xl font-semibold">Need a similar project?</h2>
              <p className="relative mt-3 text-sm leading-7 text-slate-300">
                Let’s discuss your goals and turn them into a polished digital experience.
              </p>
              <Link to="/#contact" className="btn-primary relative mt-6">
                Contact me <IconArrowRight />
              </Link>
            </div>
          </aside>
        </section>

        {gallery.length ? (
          <section className="relative overflow-hidden bg-[#f6f3ff] py-16 md:py-24 dark:bg-surface-alt">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-picto-primary/20 blur-3xl" />
            <div className="content relative">
              <div className="mx-auto max-w-2xl text-center">
                <p className="section-eyebrow">Visuals</p>
                <h2 className="section-title mt-4">Project gallery</h2>
                <p className="mt-4 text-muted">
                  A closer look at the interface moments and layouts from this case study.
                </p>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {gallery.map((src, index) => (
                  <div
                    key={`${src}-${index}`}
                    className={`project-gallery-item group ${index % 3 === 0 ? "md:col-span-2" : ""}`}
                  >
                    <img
                      src={src}
                      alt={`${project.title} gallery ${index + 1}`}
                      className={`w-full object-cover ${index % 3 === 0 ? "h-[420px]" : "h-80"}`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {related.length ? (
          <section className="py-16 md:py-24">
            <div className="content">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Continue exploring</p>
                  <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
                    Related projects
                  </h2>
                </div>
                <Link
                  to="/#projects"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-picto-primary transition hover:gap-3"
                >
                  View all projects <IconArrowRight />
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    to={`/projects/${item.id}`}
                    className="site-card group overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-52 w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-70" />
                      <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-picto-primary dark:bg-[#162033]/90">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-ink transition group-hover:text-picto-primary">
                        {item.title}
                      </h3>
                      <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-picto-primary transition group-hover:gap-3">
                        {item.linkLabel || "Case Study"} <IconArrowRight />
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
      <ScrollTop />
    </div>
  );
}
