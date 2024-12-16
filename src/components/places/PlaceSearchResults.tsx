import React from 'react';
import type { PlacePrediction } from '../../types/places';

interface PlaceSearchResultsProps {
  predictions: PlacePrediction[];
  onSelect: (prediction: PlacePrediction) => void;
  isVisible: boolean;
  inputId: string;
}

export function PlaceSearchResults({
  predictions,
  onSelect,
  isVisible,
  inputId
}: PlaceSearchResultsProps) {
  if (!isVisible || predictions.length === 0) return null;

  const listId = `${inputId}-results`;

  return (
    <div 
      className="absolute z-10 w-full mt-1 bg-purple-900 rounded-md shadow-lg max-h-60 overflow-auto"
      role="listbox"
      id={listId}
      aria-label="Search results"
    >
      {predictions.map((prediction, index) => (
        <button
          key={prediction.place_id}
          onClick={() => onSelect(prediction)}
          role="option"
          aria-selected={false}
          className="w-full text-left px-4 py-2 hover:bg-purple-800 text-white focus:outline-none focus:bg-purple-800"
          tabIndex={0}
        >
          {prediction.description}
        </button>
      ))}
    </div>
  );
}