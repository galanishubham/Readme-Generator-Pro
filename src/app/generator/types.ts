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

export type ToastVariant = "default" | "success" | "error" | "warning";
