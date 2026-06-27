import { useEffect, useState } from "react";

type GitHubStats = {
  repos: number;
  commits: number;
  loading: boolean;
  error: boolean;
};

const GITHUB_USERNAME = "userrrrnn77";

export function useGitHubStats(): GitHubStats {
  const [repos, setRepos] = useState(0);
  const [commits, setCommits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          },
        );
        if (!reposRes.ok) throw new Error("repos fetch failed");
        const reposData = await reposRes.json();

        const publicRepos: { name: string; fork: boolean }[] = reposData;

        const ownRepos = publicRepos.filter((r) => !r.fork);
        setRepos(ownRepos.length);

        const commitCounts = await Promise.all(
          ownRepos.map(async (repo) => {
            try {
              const contribRes = await fetch(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/contributors?per_page=100&anon=false`,
                {
                  headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, 
                  },
                },
              );
              if (!contribRes.ok) return 0;
              const contribs: { login: string; contributions: number }[] =
                await contribRes.json();

              const mine = contribs.find(
                (c) => c.login.toLowerCase() === GITHUB_USERNAME.toLowerCase(),
              );
              return mine?.contributions ?? 0;
            } catch {
              return 0;
            }
          }),
        );

        const totalCommits = commitCounts.reduce((a, b) => a + b, 0);
        setCommits(totalCommits);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { repos, commits, loading, error };
}
