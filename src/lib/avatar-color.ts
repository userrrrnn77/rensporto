/**
 * Deterministically maps a name to one of the brand accent colors, so
 * the same commenter always gets the same avatar color across renders
 * and reloads — without needing to store a color per comment.
 */

type AvatarPalette = {
  bg: string;
  text: string;
};

// Tailwind classes referencing the Geist-style tokens already defined in
// index.css (--blue-*, --green-*, etc) — same palette used elsewhere on
// the site, just applied here as avatar backgrounds.
const AVATAR_PALETTES: AvatarPalette[] = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-green-100", text: "text-green-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
  { bg: "bg-amber-100", text: "text-amber-900" },
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0; // force 32-bit int
  }
  return Math.abs(hash);
}

export function getAvatarPalette(name: string): AvatarPalette {
  const index = hashString(name.trim().toLowerCase()) % AVATAR_PALETTES.length;
  return AVATAR_PALETTES[index];
}
