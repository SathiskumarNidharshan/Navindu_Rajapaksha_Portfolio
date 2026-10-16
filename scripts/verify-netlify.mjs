/**
 * Offline check that Vite build + Netlify function bundle succeed.
 * Run: node scripts/verify-netlify.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const fail = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};
const ok = (msg) => console.log(`✓ ${msg}`);

const build = spawnSync("npm", ["run", "build"], {
  cwd: root,
  shell: true,
  encoding: "utf8",
});
if (build.status !== 0) {
  console.error(build.stdout);
  console.error(build.stderr);
  fail("Vite build failed");
}
ok("Vite production build");

const distHtml = path.join(root, "dist", "index.html");
if (!fs.existsSync(distHtml)) fail("dist/index.html missing");
ok("dist/index.html present");

const logo = path.join(root, "dist", "images", "logo.png");
if (!fs.existsSync(logo)) fail("dist/images/logo.png missing (public assets)");
ok("Public images copied to dist");

const outFile = path.join(root, "tmp-fn-check.mjs");
try {
  await esbuild.build({
    entryPoints: [path.join(root, "netlify/functions/api.mjs")],
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: outFile,
    packages: "external",
    logLevel: "silent",
  });
} catch (error) {
  console.error(error);
  fail("Netlify function esbuild bundle failed");
}

const bundled = fs.readFileSync(outFile, "utf8");
fs.unlinkSync(outFile);
if (bundled.includes("node:sqlite") || bundled.includes("sqliteDb")) {
  fail("Function bundle incorrectly includes SQLite (Netlify-incompatible)");
}
ok("API function bundles without SQLite");

const required = [
  "netlify.toml",
  "netlify/functions/api.mjs",
  "server/app.js",
  "server/blobDb.js",
  "package.json",
];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) fail(`Missing ${file}`);
}
ok("Netlify deploy files present");

console.log("\nReady for Netlify deploy.");
