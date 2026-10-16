/** Default detail fields for a portfolio project card. */
export function buildProjectDetails(item = {}) {
  const title = item.title || "Project";
  return {
    client: item.client || "Client project",
    year: item.year || "2024",
    role: item.role || "UI/UX Designer",
    liveUrl: item.liveUrl || "",
    overview:
      item.overview ||
      item.description ||
      `${title} is a carefully crafted digital product experience focused on clarity, usability, and polished visual design.`,
    challenge:
      item.challenge ||
      "The main challenge was to simplify complex workflows into an interface that feels fast, intuitive, and visually consistent across devices.",
    solution:
      item.solution ||
      "I mapped user journeys, designed a clear information architecture, and built a responsive interface with reusable components and thoughtful micro-interactions.",
    results:
      item.results ||
      "The final experience improved clarity for key tasks, strengthened brand presence, and delivered a smoother end-to-end product flow.",
    technologies: Array.isArray(item.technologies)
      ? item.technologies
      : item.technologies
        ? String(item.technologies)
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean)
        : ["Figma", "UI Design", "UX Research", "Prototyping"],
    gallery: Array.isArray(item.gallery)
      ? item.gallery.filter(Boolean)
      : item.image
        ? [item.image]
        : [],
  };
}

export function withProjectDetails(item) {
  return {
    ...item,
    ...buildProjectDetails(item),
    linkLabel: item.linkLabel || "Case Study",
  };
}
