import { useEffect } from "react";
import About from "../components/site/About.jsx";
import Clients from "../components/site/Clients.jsx";
import Contact from "../components/site/Contact.jsx";
import Footer from "../components/site/Footer.jsx";
import Hero from "../components/site/Hero.jsx";
import Navbar from "../components/site/Navbar.jsx";
import Portfolio from "../components/site/Portfolio.jsx";
import ScrollTop from "../components/site/ScrollTop.jsx";
import Services from "../components/site/Services.jsx";
import Testimonials from "../components/site/Testimonials.jsx";
import WorkProcess from "../components/site/WorkProcess.jsx";
import WorkTogether from "../components/site/WorkTogether.jsx";

export default function HomePage() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      // Allow layout to paint, then scroll to the requested section
      requestAnimationFrame(() => {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-page text-ink">
      <Navbar />
      <main>
        <Hero />
        <About />
        <WorkProcess />
        <Portfolio />
        <WorkTogether />
        <Services />
        <Clients />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
}
