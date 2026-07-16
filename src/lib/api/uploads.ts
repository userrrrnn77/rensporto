// src/lib/api/uploads.ts
// Ganti seluruh isi file ini

import type { PresignResponse } from "@/types/comment";

const BASE_URL = import.meta.env.VITE_URL_CORE;

export async function presignUpload(file: File): Promise<PresignResponse> {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${BASE_URL}/uploads/presign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      fileSize: file.size,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { message?: string }).message ??
        `Presign failed: HTTP ${res.status}`,
    );
  }

  return res.json() as Promise<PresignResponse>;
}

export async function uploadToPresignedUrl(
  uploadUrl: string,
  file: File,
): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!res.ok) {
    throw new Error(`Upload to storage failed: HTTP ${res.status}`);
  }
}
