export interface SkillDef {
  id: string;
  name: string;
  color: string;
  logo: string;
  category: string;
}

type SocialPlatformType = "username" | "email" | "url";

export interface SocialPlatform {
  id: string;
  name: string;
  logo: string;
  color: string;
  type: SocialPlatformType;
  baseUrl?: string;
}

interface FormData {
  username: string;
  bio: string;
  skills: string[];
  showStatsCard: boolean;
  showStreak: boolean;
  showTopLangs: boolean;
  showTrophies: boolean;
  showActivity: boolean;
  showViews: boolean;
  socials: Record<string, string>;
}

export type ToastVariant = "default" | "success" | "error" | "warning";
