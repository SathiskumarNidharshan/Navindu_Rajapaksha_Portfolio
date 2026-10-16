import Marquee from "react-fast-marquee";
import { useSite } from "../../context/SiteContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function Clients() {
  const { content } = useSite();
  const { isDark } = useTheme();
  const { clients } = content;

  return (
    <section className="border-y border-slate-100 bg-[#fbfbfe] py-16 md:py-20 dark:border-white/10 dark:bg-surface-alt">
      <div className="content">
        <SectionHeader align="center" eyebrow="Partners" title={clients.title} subtitle={clients.subtitle} />
        <div className="mt-10 rounded-3xl border border-slate-100 bg-white py-8 shadow-sm dark:border-white/10 dark:bg-surface">
          <Marquee pauseOnHover gradient gradientColor={isDark ? "#162033" : "#ffffff"} speed={40}>
            {clients.items.map((item) => (
              <div
                key={item.id}
                className="mx-10 text-2xl font-semibold tracking-tight text-slate-300 transition hover:text-picto-primary sm:text-3xl dark:text-slate-500 dark:hover:text-picto-primary"
              >
                {item.name}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
