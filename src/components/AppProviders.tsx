"use client";

import { FormProvider } from "@/context/FormContext";
import { ToastProvider } from "@/components/ui/toast";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <FormProvider>{children}</FormProvider>
    </ToastProvider>
  );
}
