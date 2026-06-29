// src/hooks/useGitHubStats.ts
// Ganti seluruh isi file ini — sekarang fetch dari backend, bukan langsung ke GitHub API

import { useEffect, useState } from "react";

type GitHubStats = {
  repos: number;
  commits: number;
  loading: boolean;
  error: boolean;
};

const BASE_URL = import.meta.env.VITE_URL_CORE;

export function useGitHubStats(): GitHubStats {
  const [repos, setRepos] = useState(0);
  const [commits, setCommits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/github/stats`)
      .then((res) => {
        if (!res.ok) throw new Error("stats fetch failed");
        return res.json() as Promise<{
          repos: number;
          commits: number;
          error?: true;
        }>;
      })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setRepos(data.repos);
          setCommits(data.commits);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { repos, commits, loading, error };
}
