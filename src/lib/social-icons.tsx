import { Mail } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { FaGithub, FaInstagram } from "react-icons/fa";
import type { SocialPlatform } from "@/constants/social";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const SOCIAL_ICONS: Record<SocialPlatform, IconComponent> = {
  github: FaGithub,
  instagram: FaInstagram,
  tiktok: SiTiktok,
  email: Mail,
};
