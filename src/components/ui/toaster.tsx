"use client";

import React from "react";
import { useToast } from "./toast";

const variantStyles: Record<string, string> = {
  default: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
  success: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900",
  error: "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900",
  warning: "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900",
};

export function Toaster() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto relative flex w-full items-center justify-between gap-4 rounded-xl border p-4 shadow-lg transition-all",
            variantStyles[toast.variant || "default"]
          )}
        >
          <div className="flex-1">
            {toast.title && (
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{toast.title}</div>
            )}
            {toast.description && (
              <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">{toast.description}</div>
            )}
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 rounded-lg p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
