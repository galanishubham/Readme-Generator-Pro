"use client";

import { useForm } from "@/context/FormContext";
import { SkillCategory, Skill } from "@/types";
import { Plus, Trash2 } from "lucide-react";

const SKILL_CATEGORIES: SkillCategory[] = [
  "Frontend",
  "Backend",
  "DevOps",
  "Database",
  "Mobile",
  "Tools",
  "Other",
];

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export function SkillsSection() {
  const { data, updateData } = useForm();

  const addSkill = () => {
    updateData({
      skills: [...data.skills, { id: generateId(), name: "", category: "Other" }],
    });
  };

  const removeSkill = (id: string) => {
    updateData({ skills: data.skills.filter((s) => s.id !== id) });
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    updateData({
      skills: data.skills.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    });
  };

  return (
    <div className="space-y-3">
      {data.skills.length === 0 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-4">
          No skills added yet. Click below to add some.
        </p>
      )}
      {data.skills.map((skill) => (
        <div key={skill.id} className="flex gap-2 items-start">
          <input
            type="text"
            value={skill.name}
            onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
            placeholder="Skill name"
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
              bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
              focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm"
          />
          <select
            value={skill.category}
            onChange={(e) => updateSkill(skill.id, "category", e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
              bg-white dark:bg-[#141414] text-foreground text-sm
              focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
          >
            {SKILL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={() => removeSkill(skill.id)}
            className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
            aria-label="Remove skill"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        onClick={addSkill}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
          border border-dashed border-black/[.15] dark:border-white/[.15]
          text-zinc-600 dark:text-zinc-400 hover:border-foreground/50 transition-colors w-full justify-center"
      >
        <Plus className="w-4 h-4" />
        Add Skill
      </button>
    </div>
  );
}
