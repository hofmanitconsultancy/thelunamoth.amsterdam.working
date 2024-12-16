import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountService } from '../services/account.service';
import { useAuth } from './useAuth';

export function useAccount() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const deleteAccount = async (password: string) => {
    if (!user) {
      setError('You must be logged in to delete your account');
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await AccountService.deleteAccount(user.uid, password);
      await logout();
      navigate('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete account';
      setError(message);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    error,
    deleteAccount,
    setError
  };
}