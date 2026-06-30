"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-solid border-black/[.06] dark:border-white/[.06] bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-foreground text-background">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Gitfolio</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors hidden sm:block"
          >
            GitHub Profile README Generator
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
