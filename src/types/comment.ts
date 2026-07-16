export type Comment = {
  id: string;
  guestId: string;
  name: string;
  message: string;
  imageUrl: string | null;
  parentId: string | null;
  isAdminReply: boolean;
  createdAt: string;
  updatedAt: string | null;
};

export type CreateCommentInput = {
  guestId: string;
  name: string;
  message: string;
  imageUrl: string | null;
  // Omitted/undefined for a normal top-level comment. Present when this
  // is a reply (to a top-level comment OR to another reply — backend
  // flattens display-wise, but the relation itself is just "has a
  // parent").
  parentId?: string | null;
};

export type UpdateCommentInput = {
  guestId: string;
  message: string;
};

/** Response from the presign endpoint — see lib/api/uploads.ts. */
export type PresignResponse = {
  /** Short-lived signed URL the browser PUTs the file to directly. */
  uploadUrl: string;
  /** Final public URL to store on the comment once the upload succeeds. */
  publicUrl: string;
};
