// src/lib/api/projects.ts

export type ProjectCategory = "web" | "mobile";

export type TechStackItem = {
  name: string;
  icon: string;
};

export type Project = {
  id: string;
  slug: string;
  category: ProjectCategory;
  private: boolean;
  pins: boolean;
  card: {
    title: string;
    coverCard: string;
    shortDesc: string;
  };
  details: {
    title: string;
    images: string[];
    description: string;
    demo: { icon: string; href: string | null } | null;
    repo: { icon: string; href: string | null } | null;
    techStack: TechStackItem[];
  };
  createdAt: string; // ISO date string, dipakai buat sort "related projects"
};

const BASE_URL = import.meta.env.VITE_URL_CORE;

async function req<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { message?: string }).message ?? `HTTP ${res.status}`,
    );
  }
  return res.json() as Promise<T>;
}

export const projectsApi = {
  list: (): Promise<Project[]> => req<Project[]>("/projects"),
  getBySlug: (slug: string): Promise<Project> =>
    req<Project>(`/projects/${slug}`),
};
