export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
}

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "DevOps"
  | "Database"
  | "Mobile"
  | "Tools"
  | "Other";

export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface SectionConfig {
  id: string;
  enabled: boolean;
  order: number;
}

export interface GithubStatsConfig {
  statsCard: boolean;
  topLanguages: boolean;
  streakStats: boolean;
  trophies: boolean;
}

export interface FormData {
  // fullName: string;
  // username: string;
  // bio: string;
  // location: string;
  // socialLinks: SocialLinks;
  // skills: Skill[];
  // projects: Project[];
  // githubStats: GithubStatsConfig;
  // sections: SectionConfig[];
  // customMarkdown: string;

  fullName: string;
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
  // socialLinks: SocialLinks;
  sections: SectionConfig[];
}

export const DEFAULT_FORM_DATA: FormData = {
  // fullName: "",
  // username: "",
  // bio: "",
  // location: "",
  // socialLinks: {
  //   github: "",
  //   linkedin: "",
  //   twitter: "",
  //   portfolio: "",
  // },
  // skills: [],
  // projects: [],
  // githubStats: {
  //   statsCard: true,
  //   topLanguages: false,
  //   streakStats: false,
  //   trophies: false,
  // },

  fullName: "",
  username: "",
  bio: "",
  skills: [],
  showStatsCard: true,
  showStreak: false,
  showTopLangs: false,
  showTrophies: false,
  showActivity: false,
  showViews: false,
  socials: {},
  sections: [
    { id: "header", enabled: true, order: 0 },
    { id: "about", enabled: true, order: 1 },
    { id: "skills", enabled: true, order: 2 },
    // { id: "projects", enabled: true, order: 3 },
    { id: "github-stats", enabled: true, order: 4 },
    { id: "social-links", enabled: false, order: 5 },
    { id: "custom", enabled: false, order: 6 },
  ],
};
