export type SkillIcon =
  | "nodejs"
  | "express"
  | "mongodb"
  | "jwt"
  | "bun"
  | "react"
  | "nextjs"
  | "typescript"
  | "tailwind"
  | "vite"
  | "reactNative"
  | "expo"
  | "vercel"
  | "git"
  | "docker"
  | "postman";

export type Skill = {
  name: string;
  icon: SkillIcon;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export type AboutStat = {
  label: string;
  value: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export const ABOUT_CONTENT = {
  eyebrow: "About",
  heading: "Full-stack, by way of curiosity.",
  bio: [
    "I'm a full-stack developer who lives mostly between the backend and the browser — Express and Next.js APIs underneath, React and Next.js on top, shipped to Vercel. Mongoose and MongoDB handle the data layer more often than not.",
    "I occasionally step into React Native with Expo and EAS Build when a project needs to live on a phone, but most of my time goes into making an API predictable and a web app feel instant.",
    "Outside of shipping features, I spend time reading source code, tightening up developer workflows, and figuring out the smallest version of a solution that still does the job well.",
  ],
} as const;

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "MongoDB / Mongoose", icon: "mongodb" },
      { name: "JWT Auth", icon: "jwt" },
      { name: "Bun", icon: "bun" },
    ],
  },
  {
    title: "Web",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Vite", icon: "vite" },
    ],
  },
  {
    title: "Mobile",
    skills: [
      { name: "React Native", icon: "reactNative" },
      { name: "Expo", icon: "expo" },
    ],
  },
  {
    title: "Deploy & Tooling",
    skills: [
      { name: "Vercel", icon: "vercel" },
      { name: "Git", icon: "git" },
      { name: "Docker", icon: "docker" },
      { name: "Postman", icon: "postman" },
    ],
  },
];

export const ABOUT_STATS: AboutStat[] = [
  { label: "Projects shipped", value: "0+" },
  { label: "Coding since", value: "2023" },
  { label: "Lines written", value: "0K+" },
];

export const ABOUT_TIMELINE: TimelineEntry[] = [
  {
    year: "2023",
    title: "Got curious about how websites work",
    description:
      'Started out just wanting to know how a website gets built. Found Dea Afrizal\'s "Belajar di CodeCuy University" playlist on YouTube and learned HTML, CSS, and JavaScript from there — in my 5th semester.',
  },
  {
    year: "2024",
    title: "Moved into React, then hit a wall",
    description:
      "Followed along with JSMastery and other JS/React tutorials. Felt confident at the time, but it was mostly copying along — the wall showed up in 2025 when I tried building without a tutorial open.",
  },
  {
    year: "2025",
    title: "Broke out of tutorial hell",
    description:
      "Stepped away from tutorials and started building from scratch. Picked up React Native, then Express, Node, and Bun on the backend. Switched to Xubuntu around the same time and never looked back.",
  },
  {
    year: "Now",
    title: "Full-stack, end to end",
    description:
      "Building APIs and web apps day to day, with React Native when a project needs to live on a phone — and slowly working toward running my own home server.",
  },
];

export const ABOUT_FUN_FACTS: string[] = [
  "It all started from just being curious how a website is even made — found a YouTube playlist and went down the rabbit hole from there.",
  "Daily driver is Xubuntu. Switched after a confusing first attempt at reinstalling Windows (turns out the cursor disappears when you forget the drivers) — ended up learning disk partitioning and a lot of terminal along the way.",
  "Long-term goal: a home server that's always on, no cold starts, and maybe running my own AI workloads — tired of borrowing Vercel's.",
];
