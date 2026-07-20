"use client";

export function Header() {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          README Generator
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Create a stunning GitHub profile README in minutes
        </p>
      </div>
    </header>
  );
}
