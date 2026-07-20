"use client";

export function GithubStatsSection() {
  // const { data, updateData } = useForm();
  // const toggle = (key: keyof typeof data.githubStats) => {
  //   updateData({ githubStats: { ...data.githubStats, [key]: !data.githubStats[key] } });
  // };
  // const options = [
  //   { key: "statsCard" as const, label: "GitHub Stats Card", desc: "Shows commits, PRs, issues, and stars" },
  //   { key: "topLanguages" as const, label: "Top Languages", desc: "Most used programming languages" },
  //   { key: "streakStats" as const, label: "Streak Stats", desc: "GitHub contribution streak" },
  //   { key: "trophies" as const, label: "Trophies", desc: "GitHub profile trophies" },
  // ];
  // return (
  //   <div className="space-y-3">
  //     {options.map(({ key, label, desc }) => (
  //       <label
  //         key={key}
  //         className="flex items-center gap-3 p-3 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145]
  //           cursor-pointer hover:bg-black/[.02] dark:hover:bg-white/[.02] transition-colors"
  //       >
  //         <div
  //           className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors
  //             ${
  //               data.githubStats[key]
  //                 ? "bg-foreground border-foreground"
  //                 : "border-black/[.15] dark:border-white/[.25]"
  //             }`}
  //         >
  //           {data.githubStats[key] && (
  //             <svg className="w-3 h-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  //             </svg>
  //           )}
  //         </div>
  //         <div className="flex-1">
  //           <span className="text-sm font-medium block">{label}</span>
  //           <span className="text-xs text-zinc-500 dark:text-zinc-400">{desc}</span>
  //         </div>
  //         <input
  //           type="checkbox"
  //           checked={data.githubStats[key]}
  //           onChange={() => toggle(key)}
  //           className="sr-only"
  //         />
  //       </label>
  //     ))}
  //   </div>
  // );
}
