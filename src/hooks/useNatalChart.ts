import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useBirthData } from './useBirthData';
import { NatalChartApiService } from '../services/natal-chart/api.service';
import { NatalChartStorageService } from '../services/natal-chart/storage.service';
import { NatalChartFormatterService } from '../services/natal-chart/formatter.service';
import { NatalChartValidationService } from '../services/natal-chart/validation.service';
import type { NatalChartResponse } from '../types/natal-chart';

export function useNatalChart() {
  const { user } = useAuth();
  const { birthData } = useBirthData();
  const [chartData, setChartData] = useState<NatalChartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNatalChart() {
      if (!user || !birthData) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // First try to get from storage
        const storedChart = await NatalChartStorageService.getChart(user.uid);
        if (storedChart) {
          console.log('Using stored chart data');
          setChartData(storedChart);
          setLoading(false);
          return;
        }

        // If not in storage, fetch from API
        console.log('Fetching new chart data');
        const requestData = NatalChartFormatterService.formatRequestData(birthData, user);
        console.log('Request data:', requestData);

        const response = await NatalChartApiService.fetchNatalChart(requestData);
        
        if (!NatalChartValidationService.validateApiResponse(response)) {
          throw new Error('Invalid API response format');
        }

        // Save to storage
        await NatalChartStorageService.saveChart(user.uid, {
          userId: user.uid,
          ...response,
          createdAt: new Date()
        });

        setChartData(response);
      } catch (err) {
        console.error('Error fetching natal chart:', err);
        setError(err instanceof Error ? err.message : 'Failed to load natal chart data');
        setChartData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchNatalChart();
  }, [user, birthData]);

  return { chartData, loading, error };
}