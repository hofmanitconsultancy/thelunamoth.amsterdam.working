import React, { useEffect, useRef, useState } from 'react';
import { usePlaceSearch } from '../../hooks/shared/usePlaceSearch';
import { PlaceSearchInput } from './PlaceSearchInput';
import { PlaceSearchResults } from './PlaceSearchResults';
import type { PlaceDetails, PlacePrediction } from '../../types/places';

interface PlaceSearchProps {
  id: string;
  onPlaceSelect: (place: PlaceDetails) => void;
  defaultValue?: string;
  error?: string;
  required?: boolean;
}

export function PlaceSearch({
  id,
  onPlaceSelect,
  defaultValue = '',
  error: externalError,
  required
}: PlaceSearchProps) {
  const {
    query,
    setQuery,
    predictions,
    loading,
    error: searchError,
    searchPlaces,
    getPlaceDetails
  } = usePlaceSearch();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedPrediction, setSelectedPrediction] = useState<PlacePrediction | null>(null);

  useEffect(() => {
    if (defaultValue) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query && !selectedPrediction) {
      searchPlaces(query);
    }
  }, [query, searchPlaces, selectedPrediction]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedPrediction(null);
    setIsOpen(true);
  };

  const handlePlaceSelect = async (prediction: PlacePrediction) => {
    try {
      setSelectedPrediction(prediction);
      const details = await getPlaceDetails(prediction.place_id);
      setQuery(details.formattedAddress);
      setIsOpen(false);
      onPlaceSelect(details);
    } catch (err) {
      // Error is handled by the hook
      setSelectedPrediction(null);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <PlaceSearchInput
        id={id}
        value={query}
        onChange={handleInputChange}
        onFocus={() => predictions.length > 0 && !selectedPrediction && setIsOpen(true)}
        error={externalError || searchError}
        isLoading={loading}
        required={required}
      />

      <PlaceSearchResults
        predictions={predictions}
        onSelect={handlePlaceSelect}
        isVisible={isOpen && !selectedPrediction}
        inputId={id}
      />
    </div>
  );
}