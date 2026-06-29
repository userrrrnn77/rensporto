import type {
  Comment,
  CreateCommentInput,
  UpdateCommentInput,
} from "@/types/comment";

const STORAGE_KEY = "portfolio_mock_comments";
const SIMULATED_LATENCY_MS = 500;

function readAll(): Comment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Comment[]) : [];
  } catch {
    return [];
  }
}

function writeAll(comments: Comment[]): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function seedIfEmpty(): void {
  if (readAll().length > 0) return;

  const now = new Date().toISOString();
  writeAll([
    {
      id: "seed-1",
      guestId: "seed-guest-1",
      name: "Aldi",
      message:
        "Web-nya enak dilihat bre, tema light/dark-nya rapi banget. Lanjutkan!",
      imageUrl: null,
      createdAt: now,
      updatedAt: null,
    },
    {
      id: "seed-2",
      guestId: "seed-guest-2",
      name: "Fina",
      message: "Boleh request bagian Projects ditambah preview video?",
      imageUrl: null,
      createdAt: now,
      updatedAt: null,
    },
    {
      id: "seed-3",
      guestId: "seed-guest-3",
      name: "Ambatukam",
      message: "Boleh request bagian Projects ditambah preview video?",
      imageUrl: null,
      createdAt: now,
      updatedAt: null,
    },
    {
      id: "seed-4",
      guestId: "seed-guest-4",
      name: "Fina",
      message: "Boleh request bagian Projects ditambah preview video?",
      imageUrl: null,
      createdAt: now,
      updatedAt: null,
    },
    {
      id: "seed-5",
      guestId: "seed-guest-5",
      name: "Ambatukam",
      message: "Boleh request bagian Projects ditambah preview video?",
      imageUrl: null,
      createdAt: now,
      updatedAt: null,
    },
    {
      id: "seed-6",
      guestId: "seed-guest-6",
      name: "Fina",
      message: "Boleh request bagian Projects ditambah preview video?",
      imageUrl: null,
      createdAt: now,
      updatedAt: null,
    },
    {
      id: "seed-7",
      guestId: "seed-guest-7",
      name: "Ambatukam",
      message: "Boleh request bagian Projects ditambah preview video?",
      imageUrl: null,
      createdAt: now,
      updatedAt: null,
    },
    {
      id: "seed-8",
      guestId: "seed-guest-8",
      name: "Fina",
      message: "Boleh request bagian Projects ditambah preview video?",
      imageUrl: null,
      createdAt: now,
      updatedAt: null,
    },
  ]);
}

export async function getComments(): Promise<Comment[]> {
  await delay(SIMULATED_LATENCY_MS);
  seedIfEmpty();
  return [...readAll()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function postComment(input: CreateCommentInput): Promise<Comment> {
  await delay(SIMULATED_LATENCY_MS);

  const trimmedName = input.name.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName || !trimmedMessage) {
    throw new Error("Name and message are required.");
  }

  const comment: Comment = {
    id: crypto.randomUUID(),
    guestId: input.guestId,
    name: trimmedName,
    message: trimmedMessage,
    imageUrl: input.imageUrl,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };

  writeAll([...readAll(), comment]);
  return comment;
}

export async function updateComment(
  id: string,
  input: UpdateCommentInput,
): Promise<Comment> {
  await delay(SIMULATED_LATENCY_MS);

  const trimmedMessage = input.message.trim();
  if (!trimmedMessage) {
    throw new Error("Message is required.");
  }

  const all = readAll();
  const index = all.findIndex((c) => c.id === id);

  if (index === -1) {
    throw new Error("Comment not found.");
  }
  if (all[index].guestId !== input.guestId) {
    throw new Error("You can only edit your own comment.");
  }

  const updated: Comment = {
    ...all[index],
    message: trimmedMessage,
    updatedAt: new Date().toISOString(),
  };

  all[index] = updated;
  writeAll(all);
  return updated;
}

export async function deleteComment(
  id: string,
  guestId: string,
): Promise<void> {
  await delay(SIMULATED_LATENCY_MS);

  const all = readAll();
  const target = all.find((c) => c.id === id);

  if (!target) {
    throw new Error("Comment not found.");
  }
  if (target.guestId !== guestId) {
    throw new Error("You can only delete your own comment.");
  }

  writeAll(all.filter((c) => c.id !== id));
}
