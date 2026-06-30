export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  location: string;
  blog: string;
  twitter_username: string | null;
  html_url: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export async function fetchGitHubProfile(username: string): Promise<GitHubUser | null> {
  if (!username.trim()) return null;
  try {
    const res = await fetch(`https://api.github.com/users/${username.trim()}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data as GitHubUser;
  } catch {
    return null;
  }
}
