export type FeatureCard = {
  title: string;
  description: string;
  icon:
    | "server"
    | "layout"
    | "smartphone"
    | "database"
    | "cloud"
    | "lock"
    | "shield";
};

export const STACK_FEATURES: FeatureCard[] = [
  {
    title: "Express & Next.js APIs",
    description:
      "REST APIs, JWT auth, and route handlers built to stay predictable as a product grows.",
    icon: "server",
  },
  {
    title: "React & Next.js Web Apps",
    description:
      "Fast, accessible interfaces — component-driven, styled with Tailwind v4, and built to scale past the prototype.",
    icon: "layout",
  },
  {
    title: "React Native (Expo)",
    description:
      "Cross-platform mobile apps shipped from a single codebase, built and released through EAS.",
    icon: "smartphone",
  },
  {
    title: "MongoDB / Mongoose",
    description:
      "Schema design and data modeling that stays clean even as relationships get more complex.",
    icon: "database",
  },
  {
    title: "Vercel Deployments",
    description:
      "Frontend and backend both shipped as serverless functions — fast deploys, zero server babysitting.",
    icon: "cloud",
  },
  {
    title: "Security",
    description:
      "JWT-based auth and session handling baked into the API layer, not bolted on after the fact.",
    icon: "shield",
  },
];
