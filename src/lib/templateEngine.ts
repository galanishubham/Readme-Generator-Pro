import { PREDEFINED_SKILLS, SOCIAL_PLATFORMS } from "@/app/generator/data";
import { SocialPlatform } from "@/app/generator/types";
import { FormData, Skill } from "@/types";

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char] ?? char);
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function sanitizeUrl(url: string): string {
  return url.replace(/"/g, "%22").replace(/'/g, "%27");
}

function createSkillBadge(skill: (typeof PREDEFINED_SKILLS)[number]): string {
  return `![${skill.name}](https://img.shields.io/badge/${encodeURIComponent(skill.name)}-${encodeURIComponent(skill.color)}?logo=${skill.logo}&logoColor=white&style=for-the-badge)`;
}

function createSocialBadge(
  platform: (typeof SOCIAL_PLATFORMS)[number],
  url: string,
): string {
  return `[![${platform.name}](https://img.shields.io/badge/${encodeURIComponent(platform.name)}-${encodeURIComponent(platform.color)}?logo=${platform.logo}&logoColor=white&style=for-the-badge)](${url})`;
}

function renderHeader(fullName: string): string {
  return `# Hi, I'm ${fullName || "Developer"} 👋`;
}

function renderBio(bio: string): string {
  return bio ? `${bio.replace(/\n/g, "<br>")}\n\n` : "";
}

function renderSkills(skills: string[]): string {
  const selectedSkills = skills
    .map((id) =>
      PREDEFINED_SKILLS.find((selectedSkill) => selectedSkill.id === id),
    )
    .filter(
      (selectedSkill): selectedSkill is (typeof PREDEFINED_SKILLS)[number] =>
        Boolean(selectedSkill),
    );

  if (!selectedSkills.length) return "";

  const badges = selectedSkills.map(createSkillBadge).join(" ");

  return `## 🛠️ Skills\n\n${badges}`;
}

// function renderProjects(projects: FormData["projects"]): string {
//   if (!projects.length) return "";

//   let markdown = "### 📂 Projects\n\n";
//   projects.forEach((project) => {
//     markdown += `**${escapeHtml(project.name)}**\n\n`;
//     if (project.description) {
//       markdown += `${escapeHtml(project.description)}\n\n`;
//     }
//     const links: string[] = [];
//     if (project.githubUrl && isValidUrl(project.githubUrl))
//       links.push(`[GitHub](${sanitizeUrl(escapeHtml(project.githubUrl))})`);
//     if (project.liveUrl && isValidUrl(project.liveUrl))
//       links.push(`[Live Demo](${sanitizeUrl(escapeHtml(project.liveUrl))})`);
//     if (links.length) markdown += links.join(" · ") + "\n\n";
//   });
//   return markdown;
// }

function renderSocialLinks(socials: Record<string, string>): string {
  const badges = Object.entries(socials)
    .filter(([, url]) => url.trim())
    .map(([platform, url]) => {
      const info = SOCIAL_PLATFORMS.find((p) => p.id === platform);
      if (!info) return null;

      const link = generateLink(info, url);
      if (!link) return null;

      return createSocialBadge(info, link);
    })
    .filter(Boolean)
    .join(" ");

  if (!badges) return "";

  return `## 🔗 Connect with me\n\n${badges}`;
}

// TODO: Version 2.0

// function renderGithubStats(username: string): string {
//   if (!username) return "";

// const encodedUsername = encodeURIComponent(username);
// let markdown = "";

// if (data.githubStats.statsCard && username) {
//   markdown += `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${encodedUsername}&hide_border=true&show_icons=true)\n\n`;
// }
// if (data.githubStats.topLanguages) {
//   markdown += `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${encodedUsername}&hide_border=true)\n\n`;
// }
// if (data.githubStats.streakStats) {
//   markdown += `![GitHub Streak](https://streak-stats.demolab.com/?user=${encodedUsername}&hide_border=true)\n\n`;
// }
// if (data.githubStats.trophies) {
//   markdown += `![Trophies](https://github-profile-trophy.vercel.app/?username=${encodedUsername}&theme=radical&no-bg=true&no-frame=true)\n\n`;
// }
// return markdown;
// }

function generateLink(platform: SocialPlatform, value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  if (platform.type === "email") {
    return `mailto:${trimmed}`;
  }

  if (platform.type === "username") {
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    return `${platform.baseUrl}${trimmed}`;
  }

  return trimmed;
}

export function generateMarkdown(data: FormData): string {
  return [
    renderHeader(data.fullName),
    renderBio(data.bio),
    renderSkills(data.skills),
    // renderGithubStats(data.username),
    renderSocialLinks(data.socials),
  ]
    .filter(Boolean)
    .join("\n\n");
}
