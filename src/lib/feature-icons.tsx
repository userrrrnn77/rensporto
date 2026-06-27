import {
  Cloud,
  Database,
  Layout,
  Lock,
  Server,
  Smartphone,
  Shield
} from "lucide-react";
import type { FeatureCard } from "@/constants/features";

export const FEATURE_ICONS: Record<FeatureCard["icon"], typeof Server> = {
  server: Server,
  layout: Layout,
  smartphone: Smartphone,
  database: Database,
  cloud: Cloud,
  lock: Lock,
  shield: Shield
};
