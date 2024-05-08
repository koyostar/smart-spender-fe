import { fetchStats } from "./statistics-api";

export async function fetchStatsService() {
  try {
    const statistics = await fetchStats();
    return statistics;
  } catch (error) {
    throw error;
  }
}
