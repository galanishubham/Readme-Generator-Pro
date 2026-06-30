"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Copy, Download, Save, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { PreviewPanel } from "@/components/PreviewPanel";

type ToastVariant = "default" | "success" | "error" | "warning";

interface FormData {
  username: string;
  bio: string;
  skills: string[];
  showStatsCard: boolean;
  showStreak: boolean;
  showTopLangs: boolean;
  showTrophies: boolean;
  showActivity: boolean;
  showViews: boolean;
  widgets: string[];
}

interface SkillDef {
  id: string;
  name: string;
  color: string;
  logo: string;
  category: string;
}

const SKILL_CATEGORIES = [
  "Languages",
  "Hosting",
  "Frameworks & Libraries",
  "Database & Server",
  "Design",
  "ML / DL",
  "CI / CD",
  "Testing",
  "Others",
];

const PREDEFINED_SKILLS: SkillDef[] = [
  { id: "html", name: "HTML", color: "#E34F26", logo: "html5", category: "Languages" },
  { id: "css", name: "CSS", color: "#1572B6", logo: "css3", category: "Languages" },
  { id: "javascript", name: "JavaScript", color: "#F7DF1E", logo: "javascript", category: "Languages" },
  { id: "typescript", name: "TypeScript", color: "#3178C6", logo: "typescript", category: "Languages" },
  { id: "python", name: "Python", color: "#3776AB", logo: "python", category: "Languages" },
  { id: "java", name: "Java", color: "#007396", logo: "openjdk", category: "Languages" },
  { id: "go", name: "Go", color: "#00ADD8", logo: "go", category: "Languages" },
  { id: "rust", name: "Rust", color: "#DEA584", logo: "rust", category: "Languages" },
  { id: "csharp", name: "C#", color: "#239120", logo: "csharp", category: "Languages" },
  { id: "cpp", name: "C++", color: "#00599C", logo: "cpp", category: "Languages" },
  { id: "php", name: "PHP", color: "#777BB4", logo: "php", category: "Languages" },
  { id: "ruby", name: "Ruby", color: "#CC342D", logo: "ruby", category: "Languages" },
  { id: "swift", name: "Swift", color: "#FA7343", logo: "swift", category: "Languages" },
  { id: "kotlin", name: "Kotlin", color: "#7F52FF", logo: "kotlin", category: "Languages" },
  { id: "dart", name: "Dart", color: "#0175C2", logo: "dart", category: "Languages" },
  { id: "scala", name: "Scala", color: "#DC322F", logo: "scala", category: "Languages" },
  { id: "r", name: "R", color: "#276DC3", logo: "r", category: "Languages" },
  { id: "matlab", name: "MATLAB", color: "#E16737", logo: "mathworks", category: "Languages" },
  { id: "vercel", name: "Vercel", color: "#000000", logo: "vercel", category: "Hosting" },
  { id: "netlify", name: "Netlify", color: "#00C7B7", logo: "netlify", category: "Hosting" },
  { id: "aws", name: "AWS", color: "#FF9900", logo: "amazonaws", category: "Hosting" },
  { id: "azure", name: "Azure", color: "#0078D4", logo: "microsoftazure", category: "Hosting" },
  { id: "gcp", name: "GCP", color: "#4285F4", logo: "googlecloud", category: "Hosting" },
  { id: "cloudflare", name: "Cloudflare", color: "#F48120", logo: "cloudflare", category: "Hosting" },
  { id: "heroku", name: "Heroku", color: "#430098", logo: "heroku", category: "Hosting" },
  { id: "firebase", name: "Firebase", color: "#FFCA28", logo: "firebase", category: "Hosting" },
  { id: "docker", name: "Docker", color: "#2496ED", logo: "docker", category: "Hosting" },
  { id: "kubernetes", name: "Kubernetes", color: "#326CE5", logo: "kubernetes", category: "Hosting" },
  { id: "terraform", name: "Terraform", color: "#7B42BC", logo: "terraform", category: "Hosting" },
  { id: "react", name: "React", color: "#61DAFB", logo: "react", category: "Frameworks & Libraries" },
  { id: "vue", name: "Vue", color: "#4FC08D", logo: "vuedotjs", category: "Frameworks & Libraries" },
  { id: "angular", name: "Angular", color: "#DD0031", logo: "angular", category: "Frameworks & Libraries" },
  { id: "nextjs", name: "Next.js", color: "#000000", logo: "nextdotjs", category: "Frameworks & Libraries" },
  { id: "nuxtjs", name: "Nuxt.js", color: "#00DC82", logo: "nuxtdotjs", category: "Frameworks & Libraries" },
  { id: "svelte", name: "Svelte", color: "#FF3E00", logo: "svelte", category: "Frameworks & Libraries" },
  { id: "tailwind", name: "Tailwind", color: "#06B6D4", logo: "tailwindcss", category: "Frameworks & Libraries" },
  { id: "bootstrap", name: "Bootstrap", color: "#7952B3", logo: "bootstrap", category: "Frameworks & Libraries" },
  { id: "jquery", name: "jQuery", color: "#0769AD", logo: "jquery", category: "Frameworks & Libraries" },
  { id: "nodejs", name: "Node.js", color: "#339933", logo: "nodejs", category: "Frameworks & Libraries" },
  { id: "express", name: "Express", color: "#000000", logo: "express", category: "Frameworks & Libraries" },
  { id: "django", name: "Django", color: "#092E20", logo: "django", category: "Frameworks & Libraries" },
  { id: "flask", name: "Flask", color: "#000000", logo: "flask", category: "Frameworks & Libraries" },
  { id: "spring", name: "Spring", color: "#6DB33F", logo: "spring", category: "Frameworks & Libraries" },
  { id: "dotnet", name: ".NET", color: "#512BD4", logo: "dotnet", category: "Frameworks & Libraries" },
  { id: "laravel", name: "Laravel", color: "#FF2D20", logo: "laravel", category: "Frameworks & Libraries" },
  { id: "flutter", name: "Flutter", color: "#02569B", logo: "flutter", category: "Frameworks & Libraries" },
  { id: "reactnative", name: "React Native", color: "#61DAFB", logo: "react", category: "Frameworks & Libraries" },
  { id: "graphql", name: "GraphQL", color: "#E10098", logo: "graphql", category: "Frameworks & Libraries" },
  { id: "mongodb", name: "MongoDB", color: "#47A248", logo: "mongodb", category: "Database & Server" },
  { id: "postgresql", name: "PostgreSQL", color: "#4169E1", logo: "postgresql", category: "Database & Server" },
  { id: "mysql", name: "MySQL", color: "#4479A1", logo: "mysql", category: "Database & Server" },
  { id: "redis", name: "Redis", color: "#DC382D", logo: "redis", category: "Database & Server" },
  { id: "sqlite", name: "SQLite", color: "#003B57", logo: "sqlite", category: "Database & Server" },
  { id: "elasticsearch", name: "Elasticsearch", color: "#FEC514", logo: "elasticsearch", category: "Database & Server" },
  { id: "nginx", name: "NGINX", color: "#009639", logo: "nginx", category: "Database & Server" },
  { id: "apache", name: "Apache", color: "#D22128", logo: "apache", category: "Database & Server" },
  { id: "mariadb", name: "MariaDB", color: "#003545", logo: "mariadb", category: "Database & Server" },
  { id: "figma", name: "Figma", color: "#F24E1E", logo: "figma", category: "Design" },
  { id: "adobexd", name: "Adobe XD", color: "#FF61F6", logo: "adobe", category: "Design" },
  { id: "sketch", name: "Sketch", color: "#F7B500", logo: "sketch", category: "Design" },
  { id: "photoshop", name: "Photoshop", color: "#31A8FF", logo: "adobe", category: "Design" },
  { id: "illustrator", name: "Illustrator", color: "#FF9A00", logo: "adobe", category: "Design" },
  { id: "sass", name: "SASS", color: "#CC6699", logo: "sass", category: "Design" },
  { id: "tensorflow", name: "TensorFlow", color: "#FF6F00", logo: "tensorflow", category: "ML / DL" },
  { id: "pytorch", name: "PyTorch", color: "#EE4C2C", logo: "pytorch", category: "ML / DL" },
  { id: "keras", name: "Keras", color: "#D00000", logo: "keras", category: "ML / DL" },
  { id: "scikitlearn", name: "Scikit-learn", color: "#F7931E", logo: "scikitlearn", category: "ML / DL" },
  { id: "huggingface", name: "Hugging Face", color: "#FFD21E", logo: "huggingface", category: "ML / DL" },
  { id: "opencv", name: "OpenCV", color: "#5C3EE8", logo: "opencv", category: "ML / DL" },
  { id: "pandas", name: "Pandas", color: "#150458", logo: "pandas", category: "ML / DL" },
  { id: "numpy", name: "NumPy", color: "#013243", logo: "numpy", category: "ML / DL" },
  { id: "githubactions", name: "GitHub Actions", color: "#2088FF", logo: "githubactions", category: "CI / CD" },
  { id: "jenkins", name: "Jenkins", color: "#D24939", logo: "jenkins", category: "CI / CD" },
  { id: "gitlabci", name: "GitLab CI", color: "#FC6D26", logo: "gitlab", category: "CI / CD" },
  { id: "travisci", name: "Travis CI", color: "#E2096E", logo: "travisci", category: "CI / CD" },
  { id: "circleci", name: "CircleCI", color: "#343434", logo: "circleci", category: "CI / CD" },
  { id: "argo", name: "Argo CD", color: "#EF7B4D", logo: "argo", category: "CI / CD" },
  { id: "jest", name: "Jest", color: "#C21325", logo: "jest", category: "Testing" },
  { id: "mocha", name: "Mocha", color: "#8D6748", logo: "mocha", category: "Testing" },
  { id: "cypress", name: "Cypress", color: "#69D3A7", logo: "cypress", category: "Testing" },
  { id: "selenium", name: "Selenium", color: "#43B02A", logo: "selenium", category: "Testing" },
  { id: "pytest", name: "Pytest", color: "#0A9EDC", logo: "pytest", category: "Testing" },
  { id: "junit", name: "JUnit", color: "#25A162", logo: "junit5", category: "Testing" },
  { id: "storybook", name: "Storybook", color: "#FF4785", logo: "storybook", category: "Testing" },
  { id: "git", name: "Git", color: "#F05032", logo: "git", category: "Others" },
  { id: "github", name: "GitHub", color: "#181717", logo: "github", category: "Others" },
  { id: "gitlab", name: "GitLab", color: "#FC6D26", logo: "gitlab", category: "Others" },
  { id: "bitbucket", name: "Bitbucket", color: "#0052CC", logo: "bitbucket", category: "Others" },
  { id: "linux", name: "Linux", color: "#FCC624", logo: "linux", category: "Others" },
  { id: "ubuntu", name: "Ubuntu", color: "#E95420", logo: "ubuntu", category: "Others" },
  { id: "windows", name: "Windows", color: "#0078D6", logo: "windows", category: "Others" },
  { id: "macos", name: "macOS", color: "#000000", logo: "apple", category: "Others" },
  { id: "raspberrypi", name: "Raspberry Pi", color: "#A22846", logo: "raspberrypi", category: "Others" },
];

