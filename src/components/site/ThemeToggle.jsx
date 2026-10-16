import { useTheme } from "../../context/ThemeContext.jsx";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 3v1.8M12 19.2V21M4.93 4.93l1.27 1.27M17.8 17.8l1.27 1.27M3 12h1.8M19.2 12H21M4.93 19.07l1.27-1.27M17.8 6.2l1.27-1.27"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path
        d="M16.5 13.5A7 7 0 0 1 10.5 4a7.5 7.5 0 1 0 8.8 10.2 6 6 0 0 1-2.8-.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`relative z-10 grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-ink shadow-[0_8px_20px_rgba(19,34,56,0.06)] hover:border-picto-primary/40 hover:text-picto-primary dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:shadow-none dark:hover:border-picto-primary/50 dark:hover:text-white ${className}`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
