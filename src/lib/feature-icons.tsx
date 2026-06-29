import {
  Server,
  LayoutPanelLeft,
  Smartphone,
  Database,
  Cloud,
  Lock,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FeatureCard } from "@/constants/features";

/**
 * Maps a feature icon key (plain data in constants/features.ts) to its
 * lucide-react icon component.
 */
export const FEATURE_ICONS: Record<FeatureCard["icon"], LucideIcon> = {
  server: Server,
  layout: LayoutPanelLeft,
  smartphone: Smartphone,
  database: Database,
  cloud: Cloud,
  lock: Lock,
  shield: Shield,
};
