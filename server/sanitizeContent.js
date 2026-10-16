/** Normalize footer / nav / legacy template text after load. */
import { withProjectDetails } from "../src/data/projectDetails.js";

export function sanitizeContent(data) {
  if (!data) return { data, changed: false };

  let next = data;
  let changed = false;

  // Remove blog from navigation (section retired)
  if (Array.isArray(next.nav?.items)) {
    const filtered = next.nav.items
      .filter((item) => item.id !== "blog" && item.href !== "blog")
      .map((item) =>
        item.id === "portfolio" || item.href === "portfolio" || item.href === "projects"
          ? { ...item, label: "Projects", href: "projects" }
          : item
      );
    const navChanged =
      filtered.length !== next.nav.items.length ||
      filtered.some(
        (item, i) =>
          item.label !== next.nav.items[i]?.label ||
          item.href !== next.nav.items[i]?.href
      );
    if (navChanged) {
      next = { ...next, nav: { ...next.nav, items: filtered } };
      changed = true;
    }
  }

  if (next.portfolio && /^portfolios?$/i.test(String(next.portfolio.title || ""))) {
    next = { ...next, portfolio: { ...next.portfolio, title: "Projects" } };
    changed = true;
  }

  if (next.portfolio?.moreHref === "#portfolio" || next.portfolio?.moreHref === "portfolio") {
    next = {
      ...next,
      portfolio: { ...next.portfolio, moreHref: "#projects" },
    };
    changed = true;
  }

  if (next.about?.primaryHref === "portfolio") {
    next = { ...next, about: { ...next.about, primaryHref: "projects" } };
    changed = true;
  }

  if (Array.isArray(next.portfolio?.items)) {
    const items = next.portfolio.items.map((item) => {
      if (item?.overview && item?.challenge && Array.isArray(item?.technologies)) {
        return item;
      }
      return withProjectDetails(item);
    });
    const detailsChanged = items.some((item, index) => item !== next.portfolio.items[index]);
    if (detailsChanged) {
      next = { ...next, portfolio: { ...next.portfolio, items } };
      changed = true;
    }
  }

  if (next.blog) {
    const { blog: _removed, ...rest } = next;
    next = rest;
    changed = true;
  }

  if (!next.footer) {
    return { data: next, changed };
  }

  const footer = { ...next.footer };
  let footerChanged = false;

  let copyright = "Copyright \u00A9 {year} NEXVIA INNOVATION.";
  if (copyright !== footer.copyright) {
    footer.copyright = copyright;
    footerChanged = true;
  }

  if (
    !footer.credit ||
    /\uFFFD|\?{2,}|❤️|with\s+\u2764/i.test(String(footer.credit))
  ) {
    footer.credit = "Developed by NEXVIA INNOVATION";
    footerChanged = true;
  }

  if (footerChanged) {
    next = { ...next, footer };
    changed = true;
  }

  return { data: next, changed };
}
