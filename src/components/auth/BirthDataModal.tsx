import React, { useState } from 'react';
import { Moon } from 'lucide-react';
import { BirthDataForm } from './BirthDataForm';
import { useBirthData } from '../../hooks/useBirthData';
import { useAuth } from '../../hooks/useAuth';
import { ErrorMessage } from '../shared/ErrorMessage';
import { ROUTES } from '../../constants/routes';

interface BirthDataModalProps {
  onComplete: () => Promise<void>;
}

export function BirthDataModal({ onComplete }: BirthDataModalProps) {
  const { updateBirthData, error: updateError } = useBirthData();
  const { user } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    if (!user) {
      setFormError('User must be authenticated');
      return;
    }

    try {
      setFormError(null);
      await updateBirthData(data);
      await onComplete();
      
      // Force a full page reload to ensure fresh data
      window.location.href = ROUTES.MEMBERS;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save data';
      setFormError(message);
      console.error('Error in birth data submission:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-purple-900 rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <Moon className="h-8 w-8 text-purple-300" />
          <h2 className="text-2xl font-serif text-white">Complete Your Profile</h2>
        </div>
        
        {(formError || updateError) && (
          <ErrorMessage message={formError || updateError} />
        )}
        
        <div className="text-purple-200 mb-6">
          Please enter your birth information to complete your profile.
        </div>

        <BirthDataForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}