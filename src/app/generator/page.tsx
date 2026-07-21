"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewPanel } from "@/components/PreviewPanel";
import { BasicInfoSection } from "@/components/BasicInfoSection";
import { useForm } from "@/context/FormContext";
import { Header } from "@/components/Header";
import { SkillsSection } from "@/components/SkillsSection";
import { SocialLinksSection } from "@/components/SocialLinksSection";

const steps = [
  { id: "basic", label: "Basic Info", icon: "👋" },
  { id: "skills", label: "Skills", icon: "🛠️" },
  { id: "socials", label: "Social Links", icon: "🔗" },
  { id: "preview", label: "Preview", icon: "👁️" },
];

export default function GeneratorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { generatedMarkdown } = useForm();

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-50 dark:bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <div>
          {/* Left: Form */}
          <div className="space-y-6">
            {/* Steps */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                    index === currentStep
                      ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg"
                      : index < currentStep
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        : "bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400",
                  )}
                >
                  <span>{step.icon}</span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              ))}
            </div>

            {/* Form Card */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 sm:p-8 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentStep === 0 && <BasicInfoSection />}
                  {currentStep === 1 && <SkillsSection />}
                  {currentStep === 2 && <SocialLinksSection />}
                  {currentStep === 3 && (
                    <PreviewPanel markdown={generatedMarkdown} />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={prev}
                  disabled={currentStep === 0}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    currentStep === 0
                      ? "opacity-50 cursor-not-allowed text-zinc-400 dark:text-zinc-600"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
                  )}
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                {currentStep !== steps.length - 1 && (
                  <button
                    onClick={next}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
