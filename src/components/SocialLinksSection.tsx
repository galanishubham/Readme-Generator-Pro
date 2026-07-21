"use client";

import { SOCIAL_PLATFORMS } from "@/app/generator/data";
import { SocialPlatform } from "@/app/generator/types";
import { useForm } from "@/context/FormContext";

export function SocialLinksSection() {
  const { data, updateData } = useForm();

  function getPlaceholder(platform: SocialPlatform): string {
    if (platform.type === "email") return "john@example.com";
    if (platform.type === "username") return "Username";
    return "https://example.com";
  }

  const updateSocial = (platform: string, url: string) => {
    updateData({
      ...data,
      socials: {
        ...data.socials,
        [platform]: url,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Social Links</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Add your social media profiles. Enter the full URL for each platform.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SOCIAL_PLATFORMS.map((platform) => {
          const value = data.socials[platform.id] || "";
          return (
            <div key={platform.id} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-20 h-8 flex items-center justify-center">
                <img
                  src={`https://img.shields.io/badge/${encodeURIComponent(platform.name)}-${encodeURIComponent(platform.color)}?logo=${platform.logo}&logoColor=white&style=for-the-badge`}
                  alt={platform.name}
                  className="max-h-7 max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <input
                  type={
                    platform.type === "email"
                      ? "email"
                      : platform.type === "url"
                        ? "url"
                        : "text"
                  }
                  className="w-full h-10 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder={getPlaceholder(platform)}
                  value={value}
                  onChange={(e) => updateSocial(platform.id, e.target.value)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
