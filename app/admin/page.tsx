"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  LogOut, Plus, Pencil, Trash2, Upload, X, Save, Star, StarOff, AlertTriangle,
} from "lucide-react";
import {
  login, getProjects, createProject, updateProject, deleteProject, uploadImage,
  type Project,
} from "@/lib/adminApi";

const MATERIAL_COLORS: Record<string, string> = {
  GFRC: "#5DC39B",
  GFRP: "#06b6d4",
  UHPC: "#f59e0b",
  GRG: "#8b5cf6",
  LTGRC: "#ec4899",
};

const MATERIALS = Object.keys(MATERIAL_COLORS);

const EMPTY_FORM = (): Omit<Project, "id"> => ({
  title: "",
  location: "",
  material: "GFRC",
  year: String(new Date().getFullYear()),
  area: "",
  description: "",
  image: "",
  images: [],
  color: MATERIAL_COLORS.GFRC,
  featured: false,
});

// ── Login Screen ──────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = await login(password);
      sessionStorage.setItem("admin-token", token);
      onLogin(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">EMR Admin</span>
          </div>
          <p className="text-neutral-400 text-sm">Sign in to manage projects</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="Enter admin password"
              autoFocus
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              <AlertTriangle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Edit / Add Modal ──────────────────────────────────────────────

type ModalProps = {
  token: string;
  project: Project | null;
  onSave: (p: Project) => void;
  onClose: () => void;
};

const MAX_IMAGES = 6;

function ProjectModal({ token, project, onSave, onClose }: ModalProps) {
  const isEdit = project !== null;
  const [form, setForm] = useState<Omit<Project, "id">>(() => {
    if (!isEdit) return EMPTY_FORM();
    const imgs = project.images?.length
      ? project.images
      : project.image
      ? [project.image]
      : [];
    return { ...project, images: imgs };
  });
  const [saving, setSaving] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
  const [activeSlot, setActiveSlot] = useState(0);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (k === "material") {
      setForm((f) => ({ ...f, material: v as string, color: MATERIAL_COLORS[v as string] ?? f.color }));
    }
  }

  function openSlot(slot: number) {
    setActiveSlot(slot);
    fileRef.current?.click();
  }

  async function handleImageFile(file: File) {
    setUploadingSlot(activeSlot);
    setError("");
    try {
      const url = await uploadImage(token, file);
      setForm((f) => {
        const imgs = [...(f.images ?? [])];
        imgs[activeSlot] = url;
        return { ...f, images: imgs, image: imgs[0] ?? "" };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingSlot(null);
    }
  }

  function removeImage(slot: number) {
    setForm((f) => {
      const imgs = [...(f.images ?? [])];
      imgs.splice(slot, 1);
      return { ...f, images: imgs, image: imgs[0] ?? "" };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.image && !(form.images?.length)) {
      setError("Please upload at least one image first");
      return;
    }
    setSaving(true);
    setError("");
    try {
      let saved: Project;
      if (isEdit) {
        saved = await updateProject(token, project.id, form);
      } else {
        saved = await createProject(token, form);
      }
      onSave(saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  }

  const imageCount = form.images?.filter(Boolean).length ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative h-full w-full max-w-lg bg-neutral-900 border-l border-neutral-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 shrink-0">
          <h2 className="font-semibold text-white">{isEdit ? "Edit Project" : "Add Project"}</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form id="project-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-neutral-300">Images</label>
              <span className="text-xs text-neutral-500">
                {imageCount}/{MAX_IMAGES} · first is cover
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: MAX_IMAGES }).map((_, i) => {
                const url = form.images?.[i] ?? "";
                const isUploading = uploadingSlot === i;
                const canAdd = !url && (i === 0 || !!(form.images?.[i - 1]));
                return (
                  <div
                    key={i}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-colors group
                      ${url
                        ? "border-transparent"
                        : canAdd
                          ? "border-dashed border-neutral-700 hover:border-emerald-500/60 cursor-pointer"
                          : "border-dashed border-neutral-800 opacity-40"}
                      ${i === 0 ? "ring-1 ring-emerald-500/30" : ""}
                    `}
                    onClick={() => canAdd && openSlot(i)}
                  >
                    {url ? (
                      <>
                        <Image src={url} alt={`Image ${i + 1}`} fill className="object-cover" unoptimized />
                        {i === 0 && (
                          <span className="absolute top-1.5 left-1.5 text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-semibold leading-none">
                            COVER
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                          className="absolute top-1 right-1 w-5 h-5 bg-black/70 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={10} className="text-white" />
                        </button>
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          onClick={(e) => { e.stopPropagation(); openSlot(i); }}
                        >
                          <Upload size={14} className="text-white" />
                        </div>
                      </>
                    ) : canAdd ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600">
                        {i === 0 ? (
                          <>
                            <Upload size={18} />
                            <span className="text-[10px] mt-1 font-medium">COVER</span>
                          </>
                        ) : (
                          <span className="text-2xl font-light leading-none">+</span>
                        )}
                      </div>
                    ) : null}
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageFile(file);
                e.target.value = "";
              }}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm text-neutral-300 mb-1.5">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              placeholder="Project name"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-neutral-300 mb-1.5">Location</label>
            <input
              required
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              placeholder="City, Country"
            />
          </div>

          {/* Material + Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-300 mb-1.5">Material</label>
              <select
                value={form.material}
                onChange={(e) => set("material", e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm appearance-none cursor-pointer"
              >
                {MATERIALS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-1.5">Year</label>
              <input
                required
                value={form.year}
                onChange={(e) => set("year", e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                placeholder="2024"
              />
            </div>
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm text-neutral-300 mb-1.5">Area</label>
            <input
              required
              value={form.area}
              onChange={(e) => set("area", e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              placeholder="e.g. 12,000 m²"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-neutral-300 mb-1.5">Description</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm resize-none"
              placeholder="Project description…"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm text-neutral-300">Featured project</p>
              <p className="text-xs text-neutral-500 mt-0.5">Displayed larger on the site</p>
            </div>
            <button
              type="button"
              onClick={() => set("featured", !form.featured)}
              className={`w-11 h-6 rounded-full transition-colors ${form.featured ? "bg-emerald-600" : "bg-neutral-700"} relative`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.featured ? "left-6" : "left-1"}`} />
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              <AlertTriangle size={14} />
              {error}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 border-t border-neutral-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="project-form"
            disabled={saving || uploadingSlot !== null}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Save size={14} />
            {saving ? "Saving…" : "Save Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────

function ProjectCard({
  project, onEdit, onDelete,
}: {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group">
      <div className="relative h-44">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${project.color}22`, color: project.color, border: `1px solid ${project.color}44` }}
          >
            {project.material}
          </span>
          {project.featured && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30">
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white text-sm leading-snug mb-1">{project.title}</h3>
        <p className="text-xs text-neutral-400">{project.location} · {project.year}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="text-xs text-neutral-500">{project.area}</p>
          {(project.images?.length ?? 0) > 1 && (
            <span className="text-xs text-neutral-600 bg-neutral-800 px-1.5 py-0.5 rounded-md">
              {project.images!.length} photos
            </span>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 flex items-center gap-2">
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
        >
          <Pencil size={12} /> Edit
        </button>

        {confirmDelete ? (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-red-400">Delete?</span>
            <button
              onClick={onDelete}
              className="px-3 py-1.5 text-xs bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex items-center gap-1.5 ml-auto px-3 py-1.5 text-xs text-neutral-400 hover:text-red-400 bg-neutral-800 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <Trash2 size={12} /> Delete
          </button>
        )}
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<{ project: Project | null } | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    getProjects(token)
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      await deleteProject(token, id);
      setProjects((ps) => ps.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(null);
    }
  }

  function handleSaved(saved: Project) {
    setProjects((ps) => {
      const idx = ps.findIndex((p) => p.id === saved.id);
      return idx >= 0 ? ps.map((p, i) => (i === idx ? saved : p)) : [...ps, saved];
    });
    setModal(null);
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="text-white font-semibold tracking-tight">EMR Admin</span>
            <span className="text-neutral-600 text-sm">/ Projects</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModal({ project: null })}
              className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Plus size={15} /> Add Project
            </button>
            <button
              onClick={onLogout}
              title="Sign out"
              className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-neutral-800"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats bar */}
        <div className="flex items-center gap-6 mb-8 text-sm text-neutral-400">
          <span>{projects.length} project{projects.length !== 1 ? "s" : ""}</span>
          <span className="flex items-center gap-1.5">
            <Star size={13} className="text-amber-400" />
            {projects.filter((p) => p.featured).length} featured
          </span>
          {projects.length > 0 && (
            <span className="flex gap-2">
              {[...new Set(projects.map((p) => p.material))].map((m) => (
                <span key={m} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${MATERIAL_COLORS[m] ?? "#888"}22`, color: MATERIAL_COLORS[m] ?? "#888" }}>
                  {m}
                </span>
              ))}
            </span>
          )}
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
            <AlertTriangle size={15} />
            {error}
            <button onClick={() => setError("")} className="ml-auto"><X size={14} /></button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-neutral-800" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-neutral-800 rounded w-3/4" />
                  <div className="h-3 bg-neutral-800 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 text-neutral-500">
            <p className="mb-4">No projects yet.</p>
            <button
              onClick={() => setModal({ project: null })}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Plus size={15} /> Add your first project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onEdit={() => setModal({ project: p })}
                onDelete={() => handleDelete(p.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {modal !== undefined && modal !== null && (
        <ProjectModal
          token={token}
          project={modal.project}
          onSave={handleSaved}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

// ── Root Page ─────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin-token");
    if (stored) setToken(stored);
    setReady(true);
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("admin-token");
    setToken(null);
  }

  if (!ready) return null;

  if (!token) {
    return <LoginScreen onLogin={setToken} />;
  }

  return <Dashboard token={token} onLogout={handleLogout} />;
}
