import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon } from 'lucide-react';
import { BirthDataForm } from './BirthDataForm';
import { useBirthData } from '../../hooks/useBirthData';
import { ErrorMessage } from '../shared/ErrorMessage';
import { ROUTES } from '../../constants/routes';

interface EditBirthDataModalProps {
  onComplete: () => Promise<void>;
}

export function EditBirthDataModal({ onComplete }: EditBirthDataModalProps) {
  const { birthData, updateBirthData, error: updateError } = useBirthData();
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      setFormError(null);
      await updateBirthData(data);
      await onComplete();
      // Force a full page reload to ensure fresh data
      window.location.href = ROUTES.MEMBERS;
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save birth data');
    }
  };

  if (!birthData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-purple-900 rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <Moon className="h-8 w-8 text-purple-300" />
          <h2 className="text-2xl font-serif text-white">Edit Birth Information</h2>
        </div>
        
        {(formError || updateError) && (
          <ErrorMessage message={formError || updateError} />
        )}

        <BirthDataForm 
          onSubmit={handleSubmit}
          initialData={{
            birthDate: birthData.birthDate,
            birthTime: birthData.birthTime,
            birthPlace: birthData.birthPlace,
            placeDetails: {
              placeId: birthData.placeId,
              formattedAddress: birthData.birthPlace,
              city: birthData.city,
              country: birthData.country,
              countryCode: birthData.countryCode,
              latitude: birthData.latitude,
              longitude: birthData.longitude,
              timezone: birthData.timezone
            }
          }}
        />
      </div>
    </div>
  );
}