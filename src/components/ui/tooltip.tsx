"use client";

import * as React from "react";

type TooltipContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const TooltipContext = React.createContext<TooltipContextValue>({
  open: false,
  setOpen: () => {},
});

export function useTooltip() {
  return React.useContext(TooltipContext);
}

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return <TooltipContext.Provider value={{ open, setOpen }}>{children}</TooltipContext.Provider>;
}

export function Tooltip({ content, children }: { content: React.ReactNode; children: React.ReactNode }) {
  const { open, setOpen } = useTooltip();

  return (
    <div className="relative inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-medium whitespace-nowrap shadow-xl z-50 pointer-events-none">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
        </div>
      )}
    </div>
  );
}
