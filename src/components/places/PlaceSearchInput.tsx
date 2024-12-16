import React from 'react';
import { MapPin } from 'lucide-react';
import { LoadingSpinner } from '../shared/LoadingSpinner';

interface PlaceSearchInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  error?: string;
  isLoading?: boolean;
  required?: boolean;
}

export function PlaceSearchInput({
  id,
  value,
  onChange,
  onFocus,
  error,
  isLoading,
  required
}: PlaceSearchInputProps) {
  const inputId = `place-${id}`;
  
  return (
    <div className="relative">
      <input
        id={inputId}
        name={id}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        autoComplete="off"
        placeholder="Enter city name..."
        aria-label="Search for a city"
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        aria-required={required}
        required={required}
        className={`w-full rounded-md bg-purple-800/50 border border-purple-600 text-white px-3 py-2 pl-10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
          error ? 'border-red-500' : ''
        }`}
      />
      <MapPin 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400"
        aria-hidden="true"
      />
      {isLoading && (
        <div 
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          aria-hidden="true"
        >
          <LoadingSpinner size="sm" />
        </div>
      )}
      {error && (
        <p 
          id={`${inputId}-error`} 
          className="mt-1 text-sm text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}