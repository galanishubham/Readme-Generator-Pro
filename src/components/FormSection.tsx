"use client";

import { motion } from "framer-motion";
import { Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface FormSectionProps {
  id: string;
  label: string;
  icon: string;
  enabled: boolean;
  children: React.ReactNode;
}

export function FormSection({ id, label, icon, enabled, children }: FormSectionProps) {
  if (!enabled) return null;

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-solid border-black/[.08] dark:border-white/[.08] bg-white dark:bg-[#141414] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">{icon}</span>
        <h3 className="text-base font-bold tracking-tight">{label}</h3>
      </div>
      {children}
    </motion.div>
  );
}
