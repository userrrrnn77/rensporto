import { v4 as uuidv4 } from "uuid";
import { getCookie, setCookie } from "@/lib/cookies";

const GUEST_ID_COOKIE = "portfolio_guest_id";
const GUEST_NAME_COOKIE = "portfolio_guest_name";

export function getGuestId(): string {
  const existing = getCookie(GUEST_ID_COOKIE);
  if (existing) return existing;

  const id = uuidv4();
  setCookie(GUEST_ID_COOKIE, id, { days: 365 });
  return id;
}

export function getGuestName(): string {
  return getCookie(GUEST_NAME_COOKIE) ?? "";
}

export function setGuestName(name: string): void {
  setCookie(GUEST_NAME_COOKIE, name, { days: 365 });
}
