import type { Metadata } from "next";
import { TemplateGallery } from "@/components/TemplateGallery";

export const metadata: Metadata = {
  title: "Templates | Gitfolio",
  description:
    "Browse and use pre-built README templates for your GitHub profile.",
};

export default function TemplatesPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-50 dark:bg-[#050505]">
      <TemplateGallery />
    </div>
  );
}
