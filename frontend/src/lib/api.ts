export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export type GithubProject = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  homepage: string | null;
  is_fork: boolean;
};

export type GithubProjectsResponse = {
  projects: GithubProject[];
};

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type GithubStats = {
  public_repos: number | null;
  total_stars: number | null;
  followers: number | null;
  contribution_weeks: ContributionWeek[] | null;
};

export type GithubStatsResponse = {
  stats: GithubStats;
};

export type ContactRequest = {
  name: string;
  email: string;
  message: string;
  company?: string;
};

export type ContactResponse = {
  success: boolean;
  detail: string;
};
