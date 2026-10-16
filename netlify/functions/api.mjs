import { connectLambda } from "@netlify/blobs";
import serverless from "serverless-http";
import { createApp } from "../../server/app.js";
import * as db from "../../server/blobDb.js";

const app = createApp(db);
const expressHandler = serverless(app);

function headerMap(headers = {}) {
  const next = {};
  for (const [key, value] of Object.entries(headers)) {
    next[key.toLowerCase()] = Array.isArray(value) ? value.join(", ") : value;
  }
  return next;
}

function pathnameFrom(value) {
  if (!value || typeof value !== "string") return "";
  try {
    return new URL(value, "https://internal.local").pathname || "";
  } catch {
    return "";
  }
}

/**
 * Netlify rewrites /api/* onto the function. Express is mounted at /api and /,
 * so prefer the visitor's original /api path when Netlify provides it.
 */
function normalizeEvent(event) {
  const next = { ...event, headers: headerMap(event.headers) };
  const original = pathnameFrom(
    event.rawUrl || next.headers["x-nf-request-uri"] || next.headers["x-forwarded-uri"]
  );

  let path = original.startsWith("/api")
    ? original
    : [event.path, event.rawPath, event.requestContext?.http?.path].find(Boolean) || "/";

  path = path.replace(/^\/\.netlify\/functions\/api/, "") || "/";
  if (!path.startsWith("/")) path = `/${path}`;

  next.path = path;
  next.rawPath = path;
  if (next.requestContext?.http) {
    next.requestContext = {
      ...next.requestContext,
      http: { ...next.requestContext.http, path },
    };
  }
  return next;
}

export async function handler(event, context) {
  // Lambda-style functions do not receive Blobs credentials unless this runs first.
  if (event?.blobs) connectLambda({ ...event, headers: headerMap(event.headers) });
  return expressHandler(normalizeEvent(event), context);
}
