/**
 * Shared rules for image attachments on comments — one source of truth
 * for the file picker's `accept` attribute, the size limit shown in the
 * UI, and the validation run before a file is accepted.
 */

const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const IMAGE_UPLOAD_RULES = {
  acceptedMimeTypes: ACCEPTED_MIME_TYPES,
  acceptAttr: ACCEPTED_MIME_TYPES.join(","),
  maxSizeBytes: MAX_SIZE_BYTES,
  maxSizeLabel: "5MB",
} as const;

export function validateImageFile(file: File): string | null {
  if (
    !ACCEPTED_MIME_TYPES.includes(
      file.type as (typeof ACCEPTED_MIME_TYPES)[number],
    )
  ) {
    return "Format gambar tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF.";
  }

  if (file.size > MAX_SIZE_BYTES) {
    return `Ukuran gambar terlalu besar. Maksimal ${IMAGE_UPLOAD_RULES.maxSizeLabel}.`;
  }

  return null;
}
