"use client";

import { useCallback, useState } from "react";
import { useForm } from "@/context/FormContext";
import { fetchGitHubProfile } from "@/lib/githubApi";

export function useGitHubProfile() {
  // const { data, updateData } = useForm();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const fetchProfile = useCallback(async () => {
  //   const username = data.socialLinks.github || data.username;
  //   if (!username.trim()) {
  //     setError("Please enter a GitHub username first");
  //     return;
  //   }
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const user = await fetchGitHubProfile(username);
  //     if (!user) {
  //       setError("User not found or API rate limited");
  //       return;
  //     }
  //     updateData({
  //       fullName: user.name || username,
  //       // username: user.login,
  //       bio: user.bio || "",
  //       socialLinks: {
  //         github: user.login,
  //         linkedin: data.socialLinks.linkedin,
  //         twitter: user.twitter_username
  //           ? `https://twitter.com/${user.twitter_username}`
  //           : data.socialLinks.twitter,
  //         portfolio: user.blog || data.socialLinks.portfolio,
  //       },
  //     });
  //   } catch {
  //     setError("Failed to fetch profile. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [data.socialLinks.github, data.socialLinks, updateData]);
  // return { fetchProfile, loading, error };
}
