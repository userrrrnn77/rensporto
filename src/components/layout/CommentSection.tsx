import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, X, Check, ImagePlus, Loader2 } from "lucide-react";
import { COMMENT_SECTION_CONTENT as COPY } from "@/constants/comments";
import { getGuestId, getGuestName, setGuestName } from "@/lib/guest";
import {
  getComments,
  postComment,
  updateComment,
  deleteComment,
} from "@/lib/api/comments";
import { presignUpload, uploadToPresignedUrl } from "@/lib/api/uploads";
import { IMAGE_UPLOAD_RULES, validateImageFile } from "@/lib/image-validation";
import { getAvatarPalette } from "@/lib/avatar-color";
import type { Comment } from "@/types/comment";

function formatRelativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return "baru saja";
  if (minutes < 60) return `${minutes}m lalu`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}j lalu`;

  const days = Math.floor(hours / 24);
  return `${days}h lalu`;
}

function CommentSkeleton() {
  return (
    <div className="flex gap-3 rounded-md border border-gray-alpha-400 bg-background-100 p-4">
      <div className="h-9 w-9 shrink-0 rounded-full bg-gray-alpha-200" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-24 rounded-sm bg-gray-alpha-200" />
        <div className="h-3 w-full rounded-sm bg-gray-alpha-100" />
        <div className="h-3 w-3/4 rounded-sm bg-gray-alpha-100" />
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  isOwn,
  onUpdated,
  onDeleted,
}: {
  comment: Comment;
  isOwn: boolean;
  onUpdated: (comment: Comment) => void;
  onDeleted: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(comment.message);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const avatarPalette = getAvatarPalette(comment.name);

  async function handleSave() {
    if (!draft.trim()) return;
    setIsSaving(true);
    setError(null);
    try {
      const updated = await updateComment(comment.id, {
        guestId: getGuestId(),
        message: draft,
      });
      onUpdated(updated);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteComment(comment.id, getGuestId());
      onDeleted(comment.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus.");
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex h-full max-h-72 flex-col gap-3 overflow-hidden rounded-md border border-gray-alpha-400 bg-background-100 p-4 shadow-raised transition-shadow hover:shadow-menu">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold ${avatarPalette.bg} ${avatarPalette.text}`}>
          {comment.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-sans text-sm font-medium text-gray-1000">
              {comment.name}
            </span>
          </div>
          <span className="text-xs text-gray-700">
            {formatRelativeTime(comment.createdAt)}
            {comment.updatedAt && " · diedit"}
          </span>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-sm border border-gray-alpha-400 bg-background-100 px-3 py-2 font-sans text-sm text-gray-1000 outline-none focus-visible:border-blue-700"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1 rounded-sm bg-gray-1000 px-2.5 py-1 font-sans text-xs font-medium text-background-100 disabled:opacity-60">
              <Check className="h-3 w-3" strokeWidth={2} />
              {COPY.saveLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setDraft(comment.message);
                setError(null);
              }}
              className="flex items-center gap-1 rounded-sm border border-gray-alpha-400 px-2.5 py-1 font-sans text-xs font-medium text-gray-900">
              <X className="h-3 w-3" strokeWidth={2} />
              {COPY.cancelLabel}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-2 overflow-y-auto scrollbar-thin">
          <p className="text-sm leading-6 text-gray-900">{comment.message}</p>
          {comment.imageUrl && (
            <img
              src={comment.imageUrl}
              alt="Lampiran komentar"
              className="max-h-48 w-full rounded-sm border border-gray-alpha-400 object-cover"
            />
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-700">{error}</p>}

      {isOwn && !isEditing && (
        <div className="mt-auto flex items-center gap-3 border-t border-gray-alpha-300 pt-3">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 font-sans text-xs text-gray-700 hover:text-gray-1000">
            <Pencil className="h-3 w-3" strokeWidth={2} />
            {COPY.editLabel}
          </button>

          {confirmingDelete ? (
            <span className="flex items-center gap-2 text-xs text-gray-800">
              {COPY.confirmDeleteLabel}
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="font-medium text-red-700 hover:underline">
                {COPY.deleteLabel}
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className="text-gray-700 hover:underline">
                {COPY.cancelLabel}
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className="flex items-center gap-1 font-sans text-xs text-gray-700 hover:text-red-700">
              <Trash2 className="h-3 w-3" strokeWidth={2} />
              {COPY.deleteLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setGuestId(getGuestId());
    setName(getGuestName());
    getComments()
      .then(setComments)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  function handleFileSelect(file: File | undefined) {
    if (!file) return;
    const validationError = validateImageFile(file);
    if (validationError) {
      setImageError(validationError);
      return;
    }
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImageError(null);
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImageFile(null);
    setImagePreviewUrl(null);
    setImageError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !message.trim() || !guestId) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        const { uploadUrl, publicUrl } = await presignUpload(imageFile);
        await uploadToPresignedUrl(uploadUrl, imageFile);
        imageUrl = publicUrl;
      }
      const created = await postComment({ guestId, name, message, imageUrl });
      setComments((prev) => [created, ...prev]);
      setGuestName(name);
      setMessage("");
      handleRemoveImage();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Gagal mengirim komentar.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleUpdated(updated: Comment) {
    setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  }

  function handleDeleted(id: string) {
    setComments((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="">
      <h2 className="font-sans text-lg font-semibold text-gray-1000">
        {COPY.heading}
      </h2>
      <p className="mt-1.5 text-sm text-gray-900">{COPY.description}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        {/* 1. Image upload — paling atas, full width, kayak input biasa */}
        <input
          ref={fileInputRef}
          type="file"
          accept={IMAGE_UPLOAD_RULES.acceptAttr}
          onChange={(e) => handleFileSelect(e.target.files?.[0])}
          className="hidden"
          id="comment-image-input"
        />
        {imagePreviewUrl ? (
          // Kalau udah ada gambar — tampilin preview full width dengan tombol hapus
          <div className="relative w-full">
            <img
              src={imagePreviewUrl}
              alt="Pratinjau gambar"
              className="h-32 w-full rounded-sm border border-gray-alpha-400 object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              aria-label={COPY.removeImageLabel}
              className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-1000 text-background-100 shadow-raised">
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        ) : (
          // Belum ada gambar — label full width, styled kayak input, optional
          <label
            htmlFor="comment-image-input"
            className="flex w-full cursor-pointer items-center gap-2 rounded-sm border border-dashed border-gray-alpha-400 bg-background-100 px-3 py-2 font-sans text-sm text-gray-700 transition-colors hover:border-gray-alpha-600 hover:bg-gray-100">
            <ImagePlus className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            <span>{COPY.addImageLabel}</span>
            <span className="ml-auto text-xs text-gray-600">
              JPG, PNG, WEBP, GIF · maks {IMAGE_UPLOAD_RULES.maxSizeLabel} ·
              opsional
            </span>
          </label>
        )}
        {imageError && <p className="text-xs text-red-700">{imageError}</p>}

        {/* 2. Nama */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={COPY.namePlaceholder}
          required
          maxLength={60}
          className="w-full rounded-sm border border-gray-alpha-400 bg-background-100 px-3 py-2 font-sans text-sm text-gray-1000 outline-none focus-visible:border-blue-700"
        />

        {/* 3. Pesan */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={COPY.messagePlaceholder}
          required
          rows={3}
          maxLength={500}
          className="w-full resize-none rounded-sm border border-gray-alpha-400 bg-background-100 px-3 py-2 font-sans text-sm text-gray-1000 outline-none focus-visible:border-blue-700"
        />

        {submitError && <p className="text-xs text-red-700">{submitError}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-9 ml-auto items-center gap-1.5 rounded-sm bg-gray-1000 px-4 font-sans text-sm font-medium text-background-100 transition-opacity hover:opacity-85 disabled:opacity-60">
            {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {isSubmitting ? COPY.submittingLabel : COPY.submitLabel}
          </button>
        </div>
      </form>

      <div className="mt-8">
        {isLoading ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <CommentSkeleton />
            <CommentSkeleton />
          </div>
        ) : comments.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-800">
            {COPY.emptyState}
          </p>
        ) : (
          <div className="max-h-86 overflow-y-auto scrollbar-thin rounded-md border border-gray-alpha-300 bg-background-200 p-3 sm:p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <AnimatePresence initial={false}>
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.25,
                      delay: Math.min(index, 6) * 0.03,
                    }}>
                    <CommentItem
                      comment={comment}
                      isOwn={comment.guestId === guestId}
                      onUpdated={handleUpdated}
                      onDeleted={handleDeleted}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
