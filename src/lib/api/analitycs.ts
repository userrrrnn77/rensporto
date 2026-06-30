// src/lib/api/analytics.ts
const BASE_URL = import.meta.env.VITE_URL_CORE;

export type AnalyticsStats = {
  totalViews: number;
  totalUnique: number;
  chartData: Array<{ date: string; count: number }>;
};

async function req<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { message?: string }).message ?? `HTTP ${res.status}`,
    );
  }
  return res.json() as Promise<T>;
}

export const analyticsApi = {
  stats: (): Promise<AnalyticsStats> => req<AnalyticsStats>("/analytics/stats"),
};
