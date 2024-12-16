import React, { useState } from 'react';
import { Trash2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { FormField } from '../forms/FormField';
import { useAccount } from '../../hooks/useAccount';

export function DeleteAccountSection() {
  const { deleteAccount, isDeleting, error, setError } = useAccount();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [password, setPassword] = useState('');

  const handleInitiateDelete = () => {
    if (!window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    )) {
      return;
    }
    setShowConfirmation(true);
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    try {
      await deleteAccount(password);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="border-t border-purple-800 pt-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Account Management
      </h3>

      {error && (
        <div className="mb-4 flex items-center gap-2 text-red-300 bg-red-900/20 p-4 rounded-lg">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {!showConfirmation ? (
        <Button
          variant="danger"
          onClick={handleInitiateDelete}
          icon={Trash2}
        >
          Delete Account
        </Button>
      ) : (
        <form onSubmit={handleDeleteAccount} className="space-y-4">
          <p className="text-purple-200">
            Please enter your password to confirm account deletion
          </p>
          
          <FormField
            id="deletePassword"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />

          <div className="flex gap-4">
            <Button
              type="submit"
              variant="danger"
              isLoading={isDeleting}
              icon={Trash2}
            >
              {isDeleting ? 'Deleting Account...' : 'Confirm Deletion'}
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowConfirmation(false);
                setPassword('');
                setError(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}