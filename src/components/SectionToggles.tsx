"use client";

import { useForm } from "@/context/FormContext";

const SECTIONS = [
  { id: "header", label: "Header / Intro", icon: "👋" },
  { id: "about", label: "About & Location", icon: "ℹ️" },
  { id: "skills", label: "Skills", icon: "🛠️" },
  { id: "projects", label: "Projects", icon: "📂" },
  { id: "github-stats", label: "GitHub Stats", icon: "📊" },
  { id: "social-links", label: "Social Links", icon: "🔗" },
  { id: "custom", label: "Custom Markdown", icon: "✏️" },
];

export function SectionToggles() {
  const { data, updateData } = useForm();

  const toggleSection = (id: string) => {
    const sections = data.sections.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s,
    );
    updateData({ sections });
  };

  return (
    <div className="space-y-2">
      {SECTIONS.map((section) => {
        const current = data.sections.find((s) => s.id === section.id);
        return (
          <label
            key={section.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
              cursor-pointer hover:bg-black/[.02] dark:hover:bg-white/[.02] transition-colors select-none"
          >
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors
                ${
                  current?.enabled
                    ? "bg-foreground border-foreground"
                    : "border-black/[.15] dark:border-white/[.25]"
                }`}
            >
              {current?.enabled && (
                <svg
                  className="w-3 h-3 text-background"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="text-base">{section.icon}</span>
            <span className="text-sm font-medium flex-1">{section.label}</span>
            <input
              type="checkbox"
              checked={current?.enabled ?? false}
              onChange={() => toggleSection(section.id)}
              className="sr-only"
            />
          </label>
        );
      })}
    </div>
  );
}
