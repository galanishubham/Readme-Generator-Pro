import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Gitfolio",
  description: "Customize your Gitfolio experience.",
};

export default function SettingsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-50 dark:bg-[#050505]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold tracking-tight mb-8">Settings</h1>
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6">
            <h2 className="text-lg font-semibold mb-4">Appearance</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Theme preferences are handled by the toggle in the navbar. More
              options coming soon.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6">
            <h2 className="text-lg font-semibold mb-4">Editor</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Font size, tab size, and other editor settings coming soon.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6">
            <h2 className="text-lg font-semibold mb-4">Account</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Sync your templates and preferences across devices. Coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
