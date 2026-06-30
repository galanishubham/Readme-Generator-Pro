"use client";

import { useForm } from "@/context/FormContext";

export function SocialLinksSection() {
  const { data, updateData } = useForm();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1.5">GitHub Username (for stats)</label>
        <input
          type="text"
          value={data.socialLinks.github}
          onChange={(e) => updateData({ socialLinks: { github: e.target.value } })}
          placeholder="johndoe"
          className="w-full px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
            bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
            focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">LinkedIn URL</label>
        <input
          type="text"
          value={data.socialLinks.linkedin}
          onChange={(e) => updateData({ socialLinks: { linkedin: e.target.value } })}
          placeholder="https://linkedin.com/in/johndoe"
          className="w-full px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
            bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
            focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Twitter/X URL</label>
        <input
          type="text"
          value={data.socialLinks.twitter}
          onChange={(e) => updateData({ socialLinks: { twitter: e.target.value } })}
          placeholder="https://twitter.com/johndoe"
          className="w-full px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
            bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
            focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Portfolio Website</label>
        <input
          type="text"
          value={data.socialLinks.portfolio}
          onChange={(e) => updateData({ socialLinks: { portfolio: e.target.value } })}
          placeholder="https://johndoe.dev"
          className="w-full px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
            bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
            focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm"
        />
      </div>
    </div>
  );
}
