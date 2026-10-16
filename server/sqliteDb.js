import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import { ADMIN_DEFAULTS, defaultContent } from "../src/data/defaultContent.js";
import { sanitizeContent } from "./sanitizeContent.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");
const dbPath = path.join(dataDir, "portfolio.db");

fs.mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    data TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    location TEXT,
    budget TEXT,
    subject TEXT,
    message TEXT,
    created_at TEXT NOT NULL
  );
`);

const now = () => new Date().toISOString();

if (!db.prepare("SELECT id FROM content WHERE id = 1").get()) {
  db.prepare("INSERT INTO content (id, data, updated_at) VALUES (1, ?, ?)").run(
    JSON.stringify(defaultContent),
    now()
  );
}

if (!db.prepare("SELECT id FROM admin WHERE id = 1").get()) {
  db.prepare("INSERT INTO admin (id, username, password_hash) VALUES (1, ?, ?)").run(
    ADMIN_DEFAULTS.username,
    bcrypt.hashSync(ADMIN_DEFAULTS.password, 10)
  );
}

export async function getContent() {
  const row = db.prepare("SELECT data FROM content WHERE id = 1").get();
  const parsed = JSON.parse(row.data);
  const { data, changed } = sanitizeContent(parsed);
  if (changed) {
    db.prepare("UPDATE content SET data = ?, updated_at = ? WHERE id = 1").run(
      JSON.stringify(data),
      now()
    );
  }
  return data;
}

export async function saveContent(data) {
  db.prepare("UPDATE content SET data = ?, updated_at = ? WHERE id = 1").run(
    JSON.stringify(data),
    now()
  );
  return getContent();
}

export async function resetContent() {
  return saveContent(defaultContent);
}

export async function getAdmin() {
  return db.prepare("SELECT username, password_hash FROM admin WHERE id = 1").get();
}

export async function updateAdmin(username, password) {
  const current = await getAdmin();
  const password_hash = password
    ? bcrypt.hashSync(password, 10)
    : current.password_hash;
  db.prepare("UPDATE admin SET username = ?, password_hash = ? WHERE id = 1").run(
    username || current.username,
    password_hash
  );
  return { username: username || current.username };
}

export async function verifyAdmin(username, password) {
  const admin = await getAdmin();
  if (!admin || admin.username !== username) return false;
  return bcrypt.compareSync(password, admin.password_hash);
}

export async function createSession() {
  const token = crypto.randomUUID();
  db.prepare("INSERT INTO sessions (token, created_at) VALUES (?, ?)").run(token, now());
  return token;
}

export async function validSession(token) {
  if (!token) return false;
  return Boolean(db.prepare("SELECT token FROM sessions WHERE token = ?").get(token));
}

export async function deleteSession(token) {
  db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

export async function listMessages() {
  return db
    .prepare(
      "SELECT id, name, email, location, budget, subject, message, created_at AS createdAt FROM messages ORDER BY created_at DESC"
    )
    .all();
}

export async function addMessage(message) {
  const id = crypto.randomUUID();
  const createdAt = now();
  db.prepare(
    `INSERT INTO messages (id, name, email, location, budget, subject, message, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    message.name || "",
    message.email || "",
    message.location || "",
    message.budget || "",
    message.subject || "",
    message.message || "",
    createdAt
  );
  return {
    id,
    name: message.name || "",
    email: message.email || "",
    location: message.location || "",
    budget: message.budget || "",
    subject: message.subject || "",
    message: message.message || "",
    createdAt,
  };
}

export async function deleteMessage(id) {
  db.prepare("DELETE FROM messages WHERE id = ?").run(id);
}

export async function clearMessages() {
  db.prepare("DELETE FROM messages").run();
}
