import { useLayoutEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import { useSite } from "./context/SiteContext.jsx";

function scrollToTopInstant() {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  html.style.scrollBehavior = previous;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    scrollToTopInstant();
  }, [pathname]);

  return null;
}

function ProtectedAdmin() {
  const { isAdmin } = useSite();
  return isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedAdmin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}
