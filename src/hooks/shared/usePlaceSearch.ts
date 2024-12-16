import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';
import { PlacesService } from '../../services/places.service';
import type { PlaceDetails, PlacePrediction } from '../../types/places';

export function usePlaceSearch() {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query);

  const searchPlaces = useCallback(async (input: string) => {
    if (!input.trim()) {
      setPredictions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await PlacesService.searchPlaces(input);
      setPredictions(results);
    } catch (err) {
      setError('Unable to search locations. Please try again.');
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getPlaceDetails = useCallback(async (placeId: string): Promise<PlaceDetails> => {
    setLoading(true);
    setError(null);

    try {
      const details = await PlacesService.getPlaceDetails(placeId);
      if (!details.city || !details.country) {
        throw new Error('Invalid location data');
      }
      return details;
    } catch (err) {
      setError('Unable to fetch location details. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    query,
    setQuery,
    predictions,
    loading,
    error,
    searchPlaces,
    getPlaceDetails
  };
}