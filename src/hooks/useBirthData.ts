import { useState, useEffect, useCallback } from 'react';
import { BirthDataService } from '../services/birthData.service';
import { useAuth } from './useAuth';
import type { BirthData } from '../types/birthData';
import type { PlaceDetails } from '../types/places';

export function useBirthData() {
  const { user } = useAuth();
  const [birthData, setBirthData] = useState<BirthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchBirthData = useCallback(async () => {
    if (!user) {
      setBirthData(null);
      setLoading(false);
      setDataFetched(true);
      return;
    }

    try {
      setLoading(true);
      const data = await BirthDataService.getBirthData(user.uid);
      setBirthData(data);
      setDataFetched(true);
      setError(null);
    } catch (err) {
      console.error('Error fetching birth data:', err);
      setError('Failed to load birth data');
      setBirthData(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBirthData();
  }, [fetchBirthData]);

  const updateBirthData = async (data: PlaceDetails & { birthDate: string; birthTime: string }) => {
    if (!user) throw new Error('User must be authenticated');
    
    try {
      setError(null);
      setLoading(true);
      const updatedData = await BirthDataService.setBirthData(user.uid, data);
      setBirthData(updatedData);
      return updatedData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update birth data';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refresh = useCallback(async () => {
    await fetchBirthData();
  }, [fetchBirthData]);

  const isBirthDataComplete = useCallback(() => {
    if (!birthData) return false;
    return !!(
      birthData.birthDate &&
      birthData.birthTime &&
      birthData.birthPlace &&
      birthData.city &&
      birthData.country &&
      birthData.countryCode
    );
  }, [birthData]);

  return {
    birthData,
    loading,
    error,
    updateBirthData,
    dataFetched,
    refresh,
    isBirthDataComplete
  };
}