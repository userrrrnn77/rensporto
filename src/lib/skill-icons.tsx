import {
  SiBun,
  SiDocker,
  SiExpo,
  SiExpress,
  SiGit,
  SiJsonwebtokens,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  
} from "react-icons/si";
import type { ComponentType, SVGProps } from "react";
import type { SkillIcon } from "@/constants/about";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const SKILL_ICONS: Record<SkillIcon, IconComponent> = {
  nodejs: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  jwt: SiJsonwebtokens,
  bun: SiBun,
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  vite: SiVite,

  reactNative: SiReact,
  expo: SiExpo,
  vercel: SiVercel,
  git: SiGit,
  docker: SiDocker,
  postman: SiPostman,
};
