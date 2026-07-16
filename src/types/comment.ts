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
  parentId?: string | null;
};

export type UpdateCommentInput = {
  guestId: string;
  message: string;
};

export type PresignResponse = {
  uploadUrl: string;
  publicUrl: string;
};
