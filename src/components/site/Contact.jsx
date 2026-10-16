import { useState } from "react";
import { useSite } from "../../context/SiteContext.jsx";
import { ContactIcon, SocialIcon } from "./Icons.jsx";
import SectionHeader from "./SectionHeader.jsx";

const emptyForm = {
  name: "",
  email: "",
  location: "",
  budget: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const { content, addMessage } = useSite();
  const { contact, about } = content;
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await addMessage(form);
      setForm(emptyForm);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch {
      setSent(false);
      setError("Could not send your message. Please try again in a moment.");
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-surface-soft py-16 md:py-24">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-picto-primary/15" />
      <div className="content relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[32px] border border-white bg-white p-8 shadow-[0_20px_60px_rgba(19,34,56,0.06)] md:p-10 dark:border-white/10 dark:bg-surface dark:shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
          <SectionHeader eyebrow="Get in touch" title={contact.title} subtitle={contact.description} />
          <div className="mt-8 space-y-4">
            {contact.details.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-4 dark:border-white/10 dark:bg-white/5"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-fuchsia-50 text-picto-primary dark:bg-picto-primary/15">
                  <ContactIcon name={item.icon} />
                </span>
                <div>
                  <p className="text-sm text-soft-dark">{item.title}</p>
                  <p className="font-semibold text-ink">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            {about.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full bg-soft-white text-ink transition hover:bg-picto-primary hover:text-white"
              >
                <SocialIcon label={social.label} />
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-fuchsia-100 bg-white p-8 shadow-[0_20px_60px_rgba(153,41,251,0.08)] md:p-10 dark:border-picto-primary/20 dark:bg-surface dark:shadow-[0_20px_60px_rgba(153,41,251,0.12)]">
          <h3 className="text-2xl font-semibold text-ink">{contact.formTitle}</h3>
          <p className="mt-2 text-sm leading-7 text-muted">{contact.formDescription}</p>
          <form onSubmit={onSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
            <input
              className="admin-input"
              name="name"
              placeholder={contact.fields.name}
              value={form.name}
              onChange={onChange}
              required
            />
            <input
              className="admin-input"
              type="email"
              name="email"
              placeholder={contact.fields.email}
              value={form.email}
              onChange={onChange}
              required
            />
            <input
              className="admin-input"
              name="location"
              placeholder={contact.fields.location}
              value={form.location}
              onChange={onChange}
            />
            <input
              className="admin-input"
              name="budget"
              placeholder={contact.fields.budget}
              value={form.budget}
              onChange={onChange}
              required
            />
            <input
              className="admin-input sm:col-span-2"
              name="subject"
              placeholder={contact.fields.subject}
              value={form.subject}
              onChange={onChange}
              required
            />
            <textarea
              className="admin-input min-h-32 sm:col-span-2"
              name="message"
              placeholder={contact.fields.message}
              value={form.message}
              onChange={onChange}
              required
            />
            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary">
                {contact.submitText}
              </button>
              {sent ? (
                <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                  Message sent. The admin can view it in the dashboard.
                </p>
              ) : null}
              {error ? (
                <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
                  {error}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
