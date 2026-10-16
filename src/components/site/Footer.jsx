import { useSite } from "../../context/SiteContext.jsx";

export default function Footer() {
  const { content } = useSite();
  const { site, nav, footer } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy py-14 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-picto-primary/20 blur-3xl" />
      <div className="content relative flex flex-col items-center gap-7 text-center">
        <a href="#introduction" className="flex items-center gap-3">
          {site.logoImage ? (
            <img
              src={site.logoImage}
              alt={site.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-white/15"
            />
          ) : null}
          <span className="text-2xl font-semibold">{site.name}</span>
        </a>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
          {nav.items.map((item) => (
            <a key={item.id} href={`#${item.href}`} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
          <a href={`#${nav.contactHref}`} className="transition hover:text-white">
            {nav.contactLabel}
          </a>
        </nav>
        <div className="h-px w-full bg-white/10" />
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-left text-sm text-slate-400">
            {String(footer.copyright || "Copyright © {year} NEXVIA INNOVATION.")
              .replace(/\uFFFD/g, "©")
              .replace(/Copyright\s+[^\w{]*\s*/i, "Copyright © ")
              .replace("{year}", String(year))}
          </p>
          <p className="text-left text-sm text-slate-400 sm:text-right">
            {footer.credit || "Developed by NEXVIA INNOVATION"}
          </p>
        </div>
      </div>
    </footer>
  );
}
