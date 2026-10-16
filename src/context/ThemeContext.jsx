import { createContext, useCallback, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "brooklyn-theme";
const ThemeContext = createContext(null);

function getPreferredTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore quota / private mode */
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const initial = getPreferredTheme();
    if (typeof document !== "undefined") applyTheme(initial);
    return initial;
  });

  const setTheme = useCallback((next) => {
    const resolved = typeof next === "function" ? next(document.documentElement.classList.contains("dark") ? "dark" : "light") : next;
    applyTheme(resolved);
    setThemeState(resolved);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    setThemeState(next);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
