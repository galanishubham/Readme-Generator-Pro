"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

const templates = [
  { id: 1, name: "Developer", author: "Community", stars: 2847, description: "Clean developer profile with skills and stats" },
  { id: 2, name: "Student", author: "Community", stars: 1523, description: "Perfect for students and bootcamp grads" },
  { id: 3, name: "Open Source Contributor", author: "Community", stars: 982, description: "Highlight open source contributions" },
  { id: 4, name: "Minimal", author: "Community", stars: 3421, description: "Minimal and elegant design" },
  { id: 5, name: "Designer", author: "Community", stars: 756, description: "For designers and creative developers" },
  { id: 6, name: "Data Scientist", author: "Community", stars: 634, description: "Showcase data science and ML work" },
];

export function TemplateGallery() {
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { addToast } = useToast();

  const filtered = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleUse = async (template: typeof templates[0]) => {
    await navigator.clipboard.writeText(`# Template: ${template.name}\n\nUse this template as a starting point.`);
    setCopiedId(template.id);
    addToast({ title: "Template copied!", description: `"${template.name}" copied to clipboard.`, variant: "success" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Template Gallery</h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Start with a professionally designed template and customize it to match your style.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-300" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="pl-9 h-10 rounded-xl"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{template.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                {template.stars.toLocaleString()}
              </div>
              <Button
                size="sm"
                onClick={() => handleUse(template)}
                className="rounded-lg"
              >
                {copiedId === template.id ? (
                  <><Check className="h-3.5 w-3.5 mr-1" /> Copied</>
                ) : (
                  <><Copy className="h-3.5 w-3.5 mr-1" /> Use Template</>
                )}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
