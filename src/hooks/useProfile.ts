import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { UserService } from '../services/user.service';
import type { UserProfile } from '../types/user';

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userProfile = await UserService.getProfile(user.uid);
      setProfile(userProfile);
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile data');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('User must be authenticated');
    
    try {
      setError(null);
      setLoading(true);
      const updatedProfile = await UserService.updateProfile(user.uid, data);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchProfile();
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    refresh
  };
}