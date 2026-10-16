import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ConfirmDialog,
  Field,
  ImageField,
  ItemCard,
  ListToolbar,
  SaveBar,
  SectionCard,
  StatCard,
  Tip,
} from "../../components/admin/Fields.jsx";
import { AdminNavIcon } from "../../components/admin/AdminNavIcons.jsx";
import { useSite } from "../../context/SiteContext.jsx";

const tabGroups = [
  {
    title: "Dashboard",
    items: [{ id: "overview", label: "Overview" }],
  },
  {
    title: "Homepage",
    items: [
      { id: "site", label: "Site & Nav" },
      { id: "hero", label: "Hero" },
      { id: "about", label: "About" },
      { id: "process", label: "Process" },
      { id: "portfolio", label: "Projects" },
      { id: "cta", label: "CTA Banner" },
      { id: "services", label: "Services" },
      { id: "clients", label: "Clients" },
      { id: "testimonials", label: "Testimonials" },
      { id: "contact", label: "Contact" },
    ],
  },
  {
    title: "System",
    items: [
      { id: "messages", label: "Messages" },
      { id: "settings", label: "Settings" },
    ],
  },
];

const tabs = tabGroups.flatMap((group) => group.items);

const tabMeta = {
  overview: {
    title: "Dashboard overview",
    subtitle: "Quick stats and shortcuts for managing your portfolio website.",
  },
  site: {
    title: "Site branding & navigation",
    subtitle: "Control logo, browser title, favicon, and top menu links.",
  },
  hero: {
    title: "Hero section",
    subtitle: "Edit the first impression visitors see on your homepage.",
  },
  about: {
    title: "About section",
    subtitle: "Update your bio, photo, social links, and CV button.",
  },
  process: {
    title: "Work process",
    subtitle: "Describe the steps you follow when delivering projects.",
  },
  portfolio: {
    title: "Portfolio projects",
    subtitle: "Add case studies with images, categories, and descriptions.",
  },
  cta: {
    title: "Call to action",
    subtitle: "Edit the dark banner that invites visitors to collaborate.",
  },
  services: {
    title: "Services",
    subtitle: "Explain what you offer and how you help clients.",
  },
  clients: {
    title: "Happy clients",
    subtitle: "Update the scrolling client names on the homepage.",
  },
  testimonials: {
    title: "Testimonials",
    subtitle: "Showcase client feedback with quotes and roles.",
  },
  contact: {
    title: "Contact & footer",
    subtitle: "Manage contact details, form labels, and footer text.",
  },
  messages: {
    title: "Contact inbox",
    subtitle: "Review messages submitted from the public contact form.",
  },
  settings: {
    title: "Admin settings",
    subtitle: "Update login credentials or export and reset website content.",
  },
};

function uid(prefix) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

