import { FiGithub, FiMail } from "react-icons/fi";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import type { IconType } from "react-icons";
import type { SocialPlatform } from "@/constants/social";

export const SOCIAL_ICONS: Record<SocialPlatform, IconType> = {
  github: FiGithub,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  email: FiMail,
};
