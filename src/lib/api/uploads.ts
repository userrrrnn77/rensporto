// src/lib/api/uploads.ts
// Ganti seluruh isi file ini

import type { PresignResponse } from "@/types/comment";

const BASE_URL = import.meta.env.VITE_URL_CORE;

/**
 * POST /api/uploads/presign  (admin-only di backend — butuh token)
 * Frontend portfolio (bukan admin) tidak punya token, tapi endpoint ini
 * dipanggil pas user guest upload foto di comment form.
 *
 * Karena presign endpoint di backend pakai requireAuth, kita perlu
 * kirim Authorization header dari localStorage kalau ada (admin),
 * atau tetap kirim tanpa auth (akan 401) — pilihan arsitektur:
 * simpan upload tetap boleh guest pakai token-less presign.
 *
 * NOTE: Kalau mau buka presign buat public (guest comment dengan foto),
 * hapus requireAuth dari upload.routes.ts di backend.
 */
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

/**
 * PUT <uploadUrl>
 * Upload file langsung ke R2 via presigned URL.
 * Server tidak pernah terima file bytes — hanya metadata.
 */
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
