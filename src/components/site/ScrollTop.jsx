import { useEffect, useState } from "react";
import { IconChevronUp } from "./Icons.jsx";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-picto-primary text-white shadow-[0_12px_30px_rgba(153,41,251,0.35)] transition hover:-translate-y-1 hover:bg-picto-primary-dark"
      aria-label="Back to top"
    >
      <IconChevronUp />
    </button>
  );
}
