import { useEffect, useMemo, useState } from "react";
import { useSite } from "../../context/SiteContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar() {
  const { content } = useSite();
  const { site, nav } = content;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const menuItems = useMemo(() => {
    const items = [...(nav.items || [])];
    const contactHref = nav.contactHref || "contact";
    const alreadyIncluded = items.some(
      (item) => item.href === contactHref || item.id === "contact"
    );
    if (!alreadyIncluded) {
      items.push({
        id: "contact",
        label: nav.contactLabel || "Contact",
        href: contactHref,
      });
    }
    return items;
  }, [nav.items, nav.contactHref, nav.contactLabel]);

  const [active, setActive] = useState(menuItems[0]?.href || "introduction");

  useEffect(() => {
    const sectionIds = menuItems.map((item) => item.href).filter(Boolean);

    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const marker = window.scrollY + 140;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        const top = section.offsetTop;
        if (top <= marker) current = id;
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (nearBottom) current = sectionIds[sectionIds.length - 1];

      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [menuItems]);

  const linkClass = (href) =>
    `relative text-[15px] font-medium transition-colors duration-300 ${
      active === href
        ? "text-picto-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-picto-primary"
        : "text-muted hover:text-picto-primary dark:text-slate-300 dark:hover:text-picto-primary"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b ${
        scrolled
          ? "border-gray-200/80 bg-white/90 shadow-[0_8px_30px_rgba(19,34,56,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0e1624]/90 dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          : "border-transparent bg-white/80 backdrop-blur dark:bg-[#0e1624]/80"
      }`}
    >
      <div className="content relative flex h-20 items-center justify-between">
        <a href="#introduction" className="relative z-10 flex items-center gap-2.5">
          {site.logoImage ? (
            <img
              src={site.logoImage}
              alt={site.name}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-fuchsia-100 dark:ring-picto-primary/30"
            />
          ) : (
            <span className="grid h-10 w-10 place-items-center rounded-full bg-picto-primary text-lg font-bold text-white">
              {site.logoText}
            </span>
          )}
          <span className="text-xl font-semibold text-ink">{site.name}</span>
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {menuItems.map((item) => (
            <a key={item.id} href={`#${item.href}`} className={`${linkClass(item.href)} cursor-pointer`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-ink lg:hidden dark:border-white/10 dark:text-slate-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="text-xl">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden dark:border-white/10 dark:bg-[#0e1624]">
          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.href}`}
                onClick={() => setOpen(false)}
                className={`py-1 ${
                  active === item.href ? "font-semibold text-picto-primary" : "text-ink hover:text-picto-primary"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
