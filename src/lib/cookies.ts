/**
 * Minimal cookie helpers. Used instead of localStorage for guest identity
 * (see lib/guest.ts) so the value is consistent across tabs and would also
 * be readable server-side if this app ever grows an SSR layer.
 */

type CookieOptions = {
  /** Days until the cookie expires. Omit for a session cookie. */
  days?: number;
  path?: string;
  sameSite?: "Lax" | "Strict" | "None";
};

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  if (!match) return null;

  const value = match.slice(name.length + 1);
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
): void {
  if (typeof document === "undefined") return;

  const { days = 365, path = "/", sameSite = "Lax" } = options;

  let cookie = `${name}=${encodeURIComponent(value)}; path=${path}; samesite=${sameSite}`;

  if (days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    cookie += `; expires=${expires.toUTCString()}`;
  }

  if (window.location.protocol === "https:") {
    cookie += "; secure";
  }

  document.cookie = cookie;
}

export function deleteCookie(name: string, path = "/"): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
