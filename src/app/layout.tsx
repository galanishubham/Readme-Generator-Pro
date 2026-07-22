import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppProviders } from "@/components/AppProviders";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gitfolio — GitHub Profile README Generator",
    template: "%s | Gitfolio",
  },
  description:
    "Build a beautiful GitHub profile README with our modern generator. Multi-step wizard, live preview, themes, badges, and GitHub stats.",
  keywords: [
    "github",
    "readme",
    "generator",
    "profile",
    "badges",
    "github-stats",
    "portfolio",
    "developer",
  ],
  authors: [{ name: "Gitfolio" }],
  creator: "Gitfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Gitfolio.in",
    siteName: "Gitfolio",
    title: "Gitfolio — GitHub Profile README Generator",
    description:
      "Build a beautiful GitHub profile README with our modern generator.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gitfolio — GitHub Profile README Generator",
    description:
      "Build a beautiful GitHub profile README with our modern generator.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-zinc-50 text-zinc-950 dark:bg-[#050505] dark:text-zinc-50`}
      >
        <ThemeProvider>
          <TooltipProvider>
            <AppProviders>
              <div className="relative min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Analytics />
              <Toaster />
            </AppProviders>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
