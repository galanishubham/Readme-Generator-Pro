"use client";

import { useForm } from "@/context/FormContext";
import { Copy, Download, RotateCcw, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function ActionButtons() {
  const { generatedMarkdown, reset } = useForm();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = generatedMarkdown;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-3"
    >
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
          bg-foreground text-background hover:opacity-90 transition-opacity"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? "Copied!" : "Copy Markdown"}
      </button>
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
          border border-solid border-black/[.08] dark:border-white/[.145]
          hover:bg-black/[.04] dark:hover:bg-[#1a1a1a] transition-colors"
      >
        <Download className="w-4 h-4" />
        Download README.md
      </button>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
          text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900
          hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
    </motion.div>
  );
}
