const express = require("express");
const path    = require("path");
const fs      = require("fs");
const multer  = require("multer");
const { spawn } = require("child_process");

const app  = express();
const PORT = 4000;

const ROOT       = path.join(__dirname, "..");
const DATA_FILE  = path.join(ROOT, "data", "projects.json");
const UPLOADS    = path.join(ROOT, "public", "uploads");
const CFG_FILE   = path.join(__dirname, "config.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Ensure uploads dir exists
fs.mkdirSync(UPLOADS, { recursive: true });

// ── Multer ────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: UPLOADS,
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ── Config (PAT, etc.) ───────────────────────────────────────────
function readCfg()  { return fs.existsSync(CFG_FILE) ? JSON.parse(fs.readFileSync(CFG_FILE)) : {}; }
function writeCfg(d){ fs.writeFileSync(CFG_FILE, JSON.stringify(d, null, 2)); }

app.get("/api/config", (_, res) => {
  const c = readCfg();
  res.json({ ...c, pat: c.pat ? "••••••••" : "" });
});
app.post("/api/config", (req, res) => {
  const cur = readCfg();
  const incoming = req.body;
  if (incoming.pat === "••••••••") delete incoming.pat; // don't overwrite masked
  writeCfg({ ...cur, ...incoming });
  res.json({ ok: true });
});

// ── Projects CRUD ────────────────────────────────────────────────
function readProjects()  { return fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE)) : []; }
function writeProjects(p){ fs.writeFileSync(DATA_FILE, JSON.stringify(p, null, 2)); }

app.get("/api/projects", (_, res) => res.json(readProjects()));

app.post("/api/projects", (req, res) => {
  const projects = readProjects();
  const p = { id: `proj-${Date.now()}`, featured: false, ...req.body };
  projects.push(p);
  writeProjects(projects);
  res.status(201).json(p);
});

app.put("/api/projects/:id", (req, res) => {
  const projects = readProjects();
  const i = projects.findIndex(p => p.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: "Not found" });
  projects[i] = { ...projects[i], ...req.body };
  writeProjects(projects);
  res.json(projects[i]);
});

app.delete("/api/projects/:id", (req, res) => {
  writeProjects(readProjects().filter(p => p.id !== req.params.id));
  res.json({ ok: true });
});

// ── Image upload ─────────────────────────────────────────────────
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  // Return an ImgBB-compatible public URL (served from Next.js public/)
  res.json({ url: `/nxtgen-eemar-website/uploads/${req.file.filename}` });
});

// ── Build & Deploy (SSE streaming) ───────────────────────────────
let proc = null;

function runStream(cmd, args, cwd, res) {
  if (proc) { res.write(`data: {"t":"err","m":"Already running"}\n\n`); res.end(); return; }
  res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
  const send = (t, m) => res.write(`data: ${JSON.stringify({ t, m })}\n\n`);

  proc = spawn(cmd, args, { cwd, shell: true });
  proc.stdout.on("data", d => send("out", d.toString()));
  proc.stderr.on("data", d => send("err", d.toString()));
  proc.on("close", code => {
    send(code === 0 ? "ok" : "fail", code === 0 ? "✅ Done!" : `❌ Exited with code ${code}`);
    res.end();
    proc = null;
  });
}

app.get("/api/build", (req, res) => {
  runStream("npm", ["run", "build"], ROOT, res);
});

app.get("/api/deploy", (req, res) => {
  const { pat } = readCfg();
  const remote = pat
    ? `https://${pat}@github.com/kareemzeki-boop/nxtgen-eemar-website.git`
    : null;

  res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
  const send = (t, m) => res.write(`data: ${JSON.stringify({ t, m })}\n\n`);

  if (proc) { send("err", "Already running"); res.end(); return; }

  const steps = [
    ["git", ["add", "-A"]],
    ["git", ["commit", "-m", `Admin update ${new Date().toLocaleDateString("en-GB")}`]],
    remote
      ? ["git", ["-c", "credential.helper=", "push", remote, "HEAD:master"]]
      : ["git", ["push", "origin", "master"]],
  ];

  (async () => {
    for (const [cmd, args] of steps) {
      send("out", `$ ${cmd} ${args.join(" ").replace(pat || "", "***")}\n`);
      await new Promise((resolve, reject) => {
        proc = spawn(cmd, args, { cwd: ROOT, shell: true });
        proc.stdout.on("data", d => send("out", d.toString()));
        proc.stderr.on("data", d => send("err", d.toString()));
        proc.on("close", code => { proc = null; code === 0 ? resolve() : reject(code); });
      });
    }
    send("ok", "✅ Deployed to GitHub Pages!");
    res.end();
  })().catch(code => {
    send("fail", `❌ Failed (exit ${code})`);
    res.end();
    proc = null;
  });
});

app.listen(PORT, () => {
  console.log(`\n🟢  ELM Emaar Admin  →  http://localhost:${PORT}\n`);
});
