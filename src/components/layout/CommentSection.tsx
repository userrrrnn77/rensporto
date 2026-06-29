import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Trash2,
  X,
  Check,
  UserRound,
  Loader2,
  AlertTriangle,
} from "lucide-react";
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

// ─── Avatar — foto profil kalau ada, fallback ke inisial ──────────────────────

function CommentAvatar({
  name,
  imageUrl,
  size = "md",
}: {
  name: string;
  imageUrl: string | null;
  size?: "sm" | "md";
}) {
  const palette = getAvatarPalette(name);
  const dim = size === "sm" ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-xs";

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={`${name} avatar`}
        className={`${dim} shrink-0 rounded-full object-cover border border-gray-alpha-300`}
      />
    );
  }

  return (
    <div
      className={`${dim} flex shrink-0 items-center justify-center rounded-full font-mono font-semibold ${palette.bg} ${palette.text}`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

// ─── Shared backdrop + modal shell ───────────────────────────────────────────

function ModalBackdrop({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        aria-modal="true"
        role="dialog">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 6 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md rounded-md border border-gray-alpha-400 bg-background-100 shadow-modal">
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Edit Modal ──────────────────────────────────────────────────────────────

export function EditModal({
  initialMessage,
  onSave,
  onClose,
}: {
  initialMessage: string;
  onSave: (draft: string) => Promise<void>;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState(initialMessage);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus + move caret to end
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);

  const isDirty = draft.trim() !== initialMessage.trim();
  const canSave = draft.trim().length > 0 && isDirty;

  async function handleSave() {
    if (!canSave) return;
    setIsSaving(true);
    setError(null);
    try {
      await onSave(draft.trim());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSave();
  }

  return (
    <ModalBackdrop onClose={onClose}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-alpha-300 px-5 py-4">
        <h2 className="font-sans text-sm font-semibold text-gray-1000">
          Edit komentar
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="flex h-7 w-7 items-center justify-center rounded-sm text-gray-700 transition-colors hover:bg-gray-alpha-100 hover:text-gray-1000">
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={5}
          maxLength={500}
          placeholder="Tulis komentar kamu…"
          className="w-full resize-none rounded-sm border border-gray-alpha-400 bg-background-200 px-3 py-2.5 font-sans text-sm text-gray-1000 outline-none transition-colors focus-visible:border-blue-700 placeholder:text-gray-600"
        />

        {/* Character count */}
        <p className="text-right font-mono text-[11px] text-gray-600">
          {draft.length}/500
        </p>

        {error && (
          <p className="flex items-center gap-1.5 rounded-sm bg-red-100 px-3 py-2 text-xs text-red-700 border border-red-300">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            {error}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-alpha-300 px-5 py-4">
        <p className="text-xs text-gray-600">
          <kbd className="rounded border border-gray-alpha-400 bg-gray-alpha-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-800">
            ⌘↩
          </kbd>{" "}
          untuk menyimpan
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 items-center gap-1.5 rounded-sm border border-gray-alpha-400 px-3 font-sans text-xs font-medium text-gray-900 transition-colors hover:bg-gray-alpha-100">
            <X className="h-3 w-3" strokeWidth={2} />
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave || isSaving}
            className="flex h-8 items-center gap-1.5 rounded-sm bg-gray-1000 px-3 font-sans text-xs font-medium text-background-100 transition-opacity hover:opacity-85 disabled:opacity-40">
            {isSaving ? (
              <Loader2 className="h-3 w-3 animate-spin" strokeWidth={2} />
            ) : (
              <Check className="h-3 w-3" strokeWidth={2.5} />
            )}
            {isSaving ? "Menyimpan…" : "Simpan"}
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

export function DeleteModal({
  onConfirm,
  onClose,
}: {
  onConfirm: () => Promise<void>;
  onClose: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setIsDeleting(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus.");
      setIsDeleting(false);
    }
  }

  return (
    <ModalBackdrop onClose={onClose}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-alpha-300 px-5 py-4">
        <h2 className="font-sans text-sm font-semibold text-gray-1000">
          Hapus komentar?
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="flex h-7 w-7 items-center justify-center rounded-sm text-gray-700 transition-colors hover:bg-gray-alpha-100 hover:text-gray-1000">
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      {/* Body */}
      <div className="px-5 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 border border-red-300">
            <Trash2 className="h-4 w-4 text-red-700" strokeWidth={2} />
          </div>
          <div>
            <p className="font-sans text-sm text-gray-1000 leading-relaxed">
              Komentar ini akan dihapus permanen dan tidak bisa dikembalikan.
            </p>
            <p className="mt-1 font-sans text-xs text-gray-700">
              Tindakan ini tidak dapat diurungkan.
            </p>
          </div>
        </div>

        {error && (
          <p className="mt-4 flex items-center gap-1.5 rounded-sm bg-red-100 px-3 py-2 text-xs text-red-700 border border-red-300">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            {error}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 border-t border-gray-alpha-300 px-5 py-4">
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="flex h-8 items-center gap-1.5 rounded-sm border border-gray-alpha-400 px-3 font-sans text-xs font-medium text-gray-900 transition-colors hover:bg-gray-alpha-100 disabled:opacity-50">
          Batal
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex h-8 items-center gap-1.5 rounded-sm bg-red-700 px-3 font-sans text-xs font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-50">
          {isDeleting ? (
            <Loader2 className="h-3 w-3 animate-spin" strokeWidth={2} />
          ) : (
            <Trash2 className="h-3 w-3" strokeWidth={2} />
          )}
          {isDeleting ? "Menghapus…" : "Hapus"}
        </button>
      </div>
    </ModalBackdrop>
  );
}

// ─── CommentItem ──────────────────────────────────────────────────────────────

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function handleSave(draft: string) {
    const updated = await updateComment(comment.id, {
      guestId: getGuestId(),
      message: draft,
    });
    onUpdated(updated);
  }

  async function handleDelete() {
    await deleteComment(comment.id, getGuestId());
    onDeleted(comment.id);
  }

  return (
    <>
      {/* ── Modal portals ── */}
      {showEditModal && (
        <EditModal
          initialMessage={comment.message}
          onSave={handleSave}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {/* ── Card ── */}
      <div className="flex h-full max-h-72 flex-col gap-3 overflow-hidden rounded-md border border-gray-alpha-400 bg-background-100 p-4 shadow-raised transition-shadow hover:shadow-menu">
        <div className="flex items-start gap-3">
          <CommentAvatar name={comment.name} imageUrl={comment.imageUrl} />
          <div className="min-w-0 flex-1">
            <span className="truncate font-sans text-sm font-medium text-gray-1000">
              {comment.name}
            </span>
            <p className="text-xs text-gray-700">
              {formatRelativeTime(comment.createdAt)}
              {comment.updatedAt && " · diedit"}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <p className="text-sm leading-6 text-gray-900">{comment.message}</p>
        </div>

        {isOwn && (
          <div className="mt-auto flex items-center gap-3 border-t border-gray-alpha-300 pt-3">
            <button
              type="button"
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-1 font-sans text-xs text-gray-700 hover:text-gray-1000">
              <Pencil className="h-3 w-3" strokeWidth={2} />
              {COPY.editLabel}
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-1 font-sans text-xs text-gray-700 hover:text-red-700">
              <Trash2 className="h-3 w-3" strokeWidth={2} />
              {COPY.deleteLabel}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── CommentSection ───────────────────────────────────────────────────────────

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);

  // Avatar/foto profil state
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setGuestId(getGuestId());
    setName(getGuestName());
    getComments()
      .then(setComments)
      .finally(() => setIsLoading(false));
  }, []);

  // Revoke object URL saat unmount atau ganti file
  useEffect(() => {
    return () => {
      if (avatarPreviewUrl) URL.revokeObjectURL(avatarPreviewUrl);
    };
  }, [avatarPreviewUrl]);

  function handleAvatarSelect(file: File | undefined) {
    if (!file) return;
    const validationError = validateImageFile(file);
    if (validationError) {
      setAvatarError(validationError);
      return;
    }
    if (avatarPreviewUrl) URL.revokeObjectURL(avatarPreviewUrl);
    setAvatarError(null);
    setAvatarFile(file);
    setAvatarPreviewUrl(URL.createObjectURL(file));
  }

  function handleRemoveAvatar() {
    if (avatarPreviewUrl) URL.revokeObjectURL(avatarPreviewUrl);
    setAvatarFile(null);
    setAvatarPreviewUrl(null);
    setAvatarError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !message.trim() || !guestId) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Upload avatar ke R2 kalau ada
      let imageUrl: string | null = null;
      if (avatarFile) {
        const { uploadUrl, publicUrl } = await presignUpload(avatarFile);
        await uploadToPresignedUrl(uploadUrl, avatarFile);
        imageUrl = publicUrl;
      }

      const created = await postComment({ guestId, name, message, imageUrl });
      setComments((prev) => [created, ...prev]);
      setGuestName(name);
      setMessage("");
      handleRemoveAvatar();
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

  // Preview avatar di form — nama fallback ke inisial kalau belum diisi
  const previewName = name.trim() || "?";

  return (
    <div>
      <h2 className="font-sans text-lg font-semibold text-gray-1000">
        {COPY.heading}
      </h2>
      <p className="mt-1.5 text-sm text-gray-900">{COPY.description}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        {/* Avatar picker — tampil sebagai baris dengan preview bulat */}
        <input
          ref={fileInputRef}
          type="file"
          accept={IMAGE_UPLOAD_RULES.acceptAttr}
          onChange={(e) => handleAvatarSelect(e.target.files?.[0])}
          className="hidden"
          id="comment-avatar-input"
        />

        <div className="flex items-center gap-3">
          {/* Preview avatar — klik untuk ganti */}
          <label
            htmlFor="comment-avatar-input"
            className="relative shrink-0 cursor-pointer group">
            {avatarPreviewUrl ? (
              <>
                <img
                  src={avatarPreviewUrl}
                  alt="Preview avatar"
                  className="h-11 w-11 rounded-full object-cover border border-gray-alpha-400 transition-opacity group-hover:opacity-75"
                />
                {/* X button kecil di pojok kanan atas */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveAvatar();
                  }}
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-1000 text-background-100 shadow-raised">
                  <X className="h-2.5 w-2.5" strokeWidth={2.5} />
                </button>
              </>
            ) : (
              /* Fallback: inisial atau placeholder kalau nama belum diisi */
              <div
                className={`h-11 w-11 rounded-full border border-dashed border-gray-alpha-400 flex items-center justify-center transition-colors group-hover:border-gray-alpha-600 group-hover:bg-gray-alpha-100 ${
                  previewName !== "?"
                    ? getAvatarPalette(previewName).bg
                    : "bg-background-100"
                }`}>
                {previewName !== "?" ? (
                  <span
                    className={`font-mono text-sm font-semibold ${getAvatarPalette(previewName).text}`}>
                    {previewName.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <UserRound
                    className="h-4 w-4 text-gray-500"
                    strokeWidth={1.75}
                  />
                )}
              </div>
            )}
          </label>

          {/* Nama di sebelah avatar */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={COPY.namePlaceholder}
            required
            maxLength={60}
            className="flex-1 rounded-sm border border-gray-alpha-400 bg-background-100 px-3 py-2 font-sans text-sm text-gray-1000 outline-none focus-visible:border-blue-700"
          />
        </div>

        {/* Helper text avatar */}
        <p className="text-xs text-gray-600 -mt-1 pl-14">
          Klik avatar untuk upload foto profil — opsional
        </p>

        {avatarError && (
          <p className="text-xs text-red-700 pl-14">{avatarError}</p>
        )}

        {/* Pesan */}
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
            className="ml-auto flex h-9 items-center gap-1.5 rounded-sm bg-gray-1000 px-4 font-sans text-sm font-medium text-background-100 transition-opacity hover:opacity-85 disabled:opacity-60">
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
