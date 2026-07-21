"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
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

  const generatedMarkdown = useMemoizedMarkdown(data);

  const updateData = useCallback((updates: Partial<FormData>) => {
    setData((prev) => ({
      ...prev,
      ...updates,
      socials: updates.socials
        ? {
            ...prev.socials,
            ...updates.socials,
          }
        : prev.socials,
    }));
  }, []);

  const reset = useCallback(() => {
    setData(DEFAULT_FORM_DATA);
  }, []);

  return (
    <FormContext.Provider
      value={{ data, updateData, reset, generatedMarkdown }}
    >
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
