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

function renderSkills(skills: Skill[]): string {
  if (!skills.length) return "";

  const categorized: Record<string, Skill[]> = {};
  skills.forEach((skill) => {
    if (!categorized[skill.category]) categorized[skill.category] = [];
    categorized[skill.category].push(skill);
  });

  let markdown = "### 🛠️ Skills\n\n";
  for (const [category, catSkills] of Object.entries(categorized)) {
    markdown += `**${category}**\n\n`;
    const tags = catSkills.map((s) => `\`${escapeHtml(s.name)}\``).join(" · ");
    markdown += `${tags}\n\n`;
  }
  return markdown;
}

function renderProjects(projects: FormData["projects"]): string {
  if (!projects.length) return "";

  let markdown = "### 📂 Projects\n\n";
  projects.forEach((project) => {
    markdown += `**${escapeHtml(project.name)}**\n\n`;
    if (project.description) {
      markdown += `${escapeHtml(project.description)}\n\n`;
    }
    const links: string[] = [];
    if (project.githubUrl && isValidUrl(project.githubUrl))
      links.push(`[GitHub](${sanitizeUrl(escapeHtml(project.githubUrl))})`);
    if (project.liveUrl && isValidUrl(project.liveUrl))
      links.push(`[Live Demo](${sanitizeUrl(escapeHtml(project.liveUrl))})`);
    if (links.length) markdown += links.join(" · ") + "\n\n";
  });
  return markdown;
}

function renderGithubStats(data: FormData): string {
  const username = data.socialLinks.github || data.username;
  if (!username) return "";

  const encodedUsername = encodeURIComponent(username);
  let markdown = "";

  if (data.githubStats.statsCard) {
    markdown +=
      `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${encodedUsername}&hide_border=true&show_icons=true)\n\n`;
  }
  if (data.githubStats.topLanguages) {
    markdown +=
      `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${encodedUsername}&hide_border=true)\n\n`;
  }
  if (data.githubStats.streakStats) {
    markdown +=
      `![GitHub Streak](https://streak-stats.demolab.com/?user=${encodedUsername}&hide_border=true)\n\n`;
  }
  if (data.githubStats.trophies) {
    markdown +=
      `![Trophies](https://github-profile-trophy.vercel.app/?username=${encodedUsername}&theme=radical&no-bg=true&no-frame=true)\n\n`;
  }
  return markdown;
}

function renderSocialLinks(socialLinks: FormData["socialLinks"]): string {
  const links: { label: string; url: string; icon: string }[] = [];
  if (socialLinks.github)
    links.push({
      label: "GitHub",
      url: sanitizeUrl(escapeHtml(`https://github.com/${socialLinks.github}`)),
      icon: "🐙",
    });
  if (socialLinks.linkedin && isValidUrl(socialLinks.linkedin))
    links.push({ label: "LinkedIn", url: sanitizeUrl(escapeHtml(socialLinks.linkedin)), icon: "💼" });
  if (socialLinks.twitter && isValidUrl(socialLinks.twitter))
    links.push({ label: "Twitter", url: sanitizeUrl(escapeHtml(socialLinks.twitter)), icon: "🐦" });
  if (socialLinks.portfolio && isValidUrl(socialLinks.portfolio))
    links.push({ label: "Portfolio", url: sanitizeUrl(escapeHtml(socialLinks.portfolio)), icon: "🌐" });

  if (!links.length) return "";

  let markdown = "### 🔗 Connect with me\n\n";
  links.forEach((link) => {
    markdown += `- [${link.icon} ${link.label}](${link.url})\n`;
  });
  markdown += "\n";
  return markdown;
}

export function generateMarkdown(data: FormData): string {
  const enabledSections = (data?.sections ?? [])
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  const parts: string[] = [];

  for (const section of enabledSections) {
    switch (section.id) {
      case "header": {
        let header = "";
        if (data.fullName || data.username) {
          header += `# Hi, I'm ${escapeHtml(data.fullName || data.username)} 👋\n\n`;
        }
        if (data.bio) {
          header += `${escapeHtml(data.bio)}\n\n`;
        }
        if (header) parts.push(header);
        break;
      }
      case "about": {
        if (data.location) {
          parts.push(`### 📍 Location\n\n${escapeHtml(data.location)}\n\n`);
        }
        break;
      }
      case "skills": {
        const skillsMarkdown = renderSkills(data.skills ?? []);
        if (skillsMarkdown) parts.push(skillsMarkdown);
        break;
      }
      case "projects": {
        const projectsMarkdown = renderProjects(data.projects ?? []);
        if (projectsMarkdown) parts.push(projectsMarkdown);
        break;
      }
      case "github-stats": {
        const githubMarkdown = renderGithubStats(data);
        if (githubMarkdown) parts.push(githubMarkdown);
        break;
      }
      case "social-links": {
        const socialMarkdown = renderSocialLinks(data.socialLinks ?? {});
        if (socialMarkdown) parts.push(socialMarkdown);
        break;
      }
      case "custom": {
        if ((data.customMarkdown ?? "").trim()) {
          parts.push(`---\n\n${data.customMarkdown.trim()}\n\n`);
        }
        break;
      }
    }
  }

  return parts.join("---\n\n").trim() + "\n";
}
