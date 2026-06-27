export type SocialPlatform = "github" | "instagram" | "tiktok" | "email";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/userrrrnn77",
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://instagram.com/userrrrnn77",
  },
  {
    platform: "tiktok",
    label: "TikTok",
    href: "https://tiktok.com/@userrrrnn77",
  },
  {
    platform: "email",
    label: "Email",
    href: "mailto:rendyharvest@gmail.com",
  },
];
