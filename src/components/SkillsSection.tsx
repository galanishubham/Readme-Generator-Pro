"use client";

import { PREDEFINED_SKILLS, SKILL_CATEGORIES } from "@/app/generator/data";
import { SkillDef } from "@/app/generator/types";
import { useForm } from "@/context/FormContext";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  const { data, updateData } = useForm();

  const toggleSkill = (id: string) => {
    updateData({
      ...data,
      skills: data.skills.includes(id)
        ? data.skills.filter((s) => s !== id)
        : [...data.skills, id],
    });
  };

  const grouped = SKILL_CATEGORIES.map((category) => ({
    category,
    skills: PREDEFINED_SKILLS.filter((s) => s.category === category),
  })).filter((group) => group.skills.length > 0);

  function getSkillBadgeUrl(skill: SkillDef): string {
    return `https://img.shields.io/badge/${encodeURIComponent(skill.name)}-${encodeURIComponent(skill.color)}?logo=${skill.logo}&logoColor=white&style=for-the-badge`;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Skills & Technologies</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Click to select skills. Selected badges will appear in your README.
        </p>
      </div>
      <div className="space-y-6">
        {grouped.map((group) => (
          <div key={group.category} className="space-y-3">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {group.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const isSelected = data.skills.includes(skill.id);
                return (
                  <button
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border transition-all",
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 shadow-sm"
                        : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600",
                    )}
                  >
                    <img
                      src={getSkillBadgeUrl(skill)}
                      alt={skill.name}
                      className="h-6"
                      loading="lazy"
                    />
                    {isSelected && (
                      <span className="text-indigo-600 dark:text-indigo-400 text-[10px] leading-none">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