const steps = [
  { id: "basic", label: "Basic Info", icon: "👋" },
  { id: "skills", label: "Skills", icon: "🛠️" },
  { id: "stats", label: "GitHub Stats", icon: "📊" },
  { id: "widgets", label: "Widgets", icon: "🧩" },
  { id: "preview", label: "Preview", icon: "👁️" },
];

function generateReadme(data: FormData): string {
  const skillsList = data.skills
    .map((id) => PREDEFINED_SKILLS.find((s) => s.id === id))
    .filter(Boolean) as typeof PREDEFINED_SKILLS;

  let md = "";
  md += `# Hi, I'm ${data.username || "Developer"} 👋\n\n`;
  if (data.bio) {
    md += `${data.bio}\n\n`;
  }
  if (skillsList.length > 0) {
    md += "## 🛠️ Skills\n\n";
    md += skillsList.map((s) => `![${s.name}](https://img.shields.io/badge/${encodeURIComponent(s.name)}-${encodeURIComponent(s.color)}?logo=${s.logo}&logoColor=white&style=for-the-badge)`).join("\n\n") + "\n\n";
  }
  if (data.showStatsCard && data.username) {
    md += `## 📊 GitHub Stats\n\n`;
    md += `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${data.username})\n\n`;
  }
  if (data.showStreak && data.username) {
    md += `![Streak](https://github-readme-streak-stats.herokuapp.com/?user=${data.username})\n\n`;
  }
  if (data.showTopLangs && data.username) {
    md += `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${data.username})\n\n`;
  }
  if (data.showTrophies && data.username) {
    md += `![Trophies](https://github-profile-trophy.vercel.app/?username=${data.username}&theme=radical&no-bg=true&no-frame=true)\n\n`;
  }
  if (data.showActivity && data.username) {
    md += `![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${data.username})\n\n`;
  }
  if (data.widgets.length > 0 && data.username) {
    md += "## 🧩 Widgets\n\n";
    data.widgets.forEach((w) => {
      const widgetMd: Record<string, string> = {
        visitor: `![Visitor Count](https://profile-counter.glitch.me/${data.username}/count.svg)`,
        spotify: "![Spotify](https://spotify-github-profile.kittenaom.vercel.app/api/view?uid=YOUR_SPOTIFY_ID)",
        wakatime: "![Wakatime](https://github-readme-stats.vercel.app/api/wakatime?username=YOUR_WAKATIME_ID)",
        holopin: "![Holopin Badges](https://holopin.me/YOUR_HOLOPIN_ID)",
        buymeacoffee: `[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/${data.username})`,
        kofi: `[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/${data.username})`,
        discord: "[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](YOUR_DISCORD_INVITE)",
        coding: "![Coding GIF](https://github.com/YOUR_USERNAME/YOUR_USERNAME/blob/main/coding.gif)",
        custom: "![Custom](https://via.placeholder.com/500x200?text=Custom+Image)",
      };
      if (widgetMd[w]) md += widgetMd[w] + "\n\n";
    });
  }
  return md;
}

