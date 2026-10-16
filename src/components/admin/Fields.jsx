import { useEffect, useState } from "react";

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onCancel?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(19,34,56,0.25)] dark:border-white/10 dark:bg-surface dark:shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
      >
        <div className="border-b border-slate-100 bg-gradient-to-r from-fuchsia-50 via-white to-violet-50 px-6 py-4 dark:border-white/10 dark:from-picto-primary/20 dark:via-surface dark:to-surface">
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{message}</p>
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/5">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold text-white ${
              danger ? "bg-rose-600 hover:bg-rose-700" : "bg-picto-primary hover:bg-picto-primary-dark"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Field({ label, value, onChange, type = "text", textarea = false, rows = 4, hint }) {
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      {textarea ? (
        <textarea
          className="admin-input min-h-28"
          rows={rows}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="admin-input"
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {hint ? <span className="mt-1.5 block text-xs text-slate-400">{hint}</span> : null}
    </label>
  );
}

export function ImageField({ label, value, onChange }) {
  const [error, setError] = useState("");

  const onFile = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) {
      setError("Image is too large for hosting (max ~1.5MB). Put it in public/images and paste the path instead.");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result || ""));
    reader.onerror = () => setError("Could not read that image file.");
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-4 dark:border-white/15 dark:bg-white/5">
      <span className="admin-label">{label}</span>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="relative shrink-0">
          {value ? (
            <img
              src={value}
              alt=""
              className="h-24 w-24 rounded-2xl border border-white object-cover shadow-md ring-1 ring-slate-200"
            />
          ) : (
            <div className="grid h-24 w-24 place-items-center rounded-2xl bg-white text-xs text-slate-400 ring-1 ring-slate-200 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10">
              No image
            </div>
          )}
        </div>
        <div className="flex-1 space-y-3">
          <input
            className="admin-input"
            value={value ?? ""}
            onChange={(e) => {
              setError("");
              onChange(e.target.value);
            }}
            placeholder="/images/... or paste an image URL"
          />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-picto-primary hover:text-picto-primary dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:shadow-none">
            <span>Upload image</span>
            <input type="file" accept="image/*" onChange={onFile} className="hidden" />
          </label>
          <p className="text-xs text-slate-400">
            Prefer files in <code className="text-slate-500">public/images</code> and paths like{" "}
            <code className="text-slate-500">/images/photo.png</code> for Netlify.
          </p>
          {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}

export function SectionCard({ title, description, badge, children, icon }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(19,34,56,0.05)] dark:border-white/10 dark:bg-surface dark:shadow-none">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-fuchsia-50/80 via-white to-violet-50/40 px-5 py-4 md:px-6 dark:border-white/10 dark:from-picto-primary/20 dark:via-surface dark:to-surface">
        <div className="flex items-start gap-3">
          {icon ? (
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-picto-primary shadow-sm ring-1 ring-fuchsia-100 dark:bg-white/5 dark:ring-white/10 dark:shadow-none">
              {icon}
            </span>
          ) : null}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-ink">{title}</h3>
              {badge ? (
                <span className="rounded-full bg-picto-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-picto-primary">
                  {badge}
                </span>
              ) : null}
            </div>
            {description ? <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p> : null}
          </div>
        </div>
      </div>
      <div className="space-y-5 p-5 md:p-6">{children}</div>
    </section>
  );
}

export function SaveBar({ onSave, saving, saved, label = "Save changes" }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {saved ? "Latest edits are stored in the database." : "Click save to publish this section to the website."}
      </p>
      <div className="flex items-center gap-3">
        {saved ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Saved
          </span>
        ) : null}
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-picto-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-picto-primary-dark disabled:opacity-60"
          disabled={saving}
          onClick={onSave}
        >
          {saving ? "Saving..." : label}
        </button>
      </div>
    </div>
  );
}

export function ListToolbar({ onAdd, addLabel, confirmMessage }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-fuchsia-100 bg-fuchsia-50/50 px-4 py-3 dark:border-picto-primary/25 dark:bg-picto-primary/10">
        <p className="text-sm text-slate-600 dark:text-slate-300">Add, edit, or remove items in this list.</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-picto-primary px-4 py-2 text-sm font-semibold text-white hover:bg-picto-primary-dark"
        >
          <span className="text-base leading-none">+</span>
          {addLabel}
        </button>
      </div>
      <ConfirmDialog
        open={open}
        title="Add new item?"
        message={confirmMessage || `Do you want to add "${addLabel.replace(/^Add\s+/i, "")}" to this section?`}
        confirmLabel="Yes, add"
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          onAdd?.();
        }}
      />
    </>
  );
}

export function ItemCard({ title, onRemove, children, index, removeMessage }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm dark:border-white/10 dark:from-white/5 dark:to-surface dark:shadow-none">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {typeof index === "number" ? (
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-picto-primary/10 text-xs font-bold text-picto-primary">
                {index + 1}
              </span>
            ) : null}
            <h4 className="font-semibold text-ink">{title}</h4>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="cursor-pointer rounded-lg px-2.5 py-1 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/15"
          >
            Remove
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">{children}</div>
      </div>
      <ConfirmDialog
        open={open}
        title="Delete this item?"
        message={removeMessage || `Are you sure you want to delete "${title}"? This cannot be undone until you reload unsaved changes.`}
        confirmLabel="Yes, delete"
        danger
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          onRemove?.();
        }}
      />
    </>
  );
}

export function StatCard({ label, value, hint, tone = "violet", onClick }) {
  const tones = {
    violet: "from-violet-500 to-fuchsia-500",
    blue: "from-sky-500 to-blue-600",
    emerald: "from-emerald-500 to-teal-500",
    amber: "from-amber-400 to-orange-500",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-surface dark:shadow-none dark:hover:bg-white/5"
    >
      <div className={`mb-4 h-1.5 w-12 rounded-full bg-gradient-to-r ${tones[tone]}`} />
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">{value}</p>
      {hint ? <p className="mt-2 text-xs text-slate-400 group-hover:text-picto-primary">{hint}</p> : null}
    </button>
  );
}

export function Tip({ children }) {
  return (
    <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 dark:border-amber-400/25 dark:bg-amber-500/10 dark:text-amber-200">
      {children}
    </div>
  );
}
