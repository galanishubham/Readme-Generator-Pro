import Link from "next/link";
import { BookOpen, GitBranch, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-3">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">Gitfolio</span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
              Build a beautiful GitHub profile README with our modern,
              multi-step generator. Supports badges, GitHub stats, widgets,
              themes, and live preview.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Product</h4>
            <ul className="space-y-2">
              {["Generator", "Templates", "Themes", "Badges"].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "Generator"
                        ? "/generator"
                        : `/${item.toLowerCase()}`
                    }
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2">
              {["Documentation", "Blog", "Support", "Changelog"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 text-red-500 mx-1" /> for
            the developer community
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <GitBranch className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