export default function GeneratorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { addToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    bio: "",
    skills: [],
    showStatsCard: true,
    showStreak: true,
    showTopLangs: true,
    showTrophies: false,
    showActivity: false,
    showViews: false,
    widgets: [] as string[],
  });

  const updateMarkdown = useMemo(() => {
    return generateReadme(formData);
  }, [formData]);

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleCopy = async () => {
    await navigator.clipboard.writeText(updateMarkdown);
    addToast({ title: "Copied!", description: "README copied to clipboard", variant: "success" });
  };

  const handleDownload = () => {
    const blob = new Blob([updateMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
    addToast({ title: "Downloaded!", description: "README.md downloaded", variant: "success" });
  };

  const toggleWidget = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      widgets: prev.widgets.includes(id)
        ? prev.widgets.filter((w) => w !== id)
        : [...prev.widgets, id],
    }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-50 dark:bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">README Generator</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Enter your GitHub username and write a short intro.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              <Copy className="h-4 w-4" /> Copy
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <Download className="h-4 w-4" /> Download
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr,1fr] gap-8">
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
                      : "bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
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
                  {currentStep === 0 && <BasicInfoStep formData={formData} setFormData={setFormData} />}
                  {currentStep === 1 && <SkillsStep formData={formData} setFormData={setFormData} />}
                  {currentStep === 2 && <GithubStatsStep formData={formData} setFormData={setFormData} />}
                  {currentStep === 3 && <WidgetsStep formData={formData} toggleWidget={toggleWidget} />}
                  {currentStep === 4 && <PreviewStep formData={formData} addToast={addToast} />}
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
                      ? "opacity-50 cursor-not-allowed text-zinc-400"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  )}
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <button
                  onClick={next}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg"
                >
                  {currentStep === steps.length - 1 ? "Finish" : "Next"} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-20 h-[calc(100vh-6rem)]">
              <PreviewPanel markdown={updateMarkdown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BasicInfoStep({ formData, setFormData }: { formData: FormData; setFormData: (v: FormData) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Basic Information</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Enter your GitHub username and write a short introduction.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">GitHub Username</label>
          <input
            type="text"
            className="w-full h-10 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            placeholder="johndoe"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Introduction / Bio</label>
          <textarea
            className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
            rows={5}
            placeholder="Write a short introduction about yourself, your work, interests, or anything you'd like visitors to know..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function SkillsStep({ formData, setFormData }: { formData: FormData; setFormData: (v: FormData) => void }) {
  const toggleSkill = (id: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.includes(id)
        ? formData.skills.filter((s) => s !== id)
        : [...formData.skills, id],
    });
  };

  const grouped = SKILL_CATEGORIES.map((category) => ({
    category,
    skills: PREDEFINED_SKILLS.filter((s) => s.category === category),
  })).filter((group) => group.skills.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Skills & Technologies</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Click to select skills. Selected badges will appear in your README.
        </p>
      </div>
      <div className="space-y-6">
        {grouped.map((group) => (
          <div key={group.category}>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{group.category}</h4>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const isSelected = formData.skills.includes(skill.id);
                return (
                  <button
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={cn(
                      "inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 shadow-sm"
                        : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                    )}
                  >
                    <img
                      src={`https://img.shields.io/badge/${encodeURIComponent(skill.name)}-${encodeURIComponent(skill.color)}?logo=${skill.logo}&logoColor=white&style=for-the-badge`}
                      alt={skill.name}
                      className="h-5"
                      loading="lazy"
                    />
                    {isSelected && (
                      <span className="ml-1 text-indigo-600 dark:text-indigo-400 text-xs">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GithubStatsStep({ formData, setFormData }: { formData: FormData; setFormData: (v: FormData) => void }) {
  const stats: { id: keyof FormData; label: string; desc: string }[] = [
    { id: "showStatsCard", label: "GitHub Stats Card", desc: "Shows commits, PRs, issues, stars" },
    { id: "showStreak", label: "Streak Stats", desc: "Contribution streak" },
    { id: "showTopLangs", label: "Top Languages", desc: "Most used languages" },
    { id: "showTrophies", label: "Trophies", desc: "GitHub achievements" },
    { id: "showActivity", label: "Activity Graph", desc: "Contribution calendar" },
    { id: "showViews", label: "Profile Views", desc: "Visitor counter" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">GitHub Stats</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Choose which GitHub stats widgets to include.
        </p>
      </div>
      <div className="space-y-3">
        {stats.map((stat) => {
          const checked = formData[stat.id] as boolean;
          return (
            <label
              key={stat.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors"
            >
              <div
                className={cn(
                  "h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors",
                  checked
                    ? "bg-indigo-600 border-indigo-600"
                    : "border-zinc-300 dark:border-zinc-600"
                )}
              >
                {checked && (
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{stat.label}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{stat.desc}</div>
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={(e) => setFormData({ ...formData, [stat.id]: e.target.checked })}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}

function WidgetsStep({ formData, toggleWidget }: { formData: FormData; toggleWidget: (id: string) => void }) {
  const widgets = [
    { id: "visitor", label: "Visitor Counter", icon: "👁️" },
    { id: "spotify", label: "Spotify Now Playing", icon: "🎵" },
    { id: "wakatime", label: "Wakatime", icon: "⏱️" },
    { id: "holopin", label: "Holopin Badges", icon: "🏅" },
    { id: "buymeacoffee", label: "Buy Me a Coffee", icon: "☕" },
    { id: "kofi", label: "Ko-fi", icon: "💖" },
    { id: "discord", label: "Discord Presence", icon: "💬" },
    { id: "coding", label: "Coding GIF", icon: "💻" },
    { id: "custom", label: "Custom Image", icon: "🖼️" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Widgets</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Add fun widgets and integrations to your profile.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {widgets.map((widget) => {
          const active = formData.widgets.includes(widget.id);
          return (
            <button
              key={widget.id}
              onClick={() => toggleWidget(widget.id)}
              className={cn(
                "p-4 rounded-xl border transition-all text-left group",
                active
                  ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                  : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              )}
            >
              <span className="text-2xl mb-2 block">{widget.icon}</span>
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                )}
              >
                {widget.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PreviewStep({ formData, addToast }: { formData: FormData; addToast: (toast: { title: string; description?: string; variant?: ToastVariant }) => void }) {
  const md = generateReadme(formData);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Preview & Export</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Review your README and export it when ready.
        </p>
      </div>
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
        <pre className="text-xs text-zinc-700 dark:text-zinc-300 font-mono whitespace-pre-wrap overflow-auto max-h-96">
          {md}
        </pre>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => {
            navigator.clipboard.writeText(md);
            addToast({ title: "Copied!", description: "README copied to clipboard", variant: "success" });
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          <Copy className="h-4 w-4" /> Copy to Clipboard
        </button>
        <button
          onClick={() => {
            const blob = new Blob([md], { type: "text/markdown" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "README.md";
            a.click();
            URL.revokeObjectURL(url);
            addToast({ title: "Downloaded!", description: "README.md downloaded", variant: "success" });
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
        >
          <Download className="h-4 w-4" /> Download README.md
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <Save className="h-4 w-4" /> Save Draft
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <Share2 className="h-4 w-4" /> Share Config
        </button>
      </div>
    </div>
  );
}
