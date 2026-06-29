export type Comment = {
  id: string;
  guestId: string;
  name: string;
  message: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string | null;
};

export type CreateCommentInput = {
  guestId: string;
  name: string;
  message: string;
  imageUrl: string | null;
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
