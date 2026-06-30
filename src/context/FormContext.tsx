"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { FormData, DEFAULT_FORM_DATA } from "@/types";

interface FormContextType {
  data: FormData;
  updateData: (updates: Partial<FormData>) => void;
  reset: () => void;
  generatedMarkdown: string;
}

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FormData>(DEFAULT_FORM_DATA);
  const [version, setVersion] = useState(0);

  const generatedMarkdown = useMemoizedMarkdown(data);

  const updateData = useCallback((updates: Partial<FormData>) => {
    setData((prev) => {
      let next: FormData;
      const keys = Object.keys(updates) as Array<keyof FormData>;

      if (
        keys.length === 1 &&
        (keys[0] === "socialLinks" || keys[0] === "githubStats")
      ) {
        const k = keys[0];
        const value = updates[k];
        if (k === "socialLinks") {
          next = { ...prev, socialLinks: { ...prev.socialLinks, ...(value as Record<string, string>) } };
        } else {
          next = { ...prev, githubStats: { ...prev.githubStats, ...(value as Record<string, boolean>) } };
        }
      } else if (keys.length === 1 && (keys[0] === "sections" || keys[0] === "skills" || keys[0] === "projects")) {
        const k = keys[0];
        const value = updates[k];
        next = { ...prev, [k]: value as FormData[typeof k] } as FormData;
      } else {
        next = { ...prev, ...updates } as FormData;
      }

      return next;
    });
    setVersion((v) => v + 1);
  }, []);

  const reset = useCallback(() => {
    setData(DEFAULT_FORM_DATA);
    setVersion((v) => v + 1);
  }, []);

  return (
    <FormContext.Provider value={{ data, updateData, reset, generatedMarkdown }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (!context) throw new Error("useForm must be used within FormProvider");
  return context;
}

let memoData: FormData | null = null;
let memoMarkdown = "";

function useMemoizedMarkdown(data: FormData): string {
  if (memoData && shallowEqual(memoData, data)) {
    return memoMarkdown;
  }
  memoData = JSON.parse(JSON.stringify(data));
  memoMarkdown = generateMarkdown(data);
  return memoMarkdown;
}

function shallowEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

import { generateMarkdown } from "@/lib/templateEngine";
