"use client";

import { useForm } from "@/context/FormContext";

export function CustomMarkdownSection() {
  const { data, updateData } = useForm();

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">
        Custom Markdown
        <span className="text-zinc-500 dark:text-zinc-400 font-normal ml-1">
          (appended at the end of your README)
        </span>
      </label>
      <textarea
        value={data.customMarkdown}
        onChange={(e) => updateData({ customMarkdown: e.target.value })}
        placeholder="## Fun Fact&#10;&#10;I love hiking in my free time!"
        rows={6}
        className="w-full px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
          bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
          focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm resize-y font-mono"
      />
    </div>
  );
}
