export default function SectionHeader({ eyebrow, title, subtitle, align = "left", light = false }) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}`}>
      {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      <h2 className={`section-title ${eyebrow ? "mt-4" : ""} ${light ? "text-white" : ""}`}>{title}</h2>
      {subtitle ? (
        <p className={`section-copy mt-4 ${light ? "text-white/70" : ""}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
