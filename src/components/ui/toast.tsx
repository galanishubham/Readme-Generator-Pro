"use client";

import * as React from "react";

type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "success" | "error" | "warning";
};

type Toast = ToastProps & {
  open: boolean;
};

type ToastContextValue = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id" | "open">) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined,
);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = React.useCallback(
    (toast: Omit<Toast, "id" | "open">) => {
      const id = Math.random().toString(36).slice(2);
      const newToast: Toast = { ...toast, id, open: true };
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        dismissToast(id);
      }, 2000);
    },
    [dismissToast],
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}
