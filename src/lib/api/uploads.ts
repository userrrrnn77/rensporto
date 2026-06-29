import type { PresignResponse } from "@/types/comment";

/**
 * ---------------------------------------------------------------------
 * MOCK API — stands in for a real presigned-upload backend (Cloudinary,
 * S3, etc).
 *
 * Mirrors the real two-step flow once the backend exists:
 *   1. presignUpload()        → ask the server for a one-time upload URL
 *   2. uploadToPresignedUrl() → PUT the file straight to storage
 *
 * When the real backend exists, swap the bodies below for actual
 * `fetch` calls — nothing that imports from this file needs to change,
 * since the signatures and return shapes already match what the real
 * version will look like.
 * ---------------------------------------------------------------------
 */

const SIMULATED_LATENCY_MS = 400;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * POST /api/uploads/presign
 * Real version: ask the backend for a signed Cloudinary/S3 upload URL.
 * Mock version: skip the network and hand back a local object URL —
 * it behaves like a real image URL for the lifetime of this tab.
 */
export async function presignUpload(file: File): Promise<PresignResponse> {
  await delay(SIMULATED_LATENCY_MS);

  const objectUrl = URL.createObjectURL(file);

  return {
    uploadUrl: objectUrl,
    publicUrl: objectUrl,
  };
}

/**
 * PUT <uploadUrl>
 * Real version: stream the file bytes straight to Cloudinary/S3 using
 * the presigned URL — the server never sees the file itself.
 * Mock version: there's nothing to upload to (the "URL" is already a
 * local object URL), so this just simulates the network delay.
 */
export async function uploadToPresignedUrl(
  _uploadUrl: string,
  _file: File,
): Promise<void> {
  await delay(SIMULATED_LATENCY_MS);
}
