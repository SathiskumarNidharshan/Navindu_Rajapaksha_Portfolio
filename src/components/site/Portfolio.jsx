import { Link } from "react-router-dom";
import { useSite } from "../../context/SiteContext.jsx";
import { IconArrowRight } from "./Icons.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function Portfolio() {
  const { content } = useSite();
  const { portfolio } = content;

  return (
    <section id="projects" className="scroll-mt-24 bg-surface-alt py-16 md:py-24">
      <div className="content">
        <SectionHeader
          align="center"
          eyebrow="Selected work"
          title={portfolio.title}
          subtitle={portfolio.subtitle}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolio.items.map((item) => (
            <article key={item.id} className="site-card group overflow-hidden">
              <Link to={`/projects/${item.id}`} className="block">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/35 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
              </Link>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-picto-primary">
                  {item.category}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-ink">
                  <Link to={`/projects/${item.id}`} className="transition hover:text-picto-primary">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
                <Link
                  to={`/projects/${item.id}`}
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-picto-primary transition hover:gap-3"
                >
                  {item.linkLabel || "Case Study"} <IconArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
        {portfolio.moreButton ? (
          <div className="mt-12 text-center">
            <a href={portfolio.moreHref || "#projects"} className="btn-primary">
              {portfolio.moreButton}
              <IconArrowRight />
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
