import express from "express";

export function createApp(db) {
  const {
    addMessage,
    clearMessages,
    createSession,
    deleteMessage,
    deleteSession,
    getAdmin,
    getContent,
    listMessages,
    resetContent,
    saveContent,
    updateAdmin,
    validSession,
    verifyAdmin,
  } = db;

  const app = express();
  app.use(express.json({ limit: "6mb" }));
  // Netlify's function adapter leaves the JSON body as a Buffer, so express.json
  // never replaces it and login sees an empty form.
  app.use((req, _res, next) => {
    if (!Buffer.isBuffer(req.body)) return next();
    const text = req.body.toString("utf8").trim();
    if (!text) {
      req.body = {};
      return next();
    }
    try {
      req.body = JSON.parse(text);
    } catch {
      req.body = {};
    }
    next();
  });

  const router = express.Router();

  async function auth(req, res, next) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!(await validSession(token))) {
        return res.status(401).json({ error: "Please sign in again." });
      }
      req.token = token;
      next();
    } catch (error) {
      next(error);
    }
  }

  router.get("/content", async (_req, res, next) => {
    try {
      res.json(await getContent());
    } catch (error) {
      next(error);
    }
  });

  router.put("/content", auth, async (req, res, next) => {
    try {
      res.json(await saveContent(req.body));
    } catch (error) {
      next(error);
    }
  });

  router.post("/content/reset", auth, async (_req, res, next) => {
    try {
      res.json(await resetContent());
    } catch (error) {
      next(error);
    }
  });

  router.post("/login", async (req, res, next) => {
    try {
      let payload = req.body;
      if (typeof payload === "string") {
        try {
          payload = JSON.parse(payload);
        } catch {
          payload = {};
        }
      }
      const username = payload?.username;
      const password = payload?.password;
      if (!String(username || "").trim() || !String(password || "").trim()) {
        return res.status(400).json({ error: "Username and password are required." });
      }
      if (!(await verifyAdmin(username, password))) {
        return res.status(401).json({ error: "Invalid username or password." });
      }
      const admin = await getAdmin();
      res.json({ token: await createSession(), username: admin.username });
    } catch (error) {
      next(error);
    }
  });

  router.post("/logout", auth, async (req, res, next) => {
    try {
      await deleteSession(req.token);
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  router.get("/credentials", auth, async (_req, res, next) => {
    try {
      const admin = await getAdmin();
      res.json({ username: admin.username, password: "" });
    } catch (error) {
      next(error);
    }
  });

  router.put("/credentials", auth, async (req, res, next) => {
    try {
      const { username, password } = req.body || {};
      res.json(await updateAdmin(username, password));
    } catch (error) {
      next(error);
    }
  });

  router.get("/messages", auth, async (_req, res, next) => {
    try {
      res.json(await listMessages());
    } catch (error) {
      next(error);
    }
  });

  router.post("/messages", async (req, res, next) => {
    try {
      res.status(201).json(await addMessage(req.body || {}));
    } catch (error) {
      next(error);
    }
  });

  router.delete("/messages/:id", auth, async (req, res, next) => {
    try {
      await deleteMessage(req.params.id);
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/messages", auth, async (_req, res, next) => {
    try {
      await clearMessages();
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  // Local Express uses /api/*; Netlify splat rewrite may strip the /api prefix.
  app.use("/api", router);
  app.use("/", router);

  app.use((req, res) => {
    res.status(404).json({ error: `No API route for ${req.method} ${req.path}` });
  });

  app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({
      error: error?.message || "Server error. Please try again.",
    });
  });

  return app;
}
