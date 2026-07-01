"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GitBranch,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PreviewPanel } from "@/components/PreviewPanel";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SAMPLE_MARKDOWN = `# Hi, I'm John Doe 👋

I'm a Full Stack Developer passionate about building amazing web applications.

## 🛠️ Skills

![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E?logo=javascript&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6?logo=typescript&logoColor=white&style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML-%23E34F26?logo=html5&logoColor=white&style=for-the-badge)
![CSS](https://img.shields.io/badge/CSS-%231572B6?logo=css3&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/React-%2361DAFB?logo=react&logoColor=white&style=for-the-badge)

## 🔗 Connect with me

![Facebook](https://img.shields.io/badge/Facebook-%231877F2?logo=facebook&logoColor=white&style=for-the-badge)
![YouTube](https://img.shields.io/badge/YouTube-%23FF0000?logo=youtube&logoColor=white&style=for-the-badge)
![LinkedIn](https://img.shields.io/badge/LinkedIn-%230A66C2?logo=linkedin&logoColor=white&style=for-the-badge)`;

const features = [
  {
    icon: Sparkles,
    title: "Multi-Step Generator",
    description:
      "Step-by-step wizard to create the perfect README without writing markdown manually.",
  },
  {
    icon: GitBranch,
    title: "GitHub Integration",
    description:
      "Import your profile data directly from GitHub API. Stats, repos, and more.",
  },
  {
    icon: Zap,
    title: "Live Preview",
    description:
      "See changes in real-time as you build your profile. Desktop, tablet, or mobile view.",
  },
  {
    icon: Users,
    title: "100+ Badges",
    description:
      "Thousands of Shields.io badges for skills, tools, social links, and achievements.",
  },
];

const stats = [
  { value: "50K+", label: "READMEs Generated" },
  { value: "120+", label: "Countries" },
  { value: "99%", label: "Satisfaction" },
  { value: "0", label: "Cost" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-950 dark:text-zinc-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-3xl" />
          <div className="absolute top-40 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-1.5 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              <span className="text-zinc-700 dark:text-zinc-300">
                Free, open-source, and forever.
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Build a beautiful{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                GitHub Profile
              </span>{" "}
              README
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Create a stunning GitHub profile README in minutes. Add skills,
              stats, widgets, and themes — all with live preview.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/generator"
                className="inline-flex items-center gap-2 h-12 px-8 text-base rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg shadow-zinc-900/20 dark:shadow-zinc-100/20 transition-colors font-medium"
              >
                Generate README <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-8 text-base rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium"
              >
                <GitBranch className="mr-2 h-4 w-4" /> View on GitHub
              </Link>
            </div>

            <div className="mt-16 relative">
              <PreviewPanel markdown={SAMPLE_MARKDOWN} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything you need to build the perfect profile
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              A complete toolkit for creating professional GitHub profile
              READMEs with zero markdown knowledge required.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300"
                >
                  <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-600/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mb-6 shadow-2xl shadow-indigo-500/20">
              <BookOpen className="h-8 w-8" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">
              Ready to build your profile?
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
              Join thousands of developers who have already created stunning
              GitHub profile READMEs with our generator.
            </p>
            <Link
              href="/generator"
              className="inline-flex items-center gap-2 h-14 px-10 text-lg rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-2xl shadow-zinc-900/20 dark:shadow-zinc-100/20 transition-colors font-medium"
            >
              Start Generating <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
