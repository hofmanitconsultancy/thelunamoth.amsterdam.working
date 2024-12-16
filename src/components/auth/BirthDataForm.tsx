import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { PlaceSearch } from '../places/PlaceSearch';
import { FormField } from '../forms/FormField';
import { useForm } from '../../hooks/shared/useForm';
import { FORM_ERRORS } from '../../constants/errors';
import { ErrorMessage } from '../shared/ErrorMessage';
import type { BirthDataFormData } from '../../types/birthData';
import type { PlaceDetails } from '../../types/places';

interface BirthDataFormProps {
  onSubmit: (data: BirthDataFormData & PlaceDetails) => Promise<void>;
  error?: string | null;
  initialData?: {
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    placeDetails?: PlaceDetails;
  };
}

export function BirthDataForm({ onSubmit, error: externalError, initialData }: BirthDataFormProps) {
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(
    initialData?.placeDetails || null
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldTouched
  } = useForm<BirthDataFormData>({
    initialValues: {
      birthDate: initialData?.birthDate || '',
      birthTime: initialData?.birthTime || '',
      birthPlace: initialData?.birthPlace || ''
    },
    validate: (values) => {
      const errors: Partial<Record<keyof BirthDataFormData, string>> = {};
      
      if (touched.birthDate && !values.birthDate) {
        errors.birthDate = FORM_ERRORS.REQUIRED_FIELD;
      }

      if (touched.birthTime && !values.birthTime) {
        errors.birthTime = FORM_ERRORS.REQUIRED_FIELD;
      }

      if (touched.birthPlace && !values.birthPlace) {
        errors.birthPlace = FORM_ERRORS.REQUIRED_FIELD;
      }

      return errors;
    },
    onSubmit: async (values) => {
      if (!placeDetails) {
        setValidationError(FORM_ERRORS.INVALID_LOCATION);
        return;
      }

      try {
        await onSubmit({
          ...values,
          ...placeDetails
        });
      } catch (err) {
        setValidationError(err instanceof Error ? err.message : 'Failed to save birth data');
        throw err;
      }
    }
  });

  const handlePlaceSelect = (place: PlaceDetails) => {
    setPlaceDetails(place);
    handleChange('birthPlace', place.formattedAddress);
    setFieldTouched('birthPlace', true);
    setValidationError(null);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6" 
      noValidate
    >
      {(validationError || externalError) && (
        <ErrorMessage message={validationError || externalError} />
      )}

      <FormField
        id="birthDate"
        label="Birth Date"
        type="date"
        value={values.birthDate}
        onChange={(e) => {
          handleChange('birthDate', e.target.value);
          setFieldTouched('birthDate', true);
        }}
        error={touched.birthDate ? errors.birthDate : undefined}
        max={new Date().toISOString().split('T')[0]}
        required
      />

      <FormField
        id="birthTime"
        label="Birth Time"
        type="time"
        value={values.birthTime}
        onChange={(e) => {
          handleChange('birthTime', e.target.value);
          setFieldTouched('birthTime', true);
        }}
        error={touched.birthTime ? errors.birthTime : undefined}
        required
      />

      <div>
        <label htmlFor="birthPlace" className="block text-sm font-medium text-purple-200 mb-1">
          Birth Place
          <span className="text-red-400 ml-1">*</span>
        </label>
        <PlaceSearch
          id="birthPlace"
          onPlaceSelect={handlePlaceSelect}
          defaultValue={values.birthPlace}
          error={touched.birthPlace ? errors.birthPlace : undefined}
          required
        />
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={!placeDetails || isSubmitting}
        className="w-full"
      >
        Save Changes
      </Button>
    </form>
  );
}