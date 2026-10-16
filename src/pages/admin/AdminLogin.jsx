import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSite } from "../../context/SiteContext.jsx";
import { IconArrowLeft, IconEye } from "../../components/site/Icons.jsx";

export default function AdminLogin() {
  const { isAdmin, login, content } = useSite();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isAdmin) return <Navigate to="/admin" replace />;

  const onSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(username.trim(), password);
    } catch (err) {
      setError(err.message || "Invalid username or password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f0fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl items-stretch overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_30px_80px_rgba(19,34,56,0.12)] lg:grid-cols-2">
        <aside className="relative hidden h-full flex-col justify-between overflow-hidden bg-navy p-10 text-white lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(153,41,251,0.45),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.35),transparent_35%)]" />
          <div className="relative">
            <div className="mb-8 flex items-center gap-3">
              {content.site.logoImage ? (
                <img src={content.site.logoImage} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-white/20" />
              ) : (
                <span className="grid h-11 w-11 place-items-center rounded-full bg-picto-primary text-lg font-bold">
                  {content.site.logoText}
                </span>
              )}
              <div>
                <p className="text-sm text-white/70">Portfolio CMS</p>
                <p className="font-semibold">{content.site.name}</p>
              </div>
            </div>
            <h1 className="max-w-md text-4xl font-semibold leading-tight">
              Manage your homepage content from one polished admin panel.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
              Update hero text, portfolio projects, contact details, and more. Every save writes to the database and appears on the live site.
            </p>
          </div>
          <div className="relative mt-10 grid gap-3">
            {[
              "Section-by-section editing with Save controls",
              "Image uploads for logo, hero, and projects",
              "Contact inbox stored in the database",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-picto-primary text-[10px]">✓</span>
                <p className="text-sm text-white/85">{item}</p>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex h-full items-center justify-center bg-white/90 px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-picto-primary to-violet-700 text-xl font-bold text-white shadow-lg shadow-fuchsia-200 lg:mx-0">
                {content.site.logoText || "A"}
              </div>
              <h2 className="text-2xl font-semibold text-ink">Welcome back</h2>
              <p className="mt-2 text-sm text-muted">Sign in to edit website content and review messages.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <span className="admin-label">Username</span>
                <input
                  className="admin-input login-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                />
              </label>
              <div>
                <label htmlFor="admin-password" className="admin-label">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    className="admin-input login-field pr-12"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute right-1.5 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:text-picto-primary"
                  >
                    <IconEye off={showPassword} />
                  </button>
                </div>
              </div>
              {error ? (
                <div className="rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-sm text-rose-600">
                  {error}
                </div>
              ) : null}
              <button type="submit" className="btn-primary w-full" disabled={busy}>
                {busy ? "Signing in..." : "Sign in to dashboard"}
              </button>
            </form>

            {/* <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-center text-xs text-soft-dark">
              Default login: <strong>admin</strong> / <strong>admin123</strong>
            </div> */}
            <Link to="/" className="mt-5 flex items-center justify-center gap-1.5 text-sm font-medium text-picto-primary hover:underline">
              <IconArrowLeft />
              Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
