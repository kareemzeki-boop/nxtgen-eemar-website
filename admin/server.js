const express = require("express");
const multer  = require("multer");
const path    = require("path");

const app  = express();
const PORT = process.env.PORT || 4000;

// ── Environment config ────────────────────────────────────────────
const GH_TOKEN   = process.env.GITHUB_TOKEN   || "";
const GH_OWNER   = process.env.GITHUB_OWNER   || "kareemzeki-boop";
const GH_REPO    = process.env.GITHUB_REPO    || "nxtgen-eemar-website";
const GH_BRANCH  = process.env.GITHUB_BRANCH  || "master";
const GH_FILE    = "data/projects.json";
const IMGBB_KEY  = process.env.IMGBB_API_KEY  || "";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "admin";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── CORS ──────────────────────────────────────────────────────────
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", CORS_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,x-admin-token");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// ── Auth middleware ───────────────────────────────────────────────
app.use("/api", (req, res, next) => {
  if (req.path === "/auth") return next();
  const token = req.headers["x-admin-token"];
  if (token !== ADMIN_PASS) return res.status(401).json({ error: "Unauthorized" });
  next();
});

app.post("/api/auth", (req, res) => {
  if (req.body.password === ADMIN_PASS) {
    res.json({ ok: true, token: ADMIN_PASS });
  } else {
    res.status(401).json({ error: "Wrong password" });
  }
});

// ── GitHub API helpers ────────────────────────────────────────────
const GH_HEADERS = {
  Authorization: `token ${GH_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
  "Content-Type": "application/json",
  "User-Agent": "ELM-Emaar-Admin",
};

async function ghGet() {
  const url = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FILE}?ref=${GH_BRANCH}`;
  const res = await fetch(url, { headers: GH_HEADERS });
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { sha: data.sha, projects: JSON.parse(content) };
}

async function ghPut(projects, sha, message) {
  const url = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FILE}`;
  const content = Buffer.from(JSON.stringify(projects, null, 2)).toString("base64");
  const res = await fetch(url, {
    method: "PUT",
    headers: GH_HEADERS,
    body: JSON.stringify({ message, content, sha, branch: GH_BRANCH }),
  });
  if (!res.ok) throw new Error(`GitHub write failed: ${res.status} ${await res.text()}`);
  return res.json();
}

// ── Projects CRUD ─────────────────────────────────────────────────
app.get("/api/projects", async (_, res) => {
  try {
    const { projects } = await ghGet();
    res.json(projects);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post("/api/projects", async (req, res) => {
  try {
    const { sha, projects } = await ghGet();
    const p = { id: `proj-${Date.now()}`, featured: false, ...req.body };
    projects.push(p);
    await ghPut(projects, sha, `Admin: add "${p.title}"`);
    res.status(201).json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const { sha, projects } = await ghGet();
    const i = projects.findIndex(p => p.id === req.params.id);
    if (i === -1) return res.status(404).json({ error: "Not found" });
    projects[i] = { ...projects[i], ...req.body };
    await ghPut(projects, sha, `Admin: update "${projects[i].title}"`);
    res.json(projects[i]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const { sha, projects } = await ghGet();
    const name = projects.find(p => p.id === req.params.id)?.title || req.params.id;
    await ghPut(projects.filter(p => p.id !== req.params.id), sha, `Admin: delete "${name}"`);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Image upload → ImgBB ──────────────────────────────────────────
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

app.post("/api/upload", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  if (!IMGBB_KEY) return res.status(400).json({ error: "IMGBB_API_KEY not configured" });
  try {
    const base64 = req.file.buffer.toString("base64");
    const body   = new URLSearchParams({ key: IMGBB_KEY, image: base64 });
    const r = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body });
    const data = await r.json();
    if (!data.success) throw new Error(data.error?.message || "ImgBB upload failed");
    res.json({ url: data.data.url });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Health check ──────────────────────────────────────────────────
app.get("/api/health", (_, res) => res.json({ ok: true, ts: new Date().toISOString() }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n🟢  ELM Emaar Admin  →  http://localhost:${PORT}`);
  console.log(`    CORS origin      :  ${CORS_ORIGIN}`);
  console.log(`    GitHub repo      :  ${GH_OWNER}/${GH_REPO}@${GH_BRANCH}\n`);
});
