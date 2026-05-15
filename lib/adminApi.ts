const BASE = (process.env.NEXT_PUBLIC_ADMIN_API_URL ?? "https://nxtgen-eemar-website.up.railway.app").replace(/\/$/, "");

export type Project = {
  id: string;
  title: string;
  location: string;
  material: string;
  year: string;
  area: string;
  description: string;
  image: string;
  color: string;
  featured: boolean;
};

function authHeaders(token: string): Record<string, string> {
  return { "Content-Type": "application/json", "x-admin-token": token };
}

async function handleResponse<T>(res: Response): Promise<T> {
  const body = await res.json();
  if (!res.ok) throw new Error(body.error ?? `Request failed (${res.status})`);
  return body as T;
}

export async function login(password: string): Promise<string> {
  const res = await fetch(`${BASE}/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const body = await handleResponse<{ token: string }>(res);
  return body.token;
}

export async function getProjects(token: string): Promise<Project[]> {
  const res = await fetch(`${BASE}/api/projects`, { headers: authHeaders(token) });
  return handleResponse<Project[]>(res);
}

export async function createProject(token: string, data: Omit<Project, "id">): Promise<Project> {
  const res = await fetch(`${BASE}/api/projects`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<Project>(res);
}

export async function updateProject(token: string, id: string, data: Partial<Omit<Project, "id">>): Promise<Project> {
  const res = await fetch(`${BASE}/api/projects/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<Project>(res);
}

export async function deleteProject(token: string, id: string): Promise<void> {
  const res = await fetch(`${BASE}/api/projects/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  await handleResponse<{ ok: boolean }>(res);
}

export async function uploadImage(token: string, file: File): Promise<string> {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${BASE}/api/upload`, {
    method: "POST",
    headers: { "x-admin-token": token },
    body: form,
  });
  const body = await handleResponse<{ url: string }>(res);
  return body.url;
}
