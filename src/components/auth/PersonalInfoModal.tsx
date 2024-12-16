import React, { useState } from 'react';
import { User, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useProfile } from '../../hooks/useProfile';

interface PersonalInfoModalProps {
  onComplete: () => void;
  initialData?: {
    displayName: string;
  };
}

export function PersonalInfoModal({ onComplete, initialData }: PersonalInfoModalProps) {
  const { profile, updateProfile, error: profileError, refresh } = useProfile();
  const [formData, setFormData] = useState({
    displayName: initialData?.displayName || profile?.displayName || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.displayName.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProfile({ displayName: formData.displayName });
      refresh(); // Refresh the profile data
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-purple-900 rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <User className="h-8 w-8 text-purple-300" />
          <h2 className="text-2xl font-serif text-white">Edit Personal Information</h2>
        </div>

        {(error || profileError) && (
          <div className="flex items-center gap-2 text-red-300 bg-red-900/20 p-4 rounded-lg mb-6">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error || profileError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-purple-200">
              Full Name
            </label>
            <input
              id="displayName"
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="mt-1 block w-full rounded-md bg-purple-800/50 border-purple-600 text-white px-3 py-2"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="flex-1"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onComplete}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}