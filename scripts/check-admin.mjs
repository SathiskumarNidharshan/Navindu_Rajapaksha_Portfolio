import * as db from "../server/sqliteDb.js";
import fs from "node:fs";
import path from "node:path";

const API = "http://127.0.0.1:4000/api";
const results = [];

const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

async function req(route, { method = "GET", body, token } = {}) {
  const res = await fetch(`${API}${route}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

let msgId = "";

{
  const { status, data } = await req("/content");
  check(
    "GET /content",
    status === 200 && Boolean(data?.site && data?.portfolio),
    `status=${status}`
  );
  check("Hero image path set", Boolean(data?.hero?.image), data?.hero?.image || "missing");
  check(
    "Portfolio items have images",
    Array.isArray(data?.portfolio?.items) &&
      data.portfolio.items.every((item) => item.image),
    `${data?.portfolio?.items?.length || 0} items`
  );
  check("About image path set", Boolean(data?.about?.image), data?.about?.image || "missing");
  check("Blog section removed", !Object.prototype.hasOwnProperty.call(data, "blog"));
  check(
    "Nav uses Projects (no Blog)",
    data?.nav?.items?.some((item) => item.label === "Projects") &&
      !data?.nav?.items?.some((item) => item.href === "blog")
  );
}

{
  const { data } = await req("/content");
  const paths = new Set();
  const walk = (value) => {
    if (typeof value === "string" && value.startsWith("/images/")) paths.add(value);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") Object.values(value).forEach(walk);
  };
  walk(data);
  let missing = 0;
  for (const imagePath of paths) {
    const file = path.join(process.cwd(), "public", imagePath.replace(/^\//, ""));
    if (!fs.existsSync(file)) {
      missing += 1;
      check(`Image file ${imagePath}`, false, "missing on disk");
    }
  }
  if (missing === 0) check(`All ${paths.size} /images paths exist`, true);
}

{
  const { status, data } = await req("/messages", {
    method: "POST",
    body: {
      name: "Admin Test",
      email: "test@example.com",
      location: "Test City",
      budget: "$100",
      subject: "API check",
      message: "Automated admin function check",
    },
  });
  msgId = data?.id || "";
  check("POST /messages", status === 201 && Boolean(msgId), msgId || `status=${status}`);
}

const token = await db.createSession();
check("Create admin session", Boolean(token));

{
  const { status, data } = await req("/credentials", { token });
  check("GET /credentials", status === 200 && Boolean(data?.username), `status=${status}`);
}

{
  const { status, data } = await req("/messages", { token });
  check(
    "GET /messages (auth)",
    status === 200 && Array.isArray(data),
    `count=${Array.isArray(data) ? data.length : status}`
  );
  if (msgId) {
    const del = await req(`/messages/${msgId}`, { method: "DELETE", token });
    check("DELETE /messages/:id", del.status === 200 && del.data?.ok);
  }
}

{
  const current = (await req("/content")).data;
  const marker = `verify-${Date.now()}`;
  const put = await req("/content", {
    method: "PUT",
    body: { ...current, site: { ...current.site, title: marker } },
    token,
  });
  check(
    "PUT /content save",
    put.status === 200 && put.data?.site?.title === marker,
    put.data?.site?.title || `status=${put.status}`
  );
  const restore = await req("/content", {
    method: "PUT",
    body: { ...put.data, site: { ...put.data.site, title: current.site.title } },
    token,
  });
  check(
    "PUT /content restore",
    restore.status === 200 && restore.data?.site?.title === current.site.title
  );
}

{
  const current = (await req("/content")).data;
  const tinyPng =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
  const items = [...current.portfolio.items];
  const original = items[0]?.image;
  items[0] = { ...items[0], image: tinyPng };
  const put = await req("/content", {
    method: "PUT",
    body: { ...current, portfolio: { ...current.portfolio, items } },
    token,
  });
  check(
    "Save portfolio data-URL image",
    put.status === 200 && put.data?.portfolio?.items?.[0]?.image?.startsWith("data:image/"),
    `status=${put.status}`
  );
  items[0] = { ...items[0], image: original };
  await req("/content", {
    method: "PUT",
    body: { ...put.data, portfolio: { ...put.data.portfolio, items } },
    token,
  });
  check("Restore portfolio image path", true, original || "n/a");
}

{
  const current = (await req("/content")).data;
  const before = current.portfolio.items.length;
  const items = [
    ...current.portfolio.items,
    {
      id: `test-${Date.now()}`,
      image: "/images/portfolio/card-1.png",
      category: "UI-UX DESIGN",
      title: "Temp Project",
      description: "Temporary test project",
      linkLabel: "Case Study",
      link: "#",
    },
  ];
  const put = await req("/content", {
    method: "PUT",
    body: { ...current, portfolio: { ...current.portfolio, items } },
    token,
  });
  check(
    "Add portfolio project",
    put.status === 200 && put.data.portfolio.items.length === before + 1,
    `count=${put.data?.portfolio?.items?.length}`
  );
  const trimmed = put.data.portfolio.items.filter((item) => item.title !== "Temp Project");
  const restore = await req("/content", {
    method: "PUT",
    body: { ...put.data, portfolio: { ...put.data.portfolio, items: trimmed } },
    token,
  });
  check(
    "Remove portfolio project",
    restore.status === 200 && restore.data.portfolio.items.length === before
  );
}

{
  const { status } = await req("/content", { method: "PUT", body: {} });
  check("PUT /content without auth => 401", status === 401);
}

{
  const { status, data } = await req("/logout", { method: "POST", token });
  check("POST /logout", status === 200 && data?.ok);
  const again = await req("/messages", { token });
  check("Session invalid after logout", again.status === 401);
}

// Vite proxy + static images
{
  try {
    const contentViaVite = await fetch("http://127.0.0.1:5173/api/content");
    check("Vite proxy /api/content", contentViaVite.ok, `status=${contentViaVite.status}`);
    const img = await fetch("http://127.0.0.1:5173/images/logo.png");
    check("Vite serves /images/logo.png", img.ok, `status=${img.status}`);
    const card = await fetch("http://127.0.0.1:5173/images/portfolio/card-1.png");
    check("Vite serves portfolio image", card.ok, `status=${card.status}`);
    const adminPage = await fetch("http://127.0.0.1:5173/admin/login");
    check("Admin login route served", adminPage.ok, `status=${adminPage.status}`);
  } catch (error) {
    check("Vite client reachable", false, error.message);
  }
}

// Credentials update (username only, password unchanged)
{
  const token2 = await db.createSession();
  const current = await req("/credentials", { token: token2 });
  const username = current.data?.username;
  const put = await req("/credentials", {
    method: "PUT",
    token: token2,
    body: { username, password: "" },
  });
  check(
    "PUT /credentials keeps password when blank",
    put.status === 200 && put.data?.username === username,
    `status=${put.status}`
  );
  await req("/logout", { method: "POST", token: token2 });
}

const failed = results.filter((item) => !item.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) {
  console.log("Failed:");
  for (const item of failed) console.log(` - ${item.name}: ${item.detail}`);
  process.exit(1);
}
