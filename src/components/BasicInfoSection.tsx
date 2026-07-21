"use client";

import { useForm } from "@/context/FormContext";

export function BasicInfoSection() {
  const { data, updateData } = useForm();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Basic Information</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Enter your name and write a short introduction.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 h-10 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="John Doe"
              value={data.fullName}
              onChange={(e) => updateData({ fullName: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Introduction / Bio</label>
          <textarea
            className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
            rows={5}
            placeholder="Write a short introduction about yourself, your work, interests, or anything you'd like visitors to know..."
            value={data.bio}
            onChange={(e) => updateData({ bio: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
