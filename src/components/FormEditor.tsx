"use client";

import { FormSection } from "./FormSection";
import { ProfileFetchSection } from "@/components/ProfileFetchSection";
import { SectionToggles } from "@/components/SectionToggles";
import { SocialLinksSection } from "@/components/SocialLinksSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { GithubStatsSection } from "@/components/GithubStatsSection";
import { CustomMarkdownSection } from "@/components/CustomMarkdownSection";
import { useForm } from "@/context/FormContext";

export function FormEditor() {
  const { data } = useForm();

  const sections = [
    { id: "social-links", label: "Social Links", icon: "🔗", component: <SocialLinksSection /> },
    { id: "skills", label: "Skills", icon: "🛠️", component: <SkillsSection /> },
    { id: "projects", label: "Projects", icon: "📂", component: <ProjectsSection /> },
    { id: "github-stats", label: "GitHub Stats", icon: "📊", component: <GithubStatsSection /> },
    { id: "custom", label: "Custom Markdown", icon: "✏️", component: <CustomMarkdownSection /> },
  ];

  return (
    <div className="space-y-6">
      <ProfileFetchSection />

      <div>
        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
          Section Toggles
        </h2>
        <SectionToggles />
      </div>
      {sections.map((section) => {
        const current = data.sections.find((s) => s.id === section.id);
        return (
          <FormSection key={section.id} id={section.id} label={section.label} icon={section.icon} enabled={current?.enabled ?? true}>
            {section.component}
          </FormSection>
        );
      })}
    </div>
  );
}
