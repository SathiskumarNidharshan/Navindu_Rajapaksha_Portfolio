import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function clean(value) {
  if (typeof value !== "string") return "";
  let next = value.trim();
  if (
    (next.startsWith('"') && next.endsWith('"') && next.length >= 2) ||
    (next.startsWith("'") && next.endsWith("'") && next.length >= 2)
  ) {
    next = next.slice(1, -1).trim();
  }
  return next;
}

const username = clean(process.env.ADMIN_USERNAME);
const password = clean(process.env.ADMIN_PASSWORD);
const target = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "server", "adminEnv.js");

const contents = `// Generated during the Netlify build. Do not commit real credentials.
export const buildAdmin = ${JSON.stringify({ username, password }, null, 2)};
`;

fs.writeFileSync(target, contents);
console.log(
  username && password
    ? "Admin login will use ADMIN_USERNAME and ADMIN_PASSWORD from this build."
    : "ADMIN_USERNAME or ADMIN_PASSWORD was empty during the build. The function will use runtime variables or the saved login."
);
