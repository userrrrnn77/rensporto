export type HeroHighlight = {
  label: string;
  value: string;
};

export const HERO_CONTENT = {
  eyebrow: "Available for new projects",
  heading: "I build products end to end.",
  subheading:
    "Full-stack developer focused on Express & Next.js APIs and React web apps, deployed on Vercel — with React Native (Expo) for when a project needs to live on a phone.",
  primaryCta: {
    label: "View Projects",
    href: "/projects",
  },
  secondaryCta: {
    label: "Get in Touch",
    href: "/contact",
  },
} as const;

export const HERO_HIGHLIGHTS: HeroHighlight[] = [
  { label: "Web", value: "React · Next.js" },
  { label: "API", value: "Express · Next.js" },
  { label: "Mobile", value: "React Native · Expo" },
  { label: "Deploy", value: "Vercel · EAS" },
];
