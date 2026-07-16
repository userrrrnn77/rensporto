type AvatarPalette = {
  bg: string;
  text: string;
};

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
    hash |= 0; 
  }
  return Math.abs(hash);
}

export function getAvatarPalette(name: string): AvatarPalette {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return AVATAR_PALETTES[0];

  const index = hashString(normalized) % AVATAR_PALETTES.length;
  return AVATAR_PALETTES[index];
}
