import React from 'react';
import { Navigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { DeleteAccountSection } from '../components/profile/DeleteAccountSection';

export default function Profile() {
  const { user, loading } = useAuthContext();
  const { profile } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 py-12">
        <div className="max-w-7xl mx-auto px-4 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-white mb-8">My Profile</h1>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-700 rounded-full p-3">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {profile?.displayName || user.displayName || 'Stargazer'}
              </h2>
              <p className="text-purple-200">{profile?.email || user.email}</p>
            </div>
          </div>

          <DeleteAccountSection />
        </div>
      </div>
    </div>
  );
}