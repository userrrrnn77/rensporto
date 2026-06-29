// src/lib/api/comments.ts
// Ganti seluruh isi file ini

import type {
  Comment,
  CreateCommentInput,
  UpdateCommentInput,
} from "@/types/comment";

const BASE_URL = import.meta.env.VITE_URL_CORE;

async function req<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { message?: string }).message ?? `HTTP ${res.status}`,
    );
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function getComments(): Promise<Comment[]> {
  return req<Comment[]>("/comments");
}

export async function postComment(input: CreateCommentInput): Promise<Comment> {
  return req<Comment>("/comments", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateComment(
  id: string,
  input: UpdateCommentInput,
): Promise<Comment> {
  return req<Comment>(`/comments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function deleteComment(
  id: string,
  guestId: string,
): Promise<void> {
  return req<void>(`/comments/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ guestId }),
  });
}
