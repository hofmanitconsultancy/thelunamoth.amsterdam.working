import { useState, useCallback } from 'react';
import { AstrologyService } from '../services/astrology.service';
import type { AstrologyChart } from '../types/astrology';

export function useAstrology() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chart, setChart] = useState<AstrologyChart | null>(null);

  const saveChart = async (userId: string, chartData: any): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await AstrologyService.saveChart(userId, chartData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save chart data';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchChart = useCallback(async (userId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const data = await AstrologyService.getChart(userId);
      setChart(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch chart data';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    chart,
    loading,
    error,
    saveChart,
    fetchChart
  };
}