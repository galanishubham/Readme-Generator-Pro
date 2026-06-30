"use client";

import { useForm } from "@/context/FormContext";
import { Project } from "@/types";
import { Plus, Trash2 } from "lucide-react";

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export function ProjectsSection() {
  const { data, updateData } = useForm();

  const addProject = () => {
    updateData({
      projects: [...data.projects, { id: generateId(), name: "", description: "" }],
    });
  };

  const removeProject = (id: string) => {
    updateData({ projects: data.projects.filter((p) => p.id !== id) });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    updateData({
      projects: data.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  return (
    <div className="space-y-4">
      {data.projects.length === 0 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-4">
          No projects added yet. Click below to add some.
        </p>
      )}
      {data.projects.map((project) => (
        <div
          key={project.id}
          className="p-4 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145] space-y-3"
        >
          <div className="flex items-start justify-between gap-2">
            <input
              type="text"
              value={project.name}
              onChange={(e) => updateProject(project.id, "name", e.target.value)}
              placeholder="Project Name"
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
                bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm font-medium"
            />
            <button
              onClick={() => removeProject(project.id)}
              className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors flex-shrink-0"
              aria-label="Remove project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={project.description}
            onChange={(e) => updateProject(project.id, "description", e.target.value)}
            placeholder="Brief description of your project..."
            rows={2}
            className="w-full px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
              bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
              focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm resize-none"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={project.githubUrl ?? ""}
              onChange={(e) => updateProject(project.id, "githubUrl", e.target.value)}
              placeholder="GitHub URL"
              className="px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
                bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm"
            />
            <input
              type="text"
              value={project.liveUrl ?? ""}
              onChange={(e) => updateProject(project.id, "liveUrl", e.target.value)}
              placeholder="Live Demo URL"
              className="px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
                bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addProject}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
          border border-dashed border-black/[.15] dark:border-white/[.15]
          text-zinc-600 dark:text-zinc-400 hover:border-foreground/50 transition-colors w-full justify-center"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </div>
  );
}
