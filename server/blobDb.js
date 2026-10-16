import { getStore } from "@netlify/blobs";
import bcrypt from "bcryptjs";
import { ADMIN_DEFAULTS, defaultContent } from "../src/data/defaultContent.js";
import { sanitizeContent } from "./sanitizeContent.js";

const STORE_NAME = "portfolio";
const KEYS = {
  content: "content",
  admin: "admin",
  sessions: "sessions",
  messages: "messages",
};

function store() {
  // Lambda compatibility only provides the edge URL. Strong reads need
  // uncachedEdgeURL, which that runtime does not set, so use the default
  // eventual consistency that connectLambda can actually serve.
  return getStore({ name: STORE_NAME });
}

const now = () => new Date().toISOString();

async function ensureSeeded() {
  const s = store();
  const [content, admin] = await Promise.all([
    s.get(KEYS.content, { type: "json" }),
    s.get(KEYS.admin, { type: "json" }),
  ]);

  if (!content) {
    await s.setJSON(KEYS.content, defaultContent);
  }
  if (!admin) {
    const username = process.env.ADMIN_USERNAME || ADMIN_DEFAULTS.username;
    const password = process.env.ADMIN_PASSWORD || ADMIN_DEFAULTS.password;
    await s.setJSON(KEYS.admin, {
      username,
      password_hash: bcrypt.hashSync(password, 10),
    });
  }
  if ((await s.get(KEYS.sessions, { type: "json" })) == null) {
    await s.setJSON(KEYS.sessions, {});
  }
  if ((await s.get(KEYS.messages, { type: "json" })) == null) {
    await s.setJSON(KEYS.messages, []);
  }
}

let ready;
function readyStore() {
  if (!ready) {
    ready = ensureSeeded().catch((error) => {
      ready = undefined;
      throw error;
    });
  }
  return ready;
}

export async function getContent() {
  await readyStore();
  const s = store();
  const parsed = (await s.get(KEYS.content, { type: "json" })) || defaultContent;
  const { data, changed } = sanitizeContent(parsed);
  if (changed) await s.setJSON(KEYS.content, data);
  return data;
}

export async function saveContent(data) {
  await readyStore();
  const { data: clean } = sanitizeContent(data);
  await store().setJSON(KEYS.content, clean);
  return clean;
}

export async function resetContent() {
  return saveContent(defaultContent);
}

export async function getAdmin() {
  await readyStore();
  return store().get(KEYS.admin, { type: "json" });
}

export async function updateAdmin(username, password) {
  await readyStore();
  const s = store();
  const current = await getAdmin();
  const next = {
    username: username || current.username,
    password_hash: password
      ? bcrypt.hashSync(password, 10)
      : current.password_hash,
  };
  await s.setJSON(KEYS.admin, next);
  return { username: next.username };
}

export async function verifyAdmin(username, password) {
  const admin = await getAdmin();
  if (!admin || admin.username !== username) return false;
  return bcrypt.compareSync(password, admin.password_hash);
}

export async function createSession() {
  await readyStore();
  const s = store();
  const sessions = (await s.get(KEYS.sessions, { type: "json" })) || {};
  const token = crypto.randomUUID();
  sessions[token] = now();
  await s.setJSON(KEYS.sessions, sessions);
  return token;
}

export async function validSession(token) {
  if (!token) return false;
  await readyStore();
  const sessions = (await store().get(KEYS.sessions, { type: "json" })) || {};
  return Boolean(sessions[token]);
}

export async function deleteSession(token) {
  await readyStore();
  const s = store();
  const sessions = (await s.get(KEYS.sessions, { type: "json" })) || {};
  delete sessions[token];
  await s.setJSON(KEYS.sessions, sessions);
}

export async function listMessages() {
  await readyStore();
  const messages = (await store().get(KEYS.messages, { type: "json" })) || [];
  return [...messages].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

export async function addMessage(message) {
  await readyStore();
  const s = store();
  const messages = (await s.get(KEYS.messages, { type: "json" })) || [];
  const saved = {
    id: crypto.randomUUID(),
    name: message.name || "",
    email: message.email || "",
    location: message.location || "",
    budget: message.budget || "",
    subject: message.subject || "",
    message: message.message || "",
    createdAt: now(),
  };
  messages.unshift(saved);
  await s.setJSON(KEYS.messages, messages);
  return saved;
}

export async function deleteMessage(id) {
  await readyStore();
  const s = store();
  const messages = (await s.get(KEYS.messages, { type: "json" })) || [];
  await s.setJSON(
    KEYS.messages,
    messages.filter((item) => item.id !== id)
  );
}

export async function clearMessages() {
  await readyStore();
  await store().setJSON(KEYS.messages, []);
}
