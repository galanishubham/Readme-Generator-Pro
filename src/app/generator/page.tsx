"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { PreviewPanel } from "@/components/PreviewPanel";
import { BasicInfoSection } from "@/components/BasicInfoSection";
import { useForm } from "@/context/FormContext";
import { Header } from "@/components/Header";
import { SkillsSection } from "@/components/SkillsSection";
import { SocialLinksSection } from "@/components/SocialLinksSection";
import { ToastVariant } from "./types";

const steps = [
  { id: "basic", label: "Basic Info", icon: "👋" },
  { id: "skills", label: "Skills", icon: "🛠️" },
  // { id: "stats", label: "GitHub Stats", icon: "📊" },
  { id: "socials", label: "Social Links", icon: "🔗" },
  { id: "preview", label: "Preview", icon: "👁️" },
];

export default function GeneratorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { generatedMarkdown } = useForm();
  const { addToast } = useToast();

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedMarkdown);
    addToast({
      title: "Copied!",
      description: "README copied to clipboard",
      variant: "success",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([generatedMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
    addToast({
      title: "Downloaded!",
      description: "README.md downloaded",
      variant: "success",
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-50 dark:bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        {/* <div className="grid lg:grid-cols-[1fr_1fr] gap-8">  */}
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
                  {/* TODO: Version 2.0 */}
                  {/* {currentStep === 2 && (
                    <GithubStatsStep
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )} */}
                  {currentStep === 2 && <SocialLinksSection />}
                  {currentStep === 3 && <PreviewStep addToast={addToast} />}
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

          {/* Right: Preview */}
          {/* <div className="hidden lg:block">
            <div className="sticky top-20 h-[calc(100vh-6rem)]">
              <PreviewPanel markdown={updateMarkdown} />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

// TODO: Version 2.0
// function GithubStatsStep({
//   formData,
//   setFormData,
// }: {
//   formData: FormData;
//   setFormData: (v: FormData) => void;
// }) {
//   const stats: { id: keyof FormData; label: string; desc: string }[] = [
//     {
//       id: "showStatsCard",
//       label: "GitHub Stats Card",
//       desc: "Shows commits, PRs, issues, stars",
//     },
//     { id: "showStreak", label: "Streak Stats", desc: "Contribution streak" },
//     { id: "showTopLangs", label: "Top Languages", desc: "Most used languages" },
//     { id: "showTrophies", label: "Trophies", desc: "GitHub achievements" },
//     {
//       id: "showActivity",
//       label: "Activity Graph",
//       desc: "Contribution calendar",
//     },
//     { id: "showViews", label: "Profile Views", desc: "Visitor counter" },
//   ];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold mb-1">GitHub Stats</h3>
//         <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
//           Choose which GitHub stats widgets to include.
//         </p>
//       </div>
//       <div className="space-y-3">
//         {stats.map((stat) => {
//           const checked = formData[stat.id] as boolean;
//           return (
//             <label
//               key={stat.id}
//               className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors"
//             >
//               <div
//                 className={cn(
//                   "h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors",
//                   checked
//                     ? "bg-indigo-600 border-indigo-600"
//                     : "border-zinc-300 dark:border-zinc-600",
//                 )}
//               >
//                 {checked && (
//                   <svg
//                     className="h-3 w-3 text-white"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={3}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 )}
//               </div>
//               <div className="flex-1">
//                 <div className="text-sm font-medium">{stat.label}</div>
//                 <div className="text-xs text-zinc-500 dark:text-zinc-400">
//                   {stat.desc}
//                 </div>
//               </div>
//               <input
//                 type="checkbox"
//                 className="sr-only"
//                 checked={checked}
//                 onChange={(e) =>
//                   setFormData({ ...formData, [stat.id]: e.target.checked })
//                 }
//               />
//             </label>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

function PreviewStep({
  addToast,
}: {
  addToast: (toast: {
    title: string;
    description?: string;
    variant?: ToastVariant;
  }) => void;
}) {
  const { generatedMarkdown } = useForm();

  return (
    <div className="h-[calc(100vh-6rem)]">
      <PreviewPanel markdown={generatedMarkdown} />
    </div>
  );
}
