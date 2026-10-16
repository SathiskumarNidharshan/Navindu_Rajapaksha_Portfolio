import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { SiteProvider } from "./context/SiteContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./index.css";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SiteProvider>
          <App />
        </SiteProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
