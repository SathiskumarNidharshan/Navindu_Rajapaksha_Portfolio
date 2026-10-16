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

function asJsonText(value) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  if (text.startsWith("{") || text.startsWith("[")) return text;
  try {
    const decoded = Buffer.from(text, "base64").toString("utf8").trim();
    if (decoded.startsWith("{") || decoded.startsWith("[")) return decoded;
  } catch {
    // Keep the original body when it is not base64 JSON.
  }
  return text;
}

function decodeBody(event) {
  const body = event?.body ?? event?.rawBody;
  if (body == null) return "";
  if (typeof body !== "string") return JSON.stringify(body);
  if (event?.isBase64Encoded) {
    return Buffer.from(body, "base64").toString("utf8");
  }
  return asJsonText(body);
}

export async function handler(event, context) {
  try {
    // Blobs reads x-nf-site-id from the event. Keep the original blobs payload and
    // normalize header names so that lookup succeeds.
    if (event?.blobs) {
      connectLambda({ ...event, headers: headerMap(event.headers) });
    }
    const body = decodeBody(event);
    const headers = headerMap(event?.headers);
    // Netlify rewrites can send content-length: 0 while the JSON body is present.
    // Express then reads nothing and login looks like an empty form.
    delete headers["content-length"];
    headers["content-length"] = String(Buffer.byteLength(body));
    if (!headers["content-type"]) headers["content-type"] = "application/json";
    const safeEvent = {
      ...event,
      isBase64Encoded: false,
      httpMethod: event?.httpMethod || event?.requestContext?.http?.method || "GET",
      headers,
      body,
      requestContext: event?.requestContext || { identity: { sourceIp: "" } },
    };
    return await expressHandler(normalizeEvent(safeEvent), context);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: error?.message || "Server error. Please try again.",
      }),
    };
  }
}
