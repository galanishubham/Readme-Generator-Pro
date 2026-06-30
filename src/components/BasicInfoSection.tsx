"use client";

import { useForm } from "@/context/FormContext";

export function BasicInfoSection() {
  const { data, updateData } = useForm();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1.5">Full Name</label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => updateData({ fullName: e.target.value })}
          placeholder="John Doe"
          className="w-full px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
            bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
            focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">GitHub Username</label>
        <input
          type="text"
          value={data.username}
          onChange={(e) => updateData({ username: e.target.value })}
          placeholder="johndoe"
          className="w-full px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
            bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
            focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Bio</label>
        <textarea
          value={data.bio}
          onChange={(e) => updateData({ bio: e.target.value })}
          placeholder="I'm a full-stack developer passionate about..."
          rows={3}
          className="w-full px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
            bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
            focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Location</label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => updateData({ location: e.target.value })}
          placeholder="San Francisco, CA"
          className="w-full px-3.5 py-2.5 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
            bg-white dark:bg-[#141414] text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600
            focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-sm"
        />
      </div>
    </div>
  );
}