export default function AdminDashboard() {
  const {
    content,
    setContent,
    saveContent,
    resetContent,
    importContent,
    logout,
    credentials,
    updateCredentials,
    messages,
    deleteMessage,
    clearMessages,
    ready,
  } = useSite();
  const [tab, setTab] = useState("overview");
  const [saved, setSaved] = useState("");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState("");
  const [credForm, setCredForm] = useState(credentials);
  const [confirmAction, setConfirmAction] = useState(null);
  const [viewingMessage, setViewingMessage] = useState(null);

  useEffect(() => {
    setCredForm(credentials);
  }, [credentials]);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.scrollTop = 0;
    document.body.scrollTop = 0;
    html.style.scrollBehavior = previous;
  }, [tab]);

  const flash = (text) => {
    setSaved(text);
    setTimeout(() => setSaved(""), 2500);
  };

  const persist = async (sectionId, label = "Saved to database.") => {
    setSaving(true);
    try {
      await saveContent();
      flash(label);
      setLastSaved(sectionId || "all");
    } catch (err) {
      flash(err.message || "Could not save to database.");
    } finally {
      setSaving(false);
    }
  };

  const patch = (section, data) => {
    setContent((prev) => ({ ...prev, [section]: { ...prev[section], ...data } }));
  };

  const updateList = (section, key, index, field, value) => {
    setContent((prev) => {
      const list = [...prev[section][key]];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [section]: { ...prev[section], [key]: list } };
    });
  };

  const removeList = (section, key, index) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: prev[section][key].filter((_, i) => i !== index) },
    }));
  };

  const addList = (section, key, item) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: [...prev[section][key], item] },
    }));
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "homepage-content.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        await importContent(JSON.parse(String(reader.result)));
        flash("Content imported.");
      } catch {
        flash("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const unread = messages.length;
  const counts = useMemo(
    () => ({
      projects: content.portfolio.items.length,
      services: content.services.items.length,
      clients: content.clients.items.length,
      testimonials: content.testimonials.items.length,
      messages: unread,
    }),
    [content, unread]
  );

  const currentMeta = tabMeta[tab] || tabMeta.overview;
  const currentTab = tabs.find((item) => item.id === tab);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f3ff] text-sm font-medium text-slate-500">
        Loading admin panel…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f3ff_0%,#f5f7fb_220px,#eef1f6_100%)]">
      <header className="sticky top-0 z-30 border-b border-white/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between gap-4 px-4 py-4 xl:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-picto-primary to-violet-700 text-sm font-bold text-white shadow-md shadow-fuchsia-200">
              {content.site.logoText || "A"}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-picto-primary">Admin CMS</p>
              <h1 className="text-lg font-semibold text-ink">{content.site.name} Content Manager</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {saved ? (
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                {saved}
              </span>
            ) : null}
            <button
              type="button"
              disabled={saving}
              onClick={() => persist("all", "Saved to database.")}
              className="rounded-xl bg-picto-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-picto-primary-dark disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save all"}
            </button>
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:border-picto-primary hover:text-picto-primary"
            >
              View website
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full gap-6 px-4 py-6 lg:grid-cols-[270px_1fr] xl:px-6">
        <aside className="h-fit overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(19,34,56,0.06)] lg:sticky lg:top-24">
          <div className="border-b border-slate-100 bg-gradient-to-br from-fuchsia-50 to-white px-4 py-4">
            <p className="text-sm font-semibold text-ink">Signed in as</p>
            <p className="mt-1 text-sm text-slate-500">{credentials.username || "admin"}</p>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs text-slate-500 ring-1 ring-slate-100">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Database connected
            </div>
          </div>
          <nav className="max-h-[70vh] space-y-4 overflow-y-auto p-3">
            {tabGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {group.title}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTab(item.id)}
                      className={`group flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm transition ${
                        tab === item.id
                          ? "bg-gradient-to-r from-fuchsia-50 to-violet-50 font-semibold text-picto-primary ring-1 ring-fuchsia-100"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`grid h-9 w-9 place-items-center rounded-xl transition ${
                            tab === item.id
                              ? "bg-gradient-to-br from-picto-primary to-violet-600 text-white shadow-md shadow-fuchsia-200"
                              : "bg-slate-100 text-slate-500 group-hover:bg-fuchsia-50 group-hover:text-picto-primary"
                          }`}
                        >
                          <AdminNavIcon id={item.id} />
                        </span>
                        {item.label}
                      </span>
                      {item.id === "messages" && unread > 0 ? (
                        <span className="rounded-full bg-picto-primary px-2 py-0.5 text-[11px] text-white">
                          {unread}
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-picto-primary">
                  {currentTab?.label || "Section"}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-ink">{currentMeta.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{currentMeta.subtitle}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-right">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">Live site</p>
                <p className="text-sm font-semibold text-ink">{content.site.title}</p>
              </div>
            </div>
          </div>

          {tab === "overview" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard
                  label="Portfolio projects"
                  value={counts.projects}
                  hint="Open portfolio editor →"
                  tone="violet"
                  onClick={() => setTab("portfolio")}
                />
                <StatCard
                  label="Services"
                  value={counts.services}
                  hint="Open services editor →"
                  tone="emerald"
                  onClick={() => setTab("services")}
                />
                <StatCard
                  label="Inbox messages"
                  value={counts.messages}
                  hint="Open messages →"
                  tone="amber"
                  onClick={() => setTab("messages")}
                />
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <SectionCard
                  title="Website snapshot"
                  description="Current content counts across key homepage sections."
                  badge="Live"
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Clients", counts.clients],
                      ["Testimonials", counts.testimonials],
                      ["Process steps", content.process.steps.length],
                      ["Menu links", content.nav.items.length],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                        <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
                        <p className="mt-1 text-xl font-semibold text-ink">{value}</p>
                      </div>
                    ))}
                  </div>
                  <Tip>
                    Edit any sidebar section, then click <strong>Save</strong> so the public website updates from
                    the SQLite database.
                  </Tip>
                  <SaveBar
                    label="Save all changes"
                    saving={saving}
                    saved={lastSaved === "all"}
                    onSave={() => persist("all", "Saved to database.")}
                  />
                </SectionCard>

                <SectionCard
                  title="Quick actions"
                  description="Jump straight into the most common editing tasks."
                >
                  <div className="grid gap-3">
                    {[
                      ["Update branding & logo", "site"],
                      ["Edit hero intro", "hero"],
                      ["Add a portfolio project", "portfolio"],
                      ["Review contact messages", "messages"],
                    ].map(([label, id]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setTab(id)}
                        className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-ink transition hover:border-picto-primary hover:bg-fuchsia-50 hover:text-picto-primary"
                      >
                        <span>{label}</span>
                        <span>→</span>
                      </button>
                    ))}
                  </div>
                  <div className="rounded-2xl bg-navy px-4 py-4 text-white">
                    <p className="text-sm font-semibold">Public website</p>
                    <p className="mt-1 text-sm text-white/70">
                      Preview how visitors see your latest published content.
                    </p>
                    <Link
                      to="/"
                      className="mt-3 inline-flex rounded-xl bg-picto-primary px-4 py-2 text-sm font-semibold text-white hover:bg-picto-primary-dark"
                    >
                      Open homepage
                    </Link>
                  </div>
                </SectionCard>
              </div>
            </>
          )}

          {tab === "site" && (
            <>
              <SectionCard
                title="Branding"
                description="These details appear in the navbar, footer, browser tab title, and favicon."
                badge="Identity"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Site name" value={content.site.name} onChange={(v) => patch("site", { name: v })} />
                  <Field label="Logo text" value={content.site.logoText} onChange={(v) => patch("site", { logoText: v })} />
                  <Field label="Browser title" value={content.site.title} onChange={(v) => patch("site", { title: v })} />
                </div>
                <ImageField
                  label="Logo image"
                  value={content.site.logoImage}
                  onChange={(v) => patch("site", { logoImage: v, favicon: v })}
                />
                <SaveBar saving={saving} saved={lastSaved === "branding"} onSave={() => persist("branding", "Branding saved.")} />
              </SectionCard>
              <SectionCard
                title="Navigation"
                description="Menu labels and section targets used by the sticky top navigation."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Contact button" value={content.nav.contactLabel} onChange={(v) => patch("nav", { contactLabel: v })} />
                  <Field label="Contact section id" value={content.nav.contactHref} onChange={(v) => patch("nav", { contactHref: v })} />
                </div>
                <ListToolbar
                  addLabel="Add menu item"
                  onAdd={() =>
                    addList("nav", "items", { id: uid("nav"), label: "New page", href: "introduction" })
                  }
                />
                {content.nav.items.map((item, index) => (
                  <ItemCard key={item.id} title={item.label || "Menu item"} onRemove={() => removeList("nav", "items", index)}>
                    <Field label="Label" value={item.label} onChange={(v) => updateList("nav", "items", index, "label", v)} />
                    <Field label="Section id" value={item.href} onChange={(v) => updateList("nav", "items", index, "href", v)} />
                  </ItemCard>
                ))}
                <SaveBar saving={saving} saved={lastSaved === "nav"} onSave={() => persist("nav", "Navigation saved.")} />
              </SectionCard>
            </>
          )}

          {tab === "hero" && (
            <SectionCard
              title="Hero section"
              description="Eyebrow label, greeting, name, intro text, photo, CTA button, and experience stats."
              badge="First fold"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Eyebrow label"
                  value={content.hero.eyebrow ?? "Freelance UI / UX Designer"}
                  onChange={(v) => patch("hero", { eyebrow: v })}
                  hint="Small purple badge above the main heading"
                />
                <Field label="Greeting" value={content.hero.greeting} onChange={(v) => patch("hero", { greeting: v })} />
                <Field label="Name" value={content.hero.name} onChange={(v) => patch("hero", { name: v })} />
                <Field label="Button text" value={content.hero.buttonText} onChange={(v) => patch("hero", { buttonText: v })} />
                <Field label="Button section" value={content.hero.buttonHref} onChange={(v) => patch("hero", { buttonHref: v })} />
              </div>
              <Field label="Description" textarea value={content.hero.description} onChange={(v) => patch("hero", { description: v })} />
              <ImageField label="Hero photo" value={content.hero.image} onChange={(v) => patch("hero", { image: v })} />
              {content.hero.stats.map((stat, index) => (
                <ItemCard key={stat.id} title={stat.label || "Stat"} onRemove={() => removeList("hero", "stats", index)}>
                  <Field label="Value" value={stat.value} onChange={(v) => updateList("hero", "stats", index, "value", v)} />
                  <Field label="Label" value={stat.label} onChange={(v) => updateList("hero", "stats", index, "label", v)} />
                </ItemCard>
              ))}
              <ListToolbar
                addLabel="Add stat"
                onAdd={() => addList("hero", "stats", { id: uid("stat"), value: "0", label: "New stat" })}
              />
              <SaveBar saving={saving} saved={lastSaved === "hero"} onSave={() => persist("hero", "Hero saved.")} />
            </SectionCard>
          )}

          {tab === "about" && (
            <SectionCard
              title="About section"
              description="Professional summary, profile photo, social profiles, and CV download."
            >
              <Field label="Title" value={content.about.title} onChange={(v) => patch("about", { title: v })} />
              <Field label="Paragraph 1" textarea value={content.about.paragraph1} onChange={(v) => patch("about", { paragraph1: v })} />
              <Field label="Paragraph 2" textarea value={content.about.paragraph2} onChange={(v) => patch("about", { paragraph2: v })} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Primary button" value={content.about.primaryButton} onChange={(v) => patch("about", { primaryButton: v })} />
                <Field label="Primary section" value={content.about.primaryHref} onChange={(v) => patch("about", { primaryHref: v })} />
                <Field label="CV button" value={content.about.secondaryButton} onChange={(v) => patch("about", { secondaryButton: v })} />
                <Field label="CV URL" value={content.about.cvUrl} onChange={(v) => patch("about", { cvUrl: v })} />
              </div>
              <ImageField label="About photo" value={content.about.image} onChange={(v) => patch("about", { image: v })} />
              {content.about.socials.map((social, index) => (
                <ItemCard key={social.id} title={social.label || "Social"} onRemove={() => removeList("about", "socials", index)}>
                  <Field label="Label" value={social.label} onChange={(v) => updateList("about", "socials", index, "label", v)} />
                  <Field label="URL" value={social.url} onChange={(v) => updateList("about", "socials", index, "url", v)} />
                </ItemCard>
              ))}
              <ListToolbar
                addLabel="Add social"
                onAdd={() => addList("about", "socials", { id: uid("social"), label: "LinkedIn", url: "https://" })}
              />
              <SaveBar saving={saving} saved={lastSaved === "about"} onSave={() => persist("about", "About saved.")} />
            </SectionCard>
          )}

          {tab === "process" && (
            <SectionCard
              title="Work process"
              description="Explain your workflow with numbered steps and short descriptions."
            >
              <Field label="Title" value={content.process.title} onChange={(v) => patch("process", { title: v })} />
              <Field label="Paragraph 1" textarea value={content.process.paragraph1} onChange={(v) => patch("process", { paragraph1: v })} />
              <Field label="Paragraph 2" textarea value={content.process.paragraph2} onChange={(v) => patch("process", { paragraph2: v })} />
              {content.process.steps.map((step, index) => (
                <ItemCard key={step.id} title={step.title || "Step"} onRemove={() => removeList("process", "steps", index)}>
                  <Field label="Number" value={step.number} onChange={(v) => updateList("process", "steps", index, "number", v)} />
                  <Field label="Title" value={step.title} onChange={(v) => updateList("process", "steps", index, "title", v)} />
                  <Field label="Icon (research/analyze/design/launch)" value={step.icon} onChange={(v) => updateList("process", "steps", index, "icon", v)} />
                  <Field label="Description" textarea value={step.description} onChange={(v) => updateList("process", "steps", index, "description", v)} />
                </ItemCard>
              ))}
              <ListToolbar
                addLabel="Add step"
                onAdd={() =>
                  addList("process", "steps", {
                    id: uid("step"),
                    number: String(content.process.steps.length + 1),
                    title: "New step",
                    description: "Describe this step.",
                    icon: "research",
                  })
                }
              />
              <SaveBar saving={saving} saved={lastSaved === "process"} onSave={() => persist("process", "Process saved.")} />
            </SectionCard>
          )}

          {tab === "portfolio" && (
            <SectionCard
              title="Portfolio"
              description="Project cards shown in the homepage grid. Add images and case study links."
              badge="Projects"
            >
              <Field label="Title" value={content.portfolio.title} onChange={(v) => patch("portfolio", { title: v })} />
              <Field label="Subtitle" textarea value={content.portfolio.subtitle} onChange={(v) => patch("portfolio", { subtitle: v })} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="More button" value={content.portfolio.moreButton} onChange={(v) => patch("portfolio", { moreButton: v })} />
                <Field label="More link" value={content.portfolio.moreHref} onChange={(v) => patch("portfolio", { moreHref: v })} />
              </div>
              <ListToolbar
                addLabel="Add project"
                onAdd={() =>
                  addList("portfolio", "items", {
                    id: uid("p"),
                    image: "/images/portfolio/card-1.png",
                    category: "UI-UX DESIGN",
                    title: "New Project",
                    description: "Project description.",
                    linkLabel: "Case Study",
                    client: "Client name",
                    year: String(new Date().getFullYear()),
                    role: "UI/UX Designer",
                    liveUrl: "",
                    overview: "Short project overview for the details page.",
                    challenge: "Describe the main problem you solved.",
                    solution: "Explain your design and delivery approach.",
                    results: "Share the outcome and impact.",
                    technologies: ["Figma", "UI Design"],
                    gallery: ["/images/portfolio/card-1.png"],
                  })
                }
              />
              {content.portfolio.items.map((item, index) => (
                <ItemCard key={item.id} title={item.title || "Project"} onRemove={() => removeList("portfolio", "items", index)}>
                  <Field label="Category" value={item.category} onChange={(v) => updateList("portfolio", "items", index, "category", v)} />
                  <Field label="Title" value={item.title} onChange={(v) => updateList("portfolio", "items", index, "title", v)} />
                  <Field label="Case Study button" value={item.linkLabel} onChange={(v) => updateList("portfolio", "items", index, "linkLabel", v)} />
                  <Field label="Client" value={item.client || ""} onChange={(v) => updateList("portfolio", "items", index, "client", v)} />
                  <Field label="Year" value={item.year || ""} onChange={(v) => updateList("portfolio", "items", index, "year", v)} />
                  <Field label="Role" value={item.role || ""} onChange={(v) => updateList("portfolio", "items", index, "role", v)} />
                  <Field label="Live URL" value={item.liveUrl || ""} onChange={(v) => updateList("portfolio", "items", index, "liveUrl", v)} />
                  <Field
                    label="Technologies (comma separated)"
                    value={Array.isArray(item.technologies) ? item.technologies.join(", ") : item.technologies || ""}
                    onChange={(v) =>
                      updateList(
                        "portfolio",
                        "items",
                        index,
                        "technologies",
                        v
                          .split(",")
                          .map((part) => part.trim())
                          .filter(Boolean)
                      )
                    }
                  />
                  <div className="md:col-span-2">
                    <Field label="Card description" textarea value={item.description} onChange={(v) => updateList("portfolio", "items", index, "description", v)} />
                  </div>
                  <div className="md:col-span-2">
                    <Field label="Overview" textarea value={item.overview || ""} onChange={(v) => updateList("portfolio", "items", index, "overview", v)} />
                  </div>
                  <div className="md:col-span-2">
                    <Field label="Challenge" textarea value={item.challenge || ""} onChange={(v) => updateList("portfolio", "items", index, "challenge", v)} />
                  </div>
                  <div className="md:col-span-2">
                    <Field label="Solution" textarea value={item.solution || ""} onChange={(v) => updateList("portfolio", "items", index, "solution", v)} />
                  </div>
                  <div className="md:col-span-2">
                    <Field label="Results" textarea value={item.results || ""} onChange={(v) => updateList("portfolio", "items", index, "results", v)} />
                  </div>
                  <div className="md:col-span-2">
                    <Field
                      label="Gallery image paths (one per line)"
                      textarea
                      value={Array.isArray(item.gallery) ? item.gallery.join("\n") : item.gallery || ""}
                      onChange={(v) =>
                        updateList(
                          "portfolio",
                          "items",
                          index,
                          "gallery",
                          v
                            .split("\n")
                            .map((part) => part.trim())
                            .filter(Boolean)
                        )
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <ImageField label="Cover image" value={item.image} onChange={(v) => updateList("portfolio", "items", index, "image", v)} />
                  </div>
                  <p className="md:col-span-2 text-xs text-slate-400">
                    Case Study opens at <code className="text-slate-500">/projects/{item.id}</code>
                  </p>
                </ItemCard>
              ))}
              <SaveBar saving={saving} saved={lastSaved === "portfolio"} onSave={() => persist("portfolio", "Portfolio saved.")} />
            </SectionCard>
          )}

          {tab === "cta" && (
            <SectionCard
              title="Project idea banner"
              description="Dark call-to-action block encouraging visitors to start a project."
            >
              <Field label="Title" value={content.cta.title} onChange={(v) => patch("cta", { title: v })} />
              <Field label="Description" textarea value={content.cta.description} onChange={(v) => patch("cta", { description: v })} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Button text" value={content.cta.buttonText} onChange={(v) => patch("cta", { buttonText: v })} />
                <Field label="Button section" value={content.cta.buttonHref} onChange={(v) => patch("cta", { buttonHref: v })} />
              </div>
              <SaveBar saving={saving} saved={lastSaved === "cta"} onSave={() => persist("cta", "CTA saved.")} />
            </SectionCard>
          )}

          {tab === "services" && (
            <SectionCard
              title="Services / What I do"
              description="Service list with icons: ux, ui, or web."
            >
              <Field label="Title" value={content.services.title} onChange={(v) => patch("services", { title: v })} />
              <Field label="Paragraph 1" textarea value={content.services.paragraph1} onChange={(v) => patch("services", { paragraph1: v })} />
              <Field label="Paragraph 2" textarea value={content.services.paragraph2} onChange={(v) => patch("services", { paragraph2: v })} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Button text" value={content.services.buttonText} onChange={(v) => patch("services", { buttonText: v })} />
                <Field label="Button section" value={content.services.buttonHref} onChange={(v) => patch("services", { buttonHref: v })} />
              </div>
              {content.services.items.map((item, index) => (
                <ItemCard key={item.id} title={item.title || "Service"} onRemove={() => removeList("services", "items", index)}>
                  <Field label="Title" value={item.title} onChange={(v) => updateList("services", "items", index, "title", v)} />
                  <Field label="Icon (ux/ui/web)" value={item.icon} onChange={(v) => updateList("services", "items", index, "icon", v)} />
                  <div className="md:col-span-2">
                    <Field label="Description" textarea value={item.description} onChange={(v) => updateList("services", "items", index, "description", v)} />
                  </div>
                </ItemCard>
              ))}
              <ListToolbar
                addLabel="Add service"
                onAdd={() =>
                  addList("services", "items", {
                    id: uid("svc"),
                    title: "New service",
                    description: "Describe this service.",
                    icon: "ux",
                  })
                }
              />
              <SaveBar saving={saving} saved={lastSaved === "services"} onSave={() => persist("services", "Services saved.")} />
            </SectionCard>
          )}

          {tab === "clients" && (
            <SectionCard
              title="Happy clients"
              description="Names shown in the scrolling clients marquee."
            >
              <Field label="Title" value={content.clients.title} onChange={(v) => patch("clients", { title: v })} />
              <Field label="Subtitle" textarea value={content.clients.subtitle} onChange={(v) => patch("clients", { subtitle: v })} />
              {content.clients.items.map((item, index) => (
                <ItemCard key={item.id} title={item.name || "Client"} onRemove={() => removeList("clients", "items", index)}>
                  <Field label="Name" value={item.name} onChange={(v) => updateList("clients", "items", index, "name", v)} />
                </ItemCard>
              ))}
              <ListToolbar
                addLabel="Add client"
                onAdd={() => addList("clients", "items", { id: uid("c"), name: "New client" })}
              />
              <SaveBar saving={saving} saved={lastSaved === "clients"} onSave={() => persist("clients", "Clients saved.")} />
            </SectionCard>
          )}

          {tab === "testimonials" && (
            <SectionCard
              title="Testimonials"
              description="Client quotes displayed in the testimonial slider."
            >
              <Field label="Title" value={content.testimonials.title} onChange={(v) => patch("testimonials", { title: v })} />
              <Field label="Subtitle" textarea value={content.testimonials.subtitle} onChange={(v) => patch("testimonials", { subtitle: v })} />
              {content.testimonials.items.map((item, index) => (
                <ItemCard key={item.id} title={item.name || "Testimonial"} onRemove={() => removeList("testimonials", "items", index)}>
                  <Field label="Name" value={item.name} onChange={(v) => updateList("testimonials", "items", index, "name", v)} />
                  <Field label="Role" value={item.role} onChange={(v) => updateList("testimonials", "items", index, "role", v)} />
                  <div className="md:col-span-2">
                    <Field label="Message" textarea value={item.message} onChange={(v) => updateList("testimonials", "items", index, "message", v)} />
                  </div>
                  <div className="md:col-span-2">
                    <Field label="Quote" textarea value={item.quote} onChange={(v) => updateList("testimonials", "items", index, "quote", v)} />
                  </div>
                </ItemCard>
              ))}
              <ListToolbar
                addLabel="Add testimonial"
                onAdd={() =>
                  addList("testimonials", "items", {
                    id: uid("t"),
                    name: "New client",
                    role: "Role, Company",
                    message: "Short message.",
                    quote: "Longer quote.",
                  })
                }
              />
              <SaveBar saving={saving} saved={lastSaved === "testimonials"} onSave={() => persist("testimonials", "Testimonials saved.")} />
            </SectionCard>
          )}

          {tab === "contact" && (
            <>
              <SectionCard
                title="Contact copy"
                description="Headings and supporting text for the contact section."
              >
                <Field label="Left title" value={content.contact.title} onChange={(v) => patch("contact", { title: v })} />
                <Field label="Left description" textarea value={content.contact.description} onChange={(v) => patch("contact", { description: v })} />
                <Field label="Form title" value={content.contact.formTitle} onChange={(v) => patch("contact", { formTitle: v })} />
                <Field label="Form description" textarea value={content.contact.formDescription} onChange={(v) => patch("contact", { formDescription: v })} />
                <Field label="Submit button" value={content.contact.submitText} onChange={(v) => patch("contact", { submitText: v })} />
                <SaveBar saving={saving} saved={lastSaved === "contact-copy"} onSave={() => persist("contact-copy", "Contact copy saved.")} />
              </SectionCard>
              <SectionCard
                title="Contact details"
                description="Address, email, and phone shown beside the form."
              >
                {content.contact.details.map((item, index) => (
                  <ItemCard key={item.id} title={item.title || "Detail"} onRemove={() => removeList("contact", "details", index)}>
                    <Field label="Title" value={item.title} onChange={(v) => updateList("contact", "details", index, "title", v)} />
                    <Field label="Value" value={item.value} onChange={(v) => updateList("contact", "details", index, "value", v)} />
                    <Field label="Icon (location/email/phone)" value={item.icon} onChange={(v) => updateList("contact", "details", index, "icon", v)} />
                  </ItemCard>
                ))}
                <ListToolbar
                  addLabel="Add detail"
                  onAdd={() =>
                    addList("contact", "details", { id: uid("d"), icon: "location", title: "New detail", value: "" })
                  }
                />
                <SaveBar saving={saving} saved={lastSaved === "contact-details"} onSave={() => persist("contact-details", "Contact details saved.")} />
              </SectionCard>
              <SectionCard
                title="Form placeholders"
                description="Input labels visitors see in the contact form."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(content.contact.fields).map(([key, value]) => (
                    <Field
                      key={key}
                      label={key}
                      value={value}
                      onChange={(v) =>
                        setContent((prev) => ({
                          ...prev,
                          contact: {
                            ...prev.contact,
                            fields: { ...prev.contact.fields, [key]: v },
                          },
                        }))
                      }
                    />
                  ))}
                </div>
                <SaveBar saving={saving} saved={lastSaved === "contact-fields"} onSave={() => persist("contact-fields", "Form labels saved.")} />
              </SectionCard>
              <SectionCard
                title="Footer"
                description="Copyright and credit text at the bottom of the website."
              >
                <Field label="Copyright" value={content.footer.copyright} onChange={(v) => patch("footer", { copyright: v })} />
                <Field label="Credit line" value={content.footer.credit} onChange={(v) => patch("footer", { credit: v })} />
                <SaveBar saving={saving} saved={lastSaved === "footer"} onSave={() => persist("footer", "Footer saved.")} />
              </SectionCard>
            </>
          )}

          {tab === "messages" && (
            <SectionCard
              title="Contact inbox"
              description="Messages submitted from the homepage form are stored in the database."
              badge={`${messages.length} total`}
            >
              {messages.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
                  <p className="text-lg font-semibold text-ink">No messages yet</p>
                  <p className="mt-2 text-sm text-muted">
                    When visitors submit the contact form, their details will appear here.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-slate-500">{messages.length} message(s) in the inbox</p>
                    <button
                      type="button"
                      onClick={() =>
                        setConfirmAction({
                          title: "Clear all messages?",
                          message: "This will permanently delete every contact form message from the database.",
                          confirmLabel: "Yes, clear all",
                          danger: true,
                          action: async () => {
                            await clearMessages();
                            flash("All messages cleared.");
                          },
                        })
                      }
                      className="rounded-xl px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <article
                        key={msg.id}
                        className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-picto-primary/10 text-sm font-bold text-picto-primary">
                              {(msg.name || "?").slice(0, 1).toUpperCase()}
                            </span>
                            <div>
                              <h4 className="font-semibold text-ink">{msg.name}</h4>
                              <p className="text-sm text-muted">{msg.email}</p>
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setViewingMessage(msg)}
                              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-picto-primary hover:border-picto-primary hover:bg-fuchsia-50"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setConfirmAction({
                                  title: "Delete this message?",
                                  message: `Are you sure you want to delete the message from ${msg.name || "this sender"}?`,
                                  confirmLabel: "Yes, delete",
                                  danger: true,
                                  action: async () => {
                                    await deleteMessage(msg.id);
                                    if (viewingMessage?.id === msg.id) setViewingMessage(null);
                                    flash("Message deleted.");
                                  },
                                })
                              }
                              className="cursor-pointer rounded-xl px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {[msg.subject, msg.budget, msg.location].filter(Boolean).map((chip) => (
                            <span
                              key={chip}
                              className="rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-medium text-picto-primary"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                        <p className="mt-4 line-clamp-2 text-sm leading-7 text-ink">{msg.message}</p>
                        <p className="mt-3 text-xs text-soft-dark">
                          {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </SectionCard>
          )}

          {tab === "settings" && (
            <>
              <SectionCard
                title="Admin login"
                description="Change the username and password used to access this panel."
                badge="Security"
              >
                <Tip>Leave the password blank only if you do not want to change it. Username is always updated.</Tip>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Username"
                    value={credForm.username}
                    onChange={(v) => setCredForm((p) => ({ ...p, username: v }))}
                    hint="Used when signing in to /admin"
                  />
                  <Field
                    label="New password"
                    type="password"
                    value={credForm.password}
                    onChange={(v) => setCredForm((p) => ({ ...p, password: v }))}
                    hint="Enter a new password to replace the current one"
                  />
                </div>
                <SaveBar
                  label="Save login"
                  saving={saving}
                  saved={lastSaved === "credentials"}
                  onSave={async () => {
                    setSaving(true);
                    try {
                      await updateCredentials(credForm);
                      setCredForm((prev) => ({ ...prev, password: "" }));
                      flash("Login details updated.");
                      setLastSaved("credentials");
                    } catch (err) {
                      flash(err.message || "Could not update login.");
                    } finally {
                      setSaving(false);
                    }
                  }}
                />
              </SectionCard>
              <SectionCard
                title="Backup & reset"
                description="Export a JSON backup, import previous content, or restore the original homepage."
              >
                <div className="grid gap-4 md:grid-cols-3">
                  <button
                    type="button"
                    onClick={exportJson}
                    className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm hover:border-picto-primary"
                  >
                    <p className="text-sm font-semibold text-ink">Export JSON</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Download a full backup of the current website content.
                    </p>
                  </button>
                  <label className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm hover:border-picto-primary">
                    <p className="text-sm font-semibold text-ink">Import JSON</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Restore content from a previously exported backup file.
                    </p>
                    <input type="file" accept="application/json" className="hidden" onChange={importJson} />
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setConfirmAction({
                        title: "Reset website content?",
                        message:
                          "This will replace all editable website content with the original homepage defaults. Export a backup first if you need it.",
                        confirmLabel: "Yes, reset",
                        danger: true,
                        action: async () => {
                          await resetContent();
                          flash("Content reset.");
                        },
                      })
                    }
                    className="rounded-3xl border border-rose-100 bg-rose-50 p-5 text-left hover:border-rose-300"
                  >
                    <p className="text-sm font-semibold text-rose-700">Reset to original</p>
                    <p className="mt-2 text-xs leading-5 text-rose-500">
                      Replace all editable content with the default homepage copy.
                    </p>
                  </button>
                </div>
              </SectionCard>
            </>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(confirmAction)}
        title={confirmAction?.title || "Please confirm"}
        message={confirmAction?.message || ""}
        confirmLabel={confirmAction?.confirmLabel || "Confirm"}
        danger={Boolean(confirmAction?.danger)}
        onCancel={() => setConfirmAction(null)}
        onConfirm={async () => {
          const action = confirmAction?.action;
          setConfirmAction(null);
          if (!action) return;
          try {
            await action();
          } catch (err) {
            flash(err.message || "Action failed.");
          }
        }}
      />

      {viewingMessage ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(19,34,56,0.25)]">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-fuchsia-50 via-white to-violet-50 px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-picto-primary">Message details</p>
                <h3 className="mt-1 text-xl font-semibold text-ink">{viewingMessage.name}</h3>
                <p className="text-sm text-muted">{viewingMessage.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setViewingMessage(null)}
                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
            <div className="space-y-4 px-6 py-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Subject", viewingMessage.subject],
                  ["Budget", viewingMessage.budget],
                  ["Location", viewingMessage.location],
                  ["Received", new Date(viewingMessage.createdAt).toLocaleString()],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                    <p className="mt-1 text-sm font-medium text-ink">{value || "—"}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Message</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-ink">{viewingMessage.message}</p>
              </div>
              {viewingMessage.email ? (
                <a
                  href={`mailto:${viewingMessage.email}?subject=${encodeURIComponent(viewingMessage.subject || "Re: your inquiry")}`}
                  className="inline-flex cursor-pointer rounded-xl bg-picto-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-picto-primary-dark"
                >
                  Reply by email
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
