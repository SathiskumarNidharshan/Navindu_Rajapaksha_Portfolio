import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { api, getToken, setToken } from "../api.js";
import { ADMIN_DEFAULTS, defaultContent } from "../data/defaultContent.js";

const SiteContext = createContext(null);

function applyFavicon(href) {
  if (!href) return;
  let link = document.querySelector("link[rel='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  if (href.startsWith("data:")) {
    const match = href.match(/^data:([^;]+)/);
    if (match) link.type = match[1];
    link.href = href;
    return;
  }
  const ext = href.split(".").pop()?.split("?")[0]?.toLowerCase();
  link.type = ext === "svg" ? "image/svg+xml" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";
  link.href = `${href}${href.includes("?") ? "&" : "?"}v=${Date.now()}`;
}

export function SiteProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [credentials, setCredentials] = useState(ADMIN_DEFAULTS);
  const [isAdmin, setIsAdmin] = useState(Boolean(getToken()));
  const [messages, setMessages] = useState([]);
  const [ready, setReady] = useState(false);
  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
    document.title = content.site?.title || "Brooklyn | Personal Portfolio";
    applyFavicon(content.site?.logoImage || content.site?.favicon);
  }, [content]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const next = await api("/content");
        if (!cancelled) {
          contentRef.current = next;
          setContent(next);
        }
        if (getToken()) {
          try {
            const [inbox, creds] = await Promise.all([
              api("/messages"),
              api("/credentials"),
            ]);
            if (!cancelled) {
              setMessages(inbox);
              setCredentials({ username: creds.username, password: "" });
              setIsAdmin(true);
            }
          } catch {
            setToken("");
            if (!cancelled) setIsAdmin(false);
          }
        }
      } catch {
        if (!cancelled) setContent(defaultContent);
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      content,
      setContent(updater) {
        setContent((prev) => {
          const next = typeof updater === "function" ? updater(prev) : updater;
          contentRef.current = next;
          return next;
        });
      },
      ready,
      updateSection(section, data) {
        setContent((prev) => {
          const next = { ...prev, [section]: { ...prev[section], ...data } };
          contentRef.current = next;
          return next;
        });
      },
      async saveContent(next) {
        const payload = next ?? contentRef.current;
        const saved = await api("/content", { method: "PUT", body: payload });
        contentRef.current = saved;
        setContent(saved);
        return saved;
      },
      async resetContent() {
        const saved = await api("/content/reset", { method: "POST" });
        contentRef.current = saved;
        setContent(saved);
        return saved;
      },
      async importContent(next) {
        const saved = await api("/content", { method: "PUT", body: next });
        contentRef.current = saved;
        setContent(saved);
        return saved;
      },
      credentials,
      async updateCredentials(next) {
        const saved = await api("/credentials", { method: "PUT", body: next });
        setCredentials({ username: saved.username, password: "" });
        return saved;
      },
      isAdmin,
      async login(username, password) {
        const result = await api("/login", {
          method: "POST",
          body: { username, password },
        });
        setToken(result.token);
        setIsAdmin(true);
        const [inbox, creds] = await Promise.all([api("/messages"), api("/credentials")]);
        setMessages(inbox);
        setCredentials({ username: creds.username, password: "" });
        return true;
      },
      async logout() {
        try {
          await api("/logout", { method: "POST" });
        } catch {
          // session may already be gone
        }
        setToken("");
        setIsAdmin(false);
      },
      messages,
      async addMessage(message) {
        const saved = await api("/messages", { method: "POST", body: message });
        setMessages((prev) => [saved, ...prev]);
        return saved;
      },
      async deleteMessage(id) {
        await api(`/messages/${id}`, { method: "DELETE" });
        setMessages((prev) => prev.filter((item) => item.id !== id));
      },
      async clearMessages() {
        await api("/messages", { method: "DELETE" });
        setMessages([]);
      },
      async refreshMessages() {
        const inbox = await api("/messages");
        setMessages(inbox);
        return inbox;
      },
    }),
    [content, credentials, isAdmin, messages, ready]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}
