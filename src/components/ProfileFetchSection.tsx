"use client";

import { useForm } from "@/context/FormContext";
import { useGitHubProfile } from "@/hooks/useGitHubProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, BookOpen, Download } from "lucide-react";

export function ProfileFetchSection() {
  const { data, updateData } = useForm();
  const { fetchProfile, loading, error } = useGitHubProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProfile();
  };

  return (
    <div className="rounded-2xl border border-solid border-black/[.08] dark:border-white/[.08] bg-white dark:bg-[#141414] p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-foreground text-background">
            <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold tracking-tight">GitHub Profile</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter your username to auto-fetch profile data
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1">
          <Input
            label="GitHub Username"
            value={data.socialLinks.github}
            onChange={(e) => updateData({ socialLinks: { github: e.target.value } })}
            placeholder="e.g. torvalds"
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="h-[50px] px-6 rounded-xl bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Fetching...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Fetch Profile
            </>
          )}
        </Button>
      </form>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {data.fullName && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900">
          <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold">
            {data.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{data.fullName}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">@{data.socialLinks.github}</p>
          </div>
        </div>
      )}
    </div>
  );
}
