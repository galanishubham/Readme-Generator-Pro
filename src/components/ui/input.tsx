import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <input
        className={cn(
          "flex h-10 w-full rounded-xl border border-solid border-black/[.08] dark:border-white/[.145] bg-white dark:bg-[#141414] px-3.5 py-2.5 text-sm text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
